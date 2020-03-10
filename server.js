const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const express = require('express')
const https = require('https');
const cors = require('cors')
const http = require('http');
require('dotenv').config()

const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const tunesRoute = require('./routes/tunesRoute')
tunesRoute(app);

//insert ssl certificates for https
const serverOptions = {}
const isDev = process.env.ENV === 'dev'

const server = isDev? http.createServer(app) :https.createServer(serverOptions, app)

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
