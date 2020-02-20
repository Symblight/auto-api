'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ModificationsSchema extends Schema {
  up() {
    this.create('modifications', table => {
      table.increments();
      table.jsonb('title', 280).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('modifications');
  }
}

module.exports = ModificationsSchema;
