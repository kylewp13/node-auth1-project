
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('user_id');
            tbl.string('username')
                .notNullable()
                .unique();
            tbl.string('password')
                .notNullable();
            tbl.timestamps(true);
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users');
};
