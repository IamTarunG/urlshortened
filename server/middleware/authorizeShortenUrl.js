

const asyncHandler = require('express-async-handler');

const authorizeShortenUrl = asyncHandler(async (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  if (!req.user.canShortenUrls) {
    return res.status(403).json({ message: 'Not authorized to shorten URLs' });
  }

 
  next();
});

module.exports = authorizeShortenUrl;
