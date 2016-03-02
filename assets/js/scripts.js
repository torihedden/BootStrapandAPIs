$(function(){
   'use strict';

  //  var locationVal = $(".locationInput").val();

   $(".locationInput").blur(function(){
     console.log($(".locationInput").val())
     $("#1").append($(".locationInput").val());
   });

   $(".movieInput").blur(function(){
     console.log($(".movieInput").val())



    $.getJSON("http://www.omdbapi.com/?t=" + $(".movieInput").val() + "&y=&plot=short&r=json", function(json) {
      $(".rating").html(json.imdbRating);
      $(".poster").html('<img src =' + json.Poster + '></img>');
    });
   });




   //for some reason it doesn't seem to like the locationInput variable



//append the first result of the query to div
//will they be removed from the page if you hit refresh?
//or give user an option to clear the old search and

});
