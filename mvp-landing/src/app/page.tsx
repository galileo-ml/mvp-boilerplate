import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { SectionCards } from "@/components/section-cards"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { CallToAction } from "@/components/call-to-action"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 md:px-6">
        <div className="max-w-screen-xl mx-auto space-y-20">
          <Hero />
          <SectionCards />
          <Pricing />
          <FAQ />
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  )
}