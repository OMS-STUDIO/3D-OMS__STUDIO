# 🎯 3D OMS__STUDIO v2.0

> **Transformez vos images PNG en modèles 3D avec un aperçu en temps réel et une interface personnalisable !**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/your-repo/3d-oms-studio)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://python.org)
[![Three.js](https://img.shields.io/badge/three.js-r128-orange.svg)](https://threejs.org)

## ✨ Nouveautés v2.0

🎨 **Aperçu 3D en temps réel** - Visualisez instantanément vos modèles 3D  
⚙️ **Personnalisation avancée** - 6 thèmes + couleurs personnalisées  
🎭 **Design moderne** - Interface élégante avec coins arrondis  
📱 **100% Responsive** - Parfait sur mobile et desktop  
🚀 **Performances optimisées** - Rendu 3D fluide et animations soignées  

## 🚀 Démarrage rapide

### Installation en 3 étapes

\`\`\`bash
# 1. Cloner et installer
git clone https://github.com/your-repo/3d-oms-studio.git
cd 3d-oms-studio
pip install -r requirements.txt

# 2. Lancer l'application
python main_updated.py

# 3. Ouvrir dans le navigateur
# http://localhost:5001
# Mot de passe: png2obj2024
\`\`\`

### Utilisation immédiate

1. **📁 Uploadez** votre image PNG (drag & drop supporté)
2. **⚙️ Ajustez** les paramètres de conversion
3. **🎯 Convertissez** et visualisez en 3D
4. **📥 Téléchargez** votre fichier OBJ

## 🎨 Fonctionnalités principales

### Conversion PNG → OBJ
- ✅ Détection automatique des contours
- ✅ Extrusion 3D paramétrable
- ✅ Simplification intelligente des maillages
- ✅ Export compatible Blender

### Aperçu 3D interactif
- 🎮 Navigation intuitive (rotation, zoom, panoramique)
- 💡 Éclairage professionnel avec ombres
- 🔄 Rotation automatique
- 🎨 Matériaux adaptatifs selon le thème

### Personnalisation de l'interface
- 🎨 **6 thèmes prédéfinis** : Défaut, Océan, Coucher de soleil, Forêt, Violet, Sombre
- 🌈 **Couleurs personnalisées** : Sélecteurs de couleur avancés
- 👤 **Identité personnalisable** : Nom et prénom dans l'en-tête
- 🎭 **Effets visuels** : Animations et transparences optionnelles

## 📸 Captures d'écran

### Interface principale
![Interface principale](screenshots/main-interface.png)

### Menu de personnalisation
![Menu personnalisation](screenshots/settings-menu.png)

### Aperçu 3D
![Aperçu 3D](screenshots/3d-preview.png)

## 🛠️ Technologies utilisées

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Backend** | Flask | 2.3+ |
| **Conversion 3D** | OpenCV + Trimesh | Latest |
| **Rendu 3D** | Three.js | r128 |
| **Interface** | HTML5/CSS3/JS | ES6+ |
| **Géométrie** | Shapely | 2.0+ |

## 📋 Prérequis

- **Python** 3.8 ou supérieur
- **Navigateur moderne** avec support WebGL
- **4 Go RAM** minimum recommandé
- **Connexion internet** (pour les CDN Three.js)

## 🔧 Configuration avancée

### Variables d'environnement
\`\`\`bash
export FLASK_ENV=production
export SECRET_KEY=your-secret-key
export MAX_CONTENT_LENGTH=16777216  # 16MB
export UPLOAD_FOLDER=/tmp/uploads
\`\`\`

### Personnalisation des thèmes
\`\`\`javascript
// Ajouter un thème personnalisé
window.themeManager.themes.custom = {
    name: 'Mon Thème',
    primary: '#your-color',
    secondary: '#your-color',
    accent: '#your-color',
    background: 'gradient'
};
\`\`\`

## 🚀 Déploiement

### Hébergement gratuit

#### Render.com (Recommandé)
\`\`\`yaml
services:
  - type: web
    name: 3d-oms-studio
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python main_updated.py
\`\`\`

#### Railway.app
\`\`\`bash
railway login
railway init
railway up
\`\`\`

#### Heroku
\`\`\`bash
heroku create your-app-name
git push heroku main
\`\`\`

## 📚 Documentation

- 📖 **[Documentation complète](documentation_v2.md)** - Guide détaillé
- 🎯 **[Guide d'utilisation](docs/usage.md)** - Tutoriels pas à pas
- 🔧 **[API Reference](docs/api.md)** - Documentation technique
- 🎨 **[Guide de personnalisation](docs/theming.md)** - Créer vos thèmes

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre [guide de contribution](CONTRIBUTING.md).

### Développement local
\`\`\`bash
# Installation en mode développement
pip install -r requirements-dev.txt

# Tests
python -m pytest tests/

# Linting
flake8 src/
black src/
\`\`\`

## 📈 Roadmap

### v2.1 (Prochaine)
- [ ] Export STL/PLY/GLTF
- [ ] Présets de conversion
- [ ] Historique des projets
- [ ] Mode batch

### v2.2
- [ ] Éditeur 3D intégré
- [ ] Textures automatiques
- [ ] Plugin Blender
- [ ] API REST complète

## ❓ Support

### FAQ
- **L'aperçu 3D ne fonctionne pas** → Vérifiez le support WebGL
- **Thèmes non sauvegardés** → Activez le localStorage
- **Conversion lente** → Réduisez la complexité de l'image

### Obtenir de l'aide
- 🐛 **[Issues GitHub](https://github.com/your-repo/issues)** - Bugs et demandes
- 💬 **[Discussions](https://github.com/your-repo/discussions)** - Questions générales
- 📧 **[Contact](mailto:support@example.com)** - Support direct

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Three.js** - Rendu 3D dans le navigateur
- **OpenCV** - Traitement d'images
- **Trimesh** - Manipulation de maillages 3D
- **Flask** - Framework web Python
- **Communauté open source** - Pour l'inspiration et les contributions

---

<div align="center">

**Fait avec ❤️ pour la communauté 3D**

[⭐ Star ce projet](https://github.com/your-repo/3d-oms-studio) • [🐛 Reporter un bug](https://github.com/your-repo/issues) • [💡 Suggérer une fonctionnalité](https://github.com/your-repo/discussions)

</div>
