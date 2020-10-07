const {expect} = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('../test/test-helpers')
const supertest = require('supertest')

describe.only('Journals endpoints', function() {
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

    describe('Protected endpoints', () => {
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

      const protectedEndpoints = [
        {
          name: 'GET /api/journal', 
          path: '/api/journal'
        },
        {
          name: 'GET /api/journal/:id',
          path: '/api/journal/1'
        }
      ]
      protectedEndpoints.forEach(endpoint => {
      describe(endpoint.name, () => {
        it(`responds with 401 'Missing basic token' when no basic token`, () => {
          return supertest(app)
            .get(endpoint.path)
            .expect(401, {error: `Missing basic token`})
        })
      })
      it(`responds 401 'Unauthorized request' when no credentials in token`, () => {
           const userNoCreds = { username: '', password: '' }
           return supertest(app)
             .get(endpoint.path)
             .set('Authorization', helpers.makeAuthHeader(userNoCreds))
             .expect(401, { error: `Unauthorized request` })
         })
      it(`responds 401 'Unauthorized request' when invalid user`, () => {
          const userInvalidCreds = { username: 'user-not', password: 'existy' }
          return supertest(app)
            .get(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(userInvalidCreds))
            .expect(401, { error: `Unauthorized request` })
        })
        it(`responds 401 'Unauthorized request' when invalid password`, () => {
           const userInvalidPass = { username: testUsers[0].username, password: 'wrong' }
           return supertest(app)
             .get(endpoint.path)
             .set('Authorization', helpers.makeAuthHeader(userInvalidPass))
             .expect(401, { error: `Unauthorized request` })
         })
    })
  })

    describe(`GET /api/journal`, () => {
        context(`Given no journals`, () => {
          beforeEach(() => {
            return db
                .into('users')
                .insert(testUsers)
          })
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/journal')
              .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
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
              .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
              .expect(200, expectedJournals)
          })
        })
    
    })

})


