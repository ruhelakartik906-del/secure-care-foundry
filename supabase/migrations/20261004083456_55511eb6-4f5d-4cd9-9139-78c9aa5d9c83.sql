create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create type public.enquiry_status as enum ('new','contacted','qualified','proposal_sent','converted','closed');
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'enquiry',
  name text not null check (char_length(name) between 1 and 100),
  company text check (char_length(company) <= 150),
  phone text not null check (char_length(phone) between 6 and 20),
  email text check (char_length(email) <= 255),
  city text check (char_length(city) <= 80),
  state text check (char_length(state) <= 80),
  product text check (char_length(product) <= 150),
  quantity text check (char_length(quantity) <= 50),
  requirement text check (char_length(requirement) <= 300),
  message text check (char_length(message) <= 2000),
  contact_method text check (char_length(contact_method) <= 30),
  page_url text check (char_length(page_url) <= 500),
  status enquiry_status not null default 'new'
);
grant insert on public.enquiries to anon, authenticated;
grant select, update, delete on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "Anyone can submit enquiries" on public.enquiries for insert to anon, authenticated with check (status = 'new');
create policy "Admins read enquiries" on public.enquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update enquiries" on public.enquiries for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete enquiries" on public.enquiries for delete to authenticated using (public.has_role(auth.uid(), 'admin'));