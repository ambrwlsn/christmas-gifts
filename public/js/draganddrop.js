var drag_source_element;

function handleDragStart(event) {
  // Target (this) element is the source node.
  drag_source_element = this;
//   console.log(drag_source_element);
  event.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragOver(event) {
    if (event.preventDefault) { 
        // Necessary. Allows us to drop.
        event.preventDefault();
    }
    // See the section on the DataTransfer object.
    this.classList.add('over');
    event.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    // this / e.target is the current hover target.
  }

  function handleDragLeave(event) {
    // this / e.target is previous target element.
    this.classList.remove('over');
  }

  function handleDrop(event) {
    // this/event.target is current target element.
    if (event.stopPropagation) {
    // Stops some browsers from redirecting.
      event.stopPropagation();
    }
    // Don't do anything if dropping the same instance we're dragging.
    if (drag_source_element != this) {
      // Set the source instances's HTML to the HTML of the instance we dropped on.
      this.parentNode.removeChild(drag_source_element);
      var drop_HTML = event.dataTransfer.getData('text/html');
      this.insertAdjacentHTML('beforebegin',drop_HTML);
      var drop_element = this.previousSibling;
      console.log(drop_element);
      addDragDropHandlers(drop_element);
    }
    this.classList.remove('over');
    return false;
  }

  function handleDragEnd(event) {
    // this/event.target is the source node.
    this.classList.remove('over');
  }

//there is no 'drag' or 'dragexit'
function addDragDropHandlers(element) {
    element.addEventListener('dragstart', handleDragStart, false);
    element.addEventListener('dragenter', handleDragEnter, false)
    element.addEventListener('dragover', handleDragOver, false);
    element.addEventListener('dragleave', handleDragLeave, false);
    element.addEventListener('drop', handleDrop, false);
    element.addEventListener('dragend', handleDragEnd, false);
  }
  
  // var gift_instance = document.querySelectorAll('#gift_list_section .gift_item');
  // console.log(gift_instance);
  // [].forEach.call(gift_instance, addDragDropHandlers)

  // Attach a delegated event handler
// $( "#gift_list_section" ).on( "click", ".gift_item", function( event ) {
//     event.preventDefault();
//     // console.log( $( this ).text() );
//     $( this ).each( "addDragDropHandlers" );
// });

// Get the element, add a click listener...
document.getElementById("gift_list_section").addEventListener("click", function(e) {
	if(e.target && e.target.childNodes[2]) {
		// List item found!  Output the ID!
    console.log("worked");
    addDragDropHandlers();
  }
});
 