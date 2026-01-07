// project-handi/backend/src/services/offerService.ts

import { PrismaClient, ContractType, RemotePolicy, DisabilityCategory } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Interface définissant les critères de filtrage pour la recherche d'offres.
 */
export interface OfferFilters
{
  contract?: ContractType;
  location?: string;
  remote?: RemotePolicy;
  disability?: DisabilityCategory;
  dateMin?: string; 
}

/**
 * Récupère la liste des offres d'emploi en appliquant des filtres optionnels.
 * @param filters - Objet contenant les critères de recherche (contrat, ville, etc.)
 * @returns Une promesse contenant le tableau des offres avec les relations entreprise et recruteur.
 */
export async function getAllOffers(filters?: OfferFilters)
{
  return prisma.offer.findMany
  (
    {
      where :
      {
        contract: filters?.contract,
        location: filters?.location 
          ? { contains: filters.location, mode: 'insensitive' } 
          : undefined,
        remote: filters?.remote,
        disabilityCompatible: filters?.disability 
          ? { has: filters.disability } 
          : undefined,
        createdAt: filters?.dateMin 
          ? { gte: new Date(filters.dateMin) } 
          : undefined,
      },

      include :
      {
        company:
        {
          select:
          {
            id: true,
            name: true,
            sector: true
          }
        },

        recruiter:
        {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy:
      {
        createdAt: 'desc'
      }
    }
  );
}

/**
 * Enregistre une nouvelle offre d'emploi dans la base de données.
 * @param offerData - Les données de l'offre (titre, description, IDs, etc.)
 */
export async function createNewOffer(offerData: any)
{
  return prisma.offer.create
  (
    {
      data :
      {
        title: offerData.title,
        description: offerData.description,
        location: offerData.location,
        contract: offerData.contract,
        experience: offerData.experience,
        remote: offerData.remote,
        disabilityCompatible: offerData.disabilityCompatible,
        companyId: offerData.companyId,
        recruiterId: offerData.recruiterId,
      },
    }
  );
}

/**
 * Récupère les détails complets d'une offre spécifique par son identifiant unique.
 * @param id - L'identifiant (ID) de l'offre.
 */
export async function getOfferById(id: number)
{
  return prisma.offer.findUnique
  (
    {
      where: { id },
      include :
      {
        company: true,
        recruiter :
        {
          select :
          {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    }
  );
}

/**
 * Modifie les informations d'une offre existante.
 * @param id - L'identifiant de l'offre à modifier.
 * @param updateData - Un objet contenant les champs à mettre à jour.
 */
export async function updateOffer(id: number, updateData: any)
{
  return prisma.offer.update
  (
    {
      where: { id },
      data: updateData,
    }
  );
}

/**
 * Supprime définitivement une offre de la base de données.
 * @param id - L'identifiant de l'offre à supprimer.
 */
export async function deleteOffer(id: number)
{
  return prisma.offer.delete
  (
    {
      where: { id },
    }
  );
}