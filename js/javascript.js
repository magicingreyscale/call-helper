// Functions etc.
function copyToClipboard(text) {
    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}


// JQuery
$(document).ready(function() {
    $('.ui.sticky').sticky({context: '#context', pushing: false});
    
    $('.ui.checkbox').checkbox();
    
    $('#copy')
        .popup({
        popup : $('.custom.popup'),
        on    : 'click',
        position : 'bottom center'
    })
    ;
    
    $(".add-content").change(function() {
        // Grab category from form element
        var cat = $(this).data("category");
        
        // Grab value from form element
        var value = $(this).val();
        
        // Check if checkbox has been checked or unchecked
        if(this.checked) {
            // Make category visible
            $("#"+cat).css("display","inline");
            
            // Grab existing elements in category content span and add new value to list
            var existing = $("#"+cat+"-content").html();
            if(existing !== "") {
                 var add = existing + ", " + value;
            }
            else {
                var add = value;
            }
            
            // Display new list in content span
            $("#"+cat+"-content").html(add);
        }
        
        if(!this.checked) {
            if ($('#'+cat+'-set :checkbox:checked').length > 0){
                // If some items are still checked, remove unchecked items
                // Grab string value for category content span
                var existing = $("#"+cat+"-content").html();

                // Split into array
                var arr = existing.split(", ");
                
                // Find index of value in array
                var ind = arr.indexOf(value);
                
                // Remove from array
                arr.splice(ind,1);
                
               // Join array
                var newStr = arr.join(", ");
                
                // Display new list in content span
                $("#"+cat+"-content").html(newStr);
            }
            else{
                // Remove section if no checkboxes are checked
                $("#"+cat).css("display","none");
                
                // Clear content list
                $("#"+cat+"-content").html("");
            }
        }
    });
    
    $("#copy").click(function() {
        var copytext;
        $(".section:visible").each(function() {
            if(copytext) {copytext = copytext+"\n"+$(this).text();}
            else {copytext = $(this).text();}
        });
        
        copyToClipboard(copytext);
    });
    
    $("#clear").click(function() {
        var base = `
<div id="vm" class="section"><span id="vm-header">VM -</span> <span id="vm-content"></span><br></div>
<div id="v2v" class="section"><span id="v2v-header">V2V -</span> <span id="v2v-content"></span><br></div>
<div id="fp" class="section"><span id="fp-header">CONFIRMED FP: </span> <span id="fp-content"></span><br></div>
<div id="review" class="section"><span id="review-header">REVIEWED: </span> <span id="review-content"></span><br></div>
<div id="step" class="section"><span id="step-header">NEXT STEP: </span> <span id="step-content"></span><br><br></div>

<div id="follow" class="section"><span id="follow-header">FOLLOW-UP: </span> <span id="follow-content"></span><br><br></div>

<div id="email" class="section"><span id="email-header">POST-CALL EMAIL: </span> <span id="email-content"></span></div>`;
        
        $("#box").html(base);
        $('input:checkbox').prop("checked",false);
    });

});