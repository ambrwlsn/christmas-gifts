var form = document.getElementById('gift_form');
form.addEventListener("submit", showNewGift, false);

function showNewGift(event) {
    event.preventDefault();
    emptyInputAlert();

    insertGiftDisplayMarkup();
    allowGiftEdit();
    clearUserInputFields();
}

function allowGiftEdit() {
   // get the last gift item in the list
    var gifts = document.getElementsByClassName("edit_gift");
    var lastItem = gifts.length - 1;
    // attach a click event to the  button
    // which changes it into editing mode
    gifts[lastItem].addEventListener("click", giftEditEvent, false);
}

function giftEditEvent(giftEvent) {
    giftEvent.preventDefault();

    var edited_gift = editedGiftContents();
    var giftItemForm = giftEvent.target.parentNode;
    var inputWrapper = giftItemForm.getElementsByClassName("gift_item_data");
    var editedInput = editedInputHTML(edited_gift);

    for (var i = 0, length = inputWrapper.length; i < length; i++) {
    inputWrapper[i].insertAdjacentHTML('beforeend', editedInput);
  }
}

function editedGiftContents() {
    return {
        title: document.getElementsByClassName("title_span").value,
        recipient: document.getElementsByClassName("recipient_span").value,
        link: document.getElementsByClassName("link_span").value,
        price: document.getElementsByClassName("price_span").value,
    };
}

function editedInputHTML(edited_gift){
  const markup = `
  <input type="text" value="${edited_gift.title}" />`;
  return markup;
}

function insertGiftDisplayMarkup(){
    var gift = getUserInputGiftContents();
    var giftMarkup = generateGiftDisplayMarkup(gift);
    var containerElement = document.getElementById("display");

    containerElement.insertAdjacentHTML('beforeend', giftMarkup);
}

// This function contains object literals - Object literals encapsulate data, enclosing it in a tidy package - http://www.dyn-web.com/tutorials/object-literal/#syntax
function getUserInputGiftContents() {
    return {
        title: document.getElementById("title").value,
        recipient: document.getElementById("recipient").value,
        link: document.getElementById("link").value,
        price: document.getElementById("price").value,
    };
}

// This function contains a template literal which, in this case, allows embedded HTML - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
function generateGiftDisplayMarkup(gift) {
    const markup = `
          <form class="gift_item">

             <div class="gift_item_data">
               <label>Title: </label>
               <span class="title_span" style="float: right;">${gift.title}</span><br>
             </div>
             <div class="gift_item_data">
               <label>Recipient: </label>
               <span class="recipient_span" style="float: right;">${gift.recipient}</span><br>
             </div>
             <div class="gift_item_data">
               <label>Link: </label>
               <span class="link_span" style="float: right;">${gift.link}</span><br>
             </div>
             <div class="gift_item_data">
               <label>Price: </label>
               <span class="price_span" style="float: right;">${gift.price}</span><br>
             </div>
             <button name="button" class="edit_gift">Edit</button>
         </form>`;
    return markup;
}

// This function is placed in the submit function (showNewGift) to clear the user input fields once submit has been fired
function clearUserInputFields() {
     document.getElementById("title").value = "";
     document.getElementById("recipient").value = "";
     document.getElementById("link").value = "";
     document.getElementById("price").value = "";
}

// This function is placed in the submit function (showNewGift) to create an alert if the title or recipient values are not entered once submit has been fired
function emptyInputAlert(){
    var titleValue = document.getElementById("title").value;
    var recValue = document.getElementById("recipient").value;
    var imgValue = document.getElementById("link").value;
    var priceValue = document.getElementById("price").value;
    if (titleValue.trim() === '' | recValue.trim() === '') {
      alert("You must add a gift and recipient!");
    } else {
      false
    }
}

//When the user clicks the edit button, I want each span with user input (in a given gift block) to transform into an input.
//I want the user to be able to edit the input
//I want the user to be able to click a save button to save their altered input

// function deleteButton(){ // Appends 'x' unicode character as a delete button to the DOM
//     var span = document.createElement("button");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     li.appendChild(span);
//     // Click on a close button to not only hide but delete current list item
//     var close = document.getElementsByClassName("close");
//         for (i = 0; i < close.length; i++) {
//           close[i].onclick = function() {
//             this.parentNode.parentNode.removeChild(this.parentNode);
//         }
//     }
// }

// function createButtonElement(li){
//     var li = document.createElement("li");
//     var att = document.createAttribute("contenteditable");
//     att.value = "true";
//     li.setAttributeNode(att);
//     document.getElementsByClassName("display").appendChild(li);
// }

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
