const Route = use('Route');

/*
|--------------------------------------------------------------------------
| API V1 - CGP - USER
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/CGP/UserController.get');
})
  .prefix('api/1.0/cgp')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - CUSTOMER
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.post('/', 'V1/CGP/CustomerController.create');
  Route.get('/', 'V1/CGP/CustomerController.search');
  Route.get('/:id', 'V1/CGP/CustomerController.get');
})
  .prefix('api/1.0/cgp/customer')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - PRODUCT
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/CGP/ProductController.search');
})
  .prefix('api/1.0/cgp/product')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - ANSWER
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.post('/', 'V1/CGP/AnswerController.create');
  Route.get('/', 'V1/CGP/AnswerController.search');
})
  .prefix('api/1.0/cgp/customer/:customer/answer')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - PROPOSITION
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/CGP/PropositionController.search');
  Route.post('/', 'V1/CGP/PropositionController.create');
  Route.post('/generate', 'V1/CGP/PropositionController.generate');
})
  .prefix('api/1.0/cgp/customer/:customer/proposition')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/:id', 'V1/CGP/PropositionController.get');
  Route.get('/:id/mission-report', 'V1/CGP/PropositionController.downloadMissionReport');
})
  .prefix('api/1.0/cgp/proposition')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - PORTFOLIO
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.post('/prevalidate', 'V1/CGP/PortfolioController.prevalidate');
})
  .prefix('api/1.0/cgp/portfolio')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - FILE
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/CGP/FileController.search');
  Route.post('/', 'V1/CGP/FileController.create');
  Route.get('/:type/signature', 'V1/CGP/FileController.signatureUrl');
  Route.get('/:type/sign', 'V1/CGP/FileController.sign');
})
  .prefix('api/1.0/cgp/customer/:customer/file')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/template/:type/download', 'V1/CGP/FileController.downloadTemplate');
  Route.get('/template/:type/view', 'V1/CGP/FileController.viewTemplate');
  Route.get('/:id/download', 'V1/CGP/FileController.download');
  Route.get('/:id/view', 'V1/CGP/FileController.view');
  Route.get('/:id/signed', 'V1/CGP/FileController.signed');
})
  .prefix('api/1.0/cgp/file')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - CONTRACT
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/CGP/ContractController.search');
  Route.post('/:proposition', 'V1/CGP/ContractController.create');
  Route.get('/:contract/signature', 'V1/CGP/ContractController.signatureUrl');
  Route.get('/:contract/signed', 'V1/CGP/ContractController.validateSignature');
})
  .prefix('api/1.0/cgp/customer/:customer/contract')
  .middleware(['auth']);

Route.group(() => {
  Route.get('/:contract/task', 'V1/CGP/TaskController.search');
  Route.get('/:contract/task/complementary-question', 'V1/CGP/TaskController.complementaryQuestions');
  Route.get('/:contract/task/supporting-document', 'V1/CGP/TaskController.supportingDocuments');
})
  .prefix('api/1.0/cgp/contract')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - STUDY
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/', 'V1/CGP/StudyController.search');
  Route.post('/', 'V1/CGP/StudyController.create');
})
  .prefix('api/1.0/cgp/customer/:customer/study')
  .middleware(['auth']);

/*
|--------------------------------------------------------------------------
| API V1 - CGP - STUDY TASK
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get('/finish', 'V1/CGP/StudyController.finishTask');
})
  .prefix('api/1.0/cgp/customer/:customer/study/:study/task/:task')
  .middleware(['auth']);

export {};
