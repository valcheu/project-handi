/**
 * HomePage - Page d'accueil du site
 * Version inspirée de HelloWork avec hero et recherche centrale
 * Conforme RGAA/WCAG AA
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { StatsBar } from '../components/StatsBar';
import { CompaniesSection } from '../components/CompaniesSection';
import { Icon } from '../components/Icon';
import { useCompanies } from '../hooks/useCompanies';
import apiClient from '../api/apiClient';

export const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOffers: 0,
    totalCompanies: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  
  const { companies, isLoading: isLoadingCompanies } = useCompanies();
  
  // Vérification de l'état de connexion
  const isLoggedIn = !!localStorage.getItem('token');

  // Charger les statistiques
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [offersResponse, companiesResponse] = await Promise.all([
          apiClient.get('/offers'),
          apiClient.get('/companies'),
        ]);
        setStats({
          totalOffers: offersResponse.data.length,
          totalCompanies: companiesResponse.data.length,
        });
      } catch (error) {
        console.error('Erreur chargement stats:', error);
        // Utiliser des valeurs par défaut en cas d'erreur
        setStats({
          totalOffers: 0,
          totalCompanies: 0,
        });
      } finally {
        setIsLoadingStats(false);
      }
    };
    
    fetchStats();
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  const handleSearch = ({ what, where }: { what: string; where: string }) => {
    // Construire les query params
    const params = new URLSearchParams();
    if (what.trim()) params.append('what', what.trim());
    if (where.trim()) params.append('where', where.trim());
    
    // Rediriger vers la page de résultats
    const queryString = params.toString();
    navigate(queryString ? `/dashboard?${queryString}` : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header simple */}
      <header className="border-b border-slate-800 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-sky-400">Project Handi</h1>
            <p className="text-slate-400 text-sm mt-1">Plateforme de recrutement inclusive</p>
          </div>

          <nav aria-label="Navigation principale" className="flex items-center gap-6">
            {isLoggedIn && (
              <button 
                type="button"
                onClick={() => navigate('/mes-candidatures')}
                className="text-slate-300 hover:text-sky-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 px-4 py-2 rounded-lg"
                aria-label="Voir mes candidatures"
              >
                Mes candidatures
              </button>
            )}

            <button 
              type="button"
              onClick={handleAuthAction}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                isLoggedIn 
                  ? "bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white" 
                  : "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20"
              }`}
              aria-label={isLoggedIn ? 'Se déconnecter de votre compte' : 'Se connecter ou créer un compte'}
            >
              {isLoggedIn ? 'Se déconnecter' : 'Connexion'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero avec recherche centrale */}
      <main>
        <section 
          aria-label="Recherche d'offres d'emploi" 
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
                Notre job, vous aider à choisir le vôtre parmi
              </h2>
              <p className="text-5xl md:text-6xl font-extrabold text-sky-400 mb-3">
                {isLoadingStats ? '...' : stats.totalOffers.toLocaleString('fr-FR')} offres
              </p>
              <p className="text-slate-400 text-lg">
                Des opportunités inclusives adaptées à vos besoins
              </p>
            </div>
            
            <SearchBar onSearch={handleSearch} />
            
            <StatsBar 
              totalOffers={stats.totalOffers}
              totalCompanies={stats.totalCompanies}
              isLoading={isLoadingStats}
            />
          </div>
        </section>

        {/* Boutons d'accès rapide */}
        <section className="container mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard?contract=STAGE')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 hover:border-sky-500 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              🎓 Job étudiant
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard?contract=ALTERNANCE')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 hover:border-sky-500 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              🎯 Alternance
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard?contract=INTERIM')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 hover:border-sky-500 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              ⚡ Intérim
            </button>
          </div>
        </section>

        {/* Section CTA - Publier CV */}
        <section className="bg-slate-800/50 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-100">
              Publiez votre CV et laissez les recruteurs venir à vous
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              En moyenne, un CV est consulté par 30 recruteurs !
            </p>
            <button
              type="button"
              onClick={() => isLoggedIn ? navigate('/profil') : navigate('/login')}
              className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg shadow-sky-500/20"
            >
              Déposez votre CV
            </button>
          </div>
        </section>

        {/* Section entreprises */}
        {!isLoadingCompanies && companies.length > 0 && (
          <section className="container mx-auto px-6 py-16">
            <CompaniesSection 
              companies={companies}
              isLoading={isLoadingCompanies}
            />
          </section>
        )}
      </main>

      {/* Footer simple */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-6 text-center text-slate-400 text-sm">
          <p>© 2026 Project Handi - Plateforme de recrutement inclusive</p>
          <p className="mt-2 flex items-center justify-center gap-2">
            <Icon name="accessibility" size={18} />
            Conforme RGAA / WCAG AA
          </p>
        </div>
      </footer>
    </div>
  );
};

