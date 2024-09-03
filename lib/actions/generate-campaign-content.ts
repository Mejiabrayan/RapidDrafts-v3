'use server'

import { revalidatePath } from 'next/cache'
import getSupabaseServerActionClient from '@/lib/supabase/action-client'
import { insertCampaignContentItem } from '@/lib/mutations/campaigns'
import getOpenAIClient from '@/lib/openai-client'

export async function generateCampaignContentAction(campaignId: number) {
  try {
    const supabase = getSupabaseServerActionClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: 'Authentication failed' }
    }

    const { data: campaign } = await supabase
      .from('content_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single()

    if (!campaign) {
      return { error: 'Campaign not found' }
    }

    const openai = getOpenAIClient()

    for (const channel of campaign.target_channels) {
      const prompt = `Create content for a ${channel} post based on the following campaign brief: ${campaign.campaign_brief}`
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      })

      const generatedContent = completion.choices[0].message.content

      await insertCampaignContentItem(supabase, {
        campaign_id: campaignId,
        channel,
        content: generatedContent || '',
        metadata: { generated: true }
      })
    }

    revalidatePath(`/dashboard/campaigns/${campaignId}`)
    return { success: true, campaignId }
  } catch (error) {
    console.error('Failed to generate campaign content:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}