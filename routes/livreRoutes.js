import express from "express";
import {ajouterLivre,getAllLivre,getOneLivre,updateLivre,deleteLivre,getAllLivreByGender,getAllLivreByAutor} from '../controller/LivreController.js'
const router = express.Router()

router.route('/').post(ajouterLivre)
router.route('/').get(getAllLivre)
router.route('/genre/:genre').get(getAllLivreByGender)
router.route('/auteur/:auteur').get(getAllLivreByAutor)
router.route('/:id').get(getOneLivre)
router.route('/:id').put(updateLivre)
router.route('/:id').delete(deleteLivre)

export default router