
var login_done = false;

console.log("loading signin.js");

// focus the email dialog
self.port.on('go', function(event) {
  login_done = false;
  window.setTimeout(function() {$('#email').focus();}, 100);
});

$('#login').submit(function(e) {
  if (!login_done)
    self.port.emit('login', $('#email').val());
  login_done = true;
  return false;
});

