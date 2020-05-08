declare const __PATH_PREFIX__: string;
declare const graphql: (query: TemplateStringsArray) => void;
declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}
