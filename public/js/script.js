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
        var $container_element = document.getElementById("gift_list_section");
        var new_gift = giftSubmitFormUserInput(); 
        var gift_markup = generateGiftDisplayMarkup(new_gift);
        $container_element.insertAdjacentHTML('beforeend', gift_markup);
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
               <input class="input" type="text" style="display:none" value="${gift.title}" />
             </div>
             <div class="gift_item_data">
               <label>Recipient: </label>
               <span class="span" style="float: right;">${gift.recipient}</span>
               <input class="input" type="text" style="display:none" value="${gift.recipient}" />
             </div>
             <div class="gift_item_data">
               <label>Link: </label>
               <span class="span" style="float: right;">${gift.link}</span>
               <input class="input" type="text"style="display:none" value="${gift.link}" />
             </div>
             <div class="gift_item_data">
               <label>Price: </label>
               <span class="span" style="float: right;">${gift.price}</span>
               <input class="input" type="text" style="display:none" value="${gift.price}" />
             </div>
             <button name="button" class="edit_button">Edit</button>
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
    var $gift_item_form = giftEvent.target.parentNode;
    var $input_wrapper = $gift_item_form.getElementsByClassName("gift_item_data");
    for (var i = 0, length = $input_wrapper.length; i < length; i++)
        {var giftItemWrapper = $input_wrapper[i];
        var $inputs = giftItemWrapper.getElementsByClassName('span');
            for(var j = 0, $inputsLength = $inputs.length; j < $inputsLength; j++)
                {var $span = $inputs[j];
                 var $edit_button = giftEvent.target;
                 $span.style.display = "none";
                 $edit_button.style.display = "none";
                }  
                var $inputs = giftItemWrapper.getElementsByClassName('input');
                for(var k = 0, $inputsLength = $inputs.length; k < $inputsLength; k++) 
                    {var $input = $inputs[k];
                     $input.style.display = "block";   
                    }
        }   
                var save_button = generateSaveButtonMarkup();
                $gift_item_form.insertAdjacentHTML('beforeend', save_button); 
                allowSaveEdit(); 
}

function allowGiftEdit() {
    var $gifts = document.getElementsByClassName("edit_button");
    var $lastItem = $gifts.length - 1;
    $gifts[$lastItem].addEventListener("click", clickEdit, false);
} 

function generateSaveButtonMarkup(){
    const markup = `
    <button name="button" class="save_button">Save</button>`;
    return markup;
}

function clickSave(saveEvent) {
    saveEvent.preventDefault();
    var $gift_item_form = saveEvent.target.parentNode;
    var $input_wrapper = $gift_item_form.getElementsByClassName("gift_item_data");
    for (var i = 0, length = $input_wrapper.length; i < length; i++) {
        var giftItemWrapper = $input_wrapper[i];
        var $inputs = giftItemWrapper.getElementsByClassName('input');
            for(var j = 0, $inputsLength = $inputs.length; j < $inputsLength; j++) {
                var $input = $inputs[j];
                $input.style.display = "none";

                var $spans = giftItemWrapper.getElementsByClassName('span');
                for(var k = 0, $inputsLength = $inputs.length; k < $inputsLength; k++) {
                    var $span = $spans[k];
                
                $span.style.display = "block";
                $span.innerHTML = $input.value;
                
            }
            var $save_button = saveEvent.target;
            $save_button.style.display = "none";   

            var $edit_button = document.getElementsByTagName("button").item(0);
            $edit_button.style.display = "inline";
        }   
    }
}

function allowSaveEdit() {
    var $gifts = document.getElementsByClassName("save_button");
    var $lastItem = $gifts.length - 1;
    $gifts[$lastItem].addEventListener("click", clickSave, false);
}



