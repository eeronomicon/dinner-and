/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dinner-and',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    torii: {
      sessionServiceName: 'session'
    },

    firebase: {
      apiKey: "AIzaSyAgp3fayNthMJ_EbGko3fWI3T1DY10ZvPI",
      authDomain: "js-ember-dinnerand.firebaseapp.com",
      databaseURL: "https://js-ember-dinnerand.firebaseio.com",
      storageBucket: "js-ember-dinnerand.appspot.com",
      messagingSenderId: "313959893192"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
