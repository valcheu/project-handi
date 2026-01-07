/**
 * useApplications Hook - Gestion des candidatures
 * Hook accessible pour gérer la création et le suivi des candidatures
 * Conforme aux normes RGAA - Gestion des états pour l'accessibilité
 */

import { useState, useEffect, useCallback } from 'react';
import type { Application, CreateApplicationData, ApplicationStatus } from '../types';

// Import dynamique de l'apiClient (frontend)
// Note: Ce hook sera utilisé dans le contexte frontend
let apiClient: any = null;

// Initialisation lazy de l'apiClient
const getApiClient = async () => {
  if (!apiClient) {
    // Dynamiquement importé pour éviter les erreurs de chemin
    const module = await import('../../frontend/src/api/apiClient');
    apiClient = module.default;
  }
  return apiClient;
};

interface UseApplicationsOptions {
  autoFetch?: boolean;
  userId?: number; // Pour le recruteur qui veut voir les candidatures à ses offres
}

interface UseApplicationsReturn {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  fetchMyApplications: () => Promise<void>;
  applyToOffer: (offerId: number) => Promise<void>;
  clearMessages: () => void;
}

/**
 * Hook pour gérer les candidatures avec accessibilité
 * @param options - Configuration du hook
 * @returns État et fonctions pour gérer les candidatures
 */
export const useApplications = (
  options: UseApplicationsOptions = {}
): UseApplicationsReturn => {
  const { autoFetch = false } = options;

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Récupère les candidatures de l'utilisateur connecté
   * Endpoint: GET /api/v1/applications/me
   */
  const fetchMyApplications = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const client = await getApiClient();
      const response = await client.get('/applications/me');
      setApplications(response.data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Erreur lors de la récupération de vos candidatures';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Postule à une offre d'emploi
   * Endpoint: POST /api/v1/applications
   * @param offerId - ID de l'offre à laquelle postuler
   */
  const applyToOffer = async (offerId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const client = await getApiClient();
      const data: CreateApplicationData = { offerId };
      const response = await client.post('/applications', data);

      setSuccessMessage(
        response.data.message || 'Candidature envoyée avec succès !'
      );

      // Rafraîchir la liste des candidatures
      await fetchMyApplications();
    } catch (err: any) {
      let errorMessage = 'Erreur lors de la candidature';

      // Gestion des erreurs spécifiques
      if (err.response?.status === 400) {
        errorMessage =
          err.response.data.error || 'Vous avez déjà postulé à cette offre';
      } else if (err.response?.status === 401) {
        errorMessage = 'Vous devez être connecté pour postuler';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Efface les messages d'erreur et de succès
   * Utile pour la gestion de l'accessibilité (rôle alert)
   */
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  // Auto-fetch au montage si demandé
  useEffect(() => {
    if (autoFetch) {
      fetchMyApplications();
    }
  }, [autoFetch, fetchMyApplications]);

  return {
    applications,
    isLoading,
    error,
    successMessage,
    fetchMyApplications,
    applyToOffer,
    clearMessages,
  };
};

