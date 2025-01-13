'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormData {
  name: string
}

export function CallToAction() {
  const [formData, setFormData] = useState<FormData>({
    name: ""
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Perhaps we want to send an email or just save the data into supabase in some fashion.
    try {
      const form = new FormData()
      form.append('entry.X', formData.name)

      await fetch("formUrl", {
        method: 'POST',
        mode: 'no-cors',
        body: form
      })

      setSuccess(true)
      setFormData({ name: ""})
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="cta" className="container py-24 sm:py-32">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Get Early Access</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>Thanks for signing up! We&#39;ll be in touch soon.</AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Join Waitlist"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}