"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { 
  Code, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Github, 
  Linkedin, 
  Twitter 
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/#about' },
  { name: 'Contact', path: '/#contact' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Code className="h-8 w-8" />
          </motion.div>
          <motion.span 
            className="font-bold text-xl"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            DevPortfolio
          </motion.span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <span>{item.name}</span>
              {pathname === item.path && (
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                  layoutId="navbar-indicator"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between pb-6">
                <Link href="/" className="flex items-center space-x-2">
                  <Code className="h-6 w-6" />
                  <span className="font-bold text-lg">DevPortfolio</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-6 text-lg">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    className={`${pathname === item.path ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-6 flex space-x-4">
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}