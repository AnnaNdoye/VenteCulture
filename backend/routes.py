from flask import Blueprint, request, jsonify, redirect, url_for, session
from flask_cors import CORS
from database import database, hash_password, generate_token, check_password
import jwt
from functools import wraps

routes = Blueprint('routes', __name__)
CORS(routes, supports_credentials=True)  # Activer supports_credentials pour les cookies

# Clé secrète pour JWT
SECRET_KEY = "secret123"  # À déplacer dans une variable d'environnement

# Fonction pour vérifier un token JWT
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Décorateur pour protéger les routes
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_id = None
        
        # Vérifier si l'utilisateur est connecté via session
        if session.get('user_id'):
            user_id = session.get('user_id')
        else:
            # Vérifier si un token est présent dans l'en-tête Authorization
            auth_header = request.headers.get('Authorization')
            if auth_header and auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
                payload = verify_token(token)
                if payload:
                    user_id = payload.get('user_id')
        
        if not user_id:
            return jsonify({"message": "Non connecté ou token invalide"}), 401
            
        return f(user_id, *args, **kwargs)
    return decorated

@routes.route('/inscription_client', methods=['POST'])
def inscription_client():
    data = request.json

    if not all(key in data for key in ["username", "nom", "email", "mot_de_passe", "telephone"]):
        return jsonify({"message": "Données incomplètes"}), 400

    username = data["username"]
    nom = data["nom"]
    email = data["email"]
    mot_de_passe = hash_password(data["mot_de_passe"])
    telephone = data.get("telephone", "")

    try:
        conn = database()
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM client WHERE email = %s OR username = %s", (email, username))
        if cursor.fetchone():
            return jsonify({"message": "Email ou nom d'utilisateur déjà utilisé"}), 400

        cursor.execute("INSERT INTO client (username, nom, email, mot_de_passe, telephone) VALUES (%s, %s, %s, %s, %s)",
                        (username, nom, email, mot_de_passe, telephone))
        conn.commit()

        cursor.execute("SELECT id FROM client WHERE email = %s", (email,))
        client_id = cursor.fetchone()[0]

        token = generate_token(client_id, "client")
        
        # Stocker dans la session
        session['user_id'] = client_id
        session['username'] = username
        session['role'] = "client"

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
        
        # Stocker dans la session
        session['user_id'] = vendeur_id
        session['username'] = username
        session['role'] = "vendeur"

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

    try:
        conn = database()
        cursor = conn.cursor()

        cursor.execute("SELECT id, mot_de_passe FROM client WHERE username = %s", (username,))
        client = cursor.fetchone()

        if not client:
            return jsonify({"message": "Identifiants incorrects"}), 401

        stored_password = client[1]
        client_id = client[0]
        
        if check_password(stored_password, mot_de_passe):
            token = generate_token(client_id, "client")
            session["user_id"] = client_id
            session["username"] = username
            session["role"] = "client"
            return jsonify({"message": "Connexion réussie", "token": token, "redirect": "/page_client"}), 200
        else:
            return jsonify({"message": "Identifiants incorrects"}), 401

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@routes.route('/connexion_vendeur', methods=['POST'])
def connexion_vendeur_route():
    data = request.json

    if not all(key in data for key in ["username", "mot_de_passe"]):
        return jsonify({"message": "Données incomplètes"}), 400

    username = data["username"]
    mot_de_passe = data["mot_de_passe"]

    try:
        conn = database()
        cursor = conn.cursor()

        cursor.execute("SELECT id, mot_de_passe FROM vendeur WHERE username = %s", (username,))
        vendeur = cursor.fetchone()

        if not vendeur:
            return jsonify({"message": "Identifiants incorrects"}), 401

        stored_password = vendeur[1]
        vendeur_id = vendeur[0]
        
        if check_password(stored_password, mot_de_passe):
            token = generate_token(vendeur_id, "vendeur")
            session["user_id"] = vendeur_id
            session["username"] = username
            session["role"] = "vendeur"
            return jsonify({"message": "Connexion réussie", "token": token, "redirect": "/page_vendeur"}), 200
        else:
            return jsonify({"message": "Identifiants incorrects"}), 401

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@routes.route('/vendeur_info', methods=['GET'])
@token_required
def vendeur_info(user_id):
    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)

        # Récupérer les infos personnelles
        cursor.execute("SELECT id, username, nom, email, telephone FROM vendeur WHERE id = %s", (user_id,))
        vendeur = cursor.fetchone()

        # Récupérer les infos boutique
        cursor.execute("SELECT nom_boutique, adresse, description FROM boutique WHERE vendeur_id = %s", (user_id,))
        boutique = cursor.fetchone()

        # Récupérer les infos livraison
        cursor.execute("SELECT livre, frais_livraison, retrait_magasin FROM livraison WHERE vendeur_id = %s", (user_id,))
        livraison = cursor.fetchone()

        if not vendeur or not boutique or not livraison:
            return jsonify({"message": "Informations incomplètes"}), 404

        response = {
            "id": vendeur["id"],
            "username": vendeur["username"],
            "nom": vendeur["nom"],
            "email": vendeur["email"],
            "telephone": vendeur["telephone"],
            "nomBoutique": boutique["nom_boutique"],
            "adresse": boutique["adresse"],
            "description": boutique["description"],
            "livraisonDomicile": True if livraison["livre"] == "oui" else False,
            "fraisLivraison": float(livraison["frais_livraison"]),
            "retraitMagasin": True if livraison["retrait_magasin"] == "oui" else False
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@routes.route('/vendeur_info_modif', methods=['PUT'])
@token_required
def vendeur_info_modif(user_id):
    data = request.json

    try:
        conn = database()
        cursor = conn.cursor()

        # 1. Mise à jour des informations personnelles du vendeur
        if "nom" in data or "username" in data or "email" in data or "telephone" in data:
            # Création de la requête dynamique pour mettre à jour uniquement les champs fournis
            update_fields = []
            params = []

            if "nom" in data:
                update_fields.append("nom = %s")
                params.append(data["nom"])
            
            if "username" in data:
                # Vérifier si le username est déjà utilisé par un autre vendeur
                if "username" in data and data["username"]:
                    cursor.execute("SELECT id FROM vendeur WHERE username = %s AND id != %s", 
                                   (data["username"], user_id))
                    if cursor.fetchone():
                        return jsonify({"message": "Ce nom d'utilisateur est déjà utilisé"}), 400
                update_fields.append("username = %s")
                params.append(data["username"])
            
            if "email" in data:
                # Vérifier si l'email est déjà utilisé par un autre vendeur
                if "email" in data and data["email"]:
                    cursor.execute("SELECT id FROM vendeur WHERE email = %s AND id != %s", 
                                   (data["email"], user_id))
                    if cursor.fetchone():
                        return jsonify({"message": "Cet email est déjà utilisé"}), 400
                update_fields.append("email = %s")
                params.append(data["email"])
            
            if "telephone" in data:
                update_fields.append("telephone = %s")
                params.append(data["telephone"])
            
            # Si des champs à mettre à jour ont été identifiés
            if update_fields:
                query = "UPDATE vendeur SET " + ", ".join(update_fields) + " WHERE id = %s"
                params.append(user_id)
                cursor.execute(query, params)

        # 2. Mise à jour des informations de la boutique
        if "nomBoutique" in data or "adresse" in data or "description" in data:
            update_fields = []
            params = []

            if "nomBoutique" in data:
                update_fields.append("nom_boutique = %s")
                params.append(data["nomBoutique"])
            
            if "adresse" in data:
                update_fields.append("adresse = %s")
                params.append(data["adresse"])
            
            if "description" in data:
                update_fields.append("description = %s")
                params.append(data["description"])
            
            if update_fields:
                query = "UPDATE boutique SET " + ", ".join(update_fields) + " WHERE vendeur_id = %s"
                params.append(user_id)
                cursor.execute(query, params)

        # 3. Mise à jour des informations de livraison
        if "livraisonDomicile" in data or "retraitMagasin" in data or "fraisLivraison" in data:
            update_fields = []
            params = []

            if "livraisonDomicile" in data:
                update_fields.append("livre = %s")
                params.append("oui" if data["livraisonDomicile"] else "non")
            
            if "fraisLivraison" in data:
                update_fields.append("frais_livraison = %s")
                params.append(data["fraisLivraison"])
            
            if "retraitMagasin" in data:
                update_fields.append("retrait_magasin = %s")
                params.append("oui" if data["retraitMagasin"] else "non")
            
            if update_fields:
                query = "UPDATE livraison SET " + ", ".join(update_fields) + " WHERE vendeur_id = %s"
                params.append(user_id)
                cursor.execute(query, params)
        
        conn.commit()
        return jsonify({"message": "Informations mises à jour avec succès"}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@routes.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Déconnexion réussie", "redirect": "/"}), 200