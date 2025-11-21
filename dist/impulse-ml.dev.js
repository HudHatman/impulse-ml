/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build/Release/node_native_memory.node":
/*!***********************************************!*\
  !*** ./build/Release/node_native_memory.node ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);

try {
  process.dlopen(module, (__webpack_require__(/*! path */ "path").join)(__dirname, __webpack_require__.p, "8c0d713d94b87197578f9913475daeeb.node"));
} catch (error) {
  throw new Error('node-loader:\n' + error);
}


/***/ }),

/***/ "./src/typescript/Dataset/Builder/DatasetBuilder.ts":
/*!**********************************************************!*\
  !*** ./src/typescript/Dataset/Builder/DatasetBuilder.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetBuilder: () => (/* binding */ DatasetBuilder)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/typescript/Dataset/index.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var DatasetBuilder = /*#__PURE__*/function () {
  function DatasetBuilder() {
    _classCallCheck(this, DatasetBuilder);
  }
  return _createClass(DatasetBuilder, null, [{
    key: "fromSource",
    value: function fromSource(sourcePromise) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve) {
        sourcePromise.then(function (source) {
          var matrix = source.parse();
          var numberOfExamples = matrix.rows();
          var exampleSize = matrix.cols();
          var dataset = new _index__WEBPACK_IMPORTED_MODULE_0__.Dataset(exampleSize, numberOfExamples, matrix);
          resolve(dataset);
        });
      });
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Dataset/Builder/DatasetVocabularyBuilder.ts":
/*!********************************************************************!*\
  !*** ./src/typescript/Dataset/Builder/DatasetVocabularyBuilder.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetVocabularyBuilder: () => (/* binding */ DatasetVocabularyBuilder)
/* harmony export */ });
/* harmony import */ var _DatasetVocabulary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DatasetVocabulary */ "./src/typescript/Dataset/DatasetVocabulary.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var DatasetVocabularyBuilder = /*#__PURE__*/function () {
  function DatasetVocabularyBuilder() {
    _classCallCheck(this, DatasetVocabularyBuilder);
  }
  return _createClass(DatasetVocabularyBuilder, null, [{
    key: "fromSource",
    value: function fromSource(sourcePromise) {
      return new Promise(function (resolve) {
        sourcePromise.then(function (source) {
          var str = source.parse();
          resolve(new _DatasetVocabulary__WEBPACK_IMPORTED_MODULE_0__.DatasetVocabulary(str));
        });
      });
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Dataset/Builder/Source/AbstractSource.ts":
/*!*****************************************************************!*\
  !*** ./src/typescript/Dataset/Builder/Source/AbstractSource.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractSource: () => (/* binding */ AbstractSource)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var AbstractSource = /*#__PURE__*/_createClass(function AbstractSource() {
  _classCallCheck(this, AbstractSource);
});

/***/ }),

/***/ "./src/typescript/Dataset/Builder/Source/SourceCSV.ts":
/*!************************************************************!*\
  !*** ./src/typescript/Dataset/Builder/Source/SourceCSV.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SourceCSV: () => (/* binding */ SourceCSV)
/* harmony export */ });
/* harmony import */ var _AbstractSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractSource */ "./src/typescript/Dataset/Builder/Source/AbstractSource.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var csvtojson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csvtojson */ "csvtojson");
/* harmony import */ var csvtojson__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csvtojson__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var SourceCSV = /*#__PURE__*/function (_AbstractSource) {
  function SourceCSV(data) {
    var _this;
    _classCallCheck(this, SourceCSV);
    _this = _callSuper(this, SourceCSV);
    _defineProperty(_this, "data", null);
    _this.data = data;
    return _this;
  }
  _inherits(SourceCSV, _AbstractSource);
  return _createClass(SourceCSV, [{
    key: "parse",
    value: function parse() {
      var _this$data$;
      var numberOfExamples = this.data.length;
      var exampleSize = (_this$data$ = this.data[0]) === null || _this$data$ === void 0 ? void 0 : _this$data$.length;
      if (typeof numberOfExamples !== "undefined" && typeof exampleSize !== "undefined") {
        var data = [];
        for (var i = 0; i < numberOfExamples; i += 1) {
          var newData = this.data[i].map(function (value) {
            return Number(value);
          });
          data.push(newData);
        }
        return new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D(numberOfExamples, exampleSize).allocate().set(new Float64Array(data));
      }
      return null;
    }
  }], [{
    key: "fromLocalFile",
    value: function fromLocalFile(path) {
      return new Promise(function (resolve) {
        csvtojson__WEBPACK_IMPORTED_MODULE_2__({
          noheader: true,
          output: "csv"
        }).fromFile(path).then(function (arr) {
          resolve(new SourceCSV(arr));
        });
      });
    }
  }]);
}(_AbstractSource__WEBPACK_IMPORTED_MODULE_0__.AbstractSource);

/***/ }),

/***/ "./src/typescript/Dataset/Builder/Source/index.ts":
/*!********************************************************!*\
  !*** ./src/typescript/Dataset/Builder/Source/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SourceCSV: () => (/* reexport safe */ _SourceCSV__WEBPACK_IMPORTED_MODULE_0__.SourceCSV)
/* harmony export */ });
/* harmony import */ var _SourceCSV__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SourceCSV */ "./src/typescript/Dataset/Builder/Source/SourceCSV.ts");



/***/ }),

/***/ "./src/typescript/Dataset/Builder/VocabularySource/AbstractVocabularySource.ts":
/*!*************************************************************************************!*\
  !*** ./src/typescript/Dataset/Builder/VocabularySource/AbstractVocabularySource.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractVocabularySource: () => (/* binding */ AbstractVocabularySource)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var AbstractVocabularySource = /*#__PURE__*/_createClass(function AbstractVocabularySource() {
  _classCallCheck(this, AbstractVocabularySource);
});

/***/ }),

/***/ "./src/typescript/Dataset/Builder/VocabularySource/TextFile.ts":
/*!*********************************************************************!*\
  !*** ./src/typescript/Dataset/Builder/VocabularySource/TextFile.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextFile: () => (/* binding */ TextFile)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractVocabularySource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractVocabularySource */ "./src/typescript/Dataset/Builder/VocabularySource/AbstractVocabularySource.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var TextFile = /*#__PURE__*/function (_AbstractVocabularySo) {
  function TextFile(data) {
    var _this;
    _classCallCheck(this, TextFile);
    _this = _callSuper(this, TextFile);
    _defineProperty(_this, "data", "");
    _this.data = data;
    return _this;
  }
  _inherits(TextFile, _AbstractVocabularySo);
  return _createClass(TextFile, [{
    key: "parse",
    value: function parse() {
      return this.data;
    }
  }], [{
    key: "fromLocalFile",
    value: function fromLocalFile(path) {
      return new Promise(function (resolve, reject) {
        fs__WEBPACK_IMPORTED_MODULE_0__.readFile(path, function (err, buffer) {
          if (err) {
            reject(err);
            return;
          }
          resolve(new TextFile(buffer.toString("utf-8")));
        });
      });
    }
  }]);
}(_AbstractVocabularySource__WEBPACK_IMPORTED_MODULE_1__.AbstractVocabularySource);

/***/ }),

/***/ "./src/typescript/Dataset/Builder/VocabularySource/index.ts":
/*!******************************************************************!*\
  !*** ./src/typescript/Dataset/Builder/VocabularySource/index.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextFile: () => (/* reexport safe */ _TextFile__WEBPACK_IMPORTED_MODULE_0__.TextFile)
/* harmony export */ });
/* harmony import */ var _TextFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextFile */ "./src/typescript/Dataset/Builder/VocabularySource/TextFile.ts");



/***/ }),

/***/ "./src/typescript/Dataset/Builder/index.ts":
/*!*************************************************!*\
  !*** ./src/typescript/Dataset/Builder/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetBuilder: () => (/* reexport safe */ _DatasetBuilder__WEBPACK_IMPORTED_MODULE_0__.DatasetBuilder),
/* harmony export */   DatasetVocabularyBuilder: () => (/* reexport safe */ _DatasetVocabularyBuilder__WEBPACK_IMPORTED_MODULE_1__.DatasetVocabularyBuilder)
/* harmony export */ });
/* harmony import */ var _DatasetBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatasetBuilder */ "./src/typescript/Dataset/Builder/DatasetBuilder.ts");
/* harmony import */ var _DatasetVocabularyBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DatasetVocabularyBuilder */ "./src/typescript/Dataset/Builder/DatasetVocabularyBuilder.ts");




/***/ }),

/***/ "./src/typescript/Dataset/Dataset.ts":
/*!*******************************************!*\
  !*** ./src/typescript/Dataset/Dataset.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dataset: () => (/* binding */ Dataset)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Dataset = /*#__PURE__*/function () {
  function Dataset() {
    var exampleSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var numberOfExamples = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, Dataset);
    _defineProperty(this, "exampleSize", 0);
    _defineProperty(this, "numberOfExamples", 0);
    _defineProperty(this, "data", null);
    this.exampleSize = exampleSize;
    this.numberOfExamples = numberOfExamples;
    this.data = data;
  }
  return _createClass(Dataset, [{
    key: "exampleAt",
    value: function exampleAt(index) {
      return this.data.row(index).transpose();
    }
  }, {
    key: "getNumberOfExamples",
    value: function getNumberOfExamples() {
      return this.data.rows();
    }
  }, {
    key: "getExampleSize",
    value: function getExampleSize() {
      return this.data.cols();
    }
  }, {
    key: "getBatch",
    value: function getBatch(offset, batchSize) {
      console.log(offset, 0, batchSize, this.data.cols());
      return this.data.block(offset, 0, batchSize, this.data.cols());
    }
  }], [{
    key: "fromMatrix",
    value: function fromMatrix(m) {
      return new Dataset(m.rows(), m.cols(), m);
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Dataset/DatasetVocabulary.ts":
/*!*****************************************************!*\
  !*** ./src/typescript/Dataset/DatasetVocabulary.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetVocabulary: () => (/* binding */ DatasetVocabulary)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var DatasetVocabulary = /*#__PURE__*/_createClass(function DatasetVocabulary() {
  _classCallCheck(this, DatasetVocabulary);
});

/***/ }),

/***/ "./src/typescript/Dataset/Modifier/AbstractModifier.ts":
/*!*************************************************************!*\
  !*** ./src/typescript/Dataset/Modifier/AbstractModifier.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractModifier: () => (/* binding */ AbstractModifier)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AbstractModifier = /*#__PURE__*/_createClass(function AbstractModifier(dataset) {
  _classCallCheck(this, AbstractModifier);
  _defineProperty(this, "dataset", null);
  this.dataset = dataset;
});

/***/ }),

/***/ "./src/typescript/Dataset/Modifier/MinMaxScaling.ts":
/*!**********************************************************!*\
  !*** ./src/typescript/Dataset/Modifier/MinMaxScaling.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinMaxScalingDatasetModifier: () => (/* binding */ MinMaxScalingDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractModifier */ "./src/typescript/Dataset/Modifier/AbstractModifier.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var MinMaxScalingDatasetModifier = /*#__PURE__*/function (_AbstractModifier) {
  function MinMaxScalingDatasetModifier() {
    _classCallCheck(this, MinMaxScalingDatasetModifier);
    return _callSuper(this, MinMaxScalingDatasetModifier, arguments);
  }
  _inherits(MinMaxScalingDatasetModifier, _AbstractModifier);
  return _createClass(MinMaxScalingDatasetModifier, [{
    key: "apply",
    value: function apply(dataset) {
      dataset.data.replace(dataset.data.minMax());
      return dataset;
    }
  }]);
}(_AbstractModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractModifier);

/***/ }),

