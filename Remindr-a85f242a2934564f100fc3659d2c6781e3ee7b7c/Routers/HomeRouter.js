// Inclusion des bibliothèques nécessaires
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Création d'un routeur Express et d'une instance Prisma pour interagir avec la base de données
const router = express.Router();
const prisma = new PrismaClient();

// Route pour le dashboard accessible à l'URL '/dashboard'
router.get('/dashboard', async (req, res) => {
  // Si l'utilisateur n'est pas connecté (pas de session utilisateur), affiche la page 'blocked'
  if (!req.session.user) {
    res.render('blocked');
    return;
  }

  try {
    // Récupération des groupes auxquels l'utilisateur appartient
    const groupes = await prisma.groupe.findMany({
      where: {
        Membre: {
          some: {
            Utilisateur : {
              ID: req.session.user.ID // Filtre les groupes par l'ID de l'utilisateur connecté
            }
          }
        }
      }
    });

    // Récupération des rappels associés à l'utilisateur
    const rappels = await prisma.rappel.findMany({
      where: {
        Participe: {
          some: {
            IDUtilisateur: req.session.user.ID // Filtre les rappels par l'ID de l'utilisateur connecté
          }
        }
      }
    });

    // Préparation des données pour les envoyer à la vue 'home'
    const data = {
      groupes: groupes.map(g => ({ nom: g.NomGroupe, GroupeID: g.IDGroupe })),
      rappels: rappels.map(r => ({
        titre: r.Titre,
        date: r.DateFin.toISOString().split('T')[0], // Convertit la date en format lisible
        description: r.Contenu
      }))
    };

    // Envoie les données à la vue 'home'
    res.render('home', data);

  } catch (err) {
    // En cas d'erreur, affiche la page d'erreur avec un message
    console.error(err);
    res.render('error', { message: "Erreur lors de la récupération des données" });
  }
});

// Exporte le routeur pour qu'il puisse être utilisé ailleurs dans l'application
module.exports = router;
