import type { DetailedHTMLProps, HTMLAttributes } from 'react';

/**
 * <model-viewer> is a custom element registered at runtime from the locally
 * bundled @google/model-viewer package. Only the attributes this playground
 * actually uses are typed.
 */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          poster?: string;
          'camera-orbit'?: string;
          'min-camera-orbit'?: string;
          'max-camera-orbit'?: string;
          'camera-target'?: string;
          'field-of-view'?: string;
          'min-field-of-view'?: string;
          'max-field-of-view'?: string;
          'interaction-prompt'?: string;
          'shadow-intensity'?: string;
          'environment-image'?: string;
          exposure?: string;
          'camera-controls'?: boolean | string;
          'disable-zoom'?: boolean | string;
          'disable-pan'?: boolean | string;
          'disable-tap'?: boolean | string;
          'touch-action'?: string;
          'auto-rotate'?: boolean | string;
          loading?: string;
          reveal?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
