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
const globalMiddleware: string[] = [
  'Adonis/Middleware/BodyParser',
  'Adonis/Middleware/Session',
  'App/Middleware/RequestLogger',
  'App/Middleware/OriginConfigDetector',
  'App/Middleware/UniverseDetector',
  'App/Middleware/SymfonySessionDetector',
];

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
const namedMiddleware: any = {};

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(['Adonis/Middleware/Cors'])
  .use(['Adonis/Middleware/Static']);
