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

export declare function ARCanvas({ arEnabled, tracking, patternRatio, detectionMode, cameraParametersUrl, matrixCodeType, sourceType, onCameraStreamReady, onCameraStreamError, ...rest }: ARCanvasProps): JSX.Element;

export declare function ARMarker({ type, barcodeValue, patternUrl, params, onMarkerFound, onMarkerLost}: ARMarkerProps): JSX.Element;
