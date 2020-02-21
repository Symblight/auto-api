'use strict';

const Vehicle = use('App/Models/Vehicle');

class VehicleController {
  async index({ params }) {
    try {
      return await Vehicle.find(params.id);
    } catch (error) {
      return response.status(500);
    }
  }

  async createCar({ response, request }) {
    try {
      const payload = request.only(['brand', 'description', 'price', 'imageUrl']);
      const car = await Vehicle.create({
        brand: payload.brand,
        description: payload.description,
        imageUrl: payload.imageUrl,
        price: payload.price,
      });
      return await Vehicle.find(car.id);
    } catch (error) {
      return response.status(500);
    }
  }

  async updateCar({ request, params }) {
    try {
      const payload = request.only(['brand', 'description', 'price', 'imageUrl']);

      const car = await Vehicle.findOrFail(params.id);

      car.merge(payload);

      await car.save();

      return await Vehicle.find(car.id);
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
