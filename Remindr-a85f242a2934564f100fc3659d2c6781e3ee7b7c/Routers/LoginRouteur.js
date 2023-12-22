// Importation des modules nécessaires
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const SHA256 = require("crypto-js/sha256"); // Module pour crypter le mot de passe
const router = express.Router();
const prisma = new PrismaClient(); // Création d'une instance Prisma pour interagir avec la base de données

// Fonction pour trouver un utilisateur par son email
async function findUser(email) {
  return await prisma.utilisateur.findUnique({
    where: {
      Email: email,
    },
  });
}

// Route GET pour la page de connexion
router.get('/connexion', (req, res) => {
  res.render('Connexion'); // Affiche le formulaire de connexion
});

// Route GET pour gérer les erreurs de connexion
router.get('/connexion/:error', (req, res) => {
  switch (req.params.error) {
    case '0':
      res.send('Email mauvais'); // Message si l'email est incorrect
      break;
    case '1':
      res.send('Le mot de passe est pas bon'); // Message si le mot de passe est incorrect
      break;
    default:
      res.send("Il y a eu une erreur, il faut réessayer !"); // Message pour toute autre erreur
      break;
  }
});

// Route POST pour traiter les données du formulaire de connexion
router.post('/connexion', async (req, res) => {
  try {
    const { email, mdp } = req.body;
    const user = await findUser(email);

    if (!user) {
      res.redirect('/connexion/0'); // Redirige si l'email est incorrect
      return;
    }

    if (user.Password !== SHA256(mdp).toString()) {
      res.redirect('/connexion/1'); // Redirige si le mot de passe est incorrect
      return;
    }

    req.session.user = user; // Stocke les informations de l'utilisateur dans la session
    res.redirect('/dashboard'); // Redirige vers le dashboard

  } catch (err) {
    console.error(err); // Affiche l'erreur en console
    res.redirect('/connexion/3'); // Redirige vers la page d'erreur
  }
});

// Exporte le routeur pour utilisation dans d'autres parties de l'application
module.exports = router;
