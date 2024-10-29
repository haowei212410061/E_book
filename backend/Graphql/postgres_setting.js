const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.CLOUD_POSTGRES_HOST,
  port: process.env.CLOUD_POSTGRES_PORT,
  user: process.env.CLOUD_POSTGRES_USER,
  password: process.env.CLOUD_POSTGRES_PASSWORD,
  database: process.env.CLOUD_POSTGRES_DATABASE,
})
