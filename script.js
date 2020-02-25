import http from 'k6/http';
import { sleep } from 'k6';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // maximum is exclusive/minimum is inclusive
};

const generateZip = () => {
  let zip = getRandomInt(10000,99999)
  return zip;
}

export let options = {
  vus: 1000,
  duration: '60s',
};

//uncomment below for GET test

// export default function() {
//   let zip = generateZip();
//   http.get(`http://localhost:4321/related-homes/getHomes?zip=${zip}`);
//   sleep(1);
// }

//uncomment below for POST test

export default function() {
  let zip = generateZip();
  http.post(`http://localhost:4321/related-homes/newListing`);
  sleep(1);
}