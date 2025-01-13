"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const cards = [
  {
    title: "AI Agents for Video Analysis",
    description: "AI Agents search thousands of channels to find content aligned with your creative interest",
  },
  {
    title: "AI Powered Insights",
    description: "Discover the latest trends of thumbnails and titles from popular videos on relevant channels",
  },
  {
    title: "Thumbnail Optimization",
    description: "Skip the manual research—let our AI handle it, delivering insights that highlight what’s popular now",
  },
]

export function SectionCards() {
  return (
    <section id="features" className="container py-8 md:py-12 lg:py-16">
      <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h2 className="animate-fade-up text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl [animation-delay:200ms]">
          What COMPANY Offers You
        </h2>
      </div>
      <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {cards.map((section, index) => (
          <Card 
            key={section.title} 
            className={`animate-fade-up flex flex-col [animation-delay:${(index + 2) * 200}ms]`}
          >
            <CardHeader>
              <CardTitle className="text-xl">{section.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {section.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1" />
          </Card>
        ))}
      </div>
    </section>
  )
}