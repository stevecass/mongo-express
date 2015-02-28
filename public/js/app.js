var app = angular.module('products', ['ngResource', 'ngRoute']);

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/main', {templateUrl: 'views/list.html', controller: 'MainController'});
    $routeProvider.when('/detail/:id', {templateUrl: 'views/show.html', controller: 'DetailController'});
    $routeProvider.when('/edit/:id', {templateUrl: 'views/form.html', controller: 'MainController'});
    $routeProvider.when('/new', {templateUrl: 'views/form.html', controller: 'MainController'});
    $routeProvider.otherwise({redirectTo: '/main'});

}]);

app.factory('Product', ['$resource', function($resource){
  return $resource('/api/products/:id', {}, {
    query: {method:'GET', isArray:true},
    getOne: {method:'GET', params:{id:''}, isArray:false},
    post: {method:'POST'},
    update: {method:'PUT', params: {id: ''}},
    remove: {method:'DELETE', params: {id: ''}}
  });
}]);

app.controller('MainController', ['$scope', '$location', 'Product', function($scope, $location, Product ){
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

app.controller('DetailController', ['$scope', '$location', '$route', 'Product', function($scope, $location, $route, Product ){
  console.log('DetailController init');
  $scope.data = {};
  Product.getOne({id: $route.current.params.id}).$promise.then(function(data){
   $scope.data.product = data; 
  });
}]);

