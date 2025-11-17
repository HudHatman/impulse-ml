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

/***/ "./src/typescript/Computation/index.ts":
/*!*********************************************!*\
  !*** ./src/typescript/Computation/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDevice: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.getDevice),
/* harmony export */   setDevice: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.setDevice)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/typescript/Computation/utils.ts");



/***/ }),

/***/ "./src/typescript/Computation/utils.ts":
/*!*********************************************!*\
  !*** ./src/typescript/Computation/utils.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDevice: () => (/* binding */ getDevice),
/* harmony export */   setDevice: () => (/* binding */ setDevice)
/* harmony export */ });
/* harmony import */ var _build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/Release/node_native_memory.node */ "./build/Release/node_native_memory.node");
/* harmony import */ var _build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_0__);

var currentDevice = new (_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_0___default().Device).CPU();
var setDevice = function setDevice(device) {
  currentDevice = device;
};
var getDevice = function getDevice() {
  return currentDevice;
};

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
    if (data) {
      this.data = data;
    }
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
      var data = this.data.block(0, offset, this.data.rows, batchSize);
      return Dataset.fromMatrix(data);
    }

    /*insertColumnAfter(column, size = 1) {
      const oldData = this.data.copy();
       this.exampleSize = this.data.rows + size;
      this.data.resize(this.data.rows + size, this.data.cols);
       for (let row = 0; row < this.data.rows; row += 1) {
        for (let col = 0; col < this.data.cols; col += 1) {
          if (row <= column) {
            this.data.data[row][col] = oldData.data[row][col];
          } else if (row > column && row <= column + size) {
            this.data.data[row][col] = undefined;
          } else if (row > column + size) {
            this.data.data[row][col] = oldData.data[row - size][col];
          }
        }
      }
    }*/
  }], [{
    key: "fromMatrix",
    value: function fromMatrix(m) {
      var instance = new Dataset();
      instance.exampleSize = m.rows;
      instance.numberOfExamples = m.cols;
      instance.data = m;
      return instance;
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Dataset/DatasetModifier/AbstractDatasetModifier.ts":
/*!***************************************************************************!*\
  !*** ./src/typescript/Dataset/DatasetModifier/AbstractDatasetModifier.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractDatasetModifier: () => (/* binding */ AbstractDatasetModifier)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AbstractDatasetModifier = /*#__PURE__*/_createClass(function AbstractDatasetModifier(dataset) {
  _classCallCheck(this, AbstractDatasetModifier);
  _defineProperty(this, "dataset", null);
  this.dataset = dataset;
});

/***/ }),

/***/ "./src/typescript/Dataset/DatasetModifier/Callback.ts":
/*!************************************************************!*\
  !*** ./src/typescript/Dataset/DatasetModifier/Callback.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CallbackDatasetModifier: () => (/* binding */ CallbackDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractDatasetModifier */ "./src/typescript/Dataset/DatasetModifier/AbstractDatasetModifier.ts");
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

var CallbackDatasetModifier = /*#__PURE__*/function (_AbstractDatasetModif) {
  function CallbackDatasetModifier() {
    _classCallCheck(this, CallbackDatasetModifier);
    return _callSuper(this, CallbackDatasetModifier, arguments);
  }
  _inherits(CallbackDatasetModifier, _AbstractDatasetModif);
  return _createClass(CallbackDatasetModifier);
}(_AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractDatasetModifier);

/***/ }),

/***/ "./src/typescript/Dataset/DatasetModifier/Category.ts":
/*!************************************************************!*\
  !*** ./src/typescript/Dataset/DatasetModifier/Category.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryDatasetModifier: () => (/* binding */ CategoryDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractDatasetModifier */ "./src/typescript/Dataset/DatasetModifier/AbstractDatasetModifier.ts");
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

var CategoryDatasetModifier = /*#__PURE__*/function (_AbstractDatasetModif) {
  function CategoryDatasetModifier(columns) {
    var _this;
    _classCallCheck(this, CategoryDatasetModifier);
    _this = _callSuper(this, CategoryDatasetModifier, [null]);
    _this.columns = columns;
    return _this;
  }
  _inherits(CategoryDatasetModifier, _AbstractDatasetModif);
  return _createClass(CategoryDatasetModifier, [{
    key: "apply",
    value: function apply(dataset) {
      var _this2 = this;
      var size = 0;
      var _dataset = dataset;
      this.columns.sort().forEach(function (column) {
        var _this2$applyForColumn = _this2.applyForColumn(_dataset, column + size),
          _this2$applyForColumn2 = _slicedToArray(_this2$applyForColumn, 2),
          dataset = _this2$applyForColumn2[0],
          _size = _this2$applyForColumn2[1];
        // @ts-ignore
        size += _size;
        _dataset = dataset;
      });
      return dataset;
    }
  }, {
    key: "applyForColumn",
    value: function applyForColumn(dataset, column) {
      var example = dataset.data.row(column);
      var values = [];
      for (var row = 0; row < example.rows; row += 1) {
        values.push(example.value(row, 0));
      }
      values = values.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
      dataset.insertColumnAfter(column, values.length - 1);
      for (var col = 0; col < dataset.data.cols; col += 1) {
        var oldValue = dataset.data.data[column][col];
        var index = 0;
        for (var _row = 0; _row < dataset.data.rows; _row += 1) {
          if (_row >= column && _row < column + values.length) {
            if (index === values.indexOf(oldValue)) {
              dataset.data.data[_row][col] = 1;
            } else {
              dataset.data.data[_row][col] = 0;
            }
            index += 1;
          }
        }
      }
      return [dataset, values.length - 1];
    }
  }]);
}(_AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractDatasetModifier);

/***/ }),

/***/ "./src/typescript/Dataset/DatasetModifier/MinMaxScaling.ts":
/*!*****************************************************************!*\
  !*** ./src/typescript/Dataset/DatasetModifier/MinMaxScaling.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinMaxScalingDatasetModifier: () => (/* binding */ MinMaxScalingDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractDatasetModifier */ "./src/typescript/Dataset/DatasetModifier/AbstractDatasetModifier.ts");
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

var MinMaxScalingDatasetModifier = /*#__PURE__*/function (_AbstractDatasetModif) {
  function MinMaxScalingDatasetModifier() {
    _classCallCheck(this, MinMaxScalingDatasetModifier);
    return _callSuper(this, MinMaxScalingDatasetModifier, arguments);
  }
  _inherits(MinMaxScalingDatasetModifier, _AbstractDatasetModif);
  return _createClass(MinMaxScalingDatasetModifier, [{
    key: "apply",
    value: function apply(dataset) {
      var newData = dataset.data.minMax();
      dataset.data = newData;
      return dataset;
    }
  }]);
}(_AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractDatasetModifier);

/***/ }),

/***/ "./src/typescript/Dataset/DatasetModifier/MissingData.ts":
/*!***************************************************************!*\
  !*** ./src/typescript/Dataset/DatasetModifier/MissingData.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MissingDataDatasetModifier: () => (/* binding */ MissingDataDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractDatasetModifier */ "./src/typescript/Dataset/DatasetModifier/AbstractDatasetModifier.ts");
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

var MissingDataDatasetModifier = /*#__PURE__*/function (_AbstractDatasetModif) {
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
  _inherits(MissingDataDatasetModifier, _AbstractDatasetModif);
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
}(_AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractDatasetModifier);

/***/ }),

/***/ "./src/typescript/Dataset/DatasetModifier/Shuffle.ts":
/*!***********************************************************!*\
  !*** ./src/typescript/Dataset/DatasetModifier/Shuffle.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShuffleDatasetModifier: () => (/* binding */ ShuffleDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractDatasetModifier */ "./src/typescript/Dataset/DatasetModifier/AbstractDatasetModifier.ts");
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

var ShuffleDatasetModifier = /*#__PURE__*/function (_AbstractDatasetModif) {
  function ShuffleDatasetModifier() {
    _classCallCheck(this, ShuffleDatasetModifier);
    return _callSuper(this, ShuffleDatasetModifier, arguments);
  }
  _inherits(ShuffleDatasetModifier, _AbstractDatasetModif);
  return _createClass(ShuffleDatasetModifier);
}(_AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractDatasetModifier);

/***/ }),

/***/ "./src/typescript/Dataset/DatasetModifier/Split.ts":
/*!*********************************************************!*\
  !*** ./src/typescript/Dataset/DatasetModifier/Split.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SplitDatasetModifier: () => (/* binding */ SplitDatasetModifier)
/* harmony export */ });
/* harmony import */ var _AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractDatasetModifier */ "./src/typescript/Dataset/DatasetModifier/AbstractDatasetModifier.ts");
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

var SplitDatasetModifier = /*#__PURE__*/function (_AbstractDatasetModif) {
  function SplitDatasetModifier() {
    _classCallCheck(this, SplitDatasetModifier);
    return _callSuper(this, SplitDatasetModifier, arguments);
  }
  _inherits(SplitDatasetModifier, _AbstractDatasetModif);
  return _createClass(SplitDatasetModifier);
}(_AbstractDatasetModifier__WEBPACK_IMPORTED_MODULE_0__.AbstractDatasetModifier);

/***/ }),

/***/ "./src/typescript/Dataset/DatasetModifier/index.ts":
/*!*********************************************************!*\
  !*** ./src/typescript/Dataset/DatasetModifier/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CallbackDatasetModifier: () => (/* reexport safe */ _Callback__WEBPACK_IMPORTED_MODULE_0__.CallbackDatasetModifier),
/* harmony export */   CategoryDatasetModifier: () => (/* reexport safe */ _Category__WEBPACK_IMPORTED_MODULE_4__.CategoryDatasetModifier),
/* harmony export */   MinMaxScalingDatasetModifier: () => (/* reexport safe */ _MinMaxScaling__WEBPACK_IMPORTED_MODULE_1__.MinMaxScalingDatasetModifier),
/* harmony export */   MissingDataDatasetModifier: () => (/* reexport safe */ _MissingData__WEBPACK_IMPORTED_MODULE_2__.MissingDataDatasetModifier),
/* harmony export */   ShuffleDatasetModifier: () => (/* reexport safe */ _Shuffle__WEBPACK_IMPORTED_MODULE_3__.ShuffleDatasetModifier),
/* harmony export */   SplitDatasetModifier: () => (/* reexport safe */ _Split__WEBPACK_IMPORTED_MODULE_5__.SplitDatasetModifier)
/* harmony export */ });
/* harmony import */ var _Callback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Callback */ "./src/typescript/Dataset/DatasetModifier/Callback.ts");
/* harmony import */ var _MinMaxScaling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MinMaxScaling */ "./src/typescript/Dataset/DatasetModifier/MinMaxScaling.ts");
/* harmony import */ var _MissingData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MissingData */ "./src/typescript/Dataset/DatasetModifier/MissingData.ts");
/* harmony import */ var _Shuffle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shuffle */ "./src/typescript/Dataset/DatasetModifier/Shuffle.ts");
/* harmony import */ var _Category__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Category */ "./src/typescript/Dataset/DatasetModifier/Category.ts");
/* harmony import */ var _Split__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Split */ "./src/typescript/Dataset/DatasetModifier/Split.ts");








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

/***/ "./src/typescript/DatasetBuilder/DatasetBuilder.ts":
/*!*********************************************************!*\
  !*** ./src/typescript/DatasetBuilder/DatasetBuilder.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetBuilder: () => (/* binding */ DatasetBuilder)
/* harmony export */ });
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Dataset */ "./src/typescript/Dataset/index.ts");
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
          var dataset = new _Dataset__WEBPACK_IMPORTED_MODULE_0__.Dataset(exampleSize, numberOfExamples, matrix);
          resolve(dataset);
        });
      });
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/DatasetBuilder/DatasetBuilderSource/AbstractDatasetBuilderSource.ts":
/*!********************************************************************************************!*\
  !*** ./src/typescript/DatasetBuilder/DatasetBuilderSource/AbstractDatasetBuilderSource.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractDatasetBuilderSource: () => (/* binding */ AbstractDatasetBuilderSource)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var AbstractDatasetBuilderSource = /*#__PURE__*/_createClass(function AbstractDatasetBuilderSource() {
  _classCallCheck(this, AbstractDatasetBuilderSource);
});

/***/ }),

/***/ "./src/typescript/DatasetBuilder/DatasetBuilderSource/DatasetBuilderSourceCSV.ts":
/*!***************************************************************************************!*\
  !*** ./src/typescript/DatasetBuilder/DatasetBuilderSource/DatasetBuilderSourceCSV.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetBuilderSourceCSV: () => (/* binding */ DatasetBuilderSourceCSV)
/* harmony export */ });
/* harmony import */ var _AbstractDatasetBuilderSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractDatasetBuilderSource */ "./src/typescript/DatasetBuilder/DatasetBuilderSource/AbstractDatasetBuilderSource.ts");
/* harmony import */ var _Math_CalcMatrix2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Math/CalcMatrix2D */ "./src/typescript/Math/CalcMatrix2D.ts");
/* harmony import */ var csvtojson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! csvtojson */ "csvtojson");
/* harmony import */ var csvtojson__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(csvtojson__WEBPACK_IMPORTED_MODULE_2__);
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




/*enum CSVState {
  UnquotedField,
  QuotedField,
  QuotedQuote,
}*/

var DatasetBuilderSourceCSV = /*#__PURE__*/function (_AbstractDatasetBuild) {
  function DatasetBuilderSourceCSV(data) {
    var _this;
    _classCallCheck(this, DatasetBuilderSourceCSV);
    _this = _callSuper(this, DatasetBuilderSourceCSV);
    _defineProperty(_this, "data", null);
    _defineProperty(_this, "matrixData", null);
    _this.data = data;
    return _this;
  }
  _inherits(DatasetBuilderSourceCSV, _AbstractDatasetBuild);
  return _createClass(DatasetBuilderSourceCSV, [{
    key: "parse",
    value: function parse() {
      var _this$data$,
        _this2 = this;
      var numberOfExamples = this.data.length;
      var exampleSize = (_this$data$ = this.data[0]) === null || _this$data$ === void 0 ? void 0 : _this$data$.length;
      if (typeof numberOfExamples !== "undefined" && typeof exampleSize !== "undefined") {
        var data = [];
        var _loop = function _loop() {
          var newData = [];
          _this2.data[i].forEach(function (value, index) {
            newData.push(Number(value));
          });
          data = [].concat(_toConsumableArray(data), newData);
        };
        for (var i = 0; i < numberOfExamples; i += 1) {
          _loop();
        }
        return new _Math_CalcMatrix2D__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D(numberOfExamples, exampleSize).allocate().set(new Float64Array(data));
      }
      return new _Math_CalcMatrix2D__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D(0, 0);
    }
    /*
    protected parseLine(line: string, exampleIndexCol: number): void {
      let state = CSVState.UnquotedField;
      const fields = [];
      let i = 0;
       for (let j = 0; j < line.length; j += 1) {
        const c = line.at(j);
        switch (state) {
          case CSVState.UnquotedField:
            switch (c) {
              case ",": // end of field
                fields.push("");
                i++;
                break;
              case '"':
                state = CSVState.QuotedField;
                break;
              default:
                fields[i] += c;
                break;
            }
            break;
          case CSVState.QuotedField:
            switch (c) {
              case '"':
                state = CSVState.QuotedQuote;
                break;
              default:
                fields[i] += c;
                break;
            }
            break;
          case CSVState.QuotedQuote:
            switch (c) {
              case ",": // , after closing quote
                fields.push("");
                i++;
                state = CSVState.UnquotedField;
                break;
              case '"': // "" -> "
                fields[i] += '"';
                state = CSVState.QuotedField;
                break;
              default:
                // end of quote
                state = CSVState.UnquotedField;
                break;
            }
            break;
        }
         fields.forEach((value, row) => {
          if (value.length === 0) {
            value = NaN;
          }
          value = parseFloat(value);
          if (!this.matrixData[row]) {
            this.matrixData[row] = [];
          }
          this.matrixData[row][exampleIndexCol] = value;
        });
      }
    }*/
  }], [{
    key: "fromLocalFile",
    value: function fromLocalFile(path) {
      /*return new Promise((resolve, reject) => {
        fs.readFile(path, (err, buffer) => {
          console.log("first");
          if (err) {
            console.log(err);
            reject();
          } else {
            const instance = new DatasetBuilderSourceCSV(buffer.toString("utf-8"));
            resolve(instance);
          }
        });
      });*/
      return new Promise(function (resolve) {
        csvtojson__WEBPACK_IMPORTED_MODULE_2__({
          noheader: true,
          output: "csv"
        }).fromFile(path).then(function (arr) {
          resolve(new DatasetBuilderSourceCSV(arr));
        });
      });
    }
  }]);
}(_AbstractDatasetBuilderSource__WEBPACK_IMPORTED_MODULE_0__.AbstractDatasetBuilderSource);

