require('newrelic');
const express = require('express');
const app = express();
const port = 4321;
const path = require('path');
const db = require('../database/db_index.js');

app.use(express.static(path.join(__dirname, '../client/dist')));


/////// NEW CRUD OPERATIONS \\\\\\\

app.get('/related-homes/getHomes', (req, res) => {
  //create get function
  let zip = req.query.zip ? req.query.zip : 94114;
  db.getHomes(zip, (err, homes) => {
    if (err) {
      console.log(err);
      res.status(404).send('Error: cannot GET homes');
    } else {
      console.log(homes);
      res.status(200).send(homes);
    }
  })
});

app.post('/related-homes/newListing', (req, res) => {
  //create insert function
  const listingId = req.query.id;
  db.postHome(listingId, (err, data) => {
    if (err) {
      console.log('Error: cannot POST to db! ', err);
      res.status(500).send('Error: cannot POST to db!');
    } else {
      res.status(201).send('Successfully posted new home listing');
    }
  })
});

app.put('/related-homes/:listingId', (req, res) => {
  //create update function
  const listingId = req.params.listingId;
  db.updateHome(listingId, (err, data) => {
    if (err) {
      console.log('Error: cannot update listing in db', err);
      res.status(500).send('Error: cannot resolve PUT to db');
    } else {
      res.status(200).send('Successfully updated new home listing');
    }
  });
});

app.delete('/related-homes/:listingId', (req, res) => {
  //create delete function
  const listingId = req.params.listingId;
  db.deleteHome(listingId, (err, data) => {
    if (err) {
      console.log('Error: cannot delete listing in db', err);
      res.status(500).send('Error: cannot delete listing in db');
    } else {
      res.status(200).send('Successfully deleted home listing');
    }
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
