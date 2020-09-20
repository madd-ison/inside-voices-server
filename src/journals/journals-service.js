const journalsService = {
    getAllJournals(knex) {
        return knex
            .select('*')
            .from('journals')
    },
    addJournal(knex, journal) {
        return knex
            .from('journals')
            .insert(journal)
            .returning('*')
            .then(journal => journal[0])
    },
    deleteJournal(knex, journal_id) {
        return knex
            .from('journals')
            .where('id', journal_id)
            .delete()
    },
    updateJournal(knex, journal_id, journal) {
        return knex
            .from('journals')
            .where('id', journal_id)
            .update(journal)
    }
}   

module.exports = journalsService