/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form').get();
  var submitBtn = $('#form-submit-btn');
  
  // Set Stripe public key.Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    Stripe.setPublishableKey( 'pk_test_51IW1iZKtAXofh75xKS9B9EL76RMzaEU1bHtE1GDtP28T98XVkthE15TySUtZ7fcoNoWwK4CWImjumzYIiPjXjRhv00bFTpwMxi' );


  //When user clicks form submit btn
  submitBtn.click(function(event){
     //prevent default submission behaviour.
    event.preventDefault();
    
  //Collect the credit card fields.
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
  //Send the card info to Stripe
  Stripe.createToken({
    number:ccNum,
    cvc:cvcNum,
    exp_month: expMonth,
    exp_year: expYear
  }, stripeResponseHandler);
    
  });
 
  
  //Collect the credit card fields
  //Send the card info to Stripe
  //Stripe will return a card token
  //Inject card token as hidden field into form.
  //Submit form to our Rails app.
});
