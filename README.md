# targeting-calculator-notion

## Description
Ce projet est un calculateur interactif conçu pour être intégré dans Notion. Il permet de visualiser et calculer la stratégie de ciblage ABM (Account Based Marketing) en fonction de différents paramètres :
- Nombre d'appels par semaine par commercial
- Nombre de commerciaux
- Taille du marché cible
- Stade d'awareness des prospects
- Nombre de personas par compte

## Fonctionnalités
- Calcul automatique de la capacité mensuelle
- Visualisation du marché adressable
- Estimation du temps de couverture
- Recommandations basées sur les métriques
- Interface adaptée à Notion

## Installation dans Notion
1. Déployez le projet sur Netlify
2. Dans Notion, créez un bloc "Embed"
3. Collez l'URL Netlify générée
4. Ajustez la taille selon vos besoins

## Structure du Projet
```
targeting-calculator-notion/
├── components/
│   ├── ui/              # Composants UI réutilisables
│   └── targeting/       # Calculateur principal
├── pages/
│   └── index.tsx        # Page principale
├── styles/              # Styles globaux
└── public/             # Assets statiques
```

## Technologies Utilisées
- Next.js
- React
- Tailwind CSS
- TypeScript
- shadcn/ui

## Déploiement
Ce projet est configuré pour un déploiement facile sur Netlify.

## Support
Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue dans le repository.
