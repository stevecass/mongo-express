angular.module('products'). controller('FormController',
  ['$scope', '$location', '$route', 'Product', 'Shared',
  function($scope, $location, $route, Product, Shared ){

  function Feedback(type, message) {
    this.type = type;
    this.message = message;
    this.createdAt = new Date();
  }

  function newProduct() {
    $scope.mainHeader = "Create Product";
    $scope.product = {};
    $scope.product.is_new = true;
    Shared.product = null;
  }

  function loadExisting() {
    var p = Product.getOne({id: $route.current.params.id}).$promise;
    p.then(function(data){
      $scope.product = data;
      Shared.product = data;
      $scope.mainHeader = "Edit Product " + $scope.product.name;
    });
    p.catch(function(error){
      console.log(error);
    });
  }

  $scope.feedback = [];

  if($location.url() === '/new') {
    newProduct();
  } else {
    loadExisting();
  }

  $scope.saveProduct = function() {
    var retval;
    if ($scope.product.is_new) {
      retval = Product.post($scope.product);
    } else {
      retval = Product.update($scope.product);
    }

    retval.$promise.then(function(data){
      $scope.feedback.unshift(new Feedback("success", "Saved " + data.name));
      if($scope.product.is_new) {
        newProduct();
      }
      console.log(data);
    });

    retval.$promise.catch(function(data){
      $scope.feedback.unshift(new Feedback("danger", "HTTP call failed: " + data.data));
      console.error('HTTP call failed', data);
    });

  };

}]);

