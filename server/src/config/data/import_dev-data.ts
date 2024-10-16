import "reflect-metadata";

// file
import { readFileSync } from 'fs';

// Sequelize
import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from '@sequelize/postgres';

// Models
import BookModel from '../../infrastructure/models/BookModel';
// import UserModel from "../../infrastructure/models/UserModel"

// Read JSON FILE
const books = JSON.parse(
    readFileSync(`${__dirname}/books.json`, 'utf-8')
)

// Database Connect
async function init() {

    const sequelize = new Sequelize({
        dialect: PostgresDialect,
        database: 'book_shop',
        user: 'charut',
        password: 'Charutwbi@2001',
        host: 'postgresdb',
        port: 5432,
        clientMinMessages: 'notice',
        schema: 'public',
        models: [BookModel]
    })

    try {
        await sequelize.authenticate();
        await sequelize.sync()
        console.log("Connect to Postgres successful!")
    } catch (error) {
        console.log(error)
    }
}

// Import Data
const importData = async () => {
    try {
        init();
        const result = await BookModel.bulkCreate(books);
        console.log(result)
    } catch (err) {
        console.log(err);
    }
}

// Delete All Data
const destroyData = async () => {
    try {
        init();
        const result = await BookModel.truncate();
        console.log(result)
    } catch (err) {
        console.log(err);
    }
}


if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--destroy') {
    destroyData();
}