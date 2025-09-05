// src/app/api/cardio/route.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import os from 'os';

// Promisifier exec pour pouvoir l'utiliser avec async/await
const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    // 1. Recevoir le fichier du client
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier reçu.' }, { status: 400 });
    }

    // 2. Sauvegarder le fichier temporairement
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, file.name);
    const fileBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(fileBuffer));

    // 3. Exécuter le script Python
    // IMPORTANT : Assurez-vous que le chemin vers votre script et votre environnement Python est correct
    const pythonScriptPath = path.join(process.cwd(), 'tcx_parser.py');
    const pythonEnvPath = path.join(process.cwd(), 'venv', 'bin', 'python'); // Chemin vers l'exécutable Python dans l'env virtuel
    
    // Assurez-vous d'avoir activé l'environnement dans votre terminal avant de lancer le serveur de dev
    const command = `${pythonEnvPath} ${pythonScriptPath} ${filePath}`;
    
    const { stdout, stderr } = await execAsync(command);
    
    // 4. Gérer le résultat du script
    if (stderr) {
      console.error(`Erreur Python: ${stderr}`);
      return NextResponse.json({ error: 'Erreur lors de l\'exécution du script Python.' }, { status: 500 });
    }

    const result = JSON.parse(stdout);

    // 5. Supprimer le fichier temporaire
    await fs.unlink(filePath);

    // 6. Renvoyer les données au client
    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur de la route API:', error);
    return NextResponse.json({ error: 'Une erreur interne est survenue.' }, { status: 500 });
  }
}