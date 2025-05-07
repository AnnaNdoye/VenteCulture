import mysql.connector
import bcrypt
import jwt
import datetime
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, session,  current_app
app = Flask(__name__)
SECRET_KEY = "secret123"

if __name__ == "__main__":
    app.run(debug=True)
# Connexion à la base de données
def database():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="vente_app"
    )
    

# Fonction pour hacher un mot de passe
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Fonction pour vérifier un mot de passe
def check_password(stored_password, provided_password):
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password.encode('utf-8'))

# Fonction pour générer un token JWT
def generate_token(user_id, role):
    return jwt.encode(
        {"user_id": user_id, "role": role, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=3)},
        SECRET_KEY, algorithm="HS256"
    )


def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Inscription Client
@app.route('/inscription_vendeur', methods=['POST'])
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

# Inscription Vendeur
def inscription_vendeur():
    data = request.json
    
    if not all(key in data for key in ["username", "nom", "email", "mot_de_passe", "telephone"]):
        return jsonify({"message": "Données incomplètes"}), 400

    username = data["username"]
    nom = data["nom"]
    email = data["email"]
    mot_de_passe = hash_password(data["mot_de_passe"])
    telephone = data["telephone"]
    
    try:
        conn = database()
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM vendeur WHERE email = %s OR username = %s", (email, username))
        if cursor.fetchone():
            return jsonify({"message": "Email ou nom d'utilisateur déjà utilisé"}), 400

        cursor.execute("INSERT INTO vendeur (username, nom, email, mot_de_passe, telephone) VALUES (%s, %s, %s, %s, %s)",
                        (username, nom, email, mot_de_passe, telephone))
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

# Fonction pour vérifier le mot de passe d'un client
import mysql.connector
import bcrypt
import jwt
import datetime
from datetime import datetime, timedelta

# Clé secrète pour JWT
SECRET_KEY = "secret123"  # À déplacer dans une variable d'environnement

# Connexion à la base de données
def database():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="vente_app"
    )

# Fonction pour hacher un mot de passe
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Fonction pour vérifier un mot de passe
def check_password(stored_password, provided_password):
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password.encode('utf-8'))

# Fonction pour générer un token JWT
def generate_token(user_id, role):
    return jwt.encode(
        {"user_id": user_id, "role": role, "exp": datetime.utcnow() + timedelta(hours=3)},
        SECRET_KEY, algorithm="HS256"
    )

# Fonction pour vérifier un token JWT
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Fonction pour vérifier le mot de passe d'un client
def connexion_client(username, mot_de_passe):
    try:
        conn = database()
        cursor = conn.cursor()

        cursor.execute("SELECT id, mot_de_passe FROM client WHERE username = %s", (username,))
        client = cursor.fetchone()

        if not client:
            return None  # Si le client n'existe pas

        stored_password = client[1]
        if check_password(stored_password, mot_de_passe):
            return client[0]  # Retourne l'ID du client si le mot de passe est correct
        else:
            return None  # Si le mot de passe est incorrect

    except Exception as e:
        print(f"Erreur lors de la connexion client : {e}")
        return None

    finally:
        cursor.close()
        conn.close()

# Fonction pour vérifier le mot de passe d'un vendeur
def connexion_vendeur(username, mot_de_passe):
    try:
        conn = database()
        cursor = conn.cursor()

        cursor.execute("SELECT id, mot_de_passe FROM vendeur WHERE username = %s", (username,))
        vendeur = cursor.fetchone()

        if not vendeur:
            return None  # Si le vendeur n'existe pas

        stored_password = vendeur[1]
        if check_password(stored_password, mot_de_passe):
            return vendeur[0]  # Retourne l'ID du vendeur si le mot de passe est correct
        else:
            return None  # Si le mot de passe est incorrect

    except Exception as e:
        print(f"Erreur lors de la connexion vendeur : {e}")
        return None

    finally:
        cursor.close()
        conn.close()
        
@app.route('/mdp_oublie_client', methods=['POST'])
def mdp_oublie_client():
    data = request.json
    email = data.get("email")
    nouveau_mot_de_passe = data.get("nouveau_mot_de_passe")

    if not email or not nouveau_mot_de_passe:
        return jsonify({"message": "Email ou nouveau mot de passe manquants"}), 400

    try:
        conn = database()
        cursor = conn.cursor()

        # Vérifier si l'email existe dans la table client
        cursor.execute("SELECT id FROM client WHERE email = %s", (email,))
        client = cursor.fetchone()

        if client:
            # Hash du nouveau mot de passe
            hashed_password = hash_password(nouveau_mot_de_passe)
            
            # Mettre à jour le mot de passe du client
            cursor.execute("UPDATE client SET mot_de_passe = %s WHERE email = %s", (hashed_password, email))
            conn.commit()

            return jsonify({"message": "Mot de passe modifié"}), 200
        else:
            return jsonify({"message": "L'email ne correspond pas"}), 404

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/mdp_oublie_vendeur', methods=['POST'])
def mdp_oublie_vendeur():
    data = request.json
    email = data.get("email")
    nouveau_mot_de_passe = data.get("nouveau_mot_de_passe")

    if not email or not nouveau_mot_de_passe:
        return jsonify({"message": "Email ou nouveau mot de passe manquants"}), 400

    try:
        conn = database()
        cursor = conn.cursor()

        # Vérifier si l'email existe dans la table vendeur
        cursor.execute("SELECT id FROM vendeur WHERE email = %s", (email,))
        vendeur = cursor.fetchone()

        if vendeur:
            # Hash du nouveau mot de passe
            hashed_password = hash_password(nouveau_mot_de_passe)
            
            # Mettre à jour le mot de passe du vendeur
            cursor.execute("UPDATE vendeur SET mot_de_passe = %s WHERE email = %s", (hashed_password, email))
            conn.commit()

            return jsonify({"message": "Mot de passe modifié"}), 200
        else:
            return jsonify({"message": "L'email ne correspond pas"}), 404

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

def vendeur_info():
    vendeur_id = session.get('user_id')  # ou récupérer depuis le token envoyé

    if not vendeur_id:
        return jsonify({"message": "Non connecté"}), 401

    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)

        # Récupérer les infos personnelles
        cursor.execute("SELECT id, username, nom, email, telephone FROM vendeur WHERE id = %s", (vendeur_id,))
        vendeur = cursor.fetchone()

        # Récupérer les infos boutique
        cursor.execute("SELECT nom_boutique, adresse, description FROM boutique WHERE vendeur_id = %s", (vendeur_id,))
        boutique = cursor.fetchone()

        # Récupérer les infos livraison
        cursor.execute("SELECT livre, frais_livraison, retrait_magasin FROM livraison WHERE vendeur_id = %s", (vendeur_id,))
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



if __name__ == '__main__':
    app.run(debug=True)
