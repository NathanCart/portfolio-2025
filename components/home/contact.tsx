"use client"

import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react'

import { fadeInUp, staggerContainer } from '@/lib/animations'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Contact() {
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
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            variants={fadeInUp(0.1)}
          >
            Have a project in mind or want to work together? Feel free to reach out through any of these channels.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.1, 0.1)}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a 
                      href="mailto:hello@example.com" 
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      hello@example.com
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a 
                      href="tel:+11234567890" 
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      (123) 456-7890
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Working Hours</h4>
                    <p className="text-muted-foreground">Mon-Fri: 9am - 6pm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h4 className="font-medium mb-2">Quick Response</h4>
              <p className="text-muted-foreground">
                I aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call directly.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Link href="https://github.com" target="_blank" passHref>
              <Button variant="outline" size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </Link>
            <Link href="https://linkedin.com" target="_blank" passHref>
              <Button variant="outline" size="lg" className="gap-2">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Button>
            </Link>
            <Link href="https://twitter.com" target="_blank" passHref>
              <Button variant="outline" size="lg" className="gap-2">
                <Twitter className="h-5 w-5" />
                Twitter
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}