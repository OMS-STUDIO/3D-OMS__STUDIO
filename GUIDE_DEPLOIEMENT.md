# 🚀 Guide de déploiement complet

## **Étape 1 : Télécharger le projet**
1. Cliquer sur "Download Code" en haut à droite
2. Extraire le fichier ZIP sur votre ordinateur

## **Étape 2 : GitHub**
1. Aller sur https://github.com
2. Créer un compte (si pas déjà fait)
3. Cliquer "New repository"
4. Nom : `3d-oms-studio`
5. Cocher "Add a README file"
6. Cliquer "Create repository"
7. **Drag & drop TOUS les fichiers** du projet dans GitHub
8. Message : "Upload projet complet"
9. Cliquer "Commit changes"

## **Étape 3 : Render.com**
1. Aller sur https://render.com
2. Créer un compte (se connecter avec GitHub)
3. Cliquer "New +" → "Web Service"
4. Sélectionner votre repository `3d-oms-studio`
5. Configuration :
   - **Name** : `3d-oms-studio`
   - **Build Command** : `pip install -r requirements.txt`
   - **Start Command** : `python main_updated.py`

## **Étape 4 : Variables d'environnement**
Dans Render, section "Environment" :
- `SITE_PASSWORD` = `votre-mot-de-passe-secret`
- `SECRET_KEY` = `une-cle-aleatoire-123456789`
- `FLASK_ENV` = `production`

## **Étape 5 : Déployer**
1. Cliquer "Create Web Service"
2. Attendre 5-10 minutes
3. Récupérer votre lien : `https://3d-oms-studio-xxxx.onrender.com`

## **🎉 C'est fini !**
Votre site est en ligne et accessible partout dans le monde !

### **Test :**
1. Ouvrir votre lien Render
2. Entrer votre mot de passe
3. Tester la conversion PNG → OBJ
4. Personnaliser l'interface avec les thèmes

---

**En cas de problème :** Vérifier que tous les fichiers sont bien sur GitHub et que les variables d'environnement sont correctes.
