from flask import Blueprint, jsonify, request
from db.config import db_session
from models.user import User
from sqlalchemy.exc import SQLAlchemyError

user_blueprint = Blueprint('user', __name__, url_prefix='/users')


# Create a user
@user_blueprint.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    username = data['username']
    password = data['password']
    email = data['email']

    try:
        # Check if the user already exists
        existing_user = db_session.query(User).filter_by(username=username).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400
        
        # Create and add new user
        new_user = User(username=username, password=password, email=email)
        db_session.add(new_user)
        db_session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except SQLAlchemyError as e:
        db_session.rollback()
        return jsonify({"error": str(e)}), 500

# Read a user by ID
@user_blueprint.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = db_session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({"id": user.id, "username": user.username}), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

# Read all users
@user_blueprint.route('/', methods=['GET'])
def get_all_users():
    try:
        users = db_session.query(User).all()
        user_list = [{"id": user.id, "username": user.username} for user in users]
        return jsonify(user_list), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

# Update a user
@user_blueprint.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    username = data['username']
    password = data['password']
    
    try:
        user = db_session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        user.username = username
        user.password = password
        db_session.commit()
        return jsonify({"message": "User updated successfully"}), 200
    except SQLAlchemyError as e:
        db_session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete a user
@user_blueprint.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = db_session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        db_session.delete(user)
        db_session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except SQLAlchemyError as e:
        db_session.rollback()
        return jsonify({"error": str(e)}), 500