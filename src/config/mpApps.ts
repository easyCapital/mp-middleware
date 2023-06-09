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
    signatureCallback: '/gestion-clientele/{customer}/signature/{file}',
    contractSignatureCallback: '/gestion-clientele/{customer}/contrats/{contract}/signature',
  },
};
