/// <reference types="vite/client" />
/// <reference types="node" />

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare global {
  interface ImportMetaEnv {
    VITE_API_URL: string;
  }
}

export { };
