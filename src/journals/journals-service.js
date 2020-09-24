const xss = require('xss')

const JournalsService = {
    getAllJournals(knex) {
        return knex.select('*').from('journals')
    },
    addJournal(knex, newJournal) {
        return knex
        .insert(newJournal)
        .into('journals')
        .returning('*')
        .then(journal => journal[0])
    },
    getJournalById(knex, id) {
        return knex.from('journals').select('*').where('id', id).first()
    },
    deleteJournal(knex, id) {
        return knex
        .from('journals')
        .where({id})
        .delete()
    },
    updateJournal(knex, journal_id, journal) {
        return knex
        .from('journals')
        .where('id', journal_id)
        .update(journal)
    },
    serializeJournal(journal) {
        const { user } = journal
        return {
          id: journal.id,
          title: xss(journal.title),
          content: xss(journal.content),
          author_id: {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            nickname: user.nickname,
          }
        }
    }
}   

module.exports = JournalsService