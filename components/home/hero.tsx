"use client"

import { useRef, RefObject } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { fadeInUp, fadeIn } from '@/lib/animations'

interface HeroProps {
  contactRef: RefObject<HTMLDivElement>
}

export function Hero({ contactRef }: HeroProps) {
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 dark:from-background dark:to-background/80 z-0" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Animated circles in background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.span 
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm"
            variants={fadeInUp(0.1, 0.6)}
            initial="hidden"
            animate="visible"
          >
            Full Stack Developer & UI/UX Enthusiast
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
            variants={fadeInUp(0.2, 0.6)}
            initial="hidden"
            animate="visible"
          >
            Crafting Digital
            <br />
            Experiences
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl text-xl md:text-2xl text-muted-foreground mb-8"
            variants={fadeInUp(0.3, 0.6)}
            initial="hidden"
            animate="visible"
          >
            Transforming ideas into elegant, scalable solutions
            through clean code and thoughtful design.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            variants={fadeInUp(0.4, 0.6)}
            initial="hidden"
            animate="visible"
          >
            <Button onClick={scrollToContact} size="lg" className="text-lg px-8">
              Let's Talk
            </Button>
            <Link href="/projects" passHref>
              <Button variant="outline" size="lg" className="text-lg px-8">
                View Projects
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="flex gap-4 mt-12"
            variants={fadeInUp(0.5, 0.6)}
            initial="hidden"
            animate="visible"
          >
            <Link href="https://github.com" target="_blank" passHref>
              <Button variant="ghost" size="icon" className="h-12 w-12" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </Button>
            </Link>
            <Link href="https://example.com" target="_blank" passHref>
              <Button variant="ghost" size="icon" className="h-12 w-12" aria-label="Portfolio">
                <ExternalLink className="h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        variants={fadeIn(1.2, 0.6)}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">Scroll down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}