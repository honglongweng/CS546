(function($) {
  //fixed in html, changed ids and class names to match
  const theForm = $("#email-form");
  const theEmail = $("#the-email");
  const theMessage = $("#the-message");
  var theResult = $("#the-result");

  theForm.submit(e => {
    e.preventDefault();
    const formData = {
      email: theEmail.val(),
      //had to call it message instead of text
      message: theMessage.val()
    };

    $.ajax({
      type: "POST",
      url: "/",
      data: JSON.stringify(formData),
      success: function(data) {
        // have to parse out the JSON after stringifying it
        var parsedData = JSON.parse(data);
        theResult.text(parsedData.reply);
      },
      contentType: "application/json",
      dataType: "json"
    });
  });
})(jQuery); // jQuery is exported as $ and jQuery
