import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.array.is-array.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.array.for-each.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.object.define-properties.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable no-underscore-dangle */
import { ArMarkerControls } from "@ar-js-org/ar.js/three.js/build/ar-threex";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { useAR } from "./ar";

var ARMarker = function ARMarker(_ref) {
  var children = _ref.children,
      type = _ref.type,
      barcodeValue = _ref.barcodeValue,
      patternUrl = _ref.patternUrl,
      params = _ref.params,
      onMarkerFound = _ref.onMarkerFound,
      onMarkerLost = _ref.onMarkerLost;
  var markerRoot = useRef();

  var _useAR = useAR(),
      arToolkitContext = _useAR.arToolkitContext;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFound = _useState2[0],
      setIsFound = _useState2[1];

  useEffect(function () {
    if (!arToolkitContext) {
      return;
    }

    var markerControls = new ArMarkerControls(arToolkitContext, markerRoot.current, _objectSpread({
      type: type,
      barcodeValue: type === "barcode" ? barcodeValue : null,
      patternUrl: type === "pattern" ? patternUrl : null
    }, params));
    return function () {
      var index = arToolkitContext._arMarkersControls.indexOf(markerControls);

      arToolkitContext._arMarkersControls.splice(index, 1);
    };
  }, []);
  useFrame(function () {
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
  return /*#__PURE__*/React.createElement("group", {
    ref: markerRoot
  }, children);
};

export default ARMarker;
//# sourceMappingURL=arMarker.js.map