const express = require('express');

const statsController = require('../controllers/stats');
const router = express.Router();

router.get('/stats', statsController.getStats);
router.get('/userstats',statsController.getUserstats);
router.post('/tails', statsController.addTails);
router.post('/heads', statsController.addHeads);
router.post('/userTails', statsController.addUserTails);
router.post('/userHeads', statsController.addUserHeads);

module.exports = router;
