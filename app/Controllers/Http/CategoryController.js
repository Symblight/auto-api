'use strict';

const Category = use('App/Models/Category');

class CategoryController {
  async index({ response }) {
    try {
      return await Category.all();
    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = CategoryController;
