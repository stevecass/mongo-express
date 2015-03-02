angular.module('products'). controller('FormController', 
  ['$scope', '$location', '$route', 'Product', function($scope, $location, $route, Product ){
  console.log('FormController init');
  

  if($location.url() === '/new') {
    $scope.product = {};
    $scope.mainHeader = "Create Product";
    $scope.product.is_new = true;
  } else {
    p = Product.getOne({id: $route.current.params.id});
    p.$promise.then(function(data){
      $scope.product = data; 
      $scope.mainHeader = "Edit Product " + $scope.product.name;
    });
  }

  console.log($location.url());

  $scope.saveProduct = function() {
    var retval;
    if ($scope.product.is_new) {
      retval = Product.post($scope.product);
    } else {
      console.log('product', $scope.product);
      retval = Product.update($scope.product);
    }
    retval.$promise.then(function(data){
      console.log(data);
    });
    retval.$promise.catch(function(data){
      console.error('HTTP call failed', data);
    });

  };

}]);

