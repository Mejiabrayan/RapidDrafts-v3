create sequence "public"."campaign_content_items_id_seq";

create sequence "public"."content_campaigns_id_seq";

create table "public"."campaign_content_items" (
    "id" integer not null default nextval('campaign_content_items_id_seq'::regclass),
    "campaign_id" integer,
    "channel" text not null,
    "content" text not null,
    "metadata" jsonb,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP
);


create table "public"."content_campaigns" (
    "id" integer not null default nextval('content_campaigns_id_seq'::regclass),
    "user_id" uuid,
    "campaign_name" text not null,
    "campaign_brief" text not null,
    "target_channels" text[] not null,
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone,
    "status" text not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP
);


alter table "public"."posts" alter column "created_at" drop not null;

alter sequence "public"."campaign_content_items_id_seq" owned by "public"."campaign_content_items"."id";

alter sequence "public"."content_campaigns_id_seq" owned by "public"."content_campaigns"."id";

CREATE UNIQUE INDEX campaign_content_items_pkey ON public.campaign_content_items USING btree (id);

CREATE UNIQUE INDEX content_campaigns_pkey ON public.content_campaigns USING btree (id);

alter table "public"."campaign_content_items" add constraint "campaign_content_items_pkey" PRIMARY KEY using index "campaign_content_items_pkey";

alter table "public"."content_campaigns" add constraint "content_campaigns_pkey" PRIMARY KEY using index "content_campaigns_pkey";

alter table "public"."campaign_content_items" add constraint "campaign_content_items_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES content_campaigns(id) not valid;

alter table "public"."campaign_content_items" validate constraint "campaign_content_items_campaign_id_fkey";

alter table "public"."content_campaigns" add constraint "content_campaigns_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."content_campaigns" validate constraint "content_campaigns_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user_waitlist()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.waitlist (user_id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

grant delete on table "public"."campaign_content_items" to "anon";

grant insert on table "public"."campaign_content_items" to "anon";

grant references on table "public"."campaign_content_items" to "anon";

grant select on table "public"."campaign_content_items" to "anon";

grant trigger on table "public"."campaign_content_items" to "anon";

grant truncate on table "public"."campaign_content_items" to "anon";

grant update on table "public"."campaign_content_items" to "anon";

grant delete on table "public"."campaign_content_items" to "authenticated";

grant insert on table "public"."campaign_content_items" to "authenticated";

grant references on table "public"."campaign_content_items" to "authenticated";

grant select on table "public"."campaign_content_items" to "authenticated";

grant trigger on table "public"."campaign_content_items" to "authenticated";

grant truncate on table "public"."campaign_content_items" to "authenticated";

grant update on table "public"."campaign_content_items" to "authenticated";

grant delete on table "public"."campaign_content_items" to "service_role";

grant insert on table "public"."campaign_content_items" to "service_role";

grant references on table "public"."campaign_content_items" to "service_role";

grant select on table "public"."campaign_content_items" to "service_role";

grant trigger on table "public"."campaign_content_items" to "service_role";

grant truncate on table "public"."campaign_content_items" to "service_role";

grant update on table "public"."campaign_content_items" to "service_role";

grant delete on table "public"."content_campaigns" to "anon";

grant insert on table "public"."content_campaigns" to "anon";

grant references on table "public"."content_campaigns" to "anon";

grant select on table "public"."content_campaigns" to "anon";

grant trigger on table "public"."content_campaigns" to "anon";

grant truncate on table "public"."content_campaigns" to "anon";

grant update on table "public"."content_campaigns" to "anon";

grant delete on table "public"."content_campaigns" to "authenticated";

grant insert on table "public"."content_campaigns" to "authenticated";

grant references on table "public"."content_campaigns" to "authenticated";

grant select on table "public"."content_campaigns" to "authenticated";

grant trigger on table "public"."content_campaigns" to "authenticated";

grant truncate on table "public"."content_campaigns" to "authenticated";

grant update on table "public"."content_campaigns" to "authenticated";

grant delete on table "public"."content_campaigns" to "service_role";

grant insert on table "public"."content_campaigns" to "service_role";

grant references on table "public"."content_campaigns" to "service_role";

grant select on table "public"."content_campaigns" to "service_role";

grant trigger on table "public"."content_campaigns" to "service_role";

grant truncate on table "public"."content_campaigns" to "service_role";

grant update on table "public"."content_campaigns" to "service_role";


