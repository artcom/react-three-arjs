import React from 'react'
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import { GLTFLoader  } from "three/examples/jsm/loaders/GLTFLoader"
import { useLoader } from "@react-three/fiber";

function Model(props) {
  const size = props.size ?? 1;
  const gltf= useLoader(GLTFLoader, props.file);
  return <primitive object={gltf.scene} 
    position={props.pos ?? [0, 1, 0]}
    scale={[size, size, size]}/>
}

function Game() {
  return (
    <div>
      <ARCanvas
        onCameraStreamReady={() => console.log("Camera stream ready")}
        onCameraStreamError={() => console.error("Camera stream error")}
        detectionMode={"mono_and_matrix"}
        matrixCodeType={"3x3_PARITY65"}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight)
        }}>
        <ambientLight intensity={1}/>
        <ARMarker
          params={{ smooth: true, smoothThreshold: 1}}
          type={"barcode"}
          barcodeValue={0}
          onMarkerFound={() => {
            console.log("Marker Found")
          }}>
          <pointLight position={[5, 5, 0]} intensity={20.0} />
          <Model file='data/gdsc/scene.gltf' pos={[0, 1, 0]}></Model>
        </ARMarker>
      </ARCanvas>
    </div>
  )
}

export default Game