// Have to include "dom" in "lib" first
// also have to mark this file as a moduel by exporting something
export {};
declare global {
  function myGlobalFunc(): boolean;

  // using interface merging to add additional properties to window object
  interface Window {
    greet(): void;
  }

  // override NodeJS
  namespace NodeJS {
    interface ProcessEnv {
      HOST_URL: string;
    }
  }
}
globalThis.myGlobalFunc = () => true;

myGlobalFunc();
// Avoid using global if possible

window.greet = () => {
  console.log('Hi user');
};

process.env.HOST_URL;
