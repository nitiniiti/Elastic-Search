var client = require("./elasticsearch");

let indexes = [];
client.indices.create({
    index: 'asset'
}, function (err, resp, status) {

    console.log("create asset", resp);

    client.indices.create({
        index: 'user'
    }, function (err, resp, status) {
        if (err) {
            console.log(err);
        } else {
            console.log("create user", resp);
        }
    });

});

module.exports = indexes;

