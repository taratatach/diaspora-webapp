
document.getElementById('submitButton').addEventListener('click', redirect, false);

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
