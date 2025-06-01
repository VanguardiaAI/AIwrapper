'use client'

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import SpotlightCard from "./SpotlightCard"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  imageUrl: string
  featured?: boolean
  status: "Completado" | "En Desarrollo" | "Prototipo"
  year: number
}

const ALL_PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "ChatBot Inteligente E-Commerce",
    description: "Sistema de IA conversacional que transforma la experiencia de compra online mediante GPT-4, aumentando las conversiones y satisfacción del cliente.",
    category: "E-Commerce AI",
    technologies: ["GPT-4", "Next.js", "Node.js", "PostgreSQL"],
    imageUrl: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=2670&auto=format&fit=crop",
    featured: true,
    status: "Completado",
    year: 2024
  },
  {
    id: "project-2", 
    title: "Sistema de Análisis Predictivo",
    description: "Plataforma de machine learning que anticipa tendencias de mercado y comportamiento del consumidor usando Claude AI para decisiones estratégicas.",
    category: "Fintech AI",
    technologies: ["Claude AI", "Python", "React", "AWS"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    featured: true,
    status: "Completado", 
    year: 2024
  },
  {
    id: "project-3",
    title: "Generador de Contenido IA",
    description: "Herramienta creativa que produce contenido personalizado y optimizado usando Gemini AI, revolucionando los flujos de trabajo de marketing digital.",
    category: "Marketing AI",
    technologies: ["Gemini AI", "Vue.js", "Express", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop",
    featured: true,
    status: "Completado",
    year: 2024
  },
  {
    id: "project-4",
    title: "Asistente Virtual Educativo",
    description: "Plataforma inteligente que personaliza el aprendizaje usando modelos de IA avanzados, adaptándose al ritmo y estilo de cada estudiante.",
    category: "EdTech AI",
    technologies: ["OpenAI", "React Native", "Firebase", "TensorFlow"],
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2670&auto=format&fit=crop",
    status: "Completado",
    year: 2024
  },
  {
    id: "project-5",
    title: "Detector de Fraudes Bancarios",
    description: "Sistema de detección en tiempo real que utiliza redes neuronales para identificar transacciones fraudulentas con 99.8% de precisión.",
    category: "Fintech AI",
    technologies: ["PyTorch", "Kafka", "Redis", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
    status: "Completado",
    year: 2023
  },
  {
    id: "project-6",
    title: "Optimizador de Rutas Logísticas",
    description: "IA que optimiza rutas de entrega en tiempo real considerando tráfico, clima y capacidad de vehículos, reduciendo costos en 35%.",
    category: "Logistics AI",
    technologies: ["Google AI", "Flutter", "GraphQL", "Kubernetes"],
    imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2670&auto=format&fit=crop",
    status: "Completado",
    year: 2023
  },
  {
    id: "project-7",
    title: "Generador de Código Automático",
    description: "Herramienta que convierte especificaciones naturales en código funcional usando Codex AI, acelerando el desarrollo 10x.",
    category: "DevTech AI",
    technologies: ["Codex", "TypeScript", "Electron", "SQLite"],
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2670&auto=format&fit=crop",
    status: "En Desarrollo",
    year: 2024
  },
  {
    id: "project-8",
    title: "Diagnóstico Médico Asistido",
    description: "Sistema de análisis de imágenes médicas que asiste a profesionales en diagnósticos precisos usando visión artificial avanzada.",
    category: "HealthTech AI",
    technologies: ["Computer Vision", "Django", "PostgreSQL", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2670&auto=format&fit=crop",
    status: "Prototipo",
    year: 2024
  },
  {
    id: "project-9",
    title: "Traductor de Lenguaje de Señas",
    description: "Aplicación que traduce lenguaje de señas a texto y voz en tiempo real, haciendo la comunicación más accesible e inclusiva.",
    category: "Accessibility AI",
    technologies: ["MediaPipe", "Swift", "Core ML", "Firebase"],
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2670&auto=format&fit=crop",
    status: "Completado",
    year: 2023
  },
  {
    id: "project-10",
    title: "Moderador de Contenido Inteligente",
    description: "Sistema automatizado que detecta y filtra contenido inapropiado en plataformas sociales usando NLP y análisis de sentimientos.",
    category: "Social Media AI",
    technologies: ["BERT", "React", "Node.js", "Redis"],
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2670&auto=format&fit=crop",
    status: "Completado",
    year: 2023
  },
  {
    id: "project-11",
    title: "Asistente de Inversiones IA",
    description: "Robo-advisor que analiza mercados financieros y recomienda inversiones personalizadas basadas en perfil de riesgo del usuario.",
    category: "Fintech AI",
    technologies: ["Quantitative Models", "Angular", "Spring Boot", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2670&auto=format&fit=crop",
    status: "En Desarrollo",
    year: 2024
  },
  {
    id: "project-12",
    title: "Optimizador de Recursos Agrícolas",
    description: "Plataforma IoT con IA que optimiza el uso de agua, fertilizantes y pesticidas en cultivos, incrementando productividad sostenible.",
    category: "AgriTech AI",
    technologies: ["IoT Sensors", "Machine Learning", "Svelte", "InfluxDB"],
    imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2670&auto=format&fit=crop",
    status: "Prototipo",
    year: 2024
  },
  {
    id: "project-13",
    title: "Compositor Musical con IA",
    description: "Herramienta creativa que genera composiciones musicales originales en diferentes estilos usando modelos generativos avanzados.",
    category: "Creative AI",
    technologies: ["Music Generation", "Web Audio API", "Python", "TensorFlow"],
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop",
    status: "Completado",
    year: 2023
  }
]

const PROJECTS_PER_PAGE = 6

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const statusColors = {
  "Completado": "bg-green-500/20 text-green-300 border-green-500/30",
  "En Desarrollo": "bg-blue-500/20 text-blue-300 border-blue-500/30", 
  "Prototipo": "bg-purple-500/20 text-purple-300 border-purple-500/30"
}

export function FullPortfolio() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  // Get unique categories
  const categories = ["Todos", ...Array.from(new Set(ALL_PROJECTS.map(p => p.category)))]
  
  // Filter projects by category
  const filteredProjects = selectedCategory === "Todos" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === selectedCategory)
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const currentProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE)

  // Reset page when changing category
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h5 className="text-xs uppercase tracking-wide text-neutral-400 mb-4">
            Portafolio Completo
          </h5>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Todos nuestros{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text font-normal">
              AI Wrappers
            </span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Explora la colección completa de nuestros productos de IA que han transformado empresas de diferentes industrias
          </p>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Project Count */}
          <motion.p 
            className="text-neutral-500 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Mostrando {currentProjects.length} de {filteredProjects.length} proyectos
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          key={`${selectedCategory}-${currentPage}`} // Re-animate on page/category change
        >
          {currentProjects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={cardVariants}
              className="h-full"
            >
              <SpotlightCard 
                className="group relative h-full transition-all duration-500 hover:transform hover:-translate-y-3 flex flex-col overflow-hidden" 
                spotlightColor="rgba(168, 85, 247, 0.1)"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full border ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2 py-1 text-xs bg-black/50 text-white rounded-full">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex-grow flex flex-col">
                  {/* Category */}
                  <span className="text-xs text-purple-400 font-medium mb-2 uppercase tracking-wide">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-neutral-800 text-neutral-300 rounded border border-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs text-neutral-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-auto py-2 px-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 rounded-lg hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-400/50 transition-all duration-300 text-sm font-medium group-hover:scale-105">
                    Ver Detalles
                  </button>
                </div>

                {/* Hover Effect Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="flex justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Anterior
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Siguiente
            </button>
          </motion.div>
        )}
      </div>

      {/* Background Decorative Elements */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 3, delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 3, delay: 1.3 }}
      />
    </section>
  )
} 