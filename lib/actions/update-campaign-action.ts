'use server'

import { revalidatePath } from 'next/cache'
import getSupabaseServerActionClient from '@/lib/supabase/action-client'
import { updateCampaign } from '@/lib/mutations/campaigns'

export async function updateCampaignAction(formData: FormData) {
  try {
    const supabase = getSupabaseServerActionClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: 'Authentication failed' }
    }

    const id = parseInt(formData.get('id') as string, 10)
    if (isNaN(id)) {
      return { error: 'Invalid campaign ID' }
    }

    const campaignName = formData.get('campaignName') as string
    const campaignBrief = formData.get('campaignBrief') as string
    const targetChannels = formData.getAll('targetChannels') as string[]

    if (!campaignName || !campaignBrief || targetChannels.length === 0) {
      return { error: 'Missing required fields' }
    }

    const updatedCampaign = await updateCampaign(supabase, {
      id,
      campaign_name: campaignName,
      campaign_brief: campaignBrief,
      target_channels: targetChannels,
    })

    revalidatePath(`/dashboard/campaigns/${id}`)
    return { success: true, campaignId: id }
  } catch (error) {
    console.error('Failed to update campaign:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}