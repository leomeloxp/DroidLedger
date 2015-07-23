// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  'use strict';
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.add', {
    url: '/add',
    views: {
      'menuContent': {
        templateUrl: 'templates/add.html',
        controller: 'AddCtrl'
      }
    }
  })

  .state('app.edit', {
    url: '/edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/add.html',
        controller: 'EditCtrl'
      },
      params: {
        transaction: null
      }
    }
  })

  .state('app.balance', {
      url: '/balance',
      views: {
        'menuContent': {
          templateUrl: 'templates/balance.html',
          controller: 'BalanceCtrl'
        }
      }
    })

    .state('app.recent', {
      url: '/recent',
      views: {
        'menuContent': {
          templateUrl: 'templates/recent.html',
          controller: 'RecentCtrl'
        },
      params: {
        transaction: null
      }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/recent');
});
