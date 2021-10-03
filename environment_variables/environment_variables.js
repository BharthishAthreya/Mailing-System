const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/.env` });
console.log(process.env.SG_KEY);

module.exports = {
  SG_KEY: process.env.SG_KEY,
  PORT: process.env.PORT,
};
