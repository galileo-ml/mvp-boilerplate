import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

export function Footer({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        "border-t border-border/40 bg-background/95 py-6 supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      {/* Update this when you have your terms and privacy policy */}
      <div className="flex flex-col items-center justify-center space-y-2">
        {/* <div className="flex items-center justify-between w-full max-w-3xl"> */}
          {/* <Button asChild variant="link" className="h-auto p-0 text-muted-foreground text-sm">
            <Link href="/privacy">Privacy Policy</Link>
          </Button> */}
          <p className="text-sm text-muted-foreground">
            © COMPANY NAME 2025 All rights reserved.
          </p>
          {/* <Button asChild variant="link" className="h-auto p-0 text-muted-foreground text-sm">
            <Link href="/terms">Terms of Service</Link>
          </Button> */}
        {/* </div> */}
      </div>
    </footer>
  )
}