'use client'

import { useState, useEffect, useCallback } from 'react'

export function useSplineLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSplineReady, setIsSplineReady] = useState(false)

  // Función para marcar Spline como cargado
  const onSplineLoad = useCallback(() => {
    setIsSplineReady(true)
    // Transición inmediata sin delay
    setIsLoading(false)
  }, [])

  // Función para manejar errores de carga
  const onSplineError = useCallback(() => {
    console.warn('Error loading Spline scene, hiding loader anyway')
    setIsLoading(false)
  }, [])

  // Timeout de seguridad más agresivo
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Spline loading timeout, hiding loader')
        setIsLoading(false)
      }
    }, 2000) // Reducido a 2 segundos

    return () => clearTimeout(timeout)
  }, [isLoading])

  // Asegurar que la página esté en la parte superior cuando se monte el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])

  return {
    isLoading,
    isSplineReady,
    onSplineLoad,
    onSplineError
  }
} 