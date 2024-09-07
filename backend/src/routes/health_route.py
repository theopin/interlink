from flask import Blueprint, jsonify

health_blueprint = Blueprint('health', __name__, url_prefix='/health')

@health_blueprint.route('/status')
def hello_geek():
    response = {
        "message": "System healthy"
    }
    return jsonify(response), 200
