'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SplineSceneBasic } from "./demo";
import { ChatbotScreen } from "./chatbot-screen";

type Screen = 'hero' | 'chatbot';

interface ScreenTransitionProps {
  onTransformClick?: () => void;
}

export function ScreenTransition({ onTransformClick }: ScreenTransitionProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('hero');

  const handleTransformClick = () => {
    setCurrentScreen('chatbot');
    onTransformClick?.();
    // Bloquear scroll del body cuando se abre el chatbot
    document.body.style.overflow = 'hidden';
  };

  const handleBackClick = () => {
    setCurrentScreen('hero');
    // Restaurar scroll del body
    document.body.style.overflow = 'unset';
  };

  // Soporte para tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && currentScreen === 'chatbot') {
        handleBackClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Cleanup: restaurar scroll si el componente se desmonta
      document.body.style.overflow = 'unset';
    };
  }, [currentScreen]);

  // Variantes de animación mejoradas
  const overlayVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideVariants = {
    hidden: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    exit: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const backgroundBlurVariants = {
    hidden: { 
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(0, 0, 0, 0)"
    },
    visible: { 
      backdropFilter: "blur(8px)",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    },
    exit: { 
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Contenedor para la pantalla hero - siempre visible */}
      <div className="relative w-full">
        <HeroScreenWithButton onTransformClick={handleTransformClick} />
      </div>

      {/* Overlay para la pantalla del chatbot - pantalla completa con animación */}
      <AnimatePresence mode="wait">
        {currentScreen === 'chatbot' && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            variants={backgroundBlurVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop clickeable para cerrar */}
            <motion.div
              className="absolute inset-0 bg-black/20 cursor-pointer"
              onClick={handleBackClick}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            
            {/* Contenido del chatbot que se desliza desde la derecha */}
            <motion.div
              className="relative w-full h-full bg-black"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ChatbotScreenWithButton onBackClick={handleBackClick} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Componente Hero modificado para manejar el click
function HeroScreenWithButton({ onTransformClick }: { onTransformClick: () => void }) {
  return (
    <div 
      className="w-full" 
      onClick={(e) => {
        // Solo activar si se hace click en el botón específico
        const target = e.target as HTMLElement;
        if (target.closest('[data-transform-button]')) {
          e.preventDefault();
          e.stopPropagation();
          onTransformClick();
        }
      }}
    >
      <SplineSceneBasic />
    </div>
  );
}

// Componente Chatbot modificado para manejar el click de regreso
function ChatbotScreenWithButton({ onBackClick }: { onBackClick: () => void }) {
  return (
    <div 
      className="w-full h-full"
      onClick={(e) => {
        // Solo activar si se hace click en el botón específico
        const target = e.target as HTMLElement;
        if (target.closest('[data-back-button]')) {
          e.preventDefault();
          e.stopPropagation();
          onBackClick();
        }
      }}
    >
      <ChatbotScreen />
    </div>
  );
} 