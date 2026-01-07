// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

export const LoginPage = () => 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert('Erreur de connexion');
        }
    };

    // LE PROBLÈME EST ICI :
    // Assure-toi que le mot "return" est présent et suivi d'une parenthèse ouvrante
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <form 
                onSubmit={handleLogin}
                className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-white mb-6 text-center text-sky-400">Connexion</h2>
                
                <div className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email"
                        className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-sky-500 outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Mot de passe"
                        className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-sky-500 outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded transition-colors"
                    >
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    );
};