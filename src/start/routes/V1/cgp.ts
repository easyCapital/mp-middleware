import { Route as IRoute } from '../../../../typings/@adonisjs';

const Route = use('Route');

const addAPIPrefixToGroup = (group: IRoute.Group) => {
  group.prefix('api/1.0/cgp');
  group.middleware(['requestLogger', 'originConfigDetector', 'universeDetector', 'authenticator', 'auth']);

  return group;
};

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - AUTHENTICATION
  |--------------------------------------------------------------------------
  */

Route.group(() => {
  Route.post('/login', 'V1/CGP/AuthenticationController.login');
  Route.post('/reset-password', 'V1/CGP/AuthenticationController.resetPassword');
})
  .prefix('api/1.0/cgp/auth')
  .middleware(['requestLogger', 'originConfigDetector', 'universeDetector', 'authenticator']);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - USER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/UserController.get');
    Route.post('/password', 'V1/CGP/UserController.changePassword');
  }),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - USER ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/AnswerController.searchCGP');
    Route.post('/', 'V1/CGP/AnswerController.createCGP');
  }).prefix('answer'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - AGENCY
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/AgencyController.get');
    Route.put('/', 'V1/CGP/AgencyController.edit');

    Route.get('/answer', 'V1/CGP/AnswerController.searchAgency');
    Route.post('/answer', 'V1/CGP/AnswerController.createAgency');
  }).prefix('agency'),
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
    Route.patch('/:id/deactivate', 'V1/CGP/CustomerController.deactivate');
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
  | API V1 - CGP - SCORING
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/knowledge', 'V1/CGP/ScoringController.knowledge');
    Route.get('/risk', 'V1/CGP/ScoringController.risk');
  }).prefix('customer/:customerId/study/:studyId/scoring'),
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
  }).prefix('customer/:customer/contract'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/:contract/task', 'V1/CGP/TaskController.search');
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
    Route.post('/generate', 'V1/CGP/FileController.generate');
    Route.post('/inpacted', 'V1/CGP/FileController.inpactedFiles');
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
  | API V1 - CGP - CONTRACT FILE
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/inpacted', 'V1/CGP/FileController.inpactedFiles');
  }).prefix('customer/:customer/study/:study/contract/:contract/file'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - OBSERVATION
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/ObservationController.search');
    Route.post('/', 'V1/CGP/ObservationController.create');
    Route.patch('/', 'V1/CGP/ObservationController.reorder');
    Route.put('/:observation', 'V1/CGP/ObservationController.edit');
    Route.delete('/:observation', 'V1/CGP/ObservationController.delete');
  }).prefix('customer/:customer/study/:study/observation'),
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
