
/* focus on name field when page loads up */
$('#name').focus();


// Hide new input element. If 'other' selected show input.
$('#other-title').hide();

$('#title').change(function () {
    if ($(this).val() == 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

/* variable themeSele is assigned new html element option to 
beginning of select options

*/
const themeSele = '<option selected="selected" id="themeSele">Please select a T-shirt theme</option>';

if ($('#design option:selected').text() == 'Select Theme') {
    $('#color').prepend(themeSele).attr('disabled', 'disabled');;
}



/*  Hiding color */
$('#colors-js-puns').hide();

$('#design').change(function (event) {

    // Show color when design is selected   
    if ($(event.target).val() !== "") {
        $('#colors-js-puns').show();
    }

    $('#themeSele').remove();
    $('#color').removeAttr('disabled');

    $('#color option').each(function (i, option) {
        $(option).hide();
    });

    $('#color').find('option').eq(0).removeAttr('selected');
    $('#color').find('option').eq(3).removeAttr('selected');

    if ($(this).val() == 'js puns') {
        $('#color option[value="cornflowerblue"]').show().attr('selected', 'selected');
        $('#color option[value="darkslategrey"]').show();
        $('#color option[value="gold"]').show();

    } else if ($(this).val() == 'heart js') {
        $('#color option[value="tomato"]').show().attr('selected', 'selected');
        $('#color option[value="steelblue"]').show();
        $('#color option[value="dimgrey"]').show();

    } else {
        $('#color').prepend(themeSele).attr('disabled', 'disabled');
    }

});

//total activity cost
let elementTotal = "<div></div>";
$('.activities').append(elementTotal);
let totalActivityCost = 0;


// Listener for changes in the activity section
$('.activities').change(function (event) {

    const clicked = $(event.target);

    const activityCost = clicked.attr('data-cost').replace(/[^\d]/, '');
    //Update and display the total activity cost
    if (clicked.is(':checked')) {
        totalActivityCost += parseInt(activityCost);
    } else {
        totalActivityCost -= parseInt(activityCost);
    }

    $('.activities div').text('Total: $' + totalActivityCost);

    // Disable conflicting activities	
    const activityChecked = clicked.attr('data-day-and-time');

    $('.activities input').each(function (i, input) {
        const checkboxes = $(input).attr('data-day-and-time');
        const clickedActivity = clicked.parent().text(); // the current clicked activity 
        const inputActivity = $(input).parent().text(); // is this equal to the activty in the loop 

        if (activityChecked === checkboxes && clickedActivity !== inputActivity) {
            if (clicked.is(':checked')) {
                $(input).prop('disabled', true);
                $(input).parent().css('color', 'grey');
            } else {
                $(input).prop('disabled', false);
                $(input).parent().css('color', '#000');
            }
        }

    });
});
// Hide payment information content until selected from dropdown
$('#payment option[value="select method"]').remove();
$('div p').eq(0).hide();
$('div p').eq(1).hide();

// on change event handler to show and hide payment options 
$('#payment').change(function (event) {
    if ($('#payment').val() == 'credit card') {
        $('div .credit-card').show();
        $('div p').eq(0).hide();
        $('div p').eq(1).hide();
    }
    if ($('#payment').val() == 'paypal') {
        $('div p').eq(0).show();
        $('div .credit-card').hide();
        $('div p').eq(1).hide();
    }
    if ($('#payment').val() == 'bitcoin') {
        $('div p').eq(1).show();
        $('div .credit-card').hide();
        $('div p').eq(0).hide();
    }
});


function validateNameField() {
    // Check field for input. 
    $('fieldset input#name').keyup(function () {
        /* If no input, an error message in the form of 
     a red border is given. */
        if ($('input#name').val() !== "") {
            $('label[for="name"]').css('color', '');
            $('input#name').css('border', '');
        }
    });

    if ($('input#name').val() == "") {
        $(' label[for="name"]').css('color', 'red');
        $('input#name').css('border', 'red 2px solid');
        $('input#name').focus();
        return false;
    }

    return true;
}

function validateEmailField() {

    /* reg expr to test if input is valid */
    const emailreg = /^[^@]+@[^@.]+\.[a-z]+$/i;

    $('fieldset input#mail').keyup(function () {
        if ($('input#mail').val() !== "" && emailreg.test($('input#mail').val())) {
            $('label[for=mail]').css('color', '');
            $('input#mail').css('border', '');
        }
    });





    $('input#mail').keyup(function () {
        /* Remove error on keyup when user inputs formated email. */
        if (emailreg.test($('input#mail').val()) && $('input#name').val() !== "") {
            $('.error').remove();
        }
    });

    /* return false if invalid email and alert user to enter valid email format
      */
    if (!emailreg.test($('input#mail').val()) && $('input#name').val() !== "") {
        $('input#mail').focus()
        $('label[for=mail]').css('color', 'red');
        $('input#mail').css('border', 'red 2px solid');
        $('input#mail').after('<span class="error">Please submit a formated email address (for ex: name@place.com)</span>');
        return false;
    }
    if ($('input#mail').val() == "") {
        $('label[for=mail]').css('color', 'red');
        $('input#mail').css('border', 'red 2px solid');
        return false;
    }

    return true;
}

function validateActivity() {

    const mailExist = $('input#mail').val() !== "";
    const nameExist = $('input#name').val() !== "";
    const activityDoesNotExist = $('.activities input[type=checkbox]').prop('checked') === false;

    if (activityDoesNotExist && mailExist && nameExist) {
        $('input[type=checkbox]').focus();
    }
    $('.activities input[type=checkbox]').click(function (event) {
        if ($(event.target).prop('checked')) {
            $('.activities legend').css('color', '');
        }
    });
    if ($('.activities input[type=checkbox]').prop('checked') === false) {
        $('.activities legend').css('color', 'red');
        return false;
    }
    return true;
}

function validateCreditCard() {

    $('fieldset span').remove(); // removes any extra error messages wrapped in span tag on submit.

    /* 
     For real time error messages 
       
 */
/*     Error message - asking for number range
        when a user types credit card number 
        
 */    $('div input#cc-num').after('<span class="cc-error">Card #\'s should be 13-16 numbers.</span>');
    $('div .cc-error').hide();

    /* error message when  user enters credit card number over 16 digits */
    $('div input#cc-num').after('<span class="cc-error-x">That\'s more than 16 numbers.</span>');
    $('div .cc-error-x').hide();

    /*  error message for wrong zip code  */
    $('div input#zip').after('<span class="zip-error">Use 5 digit zip!</span>');
    $('div .zip-error').hide();

    /* error message for > or < 3 CVV digits */
    $('div input#cvv').after('<span class="cvv-error">CVV is 3 digits!</span>');
    $('div .cvv-error').hide();

    /*  Credit card validation regex validation for credit card number
    cvv and zipcode	 */

    const ccardnumber = /^[0-9]{13,16}$/;  // regex for 13 - 16 digts
    const cvv = /^\d{3}$/;  // regex for 3 digit cvv ony
    const zipcode = /^\d{5}$/; // regex for 5 digits



    if ($('#payment').val() == 'credit card') {


        $('input#cc-num').keyup(function () {
            if (ccardnumber.test($('input#cc-num').val())) {
                $('label[for="cc-num"]').css('color', '');
                $('input#cc-num').css('border', '');
                $('div .cc-error').hide();
                $('div .cc-error-x').hide();
            } else {
                $('label[for="cc-num"]').css('color', 'red');
                $('input#cc-num').css('border', 'red 2px solid');
                $('div .cc-error').show();
                $('div .cc-error-x').hide();
            }
            if ($('input#cc-num').val().length > 16) {
                $('div .cc-error').hide();
                $('div .cc-error-x').show();
            }
        });


        $('input#zip').keyup(function () {
            if (zipcode.test($('input#zip').val())) {
                $('label[for="zip"]').css('color', '');
                $('input#zip').css('border', '');
                $('div .zip-error').hide();
            }
            else {
                $('label[for="zip"]').css('color', 'red');
                $('input#zip').css('border', 'red 2px solid');
                $('div .zip-error').show();
            }
            if ($('input#zip').val().length < 5 || $('input#zip').val().length > 5) {
                $('div .zip-error').show();
            }
        });


        $('input#cvv').keyup(function () {
            if (cvv.test($('input#cvv').val())) {
                $('label[for="cvv"]').css('color', '');
                $('input#cvv').css('border', '');
                $('div .cvv-error').hide();
            }
            else {
                $('label[for="cvv"]').css('color', 'red');
                $('input#cvv').css('border', 'red 2px solid');
                $('div .cvv-error').show();
            }
            if ($('input#cvv').val().length > 3 || $('input#cvv').val().length < 3) {
                $('div .cvv-error').show();
            }
        });

    }

    // this runs when credit card is not selected
    if ($('#payment').val() == 'paypal' || $('#payment').val() == 'bitcoin') {
        return true;
    }


    if ($('#payment').val() == 'credit card') {
        if (!ccardnumber.test($('input#cc-num').val()) && !zipcode.test($('input#zip').val()) && !cvv.test($('input#cvv').val())) {
            $('#credit-card div label').css('color', 'red');
            $('#credit-card input').css('border', 'red 2px solid');
            return false;
        }
    }
    if (!ccardnumber.test($('input#cc-num').val())) {
        $('label[for="cc-num"]').css('color', 'red');
        $('input#cc-num').css('border', 'red 2px solid');
        return false;
    }
    if (!zipcode.test($('input#zip').val())) {
        $('label[for="zip"]').css('color', 'red');
        $('input#zip').css('border', 'red 2px solid');
        return false;
    }
    if (!cvv.test($('input#cvv').val())) {
        $('label[for="cvv"]').css('color', 'red');
        $('input#cvv').css('border', 'red 2px solid');
        return false;
    }

    return true;
}


function validateUserFields() {


    console.log(validateNameField());
    console.log(validateEmailField());
    console.log(validateActivity());
    console.log(validateCreditCard());

    if (validateNameField() && validateEmailField() && validateActivity() && validateCreditCard()) {
        return true;
    } else {
        return false;
    }
}

$('form').submit(function (event) {
    if (validateUserFields()) {
        return true;
    } else {
        event.preventDefault(); //return false;
    }
});