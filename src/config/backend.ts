const Env = use('Env');

export = {
  host: Env.get('BACKEND_API_HOST', ''),
  apiKey: Env.get('BACKEND_API_TOKEN', ''),
};
