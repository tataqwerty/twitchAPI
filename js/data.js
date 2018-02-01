(function(){
	var data = [];
	var copyData;

	window.data = {
		search: function(){
			var value = this.value;
			var tempData = copyData.slice();
			if(value) {
				var regExp = new RegExp(value, 'gi');
				tempData = copyData.slice().filter(function(obj){
					return regExp.test(obj.name);
				});
			}

			window.render(tempData);
		},
		sortArr: function(datasort){
			switch(datasort) {
				case 'Online': 
					copyData = Array.from(data).filter(function(obj){
						return obj.status === 'Online';
					});
					break;
				case 'Offline': 
					copyData = Array.from(data).filter(function(obj){
						return obj.status === 'Offline';
					});
					break;
				default : 
					copyData = Array.from(data);
					break;
			}
			window.render(copyData);
		},
		createData: function(array){
			data = [];
			array.forEach(function(element){
				var obj = {};
				obj.name = element.display_name;
				obj.img_url = element.logo;
				obj.stream_text = element.status;
				obj.link = element.url;

				window.backend.getXhr(window.CONST.URL + 'streams/' + element._id, function(bool){
					if(bool.stream === null){
						obj.status = 'Offline';
					} else {
						obj.status = 'Online';
					}
				}, false);

				data.push(obj);
			});
			copyData = Array.from(data);
			window.render(copyData);
		}
	};
})();