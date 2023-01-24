import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import React from "react"
import { createRoot } from "react-dom/client"

function Box() {
  return (
    <mesh
      onClick={e => {
        window.alert("click")
        console.log(e)
      }}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  )
}

createRoot(document.getElementById("root")).render(
  <ARCanvas
    gl={{ antialias: false, powerPreference: "default", physicallyCorrectLights: true }}
    onCameraStreamReady={() => console.log("Camera stream ready")}
    onCameraStreamError={() => console.error("Camera stream error")}
    onCreated={({ gl }) => {
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
