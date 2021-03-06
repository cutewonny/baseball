// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;

function getRandomInt(min, max) {
  // 2~9 --> 0.1 * 8 = 0.8 +2 = 2
  // 1~9 -> 0.1 * 9 = 0.9 +1 = 1
  var a = Math.floor(Math.random() * (max - min + 1)) + min; //Math.floor() ????????? ????????? ????????? ????????? ?????? ?????? ????????? ?????? ??? ?????? ???????????????
  //Math.random() ????????? 0 ?????? 1 ????????? ???????????? ??????????????? ????????? ??????????????? ??????????????? ??????

  console.log('?????? ?????? ????????? >>>> ', a);
  return a;
}
},{}],"src/GameResult.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameResult = /*#__PURE__*/function () {
  // ?????? ??????
  function GameResult(digit, strike, ball) {
    _classCallCheck(this, GameResult);

    this.digit = digit;
    this.strike = strike;
    this.ball = ball;
  }

  _createClass(GameResult, [{
    key: "isDone",
    value: function isDone() {
      //console.log('wonny ', this.toString());
      if (this.ball == 0 && this.strike == this.digit) {
        return true;
      }

      return false;
    }
  }, {
    key: "toString",
    value: function toString() {
      var resultString = "Strike:".concat(this.strike, " Ball:").concat(this.ball);

      if (this.strike === 0 && this.ball === 0) {
        resultString = 'OUT';
      } else if (this.strike == this.digit) {
        resultString = 'STRIKE';
      } else {
        resultString = "".concat(this.strike, " S ").concat(this.ball, " B");
      }

      return resultString;
    }
  }]);

  return GameResult;
}();

exports.default = GameResult;
},{}],"src/Baseball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _GameResult = _interopRequireDefault(require("./GameResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Baseball = /*#__PURE__*/function () {
  function Baseball() {
    var digit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

    _classCallCheck(this, Baseball);

    //digit: ?????? ??????
    this.digit = digit; // this.digit: private ?????? ??????

    this.problem = this.makeProblem(); // ?????? this,makeProblem ???????????????, this.makeProblem(); ?????? ???
  } // ?????? ?????? ????????? ??????


  _createClass(Baseball, [{
    key: "makeProblem",
    value: function makeProblem() {
      //let arr = new Array(); //???????????? ??????
      var arr = []; // ??????????????? ??????

      var index = 0;

      while (index < this.digit) {
        if (index == 0) {
          //arr.push(getRandomInt(0, 9));
          arr[index] = (0, _utils.getRandomInt)(0, 9);
        } else {
          var tempValue = (0, _utils.getRandomInt)(0, 9);
          var bb = arr.indexOf(tempValue);

          while (bb != -1) {
            //???????????? ?????????
            tempValue = (0, _utils.getRandomInt)(0, 9);
            bb = arr.indexOf(tempValue);
          }

          arr[index] = tempValue;
        }

        index++;
      }

      console.log('??????: ', arr);
      return arr;
    } // ?????? ???????????? ??????

  }, {
    key: "getResult",
    value: function getResult(values) {
      //guess: ?????? ????????? ???
      //problem: ??????
      console.log('Baseball.js -> getResult ????????? ?????? ?????? ', values); //undefined (3)??[1, 2, 8]

      var strike = 0;
      var ball = 0;
      var index = 0; //console.log('this.problem: ', this.arr); //undefined

      console.log('this.problem: ', this.problem); //(3)??[6, 5, 4]

      var guessEl;

      while (index < this.digit) {
        guessEl = values[index]; //????????? ???

        if (guessEl == this.problem[index]) {
          // ?????? == ??????
          strike++;
          console.log('????????? ????????? ?????????');
        } else {
          if (this.problem.indexOf(guessEl) > -1) {
            ball++;
            console.log('????????? ????????? ????????? ?????????');
          }
        }

        index++;
      } //while end


      return new _GameResult.default(this.digit, strike, ball);
    }
  }]);

  return Baseball;
}();

