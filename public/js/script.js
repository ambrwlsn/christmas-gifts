var form = document.getElementById('gift_form');
form.addEventListener("submit", showNewGift, false);

function showNewGift(event) {
    event.preventDefault();
    var gift = getUserInputGiftContents();
    var giftMarkup = generateGiftDisplayMarkup(gift);
    var containerElement = document.createElement('span');
    containerElement.insertAdjacentHTML('afterbegin', giftMarkup);
    document.body.appendChild(containerElement.firstElementChild);
    clearUserInputFields()
}

function getUserInputGiftContents() {
    return {
        title: document.getElementById("title").value,
        recipient: document.getElementById("recipient").value,
        link: document.getElementById("link").value,
        price: document.getElementById("price").value,
    };
}

function clearUserInputFields() {
    // document.getElementById("title").value;
    // document.getElementById("recipient").value;
    // document.getElementById("link").value;
    // document.getElementById("price").value;
     document.getElementById("title").value = "";
     document.getElementById("recipient").value = "";
     document.getElementById("link").value = "";
     document.getElementById("price").value = "";
}

function generateGiftDisplayMarkup(gift) {
    const markup = `
        <form id="display">
             <label> Title: ${gift.title} </label><br>
             <label> Recipient: ${gift.recipient} </label><br>
             <label> Link: ${gift.link} </label><br>
             <label> Price: ${gift.price} </label><br>
         </form>`;
    return markup;
}

//***************************************************************************************//


// function showNewGift(){
//     var titleValue = document.getElementById("title").value;
//     var recValue = document.getElementById("recipient").value;
//     var imgValue = document.getElementById("link").value;
//     var priceValue = document.getElementById("price").value;
// // Creates alert box if either of the title or recipient inputs are empty
//     if (titleValue.trim() === '' | recValue.trim() === '') {
//       alert("You must add a gift and recipient!");
//     } else {
//       var gift_display = generateGiftDisplayText(gift);
//       document.getElementById("list-box").appendChild(gift_display);
//     }
//
//     function generateGiftDisplayText(gift) {
//         const markup = `
//                <form id="display">
//                     <label> Title: ${gift.title} </label><br>
//                     <label> Recipient: ${gift.recipient} </label><br>
//                     <label> Link: ${gift.link} </label><br>
//                     <label> Price: ${gift.price} </label><br>
//                 </form>`;
//         return markup;
//       }
//   }


//***************************************************************************************//


// // Creates a new list item when clicking on the "Add" button
// function showNewGift(){
//     // var li = document.createElement("li");
//
//     var li = document.createElement("li");
//     var att = document.createAttribute("contenteditable");
//     att.value = "true";
//     li.setAttributeNode(att);
//
// //Array containing each input
//     var inputArray = [title, recipient, link, price];
//
// // Places each user-inputted value into a variable
//     var titleValue = document.getElementById("title").value;
//     var recValue = document.getElementById("recipient").value;
//     var imgValue = document.getElementById("link").value;
//     var priceValue = document.getElementById("price").value;
//
//     var strValue = titleValue + " for: " + recValue + " with this great pic: " + imgValue + " that costs this much: " + priceValue;
//
//     var showInput = document.createTextNode(strValue);
//     li.appendChild(showInput);
//
// // Creates alert box if either of the title or recipient inputs are empty
//     if (titleValue.trim() === '' | recValue.trim() === '') {
//       alert("You must add a gift and recipient!");
//     } else {
//       document.getElementById("display").appendChild(li);
//     }
// // Empties the input fields once submit button is pressed
//     // document.getElementById("titleValue").value = "";
//     var form = document.getElementById("gift_form");
//     form.reset();
//
// // Appends 'x' unicode character as a delete button to the DOM
//     var span = document.createElement("button");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     li.appendChild(span);
//
// // Appends edit button to the DOM
//     var span = document.createElement("button");
// // ~ How can I style the edit text?
//     var txt = document.createTextNode(" edit");
//     span.className = "edit";
//     span.appendChild(txt);
//     li.appendChild(span);
//
// // Click on a close button to not only hide but delete current list item
// var close = document.getElementsByClassName("close");
//     for (i = 0; i < close.length; i++) {
//       close[i].onclick = function() {
//         this.parentNode.parentNode.removeChild(this.parentNode);
//       }
//     }
//   }
