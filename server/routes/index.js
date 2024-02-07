

const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeShortenUrl = require('../middleware/authorizeShortenUrl');


router.post('/signup', authController.signUpUser);
router.post('/login', authController.loginUser);


router.post('/shorten', authMiddleware, authorizeShortenUrl, urlController.shortenUrl);
router.get('/url/:shortUrl',urlController.redirectToOriginalUrl);
router.get('/dashboard/urls', authMiddleware, urlController.getUserUrls);
router.put('/dashboard/urls/:id', authMiddleware, urlController.updateUserUrl);
router.delete('/dashboard/urls/:id', authMiddleware, urlController.deleteUserUrl);
router.get('/dashboard/urls/:id', authMiddleware, urlController.getSingleUrl);

module.exports = router;
