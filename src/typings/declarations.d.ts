declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.css' {
  
}

declare module '*.svg' {
  const svgComponent: () => any;
  export = svgComponent;
}

declare module 'react-helmet-async' {
  import Helmet from 'react-helmet';
  export = Helmet;
}

declare const __PATH_PREFIX__: string;

declare module 'postprocessing' {
  import { 
    WebGLRenderer, 
    DepthTexture,
    WebGLRenderTarget,
    Scene,
    Camera,
    Material,
    Texture,
    Mesh,
    Uniform,
    Vector2,
    ShaderMaterial,
  } from 'three';

  export enum EffectAttribute {
    CONVOLUTION = 2,
    DEPTH = 1,
    NONE = 0
  };
  export enum BlendFunction {
    SKIP = 0,
    ADD = 1,
    ALPHA = 2,
    AVERAGE = 3,
    COLOR_BURN = 4,
    COLOR_DODGE = 5,
    DARKEN = 6,
    DIFFERENCE = 7,
    EXCLUSION = 8,
    LIGHTEN = 9,
    MULTIPLY = 10,
    DIVIDE = 11,
    NEGATION = 12,
    NORMAL = 13,
    OVERLAY = 14,
    REFLECT = 15,
    SCREEN = 16,
    SOFT_LIGHT = 17,
    SUBTRACT = 18,
  };
  export enum WebGLExtension {
    DERIVATIVES = "derivatives",
    FRAG_DEPTH = "fragDepth",
    DRAW_BUFFERS = "drawBuffers",
    SHADER_TEXTURE_LOD = "shaderTextureLOD"
  }
  export enum KernelSize {
    VERY_SMALL = 0,
    SMALL = 1,
    MEDIUM = 2,
    LARGE = 3,
    VERY_LARGE = 4,
    HUGE = 5
  }
  export enum SMAAPreset {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2,
    ULTRA = 3
  }
  export const AUTO_SIZE = -1;
  export class Pass {
    needsSwap: boolean;
    needsDepthTexture: boolean;
    renderToScreen: boolean;
    enabled: boolean;
    constructor(public name?: string, scene?: Scene, camera?: Camera);
    getFullscreenMaterial(): Material;
    setFullscreenMaterial(material: Material): void;
    getDepthTexture(): Texture;
    setDepthTexture(depthTexture: Texture, depthPacking?: number): void;
    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget, deltaTime: number, stencilTest: boolean): void;
    setSize(width: number, height: number): void;
    initialize(renderer: WebGLRenderer, alpha: boolean): void;
    dispose(): void;
  }

  export class EffectPass extends Pass {
    minTime: number;
    maxTime: number;
    dithering: boolean;
    constructor(camera: Camera, ...effects: Effect[]);
    recompile(): void;
  }

  export class ClearPass extends Pass {
    overrideClearColor: Color | null;
    overrideClearAlpha: number
    constructor(public color?: boolean, public depth?: boolean, public stencil?: boolean);
  }

  export class RenderPass extends Pass {
    constructor(scene: Scene, camera: Camera, public overrideMaterial?: Material | null);
    clear: boolean;
    getClearPass(): ClearPass;
  }

  export class BlurPass extends Pass {
    static AUTO_SIZE: number;
    dithering: boolean;
    kernelSize: KernelSize;
    width: number;
    height: number;
    scale: number;
    constructor(options?: {
      resolutionScale?: number,
      width?: number,
      height?: number,
      kernelSize?: KernelSize,
    });
    getOriginalSize(): Vector2;
    getResolutionScale(): number;
    setResolutionScale(scale: number): void;
  }

  export class ShaderPass extends Pass {
    constructor(material: ShaderMaterial, input?: string);
    setInput(input: string): void;

  }

  export class ColorEdgesMaterial extends ShaderMaterial {
    constructor(texelSize?: Vector2);
    setLocalContrastAdaptationFactor(factor: number);
    setEdgeDetectionThreshold(threshold: number);
  }

  export class SMAAWeightsMaterial extends ShaderMaterial {
    diagonalDetection: boolean;
    cornerRounding: boolean;
    constructor(texelSize?: Vector2, resolution?: Vector2);
    setOrthogonalSearchSteps(steps: number);
    setDiagonalSearchSteps(steps: number);
    setCornerRounding(rounding: number);    
  }

  export class EffectComposer {
    constructor(renderer: WebGLRenderer,  options? :{ depthBuffer: boolean, stencilBuffer: boolean });
    getRenderer(): WebGLRenderer;
    replaceRenderer(renderer: WebGLRenderer, updateDOM?: boolean): WebGLRenderer;
    createDepthTexture(): DepthTexture;
    createBuffer(depthBuffer: boolean, stencilBuffer: boolean): WebGLRenderTarget;
    addPass(pass: Pass, index?: number): void;
    removePass(pass: Pass): void;
    render(deltaTime: number);
    setSize(width: number, height: number, updateStyle?: boolean): void;
    reset(): void;
  }

  export class BlendMode {
    opacity: Uniform;
    constructor(public blendFunction: BlendFunction, opacity?: number);
    getShaderCode(): string;
  }

  export class LuminanceMaterial extends ShaderMaterial {
    colorOutput: boolean;
    useThreshold: boolean;
    useRange: boolean;
    threshold: number;
    smoothing: number;
    constructor(colorOutput?: boolean, luminanceRange?: Vector2 | null);
  }

  export class Effect {
    attributes: EffectAttribute;
    vertexShader: string;
    defines: Map<string, string>;
    uniforms: Map<string, string>;
    extensions: Set<WebGLExtension>;
    blendMode: BlendMode;
    constructor(
      public name: string,
      public fragmentShader: string,
      options?: {
        attributes?: EffectAttribute,
        blendFunction?: BlendFunction,
        defines?: Map<string, string>,
        uniforms?: Map<string, string>,
        extensions?: Set<WebGLExtension>,
        vertexShader?: string,
      }
    );
    setDepthTexture(depthTexture: Texture, depthPacking?: number): void;
    update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, deltaTime: number): void;
    setSize(width: number, height: number): void;
    initialize(renderer: WebGLRenderer, alpha: boolean): void;
    dispose(): void;
  }

  export class SMAAEffect extends Effect {
    static readonly searchImageDataURL: string;
    static readonly areaImageDataURL: string;
    readonly colorEdgesMaterial: ColorEdgesMaterial;
    readonly weightsMaterial: SMAAWeightsMaterial;
    constructor(searchImage: any, areaImage: any, preset?: SMAAPreset);
    setEdgeDetectionThreshold(threshold: number);
    setOrthogonalSearchSteps(steps: number);
    applyPreset(preset: SMAAPreset);
  }

  export class BloomEffect extends Effect {
    blurPass: BlurPass;
    luminancePass: ShaderPass;
    readonly texture: Texture;
    readonly luminanceMaterial: LuminanceMaterial;
    width: number;
    height: number;
    constructor(options?: {
      blendFunction?: BlendFunction,
      luminanceThreshold?: number,
      luminanceSmoothing?: number,
      resolutionScale?: number,
      width?: number,
      height?: number,
      kernelSize?: KernelSize,
    });
  }
}