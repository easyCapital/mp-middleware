const Env = use('Env');

export = {
  backend: {
    host: Env.get('BACKEND_API_HOST', ''),
    apiKey: Env.get('BACKEND_API_TOKEN', ''),
  },
  prismic: {
    host: Env.get('PRISMIC_API_HOST', ''),
    apiKey: Env.get('PRISMIC_API_TOKEN', ''),
  },
};
