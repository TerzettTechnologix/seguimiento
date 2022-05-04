import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: 'localhost',
  port: '3306',
  user: 'diego',
  password: 'Psisukvilk97$',
  database: 'proyectos'
})
export { pool }
