import { Props } from '@react-three/fiber/dist/declarations/src/web/Canvas';

export interface ARCanvasProps extends Props {
  arEnabled: boolean;
  tracking: boolean;
  patternRatio: number;
  detectionMode: string;
  cameraParametersUrl: string;
  matrixCodeType: string;
  sourceType: string;
  onCameraStreamReady: () => void;
  onCameraStreamError: () => void;
}

export interface ARMarkerProps extends React.PropsWithChildren {
  type: string;
  barcodeValue: string;
  patternUrl: string;
  params: Object;
  onMarkerFound: () => void;
  onMarkerLost: () => void;
}

export declare function ARCanvas(props: ARCanvasProps): JSX.Element;

export declare function ARMarker(props: ARMarkerProps): JSX.Element;
