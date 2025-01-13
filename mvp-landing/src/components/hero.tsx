"use client"

import { Button } from "@/components/ui/button"

export function Hero({
}: React.HTMLAttributes<HTMLElement>) {
  const scrollToAccess = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative isolate px-6 pt-14 lg:px-8">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl py-12 sm:py-16 lg:py-20">
          <div className="text-center space-y-8 sm:space-y-12">
            <h1 className="animate-fade-up text-4xl font-bold tracking-tight sm:text-6xl [animation-delay:200ms]">
              Hero Title
            </h1>
            <p className="animate-fade-up text-lg leading-8 text-muted-foreground [animation-delay:400ms]">
              Hero Subtitle
            </p>
            <div className="animate-fade-up [animation-delay:600ms]">
              <Button 
                onClick={scrollToAccess}
                className="bg-black text-white hover:bg-black/90"
              >
                Request Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}