import express from "express";
import {ajouterLoaning,getAllLoaning,getOneLoaning,getAllLoaningByUser,deleteLoaning} from '../controller/LoaningController.js'
const router = express.Router()

router.route('/').post(ajouterLoaning)
router.route('/').get(getAllLoaning)
router.route('/user/:user').get(getAllLoaningByUser)
router.route('/:id').get(getOneLoaning)
router.route('/:id').delete(deleteLoaning)

export default router