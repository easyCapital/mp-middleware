import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/login', 'CGP/AuthenticationController.login');
  Route.post('/forgot-password', 'CGP/AuthenticationController.forgotPassword');
  Route.post('/reset-password', 'CGP/AuthenticationController.resetPassword');
})
  .prefix('/api/cgp/auth')
  .middleware(['backendIdentifier']);
