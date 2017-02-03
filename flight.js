/*
 * This requires: restler
 * To install, type 'npm install restler'
 * Tested with node.js v0.6.14
 */

var util = require('util');
var restclient = require('restler');

var fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2/';
var username = process.env.username;
var apiKey = process.env.apiKey;
 
 
restclient.get(fxml_url + 'Arrived', {
    username: username,
    password: apiKey,
    query: {airport: 'KJFK', howMany: 10, filter: '', offset: 0}
}).on('success', function(result, response) {
    util.puts('Aircraft en route to KIAH:');
    //util.puts(util.inspect(result, true, null));
    var flights = result.ArrivedResult.arrivals;
    for (i in flights) {
      var flight = flights[i];
      //util.puts(util.inspect(flight));
      util.puts(flight.ident + ' (' + flight.aircrafttype + ')\t' + 
          flight.originName + ' (' + flight.origin + ')');
    }
    console.log(result.ArrivedResult.arrivals);
});
