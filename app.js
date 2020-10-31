import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'

const app = express()

let schema = buildSchema(`
    type Query {
        hello: String
    }
`)

let root = {
    hello: () => {
        return "Hello world"
    }
}



app.use(bodyParser.json())
app.use(cors())
app.use('graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send("Welcome, GraphQL API running at /graphql")
})

app.listen(process.env.PORT || 5000, () => {
    console.log('vivito y coleando en 5000')
})