/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form').get();
  var submitBtn = $('#form-submit-btn');
  
  // Set Stripe public key.
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );

  //When user clicks form submit btn
  submitBtn.click(function(event){
     //prevent default submission behaviour.
    event.preventDefault();
    //Disables button and changes text to processing so user does not press again
    submitBtn.val("Processing").prop('disabled', true);
    
  //Collect the credit card fields.
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
      //Use Stripe JS library to check for card errors.
      var error = false;
      
      //Validate card number, double negation, basically an if statement is based on a true condition so the below
      //if the user types a correct number than the card validation is true, therefore with the exclaimation it's false (if not true), therefore error will be false.
      //But if the user enters an incorrect number than it becomes if not false, then it's a double negative (not,not) which equals to true and the code in this section is run
      if (!Stripe.card.validateCardNumber(ccNum)) {
        error = true;
        alert('The credit card number appears to be invalid');
      }
      //Valdiate CVC number
        if (!Stripe.card.validateCVC(cvcNum)) {
        error = true;
        alert('The three digit security number appears to be invalid');
      }
      
      //Valdiate expiration date
        if (!Stripe.card.validateExpiry(expMonth, expYear)) {
        error = true;
        alert('The expiration date appears to be invalid');
      }
      if (error) {
        // If there are card errors don't send to Stripe and re-enable button to Sign Up
       submitBtn.prop('disabled', false).val("Sign Up");
      } else {
         //Send the card info to Stripe
      Stripe.createToken({
        number:ccNum,
        cvc:cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
      }
      return false; 
    });
  //Stripe will return a card token
  function stripeResponseHandler(status, response) {
    //Get the token from the response
    var token = response.id;
      //Inject card token as hidden field into form.
      
      theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
      
    //Submit form to our Rails app.
    theForm.get(0).submit();
  }
});