/***/ }),

/***/ "./src/typescript/DatasetBuilder/DatasetBuilderSource/index.ts":
/*!*********************************************************************!*\
  !*** ./src/typescript/DatasetBuilder/DatasetBuilderSource/index.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetBuilderSourceCSV: () => (/* reexport safe */ _DatasetBuilderSourceCSV__WEBPACK_IMPORTED_MODULE_0__.DatasetBuilderSourceCSV)
/* harmony export */ });
/* harmony import */ var _DatasetBuilderSourceCSV__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatasetBuilderSourceCSV */ "./src/typescript/DatasetBuilder/DatasetBuilderSource/DatasetBuilderSourceCSV.ts");



/***/ }),

/***/ "./src/typescript/DatasetBuilder/DatasetVocabularyBuilder.ts":
/*!*******************************************************************!*\
  !*** ./src/typescript/DatasetBuilder/DatasetVocabularyBuilder.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetVocabularyBuilder: () => (/* binding */ DatasetVocabularyBuilder)
/* harmony export */ });
/* harmony import */ var _Dataset_DatasetVocabulary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Dataset/DatasetVocabulary */ "./src/typescript/Dataset/DatasetVocabulary.ts");
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
          resolve(new _Dataset_DatasetVocabulary__WEBPACK_IMPORTED_MODULE_0__.DatasetVocabulary(str));
        });
      });
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/AbstractDatasetVocabularyBuilderSource.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/AbstractDatasetVocabularyBuilderSource.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractDatasetVocabularyBuilderSource: () => (/* binding */ AbstractDatasetVocabularyBuilderSource)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var AbstractDatasetVocabularyBuilderSource = /*#__PURE__*/_createClass(function AbstractDatasetVocabularyBuilderSource() {
  _classCallCheck(this, AbstractDatasetVocabularyBuilderSource);
});

/***/ }),

/***/ "./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/DatasetVocabularyBuilderSourceTextFile.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/DatasetVocabularyBuilderSourceTextFile.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetVocabularyBuilderSourceTextFile: () => (/* binding */ DatasetVocabularyBuilderSourceTextFile)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractDatasetVocabularyBuilderSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractDatasetVocabularyBuilderSource */ "./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/AbstractDatasetVocabularyBuilderSource.ts");
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


var DatasetVocabularyBuilderSourceTextFile = /*#__PURE__*/function (_AbstractDatasetVocab) {
  function DatasetVocabularyBuilderSourceTextFile(data) {
    var _this;
    _classCallCheck(this, DatasetVocabularyBuilderSourceTextFile);
    _this = _callSuper(this, DatasetVocabularyBuilderSourceTextFile);
    _defineProperty(_this, "data", "");
    _this.data = data;
    return _this;
  }
  _inherits(DatasetVocabularyBuilderSourceTextFile, _AbstractDatasetVocab);
  return _createClass(DatasetVocabularyBuilderSourceTextFile, [{
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
          resolve(new DatasetVocabularyBuilderSourceTextFile(buffer.toString("utf-8")));
        });
      });
    }
  }]);
}(_AbstractDatasetVocabularyBuilderSource__WEBPACK_IMPORTED_MODULE_1__.AbstractDatasetVocabularyBuilderSource);

/***/ }),

/***/ "./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/index.ts":
/*!*******************************************************************************!*\
  !*** ./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/index.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetVocabularyBuilderSourceTextFile: () => (/* reexport safe */ _DatasetVocabularyBuilderSourceTextFile__WEBPACK_IMPORTED_MODULE_0__.DatasetVocabularyBuilderSourceTextFile)
/* harmony export */ });
/* harmony import */ var _DatasetVocabularyBuilderSourceTextFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatasetVocabularyBuilderSourceTextFile */ "./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/DatasetVocabularyBuilderSourceTextFile.ts");



/***/ }),

/***/ "./src/typescript/DatasetBuilder/index.ts":
/*!************************************************!*\
  !*** ./src/typescript/DatasetBuilder/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatasetBuilder: () => (/* reexport safe */ _DatasetBuilder__WEBPACK_IMPORTED_MODULE_0__.DatasetBuilder),
/* harmony export */   DatasetVocabularyBuilder: () => (/* reexport safe */ _DatasetVocabularyBuilder__WEBPACK_IMPORTED_MODULE_1__.DatasetVocabularyBuilder)
/* harmony export */ });
/* harmony import */ var _DatasetBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatasetBuilder */ "./src/typescript/DatasetBuilder/DatasetBuilder.ts");
/* harmony import */ var _DatasetVocabularyBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DatasetVocabularyBuilder */ "./src/typescript/DatasetBuilder/DatasetVocabularyBuilder.ts");




/***/ }),

/***/ "./src/typescript/Layer/AbstractLayer.ts":
/*!***********************************************!*\
  !*** ./src/typescript/Layer/AbstractLayer.ts ***!
  \***********************************************/
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

/***/ "./src/typescript/Layer/AbstractLayer1D.ts":
/*!*************************************************!*\
  !*** ./src/typescript/Layer/AbstractLayer1D.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractLayer1D: () => (/* binding */ AbstractLayer1D)
/* harmony export */ });
/* harmony import */ var _AbstractLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractLayer */ "./src/typescript/Layer/AbstractLayer.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
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
      this.W.setRandom(this.previousLayer ? this.previousLayer.getHeight() : this.getHeight());
      this.b.resize(this.getHeight(), 1);
      this.b.setRandom(this.previousLayer ? this.previousLayer.getHeight() : this.getHeight());
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
      this.Z = this.W.dot(input).add(this.b.replicate(1, input.cols()));
      this.A = this.activation(this.Z);
      return this.A;
    }
  }, {
    key: "forwardAsync",
    value: function forwardAsync(input) {
      var _this2 = this;
      return new Promise(function (resolve) {
        Promise.all([_this2.W.calcAsync(function (calc) {
          return calc.dot(input);
        }), _this2.b.calcAsync(function (calc) {
          return calc.replicate(1, input.cols());
        })]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            dot = _ref2[0],
            replicate = _ref2[1];
          dot.calcAsync(function (calc) {
            return calc.add(replicate);
          }).then(function (added) {
            _this2.Z.copyFrom(added);
            _this2.activationAsync(_this2.Z).then(function (activation) {
              _this2.A.copyFrom(activation);
              dot.destroy();
              replicate.destroy();
              added.destroy();
              activation.destroy();
              resolve(_this2.A);
            });
          });
        });
      });
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

/***/ "./src/typescript/Layer/AbstractLayer3D.ts":
/*!*************************************************!*\
  !*** ./src/typescript/Layer/AbstractLayer3D.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractLayer3D: () => (/* binding */ AbstractLayer3D)
/* harmony export */ });
/* harmony import */ var _AbstractLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractLayer */ "./src/typescript/Layer/AbstractLayer.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var AbstractLayer3D = /*#__PURE__*/function (_AbstractLayer) {
  function AbstractLayer3D() {
    var _this;
    _classCallCheck(this, AbstractLayer3D);
    _this = _callSuper(this, AbstractLayer3D);
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
  _inherits(AbstractLayer3D, _AbstractLayer);
  return _createClass(AbstractLayer3D, [{
    key: "configure",
    value: function configure() {
      // do nothing
    }
  }, {
    key: "is1D",
    value: function is1D() {
      return false;
    }
  }, {
    key: "is3D",
    value: function is3D() {
      return true;
    }
  }, {
    key: "transition",
    value: function transition(previousLayer) {
      if (previousLayer.is3D()) {
        this.setSize([previousLayer.getOutputWidth(), previousLayer.getOutputHeight(), previousLayer.getOutputDepth()]);
      }
      _superPropGet(AbstractLayer3D, "transition", this, 3)([previousLayer]);
      return this;
    }
  }, {
    key: "setSize",
    value: function setSize(dimension) {
      this.setWidth(dimension[0]);
      this.setHeight(dimension[1]);
      this.setDepth(dimension[2]);
      return this;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return [this.getWidth(), this.getHeight(), this.getDepth()];
    }
  }, {
    key: "penalty",
    value: function penalty() {
      return this.W.pow(2).sum();
    }
  }]);
}(_AbstractLayer__WEBPACK_IMPORTED_MODULE_0__.AbstractLayer);


/***/ }),

/***/ "./src/typescript/Layer/Backpropagation/AbstractBackpropagation.ts":
/*!*************************************************************************!*\
  !*** ./src/typescript/Layer/Backpropagation/AbstractBackpropagation.ts ***!
  \*************************************************************************/
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

/***/ "./src/typescript/Layer/Backpropagation/Backpropagation1Dto1D.ts":
/*!***********************************************************************!*\
  !*** ./src/typescript/Layer/Backpropagation/Backpropagation1Dto1D.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Backpropagation1Dto1D: () => (/* binding */ Backpropagation1Dto1D)
/* harmony export */ });
/* harmony import */ var _AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractBackpropagation */ "./src/typescript/Layer/Backpropagation/AbstractBackpropagation.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Math */ "./src/typescript/Math/index.ts");
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


var Backpropagation1Dto1D = /*#__PURE__*/function (_AbstractBackPropagat) {
  function Backpropagation1Dto1D() {
    _classCallCheck(this, Backpropagation1Dto1D);
    return _callSuper(this, Backpropagation1Dto1D, arguments);
  }
  _inherits(Backpropagation1Dto1D, _AbstractBackPropagat);
  return _createClass(Backpropagation1Dto1D, [{
    key: "propagate",
    value: function propagate(input, numberOfExamples, regularization, layer, sigma) {
      var previousActivations = this.previousLayer !== null ? this.previousLayer.A : input;
      var delta = sigma.dot(previousActivations.transpose().conjugate());
      this.layer.gW = delta.divide(numberOfExamples).add(layer.W.multiply(regularization / numberOfExamples));
      this.layer.gb = sigma.rowwiseSum().divide(numberOfExamples);
      if (this.previousLayer !== null) {
        // @ts-ignore
        var result = this.layer.W.transpose().dot(sigma);
        if (result.rows() !== previousActivations.rows() || result.cols() !== previousActivations.cols()) {
          throw new Error("Dimension error 1. (".concat(result.rows(), ", ").concat(result.cols(), ") | (").concat(previousActivations.rows(), ", ").concat(previousActivations.cols(), ")"));
        }
        if (this.layer.gW.rows() !== this.layer.W.rows() || this.layer.gW.cols() !== this.layer.W.cols()) {
          throw new Error("Dimension error 2. (".concat(this.layer.gW.rows(), ", ").concat(this.layer.gW.cols(), ") | (").concat(this.layer.W.rows(), ", ").concat(this.layer.W.cols(), ")"));
        }
        if (this.layer.gb.rows() !== this.layer.b.rows() || this.layer.gb.cols() !== this.layer.b.cols()) {
          throw new Error("Dimension error 3. (".concat(this.layer.gb.rows(), ", ").concat(this.layer.gb.cols(), ") | (").concat(this.layer.b.rows(), ", ").concat(this.layer.b.cols(), ")"));
        }
        return result.multiply(this.layer.previousLayer.derivative(this.layer.previousLayer.A));
      }
      return new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    }
  }]);
}(_AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__.AbstractBackPropagation);

/***/ }),

/***/ "./src/typescript/Layer/Backpropagation/Backpropagation3Dto1D.ts":
/*!***********************************************************************!*\
  !*** ./src/typescript/Layer/Backpropagation/Backpropagation3Dto1D.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Backpropagation3Dto1D: () => (/* binding */ Backpropagation3Dto1D)
/* harmony export */ });
/* harmony import */ var _AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractBackpropagation */ "./src/typescript/Layer/Backpropagation/AbstractBackpropagation.ts");
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

var Backpropagation3Dto1D = /*#__PURE__*/function (_AbstractBackPropagat) {
  function Backpropagation3Dto1D() {
    _classCallCheck(this, Backpropagation3Dto1D);
    return _callSuper(this, Backpropagation3Dto1D, arguments);
  }
  _inherits(Backpropagation3Dto1D, _AbstractBackPropagat);
  return _createClass(Backpropagation3Dto1D, [{
    key: "propagate",
    value: function propagate(input, numberOfExamples, regularization, layer, sigma) {
      return sigma;
    }
  }]);
}(_AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__.AbstractBackPropagation);

/***/ }),

/***/ "./src/typescript/Layer/Backpropagation/BackpropagationFactory.ts":
/*!************************************************************************!*\
  !*** ./src/typescript/Layer/Backpropagation/BackpropagationFactory.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackpropagationFactory: () => (/* binding */ BackpropagationFactory)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types */ "./src/typescript/types.ts");
/* harmony import */ var _Backpropagation1Dto1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Backpropagation1Dto1D */ "./src/typescript/Layer/Backpropagation/Backpropagation1Dto1D.ts");
/* harmony import */ var _Backpropagation3Dto1D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Backpropagation3Dto1D */ "./src/typescript/Layer/Backpropagation/Backpropagation3Dto1D.ts");
/* harmony import */ var _BackpropagationToMaxPool__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BackpropagationToMaxPool */ "./src/typescript/Layer/Backpropagation/BackpropagationToMaxPool.ts");
/* harmony import */ var _BackpropagationToConv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BackpropagationToConv */ "./src/typescript/Layer/Backpropagation/BackpropagationToConv.ts");
/* harmony import */ var _BackpropagationToRecurrent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BackpropagationToRecurrent */ "./src/typescript/Layer/Backpropagation/BackpropagationToRecurrent.ts");
/* harmony import */ var _BackpropagationToLSTM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BackpropagationToLSTM */ "./src/typescript/Layer/Backpropagation/BackpropagationToLSTM.ts");
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
      // --- Reguły oparte na typie bieżącej warstwy ---
      if (layer.getType() === _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.rnnlayer) {
        return new _BackpropagationToRecurrent__WEBPACK_IMPORTED_MODULE_5__.BackpropagationToRecurrent(layer, previousLayer);
      }
      if (layer.getType() === _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.lstm) {
        return new _BackpropagationToLSTM__WEBPACK_IMPORTED_MODULE_6__.BackpropagationToLSTM(layer, previousLayer);
      }
      if (layer.getType() === _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.maxpool) {
        return new _BackpropagationToMaxPool__WEBPACK_IMPORTED_MODULE_3__.BackpropagationToMaxPool(layer, previousLayer);
      }
      if (layer.getType() === _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.conv) {
        return new _BackpropagationToConv__WEBPACK_IMPORTED_MODULE_4__.BackpropagationToConv(layer, previousLayer);
      }

      // --- Reguły oparte na typie poprzedniej warstwy (jeśli istnieją) ---
      if (previousLayer) {
        if (previousLayer.is1D() || previousLayer.getType() == _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.fullyconnected) {
          return new _Backpropagation1Dto1D__WEBPACK_IMPORTED_MODULE_1__.Backpropagation1Dto1D(layer, previousLayer);
        }
      }
      // --- Domyślne reguły ---
      else {
        if (layer.is1D()) {
          return new _Backpropagation1Dto1D__WEBPACK_IMPORTED_MODULE_1__.Backpropagation1Dto1D(layer, previousLayer);
        } else if (layer.is3D()) {
          // Domyślna obsługa dla warstw 3D, jeśli żadna inna reguła nie pasuje
          return new _Backpropagation3Dto1D__WEBPACK_IMPORTED_MODULE_2__.Backpropagation3Dto1D(layer, previousLayer);
        }
      }
      return null;
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Layer/Backpropagation/BackpropagationToConv.ts":
/*!***********************************************************************!*\
  !*** ./src/typescript/Layer/Backpropagation/BackpropagationToConv.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackpropagationToConv: () => (/* binding */ BackpropagationToConv)
