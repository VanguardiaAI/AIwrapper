from pymongo import MongoClient
from datetime import datetime, timedelta
from config import Config
import logging

logger = logging.getLogger(__name__)

class MongoDBService:
    """Servicio para manejar operaciones con MongoDB"""
    
    def __init__(self):
        try:
            self.client = MongoClient(Config.MONGODB_URI)
            self.db = self.client.aiwrapper
            
            # Colecciones
            self.users = self.db.users
            self.sessions = self.db.sessions
            self.chat_history = self.db.chat_history
            
            # Crear índices para optimizar consultas
            self._create_indexes()
            
            logger.info("Conexión a MongoDB establecida exitosamente")
            
        except Exception as e:
            logger.error(f"Error conectando a MongoDB: {str(e)}")
            raise
    
    def _create_indexes(self):
        """Crea índices necesarios para optimizar las consultas"""
        try:
            # Índices para usuarios
            self.users.create_index("google_id", unique=True)
            self.users.create_index("email", unique=True)
            
            # Índices para sesiones
            self.sessions.create_index("user_id")
            self.sessions.create_index("expires_at")
            
            # Índices para historial de chat
            self.chat_history.create_index([("user_id", 1), ("timestamp", -1)])
            
            logger.info("Índices de MongoDB creados exitosamente")
            
        except Exception as e:
            logger.warning(f"Error creando índices: {str(e)}")
    
    def create_or_update_user(self, user_info):
        """
        Crea un nuevo usuario o actualiza uno existente
        """
        try:
            user_data = {
                'google_id': user_info['google_id'],
                'email': user_info['email'],
                'name': user_info['name'],
                'picture': user_info.get('picture', ''),
                'email_verified': user_info.get('email_verified', False),
                'last_login': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Usar upsert para crear o actualizar
            result = self.users.update_one(
                {'google_id': user_info['google_id']},
                {
                    '$set': user_data,
                    '$setOnInsert': {'created_at': datetime.utcnow()}
                },
                upsert=True
            )
            
            if result.upserted_id:
                logger.info(f"Nuevo usuario creado: {user_info['email']}")
            else:
                logger.info(f"Usuario actualizado: {user_info['email']}")
            
            return self.get_user_by_google_id(user_info['google_id'])
            
        except Exception as e:
            logger.error(f"Error creando/actualizando usuario: {str(e)}")
            return None
    
    def get_user_by_google_id(self, google_id):
        """
        Obtiene un usuario por su Google ID
        """
        try:
            user = self.users.find_one({'google_id': google_id})
            return user
            
        except Exception as e:
            logger.error(f"Error obteniendo usuario: {str(e)}")
            return None
    
    def get_user_by_email(self, email):
        """
        Obtiene un usuario por su email
        """
        try:
            user = self.users.find_one({'email': email})
            return user
            
        except Exception as e:
            logger.error(f"Error obteniendo usuario por email: {str(e)}")
            return None
    
    def create_session(self, user_id, jwt_token):
        """
        Crea una nueva sesión para el usuario
        """
        try:
            session_data = {
                'user_id': user_id,
                'jwt_token': jwt_token,
                'created_at': datetime.utcnow(),
                'expires_at': datetime.utcnow() + timedelta(seconds=Config.JWT_ACCESS_TOKEN_EXPIRES),
                'is_active': True
            }
            
            result = self.sessions.insert_one(session_data)
            logger.info(f"Sesión creada para usuario: {user_id}")
            
            return str(result.inserted_id)
            
        except Exception as e:
            logger.error(f"Error creando sesión: {str(e)}")
            return None
    
    def get_active_session(self, user_id):
        """
        Obtiene la sesión activa de un usuario
        """
        try:
            session = self.sessions.find_one({
                'user_id': user_id,
                'is_active': True,
                'expires_at': {'$gt': datetime.utcnow()}
            })
            
            return session
            
        except Exception as e:
            logger.error(f"Error obteniendo sesión activa: {str(e)}")
            return None
    
    def invalidate_session(self, session_id):
        """
        Invalida una sesión específica
        """
        try:
            result = self.sessions.update_one(
                {'_id': session_id},
                {'$set': {'is_active': False, 'invalidated_at': datetime.utcnow()}}
            )
            
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error invalidando sesión: {str(e)}")
            return False
    
    def save_chat_message(self, user_id, message, message_type='user'):
        """
        Guarda un mensaje del chat en el historial
        """
        try:
            chat_data = {
                'user_id': user_id,
                'message': message,
                'message_type': message_type,  # 'user' o 'bot'
                'timestamp': datetime.utcnow(),
                'metadata': {}
            }
            
            result = self.chat_history.insert_one(chat_data)
            return str(result.inserted_id)
            
        except Exception as e:
            logger.error(f"Error guardando mensaje de chat: {str(e)}")
            return None
    
    def get_chat_history(self, user_id, limit=50):
        """
        Obtiene el historial de chat de un usuario
        """
        try:
            messages = list(self.chat_history.find(
                {'user_id': user_id}
            ).sort('timestamp', -1).limit(limit))
            
            # Invertir para mostrar en orden cronológico
            return list(reversed(messages))
            
        except Exception as e:
            logger.error(f"Error obteniendo historial de chat: {str(e)}")
            return []
    
    def cleanup_expired_sessions(self):
        """
        Limpia sesiones expiradas (para ejecutar periódicamente)
        """
        try:
            result = self.sessions.update_many(
                {
                    'expires_at': {'$lt': datetime.utcnow()},
                    'is_active': True
                },
                {'$set': {'is_active': False, 'expired_at': datetime.utcnow()}}
            )
            
            logger.info(f"Sesiones expiradas limpiadas: {result.modified_count}")
            return result.modified_count
            
        except Exception as e:
            logger.error(f"Error limpiando sesiones expiradas: {str(e)}")
            return 0 