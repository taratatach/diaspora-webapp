
document.getElementById('submitButton').addEventListener('click', redirect, false);
document.getElementById('installLink').addEventListener('click', install, false);

function redirect() {
  var handle = document.getElementById('podurl').value;
  var handleregexp = new RegExp(/[A-Za-z0-9_]+@(([a-zA-Z0-9\-]*)\.)+([A-Za-z0-9\-]{2,})/);
  
  if (!handleregexp.test(handle)) {
    var error_message = document.getElementById('error');
    error_message.className = '';
    error_message.textContent = '"' + handle + '" is not a correct handle!';
  } else {
    var splitted = handle.split('@');
    window.location = 'https://' + splitted[1] + '/users/sign_in?user[username]=' + splitted[0];
  }
}

function install() {
  var request = window.navigator.mozApps.install("http://flaburgan.github.io/diaspora-webapp/manifest.webapp");
  request.onsuccess = function () {
    // Save the App object that is returned
    var appRecord = this.result;
    alert('Installation successful!');
  };
  request.onerror = function () {
    // Display the error information from the DOMError object
    alert('Install failed, error: ' + this.error.name);
  };
}
