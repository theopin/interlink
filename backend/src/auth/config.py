from flask_jwt_extended import JWTManager
from datetime import timedelta



def init_jwt(app):

    app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this!
    
    # Set access token to expire in 20 minutes and refresh token in 2 hours
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=20)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(hours=2)
    jwt = JWTManager(app)