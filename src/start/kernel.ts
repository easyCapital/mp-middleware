const Server = use('Server');

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each http request only when the routes
| match.
|
*/
const globalMiddleware: string[] = ['Adonis/Middleware/BodyParser', 'Adonis/Middleware/Session'];

/*
|--------------------------------------------------------------------------
| Named Middleware
|--------------------------------------------------------------------------
|
| Named middleware is key/value object to conditionally add middleware on
| specific routes or group of routes.
|
| // define
| {
|   auth: 'Adonis/Middleware/Auth'
| }
|
| // use
| Route.get().middleware('auth')
|
*/
const namedMiddleware: { [key: string]: string } = {
  requestLogger: 'App/Middleware/RequestLogger',
  originConfigDetector: 'App/Middleware/OriginConfigDetector',
  universeDetector: 'App/Middleware/UniverseDetector',
  authenticator: 'App/Middleware/Authenticator',
  auth: 'App/Middleware/Auth',
};

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(['Adonis/Middleware/Cors'])
  .use(['Adonis/Middleware/Static'])
  .use(['Adonis/Middleware/EventSourceWatcher'])
  .use(['App/Middleware/MaintenanceHandler']);
