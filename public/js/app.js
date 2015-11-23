angular.module('products', ['ngResource', 'ngRoute']);

angular.module('products'). config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/main', {templateUrl: 'views/list.html', controller: 'MainController'});
    $routeProvider.when('/detail/:id', {templateUrl: 'views/show.html', controller: 'DetailController'});
    $routeProvider.when('/edit/:id', {templateUrl: 'views/form.html', controller: 'FormController'});
    $routeProvider.when('/new', {templateUrl: 'views/form.html', controller: 'FormController'});
    $routeProvider.when('/login', {templateUrl: 'views/login.html', controller: 'LoginController'});
    $routeProvider.when('/logout', {templateUrl: 'views/login.html', controller: 'LoginController'});
    $routeProvider.otherwise({redirectTo: '/main'});

}]);

