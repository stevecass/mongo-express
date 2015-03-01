angular.module('products', ['ngResource', 'ngRoute']);

angular.module('products'). config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/main', {templateUrl: 'views/list.html', controller: 'MainController'});
    $routeProvider.when('/detail/:id', {templateUrl: 'views/show.html', controller: 'DetailController'});
    $routeProvider.when('/edit/:id', {templateUrl: 'views/form.html', controller: 'MainController'});
    $routeProvider.when('/new', {templateUrl: 'views/form.html', controller: 'MainController'});
    $routeProvider.otherwise({redirectTo: '/main'});

}]);

angular.module('products'). factory('Product', ['$resource', function($resource){
  return $resource('/api/products/:id', {}, {
    query: {method:'GET', isArray:true},
    getOne: {method:'GET', params:{id:''}, isArray:false},
    post: {method:'POST'},
    update: {method:'PUT', params: {id: ''}},
    remove: {method:'DELETE', params: {id: ''}}
  });
}]);

