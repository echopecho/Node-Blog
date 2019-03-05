const express = require('express');
const db = require('./userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({err: "something wrong with the server"})
  }
})


module.exports = router;