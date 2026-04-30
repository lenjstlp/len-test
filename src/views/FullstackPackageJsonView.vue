<template>
  <section class="package-json-guide-page">
    <div class="package-json-guide-page__shell">
      <div class="package-json-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="package-json-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="package-json-guide-page__content">
        <header class="package-json-guide-hero">
          <div>
            <p class="package-json-guide-hero__eyebrow">Package Manifest</p>
            <h1 class="package-json-guide-hero__title">package.json 详解</h1>
            <p class="package-json-guide-hero__summary">
              `package.json` 不是一个“随便抄模板”的配置文件，它是整个 Node
              工程的声明中枢。它同时决定包身份、依赖边界、脚本入口、模块导出、发布约束和团队协作规则。真正会用的人，不是记住字段名，而是知道每个字段会影响谁、在什么场景下必须写、写错之后会造成什么工程后果。
            </p>
          </div>

          <div class="package-json-guide-hero__panel">
            <p class="package-json-guide-hero__label">学完结果</p>
            <ul class="package-json-guide-list">
              <li>
                能从工程视角读懂一个项目的
                `package.json`，而不是只会看依赖列表。
              </li>
              <li>
                能分清哪些字段影响开发、哪些影响运行、哪些影响发布和团队协作。
              </li>
              <li>
                能独立设计应用项目、组件库和 SDK 包的 `package.json` 基础骨架。
              </li>
            </ul>
          </div>
        </header>

        <section class="package-json-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="package-json-guide-card"
          >
            <p class="package-json-guide-card__eyebrow">
              Stage {{ item.order }}
            </p>
            <h2 class="package-json-guide-card__title">{{ item.title }}</h2>
            <p class="package-json-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="package-json-guide-section">
          <div class="package-json-guide-section__head">
            <div>
              <p class="package-json-guide-section__eyebrow">Real Example</p>
              <h2 class="package-json-guide-section__title">
                先看真实项目，再讲字段才有落点
              </h2>
            </div>
          </div>

          <article class="package-json-guide-panel is-wide">
            <p class="package-json-guide-panel__text">
              下面直接用当前项目的 `package.json`
              做样本。这样你不会把字段当成抽象名词，而是能马上看到：这个工程为什么用
              `type: "module"`、为什么有 `prepare`、为什么 `lint-staged`
              放在根上、为什么依赖和开发依赖要拆开。
            </p>

            <AppCodeBlock
              class="package-json-guide-code-block"
              :code="currentPackageJsonExample"
              lang="json"
            />
          </article>
        </section>

        <section class="package-json-guide-section">
          <div class="package-json-guide-section__head">
            <div>
              <p class="package-json-guide-section__eyebrow">Decision Order</p>
              <h2 class="package-json-guide-section__title">
                读懂 package.json 的正确顺序
              </h2>
            </div>
          </div>

          <div class="package-json-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="package-json-guide-panel is-wide"
            >
              <div class="package-json-guide-method__head">
                <div>
                  <p class="package-json-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="package-json-guide-panel__title">
                    {{ stage.title }}
                  </h3>
                </div>
                <span class="package-json-guide-method__tag">
                  {{ stage.tag }}
                </span>
              </div>

              <p class="package-json-guide-panel__text">
                {{ stage.description }}
              </p>

              <div class="package-json-guide-method__grid">
                <section class="package-json-guide-mini-panel">
                  <p class="package-json-guide-mini-panel__title">
                    你要关注什么
                  </p>
                  <ul class="package-json-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="package-json-guide-mini-panel">
                  <p class="package-json-guide-mini-panel__title">常见场景</p>
                  <ul class="package-json-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="package-json-guide-mini-panel">
                  <p class="package-json-guide-mini-panel__title">高频误区</p>
                  <ul class="package-json-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="package-json-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="package-json-guide-section">
          <div class="package-json-guide-section__head">
            <div>
              <p class="package-json-guide-section__eyebrow">Field Groups</p>
              <h2 class="package-json-guide-section__title">
                真正常用的字段，建议按 6 个能力组来理解
              </h2>
            </div>
          </div>

          <div class="package-json-guide-columns">
            <article
              v-for="item in fieldGroups"
              :key="item.title"
              class="package-json-guide-panel"
            >
              <h3 class="package-json-guide-panel__title">{{ item.title }}</h3>
              <p class="package-json-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="package-json-guide-section">
          <div class="package-json-guide-section__head">
            <div>
              <p class="package-json-guide-section__eyebrow">Field Details</p>
              <h2 class="package-json-guide-section__title">
                关键字段逐个拆开
              </h2>
            </div>
          </div>

          <div class="package-json-guide-detail-grid">
            <article
              v-for="item in fieldGuides"
              :key="item.field"
              class="package-json-guide-panel"
            >
              <div class="package-json-guide-detail__head">
                <div>
                  <p class="package-json-guide-panel__eyebrow">Field</p>
                  <h3 class="package-json-guide-panel__title">
                    {{ item.field }}
                  </h3>
                </div>
                <span class="package-json-guide-method__tag">{{
                  item.scope
                }}</span>
              </div>

              <p class="package-json-guide-panel__text">{{ item.summary }}</p>

              <div class="package-json-guide-detail__stack">
                <section class="package-json-guide-mini-panel">
                  <p class="package-json-guide-mini-panel__title">它解决什么</p>
                  <p class="package-json-guide-detail__text">
                    {{ item.purpose }}
                  </p>
                </section>

                <section class="package-json-guide-mini-panel">
                  <p class="package-json-guide-mini-panel__title">
                    什么时候必须写
                  </p>
                  <p class="package-json-guide-detail__text">
                    {{ item.whenToUse }}
                  </p>
                </section>

                <section class="package-json-guide-mini-panel">
                  <p class="package-json-guide-mini-panel__title">易错点</p>
                  <ul class="package-json-guide-list">
                    <li v-for="risk in item.risks" :key="risk">
                      {{ risk }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="package-json-guide-code-block"
                :code="item.example"
                :lang="item.language"
              />
            </article>
          </div>
        </section>

        <section class="package-json-guide-section">
          <div class="package-json-guide-section__head">
            <div>
              <p class="package-json-guide-section__eyebrow">Comparison</p>
              <h2 class="package-json-guide-section__title">
                三组最容易混的字段
              </h2>
            </div>
          </div>

          <div class="package-json-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="package-json-guide-panel"
            >
              <h3 class="package-json-guide-panel__title">{{ item.title }}</h3>
              <p class="package-json-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="package-json-guide-section">
          <div class="package-json-guide-section__head">
            <div>
              <p class="package-json-guide-section__eyebrow">Templates</p>
              <h2 class="package-json-guide-section__title">
                应用项目、组件库、内部 SDK 的骨架差异
              </h2>
            </div>
          </div>

          <div class="package-json-guide-stack">
            <article
              v-for="item in templateCards"
              :key="item.title"
              class="package-json-guide-panel is-wide"
            >
              <div class="package-json-guide-method__head">
                <div>
                  <p class="package-json-guide-panel__eyebrow">Template</p>
                  <h3 class="package-json-guide-panel__title">
                    {{ item.title }}
                  </h3>
                </div>
                <span class="package-json-guide-method__tag">{{
                  item.tag
                }}</span>
              </div>

              <p class="package-json-guide-panel__text">{{ item.summary }}</p>

              <AppCodeBlock
                class="package-json-guide-code-block"
                :code="item.code"
                lang="json"
              />
            </article>
          </div>
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
    title: '先看包身份',
    summary:
      '一个包是谁、会不会发布、按什么模块制运行，先由 name、private、version、type 决定。',
  },
  {
    order: '02',
    title: '再看如何被执行',
    summary:
      'scripts 决定团队怎么开发、构建、校验和提交，它比命令列表更像工程入口总表。',
  },
  {
    order: '03',
    title: '然后看依赖边界',
    summary:
      'dependencies、devDependencies、peerDependencies 决定依赖安装位置和责任归属。',
  },
  {
    order: '04',
    title: '再看如何被导出',
    summary:
      'main、module、exports、types 关系到包如何被其他项目消费和打包器解析。',
  },
  {
    order: '05',
    title: '最后看团队约束',
    summary:
      'packageManager、lint-staged、engines、config 等字段承接的是协作规范和工具链落地。',
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
    "@element-plus/icons-vue": "^2.3.2",
    "element-plus": "^2.13.7",
    "shiki": "^3.14.0",
    "vue": "^3.5.32",
    "vue-router": "^5.0.4"
  },
  "devDependencies": {
    "@commitlint/cli": "^20.5.0",
    "@commitlint/config-conventional": "^20.5.0",
    "@eslint/js": "^10.0.1",
    "@tailwindcss/vite": "^4.2.2",
    "@types/node": "^24.12.2",
    "@vitejs/plugin-vue": "^6.0.5",
    "@vue/tsconfig": "^0.9.1",
    "commitizen": "^4.3.1",
    "cz-git": "^1.12.0",
    "eslint": "^10.2.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-vue": "^10.8.0",
    "globals": "^17.4.0",
    "husky": "^9.1.7",
    "lint-staged": "^16.4.0",
    "prettier": "^3.8.2",
    "prettier-plugin-tailwindcss": "^0.7.2",
    "tailwindcss": "^4.2.2",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.58.1",
    "vite": "^8.0.4",
    "vue-tsc": "^3.2.6"
  }
}`;

const guideStages = [
  {
    order: '01',
    title: '第一步先看这个包是谁，会不会被发布出去',
    tag: '包身份',
    description:
      '很多人打开 `package.json` 第一眼就看依赖，这是错误顺序。先看 `name`、`private`、`version`、`type`，你才能知道这个工程是应用项目、私有仓库还是可发布包，是 CommonJS 还是 ESM，后面所有脚本与导出都建立在这里。',
    focus: [
      'name 决定包身份与安装名称',
      'private 控制是否允许 publish',
      'version 是发包语义，不是随便写的数字',
      'type 会影响 Node 默认如何解释 .js 文件',
    ],
    bestFor: ['应用项目', '公共组件库', 'npm SDK', 'monorepo 包'],
    risks: [
      '应用项目忘记写 private，误发到 npm',
      'type 设置为 module 后，旧脚本和工具链不兼容',
      'version 只改 package-lock，不改主文件声明',
    ],
    language: 'json',
    code: `{
  "name": "@team/data-sdk",
  "private": false,
  "version": "1.2.0",
  "type": "module"
}`,
  },
  {
    order: '02',
    title: '第二步看 scripts：团队是怎么跑这个工程的',
    tag: '工程入口',
    description:
      '`scripts` 不是命令备忘录，而是工程使用说明书。一个项目怎么启动、怎么构建、怎么类型检查、怎么 lint、怎么发版，通常都从这里进入。对团队来说，稳定的 scripts 比口头约定更重要，因为它把“大家怎么操作”固化成统一入口。',
    focus: [
      '把高频动作都收敛成 scripts，而不是靠每个人手打命令',
      '命名尽量语义化，比如 build、lint、type-check',
      '脚本之间要有职责边界，不要一个命令包打一切',
    ],
    bestFor: ['前端应用', '组件库仓库', '团队规范化协作'],
    risks: [
      '脚本名混乱，导致团队成员不知道该运行哪个命令',
      '构建前置检查缺失，线上包是脏的',
      '脚本写死平台相关命令，跨系统不稳定',
    ],
    language: 'json',
    code: `{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint .",
    "format": "prettier . --write"
  }
}`,
  },
  {
    order: '03',
    title: '第三步看依赖边界：这个包把责任分给了谁',
    tag: '依赖职责',
    description:
      '`dependencies`、`devDependencies`、`peerDependencies`、`optionalDependencies` 的区别，本质不是安装到哪里，而是谁对运行结果负责。业务应用通常重点看前两个；组件库和插件体系一旦做起来，peerDependencies 就会变得非常关键。',
    focus: [
      '运行时必须存在的包放 dependencies',
      '只参与开发和构建的包放 devDependencies',
      '宿主必须自行提供的包放 peerDependencies',
      '有降级路径的弱依赖才考虑 optionalDependencies',
    ],
    bestFor: ['业务项目依赖梳理', '组件库设计', '插件生态开发'],
    risks: [
      '把框架本体打进组件库 dependencies，导致宿主装出两份 Vue/React',
      '把运行时依赖误放进 devDependencies，生产环境直接缺包',
      '没有 peer 版本约束，兼容边界含糊',
    ],
    language: 'json',
    code: `{
  "dependencies": {
    "axios": "^1.11.0"
  },
  "devDependencies": {
    "vite": "^8.0.4",
    "typescript": "~6.0.2"
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  }
}`,
  },
  {
    order: '04',
    title: '第四步看导出结构：别人究竟怎么消费这个包',
    tag: '模块导出',
    description:
      '一旦项目不是纯应用，而是会被别人安装使用的包，`main`、`module`、`exports`、`types`、`files`、`sideEffects` 就会变成核心字段。这里不是“多写几个键”这么简单，而是在定义 Node、打包器、TypeScript 和 tree-shaking 工具分别该怎么理解你的包。',
    focus: [
      '优先用 exports 明确公开入口',
      'types 指向类型声明产物',
      'files 控制最终发布内容',
      'sideEffects 用于帮助构建器做摇树优化',
    ],
    bestFor: ['组件库', 'SDK', '内部工具包', 'CLI 包'],
    risks: [
      '只写 main，不写 exports，长期会留下兼容债',
      'types 路径错误，TS 用户直接失去类型提示',
      'sideEffects 写成 false 但实际有副作用导入，运行时会出问题',
    ],
    language: 'json',
    code: `{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"]
}`,
  },
  {
    order: '05',
    title: '最后看团队与发布约束：这个仓库靠什么保持一致',
    tag: '协作治理',
    description:
      '`packageManager`、`engines`、`lint-staged`、`config`、`publishConfig` 这些字段在新手眼里存在感不强，但在真实项目里非常重要。它们解决的是：大家用同一套包管理器、同一版本的 Node、同样的提交与格式化流程，以及同样的发布目标。',
    focus: [
      '用 packageManager 明确工具链',
      '用 engines 约束 Node 或 pnpm 范围',
      '用 lint-staged 和 husky 建立提交前防线',
      '用 publishConfig 控制 registry 和访问级别',
    ],
    bestFor: ['团队项目', '私有仓库', '需要稳定发版的包'],
    risks: [
      '团队成员各自用 npm、yarn、pnpm，锁文件和安装树全乱',
      '没有 Node 版本约束，CI 与本地行为不一致',
      '发布目标没锁定，包被发到错误 registry',
    ],
    language: 'json',
    code: `{
  "packageManager": "pnpm@10.17.1",
  "engines": {
    "node": ">=20.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}`,
  },
];

