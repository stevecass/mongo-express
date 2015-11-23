angular.module('products')
  .controller('LoginController', ['$scope', '$http', 'Shared', 'User',
  function($scope, $http, Shared, User){
    $scope.currentUser = Shared.currentUser;

    $scope.login = function() {
      params = {username: $scope.username, password: $scope.password};
      User.login(params).$promise
      .then(function(data){
        Shared.currentUser = data;
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

