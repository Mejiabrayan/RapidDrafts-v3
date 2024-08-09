create table "public"."waitlist" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid,
    "email" text not null,
    "status" text not null default 'waiting'::text,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "metadata" jsonb
);


alter table "public"."waitlist" enable row level security;

CREATE INDEX idx_waitlist_email ON public.waitlist USING btree (email);

CREATE INDEX idx_waitlist_status ON public.waitlist USING btree (status);

CREATE INDEX idx_waitlist_user_id ON public.waitlist USING btree (user_id);

CREATE UNIQUE INDEX waitlist_email_key ON public.waitlist USING btree (email);

CREATE UNIQUE INDEX waitlist_pkey ON public.waitlist USING btree (id);

alter table "public"."waitlist" add constraint "waitlist_pkey" PRIMARY KEY using index "waitlist_pkey";

alter table "public"."waitlist" add constraint "waitlist_email_key" UNIQUE using index "waitlist_email_key";

alter table "public"."waitlist" add constraint "waitlist_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."waitlist" validate constraint "waitlist_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_modified_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."waitlist" to "anon";

grant insert on table "public"."waitlist" to "anon";

grant references on table "public"."waitlist" to "anon";

grant select on table "public"."waitlist" to "anon";

grant trigger on table "public"."waitlist" to "anon";

grant truncate on table "public"."waitlist" to "anon";

grant update on table "public"."waitlist" to "anon";

grant delete on table "public"."waitlist" to "authenticated";

grant insert on table "public"."waitlist" to "authenticated";

grant references on table "public"."waitlist" to "authenticated";

grant select on table "public"."waitlist" to "authenticated";

grant trigger on table "public"."waitlist" to "authenticated";

grant truncate on table "public"."waitlist" to "authenticated";

grant update on table "public"."waitlist" to "authenticated";

grant delete on table "public"."waitlist" to "service_role";

grant insert on table "public"."waitlist" to "service_role";

grant references on table "public"."waitlist" to "service_role";

grant select on table "public"."waitlist" to "service_role";

grant trigger on table "public"."waitlist" to "service_role";

grant truncate on table "public"."waitlist" to "service_role";

grant update on table "public"."waitlist" to "service_role";

create policy "Anyone can join waitlist"
on "public"."waitlist"
as permissive
for insert
to public
with check (true);


create policy "Users can read own waitlist entry"
on "public"."waitlist"
as permissive
for select
to public
using ((auth.uid() = user_id));


CREATE TRIGGER update_waitlist_modtime BEFORE UPDATE ON public.waitlist FOR EACH ROW EXECUTE FUNCTION update_modified_column();


