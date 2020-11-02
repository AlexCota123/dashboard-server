import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {Sequelize} from 'sequelize'
import types from './src/type/'
import resolvers from './src/resolver/'
import {initModels} from './src/model/initModels'
import pg from 'pg'
const app = express()

// pg.defaults.ssl = true

const schema = makeExecutableSchema({
    typeDefs: types,
    resolvers: resolvers
})
const url = 'postgres://jmtzeumdkisxgn:573af8a310bf9219690c34c958b4eb1b33ce81fa3762d35f4aec77eeb76ac2ae@ec2-35-169-254-43.compute-1.amazonaws.com:5432/d257md2bl7lpgq'

const sequelize = new Sequelize(url, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

initModels(sequelize)

let initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('connected')
    } catch (error) {
        console.log('Error: ',error)
    }
} 
initDB()
app.use(bodyParser.json())
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send("Welcome, GraphQL API running at /graphql")
})

app.listen(process.env.PORT || 5000, () => {
    console.log('vivito y coleando en 5000')
})