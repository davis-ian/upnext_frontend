export default function (func, delay = 500) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const that = this;

    timeoutId = setTimeout(() => {
      func.apply(that, args);
    }, delay);
  };
}

export function debounceV2(fn, delay) {
  var timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
}
