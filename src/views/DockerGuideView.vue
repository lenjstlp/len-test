<template>
  <section
    class="docker-guide-page grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]"
  >
    <aside>
      <div class="sticky top-6">
        <div class="surface-panel docker-guide-panel rounded-[7px] p-4 lg:p-5">
          <div class="mb-4 px-2">
            <p class="text-xs tracking-[0.28em] text-[#9dc5d7] uppercase">
              Docker Guide
            </p>
            <h2 class="mt-2 text-xl font-semibold text-white">Docker 学习</h2>
            <p class="mt-2 text-sm leading-6 text-[#b4c5cf]">
              从基础概念、常用命令到前后端项目部署，建立独立使用 Docker
              的完整能力。
            </p>
          </div>

          <div class="space-y-2">
            <button
              v-for="chapter in dockerGuideChapters"
              :key="chapter.id"
              type="button"
              class="w-full rounded-2xl border px-4 py-4 text-left transition"
              :class="
                chapter.id === activeChapter.id
                  ? 'border-[#8ac5e0]/24 bg-[#8ac5e0]/10 text-white'
                  : 'border-white/10 bg-white/4 text-slate-300 hover:border-white/15 hover:bg-white/8'
              "
              @click="setActiveChapterId(chapter.id)"
            >
              <p class="text-sm font-medium">{{ chapter.label }}</p>
              <p class="mt-2 text-xs leading-5 text-[#9cadb7]">
                {{ chapter.description }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <article class="surface-panel docker-guide-panel rounded-[7px] p-6 lg:p-8">
      <header class="border-b border-white/10 pb-6">
        <span
          class="inline-flex rounded-full border border-[#8ac5e0]/25 bg-[#8ac5e0]/10 px-4 py-1 text-xs tracking-[0.28em] text-[#9fdcf7] uppercase"
        >
          Docker Deployment
        </span>
        <h1 class="mt-4 text-3xl font-semibold tracking-tight text-white">
          {{ activeChapter.label }}
        </h1>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-[#d0dbe2] lg:text-base">
          {{ activeChapter.description }}
        </p>
        <div
          class="mt-5 rounded-3xl border border-white/10 bg-[#10161a] px-5 py-4"
        >
          <p class="text-xs tracking-[0.28em] text-[#81919c] uppercase">
            学完结果
          </p>
          <p class="mt-2 text-sm leading-7 text-[#eff5f8]">
            {{ activeChapter.outcome }}
          </p>
        </div>
      </header>

      <div class="mt-8 space-y-8">
        <section
          v-for="section in activeChapter.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-28 rounded-[7px] border border-white/10 bg-[#0b1014]/86 px-5 py-5 lg:px-6"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="max-w-3xl">
              <h3 class="text-xl font-semibold text-white">
                {{ section.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[#cfd9e0]">
                {{ section.summary }}
              </p>
            </div>
            <a
              class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#92a2ad] transition hover:border-[#8ac5e0]/20 hover:text-[#b4e5ff]"
              :href="`#${section.id}`"
            >
              # 定位
            </a>
          </div>

          <ul
            v-if="section.bullets?.length"
            class="mt-5 space-y-3 text-sm leading-7 text-[#edf4f8]"
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
            class="mt-5 rounded-2xl border border-[#8ac5e0]/14 bg-[#8ac5e0]/10 px-4 py-4 text-sm leading-7 text-[#ebf8ff]"
          >
            {{ section.callout }}
          </div>

          <pre
            v-if="section.code"
            class="mt-5 overflow-x-auto rounded-[7px] border border-slate-800 bg-[#04070a] px-4 py-4 text-sm leading-7 text-slate-200"
          ><code>{{ section.code }}</code></pre>
        </section>
      </div>
    </article>

    <aside class="surface-panel docker-guide-panel rounded-[7px] p-4 lg:p-5">
      <div class="sticky top-6">
        <div class="mb-4 px-2">
          <p class="text-xs tracking-[0.28em] text-[#82919b] uppercase">
            当前目录
          </p>
          <p class="mt-2 text-sm leading-6 text-[#bcc9d1]">
            当前 Docker 章节目录，适合按“概念 - 命令 - Dockerfile - Compose -
            部署”顺序查阅。
          </p>
        </div>

        <nav class="space-y-2">
          <a
            v-for="section in activeChapter.sections"
            :key="section.id"
            class="block rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm leading-6 text-[#e8f0f4] transition hover:border-[#8ac5e0]/20 hover:bg-[#8ac5e0]/10"
            :href="`#${section.id}`"
          >
            <p class="font-medium">{{ section.title }}</p>
            <p class="mt-1 text-xs text-[#96a7b1]">
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
import { dockerGuideChapters } from '@/data/dockerGuide';

const { activeChapter, setActiveChapterId } =
  useGuideChapterRoute(dockerGuideChapters);
</script>

<style scoped>
.docker-guide-page .docker-guide-panel {
  background:
    radial-gradient(circle at top, rgba(106, 177, 212, 0.12), transparent 40%),
    linear-gradient(180deg, rgba(18, 24, 29, 0.96), rgba(10, 13, 16, 0.95));
  border: 1px solid rgba(138, 197, 224, 0.16);
  box-shadow: 0 24px 56px rgba(6, 10, 13, 0.28);
}
</style>
