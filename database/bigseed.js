const fs = require('fs');
const faker = require('faker');

const writeUsers = fs.createWriteStream('CassandraData_revID.csv');
writeUsers.write('id|title|category|bedCount|rating|reviewCount|price|zip|images\n', 'utf8');

const LISTING_COUNT = 10000000;
const IMAGE_COUNT_MAX = 15;

const getRandomCategory = () => {
  const categories = ['Entire House', 'Entire Apartment', 'Entire Condominium', 'Entire Cottage', 'Entire Serviced Apartment', 'Tree House', 'Private Home', 'Loft', 'Hotel', 'Townhouse', 'Villa', 'Resort', 'Cabin']
  let random = Math.floor(Math.random() * Math.floor(categories.length));
  return categories[random];
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomRating = () => {
  let randomNum = Math.floor(Math.random() * (6 * 100 - 1 * 100) + 1 * 100) / (1 * 100);
  if (randomNum > 5) {
    return 5;
  }
  return randomNum;
}

function writeTenMillionListings(writer, encoding, callback) {
  let i = LISTING_COUNT;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let title = faker.fake('{{commerce.productAdjective}} {{company.catchPhraseDescriptor}} Home!');
      let category = getRandomCategory();
      let bedCount = getRandomInt(1, 11);
      let rating = getRandomRating();
      let reviewCount = getRandomInt(0, 501);
      let price = (getRandomInt(40, 301));
      let zip = faker.fake('{{address.zipCode}}').substring(0, 5);

      const data = `${id},${title},${category},${bedCount},${rating},${reviewCount},${price},${zip}\n`;
      if (i % 500000 === 0) {
        console.log(i);
      }
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
};


//COMMENT OUT BELOW TO GENERATE LISTING DATA

// writeTenMillionListings(writeUsers, 'utf-8', () => {
//   writeUsers.end();
// });



// ---------------------------------------------- \\



function writePhotoData(writer, encoding, callback) {
  let i = LISTING_COUNT * IMAGE_COUNT_MAX;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let URL = 'https://loremflickr.com/720/400/house';
      let listingId = getRandomInt(1, LISTING_COUNT);

      const data = `${id},${URL},${listingId}\n`;
      if (i % 500000 === 0) {
        console.log(i);
      }
      if (id === LISTING_COUNT * IMAGE_COUNT_MAX) {
        console.log('DONE');
      }
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
};


//COMMENT OUT BELOW TO GENERATE PHOTO DATA

// writePhotoData(writeUsers, 'utf-8', () => {
//   writeUsers.end();
// });




// ----------------Cassandra------------------- \\

const Uuid = require('cassandra-driver').types.Uuid;

function writeCassandraData(writer, encoding, callback) {
  let i = LISTING_COUNT;
  // let id = 0;
  let imageId = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      // id += 1;
      let id = Uuid.random();
      let title = faker.fake('{{commerce.productAdjective}} {{company.catchPhraseDescriptor}} Home');
      let category = getRandomCategory();
      let bedCount = getRandomInt(1, 11);
      let rating = getRandomRating();
      let reviewCount = getRandomInt(0, 501);
      let price = (getRandomInt(40, 301));
      let zip = faker.fake('{{address.zipCode}}').substring(0, 5);
      let imageURL = 'https://loremflickr.com/720/400/house';
      let images = [];
      imageCount = getRandomInt(6, 15);
      for (n = 0; n < imageCount; n++) {
        imageId += 1;
        images.push(imageURL);
      };

      const data = `${id}|${title}|${category}|${bedCount}|${rating}|${reviewCount}|${price}|${zip}|"[${images}]"\n`;
      if (i % 500000 === 0) {
        console.log(`listings_countdown: ${i}, images: ${imageId}`);
      }
      if (i === 0) {
        console.log(`DONE! listings_countdown: ${id}, images: ${imageId}`);
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }

    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
};


//COMMENT OUT BELOW TO GENERATE CASSANDRA DATA

writeCassandraData(writeUsers, 'utf-8', () => {
  writeUsers.end();
});

