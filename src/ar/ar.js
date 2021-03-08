import React, { createContext, useCallback, useEffect, useMemo } from "react"
import { useFrame, useThree } from "react-three-fiber"

const ARContext = createContext({})
const videoDomElemSelector = "#arjs-video"

const AR = ({
  children,
  patternRatio,
  matrixCodeType,
  detectionMode,
  cameraParametersUrl
}) => {
  const { gl, camera } = useThree()

  const arContext = useMemo(() => {
    const arToolkitSource = new THREEx.ArToolkitSource({ sourceType: "webcam" })
    const arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl,
      detectionMode,
      patternRatio,
      matrixCodeType
    })

    return { arToolkitContext, arToolkitSource }
  }, [patternRatio, matrixCodeType, cameraParametersUrl, detectionMode])

  const onResize = useCallback(() => {
    const { arToolkitContext, arToolkitSource } = arContext

    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(gl.domElement)
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
    }
  }, [gl, arContext])

  const onUnmount = useCallback(() => {
    window.removeEventListener("resize", onResize)

    arContext.arToolkitContext.arController.dispose()
    if (arContext.arToolkitContext.arController.cameraParam) {
      arContext.arToolkitContext.arController.cameraParam.dispose()
    }

    delete arContext.arToolkitContext
    delete arContext.arToolkitSource

    const video = document.querySelector(videoDomElemSelector)
    video.srcObject.getTracks().map(track => track.stop())
    video.remove()
  }, [onResize, arContext])

  useEffect(() => {
    arContext.arToolkitSource.init(() => {
      const video = document.querySelector(videoDomElemSelector)
      video.onloadedmetadata = onResize
    })

    arContext.arToolkitContext.init(() =>
      camera.projectionMatrix.copy(arContext.arToolkitContext.getProjectionMatrix())
    )

    window.addEventListener("resize", onResize)

    return onUnmount
  }, [arContext, camera, onResize, onUnmount])

  useFrame(() => {
    if (arContext.arToolkitSource && arContext.arToolkitSource.ready !== false) {
      arContext.arToolkitContext.update(arContext.arToolkitSource.domElement)
    }
  })

  const value = useMemo(() => ({ arToolkitContext: arContext.arToolkitContext }), [arContext])

  return (
    <ARContext.Provider value={ value }>
      { children }
    </ARContext.Provider>
  )
}

const useAR = () => {
  const arValue = React.useContext(ARContext)
  return React.useMemo(() => ({ ...arValue }), [arValue])
}

export { AR, useAR }
