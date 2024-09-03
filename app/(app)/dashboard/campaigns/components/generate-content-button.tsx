'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { generateCampaignContentAction } from '@/lib/actions/generate-campaign-content'

interface GenerateContentButtonProps {
    campaignId: number
  }
  
  export function GenerateContentButton({ campaignId }: GenerateContentButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
  
    async function handleGenerateContent() {
      setIsLoading(true)
      try {
        const result = await generateCampaignContentAction(campaignId)
        if (result.error) {
          console.error(result.error)
          // Handle error (e.g., show toast notification)
        } else {
          router.refresh()
        }
      } catch (error) {
        console.error('Failed to generate content:', error)
        // Handle error (e.g., show toast notification)
      } finally {
        setIsLoading(false)
      }
    }
  
    return (
      <Button onClick={handleGenerateContent} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Content'}
      </Button>
    )
  }