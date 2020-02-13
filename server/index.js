const express = require('express');
const app = express();
const port = 4321;
const path = require('path');
const db = require('../database/index.js');

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/getHomes', (req, res) => {
  db.getThreeHomes((err, list) => {
    if (err) {
      res.send(err);
    }
    res.send(list);
  })
})

app.get('/api/related-homes/:listingId', (req, res) => {
  let home = req.params.listingId;
  db.getHome((err, home) => {
    if (err) {
      res.send(err);
    }
    res.send(home);
  }, home)
})


/////// NEW CRUD OPERATIONS \\\\\\\

app.get('/related-homes/:listingId', (req, res) => {
  //create get function
  const listingId = req.params.listingId;
  db.getHome(listingId, (err, home) => {
    if (err) {
      console.log(err);
      res.status(404).send('Error: cannot GET home');
    } else {
      res.status(200).send(home);
    }
  })
});

app.post('/related-homes/newListing', (req, res) => {
  //create insert function
  const listingId = req.params.listingId;
  db.postHome(listingId, (err, data) => {
    if (err) {
      console.log('Error: cannot POST to db! ', err);
      res.status(500).send('Error: cannot POST to db!');
    } else {
      res.status(201).send(data);
    }
  })
});

app.put('/related-homes/:listingId', (req, res) => {
  //create update function

});

app.delete('/related-homes/:listingId', (req, res) => {
  //create delete function

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
