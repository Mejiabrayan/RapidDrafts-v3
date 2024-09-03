import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getCampaign } from '@/lib/queries/campaigns';
import getSupabaseServerComponentClient from '@/lib/supabase/server-component-client';
import { GenerateContentButton } from '../components/generate-content-button';

export default async function CampaignDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = getSupabaseServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to view campaign details.</div>;
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  try {
    const campaign = await getCampaign(supabase, id);

    if (!campaign) {
      notFound();
    }

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{campaign.campaign_name}</h1>
          <div className="space-x-2">
            <Button asChild>
              <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
                Edit Campaign
              </Link>
            </Button>
            <GenerateContentButton campaignId={campaign.id} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Status:</strong> {campaign.status}
            </p>
            <p>
              <strong>Created:</strong>{' '}
              {new Date(campaign.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Brief</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{campaign.campaign_brief}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {campaign.target_channels.map(
                (channel: string, index: number) => (
                  <li key={index}>{channel}</li>
                ),
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            {campaign.campaign_content_items &&
            campaign.campaign_content_items.length > 0 ? (
              <div className="space-y-4">
                {campaign.campaign_content_items.map(
                  (item: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{item.channel}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{item.content}</p>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            ) : (
              <p>{`No content has been generated yet. Click the "Generate Content" button to create content for this campaign.`}</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error fetching campaign details:', error);
    return <div>Error loading campaign details. Please try again later.</div>;
  }
}
