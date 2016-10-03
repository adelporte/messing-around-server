var http = require("http");

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(`<!DOCTYPE 'html'>
    <html>
      <head>
        <title>Hello World Page</title>
      </head>
      <body>
        <ul id='fuzz'>
        </ul>

        <button id='button'>CLICK</button>

      </body>

      <script type='text/javascript' src='script.js'></script>
    </html>`);
  response.end();
});



server.listen(process.env.PORT || 80);
console.log("Server is listening");
