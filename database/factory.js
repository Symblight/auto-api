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

Factory.blueprint('App/Models/Fuel', async (faker, i, data) => ({
  name: data[i].name,
}));

Factory.blueprint('App/Models/Transmission', async (faker, i, data) => ({
  name: data[i].name,
}));

Factory.blueprint('App/Models/Vehicle', async (faker, i, data) => ({
  title: data[i].title,
  description: data[i].description,
  price: data[i].price,
  passenger: data[i].passenger,
  color: data[i].color,
  engine: data[i].engine,
  transmission_id: data[i].transmission_id,
  fuel_id: data[i].fuel_id,
  bags: data[i].bags,
  year: data[i].year,
  category_id: data[i].category_id,
}));
