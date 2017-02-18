'use strict';

angular.module('myApp.addemp',['ngRoute','firebase'])

.config(['$routeProvider',function($routeProvider){	
	$routeProvider.when('/addemp',{
		templateUrl:'addemp/addemp.html',
		controller:'AddempCtrl'
	})
}])

.controller('AddempCtrl',['$scope','$firebase','$location',function($scope,$firebase,$location){
	
	var firebaseObj = new Firebase("https://heal-thy.firebaseio.com/"); 
	var fb = $firebase(firebaseObj);
	fb.$ref('employee');
	$scope.add=function(){		
						
	  firebaseObj.child("employee").once('value', function(snapshot) {		  
			if(snapshot.hasChild($scope.mobilenumber)){				
				$scope.status="Already Exist";				
			}else{
				processtoadd();				
			}			
		});	
	}
	function processtoadd(){
	
	firebaseObj.child('/employee/' + $scope.mobilenumber)
			.set({ name: $scope.empname, address : $scope.address },
			function(error) {
					  if (error) {
						$scope.status="Failed";				
					  } else {						
						window.location = "/app/index.html#/empdetails";
						$scope.status="Added successfully";				
					  }
					    $scope.mobilenumber='';
						$scope.empname='';
						$scope.address='';
					});				
				
	}
	
}]);