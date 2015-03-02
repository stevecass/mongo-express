angular.module('products'). controller('DetailController', ['$scope', '$location', '$route', 'Product', function($scope, $location, $route, Product ){
  console.log('DetailController init');
  Product.getOne({id: $route.current.params.id}).$promise.then(function(data){
   $scope.product = data; 
  });
}]);

