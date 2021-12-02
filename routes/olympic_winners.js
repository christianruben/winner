const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');

const OlympicWinners = require('../models/olympic_winners');
const Sports = require('../models/sports');
const Countries = require('../models/countries');

router.post('/all', async (req, res, next) => {
  try {
    const {
      endRow,
      filterModel,
      groupKeys,
      pivotCols,
      pivotMode,
      rowGroupCols,
      sortModel,
      startRow,
      valueCols
    } = req.body;

    let where = [];

    const countryName = filterModel['country.name'];
    const year = filterModel['year'];
    const date = filterModel['date'];
    if (countryName) {
      where.push({
        "$country.name$": {
          [Op.in]: filterModel['country.name'].values
        }
      })
    }

    if (year) {
      const operator = year.operator;

      if (operator) {
        const query1 = filterYear(year.condition1);
        const query2 = filterYear(year.condition2);

        if (operator === "AND") {
          where.push({
            [Op.and]: [query1, query2]
          });
        } else {
          where.push({
            [Op.or]: [query1, query2]
          });
        }
      } else {
        const query = filterYear(year);

        if (query) {
          where.push(query);
        }
      }
    }

    if (date) {
      const operator = date.operator;
      
      if (operator) {
        const query1 = filterDate(date.condition1);
        const query2 = filterDate(date.condition2);

        if (operator === "AND") {
          where.push({
            [Op.and]: [query1, query2]
          });
        } else {
          where.push({
            [Op.or]: [query1, query2]
          });
        }
      } else {
        const query = filterDate(date);

        if (query) {
          where.push(query);
        }
      }
    }

    let orderList = [];

    for (let i = 0; i < sortModel.length; i++) {
      const order = sortModel[i].colId.split('.');
      order.push(sortModel[i].sort);
      orderList.push(order);
    }

    const response = await OlympicWinners.findAll({
      include: [
        { model: Sports, required: true },
        { model: Countries, required: true }
      ],
      where: {
        [Op.and]: where
      },
      order: orderList
    });

    res.status(200).json({
      status: 'success',
      data: {
        lastRow: 8001,
        rows: response
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

    const olympic_winnners = await OlympicWinners.findAll({
      where: {
        id: id
      }
    });

    res.status(200).json({
      status: 200,
      data: {
        item: olympic_winnners.length > 0 ? olympic_winnners[0] : null
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
    const id = req.params.id;
    
    const filter = {
      where: {
        id: id
      }
    }

    await OlympicWinners.update(filter, req.body);

    res.status(200).json({
      status: 200,
      msg: 'Olympic Winner updated'
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
    await OlympicWinners.create(req.body);

    res.status(200).json({
      status: 200,
      msg: 'Olympic Winner created'
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

    await OlympicWinners.destroy({
      where: {
        id: id
      }
    });

    res.status(200).json({
      status: 200,
      msg: 'Olympic Winner deleted'
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

function filterYear(year) {
  let query = null;
  const type = year.type;

  if (type === 'equals') {
    query = {
      year: {
        [Op.eq]: year.filter
      }
    }
  } else if (type === 'notEqual') {
    query = {
      year: {
        [Op.not]: year.filter
      }
    }
  } else if (type === 'lessThan') {
    query = {
      year: {
        [Op.lt]: year.filter
      }
    }
  } else if (type === 'lessThanOrEqual') {
    query = {
      year: {
        [Op.lte]: year.filter
      }
    }
  } else if (type === 'greaterThan') {
    query = {
      year: {
        [Op.gt]: year.filter
      }
    }
  } else if (type === 'greaterThanOrEqual') {
    query = {
      year: {
        [Op.gte]: year.filter
      }
    }
  } else if (type === 'inRange') {
    query = {
      year: {
        [Op.between]: [year.filter, year.filterTo]
      }
    }
  }

  return query;
}

function filterDate(date) {
  let query = null;
  const type = date.type;
  if (type === 'equals') {
    query = {
      date: {
        [Op.eq]: date.dateFrom.split(' ')[0]
      }
    }
  } else if (type === 'notEqual') {
    query = {
      date: {
        [Op.not]: date.dateFrom.split(' ')[0]
      }
    }
  } else if (type === 'lessThan') {
    query = {
      date: {
        [Op.lt]: date.dateFrom.split(' ')[0]
      }
    }
  } else if (type === 'lessThanOrEqual') {
    query = {
      date: {
        [Op.lte]: date.dateFrom.split(' ')[0]
      }
    }
  } else if (type === 'greaterThan') {
    query = {
      date: {
        [Op.gt]: date.dateFrom.split(' ')[0]
      }
    }
  } else if (type === 'greaterThanOrEqual') {
    query = {
      date: {
        [Op.gte]: date.dateFrom.split(' ')[0]
      }
    }
  } else if (type === 'inRange') {
    query = {
      date: {
        [Op.between]: [date.dateFrom.split(' ')[0], date.dateTo.split(' ')[0]]
      }
    }
  }

  return query;
}

module.exports = router;
