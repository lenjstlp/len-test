<template>
  <section class="scaffolding-guide-page">
    <div class="scaffolding-guide-page__shell">
      <div class="scaffolding-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="scaffolding-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="scaffolding-guide-page__content">
        <header class="scaffolding-guide-hero">
          <div>
            <p class="scaffolding-guide-hero__eyebrow">Frontend Scaffolding</p>
            <h1 class="scaffolding-guide-hero__title">前端脚手架工程</h1>
            <p class="scaffolding-guide-hero__summary">
              真正的脚手架工程，不是写一个 `create-demo`
              命令就结束。它的本质是把项目初始化、目录结构、规范约束、模板变体、代码生成、依赖安装和升级路径做成稳定的工程入口。团队规模一旦变大，没有脚手架，前端交付方式就会迅速分裂。
            </p>
          </div>

          <div class="scaffolding-guide-hero__panel">
            <p class="scaffolding-guide-hero__label">学完结果</p>
            <ul class="scaffolding-guide-list">
              <li>能分清脚手架、模板仓库、代码生成器在职责上的区别。</li>
              <li>
                能独立设计一个企业内可落地的前端脚手架能力边界与目录结构。
              </li>
              <li>能把初始化、规范注入、模板升级和项目演进做成可复制流程。</li>
            </ul>
          </div>
        </header>

        <section class="scaffolding-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="scaffolding-guide-card"
          >
            <p class="scaffolding-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="scaffolding-guide-card__title">{{ item.title }}</h2>
            <p class="scaffolding-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="scaffolding-guide-section">
          <div class="scaffolding-guide-section__head">
            <div>
              <p class="scaffolding-guide-section__eyebrow">Decision Order</p>
              <h2 class="scaffolding-guide-section__title">
                做脚手架的顺序应该是：先定义标准，再自动化生成
              </h2>
            </div>
          </div>

          <div class="scaffolding-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="scaffolding-guide-panel is-wide"
            >
              <div class="scaffolding-guide-method__head">
                <div>
                  <p class="scaffolding-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="scaffolding-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="scaffolding-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="scaffolding-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="scaffolding-guide-method__grid">
                <section class="scaffolding-guide-mini-panel">
                  <p class="scaffolding-guide-mini-panel__title">实现重点</p>
                  <ul class="scaffolding-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="scaffolding-guide-mini-panel">
                  <p class="scaffolding-guide-mini-panel__title">适用场景</p>
                  <ul class="scaffolding-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="scaffolding-guide-mini-panel">
                  <p class="scaffolding-guide-mini-panel__title">常见误区</p>
                  <ul class="scaffolding-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="scaffolding-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="scaffolding-guide-section">
          <div class="scaffolding-guide-section__head">
            <div>
              <p class="scaffolding-guide-section__eyebrow">
                Capability Layers
              </p>
              <h2 class="scaffolding-guide-section__title">
                一个成熟脚手架，至少要覆盖 6 层能力
              </h2>
            </div>
          </div>

          <div class="scaffolding-guide-columns">
            <article
              v-for="item in capabilityCards"
              :key="item.title"
              class="scaffolding-guide-panel"
            >
              <h3 class="scaffolding-guide-panel__title">{{ item.title }}</h3>
              <p class="scaffolding-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="scaffolding-guide-section">
          <div class="scaffolding-guide-section__head">
            <div>
              <p class="scaffolding-guide-section__eyebrow">Best Practice</p>
              <h2 class="scaffolding-guide-section__title">
                企业内脚手架的最小实现骨架
              </h2>
            </div>
          </div>

          <article class="scaffolding-guide-panel is-wide">
            <p class="scaffolding-guide-panel__text">
              真正可维护的脚手架，通常不是单文件拼命
              if/else，而是拆成命令层、模板层、生成层、后处理层和升级层。这样你才能支持多个模板、多个技术栈和后续迁移。
            </p>

            <AppCodeBlock
              class="scaffolding-guide-code-block"
              :code="scaffoldExample"
              lang="typescript"
            />
          </article>
        </section>

        <section class="scaffolding-guide-section">
          <div class="scaffolding-guide-section__head">
            <div>
              <p class="scaffolding-guide-section__eyebrow">Comparison</p>
              <h2 class="scaffolding-guide-section__title">
                模板仓库、脚手架 CLI、代码生成器不要混为一谈
              </h2>
            </div>
          </div>

          <div class="scaffolding-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="scaffolding-guide-panel"
            >
              <h3 class="scaffolding-guide-panel__title">{{ item.title }}</h3>
              <p class="scaffolding-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="scaffolding-guide-section">
          <div class="scaffolding-guide-section__head">
            <div>
              <p class="scaffolding-guide-section__eyebrow">Upgrade Strategy</p>
              <h2 class="scaffolding-guide-section__title">
                脚手架真正难的，是模板上线后的升级与兼容
              </h2>
            </div>
          </div>

          <article class="scaffolding-guide-panel is-wide">
            <ul class="scaffolding-guide-list">
              <li>模板发布前要先冻结最小标准，不然脚手架只是在放大混乱。</li>
              <li>
                模板升级不能只靠重新创建项目，必须设计迁移脚本或升级说明。
              </li>
              <li>
                规范类能力最好通过可组合模块注入，而不是写死成一个无法裁剪的大模板。
              </li>
              <li>交互提问要服务决策，不要把所有配置都甩给使用者自己选。</li>
              <li>
                脚手架的价值不是“快一点建项目”，而是让项目初始化后的长期维护更一致。
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
    title: '先定义标准项目长什么样',
    summary:
      '脚手架不是先写命令，而是先确定团队认可的目录、规范、依赖和交付方式。',
  },
  {
    order: '02',
    title: '再决定哪些差异要参数化',
    summary:
      '技术栈、UI 方案、权限模板、测试方案哪些可以选，哪些必须统一，要提前定边界。',
  },
  {
    order: '03',
    title: '把创建动作拆成模块',
    summary:
      '模板复制、变量渲染、依赖安装、git 初始化、规范注入最好拆开，不要全堆在一个命令里。',
  },
  {
    order: '04',
    title: '生成后还要可升级',
    summary: '真正的难点不是 create，而是模板演进后如何让老项目也能跟上。',
  },
  {
    order: '05',
    title: '脚手架本身也要工程化',
    summary: '版本、测试、模板验证、变更日志和示例项目都需要像产品一样维护。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先把团队标准收敛清楚，再决定值不值得做脚手架',
    tag: '标准收敛',
    description:
      '很多团队一上来就想做脚手架，结果只是把现有混乱复制 100 遍。脚手架的前提不是“有多个项目”，而是你已经有一套可重复标准，例如目录约定、状态管理方式、接口层组织、提交规范、测试基线和 CI 流程。没有标准，脚手架只会固化错误。',
    focus: [
      '先列出团队共识而不是先写代码',
      '把必须统一和允许变化的部分拆开',
      '确认脚手架服务的项目类型是否足够稳定',
    ],
    bestFor: ['同类中后台项目', '企业门户', '多业务线前端团队'],
    risks: [
      '标准还没定就先上脚手架',
      '试图一个脚手架覆盖所有项目类型',
      '把历史问题原样模板化',
    ],
    language: 'text',
    code: `Scaffold Standard Checklist
- 目录结构是否统一？
- 路由、状态、请求层是否有共识？
- 规范工具是否统一？
- 模板要支持哪些技术栈变体？
- 老项目后续怎么升级？`,
  },
  {
    order: '02',
    title: '把脚手架拆成模板层、问题层、生成层和后处理层',
    tag: '分层设计',
    description:
      '成熟脚手架不是一个函数 copy 完模板就结束。通常至少要分四层：模板资源负责静态骨架，提问层负责收集变量，生成层负责渲染和落盘，后处理层负责依赖安装、git 初始化、格式化和额外文件注入。分层之后，模板扩展和功能迭代才不会互相污染。',
    focus: [
      '模板目录保持可视化和可维护',
      '问题层只收集关键决策，不搞问卷调查',
      '后处理层负责安装、初始化、补丁和校验',
    ],
    bestFor: ['多模板脚手架', 'CLI 工具', '企业内部工程平台'],
    risks: [
      '所有逻辑堆在一个 create 命令文件里',
      '模板、变量和安装逻辑强耦合',
      '每新增一个模板都要复制一套逻辑',
    ],
    language: 'text',
    code: `packages/create-app/
  src/
    prompts/
    templates/
    generators/
    post-process/
    upgrade/
    index.ts`,
  },
  {
    order: '03',
    title: '模板生成不要只会拷贝文件，要能组合能力模块',
    tag: '模板组合',
    description:
      '企业内脚手架最常见的问题是模板爆炸。权限版一套、地图版一套、低代码版一套、AI 版一套，最后没人敢维护。更稳的做法是做基础模板 + 可选能力模块，例如登录模块、埋点模块、表格模块、测试模块、CI 模块，通过组合方式生成项目。',
    focus: [
      '基础模板尽量小而稳',
      '附加能力做成可插拔模块',
      '变量和模块依赖关系要清晰',
    ],
    bestFor: ['复杂业务产品线', '多个前端子团队', '平台化能力建设'],
    risks: [
      '每种业务场景都复制一套完整模板',
      '能力模块之间相互耦合，无法独立开关',
      '模板选择过多，用户根本不会选',
    ],
    language: 'typescript',
    code: `type ProjectPreset = {
  base: 'vue' | 'react'
  modules: Array<'auth' | 'testing' | 'ci' | 'tracking'>
}

async function generateProject(preset: ProjectPreset) {
  await copyBaseTemplate(preset.base)

  for (const moduleName of preset.modules) {
    await applyModule(moduleName)
  }
}`,
  },
  {
    order: '04',
    title: '把规范注入做到初始化流程里，而不是靠项目建完后口头补',
    tag: '规范注入',
    description:
      '脚手架最实用的价值之一，是在项目一创建时就把 ESLint、Prettier、提交规范、husky、lint-staged、别名、CI 文件、环境变量样板一起带进去。规范如果靠人补，大概率会漏；只有把它做进初始化流程，团队才能真正稳定。',
    focus: [
      '初始化就注入 lint、format、commit 规范',
      '同步带入 env 示例、CI 配置和 README 模板',
      '脚本、别名和目录规则要一开始就成型',
    ],
    bestFor: ['多人协作项目', '需要快速起盘的新业务', '统一研发规范的团队'],
    risks: [
      '项目生成后再手动补规范，结果每个项目都不一样',
      '规范配置分散在多个地方，脚手架升级困难',
      '初始化生成了文件，但没有验证它们真的可运行',
    ],
    language: 'json',
    code: `{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier . --write",
    "type-check": "vue-tsc --noEmit"
  },
  "lint-staged": {
    "*.{ts,vue}": ["eslint --fix", "prettier --write"]
  }
}`,
  },
  {
    order: '05',
    title: '最后补齐模板升级、回归验证和版本治理',
    tag: '生命周期',
    description:
      '脚手架一旦落地，问题就从“怎么创建项目”变成“怎么维护几十个项目”。这时你要关心模板版本、breaking changes、迁移脚本、示例仓库验证和回归测试。否则脚手架上线半年后就会失去公信力，大家重新回到手工搭项目。',
    focus: [
      '给模板和模块建立版本语义',
      '重要升级提供 codemod 或迁移脚本',
      '用示例项目验证脚手架生成结果',
    ],
    bestFor: ['长期演进的工程平台', '大型前端团队', '多项目组织'],
    risks: [
      '脚手架版本升级没人敢用',
      '生成项目和当前模板标准逐渐脱节',
      '没有回归验证，模板一改就坏',
    ],
    language: 'bash',
    code: `pnpm create company-app
pnpm test:templates
pnpm release
pnpm migrate --from 1.3.0 --to 1.4.0`,
  },
];

