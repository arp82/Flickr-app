var renderService = function(){
	var divImageContainerId = "#image-container";

	function dynamicallyInjectPictureData(item){
        var template = $('#thumbnailTemplate').html();
        var htmlString = Mustache.to_html(template,item);
        return htmlString;
    };

    function buildHTMLFromData(data){
    	var htmlString = "";
    	$.each(data.items, function(i, item) {
    		var sourceSquare = item.media.m;
    		htmlString += dynamicallyInjectPictureData(item);
    	});
    	return htmlString;
    };

	function showPicturesFromPromise(data){
		$(divImageContainerId).html(data);
	};

	function renderError(){
		console.error("Could not load imgages",error);
		$(divImageContainerId).html('<img class="img-responsive center-block" src="./content/images/404-error-page-not-found-sample-7.jpg"');
	};

	function showLoadingIcon(){
		var htmlCode = '<div class="col-xs-4 col-xs-offset-4">';
		htmlCode += '<img class="img-responsive center-block" src="./content/images/loading.gif"/>';
		htmlCode += '</div>';
		$(divImageContainerId).html(htmlCode);
	};

	function render(data){
		showLoadingIcon();
		var htmlString = buildHTMLFromData(data);
		showPicturesFromPromise(htmlString);
	}

	var uitools = function(){
		function addHoverEffect(jQueryReference){
			jQueryReference.addClass('transition');
		};
		function removeHoverEffect(jQueryReference){
			jQueryReference.removeClass('transition');
		};
		function loadFullImageInWindow(jQueryReference){
			var url = jQueryReference[0].src;
			url = url.replace("_m.jpg", "_b.jpg");
			var imageWindow = window.open(url, 'imageWindow');
		};
		function downloadImage(jQueryReference){
			var thumbnailNode = jQueryReference.closest('.div-thumbnail');
			var url = thumbnailNode.find('.img-thumbnail').attr('src');
			url = url.replace("_m.jpg", "_b.jpg");
			thumbnailNode.find('.a-thumbnail-download').attr('href',url).trigger('click');
		};
		return {
			addHoverEffect: addHoverEffect,
			removeHoverEffect: removeHoverEffect,
			loadFullImageInWindow: loadFullImageInWindow,
			downloadImage: downloadImage
		}
	}();

	return {
        render: render,
        renderError: renderError,
        uitools: uitools
    };

}();