angular.module('products'). controller('FormController', 
  ['$scope', '$location', '$route', 'Product', function($scope, $location, $route, Product ){
  console.log('FormController init');
  
  function newProduct() {
    $scope.mainHeader = "Create Product";
    $scope.product = {};
    $scope.product.is_new = true;
  }

  $scope.feedback = [];
  if($location.url() === '/new') {
    newProduct();
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
      $scope.feedback.push("Saved " + data.name);
      if($scope.product.is_new) {
        newProduct();
      }
      console.log(data);
    });
    retval.$promise.catch(function(data){
      $scope.feedback.push('HTTP call failed');
      console.error('HTTP call failed', data);
    });

  };

}]);

