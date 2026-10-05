ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'content_manager';

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role::text in ('admin','content_manager'))
$$;

-- Blogs
ALTER TABLE public.cms_blog_posts
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft' CHECK (status in ('draft','published','archived')),
  ADD COLUMN IF NOT EXISTS content_html text,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS canonical_url text,
  ADD COLUMN IF NOT EXISTS og_image text,
  ADD COLUMN IF NOT EXISTS twitter_title text,
  ADD COLUMN IF NOT EXISTS twitter_description text,
  ADD COLUMN IF NOT EXISTS twitter_image text,
  ADD COLUMN IF NOT EXISTS robots_index boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS robots_follow boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS schema_type text NOT NULL DEFAULT 'BlogPosting',
  ADD COLUMN IF NOT EXISTS featured_image_alt text,
  ADD COLUMN IF NOT EXISTS featured_image_title text,
  ADD COLUMN IF NOT EXISTS featured_image_caption text,
  ADD COLUMN IF NOT EXISTS featured_image_description text;
UPDATE public.cms_blog_posts SET status = CASE WHEN published THEN 'published' ELSE 'draft' END;

ALTER TABLE public.cms_products
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft' CHECK (status in ('draft','published','archived')),
  ADD COLUMN IF NOT EXISTS canonical_url text,
  ADD COLUMN IF NOT EXISTS og_image text,
  ADD COLUMN IF NOT EXISTS image_alt text,
  ADD COLUMN IF NOT EXISTS robots_index boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS robots_follow boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS schema_type text NOT NULL DEFAULT 'Product';
UPDATE public.cms_products SET status = CASE WHEN published THEN 'published' ELSE 'draft' END;

ALTER TABLE public.cms_locations
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft' CHECK (status in ('draft','published','archived')),
  ADD COLUMN IF NOT EXISTS og_image text,
  ADD COLUMN IF NOT EXISTS image_alt text,
  ADD COLUMN IF NOT EXISTS internal_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS schema_type text NOT NULL DEFAULT 'Service';
UPDATE public.cms_locations SET status = CASE WHEN published THEN 'published' ELSE 'draft' END;

ALTER TABLE public.cms_testimonials ADD COLUMN IF NOT EXISTS testimonial_date date;

-- keep legacy published flag in sync with status
CREATE OR REPLACE FUNCTION public.sync_status_published()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.published := (NEW.status = 'published');
  RETURN NEW;
END; $$;
CREATE TRIGGER cms_blog_posts_status BEFORE INSERT OR UPDATE ON public.cms_blog_posts FOR EACH ROW EXECUTE FUNCTION public.sync_status_published();
CREATE TRIGGER cms_products_status BEFORE INSERT OR UPDATE ON public.cms_products FOR EACH ROW EXECUTE FUNCTION public.sync_status_published();
CREATE TRIGGER cms_locations_status BEFORE INSERT OR UPDATE ON public.cms_locations FOR EACH ROW EXECUTE FUNCTION public.sync_status_published();

CREATE UNIQUE INDEX IF NOT EXISTS cms_blog_posts_slug_key ON public.cms_blog_posts(slug);
CREATE UNIQUE INDEX IF NOT EXISTS cms_products_slug_key ON public.cms_products(slug);
CREATE UNIQUE INDEX IF NOT EXISTS cms_locations_slug_key ON public.cms_locations(slug);
CREATE INDEX IF NOT EXISTS cms_blog_posts_status_idx ON public.cms_blog_posts(status, published_at);
CREATE INDEX IF NOT EXISTS cms_blog_posts_category_idx ON public.cms_blog_posts(category);
CREATE INDEX IF NOT EXISTS cms_products_status_idx ON public.cms_products(status);
CREATE INDEX IF NOT EXISTS cms_locations_status_idx ON public.cms_locations(status, product_slug, state);

-- Blog categories
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  intro text NOT NULL DEFAULT '',
  seo_title text,
  meta_description text,
  noindex boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_categories TO authenticated;
GRANT ALL ON public.blog_categories TO service_role;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are public" ON public.blog_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff create categories" ON public.blog_categories FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update categories" ON public.blog_categories FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Admins delete categories" ON public.blog_categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER blog_categories_updated_at BEFORE UPDATE ON public.blog_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.blog_categories (slug, name, sort_order) VALUES
 ('modular-operation-theatre','Modular Operation Theatre',1),
 ('medical-gas-pipeline','Medical Gas Pipeline',2),
 ('hospital-infrastructure','Hospital Infrastructure',3),
 ('hospital-equipment','Hospital Equipment',4),
 ('healthcare-engineering','Healthcare Engineering',5),
 ('medical-infrastructure','Medical Infrastructure',6),
 ('industry-insights','Industry Insights',7);

