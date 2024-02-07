const nanoid = require('nanoid');

const Url = require('../models/Url');

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = generateShortUrl();

  try {
    const newUrl = new Url({
      originalUrl,
      shortUrl,
      userId: req.user._id 
    });

    await newUrl.save();
    res.json(newUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
};
exports.redirectToOriginalUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOneAndUpdate({ shortUrl }, { $inc: { clickCount: 1 } }, { new: true });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }
    console.log(shortUrl)
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getSingleUrl = async(req,res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }
    if (url.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.getUserUrls = async (req, res) => {
  try {
    const userUrls = await Url.find({ userId: req.user._id });
    res.json(userUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUserUrl = async (req, res) => {
  const { id } = req.params;
  const { updatedUrl } = req.body;

  try {

    const url = await Url.findOneAndUpdate({ _id: id, userId: req.user._id }, { originalUrl: updatedUrl }, { new: true });

    if (!url) {
      return res.status(404).json({ message: 'URL not found or unauthorized' });
    }

    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteUserUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!url) {
      return res.status(404).json({ message: 'URL not found or unauthorized' });
    }

    res.json({ message: 'URL deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

function generateShortUrl() {
  return nanoid()
}
