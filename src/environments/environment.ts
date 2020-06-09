// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    domain: "angular-auth0-swa.eu.auth0.com",
    client_id: "WxrYbaBZMcZNxKtkbQq29zpxaOuJG4Jr"
  },
  swa: {
    domain: "https://githubadge.staticweb.app",
    github: {
      login: "/.auth/github/login",
      logout: "/.auth/logout",
    },
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
