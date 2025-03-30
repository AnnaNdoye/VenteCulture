from flask import Blueprint, request, jsonify
from database import database, hash_password, generate_token
from flask_cors import CORS
from flask import Flask, request, jsonify
from database import connexion_client, connexion_vendeur, generate_token
from flask import Blueprint, request, jsonify, redirect, url_for

routes = Blueprint('routes', __name__)
CORS(routes)

@routes.route('/inscription_client', methods=['POST'])
def inscription_client():
    data = request.json

    if not all(key in data for key in ["username", "nom", "email", "mot_de_passe"]):
        return jsonify({"message": "Données incomplètes"}), 400

    username = data["username"]
    nom = data["nom"]
    email = data["email"]
    mot_de_passe = hash_password(data["mot_de_passe"])

    try:
        conn = database()
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM client WHERE email = %s OR username = %s", (email, username))
        if cursor.fetchone():
            return jsonify({"message": "Email ou nom d'utilisateur déjà utilisé"}), 400

        cursor.execute("INSERT INTO client (username, nom, email, mot_de_passe) VALUES (%s, %s, %s, %s)",
                       (username, nom, email, mot_de_passe))
        conn.commit()

        cursor.execute("SELECT id FROM client WHERE email = %s", (email,))
        client_id = cursor.fetchone()[0]

        token = generate_token(client_id, "client")

        return jsonify({"message": "Inscription réussie !", "token": token}), 201

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@routes.route('/inscription_vendeur', methods=['POST'])
def inscription_vendeur():
    data = request.json

    if not all(key in data for key in ["username", "nom", "email", "mot_de_passe", "description"]):
        return jsonify({"message": "Données incomplètes"}), 400

    username = data["username"]
    nom = data["nom"]
    email = data["email"]
    mot_de_passe = hash_password(data["mot_de_passe"])
    description = data["description"]

    try:
        conn = database()
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM vendeur WHERE email = %s OR username = %s", (email, username))
        if cursor.fetchone():
            return jsonify({"message": "Email ou nom d'utilisateur déjà utilisé"}), 400

        cursor.execute("INSERT INTO vendeur (username, nom, email, mot_de_passe, description) VALUES (%s, %s, %s, %s, %s)",
                       (username, nom, email, mot_de_passe, description))
        conn.commit()

        cursor.execute("SELECT id FROM vendeur WHERE email = %s", (email,))
        vendeur_id = cursor.fetchone()[0]

        token = generate_token(vendeur_id, "vendeur")

        return jsonify({"message": "Inscription réussie !", "token": token}), 201

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@routes.route('/connexion_client', methods=['POST'])
def connexion_client_route():
    data = request.json

    if not all(key in data for key in ["username", "mot_de_passe"]):
        return jsonify({"message": "Données incomplètes"}), 400

    username = data["username"]
    mot_de_passe = data["mot_de_passe"]

    client_id = connexion_client(username, mot_de_passe)

    if client_id:
        token = generate_token(client_id, "client")
        return jsonify({"message": "Connexion réussie", "token": token, "redirect": "PageClient"}), 200
    else:
        return jsonify({"message": "Identifiants incorrects"}), 401


@routes.route('/connexion_vendeur', methods=['POST'])
def connexion_vendeur_route():
    data = request.json

    if not all(key in data for key in ["username", "mot_de_passe"]):
        return jsonify({"message": "Données incomplètes"}), 400

    username = data["username"]
    mot_de_passe = data["mot_de_passe"]

    vendeur_id = connexion_vendeur(username, mot_de_passe)

    if vendeur_id:
        token = generate_token(vendeur_id, "vendeur")
        return jsonify({"message": "Connexion réussie", "token": token, "redirect": "PageVendeur"}), 200
    else:
        return jsonify({"message": "Identifiants incorrects"}), 401
