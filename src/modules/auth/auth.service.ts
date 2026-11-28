import bcrypt from "bcryptjs";
import type { IUser } from "./auth.interface";
import { pool } from "../../db";

const createUserIntoDB = async (payload : IUser) => {
    const {name, email, password, role} = payload

    const hashPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(`
        INSERT INTO users (name, email, password, role) VALUES
        ($1, $2, $3, COALESCE($4, 'attendee')) RETURNING *
        `,[name, email, hashPassword, role ?? null]);

        delete result.rows[0].password

        return result
}

const loginUserIntoDB = async (payload : Pick<IUser, "email" | "password">) => {
    const {email, password} = payload;

    const result = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])

        const user = result.rows[0]

        if(!user) {
            throw Object.assign(new Error("Invalid email or password"), {
            status: 401
        })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
        throw Object.assign(new Error("Invalid email or password"), {
            status: 401
        })
    }

    delete user.password

    return user
}

const getUserFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM users
        `)
        return result
}

export const authServices = {
    createUserIntoDB,
    loginUserIntoDB,
    getUserFromDB
}