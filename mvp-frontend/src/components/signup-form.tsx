'use client'

// import { useState } from "react"
// import { useRouter } from "next/navigation";
// import { signup } from "@/app/login/actions"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function SignupForm() {
  // const [error, setError] = useState<string | null>(null)
  // const router = useRouter()

  // async function onSubmit(formData: FormData) {
  //   try {
  //     await signup(formData)
  //     router.push('/')
  //   } catch (error) {
  //     console.log(error)
  //     setError('An error occurred during signup')
  //   }
  // }

  return (
    <div>Pending</div>
    // <Card className="mx-auto max-w-sm">
    //   <CardHeader>
    //     <CardTitle className="text-2xl">Create an account</CardTitle>
    //     <CardDescription>
    //       Enter your details below to create your account
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <form action={onSubmit} className="grid gap-4">
    //       <div className="grid gap-2">
    //         <Label htmlFor="name">Name</Label>
    //         <Input
    //           id="name"
    //           name="name"
    //           type="text"
    //           placeholder="John Doe"
    //           required
    //         />
    //       </div>
    //       <div className="grid gap-2">
    //         <Label htmlFor="email">Email</Label>
    //         <Input
    //           id="email"
    //           name="email"
    //           type="email"
    //           placeholder="m@example.com"
    //           required
    //         />
    //       </div>
    //       <div className="grid gap-2">
    //         <Label htmlFor="password">Password</Label>
    //         <Input
    //           id="password"
    //           name="password"
    //           type="password"
    //           required
    //         />
    //       </div>
    //       {error && (
    //         <p className="text-sm text-red-500 text-center">{error}</p>
    //       )}
    //       <Button type="submit" className="w-full">
    //         Sign up
    //       </Button>
    //     </form>
    //   </CardContent>
    // </Card>
  )
}