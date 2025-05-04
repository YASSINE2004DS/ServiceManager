import { Sequelize } from 'sequelize'; // to connect to the database

import dotenv from 'dotenv'; // to load the environment variables
dotenv.config(); // load the environment variables

// Connect to the database using the environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
                            {
                                host: process.env.DB_HOST,
                                port: process.env.DB_PORT,
                                dialect: 'mysql',
                            }
);

export default sequelize;