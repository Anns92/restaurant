// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_URL="http://localhost:4200"
export const environment = {
  production: false,
  GET_SLIDER:BASE_URL+"/sliders",
  GET_OFFERS:BASE_URL+"/offers",
  GET_MEALS:BASE_URL+"/meals",
  GET_BURGERS:BASE_URL+"/burgers",
  GET_DRINKS:BASE_URL+"/drinks",
  GET_SERVICE:BASE_URL+"/services",
  GET_TESTIMONIAL:BASE_URL+"/testimonials", 
  GET_PRODUCT_BY_ID:BASE_URL+"/single-product", 


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
