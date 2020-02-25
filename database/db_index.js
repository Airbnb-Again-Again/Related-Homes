const cassandra = require('cassandra-driver');
const host1 = 'localhost';
const PORT1 = 9042;
const PORT2 = 9043;

const Uuid = require('cassandra-driver').types.Uuid;
const faker = require('faker');

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


//----HELPER FUNCTIONS----\\

const getRandomCategory = () => {
  const categories = ['Entire House', 'Entire Apartment', 'Entire Condominium', 'Entire Cottage', 'Entire Serviced Apartment', 'Tree House', 'Private Home', 'Loft', 'Hotel', 'Townhouse', 'Villa', 'Resort', 'Cabin']
  let random = Math.floor(Math.random() * Math.floor(categories.length));
  return categories[random];
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // maximum is exclusive/minimum is inclusive
};

const getRandomPictures = () => {
  const pics = 'https://loremflickr.com/720/400/house';
  const result = [];

  let numOfPics = getRandomInt(5, 15);

  for (var i = 0; i < numOfPics; i++) {
    result.push(pics[randomPic]);
  }
  return result;
}


const generateNewHome = () => {
  let id = Uuid.random();
  let title = faker.fake('{{commerce.productAdjective}} {{company.catchPhraseDescriptor}} Home');
  let category = getRandomCategory();
  let bedCount = getRandomInt(1, 11);
  let price = (getRandomInt(40, 301));
  let zip = faker.fake('{{address.zipCode}}').substring(0, 5);
  let imageURL = 'https://loremflickr.com/720/400/house';
  let images = [];
  imageCount = getRandomInt(6, 15);
  for (n = 0; n < imageCount; n++) {
    images.push(imageURL);
  };
  
  let homeData = [zip, 0, id, 0, bedCount, category, price, title, images];
  return homeData;
}


//----DATABASE OPERATIONS----\\

const getHomes = (zip, callback) => {
  const query = 'SELECT * FROM listings WHERE zip = ? ORDER BY rating DESC LIMIT 12;';

  client.execute(query, [zip], { prepare: true })
    .then(result => {
      console.log(`Successful GET for 12 homes`);
      callback(null, result.rows);
    })
    .catch(err => {
      console.log(`Error on db GET for 12 homes`, err);
      callback(err);
    });
}

const postHome = (homeData, callback) => {
  const query = `INSERT INTO listings (zip, rating, id, reviewcount, bedcount, category, price, title, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = generateNewHome();
  console.log(params);

  client.execute(query, params, { prepare: true })
    .then(result => {
      console.log(`Successful post`);
      callback(null, result);
    })
    .catch(err => {
      console.log(`Error posting to db`);
      callback(err);
    });
}

const updateHome = (listingId, callback) => {
  const query = `UPDATE listings SET price = 100 WHERE zip = 92009 AND rating = 5 AND id = ?`;
  const params = [listingId];

  client.execute(query, params, { prepare: true })
    .then(result => {
      console.log(`Successful update`);
      callback(null, result);
    })
    .catch(err => {
      console.log(`Error updating db`);
      callback(err);
    });
}

const deleteHome = (homeData, callback) => {
  const query = `DELETE FROM listings WHERE zip = 92009 AND rating = 5 AND id = 9232531`;
  const params = [listingId];

  client.execute(query, params, { prepare: true })
    .then(result => {
      console.log(`Successful delete`);
      callback(null, result);
    })
    .catch(err => {
      console.log(`Error deleting from db`);
      callback(err);
    });
}

module.exports = {
  getHomes,
  postHome,
  updateHome,
  deleteHome
}
