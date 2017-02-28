// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, AppService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    AppService.init();
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.previousTitleText('');

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.one2one', {
    url: '/one2one',
    views: {
      'tab-one2one': {
        templateUrl: 'templates/tab-one2one.html',
        controller: 'One2OneCtrl'
      }
    }
  })
  .state('tab.reference', {
    url: '/reference',
    views: {
      'tab-reference': {
        templateUrl: 'templates/tab-reference.html',
        controller: 'ReferenceCtrl'
      }
    }
  })
  .state('tab.thanks', {
    url: '/thanks',
    views: {
      'tab-thanks': {
        templateUrl: 'templates/tab-thanks.html',
        controller: 'WorkDoneCtrl'
      }
    }
  })
  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
