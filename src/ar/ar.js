import { useFrame, useThree } from "@react-three/fiber"
import { ArToolkitContext, ArToolkitSource } from "@ar-js-org/ar.js/three.js/build/ar-threex"
import React, { createContext, useCallback, useEffect, useMemo } from "react"

const ARContext = createContext({})
const videoDomElemSelector = "#arjs-video"

const AR = React.memo(({
  tracking = true,
  children,
  sourceType,
  patternRatio,
  matrixCodeType,
  detectionMode,
  cameraParametersUrl,
  onCameraStreamReady,
  onCameraStreamError
}) => {
  const { gl, camera } = useThree()

  const arContext = useMemo(() => {
    const arToolkitSource = new ArToolkitSource({ sourceType })
    const arToolkitContext = new ArToolkitContext({
      cameraParametersUrl,
      detectionMode,
      patternRatio,
      matrixCodeType
    })

    return { arToolkitContext, arToolkitSource }
  }, [patternRatio, matrixCodeType, cameraParametersUrl, detectionMode, sourceType])

  const onResize = useCallback(() => {
    const { arToolkitContext, arToolkitSource } = arContext

    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(gl.domElement)
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix())
    }
  }, [gl, arContext, camera])

  const onUnmount = useCallback(() => {
    window.removeEventListener("resize", onResize)

    arContext.arToolkitContext.arController.dispose()
    if (arContext.arToolkitContext.arController.cameraParam) {
      arContext.arToolkitContext.arController.cameraParam.dispose()
    }

    delete arContext.arToolkitContext
    delete arContext.arToolkitSource

    const video = document.querySelector(videoDomElemSelector)
    if (video) {
      video.srcObject.getTracks().map(track => track.stop())
      video.remove()
    }
  }, [onResize, arContext])

  useEffect(() => {
    arContext.arToolkitSource.init(() => {
      const video = document.querySelector(videoDomElemSelector)
      video.style.position = "fixed"

      video.onloadedmetadata = () => {
        if (onCameraStreamReady) {
          onCameraStreamReady()
        }
        onResize()
      }
    }, onCameraStreamError)

    arContext.arToolkitContext.init(() =>
      camera.projectionMatrix.copy(arContext.arToolkitContext.getProjectionMatrix())
    )

    window.addEventListener("resize", onResize)

    return onUnmount
  }, [arContext, camera, onCameraStreamReady, onCameraStreamError, onResize, onUnmount])

  useFrame(() => {
    if (!tracking) {
      return
    }

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
})

const useAR = () => {
  const arValue = React.useContext(ARContext)
  return React.useMemo(() => ({ ...arValue }), [arValue])
}

export { AR, useAR }
