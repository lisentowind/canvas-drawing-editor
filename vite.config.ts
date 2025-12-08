import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
    // 库模式构建配置
    const isLibBuild = mode === 'lib';

    const baseConfig = {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        ...(isLibBuild ? [dts({
          include: ['src/**/*.ts'],
          outDir: 'dist',
          rollupTypes: true
        })] : [])
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };

    // 库模式额外配置
    if (isLibBuild) {
      return {
        ...baseConfig,
        build: {
          lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'CanvasDrawingEditor',
            formats: ['es', 'umd'],
            fileName: (format) => `canvas-drawing-editor.${format}.js`
          },
          rollupOptions: {
            output: {
              assetFileNames: 'canvas-drawing-editor.[ext]'
            }
          },
          cssCodeSplit: false,
          sourcemap: true
        }
      };
    }

    return baseConfig;
});
