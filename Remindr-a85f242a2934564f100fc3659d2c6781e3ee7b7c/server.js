const express = require('express'); // Importation du module Express
const { engine } = require('express-handlebars'); // Importation du moteur de template Handlebars
const session = require('express-session'); // Importation du module pour gérer les sessions

const app = express(); // Création d'une instance d'Express
const port = 3000; // Port sur lequel le serveur va écouter

// Importation des modules personnalisés pour différentes routes
const layout = require('./Middleware/layoutMiddleware');
const connexionRouteur = require('./Routers/LoginRouteur');
const deconnexionRouteur = require('./Routers/LogoutRouteur');
const dashboardRouteur = require('./Routers/HomeRouter');
const inscriptionRouteur = require('./Routers/RegisterRouteur');

app.use(express.static('public')); // Configuration du dossier pour les fichiers statiques (ex: CSS, JS, images)

// Configuration pour récupérer les données envoyées par les formulaires
app.use(express.urlencoded({ extended: true }));

// Configuration des sessions, essentiel pour maintenir une session utilisateur
app.use(session({
  secret: 'SECRET', // Clé secrète pour les sessions
  resave: false,
  saveUninitialized: true
}));

// Configuration du moteur de vue Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views'); // Dossier contenant les templates Handlebars

// Middleware pour gérer les layouts en fonction de l'état de connexion
app.use(layout);

// Utilisation des routeurs pour différentes routes
app.use(dashboardRouteur); // Pour la page d'accueil
app.use(inscriptionRouteur); // Pour l'inscription
app.use(connexionRouteur); // Pour la connexion
app.use(deconnexionRouteur); // Pour la déconnexion

// Route par défaut qui redirige vers la page d'accueil
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
  res.status(404).send('Erreur 404 Page non trouvée');
});

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
