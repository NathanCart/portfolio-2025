"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Github, ExternalLink, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { marked } from 'marked'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/projects/project-card'
import { getProjectById, getAllProjects, Project } from '@/lib/data'
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  useEffect(() => {
    if (params.id) {
      const foundProject = getProjectById(params.id as string)
      
      if (foundProject) {
        setProject(foundProject)
        
        // Find related projects that share at least one tag
        const related = getAllProjects()
          .filter(p => 
            p.id !== foundProject.id && 
            p.tags.some(tag => foundProject.tags.includes(tag))
          )
          .slice(0, 3)
        
        setRelatedProjects(related)
      } else {
        // Project not found, redirect to projects page
        router.push('/projects')
      }
    }
  }, [params.id, router])
  
  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Parse markdown content
  const parsedContent = marked(project.content)

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1, 0.1)}
          className="mb-12"
        >
          <motion.div variants={fadeInUp(0)} className="mb-8">
            <Link href="/projects" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp(0.1)}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {project.title}
          </motion.h1>
          
          <motion.div 
            variants={fadeInUp(0.2)}
            className="flex flex-wrap gap-2 mb-6"
          >
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </motion.div>
          
          <motion.div 
            variants={fadeInUp(0.3)}
            className="flex items-center text-muted-foreground mb-8"
          >
            <Calendar className="h-4 w-4 mr-2" />
            <time dateTime={project.publishedAt.toISOString()}>
              {format(project.publishedAt, 'MMMM d, yyyy')}
            </time>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
              <Image
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>
            
            {project.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mb-8">
                {project.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative aspect-video rounded-md overflow-hidden cursor-pointer transition-all ${
                      index === currentImageIndex ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div 
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-card rounded-lg p-6 border border-border/50 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4">Project Details</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Project Summary</h3>
                  <p>{project.summary}</p>
                </div>
                
                {(project.demoLink || project.githubLink) && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Project Links</h3>
                    <div className="flex gap-3">
                      {project.demoLink && (
                        <Link href={project.demoLink} target="_blank" passHref>
                          <Button className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Button>
                        </Link>
                      )}
                      {project.githubLink && (
                        <Link href={project.githubLink} target="_blank" passHref>
                          <Button variant="outline" className="w-full">
                            <Github className="h-4 w-4 mr-2" />
                            Repository
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {relatedProjects.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.1, 0.1)}
          >
            <motion.h2 
              className="text-2xl font-bold mb-8"
              variants={fadeInUp()}
            >
              Related Projects
            </motion.h2>
            
            <motion.div
              variants={staggerContainer(0.05, 0.2)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {relatedProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  variants={fadeInUp(index * 0.05)}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}