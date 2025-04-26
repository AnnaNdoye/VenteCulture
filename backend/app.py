from flask import Flask
from routes import routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = "secret123"
app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True)
