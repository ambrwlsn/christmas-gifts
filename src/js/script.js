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
               <span class="span title_span" style="float: right;">${gift.title}</span>
             </div>
             <div class="gift_item_data">
               <label>Recipient: </label>
               <span class="span recipient_span" style="float: right;">${gift.recipient}</span><br>
             </div>
             <div class="gift_item_data">
               <label>Link: </label>
               <span class="span link_span" style="float: right;">${gift.link}</span><br>
             </div>
             <div class="gift_item_data">
               <label>Price: </label>
               <span class="span price_span" style="float: right;">${gift.price}</span><br>
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

    var edited_gift = giftSubmitFormUserInput();
    var $gift_item_form = giftEvent.target.parentNode;
    var $input_wrapper = $gift_item_form.getElementsByClassName("gift_item_data");
    console.log($input_wrapper);
    //console.log($input_wrapper.hasChildNodes());
    //var $form_spans = $input_wrapper.childNodes;
    

    // $gift_item_form.insertAdjacentHTML('beforeend', editedInput);

    for (var i = 0, length = $input_wrapper.length; i < length; i++) {
            var editedInput = editedInputHTML(edited_gift);
            // this.removeChild(this.getElementsByClassName('span'));
            //$input_wrapper[i].removeChild($form_spans);
            $input_wrapper[i].insertAdjacentHTML('beforeend', editedInput);
  }
}

function allowGiftEdit() {
    var $gifts = document.getElementsByClassName("edit_gift");
    var lastItem = $gifts.length - 1;
    $gifts[lastItem].addEventListener("click", clickEdit, false);
}

function editedGiftContents() {
    return {
        title: form.getElementsByClassName("title_span").value,
        recipient: form.getElementsByClassName("recipient_span").value,
        link: form.getElementsByClassName("link_span").value,
        price: form.getElementsByClassName("price_span").value,
    };
}

function editedInputHTML(edited_gift){
  const markup = `
  <input type="text" class="edit_input_here" value="${edited_gift.title}" />`;
  return markup;
} // I can't figure out what to write in the value attribute here. What is currently there does not work

                            //***!!! START PSUEDO CODE !!!***/

// I want the user to click the edit button and each of 4 fields becomes an input field
// I want the edit button to turn to a save button right away, so that the edit function can't run anymore (and create extra input fields)

// I want the user to be able to click the save button to store the new input value, 

// I want a cancel button to be available in case the user clicked edit but decided they don't want to edit the input

                            //***!!! END PSUEDO CODE !!!***/

// The way I tried to do this so far is creating a loop (commented out above in clickEdit function) that will inject an input element (from the editedInputHTML function). I then decided to try injecting 4 input elements instead (from the editedInputHTML function) that appears below the original user input

// I'm not happy with how I approached this so far. I only want a simple solution (such as here https://gist.github.com/asciidisco/ae8afd34b055a1cc8cedce2feb7f86d3). The creator of this code simply used Label elements (no inputs) and changed readOnly from true to false. I would have done this too, but to be honest, the way that code links with the CSS really confuses me, as does a lot of the syntax (because I am sooooo new and got no grammar ;) If my German was as good as my JS, all I'd be able to say would be 'Ich bin ein Berliner').