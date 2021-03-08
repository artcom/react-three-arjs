/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-pascal-case */

import React from "react"
import { Canvas } from "react-three-fiber"

import { AR } from "./ar"

const ARCanvas = ({
  arEnabled = true,
  children,
  patternRatio = 0.5,
  detectionMode = "mono_and_matrix",
  cameraParametersUrl = "data/camera_para.dat",
  matrixCodeType = "3x3",
  ...props }) =>
  <Canvas { ...props }>
    {
      arEnabled
        ? <AR
            patternRatio={ patternRatio }
            matrixCodeType={ matrixCodeType }
            detectionMode={ detectionMode }
            cameraParametersUrl={ cameraParametersUrl }>
          { children }
          </AR>
        : { children }
    }
  </Canvas>

export default ARCanvas
