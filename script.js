
document.getElementById('submitButton').addEventListener('click', redirect, false);

function redirect() {
  var handle = document.getElementById('podurl').value.split('@');
  var username = handle[0], url = handle[1];
  
  if (url === undefined || !url.contains('.')) {
    var error_message = document.getElementById('error');
    error_message.className = '';
    error_message.textContent = '"' + handle + '" is not a correct handle!';
  } else {
    window.location = 'https://' + url + '/users/sign_in?user[username]=' + username;
  }
}
