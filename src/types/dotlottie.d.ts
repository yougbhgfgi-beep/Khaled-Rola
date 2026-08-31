import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': any
    }
  }
}
