document.getElementById("submit").addEventListener("click", function() {
  //  obj = document.getElementById("input").value.split("\n");
  var obj = [];
  document
    .getElementById("input")
    .value.split("\n")
    .forEach(element => {
      if (element.trim().length != 0) {
        obj.push({
          name: element
        });
      }
    });
  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/");
  request.setRequestHeader("Content-type", "application/json");

  request.send(JSON.stringify(obj));

  request.addEventListener("loadend", function() {
    document.getElementById("result").innerHTML = "";
    JSON.parse(request.responseText).forEach(element => {
      document.getElementById("result").innerHTML +=
        '<p><a href="' +
        element.items[0].link +
        '" target="_blank">' +
        element.items[0].link +
        "</a>" +
        "</p>";
    });
  });
});
