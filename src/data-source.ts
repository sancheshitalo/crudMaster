import { DataSource } from "typeorm";
import { Cliente } from "./cliente/entity/cliente.entity";
import { Endereco } from "./endereco/entity/endereco.entity";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 63309,
    username: 'root',
    password: 'root',
    database: 'core',
    synchronize: true,
    logging: true,
    entities: [Cliente, Endereco],
    subscribers: [],
    migrations: []
})

AppDataSource.initialize()
    .then(() => console.log('Database is running...'))
    .catch(error => console.log('Error to initialize'))