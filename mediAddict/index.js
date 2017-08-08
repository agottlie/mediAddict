const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(cors());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./controllers/index'));
app.use('/users', require('./controllers/userController'));
app.use('/shows', require('./controllers/showsController'));
app.use('/episodes', require('./controllers/episodesController'));

app.use(cookieParser());

app.listen(PORT, () => console.log('Server listening on port', PORT));