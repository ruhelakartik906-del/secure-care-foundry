REVOKE EXECUTE ON FUNCTION public.record_slug_redirect() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon;