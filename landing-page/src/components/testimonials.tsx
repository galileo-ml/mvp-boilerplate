import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "CEO at TechCorp",
      content: "This product has transformed how we operate. The efficiency gains have been remarkable.",
      company: "TechCorp",
    },
    {
      name: "Sarah Smith",
      role: "Founder",
      content: "Implementing this solution was the best decision we made this year. Our team loves it.",
      company: "InnovateLabs",
    },
    {
      name: "Michael Brown",
      role: "CTO",
      content: "The features and support are unmatched. It's been a game-changer for our workflow.",
      company: "DevStack",
    },
  ]
  
  export function Testimonials() {
    return (
      <section className="container py-8 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="animate-fade-up text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl [animation-delay:200ms]">
            Trusted by Leaders
          </h2>
          <p className="animate-fade-up mt-4 mb-8 text-lg text-muted-foreground sm:text-xl [animation-delay:400ms]">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
  
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="animate-fade-up mx-auto w-full max-w-[64rem] [animation-delay:600ms]"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role} at {testimonial.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    )
  }