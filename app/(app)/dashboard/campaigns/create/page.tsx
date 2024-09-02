import { CampaignForm } from '../components/campaign-form'

export default function CreateCampaignPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
      <CampaignForm />
    </div>
  )
}