exports.default = Baseball;
},{"./utils":"src/utils.js","./GameResult":"src/GameResult.js"}],"src/GuessInputControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GuessInputControl = /*#__PURE__*/function () {
  // ???????????? ?????? ?????? ?????????
  function GuessInputControl(containerSelector, digitNumber) {
    var _this = this;

    _classCallCheck(this, GuessInputControl);

    // ???????????? ????????? ?????? ?????? ????????? ?????????
    this.inputEl = document.querySelector(containerSelector); //#guess

    if (this.inputEl == null) {
      throw Error('???????????? ???????????? ?????? ??? ????????????.');
    }

    this.inputEl.addEventListener('keydown', function (e) {
      console.log('e??? ????????????: ', e); // ?????? ???????????? ????????? ???????????? ?????? ????????????.
      //KeyboardEvent {isTrusted: true, key: "1", code: "Digit1", location: 0, ctrlKey: false, ???}
      //KeyboardEvent {isTrusted: true, key: "2", code: "Digit2", location: 0, ctrlKey: false, ???}
      //KeyboardEvent {isTrusted: true, key: "Enter", code: "NumpadEnter", location: 3, ctrlKey: false, ???}

      console.log('e.target.value??? ????????????: ', e.target.value); //guess?????? id??? ?????? ????????? ?????? ?????? ???: 543

      if (e.keyCode === 13) {
        var values = Array.from(e.target.value).map(function (v) {
          return Number(v);
        });
        console.log('values ', values); //Array.from??? ???????????? ???????????? ?????? ????????? ??? ?????????. 543 -> [5,4,3]
        //array.map(x => x * 2); map??? ?????? ??? ????????? -> ????????? ?????? -> ????????? ????????? ????????? ??????

        if (values.length != digitNumber.digitNumber) {
          throw new Error('???????????? ?????? ????????????!');
        }

        digitNumber.callback(values); // ??????????????? ?????? ????????? ????????? ?????????? ?????? ????????? ???????
        //????????? ???????????????.
        //let test2 = digitNumber.getResult;
        //console.log(test2);

        _this.clear();

        return;
      }
    });
  }

  _createClass(GuessInputControl, [{
    key: "disable",
    value: function disable() {
      this.inputEl.disable = true;
      this.inputEl.placeholder = '?????? ???';
    }
  }, {
    key: "clear",
    value: function clear() {
      this.inputEl.value = '';
    }
  }]);

  return GuessInputControl;
}();

exports.default = GuessInputControl;
},{}],"src/app.js":[function(require,module,exports) {
"use strict";

var _Baseball = _interopRequireDefault(require("./Baseball"));

var _GuessInputControl = _interopRequireDefault(require("./GuessInputControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    var queryParam = new URLSearchParams(location.search);
    this.digit = queryParam.get('digit'); //digit=3

    this.Baseball = new _Baseball.default(this.digit); // ????????? ?????????? Baseball ???????????? ??? ??????

    /*
    console.log('App.js -> this.Baseball ', this.Baseball);
    Baseball {digit: "3", problem: ??}
    digit: "3"
    problem: ?? makeProblem()
    */
    //console.log('App.js -> this.Baseball.problem: ', this.Baseball.problem); //   makeProblem() ?????? ????????? ????????? ?????????

    this.Baseball.problem; // Baseball ??????????????? ???????????? ???? -> makeProblem ?????? ?????? -> ?????? ??????

    this.inputControl = new _GuessInputControl.default('#guess', {
      // GuessInputControl: ???????????? ?????? ?????? ?????????
      callback: this.handleGuess.bind(this),
      //????????? ?????? ????????? window ?????? ?????? ?????????. bind??? ????????? ????????? ?????? ?????? ?????????
      digitNumber: this.digit //??????

    });
    this.resultsContainerEl = document.querySelector('.result-container');
  }

  _createClass(App, [{
    key: "handleGuess",
    value: function handleGuess(values, error) {
      //??????
      if (error) {
        alert(error.message);
        return;
      }

      console.log('App.js??? ?????? handleGuess ??????: ', values); //(3)??[9, 8, 7] : ????????? ???

      var result = this.Baseball.getResult(values); //????????? ??????

      console.log('result: ', result); // element.insertAdjacentHTML(position, text); ????????? ?????? ?????? text
      //console.log(result.isDone);

      console.log(result.isDone());

      if (result.isDone()) {
        alert('???????????????');
        this.blockGame();
      }

      this.resultsContainerEl.insertAdjacentHTML('afterbegin', this.createResultEl(values, result.toString()));
    }
  }, {
    key: "createResultEl",
    value: function createResultEl(a, b) {
      console.log('a: ', a);
      console.log('b: ', b);
      return "<li class=\"list-group-item\">\n    <span class=\"guess\">".concat(a, "</span>\n    <span class=\"badge result\">").concat(b, "</span>\n    </li>");
    }
  }, {
    key: "blockGame",
    value: function blockGame() {
      this.inputControl.disable();
    }
  }]);

  return App;
}();

new App();
},{"./Baseball":"src/Baseball.js","./GuessInputControl":"src/GuessInputControl.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62605" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map