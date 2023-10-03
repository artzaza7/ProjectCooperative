const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/users', userController.readUser)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/user/:id', userController.findById)

router.post('/income/:id', userController.addIncome)
router.get('/income/:id',userController.getAllIncomeByUser)
router.delete('/income',userController.deleteIncome)
router.put('/income', userController.updateIncome)

router.post('/expense/:id', userController.addExpense)
router.get('/expense/:id',userController.getAllExpenseByUser)
router.delete('/expense',userController.deleteExpense)
router.put('/expense',userController.updateExpense)



module.exports = router