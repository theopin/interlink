from flask import Blueprint, jsonify, request

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    username = data['username']
    password = data['password']
    
    # Example authentication logic (replace with actual logic)
    if username == 'admin' and password == 'password':
        response = {"message": "Authentication successful"}
        return jsonify(response), 200
    else:
        response = {"message": "Authentication failed"}
        return jsonify(response), 401

@auth_blueprint.route('/logout', methods=['POST'])
def logout():
    print(30333)
    response = {"message": "Logged out successfully"}
    return jsonify(response), 200
