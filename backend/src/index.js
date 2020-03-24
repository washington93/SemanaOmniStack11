const express = require('express')
const cors = require('cors');
const routes = require('./routes')

const app = express()

/** 
 * Tipos de parâmetros:
 *
 *  Query Params: Parâmetros nomeados e enviados na rota após "?" (Filtros, paginação)
 *  Route Params: Parâmetros ultilizados para identificar recursos.
 *  Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Se    rver
 * NoSQL: MongoDB, CouchDB, etc.
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */

app.use(cors());
app.use(express.json())
app.use(routes);
app.listen(3333)