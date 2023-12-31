const Url = require('../models/urlModel');
const UrlShortener = require('../utils/urlShortener');
class UrlController {
    static async shortenUrl(req, res) {
        try {
            const { originalUrl } = req.body;
            if (!originalUrl)
                return res.status(400).json({ message: "URL is required" });
            //check if the url is already shortened
            let url = await Url.findOne({ originalUrl });
            if (url) {
                return res.json(url);
            }
            //generate a short url
            const shortUrl = UrlShortener.generateShortUrl();
            //save to the database
            url = new Url({
                originalUrl, shortUrl
            });
            await url.save();
            res.json(url);
        } catch (err) {
            res.status(500).json({ message: 'Sever error : ' + err.message });
        }
    }
    static async redirectToOriginalUrl(req, res) {
        try {
            const { shortUrl } = req.params;
            const url = await Url.findOne({ shortUrl: shortUrl });
            if (!url) {
                return res.status(404).send('URL NOT FOUND');
            }
            //increase the count
            url.clicks += 1;
            await url.save();
            res.redirect(url.originalUrl);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    static async deleteUrl(req, res) {
        try {
            const { shortUrl } = req.params;

            // Find the URL document with the provided short URL
            const url = await Url.findOne({ shortUrl });

            if (!url) {
                return res.status(404).send('URL NOT FOUND');
            }

            // Delete the URL from the database
            await Url.deleteOne({ _id: url._id });

            res.json({ message: 'URL deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    static async getUrls(req, res) {
        try {
          // Fetch the URLs from your database
          const urls = await Url.find({});
      
          // Respond with the list of URLs in JSON format
          res.json(urls);
        } catch (error) {
          console.error('Error fetching URLs:', error);
          res.status(500).json({ error: 'Failed to fetch URLs' });
        }
      }
      static async getUrlsPerDayAndPerMonth(req, res) {
        try {
            const totalUrls = await Url.countDocuments({});

          // Calculate the total number of URLs created per day
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const nextDay = new Date(today);
          nextDay.setDate(today.getDate() + 1);
    
          const urlsCreatedToday = await Url.countDocuments({
            createdAt: { $gte: today, $lt: nextDay },
          });
    
          // Calculate the total number of URLs created within the current month
          const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
          const urlsCreatedThisMonth = await Url.countDocuments({
            createdAt: { $gte: firstDayOfMonth },
          });
    
          // Respond with the statistics in JSON format
          res.json({
            totalUrls,
            urlsCreatedToday,
            urlsCreatedThisMonth,
          });
        } catch (error) {
          console.error('Error fetching statistics:', error);
          res.status(500).json({ error: 'Failed to fetch statistics' });
        }
      }
}
module.exports = UrlController;