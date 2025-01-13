"use client"

import { Button } from "@/components/ui/button"

const navLinks = [
  { title: "Home", href: "#hero" },
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
  { title: "FAQ", href: "#faq" }
];

export function NavBar({
}: React.HTMLAttributes<HTMLElement>) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToAccess = () => {
    const element = document.getElementById('cta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_LOGIN_URL || '/login'
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex h-14 items-center">
          {/* Left - Logo */}
          <div className="w-[200px]">
            <a href="#" className="text-2xl font-extrabold">COMPANY</a>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.title}
                onClick={() => scrollToSection(link.href)}
                className="cursor-pointer text-sm font-medium transition-colors hover:text-primary"
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Right - Actions */}
          <div className="w-[200px] flex items-center justify-end gap-4">
            <Button variant="ghost" onClick={handleLogin}>Login</Button>
            <Button onClick={scrollToAccess}>Get Early Access</Button>
          </div>
        </div>
      </div>
    </header>
  )
}