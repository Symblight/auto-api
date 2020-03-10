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
    await Factory.model('App/Models/Category').createMany(8, [
      {
        title: 'Внедорожники',
      },
      {
        title: 'Эконом-класс',
      },
      {
        title: 'Средний - класс',
      },
      {
        title: 'Бизнес - класс',
      },
      {
        title: 'Микроавтобусы ',
      },
      {
        title: 'Грузовые - авто',
      },
      {
        title: 'Дома на колесах ',
      },
      {
        title: 'Ретро автомобили',
      },
    ]);
  }
}

module.exports = CategorySeeder;
