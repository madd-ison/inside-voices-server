const JournalsService = require('../src/journals/journals-service')
const helpers = require('./test-helpers')
const knex = require('knex')
const app = require('../src/app')

describe.only(`Journals service object`, function() {
    let db
    let testJournals = [
        {
           "id": 1,
           "title": new Date('2029-01-22T16:28:32.615Z'),
           "content": 'ok',
           "author_id": 1
        }
    ]
    before(() => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
      })

      before('cleanup', () => helpers.cleanTables(db))
    
      afterEach('cleanup', () => helpers.cleanTables(db))

      before(() => db('journals').truncate())

    before(() => {
        return db
          .into('journals')
          .insert(testJournals)
  })
    
     after(() => db.destroy())
    
     describe(`getAllJournals()`, () => {
        it(`resolves all journals from 'journals' table`, () => {
          // test that JournalsService.getAllJournals gets data from table
         return JournalsService.getAllJournals(db)
           .then(actual => {
             expect(actual).to.eql(testJournals)
           })
        })

    })
})