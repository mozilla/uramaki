
exports.discover = function(email, cb) {
  cb({
    loginURL: 'http://localhost:8080/bcp/login'
  });
};