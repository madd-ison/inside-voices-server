const JournalsService = {
    getAllJournals(knex) {
        return knex('journals')
        .join('users', 'users.id', '=', 'journals.author_id')
        .select('*')
        // return knex
        // .select('*').from('journals')
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
        .where('id', id)
        .delete()
    },
    updateJournal(knex, id, content) {
        return knex
        .from('journals')
        .where('id', id)
        .update(content)
    },
}   

module.exports = JournalsService