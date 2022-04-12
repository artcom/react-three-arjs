"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.weak-map.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.is-array.js");

var _arThreex = require("@ar-js-org/ar.js/three.js/build/ar-threex");

var _fiber = require("@react-three/fiber");

var _react = _interopRequireWildcard(require("react"));

var _ar = require("./ar");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ARMarker = function ARMarker(_ref) {
  var children = _ref.children,
      type = _ref.type,
      barcodeValue = _ref.barcodeValue,
      patternUrl = _ref.patternUrl,
      params = _ref.params,
      onMarkerFound = _ref.onMarkerFound,
      onMarkerLost = _ref.onMarkerLost;
  var markerRoot = (0, _react.useRef)();

  var _useAR = (0, _ar.useAR)(),
      arToolkitContext = _useAR.arToolkitContext;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFound = _useState2[0],
      setIsFound = _useState2[1];

  (0, _react.useEffect)(function () {
    if (!arToolkitContext) {
      return;
    }

    var markerControls = new _arThreex.ArMarkerControls(arToolkitContext, markerRoot.current, _objectSpread({
      type: type,
      barcodeValue: type === "barcode" ? barcodeValue : null,
      patternUrl: type === "pattern" ? patternUrl : null
    }, params));
    return function () {
      var index = arToolkitContext._arMarkersControls.indexOf(markerControls);

      arToolkitContext._arMarkersControls.splice(index, 1);
    };
  }, []);
  (0, _fiber.useFrame)(function () {
    if (markerRoot.current.visible && !isFound) {
      setIsFound(true);

      if (onMarkerFound) {
        onMarkerFound();
      }
    } else if (!markerRoot.current.visible && isFound) {
      setIsFound(false);

      if (onMarkerLost) {
        onMarkerLost();
      }
    }
  });
  return /*#__PURE__*/_react["default"].createElement("group", {
    ref: markerRoot
  }, children);
};

var _default = ARMarker;
exports["default"] = _default;
//# sourceMappingURL=arMarker.js.map