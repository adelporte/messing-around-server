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

      <script>
        var ele = document.getElementById("button");
        ele.addEventListener("click", printIt, false);
        function printIt() {
         var node;
         var textnode;
         for (var i = 1; i <= 100; i++) {
           node = document.createElement("LI");
          if (i % 3 === 0 && i % 5 === 0) {
           textnode = document.createTextNode("FizzBuzz");  
          } else if (i % 3 === 0) {
           textnode = document.createTextNode("Fizz");  
          } else if (i % 5 === 0) {
           textnode = document.createTextNode("Buzz");  
          } else {
           textnode = document.createTextNode(i);  
          }
          node.appendChild(textnode);
          document.getElementById("fuzz").appendChild(node); 
         }
        };
      </script>
    </html>`);
  response.end();
});



server.listen(process.env.PORT || 80);
console.log("Server is listening");
