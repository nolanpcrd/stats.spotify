function chargeprofile() {
    const short_artists = localStorage.getItem("short_artists").split(",");
    const short_tracks = localStorage.getItem("short_tracks").split(",");
    const short_art_covers = localStorage.getItem("ShortArtistCover").split(",");
    const short_tra_cover = localStorage.getItem("ShortTrackCover").split(",");
    document.getElementById("name").innerHTML = localStorage.getItem("name");
    document.getElementById("pfp").setAttribute("src", localStorage.getItem("pfp"));
    document.getElementById("avatar").setAttribute("href", localStorage.getItem("profileURL"));
    for (let i = 0; i < 5; i++) {
        document.getElementById("artist" + (i + 1) + "name").innerHTML = short_artists[i];
        document.getElementById("track" + (i + 1) + "name").innerHTML = short_tracks[i];
        document.getElementById("art" + (i + 1)).setAttribute("src", short_art_covers[i]);
        document.getElementById("tra" + (i + 1)).setAttribute("src", short_tra_cover[i]);
    }
}

function chargeShort() {
    const short_artists = localStorage.getItem("short_artists").split(",");
    const short_tracks = localStorage.getItem("short_tracks").split(",");
    const short_art_covers = localStorage.getItem("ShortArtistCover").split(",");
    const short_tra_cover = localStorage.getItem("ShortTrackCover").split(",");
    for (let i = 0; i < 5; i++) {
        document.getElementById("artist" + (i + 1) + "name").innerHTML = short_artists[i];
        document.getElementById("track" + (i + 1) + "name").innerHTML = short_tracks[i];
        document.getElementById("art" + (i + 1)).setAttribute("src", short_art_covers[i]);
        document.getElementById("tra" + (i + 1)).setAttribute("src", short_tra_cover[i]);
    }
}

function chargeMedium() {
    const medium_artists = localStorage.getItem("medium_artists").split(",");
    const medium_tracks = localStorage.getItem("medium_tracks").split(",");
    const medium_art_covers = localStorage.getItem("MediumArtistCover").split(",");
    const medium_tra_cover = localStorage.getItem("MediumTrackCover").split(",");
    for (let i = 0; i < 5; i++) {
        document.getElementById("artist" + (i + 1) + "name").innerHTML = medium_artists[i];
        document.getElementById("track" + (i + 1) + "name").innerHTML = medium_tracks[i];
        document.getElementById("art" + (i + 1)).setAttribute("src", medium_art_covers[i]);
        document.getElementById("tra" + (i + 1)).setAttribute("src", medium_tra_cover[i]);
    }
}

function chargeLong() {
    const long_artists = localStorage.getItem("long_artists").split(",");
    const long_tracks = localStorage.getItem("long_tracks").split(",");
    const long_art_covers = localStorage.getItem("LongArtistCover").split(",");
    const long_tra_cover = localStorage.getItem("LongTrackCover").split(",");
    for (let i = 0; i < 5; i++) {
        document.getElementById("artist" + (i + 1) + "name").innerHTML = long_artists[i];
        document.getElementById("track" + (i + 1) + "name").innerHTML = long_tracks[i];
        document.getElementById("art" + (i + 1)).setAttribute("src", long_art_covers[i]);
        document.getElementById("tra" + (i + 1)).setAttribute("src", long_tra_cover[i]);
    }
}