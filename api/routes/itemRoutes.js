const express = require('express');
const { getItemsByGodownId } = require('../controllers/itemControllers'); 
const router = express.Router();

router.get('/godown/:godownId', getItemsByGodownId); 

module.exports = router;
