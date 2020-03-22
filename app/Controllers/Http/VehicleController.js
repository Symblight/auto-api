'use strict';

const Vehicle = use('App/Models/Vehicle');

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
        'category',
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
        category_id: payload.category,
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
}

module.exports = VehicleController;
