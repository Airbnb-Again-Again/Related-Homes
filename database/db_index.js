const cassandra = require('cassandra-driver');
const host1 = 'localhost';
const PORT1 = 9042;
const PORT2 = 9043;

const Uuid = require('cassandra-driver').types.Uuid;

const client = new cassandra.Client({ 
  contactPoints: [host1],
  localDataCenter: 'datacenter1',
  keyspace: 'airbnbsdc'
});

client.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to Cassandra`);
  }
});

const getHomes = (zip, callback) => {
  const query = 'SELECT * FROM listings WHERE zip = ? ORDER BY rating DESC LIMIT 12;';
  
  client.execute(query, [zip], {prepare: true})
  .then(result => {
    console.log(result);
    callback(null, result);
  })
  .catch(err => {
    console.log(`Error on db GET for 12 homes`, err);
    callback(err);
  });
}

const postHome = (homeData, callback) => {
  const query = `INSERT INTO listings (zip, rating, id, reviewcount, bedcount, category, price, title, photos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const id = Uuid.random();
  const params = [94000, 4.5, id, 500, 4, 'Apartment', 100, 'Super Fun House!', ['https://loremflickr.com/720/400/house', 'https://loremflickr.com/720/400/house']];

  client.execute(query, params, {prepare: true})
    .then(result => {
      console.log(`Successful post`);
      callback(null, result);
    })
    .catch(err => {
      console.log(`Error posting to db`); 
      callback(err);
    });
}

const updateHome = (homeData, callback) => {
  console.log(`updateHome not functional yet`);
}

const deleteHome = (homeData, callback) => {
  console.log(`deleteHome not functional yet`);
}

module.exports = {
  getHomes,
  postHome,
  updateHome,
  deleteHome
}
