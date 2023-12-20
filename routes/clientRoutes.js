
import express from "express";
const router = express.Router();
import clientController from '../controllers/clientController'


router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById); // Cambiado según tu pregunta
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
