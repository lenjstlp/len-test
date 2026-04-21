<template>
  <section
    class="algorithm-guide-page grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]"
  >
    <aside>
      <div class="sticky top-6">
        <div
          class="surface-panel algorithm-guide-panel rounded-[7px] p-4 lg:p-5"
        >
          <div class="mb-4 px-2">
            <p class="text-xs tracking-[0.28em] text-[#f0c67d] uppercase">
              Algorithm Guide
            </p>
            <h2 class="mt-2 text-xl font-semibold text-white">算法题</h2>
            <p class="mt-2 text-sm leading-6 text-[#b8b6b0]">
              按 LeetCode 顺序逐题补充，用经典题建立刷题时真正有用的解题框架。
            </p>
          </div>

          <div class="space-y-2">
            <button
              v-for="chapter in algorithmGuideChapters"
              :key="chapter.id"
              type="button"
              class="w-full rounded-2xl border px-4 py-3 text-left transition"
              :class="
                chapter.id === activeChapter.id
                  ? 'border-[#f0c67d]/24 bg-[#f0c67d]/10 text-white'
                  : 'border-white/8 bg-white/[0.03] text-[#d0ccc3] hover:border-white/14 hover:bg-white/[0.06]'
              "
              @click="setActiveChapterId(chapter.id)"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm leading-5 font-medium">{{ chapter.label }}</p>
                <span
                  class="inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[11px] leading-none"
                  :class="
                    chapter.difficulty === '简单'
                      ? 'border-emerald-300/18 bg-emerald-300/10 text-emerald-200'
                      : chapter.difficulty === '中等'
                        ? 'border-amber-300/18 bg-amber-300/10 text-amber-200'
                        : 'border-rose-300/18 bg-rose-300/10 text-rose-200'
                  "
                >
                  {{ chapter.difficulty }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <article
      class="surface-panel algorithm-guide-panel rounded-[7px] p-6 lg:p-8"
    >
      <header class="border-b border-white/8 pb-6">
        <span
          class="inline-flex rounded-full border border-[#f0c67d]/18 bg-[#f0c67d]/8 px-4 py-1 text-xs tracking-[0.28em] text-[#f0c67d] uppercase"
        >
          LeetCode Practice
        </span>
        <h1 class="mt-4 text-3xl font-semibold tracking-tight text-white">
          {{ activeChapter.label }}
        </h1>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-[#c8c3bb] lg:text-base">
          {{ activeChapter.description }}
        </p>
        <div
          class="mt-5 rounded-3xl border border-white/8 bg-[#11100e] px-5 py-4"
        >
          <p class="text-xs tracking-[0.28em] text-[#8b8478] uppercase">
            学完结果
          </p>
          <p class="mt-2 text-sm leading-7 text-[#f2eee5]">
            {{ activeChapter.outcome }}
          </p>
        </div>
      </header>

      <div class="mt-8 space-y-8">
        <section
          v-for="section in activeChapter.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-28 rounded-[7px] border border-white/8 bg-[#100f0d]/86 px-5 py-5 lg:px-6"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="max-w-3xl">
              <h3 class="text-xl font-semibold text-white">
                {{ section.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[#c8c3bb]">
                {{ section.summary }}
              </p>
            </div>
            <a
              class="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-[#9e9689] transition hover:border-[#f0c67d]/18 hover:text-[#f0c67d]"
              :href="`#${section.id}`"
            >
              # 定位
            </a>
          </div>

          <ul
            v-if="section.bullets?.length"
            class="mt-5 space-y-3 text-sm leading-7 text-[#ece8df]"
          >
            <li
              v-for="bullet in section.bullets"
              :key="bullet"
              class="rounded-2xl border border-white/6 bg-white/[0.035] px-4 py-3"
            >
              {{ bullet }}
            </li>
          </ul>

          <div
            v-if="section.callout"
            class="mt-5 rounded-2xl border border-[#f0c67d]/12 bg-[#f0c67d]/8 px-4 py-4 text-sm leading-7 text-[#f7ecd4]"
          >
            {{ section.callout }}
          </div>

          <pre
            v-if="section.code"
            class="mt-5 overflow-x-auto rounded-[7px] border border-white/8 bg-[#070605] px-4 py-4 text-sm leading-7 text-[#f2efe7]"
          ><code>{{ section.code }}</code></pre>
        </section>
      </div>
    </article>

    <aside class="surface-panel algorithm-guide-panel rounded-[7px] p-4 lg:p-5">
      <div class="sticky top-6">
        <div class="mb-4 px-2">
          <p class="text-xs tracking-[0.28em] text-[#8b8478] uppercase">
            当前目录
          </p>
          <p class="mt-2 text-sm leading-6 text-[#b8b2a8]">
            当前题解的拆解目录，按“题意 - 思路 - 代码 - 易错点”顺序阅读即可。
          </p>
        </div>

        <nav class="space-y-2">
          <a
            v-for="section in activeChapter.sections"
            :key="section.id"
            class="block rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-[#e9e4da] transition hover:border-[#f0c67d]/18 hover:bg-[#f0c67d]/8"
            :href="`#${section.id}`"
          >
            <p class="font-medium">{{ section.title }}</p>
            <p class="mt-1 text-xs text-[#9a9388]">
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
import { algorithmGuideChapters } from '@/data/algorithmGuide';

const { activeChapter, setActiveChapterId } = useGuideChapterRoute(
  algorithmGuideChapters,
);
</script>

<style scoped>
.algorithm-guide-page .algorithm-guide-panel {
  background:
    linear-gradient(180deg, rgba(22, 20, 17, 0.96), rgba(12, 11, 9, 0.95)),
    radial-gradient(circle at top, rgba(240, 198, 125, 0.08), transparent 42%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 56px rgba(7, 6, 4, 0.28);
}
</style>
