// get the bookmarks

//$.get("http://localhost:8000/bookmarks", {}, function(bookmarks) {
//  update_bookmarks(bookmarks);
//  });

// hacks for now
USERS = {
  'alice': {
    'name': 'Alice',
    'dnt': false,
    'bookmarks': [
      {
        "url" : "http://disney.go.com/disneypictures/aliceinwonderland/",
        "title" : "Alice in Wonderland"
      },
      {
        "url" : "http://mozilla.org",
        "title" : "Mozilla"
      },
      {
        "url" : "http://theonion.com",
        "title" : "The Onion"
      }    
    ]
  },
  'bob': {
    'name': 'Bob',
    'dnt': true,
    'bookmarks': [
      {
        "url" : "http://www.bobthebuilder.com/",
        "title" : "Bob the Builder"
      },
      {
        "url" : "http://mozilla.org",
        "title" : "Mozilla"
      },
      {
        "url" : "http://theonion.com",
        "title" : "The Onion"
      }    
    ]    
  }
};

var CURRENT_USER = 'alice';
var CALLBACKS = [];

function set_user(user) {
  CURRENT_USER = user;
  var user_obj = USERS[user];
  if (!user_obj)
    return;

  update_bookmarks(user_obj.bookmarks);

  CALLBACKS.forEach(function(cb) {
    if (cb)
      cb();
  });
}

function get_user() {
  return USERS[CURRENT_USER];
}

function registerUserChange(func) {
  CALLBACKS.push(func);
}

set_user('alice');