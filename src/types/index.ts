/**
 * Types et interfaces de la plateforme de recrutement inclusive
 * Centralise toutes les définitions TypeScript
 */

// ============================================
// ENUMS ET TYPES DE BASE (Synchronized with Prisma Schema)
// ============================================

/**
 * Rôles utilisateur - Correspond à l'enum UserRole du schema Prisma
 */
export type UserRole = 'APPLICANT' | 'RECRUITER' | 'ADMIN';

/**
 * Statut d'une candidature - Correspond à l'enum ApplicationStatus du schema Prisma
 */
export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

/**
 * Types de contrat - Correspond à l'enum ContractType du schema Prisma
 */
export type ContractType = 'CDI' | 'CDD' | 'INTERIM' | 'STAGE' | 'ALTERNANCE';

/**
 * Niveaux d'expérience - Correspond à l'enum ExperienceLevel du schema Prisma
 */
export type ExperienceLevel = 'JUNIOR' | 'CONFIRME' | 'SENIOR';

/**
 * Politiques de télétravail - Correspond à l'enum RemotePolicy du schema Prisma
 */
export type RemotePolicy = 'NO_REMOTE' | 'HYBRID' | 'FULL_REMOTE';

/**
 * Catégories de handicap - Correspond à l'enum DisabilityCategory du schema Prisma
 */
export type DisabilityCategory = 
  | 'MOTEUR' 
  | 'VISUEL' 
  | 'AUDITIF' 
  | 'PSYCHIQUE' 
  | 'COGNITIF' 
  | 'INVISIBLE';

// Types spécifiques au frontend (non Prisma)
export type OfferStatus = 'draft' | 'published' | 'closed' | 'archived';

export type ResourceType = 
  | 'guide' 
  | 'article' 
  | 'video' 
  | 'document' 
  | 'formation';

// ============================================
// USER & AUTH (Synchronized with Prisma Schema)
// ============================================

/**
 * Interface User - Correspond au modèle User du schema Prisma
 */
export interface User {
  id: number;
  email: string;
  password: string; // Existe dans Prisma mais ne devrait jamais être exposé au frontend en production
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  
  // Relations
  companyId?: number | null;
  company?: Company | null;
}

/**
 * Version sécurisée de User sans le mot de passe (pour les réponses API)
 */
export interface SafeUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  companyId?: number | null;
  company?: Company | null;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyId?: number; // Pour les recruteurs rattachés à une entreprise
}

// ============================================
// COMPANY (Synchronized with Prisma Schema)
// ============================================

/**
 * Interface Company - Correspond au modèle Company du schema Prisma
 */
export interface Company {
  id: number;
  name: string;
  sector?: string | null; // Ex: TECH, SANTE
  
  // Relations (optionnelles selon le contexte d'inclusion)
  users?: User[];
  offers?: Offer[];
  applications?: Application[];
}


// ============================================
// JOB OFFERS (Synchronized with Prisma Schema)
// ============================================

/**
 * Interface Offer - Correspond au modèle Offer du schema Prisma
 */
export interface Offer {
  id: number;
  title: string;
  description: string;
  location: string;
  contract: ContractType;
  experience: ExperienceLevel;
  remote: RemotePolicy;
  
  // Filtre spécifique handicap (Tableau d'Enums)
  disabilityCompatible: DisabilityCategory[];
  
  createdAt: Date;
  
  // Relations FK
  recruiterId: number;
  companyId: number;
  
  // Relations (optionnelles selon le contexte d'inclusion)
  recruiter?: User;
  company?: Company;
  applications?: Application[];
  adaptations?: Adaptation[];
  skills?: Skill[];
}

/**
 * Adaptation d'accessibilité liée aux offres
 */
export interface Adaptation {
  id: number;
  label: string;
  category: DisabilityCategory;
}

/**
 * Compétence technique liée aux offres
 */
export interface Skill {
  id: number;
  name: string;
}

/**
 * Filtres pour la recherche d'offres
 */
export interface OfferFilters {
  search?: string;
  contractTypes?: ContractType[];
  experienceLevels?: ExperienceLevel[];
  location?: string;
  remote?: RemotePolicy[];
  disabilityCompatible?: DisabilityCategory[];
  skills?: string[];
}

// ============================================
// APPLICATIONS (Synchronized with Prisma Schema)
// ============================================

/**
 * Interface Application - Correspond EXACTEMENT au modèle Application du schema Prisma
 * Cette interface représente une candidature d'un utilisateur à une offre
 */
export interface Application {
  id: number;
  status: ApplicationStatus;
  createdAt: Date;
  
  // Relations FK (Foreign Keys)
  userId: number;
  offerId: number;
  companyId?: number | null;
  
  // Relations incluses (optionnelles selon le contexte de la requête)
  user?: SafeUser;
  offer?: Offer;
  company?: Company | null;
}

/**
 * Type pour la création d'une nouvelle candidature
 */
export interface CreateApplicationData {
  offerId: number;
}

/**
 * Type pour la mise à jour du statut d'une candidature (recruteur uniquement)
 */
export interface UpdateApplicationStatusData {
  status: 'ACCEPTED' | 'REJECTED';
}


// ============================================
// COMMON TYPES
// ============================================

export interface Notification {
  id: number;
  userId: number;
  type: 'application' | 'offer' | 'system';
  title: string;
  content: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

// ============================================
// FORM TYPES
// ============================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface CreateOfferFormData {
  title: string;
  description: string;
  location: string;
  contract: ContractType;
  experience: ExperienceLevel;
  remote: RemotePolicy;
  disabilityCompatible: DisabilityCategory[];
  companyId: number;
  // Optionnel : skills et adaptations à ajouter après création
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
