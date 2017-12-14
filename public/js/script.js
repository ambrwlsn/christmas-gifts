var form = document.getElementById('gift_submit_form');
form.addEventListener("submit", addNewGiftToGiftList, false);

function addNewGiftToGiftList(event) {
    event.preventDefault();
    insertGiftInstance();
    allowGiftEdit();
    clearUserInputFields();
}

function emptyInputAlert() {
    var $title = document.getElementById('title');
    var $recipient = document.getElementById('recipient');
    var titleValue = $title.value;
    var recValue = $recipient.value;
    var empty_alert = '<span class="empty_span" style="color:red">Input required</span>';    

    if (titleValue.trim() === '' | recValue.trim() === '') {  
        // check if the error is already displayed
        if (document.querySelectorAll('.empty_span').length <= 0) {
            $title.insertAdjacentHTML('afterend', empty_alert);
            $recipient.insertAdjacentHTML('afterend', empty_alert);
            $title.style.border = '1px solid red';
            $recipient.style.border = '1px solid red';
        }
        return true;
    }
    return false;
}


function insertGiftInstance() {
    if (emptyInputAlert()) {
        return false;
    } else {
        
        var $container_element = document.getElementById("gift_list_section");


        //the new_gift variable links to the function below!!!!!!
        var new_gift = giftSubmitFormUserInput();


        var gift_markup = generateGiftInstance(new_gift);
        
        giftNumber();
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

function giftNumber(){
        var number = 1;
        number++;
}

function buttons() {
    return
        for (var i = 0, $buttonsLength = $buttons.length; i < $buttonsLength; i++) {
            var $button = $buttons[i];
            var $edit_button = $buttons[i].querySelector("edit_button");
            var $cancel_button = $buttons[i].querySelector("cancel_button");
            var $save_button = $buttons[i].querySelector("save_button");
        };
    }

function generateGiftInstance(gift) {
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
             <button name="button" class="button edit_button">Edit</button>
             <button name="button" class="button save_button" style="display:none">Save</button>
             <button name="button" class="button cancel_button" style="display:none">Cancel</button>
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

function clickEdit(giftEvent) {
    giftEvent.preventDefault();
    giftEvent.target.style.display = "none";
    console.log(giftEvent.target);

    // Get the gift wrapper div
    var $gift_item = giftEvent.target.parentNode;
    console.log($gift_item.childNodes);
    // $gift_item.querySelectorAll('.span').display.none;

    // Pick out the required elements
    let $save_button = $gift_item.querySelector('.save_button');
    let $cancel_button = $gift_item.querySelector('.cancel_button');

    let $spans = $gift_item.querySelectorAll('.span');
    let $inputs = $gift_item.querySelectorAll('.input');

    // Show the input fields and buttons for edit mode
    displayInline($inputs);
    displayInline([$save_button, $cancel_button]);
    displayNone($spans);
}

/*
 * Takes either a single .class_name or an array of ['.class_names', '.like_this']
 */
function displayInline(collection) {
    collection.forEach(($item) => { 
        if ($item.isArray) {
            displayInline($item);     
        }
        else {
         $item.style.display = "inline";
        }
    });
}

function displayNone(collection) {
    collection.forEach(($item) => { 
        $item.style.display = "none";
    });
}

function clickCancel(cancelEvent) {
    cancelEvent.preventDefault();
    var $gift_item_form = cancelEvent.target.parentNode;
    var $input_wrapper = $gift_item_form.getElementsByClassName("gift_item_data");
    for (var i = 0, length = $input_wrapper.length; i < length; i++) {
        var giftItemWrapper = $input_wrapper[i];
        var $inputs = giftItemWrapper.getElementsByClassName('span');
        for (var j = 0, $inputsLength = $inputs.length; j < $inputsLength; j++) {
            var $span = $inputs[j];
            $span.style.display = "inline";
        }
        var $inputs = giftItemWrapper.getElementsByClassName('input');
        for (var k = 0, $inputsLength = $inputs.length; k < $inputsLength; k++) {
            var $input = $inputs[k];
            $input.remove();
            var $cancel_button = cancelEvent.target;
            // $edit_button.style.display = "none";
            $cancel_button.remove();
        }
    }
}

function clickSave(saveEvent) {
    saveEvent.preventDefault();
    var $gift_item_form = saveEvent.target.parentNode;
    var $input_wrapper = $gift_item_form.getElementsByClassName("gift_item_data");
    for (var i = 0, length = $input_wrapper.length; i < length; i++) {
        var giftItemWrapper = $input_wrapper[i];
        var $inputs = giftItemWrapper.getElementsByClassName('input');
        for (var j = 0, $inputsLength = $inputs.length; j < $inputsLength; j++) {
            var $input = $inputs[j];
            $input.style.display = "none";
            var $spans = giftItemWrapper.getElementsByClassName('span');
            for (var k = 0, $spanLength = $spans.length; k < $spanLength; k++) {
                var $span = $spans[k];
                $span.style.display = "block";
                $span.innerHTML = $input.value;
                var $save_button = saveEvent.target;
                $save_button.remove();
            }
        }
        editButtonDisplayInline()
    }
}