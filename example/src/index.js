import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import React from "react"
import { createRoot } from "react-dom/client"
import { sRGBEncoding } from "three"

function Box() {
  return (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  )
}

createRoot(document.getElementById("root")).render(
  <ARCanvas
    gl={{ antialias: false, powerPreference: "default" }}
    dpr={window.devicePixelRatio}
    onCameraStreamReady={() => console.log("Camera stream ready")}
    onCameraStreamError={() => console.error("Camera stream error")}
    onCreated={({ gl }) => {
      gl.outputEncoding = sRGBEncoding
      gl.physicallyCorrectLights = true
      gl.setSize(window.innerWidth, window.innerHeight)
    }}>
    <ambientLight />
    <pointLight position={[10, 10, 0]} intensity={10.0} />
    <ARMarker
      params={{ smooth: true }}
      type={"pattern"}
      patternUrl={"data/patt.hiro"}
      onMarkerFound={() => {
        console.log("Marker Found")
      }}>
      <Box />
    </ARMarker>
  </ARCanvas>,
)
