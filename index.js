var elasticSearchClient = require('./elasticsearch');
var indexes = require("./indexing");
var bodyParser = require('body-parser')
var express = require("express");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post("/user", (req, res) => {
    console.log("Indexes", indexes);
    let body = req.body;
    elasticSearchClient.index({
        index: 'user',
        type: 'users',
        body: body
    }, function (err, resp, status) {
        console.log(resp);
        res.send("Successfully indexed");
    });
});

app.post("/asset", (req, res) => {
    console.log("Indexes", indexes);
    let body = req.body;
    elasticSearchClient.index({
        index: 'asset',
        type: 'assets',
        body: body
    }, function (err, resp, status) {
        console.log(resp);
        res.send("Successfully indexed");
    });
});


app.get("/user/:search", (req, res) => {
    let search = req.params.search;

    // let query = {
    //     match: {
    //         "PostName": search
    //     }
    // }

    // let query = {
    //     "match_phrase": {
    //         "PostName": search
    //     }
    // }

    // let query = {
    //     "wildcard": {
    //         "userName": "*" + search + "*"
    //     }
    // }

    let query = {
        "query_string": {
            "query": "*" + search + "*",
            "fields": ["userName", "Phone", "Address"]
        }
    }

    elasticSearchClient.search({
        index: 'user',
        type: 'users',
        body: {
            query: query
            // query: { wildcard: { "PostBody": search } }
        }
    }).then(function (resp) {
        let hits = resp.hits.hits;
        console.log("response ===>", hits);
        res.send(hits);
    }).catch((err) => {
        console.log("Error", err);
    });
});


app.get("/asset/:search", (req, res) => {
    let search = req.params.search;

    // let query = {
    //     match: {
    //         "PostName": search
    //     }
    // }

    // let query = {
    //     "match_phrase": {
    //         "PostName": search
    //     }
    // }

    // let query = {
    //     "wildcard": {
    //         "asset": "*" + search + "*"
    //     }
    // }

    let query = {
        "query_string": {
            "query": "*" + search + "*",
            "fields": ["asset", "type", "Price"]
        }
    }

    elasticSearchClient.search({
        index: 'asset',
        type: 'assets',
        body: {
            query: query
            // query: { wildcard: { "PostBody": search } }
        }
    }).then(function (resp) {
        let hits = resp.hits.hits;
        console.log("response ===>", hits);
        res.send(hits);
    }).catch((err) => {
        console.log("Error", err);
    });
})


app.listen("3000", () => {
    console.log("Server listening on port - 3000");
})

