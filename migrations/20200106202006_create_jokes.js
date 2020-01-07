exports.up = function(knex) {
    return knex.schema.createTable('jokes', tbl => {
        tbl.increments();
        tbl.text('joke_body', 128)
        .notNullable();
        tbl.text('punchline', 128);
        tbl.integer('user');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jokes');
};
