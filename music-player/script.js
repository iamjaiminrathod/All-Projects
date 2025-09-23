const songs = [
    { title: "Song 1", artist: "Artist A", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", art: "https://i.scdn.co/image/ab67616d0000b273d4f3e3b0f60c2b9142b5e4db" },
    { title: "Song 2", artist: "Artist B", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", art: "https://i.scdn.co/image/ab67616d0000b273f0c6a55c55883a21d0c69b56" },
    { title: "Song 3", artist: "Artist C", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", art: "https://i.scdn.co/image/ab67616d0000b273f1a0a3f444d1d6f9f4e49b0c" }
];

let currentSong = 0;
const audio = new Audio(songs[currentSong].src);

const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');
const albumContainer = document.getElementById('albumContainer');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');

function loadSong(index){
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    artistName.textContent = songs[index].artist;
    albumArt.src = songs[index].art;
}

function playSong(){
    audio.play();
    playBtn.innerHTML = "⏸";
    albumContainer.classList.add('playing');
}

function pauseSong(){
    audio.pause();
    playBtn.innerHTML = "▶";
    albumContainer.classList.remove('playing');
}

playBtn.addEventListener('click', () => {
    if(audio.paused){
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + "%";
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Auto play next song
audio.addEventListener('ended', () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

// Initial load
loadSong(currentSong);
