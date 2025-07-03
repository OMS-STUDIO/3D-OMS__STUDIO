# 🚀 Guide de déploiement en ligne

## Étapes pour mettre votre site en ligne :

### 1. Render.com (Gratuit et simple)

1. **Créer un compte sur render.com**
2. **Connecter votre code :**
   - Créer un repository GitHub avec votre code
   - Connecter le repository à Render

3. **Configuration du service :**
   - Type : Web Service
   - Build Command : `pip install -r requirements.txt`
   - Start Command : `python main_production.py`
   - Port : 5001

4. **Variables d'environnement :**
   - `SITE_PASSWORD` : votre-mot-de-passe-personnalise
   - `SECRET_KEY` : une-cle-secrete-aleatoire
   - `FLASK_ENV` : production

5. **Déploiement :**
   - Render génère automatiquement une URL comme : `https://votre-app.onrender.com`

### 2. Railway.app (Alternative)

1. **Connecter GitHub à Railway**
2. **Déploiement automatique**
3. **URL générée automatiquement**

### 3. Heroku (Avec limitations gratuites)

1. **Créer les fichiers requis :**
   - `Procfile` : `web: python main_production.py`
   - `runtime.txt` : `python-3.11.0`

2. **Déployer :**
   \`\`\`bash
   heroku create votre-app-name
   git push heroku main
   \`\`\`

## Sécurité :

- Changez le mot de passe par défaut
- Utilisez HTTPS (automatique sur Render/Railway)
- Configurez des variables d'environnement sécurisées

## Résultat :

Vous obtiendrez un lien comme :
- `https://votre-app.onrender.com`
- `https://votre-app.railway.app`
- `https://votre-app.herokuapp.com`

Accessible de partout avec authentification par mot de passe !
