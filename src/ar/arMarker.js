import React, { useEffect, useRef } from "react"
import { useAR } from "./ar"

const ARMarker = ({ children, type, barcodeValue, patternUrl, params }) => {
  const markerRoot = useRef()
  const { arToolkitContext } = useAR()

  useEffect(() => {
    if (!arToolkitContext) { return }

    const markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot.current, {
      type,
      barcodeValue: type === "barcode" ? barcodeValue : null,
      patternUrl: type === "pattern" ? patternUrl : null,
      ...params
    })

    return () => markerControls.dispose()
  }, [])

  return (
    <group ref={ markerRoot }>
      { children }
    </group>
  )
}

export default ARMarker
