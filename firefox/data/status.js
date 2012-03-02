
// focus the email dialog
self.port.on('show', function(id) {
  $('#email').html(id.identities[0]);
});

$('#logout').click(function(e) {
  self.port.emit('logout');
});

