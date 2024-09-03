'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createCampaignAction } from '@/lib/actions/create-campaign-action'

const channels = [
  { id: 'blog', label: 'Blog' },
  { id: 'social', label: 'Social Media' },
  { id: 'email', label: 'Email' },
]

export function CampaignForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    
    try {
      const result = await createCampaignAction(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push(`/dashboard/campaigns/${result.campaignId}`)
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to create campaign:', error)
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
        required
      />
      <Textarea
        name="campaignBrief"
        placeholder="Campaign Brief"
        required
      />
      <div>
        <h3 className="mb-4 font-medium">Target Channels</h3>
        {channels.map((channel) => (
          <div key={channel.id} className="flex items-center space-x-2">
            <Checkbox id={channel.id} name="targetChannels" value={channel.id} />
            <label htmlFor={channel.id}>{channel.label}</label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Campaign'}
      </Button>
    </form>
  )
}