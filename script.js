window.addEventListener("load", init, false);

function init() {
  document.getElementById('submitButton').addEventListener('click', submit, false);
  
  if (window.localStorage.length > 0) {
    var list = document.getElementById("previousHandles");
    for (var i = 0; i < window.localStorage.length; i++) {
      var handle = window.localStorage.key(i);
      var li = document.createElement('li');
      var a = document.createElement('a');
      
      a.setAttribute('href', getUrl(handle));
      a.setAttribute('title', 'Go to my pod!');
      a.appendChild(document.createTextNode(handle));
      li.appendChild(a);
      list.appendChild(li);
    }
  }
}

function submit(e) {
  e.preventDefault();
  var handle = document.getElementById('podurl').value;
  var handleregexp = new RegExp(/[A-Za-z0-9_]+@(([a-zA-Z0-9\-]*)\.)+([A-Za-z0-9\-]{2,})/);
  
  if (!handleregexp.test(handle)) {
    var error_message = document.getElementById('error');
    error_message.className = '';
    error_message.textContent = '"' + handle + '" is not a correct handle!';
  } else {
    window.localStorage.setItem(handle, "");
    window.location = getUrl(handle);
  }
}

function getUrl(handle) {
    var splitted = handle.split('@');
    return 'https://' + splitted[1] + '/users/sign_in?user[username]=' + splitted[0];
}
