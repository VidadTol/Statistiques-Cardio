import { NextRequest, NextResponse } from 'next/server';

// Interface pour les données de sommeil
export interface SommeilData {
  id?: string;
  date: string;
  duree?: string;
  qualite?: string;
  profond?: {
    duree: string;
    pourcentage: number;
  };
  paradoxal?: {
    duree: string;
    pourcentage: number;
  };
  reveille?: {
    duree: string;
    fois: number;
  };
  regularite?: string;
}

// Stockage temporaire en mémoire (en production, utilisez une vraie base de données)
let sommeilData: SommeilData[] = [];

// GET - Récupérer toutes les analyses de sommeil
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: sommeilData,
      count: sommeilData.length
    });
  } catch (error) {
    console.error('Erreur GET /api/sommeil:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

// POST - Ajouter une nouvelle analyse de sommeil
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation basique
    if (!body.date) {
      return NextResponse.json(
        { success: false, error: 'La date est requise' },
        { status: 400 }
      );
    }

    // Créer une nouvelle analyse avec un ID unique
    const nouvelleAnalyse: SommeilData = {
      id: Date.now().toString(),
      date: body.date,
      duree: body.duree,
      qualite: body.qualite,
      profond: body.profond,
      paradoxal: body.paradoxal,
      reveille: body.reveille,
      regularite: body.regularite
    };

    // Ajouter à la liste
    sommeilData.push(nouvelleAnalyse);

    console.log('Nouvelle analyse ajoutée:', nouvelleAnalyse);

    return NextResponse.json({
      success: true,
      data: nouvelleAnalyse,
      message: 'Analyse de sommeil ajoutée avec succès'
    });

  } catch (error) {
    console.error('Erreur POST /api/sommeil:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'ajout des données' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer toutes les analyses (utile pour le développement)
export async function DELETE() {
  try {
    const count = sommeilData.length;
    sommeilData = [];
    
    return NextResponse.json({
      success: true,
      message: `${count} analyses supprimées`,
      data: []
    });
  } catch (error) {
    console.error('Erreur DELETE /api/sommeil:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}