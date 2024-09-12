from flask import Flask
from flask_cors import CORS

from routes.collator import collate_routes
from db.config import init_db
from auth.config import init_jwt

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


collate_routes(app)
init_jwt(app)
init_db()


if __name__ == "__main__":
    app.run(debug=True)
