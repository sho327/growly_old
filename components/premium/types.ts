export interface PlanFeature {
  name: string
  included: boolean
  premium?: boolean
}

export interface Plan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: PlanFeature[]
  popular?: boolean
  current?: boolean
}

export interface PremiumFeature {
  icon: React.ReactNode
  title: string
  description: string
  bgColor: string
  iconColor: string
}

export interface FAQItem {
  question: string
  answer: string
}
