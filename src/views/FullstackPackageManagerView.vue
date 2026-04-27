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
              <p class="package-manager-guide-section__eyebrow">Package.json</p>
              <h2 class="package-manager-guide-section__title">
                package.json 不是配置堆，它是 Node 项目的总说明书
              </h2>
            </div>
          </div>

          <article class="package-manager-guide-panel is-wide">
            <p class="package-manager-guide-panel__text">
              下面先用当前项目的 `package.json`
              做一份“逐字段拆解”。这样讲比空讲概念更有效，因为你能直接把字段和真实工程对应起来。渡一式讲法里，这一步很关键：不是先背字段表，而是先知道这些字段分别影响了“包身份、脚本入口、依赖安装、提交规范、格式化流程”哪一层。
            </p>

            <AppCodeBlock
              class="package-manager-guide-code-block"
              :code="currentPackageJsonExample"
              lang="json"
            />
          </article>

          <div class="package-manager-guide-detail-grid">
            <article
              v-for="item in packageJsonFieldGuides"
              :key="item.field"
              class="package-manager-guide-panel"
            >
              <div class="package-manager-guide-detail__head">
                <div>
                  <p class="package-manager-guide-panel__eyebrow">Field</p>
                  <h3 class="package-manager-guide-panel__title">
                    {{ item.field }}
                  </h3>
                </div>
                <span class="package-manager-guide-method__tag">
                  {{ item.scope }}
                </span>
              </div>

              <p class="package-manager-guide-panel__text">
                {{ item.summary }}
              </p>

              <div class="package-manager-guide-detail__stack">
                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">
                    它在干什么
                  </p>
                  <p class="package-manager-guide-detail__text">
                    {{ item.purpose }}
                  </p>
                </section>

                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">
                    这个项目里为什么要写
                  </p>
                  <p class="package-manager-guide-detail__text">
                    {{ item.reason }}
                  </p>
                </section>

                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">常见坑</p>
                  <ul class="package-manager-guide-list">
                    <li v-for="risk in item.risks" :key="risk">
                      {{ risk }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="package-manager-guide-code-block"
                :code="item.example"
                :lang="item.language"
              />
            </article>
          </div>
        </section>

        <section class="package-manager-guide-section">
          <div class="package-manager-guide-section__head">
            <div>
              <p class="package-manager-guide-section__eyebrow">Extra Fields</p>
              <h2 class="package-manager-guide-section__title">
                当前项目没写，但你做库、CLI、monorepo 时高频会用到的字段
              </h2>
            </div>
          </div>

          <div class="package-manager-guide-detail-grid">
            <article
              v-for="item in extraPackageJsonFields"
              :key="item.field"
              class="package-manager-guide-panel"
            >
              <div class="package-manager-guide-detail__head">
                <div>
                  <p class="package-manager-guide-panel__eyebrow">Field</p>
                  <h3 class="package-manager-guide-panel__title">
                    {{ item.field }}
                  </h3>
                </div>
                <span class="package-manager-guide-method__tag">
                  {{ item.scope }}
                </span>
              </div>

              <p class="package-manager-guide-panel__text">
                {{ item.summary }}
              </p>

              <div class="package-manager-guide-detail__stack">
                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">
                    典型用途
                  </p>
                  <p class="package-manager-guide-detail__text">
                    {{ item.purpose }}
                  </p>
                </section>

                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">
                    什么时候该上
                  </p>
                  <p class="package-manager-guide-detail__text">
                    {{ item.reason }}
                  </p>
                </section>

                <section class="package-manager-guide-mini-panel">
                  <p class="package-manager-guide-mini-panel__title">
                    注意事项
                  </p>
                  <ul class="package-manager-guide-list">
                    <li v-for="risk in item.risks" :key="risk">
                      {{ risk }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="package-manager-guide-code-block"
                :code="item.example"
                :lang="item.language"
              />
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

const currentPackageJsonExample = `{
  "name": "len-test",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --configLoader native",
    "build": "vue-tsc -b && vite build --configLoader native",
    "preview": "vite preview --configLoader native",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "prepare": "husky",
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js,mjs,cjs,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,html,json,md,yml,yaml}": [
      "prettier --write"
    ]
  },
  "dependencies": {
    "element-plus": "^2.13.7",
    "vue": "^3.5.32",
    "vue-router": "^5.0.4"
  },
  "devDependencies": {
    "eslint": "^10.2.0",
    "husky": "^9.1.7",
    "prettier": "^3.8.2",
    "vite": "^8.0.4",
    "vue-tsc": "^3.2.6"
  }
}`;

const packageJsonFieldGuides = [
  {
    field: 'name',
    scope: '包身份',
    summary:
      '这是包的唯一名称。发布到 npm 时，它会直接变成用户安装时写在命令里的名字；不发布时，它依然是工程的身份标识。',
    purpose:
      'npm 会把它当成包名。monorepo 下还会用它做 workspace 之间的依赖名、脚本过滤目标、发布名。',
    reason:
      '当前项目虽然暂时不是组件库，但依然需要一个稳定的工程标识，后续接 CI、脚本、工作区或包发布时都会依赖它。',
    risks: [
      '发布包时名字和组织前缀没规划好，后面很难改。',
      'monorepo 里多个 package 命名混乱，会直接拖累 workspace 管理。',
      '把展示名称和包名称混为一谈，导致技术标识不统一。',
    ],
    language: 'json',
    example: `{
  "name": "len-test"
}`,
  },
  {
    field: 'private',
    scope: '发布控制',
    summary:
      '它最直接的作用是防止误发包。只要 `private: true`，npm publish 就会被拦下来。',
    purpose:
      '告诉包管理器：这不是准备发到公共 registry 的包，而是一个内部工程或私有仓库项目。',
    reason:
      '当前仓库是站点项目，不是要发布给别人安装的依赖包，所以应该显式拦住误发布风险。',
    risks: [
      '内部项目忘记写 private，CI 或脚本误发时没有保护。',
      'monorepo 根包该私有却没私有，容易把整个仓库根目录当成包发布出去。',
      '把私有根包和子包的发布策略混写，导致发布链路混乱。',
    ],
    language: 'json',
    example: `{
  "private": true
}`,
  },
  {
    field: 'version',
    scope: '版本语义',
    summary:
      '它是这个包当前的版本号。应用项目里它更多是版本标识，库项目里它还直接参与发布、升级和依赖解析。',
    purpose:
      '对库来说，它决定本次发布出来是什么版本；对应用来说，它常用于构建注入、发布标记、回滚识别和变更审计。',
    reason:
      '当前项目是应用，不会被别人依赖，但依然需要基础版本字段，为后续发版和构建元信息留口子。',
    risks: [
      '把应用版本和 Git tag、部署版本完全脱钩，后续排障困难。',
      '不理解 semver，改了破坏性行为却只升补丁号。',
      'monorepo 多包版本策略没有统一规则。',
    ],
    language: 'json',
    example: `{
  "version": "0.0.0"
}`,
  },
  {
    field: 'type',
    scope: '模块系统',
    summary:
      '它决定 .js 文件默认按 CommonJS 还是 ESM 解释。现代前端工程里，`"type": "module"` 已经越来越常见。',
    purpose:
      '当你把它设为 module，Node 会把 .js 当作 ES Module 来解析，影响 import/export 写法、路径后缀和工具脚本运行方式。',
    reason:
      '当前项目基于 Vite 和现代前端工具链，走 ESM 是更自然的默认值，能减少模块系统混用。',
    risks: [
      '项目设成 module 后，旧的 CommonJS 脚本直接跑会报错。',
      '不了解 .cjs、.mjs 的边界，脚本和配置文件容易打架。',
      '包作者不处理双模块兼容，消费者环境容易出问题。',
    ],
    language: 'json',
    example: `{
  "type": "module"
}`,
  },
  {
    field: 'scripts',
    scope: '任务入口',
    summary:
      '这是团队日常最常用的字段。它把开发、构建、校验、提交流程都统一成可复用命令入口。',
    purpose:
      '用统一命令收口工程动作，让本地、CI、文档、接手人都对同一套动作说同一种语言。',
    reason:
      '这个项目把 dev、build、lint、format、prepare、commit 全都收进了 scripts，等于给研发流程装了一个总控制台。',
    risks: [
      '脚本名不统一，团队成员都在记各自习惯命令。',
      '脚本直接写很长的命令串，后期维护和跨平台兼容都很差。',
      'CI 跑的命令和本地习惯不一致，容易出现“我本地没问题”。',
    ],
    language: 'json',
    example: `{
  "scripts": {
    "dev": "vite --configLoader native",
    "build": "vue-tsc -b && vite build --configLoader native",
    "lint": "eslint .",
    "format": "prettier . --write"
  }
}`,
  },
  {
    field: 'config',
    scope: '工具参数',
    summary:
      '这是给脚本或工具读的自定义配置入口。很多 CLI 会约定从这里读取自身配置。',
    purpose:
      '让某些工具通过 package.json 内嵌配置，而不是额外再开单独配置文件。',
    reason:
      '当前项目用它给 Commitizen 指定适配器路径，让 git-cz 能走约定式提交问答流程。',
    risks: [
      '把大量复杂配置全塞进 config，最后 package.json 可读性极差。',
      '工具读取规则不统一，不是所有包都会认 config。',
      '后续迁移工具时忘了清理旧配置，容易出现阴魂不散的历史行为。',
    ],
    language: 'json',
    example: `{
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}`,
  },
  {
    field: 'lint-staged',
    scope: '提交流程',
    summary:
      '它定义“只对暂存区文件执行什么操作”。这类字段本质上是在把提交流程工程化。',
    purpose:
      '在用户执行 git commit 前，只对 staged 文件做 lint / format，既保证质量，又避免全量检查过慢。',
    reason:
      '当前项目结合 Husky 使用它，在提交时自动格式化和修复暂存文件，减少无意义格式问题进入仓库。',
    risks: [
      '对全项目做重任务，导致每次提交都特别慢。',
      '命令会修改未暂存文件时，容易让用户误解结果。',
      'lint-staged 和 eslint/prettier 规则不一致，提交前后行为混乱。',
    ],
    language: 'json',
    example: `{
  "lint-staged": {
    "*.{ts,tsx,js,mjs,cjs,vue}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}`,
  },
  {
    field: 'dependencies',
    scope: '运行时依赖',
    summary:
      '这里放的是应用运行时真的要用到的包。打包、启动、页面渲染时需要它们存在。',
    purpose:
      '告诉包管理器：这些依赖会进入真实运行时环境，构建产物或服务启动逻辑要依赖它们。',
    reason:
      '当前项目把 vue、vue-router、element-plus 等运行必需品放在这里，这是正确分层。',
    risks: [
      '把仅开发用的包放进 dependencies，会增加安装体积和认知负担。',
      '把运行时依赖误放进 devDependencies，部署环境可能直接报找不到包。',
      '没有定期审视依赖边界，package.json 会越堆越乱。',
    ],
    language: 'json',
    example: `{
  "dependencies": {
    "vue": "^3.5.32",
    "vue-router": "^5.0.4",
    "element-plus": "^2.13.7"
  }
}`,
  },
  {
    field: 'devDependencies',
    scope: '开发依赖',
    summary:
      '这里放的是开发、构建、检查、测试、提交规范等阶段要用到的工具依赖。',
    purpose:
      '把构建器、类型检查器、lint、格式化、commit 工具和运行时依赖分层，避免边界混乱。',
    reason:
      '当前项目里的 Vite、TypeScript、ESLint、Prettier、Husky 都只服务研发流程，所以放在 devDependencies 是对的。',
    risks: [
      '把运行时依赖放进 devDependencies，线上构建或启动容易挂。',
      '所有东西都塞到 devDependencies，失去分层意义。',
      '开发工具依赖版本漂移过大，不做统一升级治理。',
    ],
    language: 'json',
    example: `{
  "devDependencies": {
    "vite": "^8.0.4",
    "vue-tsc": "^3.2.6",
    "eslint": "^10.2.0",
    "prettier": "^3.8.2"
  }
}`,
  },
];

const extraPackageJsonFields = [
  {
    field: 'packageManager',
    scope: '团队约束',
    summary:
      '它用于声明这个仓库推荐或强制使用哪一个包管理器以及具体版本，是现代团队非常值得补上的字段。',
    purpose:
      '配合 Corepack 固定 npm、Yarn、pnpm 版本，减少“你装的是 9.x，我装的是 10.x”这类环境漂移。',
    reason:
      '一旦仓库开始多人协作或上 CI，这个字段几乎是刚需，尤其在 pnpm / Yarn 体系下价值更大。',
    risks: [
      '团队工具版本不统一，lockfile 和 install 行为会出现细微差异。',
      '只说“我们用 pnpm”，但不固定版本，后续排查问题很难。',
      '已经配了 packageManager，却没人启用 Corepack。',
    ],
    language: 'json',
    example: `{
  "packageManager": "pnpm@10.11.0"
}`,
  },
  {
    field: 'workspaces',
    scope: '多包协作',
    summary:
      '这是 monorepo 的主入口字段，用来声明哪些目录下的子包属于同一个工作区。',
    purpose:
      '让包管理器知道要把多个 package 视为同一仓库里的协作单元，并支持联动安装、联动脚本和本地依赖链接。',
    reason:
      '当你的项目开始拆组件库、工具包、应用壳和业务包时，就该从单包仓库升级到 workspaces。',
    risks: [
      '路径规则随便写，导致子包未被识别。',
      'workspaces 建了，但版本、脚本、依赖策略没有统一规则。',
      '仍然靠手动 link 包，浪费 workspace 机制。',
    ],
    language: 'json',
    example: `{
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}`,
  },
  {
    field: 'main / module / exports',
    scope: '包入口',
    summary:
      '这是库项目最关键的一组字段，用来定义别人 import 或 require 你这个包时到底会拿到哪份入口文件。',
    purpose:
      '控制 CommonJS、ESM、子路径导出、类型声明以及“对外暴露什么，不暴露什么”。现代库更推荐优先用 exports 统一描述。',
    reason:
      '只要你开始写组件库、工具库、SDK，这组字段就是必修课；应用项目通常不一定需要。',
    risks: [
      '只写 main 不处理 ESM / CJS 双入口，消费者环境容易打架。',
      'exports 限得过死，结果文档示例或工具脚本导入不到路径。',
      '类型声明路径和运行时入口没对齐。',
    ],
    language: 'json',
    example: `{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}`,
  },
  {
    field: 'files',
    scope: '发布内容',
    summary:
      '它决定发布到 npm 时，哪些文件会被带上去。库项目非常建议显式声明。',
    purpose:
      '避免把源码、测试、截图、配置文件一股脑都发出去，只保留真正给消费者使用的产物。',
    reason:
      '只要你准备发包，就应该考虑 files。它和 .npmignore 一起控制发布体积与暴露面。',
    risks: [
      '没写 files，导致把测试、示例、缓存文件都发上去。',
      '写得太狠，把类型声明或样式资源漏掉了。',
      '以为 gitignore 就等于 npm 发布忽略规则。',
    ],
    language: 'json',
    example: `{
  "files": ["dist", "README.md", "LICENSE"]
}`,
  },
  {
    field: 'engines',
    scope: '环境约束',
    summary:
      '它用来声明这个项目支持的 Node、npm、Yarn、pnpm 版本范围，是环境治理的重要一环。',
    purpose:
      '提前告诉开发者和 CI：低于某个 Node 版本就不要装、不要跑，以免后面出现奇怪兼容性错误。',
    reason:
      '当前前端工具链升级很快，Node 版本断层越来越明显，engines 能提前卡住错误环境。',
    risks: [
      '项目依赖 Node 新特性，却不声明最低版本要求。',
      '本地用 22，CI 跑 18，最后行为不一致。',
      '写了 engines 却不在 CI 和文档里同步。',
    ],
    language: 'json',
    example: `{
  "engines": {
    "node": ">=20.19.0"
  }
}`,
  },
  {
    field: 'peerDependencies',
    scope: '宿主依赖',
    summary:
      '当你的包不是自己带一份依赖，而是要求“使用者项目自己提供这份依赖”时，就要用 peerDependencies。',
    purpose:
      '典型场景是组件库、插件、适配器。比如 Vue 插件通常会要求宿主项目自己安装 Vue，而不是插件偷偷再带一份。',
    reason:
      '做插件和库时，这个字段能避免同一运行时被装出两份，尤其在 React / Vue 生态里特别关键。',
    risks: [
      '误把 peerDependencies 写成 dependencies，消费者可能出现双份运行时。',
      'peer 版本范围写得太窄，限制正常安装。',
      '写了 peer 却没在文档中告诉用户需要自行安装。',
    ],
    language: 'json',
    example: `{
  "peerDependencies": {
    "vue": "^3.5.0"
  }
}`,
  },
  {
    field: 'optionalDependencies',
    scope: '可选依赖',
    summary:
      '它表示“有它更好，没有也能继续装”。适合平台差异依赖或增强型能力依赖。',
    purpose:
      '允许某些依赖安装失败但不阻断整个项目安装流程，比如某些平台专属二进制包。',
    reason:
      '不是所有项目都需要，但一旦牵涉跨平台能力或增强插件，可选依赖会非常实用。',
    risks: [
      '把核心依赖放成 optional，运行时才发现功能根本不能用。',
      '以为 optional 就不用做错误兜底。',
      '平台差异测试没覆盖，可选依赖很容易在某个系统上静默失效。',
    ],
    language: 'json',
    example: `{
  "optionalDependencies": {
    "fsevents": "^2.3.3"
  }
}`,
  },
  {
    field: 'overrides / resolutions',
    scope: '依赖树修正',
    summary:
      '当你需要强行改写子依赖版本、修漏洞、收敛重复包时，它们就是非常硬的治理手段。',
    purpose: '不改上游源码，也能临时把依赖树里的某个包统一锁到指定版本。',
    reason:
      '遇到供应链漏洞、重复包膨胀或上游版本不兼容时，这组字段往往能救急。',
    risks: [
      '覆盖规则写太多，后面没人知道依赖树为何长这样。',
      '只会加 overrides，不会回收，技术债会越滚越大。',
      '没有验证就强改子依赖版本，容易引入兼容问题。',
    ],
    language: 'json',
    example: `{
  "overrides": {
    "markdown-it": "14.1.0"
  }
}`,
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

.package-manager-guide-detail-grid {
  display: grid;
  gap: 16px;
  margin-top: 16px;
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

.package-manager-guide-method__head,
.package-manager-guide-detail__head {
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

.package-manager-guide-detail__stack {
  display: grid;
  gap: 14px;
  margin-top: 16px;
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

.package-manager-guide-detail__text {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.package-manager-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .package-manager-guide-hero,
  .package-manager-guide-grid,
  .package-manager-guide-detail-grid,
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
