$(function () {


    $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {


        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns


                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;


                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {

                        $('#contact-form').find('.messages').html(alertBox);

                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });
});
