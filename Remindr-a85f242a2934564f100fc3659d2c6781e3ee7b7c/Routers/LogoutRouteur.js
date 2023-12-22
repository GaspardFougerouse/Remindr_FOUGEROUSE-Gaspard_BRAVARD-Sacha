const express = require('express');
const router = express.Router();

router.get('/deconnexion', (req, res) => {
    // Vérifier si l'utilisateur est connecté avant de déconnecter
    if (req.session.user) {
        // Supprimer les informations de l'utilisateur de la session
        delete req.session.user;
        // Rediriger vers la page de connexion après la déconnexion
        res.redirect('/connexion');
    } else {
        // Si aucun utilisateur n'est connecté, rediriger vers l'accueil
        res.redirect('/');
    }
});

module.exports = router;