/* harmony export */ });
/* harmony import */ var _AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractBackpropagation */ "./src/typescript/Layer/Backpropagation/AbstractBackpropagation.ts");
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

var BackpropagationToConv = /*#__PURE__*/function (_AbstractBackPropagat) {
  function BackpropagationToConv() {
    _classCallCheck(this, BackpropagationToConv);
    return _callSuper(this, BackpropagationToConv, arguments);
  }
  _inherits(BackpropagationToConv, _AbstractBackPropagat);
  return _createClass(BackpropagationToConv);
}(_AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__.AbstractBackPropagation);

/***/ }),

/***/ "./src/typescript/Layer/Backpropagation/BackpropagationToLSTM.ts":
/*!***********************************************************************!*\
  !*** ./src/typescript/Layer/Backpropagation/BackpropagationToLSTM.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackpropagationToLSTM: () => (/* binding */ BackpropagationToLSTM)
/* harmony export */ });
/* harmony import */ var _AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractBackpropagation */ "./src/typescript/Layer/Backpropagation/AbstractBackpropagation.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Math */ "./src/typescript/Math/index.ts");
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


var BackpropagationToLSTM = /*#__PURE__*/function (_AbstractBackPropagat) {
  function BackpropagationToLSTM() {
    _classCallCheck(this, BackpropagationToLSTM);
    return _callSuper(this, BackpropagationToLSTM, arguments);
  }
  _inherits(BackpropagationToLSTM, _AbstractBackPropagat);
  return _createClass(BackpropagationToLSTM, [{
    key: "propagate",
    value: function propagate(input, numberOfExamples, regularization, layer, sigma) {
      var lstmLayer = layer;
      var _lstmLayer$cache = lstmLayer.cache,
        A = _lstmLayer$cache.A,
        C = _lstmLayer$cache.C,
        X = _lstmLayer$cache.X,
        F = _lstmLayer$cache.F,
        I = _lstmLayer$cache.I,
        G = _lstmLayer$cache.G,
        O = _lstmLayer$cache.O;
      var sequenceLength = X.length;
      var hiddenSize = lstmLayer.getWidth();

      // Inicjalizacja gradientów propagowanych w czasie
      var daNext = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D(hiddenSize, 1).setZeros();
      var dcNext = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D(hiddenSize, 1).setZeros();

      // Pętla wsteczna po krokach czasowych (BPTT)
      for (var t = sequenceLength - 1; t >= 0; t--) {
        // Gradient dla stanu ukrytego a<t> = błąd z wyjścia + błąd z przyszłości
        var da = sigma.col(t).add(daNext);

        // --- Obliczanie gradientów dla każdej bramki ---

        // Bramka wyjściowa (Output Gate)
        var dot = da.multiply(C[t + 1].tanh());
        var dZo = dot.multiply(O[t]).multiply(O[t].minusOne().multiply(-1)); // d(sigmoid)

        // Stan komórki (Cell State)
        var dc = da.multiply(O[t]).multiply(lstmLayer.derivative(C[t + 1])).add(dcNext);

        // Bramka zapominania (Forget Gate)
        var dft = dc.multiply(C[t]);
        var dZf = dft.multiply(F[t]).multiply(F[t].minusOne().multiply(-1)); // d(sigmoid)

        // Bramka wejściowa (Input Gate)
        var dit = dc.multiply(G[t]);
        var dZi = dit.multiply(I[t]).multiply(I[t].minusOne().multiply(-1)); // d(sigmoid)

        // Bramka kandydująca (Candidate Gate)
        var dgt = dc.multiply(I[t]);
        var dZg = dgt.multiply(lstmLayer.derivative(G[t])); // d(tanh)

        // --- Połączenie gradientów bramek i obliczenie gradientów wag ---

        // Połącz gradienty bramek w jedną macierz [dZf, dZi, dZg, dZo]
        var dZ = _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D.vstack([dZf, dZi, dZg, dZo]);

        // Oblicz gradienty dla wag i biasów
        lstmLayer.dW = lstmLayer.dW.add(dZ.dot(X[t].transpose()));
        lstmLayer.dU = lstmLayer.dU.add(dZ.dot(A[t].transpose()));
        lstmLayer.db = lstmLayer.db.add(dZ);

        // --- Propagacja gradientów do poprzedniego kroku czasowego ---

        // da_next (dla t-1) = U^T * dZ
        daNext = lstmLayer.U.transpose().dot(dZ);
        // dc_next (dla t-1) = dc * f<t>
        dcNext = dc.multiply(F[t]);
      }

      // --- Finalizacja gradientów ---

      // 1. Obcinanie gradientów (Gradient Clipping) - kluczowe dla stabilności LSTM
      var clipValue = 5;
      for (var _i = 0, _arr = [lstmLayer.dW, lstmLayer.dU, lstmLayer.db]; _i < _arr.length; _i++) {
        var d = _arr[_i];
        d.clip(-clipValue, clipValue);
      }

      // 2. Dodanie regularyzacji do wag
      lstmLayer.dW = lstmLayer.dW.add(lstmLayer.W.multiply(regularization));
      lstmLayer.dU = lstmLayer.dU.add(lstmLayer.U.multiply(regularization));

      // Warstwa LSTM nie propaguje błędu dalej w standardowy sposób.
      return new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    }
  }]);
}(_AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__.AbstractBackPropagation);

/***/ }),

/***/ "./src/typescript/Layer/Backpropagation/BackpropagationToMaxPool.ts":
/*!**************************************************************************!*\
  !*** ./src/typescript/Layer/Backpropagation/BackpropagationToMaxPool.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackpropagationToMaxPool: () => (/* binding */ BackpropagationToMaxPool)
/* harmony export */ });
/* harmony import */ var _AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractBackpropagation */ "./src/typescript/Layer/Backpropagation/AbstractBackpropagation.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Math */ "./src/typescript/Math/index.ts");
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


/**
 * Implementuje wsteczną propagację dla warstwy Max-Pooling.
 * Działa jak "przełącznik", kierując gradienty tylko do tych neuronów,
 * które miały maksymalną wartość podczas przechodzenia w przód.
 */
var BackpropagationToMaxPool = /*#__PURE__*/function (_AbstractBackPropagat) {
  function BackpropagationToMaxPool() {
    _classCallCheck(this, BackpropagationToMaxPool);
    return _callSuper(this, BackpropagationToMaxPool, arguments);
  }
  _inherits(BackpropagationToMaxPool, _AbstractBackPropagat);
  return _createClass(BackpropagationToMaxPool, [{
    key: "propagate",
    value: function propagate(input, numberOfExamples, regularization, layer, sigma) {
      var maxPoolLayer = layer;
      // @ts-ignore
      var _maxPoolLayer$cache = maxPoolLayer.cache,
        switches = _maxPoolLayer$cache.switches,
        inputShape = _maxPoolLayer$cache.inputShape;
      var _inputShape = _slicedToArray(inputShape, 4),
        inputHeight = _inputShape[0],
        inputWidth = _inputShape[1],
        inputDepth = _inputShape[2],
        batchSize = _inputShape[3];

      // Stwórz macierz gradientu wejściowego wypełnioną zerami
      var dX = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D(inputHeight * inputWidth * inputDepth, batchSize).setZeros();
      var dXData = dX.get();
      var sigmaData = sigma.get();
      var switchIndex = 0;
      var outputSize = sigma.get().length;

      // Rozprowadź gradienty do odpowiednich miejsc
      for (var i = 0; i < outputSize; i++) {
        var maxIndex = switches[switchIndex++];
        dXData[maxIndex] += sigmaData[i];
      }
      dX.set(dXData);

      // Przekształć gradient do kształtu oczekiwanego przez poprzednią warstwę
      return dX.reshape(inputHeight * inputWidth * inputDepth, batchSize);
    }
  }]);
}(_AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__.AbstractBackPropagation);

/***/ }),

/***/ "./src/typescript/Layer/Backpropagation/BackpropagationToRecurrent.ts":
/*!****************************************************************************!*\
  !*** ./src/typescript/Layer/Backpropagation/BackpropagationToRecurrent.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackpropagationToRecurrent: () => (/* binding */ BackpropagationToRecurrent)
/* harmony export */ });
/* harmony import */ var _AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractBackpropagation */ "./src/typescript/Layer/Backpropagation/AbstractBackpropagation.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Math */ "./src/typescript/Math/index.ts");
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


var BackpropagationToRecurrent = /*#__PURE__*/function (_AbstractBackPropagat) {
  function BackpropagationToRecurrent() {
    _classCallCheck(this, BackpropagationToRecurrent);
    return _callSuper(this, BackpropagationToRecurrent, arguments);
  }
  _inherits(BackpropagationToRecurrent, _AbstractBackPropagat);
  return _createClass(BackpropagationToRecurrent, [{
    key: "propagate",
    value: function propagate(input, numberOfExamples, regularization, layer, sigma) {
      var rnnLayer = layer;
      var _rnnLayer$cache = rnnLayer.cache,
        A = _rnnLayer$cache.A,
        X = _rnnLayer$cache.X;
      var sequenceLength = X.length;

      // Inicjalizacja gradientu dla stanu ukrytego
      var daNext = new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D(rnnLayer.getWidth(), 1).setZeros();

      // Pętla wsteczna po krokach czasowych (Backpropagation Through Time)
      for (var t = sequenceLength - 1; t >= 0; t--) {
        var dyt = sigma.col(t); // Gradient kosztu względem wyjścia w kroku t

        // 1. Oblicz gradienty dla wag wyjściowych (Wya, by)
        rnnLayer.dWya = rnnLayer.dWya.add(dyt.dot(A[t + 1].transpose()));
        rnnLayer.dby = rnnLayer.dby.add(dyt);

        // 2. Oblicz gradient propagowany do stanu ukrytego
        // da = dC/da<t> = (dC/dy<t> * dy<t>/da<t>) + da_next
        var da = rnnLayer.Wya.transpose().dot(dyt).add(daNext);

        // 3. Oblicz gradient dla funkcji aktywacji tanh
        // dtanh = da<t> * (1 - a<t>^2)
        var dtanh = da.multiply(rnnLayer.derivative(A[t + 1]));

        // 4. Oblicz gradienty dla wag rekurencyjnych i wejściowych (Waa, Wax, ba)
        rnnLayer.dWax = rnnLayer.dWax.add(dtanh.dot(X[t].transpose()));
        rnnLayer.dWaa = rnnLayer.dWaa.add(dtanh.dot(A[t].transpose()));
        rnnLayer.dba = rnnLayer.dba.add(dtanh);

        // 5. Zaktualizuj gradient dla poprzedniego kroku czasowego
        // da_next (dla kroku t-1) = Waa^T * dtanh
        daNext = rnnLayer.Waa.transpose().dot(dtanh);
      }

      // Normalizacja gradientów i dodanie regularyzacji
      var clipValue = 5; // Zapobieganie eksplodującym gradientom
      for (var _i = 0, _arr = [rnnLayer.dWax, rnnLayer.dWaa, rnnLayer.dWya, rnnLayer.dba, rnnLayer.dby]; _i < _arr.length; _i++) {
        var d = _arr[_i];
        d.clip(-clipValue, clipValue);
      }

      // Zastosowanie normalizacji przez liczbę przykładów (w tym przypadku 1, bo batching nie jest zaimplementowany)
      // rnnLayer.dWax = rnnLayer.dWax.divide(numberOfExamples);
      // ... etc. dla reszty

      // Dodanie regularyzacji
      rnnLayer.dWax = rnnLayer.dWax.add(rnnLayer.Wax.multiply(regularization));
      rnnLayer.dWaa = rnnLayer.dWaa.add(rnnLayer.Waa.multiply(regularization));
      rnnLayer.dWya = rnnLayer.dWya.add(rnnLayer.Wya.multiply(regularization));

      // Warstwa rekurencyjna zazwyczaj nie propaguje błędu dalej w ten sposób.
      // Zwracamy pustą macierz, aby zatrzymać propagację.
      return new _Math__WEBPACK_IMPORTED_MODULE_1__.CalcMatrix2D();
    }
  }]);
}(_AbstractBackpropagation__WEBPACK_IMPORTED_MODULE_0__.AbstractBackPropagation);

/***/ }),

/***/ "./src/typescript/Layer/Conv.ts":
/*!**************************************!*\
  !*** ./src/typescript/Layer/Conv.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConvLayer: () => (/* binding */ ConvLayer)
/* harmony export */ });
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer3D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractLayer3D */ "./src/typescript/Layer/AbstractLayer3D.ts");
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




/**
 * Warstwa konwolucyjna (Convolutional Layer).
 * Przetwarza dane wejściowe 3D (wysokość, szerokość, głębokość/kanały)
 * za pomocą zestawu filtrów, aby wyodrębnić cechy takie jak krawędzie, tekstury itp.
 */
