const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const JournalsService = require('./journals-service')

const journalsRouter = express.Router()
const bodyParser = express.json()

const serializeJournal = journal => ({
    id: journal.id,
    title: journal.title,
    content: xss(journal.content),
    author_id: journal.author_id
})

journalsRouter
    .route('/')
    // .all(requireAuth)
    .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    JournalsService.getAllJournals(knexInstance)
      .then(journals => res.json(journals.map(serializeJournal)))
      .catch(next)
  })
    .post(bodyParser, (req, res, next) => {
      for (const field of ['content']) {
        if (!req.body[field]) {
          logger.error(`${field} is missing`)
          return res.status(400).json({error: {message: `${field} is missing`}})
        }
      }
      const newJournal = {
        content: xss(req.body.content)
      }
      JournalsService.addJournal(req.app.get('db'), newJournal)
        .then(journal => {
          console.log(journal)
          logger.info(`journal with id ${journal.id} created`)
          res
            .status(201)
            .location(`/api/journal/${journal.id}`)
            .json(journal)
        })
        .catch(next)
    })

    journalsRouter
      .route('/:id')
      .all((req, res, next) => {
        const {id} = req.params
        JournalsService.getJournalById(req.app.get('db'), id)
          .then(journal => {
            if (!journal) {
              logger.error(`Journal ${id} not found`)
              return res 
                .status(404)
                .json({error: {message: 'Journal not found'}})
            }
            res.journal = journal
            next()
          })
          .catch(next)
      })
      .get((req, res, next) => {
        const journal = res.journal
        res.json(serializeJournal(journal))
      })
      .delete((req, res, next) => {
        const {id} = req.params
        JournalsService.deleteJournal(req.app.get('db'), id)
        .then(() => {
          logger.info(`journal ${id} deleted`)
          res.status(204).end()
        })
        .catch(next)
      })
      .patch(bodyParser, (req, res, next) => {
        const journalUpdate = req.body
        JournalsService.updateJournal(req.app.get('db'), res.journal.id, journalUpdate)
          .then(updated => {
            logger.info(`journal updated`)
            res.status(204).end()
          })
      })

module.exports = journalsRouter