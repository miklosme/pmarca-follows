require('dotenv').config()

const { handler } = require('./fetch-follows.js');

console.log(handler({}));
console.log(process.env.FOO);