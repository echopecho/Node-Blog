const express = require('express');
const db = require('./postDb.js');
const userDb = require('./../users/userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({err: "Something wrong with the server"})
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.getById(id);
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({error: "Post with specified ID does not exist."});
    }
  } catch (e) {
    res.status(500).json({err: "Something went wrong with the server."});
  }
});

router.post('/', async (req, res) => {
  const newPost = req.body;

  if(newPost.text && newPost.user_id) {
    try {
      console.log(newPost);
      const user = await userDb.getById(newPost.user_id);
      if(user) {
        const post = await db.insert(newPost);
        res.status(201).json(post);
      } else {
        res.status(400).json({error: "User ID was invalid"})
      }
    } catch (e) {
      res.status(500).json({err: "Something went wrong with the server."});
    }
  } else {
    res.status(400).json({error: "Please provide both text and a user ID."})
  }
});

router.put('/:id', async (req, res) => {
  const newPost = req.body;
  const { id } = req.params;

  try {
    const post = await db.getById(id);
    if(post) {
      const count = await db.update(id, newPost);
      if(count === 1) {
        const updatedPost = await db.getById(id);
        res.status(201).json(updatedPost);
      }
    } else {
      res.status(404),json({error: "Post with specified ID does not exist"});
    }
  } catch (e) {
    res.status(500).json({err: "Something went wrong with the server."});
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.getById(id);
    if(post) {
      const count = await db.remove(id);
      if(count === 1) {
        res.status(201).json({message: "Post deleted."})
      }
    } else {
      res.status(404).json({error: "Post with specified ID does not exist."})
    }
  } catch (e) {
    res.status(500).json({err: "Something went wrong with the server."})
  }
})


module.exports = router;