var ConvLayer = /*#__PURE__*/function (_AbstractLayer3D) {
  function ConvLayer() {
    var _this;
    _classCallCheck(this, ConvLayer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ConvLayer, [].concat(args));
    _defineProperty(_this, "numFilters", 8);
    _defineProperty(_this, "filterSize", 3);
    _defineProperty(_this, "padding", 1);
    _defineProperty(_this, "stride", 1);
    // Pamięć podręczna dla wstecznej propagacji
    _defineProperty(_this, "cache", {});
    return _this;
  }
  _inherits(ConvLayer, _AbstractLayer3D);
  return _createClass(ConvLayer, [{
    key: "penalty",
    value: function penalty() {
      return this.W.pow(2).sum().get()[0];
    }
  }, {
    key: "configure",
    value: function configure() {
      var inputDepth = this.getDepth();
      var filterWeightCount = this.filterSize * this.filterSize * inputDepth;
      this.W = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(this.numFilters, filterWeightCount).setRandom(filterWeightCount);
      this.b = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(this.numFilters, 1).setZeros();
      this.gW = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(this.numFilters, filterWeightCount).setZeros();
      this.gb = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(this.numFilters, 1).setZeros();
    }
  }, {
    key: "getOutputHeight",
    value: function getOutputHeight() {
      return Math.floor((this.getHeight() - this.filterSize + 2 * this.padding) / this.stride + 1);
    }
  }, {
    key: "getOutputWidth",
    value: function getOutputWidth() {
      return Math.floor((this.getWidth() - this.filterSize + 2 * this.padding) / this.stride + 1);
    }
  }, {
    key: "getOutputDepth",
    value: function getOutputDepth() {
      return this.numFilters;
    }
  }, {
    key: "im2col",
    value: function im2col(input, batchSize) {
      var _this2 = this;
      var _ref = [this.getHeight(), this.getWidth(), this.getDepth()],
        inputHeight = _ref[0],
        inputWidth = _ref[1],
        inputDepth = _ref[2];
      var outputHeight = this.getOutputHeight();
      var outputWidth = this.getOutputWidth();
      var filterArea = this.filterSize * this.filterSize;
      var result = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(filterArea * inputDepth, outputHeight * outputWidth * batchSize).allocate().calcSync(function (calc) {
        return calc.img2col(_this2.filterSize, _this2.stride, _this2.padding);
      });
      return result;
    }

    /**
     * Przetwarza partię danych wejściowych.
     * @param input Macierz o wymiarach (wysokość * szerokość * głębokość, liczba_przykładów)
     */
  }, {
    key: "forward",
    value: function forward(input) {
      var batchSize = input.cols();
      var outputHeight = this.getOutputHeight();
      var outputWidth = this.getOutputWidth();

      // 1. Przekształć wejście za pomocą im2col
      var inputCols = this.im2col(input, batchSize);
      this.cache = {
        inputCols: inputCols,
        inputShape: [this.getHeight(), this.getWidth(), this.getDepth()]
      };

      // 2. Wykonaj operację konwolucji jako jedno mnożenie macierzy
      var result = this.W.dot(inputCols).add(this.b);

      // 3. Przekształć wynik do odpowiedniego formatu wyjściowego
      var reshapedResult = result.reshape(this.numFilters, outputHeight * outputWidth * batchSize);

      // 4. Zastosuj funkcję aktywacji
      this.Z = reshapedResult;
      this.A = this.activation(this.Z);
      return this.A;
    }
  }, {
    key: "activation",
    value: function activation(m) {
      return m.relu(); // ReLU jest standardem dla warstw konwolucyjnych
    }
  }, {
    key: "derivative",
    value: function derivative(delta) {
      return delta.reluDerivative(this.A);
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_1__.LayerType.conv;
    }

    // --- Settery dla parametrów warstwy ---
  }, {
    key: "setFilterSize",
    value: function setFilterSize(size) {
      this.filterSize = size;
      return this;
    }
  }, {
    key: "setNumFilters",
    value: function setNumFilters(num) {
      this.numFilters = num;
      return this;
    }
  }, {
    key: "setPadding",
    value: function setPadding(pad) {
      this.padding = pad;
      return this;
    }
  }, {
    key: "setStride",
    value: function setStride(stride) {
      this.stride = stride;
      return this;
    }
  }]);
}(_AbstractLayer3D__WEBPACK_IMPORTED_MODULE_2__.AbstractLayer3D);

/***/ }),

/***/ "./src/typescript/Layer/FullyConnected.ts":
/*!************************************************!*\
  !*** ./src/typescript/Layer/FullyConnected.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FullyConnectedLayer: () => (/* binding */ FullyConnectedLayer)
/* harmony export */ });
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Layer/AbstractLayer1D.ts");
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




/**
 * Warstwa w pełni połączona (Fully Connected / Dense).
 * Każdy neuron w tej warstwie jest połączony z każdym neuronem w warstwie poprzedniej.
 * Jest to podstawowy budulec większości sieci neuronowych.
 */
var FullyConnectedLayer = /*#__PURE__*/function (_AbstractLayer1D) {
  function FullyConnectedLayer() {
    var _this;
    _classCallCheck(this, FullyConnectedLayer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, FullyConnectedLayer, [].concat(args));
    // Pamięć podręczna dla wstecznej propagacji
    _defineProperty(_this, "cache", {});
    return _this;
  }
  _inherits(FullyConnectedLayer, _AbstractLayer1D);
  return _createClass(FullyConnectedLayer, [{
    key: "penalty",
    value: function penalty() {
      return this.W.pow(2).sum().get()[0];
    }

    /**
     * Konfiguruje wagi i biasy warstwy.
     * @param inputSize Rozmiar wektora wejściowego.
     * @param outputSize Liczba neuronów w tej warstwie.
     */
  }, {
    key: "configure",
    value: function configure(inputSize, outputSize) {
      this.width = outputSize; // W kontekście 1D, "width" to liczba neuronów
      this.height = inputSize;

      // Inicjalizacja wag (metoda Xavier)
      this.W = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputSize, inputSize).setRandom(inputSize);
      // Inicjalizacja biasów
      this.b = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputSize, 1).setZeros();

      // Inicjalizacja gradientów
      this.gW = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputSize, inputSize).setZeros();
      this.gb = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputSize, 1).setZeros();
    }

    /**
     * Automatycznie konfiguruje rozmiar wejściowy na podstawie poprzedniej warstwy.
     * Obsługuje "spłaszczanie" (flattening) danych z warstw 3D.
     */
  }, {
    key: "transition",
    value: function transition(previousLayer) {
      this.previousLayer = previousLayer;
      var inputSize;
      if (previousLayer.is3D()) {
        // Spłaszczanie wyjścia z warstwy 3D (Conv, MaxPool)
        inputSize = previousLayer.getOutputWidth() * previousLayer.getOutputHeight() * previousLayer.getOutputDepth();
      } else {
        // Standardowe połączenie z warstwą 1D
        inputSize = previousLayer.getOutputWidth();
      }

      // `this.width` jest już ustawione w konstruktorze lub przez `setSize`
      this.configure(inputSize, this.getWidth());
      return this;
    }

    /**
     * Przetwarza partię danych wejściowych.
     * @param input Macierz o wymiarach (input_size, batch_size)
     */
  }, {
    key: "forward",
    value: function forward(input) {
      var batchSize = input.cols();
      var currentInput = input;

      // Jeśli poprzednia warstwa była 3D, spłaszcz wejście
      if (this.previousLayer && this.previousLayer.is3D()) {
        var inputSize = this.W.cols();
        currentInput = input.reshape(inputSize, batchSize);
      }
      this.cache = {
        input: currentInput
      };

      // Y = W * X + b
      this.Z = this.W.dot(currentInput).add(this.b);
      // W tej warstwie nie ma funkcji aktywacji.
      // Aktywację (np. ReLU, Softmax) należy dodać jako osobną warstwę.
      this.A = this.Z;
      return this.A;
    }

    // Ta warstwa nie ma własnej funkcji aktywacji.
  }, {
    key: "activation",
    value: function activation(m) {
      return m;
    }
  }, {
    key: "derivative",
    value: function derivative(delta) {
      return delta;
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_1__.LayerType.fullyconnected;
    }
  }, {
    key: "setSize",
    value: function setSize(value) {
      this.width = value;
      return this;
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_2__.AbstractLayer1D);

/***/ }),

/***/ "./src/typescript/Layer/LSTM.ts":
/*!**************************************!*\
  !*** ./src/typescript/Layer/LSTM.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LSTMLayer: () => (/* binding */ LSTMLayer)
/* harmony export */ });
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractLayer */ "./src/typescript/Layer/AbstractLayer.ts");
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




/**
 * Warstwa Long Short-Term Memory (LSTM).
 * Jest to zaawansowany typ warstwy rekurencyjnej, który potrafi uczyć się
 * długoterminowych zależności dzięki mechanizmowi bramek.
 *
 * Wymiary:
 * - `height` (inputSize): Rozmiar wektora wejściowego w jednym kroku czasowym.
 * - `width` (hiddenSize): Rozmiar wektora stanu ukrytego i stanu komórki.
 */
var LSTMLayer = /*#__PURE__*/function (_AbstractLayer) {
  function LSTMLayer() {
    var _this;
    _classCallCheck(this, LSTMLayer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, LSTMLayer, [].concat(args));
    // --- Wagi i Biary (zoptymalizowana, połączona struktura) ---
    // Połączone wagi dla wejść [Wf, Wi, Wg, Wo]
    // Połączone wagi dla stanu rekurencyjnego [Uf, Ui, Ug, Uo]
    // Połączone biasy [bf, bi, bg, bo]
    // --- Gradienty ---
    // --- Pamięć podręczna dla BPTT ---
    _defineProperty(_this, "cache", {
      A: [],
      C: [],
      X: [],
      F: [],
      I: [],
      G: [],
      O: []
    });
    return _this;
  }
  _inherits(LSTMLayer, _AbstractLayer);
  return _createClass(LSTMLayer, [{
    key: "penalty",
    value: function penalty() {
      var wPenalty = this.W.pow(2).sum().get()[0];
      var uPenalty = this.U.pow(2).sum().get()[0];
      return wPenalty + uPenalty;
    }
  }, {
    key: "configure",
    value: function configure() {
      var inputSize = this.getHeight();
      var hiddenSize = this.getWidth();

      // Inicjalizacja połączonych macierzy wag (metoda Xavier)
      // Każda macierz ma wysokość 4 * hiddenSize, ponieważ zawiera wagi dla 4 bramek.
      this.W = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize * 4, inputSize).setRandom(inputSize);
      this.U = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize * 4, hiddenSize).setRandom(hiddenSize);

      // Inicjalizacja połączonego wektora biasów
      this.b = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize * 4, 1).setZeros();

      // Inicjalizacja gradientów
      this.dW = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize * 4, inputSize).setZeros();
      this.dU = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize * 4, hiddenSize).setZeros();
      this.db = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize * 4, 1).setZeros();
    }

    /**
     * Przetwarza całą sekwencję wejściową.
     * @param input Macierz o wymiarach (input_size, sequence_length)
     */
  }, {
    key: "forward",
    value: function forward(input) {
      var sequenceLength = input.cols();
      var hiddenSize = this.getWidth();

      // Inicjalizacja pamięci podręcznej i stanów początkowych
      this.cache = {
        A: [],
        C: [],
        X: [],
        F: [],
        I: [],
        G: [],
        O: []
      };
      var aPrev = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, 1).setZeros();
      var cPrev = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, 1).setZeros();
      this.cache.A.push(aPrev.clone());
      this.cache.C.push(cPrev.clone());
      var outputs = [];

      // Pętla po krokach czasowych
      for (var t = 0; t < sequenceLength; t++) {
        var xt = input.col(t);
        this.cache.X.push(xt.clone());

        // 1. Oblicz aktywacje dla wszystkich bramek naraz (zoptymalizowane)
        // Z = [Zf, Zi, Zg, Zo]^T
        var Z = this.W.dot(xt).add(this.U.dot(aPrev)).add(this.b);

        // 2. Podziel Z na poszczególne bramki i zastosuj funkcje aktywacji
        var Zf = Z.slice(0, hiddenSize);
        var Zi = Z.slice(hiddenSize, hiddenSize * 2);
        var Zg = Z.slice(hiddenSize * 2, hiddenSize * 3);
        var Zo = Z.slice(hiddenSize * 3, hiddenSize * 4);
        var ft = Zf.sigmoid(); // Bramka zapominania
        var it = Zi.sigmoid(); // Bramka wejściowa
        var gt = Zg.tanh(); // Bramka kandydująca
        var ot = Zo.sigmoid(); // Bramka wyjściowa

        // 3. Oblicz nowy stan komórki i nowy stan ukryty
        // c<t> = f<t> * c<t-1> + i<t> * g<t>
        var cNext = ft.multiply(cPrev).add(it.multiply(gt));
        // a<t> = o<t> * tanh(c<t>)
        var aNext = ot.multiply(cNext.tanh());

        // 4. Zapisz wyniki w cache i zaktualizuj stany
        outputs.push(aNext);
        this.cache.A.push(aNext);
        this.cache.C.push(cNext);
        this.cache.F.push(ft);
        this.cache.I.push(it);
        this.cache.G.push(gt);
        this.cache.O.push(ot);
        aPrev = aNext;
        cPrev = cNext;
      }

      // Połącz wszystkie wyjścia (stany ukryte) w jedną macierz
      return _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D.hstack(outputs);
    }

    // --- Implementacja metod abstrakcyjnych ---
  }, {
    key: "activation",
    value: function activation(m) {
      // Ta metoda nie jest bezpośrednio używana w pętli forward,
      // ale jest wymagana przez interfejs.
      return m.tanh();
    }
  }, {
    key: "derivative",
    value: function derivative(a) {
      // Pochodna tanh(x) to 1 - tanh(x)^2
      return a.pow(2).minusOne();
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_1__.LayerType.lstm;
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
      this.previousLayer = previousLayer;
      this.setHeight(previousLayer.getOutputHeight());
      this.setDepth(this.getOutputHeight());
      return this;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return [this.getWidth(), this.getHeight()];
    }
  }, {
    key: "getOutputWidth",
    value: function getOutputWidth() {
      return this.getWidth();
    }
  }, {
    key: "getOutputHeight",
    value: function getOutputHeight() {
      return this.getWidth(); // W LSTM rozmiar wyjścia jest równy rozmiarowi stanu ukrytego
    }
  }, {
    key: "getOutputDepth",
    value: function getOutputDepth() {
      return 1;
    }
  }]);
}(_AbstractLayer__WEBPACK_IMPORTED_MODULE_2__.AbstractLayer);

/***/ }),

/***/ "./src/typescript/Layer/Logistic.ts":
/*!******************************************!*\
  !*** ./src/typescript/Layer/Logistic.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogisticLayer: () => (/* binding */ LogisticLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Layer/AbstractLayer1D.ts");
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
    key: "activationAsync",
    value: function activationAsync(m) {
      return new Promise(function (resolve) {
        m.calcAsync(function (calc) {
          calc.logisticForwardPropagation().then(function (a) {
            resolve(a);
          });
        });
      });
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

/***/ "./src/typescript/Layer/MaxPool.ts":
/*!*****************************************!*\
  !*** ./src/typescript/Layer/MaxPool.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MaxPoolLayer: () => (/* binding */ MaxPoolLayer)
/* harmony export */ });
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer3D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractLayer3D */ "./src/typescript/Layer/AbstractLayer3D.ts");
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




/**
 * Warstwa Max-Pooling.
 * Redukuje wymiarowość przestrzenną (wysokość i szerokość) map cech,
 * zachowując najważniejsze informacje (maksymalne wartości) z każdego regionu.
 */
