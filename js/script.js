// function B() {
//     document.getElementById("display").innerHTML =
//     "<h1 class='list-title'>"
//     + document.getElementById('title').value + "</h1>"
//     + "<br><br>"
//     + "Recipient: "
//     + document.getElementById('recipient').value
//     + "<br>" + "Link: "
//     +  document.getElementById('link').value
//     + "<br>"
//     + "Price: "
//     + document.getElementById('price').value;
// }

var title = document.getElementById("title").value;
var recipient = document.getElementById("recipient").value;
var link = document.getElementById("link").value;
var price = document.getElementById("price").value;

function showNewGift(){
    var li = document.createElement("li");
    // var inputArray = [title, recipient, link, price];
    var titleValue = document.getElementById("title").value;
    var recValue = document.getElementById("recipient").value;
    var imgValue = document.getElementById("link").value;
    var priceValue = document.getElementById("price").value;

    var strValue = titleValue + " for: " + recValue + " with this great pic: " + imgValue + " that costs this much: " + priceValue;

    var showInput = document.createTextNode(strValue);
    li.appendChild(showInput);

    if (titleValue === '' | recValue === '') {
      alert("You must add a gift and recipient!");
    } else {
      document.getElementById("display").appendChild(li);
    }
    document.getElementById("titleValue").value = "";
  }

function emptyInput() {
    if (inputValue === '')
    alert("You must write something!");
}

function deleteInput(){
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// var div = document.getElementById("display");
// var textNode = document.createTextNode("my content");
// div.appendChild(textNode)
// document.body.appendChild(div);

// function () {
//
// }
// var results = function B(){};
// let colorboxMarkup = '';
//
// results.forEach(function(item) {
// var arrayLength = item.colors.length;
//     for (var i = 0; i < arrayLength; i++) {
//         console.log(item.colors[i]);
//         colorboxMarkup += `<div class='mini--box' style="background:#${item.colors[i]};"></div>`
// }

// function create_gift_markup(gift) {
//       const markup =`
//           <p>
//               <span class=''> ${display.title} </span><br>
//               <span class=''> ${display.recipient} </span><br>
//               <span class=''> ${display.link} </span><br>
//               <span class=''> ${display.price} </span><br>
//           </p>`;
//       return markup;
//   }
//
//   function insert_gifts(gift_markup) {
//       const gift_fragment = document.createDocumentFragment();
//       gift_markup.forEach(function __append_markup_to_docfrag(markup) {
//           let container_element = document.createElement('span');
//           container_element.insertAdjacentHTML('afterbegin', markup);
//           gift_fragment.appendChild(container_element.firstElementChild);
//       })
//       document.body.appendChild(gift_fragment);
//   }
//
//   function create_list_markup(gifts) {
//           const gift_markup = create_gift_markup(gifts)
//           // insert the created markup into our DOM as children of the <body> element
//           insert_gifts(gift_markup)
//       }