const capabilityCards = [
  {
    title: '模板层',
    summary:
      '负责基础文件骨架、目录布局和不同技术栈变体，是脚手架最直观的静态资源层。',
  },
  {
    title: '提问与决策层',
    summary:
      '负责收集少量关键参数，例如技术栈、是否接入权限、是否带测试和 CI，不应该把所有复杂度丢给使用者。',
  },
  {
    title: '代码生成层',
    summary:
      '负责变量渲染、条件文件注入、模块组合和最终文件落盘，是脚手架的核心执行层。',
  },
  {
    title: '后处理层',
    summary:
      '负责依赖安装、git 初始化、格式化、提交规范注入和首次校验，让项目生成后能直接进入开发状态。',
  },
  {
    title: '升级层',
    summary:
      '负责老项目与新模板之间的迁移路径，是脚手架从“创建工具”升级为“平台工具”的关键。',
  },
  {
    title: '验证层',
    summary:
      '负责用快照、示例项目和构建测试验证模板可用，避免脚手架发布后生成出来的项目根本跑不起来。',
  },
];

const scaffoldExample = `import { execa } from 'execa'

type Answers = {
  projectName: string
  framework: 'vue' | 'react'
  withAuth: boolean
  withTesting: boolean
}

export async function createProject(answers: Answers) {
  await copyBaseTemplate(answers.framework, answers.projectName)

  if (answers.withAuth) {
    await applyModule('auth', answers.projectName)
  }

  if (answers.withTesting) {
    await applyModule('testing', answers.projectName)
  }

  await patchPackageJson(answers.projectName)
  await execa('pnpm', ['install'], { cwd: answers.projectName })
  await execa('git', ['init'], { cwd: answers.projectName })
}`;

