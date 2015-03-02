angular.module('products'). controller('HeaderController', ['$scope', 'Shared', function($scope, Shared){
  console.log('Header init');

  $scope.$watch( function() { return Shared; }, function(data) {
    $scope.product = Shared.product;
    console.log('Shared', Shared.product);
  }, true);


}]);

