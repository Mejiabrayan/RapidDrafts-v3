drop trigger if exists "update_waitlist_modtime" on "public"."waitlist";

drop policy "Anyone can join waitlist" on "public"."waitlist";

drop policy "Users can read own waitlist entry" on "public"."waitlist";

revoke delete on table "public"."waitlist" from "anon";

revoke insert on table "public"."waitlist" from "anon";

revoke references on table "public"."waitlist" from "anon";

revoke select on table "public"."waitlist" from "anon";

revoke trigger on table "public"."waitlist" from "anon";

revoke truncate on table "public"."waitlist" from "anon";

revoke update on table "public"."waitlist" from "anon";

revoke delete on table "public"."waitlist" from "authenticated";

revoke insert on table "public"."waitlist" from "authenticated";

revoke references on table "public"."waitlist" from "authenticated";

revoke select on table "public"."waitlist" from "authenticated";

revoke trigger on table "public"."waitlist" from "authenticated";

revoke truncate on table "public"."waitlist" from "authenticated";

revoke update on table "public"."waitlist" from "authenticated";

revoke delete on table "public"."waitlist" from "service_role";

revoke insert on table "public"."waitlist" from "service_role";

revoke references on table "public"."waitlist" from "service_role";

revoke select on table "public"."waitlist" from "service_role";

revoke trigger on table "public"."waitlist" from "service_role";

revoke truncate on table "public"."waitlist" from "service_role";

revoke update on table "public"."waitlist" from "service_role";

alter table "public"."waitlist" drop constraint "waitlist_email_key";

alter table "public"."waitlist" drop constraint "waitlist_user_id_fkey";

alter table "public"."waitlist" drop constraint "waitlist_pkey";

drop index if exists "public"."idx_waitlist_email";

drop index if exists "public"."idx_waitlist_status";

drop index if exists "public"."idx_waitlist_user_id";

drop index if exists "public"."waitlist_email_key";

drop index if exists "public"."waitlist_pkey";

drop table "public"."waitlist";


