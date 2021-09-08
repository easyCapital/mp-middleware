import { Route as IRoute } from '../../../../typings/@adonisjs';

const Route = use('Route');

const addAPIPrefixToGroup = (group: IRoute.Group) => {
  group.prefix('api/1.0');
  group.middleware(['requestLogger', 'originConfigDetector', 'universeDetector', 'authenticator']);

  return group;
};
/*
|--------------------------------------------------------------------------
| API V1 - PRISMIC
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/HomeController.index');
  }).prefix('prismic/home'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/PageController.index');
    Route.get('/find', 'V1/Prismic/PageController.find');
    Route.get('/search', 'V1/Prismic/PageController.search');
    Route.get('/:id', 'V1/Prismic/PageController.get');
  }).prefix('prismic/page'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/ProductController.index');
    Route.get('/find', 'V1/Prismic/ProductController.find');
    Route.get('/search', 'V1/Prismic/ProductController.search');
    Route.get('/:id', 'V1/Prismic/ProductController.get');
  }).prefix('prismic/product'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/ProductTypeController.index');
    Route.get('/find', 'V1/Prismic/ProductTypeController.find');
    Route.get('/search', 'V1/Prismic/ProductTypeController.search');
    Route.get('/:id', 'V1/Prismic/ProductTypeController.get');
  }).prefix('prismic/type'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/SupplierController.index');
    Route.get('/find', 'V1/Prismic/SupplierController.find');
    Route.get('/search', 'V1/Prismic/SupplierController.search');
    Route.get('/:id', 'V1/Prismic/SupplierController.get');
  }).prefix('prismic/supplier'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/ObjectiveController.index');
    Route.get('/find', 'V1/Prismic/ObjectiveController.find');
    Route.get('/search', 'V1/Prismic/ObjectiveController.search');
    Route.get('/:id', 'V1/Prismic/ObjectiveController.get');
  }).prefix('prismic/objective'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/AdviceController.index');
    Route.get('/search', 'V1/Prismic/AdviceController.search');
  }).prefix('prismic/advice'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/TutorialController.index');
  }).prefix('prismic/tutorial'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/Prismic/FAQController.index');
  }).prefix('prismic/faq'),
);

/*
|--------------------------------------------------------------------------
| API V1 - BLOG
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/BlogController.index');
  }).prefix('blog'),
);

/*
|--------------------------------------------------------------------------
| API V1 - AUTHENTICATION
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/login', 'V1/AuthenticationController.login');
    Route.get('/logout', 'V1/AuthenticationController.logout').middleware(['auth']);
    Route.post('/forgot-password', 'V1/AuthenticationController.forgotPassword');
    Route.post('/email-validation', 'V1/AuthenticationController.sendValidationEmail');
  }).prefix('auth'),
);

/*
|--------------------------------------------------------------------------
| API V1 - CUSTOMER
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CustomerController.get').middleware(['auth']);
    Route.post('/', 'V1/CustomerController.create');
  }).prefix('customer'),
);

/*
|--------------------------------------------------------------------------
| API V1 - ONBOARDING
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/OnboardingController.index');
    Route.get('/blocks', 'V1/OnboardingController.getBlocks');
    Route.get('/questions', 'V1/OnboardingController.getQuestions');
    Route.post('/validate', 'V1/OnboardingController.validate');
    Route.post('/prevalidate', 'V1/OnboardingController.prevalidate');
  }).prefix('onboarding'),
);

/*
|--------------------------------------------------------------------------
| API V1 - ANSWER
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/AnswerController.create').middleware(['auth']);
  }).prefix('answer'),
);

/*
|--------------------------------------------------------------------------
| API V1 - FUND
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/FundController.search');
  }).prefix('fund'),
);

/*
|--------------------------------------------------------------------------
| API V1 - CONTRACT
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/ContractController.index');
    Route.get('/:contract', 'V1/ContractController.get');
    Route.get('/:contract/file', 'V1/FileController.search');
    Route.get('/:contract/complementary-question', 'V1/TaskController.complementaryQuestions');
    Route.get('/:contract/supporting-document', 'V1/TaskController.supportingDocuments');
  }).prefix('contract'),
);

/*
|--------------------------------------------------------------------------
| API V1 - TASK
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/complementary-question', 'V1/TaskController.complementaryQuestions');
    Route.get('/supporting-document', 'V1/TaskController.supportingDocuments');
  }).prefix('task'),
);

/*
|--------------------------------------------------------------------------
| API V1 - FILE
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/FileController.search');
    Route.post('/', 'V1/FileController.create');
  }).prefix('file'),
);

/*
|--------------------------------------------------------------------------
| API V1 - EVENT
|--------------------------------------------------------------------------
*/
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/EventEmitterController.stream');
    Route.get('/deploy', 'V1/EventEmitterController.deploy');
  }).prefix('event'),
);

export {};
