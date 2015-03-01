angular.module('products'). controller('DetailController', ['$scope', '$location', '$route', 'Product', function($scope, $location, $route, Product ){
  console.log('DetailController init');
  $scope.data = {};
  Product.getOne({id: $route.current.params.id}).$promise.then(function(data){
   $scope.data.product = data; 
  });
}]);

