require('dotenv').config()

const express = require('express')
const app = express();
const bodyParser   = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const phonebookRouter = require('./routes/phonebooks')
app.use('/phonebooks', phonebookRouter)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



app.listen(process.env.PORT || 3000)