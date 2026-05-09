<template>
  <section class="capability-article-page">
    <div class="capability-article-page__shell">
      <div class="capability-article-page__top">
        <RouterLink
          :to="backPath"
          class="capability-article-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="capability-article-page__content">
        <header class="capability-article-hero">
          <div>
            <p class="capability-article-hero__eyebrow">{{ eyebrow }}</p>
            <h1 class="capability-article-hero__title">{{ title }}</h1>
            <p class="capability-article-hero__summary">{{ summary }}</p>
          </div>

          <div class="capability-article-hero__panel">
            <p class="capability-article-hero__label">学完结果</p>
            <ul class="capability-article-list">
              <li v-for="item in outcomes" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </header>

        <section class="capability-article-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="capability-article-card"
          >
            <p class="capability-article-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="capability-article-card__title">{{ item.title }}</h2>
            <p class="capability-article-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="capability-article-section">
          <div class="capability-article-section__head">
            <div>
              <p class="capability-article-section__eyebrow">Decision Order</p>
              <h2 class="capability-article-section__title">
                {{ decisionTitle }}
              </h2>
            </div>
          </div>

          <div class="capability-article-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="capability-article-panel is-wide"
            >
              <div class="capability-article-method__head">
                <div>
                  <p class="capability-article-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="capability-article-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="capability-article-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="capability-article-panel__text">
                {{ stage.description }}
              </p>

              <div class="capability-article-method__grid">
                <section class="capability-article-mini-panel">
                  <p class="capability-article-mini-panel__title">适用场景</p>
                  <ul class="capability-article-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="capability-article-mini-panel">
                  <p class="capability-article-mini-panel__title">实现重点</p>
                  <ul class="capability-article-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="capability-article-mini-panel">
                  <p class="capability-article-mini-panel__title">常见误区</p>
                  <ul class="capability-article-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="capability-article-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="capability-article-section">
          <div class="capability-article-section__head">
            <div>
              <p class="capability-article-section__eyebrow">Comparison</p>
              <h2 class="capability-article-section__title">
                {{ comparisonTitle }}
              </h2>
            </div>
          </div>

          <div class="capability-article-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="capability-article-panel"
            >
              <h3 class="capability-article-panel__title">{{ item.title }}</h3>
              <p class="capability-article-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="capability-article-section">
          <div class="capability-article-section__head">
            <div>
              <p class="capability-article-section__eyebrow">Checklist</p>
              <h2 class="capability-article-section__title">
                {{ checklistTitle }}
              </h2>
            </div>
          </div>

          <article class="capability-article-panel is-wide">
            <ul class="capability-article-list">
              <li v-for="item in checklist" :key="item">
                {{ item }}
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

type QuickStage = {
  order: string;
  title: string;
  summary: string;
};

type GuideStage = {
  order: string;
  title: string;
  tag: string;
  description: string;
  bestFor: string[];
  focus: string[];
  risks: string[];
  language: string;
  code: string;
};

type ComparisonCard = {
  title: string;
  summary: string;
};

withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    summary: string;
    outcomes: string[];
    quickStages: QuickStage[];
    decisionTitle: string;
    guideStages: GuideStage[];
    comparisonTitle: string;
    comparisonCards: ComparisonCard[];
    checklistTitle: string;
    checklist: string[];
    backPath?: string;
  }>(),
  {
    backPath: '/fullstack-guide',
  },
);
</script>

<style scoped>
.capability-article-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(220, 228, 235, 0.48),
      transparent 30%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f3f6f9 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.capability-article-page__shell {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.capability-article-page__top {
  margin-bottom: 20px;
}

.capability-article-page__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(19, 27, 34, 0.1);
  border-radius: 999px;
  color: #17202a;
  background: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.capability-article-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(67, 94, 118, 0.2);
  box-shadow: 0 18px 36px rgba(21, 29, 36, 0.08);
}

.capability-article-page__content {
  display: grid;
  gap: 24px;
}

.capability-article-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.8fr);
  gap: 20px;
}

.capability-article-hero__eyebrow,
.capability-article-card__eyebrow,
.capability-article-section__eyebrow,
.capability-article-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.capability-article-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.capability-article-hero__summary {
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #57616d;
}

.capability-article-hero__panel,
.capability-article-panel,
.capability-article-card,
.capability-article-mini-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 42px rgba(21, 29, 36, 0.06);
}

.capability-article-hero__panel {
  padding: 22px;
}

.capability-article-hero__label,
.capability-article-mini-panel__title,
.capability-article-method__tag {
  font-size: 12px;
  line-height: 1.4;
  font-weight: 600;
  color: #52606d;
}

.capability-article-grid,
.capability-article-columns {
  display: grid;
  gap: 16px;
}

.capability-article-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.capability-article-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.capability-article-card,
.capability-article-panel {
  padding: 20px;
}

.capability-article-card__title,
.capability-article-panel__title,
.capability-article-section__title {
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 600;
  color: #17202a;
}

.capability-article-card__text,
.capability-article-panel__text,
.capability-article-list,
.capability-article-list li {
  font-size: 14px;
  line-height: 1.85;
  color: #57616d;
}

.capability-article-list {
  margin: 10px 0 0;
  padding-left: 18px;
}

.capability-article-section {
  display: grid;
  gap: 16px;
}

.capability-article-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.capability-article-stack {
  display: grid;
  gap: 16px;
}

.capability-article-panel.is-wide {
  padding: 24px;
}

.capability-article-method__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.capability-article-method__tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(227, 233, 239, 0.7);
}

.capability-article-method__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.capability-article-mini-panel {
  padding: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.capability-article-code-block {
  margin-top: 18px;
}

@media (max-width: 1080px) {
  .capability-article-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .capability-article-columns,
  .capability-article-method__grid,
  .capability-article-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .capability-article-page {
    min-height: auto;
    padding: 22px;
  }

  .capability-article-grid {
    grid-template-columns: 1fr;
  }

  .capability-article-hero__title {
    font-size: 34px;
  }

  .capability-article-card__title,
  .capability-article-panel__title,
  .capability-article-section__title {
    font-size: 20px;
  }
}
</style>
