const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')


router.get('/users', userController.readUser)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/user/:id', userController.findById)

router.post('/income/:id', userController.addIncome)
router.get('/income/:id',userController.getAllIncomeByUser)
router.delete('/income',userController.deleteIncome)
router.put('/income', userController.updateIncome)
router.get('/income/year/months',userController.incomeYearSum)
router.get('/income/months/:month/types', userController.incomeMonthSum)

router.post('/expense/:id', userController.addExpense)
router.get('/expense/:id',userController.getAllExpenseByUser)
router.delete('/expense',userController.deleteExpense)
router.put('/expense',userController.updateExpense)
router.get('/expense/year/months',userController.expenseYearSum)
router.get('/expense/months/:month/types', userController.expenseMonthSum)

router.get('/money/:id', userController.getAllByUser)






module.exports = router