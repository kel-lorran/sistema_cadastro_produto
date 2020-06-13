
exports.up = function(knex) {
  return knex.schema
    .createTable('ficha_tecnica_acessorio', function(t) {
      t.integer('ace_id').primary();
      t.foreign('ace_id').references('ace_id').inTable('acessorio');
      t.integer('fic_id').notNullable();
      t.foreign('fic_id').references('fic_id').inTable('ficha_tecnica');
    })
    .createTable('ficha_tecnica', function(t) {
      t.increments('fic_id').primary();
      t.string('fic_categoria', 50).notNullable();
      t.string('fic_subcategoria', 50).notNullable();
      t.string('fic_nome', 50).notNullable();
      t.text('fic_descricao').notNullable();
      t.string('fic_componente_basico', 50).notNullable();
      t.string('fic_componente_primario', 50).notNullable();
      t.string('fic_componente_secundario', 50).notNullable();
      t.text('fic_observacoes').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('ficha_tecnica')
    .dropTable('ficha_tecnica_acessorio');
};
