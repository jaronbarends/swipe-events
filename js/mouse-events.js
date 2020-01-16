let touchHandlers;

/**
* enhance a mouse event to make it look like a touch event and then call the corresponding touchEventHandler
* @param {function} touchEventHandler The handler function to call (like touchendHandler for mouseup)
* @param {event} evt A mouse event
* @returns {undefined}
*/
var mimicTouchEvent = function(touchEventHandler, mouseEvt) {
  //adds stuff to mouse event to make it look like a touch event
  let touchEvt = {...mouseEvt};
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
var mousedownHandler = function(evt) {
  const elm = evt.target;
  elm.removeEventListener('mousemove', touchHandlers.touchMoveHandler);
  mimicTouchEvent(touchHandlers.touchStartHandler, evt);
  elm.addEventListener('mousemove', touchHandlers.touchMoveHandler);
};


/**
* handle a mousemove event - enhance and then handle as touchmove
* @param {event} evt
* @returns {undefined}
*/
var mousemoveHandler = function(evt) {
  mimicTouchEvent(touchHandlers.touchMoveHandler, evt);
};


/**
* handle a mouseup event - enhance and then handle as touchend
* @param {event} evt Description
* @returns {undefined}
*/
var mouseupHandler = function(evt) {
  const elm = evt.target;
  elm.removeEventListener('mousemove', touchHandlers.touchMoveHandler);
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
  // elm.addEventListener('mousemove', mousemoveHandler);

  // elm.addEventListener('mousedown', (evt) => {
  //   mimicTouchEvent(touchHandlers.touchStartHandler, evt);
  // });
  // elm.addEventListener('mousemove', (evt) => {
  //   mimicTouchEvent(touchHandlers.touchMoveHandler, evt);
  // });
  // elm.addEventListener('mouseup', (evt) => {
  //   mimicTouchEvent(touchHandlers.touchEndHandler, evt);
  // });
  // elm.addEventListener('mouseup', mouseupHandler, false);
};


export {
  initMouseEmulation,
};
