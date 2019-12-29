// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// When in development mode, the web app will use this firebase connection
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDV4X5L5H93TbnjbVeziUdXk7okKnsIlD0",
    authDomain: "dgha-prod.firebaseapp.com",
    databaseURL: "https://dgha-prod.firebaseio.com",
    projectId: "dgha-prod",
    storageBucket: "",
    messagingSenderId: "188015812853",
    appId: "1:188015812853:web:11d4260e4218e990cf25bc"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
