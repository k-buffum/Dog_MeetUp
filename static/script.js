
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


$(document).ready(function() {
	$.ajax("/api/schedule")
	.done(function(data) {
		console.log(data);
		var ctx = document.getElementById("myChart").getContext("2d");
		var time = data.map(function(schedule) {
			return schedule.time;
		});
		var smallDogs = {
			label: "Small Dogs",
			fillColor: "rgba(255, 121, 44, 0.4)",
			strokeColor: "rgba(255, 121, 44, 0.8)",
			highlightFill: "rgba(255, 121, 44, 0.75)" ,
			highlightStroke: "rgba(255, 121, 44, 1)",
			data: data.map(function(schedule) {
				return schedule.smallDogs;
			})
		}
		var mediumDogs = {
			label: "Medium Dogs",
			fillColor: "rgba(73, 121, 44, 0.4)",
			strokeColor: "rgba(73, 121, 44, 0.8)",
			highlightFill: "rgba(73, 121, 44, 0.75)",
			highlightStroke: "rgba(73, 121, 44, 1)",
			data: data.map(function(schedule) {
				return schedule.mediumDogs;
			})
		}
		var largeDogs = {
			label: "Large Dogs",
			fillColor: "rgba(35, 79, 126, 0.4)",
			strokeColor: "rgba(35, 79, 126, 0.8)",
			highlightFill: "rgba(35, 79, 126, 0.75)",
			highlightStroke: "rgba(35, 79, 126, 1)",
			data: data.map(function(schedule) {
				return schedule.largeDogs;
			})
		}
		var chartData = {
			labels: time,
			datasets: [smallDogs, mediumDogs, largeDogs]
		};
		var myBarChart = new Chart(ctx).Bar(chartData, {
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li style=\"background-color:<%=datasets[i].fillColor%>\"><span></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
		});
		document.getElementById("legend").innerHTML = myBarChart.generateLegend();
	});	
})




