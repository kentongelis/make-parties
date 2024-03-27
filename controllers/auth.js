const jwt = require('jsonwebtoken');

function generateJWT(user) {
    const mpJWT = jwt.sign({ id:user.id }, "AUTH-SECRET", { expiresIn: 60*60*24*60 });

    return mpJWT
}


module.exports = (app, models) => {

    // SIGN UP
    app.get('/signup', (req, res) => {
        res.render('signup', {});
    })
    
    // CREATE ACCOUNT
    app.post('/signup', (req, res) => {
        models.User.create(req.body).then(user => {
            const mpJWT = generateJWT(user);
            res.cookie("mpJWT", mpJWT)
            res.redirect(`/`)
        })
    })

    // LOGIN
    app.get('/login', (req, res) => {
        res.render('login')
    });

    // LOGIN ACCOUNT
    app.post('/login', (req, res, next) => {
        models.User.findOne({ where: { username: req.body.username }}).then(user => {
            user.comparePassword(req.body.password, function (err, isMatch) {
                console.log(isMatch)
                if (!isMatch) {
                    return res.redirect('/login')
                }
                const mpJWT = generateJWT(user);
                res.cookie("mpJWT", mpJWT)
                res.redirect('/')
            });
        });
    });

    // LOGOUT
    app.get('/logout', (req, res, next) => {
        res.clearCookie('mpJWT');
        return res.redirect('/')
    })
};