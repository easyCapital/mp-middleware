/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/
import { NotFoundException } from '../app/Exceptions';

const Route = use('Route');

import './routes/V1/public';
import './routes/V1/cgp';

Route.any('*', () => {
  throw new NotFoundException();
});
