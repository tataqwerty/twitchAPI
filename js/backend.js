(function(){
	window.backend = {
		start: function(){
			window.backend.getXhr(window.CONST.URL + 'search/channels?query=' + window.CONST.MAIN_USER, function(user){
				var id = user.channels[0]._id;

				window.backend.getXhr(window.CONST.URL + 'users/' + id + '/follows/channels', function(follows){
					window.data.createData(follows.follows.map(function(element){
						return element.channel;
					}));
				}, true);
			}, true);
		},
		getXhr: function(url, cb, async){
			var xhr = new XMLHttpRequest();
			xhr.addEventListener('load', function(){
				cb(JSON.parse(xhr.response));
			});
			xhr.open("GET", url, async);
			xhr.setRequestHeader('Client-ID', window.CONST.CLIENT_ID);
			xhr.setRequestHeader('Accept', window.CONST.ACCEPT);
			xhr.send();
		}
	};
})();