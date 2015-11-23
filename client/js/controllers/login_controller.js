angular.module('products')
  .controller('LoginController', ['$scope', '$http', '$location', 'Shared', 'User',
  function($scope, $http, $location, Shared, User){
    $scope.currentUser = Shared.currentUser;

    if($location.path() === '/logout') {
      Shared.currentUser = null;
      $http({method:'GET', url:'/api/logout'});
    }

    $scope.login = function() {
      params = {username: $scope.username, password: $scope.password};
      User.login(params).$promise
      .then(function(data){
        Shared.currentUser = data;
        $location.path('/main');
      })
      .catch(function(error){
        console.log('catch', error);
      });
    };

    $scope.register = function() {
      params = {username: $scope.username, password: $scope.password};
      User.post(params).$promise
      .then(function(data){
        Shared.currentUser = data;
      })
      .catch(function(error){
        console.log('caught', error);
      });
    };

  }]);

