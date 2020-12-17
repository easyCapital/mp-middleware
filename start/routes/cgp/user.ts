import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/', 'CGP/UserController.getDetails');
  Route.post('/password', 'CGP/UserController.changePassword');
  Route.put('/signature', 'CGP/UserController.changeSignature');
})
  .prefix('/api/cgp')
  .middleware(['backendIdentifier', 'backendAuth']);
