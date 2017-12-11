var form = document.getElementById('gift_submit_form');
form.addEventListener("submit", addNewGiftToGiftList, false);

function addNewGiftToGiftList(event) {
    event.preventDefault();
    emptyInputAlert();
    checkNumber();
    insertGiftDisplayMarkup();
    allowGiftEdit();
    clearUserInputFields();
}

function emptyInputAlert(){
    var $titleValue = document.getElementById("title").value;
    var $recValue = document.getElementById("recipient").value;
    if ($titleValue.trim() === '' | $recValue.trim() === '') {
      alert("You must add a gift and recipient!");
      return true;
    } else {
      return false;  
    } 
}

function checkNumber(){
    var $priceValue = document.getElementById("price").value;
    if ($priceValue != "" | isNaN($priceValue)) {
        alert("Invalid price!");
        return true;
    }   else {
        return false; 
      } 
}

function insertGiftDisplayMarkup(){
    if(emptyInputAlert() | checkNumber()) {
        return false;
    } else {
        var $container_element = document.getElementById("gift_list_section"); //targets gift list section (a div container in the HTML file)
        var new_gift = giftSubmitFormUserInput(); //accesses user input in gift submit form and puts it in 'new_gift' variable
        var gift_markup = generateGiftDisplayMarkup(new_gift); //inserts user input (using new_gift variable) into HTML template strings 
        $container_element.insertAdjacentHTML('beforeend', gift_markup); 
        //targets gift list section, runs insert adjacent HTML function & places the user + HTML template strings into the gift list section
     } 
}

function giftSubmitFormUserInput() {
    return {
        title: document.getElementById("title").value,
        recipient: document.getElementById("recipient").value,
        link: document.getElementById("link").value,
        price: document.getElementById("price").value,
    };
}

function generateGiftDisplayMarkup(gift) {
    const $markup = `
          <form class="gift_item">

             <div class="gift_item_data">
               <label>Title: </label>
               <span class="span" style="float: right;">${gift.title}</span>
             </div>
             <div class="gift_item_data">
               <label>Recipient: </label>
               <span class="span" style="float: right;">${gift.recipient}</span>
             </div>
             <div class="gift_item_data">
               <label>Link: </label>
               <span class="span" style="float: right;">${gift.link}</span>
             </div>
             <div class="gift_item_data">
               <label>Price: </label>
               <span class="span" style="float: right;">${gift.price}</span>
             </div>
             <button name="button" class="edit_gift">Edit</button>
         </form>`;
    return $markup;
}

function clearUserInputFields() {
    document.getElementById("title").value = "";
    document.getElementById("recipient").value = "";
    document.getElementById("link").value = "";
    document.getElementById("price").value = "";
}

function clickEdit(giftEvent) {
    giftEvent.preventDefault();
    var $gift_item_form = giftEvent.target.parentNode; //this targets the parent node of the target (i.e. the button), and this is the form element
    var $input_wrapper = $gift_item_form.getElementsByClassName("gift_item_data"); //this targets the 4 div elements with class name of "gift_item_data" inside the form element that was targeted using $gift_item_form
    
    for (var i = 0, length = $input_wrapper.length; i < length; i++) //this for loop targets each of the 4 div elements with class name of "gift_item_data"
        {
            var giftItemWrapper = $input_wrapper[i]; //this variable contains each of the 4 div elements with class name of "gift_item_data" as separate items
            var $inputs = giftItemWrapper.getElementsByClassName('span'); //this variable gets the 1 span element of each of the 4 separate div items with class name of "gift_item_data"
            for(var j = 0, $inputsLength = $inputs.length; j < $inputsLength; j++)//this for loop contains each of the 4 span elements within the div with the class name of "gift_item_data" as separate items
            
            {
                var $span = $inputs[j];
                var $edit_button = giftEvent.target;
                var editedInput = editedInputHTML($span.innerHTML);
                //this variable works with the editedInputHTML function to inject the markdown template containing the innerHTML value of each of the 4 spans
                $input_wrapper[i].insertAdjacentHTML('beforeend', editedInput);
                //this function places the markdown (with corresponding inputs[j].innerHTML value) at the end of each of the 4 div elements with a class name of "gift_item_data" 
                
                $span.style.display = "none";
                $edit_button.style.display = "none";
                
            }  
            
    }   
        var save_and_cancel_buttons = generateSaveAndCancelButtonMarkup();
        $gift_item_form.insertAdjacentHTML('beforeend', save_and_cancel_buttons); 
        allowSaveEdit(); 

}

function generateSaveAndCancelButtonMarkup(){
    const markup = `
    <button name="button" class="save_button">Save</button>
    <button name="button" class="cancel_button">Cancel</button>`;
    return markup;
}


function clickSave(saveEvent) {
    saveEvent.preventDefault();
    var $gift_item_form = saveEvent.target.parentNode;
    var $input_wrapper = $gift_item_form.getElementsByClassName("gift_item_data");
    for (var i = 0, length = $input_wrapper.length; i < length; i++) {
        var giftItemWrapper = $input_wrapper[i];
        // console.log(giftItemWrapper);
        var $inputs = giftItemWrapper.getElementsByClassName('edit_input_here');
            for(var j = 0, $inputsLength = $inputs.length; j < $inputsLength; j++) {
                var $input = $inputs[j];
                // console.log($input);

                var $spans = giftItemWrapper.getElementsByClassName('span');
                for(var k = 0, $inputsLength = $inputs.length; k < $inputsLength; k++) {
                    var $span = $spans[k];
                
                $span.style.display = "block";
                $span.innerHTML = $input.value;
                $input.style.display = "none";
                
                var $save_button = saveEvent.target;
                $save_button.style.display = "none";      
            }
        }   
    }
}

function allowSaveEdit() {
    var $gifts = document.getElementsByClassName("save_button");
    var $lastItem = $gifts.length - 1;
    $gifts[$lastItem].addEventListener("click", clickSave, false);
}

// ***********************************************************************************
// I am trying to get the clickSave function (above these comments) to (when clicked):
// 1. Target the generated input elements
// 2. Pull out the input elements' NEW values
// 3. Un-hide or recreate span element
// 4. Place NEW values into span element
// 5. Hide/delete the input element
// 6. Change the button back to the edit button ready to be clicked again 
// ***********************************************************************************

function allowGiftEdit() {
    var $gifts = document.getElementsByClassName("edit_gift");
    var $lastItem = $gifts.length - 1;
    $gifts[$lastItem].addEventListener("click", clickEdit, false);
}

function editedInputHTML(value){
  const markup = `
  <input type="text" class="edit_input_here" value="${value}" />`;
  return markup;
}   

