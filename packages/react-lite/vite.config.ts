/// <reference types="vitest" />

import * as path from 'path'
import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// 使用vite4 中新支持的roollup3 和 swc
import react from '@vitejs/plugin-react-swc'
//文件路由
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
//click to component
export default defineConfig({
  resolve:{
    alias: {
      '~/': `${path.resolve(__dirname,'src')}/`,
    }
  },
  plugins: [
    react(),
    Unocss(),
    Pages({
      exclude: ['**/components/*.tsx'],
    }),
  ],
  test: {
    environment: 'jsdom',
    include: ['test/**/*.test.{ts,js}'],
  }
})