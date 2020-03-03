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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' };
});

Route.group(() => {
  Route.get('/:id', 'VehicleController.index');
  Route.get('/all', 'VehicleController.index');
  Route.put('/:id', 'VehicleController.updateCar');
  Route.post('/', 'VehicleController.createCar');
  Route.delete('/:id', 'VehicleController.removeCar');
}).prefix('api/v1/vehicle');

Route.group(() => {})
  .prefix('api/v1/vehicle')
  .middleware('auth');

Route.group(() => {
  Route.get('/', 'UploadController.index');
  Route.post('/', 'UploadController.upload');
}).prefix('api/v1/upload');

Route.get('uploads/:uploadId/:clientName', 'UploadController.getPublicFile');
