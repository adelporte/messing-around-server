var ele = document.getElementById("button");
ele.addEventListener("click", printIt, false);
function printIt() {
 var node;
 var textnode;
 for (var i = 1; i = 100; i++) {
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