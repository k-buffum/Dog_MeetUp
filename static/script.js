
function initMap() {
	var map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: -34.397, lng: 150.644},
		scrollwheel: false,
		zoom: 13
	});

	var infoWindow = new google.maps.InfoWindow({map: map});

	// HTML5 geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent("Location spotted.");
			map.setCenter(pos);

		}, function() {
			locationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		locationError(false, infoWindow, map.getCenter());
	}
}


function locationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
				'Error: The we were unable to fetch your location.':
				'Error: Your browser doesn\'t support geolocation.');
}


function findDogParks () {
	navigator.geolocation.getCurrentPosition(function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		$.getJSON("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&type=park&key=AIzaSyCH-nHN7w5zeHRSlPzCRN8MYuL6XfaJlkY", function(data) {
			console.log(data);
		});		
	});
}



