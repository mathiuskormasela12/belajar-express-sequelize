// ===== Pages
// import all modules
const express       = require('express');

// import all controllers
const appController = require('../controllers/appController');

// init router
const router        = express.Router();

router.get('/', appController.getAllPost);
router.post('/post', appController.createPost);

module.exports       = router;