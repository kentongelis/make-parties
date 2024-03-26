const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port 3000!')
})