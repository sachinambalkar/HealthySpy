
angular.module('mapsApp', ['ngRoute','firebase','uiGmapgoogle-maps'])

.config(['$routeProvider','uiGmapGoogleMapApiProvider', function($routeProvider,GoogleMapApiProviders) {
  $routeProvider.when('/mapdetails', {
    templateUrl: 'mapdetails/mapdetails.html',
    controller: 'MapCtrl'
  });
  GoogleMapApiProviders.configure({
            china: true
        });
}])


.controller('MapCtrl',
  function($scope) {
    $scope.markerLat = 23.200000;
    $scope.markerLng = 79.225487;
    $scope.infoTitle = 'India';

    var india = new google.maps.LatLng($scope.markerLat, $scope.markerLng);

    var mapOptions = {
      zoom : 4,
      center : india,
      mapTypeId : google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    $scope.addMarker = function(lat, lng, title) {

      var latLang = new google.maps.LatLng(lat, lng);

      var marker = new google.maps.Marker({
        map : $scope.map,
        position : latLang,
        title : title
      });
      marker.content = '<div class="infoWindowContent">'
          + marker.title + '</div>';

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.title + '</h2>'
            + marker.content);
        infoWindow.open($scope.map, marker);
      });

      $scope.markers.push(marker);

      $scope.map.setCenter(latLang);
    };
    $scope.openInfoWindow = function(e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }
  }
);