/***/ "./src/typescript/Dataset/Modifier/MissingData.ts":
/*!********************************************************!*\
  !*** ./src/typescript/Dataset/Modifier/MissingData.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MissingDataDatasetModifier: () => (/* binding */ MissingDataDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractModifier */ "./src/typescript/Dataset/Modifier/AbstractModifier.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var MissingDataDatasetModifier = /*#__PURE__*/function (_AbstractModifier) {
  function MissingDataDatasetModifier() {
    var _this;
    _classCallCheck(this, MissingDataDatasetModifier);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, MissingDataDatasetModifier, [].concat(args));
    _defineProperty(_this, "modificationType", "mean");
    return _this;
  }
  _inherits(MissingDataDatasetModifier, _AbstractModifier);
  return _createClass(MissingDataDatasetModifier, [{
    key: "apply",
    value: function apply(dataset) {
      var rowsToFill = [];
      var correctExamplesCount = 0;
      var sum = 0;
      var valueToFill = 0;
      for (var exampleIndex = 0; exampleIndex < dataset.getNumberOfExamples(); exampleIndex += 1) {
        var example = dataset.exampleAt(exampleIndex);
        for (var row = 0; row < dataset.getExampleSize(); row += 1) {
          if (isNaN(example.data[row][0]) || typeof example.data[row][0] !== "number") {
            rowsToFill.push({
              row: row,
              col: example
            });
          } else {
            sum += example.data[row][0];
            correctExamplesCount++;
          }
        }
      }
      if (this.modificationType === "mean") {
        valueToFill = sum / correctExamplesCount;
      }
      rowsToFill.forEach(function (_ref) {
        var row = _ref.row,
          col = _ref.col;
        dataset.data.data[row][col] = valueToFill;
      });
      return dataset;
    }
  }, {
    key: "setModificationType",
    value: function setModificationType(type) {
      this.modificationType = type;
      return this;
    }
  }]);
}(_AbstractModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractModifier);

/***/ }),

/***/ "./src/typescript/Dataset/Modifier/Shuffle.ts":
/*!****************************************************!*\
  !*** ./src/typescript/Dataset/Modifier/Shuffle.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShuffleDatasetModifier: () => (/* binding */ ShuffleDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractModifier */ "./src/typescript/Dataset/Modifier/AbstractModifier.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var ShuffleDatasetModifier = /*#__PURE__*/function (_AbstractModifier) {
  function ShuffleDatasetModifier() {
    _classCallCheck(this, ShuffleDatasetModifier);
    return _callSuper(this, ShuffleDatasetModifier, arguments);
  }
  _inherits(ShuffleDatasetModifier, _AbstractModifier);
  return _createClass(ShuffleDatasetModifier);
}(_AbstractModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractModifier);

/***/ }),

/***/ "./src/typescript/Dataset/Modifier/Split.ts":
/*!**************************************************!*\
  !*** ./src/typescript/Dataset/Modifier/Split.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SplitDatasetModifier: () => (/* binding */ SplitDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractModifier */ "./src/typescript/Dataset/Modifier/AbstractModifier.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var SplitDatasetModifier = /*#__PURE__*/function (_AbstractModifier) {
  function SplitDatasetModifier() {
    _classCallCheck(this, SplitDatasetModifier);
    return _callSuper(this, SplitDatasetModifier, arguments);
  }
  _inherits(SplitDatasetModifier, _AbstractModifier);
  return _createClass(SplitDatasetModifier);
}(_AbstractModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractModifier);

/***/ }),

/***/ "./src/typescript/Dataset/Modifier/index.ts":
/*!**************************************************!*\
  !*** ./src/typescript/Dataset/Modifier/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinMaxScalingDatasetModifier: () => (/* reexport safe */ _MinMaxScaling__WEBPACK_IMPORTED_MODULE_0__.MinMaxScalingDatasetModifier),
/* harmony export */   MissingDataDatasetModifier: () => (/* reexport safe */ _MissingData__WEBPACK_IMPORTED_MODULE_1__.MissingDataDatasetModifier),
/* harmony export */   ShuffleDatasetModifier: () => (/* reexport safe */ _Shuffle__WEBPACK_IMPORTED_MODULE_2__.ShuffleDatasetModifier),
/* harmony export */   SplitDatasetModifier: () => (/* reexport safe */ _Split__WEBPACK_IMPORTED_MODULE_3__.SplitDatasetModifier)
/* harmony export */ });
/* harmony import */ var _MinMaxScaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MinMaxScaling */ "./src/typescript/Dataset/Modifier/MinMaxScaling.ts");
/* harmony import */ var _MissingData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MissingData */ "./src/typescript/Dataset/Modifier/MissingData.ts");
/* harmony import */ var _Shuffle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shuffle */ "./src/typescript/Dataset/Modifier/Shuffle.ts");
/* harmony import */ var _Split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Split */ "./src/typescript/Dataset/Modifier/Split.ts");






/***/ }),

/***/ "./src/typescript/Dataset/index.ts":
/*!*****************************************!*\
  !*** ./src/typescript/Dataset/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dataset: () => (/* reexport safe */ _Dataset__WEBPACK_IMPORTED_MODULE_0__.Dataset)
/* harmony export */ });
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dataset */ "./src/typescript/Dataset/Dataset.ts");



/***/ }),

/***/ "./src/typescript/Math/Calc.ts":
/*!*************************************!*\
  !*** ./src/typescript/Math/Calc.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calc: () => (/* binding */ Calc)
/* harmony export */ });
/* harmony import */ var _Computation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Computation */ "./src/typescript/Math/Computation/index.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Calc = /*#__PURE__*/function () {
  function Calc() {
    _classCallCheck(this, Calc);
    _defineProperty(this, "_result", null);
    _defineProperty(this, "_params", null);
  }
  return _createClass(Calc, [{
    key: "setResult",
    value: function setResult(result) {
      this._result = result;
      return this;
    }
  }, {
    key: "setParams",
    value: function setParams(params) {
      this._params = params;
      return this;
    }
  }, {
    key: "execSync",
    value: function execSync(module, kernel) {
      this.exec(module, kernel)(this._params, this._result);
      return this;
    }

    /**
     * Note: This function is not truly asynchronous. The underlying native addon
     * does not support asynchronous execution.
     */
  }, {
    key: "execAsync",
    value: function execAsync(module, kernel) {
      var _this = this;
      return new Promise(function (resolve) {
        _this.exec(module, kernel, true)(_this._params, _this._result).then(function () {
          resolve(_this);
        });
      });
    }
  }, {
    key: "exec",
    value: function exec(module, kernel) {
      var async = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      try {
        var device = (0,_Computation__WEBPACK_IMPORTED_MODULE_0__.getDevice)();
        var m = device.loadModule(module);
        var fn = m.loadFunction(kernel);
        return function () {
          var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var output = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          return fn.execute((input || []).map(function (m) {
            return m.getMemory();
          }), (output || []).map(function (m) {
            return m.getMemory();
          }), async);
        };
      } catch (e) {
        console.error(e);
        return function () {};
      }
    }
  }], [{
    key: "get",
    value: function get() {
      return new Calc();
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Math/CalcColVector.ts":
/*!**********************************************!*\
  !*** ./src/typescript/Math/CalcColVector.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalcColVector: () => (/* binding */ CalcColVector)
/* harmony export */ });
/* harmony import */ var _CalcElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalcElement */ "./src/typescript/Math/CalcElement.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var CalcColVector = /*#__PURE__*/function (_CalcElement) {
  function CalcColVector() {
    var cols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    _classCallCheck(this, CalcColVector);
    return _callSuper(this, CalcColVector, [1, cols]);
  }
  _inherits(CalcColVector, _CalcElement);
  return _createClass(CalcColVector, [{
    key: "isColVector",
    value: function isColVector() {
      return true;
    }
  }], [{
    key: "fromMemory",
    value: function fromMemory(memory, cols) {
      var result = new CalcColVector(cols);
      result._memory = memory;
      result._allocated = true;
      return result;
    }
  }]);
}(_CalcElement__WEBPACK_IMPORTED_MODULE_0__.CalcElement);

/***/ }),

/***/ "./src/typescript/Math/CalcElement.ts":
/*!********************************************!*\
  !*** ./src/typescript/Math/CalcElement.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalcElement: () => (/* binding */ CalcElement)
