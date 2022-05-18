// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false, 
  googleWebClientId: "763825707923-odd8v26h0o9orgj2cbbh5u3gknsecquo.apps.googleusercontent.com",
  firebase: {
    apiKey: "AIzaSyAAcmobFKI4XkzurMROlqEntktO9b6CmUk",
    authDomain: "fitnessday-e9e9c.firebaseapp.com",
    projectId: "fitnessday-e9e9c",
    storageBucket: "fitnessday-e9e9c.appspot.com",
    messagingSenderId: "763825707923",
    appId: "1:763825707923:web:980c27da3b52e6a9d2e666",
    measurementId: "G-2NHJFEQY1Y"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
