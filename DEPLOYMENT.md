# Guide de déploiement - Vercel + IONOS

## Configuration du domaine personnalisé

### 1. Configuration sur Vercel

1. Connectez-vous à votre compte Vercel
2. Sélectionnez votre projet `portfolio2k25`
3. Allez dans **Settings** → **Domains**
4. Cliquez sur **Add Domain**
5. Entrez votre domaine (ex: `votredomaine.com`)
6. Vercel vous donnera les instructions DNS à configurer

### 2. Configuration DNS sur IONOS

#### Option A : Domaine racine + www (recommandé)

**Pour le domaine racine (`votredomaine.com`) :**
- Type : `A`
- Nom : `@` (ou laissez vide)
- Valeur : `76.76.21.21` (IP Vercel)

**Pour www (`www.votredomaine.com`) :**
- Type : `CNAME`
- Nom : `www`
- Valeur : `cname.vercel-dns.com`

#### Option B : Si IONOS supporte ALIAS/ANAME

**Pour le domaine racine :**
- Type : `ALIAS` ou `ANAME`
- Nom : `@`
- Valeur : `cname.vercel-dns.com`

**Pour www :**
- Type : `CNAME`
- Nom : `www`
- Valeur : `cname.vercel-dns.com`

### 3. Vérification

- La propagation DNS peut prendre de quelques minutes à 48 heures
- Vercel vérifiera automatiquement la configuration
- Un certificat SSL sera généré automatiquement une fois la configuration validée

### 4. Redirection (optionnel)

Pour rediriger automatiquement `votredomaine.com` vers `www.votredomaine.com` (ou vice versa), configurez cela dans les paramètres de domaine de Vercel.

## Commandes utiles

```bash
# Déployer sur Vercel
vercel

# Déployer en production
vercel --prod

# Vérifier la configuration
vercel domains ls
```

## Ressources

- [Documentation Vercel - Domaines personnalisés](https://vercel.com/docs/concepts/projects/domains)
- [Documentation IONOS - Gestion DNS](https://www.ionos.fr/assistance/domaines/configurer-dns-avec-1-1-ionos/configurer-les-enregistrements-dns/)

