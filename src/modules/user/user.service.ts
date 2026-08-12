import pool from "../../config/db.js"
import type { IUser } from "./user.interface.js";
import bcrypt from "bcryptjs"


const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password,age,role } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
        INSERT INTO users(name,email,password,age,role)
        VALUES($1,$2,$3,$4,COALESCE($5,'user'))
        RETURNING *
        `, [name, email, hashedPassword,age,role]);
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
    const { name, email, password,age } = payload;

    const result = await pool.query(`
        UPDATE users
        SET
        name = COALESCE($1,name),
        email = COALESCE($2,email),
        password = COALESCE($3,password),
        age = COALESCE($4,age),
        updated_at = Now()
        WHERE id = $5
        RETURNING *
        `, [name, email, password,age, id]);
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