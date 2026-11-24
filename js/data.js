/* =========================================================
   Contenu du portfolio (repris du CV).
   Pour mettre à jour le site, modifiez seulement ce fichier.
   ========================================================= */

export const roles = ["Java-JEE", "Spring Boot", "Angular", "API REST"];

export const stats = [
  { value: "6+", label: "ans d'expérience" },
  { value: "Bac+5", label: "ingénieur IT-finance" },
];

export const skills = [
  {
    title: "Backend",
    items: [
      "Java 8 / 11",
      "Java EE",
      "Spring Boot",
      "Spring Batch",
      "Spring Security",
      "JHipster",
      "Struts",
      "API REST",
      "Swagger / OpenAPI",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Angular 8 / 12",
      "React.js",
      "JavaScript",
      "CSS",
      "Webpack",
      "Figma",
    ],
  },
  {
    title: "Bases de données",
    items: [
      "Oracle 12c",
      "PostgreSQL 11",
      "SQL Server 2019",
      "Hibernate",
      "Liquibase",
      "Elasticsearch",
    ],
  },
  { title: "Tests & qualité", items: ["JUnit", "Cucumber", "Jest", "Sonar"] },
  {
    title: "CI/CD & cloud",
    items: [
      "Git",
      "Maven",
      "Jenkins",
      "GitLab CI",
      "Docker",
      "Azure",
      "Render",
    ],
  },
  {
    title: "IA générative",
    items: ["OpenAI API", "GitHub Copilot", "ChatGPT", "Claude"],
  },
  {
    title: "Outils",
    items: ["Jira", "Confluence", "IntelliJ", "Kibana", "Logstash"],
  },
];

export const experiences = [
  {
    company: "Scub",
    role: "Ingénieur logiciel",
    place: "Niort, France",
    dates: "Mai 2024 — Mai 2026",
    context:
      "Module de gestion des sinistres IARD : automatisation complète du traitement des dossiers, de la déclaration au règlement, selon les conventions de l'assurance et les standards DARVA. Environnement international.",
    points: [
      "Développement et évolution du module Claims en Java EE et Spring (Boot, Batch, Security), avec Struts",
      "Conception et maintenance d'API REST documentées avec Swagger / OpenAPI",
      "Analyse des besoins fonctionnels et rédaction des spécifications techniques",
      "Intégration continue avec Git, Maven et Jenkins ; tests unitaires et d'intégration avec JUnit et Cucumber",
      "Optimisation des traitements sur Oracle 12c et évolution de l'éditique (génération de documents métiers)",
      "Cérémonies Agile en anglais : Daily, Sprint Planning, Review, Rétrospective",
    ],
    tags: ["Java EE", "Spring", "Struts", "Oracle 12c", "Jenkins", "Cucumber"],
  },
  {
    company: "Exalt",
    role: "Consultant",
    place: "Paris, France",
    dates: "Nov. 2023 — Déc. 2023",
    context: "Interface d'intégration avec l'API OpenAI Assistant.",
    points: [
      "Développement de l'interface de communication en React.js",
      "Intégration et paramétrage de l'API OpenAI Assistant",
      "Déploiement de l'application sur Render",
    ],
    tags: ["React.js", "OpenAI API", "Render"],
  },
  {
    company: "Streamlink",
    role: "Consultant Java / Angular",
    place: "Tunisie — France",
    dates: "Janv. 2023 — Oct. 2023",
    context: "Migration de Zoho vers une plateforme interne de recrutement.",
    points: [
      "Fonctionnalités côté serveur avec Spring",
      "Transformation des maquettes Figma en composants Angular",
      "Tests unitaires avec JUnit 4 et Jest",
      "Déploiement sur Azure et configuration du profil de production",
    ],
    tags: ["Spring", "Angular", "Figma", "Azure"],
  },
  {
    company: "Finance and Accounting Operations (FAO)",
    role: "Ingénieur études et développement Java / Angular",
    place: "Tunisie",
    dates: "Janv. 2021 — Déc. 2022",
    context:
      "Conception et développement de la première version de LinkedLevel, solution d'évaluation des compétences des employés pour une startup française.",
    points: [
      "Web services REST en Spring et composants Angular",
      "Module de recherche : collecte de profils (API Google Search, scraping en Express.js), indexation et recherche paginée sur Elasticsearch",
      "Temps de réponse des requêtes Elasticsearch amélioré de 10 %",
      "Couverture de tests de plus de 60 % (Sonar) avec JUnit et Jest",
      "Migration de Java 8 à Java 11 et maintenance du pipeline GitLab",
      "Suivi des logs avec Logstash et Kibana ; guides techniques sur Confluence",
    ],
    tags: ["Spring", "Angular", "Elasticsearch", "Express.js", "GitLab CI"],
  },
  {
    company: "The Team",
    role: "Développeur front-end",
    place: "Tunisie",
    dates: "Sept. 2020 — Nov. 2020",
    context: "MyDish, solution de gestion de restaurant.",
    points: [
      "Composants web avec React.js et Node.js",
      "Cérémonies Scrum : Daily, Demo, Rétro",
    ],
    tags: ["React.js", "Node.js", "Scrum"],
  },
  {
    company: "The Team",
    role: "Développeur back-end",
    place: "Tunisie",
    dates: "Févr. 2020 — Sept. 2020",
    context: "Développement d'un microservice et des interfaces associées.",
    points: [
      "Microservice avec JHipster 6.9",
      "Interfaces et composants web avec Angular 8",
      "Tests unitaires des composants Angular avec Jest",
    ],
    tags: ["JHipster", "Angular 8", "Jest"],
  },
];

