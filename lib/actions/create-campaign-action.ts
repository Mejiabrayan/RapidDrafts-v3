import { Database } from '@/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

interface InsertCampaignParams {
  campaign_name: string;
  campaign_brief: string;
  target_channels: string[];
  user_id: string;
  status: string;
}

interface UpdateCampaignParams {
  id: number;
  campaign_name?: string;
  campaign_brief?: string;
  target_channels?: string[];
  status?: string;
}

interface InsertCampaignContentItemParams {
  campaign_id: number;
  channel: string;
  content: string;
  metadata: Record<string, any>;
}

export async function insertCampaign(client: Client, params: InsertCampaignParams) {
  const { data, error } = await client
    .from('content_campaigns')
    .insert(params)
    .select('id')
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCampaign(
  client: Client,
  { id, ...params }: UpdateCampaignParams
) {
  const { data, error } = await client
    .from('content_campaigns')
    .update(params)
    .match({ id })
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteCampaign(client: Client, id: number) {
  const { data, error } = await client
    .from('content_campaigns')
    .delete()
    .match({ id });

  if (error) {
    throw error;
  }

  return data;
}

export async function insertCampaignContentItem(
  client: Client,
  params: InsertCampaignContentItemParams
) {
  const { data, error } = await client
    .from('campaign_content_items')
    .insert(params)
    .select('id')
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCampaignContentItem(
  client: Client,
  id: number,
  content: string,
  metadata: Record<string, any>
) {
  const { data, error } = await client
    .from('campaign_content_items')
    .update({ content, metadata })
    .match({ id })
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteCampaignContentItem(client: Client, id: number) {
  const { data, error } = await client
    .from('campaign_content_items')
    .delete()
    .match({ id });

  if (error) {
    throw error;
  }

  return data;
}