$(function(){
   'use strict';

  $(".btn-default").click(function(){

    // begin geocoding nightmare

    //MapQuest geocoding a little easier to use
    $.getJSON("http://www.mapquestapi.com/geocoding/v1/address?key=wmPNY9NeQMO6WMLlQnSFupekzhtiZlTw&location=" + $(".locationInput").val(), function(json){
        var latNum = json.results[0].locations[0].latLng.lat
        var longNum = json.results[0].locations[0].latLng.lng

    //use the found lat and long and use them in Google Maps' static map api
      $("#map").append(
        '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + latNum + ',' + longNum + '&zoom=14&size=420x280&key=AIzaSyB76RrlbvbkCXkPOgP8puUTvHDDFeZsIpA" alt="Appointment location" width="90%"></img>'
      ) //closes append
    }); //closes .getJSON mapquest
    //end geocoding nightmare

    //pulls from Open Movie Database
    $.getJSON("http://www.omdbapi.com/?t=" + $(".movieInput").val() + "&y=&plot=short&r=json", function(json) {
      $(".poster").html('<img src =' + json.Poster + ' width = 200px></img>');
      $(".rating").html("Rating: " + json.imdbRating);
    });
  });
});
