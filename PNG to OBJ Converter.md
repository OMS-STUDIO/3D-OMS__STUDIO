# PNG to OBJ Converter

Un site web privé et gratuit pour convertir des images PNG en modèles 3D au format OBJ, inspiré de 3dlogolab.io.

## 🚀 Démarrage rapide

1. **Installation**
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Linux/Mac ou venv\Scripts\activate sur Windows
pip install -r requirements.txt
\`\`\`

2. **Lancement**
\`\`\`bash
cd src
python main.py
\`\`\`

3. **Accès**
- Ouvrir http://localhost:5001
- Mot de passe par défaut : `png2obj2024`

## ✨ Fonctionnalités

- 🎯 Conversion PNG vers OBJ en un clic
- 🎨 Interface moderne avec drag & drop
- ⚙️ Paramètres ajustables (hauteur, simplification)
- 🔒 Accès sécurisé par mot de passe
- 📱 Compatible desktop et mobile
- 🆓 100% gratuit et open source

## 🛠️ Technologies

- **Backend** : Flask + OpenCV + Trimesh + Shapely
- **Frontend** : HTML5 + CSS3 + JavaScript vanilla
- **3D** : Algorithme d'extrusion avec validation géométrique

## 📖 Documentation

Voir `documentation_complete.md` pour :
- Guide d'installation détaillé
- Instructions d'utilisation
- Options de déploiement
- Code source commenté
- Dépannage et FAQ

## 🎯 Usage recommandé

- Logos et icônes
- Texte stylisé
- Formes géométriques simples
- Images avec contours nets

## 📋 Prérequis

- Python 3.8+
- 2 GB RAM minimum
- Navigateur web moderne

## 🔧 Configuration

Pour changer le mot de passe, modifier `DEFAULT_PASSWORD` dans `src/routes/auth.py`.

## 📄 Licence

Usage personnel et privé. Voir documentation pour détails.

---
**Créé par Manus AI - 2024**
