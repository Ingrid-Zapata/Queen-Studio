-- Queen Studio Supabase setup
-- Run this in the Supabase SQL editor.
-- Safe to run multiple times: it uses IF NOT EXISTS where possible and
-- drops/recreates policies so repeated executions do not fail.

create or replace function public.eliminar_cita_por_id(p_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.citas
  where id = p_id;
end;
$$;

grant execute on function public.eliminar_cita_por_id(bigint) to anon, authenticated;

create table if not exists public.cita_estados (
  clave text primary key,
  etiqueta text not null,
  color text not null default '#6b7280',
  orden integer not null default 0,
  descripcion text
);

insert into public.cita_estados (clave, etiqueta, color, orden, descripcion)
values
  ('en espera', 'En espera', '#ed6c02', 1, 'Cita pendiente de confirmación'),
  ('confirmada', 'Confirmada', '#2e7d32', 2, 'Cita aprobada por el admin'),
  ('cancelada', 'Cancelada', '#c62828', 3, 'Cita anulada')
on conflict (clave) do update
set etiqueta = excluded.etiqueta,
    color = excluded.color,
    orden = excluded.orden,
    descripcion = excluded.descripcion;

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

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'citas_estado_fk'
  ) then
    alter table public.citas
      add constraint citas_estado_fk
      foreign key (estado) references public.cita_estados (clave)
      on update cascade
      on delete restrict;
  end if;
end $$;

create index if not exists citas_fecha_idx on public.citas (fecha);
create index if not exists citas_estado_idx on public.citas (estado);

alter table public.citas enable row level security;

-- Allow the public site to read appointments.
drop policy if exists "Public can read citas" on public.citas;
create policy "Public can read citas"
  on public.citas
  for select
  to anon, authenticated
  using (true);

-- Allow the public site to read state metadata.
drop policy if exists "Public can read cita_estados" on public.cita_estados;
create policy "Public can read cita_estados"
  on public.cita_estados
  for select
  to anon, authenticated
  using (true);

-- Allow the public site to create appointments.
drop policy if exists "Public can insert citas" on public.citas;
create policy "Public can insert citas"
  on public.citas
  for insert
  to anon, authenticated
  with check (true);

-- Allow the public site to update appointments.
drop policy if exists "Public can update citas" on public.citas;
create policy "Public can update citas"
  on public.citas
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- Allow the public site to delete appointments.
drop policy if exists "Public can delete citas" on public.citas;
create policy "Public can delete citas"
  on public.citas
  for delete
  to anon, authenticated
  using (true);
