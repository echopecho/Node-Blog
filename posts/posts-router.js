const express = require('express');
const db = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({err: "something wrong with the server"})
  }
})


module.exports = router;