var MaxPoolLayer = /*#__PURE__*/function (_AbstractLayer3D) {
  function MaxPoolLayer() {
    var _this;
    _classCallCheck(this, MaxPoolLayer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, MaxPoolLayer, [].concat(args));
    _defineProperty(_this, "filterSize", 2);
    _defineProperty(_this, "stride", 2);
    // Pamięć podręczna dla wstecznej propagacji, przechowująca indeksy maksymalnych wartości.
    _defineProperty(_this, "cache", {});
    return _this;
  }
  _inherits(MaxPoolLayer, _AbstractLayer3D);
  return _createClass(MaxPoolLayer, [{
    key: "penalty",
    value:
    // Warstwa Max-Pooling nie ma wag do uczenia się.
    function penalty() {
      return 0;
    }
  }, {
    key: "configure",
    value: function configure() {}
  }, {
    key: "activation",
    value: function activation(m) {
      return m;
    }
  }, {
    key: "derivative",
    value: function derivative(delta) {
      return delta;
    }
  }, {
    key: "getOutputHeight",
    value: function getOutputHeight() {
      return Math.floor((this.getHeight() - this.filterSize) / this.stride + 1);
    }
  }, {
    key: "getOutputWidth",
    value: function getOutputWidth() {
      return Math.floor((this.getWidth() - this.filterSize) / this.stride + 1);
    }
  }, {
    key: "getOutputDepth",
    value: function getOutputDepth() {
      return this.getDepth(); // Głębokość pozostaje bez zmian
    }

    /**
     * Przetwarza partię danych wejściowych.
     * @param input Macierz o wymiarach (wysokość * szerokość * głębokość, liczba_przykładów)
     */
  }, {
    key: "forward",
    value: function forward(input) {
      var batchSize = input.cols();
      var _ref = [this.getHeight(), this.getWidth(), this.getDepth()],
        inputHeight = _ref[0],
        inputWidth = _ref[1],
        inputDepth = _ref[2];
      var outputHeight = this.getOutputHeight();
      var outputWidth = this.getOutputWidth();
      var output = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputHeight * outputWidth * inputDepth, batchSize).allocate().setZeros();
      var switches = []; // Przechowuje indeksy maksymalnych wartości

      var inputData = input.get();
      var outputData = output.get();
      for (var n = 0; n < batchSize; n++) {
        var batchOffset = n * inputHeight * inputWidth * inputDepth;
        for (var c = 0; c < inputDepth; c++) {
          var channelOffset = c * inputHeight * inputWidth;
          for (var y = 0; y < outputHeight; y++) {
            for (var x = 0; x < outputWidth; x++) {
              var startY = y * this.stride;
              var startX = x * this.stride;
              var maxVal = -Infinity;
              var maxIndex = -1;

              // Znajdź maksymalną wartość w oknie
              for (var fy = 0; fy < this.filterSize; fy++) {
                for (var fx = 0; fx < this.filterSize; fx++) {
                  var imgY = startY + fy;
                  var imgX = startX + fx;
                  var currentIndex = batchOffset + channelOffset + imgY * inputWidth + imgX;
                  var currentVal = inputData[currentIndex];
                  if (currentVal > maxVal) {
                    maxVal = currentVal;
                    maxIndex = currentIndex;
                  }
                }
              }

              // Zapisz maksymalną wartość i jej indeks
              var outputIndex = n * (outputHeight * outputWidth * inputDepth) + c * (outputHeight * outputWidth) + y * outputWidth + x;
              outputData[outputIndex] = maxVal;
              switches.push(maxIndex);
            }
          }
        }
      }
      output.set(outputData);
      this.cache = {
        switches: switches,
        inputShape: [inputHeight, inputWidth, inputDepth, batchSize]
      };
      this.A = output;
      return this.A;
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_1__.LayerType.maxpool;
    }

    // --- Settery dla parametrów warstwy ---
  }, {
    key: "setFilterSize",
    value: function setFilterSize(size) {
      this.filterSize = size;
      return this;
    }
  }, {
    key: "getFilterSize",
    value: function getFilterSize() {
      return this.filterSize;
    }
  }, {
    key: "setStride",
    value: function setStride(stride) {
      this.stride = stride;
      return this;
    }
  }, {
    key: "getStride",
    value: function getStride() {
      return this.stride;
    }
  }, {
    key: "getPadding",
    value: function getPadding() {
      return 0;
    } // Max-pooling zazwyczaj nie używa paddingu
  }]);
}(_AbstractLayer3D__WEBPACK_IMPORTED_MODULE_2__.AbstractLayer3D);

/***/ }),

/***/ "./src/typescript/Layer/Purelin.ts":
/*!*****************************************!*\
  !*** ./src/typescript/Layer/Purelin.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PurelinLayer: () => (/* binding */ PurelinLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Layer/AbstractLayer1D.ts");
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


var PurelinLayer = /*#__PURE__*/function (_AbstractLayer1D) {
  function PurelinLayer() {
    _classCallCheck(this, PurelinLayer);
    return _callSuper(this, PurelinLayer, arguments);
  }
  _inherits(PurelinLayer, _AbstractLayer1D);
  return _createClass(PurelinLayer, [{
    key: "activation",
    value: function activation(m) {
      return m;
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.purelin;
    }
  }, {
    key: "derivative",
    value: function derivative(delta) {
      return delta.setOnes();
    }
  }, {
    key: "activationAsync",
    value: function activationAsync(value) {
      return Promise.resolve(undefined);
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__.AbstractLayer1D);


/***/ }),

/***/ "./src/typescript/Layer/Recurrent.ts":
/*!*******************************************!*\
  !*** ./src/typescript/Layer/Recurrent.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecurrentLayer: () => (/* binding */ RecurrentLayer)
/* harmony export */ });
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractLayer */ "./src/typescript/Layer/AbstractLayer.ts");
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




/**
 * Podstawowa warstwa rekurencyjna (RNN).
 * Ta warstwa przetwarza sekwencje danych, utrzymując wewnętrzny stan.
 *
 * Wymiary:
 * - `height` (inputSize): Rozmiar wektora wejściowego w jednym kroku czasowym.
 * - `width` (hiddenSize): Rozmiar wektora stanu ukrytego.
 * - `depth` (outputSize): Rozmiar wektora wyjściowego w jednym kroku czasowym.
 */
var RecurrentLayer = /*#__PURE__*/function (_AbstractLayer) {
  function RecurrentLayer() {
    var _this;
    _classCallCheck(this, RecurrentLayer);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, RecurrentLayer, [].concat(args));
    // --- Pamięć podręczna dla Backpropagation Through Time (BPTT) ---
    _defineProperty(_this, "cache", {
      A: [],
      X: []
    });
    return _this;
  }
  _inherits(RecurrentLayer, _AbstractLayer);
  return _createClass(RecurrentLayer, [{
    key: "activationAsync",
    value: function activationAsync(value) {
      throw new Error("Method not implemented.");
    }
    // --- Wagi i Biary ---
    // Wagi: Wejście -> Stan ukryty
    // Wagi: Stan ukryty -> Stan ukryty
    // Wagi: Stan ukryty -> Wyjście

    // Bias: Stan ukryty
    // Bias: Wyjście

    // --- Gradienty ---
  }, {
    key: "penalty",
    value: function penalty() {
      // Prosta regularyzacja L2 dla wszystkich wag
      var waaPenalty = this.Waa.pow(2).sum().get()[0];
      var waxPenalty = this.Wax.pow(2).sum().get()[0];
      var wyaPenalty = this.Wya.pow(2).sum().get()[0];
      return waaPenalty + waxPenalty + wyaPenalty;
    }
  }, {
    key: "configure",
    value: function configure() {
      var inputSize = this.getHeight();
      var hiddenSize = this.getWidth();
      var outputSize = this.getDepth();

      // Inicjalizacja wag (metoda Xavier)
      this.Wax = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, inputSize).setRandom(inputSize);
      this.Waa = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, hiddenSize).setRandom(hiddenSize);
      this.Wya = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputSize, hiddenSize).setRandom(hiddenSize);

      // Inicjalizacja biasów
      this.ba = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, 1).setZeros();
      this.by = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputSize, 1).setZeros();

      // Inicjalizacja gradientów
      this.dWax = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, inputSize).setZeros();
      this.dWaa = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, hiddenSize).setZeros();
      this.dWya = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputSize, hiddenSize).setZeros();
      this.dba = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, 1).setZeros();
      this.dby = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(outputSize, 1).setZeros();
    }

    /**
     * Przetwarza całą sekwencję wejściową.
     * @param input Macierz o wymiarach (input_size, sequence_length)
     */
  }, {
    key: "forward",
    value: function forward(input) {
      var sequenceLength = input.cols();
      var hiddenSize = this.getWidth();

      // Inicjalizacja pamięci podręcznej i stanu początkowego
      this.cache = {
        A: [],
        X: []
      };
      var aPrev = new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(hiddenSize, 1).setZeros();
      this.cache.A.push(aPrev.clone());
      var outputs = [];

      // Pętla po krokach czasowych
      for (var t = 0; t < sequenceLength; t++) {
        var xt = input.col(t);
        this.cache.X.push(xt.clone());

        // Obliczenie stanu ukrytego: a<t> = tanh(Waa * a<t-1> + Wax * x<t> + ba)
        var aNext = this.Waa.dot(aPrev).add(this.Wax.dot(xt)).add(this.ba).tanh();

        // Obliczenie wyjścia: y<t> = Wya * a<t> + by (bez aktywacji)
        var yt = this.Wya.dot(aNext).add(this.by);
        outputs.push(yt);
        this.cache.A.push(aNext);
        aPrev = aNext;
      }

      // Połącz wszystkie wyjścia w jedną macierz
      return _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D.hstack(outputs);
    }

    // --- Implementacja metod abstrakcyjnych ---
  }, {
    key: "activation",
    value: function activation(m) {
      return m.tanh();
    }
  }, {
    key: "derivative",
    value: function derivative(a) {
      // Pochodna tanh(x) to 1 - tanh(x)^2
      return a.pow(2).minusOne().multiply(-1);
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_1__.LayerType.rnnlayer;
    }
  }, {
    key: "is1D",
    value: function is1D() {
      return true; // Traktujemy sekwencję jako "płaską" warstwę
    }
  }, {
    key: "is3D",
    value: function is3D() {
      return false;
    }
  }, {
    key: "transition",
    value: function transition(previousLayer) {
      this.previousLayer = previousLayer;
      this.setHeight(previousLayer.getOutputHeight());
      this.setDepth(this.getOutputHeight()); // Domyślnie output_size = hidden_size
      return this;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return [this.getWidth(), this.getHeight(), this.getDepth()];
    }
  }, {
    key: "getOutputWidth",
    value: function getOutputWidth() {
      return this.getWidth();
    }
  }, {
    key: "getOutputHeight",
    value: function getOutputHeight() {
      return this.getDepth();
    }
  }, {
    key: "getOutputDepth",
    value: function getOutputDepth() {
      return 1;
    }
  }]);
}(_AbstractLayer__WEBPACK_IMPORTED_MODULE_2__.AbstractLayer);

/***/ }),

/***/ "./src/typescript/Layer/Relu.ts":
/*!**************************************!*\
  !*** ./src/typescript/Layer/Relu.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReluLayer: () => (/* binding */ ReluLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Layer/AbstractLayer1D.ts");
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


var ReluLayer = /*#__PURE__*/function (_AbstractLayer1D) {
  function ReluLayer() {
    _classCallCheck(this, ReluLayer);
    return _callSuper(this, ReluLayer, arguments);
  }
  _inherits(ReluLayer, _AbstractLayer1D);
  return _createClass(ReluLayer, [{
    key: "activation",
    value: function activation(m) {
      return m.setMin(0.0);
    }
  }, {
    key: "activationAsync",
    value: function activationAsync(m) {
      return new Promise(function (resolve) {
        m.calcAsync(function (calc) {
          calc.setMin(0.0).then(function (a) {
            resolve(a);
          });
        });
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
      return delta.reluBackpropagation();
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__.AbstractLayer1D);


/***/ }),

/***/ "./src/typescript/Layer/Softmax.ts":
/*!*****************************************!*\
  !*** ./src/typescript/Layer/Softmax.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SoftmaxLayer: () => (/* binding */ SoftmaxLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Layer/AbstractLayer1D.ts");
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
    key: "activationAsync",
    value: function activationAsync(value) {
      throw new Error("Method not implemented.");
    }
  }, {
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
      return delta.softmaxDerivative();
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__.AbstractLayer1D);


/***/ }),

/***/ "./src/typescript/Layer/Softplus.ts":
/*!******************************************!*\
  !*** ./src/typescript/Layer/Softplus.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SoftplusLayer: () => (/* binding */ SoftplusLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Layer/AbstractLayer1D.ts");
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


var SoftplusLayer = /*#__PURE__*/function (_AbstractLayer1D) {
  function SoftplusLayer() {
    _classCallCheck(this, SoftplusLayer);
    return _callSuper(this, SoftplusLayer, arguments);
  }
  _inherits(SoftplusLayer, _AbstractLayer1D);
  return _createClass(SoftplusLayer, [{
    key: "activation",
    value: function activation(m) {
      return m.exp().add(1).log();
    }
  }, {
    key: "getType",
    value: function getType() {
      return _types__WEBPACK_IMPORTED_MODULE_0__.LayerType.softplus;
    }
  }, {
    key: "derivative",
    value: function derivative(delta) {
      return delta.multiply(-1).exp().add(1).fraction(1);
    }
  }]);
}(_AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__.AbstractLayer1D);


/***/ }),

/***/ "./src/typescript/Layer/Tanh.ts":
/*!**************************************!*\
  !*** ./src/typescript/Layer/Tanh.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TanhLayer: () => (/* binding */ TanhLayer)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/typescript/types.ts");
/* harmony import */ var _AbstractLayer1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractLayer1D */ "./src/typescript/Layer/AbstractLayer1D.ts");
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
    key: "activationAsync",
    value: function activationAsync(value) {
      throw new Error("Method not implemented.");
    }
  }, {
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

/***/ "./src/typescript/Layer/index.ts":
/*!***************************************!*\
  !*** ./src/typescript/Layer/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractLayer: () => (/* reexport safe */ _AbstractLayer__WEBPACK_IMPORTED_MODULE_0__.AbstractLayer),
