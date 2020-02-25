# Related-Homes
Related Home Information Component

# CRUD operations

READ: GET `/related-homes/` -- get all home listings
  req.body = none
  res = Array of 12 objects {home listings} (see next GET)

READ: GET `/related-homes/:listingId` -- get a specific home listing
  req.body = none
  res = 
  ```
  {
    id: integer,
    title: string,
    category: string,
    bedCount: integer,
    rating: decimal,
    reviewCount: integer,
    price: integer
  }
  ```

CREATE: POST `/related-homes/newListing` -- create a new home listing
  req.body = 
  ```
  {
    title: string,
    category: string,
    bedCount: integer,
    rating: decimal,
    reviewCount: integer,
    price: integer
  }
  ```
  res = status code

UPDATE: PATCH `/related-homes/:listingId` -- update a specific home listing
  req.body = 
  ```
  {
    ANY OF
    title: string,
    category: string,
    bedCount: integer,
    rating: decimal,
    reviewCount: integer,
    price: integer
  }
  ```
  res = status code

DELETE: DELETE `/related-homes/:listingId` -- delete a specific home listing
  req.body = 
  ```
  {
    listing_id
  }
  ```
  res = status code

-- FOR IMAGES --

READ: GET `/related-homes/:id/images/` -- get all images for a specific listing
  req.body = none
  res = Array of objects - all images related to that listing (see next GET)

READ: GET `/related-homes/:id/images/:imageId` -- get a specific image
  req.body = none
  res = 
  ```
  {
    id: integer,
    URL: string,
    listing_id: integer
  }
  ```

CREATE: POST `/related-homes/:id/images/newImage` -- create a new image
  req.body = 
  ```
  {
    URL: string,
    listing_id: integer
  }
  ```
  res = status code

UPDATE: PUT `/related-homes/:id/images/:imageId` -- replace a specific image
  req.body = 
  ```
  {
    id: integer,
    URL: string
  }
  ```
  res = status code

DELETE: DELETE `/related-homes/:id/images/:imageId` -- delete a specific image
  req.body = 
  ```
  {
    id
  }
  ```
  res = status code