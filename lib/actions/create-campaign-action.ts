'use server'

import { revalidatePath } from 'next/cache'
import getSupabaseServerActionClient from '@/lib/supabase/action-client'
import { insertCampaign } from '@/lib/mutations/campaigns'

export async function createCampaignAction(formData: FormData) {
  try {
    const supabase = getSupabaseServerActionClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError) {
      console.error('Auth error:', authError)
      return { error: `Authentication failed: ${authError.message}` }
    }

    if (!user) {
      return { error: 'User not found' }
    }

    const campaignName = formData.get('campaignName') as string
    const campaignBrief = formData.get('campaignBrief') as string
    const targetChannels = formData.getAll('targetChannels') as string[]

    if (!campaignName || !campaignBrief || targetChannels.length === 0) {
      return { error: 'Missing required fields' }
    }

    const campaign = await insertCampaign(supabase, {
      campaign_name: campaignName,
      campaign_brief: campaignBrief,
      target_channels: targetChannels,
      user_id: user.id,
      status: 'draft'
    })

    revalidatePath('/dashboard/campaigns')
    return { success: true, campaignId: campaign.id }
  } catch (error) {
    console.error('Failed to create campaign:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}