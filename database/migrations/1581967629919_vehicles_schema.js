'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VehiclesSchema extends Schema {
  up() {
    this.create('vehicles', table => {
      table.increments();
      table.string('title', 180).notNullable();
      table.string('description', 280);
      table.string('imageUrl', 180);
      table.json('imagesUrl').defaultTo('[]');
      table.string('price', 40).notNullable();
      table.string('passenger', 40).notNullable();
      table.string('color', 40).notNullable();
      table.string('carcase', 40).notNullable();
      table.string('engine', 40).notNullable();
      table.string('fuel', 40).notNullable();
      table.string('bags', 40).notNullable();
      table.string('year', 80).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('vehicles');
  }
}
module.exports = VehiclesSchema;
