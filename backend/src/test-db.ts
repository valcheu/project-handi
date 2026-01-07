// project-handi/backend/src/test-db.ts

// 1. Importation du client Prisma généré
// Assurez-vous que le chemin est correct. Si le fichier est dans src/ 
// et que le client est dans src/generated/prisma, le chemin est bien celui-ci :
import { PrismaClient } from './generated/prisma'; 

const prisma = new PrismaClient();

/**
 * Fonction principale pour tester la connexion à la DB.
 * Elle essaie de lire tous les utilisateurs (la table est vide, c'est normal).
 */
async function testDbConnection() {
  console.log("-----------------------------------------");
  console.log("🚀 Test de connexion à la base de données...");

  try {
    // Tentative de requête simple
    const users = await prisma.user.findMany();
    
    console.log("✅ Connexion réussie !");
    console.log(`Nombre d'utilisateurs trouvés (doit être 0) : ${users.length}`);
    console.log("-----------------------------------------");
    
    // Vous pouvez insérer un utilisateur de test ici pour plus de vérification si vous le souhaitez
    
  } catch (error) {
    console.error("❌ ERREUR DE CONNEXION À LA BASE DE DONNÉES !");
    console.error("Vérifiez le conteneur Docker et la variable DATABASE_URL dans votre .env.");
    // Afficher l'erreur pour le diagnostic
    console.error(error); 
    console.log("-----------------------------------------");

  } finally {
    // Assurez-vous de fermer la connexion à la base de données après le test
    await prisma.$disconnect();
  }
}

// Lancement de la fonction de test
testDbConnection();