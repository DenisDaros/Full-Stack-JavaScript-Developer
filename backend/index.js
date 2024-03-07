const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())


const loginRouter = require('./src/routes/login.router');

app.use(loginRouter)

app.listen(3001, () => console.log("Server is running on port 3001"))