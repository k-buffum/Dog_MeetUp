var GooglePlaces = require('google-places');

var places = new GooglePlaces('AIzaSyCH-nHN7w5zeHRSlPzCRN8MYuL6XfaJlkY');

places.search({keyword: 'Vermonster'}, function(err, response) {
	console.log(err);
	console.log("search: ", response);

  // places.details({reference: response.results[0].reference}, function(err, response) {
  //   console.log("search details: ", response.result.website);
  //   // search details:  http://www.vermonster.com/
  // });
});