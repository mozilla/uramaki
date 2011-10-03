var DNT_HEADER = {name:"DNT", value:"1"};

chrome.experimental.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    var headers = details.requestHeaders;

    if (get_user().dnt != "")
       headers[headers.length] = DNT_HEADER;

    return {requestHeaders: headers};
  },
  {},
  ["requestHeaders", "blocking"]);


