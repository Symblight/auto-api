'use strict';

const Vehicle = use('App/Models/Vehicle');
const Fuel = use('App/Models/Fuel');
const Transmission = use('App/Models/Transmission');
const Category = use('App/Models/Category');
const Database = use('Database');
const _ = require('lodash');

class VehicleController {
  async index({ response, params }) {
    try {
      return await Vehicle.find(params.id);
    } catch (error) {
      return response.status(500);
    }
  }

  async createCar({ response, request }) {
    try {
      const payload = request.only([
        'title',
        'price',
        'image_url',
        'passenger',
        'color',
        'engine',
        'fuel',
        'bags',
        'year',
        'images_url',
        'category_id',
      ]);
      const car = await Vehicle.create({
        title: payload.title,
        image_url: payload.image_url,
        description: '',
        price: payload.price,
        passenger: payload.passenger,
        year: payload.year,
        color: payload.color,
        engine: payload.engine,
        fuel: payload.fuel,
        bags: payload.bags,
        category_id: payload.category_id,
        images_url: JSON.stringify(payload.images_url),
      });
      return await Vehicle.find(car.id);
    } catch (error) {
      return response.status(500);
    }
  }

  async updateCar({ response, request, params }) {
    try {
      const payload = request.only([
        'title',
        'price',
        'image_url',
        'passenger',
        'color',
        'engine',
        'fuel',
        'bags',
        'year',
        'imagesUrl',
        'category',
      ]);

      const car = await Vehicle.findOrFail(params.id);

      car.merge(payload);

      await car.save();

      return await Vehicle.find(car.id);
    } catch (error) {
      return response.status(500);
    }
  }

  async allCars({ response, request }) {
    try {
      const page = request.get().page || 1;
      return await Vehicle.query().paginate(page, 5);
    } catch (error) {
      return response.status(500);
    }
  }

  /**
   * @name category
   */
  async carsByCategory({ response, params }) {
    try {
      const category = params.category;
      return await Vehicle.query()
        .where('category_id', category)
        .fetch();
    } catch (error) {
      return response.status(500);
    }
  }

  async removeCar({ response, params }) {
    try {
      return Vehicle.query()
        .where('id', params.id)
        .delete();
    } catch (error) {
      return response.status(500);
    }
  }
  async filters() {
    try {
      const fuels = await Fuel.all();
      const transmissions = await Transmission.all();
      const categories = await Category.all();
      return { fuels, transmissions, categories };
    } catch (error) {
      return response.status(500);
    }
  }

  async searchByFilters({ params, response, request }) {
    try {
      const { categories, fuels, passenger, transmissions } = request.all();

      const categoriesNormalize = categories === undefined ? [] : categories;
      const fuelsNormalize = fuels === undefined ? [] : fuels;
      const transmissionsNormalize = transmissions === undefined ? [] : transmissions;
      const passengerNormalize = passenger === undefined ? [] : passenger;

      const categoriesFromDb = await Database.table('categories').whereIn(
        'title',
        Array.isArray(categoriesNormalize) ? categoriesNormalize : [categoriesNormalize],
      );
      const fuelsFromDb = await Database.table('fuels').whereIn(
        'name',
        Array.isArray(fuelsNormalize) ? fuelsNormalize : [fuelsNormalize],
      );
      const transmissionsFromDb = await Database.table('transmissions').whereIn(
        'name',
        Array.isArray(transmissionsNormalize) ? transmissionsNormalize : [transmissionsNormalize],
      );

      const passengerUpdated = Array.isArray(passengerNormalize)
        ? passengerNormalize
        : [passengerNormalize];

      const buildConditions = ({
        transmissionsFromDb,
        categoriesFromDb,
        fuelsFromDb,
        passengerNormalize,
      }) => {
        let conditions = [];

        if (!_.isEmpty(categoriesFromDb)) {
          conditions.push(`category_id = ANY (ARRAY[${categoriesFromDb.map(item => item.id)}])`);
        }

        if (!_.isEmpty(fuelsFromDb)) {
          conditions.push(`fuel_id = ANY (ARRAY[${fuelsFromDb.map(item => item.id)}])`);
        }

        if (!_.isEmpty(transmissionsFromDb)) {
          conditions.push(
            `transmission_id = ANY (ARRAY[${transmissionsFromDb.map(item => item.id)}])`,
          );
        }

        if (!_.isEmpty(passengerNormalize)) {
          conditions.push(
            `passenger = ANY (ARRAY[${passengerNormalize.map(item => `'${item}'`)}])`,
          );
        }

        return !_.isEmpty(conditions) ? conditions.join(' AND ') : '';
      };

      const sqlWhere = buildConditions({
        transmissionsFromDb,
        categoriesFromDb,
        fuelsFromDb,
        passengerNormalize: passengerUpdated,
      });

      const vehicles = await Vehicle.query()
        .whereRaw(sqlWhere)
        .fetch();

      return vehicles;
    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = VehicleController;
