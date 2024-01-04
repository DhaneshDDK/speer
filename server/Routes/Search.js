const express = require('express');
const router = express.Router();
const {searchNotes} = require('../Controllers/Notes')
const {auth} = require('../Middlewares/auth')

router.get('/', auth,searchNotes);

module.exports = router;
