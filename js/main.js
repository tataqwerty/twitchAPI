// Не 'модульный' код

// var Url = 'https://api.twitch.tv/kraken/';
// var ClientId = 'ik3gr48hjvko86ilk926aafbmjjyi2';
// var Accept = 'application/vnd.twitchtv.v5+json';
// var mainUser = 'tataqwerty2829';
// var data = [];
// var copyData;
// var resultList = document.querySelector('.result-list');
// var template = document.querySelector('#result-item').content;
// var menuList = document.querySelector('.menu-list');
// var searchInput = document.querySelector('.search__item');

// var timing = 60000;

// var render = function(array){
// 	var fragment = document.createDocumentFragment();

// 	array.forEach(function(obj){
// 		if(obj.status === 'Offline'){
// 			obj.stream_text = '';
// 		}
// 		var element = template.cloneNode(true);
// 		element.querySelector('.item-link').setAttribute('href', obj.link);
// 		element.querySelector('.item__img').src = obj.img_url;
// 		element.querySelector('.item__name').textContent = obj.name;
// 		element.querySelector('.item__stream-text').textContent = obj.stream_text;
// 		element.querySelector('.item__status').textContent = obj.status;
// 		fragment.appendChild(element);
// 	});

// 	resultList.innerHTML = '';
// 	resultList.appendChild(fragment);
// };

// var createData = function(array){
// 	data = [];
// 	array.forEach(function(element){
// 		var obj = {};
// 		obj.name = element.display_name;
// 		obj.img_url = element.logo;
// 		obj.stream_text = element.status;
// 		obj.link = element.url;

// 		getXhr(Url + 'streams/' + element._id, function(bool){
// 			if(bool.stream === null){
// 				obj.status = 'Offline';
// 			} else {
// 				obj.status = 'Online';
// 			}
// 		}, false);

// 		data.push(obj);
// 	});
// 	copyData = Array.from(data);
// 	render(copyData);
// };

// var getXhr = function(url, cb, async){
// 	var xhr = new XMLHttpRequest();
// 	xhr.addEventListener('load', function(){
// 		cb(JSON.parse(xhr.response));
// 	});
// 	xhr.open("GET", url, async);
// 	xhr.setRequestHeader('Client-ID', ClientId);
// 	xhr.setRequestHeader('Accept', Accept);
// 	xhr.send();
// };

// var start = function(){
// 	getXhr(Url + 'search/channels?query=' + mainUser, function(user){
// 		var id = user.channels[0]._id;

// 		getXhr(Url + 'users/' + id + '/follows/channels', function(follows){
// 			createData(follows.follows.map(function(element){
// 				return element.channel;
// 			}));
// 		}, true);
// 	}, true);
// };

// window.onload = function(){
// 	start();
// 	var timeout = setInterval(start, timing);
// };


// var sortArr = function(datasort){
// 	switch(datasort) {
// 		case 'Online': 
// 			copyData = Array.from(data).filter(function(obj){
// 				return obj.status === 'Online';
// 			});
// 			break;
// 		case 'Offline': 
// 			copyData = Array.from(data).filter(function(obj){
// 				return obj.status === 'Offline';
// 			});
// 			break;
// 		default : 
// 			copyData = Array.from(data);
// 			break;
// 	}
// 	render(copyData);
// };

// menuList.addEventListener('click', function(e){
// 	e.preventDefault();
// 	var target = e.target.closest('.menu-list__item-link');
// 	if(!target) return;
// 	sortArr(target.dataset.sort);
// });


// searchInput.addEventListener('input', function(){
// 	var value = this.value;
// 	var tempData = copyData.slice();
// 	if(value) {
// 		var regExp = new RegExp(value, 'gi');
// 		tempData = copyData.slice().filter(function(obj){
// 			return regExp.test(obj.name);
// 		});
// 	}

// 	render(tempData);
// });

(function(){
	var data = [];
	var copyData;
	var menuList = document.querySelector('.menu-list');
	var searchInput = document.querySelector('.search__item');

	window.onload = function(){
		window.backend.start();
		var timeout = setInterval(window.backend.start, window.CONST.TIMING);
	};

	menuList.addEventListener('click', function(e){
		e.preventDefault();
		var target = e.target.closest('.menu-list__item-link');
		if(!target) return;
		var menuLinks = Array.from(menuList.querySelectorAll('.menu-list__item-link'));
		menuLinks.forEach(function(link){
			link.classList.remove('menu-list__item-link--active');
		});

		target.classList.add('menu-list__item-link--active');

		window.data.sortArr(target.dataset.sort);
	});

	searchInput.addEventListener('input', window.data.search);
})();