const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const port = 8000
const handler = require('./lib/handlers')
const session = require('express-session')
//const passport = require('./config/passport')

app.engine('hbs', handlebars({
    defaultLayout:'basic',
    extname:'hbs',
    layoutsDir: __dirname+'/views/layouts/',
    partialsDir: __dirname+'/views/partials/',
    helpers:{
        section:(name, option)=>{
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))
/*
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=>{
    res.locals.isAu
})
*/

app.set('view engine', 'hbs')

app.get('/',(req, res) => res.send('hello'))
app.get('/login',handler.login)
app.listen(port, ()=> {
    console.log(`localhost:${port} opened!`)
})