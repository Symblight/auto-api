'use strict';

/*
|--------------------------------------------------------------------------
| VehicleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class VehicleSeeder {
  async run() {
    await Factory.model('App/Models/Vehicle').createMany(7, [
      {
        title: 'HYUNDAI SOLARIS ',
        description: '',
        price: '20',
        passenger: '4',
        color: 'черный',
        engine: '107 л.с',
        transmission_id: 1,
        fuel_id: 1,
        bags: '2',
        year: new Date(),
        category_id: 1,
      },
      {
        title: 'КИА РИО АТ',
        description: '',
        price: '22',
        passenger: '4',
        color: 'белый',
        engine: '122 л.с',
        transmission_id: 1,
        fuel_id: 1,
        bags: '2',
        year: new Date(),
        category_id: 2,
      },
      {
        title: 'KIA CEED NEW',
        description: '',
        price: '20',
        passenger: '4',
        color: 'черный',
        engine: '107 л.с',
        transmission_id: 2,
        fuel_id: 2,
        bags: '2',
        year: new Date(),
        category_id: 3,
      },
      {
        title: 'ТОЙОТА КОРОЛЛА',
        description: '',
        price: '20',
        passenger: '4',
        color: 'черный',
        engine: '107 л.с',
        transmission_id: 2,
        fuel_id: 2,
        bags: '2',
        year: new Date(),
        category_id: 2,
      },
      {
        title: 'KIA CEED NEW',
        description: '',
        price: '20',
        passenger: '4',
        color: 'черный',
        engine: '107 л.с',
        transmission_id: 1,
        fuel_id: 1,
        bags: '2',
        year: new Date(),
        category_id: 1,
      },
      {
        title: 'ТОЙОТА КОРОЛЛА',
        description: '',
        price: '20',
        passenger: '4',
        color: 'черный',
        engine: '107 л.с',
        transmission_id: 1,
        fuel_id: 1,
        bags: '2',
        year: new Date(),
        category_id: 3,
      },
      {
        title: 'HYUNDAI SOLARIS',
        description: '',
        price: '20',
        passenger: '4',
        color: 'черный',
        engine: '107 л.с',
        transmission_id: 1,
        fuel_id: 2,
        bags: '2',
        year: new Date(),
        category_id: 3,
      },
    ]);
  }
}

module.exports = VehicleSeeder;
