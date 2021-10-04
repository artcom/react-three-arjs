/* eslint-disable no-underscore-dangle */
import { ArMarkerControls } from "@ar-js-org/ar.js/three.js/build/ar-threex"
import { useFrame } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react"
import { useAR } from "./ar"

const ARMarker = ({
  children,
  type,
  barcodeValue,
  patternUrl,
  params,
  onMarkerFound,
  onMarkerLost
}) => {
  const markerRoot = useRef()
  const { arToolkitContext, tracking } = useAR()
  const [isFound, setIsFound] = useState(false)

  useEffect(() => {
    console.log("ARMarker", "mount")

    if (!arToolkitContext) { return }

    const markerControls = new ArMarkerControls(arToolkitContext, markerRoot.current, {
      type,
      barcodeValue: type === "barcode" ? barcodeValue : null,
      patternUrl: type === "pattern" ? patternUrl : null,
      ...params
    })

    return () => {
      const index = arToolkitContext._arMarkersControls.indexOf(markerControls)
      arToolkitContext._arMarkersControls.splice(index, 1)
    }
  }, [])

  useEffect(() => {
    if (tracking === false) {
      markerRoot.current.visible = false
    }
  }, [tracking])

  useEffect(() => {
    if (isFound) {
      if (onMarkerFound) {onMarkerFound()}
    } else {
      if (onMarkerLost) {onMarkerLost()}
    }
  }, [isFound, onMarkerFound, onMarkerLost])

  useFrame(() => {
    if (markerRoot.current.visible && !isFound) {
      setIsFound(true)
    } else if (!markerRoot.current.visible && isFound) {
      setIsFound(false)
    }
  })

  return (
    <group ref={ markerRoot }>
      { children }
    </group>
  )
}

export default ARMarker
