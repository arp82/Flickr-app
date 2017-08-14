var dataService = function() {

    var query = "http://www.flickr.com/services/feeds/photos_public.gne?tags=";

    function createURLForTagSearch(baseURL, searchFilterEntry){
        var url = baseURL + '{0}' + '&format=json&jsoncallback=?';
        url = String.format(url, searchFilterEntry);
        return url;
    };

    function fetchPicturesDataHTML(url){
        return new Promise(function(fulfill,reject){
            $.getJSON(url, function(data) {
                var htmlString = "";
                $.each(data.items, function(i, item) {
                    var sourceSquare = item.media.m;
                    htmlString += dynamicallyInjectPictureData(item);
                });
                fulfill(htmlString);
            }).error(function(){
                reject(Error("Could not load image data from the specified URL"));
            });
        });
    };

    function fetchPicturesData(url){
        return $.getJSON(url).then(function(data){
            return data;
        });
    };

    function flickrService(searchFilterEntry) {
        var urlComplete = createURLForTagSearch(query,searchFilterEntry);
        var searchResult = fetchPicturesData(urlComplete);
        return searchResult;
    };

    return {
        flickrService: flickrService
    };

}();
