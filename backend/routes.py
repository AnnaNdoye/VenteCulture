from database import database, hash_password, generate_token
from flask_cors import CORS
from database import connexion_client, connexion_vendeur, generate_token
from flask import Blueprint, request, jsonify, redirect, url_for, session

routes = Blueprint('routes', __name__)
CORS(routes)


@routes.route('/inscription_client', methods=['POST'])
def inscription_client():
    data = request.json

    if not all(key in data for key in ["username", "nom", "email", "mot_de_passe", "telephone"]):
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

    required_fields = ["username", "nom", "email", "mot_de_passe", "telephone",
                        "nom_boutique", "adresse_boutique", "description_boutique",
                        "livre", "frais_livraison", "retrait_magasin"]
    if not all(key in data for key in required_fields):
        return jsonify({"message": "Données incomplètes"}), 400

    username = data["username"]
    nom = data["nom"]
    email = data["email"]
    telephone = data["telephone"]
    mot_de_passe = hash_password(data["mot_de_passe"])
    nom_boutique = data["nom_boutique"]
    adresse_boutique = data["adresse_boutique"]
    description_boutique = data["description_boutique"]
    livre = data["livre"]
    frais_livraison = data["frais_livraison"]
    retrait_magasin = data["retrait_magasin"]

    try:
        conn = database()
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM vendeur WHERE email = %s OR username = %s", (email, username))
        if cursor.fetchone():
            return jsonify({"message": "Email ou nom d'utilisateur déjà utilisé"}), 400

        cursor.execute(
            "INSERT INTO vendeur (username, nom, email, mot_de_passe, telephone) VALUES (%s, %s, %s, %s, %s)",
            (username, nom, email, mot_de_passe, telephone))
        conn.commit()

        cursor.execute("SELECT id FROM vendeur WHERE email = %s", (email,))
        vendeur_id = cursor.fetchone()[0]

        # Insérer dans boutique
        cursor.execute(
            "INSERT INTO boutique (vendeur_id, nom_boutique, adresse, description) VALUES (%s, %s, %s, %s)",
            (vendeur_id, nom_boutique, adresse_boutique, description_boutique))
        
        # Insérer dans livraison
        cursor.execute(
            "INSERT INTO livraison (vendeur_id, livre, frais_livraison, retrait_magasin) VALUES (%s, %s, %s, %s)",
            (vendeur_id, livre, frais_livraison, retrait_magasin))

        conn.commit()

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
        session["user_id"] = client_id
        session["username"] = username
        session["role"] = "client"
        return jsonify({"message": "Connexion réussie", "token": token, "redirect": "/page_client"}), 200
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
        session["user_id"] = vendeur_id
        session["username"] = username
        session["role"] = "vendeur"
        return jsonify({"message": "Connexion réussie", "token": token, "redirect": "/page_vendeur"}), 200
    else:
        return jsonify({"message": "Identifiants incorrects"}), 401

@routes.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Déconnexion réussie", "redirect": "/"}), 200
