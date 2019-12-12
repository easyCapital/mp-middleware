const Route = use('Route');

/*
|--------------------------------------------------------------------------
| API V1 - PRISMIC
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/Prismic/PageController.index');
  Route.get('/search', 'V1/Prismic/PageController.search');
  Route.get('/:slug', 'V1/Prismic/PageController.get');
}).prefix('api/1.0/prismic/page');

Route.group(() => {
  Route.get('/', 'V1/Prismic/ProductController.index');
  Route.get('/search', 'V1/Prismic/ProductController.search');
  Route.get('/:slug', 'V1/Prismic/ProductController.get');
}).prefix('api/1.0/prismic/product');

Route.group(() => {
  Route.get('/', 'V1/Prismic/ProductTypeController.index');
  Route.get('/search', 'V1/Prismic/ProductTypeController.search');
  Route.get('/:slug', 'V1/Prismic/ProductTypeController.get');
}).prefix('api/1.0/prismic/type');

Route.group(() => {
  Route.get('/', 'V1/Prismic/SupplierController.index');
  Route.get('/search', 'V1/Prismic/SupplierController.search');
  Route.get('/:slug', 'V1/Prismic/SupplierController.get');
}).prefix('api/1.0/prismic/supplier');

Route.group(() => {
  Route.get('/', 'V1/Prismic/AdviceController.index');
  Route.get('/search', 'V1/Prismic/AdviceController.search');
}).prefix('api/1.0/prismic/advice');

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
| API V1 - CONTRACT
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/ContractController.index');
  Route.get('/:contract', 'V1/ContractController.get');
  Route.get('/:contract/file', 'V1/FileController.search');
  Route.get('/:contract/complementary-question', 'V1/TaskController.complementaryQuestions');
  Route.get('/:contract/signature', 'V1/TaskController.signatureUrl');
  Route.get('/:contract/signed', 'V1/TaskController.validateSignature');
}).prefix('api/1.0/contract');

/*
|--------------------------------------------------------------------------
| API V1 - TASK
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/complementary-question', 'V1/TaskController.complementaryQuestions');
}).prefix('api/1.0/task');

/*
|--------------------------------------------------------------------------
| API V1 - FILE
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/FileController.search');
}).prefix('api/1.0/file');

export {};
