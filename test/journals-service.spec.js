const JournalsService = require('../src/journals/journals-service')
const helpers = require('./test-helpers')
const knex = require('knex')

describe.only(`Journals service object`, function() {
    let db
    let { testJournals } = helpers.makeJournalsFixtures()

    before(() => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
      })
    
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

}
     )})