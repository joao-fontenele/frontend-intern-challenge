
// dummy function that should generate a shortened url based on an integer id,
// though at the moment generates urls ramdomly
function generateShortUrl(id) {
    var n = 6;
    var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var base = alphabet.length;

    var shortUrl = "";
    for (var i = 0; i < n; i++) {
        var char = Math.floor(Math.random() * base);
        char = alphabet.charAt(char);
        shortUrl += char;
    }

    return "http://chr.dc/" + shortUrl;
}

// dummy function to return an id to be used to generate a shortened url
function getId() {
    var maxId = Math.pow(62, 6);
    return Math.floor(Math.random() * maxId);
}

// dummy function to validade a url
function isValidUrl(url) {
    if (url) {
        return true;
    }
    else {
        return false;
    }
}

// main function called to generate and show the short urls, also changes the
// #urlButton to value COPIAR.
function shortenUrl() {
    var inpt = document.getElementById("urlInput");
    var btn = document.getElementById("urlButton");

    var longUrl = inpt.value;
    if (!isValidUrl(longUrl)) {
        return;
    }

    var id = getId();
    var shortUrl = generateShortUrl(id);

    inpt.value = shortUrl;
    btn.value = "COPIAR";
}

function logArray(array) {
    for (var i in array) {
        console.log(array[i]);
    }
}

// returns the total amount of hits from the urls json
function getTotalHits(urls) {
    // get the hits of the urls to a new array
    var hits = urls.map(function (a) {
        return a.hits;
    });
    // sum the array
    var total = hits.reduce(function (a, b) {
        return a + b;
    });

    return total;
}

// returns the n links with the most hits from the urls json
function getTopN(urls, n) {
    // sort by hits in descending order
    urls.sort(function (a, b) {
        return b.hits - a.hits;
    });

    var topN = urls.slice(0, n);

    return topN;
}

// based on the json urls, fills the linksList div with the links with the 
// top n of links with the most hits
function fillTopN(urls, n) {
    var topN = getTopN(urls, n);

    var list = document.getElementById("linksList");

    // remove all the children of the linksList
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // add the topN to the list
    for (var i in topN) {
        var shortUrl = topN[i].shortUrl;
        var hits = topN[i].hits;
        var item = "<div class='linkItem box'><a href='" + shortUrl +
                "'>" + shortUrl + "</a> <span class='supportText'>" +
                hits + "</span></div><br>";
        list.innerHTML += item;
    }
}

$(document).ready(function () {
//    var requestUrl = "https://github.com/chaordic/frontend-intern-challenge/blob/master/Assets/urls.json";
    var requestUrl = "../Assets/urls.json";
    $.getJSON(requestUrl, function (urls) {
        fillTopN(urls, 5);

        var totalHits = getTotalHits(urls);

        var hitsBox = document.getElementById("hitsBox");
        hitsBox.innerHTML = Number(totalHits).toLocaleString();
    });

    $("#urlButton").click(function () {
        var content = document.getElementById("urlButton").value;

        if (content === "ENCURTAR") {
            shortenUrl();
        }
    });
});
