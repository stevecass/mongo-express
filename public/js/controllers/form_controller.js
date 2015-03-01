angular.module('products'). controller('FormController', 
  ['$scope', '$location', 'Product', function($scope, $location, Product ){
  console.log('FormController init');

  $scope.product = {};
  $scope.product.is_new = $location.url() === '/new';

  console.log($location.url());

  $scope.saveProduct = function() {
    var retval;
    if ($scope.product.is_new) {
      retval = Product.post($scope.product);
    } else {
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

