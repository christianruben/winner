const express = require('express');
const router = express.Router();

const Sports = require('../models/sports');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const name = req.body.q;

    let options = {};

    if (name) {
      options = {
        where: {
          name: name
        }
      }
    }
    const sports = await Sports.findAll(options);

    res.status(200).json({
      status: 200,
      data: {
        list: sports
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    let options = {
      where: {
        id: id
      }
    }

    const sports = await Sports.findAll(options);

    res.status(200).json({
      status: 200,
      data: {
        item: sports.length > 0 ? sports[0] : []
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id    = req.params.id;
    const name  = req.body.name;

    let options = {
      where: {
        id: id
      }
    }

    const sports = await Sports.update(options, {
      name: name
    });

    res.status(200).json({
      status: 200,
      msg: "Sport updated"
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name;

    await Sports.create({
      name: name
    });

    res.status(200).json({
      status: 200,
      msg: "Sport created"
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Sports.destroy({
      where: {
        id: id
      }
    });

    res.status(200).json({
      status: 200,
      msg: "Sport deleted"
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

module.exports = router;
