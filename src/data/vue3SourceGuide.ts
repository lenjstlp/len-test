export type Vue3SourceGuideSection = {
  id: string;
  title: string;
  summary: string;
  bullets?: string[];
  code?: string;
  callout?: string;
};

export type Vue3SourceGuideChapter = {
  id: string;
  label: string;
  description: string;
  outcome: string;
  sections: Vue3SourceGuideSection[];
};

export const vue3SourceGuideChapters: Vue3SourceGuideChapter[] = [
  {
    id: 'source-map',
    label: '1. 先建立源码地图',
    description:
      '先别一上来钻进几千行源码。阅读 Vue 3 的正确方式，是先知道它分成哪几层，每层解决什么问题。',
    outcome:
      '看完这一章，你会知道 Vue 3 源码不是一坨黑盒，而是“响应式 + 运行时 + 编译器”三大块协同工作。',
    sections: [
      {
        id: 'what-vue-solves',
        title: 'Vue 3 到底解决什么问题',
        summary:
          '只用 JavaScript 写页面时，你要自己处理状态变化、DOM 更新、组件复用和事件绑定。Vue 的本质，就是帮你管理这条链路。',
        bullets: [
          '状态变了，页面哪些地方要更新。',
          '多个小功能怎么拼成组件，并且互不打架。',
          '模板怎么转成真正可执行的渲染函数。',
          '更新很多次时，怎么避免每次都立刻改 DOM。',
        ],
      },
      {
        id: 'packages-overview',
        title: 'Vue 3 源码最重要的几个包',
        summary:
          'Vue 3 采用 monorepo 结构，你不用一开始全看，只需要先认清几个核心模块。',
        bullets: [
          '`reactivity`：响应式系统，负责 `reactive`、`ref`、`computed`、`effect`。',
          '`runtime-core`：运行时核心，负责组件实例、调度、虚拟 DOM、diff。',
          '`runtime-dom`：把浏览器 DOM 能力接进运行时，比如创建元素、设置属性。',
          '`compiler-core` 和 `compiler-dom`：把 template 编译成 render 函数。',
        ],
        callout:
          '如果你只知道 JS，最好的顺序不是从编译器开始，而是先学响应式，再学组件更新，再回头看模板编译。',
      },
      {
        id: 'from-template-to-screen',
        title: '从模板到页面的完整链路',
        summary:
          'Vue 页面能显示出来，背后大致经历“模板编译 -> 生成虚拟节点 -> 渲染到 DOM -> 状态变化后二次 patch”这条链路。',
        code: `template\n  -> compile()\n  -> render function\n  -> vnode tree\n  -> patch()\n  -> real DOM\n\nstate changed\n  -> trigger()\n  -> scheduler\n  -> render again\n  -> patch old/new vnode`,
      },
      {
        id: 'js-reader-strategy',
        title: '只会 JS 的人，应该怎么读源码',
        summary:
          '不要追求第一次就把所有源码读懂。正确姿势是先抽象，再对应到源码函数名。',
        bullets: [
          '先问“这段代码想解决什么问题”，再看“具体是怎么实现的”。',
          '先用简化版 JavaScript 自己写一个，再去看 Vue 的工业级实现。',
          '遇到位运算、优化标记、边界判断时，不要慌，那是工程化细节，不是核心思想。',
        ],
      },
    ],
  },
  {
    id: 'reactivity-core',
    label: '2. 响应式核心',
    description:
      'Vue 3 最值得先看懂的就是响应式系统。因为只要你理解了 `track` 和 `trigger`，后面很多源码都会突然变简单。',
    outcome:
      '你会明白 `reactive`、`ref`、依赖收集、触发更新到底是怎么串起来的。',
    sections: [
      {
        id: 'proxy-basics',
        title: 'reactive 为什么用 Proxy',
        summary:
          'Vue 2 用 `Object.defineProperty`，Vue 3 改用 `Proxy`，核心原因是代理能力更完整，可以直接拦截对象读取、设置、删除等行为。',
        bullets: [
          '读取属性时做依赖收集。',
          '设置属性时通知相关副作用重新执行。',
          '数组、Map、Set 这类复杂结构也更容易支持。',
        ],
        code: `const state = new Proxy({ count: 0 }, {\n  get(target, key) {\n    track(target, key)\n    return target[key]\n  },\n  set(target, key, value) {\n    target[key] = value\n    trigger(target, key)\n    return true\n  }\n})`,
      },
      {
        id: 'track-trigger',
        title: 'track 和 trigger 的本质',
        summary:
          '`track` 是“记住谁依赖了这个值”，`trigger` 是“这个值变了，通知相关依赖重新执行”。Vue 源码所有响应式魔法，本质都绕不开这两个动作。',
        bullets: [
          '目标对象 target 要能找到。',
          '属性 key 要能找到。',
          '某个 key 对应哪些 effect，要存起来。',
          '数据变更时，把对应 effect 拿出来重新运行。',
        ],
        code: `const bucket = new WeakMap()\n\nfunction track(target, key) {\n  if (!activeEffect) return\n\n  let depsMap = bucket.get(target)\n  if (!depsMap) {\n    depsMap = new Map()\n    bucket.set(target, depsMap)\n  }\n\n  let deps = depsMap.get(key)\n  if (!deps) {\n    deps = new Set()\n    depsMap.set(key, deps)\n  }\n\n  deps.add(activeEffect)\n}\n\nfunction trigger(target, key) {\n  const depsMap = bucket.get(target)\n  const effects = depsMap?.get(key)\n  effects?.forEach((effect) => effect())\n}`,
      },
      {
        id: 'effect-basics',
        title: 'effect 是什么',
        summary:
          '`effect` 可以理解成“依赖某些状态的函数”。比如组件渲染函数，本质上也是一个 effect：它读了响应式数据，所以这些数据变化后，组件要重新渲染。',
        code: `let activeEffect = null\n\nfunction effect(fn) {\n  const wrappedEffect = () => {\n    activeEffect = wrappedEffect\n    fn()\n    activeEffect = null\n  }\n\n  wrappedEffect()\n  return wrappedEffect\n}\n\neffect(() => {\n  console.log(state.count)\n})`,
        callout:
          '组件更新之所以能自动发生，本质上不是“Vue 会魔法刷新”，而是组件 render 被包装成了 effect。',
      },
      {
        id: 'ref-and-computed',
        title: 'ref 和 computed 为什么又是一层封装',
        summary:
          '`reactive` 更适合对象，`ref` 更适合单值；`computed` 则是在 effect 之上再包了一层缓存和惰性求值。',
        bullets: [
          '`ref` 用 `.value` 包裹一个单值，方便对数字、字符串、布尔值做响应式。',
          '`computed` 不会每次都重新算，依赖没变时直接读缓存。',
          '它们不是新原理，只是对响应式基础设施的更友好封装。',
        ],
      },
    ],
  },
  {
    id: 'component-runtime',
    label: '3. 组件实例与 setup',
    description:
      '你写的组件不是直接运行的普通对象，Vue 会先把它包装成一个组件实例，再把 props、slots、setup、render 都挂到这个实例上。',
    outcome:
      '你会知道 `createApp`、`mount`、组件实例、`setup()` 和 render 函数在运行时是如何串起来的。',
    sections: [
      {
        id: 'create-app-mount',
        title: 'createApp 和 mount 做了什么',
        summary:
          '`createApp(App).mount("#app")` 看起来只有一行，但它做了两件大事：先创建应用，再把根组件变成 vnode 并交给渲染器。',
        code: `const app = createApp(RootComponent)\napp.mount('#app')\n\n// 概念上接近：\nconst vnode = createVNode(RootComponent)\nrender(vnode, container)`,
      },
      {
        id: 'component-instance',
        title: '组件实例里装了什么',
        summary:
          'Vue 不会裸跑你的组件对象，而是创建一个实例对象，里面记录当前组件的上下文和运行状态。',
        bullets: [
          '当前 vnode 和组件类型。',
          'props、attrs、slots、emit。',
          '`setup()` 的返回值。',
          'render 函数、生命周期、更新副作用。',
        ],
        callout:
          '以后你看到源码里的 `instance`，可以把它理解成“这个组件在运行时的总控制台”。',
      },
      {
        id: 'setup-execution',
        title: 'setup 为什么这么重要',
        summary:
          'Composition API 的核心就是 `setup()`。Vue 在创建组件实例后，会调用 `setup()`，并把它的返回结果挂到渲染上下文上。',
        code: `const Comp = {\n  props: ['title'],\n  setup(props) {\n    const count = ref(0)\n\n    return {\n      count,\n      double: computed(() => count.value * 2)\n    }\n  }\n}`,
        bullets: [
          '`setup(props, context)` 先于渲染执行。',
          '如果返回函数，这个函数会直接作为 render。',
          '如果返回对象，这个对象会暴露给模板和 render 使用。',
        ],
      },
      {
        id: 'component-render-effect',
        title: '组件为什么能自动更新',
        summary:
          '因为组件最终会被包装成一个渲染 effect。第一次执行时生成 DOM，后面状态变更时同一个 effect 会重新跑，再进入 diff。',
        code: `effect(() => {\n  const subTree = instance.render()\n  patch(instance.subTree, subTree, container)\n  instance.subTree = subTree\n})`,
      },
    ],
  },
  {
    id: 'renderer-patch',
    label: '4. 渲染器与 diff',
    description:
      '理解 Vue 3 渲染器，你就会明白“组件更新”并不是整页重画，而是通过 vnode 对比，把最少的 DOM 改动应用到页面上。',
    outcome:
      '你会理解 vnode、patch、shapeFlag、keyed diff 这些常见源码术语在解决什么问题。',
    sections: [
      {
        id: 'what-is-vnode',
        title: 'vnode 是什么',
        summary:
          'vnode 就是“虚拟节点对象”。它不是 DOM，而是 DOM 的描述信息。Vue 先生成 vnode，再由渲染器决定怎么把它变成真实页面。',
        code: `const vnode = {\n  type: 'div',\n  props: { class: 'card' },\n  children: 'hello vue'\n}`,
        bullets: [
          '`type` 表示标签或组件。',
          '`props` 表示属性和事件。',
          '`children` 表示子节点。',
          '`el` 等字段会在渲染后指向真实 DOM。',
        ],
      },
      {
        id: 'patch-core',
        title: 'patch 的核心职责',
        summary:
          '`patch(oldVNode, newVNode)` 的本质就是：旧树和新树怎么比较，并把差异更新到真实 DOM。',
        bullets: [
          '第一次没有旧节点时，走挂载逻辑。',
          '类型变了，通常直接卸载旧节点再挂新节点。',
          '类型没变，则继续细分处理 props、children、组件更新。',
        ],
      },
      {
        id: 'shape-flags',
        title: 'shapeFlag 这种位运算别怕',
        summary:
          'Vue 源码常见位运算，不是为了炫技，而是为了快速判断 vnode 属于哪一类，比如元素、组件、文本子节点、数组子节点。',
        code: `const ELEMENT = 1\nconst STATEFUL_COMPONENT = 1 << 2\nconst TEXT_CHILDREN = 1 << 3\nconst ARRAY_CHILDREN = 1 << 4\n\nif (shapeFlag & ELEMENT) {\n  // 是元素节点\n}`,
        callout:
          '如果你只会普通 JS，也不用死磕位运算推导。先理解它只是“高效打标记”的方式就够了。',
      },
      {
        id: 'keyed-diff',
        title: '为什么列表更新需要 key',
        summary:
          'Vue 在比对子节点数组时，需要知道“哪个旧节点对应哪个新节点”。`key` 的作用，就是给 diff 一个稳定身份。',
        bullets: [
          '没有 key 时，Vue 只能尽量按位置猜。',
          '有 key 时，Vue 才能复用节点、移动节点，而不是粗暴重建。',
          '这也是 `v-for` 为什么总强调要写稳定 key。',
        ],
        code: `old: [a, b, c, d]\nnew: [b, a, d, c]\n\n// 有 key 时，Vue 可以知道它们是移动，不是重新创建`,
      },
    ],
  },
  {
    id: 'scheduler-watch',
    label: '5. 调度器、watch 与更新时机',
    description:
      '很多人以为数据一变 Vue 就立刻操作 DOM。其实中间还隔着调度器。Vue 会把更新任务收集起来，合并后再执行。',
    outcome:
      '你会知道 `nextTick`、任务队列、watch 和组件异步更新背后的调度逻辑。',
    sections: [
      {
        id: 'scheduler-why',
        title: '为什么 Vue 需要调度器',
        summary:
          '如果每次数据变化都立刻重渲染，多个连续赋值会导致大量重复计算和 DOM 操作。调度器的作用，就是把这些更新先放进队列，再统一执行。',
        bullets: [
          '去重：同一个组件连改多次，队列里只保留一次更新。',
          '批处理：本轮同步代码结束后再统一刷新。',
          '控制顺序：父组件、子组件、watch 回调需要可控执行顺序。',
        ],
      },
      {
        id: 'job-queue',
        title: '一个简化版 job queue',
        summary:
          'Vue 的调度器很复杂，但你先理解最小模型就够了：把更新函数塞进 Set，再用微任务统一冲刷。',
        code: `const queue = new Set()\nlet isFlushing = false\n\nfunction queueJob(job) {\n  queue.add(job)\n\n  if (!isFlushing) {\n    isFlushing = true\n    Promise.resolve().then(() => {\n      queue.forEach((job) => job())\n      queue.clear()\n      isFlushing = false\n    })\n  }\n}`,
      },
      {
        id: 'watch-source',
        title: 'watch 和 watchEffect 的区别',
        summary:
          '`watchEffect` 会自动收集内部依赖，`watch` 则更明确，要求你告诉它要观察什么源。源码里两者最后都建立在 effect 机制之上。',
        bullets: [
          '`watchEffect(() => console.log(state.count))` 更像自动追踪。',
          '`watch(() => state.count, cb)` 更像精确监听。',
          '两者都支持清理副作用和异步时机控制。',
        ],
      },
      {
        id: 'next-tick',
        title: 'nextTick 为什么能拿到更新后的 DOM',
        summary:
          '因为 Vue 的 DOM 更新通常不是同步立刻完成，而是进入调度队列。`nextTick` 本质上就是等这次队列刷新结束后再执行你的回调。',
        code: `count.value++\nconsole.log(el.textContent) // 这里可能还是旧的\n\nawait nextTick()\nconsole.log(el.textContent) // 这里通常已经是新的`,
      },
    ],
  },
  {
    id: 'compiler-template',
    label: '6. 模板编译器',
    description:
      '如果只看运行时，你能理解 Vue 怎么更新；但想真正吃透模板，就得知道 template 是怎么被编译成 render 函数的。',
    outcome:
      '你会理解编译器并不是神秘黑箱，而是“解析 -> 转换 -> 生成代码”三步。',
    sections: [
      {
        id: 'parse-transform-generate',
        title: '编译器三步走',
        summary:
          'Vue 编译器的主线可以粗暴理解成三步：先把模板解析成 AST，再对 AST 做转换，最后生成 render 函数字符串。',
        code: `template\n  -> parse\n  -> ast\n  -> transform\n  -> codegen\n  -> render function`,
      },
      {
        id: 'ast-understanding',
        title: 'AST 不神秘，本质也是对象树',
        summary:
          'AST 就是把模板变成一棵语法树。你可以把它理解成“更适合程序处理的模板结构”。',
        code: `<div>Hello {{ name }}</div>\n\n// 概念上会变成\n{\n  type: 'Element',\n  tag: 'div',\n  children: [\n    { type: 'Text', content: 'Hello ' },\n    { type: 'Interpolation', content: 'name' }\n  ]\n}`,
      },
      {
        id: 'why-compile',
        title: '为什么 Vue 不直接运行模板字符串',
        summary:
          '因为编译后得到的 render 函数更快，也更容易做优化。很多静态节点提升、patchFlag 标记，都是在编译阶段提前完成的。',
        bullets: [
          '把静态内容提前提出来，避免每次重建。',
          '给动态节点打补丁标记，更新时更精确。',
          '把模板语义转成运行时更容易处理的函数调用。',
        ],
      },
      {
        id: 'simple-render-example',
        title: '一个最简单的模板到 render 的例子',
        summary:
          '你写 `<div>{{ msg }}</div>`，编译器大致会把它变成调用 `h` 或内部 vnode 创建函数的 render。',
        code: `<template>\n  <div>{{ msg }}</div>\n</template>\n\n// 概念上接近\nfunction render(_ctx) {\n  return h('div', null, _ctx.msg)\n}`,
        callout:
          '看到这里你就该意识到：模板不是运行时魔法，它最后一定会落成 JavaScript 函数。',
      },
    ],
  },
  {
    id: 'source-reading-path',
    label: '7. 实战阅读路线',
    description:
      '最后把前面的知识收束成真正可执行的源码阅读顺序，让你不是“看过”，而是能继续自己追进去。',
    outcome:
      '你会得到一条适合 JS 开发者的 Vue 3 源码阅读路径，并知道先读哪些函数、哪些先跳过。',
    sections: [
      {
        id: 'recommended-order',
        title: '推荐阅读顺序',
        summary:
          '如果你现在只懂 JavaScript，请按下面这个顺序读，不要一开始就钻进所有边界分支。',
        bullets: [
          '先读 `reactive / effect / track / trigger`。',
          '再读组件挂载：`createVNode -> render -> patch -> mountComponent`。',
          '然后读更新：组件 render effect、scheduler、diff。',
          '最后再补编译器：`parse -> transform -> codegen`。',
        ],
      },
      {
        id: 'what-to-ignore-first',
        title: '第一遍可以先跳过什么',
        summary:
          '工业级源码会有很多优化、兼容和 DEV 分支。第一遍不要被这些细节拖死。',
        bullets: [
          '位运算优化和很多常量标记，可以先只理解用途。',
          'SSR、Hydration、Transition、Suspense 不要第一遍就深挖。',
          '先抓主链路，再回头补性能优化和边界条件。',
        ],
      },
      {
        id: 'how-to-verify',
        title: '怎么确认自己真的看懂了',
        summary:
          '最有效的方法不是背函数名，而是用 JavaScript 自己手写一个迷你版，再拿它对照 Vue 源码。',
        bullets: [
          '自己手写一个 `reactive + effect` 最小实现。',
          '自己手写一个 `vnode + patch` 的最小渲染器。',
          '自己把一段简单模板改写成 render 函数。',
        ],
      },
      {
        id: 'final-advice',
        title: '最后的直白建议',
        summary:
          'Vue 3 源码真正难的不是概念，而是工程化细节很多。你要做的是先看懂主干，再逐步把优化细节装回去。',
        callout:
          '如果你能用自己的话讲清楚“响应式怎么收集依赖、组件为什么会重新渲染、模板为什么能变成 render 函数”，那你已经真正跨过 Vue 3 源码的大门了。',
      },
    ],
  },
];
