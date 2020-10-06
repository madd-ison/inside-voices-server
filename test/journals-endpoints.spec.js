const {expect} = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('../test/test-helpers')

describe('Journals endpoints', function() {
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

    describe(`GET /api/journal`, () => {
        context(`Given no journals`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/journal')
              .expect(200, [])
          })
        })
    
        context('Given there are journals in the database', () => {
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
          it('responds with 200 and all of the journals', () => {
            const expectedJournals = testJournals
            return supertest(app)
              .get('/api/journal')
              .expect(200, expectedJournals)
          })
        })
    
    })

})


