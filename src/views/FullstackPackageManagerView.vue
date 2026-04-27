<template>
  <section class="package-manager-guide-page">
    <div class="package-manager-guide-page__shell">
      <div class="package-manager-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="package-manager-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="package-manager-guide-page__content">
        <header class="package-manager-guide-hero">
          <div>
            <p class="package-manager-guide-hero__eyebrow">
              Node Package Management
            </p>
            <h1 class="package-manager-guide-hero__title">
              Node 包管理：npm、Yarn、pnpm 的演进与取舍
            </h1>
            <p class="package-manager-guide-hero__summary">
              这一页按更接近渡一课程的讲法来拆：先搞清包管理器到底在管理什么，再讲
              npm 为什么成为基础设施，Yarn 为什么会在 2016
              年掀起第一波替代潮，pnpm 又为什么在工程化和 monorepo
              场景里快速扩张。重点不是背命令，而是把安装模型、锁文件、工作区、兼容性和迁移成本全部看透，最后能自己做技术选型。
            </p>
          </div>

          <div class="package-manager-guide-hero__panel">
            <p class="package-manager-guide-hero__label">学完结果</p>
            <ul class="package-manager-guide-list">
              <li>
                能说清 npm、Yarn、pnpm
                各自解决的核心问题，而不是只停留在“谁更快”。
              </li>
              <li>
                能从锁文件、node_modules 结构、workspace
                能力和兼容性角度做选型。
              </li>
              <li>
                能给团队制定一套可执行的 Node
                包管理规范，包括锁版本、切换工具和迁移步骤。
              </li>
            </ul>
          </div>
        </header>

        <section class="package-manager-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="package-manager-guide-card"
          >
            <p class="package-manager-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="package-manager-guide-card__title">{{ item.title }}</h2>
            <p class="package-manager-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="package-manager-guide-section">
          <div class="package-manager-guide-section__head">
            <div>
              <p class="package-manager-guide-section__eyebrow">
                Decision Order
              </p>
              <h2 class="package-manager-guide-section__title">
                包管理不要先问命令，先看它在你的工程里承担什么角色
              </h2>
            </div>
          </div>

          <div class="package-manager-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="package-manager-guide-panel is-wide"
            >
              <div class="package-manager-guide-method__head">
                <div>
                  <p class="package-manager-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="package-manager-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="package-manager-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="package-manager-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="package-manager-guide-method__grid">
                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="package-manager-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="package-manager-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="package-manager-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="package-manager-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="package-manager-guide-section">
          <div class="package-manager-guide-section__head">
            <div>
              <p class="package-manager-guide-section__eyebrow">Comparison</p>
              <h2 class="package-manager-guide-section__title">
                npm、Yarn、pnpm 最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="package-manager-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="package-manager-guide-panel"
            >
              <h3 class="package-manager-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="package-manager-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="package-manager-guide-section">
          <div class="package-manager-guide-section__head">
            <div>
              <p class="package-manager-guide-section__eyebrow">Cheat Sheet</p>
              <h2 class="package-manager-guide-section__title">
                常用命令和工程落地规则，一次收口
              </h2>
            </div>
          </div>

          <div class="package-manager-guide-columns">
            <article class="package-manager-guide-panel">
              <h3 class="package-manager-guide-panel__title">同类命令对照</h3>
              <AppCodeBlock
                class="package-manager-guide-code-block"
                :code="commandMatrix"
                lang="bash"
              />
            </article>

            <article class="package-manager-guide-panel">
              <h3 class="package-manager-guide-panel__title">推荐的项目约束</h3>
              <ul class="package-manager-guide-list">
                <li>
                  一个仓库只保留一种锁文件，不混用
                  `package-lock.json`、`yarn.lock`、`pnpm-lock.yaml`。
                </li>
                <li>锁文件必须提交，CI 与本地都走同一套安装命令。</li>
                <li>
                  Monorepo 明确使用 workspace，不再靠 `npm link` 手工串包。
                </li>
                <li>用 `packageManager` 字段或 Corepack 固定团队工具版本。</li>
                <li>
                  切换包管理器时先删旧锁文件和 `node_modules`，再完整重装。
                </li>
              </ul>
            </article>

            <article class="package-manager-guide-panel">
              <h3 class="package-manager-guide-panel__title">选型一句话结论</h3>
              <ul class="package-manager-guide-list">
                <li>小型单仓库、追求最低心智负担：优先 npm。</li>
                <li>
                  需要 PnP、Constraints、Focus、极强工作区脚本能力：看 Yarn。
                </li>
                <li>
                  中大型前端仓库、Monorepo、磁盘与安装效率敏感：优先 pnpm。
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section class="package-manager-guide-section">
          <div class="package-manager-guide-section__head">
            <div>
              <p class="package-manager-guide-section__eyebrow">Checklist</p>
              <h2 class="package-manager-guide-section__title">
                一套能落地的 Node 包管理治理清单
              </h2>
            </div>
          </div>

          <article class="package-manager-guide-panel is-wide">
            <ul class="package-manager-guide-list">
              <li>
                别把“包管理器”理解成单纯下载工具，它同时决定了依赖树、锁文件、脚本入口和
                workspace 工作流。
              </li>
              <li>
                npm 早就不是早年的 npm，锁文件和 workspaces
                已经补上了大量基础能力。
              </li>
              <li>
                Yarn 不是只等于 Yarn 1，现代 Yarn 的主线是
                PnP、Constraints、Focus 和更强的工程约束。
              </li>
              <li>
                pnpm
                的核心竞争力不是一句“更快”，而是内容寻址存储、严格依赖边界和
                monorepo 体验。
              </li>
              <li>
                真正稳定的团队规范是：固定工具、提交锁文件、统一安装命令、统一
                workspace 协议、统一迁移流程。
              </li>
            </ul>
          </article>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { RouterLink } from 'vue-router';
