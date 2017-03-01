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
    global.initData();
    //global.initPush();
  };
  global.initData = function () {
    var startData = global.start();
    startData.then(
      function(res) {
        res.data.members.unshift( { id : -1, first_name : 'Miembro del equipo' } );
        global.setMembers( res.data.members );
      });
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
    return global.fetch( "start", { uuid : global.getDevice().uuid } );
  };
  global.saveWork = function ( pWork ) {
    console.log( pWork );
    return global.fetch( "save-work", pWork );
  };
  global.saveReference = function ( pReference ) {
    return global.fetch( "save-reference", pReference );
  };
  global.saveMeetUp = function ( pMeetUp ) {
    return global.fetch( "save-meetup", pMeetUp );
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
    if( pSettings.company == 'null' ){
      pSettings.company = String( '' );
    }
    if( pSettings.services == 'null' ){
      pSettings.services = '';
    }
    return global.fetch( "save-settings", pSettings );
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
  global.getMembers = function () {
    return global.members;
  };
  global.setMembers = function ( pMembers) {
    global.members = pMembers;
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
