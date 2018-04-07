//Takes informatino from dotenv and applies it to my keys and keeps them on my local drive
require("dotenv").config();

//puts all the api keys into a variable that can be accessed through dot notation
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var Request = require("request");
var clientTwitter = new Twitter(keys.twitter);
var clientSpotify = new Spotify(keys.spotify);
var movieName = "";
var fs = require("fs");
//Check to see if all the keys are being read correctly
//console.log(keys.spotify.id);
//console.log(keys.spotify.secret);
//console.log(keys.twitter.consumer_key);
//console.log(keys.twitter.consumer_secret);
//console.log(keys.twitter.access_token_key);
//console.log(keys.twitter.access_token_secret);

//Puts the users command into a usable variable and stores it as a STRING
var userInput = process.argv[2];
var userInputSong = process.argv.slice(3).join(" ") || "Killer Queen";

//Reading the command `my-tweets`
if (userInput === "my-tweets"){
    var params = {screen_name: 'cameronjohnell1'};
    clientTwitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        for (var i = 0; i < 19; i++) {
        console.log(tweets[i].text);
        };
        };
    });


};

//Reading the command `sporify-this-song`
if (userInput === "spotify-this-song") {
    console.log(userInputSong);
    clientSpotify.search({ type: 'track', query: userInputSong }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
    

    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name); 
    console.log("Song Link: " + data.tracks.items[0].external_urls.spotify);
    });
};

//Reading the command `movie-this`
if (userInput === "movie-this") {
      movieName = process.argv.slice(3).join(" ") || "S.W.A.T.";
      var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
      console.log(queryUrl);
      Request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
      
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomates Rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country Produced In: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
        }
      });
};

//Reading the command `do-what-it-says`
if (userInput === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        userInput = data.slice(0, 17)
        console.log(userInput);
        userInputSong = data.slice(19, 37);
        console.log(userInputSong);

        clientSpotify.search({ type: 'track', query: userInputSong }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        
    
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name); 
        console.log("Song Link: " + data.tracks.items[0].external_urls.spotify);
        });
    });
};






