'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', async (faker, i, data) => ({
  username: data[i].username,
  password: data[i].password,
  email: data[i].email,
  confirmEmail: data[i].confirmEmail,
  role: data[i].role,
}));

Factory.blueprint('App/Models/Category', async (faker, i, data) => ({
  title: data[i].title,
}));
