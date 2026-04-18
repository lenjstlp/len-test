<template>
  <section
    class="python-guide-page grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]"
  >
    <aside>
      <div class="sticky top-6">
        <div class="surface-panel python-guide-panel rounded-[7px] p-4 lg:p-5">
          <div class="mb-4 px-2">
            <p class="text-xs tracking-[0.28em] text-emerald-300 uppercase">
              Python Guide
            </p>
            <h2 class="mt-2 text-xl font-semibold text-white">
              Python 学习路线
            </h2>
            <p class="mt-2 text-sm leading-6 text-slate-400">
              面向 agent 开发的 Python 入门到工程实践。
            </p>
          </div>

          <div class="space-y-2">
            <button
              v-for="chapter in pythonGuideChapters"
              :key="chapter.id"
              type="button"
              class="w-full rounded-2xl border px-4 py-4 text-left transition"
              :class="
                chapter.id === activeChapter.id
                  ? 'border-emerald-400/25 bg-emerald-400/12 text-white'
                  : 'border-white/10 bg-white/4 text-slate-300 hover:border-white/15 hover:bg-white/8'
              "
              @click="activeChapterId = chapter.id"
            >
              <p class="text-sm font-medium">{{ chapter.label }}</p>
              <p class="mt-2 text-xs leading-5 text-slate-400">
                {{ chapter.description }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <article class="surface-panel python-guide-panel rounded-[7px] p-6 lg:p-8">
      <header class="border-b border-white/10 pb-6">
        <span
          class="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1 text-xs tracking-[0.28em] text-emerald-300 uppercase"
        >
          Python for Agents
        </span>
        <h1 class="mt-4 text-3xl font-semibold tracking-tight text-white">
          {{ activeChapter.label }}
        </h1>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-300 lg:text-base">
          {{ activeChapter.description }}
        </p>
        <div
          class="mt-5 rounded-3xl border border-white/10 bg-slate-950/35 px-5 py-4"
        >
          <p class="text-xs tracking-[0.28em] text-slate-400 uppercase">
            学完结果
          </p>
          <p class="mt-2 text-sm leading-7 text-slate-200">
            {{ activeChapter.outcome }}
          </p>
        </div>
      </header>

      <div class="mt-8 space-y-8">
        <section
          v-for="section in activeChapter.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-28 rounded-[7px] border border-white/10 bg-slate-950/34 px-5 py-5 lg:px-6"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="max-w-3xl">
              <h3 class="text-xl font-semibold text-white">
                {{ section.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-slate-300">
                {{ section.summary }}
              </p>
            </div>
            <a
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400 transition hover:border-emerald-400/20 hover:text-emerald-200"
              :href="`#${section.id}`"
            >
              # 定位
            </a>
          </div>

          <ul
            v-if="section.bullets?.length"
            class="mt-5 space-y-3 text-sm leading-7 text-slate-200"
          >
            <li
              v-for="bullet in section.bullets"
              :key="bullet"
              class="rounded-2xl border border-white/8 bg-white/4 px-4 py-3"
            >
              {{ bullet }}
            </li>
          </ul>

          <div
            v-if="section.callout"
            class="mt-5 rounded-2xl border border-emerald-300/15 bg-emerald-300/10 px-4 py-4 text-sm leading-7 text-emerald-50"
          >
            {{ section.callout }}
          </div>

          <pre
            v-if="section.code"
            class="mt-5 overflow-x-auto rounded-[7px] border border-slate-800 bg-[#020617] px-4 py-4 text-sm leading-7 text-slate-200"
          ><code>{{ section.code }}</code></pre>
        </section>
      </div>
    </article>

    <aside class="surface-panel python-guide-panel rounded-[7px] p-4 lg:p-5">
      <div class="sticky top-6">
        <div class="mb-4 px-2">
          <p class="text-xs tracking-[0.28em] text-slate-400 uppercase">
            当前目录
          </p>
          <p class="mt-2 text-sm leading-6 text-slate-300">
            当前 tab 的 Python 章节目录，便于快速跳转到具体知识点。
          </p>
        </div>

        <nav class="space-y-2">
          <a
            v-for="section in activeChapter.sections"
            :key="section.id"
            class="block rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm leading-6 text-slate-200 transition hover:border-emerald-400/20 hover:bg-emerald-400/10"
            :href="`#${section.id}`"
          >
            <p class="font-medium">{{ section.title }}</p>
            <p class="mt-1 text-xs text-slate-400">
              {{ section.summary }}
            </p>
          </a>
        </nav>
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { pythonGuideChapters } from '@/data/pythonGuide';

const activeChapterId = ref(pythonGuideChapters[0]?.id ?? '');

const activeChapter = computed(
  () =>
    pythonGuideChapters.find(
      (chapter) => chapter.id === activeChapterId.value,
    ) ?? pythonGuideChapters[0],
);
</script>

<style scoped>
.python-guide-page .python-guide-panel {
  background:
    radial-gradient(circle at top, rgba(192, 168, 114, 0.12), transparent 40%),
    linear-gradient(180deg, rgba(24, 29, 23, 0.96), rgba(14, 19, 15, 0.95));
  border: 1px solid rgba(153, 145, 111, 0.16);
  box-shadow: 0 24px 56px rgba(8, 12, 8, 0.28);
}
</style>
