
exports.up = function(knex) {
  return knex.schema.createTable('acessorio', function(t) {
    t.increments('ace_id').primary();
    t.string('ace_nome', 50).notNullable();
    t.text('ace_descricao').notNullable();
    t.decimal('ace_quantidade', 3);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('acessorio');
};
