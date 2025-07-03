# PNG to OBJ Converter - Documentation Complète

## Vue d'ensemble du projet

Ce projet implémente un site web privé et gratuit inspiré de 3dlogolab.io qui permet de transformer des images PNG en modèles 3D exportables au format OBJ. L'application utilise uniquement des technologies open source et légères, sans dépendances payantes ou solutions cloud coûteuses.

## Fonctionnalités principales

- **Conversion PNG vers OBJ** : Transformation automatique d'images PNG en modèles 3D volumétriques
- **Interface web moderne** : Interface utilisateur intuitive avec drag & drop
- **Paramètres ajustables** : Contrôle de la hauteur d'extrusion et de la simplification des contours
- **Accès sécurisé** : Protection par mot de passe pour un usage privé
- **Export optimisé** : Fichiers OBJ prêts pour Blender et autres logiciels 3D
- **Stack légère** : Flask + OpenCV + Trimesh + Shapely

## Architecture technique

### Backend (Flask)
- **Framework** : Flask avec CORS activé
- **Traitement d'images** : OpenCV pour la détection de contours
- **Modélisation 3D** : Trimesh pour la génération de maillages
- **Géométrie** : Shapely pour la validation des polygones
- **Authentification** : Session-based avec hachage SHA256

### Frontend (HTML/CSS/JavaScript)
- **Interface responsive** : Compatible desktop et mobile
- **Drag & drop** : Upload intuitif des fichiers PNG
- **Aperçu en temps réel** : Prévisualisation des images uploadées
- **Contrôles interactifs** : Sliders pour ajuster les paramètres
- **Feedback utilisateur** : Barre de progression et messages d'état

### Algorithme de conversion

1. **Chargement de l'image** : Support PNG avec transparence
2. **Binarisation** : Conversion en image binaire (noir/blanc)
3. **Détection de contours** : Utilisation d'OpenCV pour extraire les formes
4. **Simplification** : Réduction du nombre de points pour optimiser le maillage
5. **Validation géométrique** : Vérification avec Shapely
6. **Extrusion 3D** : Création du volume par extrusion des polygones
7. **Export OBJ** : Génération du fichier 3D compatible Blender



## Installation et configuration

### Prérequis système

- Python 3.8 ou supérieur
- pip (gestionnaire de paquets Python)
- Git (optionnel, pour le clonage)

### Installation locale

1. **Cloner ou télécharger le projet**
\`\`\`bash
# Si vous avez Git
git clone <repository-url>
cd png-to-obj-converter

# Ou extraire l'archive ZIP fournie
unzip png-to-obj-converter.zip
cd png-to-obj-converter
\`\`\`

2. **Créer un environnement virtuel**
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
\`\`\`

3. **Installer les dépendances**
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. **Démarrer l'application**
\`\`\`bash
cd src
python main.py
\`\`\`

5. **Accéder à l'application**
- Ouvrir un navigateur web
- Aller à `http://localhost:5001`
- Entrer le mot de passe par défaut : `png2obj2024`

### Configuration de sécurité

Pour changer le mot de passe par défaut, modifier le fichier `src/routes/auth.py` :

\`\`\`python
# Remplacer cette ligne
DEFAULT_PASSWORD = "png2obj2024"
# Par votre mot de passe personnalisé
DEFAULT_PASSWORD = "votre_mot_de_passe_securise"
\`\`\`

### Dépendances principales

\`\`\`
Flask==3.1.1
flask-cors==6.0.0
opencv-python==4.11.0.86
trimesh==4.6.12
shapely==2.1.1
numpy==2.3.1
Werkzeug==3.1.3
\`\`\`


## Guide d'utilisation

### Interface utilisateur

1. **Authentification**
   - Entrer le mot de passe pour accéder à l'application
   - La session reste active pendant la navigation

2. **Upload d'image**
   - Cliquer sur "Choisir une image PNG" ou glisser-déposer un fichier
   - Formats supportés : PNG uniquement
   - Taille recommandée : moins de 5 MB

3. **Configuration des paramètres**
   - **Hauteur d'extrusion** (0.1 - 5.0) : Contrôle l'épaisseur du modèle 3D
   - **Simplification des contours** (0.001 - 0.02) : Réduit la complexité du maillage

4. **Conversion**
   - Cliquer sur "Convertir en 3D"
   - Attendre la fin du traitement (barre de progression)
   - Télécharger le fichier OBJ généré

### Conseils pour de meilleurs résultats

#### Images recommandées
- **Contours nets** : Éviter les images floues ou pixelisées
- **Contraste élevé** : Formes bien définies sur fond transparent ou uni
- **Formes simples** : Les logos et textes donnent de meilleurs résultats
- **Résolution optimale** : 500x500 à 2000x2000 pixels

#### Paramètres optimaux
- **Logos simples** : Hauteur 1.0, Simplification 0.005
- **Texte** : Hauteur 0.5-1.5, Simplification 0.002-0.008
- **Formes complexes** : Hauteur 0.8, Simplification 0.01-0.02

### Utilisation dans Blender

1. **Import du fichier OBJ**
   - File > Import > Wavefront (.obj)
   - Sélectionner le fichier téléchargé

2. **Optimisation du modèle**
   - Appliquer un modificateur "Smooth" si nécessaire
   - Ajuster l'échelle selon vos besoins
   - Ajouter des matériaux et textures

3. **Export pour impression 3D**
   - File > Export > STL pour l'impression 3D
   - Vérifier l'étanchéité du maillage avec "3D Print Toolbox"


## Options de déploiement

### Déploiement local (recommandé)

L'application est conçue pour fonctionner localement sur votre machine personnelle :

\`\`\`bash
# Démarrage simple
cd png-to-obj-converter/src
python main.py
\`\`\`

### Déploiement sur serveur personnel

#### Configuration pour serveur Linux

1. **Installation sur Ubuntu/Debian**
\`\`\`bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
git clone <repository-url>
cd png-to-obj-converter
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`

