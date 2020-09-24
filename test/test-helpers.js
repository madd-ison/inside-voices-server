function makeUsersArray() {
    return [
      {
        id: 1,
        username: 'test-user-1',
        full_name: 'Test user 1',
        nickname: 'TU1',
        password: 'password',
      },
      {
        id: 2,
        username: 'test-user-2',
        full_name: 'Test user 2',
        nickname: 'TU2',
        password: 'password',
      },
      {
        id: 3,
        username: 'test-user-3',
        full_name: 'Test user 3',
        nickname: 'TU3',
        password: 'password',
      },
      {
        id: 4,
        username: 'test-user-4',
        full_name: 'Test user 4',
        nickname: 'TU4',
        password: 'password',
      },
    ]
  }
  
  function makeJournalsArray(users) {
    return [
      {
        id: 1,
        author_id: users[0].id,
        title: '2029-01-22T16:28:32.615Z',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 2,
        author_id: users[1].id,
        title: '2029-01-22T16:28:32.615Z',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 3,
        author_id: users[2].id,
        title: '2029-01-22T16:28:32.615Z',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 4,
        author_id: users[3].id,
        title: '2029-01-22T16:28:32.615Z',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
    ]
  }
  
  
  function makeExpectedJournal(users, journals) {
    const author = users
      .find(user => user.id === journals.author_id)
  
    return {
      id: journals.id,
      content: journals.content,
      title: journals.title,
      author_id: author,
    }
  }
  
  function makeMaliciousJournal(user) {
    const maliciousJournal = {
      id: 911,
      title: new Date(),
      author_id: user.id,
      content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    }
    const expectedJournal = {
      ...makeExpectedJournal([user], maliciousJournal),
      title: new Date(),
      content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    }
    return {
      maliciousJournal,
      expectedJournal,
    }
  }
  
  function makeJournalsFixtures() {
    const testUsers = makeUsersArray()
    const testJournals = makeJournalsArray(testUsers)
    return { testUsers, testJournals }
  }
  
  function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          journals,
          users
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE journals_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('journals_id_seq', 0)`),
          trx.raw(`SELECT setval('users_id_seq', 0)`),
        ])
      )
    )
  }
  
  function seedJournalsTables(db, users, journals) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await trx.into('users').insert(users)
      await trx.into('journals').insert(journals)
      // update the auto sequence to match the forced id values
      await Promise.all([
        trx.raw(
          `SELECT setval('users_id_seq', ?)`,
          [users[users.length - 1].id],
        ),
        trx.raw(
          `SELECT setval('journals_id_seq', ?)`,
          [journals[journals.length - 1].id],
        ),
      ])
    })
  }
  
  function seedMaliciousJournal(db, user, journal) {
    return db
      .into('users')
      .insert([user])
      .then(() =>
        db
          .into('journals')
          .insert([journal])
      )
  }
  
  module.exports = {
    makeUsersArray,
    makeJournalsArray,
    makeExpectedJournal,
    makeMaliciousJournal,
    makeJournalsFixtures,
    cleanTables,
    seedJournalsTables,
    seedMaliciousJournal,
  }