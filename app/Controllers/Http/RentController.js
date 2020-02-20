'use strict';

class RentController {
  async getCardsByList(idList) {
    const cards = await Database.table('cards').where('id_list', idList);
    return cards;
  }
  async createRent({ response }) {
    try {
      return response.status(200);
    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = RentController;
