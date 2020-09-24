require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')
const JournalsService = require('./journals/journals-service')

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

 app.get('/api/journal', (req, res, next) => {
  const knexInstance = req.app.get('db')
  JournalsService.getAllJournals(knexInstance)
    .then(journals => {
      res.json(journals)
    })
    .catch(next)
})

// app.post('/api/users', (req, res) => {

// })

// app.get('/api/journal', (req, res) => {
//   res.send('journals')
// })

// app.get('/api/journal/:journalId', (req, res) => {

// })

// app.post('/api/journal', (req, res) => {

// })

// app.delete('/api/journal/:journalId', (req, res) => {

// })

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