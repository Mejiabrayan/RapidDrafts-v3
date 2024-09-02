import { Database } from '@/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

type Client = SupabaseClient<Database>;

export async function getCampaign(client: Client, id: number) {
  const { data, error } = await client
    .from('content_campaigns')
    .select(`
      *,
      campaign_content_items (
        id,
        channel,
        content,
        metadata
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function listCampaigns(client: Client, userId: string) {
  try {
    const { data, error } = await client
      .from('content_campaigns')
      .select(`
        id,
        campaign_name,
        campaign_brief,
        target_channels,
        status,
        created_at
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in listCampaigns:', error);
    throw error;
  }
}

export async function getCampaignContentItems(client: Client, campaignId: number) {
  const { data, error } = await client
    .from('campaign_content_items')
    .select('*')
    .eq('campaign_id', campaignId);

  if (error) {
    throw error;
  }

  return data;
}

export async function searchCampaigns(
  client: Client,
  userId: string,
  searchTerm: string
) {
  const { data, error } = await client
    .from('content_campaigns')
    .select(`
      id,
      campaign_name,
      campaign_brief,
      target_channels,
      status,
      created_at
    `)
    .eq('user_id', userId)
    .ilike('campaign_name', `%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getCampaignStats(client: Client, userId: string) {
  const { data, error } = await client
    .from('content_campaigns')
    .select('status')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  const stats = {
    total: data.length,
    draft: data.filter(c => c.status === 'draft').length,
    active: data.filter(c => c.status === 'active').length,
    completed: data.filter(c => c.status === 'completed').length
  };

  return stats;
}