import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from '@sequelize/postgres';

//Models
import {
    UserModel,
    BookModel,
    OrderModel,
    OrderItemsModel,
    GenreModel,
    BookGenreModel
} from "@infrastructure/models/index";

import Local from "@shared/Local";

class Database {

    public static async init(): Promise<void> {
        const postgresUrl = Local.config().postgresUrl

        const sequelize = new Sequelize({
            dialect: PostgresDialect,
            database: 'book_shop',
            user: 'postgres',
            password: '12345678',
            host: 'postgresdb',
            port: 5432,
            clientMinMessages: 'notice',
            schema: 'public',
            models: [UserModel, BookModel, OrderModel, OrderItemsModel, GenreModel, BookGenreModel]
        })

        try {
            await sequelize.authenticate();
            await sequelize.sync()
            console.log(`Postgres :: Running @ ${postgresUrl}`)
        } catch (error) {
            console.log(error)
        }
    }

}

export default Database;