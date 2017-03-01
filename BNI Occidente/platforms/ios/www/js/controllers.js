angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})

.controller('One2OneCtrl', function ($scope, AppService, $rootScope) {
  restartMeetUp = function () {
    $scope.withMember = { id : -1 };
    $scope.members = AppService.getMembers();
    $scope.meetup = {
      from : AppService.getDevice().id,
      to : $scope.withMember.id,
      date : new Date(),
      comments : '',
      uuid : ''
    }
  };
  restartMeetUp();
  $scope.sendMeetUp = function () {
    $scope.meetup.to = $scope.withMember.id;
    if( $scope.meetup.to == -1 ){
      AppService.toastIt( "Seleccione el miembro con quien tuvo la reunión." );
    } else{
      AppService.loading();
      $scope.meetup.uuid = AppService.getDevice().uuid;
      var promise = AppService.saveMeetUp( $scope.meetup );
      promise.then(
        function( res ) {
          if( res.data.received && ( res.data.received > 0 ) ){
            AppService.toastIt( "Reunión registrada." );
            restartMeetUp();
            $rootScope.goTo( 'tab.dash' );
          }
          AppService.doneLoading();
        },
        function(e) {
          AppService.var_dump( e );
          AppService.doneLoading();
        });
    }
  };
})

.controller('ReferenceCtrl', function($scope, AppService, $rootScope) {
  restartForm = function () {
    $scope.toMember = { id : -1 };
    $scope.members = AppService.getMembers();
    $scope.contactTypes = [ { id: 1, type : 'Le di tu tarjeta' }, { id : 2, type : 'Le dije que lo llamarías' } ];
    $scope.referenceTypes = [ { id : 1, type : 'Interna' }, { id : 2, type : 'Externa' } ];
    $scope.reference = {
      from : AppService.getDevice().id,
      to : $scope.toMember.id,
      contactName : '',
      type : 1,
      contactType: 1,
      contactPhone : '',
      contactEmail : '',
      comments : '',
      hotness : 0,
      uuid : ''
    };
  };
  restartForm();
  $scope.sendReference = function () {
    $scope.reference.to = $scope.toMember.id;
    if( $scope.reference.to == -1 ){
      AppService.toastIt( "Seleccione el miembro del equipo a quien va dirigida la referencia." );
    } else{
      AppService.loading();
      $scope.reference.uuid = AppService.getDevice().uuid;
      var promise = AppService.saveReference( $scope.reference );
      promise.then(
        function( res ) {
          if( res.data.received && ( res.data.received > 0 ) ){
            AppService.toastIt( "Referencia enviada." );
            restartForm();
            $rootScope.goTo( 'tab.dash' );
          }
          AppService.doneLoading();
        },
        function(e) {
          AppService.var_dump( e );
          AppService.doneLoading();
        });
    }
  };
})

.controller('WorkDoneCtrl', function($scope, AppService, $rootScope) {
  restartWork = function () {
    $scope.toMember = { id : -1 };
    $scope.members = AppService.getMembers();
    $scope.bussinessTypes = [ { id: 1, type : 'Nuevo negocio' }, { id : 2, type : 'Negocio repetido' } ];
    $scope.referenceTypes = [ { id : 1, type : 'Interna' }, { id : 2, type : 'Externa' } ];
    $scope.work = {
      from : AppService.getDevice().id,
      to : $scope.toMember.id,
      amount : '',
      type : 1,
      referenceType: 1,
      comments : '',
      uuid : ''
    };
  };
  restartWork();
  $scope.sendWork = function () {
    $scope.work.to = $scope.toMember.id;
    if( $scope.work.to == -1 ){
      AppService.toastIt( "Seleccione el miembro del equipo a quien agradecer." );
    } else{
      AppService.loading();
      $scope.work.uuid = AppService.getDevice().uuid;
      var promise = AppService.saveWork( $scope.work );
      promise.then(
        function( res ) {
          if( res.data.received && ( res.data.received > 0 ) ){
            AppService.toastIt( "Información enviada." );
            restartWork();
            $rootScope.goTo( 'tab.dash' );
          }
          AppService.doneLoading();
        },
        function(e) {
          AppService.var_dump( e );
          AppService.doneLoading();
        });
    }
  };
})

.controller('ProfileCtrl', function($scope, AppService) {
  $scope.profile = {
    occuppation : AppService.getDevice().occuppation,
    firstName : AppService.getDevice().first_name,
    lastName : AppService.getDevice().last_name,
    phone : parseInt( AppService.getDevice().phone ),
    email : AppService.getDevice().email,
    getPush : ( parseInt( AppService.getDevice().get_push ) == 1 ),
    company : AppService.getDevice().company,
    services : AppService.getDevice().services
  };
  AppService.var_dump( $scope.profile );
  $scope.saveChanges = function () {
    $scope.profile.getPush = ( $scope.profile.getPush? 1 : 0 );
    AppService.loading();
    $scope.profile.uuid = AppService.getDevice().uuid;
    var promise = AppService.saveSettings( $scope.profile );
    promise.then(
      function( res ) {
        if( res.data ){
          $scope.profile.getPush = ( parseInt( res.data.get_push ) == 1 );
          AppService.setDevice( res.data );
        }
        AppService.toastIt( "Los cambios han sido guardados." );
        AppService.doneLoading();
      },
      function(e) {
        AppService.var_dump( e );
        AppService.doneLoading();
      });
  };
});
