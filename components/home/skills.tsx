"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Monitor,
  Server,
  Database,
  CloudCog,
  Lightbulb,
  Code2
} from 'lucide-react'

import { fadeInUp, staggerContainer } from '@/lib/animations'
import { getSkillsByCategory } from '@/lib/data'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export function Skills() {
  const [selectedTab, setSelectedTab] = useState('frontend')
  
  const frontendSkills = getSkillsByCategory('frontend')
  const backendSkills = getSkillsByCategory('backend')
  const databaseSkills = getSkillsByCategory('database')
  const devopsSkills = getSkillsByCategory('devops')
  const otherSkills = getSkillsByCategory('other')
  
  const categoryIcons = {
    frontend: <Monitor className="h-5 w-5" />,
    backend: <Server className="h-5 w-5" />,
    database: <Database className="h-5 w-5" />,
    devops: <CloudCog className="h-5 w-5" />,
    other: <Lightbulb className="h-5 w-5" />
  }

  return (
    <section className="py-20">
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
            My Skills
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            variants={fadeInUp(0.1)}
          >
            Technologies and tools I work with
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp(0.2)}
          className="mb-12"
        >
          <Tabs defaultValue="frontend" className="w-full" onValueChange={setSelectedTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto">
                <TabsTrigger value="frontend" className="flex items-center gap-2">
                  {categoryIcons.frontend} Frontend
                </TabsTrigger>
                <TabsTrigger value="backend" className="flex items-center gap-2">
                  {categoryIcons.backend} Backend
                </TabsTrigger>
                <TabsTrigger value="database" className="flex items-center gap-2">
                  {categoryIcons.database} Database
                </TabsTrigger>
                <TabsTrigger value="devops" className="flex items-center gap-2">
                  {categoryIcons.devops} DevOps
                </TabsTrigger>
                <TabsTrigger value="other" className="flex items-center gap-2">
                  {categoryIcons.other} Other
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="frontend" className="mt-0">
              <SkillList skills={frontendSkills} />
            </TabsContent>
            <TabsContent value="backend" className="mt-0">
              <SkillList skills={backendSkills} />
            </TabsContent>
            <TabsContent value="database" className="mt-0">
              <SkillList skills={databaseSkills} />
            </TabsContent>
            <TabsContent value="devops" className="mt-0">
              <SkillList skills={devopsSkills} />
            </TabsContent>
            <TabsContent value="other" className="mt-0">
              <SkillList skills={otherSkills} />
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp(0.3)}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-muted p-4 rounded-full mb-6">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-medium">Always learning new technologies</span>
          </div>
          <p className="text-muted-foreground">
            In addition to my core skills, I&apos;m constantly exploring new technologies and frameworks to expand my knowledge and stay current with industry trends. I believe in lifelong learning and continuous improvement.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

interface SkillListProps {
  skills: {
    name: string;
    level: number;
  }[];
}

function SkillList({ skills }: SkillListProps) {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4"
      variants={staggerContainer(0.05, 0.1)}
      initial="hidden"
      animate="visible"
    >
      {skills.map((skill, index) => (
        <motion.div 
          key={skill.name} 
          variants={fadeInUp(index * 0.05)}
        >
          <Badge variant="secondary" className="text-base px-4 py-2">
            {skill.name}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  )
}