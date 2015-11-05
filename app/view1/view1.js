'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Home', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.factory('MainService', ['$http', function($http) {
  var service = {};
  service.printOnConsole = function() {
    console.log("Printing!!");
  };
  service.getDataFronUrl = function(url) {
    return $http.get(url);
  };
  return service;
}])
.controller('View1Ctrl', ['$scope', 'MainService', function($scope, service) {
      $scope.url= "https://search-turingvr-ksoyyoputdilin32nq4p5wkg3q.us-west-2.es.amazonaws.com/library/_search";
      $scope.num=5;
      $scope.items = [];
      $scope.buttonClicked = function() {
        //$scope.num++;
        //service.printOnConsole();
        $scope.items = [];
        service.getDataFronUrl($scope.url)
            .success(function(response) {
              $scope.json = response;
              constructObject();
            });
      }

      function constructObject() {
        var number = $scope.json._shards.successful;
        var items = $scope.json.hits.hits;
        angular.forEach(items, function(item){
          var id = item._id;
          var index = item._index;
          var score = item._score;
          var price = parseInt(item._source.price);
          var title = item._source.title;
          var obj = {
            id:id,
            index:index,
            score: score,
            price:price,
            title:title
          };
          $scope.items.push(obj);
        });
      }
}]);
