import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { SectionCards } from "@/components/section-cards"

import './App.css'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <SectionCards />
      </main>
      <Footer />
    </div>
  )
}

export default App
