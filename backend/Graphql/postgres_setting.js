const {Pool} = require('pg');

const CLOUD_POSTGRES = new Pool({
  connectionString:process.env.CLOUD_POSTGRES_URL
})

module.exports = {
  CLOUD_POSTGRES
}