/* harmony export */   ConvLayer: () => (/* reexport safe */ _Conv__WEBPACK_IMPORTED_MODULE_6__.ConvLayer),
/* harmony export */   FullyConnectedLayer: () => (/* reexport safe */ _FullyConnected__WEBPACK_IMPORTED_MODULE_7__.FullyConnectedLayer),
/* harmony export */   LSTMLayer: () => (/* reexport safe */ _LSTM__WEBPACK_IMPORTED_MODULE_11__.LSTMLayer),
/* harmony export */   LogisticLayer: () => (/* reexport safe */ _Logistic__WEBPACK_IMPORTED_MODULE_2__.LogisticLayer),
/* harmony export */   MaxPoolLayer: () => (/* reexport safe */ _MaxPool__WEBPACK_IMPORTED_MODULE_8__.MaxPoolLayer),
/* harmony export */   PurelinLayer: () => (/* reexport safe */ _Purelin__WEBPACK_IMPORTED_MODULE_10__.PurelinLayer),
/* harmony export */   RecurrentLayer: () => (/* reexport safe */ _Recurrent__WEBPACK_IMPORTED_MODULE_9__.RecurrentLayer),
/* harmony export */   ReluLayer: () => (/* reexport safe */ _Relu__WEBPACK_IMPORTED_MODULE_4__.ReluLayer),
/* harmony export */   SoftmaxLayer: () => (/* reexport safe */ _Softmax__WEBPACK_IMPORTED_MODULE_1__.SoftmaxLayer),
/* harmony export */   SoftplusLayer: () => (/* reexport safe */ _Softplus__WEBPACK_IMPORTED_MODULE_5__.SoftplusLayer),
/* harmony export */   TanhLayer: () => (/* reexport safe */ _Tanh__WEBPACK_IMPORTED_MODULE_3__.TanhLayer)
/* harmony export */ });
/* harmony import */ var _AbstractLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractLayer */ "./src/typescript/Layer/AbstractLayer.ts");
/* harmony import */ var _Softmax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Softmax */ "./src/typescript/Layer/Softmax.ts");
/* harmony import */ var _Logistic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Logistic */ "./src/typescript/Layer/Logistic.ts");
/* harmony import */ var _Tanh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tanh */ "./src/typescript/Layer/Tanh.ts");
/* harmony import */ var _Relu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Relu */ "./src/typescript/Layer/Relu.ts");
/* harmony import */ var _Softplus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Softplus */ "./src/typescript/Layer/Softplus.ts");
/* harmony import */ var _Conv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Conv */ "./src/typescript/Layer/Conv.ts");
/* harmony import */ var _FullyConnected__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FullyConnected */ "./src/typescript/Layer/FullyConnected.ts");
/* harmony import */ var _MaxPool__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MaxPool */ "./src/typescript/Layer/MaxPool.ts");
/* harmony import */ var _Recurrent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Recurrent */ "./src/typescript/Layer/Recurrent.ts");
/* harmony import */ var _Purelin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Purelin */ "./src/typescript/Layer/Purelin.ts");
/* harmony import */ var _LSTM__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./LSTM */ "./src/typescript/Layer/LSTM.ts");














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
/* harmony import */ var _Computation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Computation */ "./src/typescript/Computation/index.ts");
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
/* harmony import */ var _Computation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Computation */ "./src/typescript/Computation/index.ts");
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
    this._dims = [width, height, depth];
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
      var device = (0,_Computation__WEBPACK_IMPORTED_MODULE_0__.getDevice)();
      this._memory = device.alloc(this.count());
      this._memory.setWidth(this.rows());
      this._memory.setHeight(this.cols());
      this._memory.setDepth(this.depth());
      this._allocated = true;
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
      this.calcSync(function (calc) {
        calc.setZeros();
      });
      return this;
    }
  }, {
    key: "setRandom",
    value: function setRandom(number) {
      this.calcSync(function (calc) {
        calc.setRandom(number);
      });
      return this;
    }
  }, {
    key: "setMax",
    value: function setMax(number) {
      this.calcSync(function (calc) {
        calc.setMax(number);
      });
      return this;
    }
  }, {
    key: "setMin",
    value: function setMin(number) {
      this.calcSync(function (calc) {
        calc.setMin(number);
      });
      return this;
    }
  }, {
    key: "reluBackpropagation",
    value: function reluBackpropagation(number) {
      this.calcSync(function (calc) {
        calc.reluBackpropagation();
      });
      return this;
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
      this.calcSync(function (calc) {
        calc.reluForwardPropagation();
      });
      return this;
    }
  }, {
    key: "getCalcSandbox",
    value: function getCalcSandbox() {
      var async = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var that = this;
      return {
        sum: function sum() {
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_1__.CalcScalar().allocate();
          return that._call("algebra", "algebra_sum", async)([that, result])(result);
        },
        setZeros: function setZeros() {
          return that._call("matrix", "matrix_set_zeros", async)([that])(that);
        },
        setRandom: function setRandom(number) {
          var nb = new _CalcScalar__WEBPACK_IMPORTED_MODULE_1__.CalcScalar().allocate().set([number]);
          return that._call("matrix", "matrix_set_random", async)([that, nb])(that);
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
      var _this = this;
      return new Promise(function (resolve, reject) {
        try {
          var result = callback(_this.getCalcSandbox(true));
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
      if (!this._allocated) {
        var device = (0,_Computation__WEBPACK_IMPORTED_MODULE_0__.getDevice)();
        this._memory = device.alloc(other.count());
        this._allocated = true;
      }
      this._memory.setWidth(other.rows());
      this._memory.setHeight(other.cols());
      this._memory.setDepth(other.depth());
      this._memory.copyFrom(other.getMemory());
      this._dims = other.dims();
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
    key: "replicate",
    value: function replicate(rows, cols) {
      return this.calcSync(function (calc) {
        return calc.replicate(rows, cols);
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
    value: function block(offset, batch, start, end) {
      return this.calcSync(function (calc) {
        return calc.block(offset, batch, start, end);
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
  }, {
    key: "getCalcSandbox",
    value: function getCalcSandbox() {
      var _this = this;
      var async = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var baseSandbox = _superPropGet(CalcMatrix2D, "getCalcSandbox", this, 3)([async]);
      var that = this;
      return _objectSpread(_objectSpread({}, baseSandbox), {}, {
        block: function block(offset, batch, start, end) {
          var result = new CalcMatrix2D(end - start, batch).allocate();
          var _offset = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([offset]);
          var _batch = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([batch]);
          var _start = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([start]);
          var _end = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([end]);
          return that._call("matrix", "matrix_block", async)([that, _offset, _batch, _start, _end, result])(result);
        },
        pow: function pow(number) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_pow", async)([that, new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([number]), result])(result);
        },
        fraction: function fraction(number) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_fraction", async)([that, new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([number]), result])(result);
        },
        softmax: function softmax() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_softmax", async)([that, result])(result);
        },
        sqrt: function sqrt() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_sqrt", async)([that, result])(result);
        },
        tanh: function tanh() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_tanh", async)([that, result])(result);
        },
        tanhDerivative: function tanhDerivative() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_tanh_derivative", async)([that, result])(result);
        },
        softmaxDerivative: function softmaxDerivative() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_softmax_derivative", async)([that, result])(result);
        },
        rowwiseSum: function rowwiseSum() {
          var result = new CalcMatrix2D(_this.rows(), 1).allocate();
          return that._call("algebra", "algebra_rowwise_sum", async)([that, result])(result);
        },
        multiply: function multiply(m) {
          if (typeof m === "number") {
            var _m = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([m]);
            var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
            return that._call("algebra", "algebra_multiply_number", async)([that, _m, result])(result);
          } else {
            var _result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
            return that._call("algebra", "algebra_multiply", async)([that, m, _result])(_result);
          }
        },
        log: function log() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_log", async)([that, result])(result);
        },
        divide: function divide(mOrNumber) {
          if (typeof mOrNumber === "number") {
            var num = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([mOrNumber]);
            var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
            return that._call("algebra", "algebra_divide_number", async)([that, num, result])(result);
          } else {
            var _result2 = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
            return that._call("algebra", "algebra_divide_matrix", async)([that, mOrNumber, _result2])(_result2);
          }
        },
        dot: function dot(m) {
          var result = new CalcMatrix2D(_this.rows(), m.cols()).allocate();
          return that._call("algebra", "algebra_dot", async)([that, m, result])(result);
        },
        add: function add(m) {
          if (typeof m === "number") {
            var num = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([m]);
            var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
            return that._call("algebra", "algebra_add_number", async)([that, num, result])(result);
          } else {
            var _result3 = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
            return that._call("algebra", "algebra_add_matrix", async)([that, m, _result3])(_result3);
          }
        },
        subtract: function subtract(m) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_subtract", async)([that, m, result])(result);
        },
        transpose: function transpose() {
          var result = new CalcMatrix2D(_this.cols(), _this.rows()).allocate(); // Corrected dimensions for dot product result
          return that._call("matrix", "matrix_transpose", async)([that, result])(result);
        },
        logMinusOne: function logMinusOne() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_log_minus_one", async)([that, result])(result);
        },
        minusOne: function minusOne() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate(); // Corrected dimensions for dot product result
          return that._call("algebra", "algebra_minus_one", async)([that, result])(result);
        },
        replicate: function replicate(rows, cols) {
          var _rows = _this.rows() * rows;
          var _cols = _this.cols() * cols;
          var result = new CalcMatrix2D(_rows, _cols).allocate();
          var __rows = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([rows]);
          var __cols = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([cols]);
          return that._call("algebra", "algebra_replicate_matrix", async)([that, __rows, __cols, result])(result);
        },
        logisticForwardPropagation: function logisticForwardPropagation() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_logistic_forward_propagation", async)([that, result])(result);
        },
        conjugate: function conjugate() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_conjugate", async)([that, result])(result);
        },
        logisticBackwardPropagation: function logisticBackwardPropagation() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_logistic_backward_propagation", async)([that, result])(result);
        },
        reluBackpropagation: function reluBackpropagation() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_reluBackpropagation", async)([that, result])(result);
        },
        maxCoeff: function maxCoeff() {
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate();
          return that._call("algebra", "algebra_max_coeff", async)([that, result])(result);
        },
        setMin: function setMin(number) {
          var nb = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([number]);
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("matrix", "matrix_set_min", async)([that, nb, result])(result);
        },
        setMax: function setMax(number) {
          var nb = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate().set([number]);
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("matrix", "matrix_set_max", async)([that, nb, result])(result);
        },
        min: function min() {
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate();
          return that._call("matrix", "matrix_min", async)([that, result])(result);
        },
        max: function max() {
          var result = new _CalcScalar__WEBPACK_IMPORTED_MODULE_2__.CalcScalar().allocate();
          return that._call("matrix", "matrix_max", async)([that, result])(result);
        },
        minMax: function minMax() {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          return that._call("algebra", "algebra_min_max", async)([that, result])(result);
        },
        img2col: function img2col(filterSize, stride, padding) {
          var result = new CalcMatrix2D(_this.rows(), _this.cols()).allocate();
          var params = new _CalcRowVector__WEBPACK_IMPORTED_MODULE_1__.CalcRowVector(3).allocate().set([filterSize, stride, padding]);
          return that._call("algebra", "algebra_img2col", async)([that, params, result])(result);
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
    key: "forwardAsync",
    value: function forwardAsync(input) {
      var _this = this;
      return new Promise(function (resolve) {
        var output = input.clone();
        var l = 0;
        var _next = function next() {
          return _this.layers[l].forwardAsync(output).then(function (out) {
            output.destroy();
            output = out;
            if (l < _this.layers.length - 1) {
              l++;
              _next();
            } else {
              resolve(output);
            }
          });
        };
        _next();
      });
    }
  }, {
    key: "backward",
    value: function backward(X, regularization, sigma) {
      var m = X.cols();
      var currentSigma = sigma;
      for (var i = this.layers.length - 1; i >= 0; i -= 1) {
        var layer = this.layers[i];
        currentSigma = layer.getBackPropagation().propagate(X, m, regularization, layer, currentSigma);
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
            W: layer.W.get(),
            b: layer.b.get()
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

/***/ "./src/typescript/Network/NetworkLSTM.ts":
/*!***********************************************!*\
  !*** ./src/typescript/Network/NetworkLSTM.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetworkLSTM: () => (/* binding */ NetworkLSTM)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var NetworkLSTM = /*#__PURE__*/_createClass(function NetworkLSTM() {
  _classCallCheck(this, NetworkLSTM);
});

/***/ }),

/***/ "./src/typescript/Network/NetworkRNN.ts":
/*!**********************************************!*\
  !*** ./src/typescript/Network/NetworkRNN.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetworkRNN: () => (/* binding */ NetworkRNN)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var NetworkRNN = /*#__PURE__*/_createClass(function NetworkRNN() {
  _classCallCheck(this, NetworkRNN);
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
/* harmony export */   Network: () => (/* reexport safe */ _Network__WEBPACK_IMPORTED_MODULE_0__.Network),
/* harmony export */   NetworkLSTM: () => (/* reexport safe */ _NetworkLSTM__WEBPACK_IMPORTED_MODULE_2__.NetworkLSTM),
/* harmony export */   NetworkRNN: () => (/* reexport safe */ _NetworkRNN__WEBPACK_IMPORTED_MODULE_1__.NetworkRNN)
/* harmony export */ });
/* harmony import */ var _Network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Network */ "./src/typescript/Network/Network.ts");
/* harmony import */ var _NetworkRNN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NetworkRNN */ "./src/typescript/Network/NetworkRNN.ts");
/* harmony import */ var _NetworkLSTM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NetworkLSTM */ "./src/typescript/Network/NetworkLSTM.ts");





/***/ }),

/***/ "./src/typescript/NetworkBuilder/AbstractNetworkBuilder.ts":
/*!*****************************************************************!*\
  !*** ./src/typescript/NetworkBuilder/AbstractNetworkBuilder.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractNetworkBuilder: () => (/* binding */ AbstractNetworkBuilder)
/* harmony export */ });
/* harmony import */ var _Network__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Network */ "./src/typescript/Network/index.ts");
/* harmony import */ var _Layer_Backpropagation_BackpropagationFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Layer/Backpropagation/BackpropagationFactory */ "./src/typescript/Layer/Backpropagation/BackpropagationFactory.ts");
/* harmony import */ var _Network_NetworkLSTM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Network/NetworkLSTM */ "./src/typescript/Network/NetworkLSTM.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var AbstractNetworkBuilder = /*#__PURE__*/function () {
  function AbstractNetworkBuilder(dimension) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "DNN";
    _classCallCheck(this, AbstractNetworkBuilder);
    _defineProperty(this, "dimensions", null);
    _defineProperty(this, "lastLayer", null);
    _defineProperty(this, "network", null);
    this.dimensions = dimension;
    if (type === "DNN") {
      this.network = new _Network__WEBPACK_IMPORTED_MODULE_0__.Network(this.dimensions);
    } else if (type === "RNN") {
      this.network = new _Network__WEBPACK_IMPORTED_MODULE_0__.NetworkRNN(this.dimensions);
    } else if (type === "LSTM") {
      this.network = new _Network_NetworkLSTM__WEBPACK_IMPORTED_MODULE_2__.NetworkLSTM(this.dimensions);
    }
  }
  return _createClass(AbstractNetworkBuilder, [{
    key: "createLayer",
    value: function createLayer(layerClass) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // @ts-ignore
      var layer = new layerClass();
      if (typeof callback === "function") {
        callback(layer);
      }
      if (this.lastLayer === null) {
        this.firstLayerTransition(layer);
      } else {
        // @ts-ignore
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

/***/ "./src/typescript/NetworkBuilder/NetworkBuilder1D.ts":
/*!***********************************************************!*\
  !*** ./src/typescript/NetworkBuilder/NetworkBuilder1D.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetworkBuilder1D: () => (/* binding */ NetworkBuilder1D)
/* harmony export */ });
/* harmony import */ var _AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractNetworkBuilder */ "./src/typescript/NetworkBuilder/AbstractNetworkBuilder.ts");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Layer___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Layer/ */ "./src/typescript/Layer/index.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
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
              layerClass = _Layer___WEBPACK_IMPORTED_MODULE_2__.LogisticLayer;
            } else if (layerData["type"] === "softmax") {
              layerClass = _Layer___WEBPACK_IMPORTED_MODULE_2__.SoftmaxLayer;
            } else if (layerData["type"] === "relu") {
              layerClass = _Layer___WEBPACK_IMPORTED_MODULE_2__.ReluLayer;
            } else if (layerData["type"] === "softplus") {
              layerClass = _Layer___WEBPACK_IMPORTED_MODULE_2__.SoftplusLayer;
            } else if (layerData["type"] === "tanh") {
              layerClass = _Layer___WEBPACK_IMPORTED_MODULE_2__.TanhLayer;
            }
            builder.createLayer(layerClass, function (layer) {
              // @ts-ignore
              layer.setSize(layerData["size"]);
            });
          });
          var network = builder.getNetwork();
          network.getLayers().forEach(function (layer, i) {
            layer.W = new _Math__WEBPACK_IMPORTED_MODULE_3__.CalcMatrix2D(json["layers"][i]["weights"]["W"].length, json["layers"][i]["weights"]["W"][0].length, json["layers"][i]["weights"]["W"]);
            layer.b = new _Math__WEBPACK_IMPORTED_MODULE_3__.CalcMatrix2D(json["layers"][i]["weights"]["b"].length, json["layers"][i]["weights"]["b"][0].length, json["layers"][i]["weights"]["b"]);
          });
          resolve(network);
        });
      });
    }
  }]);
}(_AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__.AbstractNetworkBuilder);


