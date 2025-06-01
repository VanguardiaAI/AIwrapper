# 🔐 Configuración de Autenticación - Fase 1

Este documento explica cómo configurar la autenticación con Google OAuth para el chatbot de AI Wrapper Agency.

## 📋 Requisitos Previos

1. **Cuenta de Google Cloud Platform**
2. **MongoDB Atlas** (o instancia local de MongoDB)
3. **Python 3.8+** con las dependencias instaladas

## 🚀 Configuración Paso a Paso

### 1. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API** y **Google Identity API**
4. Ve a **Credenciales** > **Crear credenciales** > **ID de cliente OAuth 2.0**
5. Configura las URLs autorizadas:
   - **Orígenes autorizados**: `http://localhost:3000`
   - **URIs de redirección**: `http://localhost:3000/auth/callback`

### 2. Configurar MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un nuevo cluster
3. Configura un usuario de base de datos
4. Obtén la cadena de conexión

### 3. Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
# Configuración de Google OAuth
GOOGLE_CLIENT_ID=tu_google_client_id_aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui

# Configuración de JWT
JWT_SECRET_KEY=tu_jwt_secret_key_muy_seguro_aqui_min_32_caracteres

# Configuración de MongoDB
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/aiwrapper?retryWrites=true&w=majority

# Configuración de Flask
FLASK_ENV=development
FLASK_SECRET_KEY=tu_flask_secret_key_aqui

# URLs permitidas para CORS
FRONTEND_URL=http://localhost:3000
```

### 4. Instalar Dependencias

```bash
cd backend
pip install -r requirements.txt
```

### 5. Ejecutar el Servidor

```bash
python app.py
```

## 🔧 Endpoints de Autenticación

### POST `/auth/google`
Autentica un usuario con Google OAuth.

**Request:**
```json
{
  "token": "google_oauth_token_here"
}
```

**Response:**
```json
{
  "message": "Autenticación exitosa",
  "user": {
    "id": "google_user_id",
    "email": "user@example.com",
    "name": "Usuario Ejemplo",
    "picture": "https://..."
  },
  "token": "jwt_token_here",
  "expires_in": 3600
}
```

### GET `/auth/verify`
Verifica si un token JWT es válido.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

### POST `/auth/logout`
Cierra la sesión del usuario.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

### POST `/chatbot` (Requiere Autenticación)
Envía un mensaje al chatbot.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request:**
```json
{
  "message": "Hola, necesito ayuda con un proyecto"
}
```

## 🛡️ Seguridad

- Los tokens JWT expiran en 1 hora
- Las sesiones se almacenan en MongoDB
- Los tokens de Google se verifican con la API oficial
- Middleware de autenticación protege rutas sensibles

## 🔄 Próximos Pasos (Fase 2)

- Integración con LangGraph para el agente de IA
- Implementación de memoria conversacional
- Búsqueda vectorial con MongoDB Atlas

## 🐛 Troubleshooting

### Error: "Variables de entorno faltantes"
Asegúrate de que el archivo `.env` esté en la carpeta `backend/` y contenga todas las variables requeridas.

### Error: "Token de Google inválido"
Verifica que el `GOOGLE_CLIENT_ID` en el `.env` coincida con el configurado en Google Cloud Console.

### Error de conexión a MongoDB
Verifica que la URI de MongoDB sea correcta y que tu IP esté en la lista blanca de Atlas. 