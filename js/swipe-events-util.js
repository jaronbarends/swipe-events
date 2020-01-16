import { constants } from './swipe-events-constants.js';

/**
* returns the x and y position of a member of the event.touches array
* @param {object} touch An element touch event's touches array
* @returns {object} Object {x,y}
*/
const getTouchPosition = function(touch) {
  const pos = {
    x: touch.pageX,
    y: touch.pageY
  }
  return pos;
};



/**
* get the total distance moved since the start
* @param {object} startPos Object {x,y} starting point of the touch cycle
* @param {object} endPos Object {x,y} current or ending point of the touch cycle
* @returns {object} {x,y}
*/
const getDistanceObj = function(startPos, endPos) {
  const x = endPos.x - startPos.x;
  const y = endPos.y - startPos.y;
  return {x, y};
};



/**
* get the direction of the move
* @param {object} startPos Object {x,y} starting point of the touch cycle
* @param {object} endPos Object {x,y} current or ending point of the touch cycle
* @returns {string} one of the constants in fcC for up, down, left or right
*/
var getDirection = function(startPos, endPos) {
  const dx = endPos.x - startPos.x;
  const dy = endPos.y - startPos.y;
  if (Math.abs(dx) >= Math.abs(dy)) {
    //we're moving horizontally
    return ( (dx > 0) ? constants.RIGHT : constants.LEFT);
  } else {
    return ( (dy > 0) ? constants.DOWN : constants.UP);
  }
};



/**
* Check if the moved distance has passed the swipe-treshold
* @returns {boolean}
*/
const distanceHasPassedThreshold = function(touchData, config) {
  const distance = touchData.distance;
  const dx = Math.abs(distance.x);
  const dy = Math.abs(distance.y);
  
  return (Math.max(dx,dy) >= config.swipeThreshold);
};



/**
* Checks direction of the swipe and the value allowPageScroll to see if we should allow or prevent the default behaviour from occurring.
* This will essentially allow page scrolling or not when the user is swiping on a touchSwipe object.
* @param {event} evt A touchmove event or an enhanced mousemove event
* @param {object} touchData
* @param {object} config - The configuration object
* @returns {undefined}
*/
var handleDefaultScroll = function(evt, touchData, config) {
  // if( config.allowPageScroll === constants.NONE ) {
  //   evt.preventDefault();
  // } else {
  //   const auto = (config.allowPageScroll === constants.AUTO);
  
  //   switch(touchData.direction) {
  //     case constants.LEFT :
  //     if ( (config.swipeLeft && auto) || (!auto && config.allowPageScroll !== constants.HORIZONTAL)) {
  //       evt.preventDefault();
  //     }
  //     break;
  
  //     case constants.RIGHT :
  //     if ( (config.swipeRight && auto) || (!auto && config.allowPageScroll!=constants.HORIZONTAL)) {
  //       evt.preventDefault();
  //     }
  //     break;
  
  //     case constants.UP :
  //     if ( (config.swipeUp && auto) || (!auto && config.allowPageScroll!=constants.VERTICAL)) {
  //       evt.preventDefault();
  //     }
  //     break;
  
  //     case constants.DOWN :	
  //     if ( (config.swipeDown && auto) || (!auto && config.allowPageScroll!=constants.VERTICAL)) {
  //       evt.preventDefault();
  //     }
  //     break;
  //   }
  // }
  
};





export {
  distanceHasPassedThreshold,
  getDirection,
  getDistanceObj,
  getTouchPosition,
  handleDefaultScroll,
}
