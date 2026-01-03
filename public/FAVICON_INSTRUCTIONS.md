# Instructions pour ajouter le logo TF comme favicon

## Fichiers nécessaires

Placez votre logo TF (format PNG avec fond transparent ou SVG) dans le dossier `public/images/logo/` et nommez-le `logo.png` ou `logo.svg`.

## Tailles requises

Vous devez créer les fichiers suivants dans le dossier `public/` :

1. **favicon.ico** - 32x32 pixels (format ICO)
2. **favicon-16x16.png** - 16x16 pixels
3. **favicon-32x32.png** - 32x32 pixels
4. **apple-touch-icon.png** - 180x180 pixels (pour iOS)
5. **og-image.png** - 1200x630 pixels (pour Open Graph / réseaux sociaux)

## Outils recommandés

- **En ligne** : https://realfavicongenerator.net/ (génère tous les formats automatiquement)
- **En ligne** : https://www.favicon-generator.org/
- **Logiciel** : ImageMagick, GIMP, Photoshop

## Étapes rapides

1. Placez votre logo dans `public/images/logo/logo.png`
2. Utilisez un générateur en ligne comme https://realfavicongenerator.net/
3. Téléchargez tous les fichiers générés
4. Placez-les dans le dossier `public/`
5. Pour l'image Open Graph (og-image.png), créez une image 1200x630px avec votre logo centré sur fond noir

## Note

Si vous utilisez un SVG, vous pouvez aussi créer un fichier `public/icon.svg` et Next.js l'utilisera automatiquement.

