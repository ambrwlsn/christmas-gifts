var form = document.getElementById('gift_submit_form');
form.addEventListener("submit", addNewGiftToGiftList, false);

function addNewGiftToGiftList(event) {
    event.preventDefault();
    insertGiftInstance();
    allowGiftEdit(); // why do I have to put the 4 allows here?
    allowSaveEdit();
    allowCancelEdit();
    allowDeleteGiftItem()
    clearUserInputFields();
}

function emptyInputAlert() {
    var $title = document.getElementById('title');
    var $recipient = document.getElementById('recipient');
    var empty_title_markup = '<span id="empty_title_span" style="color:red">Input required</span>';
    var empty_recipient_markup = '<span id="empty_recipient_span" style="color:red">Input required</span>';

    if (!isTitleValid() && !document.getElementById('empty_title_span')) {
        insertAlert($title, empty_title_markup);
    }
    if (!isRecipientValid() && !document.getElementById('empty_recipient_span')) {
        insertAlert($recipient, empty_recipient_markup);
    }
}

function isTitleValid() {
    var $title = document.getElementById('title');
    var titleValue = $title.value;
    if (titleValue.trim() === '') {
        return false;
    } 
    return true;
}

function isRecipientValid() {
    var $recipient = document.getElementById('recipient');
    var recValue = $recipient.value;
    if (recValue.trim() === '') {
        return false;
    } 
    return true;
}

function insertAlert(element, markup) {
    element.insertAdjacentHTML('afterend', markup);
    element.style.border = '1px solid red';
}

function validatePrice() {
    var $price = document.getElementById('price');
    var priceValue = $price.value;
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    var invalidMessageNotDisplayed = document.querySelectorAll('.invalid_price_span').length <= 0;
    var isValid = regex.test(priceValue);
    if (!isValid && invalidMessageNotDisplayed) {
        showInvalidPriceMessage($price);
    }
    return isValid;
}

function showInvalidPriceMessage($priceInput) {
    var empty_alert = '<span class="invalid_price_span" style="color:red">Please use 00.00 format</span>';
    $priceInput.insertAdjacentHTML('afterend', empty_alert);
    $priceInput.style.border = '1px solid red';
}

function insertGiftInstance() {
    emptyInputAlert();
    
    var price_value = document.getElementById('price').value == "";
    if (isTitleValid() || isRecipientValid() || price_value) {
    } else {
        var $container_element = document.getElementById("gift_list_section");
        var new_gift = giftSubmitFormUserInput();
        var gift_markup = generateGiftInstance(new_gift);
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

function generateGiftInstance(gift) {
    const $markup = `
          <form class="gift_item" draggable="true" ondragstart="handleDragStart(event);">
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
             <button name="button" class="button edit_button">Edit</button>
             <button name="button" class="button save_button" style="display:none">Save</button>
             <button name="button" class="button cancel_button" style="display:none">Cancel</button>
             <button name="button" class="button delete_button" style="display:inline">x</button>
         </form>`;
    return $markup;
}


function clearUserInputFields() {
    document.getElementById("title").value = "";
    document.getElementById("recipient").value = "";
    document.getElementById("link").value = "";
    document.getElementById("price").value = "";
}

function allowGiftEdit() {
    var $gifts = document.getElementsByClassName("edit_button");
    var $lastItem = $gifts.length - 1;
    $gifts[$lastItem].addEventListener("click", clickEdit, false);
}

function allowSaveEdit() {
    var $gifts = document.getElementsByClassName("save_button");
    var $lastItem = $gifts.length - 1;
    $gifts[$lastItem].addEventListener("click", clickSave, false);
}

function allowCancelEdit() {
    var $gifts = document.getElementsByClassName("cancel_button");
    var $lastItem = $gifts.length - 1;
    $gifts[$lastItem].addEventListener("click", clickCancel, false);
}

function allowDeleteGiftItem() {
    var $gifts = document.getElementsByClassName("delete_button");
    var $lastItem = $gifts.length - 1;
    $gifts[$lastItem].addEventListener("click", clickDelete, false);
}

function displayInline($elements) {
    for (var i = 0, className = $elements.length; i < className; i++) {
        var classy = $elements[i];
        classy.style.display = "inline";
    }
}

function displayNone($elements) {
    for (var i = 0, className = $elements.length; i < className; i++) {
        var classy = $elements[i];
        classy.style.display = "none";
    }
}

function clickDelete(deleteGiftItem) {
    deleteGiftItem.preventDefault();
    var $gift_item = deleteGiftItem.target.parentNode;
    $gift_item.remove();
}

function clickEdit(giftEvent) {
    giftEvent.preventDefault();

    // Get the gift wrapper div
    var $gift_item = giftEvent.target.parentNode;

    // Pick out the required elements
    let $save_button = $gift_item.querySelectorAll('.save_button');
    let $edit_button = $gift_item.querySelectorAll('.edit_button');
    let $cancel_button = $gift_item.querySelectorAll('.cancel_button');

    let $spans = $gift_item.querySelectorAll('.span');
    let $inputs = $gift_item.querySelectorAll('.input');

    // Show the input fields and buttons for edit mode
    displayInline($inputs);
    displayInline($save_button);
    displayInline($cancel_button);
    displayNone($edit_button);
    displayNone($spans);
}

function clickCancel(cancelEvent) {
    cancelEvent.preventDefault();
    var $gift_item = cancelEvent.target.parentNode;

    let $save_button = $gift_item.querySelectorAll('.save_button');
    let $edit_button = $gift_item.querySelectorAll('.edit_button');
    let $cancel_button = $gift_item.querySelectorAll('.cancel_button');

    let $spans = $gift_item.querySelectorAll('.span');
    let $inputs = $gift_item.querySelectorAll('.input');
    displayInline($edit_button);
    displayInline($spans);
    displayNone($save_button);
    displayNone($cancel_button);
    displayNone($inputs);
}

function clickSave(saveEvent) {
    saveEvent.preventDefault();
    var $gift_item = saveEvent.target.parentNode;

    let $save_button = $gift_item.querySelectorAll('.save_button');
    let $edit_button = $gift_item.querySelectorAll('.edit_button');
    let $cancel_button = $gift_item.querySelectorAll('.cancel_button');

    let $spans = $gift_item.querySelectorAll('.span');
    let $inputs = $gift_item.querySelectorAll('.input');

    // using below code caused only the 'price' value to be entered as new values in the spans, but I have no idea why

    // for (var i = 0, spanLength = $spans.length; i < spanLength; i++) {
    //     var span = $spans[i];
    //     for(var j = 0, inputsLength = $inputs.length; j < inputsLength; j++) {
    //         var input = $inputs[j];
    //         span.innerHTML = input.value;
    //     }
    // }

    var $input_wrapper = $gift_item.getElementsByClassName("gift_item_data");
    for (var i = 0, length = $input_wrapper.length; i < length; i++) {
        var giftItemWrapper = $input_wrapper[i];
        var $input_elements = giftItemWrapper.getElementsByClassName('input');
        for (var j = 0, $input_elementsLength = $input_elements.length; j < $input_elementsLength; j++) {
            var $input_element = $input_elements[j];

            var $span_elements = giftItemWrapper.getElementsByClassName('span');
            for (var k = 0, $span_elementsLength = $span_elements.length; k < $span_elementsLength; k++) {
                var $span_element = $span_elements[k];
                $span_element.innerHTML = $input_element.value;

            }
        }
    }

    displayInline($edit_button);
    displayInline($spans);
    displayNone($save_button);
    displayNone($cancel_button);
    displayNone($inputs);

}