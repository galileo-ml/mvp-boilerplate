import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const tiers = [
  {
    name: "Pro",
    price: "$TBD",
    description: "Description",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ]
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="container py-8 md:py-12 lg:py-16">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that's right for you
        </p>
      </div>
      <div className={`mx-auto mt-8 grid max-w-screen-lg gap-4 place-items-center md:grid-cols-${tiers.length} lg:grid-cols-${tiers.length} md:gap-8`}>
        {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col w-full h-[420px] max-w-md">
            <CardHeader className="flex-none">
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="grid gap-2">
                {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {feature}
                    </li>
                ))}
                </ul>
                <Button 
                className="w-full mt-6"
                onClick={() => {
                    const element = document.getElementById('cta');
                    if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                >
                Request Access
                </Button>
            </CardContent>
            </Card>
        ))}
        </div>
    </section>
  )
}