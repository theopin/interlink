from flask import Flask
from routes.collator import collate_routes

app = Flask(__name__)

collate_routes(app)

print([str(p) for p in app.url_map.iter_rules()])

if __name__ == "__main__":
    app.run(debug=True)
