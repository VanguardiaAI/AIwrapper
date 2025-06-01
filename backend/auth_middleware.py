from functools import wraps
from flask import request, jsonify, g
from auth_service import AuthService
from mongodb_service import MongoDBService
import logging

logger = logging.getLogger(__name__)

def require_auth(f):
    """
    Decorador que requiere autenticación para acceder a una ruta
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Obtener el token del header Authorization
            auth_header = request.headers.get('Authorization')
            
            if not auth_header:
                return jsonify({
                    'error': 'Token de autorización requerido',
                    'code': 'MISSING_TOKEN'
                }), 401
            
            # Verificar formato del header (Bearer <token>)
            try:
                token_type, token = auth_header.split(' ')
                if token_type.lower() != 'bearer':
                    raise ValueError("Tipo de token inválido")
            except ValueError:
                return jsonify({
                    'error': 'Formato de autorización inválido. Use: Bearer <token>',
                    'code': 'INVALID_TOKEN_FORMAT'
                }), 401
            
            # Verificar el JWT token
            payload = AuthService.verify_jwt_token(token)
            if not payload:
                return jsonify({
                    'error': 'Token inválido o expirado',
                    'code': 'INVALID_TOKEN'
                }), 401
            
            # Verificar que el usuario existe en la base de datos
            db_service = MongoDBService()
            user = db_service.get_user_by_google_id(payload['user_id'])
            
            if not user:
                return jsonify({
                    'error': 'Usuario no encontrado',
                    'code': 'USER_NOT_FOUND'
                }), 401
            
            # Agregar información del usuario al contexto de la request
            g.current_user = {
                'user_id': payload['user_id'],
                'email': payload['email'],
                'name': payload['name'],
                'user_data': user
            }
            
            # Verificar si hay una sesión activa
            session = db_service.get_active_session(payload['user_id'])
            if session:
                g.current_session = session
            
            logger.info(f"Usuario autenticado: {payload['email']}")
            
            return f(*args, **kwargs)
            
        except Exception as e:
            logger.error(f"Error en middleware de autenticación: {str(e)}")
            return jsonify({
                'error': 'Error interno de autenticación',
                'code': 'AUTH_ERROR'
            }), 500
    
    return decorated_function

def optional_auth(f):
    """
    Decorador que permite autenticación opcional
    Si hay token, lo verifica, pero no es obligatorio
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            auth_header = request.headers.get('Authorization')
            
            if auth_header:
                try:
                    token_type, token = auth_header.split(' ')
                    if token_type.lower() == 'bearer':
                        payload = AuthService.verify_jwt_token(token)
                        
                        if payload:
                            db_service = MongoDBService()
                            user = db_service.get_user_by_google_id(payload['user_id'])
                            
                            if user:
                                g.current_user = {
                                    'user_id': payload['user_id'],
                                    'email': payload['email'],
                                    'name': payload['name'],
                                    'user_data': user
                                }
                                
                                session = db_service.get_active_session(payload['user_id'])
                                if session:
                                    g.current_session = session
                except:
                    # Si hay error en el token opcional, simplemente continuar sin autenticación
                    pass
            
            return f(*args, **kwargs)
            
        except Exception as e:
            logger.error(f"Error en middleware de autenticación opcional: {str(e)}")
            return f(*args, **kwargs)
    
    return decorated_function

def get_current_user():
    """
    Función helper para obtener el usuario actual desde el contexto
    """
    return getattr(g, 'current_user', None)

def get_current_session():
    """
    Función helper para obtener la sesión actual desde el contexto
    """
    return getattr(g, 'current_session', None)

def is_authenticated():
    """
    Función helper para verificar si el usuario está autenticado
    """
    return get_current_user() is not None 