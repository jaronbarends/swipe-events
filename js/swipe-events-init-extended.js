import { initSwipeEvents } from './swipe-events.js';

const touchArea = document.getElementById(`toucharea`);

initSwipeEvents(touchArea);

//
touchArea.addEventListener('move.swipeevent', (e) => {
  console.log('move', e.detail);
});
