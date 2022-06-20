import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import styles from 'rollup-plugin-styles'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

const configuration = {
  input: ['src/index.ts'],

  output: [{
    format: 'esm',
    exports: 'named',
    dir: 'dist',
    assetFileNames: '[name][extname]',
    entryFileNames: '[name].js',
    globals: {
      vue: 'Vue',
    },
  }],

  external: ['@cmath10/calendar-core', 'vue'],

  plugins: [
    typescript(),
    vue(),
    alias({
      entries: [{ find: /^@\/(.+)/, replacement: './$1' }],
    }),
    styles({ mode: 'extract' }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    }),
    commonjs(),
  ]
}

// noinspection JSUnusedGlobalSymbols
export default [{
  ...configuration,

  output: [{
    format: 'esm',
    exports: 'named',
    dir: 'dist',
    assetFileNames: 'calendar-vue3[extname]',
    entryFileNames: 'calendar-vue3.esm.js',
    globals: {
      vue: 'Vue',
    },
  }],
}, {
  ...configuration,

  output: [{
    format: 'cjs',
    exports: 'named',
    dir: 'dist',
    assetFileNames: 'calendar-vue3[extname]',
    entryFileNames: 'calendar-vue3.common.js',
    globals: {
      vue: 'Vue',
    },
  }],
}]
