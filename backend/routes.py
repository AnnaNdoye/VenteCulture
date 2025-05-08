from flask import Blueprint, request, jsonify, redirect, url_for, session
from flask_cors import CORS
from database import database, hash_password, generate_token, check_password
import jwt
from functools import wraps
from werkzeug.utils import secure_filename
from datetime import datetime
from functools import wraps
import uuid
import base64

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

@routes.route('/vendeur/revenus', methods=['GET'])
@token_required
def revenu_paie(user_id):
    """
    Récupère les informations de revenus et transactions pour un vendeur
    """
    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)
        
        # 1. Calculer le solde disponible (montant des commandes livrées)
        cursor.execute("""
            SELECT COALESCE(SUM(dc.prix_unitaire * dc.quantite), 0) as balance
            FROM details_commande dc
            JOIN commandes c ON dc.commande_id = c.id
            JOIN produits p ON dc.produit_id = p.id
            WHERE p.vendeur_id = %s AND c.statut = 'livrée'
        """, (user_id,))
        balance_result = cursor.fetchone()
        balance = float(balance_result['balance']) if balance_result else 0.0
        
        # 2. Calculer le montant en attente (commandes payées mais pas encore livrées)
        cursor.execute("""
            SELECT COALESCE(SUM(dc.prix_unitaire * dc.quantite), 0) as pending
            FROM details_commande dc
            JOIN commandes c ON dc.commande_id = c.id
            JOIN produits p ON dc.produit_id = p.id
            WHERE p.vendeur_id = %s AND c.statut IN ('payée', 'en préparation', 'expédiée')
        """, (user_id,))
        pending_result = cursor.fetchone()
        pending = float(pending_result['pending']) if pending_result else 0.0
        
        # 3. Calculer le montant total gagné (toutes les commandes payées)
        cursor.execute("""
            SELECT COALESCE(SUM(dc.prix_unitaire * dc.quantite), 0) as total
            FROM details_commande dc
            JOIN commandes c ON dc.commande_id = c.id
            JOIN produits p ON dc.produit_id = p.id
            WHERE p.vendeur_id = %s AND c.statut IN ('payée', 'en préparation', 'expédiée', 'livrée')
        """, (user_id,))
        total_result = cursor.fetchone()
        total = float(total_result['total']) if total_result else 0.0
        
        # 4. Récupérer l'historique des transactions (commandes payées)
        cursor.execute("""
            SELECT 
                c.id as commande_id,
                cl.nom as nom_client,
                SUM(dc.prix_unitaire * dc.quantite) as amount,
                c.date_commande as date,
                c.statut as status
            FROM details_commande dc
            JOIN commandes c ON dc.commande_id = c.id
            JOIN client cl ON c.client_id = cl.id
            JOIN produits p ON dc.produit_id = p.id
            WHERE p.vendeur_id = %s AND c.statut IN ('payée', 'en préparation', 'expédiée', 'livrée')
            GROUP BY c.id
            ORDER BY c.date_commande DESC
            LIMIT 10
        """, (user_id,))
        transactions = cursor.fetchall()
        
        # Formater les dates pour les transactions
        for tx in transactions:
            tx['date'] = tx['date'].strftime('%Y-%m-%d')
            tx['amount'] = float(tx['amount'])
        
        return jsonify({
            "balance": balance,
            "pending": pending,
            "total": total,
            "transactions": transactions
        }), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@routes.route('/vendeur_stats', methods=['GET'])
