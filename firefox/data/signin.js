
var login_done = false;

$('#login').submit(function(e) {
  if (!login_done)
    self.port.emit('login', $('#email').val());
  login_done = true;
  $('#signin').hide();
  return false;
});

// browsing context provider
self.port.on("loadBCP", function(message) {
  $('#bcp').show();
  $('#bcp').attr('src',message.url);  
});