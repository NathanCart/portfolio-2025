"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/projects/project-card'
import { getAllProjects } from '@/lib/data'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function ProjectsPage() {
  const allProjects = getAllProjects()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(allProjects.flatMap(project => project.tags))
  ).sort()
  
  // Filter projects based on search term and selected tags
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => project.tags.includes(tag))
    
    return matchesSearch && matchesTags
  })
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1, 0.1)}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeInUp()}
          >
            My Projects
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            variants={fadeInUp(0.1)}
          >
            Explore my portfolio of projects showcasing my skills and experience
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={searchTerm === '' && selectedTags.length === 0}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by technology:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
        
        {filteredProjects.length > 0 ? (
          <motion.div
            variants={staggerContainer(0.05, 0.2)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                variants={fadeInUp(index * 0.05)}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}