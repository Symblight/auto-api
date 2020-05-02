'use strict';

const Category = use('App/Models/Category');
/**
 * @swagger
 * definitions:
 *   Category:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       image_url:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 */
class CategoryController {
  async index({ response, request }) {
    try {
      const page = request.get().page;
      if (page) {
        return await Category.query().paginate(page, 5);
      } else {
        return await Category.all();
      }
    } catch (error) {
      return response.status(500);
    }
  }

  async edit({ params, request }) {
    try {
      const payload = request.only(['title']);

      const category = await Category.findOrFail(params.id);

      category.merge(payload);

      await category.save();

      return await Category.find(category.id);
    } catch (error) {
      return response.status(500);
    }
  }

  async remove({ response, params }) {
    try {
      return Category.query()
        .where('id', params.id)
        .delete();
    } catch (error) {
      return response.status(500);
    }
  }
  async create({ response, request }) {
    try {
      const payload = request.only(['title']);
      const category = await Category.create({
        title: payload.title,
      });
      return await Category.find(category.id);
    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = CategoryController;
