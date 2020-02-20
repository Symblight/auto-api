'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UploadSchema extends Schema {
  up() {
    this.create('uploads', table => {
      // table.increments();
      table
        .uuid('id')
        .primary()
        .unique()
        .default(this.db.raw('uuid_generate_v4()'));
      table.timestamps();

      table
        .string('file_name')
        .notNullable()
        .unique();
      table.string('client_name').notNullable();
      table.integer('size').notNullable();
    });
  }

  down() {
    this.drop('uploads');
  }
}

module.exports = UploadSchema;
