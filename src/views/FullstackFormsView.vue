<template>
  <section class="forms-guide-page">
    <div class="forms-guide-page__shell">
      <div class="forms-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="forms-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="forms-guide-page__content">
        <header class="forms-guide-hero">
          <div>
            <p class="forms-guide-hero__eyebrow">Frontend Forms</p>
            <h1 class="forms-guide-hero__title">前端表单工程能力</h1>
            <p class="forms-guide-hero__summary">
              这一页按真实业务里做表单最容易崩掉的顺序来讲：先分清字段状态、校验状态、提交状态和草稿状态，再设计
              schema、联动规则、异步校验、错误回填和提交链路。重点不是会不会用某个表单库，而是知道大型表单为什么会越来越难维护，以及怎么把它拆回工程结构。
            </p>
          </div>

          <div class="forms-guide-hero__panel">
            <p class="forms-guide-hero__label">学完结果</p>
            <ul class="forms-guide-list">
              <li>能分清字段值、校验、联动、提交和回填各自的状态边界。</li>
              <li>
                能把复杂表单拆成
                schema、渲染层和提交流程，而不是把逻辑糊在页面里。
              </li>
              <li>
                能处理异步校验、动态表单、草稿保存和错误回填这些真实项目问题。
              </li>
            </ul>
          </div>
        </header>

        <section class="forms-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="forms-guide-card"
          >
            <p class="forms-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="forms-guide-card__title">{{ item.title }}</h2>
            <p class="forms-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="forms-guide-section">
          <div class="forms-guide-section__head">
            <div>
              <p class="forms-guide-section__eyebrow">Decision Order</p>
              <h2 class="forms-guide-section__title">
                表单工程先拆状态和规则，再决定组件和库
              </h2>
            </div>
          </div>

          <div class="forms-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="forms-guide-panel is-wide"
            >
              <div class="forms-guide-method__head">
                <div>
                  <p class="forms-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="forms-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="forms-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="forms-guide-panel__text">{{ stage.description }}</p>

              <div class="forms-guide-method__grid">
                <section class="forms-guide-mini-panel">
                  <p class="forms-guide-mini-panel__title">适用场景</p>
                  <ul class="forms-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="forms-guide-mini-panel">
                  <p class="forms-guide-mini-panel__title">实现重点</p>
                  <ul class="forms-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="forms-guide-mini-panel">
                  <p class="forms-guide-mini-panel__title">常见误区</p>
                  <ul class="forms-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="forms-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="forms-guide-section">
          <div class="forms-guide-section__head">
            <div>
              <p class="forms-guide-section__eyebrow">Comparison</p>
              <h2 class="forms-guide-section__title">
                表单工程最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="forms-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="forms-guide-panel"
            >
              <h3 class="forms-guide-panel__title">{{ item.title }}</h3>
              <p class="forms-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="forms-guide-section">
          <div class="forms-guide-section__head">
            <div>
              <p class="forms-guide-section__eyebrow">Checklist</p>
              <h2 class="forms-guide-section__title">
                一套能落地的表单工程清单
              </h2>
            </div>
          </div>

          <article class="forms-guide-panel is-wide">
            <ul class="forms-guide-list">
              <li>
                先把值状态、错误状态、提交状态、草稿状态拆开，别全靠一个对象硬扛。
              </li>
              <li>
                字段
                schema、组件渲染、提交转换要分层，避免页面变成几百行表单脚本。
              </li>
              <li>
                异步校验必须有防抖、取消和过期结果处理，不然用户体验会很差。
              </li>
              <li>复杂联动优先建规则层，不要在 `watch` 里到处相互改值。</li>
              <li>提交失败后的错误回填、回显和草稿恢复要作为完整链路设计。</li>
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
    title: '先拆状态',
    summary: '字段值、校验、联动、提交、草稿要分层，不要全糊在组件里。',
  },
  {
    order: '02',
    title: '先定 schema',
    summary: '复杂表单先定义字段结构和规则，再谈组件渲染。',
  },
  {
    order: '03',
    title: '校验是链路',
    summary: '同步校验、异步校验、服务端回填是三层问题，不是一个报错文案。',
  },
  {
    order: '04',
    title: '联动别靠散装 watch',
    summary: '字段显隐、互斥、自动填充要用规则驱动，不要写满页面监听。',
  },
  {
    order: '05',
    title: '提交流程要可回放',
    summary: '从初始化、编辑、保存草稿到提交失败回填，都需要完整闭环。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断表单到底复杂在哪，不要一上来就选库',
    tag: '问题建模',
    description:
      '很多表单做到后面失控，不是因为库选错了，而是问题根本没拆清楚。表单复杂度通常来自字段数量、联动规则、校验链路、动态结构、异步回填和提交转换。先把这些维度拆开，才能知道你到底需要简单受控表单，还是需要表单引擎级别的治理。',
    bestFor: ['中后台录入系统', '医疗表单', '审批流表单', '配置化后台'],
    focus: [
      '先盘清字段量、联动量和校验量',
      '区分简单录入和复杂业务流程表单',
      '把复杂度来源写清楚再选方案',
    ],
    risks: [
      '只按 UI 字段数量估算复杂度',
      '把动态表单当静态页面写',
      '表单能力不足时不断 patch',
    ],
    language: 'text',
    code: `Form Complexity Checklist
- 字段数量是否超过几十个？
- 是否存在跨字段联动和动态显隐？
- 是否有异步校验和服务端错误回填？
- 是否需要草稿保存、回显、分步提交？
- 是否需要配置化生成表单？`,
  },
  {
    order: '02',
    title: '字段 schema 要先定义，渲染层只是消费结构',
    tag: '结构设计',
    description:
      '大表单如果直接在模板里堆组件，后面任何需求变动都会很痛苦。更稳的做法是先定义字段 schema：字段 key、类型、默认值、组件、校验规则、联动条件和提交转换都写进结构，再由渲染层解释 schema。这样复杂度才不会全压在页面组件上。',
    bestFor: ['配置化表单', '多页签长表单', '同构录入系统'],
    focus: [
      '把字段契约写成 schema',
      '渲染层只消费 schema 不承载业务规则',
      '预留默认值、显隐和转换能力',
    ],
    risks: [
      '模板里直接写死所有字段逻辑',
      '字段名和提交字段不一致无人维护',
      '不同页面复制粘贴同一套字段定义',
    ],
    language: 'ts',
    code: `type FormFieldSchema = {
  key: string
  label: string
  component: 'input' | 'select' | 'date' | 'switch'
  required?: boolean
  defaultValue?: unknown
  visibleWhen?: (values: Record<string, unknown>) => boolean
}

const patientFormSchema: FormFieldSchema[] = [
  { key: 'name', label: '姓名', component: 'input', required: true },
  { key: 'gender', label: '性别', component: 'select', required: true },
]`,
  },
  {
    order: '03',
    title: '校验分三层：字段同步校验、异步校验、提交后服务端回填',
    tag: '校验治理',
    description:
      '表单校验最容易被误解成“required 加个提示”。真实项目里至少有三层：字段级同步校验，比如必填和格式；异步校验，比如用户名是否已存在；提交后服务端回填，比如业务规则拦截。这三层处理时机不同、状态来源不同，必须分开设计。',
    bestFor: ['注册登录', '审批系统', '配置中心', '复杂业务表单'],
    focus: [
      '同步与异步校验分层处理',
      '异步校验处理防抖、取消和竞态',
      '服务端错误能准确回填到字段或表单级',
    ],
    risks: [
      '异步校验结果覆盖最新输入',
      '服务端报错只能 toast 无法定位字段',
      '所有校验都在提交时才触发',
    ],
    language: 'ts',
    code: `async function validateUsername(value: string, signal: AbortSignal) {
  const response = await fetch(\`/api/users/check?username=\${value}\`, { signal })
  const result = await response.json()

  return result.available ? '' : '用户名已存在'
}`,
  },
  {
    order: '04',
    title: '字段联动要抽成规则层，不要全靠 watch 互相改值',
    tag: '联动规则',
    description:
      '复杂表单一旦存在字段显隐、必填切换、选项过滤、自动填充，就不能靠散装 watch 硬写。更好的方式是把联动规则单独建模：谁依赖谁、触发条件是什么、结果是显隐还是赋值还是重置。这样规则才能测试、复用和排障。',
    bestFor: ['保险投保表单', '医疗录入', '动态问卷', '审批流程'],
    focus: [
      '把联动依赖关系抽到规则层',
      '区分显隐、禁用、默认值、重置等动作',
      '避免字段之间形成循环依赖',
    ],
    risks: [
      'watch 套 watch，最后调不清来源',
      '多个联动同时改同一个字段',
      '字段隐藏后旧值未清理，提交脏数据',
    ],
    language: 'ts',
    code: `type FieldRule = {
  trigger: string
  effect: 'show' | 'hide' | 'reset' | 'require'
  target: string
  when: (values: Record<string, unknown>) => boolean
}`,
  },
  {
    order: '05',
    title: '提交链路要闭环：初始化、编辑、草稿、提交、失败回填一体化',
    tag: '工程落地',
    description:
      '成熟表单不是点一下提交就结束，而是从初始化数据加载、用户编辑、自动保存草稿、提交转换、接口失败回填到成功后重置的完整闭环。很多项目前期只做“能提交”，后面再补草稿和回显时就会发现结构根本不支持。',
    bestFor: ['长表单系统', '多步骤录入', '可恢复编辑场景', '后台复杂配置'],
    focus: [
      '初始化、草稿、提交走统一数据模型',
      '提交前做字段到 payload 的转换',
      '失败后精确回填字段和表单级错误',
    ],
    risks: [
      '草稿结构和提交结构完全两套',
      '接口失败后用户输入丢失',
      '成功与失败状态没有统一收束点',
    ],
    language: 'ts',
    code: `async function submitForm(values: Record<string, unknown>) {
  const payload = transformToPayload(values)

  try {
    await saveDraft(values)
    await api.submit(payload)
    return { success: true }
  } catch (error) {
    return { success: false, fieldErrors: normalizeServerErrors(error) }
  }
}`,
  },
];

