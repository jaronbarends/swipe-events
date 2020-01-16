/*
* adds mouse event listeners to element,
* transforms those mouse events into objects looking like touch events
* and then call the appropriate eventHandler in swipeEvent.js
*/

let touchHandlers;// will hold reference to touchHandler functions in swipe-events.js

/**
* enhance a mouse event to make it look like a touch event and then call the corresponding touchEventHandler
* @param {function} touchEventHandler The handler function to call (like touchendHandler for mouseup)
* @param {event} evt A mouse event
* @returns {undefined}
*/
const mimicTouchEvent = function(touchEventHandler, mouseEvt) {
  //adds stuff to mouse event to make it look like a touch event
  let touchEvt = mouseEvt;
  let touches = [];
  if (touchEventHandler !== touchHandlers.touchEndHandler) {
    touches.push({
      pageX: mouseEvt.pageX,
      pageY: mouseEvt.pageY
    });
  }
  touchEvt.touches = touches;
  //now call the touchHandler function we passed in
  touchEventHandler.call(this, touchEvt);
};


/**
* handle a mousedown event - enhance and then handle as touchend
* @param {event} evt Description
* @returns {undefined}
*/
const mousedownHandler = function(evt) {
  const elm = evt.target;
  elm.removeEventListener('mousemove', mousemoveHandler);
  mimicTouchEvent(touchHandlers.touchStartHandler, evt);
  elm.addEventListener('mousemove', mousemoveHandler);
};


/**
* handle a mousemove event - enhance and then handle as touchmove
* @param {event} evt
* @returns {undefined}
*/
const mousemoveHandler = function(evt) {
  mimicTouchEvent(touchHandlers.touchMoveHandler, evt);
};


/**
* handle a mouseup event - enhance and then handle as touchend
* @param {event} evt Description
* @returns {undefined}
*/
const mouseupHandler = function(evt) {
  const elm = evt.target;
  elm.removeEventListener('mousemove', mousemoveHandler);
  mimicTouchEvent(touchHandlers.touchEndHandler, evt);
};


/**
* initialize mouse-emulation
* @param {html element} elm - The element to attach mouse event listeners to
* @param {object} handlers - Object containing pointers to touch event handlers in app
* @returns {undefined}
*/
const initMouseEmulation = function(elm, handlers) {
  touchHandlers = {...handlers };// create reference to handlers in swipe-events.js
  elm.addEventListener('mousedown', mousedownHandler);
  elm.addEventListener('mouseup', mouseupHandler);
};


export {
  initMouseEmulation,
};
