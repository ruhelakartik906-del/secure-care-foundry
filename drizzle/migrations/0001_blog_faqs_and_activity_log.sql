ALTER TABLE public.cms_blog_posts ADD COLUMN IF NOT EXISTS faqs jsonb NOT NULL DEFAULT '[]'::jsonb;

CREATE TABLE public.admin_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  entity text NOT NULL,
  entity_id uuid,
  label text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_activity TO authenticated;
GRANT ALL ON public.admin_activity TO service_role;
ALTER TABLE public.admin_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read activity" ON public.admin_activity FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX admin_activity_created_idx ON public.admin_activity (created_at DESC);

CREATE OR REPLACE FUNCTION public.log_admin_activity()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE r record; lbl text;
BEGIN
  IF TG_OP = 'DELETE' THEN r := OLD; ELSE r := NEW; END IF;
  lbl := coalesce(to_jsonb(r)->>'title', to_jsonb(r)->>'name', to_jsonb(r)->>'client_name');
  INSERT INTO public.admin_activity (user_id, action, entity, entity_id, label)
  VALUES (auth.uid(), lower(TG_OP), TG_TABLE_NAME, (to_jsonb(r)->>'id')::uuid, lbl);
  RETURN NULL;
END; $$;

CREATE TRIGGER cms_blog_posts_activity AFTER INSERT OR UPDATE OR DELETE ON public.cms_blog_posts FOR EACH ROW EXECUTE FUNCTION public.log_admin_activity();
CREATE TRIGGER cms_products_activity AFTER INSERT OR UPDATE OR DELETE ON public.cms_products FOR EACH ROW EXECUTE FUNCTION public.log_admin_activity();
CREATE TRIGGER cms_locations_activity AFTER INSERT OR UPDATE OR DELETE ON public.cms_locations FOR EACH ROW EXECUTE FUNCTION public.log_admin_activity();
CREATE TRIGGER cms_testimonials_activity AFTER INSERT OR UPDATE OR DELETE ON public.cms_testimonials FOR EACH ROW EXECUTE FUNCTION public.log_admin_activity();