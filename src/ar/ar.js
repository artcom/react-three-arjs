import React, { createContext, useCallback, useEffect, useMemo } from "react"
import { useFrame, useThree } from "react-three-fiber"

const ARContext = createContext({})

const AR = ({ children, contextParams }) => {
  const { gl, camera } = useThree()

  const arContext = useMemo(() => {
    const arToolkitSource = new THREEx.ArToolkitSource({ sourceType: "webcam" })
    const arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: "data/camera_para.dat",
      detectionMode: "mono_and_matrix",
      ...contextParams
    })

    return { arToolkitContext, arToolkitSource }
  }, [contextParams])

  const onResize = useCallback(() => {
    const { arToolkitContext, arToolkitSource } = arContext

    arToolkitSource.onResizeElement()
    arToolkitSource.copyElementSizeTo(gl.domElement)
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
    }
  }, [gl, arContext])

  useEffect(() => {
    arContext.arToolkitSource.init(() => {
      const video = document.querySelector("#arjs-video")
      video.onloadedmetadata = onResize
    })

    arContext.arToolkitContext.init(() =>
      camera.projectionMatrix.copy(arContext.arToolkitContext.getProjectionMatrix())
    )

    window.addEventListener("resize", onResize)

    return () => window.removeEventListener("resize", onResize)
  }, [arContext, camera, onResize])

  useFrame(() => {
    if (arContext.arToolkitSource && arContext.arToolkitSource.ready !== false) {
      arContext.arToolkitContext.update(arContext.arToolkitSource.domElement)
    }
  })

  const value = React.useMemo(() => ({ arToolkitContext: arContext.arToolkitContext }), [arContext])

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
