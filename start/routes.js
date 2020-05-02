'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/docs', 'SwaggerController.index');

Route.get('/', () => {
  return 'Auto RENT API';
});

Route.group(() => {
  /**
   * @swagger
   * /login:
   *   get:
   *     description: Login.
   *     responses:
   *       200:
   *         description: Logged in successfully
   *         schema:
   *           $ref: '#/definitions/User'
   *       422:
   *         description: Validation error
   */
  Route.get('login', 'UserController.get');
  /**
   * @swagger
   * /login:
   *   delete:
   *     description: Logout.
   *     responses:
   *       200:
   *         description: Logout in successfully
   *       422:
   *         description: Validation error
   */
  Route.delete('login', 'UserController.logout');
})
  .prefix('api/v1/')
  .middleware('auth');

Route.group(() => {
  /**
   * @swagger
   * /login:
   *   post:
   *     description: Sign in.
   *     parameters:
   *       - email: email
   *         description: User's email.
   *         in: body
   *         required: true
   *         type: string
   *       - password: password
   *         description: User's password.
   *         in: body
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Logged in successfully
   *         schema:
   *           $ref: '#/definitions/User'
   *       422:
   *         description: Validation error
   */
  Route.post('login', 'UserController.login');
  /**
   * @swagger
   * /signup:
   *   post:
   *     description: Sign up.
   *     parameters:
   *     responses:
   *       200:
   *         description: Logged in successfully
   *         schema:
   *           $ref: '#/definitions/User'
   *       422:
   *         description: Validation error
   */
  Route.post('signup', 'UserController.register');
  // Route.put(':id', 'UserController.edit');
}).prefix('api/v1/');

Route.group(() => {
  Route.get('/c/:id', 'VehicleController.index');
  Route.get('/f/search', 'VehicleController.filters');
  Route.get('/search', 'VehicleController.searchByFilters');
}).prefix('api/v1/vehicle');

Route.group(() => {
  Route.put('/:id', 'VehicleController.updateCar');
  Route.post('/', 'VehicleController.createCar');
  Route.delete('/:id', 'VehicleController.removeCar');
})
  .prefix('api/v1/vehicle')
  .middleware('auth');

Route.group(() => {
  Route.get('/:page?', 'VehicleController.allCars');
  Route.get('/c/:category?', 'VehicleController.carsByCategory');
}).prefix('api/v1/vehicles');

Route.group(() => {
  Route.delete('/:id', 'CategoryController.remove');
  Route.put('/:id', 'CategoryController.edit');
  Route.post('/', 'CategoryController.create');
})
  .prefix('api/v1/categories')
  .middleware('auth');

Route.group(() => {
  Route.get('/:page?', 'CategoryController.index');
}).prefix('api/v1/categories');

Route.group(() => {})
  .prefix('api/v1/vehicle')
  .middleware('auth');

Route.group(() => {
  Route.get('/', 'UploadController.index');
  Route.post('/', 'UploadController.upload');
}).prefix('api/v1/upload');

Route.get('uploads/:uploadId/:clientName', 'UploadController.getPublicFile');
