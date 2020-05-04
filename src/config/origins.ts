const Apps = use('Config').get('mpApps');
const Env = use('Env');

const mpBackendApiKey = Env.getOrFail('MP_BACKEND_API_TOKEN');
const demoInsuranceBrokerBackendApiKey = Env.get('DEMO_INSURANCE_BROKER_API_TOKEN') || '';
const demoCGPBackendApiKey = Env.get('DEMO_CGP_API_TOKEN') || '';
const serenalisBackendApiKey = Env.get('SERENALIS_API_TOKEN') || '';
const aPlusFinanceBackendApiKey = Env.get('APLUSFINANCE_API_TOKEN') || '';

/*
|--------------------------------------------------------------------------
| ORIGIN CONFIGURATION - LOCAL ENVIRONMENT
|--------------------------------------------------------------------------
*/
const local = {
  'http://localhost:3330': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
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
  'http://localhost:3300': {
    app: Apps.CONSEIL,
    backendApiKey: demoCGPBackendApiKey,
  },
  'http://cgp.robintech.local': {
    app: Apps.CONSEIL,
    backendApiKey: mpBackendApiKey,
  },
  'http://demo.cgp.robintech.local': {
    app: Apps.CONSEIL,
    backendApiKey: demoCGPBackendApiKey,
  },
  'http://demo.courtier.robintech.local': {
    app: Apps.CONSEIL,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'http://serenalis.robintech.local': {
    app: Apps.CONSEIL,
    backendApiKey: serenalisBackendApiKey,
  },
  'http://aplusfinance.robintech.local': {
    app: Apps.CONSEIL,
    backendApiKey: aPlusFinanceBackendApiKey,
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
  'http://cgp.dev.robintech.co': {
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
  'http://serenalis.dev.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: serenalisBackendApiKey,
  },
  'http://aplusfinance.dev.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: aPlusFinanceBackendApiKey,
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
  'https://serenalis.stg.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: serenalisBackendApiKey,
  },
  'https://aplusfinance.stg.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: aPlusFinanceBackendApiKey,
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
  'https://demo.courtier.prd.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'https://demo.cgp.prd.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: demoCGPBackendApiKey,
  },
  'https://serenalis.prd.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: serenalisBackendApiKey,
  },
  'https://serenalis.mieuxplacer.tech': {
    app: Apps.CONSEIL,
    backendApiKey: serenalisBackendApiKey,
  },
  'https://aplusfinance.prd.robintech.co': {
    app: Apps.CONSEIL,
    backendApiKey: aPlusFinanceBackendApiKey,
  },
  'https://aplusfinance.mieuxplacer.tech': {
    app: Apps.CONSEIL,
    backendApiKey: aPlusFinanceBackendApiKey,
  },
};

export = {
  ...local,
  ...development,
  ...staging,
  ...production,
};
