import { notFound } from 'next/navigation'
import { EditCampaignForm } from '../../components/edit-campaign-form'
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client'

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServerComponentClient()
  const { data: campaign, error } = await supabase
    .from('content_campaigns')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !campaign) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Campaign</h1>
      <EditCampaignForm campaign={campaign} />
    </div>
  )
}