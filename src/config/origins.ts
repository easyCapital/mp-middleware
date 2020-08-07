import { Clients } from '@robinfinance/js-api';

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
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://mieuxplacer.local': {
    app: Apps.MIEUXPLACER,
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://mif.mieuxplacer.local': {
    app: Apps.MIEUXPLACER,
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://conseil.mieuxplacer.local': {
    app: Apps.MIEUXPLACER,
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://localhost:3300': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    backendApiKey: demoCGPBackendApiKey,
  },
  'http://localhost:3301': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    backendApiKey: serenalisBackendApiKey,
  },
  'http://cgp.robintech.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://demo.cgp.robintech.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    backendApiKey: demoCGPBackendApiKey,
  },
  'http://demo.courtier.robintech.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'http://serenalis.robintech.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    backendApiKey: serenalisBackendApiKey,
  },
  'http://aplusfinance.robintech.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
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
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://mif.mieuxplacer.dev.robintech.co': {
    app: Apps.MIEUXPLACER,
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://conseil.mieuxplacer.dev.robintech.co': {
    app: Apps.MIEUXPLACER,
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://cgp.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://demo.courtier.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'http://demo.cgp.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    backendApiKey: demoCGPBackendApiKey,
  },
  'http://serenalis.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    backendApiKey: serenalisBackendApiKey,
  },
  'http://aplusfinance.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
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
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'https://cgp.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'https://demo.courtier.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'https://demo.cgp.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    backendApiKey: demoCGPBackendApiKey,
  },
  'https://serenalis.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    backendApiKey: serenalisBackendApiKey,
  },
  'https://aplusfinance.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
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
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'https://cgp.prd.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'https://demo.courtier.prd.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'https://demo.cgp.prd.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    backendApiKey: demoCGPBackendApiKey,
  },
  'https://serenalis.prd.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    backendApiKey: serenalisBackendApiKey,
  },
  'https://serenalis.mieuxplacer.tech': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    backendApiKey: serenalisBackendApiKey,
  },
  'https://aplusfinance.prd.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
    backendApiKey: aPlusFinanceBackendApiKey,
  },
  'https://aplusfinance.mieuxplacer.tech': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
    backendApiKey: aPlusFinanceBackendApiKey,
  },
};

export = {
  ...local,
  ...development,
  ...staging,
  ...production,
};
