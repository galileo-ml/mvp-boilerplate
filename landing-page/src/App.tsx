import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { SectionCards } from "@/components/section-cards"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { CallToAction } from "@/components/call-to-action"

import './App.css'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <SectionCards />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default App