const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const models = require('./models')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(function authenticateToken(req, res, next) {
    const token = req.cookies.mpJWT;

    if (token) {
        jwt.verify(token, "AUTH-SECRET", (err, user) => {
            if (err) {
                console.log(err)
                res.redirect('/login')
            }
            req.user = user
            next();
        })
    } else {
        next()
    }
});

app.use((req, res, next) => {
  // if a valid JWT token is present
  if (req.user) {
    // Look up the user's record
    models.User.findByPk(req.user.id).then(currentUser => {
      // make the user object available in all controllers and templates
      res.locals.currentUser = currentUser;
      next()
    }).catch(err => {
      console.log(err)
    })
  } else {    
    next();
  }
});

require('./controllers/events')(app, models)
require('./controllers/rsvps')(app, models)
require('./controllers/auth')(app, models)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})