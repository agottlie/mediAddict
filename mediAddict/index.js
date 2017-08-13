const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const Auth = require('./services/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Auth.authenticate);

app.use(logger('dev'));

app.use('/users', require('./controllers/userController'));
app.use('/shows', require('./controllers/showsController'));
app.use('/episodes', require('./controllers/episodesController'));
app.use('/movies', require('./controllers/moviesController'));
app.use('/login', require('./controllers/sessionsController'));
app.use('/leaderboard', require('./controllers/leaderboardController'));
app.use('/comments', require('./controllers/commentsController'));


app.listen(PORT, () => console.log('Server listening on port', PORT));