2. **Service systemd (optionnel)**
\`\`\`bash
# Créer le fichier service
sudo nano /etc/systemd/system/png-to-obj.service

[Unit]
Description=PNG to OBJ Converter
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/png-to-obj-converter/src
Environment=PATH=/path/to/png-to-obj-converter/venv/bin
ExecStart=/path/to/png-to-obj-converter/venv/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target

# Activer le service
sudo systemctl enable png-to-obj
sudo systemctl start png-to-obj
\`\`\`

### Déploiement cloud gratuit

#### Render.com (recommandé)

1. **Préparer le projet**
   - Créer un compte sur render.com
   - Connecter votre repository Git

2. **Configuration de déploiement**
   - Type : Web Service
   - Build Command : `pip install -r requirements.txt`
   - Start Command : `cd src && python main.py`
   - Port : 5001

3. **Variables d'environnement**
   - Ajouter `FLASK_ENV=production`
   - Modifier le mot de passe par défaut

#### Railway.app

1. **Déploiement en un clic**
   - Connecter votre repository GitHub
   - Railway détecte automatiquement Flask
   - Déploiement automatique

#### Heroku (avec limitations)

1. **Fichiers requis**
\`\`\`bash
# Procfile
web: cd src && python main.py

# runtime.txt
python-3.11.0
\`\`\`

2. **Déploiement**
\`\`\`bash
heroku create your-app-name
git push heroku main
\`\`\`

### Configuration de production

#### Sécurité renforcée

1. **Modifier le secret key**
\`\`\`python
# Dans src/main.py
app.config['SECRET_KEY'] = 'votre-cle-secrete-aleatoire-longue'
\`\`\`

2. **HTTPS obligatoire**
\`\`\`python
# Ajouter dans src/main.py
from flask_talisman import Talisman
Talisman(app, force_https=True)
\`\`\`

3. **Limitation de taille de fichier**
\`\`\`python
# Dans src/main.py
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max
\`\`\`

#### Optimisations de performance

1. **Cache des résultats**
\`\`\`python
# Ajouter Redis pour le cache
from flask_caching import Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
\`\`\`

2. **Compression des réponses**
\`\`\`python
from flask_compress import Compress
Compress(app)
\`\`\`


## Code source principal

### Structure du projet

\`\`\`
png-to-obj-converter/
├── src/
│   ├── main.py                 # Point d'entrée Flask
│   ├── static/
│   │   └── index.html         # Interface utilisateur
│   ├── routes/
│   │   ├── convert.py         # API de conversion
│   │   ├── auth.py           # Authentification
│   │   └── user.py           # Routes utilisateur (template)
│   ├── models/
│   │   └── user.py           # Modèles de données
│   └── database/
│       └── app.db            # Base de données SQLite
├── venv/                      # Environnement virtuel
├── requirements.txt           # Dépendances Python
└── README.md                 # Instructions de base
\`\`\`

### Moteur de conversion (convert.py)

Le cœur de l'application réside dans la fonction `png_to_obj_conversion` :

\`\`\`python
def png_to_obj_conversion(image_path, output_obj_path, extrusion_height=1.0, simplify_tolerance=0.005):
    # 1. Chargement et préparation de l'image
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    
    # 2. Gestion de la transparence
    if img.shape[2] == 4:
        alpha_channel = img[:, :, 3]
        _, binary_img = cv2.threshold(alpha_channel, 1, 255, cv2.THRESH_BINARY)
    else:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, binary_img = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    
    # 3. Détection des contours
    contours, _ = cv2.findContours(binary_img.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # 4. Traitement de chaque contour
    meshes = []
    for contour in contours:
        # Simplification du contour
        epsilon = simplify_tolerance * cv2.arcLength(contour, True)
        approx_contour = cv2.approxPolyDP(contour, epsilon, True)
        
        # Normalisation des coordonnées
        base_points = approx_contour.reshape(-1, 2).astype(np.float64)
        # ... normalisation et centrage ...
        
        # Validation avec Shapely
        poly = Polygon(base_points)
        if poly.is_valid:
            # Extrusion 3D avec Trimesh
            extruded_mesh = trimesh.creation.extrude_polygon(poly, extrusion_height)
            meshes.append(extruded_mesh)
    
    # 5. Combinaison et export
    final_mesh = trimesh.util.concatenate(meshes)
    final_mesh.export(output_obj_path)
\`\`\`

### Interface utilisateur (index.html)

L'interface utilise HTML5, CSS3 et JavaScript vanilla pour une expérience moderne :

- **Design responsive** avec CSS Grid et Flexbox
- **Drag & drop** natif HTML5
- **Aperçu d'image** avec FileReader API
- **Contrôles interactifs** avec des sliders HTML5
- **Upload asynchrone** avec Fetch API
- **Feedback visuel** avec animations CSS

### Authentification (auth.py)

Système d'authentification simple basé sur les sessions Flask :

\`\`\`python
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    password = data['password']
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    if password_hash == PASSWORD_HASH:
        session['authenticated'] = True
        return jsonify({'success': True})
    else:
        return jsonify({'error': 'Mot de passe incorrect'}), 401
\`\`\`

### API REST

L'application expose une API REST simple :

- `POST /api/login` : Authentification
- `POST /api/logout` : Déconnexion
- `GET /api/check` : Vérification du statut d'authentification
- `POST /api/convert` : Conversion PNG vers OBJ


## Dépannage et FAQ

### Problèmes courants

#### Erreur "Module not found"
\`\`\`bash
# Solution : Activer l'environnement virtuel
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
\`\`\`

#### Port déjà utilisé
\`\`\`bash
# Changer le port dans src/main.py
app.run(host='0.0.0.0', port=5002, debug=True)
\`\`\`

#### Erreur OpenCV sur Linux
\`\`\`bash
# Installer les dépendances système
sudo apt-get update
sudo apt-get install python3-opencv
# ou
sudo apt-get install libgl1-mesa-glx
\`\`\`

#### Fichier OBJ vide ou corrompu
- Vérifier que l'image PNG a des contours nets
- Augmenter la tolérance de simplification
- Utiliser une image avec plus de contraste

### FAQ

**Q : Quels formats d'image sont supportés ?**
R : Uniquement PNG. Les autres formats peuvent être convertis avec des outils comme GIMP ou Photoshop.

**Q : Quelle est la taille maximale d'image ?**
R : Par défaut 16 MB, configurable dans le code. Recommandé : moins de 5 MB.

**Q : Le modèle 3D est trop fin/épais ?**
R : Ajuster le paramètre "Hauteur d'extrusion" entre 0.1 et 5.0.

**Q : Le maillage a trop de polygones ?**
R : Augmenter la "Simplification des contours" vers 0.02.

**Q : Comment changer le mot de passe ?**
R : Modifier `DEFAULT_PASSWORD` dans `src/routes/auth.py`.

**Q : L'application est-elle sécurisée ?**
R : Pour un usage local/privé oui. Pour un déploiement public, ajouter HTTPS et d'autres mesures de sécurité.

**Q : Puis-je traiter plusieurs images en même temps ?**
R : Non, l'interface actuelle ne supporte qu'une image à la fois.

**Q : Le fichier OBJ fonctionne-t-il avec d'autres logiciels 3D ?**
R : Oui, le format OBJ est standard et compatible avec Blender, Maya, 3ds Max, etc.

### Limitations connues

1. **Formats d'entrée** : PNG uniquement
2. **Complexité** : Les images très détaillées peuvent générer des maillages lourds
3. **Couleurs** : Seules les formes sont converties, pas les couleurs/textures
4. **Concurrence** : Une seule conversion à la fois
5. **Mémoire** : Les très grandes images peuvent consommer beaucoup de RAM

### Améliorations futures possibles

1. **Support multi-formats** : JPG, SVG, PDF
2. **Traitement par lots** : Conversion multiple
3. **Préservation des couleurs** : Export avec matériaux
4. **Interface avancée** : Prévisualisation 3D en temps réel
5. **API étendue** : Endpoints pour intégration externe
6. **Cache intelligent** : Éviter les reconversions
7. **Optimisation automatique** : Paramètres adaptatifs selon l'image

## Support et contribution

### Signaler un bug

1. Vérifier que le problème n'est pas dans la FAQ
2. Reproduire le problème avec une image de test simple
3. Noter la version de Python et du système d'exploitation
4. Inclure les logs d'erreur complets

### Proposer une amélioration

1. Décrire clairement le besoin
2. Proposer une solution technique si possible
3. Considérer l'impact sur la simplicité du projet

### Licence et utilisation

Ce projet est fourni "tel quel" pour un usage personnel et privé. Vous êtes libre de :
- Utiliser l'application pour vos projets personnels
- Modifier le code selon vos besoins
- Déployer sur vos propres serveurs

Restrictions :
- Pas d'usage commercial sans autorisation
- Pas de redistribution du code sans mention de l'auteur
- Aucune garantie de fonctionnement ou de support

---

**Projet créé par Manus AI - Décembre 2024**
**Version 1.0 - Documentation complète**
