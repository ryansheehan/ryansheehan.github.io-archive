declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.svg' {
  const svgComponent: () => any;
  export = svgComponent;
}

declare const __PATH_PREFIX__: string;