<template>
  <section class="editor-guide-page">
    <div class="editor-guide-page__shell">
      <div class="editor-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="editor-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="editor-guide-page__content">
        <header class="editor-guide-hero">
          <div>
            <p class="editor-guide-hero__eyebrow">Frontend Rich Text Editor</p>
            <h1 class="editor-guide-hero__title">前端富文本编辑器能力</h1>
            <p class="editor-guide-hero__summary">
              这一页按真实项目建设富文本编辑器的顺序来讲：先区分文档模型、渲染层和工具栏，再处理选区同步、快捷键、粘贴过滤、图片上传、只读审阅和协同扩展。重点不是把一个第三方编辑器嵌进页面，而是理解编辑器为什么是“数据结构
              + 命令系统 + 视图同步”的综合工程。
            </p>
          </div>

          <div class="editor-guide-hero__panel">
            <p class="editor-guide-hero__label">学完结果</p>
            <ul class="editor-guide-list">
              <li>
                能分清编辑器内核、渲染层、工具栏和业务插件各自的职责边界。
              </li>
              <li>
                能判断什么时候做轻量富文本，什么时候该上文档级编辑器或直接接
                OnlyOffice 一类方案。
              </li>
              <li>
                能把粘贴清洗、图片上传、快捷键、只读审阅和导出链路纳入统一设计。
              </li>
            </ul>
          </div>
        </header>

        <section class="editor-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="editor-guide-card"
          >
            <p class="editor-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="editor-guide-card__title">{{ item.title }}</h2>
            <p class="editor-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="editor-guide-section">
          <div class="editor-guide-section__head">
            <div>
              <p class="editor-guide-section__eyebrow">Decision Order</p>
              <h2 class="editor-guide-section__title">
                编辑器能力先定文档模型，再定命令系统、扩展点和持久化链路
              </h2>
            </div>
          </div>

          <div class="editor-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="editor-guide-panel is-wide"
            >
              <div class="editor-guide-method__head">
                <div>
                  <p class="editor-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="editor-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="editor-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="editor-guide-panel__text">{{ stage.description }}</p>

              <div class="editor-guide-method__grid">
                <section class="editor-guide-mini-panel">
                  <p class="editor-guide-mini-panel__title">适用场景</p>
                  <ul class="editor-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="editor-guide-mini-panel">
                  <p class="editor-guide-mini-panel__title">实现重点</p>
                  <ul class="editor-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="editor-guide-mini-panel">
                  <p class="editor-guide-mini-panel__title">常见误区</p>
                  <ul class="editor-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="editor-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="editor-guide-section">
          <div class="editor-guide-section__head">
            <div>
              <p class="editor-guide-section__eyebrow">Comparison</p>
              <h2 class="editor-guide-section__title">
                富文本编辑器建设最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="editor-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="editor-guide-panel"
            >
              <h3 class="editor-guide-panel__title">{{ item.title }}</h3>
              <p class="editor-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="editor-guide-section">
          <div class="editor-guide-section__head">
            <div>
              <p class="editor-guide-section__eyebrow">Checklist</p>
              <h2 class="editor-guide-section__title">
                一套能落地的前端富文本编辑器建设清单
              </h2>
            </div>
          </div>

          <article class="editor-guide-panel is-wide">
            <ul class="editor-guide-list">
              <li>
                先决定你维护的是 HTML、Delta、JSON Schema
                还是文档树，不要后面一边做一边改底层数据格式。
              </li>
              <li>
                工具栏按钮不要直接改
                DOM，应该统一走命令层，让快捷键、菜单和业务插件都复用一套执行入口。
              </li>
              <li>
                粘贴内容必须做白名单清洗和格式归一，否则线上内容会越来越脏。
              </li>
              <li>
                图片上传、附件上传、导出
                PDF、只读审阅都不是边角功能，应在最初设计扩展点时考虑进去。
              </li>
              <li>
                如果业务是正式文档协同、复杂分页、批注修订和 Office
                兼容，就要尽早评估接入专业方案，而不是硬把轻量编辑器改成文档系统。
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
    title: '先定文档模型',
    summary:
      '编辑器最核心的不是按钮，而是数据结构。你到底维护 HTML、Markdown 还是结构化文档树，决定后面一切扩展成本。',
  },
  {
    order: '02',
    title: '再定命令系统',
    summary:
      '粗体、标题、表格、插图这些操作都应该抽象成命令，而不是分散在按钮点击里直接改内容。',
  },
  {
    order: '03',
    title: '插件点要提前设计',
    summary:
      '粘贴清洗、图片上传、变量占位、模板片段、审阅标记都需要稳定扩展点，不能后加硬插。',
  },
  {
    order: '04',
    title: '渲染和存储分开看',
    summary:
      '编辑器里看到的内容，不一定就是服务端最终存的内容；中间往往还会有转换层和校验层。',
  },
  {
    order: '05',
    title: '专业文档场景别轻敌',
    summary:
      '一旦业务进入 EMR、合同、公文、协同修订等场景，难点会从普通富文本迅速升级为文档系统。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先决定编辑器维护的“真数据”是什么，别一开始就陷进 DOM',
    tag: '文档模型',
    description:
      '富文本编辑器真正难的地方，不是把字变粗，而是你到底把内容存成什么。最轻的是 HTML，优点是所见即所得、容易回显；更工程化的方式是存结构化节点树、Delta 或自定义 JSON Schema，这样命令扩展、差异比较、审阅标记和导出转换会稳很多。渡一式讲法会先问本质：你维护的是 DOM，还是维护一个独立文档模型再把它映射到视图？这决定后面上限。',
    bestFor: ['后台公告编辑', '知识库文章', '病历文档', '合同模板系统'],
    focus: [
      '优先明确持久化格式，不要先做界面后补底层结构',
      '轻场景可存 HTML，重文档场景建议存结构化模型',
      '编辑视图和持久化结构尽量解耦',
    ],
    risks: [
      '把 contenteditable DOM 直接当唯一数据源',
      '线上跑一段时间后发现格式脏乱却难以迁移',
      '导出、比对、审阅时才发现 HTML 模型不够用',
    ],
    language: 'ts',
    code: `type EditorDocument = {
  blocks: Array<
    | { type: 'heading'; level: 1 | 2 | 3; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'image'; src: string; alt?: string }
  >
}`,
  },
  {
    order: '02',
    title: '命令系统是编辑器的中枢，工具栏、快捷键和右键菜单都该复用它',
    tag: '命令层',
    description:
      '成熟编辑器不会让每个按钮自己操作内容。更合理的结构是统一命令层，例如 toggleBold、insertImage、setHeading、insertTable。这样工具栏点击、快捷键触发、斜杠菜单、批量模板插入都走同一套路径，状态判断和撤销重做也更容易统一。你做编辑器时，如果没有命令层，功能一多就会迅速失控。',
    bestFor: ['可扩展编辑器', '需要快捷键的系统', '工具栏丰富的后台'],
    focus: [
      '所有编辑动作都抽象成命令',
      '命令层负责修改模型，视图层只负责反映结果',
      '为撤销重做、日志和权限控制预留统一入口',
    ],
    risks: [
      '按钮直接操作 DOM 或本地状态',
      '快捷键和工具栏各自实现一套逻辑',
      '后续做撤销重做时难以统一收口',
    ],
    language: 'ts',
    code: `type EditorCommand =
  | { type: 'toggle-bold' }
  | { type: 'set-heading'; level: 1 | 2 | 3 }
  | { type: 'insert-image'; payload: { src: string; alt?: string } }

function dispatchCommand(command: EditorCommand) {
  // 统一由命令层修改 editor state
}`,
  },
  {
    order: '03',
    title: '粘贴清洗和上传链路一定要早做，不然后面内容质量会失控',
    tag: '内容治理',
    description:
      '真实项目里的编辑器，最脏的内容几乎都来自粘贴。用户会从 Word、网页、微信、PDF 里复制各种带样式碎片的内容。如果没有粘贴清洗，线上内容会充满内联样式、奇怪标签和不可控结构。同样，图片上传、附件嵌入、音视频占位这些动作也不该散在页面里单独处理，而应该是编辑器插件或命令体系的一部分。',
    bestFor: ['内容运营平台', '医疗文档', '知识库后台', '图文发布系统'],
    focus: [
      '对粘贴内容做白名单标签和样式清洗',
      '上传链路和占位渲染统一封装',
      '服务端也要做二次校验，不能只信前端',
    ],
    risks: [
      '直接把剪贴板 HTML 原样塞进编辑器',
      '图片上传成功后只写回 URL，不考虑失败和重试状态',
      '业务方各自魔改上传逻辑，编辑器越来越散',
    ],
    language: 'ts',
    code: `async function handlePaste(html: string) {
  const sanitized = sanitizeHtml(html, {
    allowedTags: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'img'],
  })

  insertSanitizedContent(sanitized)
}`,
  },
  {
    order: '04',
    title: '只读、审阅、模板变量和导出链路，决定它是不是“业务级编辑器”',
    tag: '业务扩展',
    description:
      '普通富文本只解决“能编辑”，但业务级编辑器还要解决“能审阅、能回显、能导出、能模板化”。比如医疗、合同、审批、公文这类场景，往往要求变量占位、病历字段嵌入、只读批注、高亮比对、导出 PDF/Word、打印一致性。很多团队一开始没把这些能力视为一类问题，最后只能在页面层做大量补丁。',
    bestFor: ['EMR/HIS', '合同审批', '公告模板', '复杂业务文档'],
    focus: [
      '把只读模式和编辑模式分清，不共用混乱渲染逻辑',
      '模板变量和业务字段插槽要标准化',
      '导出链路提前定义中间格式和转换规则',
    ],
    risks: [
      '编辑模式和只读模式完全共用一套 DOM 行为',
      '模板字段靠字符串替换，后面很难维护',
      '上线后才补导出，发现内容和编辑区不一致',
    ],
    language: 'json',
    code: `{
  "type": "template-variable",
  "key": "patient.name",
  "label": "患者姓名",
  "readonly": true
}`,
  },
  {
    order: '05',
    title: '什么时候自己做，什么时候接专业方案，要尽早下判断',
    tag: '方案选择',
    description:
      '如果业务只是文章编辑、公告发布、简单图文后台，接入 Tiptap、Slate、Lexical 这类编辑器内核然后做业务插件，通常就够了。但如果业务进入复杂文档、分页布局、修订模式、多人协同、Office 兼容、打印一致性，那就已经不是普通富文本问题，往往要评估 OnlyOffice、文档服务或更重的协同方案。工程上最亏的做法，是明明需求已经是文档系统，却还试图在轻量编辑器上硬堆功能。',
    bestFor: ['新项目技术选型', '已有编辑器升级', '企业级文档业务'],
    focus: [
      '先按业务复杂度而不是个人偏好选方案',
      '轻量富文本、结构化编辑器、专业文档系统三档分清',
      '评估打印、协同、修订、兼容性这些高成本能力',
    ],
    risks: [
      '为了省时间先上轻编辑器，后面不断返工',
      '把专业文档系统需求误判成普通富文本需求',
      '接入重方案前不评估二开与部署成本',
    ],
    language: 'text',
    code: `Editor Solution Matrix
- 简单图文发布 -> Tiptap / Lexical / Slate
- 结构化内容编辑 -> 自定义 schema + plugin system
- 医疗/合同/公文/协同修订 -> OnlyOffice / 专业文档方案
- 打印一致性、分页、修订 -> 尽早走重方案`,
  },
];

