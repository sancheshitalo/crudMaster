const express = require('express');
import "reflect-metadata"
import routes from './routes'

const app = express()
const port = 3000;

//MIDDLEWARE
app.use(express.json());

// ROUTES
app.use(routes)

//START SERVER
app.listen(port, () => {
    console.log('Servidor online na porta 3000.')
});