import AppCodeBlock from '@/components/AppCodeBlock.vue';

const quickStages = [
  {
    order: '01',
    title: '先搞清它在管理什么',
    summary:
      '包管理器不是只负责下载依赖，它同时在管理版本范围、依赖树、锁文件、脚本入口和工作区协作。',
  },
  {
    order: '02',
    title: 'npm 是基础设施，不是低配版',
    summary:
      'npm 先统一了 registry、scripts 和 package.json 工作流，后续又补齐了 lockfile 与 workspaces。',
  },
  {
    order: '03',
    title: 'Yarn 是第一波工程化升级',
    summary:
      '它最初切入的是速度、一致性、离线能力和更稳定的锁文件，后来又继续押注 PnP 与高级工作区能力。',
  },
  {
    order: '04',
    title: 'pnpm 是第二波工程化升级',
    summary:
      'pnpm 从磁盘复用、严格依赖边界和大型仓库效率切入，尤其适合 monorepo 与多包协作。',
  },
  {
    order: '05',
    title: '别只问谁更快',
    summary:
      '真正影响选型的是兼容性、心智负担、锁文件、workspace、CI 稳定性和迁移成本。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先理解包管理器到底管什么，否则后面所有比较都容易跑偏',
    tag: '问题建模',
    description:
      '很多人第一次接触 npm、Yarn、pnpm 时，只把它们理解成“装包命令不同”。这太浅了。包管理器真正管理的是五件事：依赖从哪里来、版本范围怎么解析、依赖树怎么落地到磁盘、如何保证多人安装结果一致、多个 package 怎样在同一仓库协作。渡一式讲法的重点就在这里：先抓本质，再看工具差异。你只有先理解这五件事，后面才不会把所有讨论都简化成 install 快不快。',
    bestFor: ['初学工程化的前端', '要接手老项目的人', '准备选型新仓库的团队'],
    focus: [
      '把 registry、semver、lockfile、node_modules、scripts、workspace 视作一个整体',
      '知道 package.json 是声明，安装结果才是依赖树的真实落地',
      '理解安装一致性为什么是团队协作的基础',
    ],
    risks: [
      '把包管理器当成下载器',
      '只背 install / add / remove 命令',
      '忽略锁文件和工作区能力',
    ],
    language: 'text',
    code: `Package Manager Responsibilities
- 依赖来源: registry / tarball / git / local path
- 版本解析: semver range -> exact version
- 树落地: node_modules / PnP loader / symlink graph
- 一致性: lockfile / cache / checksum
- 协作: scripts / workspaces / monorepo`,
  },
  {
    order: '02',
    title: 'npm 为什么是基础设施，以及它这些年到底补了什么课',
    tag: '基础主线',
    description:
      'npm 的历史价值不是“默认自带”，而是它最早把 Node 社区的 package.json、registry、scripts、publish、install 这一整套工作流标准化了。后面大家不满意的点，主要集中在早期安装性能、依赖树不稳定和协作体验。于是 npm 也在不断补课：npm 5 强化 package-lock，npm 7 把 workspaces 带进官方主线。今天的 npm 已经不是当年那个常被拿来调侃的版本，它更像工程默认解，优势是兼容性最好、学习成本最低、生态摩擦最小。',
    bestFor: ['小型到中型项目', '新手团队', '优先兼容性和默认体验的仓库'],
    focus: [
      '理解 package-lock 的意义是固定依赖树，而不是多一个文件',
      '理解 npm workspaces 已经能覆盖大部分基础 monorepo 需求',
      '认识到 npm 最大优势仍然是兼容性与最低迁移阻力',
    ],
    risks: [
      '拿早年的 npm 印象判断今天的 npm',
      '不提交 package-lock',
      '以为 npm 完全不能做多包仓库',
    ],
    language: 'json',
    code: `{
  "name": "workspace-example",
  "private": true,
  "workspaces": ["packages/*"],
  "packageManager": "npm@11.11.1"
}`,
  },
  {
    order: '03',
    title:
      'Yarn 第一阶段为什么会火，以及现代 Yarn 的主线已经不是只有 yarn.lock',
    tag: '第一波升级',
    description:
      'Yarn 2016 年出来时，抓住的是当时最痛的几个点：安装速度、跨机器一致性、离线能力和更可靠的锁文件。它让很多团队第一次强烈意识到：包管理器不是系统附带工具，而是工程效率的核心组成。再往后，现代 Yarn 把方向继续推进到 workspaces、constraints、focused installs 和 Plug’n’Play。也就是说，Yarn 不再只是“比 npm 快一点”的替代品，而是在尝试把依赖管理本身做成更强的工程约束系统。',
    bestFor: [
      '有中高级工程化需求的团队',
      '多 workspace 仓库',
      '想强化约束与脚本编排的项目',
    ],
    focus: [
      '区分 Yarn Classic 与现代 Yarn，不要混成一个概念',
      '知道 Workspaces 是 Yarn 很早就重视的核心能力',
      '理解现代 Yarn 的价值已经延伸到约束、聚焦安装和并行执行',
    ],
    risks: [
      '以为 Yarn 只有 yarn.lock',
      '不区分 Yarn 1 和 Yarn 3/4',
      '迁移时忽略工具链兼容性',
    ],
    language: 'bash',
    code: `# Yarn 工作区里的典型动作
yarn install
yarn workspace @my-org/app add dayjs
yarn workspaces foreach -pt run build
yarn workspaces focus @my-org/app`,
  },
  {
    order: '04',
    title: 'Yarn PnP 是它最激进的一步，也是理解 Yarn 上限和成本的关键',
    tag: '现代 Yarn',
    description:
      '现代 Yarn 默认主推的是 Plug’n’Play。简单说，它不再把整个依赖树完整展开成传统 node_modules，而是生成 `.pnp.cjs` 这样的解析入口文件，让依赖解析更可控。这样做的好处是更小的安装落地、更强的 ghost dependency 检测和更严格的依赖边界；代价是部分老工具、脚本或特殊生态需要适配。所以 Yarn 的路线一直都很明确：它愿意拿一点兼容性摩擦，换更强的依赖正确性和工程约束能力。',
    bestFor: [
      '新建工程',
      '愿意投资工具链适配的团队',
      '需要强依赖边界治理的项目',
    ],
    focus: [
      '理解 PnP 的核心不是炫技，而是减少 node_modules 依赖和幽灵依赖问题',
      '知道 PnP 并非必须，可以退回 node_modules 模式',
      '新项目采用 PnP 比存量老仓库迁移更顺手',
    ],
    risks: [
      '把 PnP 当成所有项目都必须上的默认答案',
      '老项目直接切 PnP 却不做工具链验证',
      '团队不了解 ghost dependency 报错背后的价值',
    ],
    language: 'yaml',
    code: `nodeLinker: pnp

packageExtensions:
  "@babel/core@*":
    dependencies:
      "@babel/types": "*"`,
  },
  {
    order: '05',
    title: 'pnpm 为什么会在近几年强势崛起，关键在磁盘模型和依赖边界',
    tag: '第二波升级',
    description:
      'pnpm 不是简单“把 npm 命令换个前缀”，它的核心设计是内容寻址存储，再通过硬链接和符号链接构建依赖图。这样多个项目可以复用同一份包内容，磁盘占用和安装效率会明显更优。更重要的是，它天然更强调依赖边界，只让真正声明过的依赖可见，这对大型仓库很有价值。很多团队从 npm/Yarn 切到 pnpm，真正买单的不是一句 benchmark，而是 monorepo 体验、依赖严格性和长期维护成本。',
    bestFor: ['monorepo', '大型前端仓库', '磁盘与 CI 成本敏感的团队'],
    focus: [
      '理解 pnpm 的 store、hard link、symlink 这三层模型',
      '知道 pnpm 的严格性会提前暴露未声明依赖问题',
      '把 pnpm 视为包管理 + monorepo 工作流的一体化方案',
    ],
    risks: [
      '只记住 pnpm 更快，却不理解它为什么快',
      '遇到未声明依赖报错就误判 pnpm 有问题',
      '迁移时保留旧锁文件和旧 node_modules',
    ],
    language: 'text',
    code: `pnpm node_modules model
store (content-addressable)
  -> hard link files into node_modules/.pnpm
  -> symlink dependency graph
  -> symlink direct deps to project node_modules

收益:
- 节省磁盘
- 安装更快
- 边界更严
- monorepo 体验更好`,
  },
  {
    order: '06',
    title: '真正落地时怎么选，以及从一个包管理器迁到另一个时该怎么做',
    tag: '工程决策',
    description:
      '选型原则可以非常直接。单仓库、小团队、追求最低心智负担，用 npm 完全合理。想要更强的 workspace 编排、focus、constraints，且团队愿意适配现代工具链，可以用 Yarn。仓库规模更大、包更多、CI 更重、希望 monorepo 更稳，pnpm 往往是更划算的长期选择。迁移时别做半套：删旧锁文件、删 node_modules、固定 packageManager 字段、统一 CI 命令、做一轮完整安装和构建验证。这一步不严谨，后面一定反复出脏问题。',
    bestFor: [
      '准备新开仓库',
      '想从 npm/Yarn 迁到 pnpm 的团队',
      '需要制定规范的技术负责人',
    ],
    focus: [
      '先按仓库规模、团队能力和兼容性风险选型',
      '统一 packageManager 字段或 Corepack 版本固定策略',
      '迁移后立即用 CI 验证 lockfile、workspace 和脚本行为',
    ],
    risks: [
      '一个仓库混用多种包管理器',
      'CI 用 npm，本地用 pnpm',
      '迁移后不清空旧安装产物',
    ],
    language: 'json',
    code: `{
  "packageManager": "pnpm@10.11.0",
  "scripts": {
    "bootstrap": "pnpm install",
    "build": "pnpm -r run build",
    "lint": "pnpm -r run lint"
  }
}`,
  },
];

