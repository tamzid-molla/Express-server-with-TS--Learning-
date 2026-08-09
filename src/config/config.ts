import dotenv from 'dotenv'
import path from 'node:path'
dotenv.config({ path: path.join(process.cwd(), '.env') });

interface Config{
    ConnectionString: string | undefined,
    port: number,
    jwt_secret : string | undefined,
}

const config : Config = {
    ConnectionString: process.env.ConnectionString,
    port: Number(process.env.port) || 5001,
    jwt_secret : process.env.JWT_SECRET
}

export default config