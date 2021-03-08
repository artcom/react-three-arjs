import ReactDOM from "react-dom"
import React, { useRef } from "react"

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"

function Box() {
  const mesh = useRef()

  return (
    <mesh
      ref={ mesh }>
      <boxBufferGeometry args={ [1, 1, 1] } />
      <meshStandardMaterial color={ "hotpink" } />
    </mesh>
  )
}

ReactDOM.render(
  <ARCanvas contextParams={ {
    patternRatio: 0.5,
    detectionMode: "mono_and_matrix",
    cameraParametersUrl: "data/camera_para.dat",
    matixCodeType: "3x3"
  } }>
    <ambientLight />
    <ARMarker>
      <Box />
    </ARMarker>
  </ARCanvas>,
  document.getElementById("root")
)
