import typescript from 'rollup-plugin-typescript2'

export default [{
  input: ['src/index.ts'],
  output: [{
    format: 'esm',
    exports: 'named',
    dir: 'dist',
    entryFileNames: 'calendar-core.esm.js',
  }],
  plugins: [
    typescript(),
  ]
}, {
  input: ['src/index.ts'],
  output: [{
    format: 'cjs',
    exports: 'named',
    dir: 'dist',
    entryFileNames: 'calendar-core.common.js',
  }],
  plugins: [
    typescript(),
  ]
}]
