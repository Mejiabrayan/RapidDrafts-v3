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
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    
    try {
      await createCampaignAction(formData)
      router.push('/dashboard/campaigns')
      router.refresh()
    } catch (error) {
      console.error('Failed to create campaign:', error)
      // Handle error (e.g., show error message to user)
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
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Campaign'}
      </Button>
    </form>
  )
}