/* harmony export */ });
/* harmony import */ var _Computation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Computation */ "./src/typescript/Math/Computation/index.ts");
/* harmony import */ var _CalcScalar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalcScalar */ "./src/typescript/Math/CalcScalar.ts");
/* harmony import */ var _Calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Calc */ "./src/typescript/Math/Calc.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var CalcElement = /*#__PURE__*/function () {
  function CalcElement() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    _classCallCheck(this, CalcElement);
    _defineProperty(this, "_dims", []);
    _defineProperty(this, "_allocated", false);
    _defineProperty(this, "_memory", null);
    _defineProperty(this, "_device", null);
    this._dims = [width, height, depth];
    this._device = (0,_Computation__WEBPACK_IMPORTED_MODULE_0__.getDevice)();
  }
  return _createClass(CalcElement, [{
    key: "dims",
    value: function dims() {
      return this._dims;
    }
  }, {
    key: "rows",
    value: function rows() {
      return this._dims[0];
    }
  }, {
    key: "cols",
    value: function cols() {
      return this._dims[1];
    }
  }, {
    key: "depth",
    value: function depth() {
      return this._dims[2];
    }
  }, {
    key: "count",
    value: function count() {
      var _this$_dims = _slicedToArray(this._dims, 3),
        width = _this$_dims[0],
        height = _this$_dims[1],
        depth = _this$_dims[2];
      return width * height * depth;
    }
  }, {
    key: "resize",
    value: function resize() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      this._dims = [width, height, depth];
      this.allocate();
      return this;
    }
  }, {
    key: "allocate",
    value: function allocate() {
      if (!this._allocated) {
        this._memory = this._device.alloc(this.count());
        this._memory.setWidth(this.rows());
        this._memory.setHeight(this.cols());
        this._memory.setDepth(this.depth());
        this._allocated = true;
      }
      return this;
    }
  }, {
    key: "set",
    value: function set(arr) {
      this._memory.set(new Float64Array(arr));
      return this;
    }
  }, {
    key: "get",
    value: function get() {
      return this._memory.get();
    }
  }, {
    key: "isScalar",
    value: function isScalar() {
      return false;
    }
  }, {
    key: "isRowVector",
    value: function isRowVector() {
      return false;
    }
  }, {
    key: "isColVector",
    value: function isColVector() {
      return false;
    }
  }, {
    key: "isMatrix2D",
    value: function isMatrix2D() {
      return false;
    }
  }, {
    key: "isMatrix3D",
    value: function isMatrix3D() {
      return false;
    }
  }, {
    key: "setZeros",
    value: function setZeros() {
      return this.calcSync(function (calc) {
        return calc.setZeros();
      });
    }
  }, {
    key: "setRandom",
    value: function setRandom(number) {
      return this.calcSync(function (calc) {
        return calc.setRandom(number);
      });
    }
  }, {
    key: "setMax",
    value: function setMax(number) {
      return this.calcSync(function (calc) {
        return calc.setMax(number);
      });
    }
  }, {
    key: "setMin",
    value: function setMin(number) {
      return this.calcSync(function (calc) {
        return calc.setMin(number);
      });
    }
  }, {
    key: "reluBackpropagation",
    value: function reluBackpropagation() {
      return this.calcSync(function (calc) {
        return calc.reluBackpropagation();
      });
    }
  }, {
    key: "pow",
    value: function pow(number) {
      return this.calcSync(function (calc) {
        return calc.pow(number);
      });
    }
  }, {
    key: "sum",
    value: function sum() {
      return this.calcSync(function (calc) {
        return calc.sum();
      });
    }
  }, {
    key: "reluForwardPropagation",
    value: function reluForwardPropagation() {
      return this.calcSync(function (calc) {
        return calc.reluForwardPropagation();
      });
    }
  }, {
    key: "getCalcSandbox",
    value: function getCalcSandbox() {
      var _this = this;
      var async = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return {
        sum: function sum() {
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_1__.CalcScalar().allocate();
          return _this._call("algebra", "algebra_sum", async)([_this, result])(result);
        },
        setZeros: function setZeros() {
          return _this._call("matrix", "matrix_set_zeros", async)([_this])(_this);
        },
        setRandom: function setRandom(number) {
          var nb = new _CalcScalar__WEBPACK_IMPORTED_MODULE_1__.CalcScalar().allocate().set([number]);
          return _this._call("matrix", "matrix_set_random", async)([_this, nb])(_this);
        }
      };
    }
  }, {
    key: "_call",
    value: function _call(module, kernel, async) {
      return function (params, result) {
        var calc = _Calc__WEBPACK_IMPORTED_MODULE_2__.Calc.get().setResult(result).setParams(params);
        return function (result) {
          if (async) {
            return new Promise(function (resolve) {
              calc.execAsync(module, kernel).then(function () {
                resolve(result);
              });
            });
          } else {
            calc.execSync(module, kernel);
            return result;
          }
        };
      };
    }
  }, {
    key: "calcSync",
    value: function calcSync(callback) {
      return callback(this.getCalcSandbox(false));
    }
  }, {
    key: "calcAsync",
    value: function calcAsync(callback) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        try {
          var result = callback(_this2.getCalcSandbox(true));
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
    }
  }, {
    key: "getMemory",
    value: function getMemory() {
      return this._memory;
    }
  }, {
    key: Symbol.dispose,
    value: function value() {
      this._memory.free();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._memory.free();
      this._dims = [0, 0, 0];
      this._allocated = false;
    }
  }, {
    key: "copyFrom",
    value: function copyFrom(other) {
      if (this._allocated) {
        this.destroy();
      }
      this._dims = other.dims();
      this.allocate();
      this._memory.setWidth(other.rows());
      this._memory.setHeight(other.cols());
      this._memory.setDepth(other.depth());
      this._memory.copyFrom(other.getMemory());
      this._dims = other.dims();
      return this;
    }
  }, {
    key: "replace",
    value: function replace(other) {
      if (this.rows() !== other.rows() || this.cols() !== other.cols() || this.depth() !== other.depth()) {
        this.destroy();
        this.copyFrom(other);
      } else {
        this._memory.copyFrom(other.getMemory());
      }
      other.destroy();
      return this;
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Math/CalcMatrix2D.ts":
/*!*********************************************!*\
  !*** ./src/typescript/Math/CalcMatrix2D.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalcMatrix2D: () => (/* binding */ CalcMatrix2D)
/* harmony export */ });
/* harmony import */ var _CalcElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalcElement */ "./src/typescript/Math/CalcElement.ts");
/* harmony import */ var _CalcRowVector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalcRowVector */ "./src/typescript/Math/CalcRowVector.ts");
/* harmony import */ var _CalcScalar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalcScalar */ "./src/typescript/Math/CalcScalar.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var CalcMatrix2D = /*#__PURE__*/function (_CalcElement) {
  function CalcMatrix2D() {
    var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    _classCallCheck(this, CalcMatrix2D);
    return _callSuper(this, CalcMatrix2D, [rows, cols]);
  }
  _inherits(CalcMatrix2D, _CalcElement);
  return _createClass(CalcMatrix2D, [{
    key: "isMatrix2D",
    value: function isMatrix2D() {
      return true;
    }
  }, {
    key: "row",
    value: function row(index) {
      var result = new CalcMatrix2D(1, this.cols()).allocate();
      return this._call("matrix", "matrix_row", false)([this, new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set(new Float64Array([index])), result])(result);
    }
  }, {
    key: "col",
    value: function col(index) {
      var result = new CalcMatrix2D(this.rows(), 1).allocate();
      return this._call("matrix", "matrix_col", false)([this, new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set(new Float64Array([index])), result])(result);
    }
  }, {
    key: "maxCoeff",
    value: function maxCoeff() {
      return this.calcSync(function (calc) {
        return calc.maxCoeff();
      });
    }
  }, {
    key: "dot",
    value: function dot(m) {
      return this.calcSync(function (calc) {
        return calc.dot(m);
      });
    }
  }, {
    key: "add",
    value: function add(m) {
      return this.calcSync(function (calc) {
        return calc.add(m);
      });
    }
  }, {
    key: "forwardPropagation",
    value: function forwardPropagation(w, b) {
      return this.calcSync(function (calc) {
        return calc.forwardPropagation(w, b);
      });
    }
  }, {
    key: "backwardPropagation",
    value: function backwardPropagation(w, a_prev, regularization, num_examples) {
      return this.calcSync(function (calc) {
        return calc.backwardPropagation(w, a_prev, regularization, num_examples);
      });
    }
  }, {
    key: "transpose",
    value: function transpose() {
      return this.calcSync(function (calc) {
        return calc.transpose();
      });
    }
  }, {
    key: "logisticForwardPropagation",
    value: function logisticForwardPropagation() {
      return this.calcSync(function (calc) {
        return calc.logisticForwardPropagation();
      });
    }
  }, {
    key: "logisticBackwardPropagation",
    value: function logisticBackwardPropagation() {
      return this.calcSync(function (calc) {
        return calc.logisticBackwardPropagation();
      });
    }
  }, {
    key: "pow",
    value: function pow(number) {
      return this.calcSync(function (calc) {
        return calc.pow(number);
      });
    }
  }, {
    key: "log",
    value: function log() {
      return this.calcSync(function (calc) {
        return calc.log();
      });
    }
  }, {
    key: "multiply",
    value: function multiply(number) {
      return this.calcSync(function (calc) {
        return calc.multiply(number);
      });
    }
  }, {
    key: "minusOne",
    value: function minusOne() {
      return this.calcSync(function (calc) {
        return calc.minusOne();
      });
    }
  }, {
    key: "conjugate",
    value: function conjugate() {
      return this.calcSync(function (calc) {
        return calc.conjugate();
      });
    }
  }, {
    key: "divide",
    value: function divide(mOrNumber) {
      return this.calcSync(function (calc) {
        return calc.divide(mOrNumber);
      });
    }
  }, {
    key: "subtract",
    value: function subtract(m) {
      return this.calcSync(function (calc) {
        return calc.subtract(m);
      });
    }
  }, {
    key: "rowwiseSum",
    value: function rowwiseSum() {
      return this.calcSync(function (calc) {
        return calc.rowwiseSum();
      });
    }
  }, {
    key: "crossEntropyLoss",
    value: function crossEntropyLoss(correctOutput, predictions, epsilon) {
      return this.calcSync(function (calc) {
        return calc.crossEntropyLoss(correctOutput, predictions, epsilon);
      });
    }
  }, {
    key: "crossEntropyDerivative",
    value: function crossEntropyDerivative(correctOutput, predictions, epsilon) {
      return this.calcSync(function (calc) {
        return calc.crossEntropyDerivative(correctOutput, predictions, epsilon);
      });
    }
  }, {
    key: "softmax",
    value: function softmax() {
      return this.calcSync(function (calc) {
        return calc.softmax();
      });
    }
  }, {
    key: "fraction",
    value: function fraction(num) {
      return this.calcSync(function (calc) {
        return calc.fraction(num);
      });
    }
  }, {
    key: "tanh",
    value: function tanh() {
      return this.calcSync(function (calc) {
        return calc.tanh();
      });
    }
  }, {
    key: "tanhDerivative",
    value: function tanhDerivative() {
      return this.calcSync(function (calc) {
        return calc.tanhDerivative();
      });
    }
  }, {
    key: "logMinusOne",
    value: function logMinusOne() {
      return this.calcSync(function (calc) {
        return calc.logMinusOne();
      });
    }
  }, {
    key: "sqrt",
    value: function sqrt() {
      return this.calcSync(function (calc) {
        return calc.sqrt();
      });
    }
  }, {
    key: "block",
    value: function block(rowOffset, colOffset, numRows, numCols) {
      return this.calcSync(function (calc) {
        return calc.block(rowOffset, colOffset, numRows, numCols);
      });
    }
  }, {
    key: "softmaxDerivative",
    value: function softmaxDerivative() {
      return this.calcSync(function (calc) {
        return calc.softmaxDerivative();
      });
    }
  }, {
    key: "min",
    value: function min() {
      return this.calcSync(function (calc) {
        return calc.min();
      });
    }
  }, {
    key: "max",
    value: function max() {
      return this.calcSync(function (calc) {
        return calc.max();
      });
    }
  }, {
    key: "minMax",
    value: function minMax() {
      return this.calcSync(function (calc) {
        return calc.minMax();
      });
    }

    // Static method to run Adam optimizer
  }, {
    key: "getCalcSandbox",
    value: function getCalcSandbox() {
      var _this = this;
      var async = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var baseSandbox = _superPropGet(CalcMatrix2D, "getCalcSandbox", this, 3)([async]);
      var that = this;
      return _objectSpread(_objectSpread({}, baseSandbox), {}, {
        crossEntropyLoss: function crossEntropyLoss(correctOutput, predictions, epsilon) {
          var _epsilon = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([epsilon]);
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate();
          return that._call("algebra", "algebra_cross_entropy_loss", async)([correctOutput, predictions, _epsilon], [result])(result.get()[0]);
        },
        crossEntropyDerivative: function crossEntropyDerivative(correctOutput, predictions, epsilon) {
          var _epsilon = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([epsilon]);
          var result = new CalcMatrix2D(correctOutput.rows(), correctOutput.cols()).allocate();
          return that._call("algebra", "algebra_cross_entropy_derivative", async)([correctOutput, predictions, _epsilon], [result])(result);
        },
        block: function block(rowOffset, colOffset, numRows, numCols) {
          var result = new CalcMatrix2D(numRows, numCols).allocate();
          var _rowOffset = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([rowOffset]);
          var _colOffset = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([colOffset]);
          var _numRows = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([numRows]);
          var _numCols = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([numCols]);
          return that._call("matrix", "matrix_block", async)([that, _rowOffset, _colOffset, _numRows, _numCols, result])(result);
        },
        forwardPropagation: function forwardPropagation(w, b) {
          var result = new CalcMatrix2D(w.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_forward_propagation", async)([w, _this, b, result])(result);
        },
        backwardPropagation: function backwardPropagation(w, a_prev, regularization, num_examples) {
          var gW = new CalcMatrix2D(w.rows(), w.cols()).allocate();
          var gb = new CalcMatrix2D(w.rows(), 1).allocate();
          var dA_prev = new CalcMatrix2D(a_prev.rows(), a_prev.cols()).allocate();
          var _regularization = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([regularization]);
          var _num_examples = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([num_examples]);
          return that._call("algebra", "algebra_backward_propagation", async)([_this, w, a_prev, _regularization, _num_examples, gW, gb, dA_prev])([gW, gb, dA_prev]);
        },
        pow: function pow(number) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_pow", async)([_this, new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([number]), result])(result);
        },
        fraction: function fraction(number) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_fraction", async)([_this, new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([number]), result])(result);
        },
        softmax: function softmax() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_softmax", async)([_this, result])(result);
        },
        sqrt: function sqrt() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_sqrt", async)([_this, result])(result);
        },
        tanh: function tanh() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_tanh", async)([_this, result])(result);
        },
        tanhDerivative: function tanhDerivative() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_tanh_derivative", async)([_this, result])(result);
        },
        softmaxDerivative: function softmaxDerivative() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_softmax_derivative", async)([_this, result])(result);
        },
        rowwiseSum: function rowwiseSum() {
          var result = new CalcMatrix2D(_this.rows(), 1).allocate();
          return that._call("algebra", "algebra_rowwise_sum", async)([_this, result])(result);
        },
        multiply: function multiply(m) {
          if (typeof m === "number") {
            var _m = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([m]);
            var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
            return that._call("algebra", "algebra_multiply_number", async)([_this, _m, result])(result);
          } else {
            var _result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
            return that._call("algebra", "algebra_multiply", async)([_this, m, _result])(_result);
          }
        },
        log: function log() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_log", async)([_this, result])(result);
        },
        divide: function divide(mOrNumber) {
          if (typeof mOrNumber === "number") {
            var num = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([mOrNumber]);
            var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
            return that._call("algebra", "algebra_divide_number", async)([_this, num, result])(result);
          } else {
            var _result2 = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
            return that._call("algebra", "algebra_divide_matrix", async)([_this, mOrNumber, _result2])(_result2);
          }
        },
        dot: function dot(m) {
          var result = new CalcMatrix2D(_this.rows(), m.cols()).allocate();
          return that._call("algebra", "algebra_dot", async)([_this, m, result])(result);
        },
        add: function add(m) {
          if (typeof m === "number") {
            var num = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([m]);
            var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
            return that._call("algebra", "algebra_add_number", async)([_this, num, result])(result);
          } else {
            var _result3 = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
            return that._call("algebra", "algebra_add_matrix", async)([_this, m, _result3])(_result3);
          }
        },
        subtract: function subtract(m) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_subtract", async)([_this, m, result])(result);
        },
        transpose: function transpose() {
          var result = new CalcMatrix2D(_this.cols(), _this.rows()).allocate(); // Corrected dimensions for dot product result
          return that._call("matrix", "matrix_transpose", async)([_this, result])(result);
        },
        logMinusOne: function logMinusOne() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_log_minus_one", async)([_this, result])(result);
        },
        minusOne: function minusOne() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_minus_one", async)([_this, result])(result);
        },
        logisticForwardPropagation: function logisticForwardPropagation() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_logistic_forward_propagation", async)([_this, result])(result);
        },
        conjugate: function conjugate() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_conjugate", async)([_this, result])(result);
        },
        logisticBackwardPropagation: function logisticBackwardPropagation() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_logistic_backward_propagation", async)([_this, result])(result);
        },
        leakyRelu: function leakyRelu(alpha) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_leaky_relu", async)([_this, new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([alpha]), result])(result);
        },
        leakyReluBackpropagation: function leakyReluBackpropagation(alpha) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_leaky_reluBackpropagation", async)([_this, new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([alpha]), result])(result);
        },
        maxCoeff: function maxCoeff() {
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate();
          return that._call("algebra", "algebra_max_coeff", async)([_this, result])(result);
        },
        setMin: function setMin(number) {
          var nb = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([number]);
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("matrix", "matrix_set_min", async)([_this, nb, result])(result);
        },
        setMax: function setMax(number) {
          var nb = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([number]);
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("matrix", "matrix_set_max", async)([_this, nb, result])(result);
        },
        min: function min() {
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate();
          return that._call("matrix", "matrix_min", async)([_this, result])(result);
        },
        max: function max() {
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate();
          return that._call("matrix", "matrix_max", async)([_this, result])(result);
        },
        minMax: function minMax() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_min_max", async)([_this, result])(result);
        },
        img2col: function img2col(filterSize, stride, padding) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          var params = new _CalcRowVector__WEBPACK_IMPORTED_MODULE_1__.CalcRowVector(3).allocate().set([filterSize, stride, padding]);
          return that._call("algebra", "algebra_img2col", async)([_this, params, result])(result);
        },
        adamOptimize: function adamOptimize(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t) {
          // Allocate memory for the results
          var updatedW = new CalcMatrix2D(W.rows(), W.cols()).allocate();
          var updatedB = new CalcMatrix2D(b.rows(), b.cols()).allocate();
          var updatedVW = new CalcMatrix2D(vW.rows(), vW.cols()).allocate();
          var updatedVB = new CalcMatrix2D(vb.rows(), vb.cols()).allocate();
          var updatedSW = new CalcMatrix2D(sW.rows(), sW.cols()).allocate();
          var updatedSB = new CalcMatrix2D(sb.rows(), sb.cols()).allocate();

          // Create CalcScalar instances for numbers
          var _learningRate = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([learningRate]);
          var _beta1 = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([beta1]);
          var _beta2 = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([beta2]);
          var _epsilon = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([epsilon]);
          var _t = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([t]);

          // Call the C++ function
          return that._call("algebra", "algebra_adam_optimize", async)([W, b, gW, gb, vW, vb, sW, sb, _learningRate, _beta1, _beta2, _epsilon, _t],
          // Inputs
          [updatedW, updatedB, updatedVW, updatedVB, updatedSW, updatedSB] // Outputs
          )({
            // Return object mapping
            W: updatedW,
            b: updatedB,
            vW: updatedVW,
            vb: updatedVB,
            sW: updatedSW,
            sb: updatedSB
          });
        }
      });
    }
  }, {
    key: "clone",
    value: function clone() {
      var clone = new CalcMatrix2D(this.rows(), this.cols());
      clone.copyFrom(this);
      return clone;
    }
  }], [{
    key: "runAdamOptimizer",
    value: function runAdamOptimizer(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t) {
      // Create a dummy CalcMatrix2D instance to access calcSync
      var dummy = new CalcMatrix2D(1, 1);
      return dummy.calcSync(function (calc) {
        // Call the sandbox version of adamOptimize
        return calc.adamOptimize(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t);
      });
    }
  }]);
}(_CalcElement__WEBPACK_IMPORTED_MODULE_0__.CalcElement);

