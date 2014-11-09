// Handler for the share event
navigator.mozSetMessageHandler("activity", function(activity){
	if(activity.source.name == "share"){
		// obtain the URL from the activity
		var urlToShare = activity.source.data.url;
		if (window.localStorage.length > 1) {
		var div = document.getElementById('previousHandles');
		var existingHandlesLabel = document.createElement('p');
		existingHandlesLabel.id = 'existing-handles-label';
		existingHandlesLabel.appendChild(document.createTextNode('Please select one of your diaspora* ID:'));
		div.appendChild(existingHandlesLabel);
		
		// Add handles to a list
		var ul = document.createElement('ul');
		for (var i = 0; i < window.localStorage.length; i++) {
			var handle = window.localStorage.key(i);
			var li = document.createElement('li');
			var linkToPod = document.createElement('a');
		 
			linkToPod.setAttribute('href', getShareUrl(handle, urlToShare));
			linkToPod.setAttribute('title', 'Share to my pod!');
			linkToPod.appendChild(document.createTextNode(handle));
		 
			li.appendChild(linkToPod);
			ul.appendChild(li);
		}
		div.appendChild(ul);
		}
		else if (window.localStorage.length == 1){
				//if only one account, share directly to it
				var handle = window.localStorage.key(0);
				
				window.location = getShareUrl(handle, urlToShare);
		}
		else{
				// say that config is needed
				alert('Please configure a Diaspora* account first.');
		}
	}
});

// url to share something
function getShareUrl(handle, content) {
	var splitted = handle.split('@');
	return 'https://' + splitted[1] + '/bookmarklet?title=&url=' +	content;
}
