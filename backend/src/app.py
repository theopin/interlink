from flask import Flask
from routes.collator import collate_routes
from db.config import init_db

app = Flask(__name__)

collate_routes(app)
init_db()


print([str(p) for p in app.url_map.iter_rules()])

if __name__ == "__main__":
    app.run(debug=True)
