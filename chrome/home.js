
function update_dnt() {
  $('#dntstatus').attr("src", "http://dnt.mozilla.org/dnt_status.php?" + new Date().valueOf());
}

$(document).ready(function() {
  update_dnt();
});

function toggle_dnt() {
  if (localStorage.dnt != "")
    localStorage.dnt = "";
  else
    localStorage.dnt = "1";
  
  update_dnt();
}

