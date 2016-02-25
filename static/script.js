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
	    radius: '5000',
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
			// console.log(placeData.place_id);
			$('#park-name').val(placeData.name);
			$('#park-id').val(placeData.place_id);
			console.log($("#park-id").val());

			$(".parkName").html(placeData.name);
			$(".parkLocation").html("Address: " + placeData.formatted_address);
			$(".parkPhone").html("Phone: " + placeData.formatted_phone_number);
			$(".parkWebsite").html("Website: " + placeData.website);

			if (placeData.rating) {
				$(".parkRating").html("Rating: ")
				for (var i = 0; i < placeData.rating; i++) {
					$(".parkRating").append("<i class='glyphicon glyphicon-star'></i>");
				}
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

function locationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
				'Error: The we were unable to fetch your location.':
				'Error: Your browser doesn\'t support geolocation.');
}

// Sets up graph to display current information
$(document).ready(function() {
	$.ajax("/api/schedule")
	.done(function(data) {
		var ctx = document.getElementById("myChart").getContext("2d");
		var time = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00"];
		var numDogs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		
		for (var i = 0; i < data.length; i++) {
			if (data[i].time < "07:00:00") {
				// Avoids have to do 2 checks in each if(data[i].time > "07:00:00")
			} else if (data[i].time < "08:00:00") {
				numDogs[0] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "09:00:00") {
				numDogs[1] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "10:00:00") {
				numDogs[2] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "11:00:00") {
				numDogs[3] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			}  else if (data[i].time < "12:00:00") {
				numDogs[4] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "13:00:00") {
				numDogs[5] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "14:00:00") {
				numDogs[6] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "15:00:00") {
				numDogs[7] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			}  else if (data[i].time < "16:00:00") {
				numDogs[8] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "17:00:00") {
				numDogs[9] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "18:00:00") {
				numDogs[10] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			} else if (data[i].time < "19:00:00") {
				numDogs[11] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			}  else if (data[i].time < "20:00:00") {
				numDogs[12] += data[i].smallDogs + data[i].mediumDogs + data[i].largeDogs;
			}
		}

		var dogs = {
			label: "dogs",
			fillColor: "rgba(255, 121, 44, 0.4)",
			strokeColor: "rgba(255, 121, 44, 0.8)",
			highlightFill: "rgba(255, 121, 44, 0.75)" ,
			highlightStroke: "rgba(255, 121, 44, 1)",
			data: numDogs
		}

		var chartData = {
			labels: time,
			datasets: [dogs]
		};
		var myBarChart = new Chart(ctx).Bar(chartData, {
		   tooltipTemplate: "Dogs: <%= value %>"
		});
	});	
});






