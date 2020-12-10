let API_BASE = "https://www.omdbapi.com/?i=tt3896198&apikey=d7f309b0"

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

function setModal(title) {
    console.log("IT WORK")
    let mname = $("#movie_name")
    mname.val(title)
    mname.prop('readonly', true)
}

function doSearch() {
    let movie_title = $("#movie_search").val()
    var url = `${API_BASE}&s=${encodeURIComponent(movie_title)}`
    console.log(url)

    $.ajax({url: url, dataType: "json"}).then(function (data) {
            let entries = data.Search
            let movies = $("#movies")
            movies.html("")
            for (let i = 0; i < entries.length / 3; i++) {
                let rows = ""
                for (let j = 0; j < 3 && i * 3 + j < entries.length; j++) {

                    let entry = entries[i * 3 + j]
                    let card = `
                    <div class="col-sm-4">
                        <div class="card"">
                          <img class="card-img-top" src="${entry.Poster}" alt="${entry.Title}">
                          <div class="card-body">
                            <h5 class="card-title">${entry.Title}</h5>
                            <button onclick="setModal('${entry.Title}')" class="btn btn-primary" data-toggle="modal" data-target="#reviewModal">Add Review</button>
                          </div>
                        </div>
                    </div>
                `
                    rows += card
                }

                let row = $(`
            <div class="row">
                 ${rows}
            </div>
            `)
                movies.append(row)
            }
        }
    )
}