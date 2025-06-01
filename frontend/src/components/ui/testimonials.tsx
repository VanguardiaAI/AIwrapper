'use client'

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import SpotlightCard from "./SpotlightCard"
import { RainbowButton } from "./rainbow-button"

interface Testimonial {
  id: string
  name: string
  company: string
  position: string
  content: string
  rating: number
  avatar?: string
  projectType: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "María González",
    company: "TechStart",
    position: "CEO & Founder",
    content: "Transformamos nuestro e-commerce con su chatbot de GPT-4. Las conversiones aumentaron un 340% en el primer mes. El equipo no solo desarrolló la solución técnica, sino que nos acompañó en toda la estrategia de implementación.",
    rating: 5,
    projectType: "Chatbot E-Commerce"
  },
  {
    id: "testimonial-2", 
    name: "Carlos Mendoza",
    company: "FinanceAI Solutions",
    position: "CTO",
    content: "Su plataforma de análisis predictivo con Claude AI nos permite anticipar tendencias de mercado con 95% de precisión. La integración fue perfecta y el soporte post-lanzamiento excepcional. Definitivamente nuestros mejores partners tecnológicos.",
    rating: 5,
    projectType: "Análisis Predictivo"
  },
  {
    id: "testimonial-3",
    name: "Ana Rodríguez", 
    company: "Content Masters",
    position: "Marketing Director",
    content: "El generador de contenido con Gemini AI revolucionó nuestros flujos de trabajo. Ahora producimos contenido personalizado 10x más rápido sin perder calidad. El ROI fue evidente desde la primera semana de uso.",
    rating: 5,
    projectType: "Generador de Contenido"
  },
  {
    id: "testimonial-4",
    name: "Roberto Silva",
    company: "EduTech Innovations", 
    position: "Producto Manager",
    content: "Desarrollaron un asistente virtual educativo que transformó la experiencia de nuestros estudiantes. La IA comprende el contexto pedagógico perfectamente y se adapta al ritmo de cada alumno. Simplemente brillante.",
    rating: 5,
    projectType: "Asistente Educativo"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h5 className="text-xs uppercase tracking-wide text-neutral-400 mb-4">
            Testimonios
          </h5>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Lo que dicen nuestros{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text font-normal">
              clientes
            </span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Historias reales de empresas que transformaron sus negocios con nuestros AI Wrappers
          </p>
          
          {/* Rating Overview */}
          <motion.div 
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white text-lg font-medium">4.9</span>
            <span className="text-neutral-400 text-sm">(146 Reseñas)</span>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id} 
              variants={cardVariants}
              className="h-full"
            >
              <SpotlightCard 
                className="group relative h-full transition-all duration-500 hover:transform hover:-translate-y-2 flex flex-col" 
                spotlightColor="rgba(168, 85, 247, 0.15)"
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-neutral-300 text-base md:text-lg leading-relaxed mb-6 flex-grow">
                  "{testimonial.content}"
                </blockquote>

                {/* Project Type Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                    {testimonial.projectType}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Avatar Placeholder */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-neutral-400 text-xs md:text-sm">
                        {testimonial.position}
                      </p>
                      <p className="text-neutral-500 text-xs">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Quote Icon */}
                  <svg className="w-8 h-8 text-purple-400/30 flex-shrink-0" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-1.1.9-2 2-2s2 .9 2 2v-2c0-3.3-2.7-6-6-6zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-4c0-1.1.9-2 2-2s2 .9 2 2v-2c0-3.3-2.7-6-6-6z"/>
                  </svg>
                </div>

                {/* Hover Effect Button */}
                <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-white/10 hover:bg-white/20">
                  <svg className="w-4 h-4 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-neutral-400 text-lg mb-6">
            ¿Listo para ser nuestro próximo caso de éxito?
          </p>
          <RainbowButton className="text-lg px-8 py-4 h-auto">
            Comenzar mi Proyecto
          </RainbowButton>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl opacity-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 2, delay: 1.2 }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl opacity-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
    </section>
  )
} 