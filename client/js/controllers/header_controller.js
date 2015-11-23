angular.module('products'). controller('HeaderController', ['$scope', 'Shared', 'User', function($scope, Shared, User){

  $scope.$watch( function() { return Shared; }, function(data) {
    $scope.product = Shared.product;
    $scope.currentUser = Shared.currentUser;
  }, true);

  User.getCurrent().$promise.then(function(data){
    Shared.currentUser = data;
  });

}]);