/***/ }),

/***/ "./src/typescript/Math/CalcMatrix3D.ts":
/*!*********************************************!*\
  !*** ./src/typescript/Math/CalcMatrix3D.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalcMatrix3D: () => (/* binding */ CalcMatrix3D)
/* harmony export */ });
/* harmony import */ var _CalcElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalcElement */ "./src/typescript/Math/CalcElement.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var CalcMatrix3D = /*#__PURE__*/function (_CalcElement) {
  function CalcMatrix3D() {
    var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    _classCallCheck(this, CalcMatrix3D);
    return _callSuper(this, CalcMatrix3D, [rows, cols, depth]);
  }
  _inherits(CalcMatrix3D, _CalcElement);
  return _createClass(CalcMatrix3D, [{
    key: "isMatrix3D",
    value: function isMatrix3D() {
      return true;
    }
  }]);
}(_CalcElement__WEBPACK_IMPORTED_MODULE_0__.CalcElement);

/***/ }),

/***/ "./src/typescript/Math/CalcRowVector.ts":
/*!**********************************************!*\
  !*** ./src/typescript/Math/CalcRowVector.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalcRowVector: () => (/* binding */ CalcRowVector)
/* harmony export */ });
/* harmony import */ var _CalcElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalcElement */ "./src/typescript/Math/CalcElement.ts");
/* harmony import */ var _CalcColVector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalcColVector */ "./src/typescript/Math/CalcColVector.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var CalcRowVector = /*#__PURE__*/function (_CalcElement) {
  function CalcRowVector() {
    var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    _classCallCheck(this, CalcRowVector);
    return _callSuper(this, CalcRowVector, [rows]);
  }
  _inherits(CalcRowVector, _CalcElement);
  return _createClass(CalcRowVector, [{
    key: "isRowVector",
    value: function isRowVector() {
      return true;
    }
  }, {
    key: "transpose",
    value: function transpose() {
      var result = _CalcColVector__WEBPACK_IMPORTED_MODULE_1__.CalcColVector.fromMemory(this.getMemory().clone(), this.rows());
      return result;
    }
  }]);
}(_CalcElement__WEBPACK_IMPORTED_MODULE_0__.CalcElement);

/***/ }),

/***/ "./src/typescript/Math/CalcScalar.ts":
/*!*******************************************!*\
  !*** ./src/typescript/Math/CalcScalar.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalcScalar: () => (/* binding */ CalcScalar)
/* harmony export */ });
/* harmony import */ var _CalcElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalcElement */ "./src/typescript/Math/CalcElement.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var CalcScalar = /*#__PURE__*/function (_CalcElement) {
  function CalcScalar() {
    _classCallCheck(this, CalcScalar);
    return _callSuper(this, CalcScalar, [1]);
  }
  _inherits(CalcScalar, _CalcElement);
  return _createClass(CalcScalar, [{
    key: "isScalar",
    value: function isScalar() {
      return true;
    }
  }]);
}(_CalcElement__WEBPACK_IMPORTED_MODULE_0__.CalcElement);

/***/ }),

/***/ "./src/typescript/Math/Computation/index.ts":
/*!**************************************************!*\
  !*** ./src/typescript/Math/Computation/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDevice: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.getDevice),
/* harmony export */   setDevice: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.setDevice)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/typescript/Math/Computation/utils.ts");



/***/ }),

/***/ "./src/typescript/Math/Computation/utils.ts":
/*!**************************************************!*\
  !*** ./src/typescript/Math/Computation/utils.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDevice: () => (/* binding */ getDevice),
/* harmony export */   setDevice: () => (/* binding */ setDevice)
/* harmony export */ });
/* harmony import */ var _build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../build/Release/node_native_memory.node */ "./build/Release/node_native_memory.node");
/* harmony import */ var _build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_0__);

var currentDevice = new (_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_0___default().Device).CPU();
var setDevice = function setDevice(device) {
  currentDevice = device;
};
var getDevice = function getDevice() {
  return currentDevice;
};

/***/ }),

/***/ "./src/typescript/Math/index.ts":
/*!**************************************!*\
  !*** ./src/typescript/Math/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calc: () => (/* reexport safe */ _Calc__WEBPACK_IMPORTED_MODULE_0__.Calc),
/* harmony export */   CalcColVector: () => (/* reexport safe */ _CalcColVector__WEBPACK_IMPORTED_MODULE_2__.CalcColVector),
/* harmony export */   CalcMatrix2D: () => (/* reexport safe */ _CalcMatrix2D__WEBPACK_IMPORTED_MODULE_4__.CalcMatrix2D),
/* harmony export */   CalcMatrix3D: () => (/* reexport safe */ _CalcMatrix3D__WEBPACK_IMPORTED_MODULE_5__.CalcMatrix3D),
/* harmony export */   CalcRowVector: () => (/* reexport safe */ _CalcRowVector__WEBPACK_IMPORTED_MODULE_3__.CalcRowVector),
/* harmony export */   CalcScalar: () => (/* reexport safe */ _CalcScalar__WEBPACK_IMPORTED_MODULE_1__.CalcScalar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   round: () => (/* binding */ round)
/* harmony export */ });
/* harmony import */ var _Calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Calc */ "./src/typescript/Math/Calc.ts");
/* harmony import */ var _CalcScalar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalcScalar */ "./src/typescript/Math/CalcScalar.ts");
/* harmony import */ var _CalcColVector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalcColVector */ "./src/typescript/Math/CalcColVector.ts");
/* harmony import */ var _CalcRowVector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CalcRowVector */ "./src/typescript/Math/CalcRowVector.ts");
/* harmony import */ var _CalcMatrix2D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CalcMatrix2D */ "./src/typescript/Math/CalcMatrix2D.ts");
/* harmony import */ var _CalcMatrix3D__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CalcMatrix3D */ "./src/typescript/Math/CalcMatrix3D.ts");






var round = function round(num, decimalPlaces) {
  return Math.round((num + 2.23e-16) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  Calc: _Calc__WEBPACK_IMPORTED_MODULE_0__.Calc,
  CalcScalar: _CalcScalar__WEBPACK_IMPORTED_MODULE_1__.CalcScalar,
  CalcMatrix2D: _CalcMatrix2D__WEBPACK_IMPORTED_MODULE_4__.CalcMatrix2D,
  CalcColVector: _CalcColVector__WEBPACK_IMPORTED_MODULE_2__.CalcColVector,
  CalcRowVector: _CalcRowVector__WEBPACK_IMPORTED_MODULE_3__.CalcRowVector,
  CalcMatrix3D: _CalcMatrix3D__WEBPACK_IMPORTED_MODULE_5__.CalcMatrix3D,
  round: round
});

/***/ }),

/***/ "./src/typescript/Network/Builder/AbstractNetworkBuilder.ts":
/*!******************************************************************!*\
  !*** ./src/typescript/Network/Builder/AbstractNetworkBuilder.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractNetworkBuilder: () => (/* binding */ AbstractNetworkBuilder)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/typescript/Network/index.ts");
