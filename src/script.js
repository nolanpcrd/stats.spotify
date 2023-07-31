const clientId = "35822a8411044177b2ec9ea821d79c1a";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    await getAccessToken(clientId, code);
    const token = localStorage.getItem("token");
    const stats = await fetchProfile(token);
    const topArtistsShort = await stats.shortart;
    const topArtistsMedium = await stats.mediumart;
    const topArtistsLong = await stats.longart;
    const topTracksShort = await stats.shorttracks;
    const topTracksMedium = await stats.mediumtracks;
    const topTracksLong = await stats.longtracks;
    const profile = await stats.profile;
    stock_profile(profile, topArtistsShort, topArtistsMedium, topArtistsLong, topTracksShort, topTracksMedium, topTracksLong);
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    localStorage.setItem("token", access_token);
    return access_token;
}


// REQUESTS API SPOTIFY

async function fetchProfile(token) {
    const requests = [
        "https://api.spotify.com/v1/me",
        "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5",
        "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5",
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5",
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
        "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5",
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5"
    ];
    const fetchRequests = requests.map(request => {
        return fetch(request, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => response.json());
    });
    const [profile, shortart, mediumart, longart, shorttracks, mediumtracks, longtracks] = await Promise.all(fetchRequests);
    return {profile, shortart, mediumart, longart, shorttracks, mediumtracks, longtracks};
}

function stock_profile(profile, topArtistsShort, topArtistsMedium, topArtistsLong, topTracksShort, topTracksMedium, topTracksLong) {
    if (profile.display_name != null) {
        localStorage.setItem("name", profile.display_name);
    }
    localStorage.setItem("pfp", profile.images[0].url);
    localStorage.setItem("profileURL", profile.external_urls.spotify);
    localStorage.setItem("short_tracks", [topTracksShort.items[0].name, topTracksShort.items[1].name, topTracksShort.items[2].name, topTracksShort.items[3].name, topTracksShort.items[4].name]);
    localStorage.setItem("medium_tracks", [topTracksMedium.items[0].name, topTracksMedium.items[1].name, topTracksMedium.items[2].name, topTracksMedium.items[3].name, topTracksMedium.items[4].name]);
    localStorage.setItem("long_tracks", [topTracksLong.items[0].name, topTracksLong.items[1].name, topTracksLong.items[2].name, topTracksLong.items[3].name, topTracksLong.items[4].name]);
    localStorage.setItem("short_artists", [topArtistsShort.items[0].name, topArtistsShort.items[1].name, topArtistsShort.items[2].name, topArtistsShort.items[3].name, topArtistsShort.items[4].name]);
    localStorage.setItem("medium_artists", [topArtistsMedium.items[0].name, topArtistsMedium.items[1].name, topArtistsMedium.items[2].name, topArtistsMedium.items[3].name, topArtistsMedium.items[4].name]);
    localStorage.setItem("long_artists", [topArtistsLong.items[0].name, topArtistsLong.items[1].name, topArtistsLong.items[2].name, topArtistsLong.items[3].name, topArtistsLong.items[4].name]);
    localStorage.setItem("ShortArtistCover", [topArtistsShort.items[0].images[0].url, topArtistsShort.items[1].images[0].url, topArtistsShort.items[2].images[0].url, topArtistsShort.items[3].images[0].url, topArtistsShort.items[4].images[0].url]);
    localStorage.setItem("MediumArtistCover", [topArtistsMedium.items[0].images[0].url, topArtistsMedium.items[1].images[0].url, topArtistsMedium.items[2].images[0].url, topArtistsMedium.items[3].images[0].url, topArtistsMedium.items[4].images[0].url]);
    localStorage.setItem("LongArtistCover", [topArtistsLong.items[0].images[0].url, topArtistsLong.items[1].images[0].url, topArtistsLong.items[2].images[0].url, topArtistsLong.items[3].images[0].url, topArtistsLong.items[4].images[0].url]);
    localStorage.setItem("ShortTrackCover", [topTracksShort.items[0].album.images[0].url, topTracksShort.items[1].album.images[0].url, topTracksShort.items[2].album.images[0].url, topTracksShort.items[3].album.images[0].url, topTracksShort.items[4].album.images[0].url]);
    localStorage.setItem("MediumTrackCover", [topTracksMedium.items[0].album.images[0].url, topTracksMedium.items[1].album.images[0].url, topTracksMedium.items[2].album.images[0].url, topTracksMedium.items[3].album.images[0].url, topTracksMedium.items[4].album.images[0].url]);
    localStorage.setItem("LongTrackCover", [topTracksLong.items[0].album.images[0].url, topTracksLong.items[1].album.images[0].url, topTracksLong.items[2].album.images[0].url, topTracksLong.items[3].album.images[0].url, topTracksLong.items[4].album.images[0].url]);
    location.reload();
}
