require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
   res.send('Boilerplate!')
 })
 app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.get('/journal', (req, res) => {

})

app.post('/register', (req, res) => {
  const {username, password, confirmPassword} = req.body
  if (username.length < 6 || username.length > 20) {
   return res
     .status(400)
     .send('Username must be between 6 and 20 characters');
 }

 if (password.length < 8 || password.length > 36) {
   return res
     .status(400)
     .send('Password must be between 8 and 36 characters');
 }

 if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
   return res
     .status(400)
     .send('Password must be contain at least one digit');
 }

 if (!password.match(confirmPassword)) {
   return res
     .status(400)
     .send('Passwords do not match')
 }
})

app.post('/login', (req, res) => {
  const {username, password} = req.body

})

app.post('api/journal', (req, res) => {
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