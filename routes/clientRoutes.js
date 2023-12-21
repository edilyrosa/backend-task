
// import express from "express";
// const router = express.Router();
// //import clientController from '../controllers/clientController.js'
// import * as clientController from '../controllers/clientController.js';


// router.get('/', clientController.getAllClients);
// router.get('/:id', clientController.getClientById); // Cambiado según tu pregunta
// router.post('/', clientController.createClient);
// router.put('/:id', clientController.updateClient);
// router.delete('/:id', clientController.deleteClient);

// module.exports = router;

// clientRoutes.js
import express from 'express';
import * as clientController from '../controllers/clientController.js';

const router = express.Router();

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

export default router;