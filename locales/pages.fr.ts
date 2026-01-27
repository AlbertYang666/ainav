const frPages = {
  about: {
    metaTitle: "À propos - AI Nav | Plateforme de Découverte d'Outils IA",
    metaDescription: "AI Nav est une plateforme dédiée à la découverte d'outils IA de qualité. Notre mission est d'aider les utilisateurs à trouver les meilleurs outils IA.",
    keywords: ["Navigation IA", "À propos", "Plateforme d'outils IA"],
    title: "À propos d'AI Nav",
    subtitle: "Nous nous engageons à créer la meilleure plateforme mondiale de découverte d'outils IA.",
    missionLabel: "Notre Mission",
    missionTitle: "Rendre l'IA Accessible à Tous",
    missionText1: "À l'ère du développement rapide de l'IA, de nouveaux outils apparaissent constamment. AI Nav est né pour résoudre ce problème.",
    missionText2: "Nous sélectionnons et évaluons soigneusement chaque outil IA pour vous aider à trouver rapidement la meilleure solution.",
    stats: { tools: "Outils Sélectionnés", categories: "Catégories", users: "Visites Mensuelles", languages: "Langues" },
    valuesTitle: "Nos Valeurs Fondamentales",
    valuesSubtitle: "Ces principes guident chacune de nos décisions",
    values: {
      community: { title: "Communauté d'abord", description: "Nous croyons au pouvoir des communautés ouvertes et transparentes." },
      quality: { title: "Qualité avant tout", description: "Nous examinons rigoureusement chaque outil répertorié." },
      innovation: { title: "Embrasser l'Innovation", description: "Nous suivons les derniers développements en IA." },
    },
    businessLabel: "Modèle Commercial",
    businessTitle: "Une Voie Durable",
    businessDescription: "AI Nav utilise un modèle commercial transparent et convivial.",
    business: {
      free: { title: "🆓 Accès Gratuit", description: "Toutes les fonctionnalités principales sont gratuites." },
      premium: { title: "💎 Services Premium", description: "Nous générons des revenus grâce à la publicité ciblée." },
    },
    legalLabel: "Juridique & Conformité",
    legalTitle: "Vos Droits, Notre Responsabilité",
    legal: {
      privacy: { title: "🔒 Protection de la Vie Privée", description: "Nous respectons strictement le RGPD et autres réglementations.", link: "Voir la Politique Complète" },
      dataProtection: { title: "🛡️ Sécurité des Données", description: "Toutes les transmissions utilisent le chiffrement SSL/TLS." },
      terms: { title: "📋 Conditions d'Utilisation", description: "L'utilisation d'AI Nav implique l'acceptation de nos conditions.", link: "Voir les Conditions Complètes" },
      disclaimer: { title: "⚠️ Avertissement", description: "AI Nav sert uniquement de plateforme de découverte." },
    },
    contactTitle: "Rejoignez Notre Voyage",
    contactDescription: "Construisons ensemble un meilleur écosystème IA.",
    submitTool: "Soumettre un Outil",
    contactUs: "Nous Contacter",
  },
  privacy: {
    metaTitle: "Politique de Confidentialité - AI Nav",
    metaDescription: "Découvrez comment AI Nav collecte, utilise et protège vos informations personnelles.",
    keywords: ["politique de confidentialité", "protection des données", "RGPD"],
    badge: "Votre Vie Privée, Notre Engagement",
    title: "Politique de Confidentialité",
    subtitle: "Nous valorisons et protégeons votre vie privée.",
    lastUpdated: "Dernière Mise à Jour",
    quickNav: "Navigation Rapide",
    introduction: "AI Nav s'engage à protéger la vie privée des utilisateurs. Cette politique explique quelles informations nous collectons et comment nous les utilisons.",
    sections: {
      dataCollection: {
        title: "Informations Collectées",
        description: "Pour fournir de meilleurs services, nous pouvons collecter :",
        items: {
          account: { title: "Informations de Compte", description: "Adresse e-mail lors de la création de compte." },
          newsletter: { title: "Abonnement Newsletter", description: "Adresse e-mail pour les recommandations." },
          submission: { title: "Soumissions d'Outils", description: "Informations sur les outils et adresse e-mail." },
          usage: { title: "Données d'Utilisation", description: "Statistiques anonymes pour améliorer les services." }
        }
      },
      dataUsage: {
        title: "Utilisation des Informations",
        description: "Les informations collectées sont utilisées pour :",
        purposes: [
          "Fournir et améliorer nos services",
          "Traiter vos soumissions d'outils",
          "Envoyer des recommandations par e-mail",
          "Répondre à vos demandes",
          "Détecter et prévenir les problèmes",
          "Analyser l'utilisation des services",
          "Se conformer aux obligations légales",
          "Autres fins avec votre consentement"
        ]
      },
      dataSecurity: {
        title: "Mesures de Sécurité",
        description: "Nous mettons en œuvre plusieurs mesures de sécurité :",
        measures: [
          "Chiffrement SSL/TLS pour toutes les transmissions",
          "Hachage des informations sensibles",
          "Utilisation de fournisseurs cloud sécurisés",
          "Révision régulière des politiques de sécurité",
          "Accès limité aux données personnelles",
          "Plans de sauvegarde et de récupération"
        ]
      },
      yourRights: {
        title: "Vos Droits",
        description: "Conformément au RGPD, vous disposez des droits suivants :",
        rights: [
          { title: "Droit d'Accès", description: "Demander l'accès à vos données personnelles." },
          { title: "Droit de Rectification", description: "Corriger les informations inexactes." },
          { title: "Droit à l'Effacement", description: "Demander la suppression de vos données." },
          { title: "Droit à la Portabilité", description: "Obtenir vos données dans un format structuré." },
          { title: "Droit d'Opposition", description: "S'opposer au traitement de vos données." },
          { title: "Droit de Limitation", description: "Demander la limitation du traitement." }
        ]
      },
      cookies: {
        title: "Cookies",
        description: "Nous utilisons les types de cookies suivants :",
        types: [
          { name: "Cookies Essentiels", purpose: "Nécessaires au fonctionnement du site." },
          { name: "Cookies Analytiques", purpose: "Comprendre comment les utilisateurs interagissent." },
          { name: "Cookies de Préférences", purpose: "Mémoriser vos paramètres." }
        ]
      },
      thirdParty: {
        title: "Services Tiers",
        description: "Nous utilisons des services tiers de confiance :",
        services: [
          { name: "Supabase", purpose: "Base de données et authentification", link: "https://supabase.com/privacy" },
          { name: "Resend", purpose: "Service d'envoi d'e-mails", link: "https://resend.com/legal/privacy-policy" },
          { name: "NextAuth", purpose: "Authentification tierce", link: "https://next-auth.js.org/getting-started/introduction" },
          { name: "Vercel", purpose: "Hébergement web", link: "https://vercel.com/legal/privacy-policy" }
        ],
        viewPolicy: "Voir la Politique"
      },
      international: {
        title: "Transferts Internationaux",
        description: "Vos informations peuvent être transférées vers des serveurs situés en dehors de votre pays. Nous prenons les mesures appropriées pour protéger vos données."
      },
      contact: {
        title: "Nous Contacter",
        description: "Pour toute question concernant cette politique, contactez-nous :"
      }
    }
  },
  terms: {
    metaTitle: "Conditions d'Utilisation - AI Nav",
    metaDescription: "Comprendre les conditions d'utilisation des services AI Nav.",
    keywords: ["conditions d'utilisation", "accord utilisateur"],
    badge: "Règles et Accords",
    title: "Conditions d'Utilisation",
    subtitle: "Veuillez lire attentivement ces conditions avant d'utiliser AI Nav.",
    lastUpdated: "Dernière Mise à Jour",
    quickNav: "Navigation Rapide",
    introduction: "Bienvenue sur AI Nav. Ces Conditions régissent votre accès et utilisation de nos services.",
    sections: {
      acceptance: {
        title: "Acceptation des Conditions",
        description: "En utilisant AI Nav, vous acceptez d'être lié par ces Conditions. Nous nous réservons le droit de les modifier à tout moment."
      },
      services: {
        title: "Description des Services",
        description: "AI Nav fournit les services suivants :",
        items: [
          { title: "Répertoire d'Outils IA", description: "Parcourir et découvrir des outils IA." },
          { title: "Recherche et Catégories", description: "Trouver des outils par recherche ou catégorie." },
          { title: "Favoris et Comparaison", description: "Sauvegarder et comparer des outils." },
          { title: "Soumission d'Outils", description: "Soumettre de nouveaux outils IA." },
          { title: "Avis et Évaluations", description: "Publier des avis sur les outils." },
          { title: "Abonnement Newsletter", description: "S'abonner aux recommandations." }
        ]
      },
      userConduct: {
        title: "Directives de Conduite",
        description: "En utilisant nos services, vous acceptez de :",
        prohibited: {
          title: "Activités Interdites",
          items: [
            "Publier des informations fausses ou trompeuses",
            "Télécharger des logiciels malveillants",
            "Harceler ou menacer autrui",
            "Envoyer du spam",
            "Violer les droits de propriété intellectuelle",
            "Utiliser des outils automatisés sans autorisation",
            "Usurper l'identité d'autrui",
            "S'engager dans des activités illégales"
          ]
        }
      },
      content: {
        title: "Contenu Utilisateur",
        description: "Concernant le contenu que vous soumettez :",
        ownership: { title: "Propriété du Contenu", description: "Vous conservez la propriété mais nous accordez une licence." },
        moderation: { title: "Modération", description: "Nous nous réservons le droit de réviser ou supprimer du contenu." },
        responsibility: { title: "Responsabilité", description: "Vous êtes responsable du contenu que vous soumettez." }
      },
      intellectual: {
        title: "Propriété Intellectuelle",
        description: "Le site AI Nav et son contenu sont protégés par les lois sur la propriété intellectuelle.",
        aiTools: "Les marques des outils IA tiers appartiennent à leurs propriétaires respectifs."
      },
      disclaimer: {
        title: "Avertissement",
        description: "Nos services sont fournis 'tels quels' sans garantie :",
        items: [
          "Nous ne garantissons pas un service ininterrompu",
          "Nous ne sommes pas responsables de la qualité des outils tiers",
          "Les avis représentent des opinions personnelles",
          "Nous ne garantissons pas l'efficacité des outils",
          "Le contenu des liens externes est contrôlé par des tiers"
        ]
      },
      liability: {
        title: "Limitation de Responsabilité",
        description: "Dans la mesure permise par la loi :",
        limitations: [
          "Nous ne sommes pas responsables des dommages indirects",
          "Notre responsabilité totale est limitée",
          "Vous assumez les risques d'utilisation des outils tiers",
          "Nous ne sommes pas responsables des interruptions de service"
        ]
      },
      termination: {
        title: "Résiliation",
        description: "Nous nous réservons le droit de suspendre votre accès :",
        reasons: [
          "Violation des conditions",
          "Activités frauduleuses",
          "Abus des services",
          "À la demande des autorités",
          "Pour toute autre raison valable"
        ],
        effect: "Après résiliation, votre droit d'accès cessera immédiatement."
      },
      changes: {
        title: "Modifications des Conditions",
        content: "Nous pouvons mettre à jour ces conditions. Les changements importants seront annoncés."
      },
      contact: {
        title: "Nous Contacter",
        description: "Pour toute question sur ces conditions, contactez-nous :"
      }
    }
  }
};

export default frPages;