-- Redirects
CREATE TABLE public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text NOT NULL UNIQUE CHECK (from_path like '/%'),
  to_path text NOT NULL,
  status_code smallint NOT NULL DEFAULT 301 CHECK (status_code in (301,302,307,308,410)),
  auto_created boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (from_path <> to_path)
);
GRANT SELECT ON public.redirects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.redirects TO authenticated;
GRANT ALL ON public.redirects TO service_role;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Redirects are public" ON public.redirects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins create redirects" ON public.redirects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update redirects" ON public.redirects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete redirects" ON public.redirects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER redirects_updated_at BEFORE UPDATE ON public.redirects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.record_slug_redirect()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE old_path text; new_path text;
BEGIN
  IF OLD.slug = NEW.slug OR OLD.status <> 'published' THEN RETURN NEW; END IF;
  IF TG_TABLE_NAME = 'cms_blog_posts' THEN
    old_path := '/blog/' || OLD.slug; new_path := '/blog/' || NEW.slug;
  ELSIF TG_TABLE_NAME = 'cms_products' THEN
    old_path := '/products/' || coalesce(OLD.parent_slug || '/', '') || OLD.slug;
    new_path := '/products/' || coalesce(NEW.parent_slug || '/', '') || NEW.slug;
  ELSE
    old_path := '/' || OLD.slug; new_path := '/' || NEW.slug;
  END IF;
  DELETE FROM public.redirects WHERE from_path = new_path;           -- prevent loops
  UPDATE public.redirects SET to_path = new_path WHERE to_path = old_path; -- flatten chains
  INSERT INTO public.redirects (from_path, to_path, status_code, auto_created)
  VALUES (old_path, new_path, 301, true)
  ON CONFLICT (from_path) DO UPDATE SET to_path = EXCLUDED.to_path;
  RETURN NEW;
END; $$;
CREATE TRIGGER cms_blog_posts_slug_redirect AFTER UPDATE OF slug ON public.cms_blog_posts FOR EACH ROW EXECUTE FUNCTION public.record_slug_redirect();
CREATE TRIGGER cms_products_slug_redirect AFTER UPDATE OF slug ON public.cms_products FOR EACH ROW EXECUTE FUNCTION public.record_slug_redirect();
CREATE TRIGGER cms_locations_slug_redirect AFTER UPDATE OF slug ON public.cms_locations FOR EACH ROW EXECUTE FUNCTION public.record_slug_redirect();

-- Content policies: staff (admin + content manager) manage content; scheduled posts hidden until due
DROP POLICY IF EXISTS "Published blogs are public" ON public.cms_blog_posts;
DROP POLICY IF EXISTS "Published blogs are visible to users" ON public.cms_blog_posts;
DROP POLICY IF EXISTS "Admins create blogs" ON public.cms_blog_posts;
DROP POLICY IF EXISTS "Admins update blogs" ON public.cms_blog_posts;
CREATE POLICY "Published blogs are public" ON public.cms_blog_posts FOR SELECT TO anon USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));
CREATE POLICY "Blogs visible to users and staff" ON public.cms_blog_posts FOR SELECT TO authenticated USING ((status = 'published' AND (published_at IS NULL OR published_at <= now())) OR public.is_staff(auth.uid()));
CREATE POLICY "Staff create blogs" ON public.cms_blog_posts FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update blogs" ON public.cms_blog_posts FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Published products are visible to users" ON public.cms_products;
DROP POLICY IF EXISTS "Admins create products" ON public.cms_products;
DROP POLICY IF EXISTS "Admins update products" ON public.cms_products;
CREATE POLICY "Products visible to users and staff" ON public.cms_products FOR SELECT TO authenticated USING (published OR public.is_staff(auth.uid()));
CREATE POLICY "Staff create products" ON public.cms_products FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update products" ON public.cms_products FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Published locations are visible to users" ON public.cms_locations;
DROP POLICY IF EXISTS "Admins create locations" ON public.cms_locations;
DROP POLICY IF EXISTS "Admins update locations" ON public.cms_locations;
CREATE POLICY "Locations visible to users and staff" ON public.cms_locations FOR SELECT TO authenticated USING (published OR public.is_staff(auth.uid()));
CREATE POLICY "Staff create locations" ON public.cms_locations FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update locations" ON public.cms_locations FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Published testimonials are visible to users" ON public.cms_testimonials;
DROP POLICY IF EXISTS "Admins create testimonials" ON public.cms_testimonials;
DROP POLICY IF EXISTS "Admins update testimonials" ON public.cms_testimonials;
CREATE POLICY "Testimonials visible to users and staff" ON public.cms_testimonials FOR SELECT TO authenticated USING (published OR public.is_staff(auth.uid()));
CREATE POLICY "Staff create testimonials" ON public.cms_testimonials FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update testimonials" ON public.cms_testimonials FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Enquiries
ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS project_type text,
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS internal_notes text;
DROP POLICY IF EXISTS "Anyone can submit enquiries" ON public.enquiries;
CREATE POLICY "Anyone can submit enquiries" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'new'::enquiry_status AND internal_notes IS NULL);

-- Site settings
ALTER TABLE public.cms_site_settings
  ADD COLUMN IF NOT EXISTS company_name text NOT NULL DEFAULT 'Unicare Medical Solutions',
  ADD COLUMN IF NOT EXISTS favicon_url text,
  ADD COLUMN IF NOT EXISTS google_maps_url text,
  ADD COLUMN IF NOT EXISTS latitude numeric,
  ADD COLUMN IF NOT EXISTS longitude numeric,
  ADD COLUMN IF NOT EXISTS website_url text NOT NULL DEFAULT 'https://unicaremedicalsolutions.com',
  ADD COLUMN IF NOT EXISTS default_seo_title text,
  ADD COLUMN IF NOT EXISTS default_meta_description text,
  ADD COLUMN IF NOT EXISTS default_og_image text,
  ADD COLUMN IF NOT EXISTS organization_logo text,
  ADD COLUMN IF NOT EXISTS gsc_verification text,
  ADD COLUMN IF NOT EXISTS bing_verification text,
  ADD COLUMN IF NOT EXISTS ga4_id text,
  ADD COLUMN IF NOT EXISTS gtm_id text,
  ADD COLUMN IF NOT EXISTS meta_pixel_id text;

-- Admins manage roles
GRANT INSERT, DELETE ON public.user_roles TO authenticated;
CREATE POLICY "Admins grant roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins revoke roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin') AND user_id <> auth.uid());