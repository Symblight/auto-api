'use strict';

/*
|--------------------------------------------------------------------------
| TransmissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class TransmissionSeeder {
  async run() {
    await Factory.model('App/Models/Transmission').createMany(2, [
      {
        name: 'Ручная КПП',
      },
      {
        name: 'Авто КПП',
      },
    ]);
  }
}

module.exports = TransmissionSeeder;