/* harmony import */ var _Layer_Backpropagation_BackpropagationFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Layer/Backpropagation/BackpropagationFactory */ "./src/typescript/Network/Layer/Backpropagation/BackpropagationFactory.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var AbstractNetworkBuilder = /*#__PURE__*/function () {
  function AbstractNetworkBuilder(dimension) {
    _classCallCheck(this, AbstractNetworkBuilder);
    _defineProperty(this, "dimensions", null);
    _defineProperty(this, "lastLayer", null);
    _defineProperty(this, "network", null);
    this.dimensions = dimension;
    this.network = new _index__WEBPACK_IMPORTED_MODULE_0__.Network(this.dimensions);
  }
  return _createClass(AbstractNetworkBuilder, [{
    key: "createLayer",
    value: function createLayer(layerClass) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var layer = new layerClass();
      if (typeof callback === "function") {
        callback(layer);
      }
      if (this.lastLayer === null) {
        this.firstLayerTransition(layer);
      } else {
        layer.transition(this.lastLayer);
      }
      layer.configure();
      layer.setBackPropagation(_Layer_Backpropagation_BackpropagationFactory__WEBPACK_IMPORTED_MODULE_1__.BackpropagationFactory.create(this.lastLayer, layer));
      this.network.addLayer(layer);
      this.lastLayer = layer;
      return this;
    }
  }, {
    key: "getNetwork",
    value: function getNetwork() {
      return this.network;
    }
  }]);
}();


/***/ }),

/***/ "./src/typescript/Network/Builder/NetworkBuilder1D.ts":
/*!************************************************************!*\
  !*** ./src/typescript/Network/Builder/NetworkBuilder1D.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetworkBuilder1D: () => (/* binding */ NetworkBuilder1D)
/* harmony export */ });
/* harmony import */ var _AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractNetworkBuilder */ "./src/typescript/Network/Builder/AbstractNetworkBuilder.ts");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Layer */ "./src/typescript/Network/Layer/index.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Math */ "./src/typescript/Math/index.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var NetworkBuilder1D = /*#__PURE__*/function (_AbstractNetworkBuild) {
  function NetworkBuilder1D() {
    _classCallCheck(this, NetworkBuilder1D);
    return _callSuper(this, NetworkBuilder1D, arguments);
  }
  _inherits(NetworkBuilder1D, _AbstractNetworkBuild);
  return _createClass(NetworkBuilder1D, [{
    key: "firstLayerTransition",
    value: function firstLayerTransition(layer) {
      layer.setWidth(this.dimensions[0]);
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(jsonPath) {
      return new Promise(function (resolve, reject) {
        fs__WEBPACK_IMPORTED_MODULE_1__.readFile(jsonPath, function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          var json = JSON.parse(data.toString());
          var builder = new NetworkBuilder1D(json["dimensions"]);
          json["layers"].forEach(function (layerData) {
            var layerClass = null;
            if (layerData["type"] === "logistic") {
              layerClass = _Layer__WEBPACK_IMPORTED_MODULE_2__.LogisticLayer;
            } else if (layerData["type"] === "softmax") {
              layerClass = _Layer__WEBPACK_IMPORTED_MODULE_2__.SoftmaxLayer;
            } else if (layerData["type"] === "relu") {
              layerClass = _Layer__WEBPACK_IMPORTED_MODULE_2__.ReluLayer;
            } else if (layerData["type"] === "tanh") {
              layerClass = _Layer__WEBPACK_IMPORTED_MODULE_2__.TanhLayer;
            }
            builder.createLayer(layerClass, function (layer) {
              // @ts-ignore
              layer.setSize(layerData["size"]);
            });
          });
          var network = builder.getNetwork();
          network.getLayers().forEach(function (layer, i) {
            layer.W = new _Math__WEBPACK_IMPORTED_MODULE_3__.CalcMatrix2D(json["layers"][i]["weights"]["W"].rows, json["layers"][i]["weights"]["W"].cols).allocate().set(json["layers"][i]["weights"]["W"].data);
            layer.b = new _Math__WEBPACK_IMPORTED_MODULE_3__.CalcMatrix2D(json["layers"][i]["weights"]["b"].rows, json["layers"][i]["weights"]["b"].cols).allocate().set(json["layers"][i]["weights"]["b"].data);
          });
          resolve(network);
        });
      });
    }
  }]);
}(_AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__.AbstractNetworkBuilder);


/***/ }),

/***/ "./src/typescript/Network/Builder/index.ts":
/*!*************************************************!*\
  !*** ./src/typescript/Network/Builder/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractNetworkBuilder: () => (/* reexport safe */ _AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__.AbstractNetworkBuilder),
/* harmony export */   NetworkBuilder1D: () => (/* reexport safe */ _NetworkBuilder1D__WEBPACK_IMPORTED_MODULE_1__.NetworkBuilder1D)
/* harmony export */ });
/* harmony import */ var _AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractNetworkBuilder */ "./src/typescript/Network/Builder/AbstractNetworkBuilder.ts");
/* harmony import */ var _NetworkBuilder1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NetworkBuilder1D */ "./src/typescript/Network/Builder/NetworkBuilder1D.ts");




/***/ }),

/***/ "./src/typescript/Network/Layer/AbstractLayer.ts":
/*!*******************************************************!*\
  !*** ./src/typescript/Network/Layer/AbstractLayer.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractLayer: () => (/* binding */ AbstractLayer)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AbstractLayer = /*#__PURE__*/function () {
  function AbstractLayer() {
    _classCallCheck(this, AbstractLayer);
    _defineProperty(this, "width", 0);
    _defineProperty(this, "height", 0);
    _defineProperty(this, "depth", 0);
    _defineProperty(this, "previousLayer", null);
    _defineProperty(this, "backPropagation", null);
  }
  return _createClass(AbstractLayer, [{
    key: "setBackPropagation",
    value: function setBackPropagation(backPropagation) {
      this.backPropagation = backPropagation;
      return this;
    }
  }, {
    key: "getBackPropagation",
    value: function getBackPropagation() {
      return this.backPropagation;
    }
  }, {
    key: "setWidth",
    value: function setWidth(value) {
      this.width = value;
      return this;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: "setHeight",
    value: function setHeight(value) {
      this.height = value;
      return this;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.height;
    }
  }, {
    key: "setDepth",
    value: function setDepth(value) {
      this.depth = value;
      return this;
    }
  }, {
    key: "getDepth",
    value: function getDepth() {
      return this.depth;
    }
  }, {
    key: "transition",
    value: function transition(previousLayer) {
      this.previousLayer = previousLayer;
      return this;
    }
  }]);
}();


/***/ }),

/***/ "./src/typescript/Network/Layer/AbstractLayer1D.ts":
/*!*********************************************************!*\
  !*** ./src/typescript/Network/Layer/AbstractLayer1D.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractLayer1D: () => (/* binding */ AbstractLayer1D)
/* harmony export */ });
/* harmony import */ var _AbstractLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractLayer */ "./src/typescript/Network/Layer/AbstractLayer.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Math */ "./src/typescript/Math/index.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var AbstractLayer1D = /*#__PURE__*/function (_AbstractLayer) {
  function AbstractLayer1D() {
    var _this;
    _classCallCheck(this, AbstractLayer1D);
    _this = _callSuper(this, AbstractLayer1D);
    _defineProperty(_this, "depth", 1);
    _this.W = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.b = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.A = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.Z = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.gW = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.gb = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.vW = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.vb = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.sW = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.sb = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.dW = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    _this.db = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    return _this;
  }
  _inherits(AbstractLayer1D, _AbstractLayer);
  return _createClass(AbstractLayer1D, [{
    key: "configure",
    value: function configure() {
      this.W.resize(this.getHeight(), this.getWidth());
      this.W.setRandom(Math.sqrt(6 / this.getWidth()));
      this.b.resize(this.getHeight(), 1).setZeros().add(1.0);
      this.gW.resize(this.getHeight(), this.getWidth());
      this.gW.setZeros();
      this.gb.resize(this.getHeight(), 1);
      this.gb.setZeros();
      this.sW.resize(this.getHeight(), this.getWidth());
      this.sW.setZeros();
      this.sb.resize(this.getHeight(), 1);
      this.sb.setZeros();
      this.vW.resize(this.getHeight(), this.getWidth());
      this.vW.setZeros();
      this.vb.resize(this.getHeight(), 1);
      this.vb.setZeros();
      this.dW.resize(this.getHeight(), this.getWidth());
      this.dW.setZeros();
      this.db.resize(this.getHeight(), 1);
      this.db.setZeros();
    }
  }, {
    key: "forward",
    value: function forward(input) {
      this.Z = input.forwardPropagation(this.W, this.b);
      this.A = this.activation(this.Z);
      return this.A;
    }
  }, {
    key: "is1D",
    value: function is1D() {
      return true;
    }
  }, {
    key: "is3D",
    value: function is3D() {
      return false;
    }
  }, {
    key: "transition",
    value: function transition(previousLayer) {
      if (previousLayer.is1D()) {
        this.setWidth(previousLayer.getSize());
      } else if (previousLayer.is3D()) {
        this.setWidth(previousLayer.getOutputWidth() * previousLayer.getOutputHeight() * previousLayer.getOutputDepth());
      }
      _superPropGet(AbstractLayer1D, "transition", this, 3)([previousLayer]);
      return this;
    }
  }, {
    key: "setSize",
    value: function setSize(value) {
      this.setHeight(value);
      return this;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.height;
    }
  }, {
    key: "getOutputWidth",
    value: function getOutputWidth() {
      return this.width;
    }
  }, {
    key: "getOutputHeight",
    value: function getOutputHeight() {
      return this.height;
    }
  }, {
    key: "getOutputDepth",
    value: function getOutputDepth() {
      return 1;
    }
  }, {
    key: "penalty",
    value: function penalty() {
      return this.W.pow(2).sum();
    }
  }]);
}(_AbstractLayer__WEBPACK_IMPORTED_MODULE_0__.AbstractLayer);


/***/ }),

/***/ "./src/typescript/Network/Layer/Backpropagation/AbstractBackpropagation.ts":
/*!*********************************************************************************!*\
  !*** ./src/typescript/Network/Layer/Backpropagation/AbstractBackpropagation.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractBackPropagation: () => (/* binding */ AbstractBackPropagation)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AbstractBackPropagation = /*#__PURE__*/_createClass(function AbstractBackPropagation(layer, previousLayer) {
  _classCallCheck(this, AbstractBackPropagation);
  _defineProperty(this, "layer", null);
  _defineProperty(this, "previousLayer", null);
  this.layer = layer;
  this.previousLayer = previousLayer;
});

/***/ }),

/***/ "./src/typescript/Network/Layer/Backpropagation/Backpropagation1Dto1D.ts":
/*!*******************************************************************************!*\
  !*** ./src/typescript/Network/Layer/Backpropagation/Backpropagation1Dto1D.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Backpropagation1Dto1D: () => (/* binding */ Backpropagation1Dto1D)
/* harmony export */ });
/* harmony import */ var _AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractBackpropagation */ "./src/typescript/Network/Layer/Backpropagation/AbstractBackpropagation.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ "./src/typescript/types.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var Backpropagation1Dto1D = /*#__PURE__*/function (_AbstractBackPropagat) {
  function Backpropagation1Dto1D() {
    _classCallCheck(this, Backpropagation1Dto1D);
    return _callSuper(this, Backpropagation1Dto1D, arguments);
  }
  _inherits(Backpropagation1Dto1D, _AbstractBackPropagat);
  return _createClass(Backpropagation1Dto1D, [{
    key: "propagate",
    value: function propagate(input, numberOfExamples, regularization, layer, sigma, isLastLayer) {
      var dZ = sigma;
      if (isLastLayer && layer.getType() !== _types__WEBPACK_IMPORTED_MODULE_1__.LayerType.softmax) {
        dZ.replace(sigma.multiply(layer.derivative(layer.Z)));
        //console.log(`\n--- Backpropagation: Last Layer (${layer.getType()}) ---`);
        //console.log("sigma (A - Y):", sigma.get());
      } /* else {
         //console.log(`\n--- Backpropagation: Hidden Layer (${layer.getType()}) ---`);
         //console.log("sigma (dA_prev from next layer):", sigma.get());
        }*/

      //console.log("dZ (gradient of linear output):", dZ.get());

      var previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;
      var _dZ$backwardPropagati = dZ.backwardPropagation(layer.W, previousActivations, regularization, numberOfExamples),
        _dZ$backwardPropagati2 = _slicedToArray(_dZ$backwardPropagati, 3),
        gW = _dZ$backwardPropagati2[0],
        gb = _dZ$backwardPropagati2[1],
        dA_prev = _dZ$backwardPropagati2[2];

      //console.log("gW (weight gradients):", gW.get());
      //console.log("gb (bias gradients):", gb.get());
      //console.log("dA_prev (propagating to previous layer):", dA_prev.get());

      layer.gW.replace(gW);
      layer.gb.replace(gb);
      return dA_prev;
    }
  }]);
}(_AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__.AbstractBackPropagation);

