'use strict';
/**
 * @swagger
 * definitions:
 *   Rent:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       price:
 *         type: string
 *       rent_start_time:
 *         type: string
 *         format: date-time
 *       rent_end_time:
 *         type: string
 *         format: date-time
 *       vehicle_id:
 *         type: integer
 *       location_id:
 *         type: integer
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 */
class RentController {
  async createRent({ response }) {
    try {
      return response.status(200);
    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = RentController;