/***/ }),

/***/ "./src/typescript/NetworkBuilder/NetworkBuilder3D.ts":
/*!***********************************************************!*\
  !*** ./src/typescript/NetworkBuilder/NetworkBuilder3D.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetworkBuilder3D: () => (/* binding */ NetworkBuilder3D)
/* harmony export */ });
/* harmony import */ var _AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractNetworkBuilder */ "./src/typescript/NetworkBuilder/AbstractNetworkBuilder.ts");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Layer___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Layer/ */ "./src/typescript/Layer/index.ts");
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





var NetworkBuilder3D = /*#__PURE__*/function (_AbstractNetworkBuild) {
  function NetworkBuilder3D() {
    _classCallCheck(this, NetworkBuilder3D);
    return _callSuper(this, NetworkBuilder3D, arguments);
  }
  _inherits(NetworkBuilder3D, _AbstractNetworkBuild);
  return _createClass(NetworkBuilder3D, [{
    key: "firstLayerTransition",
    value: function firstLayerTransition(layer) {
      if (this.dimensions) {
        // @ts-ignore
        layer.setSize(this.dimensions);
      }
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
          var builder = new NetworkBuilder3D(json["size"]);
          json["layers"].forEach(function (layerData) {
            if (layerData["type"] === "logistic") {
              // @ts-ignore
              builder.createLayer(_Layer___WEBPACK_IMPORTED_MODULE_2__.LogisticLayer, function (layer) {
                // @ts-ignore
                layer.setSize(layerData["size"]);
              });
            } else if (layerData["type"] === "softmax") {
              // @ts-ignore
              builder.createLayer(_Layer___WEBPACK_IMPORTED_MODULE_2__.SoftmaxLayer, function (layer) {
                // @ts-ignore
                layer.setSize(layerData["size"]);
              });
            } else if (layerData["type"] === "relu") {
              // @ts-ignore
              builder.createLayer(_Layer___WEBPACK_IMPORTED_MODULE_2__.ReluLayer, function (layer) {
                // @ts-ignore
                layer.setSize(layerData["size"]);
              });
            } else if (layerData["type"] === "softplus") {
              // @ts-ignore
              builder.createLayer(_Layer___WEBPACK_IMPORTED_MODULE_2__.SoftplusLayer, function (layer) {
                // @ts-ignore
                layer.setSize(layerData["size"]);
              });
            } else if (layerData["type"] === "tanh") {
              // @ts-ignore
              builder.createLayer(_Layer___WEBPACK_IMPORTED_MODULE_2__.TanhLayer, function (layer) {
                // @ts-ignore
                layer.setSize(layerData["size"]);
              });
            } else if (layerData["type"] === "conv") {
              // @ts-ignore
              builder.createLayer(_Layer___WEBPACK_IMPORTED_MODULE_2__.ConvLayer, function (layer) {
                layer.setSize(layerData["size"]);
                layer.setFilterSize(layerData["filterSize"]);
                layer.setStride(layerData["stride"]);
                layer.setNumFilters(layerData["numFilters"]);
                layer.setPadding(layerData["padding"]);
              });
            } else if (layerData["type"] === "maxpool") {
              // @ts-ignore
              builder.createLayer(_Layer___WEBPACK_IMPORTED_MODULE_2__.MaxPoolLayer, function (layer) {
                layer.setSize(layerData["size"]);
                layer.setFilterSize(layerData["filterSize"]);
                layer.setStride(layerData["stride"]);
              });
            } else if (layerData["type"] === "fullyconnected") {
              // @ts-ignore
              builder.createLayer(_Layer___WEBPACK_IMPORTED_MODULE_2__.MaxPoolLayer);
            }
          });
          var network = builder.getNetwork();
          if (network) {
            network.getLayers().forEach(function (layer, i) {
              layer.W = json["layers"]["W"];
              layer.b = json["layers"]["b"];
            });
            resolve(network);
          }
        });
      });
    }
  }]);
}(_AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__.AbstractNetworkBuilder);


/***/ }),

/***/ "./src/typescript/NetworkBuilder/index.ts":
/*!************************************************!*\
  !*** ./src/typescript/NetworkBuilder/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractNetworkBuilder: () => (/* reexport safe */ _AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__.AbstractNetworkBuilder),
/* harmony export */   NetworkBuilder1D: () => (/* reexport safe */ _NetworkBuilder1D__WEBPACK_IMPORTED_MODULE_1__.NetworkBuilder1D),
/* harmony export */   NetworkBuilder3D: () => (/* reexport safe */ _NetworkBuilder3D__WEBPACK_IMPORTED_MODULE_2__.NetworkBuilder3D)
/* harmony export */ });
/* harmony import */ var _AbstractNetworkBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractNetworkBuilder */ "./src/typescript/NetworkBuilder/AbstractNetworkBuilder.ts");
/* harmony import */ var _NetworkBuilder1D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NetworkBuilder1D */ "./src/typescript/NetworkBuilder/NetworkBuilder1D.ts");
/* harmony import */ var _NetworkBuilder3D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NetworkBuilder3D */ "./src/typescript/NetworkBuilder/NetworkBuilder3D.ts");





/***/ }),

/***/ "./src/typescript/Trainer/AbstractTrainer.ts":
/*!***************************************************!*\
  !*** ./src/typescript/Trainer/AbstractTrainer.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractTrainer: () => (/* binding */ AbstractTrainer)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
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
      var dataLoss = this.costFunction.loss(correctOutput, predictions);
      var regularizationPenalty = 0;
      this.network.getLayers().forEach(function (layer) {
        regularizationPenalty += layer.penalty().get()[0];
      });
      var regularizationLoss = this.regularization * regularizationPenalty / (2.0 * miniBatchSize);
      var cost = dataLoss + regularizationLoss;
      var correctPredictions = 0;
      for (var i = 0; i < miniBatchSize; i += 1) {
        var predictionIndex = predictions.col(i).maxCoeff();
        var outputIndex = correctOutput.col(i).maxCoeff();
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

/***/ "./src/typescript/Trainer/Cost/AbstractCost.ts":
/*!*****************************************************!*\
  !*** ./src/typescript/Trainer/Cost/AbstractCost.ts ***!
  \*****************************************************/
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

/***/ "./src/typescript/Trainer/Cost/CrossEntropyCost.ts":
/*!*********************************************************!*\
  !*** ./src/typescript/Trainer/Cost/CrossEntropyCost.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CrossEntropyCost: () => (/* binding */ CrossEntropyCost)
/* harmony export */ });
/* harmony import */ var _AbstractCost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCost */ "./src/typescript/Trainer/Cost/AbstractCost.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types */ "./src/typescript/types.ts");
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
      var miniBatchSize = correctOutput.cols();
      var logPredictions = predictions.add(this.epsilon).log();
      var cost = correctOutput.multiply(logPredictions).sum().get()[0];
      return -cost / miniBatchSize;
    }
  }, {
    key: "derivative",
    value: function derivative(correctOutput, predictions, lastLayer) {
      if (lastLayer.getType() === _types__WEBPACK_IMPORTED_MODULE_1__.LayerType.softmax) {
        return predictions.subtract(correctOutput);
      }
      var denominator = predictions.multiply(predictions.minusOne().multiply(-1)).add(this.epsilon);
      var dA = predictions.subtract(correctOutput).divide(denominator);
      return dA.multiply(lastLayer.derivative(predictions));
    }
  }]);
}(_AbstractCost__WEBPACK_IMPORTED_MODULE_0__.AbstractCost);

/***/ }),

/***/ "./src/typescript/Trainer/Cost/MeanSquaredErrorCost.ts":
/*!*************************************************************!*\
  !*** ./src/typescript/Trainer/Cost/MeanSquaredErrorCost.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeanSquaredErrorCost: () => (/* binding */ MeanSquaredErrorCost)
/* harmony export */ });
/* harmony import */ var _AbstractCost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractCost */ "./src/typescript/Trainer/Cost/AbstractCost.ts");
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
      var dA = predictions.subtract(correctOutput);
      return dA.multiply(lastLayer.derivative(predictions));
    }
  }]);
}(_AbstractCost__WEBPACK_IMPORTED_MODULE_0__.AbstractCost);

/***/ }),

/***/ "./src/typescript/Trainer/MiniBatchTrainer.ts":
/*!****************************************************!*\
  !*** ./src/typescript/Trainer/MiniBatchTrainer.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MiniBatchTrainer: () => (/* binding */ MiniBatchTrainer)
/* harmony export */ });
/* harmony import */ var _AbstractTrainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractTrainer */ "./src/typescript/Trainer/AbstractTrainer.ts");
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

var MiniBatchTrainer = /*#__PURE__*/function (_AbstractTrainer) {
  function MiniBatchTrainer() {
    _classCallCheck(this, MiniBatchTrainer);
    return _callSuper(this, MiniBatchTrainer, arguments);
  }
  _inherits(MiniBatchTrainer, _AbstractTrainer);
  return _createClass(MiniBatchTrainer);
}(_AbstractTrainer__WEBPACK_IMPORTED_MODULE_0__.AbstractTrainer);

/***/ }),

/***/ "./src/typescript/Trainer/Optimizer/AbstractOptimizer.ts":
/*!***************************************************************!*\
  !*** ./src/typescript/Trainer/Optimizer/AbstractOptimizer.ts ***!
  \***************************************************************/
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

/***/ "./src/typescript/Trainer/Optimizer/OptimizerAdagrad.ts":
/*!**************************************************************!*\
  !*** ./src/typescript/Trainer/Optimizer/OptimizerAdagrad.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerAdagrad: () => (/* binding */ OptimizerAdagrad)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Trainer/Optimizer/AbstractOptimizer.ts");
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

/***/ "./src/typescript/Trainer/Optimizer/OptimizerAdam.ts":
/*!***********************************************************!*\
  !*** ./src/typescript/Trainer/Optimizer/OptimizerAdam.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerAdam: () => (/* binding */ OptimizerAdam)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Trainer/Optimizer/AbstractOptimizer.ts");
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
    return _this;
  }
  _inherits(OptimizerAdam, _AbstractOptimizer);
  return _createClass(OptimizerAdam, [{
    key: "setBeta1",
    value: function setBeta1(beta1) {
      this.beta1 = beta1;
      return this;
    }
  }, {
    key: "setBeta2",
    value: function setBeta2(beta2) {
      this.beta2 = beta2;
      return this;
    }
  }, {
    key: "optimize",
    value: function optimize(layer) {
      this.adam(layer, this.learningRate, this.t);
    }
  }, {
    key: "adam",
    value: function adam(layer, learningRate, t) {
      layer.vW = layer.vW.multiply(this.beta1).add(layer.gW.multiply(1 - this.beta1));
      layer.vb = layer.vb.multiply(this.beta1).add(layer.gb.multiply(1 - this.beta1));
      layer.sW = layer.sW.multiply(this.beta2).add(layer.sW.pow(2).multiply(1 - this.beta2));
      layer.sb = layer.sb.multiply(this.beta2).add(layer.sb.pow(2).multiply(1 - this.beta2));
      var vWCorrected = layer.vW.divide(1 - Math.pow(this.beta1, 2));
      var vbCorrected = layer.vb.divide(1 - Math.pow(this.beta1, 2));
      var sWCorrected = layer.sW.add(1e-8).sqrt();
      var sbCorrected = layer.sb.add(1e-8).sqrt();
      layer.W = layer.W.subtract(vWCorrected.divide(sWCorrected).multiply(learningRate));
      layer.b = layer.b.subtract(vbCorrected.divide(sbCorrected).multiply(learningRate));
    }
  }]);
}(_AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__.AbstractOptimizer);

/***/ }),

/***/ "./src/typescript/Trainer/Optimizer/OptimizerGradientDescent.ts":
/*!**********************************************************************!*\
  !*** ./src/typescript/Trainer/Optimizer/OptimizerGradientDescent.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerGradientDescent: () => (/* binding */ OptimizerGradientDescent)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Trainer/Optimizer/AbstractOptimizer.ts");
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
      layer.b = layer.b.subtract(layer.b.multiply(learningRate));
    }
  }]);
}(_AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__.AbstractOptimizer);

/***/ }),

/***/ "./src/typescript/Trainer/Optimizer/OptimizerMomentum.ts":
/*!***************************************************************!*\
  !*** ./src/typescript/Trainer/Optimizer/OptimizerMomentum.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerMomentum: () => (/* binding */ OptimizerMomentum)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Trainer/Optimizer/AbstractOptimizer.ts");
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

/***/ "./src/typescript/Trainer/Optimizer/OptimizerRMSProp.ts":
/*!**************************************************************!*\
  !*** ./src/typescript/Trainer/Optimizer/OptimizerRMSProp.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerRMSProp: () => (/* binding */ OptimizerRMSProp)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Trainer/Optimizer/AbstractOptimizer.ts");
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

/***/ "./src/typescript/Trainer/Optimizer/OptimizerRNN.ts":
/*!**********************************************************!*\
  !*** ./src/typescript/Trainer/Optimizer/OptimizerRNN.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptimizerRNN: () => (/* binding */ OptimizerRNN)
/* harmony export */ });
/* harmony import */ var _AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractOptimizer */ "./src/typescript/Trainer/Optimizer/AbstractOptimizer.ts");
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

var OptimizerRNN = /*#__PURE__*/function (_AbstractOptimizer) {
  function OptimizerRNN() {
    _classCallCheck(this, OptimizerRNN);
    return _callSuper(this, OptimizerRNN, arguments);
  }
  _inherits(OptimizerRNN, _AbstractOptimizer);
  return _createClass(OptimizerRNN);
}(_AbstractOptimizer__WEBPACK_IMPORTED_MODULE_0__.AbstractOptimizer);

/***/ }),

/***/ "./src/typescript/Trainer/Optimizer/index.ts":
/*!***************************************************!*\
  !*** ./src/typescript/Trainer/Optimizer/index.ts ***!
  \***************************************************/
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
/* harmony import */ var _OptimizerAdam__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptimizerAdam */ "./src/typescript/Trainer/Optimizer/OptimizerAdam.ts");
/* harmony import */ var _OptimizerGradientDescent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OptimizerGradientDescent */ "./src/typescript/Trainer/Optimizer/OptimizerGradientDescent.ts");
/* harmony import */ var _OptimizerAdagrad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OptimizerAdagrad */ "./src/typescript/Trainer/Optimizer/OptimizerAdagrad.ts");
/* harmony import */ var _OptimizerMomentum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OptimizerMomentum */ "./src/typescript/Trainer/Optimizer/OptimizerMomentum.ts");
/* harmony import */ var _OptimizerRMSProp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OptimizerRMSProp */ "./src/typescript/Trainer/Optimizer/OptimizerRMSProp.ts");







/***/ }),

/***/ "./src/typescript/Trainer/RNNTrainer.ts":
/*!**********************************************!*\
  !*** ./src/typescript/Trainer/RNNTrainer.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RNNTrainer: () => (/* binding */ RNNTrainer)
/* harmony export */ });
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
/* harmony import */ var _Optimizer_OptimizerRNN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Optimizer/OptimizerRNN */ "./src/typescript/Trainer/Optimizer/OptimizerRNN.ts");
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


