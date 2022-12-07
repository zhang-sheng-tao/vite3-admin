/* eslint-disable promise/prefer-await-to-then */

const methodMap = [
  ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
  // New WebKit
  ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
  // Old WebKit
  ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
  ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
  ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"],
];

const nativeAPI = (() => {
  if (typeof document === "undefined") {
    return false;
  }

  const unprefixedMethods = methodMap[0];
  const returnValue = {};

  for (const methodList of methodMap) {
    const exitFullscreenMethod = methodList?.[1];
    if (exitFullscreenMethod in document) {
      for (const [index, method] of methodList.entries()) {
        returnValue[unprefixedMethods[index]] = method;
      }

      return returnValue;
    }
  }

  return false;
})();

const eventNameMap = {
  change: nativeAPI.fullscreenchange,
  error: nativeAPI.fullscreenerror,
};

let screenfull = {
  // eslint-disable-next-line default-param-last
  request(element = document.documentElement, options) {
    return new Promise((resolve, reject) => {
      const onFullScreenEntered = () => {
        screenfull.off("change", onFullScreenEntered);
        resolve();
      };

      screenfull.on("change", onFullScreenEntered);

      const returnPromise = element[nativeAPI.requestFullscreen](options);

      if (returnPromise instanceof Promise) {
        returnPromise.then(onFullScreenEntered).catch(reject);
      }
    });
  },
  exit() {
    return new Promise((resolve, reject) => {
      if (!screenfull.isFullscreen) {
        resolve();
        return;
      }

      const onFullScreenExit = () => {
        screenfull.off("change", onFullScreenExit);
        resolve();
      };

      screenfull.on("change", onFullScreenExit);

      const returnPromise = document[nativeAPI.exitFullscreen]();

      if (returnPromise instanceof Promise) {
        returnPromise.then(onFullScreenExit).catch(reject);
      }
    });
  },
  // 请求全屏，如果当前是全屏则会退出全屏
  toggle(element, options) {
    return screenfull.isFullscreen ? screenfull.exit() : screenfull.request(element, options);
  },
  onchange(callback) {
    screenfull.on("change", callback);
  },
  onerror(callback) {
    screenfull.on("error", callback);
  },
  on(event, callback) {
    const eventName = eventNameMap[event];
    if (eventName) {
      document.addEventListener(eventName, callback, false);
    }
  },
  off(event, callback) {
    const eventName = eventNameMap[event];
    if (eventName) {
      document.removeEventListener(eventName, callback, false);
    }
  },
  raw: nativeAPI,
};

Object.defineProperties(screenfull, {
  // 返回一个布尔值，当前是否是全屏状态。
  isFullscreen: {
    get: () => Boolean(document[nativeAPI.fullscreenElement]),
  },
  element: {
    enumerable: true,
    get: () => document[nativeAPI.fullscreenElement] ?? undefined,
  },
  // 返回一个布尔值，是否当前可以进入全屏。
  isEnabled: {
    enumerable: true,
    // Coerce to boolean in case of old WebKit.
    get: () => Boolean(document[nativeAPI.fullscreenEnabled]),
  },
});

if (!nativeAPI) {
  screenfull = { isEnabled: false };
}

export default screenfull;
