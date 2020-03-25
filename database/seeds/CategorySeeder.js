'use strict';

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class CategorySeeder {
  async run() {
    await Factory.model('App/Models/Category').createMany(7, [
      {
        title: 'Аренда авто без водителя',
      },
      {
        title: 'Прокат авто с водителем',
      },
      {
        title: 'Трансфер',
      },
      {
        title: 'Микроавтобусы',
      },
      {
        title: 'Свадебные кортежи',
      },
      {
        title: 'Грузовые - авто',
      },
      {
        title: 'Автобусы',
      },
    ]);
  }
}

module.exports = CategorySeeder;
