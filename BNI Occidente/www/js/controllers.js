angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})

.controller('ReferenceCtrl', function($scope) {

})

.controller('WorkDoneCtrl', function($scope) {

})

.controller('ProfileCtrl', function($scope, AppService) {
  $scope.profile = {
    occuppation : AppService.getDevice().occuppation,
    firstName : AppService.getDevice().first_name,
    lastName : AppService.getDevice().last_name,
    phone : parseInt( AppService.getDevice().phone ),
    email : AppService.getDevice().email,
    getPush : AppService.getDevice().get_push
  };
  $scope.saveChanges = function () {
    AppService.loading();
    var promise = AppService.saveSettings( $scope.profile );
    promise.then(
      function( res ) {
        if( res.data ){
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
