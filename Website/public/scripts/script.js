function on_search_click(){
    query = $('#artistsearch').val()

    if(query.trim() == ''){
        alert('Please enter an artist')
    }else{
        $.ajax({
            url: "https://www.theaudiodb.com/api/v1/json/2/search.php",
            type: 'GET',
            data: {
                's': $('#artistsearch').val()
            },
            dataType: 'json',
            success: function(data){
                show_results(data.artists[0])
            },
            error: function(request, error){
                alert("Error fetching artist")
            }
        })
    }

}

function show_results(data){
    $('#show_results').css('display', 'block')

    if(data.strArtist == null){
        $('#review-button').prop('disabled', true)
    }else{
        $('#review-button').prop('disabled', false)
    }

    if(data.strWebsite == ''){
        $('#website-button').prop('disabled', true)
    }else{
        $('#website-button').prop('disabled', false)
        $('#website-button').attr('onclick', 'window.location.href="https://' + data.strWebsite + '"')
    }

    var no_banner = 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg'
    $('#banner').attr('src', data.strArtistBanner != null ? data.strArtistBanner : no_banner)
    $('#artist-name').html(data.strArtist != null ? data.strArtist : "unavailable")
    $('#modal-artist-name').val(data.strArtist != null ? data.strArtist : "unavailable")
    $('#formation-year').html(data.intFormedYear != 0 ? data.intFormedYear : "unavailable")
    $('#genres').html(data.strGenre != null ? data.strGenre : "unavailable")
    $('#bio').html(data.strBiographyEN != null ? data.strBiographyEN : "unavailable")
}

function add_review(){
    var artist = $('#modal-artist-name').val()
    var review = $('#modal-review').val()
    var date = new Date().toISOString().slice(0, 10)

    //TODO: insert query
    var query = ''

    $.ajax({
        url: "/query",
        type: 'GET',
        data: {
            query: query
        },
        dataType: 'json',
        success: function(data){
            alert('Added review')
        },
        error: function(request, error){
            alert("Error adding review")
        }
    })

    $('#review-modal').modal('hide')
    window.location.href = '/reviews'
    filter_review(artist)
}


function on_filter_click(){
    var target_artist = $('#reviewsearch').val()
    filter_review(target_artist)
}

function filter_review(artist){
    //TODO: Make sure these queries are correct
    if(artist == null){
        var query = 'SELECT * FROM reviews;'
    }else{
        var query = 'SELECT * FROM reviews WHERE artist_name="' + artist + '";'
    }

    $.ajax({
        url: "/query",
        type: 'GET',
        data: {
            query: query
        },
        dataType: 'json',
        success: function(data){
            populate_review_table(data)
        },
        error: function(request, error){
            alert("Error fetching reviews")
        }
    })

}

function populate_review_table(data){
    //TODO: Uncomment after postgres implementation and population works
    /*
    if(data.length = 0){
        filter_reivew(null)
    }
    */

    table_html = ''
    data.forEach(function(d){
        table_html += '<tr>'
        table_html += '<th scope="row">' + d.artist_name + '</th>'
        table_html += '<td>' + d.review + '</td>'
        table_html += '<td>' + d.review_date + '</td>'
        table_html += '</tr>'
    })

    $('#review-table-body').html(table_html)
}