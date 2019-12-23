const Apps = use('Config').get('mpApps');
const Env = use('Env');

const mpBackendApiKey = Env.getOrFail('MP_BACKEND_API_TOKEN');
const demoInsuranceBrokerBackendApiKey = Env.get('DEMO_INSURANCE_BROKER_API_TOKEN') || '';
const demoCGPBackendApiKey = Env.get('DEMO_CGP_API_TOKEN') || '';

/*
|--------------------------------------------------------------------------
| ORIGIN CONFIGURATION - LOCAL ENVIRONMENT
|--------------------------------------------------------------------------
*/
const local = {
  'http://mieuxplacer.local': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://mif.mieuxplacer.local': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://conseil.mieuxplacer.local': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://admin.mieuxplacer.local': {
    app: Apps.CONSEIL,
    backendApiKey: mpBackendApiKey,
  },
  'http://demo.cgp.mieuxplacer.local': {
    app: Apps.CONSEIL,
    backendApiKey: demoCGPBackendApiKey,
  },
};

/*
|--------------------------------------------------------------------------
| ORIGIN CONFIGURATION - DEV ENVIRONMENT
|--------------------------------------------------------------------------
*/
const development = {
  'http://mieuxplacer.dev.robintech.co': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://mif.mieuxplacer.dev.robintech.co': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://conseil.mieuxplacer.dev.robintech.co': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://admin.mieuxplacer.dev.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: mpBackendApiKey,
  },
  'http://demo.courtier.dev.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'http://demo.cgp.dev.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: demoCGPBackendApiKey,
  },
};

/*
|--------------------------------------------------------------------------
| ORIGIN CONFIGURATION - STG ENVIRONMENT
|--------------------------------------------------------------------------
*/
const staging = {
  'https://mieuxplacer.stg.robintech.co': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'https://admin.mieuxplacer.stg.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: mpBackendApiKey,
  },
  'https://cgp.stg.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: mpBackendApiKey,
  },
  'https://demo.courtier.stg.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'https://demo.cgp.stg.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: demoCGPBackendApiKey,
  },
};

/*
|--------------------------------------------------------------------------
| ORIGIN CONFIGURATION - PRD ENVIRONMENT
|--------------------------------------------------------------------------
*/
const production = {
  'https://www.mieuxplacer.com': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'https://cgp.prd.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: mpBackendApiKey,
  },
};

export = {
  ...local,
  ...development,
  ...staging,
  ...production,
};
