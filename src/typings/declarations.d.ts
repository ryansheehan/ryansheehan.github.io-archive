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