$(document).ready(function () {
    var channelName = "UCpAPBJHsP6NgYQ42RD1jUng";
    var keyAPI = "AIzaSyAmA4vXhjej3nOUtXK7cg3ef_Z6Bq-aXzw";
    var pid;
    var id;
    
    $.get('https://www.googleapis.com/youtube/v3/channels', {
        part: 'contentDetails',
        id: channelName,
        key: keyAPI
    }, function (data) {
        $.each(data.items, function (i, item) {
            pid = item.contentDetails.relatedPlaylists.uploads;
            id = item.id;
            get_Videos(pid);
        });
    });

    function get_Videos(pid, token) {
        var nextToken = token || '';
        $.get('https://www.googleapis.com/youtube/v3/playlistItems', {
            part: 'snippet',
            maxResults: 50,
            playlistId: pid,
            pageToken: nextToken,
            key: keyAPI
        }, function (data) {
            var titulo;
            var videoid;
            var next = data.nextPageToken;

            $.each(data.items, function (i, item) {
                titulo = item.snippet.title;
                videoid = item.snippet.resourceId.videoId;
                getStatistics(videoid, titulo);
            });
            if (typeof next !== 'undefined') {
                get_Videos(pid, next);
            }
        });
    }

    function getStatistics(id, titulo) {
        $.get('https://www.googleapis.com/youtube/v3/videos', {
            part: 'statistics,contentDetails',
            id: id,
            key: keyAPI
        }, function (data) {
            var output;

            $.each(data.items, function (i, item) {
                output = "<li class='titulo'>" + titulo + "</li>" +
                        "<li class='estadisticas'>" + item.statistics.viewCount + "</li>" +
                        "<li class='estadisticas'>" + item.contentDetails.duration + "</li>";
                $("#results").append(output);
            });
        });
    }
});