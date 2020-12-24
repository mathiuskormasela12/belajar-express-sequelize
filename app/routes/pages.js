// ===== Pages
// import all modules
const express       = require('express');

// import all controllers
const appController = require('../controllers/appController');

// init router
const router        = express.Router();

router.get('/post', appController.getAllPost);
router.get('/post/:id', appController.getPost);
router.post('/post', appController.createPost);

module.exports       = router;