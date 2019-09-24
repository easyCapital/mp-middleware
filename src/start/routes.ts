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
const Route = use('Route');

Route.get('/', 'V1/BaseController.index');

/*
|--------------------------------------------------------------------------
| API V1 - ONBOARDING
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/OnboardingController.index');
  Route.post('/validate', 'V1/OnboardingController.validate');
  Route.post('/prevalidate', 'V1/OnboardingController.prevalidate');
}).prefix('api/1.0/onboarding');

/*
|--------------------------------------------------------------------------
| API V1 - PROPOSITION
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/:token', 'V1/PropositionController.getByToken');
  Route.post('/generate', 'V1/PropositionController.generate');
}).prefix('api/1.0/proposition');
