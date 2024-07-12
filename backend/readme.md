# Backend

## Description
Backend service for the application.

## Version
1.0.0

## Author
SEANGLAY

## License
ISC

## Main File
`index.js`

## Scripts

- **test**: `echo "Error: no test specified" && exit 1`
- **start**: `nodemon`
- **migrate:make**: `knex --knexfile src/db/knexfile.js migrate:make`
- **migrate:latest**: `knex --knexfile src/db/knexfile.js migrate:latest`
- **migrate:rollback**: `knex --knexfile src/db/knexfile.js migrate:rollback`
- **seed:make**: `knex --knexfile src/db/knexfile.js seed:make`
- **seed:run**: `knex --knexfile src/db/knexfile.js seed:run`
- **swagger**: `node ./swagger.js`

## Dependencies

- **@faker-js/faker**: ^8.4.1
- **and**: ^0.0.3
- **dotenv**: ^16.4.5
- **express**: ^4.19.2
- **express-validator**: ^7.1.0
- **jsonwebtoken**: ^9.0.2
- **knex**: ^3.1.0
- **luxon**: ^3.4.4
- **mysql2**: ^3.10.1
- **node-fetch**: ^3.3.2
- **nodemon**: ^3.1.4
- **pino**: ^9.2.0
- **pino-pretty**: ^11.2.1
- **swagger-autogen**: ^2.23.7
- **swagger-ui-express**: ^5.0.1

## Usage

### Start the Server
```bash
npm start
