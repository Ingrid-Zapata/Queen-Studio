-- Queen Studio Supabase setup
-- Run this in the Supabase SQL editor.

create table if not exists public.citas (
  id bigint primary key,
  nombre text not null,
  telefono text not null,
  servicio text not null,
  servicio_clave text,
  servicio_detalle text,
  fecha text not null,
  hora text not null,
  hora_fin text,
  duracion_min integer,
  duracion_texto text,
  notas text,
  estado text not null default 'en espera',
  fecha_creacion timestamptz not null default now()
);

create index if not exists citas_fecha_idx on public.citas (fecha);
create index if not exists citas_estado_idx on public.citas (estado);

alter table public.citas enable row level security;

-- Allow the public site to read appointments.
create policy "Public can read citas"
  on public.citas
  for select
  to anon, authenticated
  using (true);

-- Allow the public site to create appointments.
create policy "Public can insert citas"
  on public.citas
  for insert
  to anon, authenticated
  with check (true);

-- Allow the public site to update appointments.
create policy "Public can update citas"
  on public.citas
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- Allow the public site to delete appointments.
create policy "Public can delete citas"
  on public.citas
  for delete
  to anon, authenticated
  using (true);
