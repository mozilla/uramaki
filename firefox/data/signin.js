
var login_done = false;

console.log("loading signin.js");

$('#login').submit(function(e) {
  if (!login_done)
    self.port.emit('login', $('#email').val());
  login_done = true;
  $('#signin').hide();
  return false;
});

