<template>
  <section
    class="fullstack-guide-page overflow-hidden rounded-[36px] border text-slate-900"
  >
    <div class="border-b px-6 py-8 lg:px-10 lg:py-10">
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_360px]">
        <div>
          <span
            class="inline-flex rounded-full border border-[var(--fs-accent-soft)] bg-[var(--fs-accent-fog)] px-4 py-1 text-xs font-medium tracking-[0.24em] text-[var(--fs-accent)] uppercase"
          >
            Fullstack Skill Atlas
          </span>
          <h1
            class="mt-4 text-4xl font-semibold tracking-tight text-[var(--fs-title)]"
          >
            全栈不是“都会一点”，而是能独立交付完整系统
          </h1>
          <p class="mt-4 max-w-4xl text-base leading-8 text-[var(--fs-copy)]">
            这页不是教程章节，而是能力总览。重点回答四个问题：全栈到底分哪些能力域、不同语言和框架适合什么定位、掌握到什么程度能独立承担什么、从前端走向全栈该怎么升级。
          </p>
        </div>

        <div
          class="rounded-[30px] border border-[var(--fs-line)] bg-[var(--fs-card)] p-5"
        >
          <p class="text-xs tracking-[0.24em] text-[var(--fs-muted)] uppercase">
            你会得到什么
          </p>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-[var(--fs-copy)]">
            <li>全栈能力分层，不再把技术栈混成一团。</li>
            <li>不同语言和框架的定位差异。</li>
            <li>每个能力域掌握后能负责什么。</li>
            <li>一条从前端升级到全栈的现实路径。</li>
          </ul>
        </div>
      </div>

      <div class="mt-8 grid gap-4 xl:grid-cols-3">
        <article
          v-for="level in fullstackLevels"
          :key="level.id"
          class="rounded-[28px] border border-[var(--fs-line)] bg-[var(--fs-card)] p-5"
        >
          <p class="text-xs tracking-[0.24em] text-[var(--fs-muted)] uppercase">
            {{ level.role }}
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-[var(--fs-title)]">
            {{ level.title }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-[var(--fs-copy)]">
            {{ level.summary }}
          </p>
          <ul class="mt-5 space-y-3 text-sm leading-7 text-[var(--fs-copy)]">
            <li
              v-for="outcome in level.outcomes"
              :key="outcome"
              class="rounded-2xl border border-[var(--fs-line)] bg-[var(--fs-wash)] px-4 py-3"
            >
              {{ outcome }}
            </li>
          </ul>
        </article>
      </div>
    </div>

    <div
      class="sticky top-0 z-10 border-b border-[var(--fs-line)] bg-[rgba(244,247,244,0.92)] px-6 py-4 backdrop-blur lg:px-10"
    >
      <div class="flex flex-wrap gap-3">
        <a
          v-for="domain in fullstackDomains"
          :key="domain.id"
          class="rounded-full border border-[var(--fs-line)] bg-[var(--fs-card)] px-4 py-2 text-sm font-medium text-[var(--fs-copy)] transition hover:border-[var(--fs-accent)] hover:bg-white"
          :href="`#${domain.id}`"
        >
          {{ domain.title }}
        </a>
      </div>
    </div>

    <div class="px-6 py-8 lg:px-10 lg:py-10">
      <div class="space-y-6">
        <article
          v-for="domain in fullstackDomains"
          :id="domain.id"
          :key="domain.id"
          class="scroll-mt-28 rounded-[32px] border border-[var(--fs-line)] bg-[var(--fs-card)] p-6 lg:p-7"
        >
          <div
            class="grid gap-6 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,1.28fr)]"
          >
            <div>
              <div class="flex items-center gap-3">
                <span
                  class="h-3 w-16 rounded-full bg-gradient-to-r"
                  :class="domain.accent"
                />
                <p
                  class="text-xs tracking-[0.24em] text-[var(--fs-muted)] uppercase"
                >
                  Capability Domain
                </p>
              </div>
              <h2
                class="mt-4 text-3xl font-semibold tracking-tight text-[var(--fs-title)]"
              >
                {{ domain.title }}
              </h2>
              <p class="mt-4 text-base leading-8 text-[var(--fs-copy)]">
                {{ domain.summary }}
              </p>

              <div class="mt-6">
                <p class="text-sm font-semibold text-[var(--fs-title)]">
                  掌握这一层后，你能独立负责
                </p>
                <ul
                  class="mt-4 space-y-3 text-sm leading-7 text-[var(--fs-copy)]"
                >
                  <li
                    v-for="item in domain.ownership"
                    :key="item"
                    class="rounded-2xl border border-[var(--fs-line)] bg-[var(--fs-wash)] px-4 py-3"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="grid gap-4 lg:grid-cols-2">
              <section
                class="rounded-[26px] border border-[var(--fs-line)] bg-[var(--fs-pane)] p-5"
              >
                <p
                  class="text-xs tracking-[0.24em] text-[var(--fs-muted)] uppercase"
                >
                  关键能力
                </p>
                <ul
                  class="mt-4 space-y-3 text-sm leading-7 text-[var(--fs-copy)]"
                >
                  <li v-for="skill in domain.keySkills" :key="skill">
                    {{ skill }}
                  </li>
                </ul>
              </section>

              <section
                class="rounded-[26px] border border-[var(--fs-line)] bg-[var(--fs-pane)] p-5"
              >
                <p
                  class="text-xs tracking-[0.24em] text-[var(--fs-muted)] uppercase"
                >
                  常见技术栈
                </p>
                <ul class="mt-4 flex flex-wrap gap-2">
                  <li
                    v-for="stack in domain.commonStacks"
                    :key="stack"
                    class="rounded-full border border-[var(--fs-line)] bg-[var(--fs-paper)] px-3 py-2 text-sm text-[var(--fs-copy)]"
                  >
                    {{ stack }}
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_360px]">
        <section
          class="rounded-[32px] border border-[var(--fs-line)] bg-[var(--fs-card)] p-6 lg:p-7"
        >
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                class="text-xs tracking-[0.24em] text-[var(--fs-muted)] uppercase"
              >
                Language Tracks
              </p>
              <h2 class="mt-2 text-3xl font-semibold text-[var(--fs-title)]">
                语言和框架，不是都学，而是按定位学
              </h2>
            </div>
            <p class="max-w-xl text-sm leading-7 text-[var(--fs-copy)]">
              全栈最容易犯的错就是“每样都会一点，但没有一条能真正交付”。更合理的方式是先选主路线，再补第二增长曲线。
            </p>
          </div>

          <div class="mt-6 grid gap-4 lg:grid-cols-2">
            <article
              v-for="track in fullstackTracks"
              :key="track.id"
              class="rounded-[26px] border border-[var(--fs-line)] bg-[var(--fs-wash)] p-5"
            >
              <p
                class="text-xs tracking-[0.22em] text-[var(--fs-muted)] uppercase"
              >
                {{ track.positioning }}
              </p>
              <h3 class="mt-2 text-xl font-semibold text-[var(--fs-title)]">
                {{ track.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[var(--fs-copy)]">
                {{ track.summary }}
              </p>
              <div class="mt-4">
                <p class="text-sm font-medium text-[var(--fs-title)]">
                  常见框架
                </p>
                <ul class="mt-3 flex flex-wrap gap-2">
                  <li
                    v-for="framework in track.frameworks"
                    :key="framework"
                    class="rounded-full border border-[var(--fs-line)] bg-[var(--fs-paper)] px-3 py-2 text-sm text-[var(--fs-copy)]"
                  >
                    {{ framework }}
                  </li>
                </ul>
              </div>
              <div class="mt-4">
                <p class="text-sm font-medium text-[var(--fs-title)]">最适合</p>
                <ul
                  class="mt-3 space-y-2 text-sm leading-7 text-[var(--fs-copy)]"
                >
                  <li v-for="item in track.bestFor" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section
          class="rounded-[32px] border border-[var(--fs-line-strong)] bg-[var(--fs-ink)] p-6 text-[var(--fs-paper)] lg:p-7"
        >
          <p class="text-xs tracking-[0.24em] text-[#b5c1b8] uppercase">
            Upgrade Path
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-[var(--fs-paper)]">
            从前端走向全栈的现实路径
          </h2>

          <div class="mt-6 space-y-4">
            <article
              v-for="step in fullstackRoadmap"
              :key="step.id"
              class="rounded-[24px] border border-white/8 bg-white/5 p-4"
            >
              <h3 class="text-lg font-semibold text-[var(--fs-paper)]">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm leading-7 text-[#d7ddd8]">
                {{ step.summary }}
              </p>
              <p class="mt-3 text-sm leading-7 font-medium text-[#d7c9b1]">
                结果：{{ step.outcome }}
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  fullstackDomains,
  fullstackLevels,
  fullstackRoadmap,
  fullstackTracks,
} from '@/data/fullstackGuide';
</script>

<style scoped>
.fullstack-guide-page {
  --fs-paper: #f9fbf7;
  --fs-base: #eef3ee;
  --fs-card: rgba(255, 255, 255, 0.72);
  --fs-pane: #edf2ea;
  --fs-wash: rgba(30, 44, 34, 0.04);
  --fs-line: rgba(45, 57, 50, 0.1);
  --fs-line-strong: rgba(60, 78, 67, 0.18);
  --fs-title: #21302a;
  --fs-copy: #44524b;
  --fs-muted: #74827a;
  --fs-ink: #24322c;
  --fs-accent: #6f7461;
  --fs-accent-soft: rgba(111, 116, 97, 0.18);
  --fs-accent-fog: rgba(111, 116, 97, 0.08);
  background:
    radial-gradient(
      circle at top right,
      rgba(255, 255, 255, 0.54),
      transparent 30%
    ),
    linear-gradient(180deg, #f5f8f3 0%, #eef3ee 54%, #e5ebe4 100%);
  border-color: var(--fs-line);
  box-shadow: 0 28px 76px rgba(22, 32, 27, 0.12);
}
</style>
