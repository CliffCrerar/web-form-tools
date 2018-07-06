/**
 * SEND requests to webmail relay service
 * @summary This file is responsible for submitting the form and sending it to the mail service on the web host
 * @author Cliff Crerar
 * Created at     : 2018-04-13 21:47:29
 * Last modified  : 2018-07-06 22:46:45
 */

/* REQUEST TO COM SERVICE RUNNING ON THE WEBHOST */
const submitMail = function (data) {
  var port = 8002;
  var url = 'http://' + IP + ':' + port;
  console.log(url);

  $.ajax({
    origin: '*',
    datatype: 'text/json',
    method: 'POST',
    contentType: 'text/plain',
    data: data,
    url: url,
    success: function (data, textStatus, jQxhr) {
      console.log(data, textStatus, jQxhr);
    },
    error: function (data, textStatus, error) {
      console.log(data, textStatus, error);
    }
  });
};

/* EVENT THAT FIRES THE SUBMISSION OF THE WEB FORM */
$('#sendMail').on('click', function () {
  var name = $('#name-form1-y').val();
  var email = $('#email-form1-y').val();
  var phone = $('#phone-form1-y').val();
  var msg = $('#message-form1-y').val();
  var data = {
    name: name,
    email: email,
    phone: phone,
    msg: msg
  };

  // var submitMail = require('./assets/submitmail/submitmail.js');
  var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    data.name == '' ||
    data.email == '' ||
    data.email.match(pattern) == null
  ) {
    console.log('not send mail');
    $('.notSent')
      .show()
      .fadeOut(3000);
  } else {
    submitMail(JSON.stringify(data));
    $('.Sent')
      .show()
      .fadeOut(3000);
    $('#sendMail').css('pointer-events', 'unset');
    setTimeout(function () {
      $('.form-control').val('');
      $('.form-control').css('border-color', '#f5f5f5');
    }, 500);
  }
});
