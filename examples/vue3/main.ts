import { createApp } from 'vue';
import App from './App.vue';

// 引入 Web Component (npm 安装后使用)
// import 'canvas-drawing-editor';

// 本地开发使用
import '../../src/index';

// 告诉 Vue 忽略 canvas-drawing-editor 自定义元素
const app = createApp(App);

app.config.compilerOptions.isCustomElement = (tag) => {
  return tag === 'canvas-drawing-editor';
};

app.mount('#app');
