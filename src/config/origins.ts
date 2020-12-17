import { Clients, ClientTypes } from '@robinfinance/js-api';

const Apps = use('Config').get('mpApps');
const Env = use('Env');

const mpBackendApiKey = Env.getOrFail('MP_BACKEND_API_TOKEN');
const elwinBackendApiKey = Env.get('ELWIN_API_TOKEN') || '';
const demoElwinBackendApiKey = Env.get('DEMO_ELWIN_API_TOKEN') || '';
const demoInsuranceBrokerBackendApiKey = Env.get('DEMO_INSURANCE_BROKER_API_TOKEN') || '';
const demoCGPBackendApiKey = Env.get('DEMO_CGP_API_TOKEN') || '';
const testElwinBackendApiKey = Env.get('TEST_ELWIN_API_TOKEN') || '';
const serenalisBackendApiKey = Env.get('SERENALIS_API_TOKEN') || '';
const demoSerenalisBackendApiKey = Env.get('DEMO_SERENALIS_API_TOKEN', '');
const aPlusFinanceBackendApiKey = Env.get('APLUSFINANCE_API_TOKEN') || '';
const demoAPlusFinanceBackendApiKey = Env.get('DEMO_APLUSFINANCE_API_TOKEN') || '';
const afiBackendApiKey = Env.get('AFI_API_TOKEN') || '';
const demoAfiBackendApiKey = Env.get('DEMO_AFI_API_TOKEN') || '';

/*
|--------------------------------------------------------------------------
| ORIGIN CONFIGURATION - LOCAL ENVIRONMENT
|--------------------------------------------------------------------------
*/
const local = {
  'http://mieuxplacer.local': {
    app: Apps.MIEUXPLACER,
    client: Clients.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'http://app.elwin.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_ELWIN,
    type: ClientTypes.CGP,
    backendApiKey: elwinBackendApiKey,
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
    isDemo: true,
  },
  'http://demo.courtier.elwin.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    type: ClientTypes.COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
    isDemo: true,
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
  'http://afi.elwin.local': {
    app: Apps.CONSEIL,
    client: Clients.CGP_AFI,
    type: ClientTypes.COURTIER,
    backendApiKey: afiBackendApiKey,
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
  'http://app.elwin.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_ELWIN,
    type: ClientTypes.CGP,
    backendApiKey: elwinBackendApiKey,
  },
  'http://cgp.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_MIEUXPLACER,
    type: ClientTypes.CGP,
    backendApiKey: mpBackendApiKey,
  },
  'http://test.elwin.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: testElwinBackendApiKey,
  },
  'http://demo.courtier.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_COURTIER,
    type: ClientTypes.COURTIER,
    backendApiKey: demoInsuranceBrokerBackendApiKey,
    isDemo: true,
  },
  'http://demo.cgp.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: demoCGPBackendApiKey,
    isDemo: true,
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
  'http://afi.dev.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_AFI,
    type: ClientTypes.COURTIER,
    backendApiKey: afiBackendApiKey,
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
  'https://app.elwin.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_ELWIN,
    type: ClientTypes.CGP,
    backendApiKey: elwinBackendApiKey,
  },
  'https://test.elwin.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: testElwinBackendApiKey,
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
    isDemo: true,
  },
  'https://demo.cgp.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: demoCGPBackendApiKey,
    isDemo: true,
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
  'https://afi.stg.robintech.co': {
    app: Apps.CONSEIL,
    client: Clients.CGP_AFI,
    type: ClientTypes.COURTIER,
    backendApiKey: afiBackendApiKey,
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
  'https://app.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_ELWIN,
    type: ClientTypes.CGP,
    backendApiKey: elwinBackendApiKey,
  },
  'https://demo.app.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_ELWIN,
    type: ClientTypes.CGP,
    backendApiKey: demoElwinBackendApiKey,
    isDemo: true,
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
    isDemo: true,
  },
  'https://demo.cgp.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_DEMO,
    type: ClientTypes.CGP,
    backendApiKey: demoCGPBackendApiKey,
    isDemo: true,
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
    isDemo: true,
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
    isDemo: true,
  },
  'https://afi.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_AFI,
    type: ClientTypes.COURTIER,
    backendApiKey: afiBackendApiKey,
  },
  'https://demo.afi.elwin.fr': {
    app: Apps.CONSEIL,
    client: Clients.CGP_AFI,
    type: ClientTypes.COURTIER,
    backendApiKey: demoAfiBackendApiKey,
    isDemo: true,
  },
};

export = {
  ...local,
  ...development,
  ...staging,
  ...production,
};
