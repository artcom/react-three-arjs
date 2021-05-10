# @artcom/react-three-arjs

React components and hooks for creating [AR.js](https://github.com/AR-js-org/AR.js) applications with [react-three-fiber](https://github.com/pmndrs/react-three-fiber)


```
npm install github:artcom/react-three-arjs#v0.1.6
```

## Usage

### Example
```jsx
import ReactDOM from "react-dom"
import React from "react"

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"

ReactDOM.render(
  <ARCanvas
    camera={ { position: [0, 0, 0] } }
    dpr={ window.devicePixelRatio }
    onCreated={ ({ gl }) => {
      gl.setSize(window.innerWidth, window.innerHeight)
    } }>
    <ambientLight />
    <pointLight position={ [10, 10, 0] }  />
    <ARMarker
      type={ "pattern" }
      patternUrl={ "data/hiro.patt" }>
      <mesh>
        <boxBufferGeometry args={ [1, 1, 1] } />
        <meshStandardMaterial color={ "green" } />
      </mesh>
    </ARMarker>
  </ARCanvas>,
  document.getElementById("root")
)

```

## API

### ARCanvas

```jsx
<ARCanvas
  children                                        // regular children
  arEnabled                                       // if false, it will render children into <Canvas /> without AR context
  patternRatio = 0.5                              // passed to arToolkit context ¹
  detectionMode = "mono_and_matrix"               // passed to arToolkit context ¹
  cameraParametersUrl = "data/camera_para.dat"    // passed to arToolkit context ¹
  matrixCodeType = "3x3"                          // passed to arToolkit context ¹
  onCameraStreamReady                             // callback which will be invoked when camera stream starts
  onCameraStreamError                             // callback which will be invoked when camera stream fails, e.g.: permissions
  sourceParameters                                // default: sourceParameters = { sourceType: "webcam" }, see ar.js code ²
/>
```

<sup>1</sup> https://ar-js-org.github.io/AR.js-Docs/marker-based/#threejs

<sup>2</sup> https://github.com/AR-js-org/AR.js/blob/00fc2a92af1a756600eb53a57a84f101a2c0435f/three.js/src/threex/threex-artoolkitsource.js#L11-L26

### ARMarker

```jsx
<ARMarker
  children              // regular children
  type                  // arToolkit marker type, "barcode" or "pattern"
  barcodeValue          // if type="barcode", its algorithmic value
  patternUrl            // if type="pattern", a link to its pattern file
  params                // object which accepts all marker settings ³
  onMarkerFound         // callback which will be invoked when marker has been found
  onMarkerLost          // callback which will be invoked when previously found marker has been lost
/>
```

<sup>3</sup> https://ar-js-org.github.io/AR.js-Docs/marker-based/#api-reference-for-marker-based

## AR.js caveats
- AR.js cannot be bundled, since it exposes global variables.
- AR.js context requires [camera_para.dat](https://github.com/AR-js-org/AR.js/blob/master/data/data/camera_para.dat) file.
- Look at the [example](./example) using webpack for bundling.
## ToDos
- [ ] Add example video/gif
- [ ] CI Build
- [ ] Use ar.js as module, depends on https://github.com/AR-js-org/AR.js/pull/116
