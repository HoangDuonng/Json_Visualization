/* eslint-disable @typescript-eslint/no-explicit-any */

// CSS/SCSS module declarations
declare module "*.css";
declare module "*.scss";
declare module "*.woff2" {
  const content: string;
  export default content;
}
declare module "*.woff" {
  const content: string;
  export default content;
}
declare module "*.svg" {
  const content: any;
  export default content;
}

// JsonDraw Window extensions
interface Window {
  ClipboardItem: any;
  __JSONDRAW_SHA__: string | undefined;
  JSONDRAW_ASSET_PATH: string | string[] | undefined;
  JSONDRAW_THROTTLE_RENDER: boolean | undefined;
  DEBUG_FRACTIONAL_INDICES: boolean | undefined;
  JSONDRAW_EXPORT_SOURCE: string;
  gtag: Function;
  sa_event: Function;
  fathom: { trackEvent: Function };
}

// CanvasRenderingContext2D polyfill
interface CanvasRenderingContext2D {
  roundRect?: (
    x: number,
    y: number,
    width: number,
    height: number,
    radii:
      | number
      | [number]
      | [number, number]
      | [number, number, number]
      | [number, number, number, number]
  ) => void;
}

interface Clipboard extends EventTarget {
  write(data: any[]): Promise<void>;
}

// PNG encoding/decoding
type TEXtChunk = { name: "tEXt"; data: Uint8Array };

declare module "png-chunk-text" {
  function encode(name: string, value: string): { name: "tEXt"; data: Uint8Array };
  function decode(data: Uint8Array): { keyword: string; text: string };
}
declare module "png-chunks-encode" {
  function encode(chunks: TEXtChunk[]): Uint8Array<ArrayBuffer>;
  export = encode;
}
declare module "png-chunks-extract" {
  function extract(buffer: Uint8Array): TEXtChunk[];
  export = extract;
}

interface Blob {
  handle?: import("browser-fs-access").FileSystemHandle;
  name?: string;
}

// image-blob-reduce
declare module "image-blob-reduce" {
  import type { PicaResizeOptions, Pica } from "pica";
  namespace ImageBlobReduce {
    interface ImageBlobReduce {
      toBlob(file: File, options: ImageBlobReduceOptions): Promise<Blob>;
      _create_blob(
        this: { pica: Pica },
        env: {
          out_canvas: HTMLCanvasElement;
          out_blob: Blob;
        }
      ): Promise<any>;
    }

    interface ImageBlobReduceStatic {
      new (options?: any): ImageBlobReduce;
      (options?: any): ImageBlobReduce;
    }

    interface ImageBlobReduceOptions extends PicaResizeOptions {
      max: number;
    }
  }
  const reduce: ImageBlobReduce.ImageBlobReduceStatic;
  export = reduce;
}

// Vite env shim (mapped via DefinePlugin)
interface ImportMetaEnv {
  DEV: string;
  PROD: string;
  MODE: string;
  PKG_NAME: string;
  PKG_VERSION: string;
  VITE_APP_DISABLE_SENTRY: string;
  VITE_APP_ENABLE_TRACKING: string;
  VITE_APP_LIBRARY_URL: string;
  VITE_APP_LIBRARY_BACKEND: string;
  VITE_APP_BACKEND_V2_GET_URL: string;
  VITE_APP_BACKEND_V2_POST_URL: string;
  VITE_APP_FIREBASE_CONFIG: string;
  VITE_APP_AI_BACKEND: string;
  VITE_APP_PORTAL_URL: string;
  VITE_APP_WS_SERVER_URL: string;
  VITE_WORKER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// pwacompat
declare module "pwacompat" {}

// canvas-roundrect-polyfill
declare module "canvas-roundrect-polyfill" {}
