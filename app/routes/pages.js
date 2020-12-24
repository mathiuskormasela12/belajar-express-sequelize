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
router.put('/post/:id', appController.updatePost);
router.delete('/post', appController.deleteAllPost);
router.delete('/post/:id', appController.deletePost);
router.get('/post/published', appController.getAllPublished);

module.exports       = router;