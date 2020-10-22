import { Clients, ClientTypes } from '@robinfinance/js-api';

const Apps = use('Config').get('mpApps');
const Env = use('Env');

const mpBackendApiKey = Env.getOrFail('MP_BACKEND_API_TOKEN');
const demoInsuranceBrokerBackendApiKey = Env.get('DEMO_INSURANCE_BROKER_API_TOKEN') || '';
const demoCGPBackendApiKey = Env.get('DEMO_CGP_API_TOKEN') || '';
const serenalisBackendApiKey = Env.get('SERENALIS_API_TOKEN') || '';
const demoSerenalisBackendApiKey = Env.get('DEMO_SERENALIS_API_TOKEN', '');
const aPlusFinanceBackendApiKey = Env.get('APLUSFINANCE_API_TOKEN') || '';
const demoAPlusFinanceBackendApiKey = Env.get('DEMO_APLUSFINANCE_API_TOKEN') || '';

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
  'http://cgp.elwin.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_MIEUXPLACER,
    type: ClientTypes.CGP,
    backendApiKey: mpBackendApiKey,
  },
  'http://demo.cgp.elwin.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: demoCGPBackendApiKey,
  },
  'http://demo.courtier.elwin.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    type: ClientTypes.COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'http://mon1215.elwin.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    type: ClientTypes.CGP,
    backendApiKey: serenalisBackendApiKey,
  },
  'http://aplusfinance.elwin.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
    type: ClientTypes.ASSET_MANAGER,
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
    type: ClientTypes.CGP,
    backendApiKey: mpBackendApiKey,
  },
  'http://demo.courtier.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    type: ClientTypes.COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'http://demo.cgp.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: demoCGPBackendApiKey,
  },
  'http://mon1215.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    type: ClientTypes.CGP,
    backendApiKey: serenalisBackendApiKey,
  },
  'http://aplusfinance.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
    type: ClientTypes.ASSET_MANAGER,
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
    type: ClientTypes.CGP,
    backendApiKey: mpBackendApiKey,
  },
  'https://demo.courtier.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    type: ClientTypes.COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'https://demo.cgp.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: demoCGPBackendApiKey,
  },
  'https://mon1215.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    type: ClientTypes.CGP,
    backendApiKey: serenalisBackendApiKey,
  },
  'https://aplusfinance.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
    type: ClientTypes.ASSET_MANAGER,
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
  'https://mieuxplacer.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_MIEUXPLACER,
    type: ClientTypes.CGP,
    backendApiKey: mpBackendApiKey,
  },
  'https://demo.courtier.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    type: ClientTypes.COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
  },
  'https://demo.cgp.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: demoCGPBackendApiKey,
  },
  'https://mon1215.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    type: ClientTypes.CGP,
    backendApiKey: serenalisBackendApiKey,
  },
  'https://demo.mon1215.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_SERENALIS,
    type: ClientTypes.CGP,
    backendApiKey: demoSerenalisBackendApiKey,
  },
  'https://aplusfinance.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
    type: ClientTypes.ASSET_MANAGER,
    backendApiKey: aPlusFinanceBackendApiKey,
  },
  'https://demo.aplusfinance.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_APLUS,
    type: ClientTypes.ASSET_MANAGER,
    backendApiKey: demoAPlusFinanceBackendApiKey,
  },
};

export = {
  ...local,
  ...development,
  ...staging,
  ...production,
};