/***/ }),

/***/ "./src/typescript/Network/Layer/Backpropagation/BackpropagationFactory.ts":
/*!********************************************************************************!*\
  !*** ./src/typescript/Network/Layer/Backpropagation/BackpropagationFactory.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackpropagationFactory: () => (/* binding */ BackpropagationFactory)
/* harmony export */ });
/* harmony import */ var _Backpropagation1Dto1D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Backpropagation1Dto1D */ "./src/typescript/Network/Layer/Backpropagation/Backpropagation1Dto1D.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var BackpropagationFactory = /*#__PURE__*/function () {
  function BackpropagationFactory() {
    _classCallCheck(this, BackpropagationFactory);
  }
  return _createClass(BackpropagationFactory, null, [{
    key: "create",
    value: function create(previousLayer, layer) {
      if (previousLayer) {
        if (previousLayer.is1D()) {
          return new _Backpropagation1Dto1D__WEBPACK_IMPORTED_MODULE_0__.Backpropagation1Dto1D(layer, previousLayer);
        }
      } else {
        if (layer.is1D()) {
          return new _Backpropagation1Dto1D__WEBPACK_IMPORTED_MODULE_0__.Backpropagation1Dto1D(layer, previousLayer);
        }
      }
      return null;
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Network/Layer/Logistic.ts":
/*!**************************************************!*\
  !*** ./src/typescript/Network/Layer/Logistic.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogisticLayer: () => (/* binding */ LogisticLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Network/Layer/AbstractLayer1D.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var LogisticLayer = /*#__PURE__*/function (_AbstractLayer1D) {
  function LogisticLayer() {
    _classCallCheck(this, LogisticLayer);
    return _callSuper(this, LogisticLayer, arguments);
  }
  _inherits(LogisticLayer, _AbstractLayer1D);
  return _createClass(LogisticLayer, [{
    key: "activation",
    value: function activation(m) {
      return m.logisticForwardPropagation();
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.logistic;
    }
  }, {
    key: "derivative",
    value: function derivative(delta) {
      return delta.logisticBackwardPropagation();
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__.AbstractLayer1D);


/***/ }),

/***/ "./src/typescript/Network/Layer/Relu.ts":
/*!**********************************************!*\
  !*** ./src/typescript/Network/Layer/Relu.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReluLayer: () => (/* binding */ ReluLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Network/Layer/AbstractLayer1D.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var ReluLayer = /*#__PURE__*/function (_AbstractLayer1D) {
  function ReluLayer() {
    var _this;
    _classCallCheck(this, ReluLayer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ReluLayer, [].concat(args));
    _defineProperty(_this, "alpha", 0.01);
    return _this;
  }
  _inherits(ReluLayer, _AbstractLayer1D);
  return _createClass(ReluLayer, [{
    key: "activation",
    value: function activation(m) {
      var _this2 = this;
      return m.calcSync(function (calc) {
        return calc.leakyRelu(_this2.alpha);
      });
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.relu;
    }
  }, {
    key: "derivative",
    value: function derivative(delta) {
      var _this3 = this;
      return delta.calcSync(function (calc) {
        return calc.leakyReluBackpropagation(_this3.alpha);
      });
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__.AbstractLayer1D);


/***/ }),

/***/ "./src/typescript/Network/Layer/Softmax.ts":
/*!*************************************************!*\
  !*** ./src/typescript/Network/Layer/Softmax.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SoftmaxLayer: () => (/* binding */ SoftmaxLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Network/Layer/AbstractLayer1D.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var SoftmaxLayer = /*#__PURE__*/function (_AbstractLayer1D) {
  function SoftmaxLayer() {
    _classCallCheck(this, SoftmaxLayer);
    return _callSuper(this, SoftmaxLayer, arguments);
  }
  _inherits(SoftmaxLayer, _AbstractLayer1D);
  return _createClass(SoftmaxLayer, [{
    key: "activation",
    value: function activation(m) {
      return m.softmax();
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.softmax;
    }
  }, {
    key: "derivative",
    value: function derivative(delta) {
      // When CrossEntropyCost is used with Softmax, the cost function's derivative
      // already computes dZ (A - Y). We should just pass it through.
      return delta;
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__.AbstractLayer1D);


/***/ }),

/***/ "./src/typescript/Network/Layer/Tanh.ts":
/*!**********************************************!*\
  !*** ./src/typescript/Network/Layer/Tanh.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TanhLayer: () => (/* binding */ TanhLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Network/Layer/AbstractLayer1D.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var TanhLayer = /*#__PURE__*/function (_AbstractLayer1D) {
  function TanhLayer() {
    _classCallCheck(this, TanhLayer);
    return _callSuper(this, TanhLayer, arguments);
  }
  _inherits(TanhLayer, _AbstractLayer1D);
  return _createClass(TanhLayer, [{
    key: "activation",
    value: function activation(m) {
      return m.tanh();
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.tanh;
    }
  }, {
    key: "derivative",
    value: function derivative(sigma) {
      return sigma.tanhDerivative();
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__.AbstractLayer1D);


/***/ }),

/***/ "./src/typescript/Network/Layer/index.ts":
/*!***********************************************!*\
  !*** ./src/typescript/Network/Layer/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractLayer: () => (/* reexport safe */ _AbstractLayer__WEBPACK_IMPORTED_MODULE_0__.AbstractLayer),
/* harmony export */   LogisticLayer: () => (/* reexport safe */ _Logistic__WEBPACK_IMPORTED_MODULE_2__.LogisticLayer),
/* harmony export */   ReluLayer: () => (/* reexport safe */ _Relu__WEBPACK_IMPORTED_MODULE_4__.ReluLayer),
/* harmony export */   SoftmaxLayer: () => (/* reexport safe */ _Softmax__WEBPACK_IMPORTED_MODULE_1__.SoftmaxLayer),
/* harmony export */   TanhLayer: () => (/* reexport safe */ _Tanh__WEBPACK_IMPORTED_MODULE_3__.TanhLayer)
/* harmony export */ });
/* harmony import */ var _AbstractLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractLayer */ "./src/typescript/Network/Layer/AbstractLayer.ts");
/* harmony import */ var _Softmax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Softmax */ "./src/typescript/Network/Layer/Softmax.ts");
/* harmony import */ var _Logistic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Logistic */ "./src/typescript/Network/Layer/Logistic.ts");
/* harmony import */ var _Tanh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tanh */ "./src/typescript/Network/Layer/Tanh.ts");
/* harmony import */ var _Relu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Relu */ "./src/typescript/Network/Layer/Relu.ts");







/***/ }),

/***/ "./src/typescript/Network/Network.ts":
/*!*******************************************!*\
  !*** ./src/typescript/Network/Network.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Network: () => (/* binding */ Network),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Network = /*#__PURE__*/function () {
  function Network(dimensions) {
    _classCallCheck(this, Network);
    _defineProperty(this, "dimensions", null);
    _defineProperty(this, "size", 0);
    _defineProperty(this, "layers", []);
    this.dimensions = dimensions;
  }
  return _createClass(Network, [{
    key: "addLayer",
    value: function addLayer(layer) {
      this.size++;
      this.layers.push(layer);
      return this;
    }
  }, {
    key: "getLayers",
    value: function getLayers() {
      return this.layers;
    }
  }, {
    key: "getLastLayer",
    value: function getLastLayer() {
      return this.layers[this.layers.length - 1];
    }
  }, {
    key: "forward",
    value: function forward(input) {
      var output = input;
      this.layers.forEach(function (layer) {
        output = layer.forward(output);
      });
      return output;
    }
  }, {
    key: "backward",
    value: function backward(X, regularization, sigma) {
      var m = X.cols();
      var currentSigma = sigma;
      for (var i = this.layers.length - 1; i >= 0; i -= 1) {
        var layer = this.layers[i];
        var isLastLayer = i === this.layers.length - 1;
        currentSigma = layer.getBackPropagation().propagate(X, m, regularization, layer, currentSigma, isLastLayer);
      }
    }
  }, {
    key: "save",
    value: function save(path) {
      var resultJSON = {
        dimensions: this.dimensions,
        layers: []
      };
      this.layers.forEach(function (layer) {
        resultJSON.layers.push({
          type: layer.getType(),
          size: layer.getSize(),
          weights: {
            W: {
              data: _toConsumableArray(layer.W.get()),
              rows: layer.W.rows(),
              cols: layer.W.cols()
            },
            b: {
              data: _toConsumableArray(layer.b.get()),
              rows: layer.b.rows(),
              cols: layer.b.cols()
            }
          }
        });
      });
      var result = JSON.stringify(resultJSON);
      return new Promise(function (resolve, reject) {
        fs__WEBPACK_IMPORTED_MODULE_0__.writeFile(path, result, function (err) {
          if (err) {
            console.error(err);
            reject();
          }
          resolve(result);
        });
      });
    }
  }]);
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Network);

/***/ }),

/***/ "./src/typescript/Network/Trainer/AbstractTrainer.ts":
/*!***********************************************************!*\
  !*** ./src/typescript/Network/Trainer/AbstractTrainer.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractTrainer: () => (/* binding */ AbstractTrainer)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AbstractTrainer = /*#__PURE__*/function () {
  function AbstractTrainer(network, optimizer, costFunction) {
    _classCallCheck(this, AbstractTrainer);
    _defineProperty(this, "regularization", 1e-4);
    _defineProperty(this, "iterations", 1000);
    _defineProperty(this, "learningRate", 0.001);
    _defineProperty(this, "verbose", true);
    _defineProperty(this, "verboseStep", 1);
    _defineProperty(this, "stepCallback", function (data) {
      return undefined;
    });
    this.network = network;
    this.optimizer = optimizer;
    this.costFunction = costFunction;
  }
  return _createClass(AbstractTrainer, [{
    key: "setRegularization",
    value: function setRegularization(regularization) {
      this.regularization = regularization;
      return this;
    }
  }, {
    key: "setIterations",
    value: function setIterations(iterations) {
      this.iterations = iterations;
      return this;
    }
  }, {
    key: "setLearningRate",
    value: function setLearningRate(learningRate) {
      this.learningRate = learningRate;
      return this;
    }
  }, {
    key: "setVerbose",
    value: function setVerbose(verbose) {
      this.verbose = verbose;
      return this;
    }
  }, {
    key: "setVerboseStep",
    value: function setVerboseStep(verboseStep) {
      this.verboseStep = verboseStep;
      return this;
    }
  }, {
    key: "setStepCallback",
    value: function setStepCallback(stepCallback) {
      this.stepCallback = stepCallback;
      return this;
    }
  }, {
    key: "cost",
    value: function cost(predictions, correctOutput) {
      var miniBatchSize = correctOutput.cols();
      var cost = this.costFunction.loss(correctOutput, predictions);
      if (this.regularization > 0) {
        var penalty = 0;
        this.network.getLayers().forEach(function (layer) {
          penalty += layer.penalty().get()[0];
        });
        cost += this.regularization / (2 * miniBatchSize) * penalty;
      }
      var correctPredictions = 0;
      for (var i = 0; i < miniBatchSize; i += 1) {
        var predictionCol = predictions.col(i);
        var outputCol = correctOutput.col(i);
        var predictionIndex = predictionCol.maxCoeff();
        var outputIndex = outputCol.maxCoeff();
        if (i === 0) {
          console.log("DEBUG ACCURACY:");
          console.log("  Prediction Col:", predictionCol.get());
          console.log("  Predicted Index:", predictionIndex.get()[0]);
          console.log("  Correct Col:", outputCol.get());
          console.log("  Correct Index:", outputIndex.get()[0]);
        }
        if (predictionIndex.get()[0] === outputIndex.get()[0]) {
          correctPredictions++;
        }
      }
      var accuracy = correctPredictions / miniBatchSize * 100.0;
      return {
        cost: cost,
        accuracy: accuracy
      };
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Network/Trainer/BatchTrainer.ts":
/*!********************************************************!*\
  !*** ./src/typescript/Network/Trainer/BatchTrainer.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BatchTrainer: () => (/* binding */ BatchTrainer)
/* harmony export */ });
/* harmony import */ var _AbstractTrainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractTrainer */ "./src/typescript/Network/Trainer/AbstractTrainer.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Math */ "./src/typescript/Math/index.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var BatchTrainer = /*#__PURE__*/function (_AbstractTrainer) {
  function BatchTrainer(network, optimizer, costFunction) {
    var _this;
    _classCallCheck(this, BatchTrainer);
    _this = _callSuper(this, BatchTrainer, [network, optimizer, costFunction]);
    _defineProperty(_this, "_batchSize", 100);
    return _this;
  }
  _inherits(BatchTrainer, _AbstractTrainer);
  return _createClass(BatchTrainer, [{
    key: "setBatchSize",
    value: function setBatchSize(size) {
      this._batchSize = size;
      return this;
    }
  }, {
    key: "train",
    value: function train(inputDataset, outputDataset) {
      var _this2 = this;
      var numberOfExamples = inputDataset.data.rows();
      var t = 0;
      this.optimizer.setBatchSize(this._batchSize);
      this.optimizer.setLearningRate(this.learningRate);
      for (var i = 0; i < this.iterations; i += 1) {
        var startTime = new Date().getTime();
        for (var batch = 0, offset = 0; batch < numberOfExamples; offset += this._batchSize) {
          console.log(offset, Math.min(this._batchSize, numberOfExamples - offset));
          var input = inputDataset.getBatch(offset, this._batchSize);
          var output = outputDataset.getBatch(offset, this._batchSize);
          var predictions = this.network.forward(input);
          var sigma = this.costFunction.derivative(output, predictions, this.network.getLastLayer());
          this.network.backward(input, this.regularization, sigma);
          this.optimizer.setT(++t);
          this.network.getLayers().forEach(function (layer) {
            _this2.optimizer.optimize(layer);
          });
          if (this.verbose && (i + 1) % this.verboseStep === 0) {
            var currentResult = this.cost(predictions, output);
            var endTime = new Date().getTime();
            console.log("Iteration: ".concat(i + 1, " | Cost: ").concat((0,_Math__WEBPACK_IMPORTED_MODULE_1__.round)(currentResult.cost, 5), " | Accuracy: ").concat((0,_Math__WEBPACK_IMPORTED_MODULE_1__.round)(currentResult.accuracy, 2), "% | Time: ").concat((endTime - startTime) / 1000, " s."));
          }
          input.destroy();
          output.destroy();
          predictions.destroy();
          sigma.destroy();
        }
        this.stepCallback({
          iteration: i
        });
      }
      return this;
    }
  }]);
}(_AbstractTrainer__WEBPACK_IMPORTED_MODULE_0__.AbstractTrainer);

/***/ }),

