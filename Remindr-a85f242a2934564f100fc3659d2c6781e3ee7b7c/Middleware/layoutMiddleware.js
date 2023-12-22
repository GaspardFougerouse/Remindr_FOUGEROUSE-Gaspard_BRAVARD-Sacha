module.exports = function (req, res, next) {
    // Vérifie si l'utilisateur est connecté en examinant la session
    if (req.session.user) {
        // Si l'utilisateur est connecté, utilisez la mise en page 'connecte'
        res.locals.layout = 'connecte';
        
        // Définit le prénom de l'utilisateur connecté comme variable locale
        // pour l'utiliser dans les vues
        res.locals.username = req.session.user.prenom;
    } else {
        // Si l'utilisateur n'est pas connecté, utilisez la mise en page 'main'
        res.locals.layout = 'main';
    }

    // Appelle le prochain middleware dans la chaîne
    next();
}
