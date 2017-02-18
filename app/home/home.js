'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$firebaseSimpleLogin','$location',function($scope,$firebaseSimpleLogin,$location) {
  var firebaseObj = new Firebase("https://heal-thy.firebaseio.com/");
var loginObj = $firebaseSimpleLogin(firebaseObj);
  
  $scope.user = {};
  $scope.SignIn = function(e){ 
     e.preventDefault();
     var username = $scope.user.email;
     var password = $scope.user.password;
     loginObj.$login('password', {
                email: username,
                password: password
            })
            .then(function(user) {
                //Success callback
                console.log('Authentication successful');
				 $location.url('/addemp');
            }, function(error) {
                //Failure callback
                console.log('Authentication failure');
            });
  }
}]);
