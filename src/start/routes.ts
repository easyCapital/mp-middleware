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

Route.get('/api/1.0', 'V1/BaseController.init').middleware([
  'originConfigDetector',
  'universeDetector',
  'authenticator',
]);

import './routes/V1/public';
import './routes/V1/cgp';

Route.any('*', ({ request, response }) => {
  const bestFormat = request.accepts(['json', 'html']);

  if (bestFormat === 'json') {
    throw new NotFoundException(`La route ${request.url()} est introuvable.`);
  }

  response.redirect('https://mieuxplacer.tech/');
});
