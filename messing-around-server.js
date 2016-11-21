var http = require("http");

var server = http.createServer(function(request, response) {
  
  /*--The FizzBuzz logic
      function generateFizzBuzz() {
        var values = [];
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
        return values;
      }

      var values = generateFizzBuzz();
      //var valuesJSON = JSON.stringify(values);
      */

if (request.url === '/json.json') {

  //--Get the limitvalue via AJAX
  function getBody(request, callback) {
      var result;
      if (request.method == 'POST') {
          var jsonString = '';

          request.on('data', function (data) {
              jsonString += data;
          });

          request.on('end', function () {
              result = JSON.parse(jsonString);
              callback(result);
          });
      }
  }
  //--

  //--The FizzBuzz logic
  function generateFizzBuzz(limitValue) {
    var values = [];

    for (var i = 1; i <= limitValue; i++) {
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
    return values;
  }
  //--

  getBody(request, function(res) {
     
     var limitValue = res;
     var values = generateFizzBuzz(limitValue);
     console.log(values, 'in getbody')

     response.writeHead(200, {"Content-Type": "application/json"});

     values = JSON.stringify({ 
        values
      });
      console.log(values, 'when stringified')

      response.end(values);
      
  });  
  
} else if (request.url === '/script.js') {
    response.writeHead(200, {"Content-Type": "application/javascript"});
    //response.write("values = " + valuesJSON);
    response.write(`
      var ele = document.getElementById("button");     
      ele.addEventListener("click", clickEventHandler, false);

      //--The doer function
      function clickEventHandler() {
        getTheInput();
      }
      //--

      function getTheInput() {
        var userInput = $('input').val();

        $.ajax({
                type: 'POST',
                data: JSON.stringify(userInput),
                url: '/json.json',                      
                success: renderFizzBuzz(),
                error: function(error) {
                    console.log("some error in fetching the notifications");
                    console.log(error);
                }

            });
      }

      //--Make the AJAX call and call the render function
      function renderFizzBuzz() {

      var values;
      //AJAX call
      $.ajax({
          url:'/json.json',
          //If success
          success : function (result) {
            values = result.values;
            generateHTML(values);
          },
          //If error
          error : function (error) {
            console.log('THERE WAS AN ERROR IN THE AJAX CALL')
            console.log(error);
          }
        });

      }
      //--

      //--Render the HTML
      function generateHTML(values) {
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

  } else if (request.url === '/') {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(`<!DOCTYPE 'html'>
    <html>
      <head>
        <title>Hello World Page</title>
        <script src="https://code.jquery.com/jquery-3.1.1.js" integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA=" crossorigin="anonymous"></script>
      </head>
      <body>
        <ul id='fuzz'>
        </ul>

        <form>
          <input type="number" name="fizzBuzzLimit" placeholder="Please, specify a limit">
        </form>

        <button id='button'>CLICK</button>
        <script type="text/javascript" src="script.js"></script>
      </body>
    </html>`);
  } else {
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write(`<!DOCTYPE 'html'>
    <html>
      <head>
        <title>Hello World Page</title>
      </head>
      <body>
        <h1>Sorry, this page doesn't exist!</h1>
        <script type="text/javascript" src="script.js"></script>
      </body>
    </html>`);
  }
  response.end();
});



server.listen(process.env.PORT || 80);
console.log("Server is listening");
