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

Route.group(() => {
  Route.get('/', 'V1/AdviceController.index');
  Route.get('/search', 'V1/AdviceController.search');
}).prefix('api/1.0/advice');

/*
|--------------------------------------------------------------------------
| API V1 - AUTHENTICATION
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.post('/login', 'V1/AuthenticationController.login');
  Route.get('/logout', 'V1/AuthenticationController.logout').middleware(['auth']);
  Route.post('/forgot-password', 'V1/AuthenticationController.forgotPassword');
  Route.post('/email-validation', 'V1/AuthenticationController.sendValidationEmail');
}).prefix('api/1.0/auth');

/*
|--------------------------------------------------------------------------
| API V1 - CUSTOMER
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/CustomerController.get').middleware(['auth']);
  Route.post('/', 'V1/CustomerController.create');
}).prefix('api/1.0/customer');

/*
|--------------------------------------------------------------------------
| API V1 - ONBOARDING
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/OnboardingController.index');
  Route.get('/blocks', 'V1/OnboardingController.getBlocks');
  Route.get('/questions', 'V1/OnboardingController.getQuestions');
  Route.post('/validate', 'V1/OnboardingController.validate');
  Route.post('/prevalidate', 'V1/OnboardingController.prevalidate');
}).prefix('api/1.0/onboarding');

/*
|--------------------------------------------------------------------------
| API V1 - ANSWER
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.post('/', 'V1/AnswerController.create').middleware(['auth']);
}).prefix('api/1.0/answer');

/*
|--------------------------------------------------------------------------
| API V1 - PROPOSITION
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/PropositionController.get');
  Route.post('/', 'V1/PropositionController.validate').middleware(['auth']);
  Route.get('/:token', 'V1/PropositionController.getByToken');
  Route.post('/generate', 'V1/PropositionController.generate');
  Route.get('/download/:token', 'V1/PropositionController.downloadByToken');
}).prefix('api/1.0/proposition');

/*
|--------------------------------------------------------------------------
| API V1 - FUND
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/FundController.search');
}).prefix('api/1.0/fund');

/*
|--------------------------------------------------------------------------
| API V1 - CGP
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/CGP/UserController.get');
})
  .prefix('api/1.0/cgp')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/', 'V1/CGP/CustomerController.search');
  Route.get('/:id', 'V1/CGP/CustomerController.get');
})
  .prefix('api/1.0/cgp/customer')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/', 'V1/CGP/PropositionController.search');
  Route.post('/', 'V1/CGP/PropositionController.create');
  Route.get('/:id', 'V1/CGP/PropositionController.get');
})
  .prefix('api/1.0/cgp/customer/:customer/proposition')
  .middleware(['auth']);

Route.group(() => {
  Route.post('/prevalidate', 'V1/CGP/PortfolioController.prevalidate');
})
  .prefix('api/1.0/cgp/portfolio')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/', 'V1/CGP/ContractController.search');
  Route.post('/:proposition', 'V1/CGP/ContractController.create');
})
  .prefix('api/1.0/cgp/customer/:customer/contract')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/:contract/task', 'V1/CGP/TaskController.search');
  Route.get('/:contract/task/complementary-question', 'V1/CGP/TaskController.complementaryQuestions');
})
  .prefix('api/1.0/cgp/contract')
  .middleware(['auth']);

Route.group(() => {
  Route.post('/', 'V1/CGP/AnswerController.create');
  Route.get('/', 'V1/CGP/AnswerController.search');
})
  .prefix('api/1.0/cgp/customer/:customer/answer')
  .middleware(['auth']);
