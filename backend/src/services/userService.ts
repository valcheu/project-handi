// project-handi/backend/src/services/userService.ts

import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// --- Fonctions CRUD pour l'utilisateur ---

// Récupérer tous les utilisateurs
export async function getAllUsers()
{
  // Sélectionner uniquement les champs non sensibles
  return prisma.user.findMany
  (
    {
      select :
      {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        companyId: true // Utile pour identifier à quelle entreprise appartient un recruteur
      }
    }
  );
}

// Trouver un utilisateur par son email (indispensable pour le Login)
export async function findUserByEmail(email: string)
{
  return prisma.user.findUnique
  (
    {
      where : { email },
      include : { company: true /* Permet de récupérer les infos de l'entreprise si c'est un recruteur */ }
    }
  );
}

// Créer un nouvel utilisateur
export async function createUser
(
  userData :
  {
    email : string; 
    password : string; 
    firstName : string; 
    lastName : string; 
    role : UserRole;
    companyId? : number 
  }
)
{
  return prisma.user.create
  (
    {
      data :
      {
        email : userData.email,
        password : userData.password,
        firstName : userData.firstName,
        lastName : userData.lastName,
        role : userData.role,
        ...(userData.companyId && {company : { connect : { id : userData.companyId } } } )
      }
    }
  );
}

// Trouver par ID
export async function findUserById(id: number)
{
  return prisma.user.findUnique
  (
    {
      where: { id },
      select :
      {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      }
    }
  );
}