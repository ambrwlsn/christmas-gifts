var form = document.getElementById('gift_submit_form');
form.addEventListener("submit", addNewGiftToGiftList, false);

function addNewGiftToGiftList(event) {
    event.preventDefault();
    emptyInputAlert();
    insertGiftInstance();
    allowGiftEdit();
    clearUserInputFields();
}

function emptyInputAlert() {
    var $titleValue = document.getElementById("title").value;
    var $recValue = document.getElementById("recipient").value;
    if ($titleValue.trim() === '' | $recValue.trim() === '') {
        alert("You must add a gift and recipient!");
        return true;
    } else {
        return false;
    }
}

function insertGiftInstance() {
    if (emptyInputAlert()) {
        return false;
    } else {
        var $container_element = document.getElementById("gift_list_section");
        var new_gift = giftSubmitFormUserInput();

        //the new_gift variable links to the function below!!!!!!
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

function clickEdit(giftEvent) {
    giftEvent.preventDefault();
    var $gift_item_forms = giftEvent.target.parentNode;
    console.log(giftEvent);
    // var $gift_item_forms = document.querySelector(".button");
    var $input_wrappers = $gift_item_forms.querySelectorAll(".gift_item_data");
  
    $input_wrappers.forEach(($input_wrapper) => {
        var $span = $input_wrapper.querySelector('span');
        $span.style.display = "none";
    });

    giftEvent.srcElement.style.display = "none";
    

    // for (var i = 0, length = $input_wrapper.length; i < length; i++) {
    //     var giftItemWrapper = $input_wrapper[i];
    //     var $inputs = giftItemWrapper.getElementsByClassName('span');

    //     for (var j = 0, $inputsLength = $inputs.length; j < $inputsLength; j++) {
    //         var $span = $inputs[j];
    //         var $edit_button = giftEvent.target;
    //         $span.style.display = "none";
    //         $edit_button.style.display = "none";
    //     }

        // var $inputs = giftItemWrapper.getElementsByClassName('input');
        // for (var k = 0, $inputsLength = $inputs.length; k < $inputsLength; k++) {
        //     var $input = $inputs[k];
        //     $input.style.display = "inline";
        // }
        // displayInline($cancel_button);
        // displayInline($cancel_button);
    
    }

// function inlineButtons(){
//     var name = clickEdit(name);
// }

function displayInline(className) {
    document.getElementsByClassName(className).forEach(($button) => { 
        $button.style.display = "inline";
    });
}

function displayNone(classname) {
    document.getElementsByClassName(className).forEach(($button) => {
        $button.style.display = "inline";
    });
}

// function editButtonDisplayInline(){
//     var $edit_buttons = document.getElementsByClassName('edit_button');
//     for (var i = 0, edit_buttonsLength = $edit_buttons.length; i < edit_buttonsLength; i++) {
//         var $edit_button = $edit_buttons[i];
//         $edit_button.style.display = "inline";
//     }
// }

// function saveButtonDisplayInline(){
//     var $save_buttons = document.getElementsByClassName('save_button');
//     for (var i = 0, save_buttonsLength = $save_buttons.length; i < save_buttonsLength; i++) {
//         var $save_button = $save_buttons[i];
//         $save_button.style.display = "inline";
//     }
// }

// function cancelButtonDisplayInline(){
//     var $cancel_buttons = document.getElementsByClassName('cancel_button');
//     for (var i = 0, cancel_buttonsLength = $cancel_buttons.length; i < cancel_buttonsLength; i++) {
//         var $cancel_button = $cancel_buttons[i];
//         $cancel_button.style.display = "inline";
//     }
// }

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

// var $edit_button = document.getElementsByTagName("button");
        // for (var l = 0, $inputsLength = $edit_button.length; l < $inputsLength; l++) {
        //     var $buttons = $edit_button[l];
        //     $buttons.style.display = "inline";
        // }