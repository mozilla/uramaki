
exports.discover = function(email, cb) {
  cb({
    loginURL: 'http://localhost:8000/bcp/login',
    provisionURL: 'http://localhost:8000/bcp/provision',
    discoveryURL: 'http://localhost:8000/bcp/discovery'
  });
};