from routes.health_route import health_blueprint
from routes.auth_route import auth_blueprint
from routes.user_route import user_blueprint

def collate_routes(app):
    blueprints = [
        health_blueprint,
        user_blueprint,
        auth_blueprint,
    ]
    
    # Iterate over the blueprints and register them
    for blueprint in blueprints:
        app.register_blueprint(blueprint)