const comparisonCards = [
  {
    title: 'npm vs Yarn Classic',
    summary:
      '当年 Yarn 抢到的核心机会，是更快的安装、更确定的依赖树和更可靠的锁文件。它不是靠换语法赢，而是靠工程体验赢。',
  },
  {
    title: 'Yarn PnP vs pnpm',
    summary:
      '两者都在解决传统 node_modules 的问题。Yarn PnP 更激进，直接弱化 node_modules；pnpm 更保守一些，保留 Node 习惯但用硬链接与符号链接重构磁盘布局。',
  },
  {
    title: 'npm workspace vs pnpm workspace',
    summary:
      'npm workspace 已经够用，但 pnpm 在 workspace protocol、递归命令、跨包安装体验和大型仓库性能上通常更成熟。',
  },
  {
    title: '兼容性 vs 工程收益',
    summary:
      'npm 兼容性最好，Yarn/PnP 约束最强，pnpm 在兼容性与工程收益之间取得了很强平衡。最终取舍不该脱离团队现状。',
  },
];

const commandMatrix = `# 安装依赖
npm install
yarn install
pnpm install

# 新增依赖
npm install axios
yarn add axios
pnpm add axios

# 新增开发依赖
npm install -D vite
yarn add -D vite
pnpm add -D vite

# 删除依赖
npm uninstall axios
yarn remove axios
pnpm remove axios

# 指定 workspace 安装依赖
npm install dayjs -w packages/app
yarn workspace @repo/app add dayjs
pnpm --filter @repo/app add dayjs

# 全 workspace 跑脚本
npm run build --workspaces
yarn workspaces foreach -pt run build
pnpm -r run build`;
</script>

