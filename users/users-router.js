const express = require('express');
const db = require('./userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({err: "something went wrong with the server"});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.getById(id);
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({error: "User with specified ID does not exist."});
    }
  } catch (e) {
    res.status(500).json({err: "Something went wrong with the server."});
  }
});

router.post('/', async (req, res) => {
  const newUser = req.body;

  try {
    const user = await db.insert(newUser);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({err: "Something went wrong with the server."});
  }
});

router.put('/:id', async (req, res) => {
  const newUser = req.body;
  const { id } = req.params;

  try {
    const user = await db.getById(id);
    if(user) {
      const count = await db.update(id, newUser);
      if(count === 1) {
        const updatedUser = await db.getById(id);
        res.status(201).json(updatedUser);
      }
    } else {
      res.status(404),json({error: "User with specified ID does not exist"});
    }
  } catch (e) {
    res.status(500).json({err: "Something went wrong with the server."});
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.getById(id);
    if(user) {
      const count = await db.remove(id);
      if(count === 1) {
        res.status(201).json({message: "User deleted."})
      }
    } else {
      res.status(404).json({error: "User with specified ID does not exist."})
    }
  } catch (e) {
    res.status(500).json({err: "Something went wrong with the server."})
  }
})


module.exports = router;