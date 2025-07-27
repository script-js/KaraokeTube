async function findVideos(song) {
    var instrumentals = await (await fetch("https://www.googleapis.com/youtube/v3/search?q=" + song + " instrumental&key=AIzaSyA-ZFrKnMfSPvRnNzk2g7rMNuAEGnCmn00&part=snippet&maxResults=50")).json();
    console.log(instrumentals);
    var instrumental = instrumentals.items[0].id.videoId;
    console.log(instrumental);
    var lyricVideos = await (await fetch("https://www.googleapis.com/youtube/v3/search?q=" + song + " lyric video&key=AIzaSyA-ZFrKnMfSPvRnNzk2g7rMNuAEGnCmn00&part=snippet&maxResults=50")).json();
    console.log(lyricVideos);
    var lyrics = lyricVideos.items[0].id.videoId;
    console.log(lyrics);
}