const fieldGroups = [
  {
    title: '包身份字段',
    summary:
      '`name`、`version`、`private`、`description`、`keywords` 决定一个包在生态里是谁，以及它是否被设计成可发布产物。',
  },
  {
    title: '运行时与模块字段',
    summary:
      '`type`、`main`、`module`、`exports`、`types` 决定 Node、TS 和打包器怎样解析这个包。',
  },
  {
    title: '依赖声明字段',
    summary:
      '`dependencies`、`devDependencies`、`peerDependencies`、`optionalDependencies` 决定依赖归属和安装责任。',
  },
  {
    title: '工程入口字段',
    summary:
      '`scripts` 和 `bin` 决定这个包怎么被执行，是普通应用入口、构建入口还是 CLI 工具入口。',
  },
  {
    title: '发布控制字段',
    summary:
      '`files`、`sideEffects`、`publishConfig` 决定最终发出去什么，以及消费者如何获得更小、更稳的包。',
  },
  {
    title: '团队协作字段',
    summary:
      '`packageManager`、`engines`、`config`、`lint-staged` 这些字段是在固化团队工具链和操作习惯。',
  },
];

const fieldGuides = [
  {
    field: 'private',
    scope: '发布安全',
    summary:
      '这个字段最朴素，但在应用项目里非常关键。它能直接阻止误发包，是保护业务仓库的第一道防线。',
    purpose: '告诉 npm/pnpm/yarn：这个包不应该被发布出去。',
    whenToUse:
      '所有纯应用项目、公司内部私有站点、不会作为 npm 包分发的仓库都建议写上。',
    risks: [
      '忘了写 private，执行 publish 时可能把业务代码发上去。',
      'monorepo 根包不加 private，容易误导发布流程。',
      '把能发版的子包也设成 private，会导致发布链路异常。',
    ],
    language: 'json',
    example: `{
  "name": "company-admin-app",
  "private": true
}`,
  },
  {
    field: 'type',
    scope: '模块系统',
    summary:
      'Node 会根据这个字段决定 `.js` 默认按 CommonJS 还是 ESM 解释。它看起来只是一行，但会直接影响 import/export、__dirname、require 等行为。',
    purpose: '统一包内 JavaScript 文件的默认模块语义。',
    whenToUse:
      '现代前端工程、Vite 项目、组件库、SDK 基本都会显式声明；老式 Node 工具链则需要谨慎迁移。',
    risks: [
      '切到 module 后，旧脚本里的 require 和 __dirname 直接失效。',
      '项目里 ESM/CJS 混用但没有做好产物区分。',
      '团队不知道 type 的影响，调试半天以为是 Vite 问题。',
    ],
    language: 'json',
    example: `{
  "type": "module"
}`,
  },
  {
    field: 'scripts',
    scope: '工程入口',
    summary:
      'scripts 是整个项目的公共按钮。你不该要求团队记住一长串底层命令，而应该把这些命令通过 scripts 收敛成稳定接口。',
    purpose: '给开发、测试、构建、格式化、发布等高频动作提供统一入口。',
    whenToUse: '任何 Node 项目都应该使用 scripts 管理核心操作。',
    risks: [
      '脚本名风格混乱，团队难以形成习惯。',
      '把多个职责强行塞进一个脚本，定位问题困难。',
      '脚本相互耦合但没人知道执行顺序。',
    ],
    language: 'json',
    example: `{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "lint": "eslint .",
    "release": "pnpm lint && pnpm test && pnpm build"
  }
}`,
  },
  {
    field: 'exports',
    scope: '包公开接口',
    summary:
      'exports 不只是替代 main，它是在定义“哪些入口是公开的，哪些内部文件不允许别人依赖”。这是做包时非常重要的一层封装边界。',
    purpose: '精确定义包暴露给外部的入口和不同模块制的映射关系。',
    whenToUse:
      '只要项目要被别人安装消费，尤其是库和 SDK，都建议优先配置 exports。',
    risks: [
      '忘记把子路径入口导出去，消费者升级后直接找不到模块。',
      '内部路径曾被外部直接引用，切 exports 后产生 breaking change。',
      'exports 和 types 路径不一致，TS 与运行时表现分裂。',
    ],
    language: 'json',
    example: `{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./client": {
      "types": "./dist/client.d.ts",
      "import": "./dist/client.js"
    }
  }
}`,
  },
  {
    field: 'peerDependencies',
    scope: '宿主约束',
    summary:
      '这个字段不是“备用依赖”，而是在告诉使用方：这个能力包要工作，宿主必须提供某个版本范围内的依赖。组件库和插件系统最常用它。',
    purpose: '避免同一个生态包被安装多份，并明确兼容宿主版本范围。',
    whenToUse:
      'React/Vue 组件库、Vite/ESLint/Prettier 插件、SDK 插件包都高频使用。',
    risks: [
      '本该交给宿主提供的框架包被塞进 dependencies。',
      'peer 范围写太宽，实际并不兼容。',
      '只写 peer 不写 devDependencies，导致本地开发没法跑。',
    ],
    language: 'json',
    example: `{
  "peerDependencies": {
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "vue": "^3.5.32"
  }
}`,
  },
  {
    field: 'packageManager',
    scope: '团队一致性',
    summary:
      '它的价值不是提供功能，而是防止团队乱。明确指定包管理器和版本后，团队、CI 和脚手架生成行为会更一致。',
    purpose: '约束项目应使用的包管理器及其版本。',
    whenToUse: '团队项目、monorepo、需要长期维护的仓库都建议显式声明。',
    risks: [
      '不同成员用不同包管理器，锁文件反复漂移。',
      'CI 用的版本和本地不一致，出现偶发安装差异。',
      '迁移工具后没同步更新 packageManager，导致误导后来者。',
    ],
    language: 'json',
    example: `{
  "packageManager": "pnpm@10.17.1"
}`,
  },
];

