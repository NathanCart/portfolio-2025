"use client"

import { motion } from 'framer-motion'
import { BookText, Code2, GraduationCap, Briefcase } from 'lucide-react'

import { experiences } from '@/lib/data'
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from '@/lib/animations'
import { format } from 'date-fns'

export function About() {
  return (
    <div className="py-20 bg-muted/30">
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
            About Me
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            variants={fadeInUp(0.1)}
          >
            My journey, experience, and approach to development
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft()}
            className="relative"
          >
            {/* Code window mockup */}
            <div className="relative rounded-lg overflow-hidden bg-card border border-border/50 shadow-2xl">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-muted-foreground ml-2">about.tsx</div>
              </div>
              
              {/* Code content */}
              <div className="p-6 font-mono text-sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-blue-500">class <span className="text-green-500">Developer</span> {'{'}</div>
                  <div className="pl-4">
                    <span className="text-purple-500">constructor</span>() {'{'}
                    <div className="pl-4">
                      this.name = <span className="text-orange-500">"John Doe"</span>;
                      <br />
                      this.role = <span className="text-orange-500">"Full Stack Developer"</span>;
                      <br />
                      this.passions = [<span className="text-orange-500">"Web Development"</span>, <span className="text-orange-500">"UI/UX"</span>, <span className=\"text-orange-500">\"Problem Solving"</span>];
                    </div>
                    {'}'}
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-500">code</span>() {'{'}
                    <div className="pl-4">
                      return <span className="text-orange-500">"Clean and efficient solutions"</span>;
                    </div>
                    {'}'}
                  </div>
                  <div>{'}'}</div>
                </motion.div>
              </div>
              
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-lg blur-2xl" />
            <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight()}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Hello there!</h3>
            <p className="text-muted-foreground">
              I&apos;m a passionate full-stack developer with a strong focus on creating elegant, efficient, and user-friendly web applications. With several years of experience in the industry, I&apos;ve had the opportunity to work on diverse projects that have sharpened my skills across the entire development stack.
            </p>
            <p className="text-muted-foreground">
              My approach combines technical expertise with creative problem-solving. I believe in writing clean, maintainable code and staying up-to-date with the latest technologies and best practices in web development.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3">
                <Code2 className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Development</h4>
                  <p className="text-sm text-muted-foreground">Full stack web and application development</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BookText className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Learning</h4>
                  <p className="text-sm text-muted-foreground">Continuous learning and improvement</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <GraduationCap className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-sm text-muted-foreground">B.S. in Computer Science</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Briefcase className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-sm text-muted-foreground">6+ years professional experience</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Career Timeline */}
        <motion.div 
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.1)}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-10 text-center"
            variants={fadeInUp()}
          >
            My Journey
          </motion.h3>
          
          <div className="relative border-l border-muted pl-6 ml-6 md:ml-12 space-y-12">
            {experiences.map((experience, index) => (
              <motion.div 
                key={index}
                className="relative"
                variants={fadeInUp(index * 0.1)}
              >
                <span className="absolute -left-[31px] flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                  <span className="w-3 h-3 bg-background rounded-full"></span>
                </span>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <time className="text-sm font-medium text-muted-foreground">
                    {format(experience.startDate, 'MMM yyyy')} — {experience.endDate ? format(experience.endDate, 'MMM yyyy') : 'Present'}
                  </time>
                  <h4 className="text-xl font-bold mt-2">{experience.position}</h4>
                  <h5 className="text-muted-foreground mb-3">{experience.company}</h5>
                  <p className="text-muted-foreground mb-3">{experience.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {experience.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}