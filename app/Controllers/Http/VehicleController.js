'use strict';

const Vehicle = use('App/Models/Vehicle');

class VehicleController {
  async index() {
    try {
      return response.status(200);
    } catch (error) {
      return response.status(500);
    }
  }

  async createCar({ response, request }) {
    try {
      const params = request.only(['brand', 'description', 'price', 'imageUrl']);
      const car = await Vehicle.create({
        brand: params.brand,
        description: params.description,
        imageUrl: params.imageUrl,
        price: params.price,
      });
      return await Vehicle.find(car.id);
    } catch (error) {
      return response.status(500);
    }
  }

  async updateCar() {
    try {
      return response.status(200);
    } catch (error) {
      return response.status(500);
    }
  }

  async removeCar() {
    try {
      return response.status(200);
    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = VehicleController;
