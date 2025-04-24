declare module '*.json' {
  const value: { [key: string]: string };
  export default value;
}

declare module '*.eot';
declare module '*.ttf';
declare module '*.woff';

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.ico' {
  const content: any;
  export default content;
}

declare module '*.txt' {
  const content: string;
  export default content;
}

declare module '*.mp3' {
  const content: string;
  export default content;
}
