-- CreateTable
CREATE TABLE `Utilisateur` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Nom` VARCHAR(191) NOT NULL,
    `Prenom` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Utilisateur_Email_key`(`Email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groupe` (
    `IDGroupe` INTEGER NOT NULL AUTO_INCREMENT,
    `NomGroupe` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Groupe_NomGroupe_key`(`NomGroupe`),
    PRIMARY KEY (`IDGroupe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rappel` (
    `IDRappel` INTEGER NOT NULL AUTO_INCREMENT,
    `Titre` VARCHAR(191) NOT NULL,
    `Contenu` VARCHAR(191) NOT NULL,
    `DateDebut` DATETIME NOT NULL,
    `DateFin` DATETIME NOT NULL,

    PRIMARY KEY (`IDRappel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membre` (
    `IDUtilisateur` INTEGER NOT NULL,
    `IDGroupe` INTEGER NOT NULL,

    UNIQUE INDEX `Membre_IDUtilisateur_key`(`IDUtilisateur`),
    UNIQUE INDEX `Membre_IDGroupe_key`(`IDGroupe`),
    PRIMARY KEY (`IDUtilisateur`, `IDGroupe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participe` (
    `IDUtilisateur` INTEGER NOT NULL,
    `IDRappel` INTEGER NOT NULL,

    UNIQUE INDEX `Participe_IDUtilisateur_key`(`IDUtilisateur`),
    UNIQUE INDEX `Participe_IDRappel_key`(`IDRappel`),
    PRIMARY KEY (`IDUtilisateur`, `IDRappel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Membre` ADD CONSTRAINT `Membre_IDUtilisateur_fkey` FOREIGN KEY (`IDUtilisateur`) REFERENCES `Utilisateur`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membre` ADD CONSTRAINT `Membre_IDGroupe_fkey` FOREIGN KEY (`IDGroupe`) REFERENCES `Groupe`(`IDGroupe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participe` ADD CONSTRAINT `Participe_IDUtilisateur_fkey` FOREIGN KEY (`IDUtilisateur`) REFERENCES `Utilisateur`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participe` ADD CONSTRAINT `Participe_IDRappel_fkey` FOREIGN KEY (`IDRappel`) REFERENCES `Rappel`(`IDRappel`) ON DELETE RESTRICT ON UPDATE CASCADE;
