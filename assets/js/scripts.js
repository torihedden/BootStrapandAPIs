$(function(){
   'use strict';

   var locationInput = $("input").val();
   console.log(locationInput);
   //for some reason it doesn't seem to like the locationInput variable
   //
  //  $.getJSON("https://api.yelp.com/v2/search/?location=" + locationInput + "&sort=1&limit=3&category_filter=icecream", function(json) {
  //    console.log("locationInput");
  //  });

//append the results of the query to three divs
//index 0, then index 1, then index 2
//will they be removed from the page if you hit refresh?
//or give user an option to clear the old search and

});
