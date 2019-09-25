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
| API V1 - PRISMIC
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/PageController.index');
  Route.get('/search', 'V1/PageController.search');
  Route.get('/:slug', 'V1/PageController.get');
}).prefix('api/1.0/page');

Route.group(() => {
  Route.get('/', 'V1/ProductController.index');
  Route.get('/search', 'V1/ProductController.search');
  Route.get('/:slug', 'V1/ProductController.get');
}).prefix('api/1.0/product');

Route.group(() => {
  Route.get('/', 'V1/ProductTypeController.index');
  Route.get('/search', 'V1/ProductTypeController.search');
  Route.get('/:slug', 'V1/ProductTypeController.get');
}).prefix('api/1.0/type');

Route.group(() => {
  Route.get('/', 'V1/SupplierController.index');
  Route.get('/search', 'V1/SupplierController.search');
  Route.get('/:slug', 'V1/SupplierController.get');
}).prefix('api/1.0/supplier');

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
