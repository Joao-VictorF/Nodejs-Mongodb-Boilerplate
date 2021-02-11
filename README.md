
# API Boilerplate - Node.js + Express + Mongoose

## Modify this Boilerplate

- Edit the .env file

## How To?

Start the server

```
npm run start:dev
```  

Commit a change with commitizen

```
npm run commit
```

### Package list

| Package                    | Description                                                                                                                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bcrypt](https://www.npmjs.com/package/bcrypt)                     | Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.                                                                                 |
| [cors](https://www.npmjs.com/package/cors)                       | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.                                                                                              |
| [crypto-random-string](https://www.npmjs.com/package/crypto-random-string)       | Generate a cryptographically strong random string                                                                                                                                                                       |
| [dotenv](https://www.npmjs.com/package/dotenv)                     | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.       |
| [email-templates](https://www.npmjs.com/package/email-templates)            | Create, preview, and send custom email templates for Node.js. Highly configurable and supports automatic inline CSS, stylesheets, embedded images and fonts, and much more! Made for sending beautiful emails with Lad. |
| [express](https://www.npmjs.com/package/express)                    | Fast, unopinionated, minimalist web framework for node.                                                                                                                                                                 |
| [body-parser](https://www.npmjs.com/package/body-parser)                    | Parse incoming request bodies in a middleware before your handlers, available under the req.body property.                                                                                                                                                                 |
| [mongoose](https://www.npmjs.com/package/mongoose)                    | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.                                                                                                                                                                  |
| [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)                    | mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.                                                                                                                                                                  |
| [http-status-codes](https://www.npmjs.com/package/http-status-codes)          | Constants enumerating the HTTP status codes.                                                                                                                                                                            |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)               | This was developed against draft-ietf-oauth-json-web-token-08. It makes use of node-jws                                                                                                                                 |
| [module-alias](https://www.npmjs.com/package/module-alias)               | Create aliases of directories and register custom module paths in NodeJS like a boss!                                                                                                                                   |
| [moment](https://www.npmjs.com/package/moment)                     | A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.                                                                                                                      |
| [validator](https://www.npmjs.com/package/validator)                  | A library of string validators and sanitizers.                                                                                                                                                                          |
| [winston](https://www.npmjs.com/package/winston)                    | A logger for just about everything.                                                                                                                                                                                     |
| [morgan](https://www.npmjs.com/package/morgan)  | HTTP request logger middleware for node.js
                                                                                             |

## Features

- Database management with Mongoose

- No callback hell. All promise based

- Logs with levels in separated files

- Modules paths with Aliases. No more "require('../../../../some/very/deep/module')"

  
  

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
