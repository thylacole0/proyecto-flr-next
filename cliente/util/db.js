import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'bd_fundacion'
});

export default pool;