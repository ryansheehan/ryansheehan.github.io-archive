declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare const __PATH_PREFIX__: string;