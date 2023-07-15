const express =require ('express')
const router = express.Router()
const userController = require('../controllers/userController')
router.get('/userController',noteController.getAllUser)
router.post('/userController',noteController.createNewUser)
router.delete('/userController',noteController.updateUser)
router.delete('/userController/:name' , noteController.deleteUser)


module.exports = router;