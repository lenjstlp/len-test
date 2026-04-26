<template>
  <section class="dependency-guide-page">
    <div class="dependency-guide-page__shell">
      <div class="dependency-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="dependency-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="dependency-guide-page__content">
        <header class="dependency-guide-hero">
          <div>
            <p class="dependency-guide-hero__eyebrow">
              Frontend Dependency Governance
            </p>
            <h1 class="dependency-guide-hero__title">前端依赖治理能力</h1>
            <p class="dependency-guide-hero__summary">
              这一页按真实项目治理依赖的顺序来讲：先区分运行时依赖、构建依赖和工具依赖，再处理版本策略、升级节奏、供应链安全、重复包控制和发布验证。重点不是把
              `package.json` 填满，而是让依赖新增、升级、回滚和长期维护都可控。
            </p>
          </div>

          <div class="dependency-guide-hero__panel">
            <p class="dependency-guide-hero__label">学完结果</p>
            <ul class="dependency-guide-list">
              <li>能分清哪些依赖该进运行时，哪些只该留在构建与开发阶段。</li>
              <li>能设计版本锁定、升级批次、验证清单和回滚策略。</li>
              <li>能把安全扫描、重复包治理和包体积控制纳入常规工程流程。</li>
            </ul>
          </div>
        </header>

        <section class="dependency-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="dependency-guide-card"
          >
            <p class="dependency-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="dependency-guide-card__title">{{ item.title }}</h2>
            <p class="dependency-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="dependency-guide-section">
          <div class="dependency-guide-section__head">
            <div>
              <p class="dependency-guide-section__eyebrow">Decision Order</p>
              <h2 class="dependency-guide-section__title">
                依赖治理先管边界，再做升级、验证与安全闭环
              </h2>
            </div>
          </div>

          <div class="dependency-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="dependency-guide-panel is-wide"
            >
              <div class="dependency-guide-method__head">
                <div>
                  <p class="dependency-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="dependency-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="dependency-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="dependency-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="dependency-guide-method__grid">
                <section class="dependency-guide-mini-panel">
                  <p class="dependency-guide-mini-panel__title">适用场景</p>
                  <ul class="dependency-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="dependency-guide-mini-panel">
                  <p class="dependency-guide-mini-panel__title">实现重点</p>
                  <ul class="dependency-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="dependency-guide-mini-panel">
                  <p class="dependency-guide-mini-panel__title">常见误区</p>
                  <ul class="dependency-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="dependency-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="dependency-guide-section">
          <div class="dependency-guide-section__head">
            <div>
              <p class="dependency-guide-section__eyebrow">Comparison</p>
              <h2 class="dependency-guide-section__title">
                依赖治理最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="dependency-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="dependency-guide-panel"
            >
              <h3 class="dependency-guide-panel__title">{{ item.title }}</h3>
              <p class="dependency-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="dependency-guide-section">
          <div class="dependency-guide-section__head">
            <div>
              <p class="dependency-guide-section__eyebrow">Checklist</p>
              <h2 class="dependency-guide-section__title">
                一套能落地的前端依赖治理清单
              </h2>
            </div>
          </div>

          <article class="dependency-guide-panel is-wide">
            <ul class="dependency-guide-list">
              <li>
                新增依赖前先判断是业务核心、构建工具还是一次性脚本，避免边界混乱。
              </li>
              <li>锁定版本策略和升级窗口要明确，不能随手安装再长期不维护。</li>
              <li>升级必须配套 lint、type-check、build 和关键路径回归验证。</li>
              <li>供应链安全扫描、许可证审查和重复包分析要纳入常规流水线。</li>
              <li>
                对高风险依赖保留回滚版本和变更记录，避免线上出事后无法定位。
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
    title: '先划清依赖边界',
    summary: '先判断依赖属于运行时、构建期还是开发工具，避免一股脑装进生产包。',
  },
  {
    order: '02',
    title: '版本策略要固定',
    summary: '哪些包允许小版本自动升级，哪些必须锁死，需要事先有规则。',
  },
  {
    order: '03',
    title: '升级要批次化',
    summary: '依赖升级不能随手做成随机事件，最好按批次推进并绑定验证清单。',
  },
  {
    order: '04',
    title: '重复包要收敛',
    summary: '同类库多版本共存会拖大体积、制造行为差异，还会增加排障难度。',
  },
  {
    order: '05',
    title: '安全与回滚要成体系',
    summary: '依赖治理不是只看能不能跑，还要看供应链风险和出事后的回退路径。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断依赖该不该引入，以及它属于哪一层',
    tag: '边界治理',
    description:
      '前端项目最常见的问题之一，是“能解决问题就先装包”。结果是运行时依赖、构建依赖、脚手架依赖和一次性脚本依赖混在一起，后续体积、安全和升级成本都失控。新增依赖前，先问三个问题：这是不是必须的、是否已有现成能力、它到底属于生产运行时还是仅开发时需要。边界清晰，后面才能治理。',
    bestFor: ['中大型前端仓库', '多人协作项目', '长期维护系统'],
    focus: [
      '先看能否复用已有依赖或内部能力',
      '区分 dependencies、devDependencies 和内部工具',
      '评估依赖引入后的维护成本和团队认知成本',
    ],
    risks: [
      '为一个小功能引入整套重量级库',
      '开发工具被误装进运行时依赖',
      '同一类能力重复引入多个库',
    ],
    language: 'text',
    code: `Dependency Intake
- 这项能力是否已有内部实现？
- 这是运行时依赖还是构建工具？
- 引入后是否会增加体积、安全或升级成本？`,
  },
  {
    order: '02',
    title: '为不同类型依赖定义不同的版本策略，别全靠默认符号',
    tag: '版本策略',
    description:
      '依赖治理不能只靠 `^` 和 `~`。核心框架、构建器、状态库、路由库这类高影响依赖，通常需要更保守的锁定和专项升级；工具链中的低风险插件可以按小版本节奏推进；安全修复类更新则需要更快落地。关键在于让团队知道哪些依赖可以自动更新，哪些必须经过专项验证。',
    bestFor: ['依赖较多的工程', 'CI 完整的团队', '高频发版项目'],
    focus: [
      '按依赖影响面制定锁定级别',
      '核心依赖升级前先看 changelog 和 breaking changes',
      '通过 lockfile 保持团队和流水线安装结果一致',
    ],
    risks: [
      '所有依赖统一用一个版本策略',
      '忽略 lockfile 导致本地和 CI 安装结果不同',
      '升级前不看 breaking changes 直接上线',
    ],
    language: 'json',
    code: `{
  "dependencies": {
    "vue": "3.5.18",
    "vue-router": "4.6.0"
  },
  "devDependencies": {
    "vite": "^8.0.8"
  }
}`,
  },
  {
    order: '03',
    title: '依赖升级要批次化，并绑定验证清单与回滚点',
    tag: '升级治理',
    description:
      '依赖升级最怕的不是升级本身，而是一次改太多、回滚点不清晰。更稳的做法是分批升级，例如先升级 UI 生态，再升级构建生态，再升级 lint 与测试工具；每个批次都绑定 lint、类型检查、构建、冒烟和关键页面回归。这样一旦出问题，团队能快速定位是哪个批次、哪个依赖引发的。',
    bestFor: ['长期积压技术债的项目', '多人并行开发团队', '需要持续演进的系统'],
    focus: [
      '按生态或影响面分批处理升级',
      '为每批升级保留清晰的 commit 和回滚点',
      '自动化验证之外补充关键业务路径自测',
    ],
    risks: [
      '一次性升级几十个依赖',
      '升级完成后只有 build 通过没有业务回归',
      '提交粒度过大导致出问题无法回滚',
    ],
    language: 'yaml',
    code: `upgrade-batch:
  scope:
    - ui
    - build
    - lint
  checks:
    - pnpm lint
    - pnpm type-check
    - pnpm build`,
  },
  {
    order: '04',
    title: '重复包、转译链和子依赖要定期审计，不然性能和一致性都会出问题',
    tag: '包体治理',
    description:
      '很多项目表面上只装了一个库，实际通过传递依赖装进来了多套同类实现，比如多个日期库、多个 markdown 解析器、多个版本的同一 UI 基础包。这会直接影响包体积、运行时行为一致性和调试难度。依赖治理需要定期做重复包分析、子依赖审计和 bundle 影响评估，而不是只看顶层依赖列表。',
    bestFor: ['包体积偏大的项目', '多插件系统', 'Monorepo 仓库'],
    focus: [
      '定期分析重复依赖和大体积依赖',
      '通过 overrides 或 resolutions 收敛关键子依赖版本',
      '评估新增依赖对产物大小和首屏性能的影响',
    ],
    risks: [
      '只看顶层依赖，忽略传递依赖膨胀',
      '多个版本的同库长期共存',
      '新增依赖后从不看 bundle 变化',
    ],
    language: 'json',
    code: `{
  "pnpm": {
    "overrides": {
      "markdown-it": "14.1.0"
    }
  }
}`,
  },
  {
    order: '05',
    title: '供应链安全、许可证和应急回滚必须进入日常流程',
    tag: '安全闭环',
    description:
      '依赖治理的终点不只是“项目能跑”，而是面对漏洞通告、恶意包、许可证冲突和突发升级事故时，团队有稳定处理路径。高风险依赖需要关注漏洞公告、许可证要求和社区维护状态；一旦升级后出问题，应该能快速锁回前一版本并恢复发布，而不是现场临时查资料。',
    bestFor: ['商业项目', '企业级产品', '对合规敏感的团队'],
    focus: [
      '建立依赖漏洞和许可证扫描流程',
      '保留升级前版本记录与回滚说明',
      '优先替换长期无人维护或风险过高的依赖',
    ],
    risks: [
      '只有出漏洞新闻时才关注依赖安全',
      '升级前不记录版本基线',
      '使用维护停滞的关键依赖多年不替换',
    ],
    language: 'yaml',
    code: `dependency-governance:
  security:
    - advisory scan
    - license review
  rollback:
    keepLastStableLockfile: true
    recordOwner: true`,
  },
];

