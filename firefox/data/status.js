
// focus the email dialog
self.port.on('show', function(id) {
  $('#email').html(id.email);
});

$('#logout').click(function(e) {
  self.port.emit('logout');
});

