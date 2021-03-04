function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.array.for-each.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.object.define-properties.js";
import React, { createContext, useCallback, useEffect, useMemo } from "react";
import { useFrame, useThree } from "react-three-fiber";
var ARContext = /*#__PURE__*/createContext({});
var videoDomElemSelector = "#arjs-video";

var AR = function AR(_ref) {
  var children = _ref.children,
      patternRatio = _ref.patternRatio,
      matrixCodeType = _ref.matrixCodeType;

  var _useThree = useThree(),
      gl = _useThree.gl,
      camera = _useThree.camera;

  var arContext = useMemo(function () {
    console.log("Restart arContext");
    var arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam"
    });
    var arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: "data/camera_para.dat",
      detectionMode: "mono_and_matrix",
      patternRatio: patternRatio,
      matrixCodeType: matrixCodeType
    });
    return {
      arToolkitContext: arToolkitContext,
      arToolkitSource: arToolkitSource
    };
  }, [patternRatio, matrixCodeType]);
  var onResize = useCallback(function () {
    var arToolkitContext = arContext.arToolkitContext,
        arToolkitSource = arContext.arToolkitSource;
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(gl.domElement);

    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
  }, [gl, arContext]);
  var onUnmount = useCallback(function () {
    console.log("onUnmount");
    window.removeEventListener("resize", onResize);
    arContext.arToolkitContext.arController.dispose();

    if (arContext.arToolkitContext.arController.cameraParam) {
      arContext.arToolkitContext.arController.cameraParam.dispose();
    }

    delete arContext.arToolkitContext;
    delete arContext.arToolkitSource;
    var video = document.querySelector(videoDomElemSelector);
    video.srcObject.getTracks().map(function (track) {
      return track.stop();
    });
    video.parentNode.removeChild(video);
    video.remove();
  }, [onResize, arContext]);
  useEffect(function () {
    arContext.arToolkitSource.init(function () {
      var video = document.querySelector("#arjs-video");
      video.onloadedmetadata = onResize;
    });
    arContext.arToolkitContext.init(function () {
      return camera.projectionMatrix.copy(arContext.arToolkitContext.getProjectionMatrix());
    });
    window.addEventListener("resize", onResize);
    return onUnmount;
  }, [arContext, camera, onResize, onUnmount]);
  useFrame(function () {
    if (arContext.arToolkitSource && arContext.arToolkitSource.ready !== false) {
      arContext.arToolkitContext.update(arContext.arToolkitSource.domElement);
    }
  });
  var value = useMemo(function () {
    return {
      arToolkitContext: arContext.arToolkitContext
    };
  }, [arContext]);
  return /*#__PURE__*/React.createElement(ARContext.Provider, {
    value: value
  }, children);
};

var useAR = function useAR() {
  var arValue = React.useContext(ARContext);
  return React.useMemo(function () {
    return _objectSpread({}, arValue);
  }, [arValue]);
};

export { AR, useAR };
//# sourceMappingURL=ar.js.map