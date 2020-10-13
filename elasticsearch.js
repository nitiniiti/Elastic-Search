var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    hosts: ['http://localhost:9200'],
    log: 'trace'
});

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('Cannot connect to Elasticsearch.');
    } else {
        console.log('Connected to Elasticsearch was successful!');
    }
})

module.exports = client;