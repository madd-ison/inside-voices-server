const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const JournalsService = require('./journals-service')
const {requireAuth} = require('../auth/auth')

const journalsRouter = express.Router()
const bodyParser = express.json()

const serializeJournal = journal => ({
    id: journal.id,
    title: journal.title,
    content: xss(journal.content),
    author_id: journal.author_id
})

journalsRouter
    .route('/api/journal')
    // .all(requireAuth)
    .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    JournalsService.getAllJournals(knexInstance)
      .then(journals => res.json(journals.map(serializeJournal)))
      .catch(next)
  })

module.exports = journalsRouter