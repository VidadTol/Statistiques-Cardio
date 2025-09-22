// src/app/page.tsx
import Link from "next/link";
import { icons } from "./cardio/components/icons";

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
          Plongez dans vos données pour transformer votre santé. Suivez votre
          progression, décelez des tendances et découvrez ce que votre corps
          vous dit.
        </p>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
          {/* Carte pour le Suivi Cardio effet */}
          <Link
            href="/cardio"
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden border border-gray-100 w-60"
          >
            {/* Lueur de fond au survol */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-green-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Conteneur principal qui gère le centrage */}
            <div className="relative z-10 flex flex-col  items-center">
              {/* Conteneur de l'icône */}
              <div className="flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-4">
                <div className="w-12 h-12 text-blue-500">
                  {icons.pulse}
                </div>
              </div>

              {/* Texte du lien */}
              <span className="text-xl md:text-2xl font-semibold text-black drop-shadow-lg transition-colors duration-300 group-hover:text-blue-700">
                Suivi Cardio
              </span>
            </div>
          </Link>

          {/* Carte pour le Suivi du Sommeil effet */}
          <Link
            href="/sommeil"
            className="group relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden border border-gray-100 w-60"
          >
            {/* Lueur de fond au survol */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Conteneur principal qui gère le centrage */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Conteneur de l'icône */}
              <div className="flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-4">
                <div className="w-12 h-12 text-purple-500">
                  {icons.sleep}
                </div>
              </div>

              {/* Texte du lien */}
              <span className="text-xl md:text-2xl font-semibold text-black drop-shadow-lg transition-colors duration-300 group-hover:text-purple-700">
                Suivi Sommeil
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
