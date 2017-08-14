$(document).ready(function () {
    $('#search-btn').on('click', function () {  
    	var searchTag = getSearchTag();
		var searchResultPromise = dataService.flickrService(searchTag);
		searchResultPromise.then(function(result){
			 renderService.render(result);
		},function(error){
			renderService.renderError();
		});
		
	});

	$(document).on('mouseover', '.img-thumbnail', function(){
	    renderService.uitools.addHoverEffect($(this));
    });

	$(document).on('mouseout', '.img-thumbnail', function(){
		renderService.uitools.removeHoverEffect($(this));
    });

	$(document).on('click','.img-thumbnail',function(){
		renderService.uitools.loadFullImageInWindow($(this));	    
	}); 

	$(document).on('click','.download-btn',function(){
		renderService.uitools.downloadImage($(this));
	});

});


