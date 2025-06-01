import jwt
import requests
from datetime import datetime, timedelta
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from flask import current_app
from config import Config
import logging

logger = logging.getLogger(__name__)

class AuthService:
    """Servicio para manejar autenticación con Google OAuth y JWT"""
    
    @staticmethod
    def verify_google_token(token):
        """
        Verifica el token de Google OAuth y extrae la información del usuario
        """
        try:
            # Verificar el token con Google
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(), 
                Config.GOOGLE_CLIENT_ID
            )
            
            # Verificar que el token sea para nuestra aplicación
            if idinfo['aud'] != Config.GOOGLE_CLIENT_ID:
                raise ValueError('Token inválido: audiencia incorrecta')
            
            # Extraer información del usuario
            user_info = {
                'google_id': idinfo['sub'],
                'email': idinfo['email'],
                'name': idinfo['name'],
                'picture': idinfo.get('picture', ''),
                'email_verified': idinfo.get('email_verified', False)
            }
            
            logger.info(f"Usuario autenticado: {user_info['email']}")
            return user_info
            
        except ValueError as e:
            logger.error(f"Error verificando token de Google: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Error inesperado en verificación: {str(e)}")
            return None
    
    @staticmethod
    def generate_jwt_token(user_info):
        """
        Genera un JWT token para el usuario autenticado
        """
        try:
            payload = {
                'user_id': user_info['google_id'],
                'email': user_info['email'],
                'name': user_info['name'],
                'exp': datetime.utcnow() + timedelta(seconds=Config.JWT_ACCESS_TOKEN_EXPIRES),
                'iat': datetime.utcnow()
            }
            
            token = jwt.encode(
                payload, 
                Config.JWT_SECRET_KEY, 
                algorithm='HS256'
            )
            
            return token
            
        except Exception as e:
            logger.error(f"Error generando JWT: {str(e)}")
            return None
    
    @staticmethod
    def verify_jwt_token(token):
        """
        Verifica y decodifica un JWT token
        """
        try:
            payload = jwt.decode(
                token, 
                Config.JWT_SECRET_KEY, 
                algorithms=['HS256']
            )
            return payload
            
        except jwt.ExpiredSignatureError:
            logger.warning("Token JWT expirado")
            return None
        except jwt.InvalidTokenError as e:
            logger.warning(f"Token JWT inválido: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Error verificando JWT: {str(e)}")
            return None
    
    @staticmethod
    def refresh_token(old_token):
        """
        Refresca un JWT token si está próximo a expirar
        """
        try:
            payload = AuthService.verify_jwt_token(old_token)
            if not payload:
                return None
            
            # Verificar si el token expira en los próximos 10 minutos
            exp_time = datetime.fromtimestamp(payload['exp'])
            if exp_time - datetime.utcnow() > timedelta(minutes=10):
                return old_token  # Token aún válido por más tiempo
            
            # Generar nuevo token
            user_info = {
                'google_id': payload['user_id'],
                'email': payload['email'],
                'name': payload['name']
            }
            
            return AuthService.generate_jwt_token(user_info)
            
        except Exception as e:
            logger.error(f"Error refrescando token: {str(e)}")
            return None 