const comparisonCards = [
  {
    title: 'HTML 存储 vs 结构化文档树',
    summary:
      'HTML 上手快、回显直接，但后续审阅、导出、差异比较和模板变量会越来越吃力；结构化文档树前期重一些，但上限高很多。',
  },
  {
    title: '轻量编辑器内核 vs 专业文档系统',
    summary:
      '轻量内核适合图文后台和中等复杂度业务；一旦进入分页、修订、打印一致性和 Office 兼容，就要尽快评估专业方案。',
  },
  {
    title: '按钮驱动实现 vs 命令系统实现',
    summary:
      '按钮驱动写起来快，但功能一多就会失控；命令系统前期抽象重一点，却能支撑快捷键、撤销重做和复杂插件扩展。',
  },
];
</script>

<style scoped>
.editor-guide-page {
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

.editor-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.editor-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.editor-guide-page__back {
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

.editor-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.editor-guide-page__content {
  padding: 18px 24px 24px;
}

.editor-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.editor-guide-hero__eyebrow,
.editor-guide-section__eyebrow,
.editor-guide-card__eyebrow,
.editor-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.editor-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.editor-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.editor-guide-hero__panel,
.editor-guide-card,
.editor-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.editor-guide-hero__panel {
  padding: 18px;
}

.editor-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.editor-guide-grid,
.editor-guide-columns,
.editor-guide-stack {
  display: grid;
  gap: 16px;
}

.editor-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.editor-guide-card {
  padding: 18px;
}

.editor-guide-card__title,
.editor-guide-panel__title,
.editor-guide-section__title {
  color: #17202a;
}

.editor-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.editor-guide-card__text,
.editor-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.editor-guide-section {
  margin-top: 28px;
}

.editor-guide-section__head {
  margin-bottom: 14px;
}

.editor-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.editor-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.editor-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.editor-guide-panel {
  padding: 18px;
}

.editor-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.editor-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.editor-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.editor-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.editor-guide-method__tag {
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

.editor-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.editor-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.editor-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.editor-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .editor-guide-hero,
  .editor-guide-grid,
  .editor-guide-columns,
  .editor-guide-stack,
  .editor-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .editor-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .editor-guide-page__shell {
    min-height: auto;
  }

  .editor-guide-page__content {
    padding: 18px;
  }

  .editor-guide-hero__title {
    font-size: 36px;
  }

  .editor-guide-section__title {
    font-size: 26px;
  }
}
</style>
