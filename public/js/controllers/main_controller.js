angular.module('products'). controller('MainController', ['$scope', '$location', 'Product', function($scope, $location, Product ){
  console.log('MainController init');
  $scope.data = {};

  Product.query().$promise.then(function(data){
    $scope.data.products = data;
  });

  $scope.showOne = function(id) {
    console.log('show one called for:' + id);
    $location.path('/detail/' + id);
  };

  $scope.deleteOne = function(id) {
    Product.remove({id: id}).$promise.then(function(data){
     $scope.data.products = $scope.data.products.filter(function(ele){
      console.log(ele._id + " " + id);
      return ele._id !== id;
     }); 
    });
  };

}]);

