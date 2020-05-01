'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public');
    this.create('users', table => {
      table.increments();
      table
        .string('username', 80)
        .notNullable()
        .unique();
      table
        .string('email', 254)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
      table.timestamps();
      table.boolean('confirmEmail').defaultTo(false);
      table.string('role', 24).defaultTo('admin');
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
