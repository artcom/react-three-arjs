/* eslint-disable import/named */
import { ArToolkitContext, ArToolkitSource } from "@ar-js-org/ar.js/three.js/build/ar-threex"
import { useFrame, useThree } from "@react-three/fiber"
import { useHelper } from "@react-three/drei"
import React, { createContext, useCallback, useEffect, useMemo } from "react"
import { useRef } from "react"
import { CameraHelper } from "three"

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
  const events = useThree(({ events }) => events)
  const scene = useThree(({ scene }) => scene)

  const raycaster = useThree(({ raycaster }) => raycaster)
  const pointer = useThree(({ pointer }) => pointer)

  const ref = useRef(camera)

  const arContext = useMemo(() => {
    const arToolkitSource = new ArToolkitSource({ sourceType, sourceUrl })
    const arToolkitContext = new ArToolkitContext({
      cameraParametersUrl,
      detectionMode,
      patternRatio,
      matrixCodeType,
    })

    return { arToolkitContext, arToolkitSource }
  }, [patternRatio, matrixCodeType, cameraParametersUrl, detectionMode, sourceType])

  const onResize = useCallback(() => {
    const { arToolkitContext, arToolkitSource } = arContext
    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(gl.domElement)
    console.log("arToolkitContext.arController", arToolkitContext.arController)
    if (arToolkitContext.arController !== null) {
      console.log("arToolkitContext.arController", arToolkitContext.arController)
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

  useEffect(() => {}, [arContext, camera])

  useHelper(ref, CameraHelper)

  useEffect(() => {
    arContext.arToolkitContext.init(() => {
      console.log(raycaster)
      console.log(camera.projectionMatrix)
      camera.projectionMatrix.copy(arContext.arToolkitContext.getProjectionMatrix())
      camera.projectionMatrixInverse.copy(arContext.arToolkitContext.getProjectionMatrix()).invert()

      raycaster.camera = camera
      // raycaster.setFromCamera(pointer, camera)
      console.log(raycaster.camera.projectionMatrix)

      // camera.updateProjectionMatrix()
      arContext.arToolkitSource.init(() => {
        //     const sourceElement = document.querySelector(videoDomElemSelector)
        //     console.log("sourceElement", sourceElement)
        // sourceElement.style.position = "fixed"
        //     if (sourceElement.tagName === "IMG") {
        //       console.log("actual source dimensions", sourceElement.width, sourceElement.height)
        //       if (sourceElement.width > sourceElement.height) {
        //         arContext.arToolkitContext.arController.orientation = "landscape"
        //         arContext.arToolkitContext.arController.options.orientation = "landscape"
        //       } else {
        //         arContext.arToolkitContext.arController.orientation = "portrait"
        //         arContext.arToolkitContext.arController.options.orientation = "portrait"
        //       }
        //       if (onCameraStreamReady) {
        //         onCameraStreamReady()
        //       }
        // onResize()
        //     } else if (sourceElement.tagName === "VIDEO") {
        //       sourceElement.onloadedmetadata = () => {
        //         console.log(
        //           "actual source dimensions",
        //           sourceElement.videoWidth,
        //           sourceElement.videoHeight,
        //         )
        //         if (sourceElement.videoWidth > sourceElement.videoHeight) {
        //           arContext.arToolkitContext.arController.orientation = "landscape"
        //           arContext.arToolkitContext.arController.options.orientation = "landscape"
        //         } else {
        //           arContext.arToolkitContext.arController.orientation = "portrait"
        //           arContext.arToolkitContext.arController.options.orientation = "portrait"
        //         }
        //         if (onCameraStreamReady) {
        //           onCameraStreamReady()
        //         }
        //         onResize()
        //       }
        //     }
      }, onCameraStreamError)
    })
    // window.addEventListener("resize", onResize)
    // return onUnmount
  }, [arContext, camera, events, onCameraStreamReady, onCameraStreamError, onResize, onUnmount])

  useFrame(() => {
    if (!tracking) {
      return
    }

    // console.log(scene) //todo check this if updated

    // console.log(pointer)

    // const intersects = raycaster.intersectObjects(scene.children)
    // console.log("intersects", intersects)

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
