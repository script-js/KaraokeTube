var otherInstrumentals;
var otherLyricVideos;
var instrumentalID;
var lyricsID;

async function findVideos(song) {
    progress.style.display = "block"
    var instrumentals = await (await fetch("https://www.googleapis.com/youtube/v3/search?q=" + song + " instrumental&type=video&videoEmbeddable=true&key=AIzaSyA-ZFrKnMfSPvRnNzk2g7rMNuAEGnCmn00&part=snippet&maxResults=50")).json();
    progress.value++;
    otherInstrumentals = instrumentals.items;
    var instrumental = instrumentals.items[0].id.videoId;
    progress.value++;
    var lyricVideos = await (await fetch("https://www.googleapis.com/youtube/v3/search?q=" + song + " lyric video&type=video&videoEmbeddable=true&key=AIzaSyA-ZFrKnMfSPvRnNzk2g7rMNuAEGnCmn00&part=snippet&maxResults=50")).json();
    progress.value++;
    otherLyricVideos = lyricVideos.items;
    var lyrics = lyricVideos.items[0].id.videoId;
    progress.value++;
    progress.style.display = "none";
    songForm.style.marginTop = "20px";
    showPreviews(instrumental, lyrics)
}

function showPreviews(musicID,lyricID) {
    instrumentalID = musicID;
    lyricsID = lyricID;
    showFrame(musicFrame,musicID)
    showFrame(lyricFrame,lyricID)
    vcLeft.style.display = "inline-block";
    vcRight.style.display = "inline-block";
    savebtn.style.display = "block";
    createbtn.style.display = "inline";
}

function showFrame(frame,id,time) {
    if (!time) {
        time = 0;
    }
    frame.src = "https://www.youtube.com/embed/" + id + "?start=" + time;
}

function getKaraokeURL() {
    // change to just play in prod
    return `play.html?music=${instrumentalID}&lyrics=${lyricsID}&musicStart=${musicStart.value}&lyricsStart=${lyricStart.value}`;
}

async function saveSong() {
    if (localStorage.getItem("saves")) {
        var saves = JSON.parse(localStorage.getItem("saves"));
    } else {
        var saves = [];
    }
    var vidInfo = await (await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + instrumentalID)).json();
    saves.push({
        title: prompt("Name",song.value),
        icon: vidInfo.thumbnail_url,
        url: getKaraokeURL()
    });
    localStorage.setItem("saves",JSON.stringify(saves));
}