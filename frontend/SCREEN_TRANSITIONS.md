# 🎬 Transiciones de Pantalla - Documentación

## 📖 Descripción General

Este proyecto implementa un sistema de transiciones fluidas entre pantallas usando Framer Motion. La funcionalidad permite navegar entre la pantalla principal (hero) y una pantalla de chatbot con animaciones suaves y profesionales.

## ✨ Características Principales

### 🎯 Navegación Intuitiva
- **Botón "Transform Your Business"**: Activa la transición al chatbot
- **Botón "Volver al inicio"**: Regresa a la pantalla principal
- **Tecla ESC**: Cierra el chatbot y regresa al hero
- **Click en backdrop**: Cierre alternativo haciendo click fuera del contenido

### 🎨 Animaciones Fluidas
- **Slide horizontal**: El chatbot se desliza desde la derecha
- **Spring animations**: Transiciones suaves y naturales
- **Backdrop blur**: Efecto de desenfoque profesional
- **Stagger animations**: Elementos aparecen de forma escalonada

### 📱 Diseño Responsivo
- **Móvil optimizado**: Funciona perfecto en dispositivos móviles
- **Touch friendly**: Botones y áreas de click optimizadas
- **Viewport management**: Controla el scroll del body automáticamente

## 🏗️ Arquitectura de Componentes

### `ScreenTransition` (Componente Principal)
```typescript
<ScreenTransition onTransformClick={handleClick} />
```
- Maneja el estado de la pantalla actual
- Controla las animaciones de transición
- Gestiona eventos de teclado y clicks

### `ChatbotScreen` (Pantalla del Chatbot)
- Interfaz placeholder para futuro chatbot
- Animaciones de entrada escalonadas
- Preview de funcionalidades futuras

### `SplineSceneBasic` (Hero con 3D)
- Mantiene el hero original con la escena 3D
- Botón integrado para activar transición

## 🎛️ Controles de Usuario

| Acción | Efecto |
|--------|--------|
| Click en "Transform Your Business" | Abre el chatbot con animación |
| Click en "Volver al inicio" | Cierra el chatbot |
| Presionar `ESC` | Cierra el chatbot |
| Click en área oscura (backdrop) | Cierra el chatbot |

## 🎪 Variantes de Animación

### Overlay Variants
```typescript
overlayVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
}
```

### Slide Variants
```typescript
slideVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" }
}
```

### Background Blur
```typescript
backgroundBlurVariants = {
  hidden: { backdropFilter: "blur(0px)" },
  visible: { backdropFilter: "blur(8px)" },
  exit: { backdropFilter: "blur(0px)" }
}
```

## 🚀 Uso en Producción

### Integración Básica
```tsx
import { ScreenTransition } from "@/components/ui/screen-transition";

export default function HomePage() {
  const handleTransformClick = () => {
    console.log('Transitioning to chatbot');
    // Analytics, logging, etc.
  };

  return (
    <ScreenTransition onTransformClick={handleTransformClick} />
  );
}
```

### Personalización
Para personalizar las transiciones, modifica las variantes en `screen-transition.tsx`:

```typescript
// Transición más rápida
const slideVariants = {
  visible: { 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 500,  // Más rígido = más rápido
      damping: 35      // Menos rebote
    }
  }
};
```

## 🔧 Configuración de Desarrollo

### Dependencias Requeridas
- `framer-motion`: ^12.12.1
- `react`: ^19.0.0
- `tailwindcss`: ^3.4.1

### Archivos Principales
```
src/
├── components/
│   └── ui/
│       ├── screen-transition.tsx    # Lógica principal
│       ├── chatbot-screen.tsx       # Pantalla del chatbot
│       └── demo.tsx                 # Hero con 3D (modificado)
└── app/
    └── page.tsx                     # Implementación
```

## 🎯 Próximas Mejoras

### Funcionalidades Planeadas
- [ ] **Chatbot Real**: Integración con IA
- [ ] **Múltiples Pantallas**: Sistema expandible
- [ ] **Historial de Navegación**: Back/forward
- [ ] **Deep Linking**: URLs para cada pantalla
- [ ] **Gestos**: Swipe en móviles
- [ ] **Preloading**: Carga anticipada de contenido

### Optimizaciones
- [ ] **Lazy Loading**: Carga diferida del chatbot
- [ ] **Memory Management**: Limpieza de recursos
- [ ] **Performance**: Optimización de re-renders

## 🐛 Solución de Problemas

### Problemas Comunes

**El botón no responde:**
- Verificar que el atributo `data-transform-button` esté presente
- Comprobar que el event listener esté funcionando

**Animaciones jerky:**
- Verificar que `will-change: transform` esté aplicado
- Reducir la complejidad de elementos animados

**Scroll no se restaura:**
- El cleanup effect debería restaurar `body.style.overflow`
- Verificar que el useEffect se ejecute correctamente

### Debug Mode
Para debug, añadir logs en las transiciones:

```typescript
const handleTransformClick = () => {
  console.log('Transition started:', { from: 'hero', to: 'chatbot' });
  setCurrentScreen('chatbot');
};
```

## 📝 Licencia y Créditos

Esta implementación utiliza:
- **Framer Motion** para las animaciones
- **TailwindCSS** para los estilos
- **React 19** con hooks modernos
- **TypeScript** para type safety

---

*Documentación actualizada: 2024* 