const comparisonCards = [
  {
    title: '模板仓库',
    summary:
      '最简单，适合少量场景复制，但扩展性弱，变量渲染和模块组合能力有限，升级路径也最差。',
  },
  {
    title: '脚手架 CLI',
    summary:
      '适合统一初始化流程，能承载提问、模板选择、依赖安装和规范注入，是大多数团队工程化升级的主方案。',
  },
  {
    title: '代码生成器',
    summary:
      '更适合在已有项目里持续生成页面、模块、接口层和表单骨架。它不是项目初始化替代品，而是脚手架之后的增量能力。',
  },
];
</script>

<style scoped>
.scaffolding-guide-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(213, 223, 230, 0.46),
      transparent 28%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.scaffolding-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.scaffolding-guide-page__top {
  display: flex;
  justify-content: flex-start;
}

.scaffolding-guide-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 999px;
  color: #17202a;
  background: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.scaffolding-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(71, 90, 108, 0.18);
  box-shadow: 0 16px 30px rgba(18, 26, 34, 0.08);
}

.scaffolding-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.scaffolding-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: 18px;
}

.scaffolding-guide-hero__eyebrow,
.scaffolding-guide-section__eyebrow,
.scaffolding-guide-card__eyebrow,
.scaffolding-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #7a8591;
}

