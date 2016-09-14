// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        // r is the http request response
        return fetch(url).then(r => {
                // parse the json
                return r.json().then(json =>{
                    //map store the result
                    var map = {};
                    var articles = json.articles
                    articles.forEach(a => {
                        map[a._id] = a.text.split(' ').length
                    })
                    //return the result
                    return map
                })
        })
    }

    function countWordsSafe(url) {
        // r is the http request response
        return fetch(url).then(r => {
            if(r.ok){
                // parse the json
                return r.json().then(json =>{
                    var map = {};
                    var articles = json.articles
                    articles.forEach(a => {
                        map[a._id] = a.text.split(' ').length
                    })
                    return map
                })
            } else {
                throw new Error("Bad URL")
            }
        }).catch(e => {
            // return an empty map
            return {};
        })
    }

    function getLargest(url) {
        // r is the http request response
        return fetch(url).then(r => {
                // parse the json
                return r.json().then(json =>{
                    var max = 0;
                    var maxID = "";
                    var articles = json.articles
                    articles.forEach(a => {
                        var count = a.text.split(' ').length;
                        if(count > max){
                            max = count
                            maxID = a._id
                        }
                    })
                    // transfer the result into a string
                    return maxID + ""
                })
        })
    }

    exports.inclass = {
        author: "Zhou Liu",
        countWords, countWordsSafe, getLargest
    }

})(this);
