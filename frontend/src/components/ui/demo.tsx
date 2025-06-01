'use client'

import { SplineScene } from "@/components/ui/splite";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSplineLoader } from "@/hooks/useSplineLoader";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat"
import SpotlightCard from "@/components/ui/SpotlightCard";

export function SplineSceneBasic() {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const { onSplineLoad, onSplineError } = useSplineLoader();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-screen bg-black relative overflow-hidden flex flex-col md:flex-row pt-20">
        {/* Left Side - Content */}
        <div className="w-full md:w-2/5 flex flex-col justify-between px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
          {/* Top Section - Company Description */}
          <div className="max-w-lg pt-4 md:pt-8">
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              En AI WRAPPER convertimos la IA en ventaja competitiva.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              Hoy, la IA puede parecer opcional. Mañana será el estándar. Texto, imagen, audio o video: detrás de cada modelo hay una oportunidad de negocio esperando ser desbloqueada.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              Creamos ese puente entre lo técnico y lo tangible. Desde chatbots y agentes hasta plataformas SaaS, envolvemos IA con visión, estrategia y propósito.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 md:mb-12">
              Porque la IA no es un lujo. Es la arquitectura de los negocios que liderarán el mañana.
            </p>
            
            {/* CEO Info */}
            <div>
              <p className="text-white font-medium text-xl md:text-2xl">Pablo Luque</p>
              <p className="text-gray-500 text-base md:text-lg italic">Chief AI Architect & Founder</p>
            </div>
          </div>
          
          {/* Bottom Section - Main Title */}
          <div className="max-w-2xl mt-8 md:mt-0">
            <motion.h1 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <motion.div 
                className="mb-2 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span 
                  className="text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text font-normal"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                  }}
                >
                  Convierte la{" "}
                </span>
                <motion.span 
                  className="italic text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.3))"
                  }}
                >
                  IA
                </motion.span>
              </motion.div>
              <motion.div 
                className="whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span 
                  className="text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text font-normal"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                  }}
                >
                  en tu ventaja empresarial
                </span>
              </motion.div>
            </motion.h1>
          </div>
        </div>
        
        {/* Right Side - 3D Robot Animation (Responsive) */}
        <div className="w-full md:w-3/5 relative flex items-center justify-center md:justify-start md:-ml-12 h-96 md:h-full">
          <div className="w-full h-full relative">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
              className="w-full h-full scale-125 md:scale-125"
              onLoad={onSplineLoad}
              onError={onSplineError}
            />
            
            {/* Bottom fade to black gradient - Smoother transition */}
            <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-black via-black/80 via-black/40 to-transparent pointer-events-none"></div>
            
            {/* Connect Button - Solo visible en desktop */}
            <div className="hidden md:block absolute bottom-12 right-12">
              <button data-transform-button className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/20 group">
                <span className="text-sm font-medium">Transforma tu Negocio</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Button Flotante - Entre secciones solo para móvil */}
      <div className="md:hidden relative -mt-8 mb-8 flex justify-center px-6 z-10">
        <button data-transform-button className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/20 group w-full max-w-xs justify-center shadow-2xl">
          <span className="text-sm font-medium">Transforma tu Negocio</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* About Us Section */}
      <section ref={aboutRef} className="bg-black py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Statistics Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Years Experience */}
            <motion.div variants={cardVariants}>
              <SpotlightCard 
                className="group relative transition-all duration-500 hover:transform hover:-translate-y-2" 
                spotlightColor="rgba(168, 85, 247, 0.2)"
              >
                <div className="mb-4">
                  <span className="text-gray-400 text-sm md:text-base font-medium">Años de</span>
                  <br />
                  <span className="text-gray-400 text-sm md:text-base font-medium">Experiencia</span>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
                    5<span className="text-purple-400">+</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-white/10 hover:bg-white/20">
                    <svg className="w-4 h-4 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Completed Projects */}
            <motion.div variants={cardVariants}>
              <SpotlightCard 
                className="group relative transition-all duration-500 hover:transform hover:-translate-y-2" 
                spotlightColor="rgba(59, 130, 246, 0.2)"
              >
                <div className="mb-4">
                  <span className="text-gray-400 text-sm md:text-base font-medium">Proyectos</span>
                  <br />
                  <span className="text-gray-400 text-sm md:text-base font-medium">Completados</span>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
                    25<span className="text-blue-400">+</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-white/10 hover:bg-white/20">
                    <svg className="w-4 h-4 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Award Winning */}
            <motion.div variants={cardVariants}>
              <SpotlightCard 
                className="group relative transition-all duration-500 hover:transform hover:-translate-y-2" 
                spotlightColor="rgba(236, 72, 153, 0.2)"
              >
                <div className="mb-4">
                  <span className="text-gray-400 text-sm md:text-base font-medium">Soluciones</span>
                  <br />
                  <span className="text-gray-400 text-sm md:text-base font-medium">Exitosas</span>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
                    110<span className="text-pink-400">+</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-white/10 hover:bg-white/20">
                    <svg className="w-4 h-4 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Satisfied Clients */}
            <motion.div variants={cardVariants}>
              <SpotlightCard 
                className="group relative transition-all duration-500 hover:transform hover:-translate-y-2" 
                spotlightColor="rgba(34, 197, 94, 0.2)"
              >
                <div className="mb-4">
                  <span className="text-gray-400 text-sm md:text-base font-medium">Clientes</span>
                  <br />
                  <span className="text-gray-400 text-sm md:text-base font-medium">Satisfechos</span>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
                    4<span className="text-green-400">+</span>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-white/10 hover:bg-white/20">
                    <svg className="w-4 h-4 text-white transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <motion.div 
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl opacity-30"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 2, delay: 1 }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-30"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
        ></motion.div>
      </section>
    </>
  )
}

export function Demo() {
  return (
    <div className="flex w-screen overflow-x-hidden">
      <AnimatedAIChat />
    </div>
  );
} 