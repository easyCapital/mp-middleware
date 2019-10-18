import { Apps } from '../types';

const Env = use('Env');
const mpBackendApiKey = Env.getOrFail('MP_BACKEND_API_TOKEN');
const afiBackendApiKey = Env.getOrFail('AFI_BACKEND_API_TOKEN');

/*
  |
  | Object with all the configurations depending on the request origin
  |
  */
export = {
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
  'http://mif.afi.local': {
    app: Apps.MIEUXPLACER,
    backendApiKey: afiBackendApiKey,
  },
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
  'http://afi.dev.robintech.co': {
    app: Apps.MIEUXPLACER,
    backendApiKey: afiBackendApiKey,
  },
  'http://mif.afi.dev.robintech.co': {
    app: Apps.MIEUXPLACER,
    backendApiKey: afiBackendApiKey,
  },
  'http://conseil.afi.dev.robintech.co': {
    app: Apps.MIEUXPLACER,
    backendApiKey: afiBackendApiKey,
  },
  'https://mieuxplacer.stg.robintech.co': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
  'https://mieuxplacer.com': {
    app: Apps.MIEUXPLACER,
    backendApiKey: mpBackendApiKey,
  },
};