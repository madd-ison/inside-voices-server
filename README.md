# INSIDE VOICES API

**Get Journal Posts**
----
  Returns json data for entire journal history.

* **URL**

  /api/journal

* **Method:**

  `GET`

* **Data Params**

  Requires Auth - User Id, Bearer Token

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, "title" : "2020-10-12", "content": "my journal post", "author_id": 1 }`
 
* **Error Response:**

  * **Code:** 401 Unauthorized<br />
    **Content:** `{ error : "Missing bearer token" }`

* **Sample Call:**

  ```javascript
    var settings = {
  "url": "/api/journal",

  "method": "GET",

  "headers": {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
    },
  };

  $.ajax(settings).done(function (response) {
  console.log(response);
  });


**Get Journal By Id**
----
  Returns json data for a specific journal post.

* **URL**

  /api/journal/:id

* **Method:**

  `GET`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  Requires Auth - User Id, Bearer Token

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, "title" : "2020-10-12", "content": "my journal post", "author_id": 1 }`
 
* **Error Response:**

  * **Code:** 401 Unauthorized<br />
    **Content:** `{ error : "Missing bearer token" }`
  * **Code:** 404 Not Found<br />
    **Content:** `{ error : "Journal not found" }`

* **Sample Call:**

  ```javascript
    var settings = {
  "url": "/api/journal/:id",

  "method": "GET",

  "headers": {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
  },}; 
  $.ajax(settings).done(function (response) {
  console.log(response);});


**Post A Journal Entry**
----
  Creates a new post with a new id.

* **URL**

  /api/journal

* **Method:**

  `POST`


* **Data Params**

  - Requires Auth - User Id, Bearer Token
  - Content - res.body

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ id : 1, "title" : "2020-10-12", "content": "my journal post", "author_id": 1 }`
 
* **Error Response:**

  * **Code:** 401 Unauthorized<br />
    **Content:** `{ error : "Missing bearer token" }`
  * **Code:** 400 Bad Request<br />
    **Content:** `{ error : "Content is missing" }`

* **Sample Call:**

  ```javascript
   var settings = {
  "url": "/api/journal",

  "method": "POST",

  "headers": {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({"content":"test"}),
  };

  $.ajax(settings).done(function (response) {
  console.log(response);});

  ```

**Delete A Journal Entry**
----
  Deletes a journal post with a specific id.

* **URL**

  /api/journal/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  - Requires Auth - User Id, Bearer Token

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 1, "title" : "2020-10-12", "content": "my journal post", "author_id": 1 }`
 
* **Error Response:**

  * **Code:** 401 Unauthorized<br />
    **Content:** `{ error : "Missing bearer token" }`
  * **Code:** 404<br />
    **Content:** `{ error : "Journal not found" }`

* **Sample Call:**

  ```javascript
   var settings = {
  "url": "/api/journal/:id",

  "method": "DELETE",

  "headers": {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
  },

  $.ajax(settings).done(function (response) {
  console.log(response);});

  ```

## Client Repo:
* [github/maddi-ison](https://github.com/madd-ison/inside-voices-client)

## Live App:

* [INSIDE VOICES](https://inside-voices-client.vercel.app/)

### Demo Credentials:
* username: username1
* password: Password1!