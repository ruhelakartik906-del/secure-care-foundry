DROP POLICY IF EXISTS "Site settings are public" ON public.cms_site_settings;
CREATE POLICY "Staff read settings" ON public.cms_site_settings FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
DROP POLICY IF EXISTS "Redirects are public" ON public.redirects;
CREATE POLICY "Admins read redirects" ON public.redirects FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));