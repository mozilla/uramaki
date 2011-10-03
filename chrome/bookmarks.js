// a tree is a list of nodes
function find_bookmark_by_title(tree, title) {
  if (!tree)
    return null;
  
  for (var i=0; i<tree.length; i++) {
    var node = tree[i];
    if (node.title == title)
      return node;
  }

  // nothing at top-level, keep going
  for (var i=0; i<tree.length; i++) {
    var node = tree[i];
    var subsearch = find_bookmark_by_title(node.children, title);
    if (subsearch)
      return subsearch;
  }

  return null;
}

var BOOKMARK_DIRECTORY = 'Firefox';

function update_bookmarks(bookmarks) {
  chrome.bookmarks.getTree(function(tree) {
    var bar = find_bookmark_by_title(tree, BOOKMARK_DIRECTORY);
    if (bar) {
      bar.children.forEach(function(bookmark) {
        chrome.bookmarks.removeTree(bookmark.id);
      });
    } else {
      // create it
      var bookmarks_bar = find_bookmark_by_title(tree, 'Bookmarks Bar');
      bar = chrome.bookmarks.create({
        parentId: bookmarks_bar.id,
        title: BOOKMARK_DIRECTORY
      });
    }

    // add the bookmarks
    bookmarks.forEach(function(one_bookmark) {
      one_bookmark.parentId = bar.id;
      chrome.bookmarks.create(one_bookmark);
    });
  });
}

