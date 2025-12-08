<template>
  <!-- 使用 Web Component - 零依赖 -->
  <canvas-drawing-editor
    :title="editorTitle"
    :show-minimap="String(showMinimap)"
    :show-zoom="String(showZoom)"
    :show-pencil="String(showPencil)"
    class="editor"
  ></canvas-drawing-editor>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 配置项
const editorTitle = ref('Vue3 画板');
const showMinimap = ref(true);
const showZoom = ref(true);
const showPencil = ref(true);

// 事件处理
const handleEditorChange = (e: CustomEvent) => {
  console.log('画布内容变化:', e.detail.objects);
};

onMounted(() => {
  // 监听 Web Component 事件
  document.addEventListener('editor-change', handleEditorChange as EventListener);
});

onUnmounted(() => {
  // 清理事件监听
  document.removeEventListener('editor-change', handleEditorChange as EventListener);
});
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>
