import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connection_string
})

export const initDB = async () => {
    try {
        
await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'attendee'
            CHECK (role IN ('attendee', 'organizer')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
    `);
        console.log("Neon DB Connected Successfully");
    
    } catch (error) {
        throw error
    }
}