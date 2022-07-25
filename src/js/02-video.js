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

player.setCurrentTime(localStorage.getItem(VIDEOPLAYER_CURRENT_TIME)).then(function(seconds) {
        seconds = localStorage.getItem(VIDEOPLAYER_CURRENT_TIME);
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            if (seconds < 0 || seconds > 571.543) { return }
            break;
        default:
            // some other error occurred
            break;
    }
});