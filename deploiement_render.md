## 🚀 Déploiement sur Render.com

### Après avoir mis votre code sur GitHub :

### 1. Créer un compte Render
- Aller sur https://render.com
- Cliquer "Get Started"
- Se connecter avec GitHub (recommandé)

### 2. Créer un nouveau Web Service
- Cliquer "New +" en haut à droite
- Choisir "Web Service"
- Connecter votre repository GitHub
- Sélectionner votre repository `3d-converter`

### 3. Configuration du service
**Paramètres à remplir :**
- **Name** : `3d-converter` (ou ce que vous voulez)
- **Environment** : `Python 3`
- **Build Command** : `pip install -r requirements.txt`
- **Start Command** : `python main_updated.py`

### 4. Variables d'environnement
Cliquer "Advanced" puis ajouter :
- **SITE_PASSWORD** = `votre-mot-de-passe-secret`
- **SECRET_KEY** = `une-cle-aleatoire-longue-123456`
- **FLASK_ENV** = `production`

### 5. Déployer
- Cliquer "Create Web Service"
- Attendre 5-10 minutes (première fois)
- Render va construire et déployer automatiquement

### 6. Récupérer votre lien
Une fois déployé, vous aurez un lien comme :
`https://3d-converter-xxxx.onrender.com`

**Votre site est en ligne ! 🎉**

### Test :
- Ouvrir le lien
- Entrer votre mot de passe
- Tester la conversion PNG → OBJ
