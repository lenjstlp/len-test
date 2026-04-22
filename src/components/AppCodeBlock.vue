<template>
  <div class="app-code-block">
    <div class="app-code-block__bar">
      <div class="app-code-block__dots" aria-hidden="true">
        <span class="app-code-block__dot is-red" />
        <span class="app-code-block__dot is-yellow" />
        <span class="app-code-block__dot is-green" />
      </div>
      <span v-if="title" class="app-code-block__title">{{ title }}</span>
      <span class="app-code-block__lang">{{ displayLanguage }}</span>
    </div>

    <div
      ref="contentRef"
      class="app-code-block__content"
      :class="{ 'is-loading': isLoading }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { renderHighlightedCode } from '@/utils/shiki';

const props = withDefaults(
  defineProps<{
    code: string;
    lang: string;
    title?: string;
  }>(),
  {
    title: '',
  },
);

const highlightedHtml = ref('');
const isLoading = ref(true);
const contentRef = ref<HTMLDivElement | null>(null);

const displayLanguage = computed(() => props.lang.toLowerCase());

const syncHighlightedHtml = () => {
  if (contentRef.value) {
    contentRef.value.innerHTML = highlightedHtml.value;
  }
};

const updateHighlightedHtml = async () => {
  isLoading.value = true;
  highlightedHtml.value = await renderHighlightedCode(props.code, props.lang);
  syncHighlightedHtml();
  isLoading.value = false;
};

watch(() => [props.code, props.lang], updateHighlightedHtml, {
  immediate: true,
});

onMounted(syncHighlightedHtml);
</script>

<style scoped>
.app-code-block {
  overflow: hidden;
  border: 1px solid rgba(54, 71, 89, 0.7);
  border-radius: 7px;
  background: linear-gradient(180deg, #0b1520 0%, #08111a 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.app-code-block__bar {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 38px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
}

.app-code-block__dots {
  display: inline-flex;
  gap: 8px;
}

.app-code-block__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.app-code-block__dot.is-red {
  background: #ff6b7d;
}

.app-code-block__dot.is-yellow {
  background: #f6c760;
}

.app-code-block__dot.is-green {
  background: #52d273;
}

.app-code-block__title {
  font-size: 12px;
  color: rgba(231, 239, 245, 0.76);
}

.app-code-block__lang {
  margin-left: auto;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #90a4b7;
}

.app-code-block__content {
  overflow-x: auto;
  padding: 0;
}

.app-code-block__content.is-loading {
  min-height: 120px;
}

.app-code-block__content :deep(pre) {
  margin: 0;
  padding: 14px 16px;
  background: transparent !important;
  font-size: 13px;
  line-height: 1.75;
  font-family:
    'JetBrains Mono', 'SFMono-Regular', 'SF Mono', Consolas, 'Liberation Mono',
    monospace;
}

.app-code-block__content :deep(code) {
  display: block;
  min-width: max-content;
  font-family: inherit;
}

.app-code-block__content :deep(.line) {
  display: block;
  min-height: 1.75em;
}
</style>
