export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  tags: string[];
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "pourquoi-investir-dans-un-site-sur-mesure-plutot-qu-un-site-generic",
    title: "Pourquoi investir dans un site sur-mesure plutôt qu’un site générique",
    description:
      "Les limites des sites « tout faits » et ce qu’un site sur-mesure peut réellement apporter à ton activité.",
    date: "2025-01-10",
    readingTime: "6 min",
    tags: ["site vitrine", "business", "strategie"],
    content: `
Quand on lance ou qu’on fait évoluer une activité, la tentation est forte de choisir un site « rapide et pas cher » avec un template générique.
Sur le papier, ça coche toutes les cases : joli visuel, quelques sections, un formulaire de contact… mais dans la pratique, ce type de site se ressemble tous et **ne raconte rien de toi**.

Un site sur-mesure a un autre objectif : **servir ta stratégie**.
On part de tes offres, de tes clients idéaux, de ce qui fait ta différence… puis on construit une expérience qui parle leur langage :
- un message clair dès le hero (« ce que tu fais » + « pour qui » + « bénéfice concret »),
- une structure qui accompagne le visiteur jusqu’à la prise de contact,
- des sections pensées pour lever les objections (preuves, témoignages, études de cas, FAQ, etc.).

Le design, lui aussi, s’adapte à ton positionnement :
- si tu vends des prestations premium, le site doit refléter **la qualité et la rigueur**,
- si tu t’adresses à des startups, l’accent sera mis sur la **clarté, la rapidité, les call-to-action directs**.

Un template peut dépanner pour un side-project ou une idée à tester.
Mais dès que ton site devient un **vrai levier business**, le sur-mesure fait la différence : meilleur taux de conversion, meilleure crédibilité, et surtout une image cohérente avec la valeur que tu apportes.
    `.trim(),
  },
  {
    slug: "comment-un-site-performant-peut-augmenter-tes-conversions",
    title: "Comment un site performant peut augmenter tes conversions",
    description:
      "Vitesse de chargement, expérience mobile, structure claire : pourquoi la performance n’est pas qu’un sujet technique.",
    date: "2025-01-15",
    readingTime: "5 min",
    tags: ["performance", "optimisation", "conversions"],
    content: `
On parle souvent de performance web en termes purement techniques : score Lighthouse, taille des bundles, optimisation des images…
Mais pour une entreprise, la vraie question est simple : **est-ce que mon site me fait gagner ou perdre des opportunités ?**

Un site lent a plusieurs effets négatifs :
- les visiteurs quittent la page avant même d’avoir vu ton offre,
- Google pénalise le référencement sur mobile,
- la navigation devient frustrante, ce qui donne une impression d’amateurisme.

À l’inverse, un site performant :
- se charge rapidement même sur une 4G moyenne,
- affiche le contenu utile dès les premières secondes,
- permet aux utilisateurs de naviguer sans friction jusqu’à la prise de contact ou la commande.

Concrètement, travailler la performance, c’est :
- optimiser les images (formats modernes, compression, chargement progressif),
- éviter le surplus de scripts inutiles,
- structurer les pages pour qu’elles restent lisibles, même sur petit écran.

La performance n’est pas un luxe technique : c’est un **facteur direct de confiance et de conversion**.
    `.trim(),
  },
  {
    slug: "refondre-son-site-pour-mieux-reflechir-a-son-offre",
    title: "Refondre son site pour mieux réfléchir à son offre",
    description:
      "Pourquoi une refonte de site est l’occasion idéale de clarifier ton message et tes priorités business.",
    date: "2025-01-20",
    readingTime: "6 min",
    tags: ["refonte", "strategie", "positionnement"],
    content: `
Beaucoup de refontes commencent par : « le design ne me plaît plus ».
En réalité, une refonte de site est surtout une opportunité de **repenser ton offre et ton message**.

Avant même de parler maquettes, je recommande toujours de se poser quelques questions simples :
- Qui sont aujourd’hui tes meilleurs clients ?
- Quels services veux-tu vraiment pousser dans les prochains mois ?
- Qu’est-ce qui te différencie concrètement de tes concurrents ?

Les réponses à ces questions guident la structure du futur site :
- quelles pages sont vraiment nécessaires (et lesquelles peuvent disparaître),
- quels messages doivent apparaître dès la première vue,
- quelles preuves tu peux mettre en avant (résultats, chiffres, témoignages, projets).

Une bonne refonte ne consiste pas seulement à « moderniser » un site.
Elle permet d’aligner ton interface, ton discours et ton tunnel de conversion avec la réalité de ton activité actuelle.

Au final, ton site devient plus qu’une vitrine : c’est un outil clair, cohérent et assumé pour attirer les bons clients.
    `.trim(),
  },
];

export function getAllPosts() {
  return blogPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}


