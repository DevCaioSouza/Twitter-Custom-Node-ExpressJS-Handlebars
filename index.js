import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import flash from 'express-flash'
import sessionFileStore from 'session-file-store'
import conn from './db/conn.js'
import path from 'node:path'
import os from 'node:os'

import Queries from './db/queries.js'

const FileStore = sessionFileStore(session)
const app = express()

// Models
import User from './models/User.js'
import Insight from './models/Insight.js'
// Import Routes
import insightsRoutes from './routes/insightsRoutes.js'
import authRoutes from './routes/authRoutes.js'
// Import Controller
import InsightController from './controllers/InsightController.js'
import AuthController from './controllers/AuthController.js'
//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
// Middleware of body parsing and JSON
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

// session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(os.tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now + 360000),
      httpOnly: true,
    },
  })
)

// flash messages middleware
app.use(flash())

// public path middleware
app.use(express.static('public'))

// set session to res middleware
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }

  next()
})

// remote calls
app.get('/', Queries.listAllInsights)
app.post('/create', Queries.postInsight)
app.post('/remove', Queries.deleteInsight)


//Routes middleware
// main routes
// app.use('/insights', insightsRoutes)
// app.get('/', InsightController.showInsights)

// auth routes
// app.use('/', authRoutes)
// app.get('/login', AuthController.login)
// app.get('/register', AuthController.register)

conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
