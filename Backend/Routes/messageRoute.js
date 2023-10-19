const {addMsg, getAllMsg} = require('../Controllers/messageController')
const router = require('express').Router();

router.post('/addMsg', addMsg);
router.post("/getMsg", getAllMsg);

module.exports = router;