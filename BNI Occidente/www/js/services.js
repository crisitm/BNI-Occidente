angular.module('starter.services', [])

.factory('AppService', function($rootScope, $state, $q, $http, $cordovaDevice, $ionicLoading, $cordovaToast) {
  var global = {
    appVersion : '0.1',
    baseURL : 'http://bni.yesduet.com/?E=',
    device : {},
    androidSenderID : 'XXXXXXXXX',
    pushToken : '',
    members : []
  };
  global.init = function () {
    $rootScope.goTo = function(pScreen) {
      $state.transitionTo( pScreen );
    };
    global.initDevice();
    //global.initPush();
  };
  global.initDevice = function () {
    global.setDevice( $cordovaDevice.getDevice() );
    var dvc = global.getDevice();
    var dvcData = global.fetch( "device", { uuid : dvc.uuid, model : dvc.model, platform : dvc.platform, version : dvc.version, appVersion : global.appVersion } );
    dvcData.then(
      function(res) {
        global.setDevice( res.data.device );
      }, null);
  };
  global.start = function () {
    return global.fetch( "start", {} );
  };
  global.saveSettings = function ( pSettings ) {
    if( pSettings.firstName == 'null' ){
      pSettings.firstName = String( '' );
    }
    if( pSettings.lastName == 'null' ){
      pSettings.lastName = String( '' );
    }
    if( pSettings.phone == 'null' ){
      pSettings.phone = String( '' );
    }
    if( pSettings.email == 'null' ){
      pSettings.email = '';
    }
    return global.fetch( "save-settings", { uuid : global.getDevice().uuid, firstName : pSettings.firstName, lastName : pSettings.lastName, phone : pSettings.phone, email : pSettings.email, push : ( pSettings.getPush? 1 : 0 ), occuppation: pSettings.occuppation } );
  };














  global.var_dump = function ( pException ) {
    console.log(pException);
  };
  global.toastIt = function ( pText ) {
    $cordovaToast.showLongCenter( pText );
  };
  global.doneLoading = function(){
    $ionicLoading.hide();
  };
  global.loading = function( pMessage, pDuration ) {
    if( pMessage && ( pMessage.length > 0 ) ){
      template = pMessage;
      duration = pDuration;
    } else{
      template = '<ion-spinner></ion-spinner>';
      duration = 30000;
    }
    $ionicLoading.show( {
      template: template,
      duration: duration
    });
  };
  global.fetch = function ( runFunction, data ) {
    return $q(function(resolve, reject) {
      var deferred = $q.defer();
      setTimeout(function() {
        deferred.notify('loading');
        var ThisURL = global.baseURL + runFunction;
        for( var x in data )	{
          ThisURL += "&" + encodeURIComponent( x ) + "=" + encodeURIComponent( data[x] );
        }
        try {
          console.log( ThisURL );
          resolve( $http.get( ThisURL ) );
        }
        catch ( e ){
          reject( e );
        }
      }, 100);
      return deferred.promise;
    });
  };
  global.setPushToken = function ( ptoken ) {
    global.pushToken = ptoken;
  };
  global.getPushToken = function () {
    return global.pushToken;
  };
  global.getUser = function () {
    return global.user;
  };
  global.setUser = function ( pUser ) {
    global.user = pUser;
  };
  global.setDevice = function ( pdevice ) {
    global.device = pdevice;
  };
  global.getDevice = function () {
    return global.device;
  };
  return global;
});
