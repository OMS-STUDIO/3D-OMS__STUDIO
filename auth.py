from flask import Blueprint, request, jsonify, session
import hashlib

auth_bp = Blueprint('auth', __name__)

# Mot de passe par défaut (à changer en production)
DEFAULT_PASSWORD = "png2obj2024"
PASSWORD_HASH = hashlib.sha256(DEFAULT_PASSWORD.encode()).hexdigest()

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or 'password' not in data:
            return jsonify({'error': 'Mot de passe requis'}), 400
        
        password = data['password']
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        if password_hash == PASSWORD_HASH:
            session['authenticated'] = True
            return jsonify({'success': True, 'message': 'Authentification réussie'})
        else:
            return jsonify({'error': 'Mot de passe incorrect'}), 401
            
    except Exception as e:
        return jsonify({'error': f'Erreur lors de l\'authentification: {str(e)}'}), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('authenticated', None)
    return jsonify({'success': True, 'message': 'Déconnexion réussie'})

@auth_bp.route('/check', methods=['GET'])
def check_auth():
    is_authenticated = session.get('authenticated', False)
    return jsonify({'authenticated': is_authenticated})

def require_auth(f):
    """Décorateur pour protéger les routes qui nécessitent une authentification"""
    def decorated_function(*args, **kwargs):
        if not session.get('authenticated', False):
            return jsonify({'error': 'Authentification requise'}), 401
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function
