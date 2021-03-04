import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.array.for-each.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.object.define-properties.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef } from "react";
import { useAR } from "./ar";

var ARMarker = function ARMarker(_ref) {
  var children = _ref.children,
      type = _ref.type,
      barcodeValue = _ref.barcodeValue,
      patternUrl = _ref.patternUrl,
      params = _ref.params;
  var markerRoot = useRef();

  var _useAR = useAR(),
      arToolkitContext = _useAR.arToolkitContext;

  useEffect(function () {
    if (!arToolkitContext) {
      return;
    }

    var markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot.current, _objectSpread({
      type: type,
      barcodeValue: type === "barcode" ? barcodeValue : null,
      patternUrl: type === "pattern" ? patternUrl : null
    }, params));
    return function () {
      var index = arToolkitContext._arMarkersControls.indexOf(markerControls);

      arToolkitContext._arMarkersControls.splice(index, 1);
    };
  }, []);
  return /*#__PURE__*/React.createElement("group", {
    ref: markerRoot
  }, children);
};

export default ARMarker;
//# sourceMappingURL=arMarker.js.map