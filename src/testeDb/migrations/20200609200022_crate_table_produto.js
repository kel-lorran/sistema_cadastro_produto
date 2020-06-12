
exports.up = function(knex) {
  return knex.schema
    .createTable('produto', function(t) {
      t.increments('pro_id').primary();
      t.string('pro_nome', 50).notNullable();
      t.timestamp('pro_data_entrada').defaultTo(knex.fn.now());
      t.decimal('pro_quantidade', 3).notNullable();
      t.string('pro_funcionario', 150).notNullable();
      t.integer('fic_id').notNullable();
      t.foreign('fic_id').references('fic_id').inTable('ficha_tecnica');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('produto');
};