const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 2000
const cors = require('cors') 

app.use(bodyParser())
app.use(cors())

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome to susilo store</h1>')
})

const { productsRouter } = require('./router')
app.use('/product', productsRouter)

app.listen(port, () => console.log(`API ACTIVE AT PORT ${port}`))