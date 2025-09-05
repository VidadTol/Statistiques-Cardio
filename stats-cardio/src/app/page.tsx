// src/app/page.tsx
import Link from 'next/link';
import { Heart, Moon } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white relative">
      {/* Background avec dégradé vert, bleu, jaune */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-70"></div>

      {/* Contenu principal au-dessus du background */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 rounded-3xl shadow-2xl border border-white border-opacity-30">
        <h1 className="text-4xl md:text-5xl lg:text-3xl font-extrabold mb-8 drop-shadow-md text-gray-600">
          Bienvenue sur votre Espace Bien-être
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-prose drop-shadow-sm">
          Plongez dans vos données pour transformer votre santé. Suivez votre progression, décelez des tendances et découvrez ce que votre corps vous dit.
        </p>
        
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
          {/* Carte pour le Suivi Cardio - Effet WOW appliqué ici */}
          <Link
            href="/cardio"
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden border border-gray-100" // Ajout de border pour le style minimaliste
          >
            {/* Lueur de fond au survol */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-green-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative bg-blue-500 rounded-full p-4 mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6 shadow-xl">
                <Heart size={48} className="text-white drop-shadow-lg" />
              </div>
              <span className="text-xl md:text-2xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-700"> {/* Texte noir, devient bleu au survol */}
                Suivi Cardio
              </span>
            </div>
          </Link>

          {/* Carte pour le Suivi du Sommeil - Effet WOW appliqué ici */}
          <Link
            href="/sommeil"
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden border border-gray-100" // Ajout de border pour le style minimaliste
          >
            {/* Lueur de fond au survol */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative bg-purple-500 rounded-full p-4 mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6 shadow-xl">
                <Moon size={48} className="text-white drop-shadow-lg" />
              </div>
              <span className="text-xl md:text-2xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-purple-700"> {/* Texte noir, devient violet au survol */}
                Suivi Sommeil
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}