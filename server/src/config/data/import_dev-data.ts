import "reflect-metadata";

// file
import { readFileSync } from 'fs';

import path from "path";

// Sequelize
import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from '@sequelize/postgres';

// Models
import { BookModel, BookGenreModel, UserModel, GenreModel } from "@infrastructure/models/index";

// import BookModel from "../../infrastructure/models/BookModel";
// import BookGenreModel from "../../infrastructure/models/BookGenreModel"
// import UserModel from "../../infrastructure/models/UserModel"
// import GenreModel from "../../infrastructure/models/GenreModel"


// Read JSON FILE
const books = JSON.parse(
    readFileSync(path.join('/app/src/config/json', 'books.json'), 'utf-8')
)

const genres = JSON.parse(
    readFileSync(path.join('/app/src/config/json', 'genres.json'), 'utf-8')
)

const bookGenres = JSON.parse(
    readFileSync(path.join('/app/src/config/json', 'bookGenres.json'), 'utf-8')
)

const users = JSON.parse(
    readFileSync(path.join('/app/src/config/json', 'users.json'), 'utf-8')
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
        models: [BookGenreModel, GenreModel, BookModel, UserModel]
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
        let results = []

        init();

        const promises = [
            BookModel.bulkCreate(books),
            GenreModel.bulkCreate(genres),
            BookGenreModel.bulkCreate(bookGenres),
            UserModel.bulkCreate(users),
        ];

        for (const model of promises) {
            results.push(await model)
        }

        console.log(results)
        
    } catch (err) {
        console.log(err);
    }
}

// Delete All Data
const destroyData = async () => {
    try {
        init();
        // const result = await BookModel.truncate();
        // const result = await GenreModel.truncate();
        // console.log(result)
    } catch (err) {
        console.log(err);
    }
}


if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--destroy') {
    destroyData();
}