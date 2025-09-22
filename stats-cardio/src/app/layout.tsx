// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { Activity, Heart, } from "lucide-react";
import { icons } from "./cardio/components/icons";

export const metadata = {
  title: "Suivi Cardio & Sommeil - Analyse de vos performances sportives",
  description:
    "Application de suivi et d'analyse de vos données cardio et sommeil. Importez vos fichiers TCX, visualisez vos statistiques et obtenez des recommandations personnalisées.",
  keywords: "cardio, sommeil, analyse, TCX, sport, fitness, santé, suivi",
  authors: [{ name: "VidadTol" }],
  openGraph: {
    title: "Suivi Cardio & Sommeil",
    description: "Analysez vos performances cardio et votre qualité de sommeil",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suivi Cardio & Sommeil",
    description: "Analysez vos performances cardio et votre qualité de sommeil",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Barre de navigation */}
          <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-bold text-gray-900 drop-shadow-sm"
              >
                <Heart className="h-7 w-7 text-gray-900" />
                <span className="hidden sm:inline-block">
                  Suivi de Bien-être
                </span>
              </Link>
              <div className="flex space-x-6 text-lg font-medium">
                <Link
                  href="/cardio"
                  className="flex items-center font-bold space-x-2 hover:text-white transition-colors text-gray-900"
                >
                  {/* Conteneur de l'icône */}
              <div className="flex items-center justify-center p-2 bg-white rounded-full mb-2">
                <div className="w-3 h-3 text-blue-500">
                  {icons.pulse}
                </div>
              </div>
                  <span>Cardio</span>
                </Link>
                <Link
                  href="/sommeil"
                  className="flex items-center font-bold space-x-2 hover:text-white transition-colors text-gray-900"
                >
                  {/* Conteneur de l'icône */}
                  <div className="flex items-center justify-center p-2 bg-white rounded-full mb-2">
                    <div className="w-3 h-3 text-purple-500">
                      {icons.sleep}
                    </div>
                  </div>
                  <span>Sommeil</span>
                </Link>
              </div>
            </div>
          </nav>

          <main className="flex-grow">{children}</main>

          {/* Footer élégant */}
          <footer className="w-full bg-white bg-opacity-30 backdrop-filter backdrop-blur-md text-gray-800 py-2">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center items-center mb-2">
                <span className="text-sm font-light">Développé avec</span>
                <span className="text-red-500 mx-4 animate-pulse">❤️</span>
                <span className="text-sm font-light">
                  pour votre bien-être.
                </span>
              </div>
              <p className="text-xs md:text-sm">
                © 2025 Suivi Cardio & Sommeil. Tous droits réservés.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
