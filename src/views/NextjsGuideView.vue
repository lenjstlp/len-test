<template>
  <section
    class="nextjs-guide-page grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]"
  >
    <aside>
      <div class="sticky top-6">
        <div class="surface-panel nextjs-guide-panel rounded-[7px] p-4 lg:p-5">
          <div class="mb-4 px-2">
            <p class="text-xs tracking-[0.28em] text-[#d5d7db] uppercase">
              Next.js Guide
            </p>
            <h2 class="mt-2 text-xl font-semibold text-white">Next.js 入门</h2>
            <p class="mt-2 text-sm leading-6 text-[#a7abb3]">
              从 App Router 到 Server Actions，建立现代 Next.js 开发认知。
            </p>
          </div>

          <div class="space-y-2">
            <button
              v-for="chapter in nextjsGuideChapters"
              :key="chapter.id"
              type="button"
              class="w-full rounded-2xl border px-4 py-4 text-left transition"
              :class="
                chapter.id === activeChapter.id
                  ? 'border-white/18 bg-white/10 text-white'
                  : 'border-white/8 bg-white/[0.03] text-[#c7ccd4] hover:border-white/14 hover:bg-white/[0.06]'
              "
              @click="setActiveChapterId(chapter.id)"
            >
              <p class="text-sm font-medium">{{ chapter.label }}</p>
              <p class="mt-2 text-xs leading-5 text-[#9197a0]">
                {{ chapter.description }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <article class="surface-panel nextjs-guide-panel rounded-[7px] p-6 lg:p-8">
      <header class="border-b border-white/8 pb-6">
        <span
          class="inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-1 text-xs tracking-[0.28em] text-[#d5d7db] uppercase"
        >
          App Router to Fullstack
        </span>
        <h1 class="mt-4 text-3xl font-semibold tracking-tight text-white">
          {{ activeChapter.label }}
        </h1>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-[#b5bbc5] lg:text-base">
          {{ activeChapter.description }}
        </p>
        <div
          class="mt-5 rounded-3xl border border-white/8 bg-[#0b0c0e] px-5 py-4"
        >
          <p class="text-xs tracking-[0.28em] text-[#7b828c] uppercase">
            学完结果
          </p>
          <p class="mt-2 text-sm leading-7 text-[#e7e8ea]">
            {{ activeChapter.outcome }}
          </p>
        </div>
      </header>

      <div class="mt-8 space-y-8">
        <section
          v-for="section in activeChapter.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-28 rounded-[7px] border border-white/8 bg-[#0b0c0e]/84 px-5 py-5 lg:px-6"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="max-w-3xl">
              <h3 class="text-xl font-semibold text-white">
                {{ section.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[#b5bbc5]">
                {{ section.summary }}
              </p>
            </div>
            <a
              class="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-[#8f96a0] transition hover:border-white/14 hover:text-white"
              :href="`#${section.id}`"
            >
              # 定位
            </a>
          </div>

          <ul
            v-if="section.bullets?.length"
            class="mt-5 space-y-3 text-sm leading-7 text-[#e3e5e8]"
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
            class="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-sm leading-7 text-[#f4f5f6]"
          >
            {{ section.callout }}
          </div>

          <pre
            v-if="section.code"
            class="mt-5 overflow-x-auto rounded-[7px] border border-white/8 bg-[#050607] px-4 py-4 text-sm leading-7 text-[#f2f3f4]"
          ><code>{{ section.code }}</code></pre>
        </section>
      </div>
    </article>

    <aside class="surface-panel nextjs-guide-panel rounded-[7px] p-4 lg:p-5">
      <div class="sticky top-6">
        <div class="mb-4 px-2">
          <p class="text-xs tracking-[0.28em] text-[#7b828c] uppercase">
            当前目录
          </p>
          <p class="mt-2 text-sm leading-6 text-[#aeb4bd]">
            当前 tab 的 Next.js 知识目录，便于快速跳转和复习。
          </p>
        </div>

        <nav class="space-y-2">
          <a
            v-for="section in activeChapter.sections"
            :key="section.id"
            class="block rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-[#e4e6e8] transition hover:border-white/14 hover:bg-white/[0.06]"
            :href="`#${section.id}`"
          >
            <p class="font-medium">{{ section.title }}</p>
            <p class="mt-1 text-xs text-[#8f96a0]">
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
import { nextjsGuideChapters } from '@/data/nextjsGuide';

const { activeChapter, setActiveChapterId } =
  useGuideChapterRoute(nextjsGuideChapters);
</script>

<style scoped>
.nextjs-guide-page .nextjs-guide-panel {
  background:
    linear-gradient(180deg, rgba(17, 19, 23, 0.96), rgba(10, 11, 14, 0.94)),
    radial-gradient(circle at top, rgba(255, 255, 255, 0.04), transparent 42%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.28);
}
</style>
