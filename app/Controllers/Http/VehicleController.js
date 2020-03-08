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
        'imageUrl',
        'passenger',
        'color',
        'engine',
        'fuel',
        'bags',
        'year',
        'carcase',
        'imagesUrl',
      ]);
      const car = await Vehicle.create({
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: '',
        price: payload.price,
        passenger: payload.passenger,
        year: payload.year,
        color: payload.color,
        carcase: payload.carcase,
        engine: payload.engine,
        fuel: payload.fuel,
        bags: payload.bags,
        imagesUrl: JSON.stringify(payload.imagesUrl),
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
        'imageUrl',
        'passenger',
        'color',
        'engine',
        'fuel',
        'bags',
        'year',
        'carcase',
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

  async removeCar({ response, params }) {
    try {
      await Vehicle.query()
        .where('id', params.id)
        .delete();
      return response.status(200);
    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = VehicleController;
