"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/projects/project-card'
import { getFeaturedProjects } from '@/lib/data'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects()

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.1, 0.1)}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={fadeInUp()}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            variants={fadeInUp(0.1)}
          >
            Some of my best work that showcase my skills and expertise
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={fadeInUp(index * 0.1)}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp(0.4)}
        >
          <Link href="/projects" passHref>
            <Button size="lg">
              View All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}