'use strict';

class VehicleController {
  async createCar({ response, request }) {
    try {
      const car = request.only(['brand', 'description', 'price']);
      console.log(car);
      return response.status(200).send();
    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = VehicleController;
