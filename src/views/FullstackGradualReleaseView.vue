<template>
  <section class="gradual-release-guide-page">
    <div class="gradual-release-guide-page__shell">
      <div class="gradual-release-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="gradual-release-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="gradual-release-guide-page__content">
        <header class="gradual-release-guide-hero">
          <div>
            <p class="gradual-release-guide-hero__eyebrow">
              Frontend Gradual Release Engineering
            </p>
            <h1 class="gradual-release-guide-hero__title">前端灰度发布工程</h1>
            <p class="gradual-release-guide-hero__summary">
              灰度发布不是简单的“先发一半再发全部”，而是围绕人群分桶、开关控制、监控观测、回滚兜底和发布节奏建立一整套前端工程能力。真正成熟的灰度体系，目标不是让发布变慢，而是让发布更可控。
            </p>
          </div>

          <div class="gradual-release-guide-hero__panel">
            <p class="gradual-release-guide-hero__label">学完结果</p>
            <ul class="gradual-release-guide-list">
              <li>能区分灰度发布、特性开关、A/B 实验和紧急回滚的边界。</li>
              <li>能设计按用户、租户、地区或版本分层的灰度策略。</li>
              <li>能把监控、回滚和发布审计纳入同一条闭环链路。</li>
            </ul>
          </div>
        </header>

        <section class="gradual-release-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="gradual-release-guide-card"
          >
            <p class="gradual-release-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="gradual-release-guide-card__title">
              {{ item.title }}
            </h2>
            <p class="gradual-release-guide-card__text">
              {{ item.summary }}
            </p>
          </article>
        </section>

        <section class="gradual-release-guide-section">
          <div class="gradual-release-guide-section__head">
            <div>
              <p class="gradual-release-guide-section__eyebrow">
                Decision Order
              </p>
              <h2 class="gradual-release-guide-section__title">
                灰度发布先定义风险，再决定分桶、监控和回滚
              </h2>
            </div>
          </div>

          <div class="gradual-release-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="gradual-release-guide-panel is-wide"
            >
              <div class="gradual-release-guide-method__head">
                <div>
                  <p class="gradual-release-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="gradual-release-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="gradual-release-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="gradual-release-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="gradual-release-guide-method__grid">
                <section class="gradual-release-guide-mini-panel">
                  <p class="gradual-release-guide-mini-panel__title">
                    适用场景
                  </p>
                  <ul class="gradual-release-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="gradual-release-guide-mini-panel">
                  <p class="gradual-release-guide-mini-panel__title">
                    实现重点
                  </p>
                  <ul class="gradual-release-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="gradual-release-guide-mini-panel">
                  <p class="gradual-release-guide-mini-panel__title">
                    常见误区
                  </p>
                  <ul class="gradual-release-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="gradual-release-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="gradual-release-guide-section">
          <div class="gradual-release-guide-section__head">
            <div>
              <p class="gradual-release-guide-section__eyebrow">Comparison</p>
              <h2 class="gradual-release-guide-section__title">
                灰度发布和实验、回滚、特性开关的边界
              </h2>
            </div>
          </div>

          <div class="gradual-release-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="gradual-release-guide-panel"
            >
              <h3 class="gradual-release-guide-panel__title">
                {{ item.title }}
              </h3>
              <p class="gradual-release-guide-panel__text">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </section>

        <section class="gradual-release-guide-section">
          <div class="gradual-release-guide-section__head">
            <div>
              <p class="gradual-release-guide-section__eyebrow">Checklist</p>
              <h2 class="gradual-release-guide-section__title">
                一套能落地的灰度发布清单
              </h2>
            </div>
          </div>

          <article class="gradual-release-guide-panel is-wide">
            <ul class="gradual-release-guide-list">
              <li>先定义灰度对象和比例，不要每次都临时拍脑袋开多少人。</li>
              <li>
                灰度期间必须有监控阈值和快速回滚路径，不能只看“能不能打开”。
              </li>
              <li>分桶逻辑要稳定一致，同一个用户不能一刷新就进不同体验。</li>
              <li>发布记录要能追踪到版本、时间、范围和责任人。</li>
              <li>灰度成功后要及时收口，避免长期残留分支和双实现。</li>
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
    title: '先定义灰度对象',
    summary: '用户、租户、地区、版本和设备都可能成为灰度维度。 ',
  },
  {
    order: '02',
    title: '分桶要稳定',
    summary: '同一个用户在同一个发布周期内必须命中同一结果。 ',
  },
  {
    order: '03',
    title: '监控要跟上',
    summary: '灰度不是只开不看，必须和异常监控、性能监控一起走。 ',
  },
  {
    order: '04',
    title: '回滚要随时可用',
    summary: '灰度阶段的核心价值之一，就是能快速撤回风险。 ',
  },
  {
    order: '05',
    title: '收口要及时',
    summary: '成功灰度后的逻辑不该永远分叉下去。 ',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先区分灰度发布和特性开关，不要把所有控制都叫发布',
    tag: '概念边界',
    description:
      '灰度发布更关注“谁先看到新版本”，特性开关更关注“某个能力是否启用”。前者通常伴随版本切换、流量分配和监控阈值，后者更偏向功能控制和运行时开关。把两者混在一起，发布体系很快就会失去边界，排障和审计也会变得混乱。',
    bestFor: [
      '大版本上线',
      '高风险功能发布',
      '多人协作团队',
      '需审计的正式环境',
    ],
    focus: [
      '明确灰度发布是版本与流量问题',
      '特性开关是能力控制问题',
      '不要用一个系统替代所有发布控制',
    ],
    risks: [
      '把灰度和开关当成一个概念',
      '发布记录里没有版本边界',
      '出现问题时无法判断是版本还是功能开关导致的',
    ],
    language: 'text',
    code: `Release Types
- feature flag: 控制功能是否可用
- gradual release: 控制版本先给谁看
- emergency rollback: 控制风险快速撤回`,
  },
  {
    order: '02',
    title: '灰度分桶必须稳定，一次命中后不要抖来抖去',
    tag: '分桶策略',
    description:
      '灰度最怕用户体验不稳定。分桶策略应该保证同一个用户在同一个发布周期内稳定落在同一组，否则用户一会儿看到旧版、一会儿看到新版，问题会非常难排查。常见做法是基于用户 ID、租户 ID 或设备 ID 做稳定哈希，再结合发布版本和灰度比例计算结果。',
    bestFor: ['SaaS 系统', '中后台平台', '面向登录用户的产品'],
    focus: [
      '选择稳定且可追踪的分桶键',
      '同一发布周期分桶结果保持一致',
      '灰度比例和版本号一起记录',
    ],
    risks: ['刷新一次就换桶', '没有统一分桶算法', '分桶结果无法解释和复现'],
    language: 'ts',
    code: `const getBucket = (userId: string) => {
  let hash = 0
  for (const char of userId) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return hash % 100
}`,
  },
  {
    order: '03',
    title: '灰度期间必须和监控联动，先看风险再继续扩量',
    tag: '观测闭环',
    description:
      '灰度不是一条单独的发布命令，而是一条观测链路。每个灰度批次都应该绑定错误率、接口成功率、性能指标和用户关键路径转化，达到阈值后再扩量。没有监控阈值的灰度，本质上只是把风险分阶段放大。',
    bestFor: ['关键业务链路', '新交互发布', '影响面较大的核心页面'],
    focus: [
      '每个灰度批次都绑定监控阈值',
      '异常上升时停止扩量',
      '灰度数据和版本数据一起看',
    ],
    risks: [
      '只看发布成功，不看线上指标',
      '没有阈值就继续扩量',
      '出了问题再去补埋点',
    ],
    language: 'ts',
    code: `if (errorRate > 0.02 || p95Latency > 1200) {
  stopRollout()
} else {
  increaseTraffic()
}`,
  },
  {
    order: '04',
    title: '回滚要有明确路径，不能靠人记命令',
    tag: '回滚策略',
    description:
      '灰度发布的安全感来自回滚。真正可靠的方案，是让回滚路径在发布前就固定下来：版本目录切换、流量切回旧版本、开关撤回、配置恢复都要可操作。这样一旦指标异常，就能在分钟级甚至秒级内把风险收回去，而不是临时翻聊天记录找命令。',
    bestFor: ['生产环境', '频繁发版团队', '高风险功能改造'],
    focus: [
      '回滚动作与发布动作同样自动化',
      '保留旧版本和旧配置',
      '回滚后仍要保留观测窗口',
    ],
    risks: [
      '只有发布没有回滚',
      '回滚步骤靠人工记忆',
      '回滚后没有验证恢复是否成功',
    ],
    language: 'bash',
    code: `./deploy.sh release-20260424-01
./rollback.sh release-20260423-02`,
  },
  {
    order: '05',
    title: '灰度成功后要收口，把临时分支变回稳定逻辑',
    tag: '收口治理',
    description:
      '灰度能提高上线安全性，但不能让代码一直保留双实现。灰度结束后，要么把新版本正式化，要么把临时分支和控制逻辑删除，否则代码会越滚越重，后续每次发布都要面对更多认知负担。',
    bestFor: ['长期迭代产品', '多团队协作项目', '复杂前端应用'],
    focus: [
      '成功后尽快清理临时分支',
      '将灰度记录沉淀为发布档案',
      '保留成功经验但删除临时代码',
    ],
    risks: [
      '灰度结束后分支永远留着',
      '临时逻辑不清理',
      '下次发布又重新造一遍轮子',
    ],
    language: 'yaml',
    code: `release_policy:
  rollout: gradual
  monitor: enabled
  rollback: required
  cleanup: mandatory`,
  },
];

