import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  const cards = [
    {
      title: "Benefit 1",
      description: "Description of the first major Benefit or benefit your product offers.",
    },
    {
      title: "Benefit 2",
      description: "Description of the second major Benefit or benefit your product offers.",
    },
    {
      title: "Benefit 3",
      description: "Description of the third major Benefit or benefit your product offers.",
    },
  ]
  
  export function SectionCards() {
    return (
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Company Offers You
          </h2>
        </div>
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 grid gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {cards.map((section) => (
            <Card key={section.title} className="flex flex-col">
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