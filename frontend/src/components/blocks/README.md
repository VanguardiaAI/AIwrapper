# Componente Cards Stack

## Descripción
El componente `cards-stack` proporciona una experiencia de scroll interactiva donde las tarjetas se apilan de manera sticky mientras el usuario hace scroll. Es perfecto para mostrar procesos, portfolios o logros de manera visualmente atractiva.

## Archivos
- `frontend/src/components/ui/cards-stack.tsx` - Componente principal
- `frontend/src/components/blocks/cards-stack-demo.tsx` - Ejemplos de uso

## Componentes Incluidos

### ContainerScroll
Contenedor principal que maneja la perspectiva 3D para el efecto de apilamiento.

### CardSticky
Tarjeta individual que se comporta de manera sticky con animaciones.

## Props

### CardSticky Props
- `index: number` - Índice de la tarjeta (requerido)
- `incrementY?: number` - Incremento en el eje Y por tarjeta (default: 10)
- `incrementZ?: number` - Incremento en el eje Z por tarjeta (default: 10)
- Todas las props de `HTMLMotionProps<"div">`

## Ejemplos de Uso

### 1. Proceso de Desarrollo
```tsx
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack"

const Process = () => {
  return (
    <div className="container min-h-svh">
      <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
        {phases.map((phase, index) => (
          <CardSticky
            key={phase.id}
            index={index + 2}
            className="rounded-2xl border p-8"
          >
            <h2>{phase.title}</h2>
            <p>{phase.description}</p>
          </CardSticky>
        ))}
      </ContainerScroll>
    </div>
  )
}
```

### 2. Portfolio de Trabajos
```tsx
const Work = () => {
  return (
    <ContainerScroll className="min-h-[500vh] py-12">
      {projects.map((project, index) => (
        <CardSticky
          key={project.id}
          index={index}
          incrementY={60}
          incrementZ={5}
          className="border rounded-sm bg-indigo-950"
        >
          <h2>{project.title}</h2>
          <Image src={project.imageUrl} alt={project.title} />
        </CardSticky>
      ))}
    </ContainerScroll>
  )
}
```

### 3. Logros/Estadísticas
```tsx
const Achievements = () => {
  return (
    <ContainerScroll className="min-h-[400vh] place-items-center">
      {achievements.map((achievement, index) => (
        <CardSticky
          key={achievement.id}
          incrementY={20}
          index={index + 2}
          className="h-72 w-[420px] rounded-2xl p-8"
          style={{ background: achievement.bg }}
        >
          <h1>{achievement.title}</h1>
          <h3>{achievement.description}</h3>
        </CardSticky>
      ))}
    </ContainerScroll>
  )
}
```

## Dependencias Requeridas
- `motion` - Para las animaciones
- `@/lib/utils` - Para la función `cn`
- `react` - React
- `next/image` - Para optimización de imágenes (recomendado)

## Mejores Prácticas

1. **Altura del Contenedor**: Asegúrate de que el `ContainerScroll` tenga suficiente altura (ej. `min-h-[400vh]`) para que el efecto sticky funcione correctamente.

2. **Índices**: Usa índices apropiados para controlar el orden de apilamiento. Generalmente `index + 2` funciona bien.

3. **Incrementos**: Ajusta `incrementY` e `incrementZ` según el diseño deseado:
   - `incrementY`: Controla la separación vertical entre tarjetas
   - `incrementZ`: Controla la profundidad del efecto 3D

4. **Responsive**: El componente es responsive por defecto, pero puedes ajustar los valores de incremento para diferentes breakpoints.

5. **Rendimiento**: Para listas largas, considera implementar virtualización.

## Personalización

### Estilos
Puedes personalizar completamente los estilos usando Tailwind CSS:

```tsx
<CardSticky
  className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl"
  style={{ transform: 'rotate(2deg)' }}
>
  {/* contenido */}
</CardSticky>
```

### Animaciones
El componente usa `motion/react`, por lo que puedes agregar animaciones adicionales:

```tsx
<CardSticky
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  {/* contenido */}
</CardSticky>
```

## Solución de Problemas

1. **Las tarjetas no se apilan**: Verifica que el contenedor tenga suficiente altura
2. **Animaciones no funcionan**: Asegúrate de que `motion` esté instalado
3. **Efectos 3D no visibles**: Verifica que el contenedor tenga `perspective` aplicado
4. **Problemas de rendimiento**: Reduce el número de tarjetas o implementa lazy loading

## Compatibilidad
- ✅ Next.js 13+
- ✅ React 18+
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Motion/React 