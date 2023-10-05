const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

// Models
const Insight = require('./models/insight');
const User = require('./models/User');

// Import Routes
const insightsRoutes = require('./routes/insightsRoutes');
const authRoutes = require('./routes/authRoutes');

// Import Controller
const InsightController = require('./controllers/InsightController');
const AuthController = require('./controllers/AuthController');

//template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware of body parsing and JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// session middleware

app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now + 360000),
      httpOnly: true,
    },
  })
);

// flash messages middleware
app.use(flash());

// public path middleware
app.use(express.static('public'));

// set session to res middleware
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

//Routes middleware
// main routes
app.use('/insights', insightsRoutes);
app.get('/', InsightController.showInsights);

// auth routes
app.use('/', authRoutes);
app.get('/login', AuthController.login);
app.get('/register', AuthController.register);

conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
