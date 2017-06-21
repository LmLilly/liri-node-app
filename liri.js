/*At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
Make it so liri.js can take in one of the following commands:
my-tweets
spotify-this-song:(Artist(s),The song's name, A preview link of the song from Spotify,The album that the song is from
movie-this
do-what-it-says*/
"use strict";

(function(){

var actionType = process.argv[2]
var searchTerm = process.argv[3]

var keys = require('./keys');
var request = require('request')
var fs = require("fs");
var exec = require('child_process').exec;
var Spotify = require('node-spotify-api');

//hey i want to access the keys!)
switch(actionType) {
    case "my-tweets":
    console.log("my-tweets");
      
        break;
    case "spotify-this-song":

    console.log("spotify-this-song");
    var spotify = new Spotify({id: "f3def5c7d1ad4b289d9c1022ffaad070", secret: "63aad47916024a6c91753ddf1e8a5b18"});

    spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
    if (err) {
    return console.log('Error occurred: ' + err);
} 
        console.log("Artists: " + data.tracks.items[0].artists[0].name);
        console.log("The song's name:" + data.tracks.items[0].name);
        console.log("Preview link of the song from Spotify: "+ data.tracks.items[0].preview_url);
        console.log("Album where the song is from: "+ data.tracks.items[0].album.name);
    });
        
        break;
    case "movie-this":
         if (typeof searchTerm === "undefined"){
            request("http://www.omdbapi.com/?t="+encodeURI("Mr. Nobody")+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
            
        console.log("If you haven't watched Mr. Nobody,then you should: http://www.imdb.com/title/tt0485947/")})
        }
        else {
        request("http://www.omdbapi.com/?t="+encodeURI(searchTerm)+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie title is: "+JSON.parse(body).Title);
            console.log("The year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).Rated);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie:" + JSON.parse(body).Language);
            console.log("Plot of the movie: "+JSON.parse(body).Plot);
            console.log("Actors in the movie: "+JSON.parse(body).Actors);
        }
        });
        }

    console.log("movie-this");
        
        break;
    case "do-what-it-says":
    console.log("do-what-it-says");
      fs.readFile("random.txt", "utf8", function(err, data) {
          console.log(data);
    if (err) {
      return console.log(err);
    }
	data = data.split(",");
	    var cmd = "node liri " + data[0] + " " + data[1]
		console.log(cmd)
			exec(cmd, function(error, stdout, stderr) {
			console.log(stdout);
				});



 
  });
        
        break;
    default:

}
})();