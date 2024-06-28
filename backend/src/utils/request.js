const { logger } = require('./logger');
const { fetch } = require('node-fetch');

const request = (url, options) => {
 return fetch(url, options)
  .then(response => response.json())
  .catch(error => logger.error('Request failed:', error.message))
}

module.exports = { request };