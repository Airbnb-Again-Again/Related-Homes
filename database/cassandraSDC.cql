DROP KEYSPACE IF EXISTS airbnbsdc;

CREATE KEYSPACE airbnbsdc WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

USE airbnbsdc;

CREATE TABLE listings
(
  id bigint,
  title varchar,
  category varchar,
  bedCount smallint,
  rating float,
  reviewCount smallint,
  price smallint,
  zip int,
  photos list<varchar>,
  PRIMARY KEY ((zip), rating)
);

COPY airbnbsdc.listings (id,title,category,bedCount,rating,reviewCount,price,zip,photos) 
FROM '/Users/zacksingh/HR/SDC/Related-Homes/database/data/cassandraData.csv' WITH DELIMITER='|' AND HEADER=TRUE;