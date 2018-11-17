/* Resest the data inputted into the contact form */
function resetForm($form) {
    $form.find('input:text, textarea').val('');
}

jQuery(document).ready( function ($) {

    // Gets the form data
    var form = $('#email_form');

    // Gets the status div
    var status = $('#status');

    // Runs when submit button in the form is activated
	$(form).submit(function(event) {

		// Stop the browser from submitting the form
	    event.preventDefault();	    

	    // Steralizes the input
	    var formData = $(form).serialize();

	    // Submit the form using AJAX
		$.ajax({
			// Specifies the HTTP method
		    type: 'POST',
		    // Where the form data is sent to, in this case the url contained in the action attribute of the form
		    url: $(form).attr('action'),
		    // The data to be sent
		    data: formData,
		})

		// Runs if the response from server is successful
		.done(function(response) {

		    // Make sure that the status div has the 'success' class so it is green
		    $(status).removeClass('error');
		    $(status).addClass('success');

		    // Sets the message text
		    $(status).text(response);

		    // Clears the form of the data
		    resetForm($('#email_form'));
		})

		// Runs if the response from server is unsuccessful
		.fail(function(data) {

		    // Make sure that the status div has the 'error' class so it is red
		    $(status).removeClass('success');
		    $(status).addClass('error');

		    // Sets the message text
		    if (data.responseText !== '') {
		        $(status).text(data.responseText);
		    } else {
		        $(status).text('Oops! An error occured and your message could not be sent. Please try again, or email me using your mail client at edwardcelella@gmail.com.');
		    }
		});

	});
});

