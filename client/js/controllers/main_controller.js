angular.module('products'). controller('MainController',
  ['$scope', '$location', 'Product', 'Shared',
  function($scope, $location, Product, Shared){
  $scope.data = {};


  Product.query().$promise.then(function(data){
    $scope.data.products = data;
    Shared.product = null;

  });

  $scope.deleteOne = function(id) {
    Product.remove({id: id}).$promise.then(function(data){
     $scope.data.products = $scope.data.products.filter(function(ele){
      return ele._id !== id;
     });
    });
  };

}]);

