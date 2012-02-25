
exports.discover = function(email, cb) {
  cb({
    loginURL: 'http://localhost:8000/bcp/login'
  });
};