'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export function SplineScene({ scene, className, onLoad, onError }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Cargando...</span>
          </span>
        </div>
      }
    >
      <Spline 
        scene={scene} 
        className={className}
        onLoad={onLoad}
        onError={onError}
      />
    </Suspense>
  )
} 