@token_required
def vendeur_stats(user_id):
    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)
        current_month = datetime.datetime.now().strftime('%Y-%m')
        
        # 1. Nombre de produits en vente
        cursor.execute("SELECT COUNT(*) as produits_count FROM produits WHERE vendeur_id = %s", (user_id,))
        produits_count = cursor.fetchone()['produits_count']
        
        # 2. Nombre de commandes du mois en cours
        cursor.execute("""
            SELECT COUNT(DISTINCT c.id) as commandes_mois 
            FROM commandes c 
            JOIN details_commande dc ON c.id = dc.commande_id 
            JOIN produits p ON dc.produit_id = p.id 
            WHERE p.vendeur_id = %s 
            AND DATE_FORMAT(c.date_commande, '%%Y-%%m') = %s
        """, (user_id, current_month))
        commandes_mois = cursor.fetchone()['commandes_mois']
        
        # 3. Revenus totaux
        cursor.execute("""
            SELECT COALESCE(SUM(dc.prix_unitaire * dc.quantite), 0) as revenus_totaux
            FROM commandes c 
            JOIN details_commande dc ON c.id = dc.commande_id 
            JOIN produits p ON dc.produit_id = p.id 
            JOIN paiements pa ON c.id = pa.commande_id
            WHERE p.vendeur_id = %s 
            AND pa.statut = 'réussi'
        """, (user_id,))
        revenus_totaux = float(cursor.fetchone()['revenus_totaux'])
        
        # 4. Nouvelles commandes (non traitées)
        cursor.execute("""
            SELECT COUNT(DISTINCT c.id) as nouvelles_commandes 
            FROM commandes c 
            JOIN details_commande dc ON c.id = dc.commande_id 
            JOIN produits p ON dc.produit_id = p.id 
            WHERE p.vendeur_id = %s 
            AND c.statut IN ('en attente', 'payée')
        """, (user_id,))
        nouvelles_commandes = cursor.fetchone()['nouvelles_commandes']
        
        # 5. Statistiques de ventes par catégorie
        cursor.execute("""
            SELECT cat.nom as categorie, COUNT(dc.id) as nb_ventes, 
                   SUM(dc.prix_unitaire * dc.quantite) as montant_ventes
            FROM categories cat
            JOIN produits p ON cat.id = p.categorie_id
            JOIN details_commande dc ON p.id = dc.produit_id
            JOIN commandes c ON dc.commande_id = c.id
            JOIN paiements pa ON c.id = pa.commande_id
            WHERE p.vendeur_id = %s 
            AND pa.statut = 'réussi'
            GROUP BY cat.id
            ORDER BY montant_ventes DESC
            LIMIT 5
        """, (user_id,))
        stats_categories = cursor.fetchall()
        
        # 6. Produits les plus vendus
        cursor.execute("""
            SELECT p.id, p.nom, p.prix, p.image, SUM(dc.quantite) as quantite_vendue
            FROM produits p
            JOIN details_commande dc ON p.id = dc.produit_id
            JOIN commandes c ON dc.commande_id = c.id
            WHERE p.vendeur_id = %s
            GROUP BY p.id
            ORDER BY quantite_vendue DESC
            LIMIT 5
        """, (user_id,))
        top_produits = cursor.fetchall()
        
        # 7. Évolution des ventes sur les 6 derniers mois
        cursor.execute("""
            SELECT DATE_FORMAT(c.date_commande, '%Y-%m') as mois,
                   COUNT(DISTINCT c.id) as nb_commandes,
                   SUM(dc.prix_unitaire * dc.quantite) as montant
            FROM commandes c
            JOIN details_commande dc ON c.id = dc.commande_id
            JOIN produits p ON dc.produit_id = p.id
            JOIN paiements pa ON c.id = pa.commande_id
            WHERE p.vendeur_id = %s
            AND pa.statut = 'réussi'
            AND c.date_commande >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            GROUP BY mois
            ORDER BY mois ASC
        """, (user_id,))
        evolution_ventes = cursor.fetchall()
        
        response = {
            "produits_count": produits_count,
            "commandes_mois": commandes_mois,
            "revenus_totaux": revenus_totaux,
            "nouvelles_commandes": nouvelles_commandes,
            "stats_categories": stats_categories,
            "top_produits": top_produits,
            "evolution_ventes": evolution_ventes
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

# Fonction pour créer le dossier de stockage des images si nécessaire
def ensure_upload_folder():
    upload_folder = os.path.join(current_app.root_path, '/vendeur/produits', 'improduit')
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    return upload_folder

# Fonction pour enregistrer une image encodée en base64
def save_base64_image(b64_string, product_id):
    # Vérifier que la chaîne est non vide
    if not b64_string or not b64_string.strip():
        return None
    
    # Extraire le format et les données de l'image
    if ',' in b64_string:
        format_data, image_data = b64_string.split(',', 1)
        image_extension = format_data.split('/')[1].split(';')[0]
    else:
        # S'il n'y a pas de préfixe (parfois le cas pour les URLs déjà sauvegardées)
        return b64_string
    
    try:
        # Générer un nom de fichier unique avec timestamp
        filename = f"{product_id}_{int(datetime.now().timestamp())}.{image_extension}"
        upload_folder = ensure_upload_folder()
        filepath = os.path.join(upload_folder, filename)
        
        # Décoder et enregistrer l'image
        with open(filepath, "wb") as f:
            f.write(base64.b64decode(image_data))
        
        # Retourner le chemin relatif pour le stockage en base
        return f"/vendeur/produits/improduit/{filename}"
    except Exception as e:
        print(f"Erreur lors de l'enregistrement de l'image: {str(e)}")
        return None

@routes.route('/vendeur/produits', methods=['GET'])
@token_required
def get_produits(user_id):
    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)
        
        # Récupérer tous les produits du vendeur
        cursor.execute("""
            SELECT p.*, c.nom as categorie_nom 
            FROM produits p
            JOIN categories c ON p.categorie_id = c.id
            WHERE p.vendeur_id = %s
            ORDER BY p.date_ajout DESC
        """, (user_id,))
        
        produits = cursor.fetchall()
        
        # Ajouter le domaine aux chemins d'images pour l'affichage frontend
        base_url = request.host_url.rstrip('/')
        for produit in produits:
            if produit['image'] and not produit['image'].startswith('http'):
                produit['image'] = base_url + produit['image']
        
        return jsonify({"produits": produits}), 200
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

