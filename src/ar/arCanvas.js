/* eslint-disable react/jsx-pascal-case */

import React from "react"
import { Canvas } from "react-three-fiber"

import { AR } from "./ar"

const renderARCanvas = (children, contextParams) =>
  <Canvas
    gl={ { antialias: false, powerPreference: "default" } }
    camera={ { position: [0, 0, 0] } }
    pixelRatio={ window.devicePixelRatio }
    onCreated={ ({ gl }) => {
      gl.outputEncoding = THREE.sRGBEncoding
      gl.physicallyCorrectLights = true
      gl.setSize(window.innerWidth, window.innerHeight)
    } }>
    <AR contextParams={ contextParams }>
      { children }
    </AR>
  </Canvas>

const renderCanvas = children =>
  <Canvas
    gl={ { antialias: false, powerPreference: "default" } }
    pixelRatio={ window.devicePixelRatio }
    onCreated={ ({ gl }) => {
      gl.outputEncoding = THREE.sRGBEncoding
      gl.physicallyCorrectLights = true
      gl.setClearColor(new THREE.Color("#020207"))
    } }>
    { children }
  </Canvas>

const ARCanvas = ({ children, contextParams, arEnabled = true }) =>
  arEnabled
    ? renderARCanvas(children, contextParams)
    : renderCanvas(children)

export default ARCanvas
