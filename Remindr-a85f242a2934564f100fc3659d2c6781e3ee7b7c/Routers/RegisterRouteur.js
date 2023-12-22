// Importation des modules nécessaires
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const SHA256 = require("crypto-js/sha256"); // Pour chiffrer le mot de passe
const router = express.Router();
const prisma = new PrismaClient(); // Instance Prisma pour interagir avec la base de données

// Fonction pour trouver un utilisateur par son email
async function findUser(email) {
  return await prisma.utilisateur.findUnique({
    where: {
      Email: email,
    },
  });
}

// Fonction pour ajouter un utilisateur à la base de données
async function addUser(user) {
  await prisma.utilisateur.create({ data: user });
}

// Route GET pour afficher le formulaire d'inscription
router.get('/inscription', (req, res) => {
  res.render('Inscription'); // Affiche la page d'inscription
});

// Route GET pour gérer les erreurs d'inscription
router.get('/inscription/:error', (req, res) => {
  switch (req.params.error) {
    case '0':
      res.send('Email déjà pris'); // Message si l'email est déjà utilisé
      break;
    case '1':
      res.send('La confirmation mot de passe mauvaise'); // Message si la confirmation du mot de passe est incorrecte
      break;
    default:
      res.send("Il y a eu une erreur, veuillez réessayer !"); // Message pour toute autre erreur
      break;
  }
});

// Route POST pour traiter les données du formulaire d'inscription
router.post('/inscription', async (req, res) => {
  try {
    const { email, nom, prenom, mdp, confirmation } = req.body;
    const userExiste = await findUser(email); // Vérifie si l'utilisateur existe déjà

    if (userExiste) {
      res.redirect('/inscription/0'); // Redirection si l'email est déjà pris
      return;
    }

    if (mdp !== confirmation) {
      res.redirect('/inscription/1'); // Redirection si la confirmation du mot de passe est incorrecte
      return;
    }

    // Création du profil utilisateur
    const profil = {
      Email: email,
      Nom: nom,
      Prenom: prenom,
      Password: SHA256(mdp).toString() // Chiffrement du mot de passe
    };

    await addUser(profil); // Ajout de l'utilisateur dans la base de données
    const user = await findUser(email); // Récupération de l'utilisateur
    req.session.user = user; // Stockage de l'utilisateur dans la session
    res.redirect('/dashboard'); // Redirection vers le tableau de bord
  } catch (err) {
    console.error(err); // Affichage de l'erreur en console
    res.redirect('/inscription/3'); // Redirection vers la page d'erreur
  }
});

// Export du routeur pour utilisation dans d'autres parties de l'application
module.exports = router;
