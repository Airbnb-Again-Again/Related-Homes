const fs = require('fs');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const faker = require('faker');

const LISTING_COUNT = 10000000;
const IMAGE_COUNT_MAX = 15;

const listingWriter = createCsvWriter({
  header: ['id', 'title', 'category', 'bedCount', 'rating', 'reviewCount', 'price'],
  path: '/Users/zacksingh/HR/SDC/Related-Homes/database/data/listingData.csv'
});

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

let listings = [];

for (let i = 0; i < LISTING_COUNT; i++) {
  let id = i;
  let title = faker.fake('{{commerce.productAdjective}} {{company.catchPhraseDescriptor}} Home!');
  let category = getRandomCategory();
  let bedCount = getRandomInt(1, 11);
  let rating = getRandomRating();
  let reviewCount = getRandomInt(0, 501);
  let price = (getRandomInt(40, 301));
  let entry = [id, title, category, bedCount, rating, reviewCount, price];
  listings.push(entry);
}

listingWriter.writeRecords(listings)
  .then(() => {
    console.log('...Done');
  })
  .catch(() => {
    console.log('Error');
  });