const comparisonCards = [
  {
    title: 'dependencies vs devDependencies',
    summary:
      '核心区别不是“开发时用”还是“运行时用”这么粗，而是谁为生产运行负责。只要线上代码执行时离不开它，就应进 dependencies；否则放 devDependencies。',
  },
  {
    title: 'main/module/exports',
    summary:
      '`main` 是传统入口，`module` 是面向 ESM 构建工具的历史补充，`exports` 才是现在更明确、更可控的公开入口配置。新包优先围绕 exports 设计。',
  },
  {
    title: 'type=module vs CommonJS',
    summary:
      '不是新旧高低之分，而是生态兼容问题。现代前端工程更偏 ESM，但老 Node 工具、旧脚本、部分 CLI 仍可能基于 CommonJS 工作。',
  },
];

const templateCards = [
  {
    title: '前端应用项目',
    tag: 'App',
    summary:
      '应用项目重点是 private、scripts、dependencies、devDependencies 和团队约束字段。它通常不需要复杂导出配置，因为不会被别人安装使用。',
    code: `{
  "name": "marketing-site",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint ."
  },
  "dependencies": {
    "vue": "^3.5.32"
  },
  "devDependencies": {
    "vite": "^8.0.4",
    "typescript": "~6.0.2"
  }
}`,
  },
  {
    title: '组件库 / SDK 包',
    tag: 'Library',
    summary:
      '可发布包重点转向 version、exports、types、files、peerDependencies 和 publishConfig。这里最重要的是：消费者如何稳定安装和升级你。',
    code: `{
  "name": "@team/ui-kit",
  "version": "1.0.0",
  "type": "module",
  "files": ["dist"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  },
  "publishConfig": {
    "access": "public"
  }
}`,
  },
  {
    title: '内部 CLI / 工具包',
    tag: 'CLI',
    summary:
      '工具包除了 scripts，还要重点看 bin、engines 和发布目标。CLI 不是前端页面工程，运行环境和执行入口是第一位的。',
    code: `{
  "name": "@team/create-app",
  "version": "0.3.0",
  "type": "module",
  "bin": {
    "create-team-app": "./dist/cli.js"
  },
  "engines": {
    "node": ">=20"
  },
  "files": ["dist"],
  "dependencies": {
    "commander": "^14.0.1"
  }
}`,
  },
];
</script>

