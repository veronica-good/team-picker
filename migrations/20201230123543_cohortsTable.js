
exports.up = function(knex) {
  return knex.schema
  .createTable('cohorts', table=>{
      table.increments('id');
      table.string('logo');
      table.text('name');
      table.text('members');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cohorts')
};
