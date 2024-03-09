import express from "express";
import {ajouterAuteur,getAllAuteur,getOneAuteur,updateAuteur,deleteAuteur} from '../controller/AuteurController.js'
const router = express.Router()

router.route('/').post(ajouterAuteur)
router.route('/').get(getAllAuteur)
router.route('/:id').get(getOneAuteur)
router.route('/:id').put(updateAuteur)
router.route('/:id').delete(deleteAuteur)

export default router