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

// NEW
app.get('/events/new', (req, res) => {
    res.render('events-new', {})
})

// CREATE
app.post('/events', (req, res) => {
    models.Event.create(req.body).then(event => {
        res.redirect(`/events/${event.id}`);
    }).catch((err) => {
        console.log(err)
    });
})

// SHOW
app.get('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then((event) => {
        res.render('events-show', { event: event })
    }).catch((err) => {
        console.log(err.message);
    })
})

// EDIT
app.get('/events/:id/edit', (req, res) => {
    models.Event.findByPk(req.params.id).then((event) => {
        res.render('events-edit', { event: event });
    }).catch((err) => {
        console.log(err.message);
    })
});

// UPDATE
app.put('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
        event.update(req.body).then(event => {
            res.redirect(`/events/${req.params.id}`);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
});

// DELETE
app.delete('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
      event.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})