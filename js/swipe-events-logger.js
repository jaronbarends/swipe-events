/*
* logs events on screen
*/

const log = document.getElementById(`varlog`);
const lastEventLog = document.getElementById(`lasteventlog`);
const xLog = document.getElementById(`t0-x`);
const yLog = document.getElementById(`t0-y`);
const dirLog = document.getElementById(`t0-dir`);
const distLog = document.getElementById(`t0-dist`);


/**
* log move event
* @returns {undefined}
*/
const logMoveEvent = function(evt) {
  xLog.textContent = evt.detail.end.x;
  yLog.textContent = evt.detail.end.y;
  dirLog.textContent = evt.detail.direction;
  distLog.textContent = `${evt.detail.distance.x}, ${evt.detail.distance.y}`;
};




/**
* 
* @returns {undefined}
*/
const init = function() {
  const touchArea = document.getElementById(`toucharea`);
  
  touchArea.addEventListener('move.swipeevent', logMoveEvent);
  // touchArea.addEventListener('swipe.swipeevent');
  // touchArea.addEventListener('swipeRight.swipeevent');
};

init();
