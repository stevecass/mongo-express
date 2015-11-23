angular.module('products'). controller('DetailController',
  ['$scope', '$location', '$route', 'Product', 'Shared',
  function($scope, $location, $route, Product, Shared ){
  Product.getOne({id: $route.current.params.id}).$promise.then(function(data){
   $scope.product = data;
   Shared.product = data;
  });
}]);

