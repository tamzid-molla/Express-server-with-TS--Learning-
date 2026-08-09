import pool from "../../config/db.js"
import type { IUser } from "./user.interface.js";
import bcrypt from "bcryptjs"


const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
        INSERT INTO users(name,email,password)
        VALUES($1,$2,$3)
        RETURNING *
        `, [name, email, hashedPassword]);
    delete result.rows[0].password
    return result.rows[0]
};

const getAllUserFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM users
        `);
    return result.rows
};

//Get single user
const getSingleUserFromDb = async (id: string) => {
    const result = await pool.query(`
        SELECT * FROM users
        WHERE id = $1
        `, [id]);
    return result.rows
};

//update user
const updateUserToDB = async (id: string, payload: IUser) => {
    const { name, email, password } = payload;

    const result = await pool.query(`
        UPDATE users
        SET
        name = COALESCE($1,name),
        email = COALESCE($2,email),
        password = COALESCE($3,password),
        updated_at = Now()
        WHERE id = $4
        RETURNING *
        `, [name, email, password, id]);
    return result.rows
};

const deleteUserFromDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM users
        WHERE id = $1
        `, [id]);
    return result
}

export const userService = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDb,
    updateUserToDB,
    deleteUserFromDB
}