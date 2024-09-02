import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { listCampaigns } from '@/lib/queries/campaigns'
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client'

export async function CampaignList() {
  const supabase = getSupabaseServerComponentClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error('Authentication error:', authError);
    return <div>Please log in to view campaigns.</div>
  }

  try {
    const campaigns = await listCampaigns(supabase, user.id)

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Campaigns</h2>
          <Button asChild>
            <Link href="/dashboard/campaigns/create">Create New Campaign</Link>
          </Button>
        </div>
        {campaigns.length === 0 ? (
          <p>You haven&apos;t created any campaigns yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <CardTitle>{campaign.campaign_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Status: {campaign.status}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(campaign.created_at).toLocaleDateString()}
                  </p>
                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <Link href={`/dashboard/campaigns/${campaign.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return <span className='text-xl'>Error loading campaigns. Please try again later.</span>
  }
}