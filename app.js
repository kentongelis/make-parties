const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const models = require('./models')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

require('./controllers/events')(app, models)
require('./controllers/rsvps')(app, models)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})