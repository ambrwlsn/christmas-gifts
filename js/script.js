function B() {
    document.getElementById("display").innerHTML =
    "<h1 class='list-title'>"
    + document.getElementById('title').value + "</h1>"
    + "<br><br>"
    + "Recipient: "
    + document.getElementById('recipient').value
    + "<br>" + "Link: "
    +  document.getElementById('link').value
    + "<br>"
    + "Price: "
    + document.getElementById('price').value;
}

// var div = document.getElementById("display");
// var textNode = document.createTextNode("my content");
// div.appendChild(textNode)
// document.body.appendChild(div);
