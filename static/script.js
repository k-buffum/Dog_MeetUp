
var apiKey = "AIzaSyCH-nHN7w5zeHRSlPzCRN8MYuL6XfaJlkY";

// var exports = module.exports = {}
var service;
var map;
var infoWindow;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: -34.397, lng: 150.644},
		scrollwheel: false,
		zoom: 13
	});

	var pos;
	// HTML5 geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			setLocation(position);
			getParks(position);
		}, function() {
			locationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		// locationError(false, infoWindow, map.getCenter());
	}
}

function setLocation(position) {
	pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};
	infoWindow = new google.maps.InfoWindow({map: map});
	infoWindow.setPosition(pos);
	infoWindow.setContent("Location spotted.");
	map.setCenter(pos);
}

function getParks(position) {
	pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};
	
	var request = {
	    location: pos,
	    radius: '2000',
	    types: ['park']
  	};

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
    		addMarkers(results);
    	}
    });
}

function addMarkers(places) {
    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        addMarker(place);
    }
}

function addMarker(place) {
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	})
	google.maps.event.addListener(marker, 'click', function() {
		$(".parkHours").html("");
		var request = { placeId: place.place_id };
		service.getDetails(request, function(placeData, status) {
			$(".parkName").html(placeData.name);
			$('#park-name').val(placeData.name);
			$(".parkLocation").html("Address: " + placeData.formatted_address);
			$(".parkPhone").html("Phone: " + placeData.formatted_phone_number);
			$(".parkWebsite").html("Website: " + placeData.website);
			if (placeData.rating) {
				$(".parkRating").html("Rating: " + placeData.rating);
			}
			if (placeData.opening_hours && placeData.opening_hours.weekday_text) {
				$(".parkHours").html("Hours: ")
				for(var i = 0; i < placeData.opening_hours.weekday_text.length; i++) {
					$(".parkHours").append("<p>").append(placeData.opening_hours.weekday_text[i]);
				};
			}
		});
	});
}

// function showPlaceDetails(place) {
//     infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//       	'Place ID: ' + place.place_id + '<br>' +
//       	place.formatted_address + '</div>');
//     infoWindow.open(map, this);
// }

function locationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
				'Error: The we were unable to fetch your location.':
				'Error: Your browser doesn\'t support geolocation.');
}





