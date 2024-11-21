import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function NavBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="font-inter font-semibold text-xl">
            Your Company Name
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-medium">
              Login
            </Button>
            <Button className="bg-black text-white hover:bg-black/90">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}