const router = require('express').router();
// Import all of the API routes from /api/index.js
const apiRoutes = require('./api');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).json({ message: 'Page not found!'})
  });

module.exports = router;