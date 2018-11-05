class VideoPlayer {
    constructor () {
        this.player = document.querySelector('.player');
        this.video = this.player.querySelector('.viewer');
        this.progress = document.querySelector('.progress');
        this.progressFilled = document.querySelector('.progress__filled');
        this.toggle = document.querySelector('.player__button');
        this.ranges = document.querySelectorAll('.player__slider');
        this.skipButtons = document.querySelectorAll('[data-skip]');
    }

    init () {
        this.events();
        this.progressBarAnimation();
        this.saveStatus();
        this.getStatus();
    }

    events () {
        this.video.addEventListener('click', () => this.togglePlay());
        this.toggle.addEventListener('click', () => this.togglePlay());
        this.ranges.forEach(range => range.addEventListener('change', (e) => this.moveRange(e)));
        this.ranges.forEach(range => range.addEventListener('mousemove', (e) => this.moveRange(e)));
        this.skipButtons.forEach(btn => btn.addEventListener('click', (e) => this.skip(e)));
        this.progress.addEventListener('click', (e) => this.progressMove(e));
    }

    togglePlay() {
        this.video.paused ? this.video.play() : this.video.pause();
        !this.video.paused ? this.toggle.textContent = '❚ ❚' : this.toggle.textContent = '►';
    }

    skip(e) {
        this.video.currentTime += parseFloat(e.target.dataset.skip);
    }

    moveRange(e) {
        this.video[e.target.name] = e.target.value;
    }

    progressMove(e) {
        this.video.currentTime = e.offsetX / 320 * this.video.duration;
        this.progressFilled.style.flexBasis = `${e.offsetX / 320 * 100}%`
    }

    progressBarAnimation() {
        setInterval(() => {
            this.progressFilled.style.flexBasis = `${this.video.currentTime / this.video.duration * 100}%`
        }, 10)
    }

    saveStatus() {
        setInterval(() => {
            let statusObject = {
                volume: this.video.volume,
                position: this.video.currentTime,
                playbackRate: this.video.playbackRate
            };
            localStorage.setItem('statusObject', JSON.stringify(statusObject));
        }, 10)
    }

    getStatus() {
        let settingsObject = JSON.parse(localStorage.getItem('statusObject')) || {};
        this.video.volume = settingsObject.volume;
        this.video.playbackRate = settingsObject.playbackRate;
        this.video.currentTime = settingsObject.position;
        this.ranges[0].value = settingsObject.volume;
        this.ranges[1].value = settingsObject.playbackRate;
    }

}

let videoPlayer1 = new VideoPlayer();

videoPlayer1.init();
