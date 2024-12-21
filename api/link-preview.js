// api/link-preview.js
const { getLinkPreview } = require('link-preview-js');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" query parameter.' });
  }

  try {
    const data = await getLinkPreview(url);
    res.setHeader('Access-Control-Allow-Origin', 'https://www.tutoringcrow.net'); // Adjust in production
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching link preview:', error.message);
    res.status(500).json({ error: 'Failed to fetch link preview.' });
  }
};
