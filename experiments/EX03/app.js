const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const token = require('./middleware/token')
const permissions = require('./middleware/permissions')
const serverless = require('serverless-http')

var jwt = require('jsonwebtoken');
require('dotenv').config();

const users = require('./users.json')

const app = express()
const secret = process.env.JWT_SECRET

// app.listen(3000)
app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())
app.use(token)
app.use(permissions)

app.get('/', (_, res) => {
    res.json({
        message: 'Hello World'
    })
})

app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body

    const user = users.find(x => x.username === username && x.password === password)

    if (user) {
        const token = jwt.sign({
                sub: user.id,
                name: user.username,
                exp: Date.now() + 60 * 60 * 1000,
                permissions: user.permissions
            },
            secret
        )

        res.json({
            token
        })
        return
    }

    res.status(401).json({
        message: 'Invalid credentials'
    })

})

app.post('/private', (req, res) => {
    return res.json({
        message: 'stuff written'
    })
})

app.get('/private', (req, res) => {
    res.json({
        message: 'Stuff read'
    })
})

console.log('Server on port 3000')

module.exports.handler = serverless(app)