@routes.route('/vendeur/categories', methods=['GET'])
@token_required
def get_categories(user_id):
    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)
        
        # Récupérer toutes les catégories
        cursor.execute("SELECT id, nom FROM categories")
        categories = cursor.fetchall()
        
        return jsonify({"categories": categories}), 200
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

@routes.route('/vendeur/produits', methods=['POST'])
@token_required
def add_produit(user_id):
    data = request.json
    
    # Vérifier que toutes les données requises sont présentes
    required_fields = ["nom", "prix", "stock", "description", "categorie_id", "image"]
    if not all(key in data for key in required_fields):
        return jsonify({"message": "Données incomplètes"}), 400
    
    try:
        conn = database()
        cursor = conn.cursor()
        
        # Générer un ID unique pour le produit (pour l'image)
        product_uuid = str(uuid.uuid4())
        
        # Enregistrer l'image base64
        image_path = save_base64_image(data["image"], product_uuid)
        
        if not image_path:
            return jsonify({"message": "Erreur lors de l'enregistrement de l'image"}), 400
        
        # Insérer le nouveau produit dans la base de données
        cursor.execute("""
            INSERT INTO produits 
            (vendeur_id, categorie_id, nom, description, prix, stock, image) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            user_id,
            data["categorie_id"],
            data["nom"],
            data["description"],
            data["prix"],
            data["stock"],
            image_path
        ))
        
        conn.commit()
        new_product_id = cursor.lastrowid
        
        return jsonify({
            "message": "Produit ajouté avec succès",
            "product_id": new_product_id
        }), 201
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

@routes.route('/vendeur/produits/<int:product_id>', methods=['PUT'])
@token_required
def update_produit(user_id, product_id):
    data = request.json
    
    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)
        
        # Vérifier que le produit existe et appartient au vendeur
        cursor.execute("SELECT id, image FROM produits WHERE id = %s AND vendeur_id = %s", 
                      (product_id, user_id))
        product = cursor.fetchone()
        
        if not product:
            return jsonify({"message": "Produit non trouvé ou vous n'êtes pas autorisé à le modifier"}), 404
        
        # Préparer les champs à mettre à jour
        update_fields = []
        params = []
        
        if "nom" in data:
            update_fields.append("nom = %s")
            params.append(data["nom"])
        
        if "description" in data:
            update_fields.append("description = %s")
            params.append(data["description"])
        
        if "prix" in data:
            update_fields.append("prix = %s")
            params.append(data["prix"])
        
        if "stock" in data:
            update_fields.append("stock = %s")
            params.append(data["stock"])
        
        if "categorie_id" in data:
            update_fields.append("categorie_id = %s")
            params.append(data["categorie_id"])
        
        # Traiter l'image si elle est fournie
        if "image" in data and data["image"] and not data["image"].startswith(request.host_url):
            # Si une nouvelle image est fournie, enregistrer et mettre à jour le chemin
            image_path = save_base64_image(data["image"], str(product_id))
            if image_path:
                update_fields.append("image = %s")
                params.append(image_path)
                
                # Supprimer l'ancienne image si elle existe
                old_image = product.get('image')
                if old_image and os.path.exists(os.path.join(current_app.root_path, old_image.lstrip('/'))):
                    try:
                        os.remove(os.path.join(current_app.root_path, old_image.lstrip('/')))
                    except:
                        pass  # Ignorer les erreurs si l'ancienne image ne peut pas être supprimée
        
        # Exécuter la requête de mise à jour si des champs sont à mettre à jour
        if update_fields:
            query = "UPDATE produits SET " + ", ".join(update_fields) + " WHERE id = %s AND vendeur_id = %s"
            params.extend([product_id, user_id])
            cursor.execute(query, params)
            conn.commit()
        
        return jsonify({"message": "Produit mis à jour avec succès"}), 200
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

@routes.route('/vendeur/produits/<int:product_id>', methods=['GET'])
@token_required
def get_product_detail(user_id, product_id):
    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)
        
        # Récupérer les détails du produit
        cursor.execute("""
            SELECT p.*, c.nom as categorie_nom 
            FROM produits p
            JOIN categories c ON p.categorie_id = c.id
            WHERE p.id = %s AND p.vendeur_id = %s
        """, (product_id, user_id))
        
        product = cursor.fetchone()
        
        if not product:
            return jsonify({"message": "Produit non trouvé"}), 404
        
        # Ajouter le domaine au chemin d'image pour l'affichage frontend
        base_url = request.host_url.rstrip('/')
        if product['image'] and not product['image'].startswith('http'):
            product['image'] = base_url + product['image']
        
        return jsonify({"product": product}), 200
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

@routes.route('/vendeur/produits/<int:product_id>', methods=['DELETE'])
@token_required
def delete_produit(user_id, product_id):
    try:
        conn = database()
        cursor = conn.cursor(dictionary=True)
        
        # Vérifier que le produit existe et appartient au vendeur
        cursor.execute("SELECT id, image FROM produits WHERE id = %s AND vendeur_id = %s", 
                      (product_id, user_id))
        product = cursor.fetchone()
        
        if not product:
            return jsonify({"message": "Produit non trouvé ou vous n'êtes pas autorisé à le supprimer"}), 404
        
        # Supprimer l'image du produit si elle existe
        image_path = product.get('image')
        if image_path and not image_path.startswith('http'):
            full_path = os.path.join(current_app.root_path, image_path.lstrip('/'))
            if os.path.exists(full_path):
                try:
                    os.remove(full_path)
                except:
                    pass  # Ignorer les erreurs si l'image ne peut pas être supprimée
        
        # Supprimer le produit de la base de données
        cursor.execute("DELETE FROM produits WHERE id = %s AND vendeur_id = %s", (product_id, user_id))
        conn.commit()
        
        return jsonify({"message": "Produit supprimé avec succès"}), 200
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

@routes.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Déconnexion réussie", "redirect": "/"}), 200