var page = 0;

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        makeApiCall(true)
    }
};

function makeApiCall(cont, ) {
    let tags = document.getElementById("searchEntry").value
    let count = document.getElementById("resultsSelect").value

    var url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=25c8bbe1afab5da5c1f1818f1fd07178&tags=${tags}&per_page=${count}&page=${page}&privacy_filter=1&safe_search=1&extras=url_sq&format=json&nojsoncallback=1;`

    $.ajax({ url: url, dataType: "json" }).then(function (data) {
        if (!cont) {
            $("#images").empty()
            page = 1;
        } else {
            page += 1;
        }
        let images = data.photos.photo
        console.log(images)
        // var t = ""
        for (let i = 0; i < images.length; i++) {
            let image = images[i]
            let card = `
            <div class="card col-2">
                <img src="${image.url_sq.replace('_s', '_b')}" class="card-img-top" alt="${image.title}">
                <div class="card-body">
                    <h3 class="card-title">${image.title}</h3>
                </div>
            </div>`

            console.log(card)

            $("#images").append(card)
        }

    })
}