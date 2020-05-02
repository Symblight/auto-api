'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RentSchema extends Schema {
  up() {
    this.create('rents', table => {
      table.increments();
      table.string('title', 80).notNullable();
      table.string('price', 80).notNullable();
      table.date('rent_start_time', 80).notNullable();
      table.date('rent_end_time', 80).notNullable();
      table
        .integer('vehicle_id', 40)
        .unsigned()
        .references('id')
        .inTable('vehicles');
      table
        .integer('location_id', 40)
        .unsigned()
        .references('id')
        .inTable('locations');
      table.timestamps();
    });
  }

  down() {
    this.drop('rents');
  }
}

module.exports = RentSchema;