<style scoped>
.package-manager-guide-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  background:
    radial-gradient(
      circle at top right,
      rgba(218, 225, 232, 0.45),
      transparent 28%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f2f5f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.package-manager-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.package-manager-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.package-manager-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  background: #ffffff;
  color: #22303c;
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.package-manager-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.package-manager-guide-page__content {
  padding: 18px 24px 24px;
}

.package-manager-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.package-manager-guide-hero__eyebrow,
.package-manager-guide-section__eyebrow,
.package-manager-guide-card__eyebrow,
.package-manager-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.package-manager-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.package-manager-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.package-manager-guide-hero__panel,
.package-manager-guide-card,
.package-manager-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.package-manager-guide-hero__panel {
  padding: 18px;
}

.package-manager-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.package-manager-guide-grid,
.package-manager-guide-columns,
.package-manager-guide-stack {
  display: grid;
  gap: 16px;
}

.package-manager-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.package-manager-guide-card {
  padding: 18px;
}

.package-manager-guide-card__title,
.package-manager-guide-panel__title,
.package-manager-guide-section__title {
  color: #17202a;
}

.package-manager-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.package-manager-guide-card__text,
.package-manager-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.package-manager-guide-section {
  margin-top: 28px;
}

.package-manager-guide-section__head {
  margin-bottom: 14px;
}

.package-manager-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.package-manager-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.package-manager-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.package-manager-guide-panel {
  padding: 18px;
}

.package-manager-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.package-manager-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.package-manager-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.package-manager-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.package-manager-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(115, 145, 167, 0.1);
  color: #587289;
  font-size: 12px;
  white-space: nowrap;
}

.package-manager-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.package-manager-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.package-manager-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.package-manager-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .package-manager-guide-hero,
  .package-manager-guide-grid,
  .package-manager-guide-columns,
  .package-manager-guide-stack,
  .package-manager-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .package-manager-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .package-manager-guide-page__shell {
    min-height: auto;
  }

  .package-manager-guide-page__content {
    padding: 18px;
  }

  .package-manager-guide-hero__title {
    font-size: 36px;
  }

  .package-manager-guide-section__title {
    font-size: 26px;
  }
}
</style>
