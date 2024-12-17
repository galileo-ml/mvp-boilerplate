import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CallToAction() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Replace these entry.X values with your actual Google Form field IDs
      const formData = new FormData()
      formData.append('entry.X', name)

      const formUrl = "formUrl";

      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors', // This is required for Google Forms
        body: formData
      })

      setSuccess(true)
      setName("")
      setEmail("")
      setChannel("")
      
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="cta" className="container py-16 md:py-20 lg:py-24">
      <Card className="mx-auto max-w-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Request Early Access</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert>
              <AlertDescription>
                Thanks for joining our waitlist! We'll be in touch soon.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Request Invite"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  )
}