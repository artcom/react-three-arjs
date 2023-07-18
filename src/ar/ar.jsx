/* eslint-disable import/named */
import { ArToolkitContext, ArToolkitSource } from "@ar-js-org/ar.js/three.js/build/ar-threex"
import { useFrame, useThree } from "@react-three/fiber"
import React, { createContext, useCallback, useEffect, useMemo } from "react"

const ARContext = createContext({})
const videoDomElemSelector = "#arjs-video"

const AR = React.memo(function AR({
  tracking = true,
  children,
  sourceType,
  sourceUrl,
  patternRatio,
  matrixCodeType,
  detectionMode,
  cameraParametersUrl,
  onCameraStreamReady,
  onCameraStreamError,
}) {
  const gl = useThree(({ gl }) => gl)
  const camera = useThree(({ camera }) => camera)

  const arContext = useMemo(() => {
    const arToolkitSource = new ArToolkitSource({ sourceType, sourceUrl })
    const arToolkitContext = new ArToolkitContext({
      cameraParametersUrl,
      detectionMode,
      patternRatio,
      matrixCodeType,
    })

    return { arToolkitContext, arToolkitSource }
  }, [sourceType, sourceUrl, cameraParametersUrl, detectionMode, patternRatio, matrixCodeType])

  const onResize = useCallback(() => {
    const { arToolkitContext, arToolkitSource } = arContext
    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(gl.domElement)
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix())
      camera.projectionMatrixInverse.copy(arToolkitContext.getProjectionMatrix()).invert()
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
    arContext.arToolkitContext.init(() => {
      arContext.arToolkitSource.init(() => {
        const sourceElement = document.querySelector(videoDomElemSelector)
        sourceElement.style.position = "fixed"

        if (sourceElement.tagName === "IMG") {
          if (sourceElement.width > sourceElement.height) {
            arContext.arToolkitContext.arController.orientation = "landscape"
            arContext.arToolkitContext.arController.options.orientation = "landscape"
          } else {
            arContext.arToolkitContext.arController.orientation = "portrait"
            arContext.arToolkitContext.arController.options.orientation = "portrait"
          }
          onResize()
        } else if (sourceElement.tagName === "VIDEO") {
          sourceElement.onloadedmetadata = () => {
            if (sourceElement.videoWidth > sourceElement.videoHeight) {
              arContext.arToolkitContext.arController.orientation = "landscape"
              arContext.arToolkitContext.arController.options.orientation = "landscape"
            } else {
              arContext.arToolkitContext.arController.orientation = "portrait"
              arContext.arToolkitContext.arController.options.orientation = "portrait"
            }
            onCameraStreamReady?.()
            onResize()
          }
        }
      }, onCameraStreamError)

      camera.projectionMatrix.copy(arContext.arToolkitContext.getProjectionMatrix())
      camera.projectionMatrixInverse.copy(arContext.arToolkitContext.getProjectionMatrix()).invert()
    })

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

  return <ARContext.Provider value={value}>{children}</ARContext.Provider>
})

const useAR = () => {
  const arValue = React.useContext(ARContext)
  return React.useMemo(() => ({ ...arValue }), [arValue])
}

export { AR, useAR }
