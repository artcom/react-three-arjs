import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";
var _excluded = ["arEnabled", "tracking", "children", "patternRatio", "detectionMode", "cameraParametersUrl", "matrixCodeType", "sourceType", "onCameraStreamReady", "onCameraStreamError"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable indent */

/* eslint-disable react/jsx-indent */

/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Canvas } from "@react-three/fiber";
import { AR } from "./ar";

var ARCanvas = function ARCanvas(_ref) {
  var _ref$arEnabled = _ref.arEnabled,
      arEnabled = _ref$arEnabled === void 0 ? true : _ref$arEnabled,
      _ref$tracking = _ref.tracking,
      tracking = _ref$tracking === void 0 ? true : _ref$tracking,
      children = _ref.children,
      _ref$patternRatio = _ref.patternRatio,
      patternRatio = _ref$patternRatio === void 0 ? 0.5 : _ref$patternRatio,
      _ref$detectionMode = _ref.detectionMode,
      detectionMode = _ref$detectionMode === void 0 ? "mono_and_matrix" : _ref$detectionMode,
      _ref$cameraParameters = _ref.cameraParametersUrl,
      cameraParametersUrl = _ref$cameraParameters === void 0 ? "data/camera_para.dat" : _ref$cameraParameters,
      _ref$matrixCodeType = _ref.matrixCodeType,
      matrixCodeType = _ref$matrixCodeType === void 0 ? "3x3" : _ref$matrixCodeType,
      _ref$sourceType = _ref.sourceType,
      sourceType = _ref$sourceType === void 0 ? "webcam" : _ref$sourceType,
      onCameraStreamReady = _ref.onCameraStreamReady,
      onCameraStreamError = _ref.onCameraStreamError,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(Canvas, _extends({
    camera: arEnabled ? {
      position: [0, 0, 0]
    } : props.camera
  }, props), arEnabled ? /*#__PURE__*/React.createElement(AR, {
    tracking: tracking,
    patternRatio: patternRatio,
    matrixCodeType: matrixCodeType,
    detectionMode: detectionMode,
    sourceType: sourceType,
    cameraParametersUrl: cameraParametersUrl,
    onCameraStreamReady: onCameraStreamReady,
    onCameraStreamError: onCameraStreamError
  }, children) : children);
};

export default ARCanvas;
//# sourceMappingURL=arCanvas.js.map