const comparisonCards = [
  {
    title: '先装再说 vs 先评估再引入',
    summary:
      '前者能短期提速，后者能长期维持仓库稳定。工程上真正省时间的通常是减少无效依赖，而不是一味加包。',
  },
  {
    title: '统一升级 vs 分批升级',
    summary:
      '统一升级看起来省事，但排障成本极高。分批升级虽然步骤更多，却能明显降低回归和回滚难度。',
  },
  {
    title: '只看顶层依赖 vs 审计整棵依赖树',
    summary:
      '真正拖慢构建、放大体积或带来漏洞的，很多时候是传递依赖。只盯着顶层依赖，治理永远不完整。',
  },
];
</script>

<style scoped>
.dependency-guide-page {
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

.dependency-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.dependency-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.dependency-guide-page__back {
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

.dependency-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.dependency-guide-page__content {
  padding: 18px 24px 24px;
}

.dependency-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.dependency-guide-hero__eyebrow,
.dependency-guide-section__eyebrow,
.dependency-guide-card__eyebrow,
.dependency-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.dependency-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.dependency-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.dependency-guide-hero__panel,
.dependency-guide-card,
.dependency-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.dependency-guide-hero__panel {
  padding: 18px;
}

.dependency-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.dependency-guide-grid,
.dependency-guide-columns,
.dependency-guide-stack {
  display: grid;
  gap: 16px;
}

.dependency-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.dependency-guide-card {
  padding: 18px;
}

.dependency-guide-card__title,
.dependency-guide-panel__title,
.dependency-guide-section__title {
  color: #17202a;
}

.dependency-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.dependency-guide-card__text,
.dependency-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.dependency-guide-section {
  margin-top: 28px;
}

.dependency-guide-section__head {
  margin-bottom: 14px;
}

.dependency-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.dependency-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.dependency-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.dependency-guide-panel {
  padding: 18px;
}

.dependency-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.dependency-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.dependency-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.dependency-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.dependency-guide-method__tag {
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

.dependency-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.dependency-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.dependency-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.dependency-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .dependency-guide-hero,
  .dependency-guide-grid,
  .dependency-guide-columns,
  .dependency-guide-stack,
  .dependency-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .dependency-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .dependency-guide-page__shell {
    min-height: auto;
  }

  .dependency-guide-page__content {
    padding: 18px;
  }

  .dependency-guide-hero__title {
    font-size: 36px;
  }

  .dependency-guide-section__title {
    font-size: 26px;
  }
}
</style>
