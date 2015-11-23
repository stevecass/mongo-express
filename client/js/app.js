angular.module('products', ['ngResource', 'ngRoute']);

angular.module('products').config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/main', {templateUrl: 'views/list.html', controller: 'MainController', open:true});
    $routeProvider.when('/detail/:id', {templateUrl: 'views/show.html', controller: 'DetailController'});
    $routeProvider.when('/edit/:id', {templateUrl: 'views/form.html', controller: 'FormController'});
    $routeProvider.when('/new', {templateUrl: 'views/form.html', controller: 'FormController'});
    $routeProvider.when('/login', {templateUrl: 'views/login.html', controller: 'LoginController', open:true});
    $routeProvider.when('/logout', {templateUrl: 'views/login.html', controller: 'LoginController', open:true});
    $routeProvider.otherwise({redirectTo: '/main'});
}]);

angular.module('products').run(['$rootScope', '$location', 'User', 'Shared',
    function ($rootScope, $location, User, Shared) {
      /* Client-side security. Server-side framework MUST add it's
      own security as well since client-based “security” is easily hacked
      */
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!(next.$$route.open || Shared.currentUser)) {
          $rootScope.$evalAsync(function () {
            // send to login page
            $location.path('/login');
          });
        }
      });

}]);