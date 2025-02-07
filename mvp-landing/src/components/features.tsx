import Image from 'next/image'
import { cn } from '@/lib/utils'

// TODO: This page can be improved..
const features = [
  {
    title: "Title",
    description: "Description of Title",
    image: "/path/to/image.jpg",
    alt: "Alt desc"
  }
]

export function Features() {
    return (
      <section id="features" className="container space-y-24 py-8 md:py-12 lg:py-24">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={cn(
              "flex flex-col gap-8 items-center md:grid md:grid-cols-2 md:gap-12"
            )}
          >
            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {feature.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {feature.description}
              </p>
            </div>
  
            {/* Image/GIF */}
            <div className={cn(
              "flex items-center justify-center",
              index % 2 === 1 && "md:order-1"
            )}>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    )
  }