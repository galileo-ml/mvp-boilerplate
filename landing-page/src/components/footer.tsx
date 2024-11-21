import { cn } from "@/lib/utils"

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
      <div className="container flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © Your Company Name 2024 All rights reserved.
        </p>
      </div>
    </footer>
  )
}