<style scoped>
.package-json-guide-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(214, 223, 230, 0.45),
      transparent 28%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f3f6f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.package-json-guide-page__shell {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.package-json-guide-page__top {
  display: flex;
  justify-content: flex-start;
}

.package-json-guide-page__back {
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

.package-json-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(71, 90, 108, 0.18);
  box-shadow: 0 16px 30px rgba(18, 26, 34, 0.08);
}

.package-json-guide-page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.package-json-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: 18px;
}

.package-json-guide-hero__eyebrow,
.package-json-guide-section__eyebrow,
.package-json-guide-card__eyebrow,
.package-json-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #7a8591;
}

.package-json-guide-hero__title {
  margin-top: 10px;
  font-size: 42px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.package-json-guide-hero__summary,
.package-json-guide-panel__text,
.package-json-guide-card__text,
.package-json-guide-list,
.package-json-guide-hero__label,
.package-json-guide-mini-panel__title,
.package-json-guide-detail__text {
  color: #59636e;
}

.package-json-guide-hero__summary {
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
}

.package-json-guide-hero__panel,
.package-json-guide-card,
.package-json-guide-panel,
.package-json-guide-mini-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.92);
}

.package-json-guide-hero__panel {
  padding: 22px;
}

.package-json-guide-hero__label {
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
}

