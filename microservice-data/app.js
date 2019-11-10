const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

let dataBase = [
  {
    id: "1",
    brand: "Alfa Romeo",
    model: "8C",
    maxSpeed: "150 mph",
    price: "200000$"
  },
  {
    id: "2",
    brand: "Mercedes-Benz",
    model: "AMG GT-R",
    maxSpeed: "180 mph",
    price: "150000$"
  },
  {
    id: "3",
    brand: "Lada",
    model: "2107",
    maxSpeed: "90 mph",
    price: "1000$"
  },
];

app.use(bodyParser.json());

app.get('/:id', (req, res) => {
  const id = req.params['id'];
  let result;
  if (id) {
    for (i = 0; i < dataBase.length; i++) {
      if (dataBase[i].id === id) {
        result = dataBase[i];
      }
    }
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Car with this id not found');
    }
  } else {
    res.status(400).send('Please, provide id');
  }
});

app.post('/', function (req, res) {
  const car = req.body;
  const newCar = {
    id: (dataBase.length + 1).toString(),
    brand: car.brand,
    model: car.model,
    maxSpeed: car.maxSpeed,
    price: car.price
  };
  dataBase.push(newCar);
  res.status(200).send(newCar);
});

app.put('/:id', function (req, res) {
  const id = req.params['id'];
  let result;
  const update = req.body;
  if (id) {
    for (i = 0; i < dataBase.length; i++) {
      if (dataBase[i].id === id) {
        for (const prop in update) {
          if (dataBase[i].hasOwnProperty(prop)) {
            dataBase[i][prop] = update[prop];
          }
        }
        result = dataBase[i];
      }
    }
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Car with this id not found');
    }
  } else {
    res.status(400).send('Please, provide id');
  }
});

app.delete('/:id', function (req, res) {
  const id = req.params['id'];
  let deleted;
  if (id) {
    for (i = 0; i < dataBase.length; i++) {
      if (dataBase[i].id === id) {
        deleted = dataBase[i];
        dataBase.splice(i, 1);
        break;
      }
    }
    if (deleted) {
      res.status(200).send('Car: ' + deleted.brand + ' ' + deleted.model + ' with id =' + deleted.id + ' has succesfully deleted.');
    } else {
      res.status(404).send('Car with this id not found');
    }
  } else {
    res.status(400).send('Please, provide id');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});