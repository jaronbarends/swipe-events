import { constants } from './swipe-events-constants.js';
import * as util from './swipe-events-util.js';
import { initMouseEmulation } from './mouse-events.js';

const defaults = {
  swipeThreshold: 75,// int - The number of pixels that the user must move their finger by before it is considered a swipe
  // TODO: thresholds for multiple stages in swipe
  swipeZoneThresholds: [],// can be filled with multiple values to get triggers when a threshold is reached
  mouseEmulation: true,//Boolean, if true, when the browser doesn't support touch, the mouse can be used for swiping
  triggerOnTouchEnd: true,// Boolean, if true, the swipe events are triggered when the touch ends (user releases all fingers).  If false, it will be triggered on reaching the swipeThreshold
  // NOT IMPLEMENTED FOR NOW - for each finger, you'll most likely want to end the swipe only when the user releases the finger. Otherwise you can't move your finger back once you've crossed the threshold.
  allowPageScroll: 'auto' /* How the browser handles page scrolls when the user is swiping on a touchSwipe object. 
  'auto' : all undefined swipes will cause the page to scroll in that direction.
  'none' : the page will not scroll when user swipes.
  'horizontal' : will force page to scroll on horizontal swipes.
  'vertical' : will force page to scroll on vertical swipes.
  */
};

let config = {};

// object to keep track of event statuses
const state = {
  swipeEventEmitted: false,
  touchStarted: false,
}

// object to keep track of touch data
let emptyTouchData = {
  phase: constants.PHASE_IDLE,
  prevPhase: null,
  zone: 0,
  prevZone: null,
  trackpoints: [],
};
let touchData;






/*-- Start touchData object functions --*/


/**
* reset the touchData object
* @returns {undefined}
*/
const resetTouchData = function() {
  touchData = Object.assign({}, emptyTouchData);
};


/**
* update the touchData object with current data
* @param {event} evt Description
* @returns {undefined}
*/
const updateTouchData = function(evt) {
  console.log('evt:', evt);
  //processes all relevant data for an event
  const touch = evt.touches[0];
  
  touchData.end = util.getTouchPosition(touch);
  touchData.distance = util.getDistanceObj(touchData.start, touchData.end);
  touchData.direction = util.getDirection(touchData.start, touchData.end);
  
  // addTrackPoint();
  // touchData.speed = getCurrentSpeed();
  
  //now add general evt vars to touchData object
  touchData.originalEvent = evt;
};


/**
* set the current phase in cycle (i.e. start, move, swipe)
* @param {string} phs The current phase. Must be defined in fsC
* @returns {undefined}
*/
var setPhase = function(phase) {
  //sets the new phase
  touchData.prevPhase = touchData.phase;
  touchData.phase = phase;
  if (phase === constants.PHASE_CANCEL || phase === constants.PHASE_END) {
    state.touchStarted = false;
  }
};

/*-- End touchData object functions --*/



/**
* handle touch start
* @param {touch start event} evt
* @returns {undefined}
*/
const touchStartHandler = function(evt) {
  if (!state.touchStarted) {
    // it's really the start of a new touch
    state.touchStarted = true;
    // reset vars that change on every touch-cycle
    state.swipeEventEmitted = false;
    resetTouchData();
    
    setPhase(constants.PHASE_START_MOVE);
    console.log('touchData:', touchData);
  } else {
    // a finger was added to the touch
  }
  
  const touch = evt.touches[0];
  touchData.start = util.getTouchPosition(touch);
  
  //now process the other event variables
  updateTouchData(evt);
};



const touchMoveHandler = function(evt) {
  updateTouchData(evt);
  // util.handleDefaultScroll(evt, touchData, config);
  setPhase(constants.PHASE_MOVE);
  emitEvent(evt.target, constants.EVENT_MOVE, touchData);
};



const touchEndHandler = function(evt) {
  console.log('touchEndHandler');
  if (evt.touches.length === 0) {
    //it's really the end of this touch, and not just one finger being lifted
    setPhase(constants.PHASE_END);
    if (util.distanceHasPassedThreshold(touchData, config)) {
      console.log('yay');
      emitSwipeEvents(evt.target);
    } else {
      console.log('did not pass threshold');
    }
  }
};



/**
* emit an event
* @param {html object} elm - The element that should emit the event
* @param {string} evtName The (non-namespaced) name of the event to emit
* @param {object} detail - The detail object to pass along
* @returns {undefined}
*/
const emitEvent = function(elm, evtName, detail = {}) {
  const evt = new CustomEvent(`${evtName}.swipeevent`, {detail});
  elm.dispatchEvent(evt);
};



/**
* trigger swipeEvents - 'swipe' and the appropriate direction-events ('swipeLeft' etc)
* @param {html element} elm - The element that should emit the event
* @returns {undefined}
*/
var emitSwipeEvents = function(elm) {
  // trigger catch all event handler
  emitEvent(elm, constants.EVENT_SWIPE, touchData);
  
  //trigger direction specific event handlers
  const directionalEvtName = constants.EVENT_SWIPE_DIRECTION[touchData.direction];
  emitEvent(elm, directionalEvtName, touchData);
};



/*-- Start mousefunctions --*/




/*-- End mousefunctions --*/




const initElm = function(elm) {
  if ('ontouchstart' in window) {
    elm.addEventListener('touchstart', touchStartHandler, false);
    elm.addEventListener('touchmove', touchMoveHandler, false);
    elm.addEventListener('touchend', touchEndHandler, false);
  } else if (config.mouseEmulation) {
    console.log('no touch - use mouse emulation');
    const touchHandlers = {
      touchStartHandler,
      touchMoveHandler,
      touchEndHandler,
    };

    initMouseEmulation(elm, touchHandlers);
  } else {
    console.log('no touch, no emulation');
  }
};



// make elements in selector a swipe event emitter
const initSwipeEvents = function(elmOrNodeList, options = {}) {
  config = Object.assign({}, defaults, options);
  
  if (elmOrNodeList instanceof HTMLElement) {
    initElm(elmOrNodeList);
  } else if (elmOrNodeList instanceof NodeList) {
    elmOrNodeList.forEach((elm) => {
      initElm(elm);
    });
  }
};



export {
  initSwipeEvents,
};
