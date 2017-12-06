// Creates a new list item when clicking on the "Add" button
function showNewGift(){
    var li = document.createElement("li");

// var inputArray = [title, recipient, link, price]; ~ haven't figured out how to tidy the code by utilising arrays yet

// Places each user-inputted value into a variable
    var titleValue = document.getElementById("title").value;
    var recValue = document.getElementById("recipient").value;
    var imgValue = document.getElementById("link").value;
    var priceValue = document.getElementById("price").value;

    var strValue = titleValue + " for: " + recValue + " with this great pic: " + imgValue + " that costs this much: " + priceValue;

    var showInput = document.createTextNode(strValue);
    li.appendChild(showInput);

// Creates alert box if either of the title or recipient inputs are empty
    if (titleValue.trim() === '' | recValue.trim() === '') {
      alert("You must add a gift and recipient!");
    } else {
      document.getElementById("display").appendChild(li);
    }
    // document.getElementById("titleValue").value = "";

// Appends 'x' unicode character as a delete button to the DOM
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

// Click on a close button to not only hide but delete current list item
var close = document.getElementsByClassName("close");
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        // var div = this.parentElement;
        this.parentNode.parentNode.removeChild(this.parentNode);
        // div.style.display = "none";
      }
    }
  }
