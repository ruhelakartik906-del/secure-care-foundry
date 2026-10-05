CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.cms_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_name text NOT NULL,
  category text NOT NULL,
  parent_slug text,
  short_description text NOT NULL DEFAULT '',
  introduction text NOT NULL DEFAULT '',
  image_url text,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  specifications jsonb NOT NULL DEFAULT '[]'::jsonb,
  applications jsonb NOT NULL DEFAULT '[]'::jsonb,
  benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  pricing_mode text NOT NULL DEFAULT 'on_request' CHECK (pricing_mode IN ('on_request','starting','range')),
  price_from text,
  price_to text,
  seo_title text,
  meta_description text,
  focus_keyword text,
  secondary_keywords text[] NOT NULL DEFAULT '{}',
  og_title text,
  og_description text,
  schema_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_products TO authenticated;
GRANT ALL ON public.cms_products TO service_role;
ALTER TABLE public.cms_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published products are public" ON public.cms_products FOR SELECT TO anon USING (published = true);
CREATE POLICY "Published products are visible to users" ON public.cms_products FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create products" ON public.cms_products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update products" ON public.cms_products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete products" ON public.cms_products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_products_updated_at BEFORE UPDATE ON public.cms_products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cms_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  category text NOT NULL DEFAULT 'Hospital Infrastructure',
  author text NOT NULL DEFAULT 'Unicare Medical Solutions',
  featured_image_url text,
  related_product_slugs text[] NOT NULL DEFAULT '{}',
  meta_title text,
  meta_description text,
  focus_keywords text[] NOT NULL DEFAULT '{}',
  og_title text,
  og_description text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_blog_posts TO authenticated;
GRANT ALL ON public.cms_blog_posts TO service_role;
ALTER TABLE public.cms_blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blogs are public" ON public.cms_blog_posts FOR SELECT TO anon USING (published = true);
CREATE POLICY "Published blogs are visible to users" ON public.cms_blog_posts FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create blogs" ON public.cms_blog_posts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update blogs" ON public.cms_blog_posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete blogs" ON public.cms_blog_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_blog_posts_updated_at BEFORE UPDATE ON public.cms_blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cms_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  designation text,
  company text,
  city text,
  testimonial text NOT NULL,
  photo_url text,
  rating smallint NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_testimonials TO authenticated;
GRANT ALL ON public.cms_testimonials TO service_role;
ALTER TABLE public.cms_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published testimonials are public" ON public.cms_testimonials FOR SELECT TO anon USING (published = true);
CREATE POLICY "Published testimonials are visible to users" ON public.cms_testimonials FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create testimonials" ON public.cms_testimonials FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update testimonials" ON public.cms_testimonials FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete testimonials" ON public.cms_testimonials FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_testimonials_updated_at BEFORE UPDATE ON public.cms_testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cms_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  product_slug text NOT NULL,
  state text NOT NULL,
  city text,
  title text NOT NULL,
  introduction text NOT NULL DEFAULT '',
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text,
  seo_title text,
  meta_description text,
  focus_keywords text[] NOT NULL DEFAULT '{}',
  og_title text,
  og_description text,
  canonical_path text,
  published boolean NOT NULL DEFAULT false,
  noindex boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_locations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_locations TO authenticated;
GRANT ALL ON public.cms_locations TO service_role;
ALTER TABLE public.cms_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published locations are public" ON public.cms_locations FOR SELECT TO anon USING (published = true);
CREATE POLICY "Published locations are visible to users" ON public.cms_locations FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create locations" ON public.cms_locations FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update locations" ON public.cms_locations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete locations" ON public.cms_locations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_locations_updated_at BEFORE UPDATE ON public.cms_locations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cms_site_settings (
  id text PRIMARY KEY DEFAULT 'main',
  logo_url text,
  phone text NOT NULL,
  secondary_phone text NOT NULL,
  whatsapp text NOT NULL,
  email text NOT NULL,
  office_address text NOT NULL,
  works_address text NOT NULL,
  working_hours text NOT NULL,
  footer_description text NOT NULL,
  social_links jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_site_settings TO authenticated;
GRANT ALL ON public.cms_site_settings TO service_role;
ALTER TABLE public.cms_site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site settings are public" ON public.cms_site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins create settings" ON public.cms_site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update settings" ON public.cms_site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete settings" ON public.cms_site_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_site_settings_updated_at BEFORE UPDATE ON public.cms_site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.cms_site_settings (id, phone, secondary_phone, whatsapp, email, office_address, works_address, working_hours, footer_description)
VALUES ('main', '+91-7736077740', '+91-7678443838', '917678443838', 'unicaremedical2023@gmail.com', '357, Malkhan Singh Complex, Opp. Ambedkar Bhawan, Dasna Road, Ghaziabad - 201001, Uttar Pradesh, India', 'Plot No. B/260, Adarsh Nagar, Subedar Colony, Ballabhgarh District, Faridabad 121004, Haryana, India', 'Mon – Sat, 9:30 AM – 6:30 PM', 'Design, manufacturing and installation of modular operation theatres, medical gas pipeline systems and hospital infrastructure solutions.');