'use strict';

angular.module('myApp.empdetails', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/empdetails', {
    templateUrl: 'empdetails/empdetails.html',
    controller: 'EmpdetailsCtrl'
  });
}])


// EmpdetailsCtrl controller
.controller('EmpdetailsCtrl', ['$scope','$firebase',function($scope,$firebase) {

	 var firebaseObj = new Firebase("https://heal-thy.firebaseio.com/employee"); 
	var sync = $firebase(firebaseObj);
	$scope.alldata = sync.$asArray();
	
	$scope.gotomap=function(usermobilenumber){
		var urlencoded=encodeURIComponent(usermobilenumber);
		var completeurl='/app/index.html#/mapdetails?username='+urlencoded;
		console.log(completeurl);
		window.location = completeurl;
	}
	
	
}]);