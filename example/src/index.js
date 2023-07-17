import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import React, { useState } from "react"
import { createRoot } from "react-dom/client"
import { Stats } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

function Box() {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "yellow" : "hotpink"} />
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
    }}
    sourceType={"image"}
    sourceUrl={"data/hiro-marker-test.jpg"}>
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
