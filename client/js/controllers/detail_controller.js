angular.module('products'). controller('DetailController',
  ['$scope', '$location', '$route', 'Product', 'Shared',
  function($scope, $location, $route, Product, Shared ){
    Product.getOne({id: $route.current.params.id}).$promise
    .then(function(data){
      $scope.product = data;
      Shared.product = data;
    });

    $scope.addComment = function() {
      var newComment = {body: $scope.commentBody, date: new Date()};
      $scope.product.comments.push(newComment);

      Product.update($scope.product).$promise
      .then(function(response) {
        $scope.product = response;
        Shared.product = response;
        $scope.commentBody = "";
      });
    };

}]);

