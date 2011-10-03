
var bg_page = chrome.extension.getBackgroundPage();

function update_dnt() {
  $('#dntstatus').attr("src", "http://dnt.mozilla.org/dnt_status.php?" + new Date().valueOf());
}

function refresh() {
  update_dnt();
  $('#name').html(bg_page.get_user().name);
}

$(document).ready(refresh);

bg_page.registerUserChange(refresh);

function toggle_dnt() {
  var user = bg_page.get_user();
  user.dnt = !user.dnt;
  
  update_dnt();
}

