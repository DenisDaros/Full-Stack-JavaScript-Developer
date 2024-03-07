const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

const productRouter = require('./src/routes/product.router');
const loginRouter = require('./src/routes/login.router');

app.use(bodyParser.json());
app.use(cors());
app.use(loginRouter);
app.use(productRouter);

app.listen(process.env.PORT, () => console.log('server running on port 3001'));