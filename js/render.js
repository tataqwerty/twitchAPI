(function(){
	var resultList = document.querySelector('.result-list');
	var template = document.querySelector('#result-item').content;

	window.render = function(array){
		var fragment = document.createDocumentFragment();

		array.forEach(function(obj){
			var element = template.cloneNode(true);

			if(obj.status === 'Offline'){
				obj.stream_text = '';
			}

			if(obj.status === 'Online'){
				element.querySelector('.item-link').classList.add('item-link--stream');
			}
			
			element.querySelector('.item-link').setAttribute('href', obj.link);
			element.querySelector('.item__img').src = obj.img_url;
			element.querySelector('.item__name').textContent = obj.name;
			element.querySelector('.item__stream-text').textContent = obj.stream_text;
			element.querySelector('.item__status').textContent = obj.status;
			fragment.appendChild(element);
		});

		resultList.innerHTML = '';
		resultList.appendChild(fragment);
	};
})();