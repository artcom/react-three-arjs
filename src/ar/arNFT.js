/* eslint-disable no-underscore-dangle */
import { ArMarkerControls } from "@ar-js-org/ar.js/three.js/build/ar-threex-nft"
import { useFrame } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react"
import { useAR } from "./ar"

const ARNft = ({
  children,
  type = "nft",
  descriptorsUrl,
  params,
  onMarkerFound,
  onMarkerLost
}) => {
  const markerRoot = useRef()
  const { arToolkitContext } = useAR()
  const [isFound, setIsFound] = useState(false)

  useEffect(() => {
    if (!arToolkitContext) { return }

    const markerControls = new ArMarkerControls(arToolkitContext, markerRoot.current, {
      type,
      descriptorsUrl,
      ...params
    })

    return () => {
      const index = arToolkitContext._arMarkersControls.indexOf(markerControls)
      arToolkitContext._arMarkersControls.splice(index, 1)
    }
  }, [arToolkitContext, descriptorsUrl, params, type])

  useFrame(() => {
    if (markerRoot.current.visible && !isFound) {
      setIsFound(true)
      if (onMarkerFound) {onMarkerFound()}
    } else if (!markerRoot.current.visible && isFound) {
      setIsFound(false)
      if (onMarkerLost) {onMarkerLost()}
    }
  })

  return (
    <group ref={ markerRoot }>
      { children }
    </group>
  )
}

export default ARNft
