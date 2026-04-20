<template>
  <section
    class="vue3-source-guide-page grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]"
  >
    <aside>
      <div class="sticky top-6">
        <div
          class="surface-panel vue3-source-guide-panel rounded-[7px] p-4 lg:p-5"
        >
          <div class="mb-4 px-2">
            <p class="text-xs tracking-[0.28em] text-[#9ab0c7] uppercase">
              Vue 3 Source
            </p>
            <h2 class="mt-2 text-xl font-semibold text-white">Vue3 源码讲解</h2>
            <p class="mt-2 text-sm leading-6 text-[#b3bfd0]">
              面向只懂 JavaScript
              的读者，从响应式、组件实例、渲染器到编译器，建立真正能读懂 Vue 3
              源码的路径。
            </p>
          </div>

          <div class="space-y-2">
            <button
              v-for="chapter in vue3SourceGuideChapters"
              :key="chapter.id"
              type="button"
              class="w-full rounded-2xl border px-4 py-4 text-left transition"
              :class="
                chapter.id === activeChapter.id
                  ? 'border-sky-300/22 bg-sky-300/10 text-white'
                  : 'border-white/8 bg-white/[0.03] text-[#d3dae4] hover:border-white/14 hover:bg-white/[0.06]'
              "
              @click="setActiveChapterId(chapter.id)"
            >
              <p class="text-sm font-medium">{{ chapter.label }}</p>
              <p class="mt-2 text-xs leading-5 text-[#9aa8b8]">
                {{ chapter.description }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <article
      class="surface-panel vue3-source-guide-panel rounded-[7px] p-6 lg:p-8"
    >
      <header class="border-b border-white/8 pb-6">
        <span
          class="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-1 text-xs tracking-[0.28em] text-[#b8d8ff] uppercase"
        >
          JavaScript to Vue Core
        </span>
        <h1 class="mt-4 text-3xl font-semibold tracking-tight text-white">
          {{ activeChapter.label }}
        </h1>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-[#c4cfdb] lg:text-base">
          {{ activeChapter.description }}
        </p>
        <div
          class="mt-5 rounded-[7px] border border-white/8 bg-[#09111d] px-5 py-4"
        >
          <p class="text-xs tracking-[0.28em] text-[#8694a6] uppercase">
            学完结果
          </p>
          <p class="mt-2 text-sm leading-7 text-[#e9eef5]">
            {{ activeChapter.outcome }}
          </p>
        </div>
      </header>

      <div class="mt-8 space-y-8">
        <section
          v-for="section in activeChapter.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-28 rounded-[7px] border border-white/8 bg-[#08111b]/86 px-5 py-5 lg:px-6"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="max-w-3xl">
              <h3 class="text-xl font-semibold text-white">
                {{ section.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[#c4cfdb]">
                {{ section.summary }}
              </p>
            </div>
            <a
              class="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-[#8d9cad] transition hover:border-sky-300/20 hover:text-[#d8ebff]"
              :href="`#${section.id}`"
            >
              # 定位
            </a>
          </div>

          <ul
            v-if="section.bullets?.length"
            class="mt-5 space-y-3 text-sm leading-7 text-[#e6ebf2]"
          >
            <li
              v-for="bullet in section.bullets"
              :key="bullet"
              class="rounded-[7px] border border-white/6 bg-white/[0.035] px-4 py-3"
            >
              {{ bullet }}
            </li>
          </ul>

          <div
            v-if="section.callout"
            class="mt-5 rounded-[7px] border border-sky-300/14 bg-sky-300/8 px-4 py-4 text-sm leading-7 text-[#eef6ff]"
          >
            {{ section.callout }}
          </div>

          <pre
            v-if="section.code"
            class="mt-5 overflow-x-auto rounded-[7px] border border-white/8 bg-[#03070d] px-4 py-4 text-sm leading-7 text-[#f3f7fb]"
          ><code>{{ section.code }}</code></pre>
        </section>
      </div>
    </article>

    <aside
      class="surface-panel vue3-source-guide-panel rounded-[7px] p-4 lg:p-5"
    >
      <div class="sticky top-6">
        <div class="mb-4 px-2">
          <p class="text-xs tracking-[0.28em] text-[#7f8ea1] uppercase">
            当前目录
          </p>
          <p class="mt-2 text-sm leading-6 text-[#b3bfd0]">
            当前章节的源码知识点目录，便于快速回看概念和示例。
          </p>
        </div>

        <nav class="space-y-2">
          <a
            v-for="section in activeChapter.sections"
            :key="section.id"
            class="block rounded-[7px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-[#e6ebf2] transition hover:border-sky-300/20 hover:bg-sky-300/8"
            :href="`#${section.id}`"
          >
            <p class="font-medium">{{ section.title }}</p>
            <p class="mt-1 text-xs text-[#94a2b4]">
              {{ section.summary }}
            </p>
          </a>
        </nav>
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { useGuideChapterRoute } from '@/composables/useGuideChapterRoute';
import { vue3SourceGuideChapters } from '@/data/vue3SourceGuide';

const { activeChapter, setActiveChapterId } = useGuideChapterRoute(
  vue3SourceGuideChapters,
);
</script>

<style scoped>
.vue3-source-guide-page .vue3-source-guide-panel {
  background:
    radial-gradient(circle at top, rgba(118, 182, 255, 0.1), transparent 38%),
    linear-gradient(180deg, rgba(10, 16, 26, 0.96), rgba(5, 10, 18, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 56px rgba(2, 6, 12, 0.28);
}
</style>
