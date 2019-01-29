const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./route/route.js');

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();

routes(router);
app.use('/', router);

app.listen(port, () => console.log('running on ' + port));