const comparisonCards = [
  {
    title: '灰度发布 vs A/B 实验',
    summary:
      '灰度发布更关注风险控制和稳定推进，A/B 实验更关注数据验证和策略比较。前者偏发布治理，后者偏产品分析。',
  },
  {
    title: '灰度发布 vs 特性开关',
    summary:
      '灰度发布控制的是版本和流量，特性开关控制的是功能能力。两者经常联动，但解决的问题不同。',
  },
  {
    title: '灰度发布 vs 一键回滚',
    summary:
      '灰度发布是渐进放量，一键回滚是风险兜底。前者负责推进，后者负责止损，不能互相替代。',
  },
];
</script>

<style scoped>
.gradual-release-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(224, 231, 236, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.gradual-release-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.gradual-release-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.gradual-release-guide-page__back {
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

.gradual-release-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.gradual-release-guide-page__content {
  padding: 18px 24px 24px;
}

.gradual-release-guide-hero,
.gradual-release-guide-panel,
.gradual-release-guide-card {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.gradual-release-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding: 28px;
}

.gradual-release-guide-hero__eyebrow,
.gradual-release-guide-section__eyebrow,
.gradual-release-guide-card__eyebrow,
.gradual-release-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.gradual-release-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.gradual-release-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.gradual-release-guide-hero__panel {
  align-self: stretch;
  padding: 18px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(180deg, #fbfcfd 0%, #f4f7fa 100%);
}

.gradual-release-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.gradual-release-guide-grid,
.gradual-release-guide-columns,
.gradual-release-guide-stack {
  display: grid;
  gap: 16px;
}

.gradual-release-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.gradual-release-guide-card {
  padding: 18px;
}

.gradual-release-guide-card__title,
.gradual-release-guide-panel__title,
.gradual-release-guide-section__title {
  color: #17202a;
}

.gradual-release-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.gradual-release-guide-card__text,
.gradual-release-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.gradual-release-guide-section {
  margin-top: 28px;
}

.gradual-release-guide-section__head {
  margin-bottom: 14px;
}

.gradual-release-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.gradual-release-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.gradual-release-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gradual-release-guide-panel {
  padding: 18px;
}

.gradual-release-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.gradual-release-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.gradual-release-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.gradual-release-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.gradual-release-guide-method__tag {
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

.gradual-release-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.gradual-release-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.gradual-release-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.gradual-release-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .gradual-release-guide-hero,
  .gradual-release-guide-grid,
  .gradual-release-guide-columns,
  .gradual-release-guide-stack,
  .gradual-release-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .gradual-release-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .gradual-release-guide-page__shell {
    min-height: auto;
  }

  .gradual-release-guide-page__content {
    padding: 18px;
  }

  .gradual-release-guide-hero__title {
    font-size: 36px;
  }

  .gradual-release-guide-section__title {
    font-size: 26px;
  }
}
</style>
