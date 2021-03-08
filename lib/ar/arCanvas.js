/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Canvas } from "react-three-fiber";
import { AR } from "./ar";

var ARCanvas = function ARCanvas() {
  var arEnabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var children = arguments.length > 1 ? arguments[1] : undefined;
  var patternRatio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
  var detectionMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "mono_and_matrix";
  var cameraParametersUrl = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "data/camera_para.dat";
  var matrixCodeType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "3x3";

  for (var _len = arguments.length, props = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
    props[_key - 6] = arguments[_key];
  }

  return /*#__PURE__*/React.createElement(Canvas, {
    props: props
  }, arEnabled ? /*#__PURE__*/React.createElement(AR, {
    patternRatio: patternRatio,
    matrixCodeType: matrixCodeType,
    detectionMode: detectionMode,
    cameraParametersUrl: cameraParametersUrl
  }, children) : {
    children: children
  });
};

export default ARCanvas;
//# sourceMappingURL=arCanvas.js.map