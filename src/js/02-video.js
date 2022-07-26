import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const VIDEOPLAYER_CURRENT_TIME = "videoplayer-current-time";

    const player = new Vimeo(iframe);

    player.on('timeupdate', throttle(saveVideoTime, 1000));

function saveVideoTime(event) {
    const currentSeconds = event.seconds;
    localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, currentSeconds);
}

const savedTime = localStorage.getItem(VIDEOPLAYER_CURRENT_TIME);
if (savedTime !== 'null') {
    player.setCurrentTime(savedTime);
}