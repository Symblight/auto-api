'use strict';

/*
|--------------------------------------------------------------------------
| FuelSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class FuelSeeder {
  async run() {
    await Factory.model('App/Models/Fuel').createMany(3, [
      {
        name: 'Бензин',
      },
      {
        name: 'Дизель',
      },
      {
        name: 'Электро',
      },
    ]);
  }
}

module.exports = FuelSeeder;
