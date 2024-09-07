from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash
from db.config import db_session
from models.user import User
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity


auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    username = data['username']
    password = data['password']

    # Example authentication logic (replace with actual logic)
    existing_user = db_session.query(User).filter_by(username=username).first()
    if existing_user and check_password_hash(existing_user.password, password):
        response = {
            "message": "Authentication successful",
            "access_token": create_access_token(identity=existing_user.id),
            "refresh_token": create_refresh_token(identity=existing_user.id)
         }
        return jsonify(response), 200
    else:
        response = {"message": "Authentication failed"}
        return jsonify(response), 401

@auth_blueprint.route('/logout', methods=['POST'])
@jwt_required
def logout():
    print(30333)
    response = {"message": "Logged out successfully"}
    return jsonify(response), 200
