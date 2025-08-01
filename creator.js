var otherInstrumentals;
var otherLyricVideos;
var instrumentalID;
var lyricsID;

async function findVideos(song) {
    document.title = song + " - KaraokeTube";
    progress.value = 0;
    progress.style.display = "inline"
    var instrumentals = await (await fetch("https://www.googleapis.com/youtube/v3/search?q=" + song + " instrumental&type=video&videoEmbeddable=true&key=AIzaSyA-ZFrKnMfSPvRnNzk2g7rMNuAEGnCmn00&part=snippet&maxResults=50")).json();
    if (instrumentals.error) {
        var error = instrumentals.error.errors[0]
        alert("There was an error finding videos:\nError Code: " + error.domain + "." + error.reason + "\nFind videos manually on YouTube, or try again later.")
        songFormContainer.style.marginTop = "20px";
        progress.style.display = "none";
        showPreviews();
        return;
    }
    progress.value++;
    otherInstrumentals = instrumentals.items;
    var instrumental = instrumentals.items[0].id.videoId;
    progress.value++;
    var lyricVideos = await (await fetch("https://www.googleapis.com/youtube/v3/search?q=" + song + " lyric video&type=video&videoEmbeddable=true&key=AIzaSyA-ZFrKnMfSPvRnNzk2g7rMNuAEGnCmn00&part=snippet&maxResults=50")).json();
    if (lyricVideos.error) {
        var error = lyricVideos.error.errors[0]
        alert("There was an error finding videos:\nError Code: " + error.domain + "." + error.reason + "\nFind videos manually on YouTube, or try again later.")
        songFormContainer.style.marginTop = "20px";
        progress.style.display = "none";
        showPreviews();
        return;
    }
    progress.value++;
    otherLyricVideos = lyricVideos.items;
    var lyrics = lyricVideos.items[0].id.videoId;
    progress.value++;
    progress.style.display = "none";
    songFormContainer.style.marginTop = "20px";
    showPreviews(instrumental, lyrics)
}

function showPreviews(musicID, lyricID) {
    instrumentalID = musicID;
    lyricsID = lyricID;
    showFrame(musicFrame, musicID)
    showFrame(lyricFrame, lyricID)
    vcLeft.style.display = "inline-block";
    vcRight.style.display = "inline-block";
    savebtn.style.display = "block";
    createbtn.style.display = "inline";
}

function showFrame(frame, id, time) {
    if (!time) {
        time = 0;
    }
    frame.src = "https://www.youtube.com/embed/" + id + "?start=" + time;
}

function getKaraokeURL() {
    // change to just play in prod
    return `play?music=${instrumentalID}&lyrics=${lyricsID}&musicStart=${musicStart.value}&lyricsStart=${lyricStart.value}`;
}

async function saveSong() {
    if (localStorage.getItem("saves")) {
        var saves = JSON.parse(localStorage.getItem("saves"));
    } else {
        var saves = [];
    }
    var saveName = prompt("Name", song.value)
    if (saveName) {
        var vidInfo = await (await fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + instrumentalID)).json();
        saves.push({
            title: saveName,
            icon: vidInfo.thumbnail_url,
            url: getKaraokeURL()
        });
        localStorage.setItem("saves", JSON.stringify(saves));
    }
}

function parseID(url) {
    return url.replace("youtu.be", "youtube.com").split("youtube.com/")[1].replace("watch?v=", "").replace("embed/", "").split("?")[0].split("&")[0]
}