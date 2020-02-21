// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyB_kMph8Hol0piSzaRVLDRPjWnFoRCLxBA',
        authDomain: 'jrp-webkit-forms.firebaseapp.com',
        databaseURL: 'https://jrp-webkit-forms.firebaseio.com',
        projectId: 'jrp-webkit-forms',
        storageBucket: 'jrp-webkit-forms.appspot.com',
        messagingSenderId: '82978226752',
        appId: '1:82978226752:web:0f803d915b39019e5315a5',
        measurementId: 'G-FJK5BSS3T2'
    },
    admins: ['j48ylRhRGiPJepUUtKDUL0EpozT2']
  };

  export const COLLECTION_NAMES = {
      contract: 'Contract',
      contractMeasure: 'ContractMeasures',
      entity: 'Entity',
      measure: 'Measure',
      provider: 'Provider',
      person: 'Person',
      resource: 'Resource',
      user: 'users',
      collectionStats: 'CollectionStats',
      performanceHistory: 'MeasurePerformanceHistory',
      measureScorecard: 'MeasureScorecard'
  }

  /*
   * In development mode, to ignore zone related error stack frames such as
   * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
   * import the following file, but please comment it out in production mode
   * because it will have performance impact when throw error
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI
