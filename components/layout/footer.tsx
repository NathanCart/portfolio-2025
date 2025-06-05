import Link from 'next/link'
import { Code, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6" />
              <span className="font-bold text-lg">DevPortfolio</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A passionate full-stack developer creating elegant solutions to complex problems
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
              <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Connect</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</Link>
              <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</Link>
              <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</Link>
              <Link href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors">hello@example.com</Link>
            </nav>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t text-sm text-muted-foreground">
          <p>&copy; {currentYear} DevPortfolio. All rights reserved.</p>
          <p className="flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}