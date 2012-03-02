window.onload = function() {
  document.getElementById("email").innerHTML = "---";
  // FIXME: lifetime of the authentication process is now a hint
  // if null it should be the default the site wants, but it
  // could be months or years if requested as such
  navigator.id.beginAuthentication(function(email, lifetime) {
    $("#email").html(email);
    $("#password").focus();
  });
};

function login() {
  // use email and password for SRP -- eventually XXX
  $.post(
    '/bcp/login',
    {email: $('#email').html(), password: $('#password').val()},
    function(result) {
      if (!result.success) {
        navigator.id.raiseAuthenticationFailure();
        return;
      }

      // XXX use real token
      var token = {id: "foo", key: "bar"};

      navigator.id.completeAuthentication(token);
    });
}
