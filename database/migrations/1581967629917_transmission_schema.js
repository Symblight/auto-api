'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TransmissionSchema extends Schema {
  up() {
    this.create('transmissions', table => {
      table.increments();
      table.string('name', 180).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('transmissions');
  }
}

module.exports = TransmissionSchema;
