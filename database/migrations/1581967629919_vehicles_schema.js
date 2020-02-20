'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VehiclesSchema extends Schema {
  up() {
    this.create('vehicles', table => {
      table.increments();
      table.string('brand', 80).notNullable();
      table.string('description', 280);
      table.string('imageUrl', 80);
      table.jsonb('imagesUrl', 380);
      table.string('price', 40).notNullable();

      table
        .integer('modify_id', 40)
        .unsigned()
        .references('id')
        .inTable('modifications');
      table.timestamps();
    });
  }

  down() {
    this.drop('vehicles');
  }
}

module.exports = VehiclesSchema;
