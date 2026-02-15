import { Router } from 'express';
// Importamos las funciones específicas del controlador
import { 
    getReports, 
    generateReport, 
    downloadReport, 
    deleteReport 
} from '../controllers/reportController.js';

const router = Router();

// --- RUTAS ---

// Obtener todos los reportes (con paginación y filtros)
router.get('/', getReports);

// Generar un nuevo reporte
router.post('/generate', generateReport);

// Descargar un reporte específico
router.get('/:id/download', downloadReport);

// Eliminar un reporte (Físico y BD)
router.delete('/:id', deleteReport);

export default router;
