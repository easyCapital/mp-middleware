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
  Route.post('/reset-password/confirm', 'V1/CGP/AuthenticationController.resetPasswordConfirm');
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
    Route.patch('/help', 'V1/CGP/UserController.setHasSeenHelp');
    Route.get('/tags', 'V1/CGP/UserController.getTags');
    Route.get('/statistics', 'V1/CGP/UserController.getStatistics');
    Route.post('/password', 'V1/CGP/UserController.changePassword');
    Route.put('/signature', 'V1/CGP/UserController.changeSignature');
    Route.get('/stripe-portal', 'V1/CGP/UserController.stripePortal');
  }),
);
/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - QUESTION
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/QuestionController.index');
    Route.get('/updated', 'V1/CGP/QuestionController.updated');
  }).prefix('question'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/QuestionController.form');
  }).prefix('form'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/QuestionController.questionnaire');
  }).prefix('questionnaire'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/AnswerController.search');
  }).prefix('answer'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - CGP ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.createCGP');
    Route.patch('/deactivate', 'V1/CGP/AnswerController.deactivateCGP');
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
    Route.patch('/answer/deactivate', 'V1/CGP/AnswerController.deactivateAgency');
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
    Route.post('/prevalidate', 'V1/CGP/CustomerController.prevalidate');
    Route.post('/create', 'V1/CGP/CustomerController.bulkCreate');
    Route.post('/export/xlsx', 'V1/CGP/CustomerController.exportXLSX');
    Route.get('/export', 'V1/CGP/CustomerController.export');
    Route.get('/', 'V1/CGP/CustomerController.search');
  }).prefix('customer'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/CustomerController.get');
    Route.post('/email', 'V1/CGP/CustomerController.changeEmail');
    Route.patch('/activate', 'V1/CGP/CustomerController.activate');
    Route.patch('/deactivate', 'V1/CGP/CustomerController.deactivate');
  }).prefix('customer/:id'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - HOUSEHOLD
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/HouseholdController.search');
    Route.post('/', 'V1/CGP/HouseholdController.create');
    Route.post('/import', 'V1/CGP/HouseholdController.import');
    Route.post('/prevalidate', 'V1/CGP/HouseholdController.prevalidate');
  }).prefix('household'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/HouseholdController.get');
    Route.put('/', 'V1/CGP/HouseholdController.edit');
    Route.post('/member', 'V1/CGP/HouseholdController.member');
  }).prefix('household/:id'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - ANALYSIS
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/AnalysisController.search');
  }).prefix('analysis'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/generate', 'V1/CGP/AnalysisController.generate');
    Route.post('/valid', 'V1/CGP/AnalysisController.valid');
  }).prefix('customer/:id/analysis'),
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
  }).prefix('household/:household/tags'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - PRODUCT CATEGORY
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/ProductController.getProductCategories');
    Route.get('/fact-sheet', 'V1/CGP/ProductController.getProductCategoriesFactSheet');
    Route.put('/fact-sheet/:category', 'V1/CGP/ProductController.updateProductCategoryFactSheet');
  }).prefix('products/categories'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - PRODUCT
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/ProductController.index');
    Route.get('/:id', 'V1/CGP/ProductController.get');
  }).prefix('products'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - SUPPLIER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/SupplierController.index');
    Route.get('/:id', 'V1/CGP/SupplierController.get');
  }).prefix('suppliers'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.createCustomer');
    Route.patch('/deactivate', 'V1/CGP/AnswerController.deactivateCustomer');
  }).prefix('customer/:customer/answer'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.createHousehold');
    Route.patch('/deactivate', 'V1/CGP/AnswerController.deactivateHousehold');
    Route.patch('/migrate', 'V1/CGP/AnswerController.migrateHousehold');
  }).prefix('household/:household/answer'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - PROPOSITION
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/PropositionController.search');
  }).prefix('proposition'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/PropositionController.create');
    Route.post('/generate', 'V1/CGP/PropositionController.generate');
  }).prefix('customer/:customer/proposition'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/PropositionController.getStudyPropositions');
    Route.post('/:task/validate/external', 'V1/CGP/PropositionController.validateExternalProposition');
  }).prefix('study/:study/proposition'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/PropositionController.createStudyProposition');
  }).prefix('customer/:customer/study/:study/proposition'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/:id', 'V1/CGP/PropositionController.get');
  }).prefix('proposition'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - PARTNER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/PartnerController.search');
    Route.post('/', 'V1/CGP/PartnerController.create');
    Route.put('/:partner', 'V1/CGP/PartnerController.update');
    Route.delete('/:partner', 'V1/CGP/PartnerController.delete');
    Route.get('/:partner/product/:product', 'V1/CGP/PartnerController.getProductPartnerInformation');
    Route.put('/:partner/product/:product', 'V1/CGP/PartnerController.updateProductPartnerInformation');
  }).prefix('partner'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - PROPOSITION V2
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/PropositionV2Controller.search');
  }).prefix('study/:study/propositionv2'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/PropositionV2Controller.create');
  }).prefix('customer/:customer/study/:study/propositionv2'),
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
    Route.get('/afi-esca', 'V1/CGP/ScoringController.afiEsca');
    Route.get('/serenalis', 'V1/CGP/ScoringController.serenalis');
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

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/:productIdentifier', 'V1/CGP/PortfolioController.recommendation');
  }).prefix('customer/:customerId/study/:studyId/portfolio'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - FILE
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/FileController.search');
    Route.post('/customer-signature', 'V1/CGP/FileController.sendSignature');
  }).prefix('file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/FileController.create');
    Route.post('/generate', 'V1/CGP/FileController.generate');
    Route.post('/signature', 'V1/CGP/FileController.generateSignature');
    Route.post('/archive', 'V1/CGP/FileController.archived');
    Route.delete('/:file/delete', 'V1/CGP/FileController.delete');
    Route.get('/:fileType/questions', 'V1/CGP/FileController.questions');
  }).prefix('customer/:customer/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/FileController.getAllStudiesFiles');
  }).prefix('household/:household/study/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/download', 'V1/CGP/FileController.downloadContractFiles');
  }).prefix('contract/:contract/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/download', 'V1/CGP/FileController.downloadStudyFiles');
  }).prefix('study/:study/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/:fileType/questions', 'V1/CGP/FileController.questions');
  }).prefix('customer/:customer/study/:study/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/:fileType/questions', 'V1/CGP/FileController.questions');
  }).prefix('customer/:customer/study/:study/contract/:contract/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/signatures', 'V1/CGP/FileController.signatureDetails');

    Route.get('/:id/download', 'V1/CGP/FileController.download');
    Route.get('/:id/view', 'V1/CGP/FileController.view');
    Route.get('/template/:type/download/', 'V1/CGP/FileController.downloadTemplateFile');

    Route.get('/:id/signature', 'V1/CGP/FileController.signature');
    Route.patch('/:id/signing', 'V1/CGP/FileController.signing');
    Route.patch('/:id/signature/cancel', 'V1/CGP/FileController.cancelSignature');
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
  }).prefix('contract'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/proposition', 'V1/CGP/ContractController.create');
  }).prefix('customer/:customer/contract'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/ContractController.search');
  }).prefix('study/:study/contract'),
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
    Route.put('/', 'V1/CGP/StudyController.edit');
    Route.patch('/', 'V1/CGP/StudyController.update');
  }).prefix('study/:study'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/StudyController.search');
  }).prefix('household/:household/study'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/StudyController.create');
  }).prefix('customer/:customer/study'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.get('/', 'V1/CGP/StudyController.get');

    Route.get('/file', 'V1/CGP/FileController.getByStudy');
  }).prefix('study/:study'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - STUDY TASK
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.patch('/finish', 'V1/CGP/StudyController.finishTask');
  }).prefix('study/:study/task/:task'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - STUDY ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.createCustomer');
    Route.patch('/deactivate', 'V1/CGP/AnswerController.deactivateCustomer');
  }).prefix('customer/:customer/study/:study/answer'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.createHousehold');
    Route.patch('/deactivate', 'V1/CGP/AnswerController.deactivateHousehold');
  }).prefix('household/:household/study/:study/answer'),
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
    Route.post('/merge', 'V1/CGP/FileController.merge');
    Route.put('/bulk-update', 'V1/CGP/FileController.bulkUpdate');
  }).prefix('customer/:customer/study/:study/file'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/inpacted', 'V1/CGP/FileController.inpactedFiles');
  }).prefix('study/:study/file'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - CONTRACT ANSWER
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.createCustomer');
    Route.patch('/deactivate', 'V1/CGP/AnswerController.deactivateCustomer');
  }).prefix('customer/:customer/study/:study/contract/:contract/answer'),
);

addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/AnswerController.createHousehold');
    Route.patch('/deactivate', 'V1/CGP/AnswerController.deactivateHousehold');
  }).prefix('household/:household/study/:study/contract/:contract/answer'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - CONTRACT FILE
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/inpacted', 'V1/CGP/FileController.inpactedFiles');
  }).prefix('study/:study/contract/:contract/file'),
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
  }).prefix('study/:study/observation'),
);

/*
  |--------------------------------------------------------------------------
  | API V1 - CGP - FEEDBACK
  |--------------------------------------------------------------------------
  */
addAPIPrefixToGroup(
  Route.group(() => {
    Route.post('/', 'V1/CGP/FeedbackController.send');
    Route.post('/missing', 'V1/CGP/FeedbackController.missingProductOrSupplier');
  }).prefix('feedback'),
);

export {};
