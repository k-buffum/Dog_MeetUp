# Dog_MeetUp

Dog MeetUp was designed for dog owners who would like to socialize their dogs and know how many dogs will be at a park at a specified time. My goal is to make this a must-have tool for dog owners to socialize their dogs as well as know the number of small, medium, and large dogs coming to the park of their choosing.  Dog MeetUp was built using Node.js and Express, PostgresSQL, Google Places API, and Google Maps API.

### Wireframes, ERD, & User Stories
This project required a lot of planning and preperation to include the different features.  The link to my wireframes, erd, and user stories can be found below.
* https://docs.google.com/presentation/d/183m8taACFL1S_SShOt7fIc4eT7_A0H52Ozp0CEXhCoQ/edit?usp=sharing

### Features
* Allows users to login/register with encrypted passwords
* Users can choose a time and location they plan to be at the park
* Users can specify how many small, medium, and large dogs they plan to bring to their chosen park
* A graph displays how many dogs will be at the users chosen park at different times of the day

### Credits
* [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
* [Bootstrap](getbootstrap.com)
* [Chart.js](http://www.chartjs.org/)
* [Dog Icon](http://downloadicons.net/dog-icons?page=2)
* [Express.js](http://expressjs.com)
* [Geolocation](https://developers.google.com/maps/documentation/javascript/examples/map-geolocation)
* [Google Maps API](https://developers.google.com/maps/tutorials/fundamentals/adding-a-google-map)
* [Google Places API](https://developers.google.com/places/)
* [Heroku (for deployment)](http://heroku.com)
* [HTML5, CSS3, & JS Experiments](http://experiments.wemakesites.net/css3-rating-stars-with-selection.html)
* [jQuery](jquery.com)
* [Lorem Ipsum (for wireframe mock-up)](http://www.lipsum.com/)
* [NinjsMock](https://ninjamock.com/)
* [Node.js](http://nodejs.org)

### Known Problems
* Graph does not display number of small, medium, and large dogs
* Map search does not include most dog parks
* Database does not clear data from previous day, resulting in skewed data on the graph
* If a user selects the number of dogs on the Settings page before they select a location the page hangs