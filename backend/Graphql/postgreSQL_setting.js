const {Pool} = require('pg');

const CLOUD_POSTGRESQL_URL="postgresql://postgres.csutzncxyvmaoeujpols:cdsdweeecdsd1332@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
const CLOUD_POSTGRES_HOST="aws-0-ap-southeast-1.pooler.supabase.com"
const CLOUD_POSTGRES_PORT=6543
const CLOUD_POSTGRES_USER="postgres.csutzncxyvmaoeujpols"
const CLOUD_POSTGRES_PASSWORD="cdsdweeecdsd1332"
const CLOUD_POSTGRES_DATABASE="postgres"

const NEW_POSTGRES_PASSWORD = "JS@imxHVTn2tP#s"


const CLOUD_POSTGRES = new Pool({
  connectionString:CLOUD_POSTGRESQL_URL,
  log:(msg)=>console.log(msg)
})


module.exports={
    CLOUD_POSTGRES,
    CLOUD_POSTGRESQL_URL,
    CLOUD_POSTGRES_HOST,
    CLOUD_POSTGRES_PORT,
    CLOUD_POSTGRES_USER,
    CLOUD_POSTGRES_PASSWORD,
    CLOUD_POSTGRES_DATABASE
}
