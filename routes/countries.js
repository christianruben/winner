const express = require('express');
const router = express.Router();

const Countries = require('../models/countries');

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
    const sports = await Countries.findAll(options);

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

    const countries = await Countries.findAll(options);

    res.status(200).json({
      status: 200,
      data: {
        item: countries.length > 0 ? countries[0] : []
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

    await Countries.update(options, {
      name: name
    });

    res.status(200).json({
      status: 200,
      msg: "Sports updated"
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

    await Countries.create({
      name: name
    });

    res.status(200).json({
      status: 200,
      msg: "Countries created"
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

    await Countries.destroy({
      where: {
        id: id
      }
    });

    res.status(200).json({
      status: 200,
      msg: "Countries deleted"
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

module.exports = router;
