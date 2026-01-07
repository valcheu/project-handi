// project-handi/backend/src/config/prisma.ts

import { PrismaClient } from '@prisma/client';

// Instancier le client une seule fois
const prisma = new PrismaClient();

// Exporter pour une utilisation globale dans les services
export default prisma;