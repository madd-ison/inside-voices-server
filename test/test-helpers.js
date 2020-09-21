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
        title: new Date('2029-01-22T16:28:32.615Z'),
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 2,
        author_id: users[1].id,
        title: new Date('2029-01-22T16:28:32.615Z'),
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 3,
        author_id: users[2].id,
        title: new Date('2029-01-22T16:28:32.615Z'),
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
      {
        id: 4,
        author_id: users[3].id,
        title: new Date('2029-01-22T16:28:32.615Z'),
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      },
    ]
  }
  
  
  function makeExpectedJournal(users, journal) {
    const author = users
      .find(user => user.id === journal.author_id)
  
    return {
      id: journal.id,
      content: journal.content,
      title: article.title.toISOString(),
      author: {
        id: author.id,
        username: author.username,
        full_name: author.full_name,
        nickname: author.nickname,
        date_modified: author.date_modified || null,
      },
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
          inside_voices_journals,
          inside_voices_users,
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE inside_voices_journals_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE inside_voices_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('inside_voices_journals_id_seq', 0)`),
          trx.raw(`SELECT setval('inside_voices_users_id_seq', 0)`),
        ])
      )
    )
  }
  
  function seedJournalsTables(db, users, articles) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await trx.into('inside_voices_users').insert(users)
      await trx.into('inside_voices_journals').insert(journals)
      // update the auto sequence to match the forced id values
      await Promise.all([
        trx.raw(
          `SELECT setval('inside_voices_users_id_seq', ?)`,
          [users[users.length - 1].id],
        ),
        trx.raw(
          `SELECT setval('inside_voices_journals_id_seq', ?)`,
          [journals[journals.length - 1].id],
        ),
      ])
    })
  }
  
  function seedMaliciousJournal(db, user, journal) {
    return db
      .into('inside_voices_users')
      .insert([user])
      .then(() =>
        db
          .into('inside_voices_journals')
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