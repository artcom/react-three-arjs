import ReactDOM from "react-dom"
import React, { useRef } from "react"

import { ARCanvas, ARMarker } from "../../src/ar"

function Box() {
  const mesh = useRef()

  return (
    <mesh
      ref={mesh}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  )
}

ReactDOM.render(
  <ARCanvas>
    <ambientLight />
    <ARMarker>
      <Box />
    </ARMarker>
  </ARCanvas>,
  document.getElementById("root")
)