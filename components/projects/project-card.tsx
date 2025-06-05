"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Project } from '@/lib/data'
import { cardHover, imageHover } from '@/lib/animations'

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="h-full overflow-hidden rounded-lg bg-card shadow-sm border border-border/50"
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      <Link href={`/projects/${project.id}`} className="block h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <motion.div variants={imageHover}>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 p-4 flex items-end">
            <div className="w-full">
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="flex gap-3">
              {project.githubLink && (
                <Link href={project.githubLink} target="_blank" passHref>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="GitHub repository">
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {project.demoLink && (
                <Link href={project.demoLink} target="_blank" passHref>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Live demo">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}