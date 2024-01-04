const express = require('express');
const router = express.Router();
const {fetchAllNotes, fetchIdNotes, createNotes, updateNotes, deleteNotes, shareNotes} = require('../Controllers/Notes')
const {auth} = require('../Middlewares/auth');

router.get('/', auth, fetchAllNotes);
router.get('/:id', auth, fetchIdNotes );
router.post('/', auth, createNotes );
router.put('/:id', auth, updateNotes );
router.delete('/:id', auth, deleteNotes );
router.post('/:id/share', auth, shareNotes);

module.exports = router;