import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.listen(5000, () => {
    console.log('vivito y coleando en 5000')
})