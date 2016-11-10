var http = require("http");


var server = http.createServer(function(request, response) {
  if (request.url === '/script.js') {
    response.writeHead(200, {"Content-Type": "application/javascript"});
    response.write(`
    var ele = document.getElementById("button");
      ele.addEventListener("click", generateFizzBuzz, false);
      var values = [];
      //--The FizzBuzz logic
      function generateFizzBuzz() {
        for (var i = 1; i <= 100; i++) {
          if (i % 3 === 0 && i % 5 === 0) {
            values.push("FizzBuzz");
          } else if (i % 3 === 0) {
            values.push("Fizz"); 
          } else if (i % 5 === 0) {
            values.push("Buzz");  
          } else {
            values.push(i);
          }
        }
        renderFizzBuzz(values);
      }
      //--

      //--Render the logic
      function renderFizzBuzz(values) {
        var node;
        var textnode;
        values.forEach(function(ele) {
          node = document.createElement("LI");
          textnode = document.createTextNode(ele);
          node.appendChild(textnode);
          document.getElementById("fuzz").appendChild(node); 
        })
      }
      //--

    `);
  } else {
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
        <script type="text/javascript" src="script.js"></script>
      </body>
    </html>`);
  }
  response.end();
});



server.listen(process.env.PORT || 80);
console.log("Server is listening");
