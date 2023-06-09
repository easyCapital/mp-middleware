const Env = use('Env');

export = {
  backend: {
    host: Env.getOrFail('BACKEND_API_HOST'),
  },
  symfony: {
    host: Env.getOrFail('SYMFONY_API_HOST'),
  },
  prismic: {
    host: Env.getOrFail('PRISMIC_API_HOST'),
    apiKey: Env.getOrFail('PRISMIC_API_TOKEN'),
  },
  slack: {
    apiKey: Env.getOrFail('SLACK_API_TOKEN'),
  },
  hubspot: {
    host: Env.getOrFail('HUBSPOT_API_HOST'),
    apiKey: Env.getOrFail('HUBSPOT_API_TOKEN'),
  },
};
