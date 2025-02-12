const musicImage = document.querySelectorAll(".music-img");
const artistName = document.getElementById("artist");
const musicTitle =document.getElementById("songName");
const bigImage = document.getElementById("mainImg");
const player = document.querySelector(".bx-play-circle");
const playPause = document.querySelector(".bx-pause-circle");
const prev = document.querySelector(".bx-skip-previous");
const nexts = document.querySelector(".bx-skip-next");
const currentTimeDisplay = document.getElementById("start");
const totalDurationDisplay = document.getElementById("end");
const progBar = document.getElementById("progress-bar");
const progressCont = document.getElementById("progress-container");

let indexn =0;
let playMyMusic = new Audio();
let isPlaying = false;

/*document.addEventListener("DOMContentLoaded", function(){
    bigImage.style.animation = "none";
})*/

const listMusic = [
    './teboho_moloi_modimo_wa_boikanyo_visualizer_mp3_52661.mp3',
    './teboho_moloi_o_mosa_o_mohau_visualizer_mp3_52621.mp3',
    './teboho_moloi_o_mpha_tsohle_visualizer_mp3_52649.mp3',
    './teboho_moloi_prayer_visualizer_mp3_52686.mp3',
    './Ed Sheeran - Dive [Official Audio].mp3'
];
const artistNames = [
    'TEBOHO MOLOYI',
    'TEBOHO MOLOYI',
    'TEBOHO MOLOYI',
    'TEBOHO MOLOYI',
    'Ed Sheeran'
];
const muscNames = [
    'Modimo wa Boikanyo',
    'O mosa o mohau',
    'O mpha tsohle',
    'Prayer',
    'Dive'
];



musicImage.forEach((musicImg, index) =>{
    musicImg.addEventListener("click", function(e){
       let imgInfo = e.target.src;
       bigImage.src =imgInfo;
       indexn = index;
       musicImg.scrollIntoView({ behavior: "smooth", block: "center" });
       e.target.style.boxShadow = "0px 4px 15px  rgba(255, 255, 255, 0.8)";
       artistName.innerHTML = artistNames[indexn];
       musicTitle.innerHTML = muscNames[indexn];
    });
});
function setVolume(volControl){
    if(volControl === true){
        console.log("music is playing")
        playMyMusic.volume = 0.5;
    } 
}

function updateProgressBar(e) {
    const rect = progressCont.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(offsetX / rect.width, 1));
    progBar.style.width = `${percentage * 100}%`;
    playMyMusic.currentTime = percentage * playMyMusic.duration;
}

progressCont.addEventListener("click", updateProgressBar);

progressCont.addEventListener("mousedown", function (e) {
    isDragging = true;
    updateProgressBar(e);
});
document.addEventListener("mousemove", function (e) {
    if (isDragging) updateProgressBar(e);
});

document.addEventListener("mouseup", function () {
    isDragging = false;
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
function musicPlay(){
    playMyMusic.src =listMusic[indexn];
    playMyMusic.play();
    playMyMusic.onloadedmetadata = () => {
        totalDurationDisplay.innerHTML = formatTime(playMyMusic.duration);
    }
    setInterval(() => {
        currentTimeDisplay.innerText = formatTime(playMyMusic.currentTime);
        const progress = (playMyMusic.currentTime / playMyMusic.duration) * 100;
        progBar.style.width = progress + "%";
    }, 1000);
    isPlaying =true;
    setVolume(isPlaying);

    
}
function musicPause(){
    if(isPlaying){
        playMyMusic.pause();
        isPlaying = false;
    }
    
}

player.addEventListener("click", function(){
    player.style.display ="none";
    playPause.style.display ="block";
    musicPlay();
    
});

playPause.addEventListener("click", function(){
    player.style.display ="block";
    playPause.style.display ="none";
    musicPause();
})
nexts.addEventListener("click", function(){
    
    if(isPlaying && indexn <= listMusic.length){
        musicPause();
        let nextSong= indexn +1;
        let getimageLink = musicImage[nextSong].src;
        bigImage.src =getimageLink;
        playMyMusic.src =listMusic[nextSong];
        playMyMusic.play();
        playMyMusic.onloadedmetadata = () => {
            totalDurationDisplay.innerHTML = formatTime(playMyMusic.duration);
        }
        setInterval(() => {
            currentTimeDisplay.innerText = formatTime(playMyMusic.currentTime);
        }, 1000);
        isPlaying=true;
        indexn=nextSong;
        document.querySelectorAll(".music-img")[nextSong].scrollIntoView({ behavior: "smooth", block: "center" });
        artistName.innerHTML = artistNames[nextSong];
       musicTitle.innerHTML = muscNames[nextSong];
    }
    else if(indexn <= listMusic.length){
        let nextSong= indexn +1;
        let getimageLink = musicImage[nextSong].src;
        bigImage.src =getimageLink;
        playMyMusic.src =listMusic[nextSong];
        playMyMusic.play();
        playMyMusic.onloadedmetadata = () => {
            totalDurationDisplay.innerHTML = formatTime(playMyMusic.duration);
        }
        setInterval(() => {
            currentTimeDisplay.innerText = formatTime(playMyMusic.currentTime);
        }, 1000);
        indexn=nextSong;
        isPlaying=true;
        player.style.display ="none";
        playPause.style.display ="block";
        document.querySelectorAll(".music-img")[nextSong].scrollIntoView({ behavior: "smooth", block: "center" });
        artistName.innerHTML = artistNames[nextSong];
       musicTitle.innerHTML = muscNames[nextSong];
    }
})
prev.addEventListener("click", function(){
    
    if(isPlaying && indexn > 0){
        musicPause();
        let nextSong= indexn -1;
        let getimageLink = musicImage[nextSong].src;
        bigImage.src =getimageLink;
        playMyMusic.src =listMusic[nextSong];
        playMyMusic.play();
        playMyMusic.onloadedmetadata = () => {
            totalDurationDisplay.innerHTML = formatTime(playMyMusic.duration);
        }
        setInterval(() => {
            currentTimeDisplay.innerText = formatTime(playMyMusic.currentTime);
        }, 1000);
        isPlaying=true;
        indexn=nextSong;
        document.querySelectorAll(".music-img")[nextSong].scrollIntoView({ behavior: "smooth", block: "center" });
        artistName.innerHTML = artistNames[nextSong];
       musicTitle.innerHTML = muscNames[nextSong];
    }
    else if(indexn > 0){
        let nextSong= indexn -1;
        let getimageLink = musicImage[nextSong].src;
        bigImage.src =getimageLink;
        playMyMusic.src =listMusic[nextSong];
        playMyMusic.play();
        playMyMusic.onloadedmetadata = () => {
            totalDurationDisplay.innerHTML = formatTime(playMyMusic.duration);
        }
        setInterval(() => {
            currentTimeDisplay.innerText = formatTime(playMyMusic.currentTime);
        }, 1000);
        indexn=nextSong;
        isPlaying=true;
        player.style.display ="none";
        playPause.style.display ="block";
        document.querySelectorAll(".music-img")[nextSong].scrollIntoView({ behavior: "smooth", block: "center" });
        artistName.innerHTML = artistNames[nextSong];
       musicTitle.innerHTML = muscNames[nextSong];
    }
    
})
