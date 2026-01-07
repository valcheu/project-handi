/**
 * ProtectedRoute Component - Route protégée accessible uniquement aux utilisateurs connectés
 * Conforme RGAA - Redirige vers login si non authentifié
 */

import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Composant pour protéger les routes nécessitant une authentification
 * Vérifie la présence d'un token dans le localStorage
 * 
 * @example
 * <Route 
 *   path="/mes-candidatures" 
 *   element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>}
 * />
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Si pas de token, rediriger vers la page de connexion
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si token présent, afficher le contenu de la route protégée
  return <>{children}</>;
};