/***/ "./src/typescript/Network/Trainer/Cost/AbstractCost.ts":
/*!*************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Cost/AbstractCost.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractCost: () => (/* binding */ AbstractCost)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var AbstractCost = /*#__PURE__*/_createClass(function AbstractCost() {
  _classCallCheck(this, AbstractCost);
});

/***/ }),

/***/ "./src/typescript/Network/Trainer/Cost/CrossEntropyCost.ts":
/*!*****************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Cost/CrossEntropyCost.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CrossEntropyCost: () => (/* binding */ CrossEntropyCost)
/* harmony export */ });
/* harmony import */ var _AbstractCost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCost */ "./src/typescript/Network/Trainer/Cost/AbstractCost.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ "./src/typescript/types.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var CrossEntropyCost = /*#__PURE__*/function (_AbstractCost) {
  function CrossEntropyCost() {
    var _this;
    _classCallCheck(this, CrossEntropyCost);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, CrossEntropyCost, [].concat(args));
    _defineProperty(_this, "epsilon", 1e-8);
    return _this;
  }
  _inherits(CrossEntropyCost, _AbstractCost);
  return _createClass(CrossEntropyCost, [{
    key: "loss",
    value: function loss(correctOutput, predictions) {
      return new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D().crossEntropyLoss(correctOutput, predictions, this.epsilon);
    }
  }, {
    key: "derivative",
    value: function derivative(correctOutput, predictions, lastLayer) {
      if (lastLayer.getType() === _types__WEBPACK_IMPORTED_MODULE_2__.LayerType.softmax) {
        // For Softmax, we compute dZ directly
        return predictions.subtract(correctOutput);
      }

      // For other layers (like Sigmoid), we calculate dA
      return new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D().crossEntropyDerivative(correctOutput, predictions, this.epsilon);
    }
  }]);
}(_AbstractCost__WEBPACK_IMPORTED_MODULE_0__.AbstractCost);

/***/ }),

/***/ "./src/typescript/Network/Trainer/Cost/MeanSquaredErrorCost.ts":
/*!*********************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Cost/MeanSquaredErrorCost.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeanSquaredErrorCost: () => (/* binding */ MeanSquaredErrorCost)
/* harmony export */ });
/* harmony import */ var _AbstractCost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCost */ "./src/typescript/Network/Trainer/Cost/AbstractCost.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var MeanSquaredErrorCost = /*#__PURE__*/function (_AbstractCost) {
  function MeanSquaredErrorCost() {
    _classCallCheck(this, MeanSquaredErrorCost);
    return _callSuper(this, MeanSquaredErrorCost, arguments);
  }
  _inherits(MeanSquaredErrorCost, _AbstractCost);
  return _createClass(MeanSquaredErrorCost, [{
    key: "loss",
    value: function loss(correctOutput, predictions) {
      var miniBatchSize = correctOutput.cols();
      var error = predictions.subtract(correctOutput);
      var cost = error.pow(2).sum().get()[0];
      return cost / (2 * miniBatchSize);
    }
  }, {
    key: "derivative",
    value: function derivative(correctOutput, predictions, lastLayer) {
      return predictions.subtract(correctOutput);
    }
  }]);
}(_AbstractCost__WEBPACK_IMPORTED_MODULE_0__.AbstractCost);

/***/ }),

/***/ "./src/typescript/Network/Trainer/Optimizer/AbstractOptimizer.ts":
/*!***********************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Optimizer/AbstractOptimizer.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractOptimizer: () => (/* binding */ AbstractOptimizer)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AbstractOptimizer = /*#__PURE__*/function () {
  function AbstractOptimizer() {
    _classCallCheck(this, AbstractOptimizer);
    _defineProperty(this, "batchSize", 0);
    _defineProperty(this, "t", 0);
    _defineProperty(this, "learningRate", 0);
  }
  return _createClass(AbstractOptimizer, [{
    key: "setBatchSize",
    value: function setBatchSize(batchSize) {
      this.batchSize = batchSize;
      return this;
    }
  }, {
    key: "setT",
    value: function setT(t) {
      this.t = t;
      return this;
    }
  }, {
    key: "setLearningRate",
    value: function setLearningRate(learningRate) {
      this.learningRate = learningRate;
      return this;
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Network/Trainer/Optimizer/OptimizerAdagrad.ts":
/*!**********************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Optimizer/OptimizerAdagrad.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerAdagrad: () => (/* binding */ OptimizerAdagrad)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Network/Trainer/Optimizer/AbstractOptimizer.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var OptimizerAdagrad = /*#__PURE__*/function (_AbstractOptimizer) {
  function OptimizerAdagrad() {
    var _this;
    _classCallCheck(this, OptimizerAdagrad);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, OptimizerAdagrad, [].concat(args));
    _defineProperty(_this, "epsilon", 1e-8);
    return _this;
  }
  _inherits(OptimizerAdagrad, _AbstractOptimizer);
  return _createClass(OptimizerAdagrad, [{
    key: "optimize",
    value: function optimize(layer) {
      this.adagrad(layer, this.learningRate);
    }
  }, {
    key: "adagrad",
    value: function adagrad(layer, learningRate) {
      layer.dW = layer.dW.add(layer.gW.pow(2));
      layer.W = layer.W.subtract(layer.gW.multiply(learningRate).divide(layer.dW.add(this.epsilon).sqrt()));
      layer.db = layer.db.add(layer.gb.pow(2));
      layer.b = layer.b.subtract(layer.gb.multiply(learningRate).divide(layer.db.add(this.epsilon).sqrt()));
    }
  }]);
}(_AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__.AbstractOptimizer);

/***/ }),

/***/ "./src/typescript/Network/Trainer/Optimizer/OptimizerAdam.ts":
/*!*******************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Optimizer/OptimizerAdam.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerAdam: () => (/* binding */ OptimizerAdam)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Network/Trainer/Optimizer/AbstractOptimizer.ts");
/* harmony import */ var _Math___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Math/ */ "./src/typescript/Math/index.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var OptimizerAdam = /*#__PURE__*/function (_AbstractOptimizer) {
  function OptimizerAdam() {
    var _this;
    _classCallCheck(this, OptimizerAdam);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, OptimizerAdam, [].concat(args));
    _defineProperty(_this, "beta1", 0.9);
    _defineProperty(_this, "beta2", 0.999);
    _defineProperty(_this, "epsilon", 1e-8);
    return _this;
  }
  _inherits(OptimizerAdam, _AbstractOptimizer);
  return _createClass(OptimizerAdam, [{
    key: "optimize",
    value: function optimize(layer) {
      var W = layer.W,
        b = layer.b,
        gW = layer.gW,
        gb = layer.gb,
        vW = layer.vW,
        vb = layer.vb,
        sW = layer.sW,
        sb = layer.sb;
      var learningRate = this.learningRate,
        beta1 = this.beta1,
        beta2 = this.beta2,
        epsilon = this.epsilon,
        t = this.t;
      var updatedMatrices = _Math___WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D.runAdamOptimizer(W, b, gW, gb, vW, vb, sW, sb, learningRate, beta1, beta2, epsilon, t);
      layer.W.replace(updatedMatrices.W);
      layer.b.replace(updatedMatrices.b);
      layer.vW.replace(updatedMatrices.vW);
      layer.vb.replace(updatedMatrices.vb);
      layer.sW.replace(updatedMatrices.sW);
      layer.sb.replace(updatedMatrices.sb);
    }
  }]);
}(_AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__.AbstractOptimizer);

/***/ }),

/***/ "./src/typescript/Network/Trainer/Optimizer/OptimizerGradientDescent.ts":
/*!******************************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Optimizer/OptimizerGradientDescent.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerGradientDescent: () => (/* binding */ OptimizerGradientDescent)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Network/Trainer/Optimizer/AbstractOptimizer.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var OptimizerGradientDescent = /*#__PURE__*/function (_AbstractOptimizer) {
  function OptimizerGradientDescent() {
    _classCallCheck(this, OptimizerGradientDescent);
    return _callSuper(this, OptimizerGradientDescent, arguments);
  }
  _inherits(OptimizerGradientDescent, _AbstractOptimizer);
  return _createClass(OptimizerGradientDescent, [{
    key: "optimize",
    value: function optimize(layer) {
      this.gradientDescent(layer, this.learningRate);
    }
  }, {
    key: "gradientDescent",
    value: function gradientDescent(layer, learningRate) {
      layer.W = layer.W.subtract(layer.gW.multiply(learningRate));
      layer.b = layer.b.subtract(layer.gb.multiply(learningRate));
    }
  }]);
}(_AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__.AbstractOptimizer);

/***/ }),

