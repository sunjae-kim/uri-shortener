declare module 'sweetalert2' {
  // Current contents of the file, unchanged
}

declare module 'sweetalert2/dist/sweetalert2.js' {
  export * from 'sweetalert2'
  // "export *" does not matches the default export, so do it explicitly.
  export { default } from 'sweetalert2'
}

declare module 'sweetalert2/dist/sweetalert2.all.js' {
  export * from 'sweetalert2'
  export { default } from 'sweetalert2'
}
