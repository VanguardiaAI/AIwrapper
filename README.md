# 🚀 AI Wrapper Agency - Proyecto Full Stack

Una agencia web especializada en la construcción de **AI Wrappers** - aplicaciones, productos SaaS y herramientas que envuelven modelos de IA potentes en servicios comercialmente valiosos.

## 📋 Tabla de Contenidos

- [🎯 Características](#-características)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🚀 Cómo Ejecutar](#-cómo-ejecutar)
- [🌐 Endpoints de la API](#-endpoints-de-la-api)
- [🎨 Componentes](#-componentes)
- [📝 Funcionalidades Futuras](#-funcionalidades-futuras)

## 🎯 Características

✅ **Frontend Moderno**
- Landing page con diseño oscuro y elegante
- Sección hero con modelo 3D interactivo (Spline)
- Formulario de contacto completo y funcional
- Diseño responsivo y optimizado

✅ **Backend Robusto**
- API Flask para manejo de formularios
- Validación de datos y manejo de errores
- Endpoints preparados para chatbot futuro
- CORS configurado para desarrollo

✅ **Integración 3D**
- Modelos 3D interactivos con Spline
- Componentes optimizados con lazy loading
- Efectos visuales modernos (Spotlight, gradientes)

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **shadcn/ui** - Biblioteca de componentes UI
- **Spline** - Modelos 3D interactivos
- **Framer Motion** - Animaciones (preparado)

### Backend
- **Flask 3.1** - Framework web de Python
- **Flask-CORS** - Manejo de CORS
- **Python 3.11+** - Lenguaje de programación

## 📁 Estructura del Proyecto

```
aiWrapper.ai/
├── ai-wrapper-agency/          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css     # Estilos globales
│   │   │   ├── layout.tsx      # Layout principal
│   │   │   └── page.tsx        # Página principal
│   │   ├── components/ui/
│   │   │   ├── button.tsx      # Componente botón
│   │   │   ├── card.tsx        # Componente tarjeta
│   │   │   ├── contact-form.tsx # Formulario de contacto
│   │   │   ├── demo.tsx        # Componente demo con 3D
│   │   │   ├── input.tsx       # Componente input
│   │   │   ├── splite.tsx      # Integración con Spline
│   │   │   ├── spotlight.tsx   # Efecto de iluminación
│   │   │   └── textarea.tsx    # Componente textarea
│   │   └── lib/
│   │       └── utils.ts        # Utilidades y helpers
│   ├── package.json
│   └── ...configuraciones
└── backend/                    # Backend (Flask)
    ├── app.py                  # Aplicación Flask principal
    ├── requirements.txt        # Dependencias Python
    └── venv/                   # Entorno virtual
```

## ⚡ Instalación y Configuración

### Prerrequisitos
- **Node.js 18+** y npm
- **Python 3.11+** y pip
- **Git**

### 1. Clonar el Repositorio
```bash
git clone <url-del-repo>
cd aiWrapper.ai
```

### 2. Configurar el Frontend
```bash
cd ai-wrapper-agency
npm install --legacy-peer-deps
```

### 3. Configurar el Backend
```bash
cd ../backend
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

## 🚀 Cómo Ejecutar

### 1. Iniciar el Backend (Terminal 1)
```bash
cd backend
.\venv\Scripts\Activate.ps1  # Windows
# source venv/bin/activate    # Linux/Mac
python app.py
```
El backend estará disponible en: `http://localhost:5000`

### 2. Iniciar el Frontend (Terminal 2)
```bash
cd ai-wrapper-agency
npm run dev
```
El frontend estará disponible en: `http://localhost:3000`

### 3. Build para Producción
```bash
cd ai-wrapper-agency
npm run build
npm start
```

## 🌐 Endpoints de la API

### Backend Flask (Puerto 5000)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Estado del servidor |
| POST | `/submit-form` | Envío de formularios de contacto |
| GET | `/get-submissions` | Obtener todas las consultas (admin) |
| POST | `/chatbot` | Chatbot (preparado para futuro) |

#### Ejemplo de uso del formulario:
```bash
curl -X POST http://localhost:5000/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "message": "Necesito un chatbot para mi empresa",
    "company": "Mi Empresa",
    "phone": "+1234567890",
    "service_type": "chatbot"
  }'
```

## 🎨 Componentes

### Frontend Components

#### `SplineSceneBasic`
- Sección hero con modelo 3D de Spline
- Efecto Spotlight para iluminación
- Texto introductorio sobre AI Wrappers

#### `ContactForm`
- Formulario completo de contacto
- Validación en frontend y backend
- Estados de carga y respuesta
- Tipos de servicio preseleccionados

#### `Spotlight`
- Efecto de iluminación SVG
- Animación de pulsado
- Personalizable (color, posición)

## 🔧 Configuración Adicional

### Variables de Entorno (Futuras)
Crear `.env.local` en el frontend:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Crear `.env` en el backend:
```
FLASK_ENV=development
OPENAI_API_KEY=tu_clave_aqui  # Para chatbot futuro
```

## 📝 Funcionalidades Futuras

### Próximas Implementaciones
- 🤖 **Chatbot Inteligente** con OpenAI API
- 📊 **Dashboard de Admin** para gestionar consultas
- 🔐 **Autenticación** y autorización
- 📧 **Notificaciones por Email** automáticas
- 🎨 **Más Modelos 3D** y animaciones
- 📱 **PWA Support** para aplicación móvil
- 🌍 **Internacionalización** (i18n)
- 📈 **Analytics** y métricas

### Integración de Chatbot
```python
# En backend/app.py - implementación futura
import openai

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": data['message']}]
    )
    return jsonify({"response": response.choices[0].message.content})
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Proyecto bajo licencia MIT. Ver `LICENSE` para más información.

## 🆘 Soporte

¿Tienes problemas? 
- 📧 Email: soporte@aiwrapper.ai
- 💬 Discord: [Únete a nuestro servidor]()
- 🐛 Issues: [Reportar bugs](issues)

---

**🚀 Desarrollado con ❤️ para potenciar el futuro de la IA** 