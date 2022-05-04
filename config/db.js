import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'bec17a835af8a2',
  password: 'fadb7b96',
  database: 'heroku_56b8a0b54873098'
})
export { pool }
