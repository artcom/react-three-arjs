import React, { useEffect } from 'react'
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import { GLTFLoader  } from "three/examples/jsm/loaders/GLTFLoader"
import { useLoader } from "@react-three/fiber";
import markers from '../info.js';

function Model(props) {
  const size = props.size ?? 1;
  const gltf= useLoader(GLTFLoader, props.file);
  return <primitive object={gltf.scene} 
    position={props.pos ?? [0, 1, 0]}
    scale={[size, size, size]}
    rotation={props.rotation ?? [0, 0, 0]}
    onClick={() => {markerCollect(props.id)}}
    />
}

const markerFound = (id) => {
  console.log("Marker found: ", id);
}
const markerCollect = (id) => {
  alert("Marker collected: " + id.toString());
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
        {
          markers.map((marker) => {
            return (
              <ARMarker
                key={marker.id}
                params={{ smooth: true, smoothThreshold: 1}}
                type={"barcode"}
                barcodeValue={marker.id}
                onMarkerFound={() => markerFound(marker.id)}>
                <pointLight position={[5, 5, 0]} intensity={5.0}/>
                <Model file={marker.file}
                  pos={marker.pos} size={marker.size} rotation={marker.rotation} id={marker.id}></Model>
              </ARMarker>
            )
          })
        }
      </ARCanvas>
    </div>
  )
}

export default Game