import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Hero({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
  
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address")
        return
      }
      
      setEmailError("")
      console.log("Waitlist signup:", email)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      if (emailError) {
        setEmailError("")
      }
    }
  
    return (
      <section className="relative isolate px-6 pt-14 lg:px-8">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Your compelling headline goes here
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                A clear and concise explanation of your product or service. Highlight the main benefit that sets you apart from competitors.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-md gap-x-4 mx-auto flex-col sm:flex-row">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Your work email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className={`${emailError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-500 text-left">{emailError}</p>
                  )}
                </div>
                <Button type="submit" className="bg-black text-white hover:bg-black/90 mt-2 sm:mt-0">
                  Join the waitlist
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
}