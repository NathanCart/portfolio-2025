"use client"

import { useRef } from 'react'
import { motion } from 'framer-motion'

import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Skills } from '@/components/home/skills'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { Testimonials } from '@/components/home/testimonials'
import { Contact } from '@/components/home/contact'
import { ScrollToTop } from '@/components/ui/scroll-to-top'

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Hero contactRef={contactRef} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div ref={aboutRef} id="about">
          <About />
        </div>
        
        <Skills />
        
        <FeaturedProjects />
        
        <Testimonials />
        
        <div ref={contactRef} id="contact">
          <Contact />
        </div>
      </motion.div>
      
      <ScrollToTop />
    </>
  )
}