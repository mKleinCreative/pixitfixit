const express = require('express');
const app = express();
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 30 } // 30 minutes
  })
);

// Logging middleware
app.use((req, res, next) => {
    const now = new Date().toUTCString();
    const method = req.method;
    const route = req.originalUrl;
    const isAuthenticated = req.session.username ? 'Authenticated User' : 'Non-Authenticated User';
    console.log(`[${now}] ${method} ${route} (${isAuthenticated})`);
    next();
  });
  
  

// Authentication middleware
const authMiddleware = (req, res, next) => {
  if (!req.session.username) {
    res.status(403).render('forbiddenAccess', { title: 'Forbidden Access' });
  } else {
    next();
  }
};

// Use authentication middleware for the /protected route
app.use('/forbiddenAccess', authMiddleware);

configRoutes(app);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});