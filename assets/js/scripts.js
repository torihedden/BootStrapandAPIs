$(function(){
   'use strict';

  $(".btn-default").click(function(){

    //based on work found at
    //https://github.com/jvojens2/frontend-nanodegree-neighborhood-map/commits/master/js
    //Generates a random number and returns it as a string for OAuthentication
    function generateNonce() {
      return (Math.floor(Math.random() * 1e12).toString()); //generate a string of 12 random integers
    }

    var yelpURL = "https://api.yelp.com/v2/search";

     var parameters = { //creating an object named parameters
      oauth_consumer_key: "g3Vc0i-t2OSkCR7EJil4BA",//string of my key
      oauth_token: "fleF0r8Gplfv3O3nhLze86d3cb4VfUl2",//string of my token
      oauth_nonce: generateNonce(), //our random string of integers
      oauth_timestamp: Date.now(), //number of milliseconds since epoch
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version : '1.0',
      callback: 'cb',              // This is crucial to include for jsonp implementation in
                                   // AJAX or else the oauth-signature will be wrong.

      location : $(".locationInput").val(), //sometimes APIs can handle spaces in query parameters, sometimes not?
      category_filter : "icecream" //no comma after last element in objects
     };

     var httpMethod = "GET" //the default method, but I do want to GET
     var signature = oauthSignature.generate(httpMethod, yelpURL, parameters, "Lf8cDR-znysz3FbH568hkU0DgR4", "ocrgkTuMrhpf2y9r5hFZR5N3U5I", { encodeSignature: false}); //this generates (fxn defined by oauth-signature.js) the oauthSignature
    parameters.oauth_signature = signature; //adds a new property of the object "parameters", whose value is
                                                  //signature, defined above

    $.ajax({
      dataType: 'jsonp',   //$.ajax() takes one parameter, [settings]   //also jsonp is json with padding
      url: yelpURL,
      method: 'GET', // This is the default, but I thought I'd show it
      data: parameters,
      cache: true //This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
    }).done(function (result) {   //.done is from lecture notes. denotes end of ajax call completion
      console.log(result);

      $("#icecream-shops").html("");
      for ( var i = 0; i < 3; i++){
        $("#icecream-shops").append('<a href =' + result.businesses[i].url + '>' + result.businesses[i].name + '</a>');
        $("#icecream-shops").append(": " + result.businesses[i].rating + " / 5 <br>");
      }
    });


    //pulls from Open Movie Database
    $.getJSON("http://www.omdbapi.com/?t=" + $(".movieInput").val() + "&y=&plot=short&r=json",
      function(json) {
        $(".poster").html('<img src =' + json.Poster + ' width = 200px></img>');
        $(".rating").html("Rating: " + json.imdbRating + " / 10");
      });
  });
});




// // begin geocoding nightmare
//
// //MapQuest geocoding a little easier to use
// $.getJSON("http://www.mapquestapi.com/geocoding/v1/address?key=wmPNY9NeQMO6WMLlQnSFupekzhtiZlTw&location=" + $(".locationInput").val(), function(json){
//     var latNum = json.results[0].locations[0].latLng.lat
//     var longNum = json.results[0].locations[0].latLng.lng
//
// //use the found lat and long and use them in Google Maps' static map api
//   $("#map").append(
//     '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + latNum + ',' + longNum + '&zoom=14&size=420x280&key=AIzaSyB76RrlbvbkCXkPOgP8puUTvHDDFeZsIpA" alt="Appointment location" width="90%"></img>'
//   ) //closes append
// }); //closes .getJSON mapquest
// //end geocoding nightmare
