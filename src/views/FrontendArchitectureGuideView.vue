<template>
  <section
    class="frontend-architecture-page overflow-hidden rounded-[36px] border text-slate-900"
  >
    <div class="border-b px-6 py-4 backdrop-blur lg:px-10">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase">
            Module Navigation
          </p>
          <p class="mt-1 text-sm leading-6 text-[var(--fa-subtle)]">
            当前是独立模块页，这里提供返回系统和切换其它模块的入口。
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <RouterLink
            to="/dashboard"
            class="rounded-full border border-[var(--fa-ink)] bg-[var(--fa-ink)] px-4 py-2 text-sm font-medium text-[var(--fa-paper)] transition hover:bg-[#2f3238]"
          >
            返回首页概览
          </RouterLink>

          <RouterLink
            v-for="entry in siblingEntries"
            :key="entry.path"
            :to="entry.path"
            class="rounded-full border border-[var(--fa-line)] bg-[var(--fa-elevated)] px-4 py-2 text-sm font-medium text-[var(--fa-copy)] transition hover:border-[var(--fa-accent)] hover:bg-[#ffffff]"
          >
            {{ entry.label }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="border-b px-6 py-8 lg:px-10 lg:py-10">
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div class="max-w-4xl">
          <span
            class="inline-flex rounded-full border border-[var(--fa-accent-soft)] bg-[var(--fa-accent-fog)] px-4 py-1 text-xs font-medium tracking-[0.24em] text-[var(--fa-accent)] uppercase"
          >
            Frontend Architecture Map
          </span>
          <h1
            class="mt-4 text-4xl font-semibold tracking-tight text-[var(--fa-title)]"
          >
            前端架构不是知识清单，是能力分层
          </h1>
          <p class="mt-4 max-w-3xl text-base leading-8 text-[var(--fa-subtle)]">
            这个页面不再写成教程文档，而是改成独立模块首页。你可以直接按能力模块理解：
            掌握哪一层能力，就能独立承担哪一类事情；不同支持库，也会自然落在不同架构层里。
          </p>
        </div>

        <div
          class="min-w-[260px] rounded-[28px] border border-[var(--fa-line)] bg-[var(--fa-elevated)] p-5"
        >
          <p class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase">
            这页回答什么
          </p>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-[var(--fa-copy)]">
            <li>前端架构到底分哪些模块。</li>
            <li>每个模块掌握后能独立干什么。</li>
            <li>常见支持库分别属于哪一层。</li>
            <li>学习顺序应该如何推进。</li>
          </ul>
        </div>
      </div>

      <div class="mt-8 grid gap-4 xl:grid-cols-3">
        <article
          v-for="band in frontendArchitectureBands"
          :key="band.id"
          class="rounded-[28px] border border-[var(--fa-line)] bg-[var(--fa-elevated)] p-5"
        >
          <p class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase">
            {{ band.role }}
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-[var(--fa-title)]">
            {{ band.title }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-[var(--fa-subtle)]">
            {{ band.summary }}
          </p>
          <ul class="mt-5 space-y-3 text-sm leading-7 text-[var(--fa-copy)]">
            <li
              v-for="deliverable in band.deliverables"
              :key="deliverable"
              class="rounded-2xl border border-[var(--fa-line)] bg-[var(--fa-wash)] px-4 py-3"
            >
              {{ deliverable }}
            </li>
          </ul>
        </article>
      </div>
    </div>

    <div
      class="sticky top-0 z-10 border-b border-[var(--fa-line)] bg-[rgba(244,241,234,0.92)] px-6 py-4 backdrop-blur lg:px-10"
    >
      <div class="flex flex-wrap gap-3">
        <a
          v-for="module in frontendArchitectureModules"
          :key="module.id"
          class="rounded-full border border-[var(--fa-line)] bg-[var(--fa-elevated)] px-4 py-2 text-sm font-medium text-[var(--fa-copy)] transition hover:border-[var(--fa-accent)] hover:bg-[#ffffff]"
          :href="`#${module.id}`"
        >
          {{ module.title }}
        </a>
      </div>
    </div>

    <div class="px-6 py-8 lg:px-10 lg:py-10">
      <div class="space-y-6">
        <article
          v-for="module in frontendArchitectureModules"
          :id="module.id"
          :key="module.id"
          class="scroll-mt-28 rounded-[32px] border border-[var(--fa-line)] bg-[var(--fa-elevated)] p-6 lg:p-7"
        >
          <div
            class="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.3fr)]"
          >
            <div>
              <div class="flex items-center gap-3">
                <span
                  class="h-3 w-16 rounded-full bg-gradient-to-r"
                  :class="module.accent"
                />
                <p
                  class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase"
                >
                  Capability Module
                </p>
              </div>
              <h2
                class="mt-4 text-3xl font-semibold tracking-tight text-[var(--fa-title)]"
              >
                {{ module.title }}
              </h2>
              <p class="mt-4 text-base leading-8 text-[var(--fa-subtle)]">
                {{ module.summary }}
              </p>

              <div class="mt-6">
                <p class="text-sm font-semibold text-[var(--fa-title)]">
                  掌握这一层后，你能独立负责
                </p>
                <ul
                  class="mt-4 space-y-3 text-sm leading-7 text-[var(--fa-copy)]"
                >
                  <li
                    v-for="item in module.canOwn"
                    :key="item"
                    class="rounded-2xl border border-[var(--fa-line)] bg-[var(--fa-wash)] px-4 py-3"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="grid gap-4 lg:grid-cols-3">
              <section
                class="rounded-[26px] border border-[var(--fa-line)] bg-[var(--fa-pane)] p-5"
              >
                <p
                  class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase"
                >
                  核心能力
                </p>
                <ul
                  class="mt-4 space-y-3 text-sm leading-7 text-[var(--fa-copy)]"
                >
                  <li v-for="skill in module.coreSkills" :key="skill">
                    {{ skill }}
                  </li>
                </ul>
              </section>

              <section
                class="rounded-[26px] border border-[var(--fa-line)] bg-[var(--fa-pane)] p-5"
              >
                <p
                  class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase"
                >
                  常见支持库
                </p>
                <ul class="mt-4 flex flex-wrap gap-2">
                  <li
                    v-for="library in module.supportLibraries"
                    :key="library"
                    class="rounded-full border border-[var(--fa-line)] bg-[var(--fa-paper)] px-3 py-2 text-sm text-[var(--fa-copy)]"
                  >
                    {{ library }}
                  </li>
                </ul>
              </section>

              <section
                class="rounded-[26px] border border-[var(--fa-line)] bg-[var(--fa-pane)] p-5"
              >
                <p
                  class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase"
                >
                  进阶标志
                </p>
                <ul
                  class="mt-4 space-y-3 text-sm leading-7 text-[var(--fa-copy)]"
                >
                  <li v-for="signal in module.growthSignals" :key="signal">
                    {{ signal }}
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_360px]">
        <section
          class="rounded-[32px] border border-[var(--fa-line)] bg-[var(--fa-elevated)] p-6 lg:p-7"
        >
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase"
              >
                Support Libraries
              </p>
              <h2 class="mt-2 text-3xl font-semibold text-[var(--fa-title)]">
                支持库不要按热度记，要按职责记
              </h2>
            </div>
            <p class="max-w-xl text-sm leading-7 text-[var(--fa-subtle)]">
              很多人学前端架构时把库背成名单，这是低效的。更好的方式是先知道系统里有哪些职责，再把库挂到对应职责下面。
            </p>
          </div>

          <div class="mt-6 grid gap-4 lg:grid-cols-2">
            <article
              v-for="cluster in frontendArchitectureLibraryClusters"
              :key="cluster.id"
              class="rounded-[26px] border border-[var(--fa-line)] bg-[var(--fa-wash)] p-5"
            >
              <h3 class="text-lg font-semibold text-[var(--fa-title)]">
                {{ cluster.title }}
              </h3>
              <p class="mt-2 text-sm leading-7 text-[var(--fa-subtle)]">
                {{ cluster.purpose }}
              </p>
              <ul class="mt-4 flex flex-wrap gap-2">
                <li
                  v-for="library in cluster.libraries"
                  :key="library"
                  class="rounded-full border border-[var(--fa-line)] bg-[var(--fa-paper)] px-3 py-2 text-sm text-[var(--fa-copy)]"
                >
                  {{ library }}
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section
          class="rounded-[32px] border border-[#2d3136] bg-[var(--fa-ink)] p-6 text-[var(--fa-paper)] lg:p-7"
        >
          <p class="text-xs tracking-[0.24em] text-[#b7babd] uppercase">
            Learning Roadmap
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-[var(--fa-paper)]">
            学习顺序别反
          </h2>

          <div class="mt-6 space-y-4">
            <article
              v-for="step in frontendArchitectureRoadmap"
              :key="step.id"
              class="rounded-[24px] border border-white/8 bg-white/4 p-4"
            >
              <h3 class="text-lg font-semibold text-[var(--fa-paper)]">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm leading-7 text-[#d7d8d9]">
                {{ step.summary }}
              </p>
              <p class="mt-3 text-sm leading-7 font-medium text-[#d5c4aa]">
                结果：{{ step.outcome }}
              </p>
            </article>
          </div>
        </section>
      </div>

      <div
        class="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
      >
        <section
          class="rounded-[32px] border border-[var(--fa-line)] bg-[var(--fa-elevated)] p-6 lg:p-7"
        >
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase"
              >
                AI Impact
              </p>
              <h2 class="mt-2 text-3xl font-semibold text-[var(--fa-title)]">
                AI 正在改变前端，但不会替你思考系统
              </h2>
            </div>
            <p class="max-w-xl text-sm leading-7 text-[var(--fa-subtle)]">
              真正会被 AI
              压缩的，主要是重复实现和低判断密度的工作；真正会被放大的，是系统设计、人机协作和工程治理能力。
            </p>
          </div>

          <div class="mt-6 space-y-4">
            <article
              v-for="shift in frontendArchitectureFutureShifts"
              :key="shift.id"
              class="rounded-[26px] border border-[var(--fa-line)] bg-[var(--fa-wash)] p-5"
            >
              <h3 class="text-xl font-semibold text-[var(--fa-title)]">
                {{ shift.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[var(--fa-subtle)]">
                {{ shift.summary }}
              </p>
              <ul
                class="mt-4 space-y-3 text-sm leading-7 text-[var(--fa-copy)]"
              >
                <li
                  v-for="impact in shift.impacts"
                  :key="impact"
                  class="rounded-2xl border border-[var(--fa-line)] bg-[var(--fa-paper)] px-4 py-3"
                >
                  {{ impact }}
                </li>
              </ul>
              <p
                class="mt-4 rounded-2xl border border-[var(--fa-accent-soft)] bg-[var(--fa-accent-fog)] px-4 py-4 text-sm leading-7 text-[#6f5e47]"
              >
                应对方式：{{ shift.response }}
              </p>
            </article>
          </div>
        </section>

        <section
          class="rounded-[32px] border border-[var(--fa-line)] bg-[var(--fa-pane)] p-6 lg:p-7"
        >
          <p class="text-xs tracking-[0.24em] text-[var(--fa-muted)] uppercase">
            Next Direction
          </p>
          <h2 class="mt-2 text-3xl font-semibold text-[var(--fa-title)]">
            前端之后，可以去哪里
          </h2>
          <p class="mt-3 text-sm leading-7 text-[var(--fa-subtle)]">
            前端不是终点，更像技术能力的出发点。关键不在于“转不转”，而在于你想把边界扩到哪里。
          </p>

          <div class="mt-6 space-y-4">
            <article
              v-for="path in frontendArchitectureCareerPaths"
              :key="path.id"
              class="rounded-[24px] border border-[var(--fa-line)] bg-[var(--fa-paper)] p-5"
            >
              <p
                class="text-xs tracking-[0.22em] text-[var(--fa-muted)] uppercase"
              >
                {{ path.positioning }}
              </p>
              <h3 class="mt-2 text-xl font-semibold text-[var(--fa-title)]">
                {{ path.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[var(--fa-subtle)]">
                {{ path.summary }}
              </p>
              <ul class="mt-4 flex flex-wrap gap-2">
                <li
                  v-for="skill in path.nextSkills"
                  :key="skill"
                  class="rounded-full border border-[var(--fa-line)] bg-[var(--fa-wash)] px-3 py-2 text-sm text-[var(--fa-copy)]"
                >
                  {{ skill }}
                </li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  frontendArchitectureBands,
  frontendArchitectureCareerPaths,
  frontendArchitectureFutureShifts,
  frontendArchitectureLibraryClusters,
  frontendArchitectureModules,
  frontendArchitectureRoadmap,
} from '@/data/frontendArchitectureGuide';
import { getNavigationMenusFromRoutes, isMenuGroup } from '@/router/permission';

const route = useRoute();

const siblingEntries = computed(() =>
  getNavigationMenusFromRoutes()
    .flatMap((item) =>
      isMenuGroup(item)
        ? item.children.map((child) => ({
            path: child.index,
            label: `${item.label} · ${child.label}`,
          }))
        : [{ path: item.index, label: item.label }],
    )
    .filter((entry) => entry.path !== route.path),
);
</script>

<style scoped>
.frontend-architecture-page {
  --fa-paper: #fbfaf7;
  --fa-base: #f4f1ea;
  --fa-elevated: rgba(255, 255, 255, 0.72);
  --fa-pane: #f2eee6;
  --fa-wash: rgba(34, 41, 47, 0.035);
  --fa-line: rgba(42, 48, 54, 0.11);
  --fa-title: #22262c;
  --fa-copy: #37404a;
  --fa-subtle: #59626b;
  --fa-muted: #7a8289;
  --fa-ink: #262b31;
  --fa-accent: #7f6f5b;
  --fa-accent-soft: rgba(127, 111, 91, 0.18);
  --fa-accent-fog: rgba(127, 111, 91, 0.08);
  background:
    radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.58),
      transparent 32%
    ),
    linear-gradient(180deg, #f7f4ee 0%, #f1ede5 56%, #ebe6dd 100%);
  border-color: var(--fa-line);
  box-shadow: 0 28px 80px rgba(24, 28, 32, 0.14);
}
</style>
