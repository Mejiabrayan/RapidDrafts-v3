'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { updateCampaignAction } from '@/lib/actions/update-campaign-action'

const channels = [
  { id: 'blog', label: 'Blog' },
  { id: 'social', label: 'Social Media' },
  { id: 'email', label: 'Email' },
]

interface EditCampaignFormProps {
  campaign: {
    id: number;
    campaign_name: string;
    campaign_brief: string;
    target_channels: string[];
  }
}

export function EditCampaignForm({ campaign }: EditCampaignFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    formData.append('id', campaign.id.toString())
    
    try {
      const result = await updateCampaignAction(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push(`/dashboard/campaigns/${result.campaignId}`)
        router.refresh()
      } else {
        setError('Failed to update campaign')
      }
    } catch (error) {
      console.error('Failed to update campaign:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Input
        name="campaignName"
        placeholder="Campaign Name"
        defaultValue={campaign.campaign_name}
        required
      />
      <Textarea
        name="campaignBrief"
        placeholder="Campaign Brief"
        defaultValue={campaign.campaign_brief}
        required
      />
      <div>
        <h3 className="mb-4 font-medium">Target Channels</h3>
        {channels.map((channel) => (
          <div key={channel.id} className="flex items-center space-x-2">
            <Checkbox 
              id={channel.id} 
              name="targetChannels" 
              value={channel.id}
              defaultChecked={campaign.target_channels.includes(channel.id)}
            />
            <label htmlFor={channel.id}>{channel.label}</label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Campaign'}
      </Button>
    </form>
  )
}