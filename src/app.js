require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
   res.send('Boilerplate!')
 })
app.get('/api/*', (req, res) => {
   res.json({ok: true});
 });

app.get('/api/journal', (req, res) => {

})

app.post('/api/journal', (req, res) => {
 const {content} = req.body
 if (!content) {
   return res
     .status(400)
     .send('Cannot submit blank entry');
 }
})

app.delete('api/journal/:journalId', (req, res) => {
 const {journalId} = req.params
 res.send(`Journal ${journalId} deleted.`);
});


app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
       }
    res.status(500).json(response)
})

module.exports = app