export const achievements = [
  {
    title: "Module Claims — sinistres IARD",
    company: "Scub",
    featured: true,
    desc: "Automatisation de bout en bout du traitement des sinistres, de la déclaration au règlement, conforme aux standards d'échange DARVA.",
    highlight: "Assurance · Java EE / Spring",
    tags: ["Java EE", "Spring Batch", "Oracle 12c", "Swagger"],
  },
  {
    title: "LinkedLevel",
    company: "FAO",
    desc: "Première version d'une solution d'évaluation des compétences, avec un moteur de recherche de profils sur Elasticsearch.",
    highlight: "−10 % de temps de réponse · 60 %+ de couverture",
    tags: ["Spring", "Angular", "Elasticsearch"],
  },
  {
    title: "Plateforme de recrutement",
    company: "Streamlink",
    desc: "Migration de Zoho vers une plateforme interne, des maquettes Figma jusqu'au déploiement sur Azure.",
    highlight: "Figma → Angular → Azure",
    tags: ["Spring", "Angular", "Azure"],
  },
  {
    title: "Interface OpenAI Assistant",
    company: "Exalt",
    desc: "Interface conversationnelle branchée sur l'API OpenAI Assistant, déployée sur Render.",
    highlight: "IA générative",
    tags: ["React.js", "OpenAI API"],
  },
  {
    title: "MyDish",
    company: "The Team",
    desc: "Application de gestion de restaurant développée en équipe Scrum.",
    highlight: "Front-end React",
    tags: ["React.js", "Node.js"],
  },
];

export const sideProjects = [
  { name: "AI-Customer-Support", tag: "Python · IA" },
  { name: "mars-rover-kata", tag: "Java 17 · TDD" },
  { name: "EndlessRunner", tag: "Three.js · jeu 3D" },
  { name: "chatBot", tag: "Python · RASA" },
];

export const contact = {
  // true = affiche le bouton « M'écrire » ; false = le masque (par défaut).
  // Le bouton n'apparaît que si showEmail est true ET si user et domain sont remplis.
  // Attention : une fois rempli et poussé, l'adresse est lisible par tous dans ce fichier.
  showEmail: false,
  // L'adresse est assemblée par le script (user@domain) pour limiter la collecte par les robots.
  user: "",
  domain: "",
};

/* ---------- Réglages de la scène 3D ---------- */
export const sceneSettings = {
  roadSpeed: 2, // vitesse de défilement de la route (unités 3D par seconde). Avant : 5
  scrollBoost: 1, // accélération en bas de page : 1 = deux fois plus vite, 0 = vitesse constante
  reducedSpeed: 0.5, // vitesse si le visiteur a demandé moins d'animations dans son système
};
