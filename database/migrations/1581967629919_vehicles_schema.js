'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VehiclesSchema extends Schema {
  up() {
    this.create('vehicles', table => {
      table.increments();
      table.string('title', 180).notNullable();
      table.string('description', 280);
      table.string('image_url', 180);
      table.json('images_url').defaultTo('[]');
      table.string('price', 40).notNullable();
      table.string('passenger', 40).notNullable();
      table.string('color', 40).notNullable();
      table.string('engine', 40).notNullable();
      table
        .integer('transmission_id', 40)
        .unsigned()
        .references('id')
        .inTable('transmissions');
      table
        .integer('fuel_id', 40)
        .unsigned()
        .references('id')
        .inTable('fuels');
      table.string('bags', 40).notNullable();
      table.string('year', 80).notNullable();
      table
        .integer('category_id', 40)
        .unsigned()
        .references('id')
        .inTable('categories');
      table.timestamps();
    });
  }

  down() {
    this.drop('vehicles');
  }
}
module.exports = VehiclesSchema;
