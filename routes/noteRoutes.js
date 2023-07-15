const express =require ('express')
const router = express.Router()
const noteController = require('../controllers/notesController')
router.get('/notesController',noteController.getAllNotes)
router.post('/notesController',noteController.createNewNote)
router.delete('/notesController',noteController.updateNote)
router.delete('/notesController/:name' , noteController.deleteNote)


module.exports = router;