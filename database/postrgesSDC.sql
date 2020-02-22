DROP DATABASE IF EXISTS airbnbsdc;

CREATE DATABASE airbnbsdc;

\c airbnbsdc;

CREATE TABLE listings
(
  id serial NOT NULL PRIMARY KEY,
  title varchar(255),
  category varchar(255),
  bedCount smallint,
  rating numeric(3,2),
  reviewCount smallint,
  price smallint,
  zip int
);

CREATE TABLE photos
(
  id serial NOT NULL PRIMARY KEY,
  photoURL character varying (255),
  listingId int
);

COPY listings(id,title,category,bedCount,rating,reviewCount,price,
zip) 
FROM '/Users/zacksingh/HR/SDC/Related-Homes/database/data/listingData.csv' DELIMITER ',' CSV HEADER;

COPY photos(id,photoURL,listingId) 
FROM '/Users/zacksingh/HR/SDC/Related-Homes/database/data/photoData.csv' DELIMITER ',' CSV HEADER;
