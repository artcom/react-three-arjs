/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Canvas } from "react-three-fiber";
import { AR } from "./ar";

var renderARCanvas = function renderARCanvas(children, contextParams) {
  return /*#__PURE__*/React.createElement(Canvas, {
    gl: {
      antialias: false,
      powerPreference: "default"
    },
    camera: {
      position: [0, 0, 0]
    },
    pixelRatio: window.devicePixelRatio,
    onCreated: function onCreated(_ref) {
      var gl = _ref.gl;
      gl.outputEncoding = THREE.sRGBEncoding;
      gl.physicallyCorrectLights = true;
      gl.setSize(window.innerWidth, window.innerHeight);
    }
  }, /*#__PURE__*/React.createElement(AR, {
    patternRatio: contextParams.patternRatio,
    matrixCodeType: contextParams.matrixCodeType
  }, children));
};

var renderCanvas = function renderCanvas(children) {
  return /*#__PURE__*/React.createElement(Canvas, {
    gl: {
      antialias: false,
      powerPreference: "default"
    },
    pixelRatio: window.devicePixelRatio,
    onCreated: function onCreated(_ref2) {
      var gl = _ref2.gl;
      gl.outputEncoding = THREE.sRGBEncoding;
      gl.physicallyCorrectLights = true;
      gl.setClearColor(new THREE.Color("#020207"));
    }
  }, children);
};

var ARCanvas = function ARCanvas(_ref3) {
  var children = _ref3.children,
      contextParams = _ref3.contextParams,
      _ref3$arEnabled = _ref3.arEnabled,
      arEnabled = _ref3$arEnabled === void 0 ? true : _ref3$arEnabled;
  return arEnabled ? renderARCanvas(children, contextParams) : renderCanvas(children);
};

export default ARCanvas;
//# sourceMappingURL=arCanvas.js.map