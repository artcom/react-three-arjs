# @artcom/react-three-arjs (DRAFT)

React components and hooks for creating [AR.js](https://github.com/AR-js-org/AR.js) applications with [react-three-fiber](https://github.com/pmndrs/react-three-fiber)


```
npm install @artcom/react-three-arjs
```

```
Example GIFSs
```

## Usage

### ARCanvas

```jsx
<ARCanvas
  children              // regular children
  arEnabled             // if false, it will render children into <Canvas /> without AR context
  contextParams={ {   
    patternRatio,       // passed to arToolkit context
    matrixCodeType      // passed to arToolkit context
  } } 
/>
```

### ARMarker

```jsx
<ARMarker
  children              // regular children
  type                  // arToolkit marker type, "barcode" or "pattern"
  barcodeValue          // if type="barcode", its algorithmic value
  patternUrl            // if type="pattern", a link to its pattern file
  params                // object which accepts all marker settings¹
  onMarkerFound         // callback which will be invoked when marker has been found
  onMarkerLost          // callback which will be invoked when previously found marker has been lost
/>
```

¹https://ar-js-org.github.io/AR.js-Docs/marker-based/#api-reference-for-marker-based)[

## ToDos

- [ ] use jsartoolkit instead of ar.js
- [ ] todo -> handle ar.js global import and dat file
- [ ] handle arjs requires three as global import
- [ ] Add example
- [ ] Add gifs
- [ ] complete readme
- [ ] CI Build
