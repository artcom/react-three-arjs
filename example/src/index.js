import ReactDOM from "react-dom"
import React from "react"

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"

function Box() {
  return (
    <mesh>
      <boxBufferGeometry args={ [1, 1, 1] } />
      <meshStandardMaterial color={ "hotpink" } />
    </mesh>
  )
}

ReactDOM.render(
  <ARCanvas
    gl={ { antialias: false, powerPreference: "default" } }
    pixelRatio={ window.devicePixelRatio }
    onCreated={ ({ gl }) => {
      gl.outputEncoding = THREE.sRGBEncoding
      gl.physicallyCorrectLights = true
      gl.setSize(window.innerWidth, window.innerHeight)
    } }>
    <ambientLight />
    <pointLight position={ [10, 10, 0] } intensity={ 10.0 } />
    <ARMarker
      type={ "pattern" }
      patternUrl={ "data/hiro.patt" }
      onMarkerFound={ () => { console.log("Marker Found")} }>
      <Box />
    </ARMarker>
  </ARCanvas>,
  document.getElementById("root")
)
