# Bunnie API

It's a NodeJS RestFul API for [Bunnie](github.com/berkspar/bunnie).

## Routes

### User
| URL        | HTTP Method | Description             |
|------------|-------------|-------------------------|
| /users     | GET         | Get all users           | 
| /users     | POST        | Create a new user       |
| /users/:id | GET         | Get an specific user    |
| /users/:id | PUT         | Update an specific user |
| /users/:id | DELETE      | Delete an specific user |

### Post
| URL        | HTTP Method | Description        | Query               |
|------------|-------------|--------------------|---------------------|
| /posts     | GET         | Get all posts      | ?user_id=[integer]; |
| /posts     | POST        | Create a new post  |                     |
| /posts/:id | GET         | Get info of a post |                     | 
| /posts/:id | PUT         | Update a post      |                     |
| /posts/:id | DELETE      | Delete a post      |                     |

**?user_id=[integer]** Get all posts of an user

### Comments
| URL                     | HTTP Method | Description                        |
|-------------------------|-------------|------------------------------------|
| /posts/:id/comments     | GET         | Get all comments of a post         |
| /posts/:id/comments     | POST        | Create a new comment inside a post |
| /posts/:id/comments/:id | GET         | Get an specific comment            |
| /posts/:id/comments/:id | PUT         | Update a comment                   |
| /posts/:id/comments/:id | DELETE      | Delete a comment                   |

### App
| URL   | HTTP Method | Description         |
|-------|-------------|---------------------|
| /info | GET         | Get info of the app |

### Anime
| URL          | HTTP Method | Description                  | Query                                                      |
|--------------|-------------|------------------------------|------------------------------------------------------------|
| /animes      | GET         | Get all of animes entry      | ?anime_id=[integer]; ?search=[String]; ?user_id=[integer]; |
| /animes      | POST        | Add an anime entry to a user |                                                            |
| /animes/:id  | PUT         | Update an anime entry        |                                                            |
| /animes/:id  | DELETE      | Delete an anime entry        |                                                            |
| /animes/list | GET         | Get an list of animes        |                                                            |

**?anime_id=[integer]** Search an specific anime <br>
**?search=[String]** Search a list of animes by a string <br>
**?user_id=[integer]** Get all entry of animes of an specific user

### Collection
| URL               | HTTP Method | Description                 | Query                                                          |
|-------------------|-------------|-----------------------------|----------------------------------------------------------------|
| /collections      | GET         | Get all collections         | ?collection_id=[integer]; ?search=[String]; ?user_id=[integer] |
| /collections      | POST        | Add an anime collection     |                                                                |
| /collections/:id  | PUT         | Update an anime collection  |                                                                |
| /collections/:id  | DELETE      | Delete an anime collection  |                                                                |
| /collections/list | GET         | Get an list of collections  |                                                                |

**?collection_id=[integer]** Search an specific collection <br>
**?search=[String]** Search a list of collection by a string <br>
**?user_id=[integer]** Search a list of collection of a specific user