.package-json-guide-list {
  margin: 14px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.85;
}

.package-json-guide-grid,
.package-json-guide-columns,
.package-json-guide-detail-grid {
  display: grid;
  gap: 16px;
}

.package-json-guide-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.package-json-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.package-json-guide-detail-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.package-json-guide-card,
.package-json-guide-panel {
  padding: 20px;
}

.package-json-guide-card__title,
.package-json-guide-panel__title,
.package-json-guide-section__title {
  color: #17202a;
}

.package-json-guide-card__title {
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
}

.package-json-guide-card__text,
.package-json-guide-panel__text,
.package-json-guide-detail__text {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.85;
}

.package-json-guide-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.package-json-guide-section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.package-json-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.package-json-guide-stack,
.package-json-guide-method__grid,
.package-json-guide-detail__stack {
  display: grid;
  gap: 16px;
}

.package-json-guide-method__head,
.package-json-guide-detail__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.package-json-guide-method__tag {
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

.package-json-guide-method__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 16px;
}

.package-json-guide-detail__stack {
  margin-top: 16px;
}

.package-json-guide-mini-panel {
  padding: 16px;
}

.package-json-guide-mini-panel__title {
  font-size: 13px;
  line-height: 1.4;
  font-weight: 600;
}

.package-json-guide-code-block {
  margin-top: 16px;
}

.package-json-guide-panel.is-wide {
  padding: 24px;
}

@media (max-width: 1200px) {
  .package-json-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .package-json-guide-columns,
  .package-json-guide-detail-grid,
  .package-json-guide-method__grid,
  .package-json-guide-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .package-json-guide-page {
    min-height: auto;
    padding: 22px;
  }

  .package-json-guide-grid {
    grid-template-columns: 1fr;
  }

  .package-json-guide-hero__title {
    font-size: 34px;
  }

  .package-json-guide-section__title {
    font-size: 26px;
  }
}
</style>
