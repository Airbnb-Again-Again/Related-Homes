DROP KEYSPACE IF EXISTS airbnbsdc;

CREATE KEYSPACE airbnbsdc WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

USE airbnbsdc;

CREATE TABLE listings
(
  id UUID,
  title varchar,
  category varchar,
  bedCount smallint,
  rating float,
  reviewCount smallint,
  price smallint,
  zip int,
  images list<varchar>,
  PRIMARY KEY (zip, rating, id)
) WITH CLUSTERING ORDER BY (rating DESC);

COPY airbnbsdc.listings (id,title,category,bedCount,rating,reviewCount,price,zip,images) 
FROM '/Users/zacksingh/HR/SDC/Related-Homes/database/data/CassandraData_revID.csv' WITH DELIMITER='|' AND HEADER=TRUE;