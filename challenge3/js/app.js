/*
app.js - application script for the movies challenge
add your code to this file
*/
'use strict';

function changeEventHandler(event) {
    var reportValue = event.target.value;
    var array;
    var title;
    if (reportValue === "star-wars") {
        title = "Just Star Wars"

        array = MOVIES.filter(function(obj) {
            return (obj.title.toLowerCase().indexOf("star wars") >= 0); //returns true if title contains the phrase 'star wars', case insensitive
        });

        array.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });

        buildReport(array, title);
    } else if (reportValue === "20th") {
        title = "20th Century Movies";

        array = MOVIES.filter(function(obj) {
            return (moment(obj.released).year() < 2000);
        });

        array.sort(function(a, b) {
            var diff = moment(a.released).diff(moment(b.released));
            var yearDiff = moment(a.year).diff(moment(b.year));
            if (diff < 0) {
                return -1;
            } else if (diff > 0) {
                return 1;
            } else {
                if (yearDiff < 0) {
                    return -1;
                } else if (yearDiff > 0) {
                    return 1;
                } else {
                    return diff;
                }
            }
        });

        buildReport(array, title);
        
    } else if (reportValue === "avg-by-genre") {
        title = "Average Sales By Genre"

        array = MOVIES.filter(function(obj) { //filters out any movies without genre's
            return obj.genre.length > 0;
        });

        var genreObj = {}; //an object storing a map with the genre name being the key, and the value being an array of [total sales, number of movies]
        for (var movie in array) {
            var movie = array[movie];
            var genre = movie.genre;
            if (genre in genreObj) {
                var key = genreObj[genre];
                genreObj[genre] = [key[0] + movie.sales, key[1] + 1]; //
            } else {
                genreObj[genre] = [movie.sales, 1];
            }
        }
        
        var newArray = []; //a new array, containing an object for each genre that includes its average sales 
        var genres = Object.keys(genreObj);
        for (var key in genres) {
            var name = genres[key];
            var obj = {Genre: name, avg: (genreObj[name][0] / genreObj[name][1])};
            newArray.push(obj);
        }
        
        newArray.sort(function(a, b) {
            if (a.avg > b.avg) {
                return -1;
            } else if (a.avg < b.avg) {
                return 1;
            } else {
                return 0;
            }
        });

        buildReport(newArray, title);

    } else if (reportValue === "top-by-tickets") {

        title = "Top 100 Movies by Tickets Sold";

        array = MOVIES.filter(function(obj) {
            return obj.tickets > 0;
        });

        var movObj = {}; //an object storing a map with the movie title + release date as key, with a value being an array with the title alone and the total tickets sold
        for (var movie in array) {
            var movie = array[movie];
            var code = movie.title.concat(moment(movie.released).toString());
            if (code in movObj) {
                movObj[code] = [movie.title, movObj[code][1] + movie.tickets];
            } else {
                movObj[code] = [movie.title, movie.tickets];
            }
        }
        
        var newArray = []; //a new array, meant to contain objects for each movie along with its total ticket sales
        var codes = Object.keys(movObj);
        for (var key in codes) {
            var obj = {Title: movObj[codes[key]][0], sum: movObj[codes[key]][1]};
            newArray.push(obj);
        }

        //sorts new array by highest amount of tickets sold
        newArray.sort(function(a, b) {
            if (a.sum > b.sum) {
                return -1;
            } else if (a.sum < b.sum) {
                return 1;
            } else {
                return 0;
            }
        });

        var finalArray = [];
        for (var i = 0; i < 100; i++) {
            var tempObj = newArray.shift();
            finalArray.push(tempObj);
        }
        buildReport(finalArray, title);
    }
}

//injects a level 2 heading into the page based on the string that is passed
function heading(title) {
    var reportSpace = document.querySelector("#report");
    var h2 = document.createElement("h2");
    h2.textContent = title;
    reportSpace.appendChild(h2);
}

//builds a table to report the data inside the array that is passed
function buildReport(array, title) {
    var reportSpace = document.querySelector("#report");
    reportSpace.innerHTML = "";
    
    heading(title);

    var table = document.createElement("table");
    var tBody = document.createElement("tbody");
    var tHead = document.createElement("thead");
    var tHeadRow = document.createElement("tr");
    var properties = Object.keys(array[0]);

    for (var key in properties) {
        var col = document.createElement("th");
        col.textContent = properties[key];
        if (properties[key] === "avg") {
            col.textContent = "Average";
        } else if (properties[key] === "sum") {
            col.textContent = "Tickets Sold";
        }
        tHeadRow.appendChild(col);
    }

    for (var movie in array) {
        var movie = array[movie];
        var tr = document.createElement("tr");
        var movKeys = Object.keys(movie);

        for (var key in movKeys) {
            var prop = movKeys[key];
            var value = movie[prop];
            if (prop === "released") {
                value = moment(value).format('L')
            } else if (prop === "sales") {
                value = numeral(value).format('$0,0[.]00');
            } else if (prop === "tickets") {
                value = numeral(value).format('0,0');
            } else if (prop === "avg") {
                value = numeral(value).format('$0,0.00');
            }
            var td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        }

        tBody.appendChild(tr);
    }


    tHead.appendChild(tHeadRow);
    table.appendChild(tHead);
    table.appendChild(tBody);
    reportSpace.appendChild(table);

}

