-- Paste all of this into Supabase > SQL Editor > New query > Run
create table if not exists site (id int primary key, data jsonb not null, updated_at timestamptz default now());
alter table site enable row level security;
create policy "public read" on site for select using (true);
create policy "admin insert" on site for insert to authenticated with check (true);
create policy "admin update" on site for update to authenticated using (true) with check (true);
insert into storage.buckets (id,name,public) values ('images','images',true) on conflict (id) do nothing;
create policy "public read images" on storage.objects for select using (bucket_id='images');
create policy "admin upload images" on storage.objects for insert to authenticated with check (bucket_id='images');
create policy "admin update images" on storage.objects for update to authenticated using (bucket_id='images');
create policy "admin delete images" on storage.objects for delete to authenticated using (bucket_id='images');
