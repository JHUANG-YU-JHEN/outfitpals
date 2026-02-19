import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { glob } from 'glob';
import copy from 'rollup-plugin-copy';

import liveReload from 'vite-plugin-live-reload';

const isDev = process.env.NODE_ENV === 'development';
const envBase = process.env.VITE_BASE_PATH;
const defaultBase = '/outfitpals/';
const basePath = isDev ? '/' : envBase ?? defaultBase;

function moveOutputPlugin() {
  return {
    name: 'move-output',
    enforce: 'post',
    apply: 'build',
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith('pages/')) {
          const newFileName = fileName.slice('pages/'.length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

export default defineConfig({
  // base 的寫法：
  // base: '/Repository 的名稱/'
  base: basePath,
  plugins: [
    liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './pages/**/*.html']),
    ViteEjsPlugin((config) => ({
      BASE_URL: config.base ?? basePath,
    })),
    copy({
      targets: [
        {
          src: 'assets/images/**/*',
          dest: 'dist/assets/images',
        },
      ],
      hook: 'writeBundle',
      verbose: false,
    }),
    moveOutputPlugin(),
  ],
  server: {
    // 啟動 server 時預設開啟的頁面
    open: 'pages/index.html',
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync('pages/**/*.html')
          .map((file) => [
            path.relative('pages', file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
    outDir: 'dist',
  },
});