.scaffolding-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.scaffolding-guide-hero__summary,
.scaffolding-guide-panel__text,
.scaffolding-guide-card__text,
.scaffolding-guide-list,
.scaffolding-guide-hero__label,
.scaffolding-guide-mini-panel__title {
  color: #59636e;
}

.scaffolding-guide-hero__summary {
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
}

.scaffolding-guide-hero__panel,
.scaffolding-guide-card,
.scaffolding-guide-panel,
.scaffolding-guide-mini-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.92);
}

.scaffolding-guide-hero__panel {
  padding: 22px;
}

.scaffolding-guide-hero__label {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
}

.scaffolding-guide-list {
  margin: 14px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.85;
}

.scaffolding-guide-grid,
.scaffolding-guide-columns {
  display: grid;
  gap: 16px;
}

.scaffolding-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.scaffolding-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.scaffolding-guide-card,
.scaffolding-guide-panel {
  padding: 20px;
}

.scaffolding-guide-card__title,
.scaffolding-guide-panel__title,
.scaffolding-guide-section__title {
  color: #17202a;
}

.scaffolding-guide-card__title {
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
}

.scaffolding-guide-card__text,
.scaffolding-guide-panel__text {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.85;
}

.scaffolding-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scaffolding-guide-section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.scaffolding-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.scaffolding-guide-stack,
.scaffolding-guide-method__grid {
  display: grid;
  gap: 16px;
}

.scaffolding-guide-method__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.scaffolding-guide-method__tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(85, 104, 122, 0.08);
  color: #45515c;
  font-size: 12px;
  line-height: 1;
}

.scaffolding-guide-method__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 16px;
}

.scaffolding-guide-mini-panel {
  padding: 16px;
}

.scaffolding-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.4;
  font-weight: 600;
}

.scaffolding-guide-code-block {
  margin-top: 16px;
}

.scaffolding-guide-panel.is-wide {
  padding: 24px;
}

@media (max-width: 1200px) {
  .scaffolding-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .scaffolding-guide-columns,
  .scaffolding-guide-method__grid,
  .scaffolding-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .scaffolding-guide-page {
    min-height: auto;
    padding: 22px;
  }

  .scaffolding-guide-grid {
    grid-template-columns: 1fr;
  }

  .scaffolding-guide-hero__title {
    font-size: 34px;
  }

  .scaffolding-guide-section__title {
    font-size: 26px;
  }
}
</style>