/***/ "./src/typescript/Network/Trainer/Optimizer/OptimizerMomentum.ts":
/*!***********************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Optimizer/OptimizerMomentum.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerMomentum: () => (/* binding */ OptimizerMomentum)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Network/Trainer/Optimizer/AbstractOptimizer.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var OptimizerMomentum = /*#__PURE__*/function (_AbstractOptimizer) {
  function OptimizerMomentum() {
    var _this;
    _classCallCheck(this, OptimizerMomentum);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, OptimizerMomentum, [].concat(args));
    _defineProperty(_this, "beta", 0.9);
    return _this;
  }
  _inherits(OptimizerMomentum, _AbstractOptimizer);
  return _createClass(OptimizerMomentum, [{
    key: "optimize",
    value: function optimize(layer) {
      this.momentum(layer, this.learningRate);
    }
  }, {
    key: "setBeta",
    value: function setBeta(beta) {
      this.beta = beta;
      return this;
    }
  }, {
    key: "momentum",
    value: function momentum(layer, learningRate) {
      layer.vW = layer.gW.multiply(this.beta).add(layer.gW.multiply(1 - this.beta));
      layer.vb = layer.gb.multiply(this.beta).add(layer.gb.multiply(1 - this.beta));
      layer.W = layer.W.subtract(layer.vW.multiply(learningRate));
      layer.b = layer.b.subtract(layer.vb.multiply(learningRate));
    }
  }]);
}(_AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__.AbstractOptimizer);

/***/ }),

/***/ "./src/typescript/Network/Trainer/Optimizer/OptimizerRMSProp.ts":
/*!**********************************************************************!*\
  !*** ./src/typescript/Network/Trainer/Optimizer/OptimizerRMSProp.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerRMSProp: () => (/* binding */ OptimizerRMSProp)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Network/Trainer/Optimizer/AbstractOptimizer.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var OptimizerRMSProp = /*#__PURE__*/function (_AbstractOptimizer) {
  function OptimizerRMSProp() {
    var _this;
    _classCallCheck(this, OptimizerRMSProp);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, OptimizerRMSProp, [].concat(args));
    _defineProperty(_this, "alpha", 1e-3);
    _defineProperty(_this, "beta", 0.9);
    return _this;
  }
  _inherits(OptimizerRMSProp, _AbstractOptimizer);
  return _createClass(OptimizerRMSProp, [{
    key: "setBeta",
    value: function setBeta(beta) {
      this.beta = beta;
      return this;
    }
  }, {
    key: "setAlpha",
    value: function setAlpha(alpha) {
      this.alpha = alpha;
      return this;
    }
  }, {
    key: "optimize",
    value: function optimize(layer) {
      this.rmsprop(layer, this.learningRate, this.alpha, this.beta);
    }
  }, {
    key: "rmsprop",
    value: function rmsprop(layer, learningRate, alpha, beta) {
      layer.sW = layer.sW.multiply(beta).add(layer.gW.pow(2).multiply(1 - beta));
      layer.sb = layer.sb.multiply(beta).add(layer.gb.pow(2).multiply(1 - beta));
      layer.W = layer.W.subtract(layer.gW.multiply(alpha).divide(layer.sW.sqrt().add(1e-8)));
      layer.b = layer.b.subtract(layer.gb.multiply(alpha).divide(layer.sb.sqrt().add(1e-8)));
    }
  }]);
}(_AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__.AbstractOptimizer);

/***/ }),

/***/ "./src/typescript/Network/Trainer/Optimizer/index.ts":
/*!***********************************************************!*\
  !*** ./src/typescript/Network/Trainer/Optimizer/index.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerAdagrad: () => (/* reexport safe */ _OptimizerAdagrad__WEBPACK_IMPORTED_MODULE_2__.OptimizerAdagrad),
/* harmony export */   OptimizerAdam: () => (/* reexport safe */ _OptimizerAdam__WEBPACK_IMPORTED_MODULE_0__.OptimizerAdam),
/* harmony export */   OptimizerGradientDescent: () => (/* reexport safe */ _OptimizerGradientDescent__WEBPACK_IMPORTED_MODULE_1__.OptimizerGradientDescent),
/* harmony export */   OptimizerMomentum: () => (/* reexport safe */ _OptimizerMomentum__WEBPACK_IMPORTED_MODULE_3__.OptimizerMomentum),
/* harmony export */   OptimizerRMSProp: () => (/* reexport safe */ _OptimizerRMSProp__WEBPACK_IMPORTED_MODULE_4__.OptimizerRMSProp)
/* harmony export */ });
/* harmony import */ var _OptimizerAdam__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptimizerAdam */ "./src/typescript/Network/Trainer/Optimizer/OptimizerAdam.ts");
/* harmony import */ var _OptimizerGradientDescent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OptimizerGradientDescent */ "./src/typescript/Network/Trainer/Optimizer/OptimizerGradientDescent.ts");
/* harmony import */ var _OptimizerAdagrad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OptimizerAdagrad */ "./src/typescript/Network/Trainer/Optimizer/OptimizerAdagrad.ts");
/* harmony import */ var _OptimizerMomentum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OptimizerMomentum */ "./src/typescript/Network/Trainer/Optimizer/OptimizerMomentum.ts");
/* harmony import */ var _OptimizerRMSProp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OptimizerRMSProp */ "./src/typescript/Network/Trainer/Optimizer/OptimizerRMSProp.ts");







/***/ }),

/***/ "./src/typescript/Network/Trainer/index.ts":
/*!*************************************************!*\
  !*** ./src/typescript/Network/Trainer/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BatchTrainer: () => (/* reexport safe */ _BatchTrainer__WEBPACK_IMPORTED_MODULE_0__.BatchTrainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BatchTrainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BatchTrainer */ "./src/typescript/Network/Trainer/BatchTrainer.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  BatchTrainer: _BatchTrainer__WEBPACK_IMPORTED_MODULE_0__.BatchTrainer
});

/***/ }),

/***/ "./src/typescript/Network/index.ts":
/*!*****************************************!*\
  !*** ./src/typescript/Network/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Network: () => (/* reexport safe */ _Network__WEBPACK_IMPORTED_MODULE_0__.Network)
/* harmony export */ });
/* harmony import */ var _Network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Network */ "./src/typescript/Network/Network.ts");



/***/ }),

/***/ "./src/typescript/types.ts":
/*!*********************************!*\
  !*** ./src/typescript/types.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayerType: () => (/* binding */ LayerType)
/* harmony export */ });
var LayerType = /*#__PURE__*/function (LayerType) {
  LayerType["logistic"] = "logistic";
  LayerType["softmax"] = "softmax";
  LayerType["tanh"] = "tanh";
  LayerType["relu"] = "relu";
  return LayerType;
}({});

/***/ }),

/***/ "csvtojson":
/*!****************************!*\
  !*** external "csvtojson" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("csvtojson");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./src/typescript/main.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cost: () => (/* binding */ Cost),
/* harmony export */   Dataset: () => (/* binding */ Dataset),
/* harmony export */   DatasetBuilder: () => (/* binding */ DatasetBuilder),
/* harmony export */   DatasetBuilderSource: () => (/* binding */ DatasetBuilderSource),
/* harmony export */   DatasetModifier: () => (/* binding */ DatasetModifier),
/* harmony export */   Layer: () => (/* binding */ Layer),
/* harmony export */   Math: () => (/* reexport safe */ _Math__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   NetworkBuilder: () => (/* binding */ NetworkBuilder),
/* harmony export */   Optimizer: () => (/* binding */ Optimizer),
/* harmony export */   Trainer: () => (/* reexport safe */ _Network_Trainer__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var _Network_Builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Network/Builder */ "./src/typescript/Network/Builder/index.ts");
/* harmony import */ var _Network_Layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Network/Layer */ "./src/typescript/Network/Layer/index.ts");
/* harmony import */ var _Network_Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Network/Trainer/Optimizer */ "./src/typescript/Network/Trainer/Optimizer/index.ts");
/* harmony import */ var _Network_Trainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Network/Trainer */ "./src/typescript/Network/Trainer/index.ts");
/* harmony import */ var _Network_Trainer_Cost_MeanSquaredErrorCost__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Network/Trainer/Cost/MeanSquaredErrorCost */ "./src/typescript/Network/Trainer/Cost/MeanSquaredErrorCost.ts");
/* harmony import */ var _Network_Trainer_Cost_CrossEntropyCost__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Network/Trainer/Cost/CrossEntropyCost */ "./src/typescript/Network/Trainer/Cost/CrossEntropyCost.ts");
/* harmony import */ var _build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../build/Release/node_native_memory.node */ "./build/Release/node_native_memory.node");
/* harmony import */ var _build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Dataset */ "./src/typescript/Dataset/index.ts");
/* harmony import */ var _Dataset_Builder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Dataset/Builder */ "./src/typescript/Dataset/Builder/index.ts");
/* harmony import */ var _Dataset_Builder_Source__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Dataset/Builder/Source */ "./src/typescript/Dataset/Builder/Source/index.ts");
/* harmony import */ var _Dataset_Builder_VocabularySource__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Dataset/Builder/VocabularySource */ "./src/typescript/Dataset/Builder/VocabularySource/index.ts");
/* harmony import */ var _Dataset_Modifier__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Dataset/Modifier */ "./src/typescript/Dataset/Modifier/index.ts");







var NetworkBuilder = {
  NetworkBuilder1D: _Network_Builder__WEBPACK_IMPORTED_MODULE_1__.NetworkBuilder1D
};
var Layer = {
  SoftmaxLayer: _Network_Layer__WEBPACK_IMPORTED_MODULE_2__.SoftmaxLayer,
  LogisticLayer: _Network_Layer__WEBPACK_IMPORTED_MODULE_2__.LogisticLayer,
  ReluLayer: _Network_Layer__WEBPACK_IMPORTED_MODULE_2__.ReluLayer,
  TanhLayer: _Network_Layer__WEBPACK_IMPORTED_MODULE_2__.TanhLayer
};
var Optimizer = {
  OptimizerAdam: _Network_Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_3__.OptimizerAdam,
  OptimizerGradientDescent: _Network_Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_3__.OptimizerGradientDescent,
  OptimizerAdagrad: _Network_Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_3__.OptimizerAdagrad,
  OptimizerMomentum: _Network_Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_3__.OptimizerMomentum,
  OptimizerRMSProp: _Network_Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_3__.OptimizerRMSProp
};
var Cost = {
  MeanSquaredErrorCost: _Network_Trainer_Cost_MeanSquaredErrorCost__WEBPACK_IMPORTED_MODULE_5__.MeanSquaredErrorCost,
  CrossEntropyCost: _Network_Trainer_Cost_CrossEntropyCost__WEBPACK_IMPORTED_MODULE_6__.CrossEntropyCost
};


_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_7___default().setModulePath(path__WEBPACK_IMPORTED_MODULE_8___default().resolve(__dirname, "../"));





var DatasetBuilder = {
  DatasetBuilder: _Dataset_Builder__WEBPACK_IMPORTED_MODULE_10__.DatasetBuilder,
  DatasetVocabularyBuilder: _Dataset_Builder__WEBPACK_IMPORTED_MODULE_10__.DatasetVocabularyBuilder
};
var Dataset = {
  Dataset: _Dataset__WEBPACK_IMPORTED_MODULE_9__.Dataset
};
var DatasetModifier = {
  MinMaxScalingDatasetModifier: _Dataset_Modifier__WEBPACK_IMPORTED_MODULE_13__.MinMaxScalingDatasetModifier,
  MissingDataDatasetModifier: _Dataset_Modifier__WEBPACK_IMPORTED_MODULE_13__.MissingDataDatasetModifier,
  ShuffleDatasetModifier: _Dataset_Modifier__WEBPACK_IMPORTED_MODULE_13__.ShuffleDatasetModifier,
  SplitDatasetModifier: _Dataset_Modifier__WEBPACK_IMPORTED_MODULE_13__.SplitDatasetModifier
};
var DatasetBuilderSource = {
  DatasetBuilderSourceCSV: _Dataset_Builder_Source__WEBPACK_IMPORTED_MODULE_11__.SourceCSV,
  DatasetVocabularyBuilderSourceTextFile: _Dataset_Builder_VocabularySource__WEBPACK_IMPORTED_MODULE_12__.TextFile
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  NetworkBuilder: NetworkBuilder,
  Layer: Layer,
  Optimizer: Optimizer,
  Trainer: _Network_Trainer__WEBPACK_IMPORTED_MODULE_4__["default"],
  Cost: Cost,
  Math: _Math__WEBPACK_IMPORTED_MODULE_0__["default"],
  DatasetBuilder: DatasetBuilder,
  Dataset: Dataset,
  DatasetModifier: DatasetModifier,
  DatasetBuilderSource: DatasetBuilderSource
});
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=impulse-ml.dev.js.map