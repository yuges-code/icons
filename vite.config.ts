import path from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      name: 'icons',
      fileName: 'icons',
      entry: path.resolve(__dirname, 'src/main.ts'),
    },
  },
  plugins: [
    dts({
      outDir: './dist/types',
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
});
