"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'

import { getAllTestimonials } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/animations'

export function Testimonials() {
  const testimonials = getAllTestimonials()
  const [activeIndex, setActiveIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 8000)

    return () => {
      resetTimeout()
    }
  }, [activeIndex, testimonials.length])

  const nextTestimonial = () => {
    resetTimeout()
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    resetTimeout()
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
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
            Client Testimonials
          </motion.h2>
          <motion.p 
            className="text-muted-foreground"
            variants={fadeInUp(0.1)}
          >
            What people say about working with me
          </motion.p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            className="absolute -top-6 left-0 md:left-10 text-primary opacity-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn(0.2, 0.5)}
          >
            <Quote className="h-16 w-16 md:h-24 md:w-24" />
          </motion.div>
          
          <div className="relative bg-card rounded-lg p-8 md:p-12 shadow-lg overflow-hidden z-10">
            <div className="flex flex-col items-center">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className={`text-center transition-opacity duration-500 absolute ${
                    index === activeIndex ? 'opacity-100 relative' : 'opacity-0'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={index === activeIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6">
                    <div className="relative h-20 w-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-background">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-xl font-bold">{testimonial.name}</h4>
                    <p className="text-muted-foreground">
                      {testimonial.position} at {testimonial.company}
                    </p>
                  </div>
                  
                  <p className="text-lg md:text-xl italic max-w-2xl mx-auto">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      resetTimeout()
                      setActiveIndex(index)
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                      index === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}