const comparisonCards = [
  {
    title: '模板直写 vs schema 驱动',
    summary:
      '模板直写前期快，但字段一多就会迅速失控；schema 驱动前期抽象多一步，但更适合复杂联动、配置化和长期维护。',
  },
  {
    title: '单次提交校验 vs 全链路校验',
    summary:
      '只在提交时校验实现简单，但用户体验和错误定位都差；全链路校验更复杂，却能显著降低表单失败率和返工成本。',
  },
  {
    title: '散装 watch 联动 vs 规则引擎联动',
    summary:
      '散装 watch 前期写得快，后期维护几乎不可控；规则引擎式联动更适合复杂业务表单，尤其是动态显隐和多条件依赖场景。',
  },
];
</script>

<style scoped>
.forms-guide-page {
  min-height: calc(100vh - 40px);
  padding: 24px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top left,
      rgba(220, 227, 233, 0.48),
      transparent 28%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.forms-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.forms-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.forms-guide-page__back {
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

.forms-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.forms-guide-page__content {
  padding: 18px 24px 24px;
}

.forms-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.forms-guide-hero__eyebrow,
.forms-guide-section__eyebrow,
.forms-guide-card__eyebrow,
.forms-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.forms-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.forms-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.forms-guide-hero__panel,
.forms-guide-card,
.forms-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.forms-guide-hero__panel {
  padding: 18px;
}

.forms-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.forms-guide-grid,
.forms-guide-columns,
.forms-guide-stack {
  display: grid;
  gap: 16px;
}

.forms-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.forms-guide-card {
  padding: 18px;
}

.forms-guide-card__title,
.forms-guide-panel__title,
.forms-guide-section__title {
  color: #17202a;
}

.forms-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.forms-guide-card__text,
.forms-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.forms-guide-section {
  margin-top: 28px;
}

.forms-guide-section__head {
  margin-bottom: 14px;
}

.forms-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.forms-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.forms-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.forms-guide-panel {
  padding: 18px;
}

.forms-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.forms-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.forms-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.forms-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.forms-guide-method__tag {
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

.forms-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.forms-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.forms-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.forms-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .forms-guide-hero,
  .forms-guide-grid,
  .forms-guide-columns,
  .forms-guide-stack,
  .forms-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .forms-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .forms-guide-page__shell {
    min-height: auto;
  }

  .forms-guide-page__content {
    padding: 18px;
  }

  .forms-guide-hero__title {
    font-size: 36px;
  }

  .forms-guide-section__title {
    font-size: 26px;
  }
}
</style>