var RNNTrainer = /*#__PURE__*/function () {
  function RNNTrainer(network) {
    _classCallCheck(this, RNNTrainer);
    _defineProperty(this, "network", null);
    _defineProperty(this, "iterations", 1000);
    _defineProperty(this, "learningRate", 0.01);
    _defineProperty(this, "optimizer", null);
    this.network = network;
    this.optimizer = new _Optimizer_OptimizerRNN__WEBPACK_IMPORTED_MODULE_1__.OptimizerRNN(network).setLearningRate(this.learningRate);
  }
  return _createClass(RNNTrainer, [{
    key: "train",
    value: function train(dataset) {
      var _dataset$buildData = dataset.buildData(this.network.getDimensions()[0]),
        _dataset$buildData2 = _slicedToArray(_dataset$buildData, 2),
        X = _dataset$buildData2[0],
        Y = _dataset$buildData2[1];
      var _dataset$vectorizatio = dataset.vectorization(X, Y),
        _dataset$vectorizatio2 = _slicedToArray(_dataset$vectorizatio, 2),
        x = _dataset$vectorizatio2[0],
        y = _dataset$vectorizatio2[1];

      //const hs = {};
      //const ys = {};
      this.optimizer.setT(-1).setHS(new _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D(this.network.getDimensions()[0], this.network.getDimensions()[0]).setZeros());

      /*let mWxh = new Matrix(this.network.getDimensions()[0], this.network.getDimensions()[1]).setZeros();
      let mWhh = new Matrix(this.network.getDimensions()[0], this.network.getDimensions()[0]).setZeros();
      let mWhy = new Matrix(this.network.getDimensions()[1], this.network.getDimensions()[0]).setZeros();
      let mbh = new Matrix(this.network.layers[0].dwB.rows, this.network.layers[0].dwB.cols).setZeros();
      let mby = new Matrix(this.network.layers[0].dwBY.rows, this.network.layers[0].dwBY.cols).setZeros();*/

      for (var iteration = 0; iteration < this.iterations; iteration += 1) {
        var _loss = 0;
        for (var i = 0; i < X.length; i += 1) {
          var _this$network$forward = this.network.forward(x[i], y[i], this.optimizer.hs[i - 1]),
            aNext = _this$network$forward.aNext,
            _y = _this$network$forward.y,
            loss = _this$network$forward.loss;
          this.optimizer.setT(i).setHS(aNext).setYS(_y);
          //hs[i] = aNext;
          //ys[i] = _y;

          if ((i + 1) % 1000 === 0) {
            console.log("FORWARD Example ".concat(i + 1, " | Iteration ").concat(iteration + 1));
          }
          _loss += loss;
        }
        console.log("Loss ".concat(_loss, " | Iteration: ").concat(iteration));
        for (var _i = X.length - 1; _i >= 0; _i -= 1) {
          var dy = _Math__WEBPACK_IMPORTED_MODULE_0__.CalcMatrix2D.from(this.optimizer.ys[_i].data);
          for (var row = 0; row < dy.rows; row += 1) {
            dy.data[row][x[_i].transpose().rowMaxCoeffIndex(row)] -= 1;
          }
          this.network.backward(x[_i], dy, this.optimizer.hs[_i - 1], this.optimizer.hs[_i]);
          if ((_i + 1) % 1000 === 0) {
            console.log("BACKWARD Example ".concat(_i + 1, " | Iteration ").concat(iteration + 1));
          }
        }
        this.optimizer.optimize(this.network.layers[0]);
        console.log(this.network.sample(dataset).trim());
      }
      return [0];
    }
  }, {
    key: "setIterations",
    value: function setIterations(num) {
      this.iterations = num;
      return this;
    }
  }, {
    key: "setLearningRate",
    value: function setLearningRate(num) {
      this.learningRate = num;
      this.optimizer.setLearningRate(num);
      return this;
    }
  }]);
}();

/***/ }),

/***/ "./src/typescript/Trainer/Trainer.ts":
/*!*******************************************!*\
  !*** ./src/typescript/Trainer/Trainer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trainer: () => (/* binding */ Trainer)
/* harmony export */ });
/* harmony import */ var _AbstractTrainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractTrainer */ "./src/typescript/Trainer/AbstractTrainer.ts");
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Math */ "./src/typescript/Math/index.ts");
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


var Trainer = /*#__PURE__*/function (_AbstractTrainer) {
  function Trainer(network, optimizer, costFunction) {
    _classCallCheck(this, Trainer);
    return _callSuper(this, Trainer, [network, optimizer, costFunction]);
  }
  _inherits(Trainer, _AbstractTrainer);
  return _createClass(Trainer, [{
    key: "train",
    value: function train(inputDataset, outputDataset) {
      var _this = this;
      var numberOfExamples = inputDataset.getNumberOfExamples();
      var X = inputDataset.data.transpose();
      var Y = outputDataset.data.transpose();
      var t = 0;
      this.optimizer.setBatchSize(numberOfExamples);
      this.optimizer.setLearningRate(this.learningRate);
      for (var i = 0; i < this.iterations; i += 1) {
        var startTime = new Date().getTime();
        var predictions = this.network.forward(X);
        var sigma = this.costFunction.derivative(Y, predictions, this.network.getLastLayer());
        this.network.backward(X, this.regularization, sigma);
        this.optimizer.setT(++t);
        this.network.getLayers().forEach(function (layer) {
          _this.optimizer.optimize(layer);
        });
        if (this.verbose && (i + 1) % this.verboseStep === 0) {
          var currentResult = this.cost(predictions, Y);
          var endTime = new Date().getTime();
          console.log("Iteration: ".concat(i + 1, " | Cost: ").concat((0,_Math__WEBPACK_IMPORTED_MODULE_1__.round)(currentResult.cost, 5), " | Accuracy: ").concat((0,_Math__WEBPACK_IMPORTED_MODULE_1__.round)(currentResult.accuracy, 2), "% | Time: ").concat((endTime - startTime) / 1000, " s."));
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

/***/ "./src/typescript/Trainer/index.ts":
/*!*****************************************!*\
  !*** ./src/typescript/Trainer/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MiniBatchTrainer: () => (/* reexport safe */ _MiniBatchTrainer__WEBPACK_IMPORTED_MODULE_0__.MiniBatchTrainer),
/* harmony export */   RNNTrainer: () => (/* reexport safe */ _RNNTrainer__WEBPACK_IMPORTED_MODULE_2__.RNNTrainer),
/* harmony export */   Trainer: () => (/* reexport safe */ _Trainer__WEBPACK_IMPORTED_MODULE_1__.Trainer)
/* harmony export */ });
/* harmony import */ var _MiniBatchTrainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MiniBatchTrainer */ "./src/typescript/Trainer/MiniBatchTrainer.ts");
/* harmony import */ var _Trainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Trainer */ "./src/typescript/Trainer/Trainer.ts");
/* harmony import */ var _RNNTrainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RNNTrainer */ "./src/typescript/Trainer/RNNTrainer.ts");





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
  LayerType["softplus"] = "softplus";
  LayerType["conv"] = "conv";
  LayerType["maxpool"] = "maxpool";
  LayerType["fullyconnected"] = "fullyconnected";
  LayerType["purelin"] = "purelin";
  LayerType["rnnlayer"] = "rnnlayer";
  LayerType["lstm"] = "lstm";
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
/* harmony export */   Math: () => (/* binding */ Math),
/* harmony export */   Network: () => (/* binding */ Network),
/* harmony export */   NetworkBuilder: () => (/* binding */ NetworkBuilder),
/* harmony export */   Optimizer: () => (/* binding */ Optimizer),
/* harmony export */   Trainer: () => (/* binding */ Trainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Math_CalcScalar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math/CalcScalar */ "./src/typescript/Math/CalcScalar.ts");
/* harmony import */ var _Math_CalcRowVector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Math/CalcRowVector */ "./src/typescript/Math/CalcRowVector.ts");
/* harmony import */ var _Math_CalcColVector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Math/CalcColVector */ "./src/typescript/Math/CalcColVector.ts");
/* harmony import */ var _Math_CalcMatrix2D__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Math/CalcMatrix2D */ "./src/typescript/Math/CalcMatrix2D.ts");
/* harmony import */ var _Math_CalcMatrix3D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Math/CalcMatrix3D */ "./src/typescript/Math/CalcMatrix3D.ts");
/* harmony import */ var _Computation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Computation */ "./src/typescript/Computation/index.ts");
/* harmony import */ var _NetworkBuilder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NetworkBuilder */ "./src/typescript/NetworkBuilder/index.ts");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Layer */ "./src/typescript/Layer/index.ts");
/* harmony import */ var _Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Trainer/Optimizer */ "./src/typescript/Trainer/Optimizer/index.ts");
/* harmony import */ var _Trainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Trainer */ "./src/typescript/Trainer/index.ts");
/* harmony import */ var _Network__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Network */ "./src/typescript/Network/index.ts");
/* harmony import */ var _Trainer_Cost_MeanSquaredErrorCost__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Trainer/Cost/MeanSquaredErrorCost */ "./src/typescript/Trainer/Cost/MeanSquaredErrorCost.ts");
/* harmony import */ var _Trainer_Cost_CrossEntropyCost__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Trainer/Cost/CrossEntropyCost */ "./src/typescript/Trainer/Cost/CrossEntropyCost.ts");
/* harmony import */ var _build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../build/Release/node_native_memory.node */ "./build/Release/node_native_memory.node");
/* harmony import */ var _build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Dataset */ "./src/typescript/Dataset/index.ts");
/* harmony import */ var _DatasetBuilder__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./DatasetBuilder */ "./src/typescript/DatasetBuilder/index.ts");
/* harmony import */ var _DatasetBuilder_DatasetBuilderSource__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./DatasetBuilder/DatasetBuilderSource */ "./src/typescript/DatasetBuilder/DatasetBuilderSource/index.ts");
/* harmony import */ var _DatasetBuilder_DatasetVocabularyBuilderSource__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./DatasetBuilder/DatasetVocabularyBuilderSource */ "./src/typescript/DatasetBuilder/DatasetVocabularyBuilderSource/index.ts");
/* harmony import */ var _Dataset_DatasetModifier__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Dataset/DatasetModifier */ "./src/typescript/Dataset/DatasetModifier/index.ts");













var NetworkBuilder = {
  NetworkBuilder1D: _NetworkBuilder__WEBPACK_IMPORTED_MODULE_6__.NetworkBuilder1D,
  NetworkBuilder3D: _NetworkBuilder__WEBPACK_IMPORTED_MODULE_6__.NetworkBuilder3D
};
var Layer = {
  SoftmaxLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.SoftmaxLayer,
  LogisticLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.LogisticLayer,
  ReluLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.ReluLayer,
  SoftplusLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.SoftplusLayer,
  TanhLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.TanhLayer,
  ConvLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.ConvLayer,
  MaxPoolLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.MaxPoolLayer,
  FullyConnectedLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.FullyConnectedLayer,
  RecurrentLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.RecurrentLayer,
  LSTMLayer: _Layer__WEBPACK_IMPORTED_MODULE_7__.LSTMLayer
};
var Optimizer = {
  OptimizerAdam: _Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_8__.OptimizerAdam,
  OptimizerGradientDescent: _Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_8__.OptimizerGradientDescent,
  OptimizerAdagrad: _Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_8__.OptimizerAdagrad,
  OptimizerMomentum: _Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_8__.OptimizerMomentum,
  OptimizerRMSProp: _Trainer_Optimizer__WEBPACK_IMPORTED_MODULE_8__.OptimizerRMSProp
};
var Trainer = {
  MiniBatchTrainer: _Trainer__WEBPACK_IMPORTED_MODULE_9__.MiniBatchTrainer,
  Trainer: _Trainer__WEBPACK_IMPORTED_MODULE_9__.Trainer,
  RNNTrainer: _Trainer__WEBPACK_IMPORTED_MODULE_9__.RNNTrainer
};
var Network = {
  NetworkRNN: _Network__WEBPACK_IMPORTED_MODULE_10__.NetworkRNN,
  NetworkLSTM: _Network__WEBPACK_IMPORTED_MODULE_10__.NetworkLSTM
};
var Cost = {
  MeanSquaredErrorCost: _Trainer_Cost_MeanSquaredErrorCost__WEBPACK_IMPORTED_MODULE_11__.MeanSquaredErrorCost,
  CrossEntropyCost: _Trainer_Cost_CrossEntropyCost__WEBPACK_IMPORTED_MODULE_12__.CrossEntropyCost
};


_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_13___default().setModulePath(path__WEBPACK_IMPORTED_MODULE_14___default().resolve(__dirname, "../"));





var DatasetBuilder = {
  DatasetBuilder: _DatasetBuilder__WEBPACK_IMPORTED_MODULE_16__.DatasetBuilder,
  DatasetVocabularyBuilder: _DatasetBuilder__WEBPACK_IMPORTED_MODULE_16__.DatasetVocabularyBuilder
};
var Dataset = {
  Dataset: _Dataset__WEBPACK_IMPORTED_MODULE_15__.Dataset
};
var DatasetModifier = {
  CallbackDatasetModifier: _Dataset_DatasetModifier__WEBPACK_IMPORTED_MODULE_19__.CallbackDatasetModifier,
  MinMaxScalingDatasetModifier: _Dataset_DatasetModifier__WEBPACK_IMPORTED_MODULE_19__.MinMaxScalingDatasetModifier,
  MissingDataDatasetModifier: _Dataset_DatasetModifier__WEBPACK_IMPORTED_MODULE_19__.MissingDataDatasetModifier,
  ShuffleDatasetModifier: _Dataset_DatasetModifier__WEBPACK_IMPORTED_MODULE_19__.ShuffleDatasetModifier,
  CategoryDatasetModifier: _Dataset_DatasetModifier__WEBPACK_IMPORTED_MODULE_19__.CategoryDatasetModifier,
  SplitDatasetModifier: _Dataset_DatasetModifier__WEBPACK_IMPORTED_MODULE_19__.SplitDatasetModifier
};
var DatasetBuilderSource = {
  DatasetBuilderSourceCSV: _DatasetBuilder_DatasetBuilderSource__WEBPACK_IMPORTED_MODULE_17__.DatasetBuilderSourceCSV,
  DatasetVocabularyBuilderSourceTextFile: _DatasetBuilder_DatasetVocabularyBuilderSource__WEBPACK_IMPORTED_MODULE_18__.DatasetVocabularyBuilderSourceTextFile
};
var Math = {
  CalcScalar: _Math_CalcScalar__WEBPACK_IMPORTED_MODULE_0__.CalcScalar,
  CalcRowVector: _Math_CalcRowVector__WEBPACK_IMPORTED_MODULE_1__.CalcRowVector,
  CalcColVector: _Math_CalcColVector__WEBPACK_IMPORTED_MODULE_2__.CalcColVector,
  CalcMatrix2D: _Math_CalcMatrix2D__WEBPACK_IMPORTED_MODULE_3__.CalcMatrix2D,
  CalcMatrix3D: _Math_CalcMatrix3D__WEBPACK_IMPORTED_MODULE_4__.CalcMatrix3D,
  setDevice: _Computation__WEBPACK_IMPORTED_MODULE_5__.setDevice,
  getDevice: _Computation__WEBPACK_IMPORTED_MODULE_5__.getDevice,
  "native": (_build_Release_node_native_memory_node__WEBPACK_IMPORTED_MODULE_13___default())
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  NetworkBuilder: NetworkBuilder,
  Layer: Layer,
  Optimizer: Optimizer,
  Trainer: Trainer,
  Network: Network,
  Cost: Cost,
  Math: Math,
  DatasetBuilder: DatasetBuilder,
  Dataset: Dataset,
  DatasetModifier: DatasetModifier,
  DatasetBuilderSource: DatasetBuilderSource
});
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=impulse-math-device-ts.dev.js.map