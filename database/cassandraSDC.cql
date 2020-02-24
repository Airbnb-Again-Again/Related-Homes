DROP KEYSPACE IF EXISTS airbnbsdc_test;

CREATE KEYSPACE airbnbsdc_test WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

USE airbnbsdc_test;

CREATE TABLE listings_test
(
  id UUID,
  title varchar,
  category varchar,
  bedCount smallint,
  rating float,
  reviewCount smallint,
  price smallint,
  zip int,
  photos list<varchar>,
  PRIMARY KEY (zip, rating, id)
) WITH CLUSTERING ORDER BY (rating DESC);

COPY airbnbsdc_test.listings_test (id,title,category,bedCount,rating,reviewCount,price,zip,photos) 
FROM '/Users/zacksingh/HR/SDC/Related-Homes/database/data/miniCassandraData.csv' WITH DELIMITER='|' AND HEADER=TRUE;