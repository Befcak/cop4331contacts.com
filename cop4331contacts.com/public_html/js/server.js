require("http").createServer(function (req, res) {
    // The md5 module exports the md5() function:
    var md5 = require("./md5"),
    // Use the following version if you installed the package with npm:
    // var md5 = require("blueimp-md5"),
        url  = require("url"),
        query = url.parse(req.url).query;
    res.writeHead(200, {"Content-Type": "text/plain"});
    // Calculate and print the MD5 hash of the url query:
    res.end(md5(query));
}).listen(8080, "localhost");
console.log("Server running at http://localhost:8080/");
