const directions = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};

const constants = Object.assign({}, directions, {
  NONE: 'none',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  AUTO: 'auto',

  PHASE_IDLE: 'idle',
  PHASE_START_MOVE: 'startMove',
  PHASE_MOVE: 'move',
  PHASE_SWIPE: 'swipe',
  PHASE_END: 'end',
  PHASE_CANCEL: 'cancel',

  EVENT_TOUCH_STATUS_CHANGE: 'touchStatusChange',
  EVENT_MOVE: 'move',
  EVENT_SWIPE_MOVE: 'swipeMove',
  EVENT_SWIPE: 'swipe',
  EVENT_SWIPE_DIRECTION: {
    [directions.LEFT]: 'swipeLeft',
    [directions.RIGHT]: 'swipeRight',
    [directions.UP]: 'swipeUp',
    [directions.DOWN]: 'swipeDown',
  }
});

export {
  constants
};
