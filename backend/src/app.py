from flask import Flask
from routes.collator import collate_routes
from db.config import init_db
from auth.config import init_jwt

app = Flask(__name__)

collate_routes(app)
init_jwt(app)
init_db()


if __name__ == "__main__":
    app.run(debug=True)
