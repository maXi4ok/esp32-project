const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Log = require('./Log');
const logRouter = require('./logRouter')
require('dotenv').config();


const app = express();

app.use(cors({
	origin: ['https://esp32-project-omega.vercel.app/', 'https://esp32-project-maxi4oks-projects.vercel.app']
}));

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
	.then(() => {console.log('connected to db')})
	.catch((e) => {console.error(e)});

app.use('/', logRouter);

app.listen(3000);
