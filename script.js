
document.getElementById('submitButton').addEventListener('click', redirect, false);

function redirect() {
  var input = document.getElementById('podurl').value.split('@');
  var handle = input[0], url = input[1];
  
  if (url === undefined || !url.contains('.')) {
    var error_message = document.getElementById('error');
    error_message.className = '';
    error_message.textContent = input + ' is not a correct handle!';
  } else {
    window.location = 'https://' + url + '/users/sign_in';
  }
}
