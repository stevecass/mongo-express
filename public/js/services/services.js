angular.module('products'). factory('Product', ['$resource', function($resource){
  return $resource('/api/products/:id', {id: '@_id'}, {
    query: {method:'GET', isArray:true},
    getOne: {method:'GET', isArray:false},
    post: {method:'POST'},
    update: {method:'PUT' },
    remove: {method:'DELETE'}
  });
}]);

angular.module('products'). factory('Shared', [function($resource){
    return {};
}]);
