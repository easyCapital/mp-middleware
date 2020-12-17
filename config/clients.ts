import Env from '@ioc:Adonis/Core/Env';

/*
|--------------------------------------------------------------------------
| Clients Config
|--------------------------------------------------------------------------
*/
const clientsConfig: ClientsConfig = {
  backend: {
    host: Env.get('BACKEND_API_HOST'),
  },
};

export default clientsConfig;
