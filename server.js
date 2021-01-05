if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
// const expressEjsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const booksRouter = require('./routes/books')
const app = express()

// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')

// app.use(expressEjsLayout)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongoose'))

app.use('/', indexRouter)
app.use('/books', booksRouter)

app.listen(process.env.PORT || 5000)