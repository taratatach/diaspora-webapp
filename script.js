// start init function when localization is ready
navigator.mozL10n.ready(init);
//window.addEventListener("load", init, false);

function init() {
  document.getElementById('login-form').addEventListener('submit', submit, false);
  
  if (window.localStorage.length > 0) {
    var div = document.getElementById('previousHandles');
    
    // Modify indications
    var existingHandlesLabel = document.createElement('p');
    existingHandlesLabel.id = 'existing-handles-label';
    existingHandlesLabel.setAttribute('data-l10n-id', 'select-id');
    div.appendChild(existingHandlesLabel);
    document.getElementById('podurl-label').setAttribute('data-l10n-id', 'enter-new-id');
    // Add previous handles to a list
    var ul = document.createElement('ul');
    for (var i = 0; i < window.localStorage.length; i++) {
      var handle = window.localStorage.key(i);
      var li = document.createElement('li');
      var linkToPod = document.createElement('a');
      var removeIcon = document.createElement('img');
      var removeString = 'Remove this diaspora* ID';
      
      linkToPod.setAttribute('href', getUrl(handle));
      linkToPod.setAttribute('title', 'Go to my pod!');
      linkToPod.appendChild(document.createTextNode(handle));
      
      removeIcon.setAttribute('src', './design/monotone_close_exit_delete.png');
      removeIcon.setAttribute('alt', removeString);
      removeIcon.setAttribute('title', removeString);
      removeIcon.setAttribute('class', 'deleteHandle');
      removeIcon.setAttribute('data-handle', handle);
      removeIcon.addEventListener('click', deleteHandle, false);
      
      li.appendChild(removeIcon);
      li.appendChild(linkToPod);
      ul.appendChild(li);
    }
    div.appendChild(ul);
  }
}

function submit(e) {
  e.preventDefault();
  var handle = document.getElementById('podurl').value;
  var handleregexp = new RegExp(/[A-Za-z0-9_]+@(([a-zA-Z0-9\-]*)\.)+([A-Za-z0-9\-]{2,})/);
  
  if (!handleregexp.test(handle)) {
    var error_message = document.getElementById('error');
    error_message.className = '';
    error_message.setAttribute('data-l10n-id', 'incorrect-id');
    error_message.setAttribute('data-l10n-args', JSON.stringify({"id": handle}));
  } else {
    // Store the handle in the localStorage
    window.localStorage.setItem(handle, "");
    // Redirect to the pod
    window.location = getUrl(handle);
  }
}

function getUrl(handle) {
    var splitted = handle.split('@');
    return 'https://' + splitted[1] + '/users/sign_in?user[username]=' + splitted[0];
}

function deleteHandle(event) {
  var img = event.target;
  var listElem = img.parentNode;
  
  // Remove the handle in the localStorage
  window.localStorage.removeItem(img.dataset.handle);
  // Remove the element from the list
  listElem.parentNode.removeChild(listElem);
  listElem = null;  
  
  if (window.localStorage.length == 0) {
    var existingHandlesLabel = document.getElementById('existing-handles-label');
    existingHandlesLabel.parentNode.removeChild(existingHandlesLabel);
    existingHandlesLabel = null;  
    document.getElementById('podurl-label').setAttribute('data-l10n-id', 'podurl-select');
  }
}
