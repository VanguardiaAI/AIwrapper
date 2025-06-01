from flask import Flask, request, jsonify, g
from flask_cors import CORS
import logging
from datetime import datetime
import os

# Importar servicios de autenticación
from config import Config
from auth_service import AuthService
from mongodb_service import MongoDBService
from auth_middleware import require_auth, optional_auth, get_current_user

app = Flask(__name__)

# Configurar la aplicación
app.config.from_object(Config)
CORS(app, origins=[Config.FRONTEND_URL])

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar servicios
try:
    db_service = MongoDBService()
    logger.info("Servicios inicializados correctamente")
except Exception as e:
    logger.error(f"Error inicializando servicios: {str(e)}")
    db_service = None

# Almacenamiento temporal para formularios (en producción usar base de datos)
form_submissions = []

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint para verificar el estado del servidor"""
    return jsonify({
        "status": "ok", 
        "message": "Servidor Flask funcionando correctamente",
        "mongodb_connected": db_service is not None,
        "timestamp": datetime.utcnow().isoformat()
    }), 200

@app.route('/auth/google', methods=['POST'])
def google_auth():
    """Endpoint para autenticación con Google OAuth"""
    try:
        data = request.json
        google_token = data.get('token')
        
        if not google_token:
            return jsonify({"error": "Token de Google requerido"}), 400
        
        # Verificar el token de Google
        user_info = AuthService.verify_google_token(google_token)
        if not user_info:
            return jsonify({"error": "Token de Google inválido"}), 401
        
        # Crear o actualizar usuario en MongoDB
        if db_service:
            user = db_service.create_or_update_user(user_info)
            if not user:
                return jsonify({"error": "Error creando usuario"}), 500
        
        # Generar JWT token
        jwt_token = AuthService.generate_jwt_token(user_info)
        if not jwt_token:
            return jsonify({"error": "Error generando token de sesión"}), 500
        
        # Crear sesión en MongoDB
        if db_service:
            session_id = db_service.create_session(user_info['google_id'], jwt_token)
        
        response_data = {
            "message": "Autenticación exitosa",
            "user": {
                "id": user_info['google_id'],
                "email": user_info['email'],
                "name": user_info['name'],
                "picture": user_info.get('picture', '')
            },
            "token": jwt_token,
            "expires_in": Config.JWT_ACCESS_TOKEN_EXPIRES
        }
        
        logger.info(f"Usuario autenticado exitosamente: {user_info['email']}")
        return jsonify(response_data), 200
        
    except Exception as e:
        logger.error(f"Error en autenticación: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

@app.route('/auth/verify', methods=['GET'])
@require_auth
def verify_token():
    """Endpoint para verificar si un token JWT es válido"""
    try:
        user = get_current_user()
        return jsonify({
            "valid": True,
            "user": {
                "id": user['user_id'],
                "email": user['email'],
                "name": user['name']
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Error verificando token: {str(e)}")
        return jsonify({"error": "Error verificando token"}), 500

@app.route('/auth/logout', methods=['POST'])
@require_auth
def logout():
    """Endpoint para cerrar sesión"""
    try:
        user = get_current_user()
        
        # Invalidar sesión en MongoDB si existe
        if db_service and hasattr(g, 'current_session'):
            session = g.current_session
            db_service.invalidate_session(session['_id'])
        
        logger.info(f"Usuario cerró sesión: {user['email']}")
        return jsonify({"message": "Sesión cerrada exitosamente"}), 200
        
    except Exception as e:
        logger.error(f"Error cerrando sesión: {str(e)}")
        return jsonify({"error": "Error cerrando sesión"}), 500

@app.route('/submit-form', methods=['POST'])
@optional_auth
def submit_form():
    """Endpoint para manejar envíos de formularios de contacto"""
    try:
        data = request.json
        
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400
        
        # Validar campos requeridos
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({"error": f"El campo '{field}' es requerido"}), 400
        
        # Agregar información del usuario autenticado si existe
        user = get_current_user()
        submission = {
            'id': len(form_submissions) + 1,
            'name': data['name'],
            'email': data['email'],
            'message': data['message'],
            'company': data.get('company', ''),
            'phone': data.get('phone', ''),
            'service_type': data.get('service_type', ''),
            'timestamp': datetime.now().isoformat(),
            'authenticated_user': user['user_id'] if user else None
        }
        
        form_submissions.append(submission)
        
        logger.info(f"Nuevo formulario recibido de: {data['email']}")
        
        return jsonify({
            "message": "¡Formulario recibido exitosamente!",
            "id": submission['id'],
            "status": "success"
        }), 200
        
    except Exception as e:
        logger.error(f"Error procesando formulario: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500

@app.route('/get-submissions', methods=['GET'])
@require_auth
def get_submissions():
    """Endpoint para obtener todas las consultas (para admin)"""
    return jsonify({
        "submissions": form_submissions,
        "total": len(form_submissions)
    }), 200

@app.route('/chatbot', methods=['POST'])
@require_auth
def chatbot():
    """Endpoint para el chatbot - REQUIERE AUTENTICACIÓN"""
    try:
        data = request.json
        message = data.get('message', '')
        
        if not message:
            return jsonify({"error": "Mensaje requerido"}), 400
        
        user = get_current_user()
        
        # Guardar mensaje del usuario en MongoDB
        if db_service:
            db_service.save_chat_message(user['user_id'], message, 'user')
        
        # Aquí se integrará la lógica del chatbot con LangGraph
        # Por ahora, respuesta simulada
        bot_response = f"Hola {user['name']}, gracias por tu mensaje: '{message}'. Pronto integraremos un chatbot inteligente aquí."
        
        # Guardar respuesta del bot en MongoDB
        if db_service:
            db_service.save_chat_message(user['user_id'], bot_response, 'bot')
        
        response = {
            "message": bot_response,
            "timestamp": datetime.now().isoformat(),
            "type": "bot_response",
            "user_id": user['user_id']
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Error en chatbot: {str(e)}")
        return jsonify({"error": "Error en el chatbot"}), 500

@app.route('/chat/history', methods=['GET'])
@require_auth
def get_chat_history():
    """Endpoint para obtener el historial de chat del usuario"""
    try:
        user = get_current_user()
        limit = request.args.get('limit', 50, type=int)
        
        if db_service:
            history = db_service.get_chat_history(user['user_id'], limit)
            return jsonify({
                "history": history,
                "total": len(history)
            }), 200
        else:
            return jsonify({"history": [], "total": 0}), 200
        
    except Exception as e:
        logger.error(f"Error obteniendo historial: {str(e)}")
        return jsonify({"error": "Error obteniendo historial"}), 500

if __name__ == "__main__":
    print("🚀 Iniciando servidor Flask para AI Wrapper Agency...")
    print("📍 Servidor disponible en: http://localhost:5000")
    print("📋 Endpoints disponibles:")
    print("   - GET  /health              - Estado del servidor")
    print("   - POST /auth/google         - Autenticación con Google")
    print("   - GET  /auth/verify         - Verificar token JWT")
    print("   - POST /auth/logout         - Cerrar sesión")
    print("   - POST /submit-form         - Envío de formularios")
    print("   - GET  /get-submissions     - Obtener consultas (requiere auth)")
    print("   - POST /chatbot             - Chatbot (requiere auth)")
    print("   - GET  /chat/history        - Historial de chat (requiere auth)")
    
    # Validar configuración antes de iniciar
    try:
        Config.validate_config()
        print("✅ Configuración validada correctamente")
    except ValueError as e:
        print(f"❌ Error en configuración: {e}")
        print("📝 Crea un archivo .env con las variables necesarias")
    
    app.run(host='0.0.0.0', port=5000, debug=True) 