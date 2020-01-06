/*
  |
  | Application's configurations
  |
  */

export = {
  MIEUXPLACER: {
    name: 'mieuxplacer',
    userType: 'customer',
  },
  CONSEIL: {
    name: 'outil-conseil',
    userType: 'cgp',
    signatureCallback: '/outil-client/{customer}/contrats/{contract}/signature',
  },
};
