import { Route as IRoute } from '../../../../typings/@adonisjs';

const Route = use('Route');

const addAPIPrefixToGroup = (group: IRoute.Group) => {
  group.prefix('api/1.0/cgp');
  group.middleware(['requestLogger', 'originConfigDetector', 'universeDetector', 'authenticator', 'auth']);

  return group;
};
/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - USER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/UserController.get');
  }),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - CUSTOMER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/CustomerController.create');
    Route.get('/', 'V1/CGP/CustomerController.search');
    Route.get('/:id', 'V1/CGP/CustomerController.get');
  }).prefix('customer'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - TAG
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/TagController.create');
    Route.delete('/', 'V1/CGP/TagController.delete');
  }).prefix('customer/:customer/tags'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - PRODUCT
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/ProductController.search');
  }).prefix('product'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.create');
    Route.get('/', 'V1/CGP/AnswerController.search');
  }).prefix('customer/:customer/answer'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - PROPOSITION
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/PropositionController.search');
    Route.post('/', 'V1/CGP/PropositionController.create');
    Route.post('/generate', 'V1/CGP/PropositionController.generate');
  }).prefix('customer/:customer/proposition'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/PropositionController.getStudyPropositions');
    Route.get('/generated', 'V1/CGP/PropositionController.getOrGenerateStudyProposition');
    Route.post('/', 'V1/CGP/PropositionController.createStudyProposition');
  }).prefix('customer/:customer/study/:study/proposition'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/:id', 'V1/CGP/PropositionController.get');
    Route.get('/:id/mission-report', 'V1/CGP/PropositionController.downloadMissionReport');
  }).prefix('proposition'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - PORTFOLIO
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/PortfolioController.index');
    Route.post('/', 'V1/CGP/PortfolioController.create');
    Route.post('/prevalidate', 'V1/CGP/PortfolioController.prevalidate');
  }).prefix('portfolio'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - FILE
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/FileController.search');
    Route.get('/:file/signature', 'V1/CGP/FileController.signatureUrl');
    Route.get('/:file/sign', 'V1/CGP/FileController.sign');
  }).prefix('customer/:customer/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/download', 'V1/CGP/FileController.downloadContractFiles');
  }).prefix('contract/:contract/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/template/:type/download', 'V1/CGP/FileController.downloadTemplate');
    Route.get('/template/:type/view', 'V1/CGP/FileController.viewTemplate');
    Route.get('/:id/download', 'V1/CGP/FileController.download');
    Route.get('/:id/view', 'V1/CGP/FileController.view');
    Route.get('/:id/signed', 'V1/CGP/FileController.signed');
  }).prefix('file'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - CONTRACT
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/ContractController.search');
    Route.post('/:proposition', 'V1/CGP/ContractController.create');
    Route.get('/:contract/signature', 'V1/CGP/ContractController.signatureUrl');
    Route.get('/:contract/signed', 'V1/CGP/ContractController.validateSignature');
  }).prefix('customer/:customer/contract'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/:contract/task', 'V1/CGP/TaskController.search');
    Route.get('/:contract/task/complementary-question', 'V1/CGP/TaskController.complementaryQuestions');
    Route.get('/:contract/task/supporting-document', 'V1/CGP/TaskController.supportingDocuments');
  }).prefix('contract'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - STUDY
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/StudyController.search');
    Route.post('/', 'V1/CGP/StudyController.create');
  }).prefix('customer/:customer/study'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - STUDY TASK
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/finish', 'V1/CGP/StudyController.finishTask');
  }).prefix('customer/:customer/study/:study/task/:task'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - STUDY ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.create');
  }).prefix('customer/:customer/study/:study/answer'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - STUDY FILE
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/FileController.create');
  }).prefix('customer/:customer/study/:study/file'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - CONTRACT ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.create');
  }).prefix('customer/:customer/study/:study/contract/:contract/answer'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - FEEDBACK
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/FeedbackController.send');
  }).prefix('feedback'),
);

export {};
