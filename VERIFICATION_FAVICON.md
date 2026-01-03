# Comment vérifier que le favicon et les métadonnées fonctionnent

## 1. Vérifier le favicon dans le navigateur

### Méthode 1 : Onglet du navigateur
- Démarrez votre serveur de développement : `npm run dev`
- Ouvrez http://localhost:3000
- Regardez l'onglet du navigateur : vous devriez voir votre logo TF

### Méthode 2 : Inspecter le code source
1. Ouvrez http://localhost:3000
2. Clic droit → "Afficher le code source de la page"
3. Cherchez les balises `<link rel="icon">` dans le `<head>`
4. Vous devriez voir :
   ```html
   <link rel="icon" href="/images/favicon.ico" sizes="any">
   <link rel="icon" href="/images/favicon-16x16.png" sizes="16x16" type="image/png">
   <link rel="icon" href="/images/favicon-32x32.png" sizes="32x32" type="image/png">
   <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" sizes="180x180" type="image/png">
   ```

### Méthode 3 : Console du navigateur
1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet "Network" (Réseau)
3. Rechargez la page
4. Filtrez par "favicon" ou "icon"
5. Vérifiez que les fichiers se chargent avec un statut 200

## 2. Vérifier les métadonnées Open Graph

### Méthode 1 : Outils en ligne

**Facebook Debugger :**
- https://developers.facebook.com/tools/debug/
- Entrez votre URL (ou localhost:3000)
- Cliquez sur "Scraper" ou "Debug"
- Vérifiez que l'image og-image.png s'affiche

**Twitter Card Validator :**
- https://cards-dev.twitter.com/validator
- Entrez votre URL
- Vérifiez l'aperçu de la carte Twitter

**LinkedIn Post Inspector :**
- https://www.linkedin.com/post-inspector/
- Entrez votre URL
- Vérifiez l'aperçu

### Méthode 2 : Inspecter le code source
1. Ouvrez le code source de la page
2. Cherchez les balises `<meta property="og:...">`
3. Vous devriez voir :
   ```html
   <meta property="og:title" content="Thomas Foltzer - Développeur Full Stack">
   <meta property="og:description" content="Portfolio sobre et épuré...">
   <meta property="og:image" content="/og-image.png">
   <meta property="og:url" content="https://thomasfoltzer.com">
   ```

### Méthode 3 : Tester directement les URLs
- Ouvrez dans votre navigateur : http://localhost:3000/images/favicon.ico
- Ouvrez : http://localhost:3000/og-image.png
- Les images doivent s'afficher correctement

## 3. Vérifier sur mobile (iOS)

1. Ajoutez votre site à l'écran d'accueil iOS
2. L'icône devrait être votre logo TF (apple-touch-icon.png)

## 4. Vérifier avec curl (ligne de commande)

```bash
# Vérifier que les fichiers existent
curl -I http://localhost:3000/images/favicon.ico
curl -I http://localhost:3000/og-image.png

# Vérifier les métadonnées dans le HTML
curl http://localhost:3000 | grep -i "og:"
```

## 5. Outils de validation

- **W3C Validator** : https://validator.w3.org/
- **Google Rich Results Test** : https://search.google.com/test/rich-results
- **Schema.org Validator** : https://validator.schema.org/

## Problèmes courants

1. **Le favicon ne s'affiche pas** :
   - Videz le cache du navigateur (Ctrl+Shift+Delete)
   - Rechargez en forçant (Ctrl+F5)
   - Vérifiez que les fichiers sont bien dans `public/images/`

2. **Les métadonnées ne s'affichent pas sur les réseaux sociaux** :
   - Les réseaux sociaux mettent en cache les métadonnées
   - Utilisez leurs outils de débogage pour forcer un nouveau scrapping
   - Attendez quelques minutes après la mise en ligne

3. **Les chemins ne fonctionnent pas** :
   - Vérifiez que les fichiers sont dans `public/` (pas dans `app/`)
   - Les chemins commencent par `/` (ex: `/images/favicon.ico`)

