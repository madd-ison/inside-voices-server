const JournalsService = require('../src/journals/journals-service')
const helpers = require('./test-helpers')
const knex = require('knex')
const app = require('../src/app')
const { expect } = require('chai')

describe(`Journals service object`, function() {
    let db
    let {testUsers, testJournals} = helpers.makeJournalsFixtures()
    before(() => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
      })

    before('cleanup', () => helpers.cleanTables(db))
    
    afterEach('cleanup', () => helpers.cleanTables(db))
    before(() => db('journals', 'users').truncate())
    
    after(() => db.destroy())

    context(`Given 'journals' has data`, () => {
        beforeEach(() => {
            return db
                .into('users')
                .insert(testUsers)
          })
    
        beforeEach(() => {
            return db
                .into('journals')
                .insert(testJournals)
      })
      it(`getAllJournals() resolves all journals from 'journals' table`, () => {
        // test that JournalsService.getAllJournals gets data from table
       return JournalsService.getAllJournals(db)
         .then(actual => {
           expect(actual).to.eql(testJournals)
         })
      })
      it(`getJournalById() resolves an journal by id from 'journals' table`, () => {
        const testId = 2
        const secondJournal = testJournals[testId - 1]
        return JournalsService.getJournalById(db, testId)
            .then(actual => {
                expect(actual).to.eql({
                    id: secondJournal.id,
                    title: secondJournal.title,
                    content: secondJournal.content,
                    author_id: secondJournal.author_id
                })
            })
      })
    })
    context(`Given 'journals' has no data`, () => {
        beforeEach(() => {
            return db
                .into('users')
                .insert(testUsers)
          })
       it(`getAllJournals() resolves an empty array`, () => {
         return JournalsService.getAllJournals(db)
           .then(actual => {
             expect(actual).to.eql([])
           })
       })
        it(`addJournal() inserts a new journal and resolves new journal with an id`, () => {
            const newJournal = {
                title: new Date(),
                content: 'yaaa',
                author_id: 1
            }
            return JournalsService.addJournal(db, newJournal)
            .then(actual => {
                  expect(actual).to.eql({
                    id: 1,
                    title: newJournal.title,
                    content: newJournal.content,
                    author_id: newJournal.author_id,
                  })
            })
        })
     })
})