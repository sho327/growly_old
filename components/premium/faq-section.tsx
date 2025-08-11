"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FAQItem } from "@/components/premium/types"

interface FAQSectionProps {
  title: string
  items: FAQItem[]
}

export function FAQSection({ title, items }: FAQSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="space-y-2">
              <h4 className="font-semibold">{item.question}</h4>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </div>
            {index < items.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
