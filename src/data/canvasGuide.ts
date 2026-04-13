export type CanvasGuideSection = {
  id: string;
  title: string;
  summary: string;
  bullets?: string[];
  code?: string;
  callout?: string;
};

export type CanvasGuideChapter = {
  id: string;
  label: string;
  description: string;
  outcome: string;
  sections: CanvasGuideSection[];
};

export const canvasGuideChapters: CanvasGuideChapter[] = [
  {
    id: 'canvas-foundation',
    label: '1. Canvas 基础认知',
    description:
      '先理解画布是什么、它和 DOM 的差异，以及 editor 为什么偏爱 Canvas。',
    outcome: '掌握位图画布、绘制上下文和渲染职责分层。',
    sections: [
      {
        id: 'why-canvas',
        title: '为什么是 Canvas',
        summary:
          'Canvas 是一块位图画布。你每次调用 API 都是在直接改像素结果，而不是声明一棵可 diff 的节点树。',
        bullets: [
          'DOM/SVG 更适合结构化元素，Canvas 更适合高频绘制和自由图形。',
          'Canvas editor 的核心优势是：统一渲染模型、自由变换、可控性能。',
          '代价也很明确：你需要自己管理重绘、选中、命中检测和状态同步。',
        ],
        callout:
          '初学者最容易犯的错，是把 Canvas 当成“会自动记住图形的舞台”。实际上它只记住结果，不记住对象。',
      },
      {
        id: 'context-model',
        title: '2D 上下文模型',
        summary:
          '浏览器通过 `getContext("2d")` 返回 2D 绘图上下文，所有绘制能力都挂在这个对象上。',
        bullets: [
          '路径 API：线、矩形、圆弧、贝塞尔曲线。',
          '状态 API：fillStyle、strokeStyle、lineWidth、globalAlpha、font。',
          '变换 API：translate、scale、rotate、transform、setTransform。',
        ],
        code: `const canvas = document.querySelector('canvas')!\nconst ctx = canvas.getContext('2d')!\n\nctx.fillStyle = '#111827'\nctx.fillRect(0, 0, canvas.width, canvas.height)\n\nctx.fillStyle = '#38bdf8'\nctx.beginPath()\nctx.arc(160, 120, 56, 0, Math.PI * 2)\nctx.fill()`,
      },
      {
        id: 'canvas-size',
        title: '画布尺寸与 CSS 尺寸',
        summary:
          'Canvas 有两套尺寸：元素的显示尺寸和内部像素尺寸。做 editor 时必须优先控制内部像素尺寸。',
        bullets: [
          'CSS 控制“看起来多大”，width/height 属性控制“实际像素多少”。',
          '如果只改 CSS，不改内部像素，内容会被浏览器拉伸导致模糊。',
          '高 DPI 屏幕必须按 `devicePixelRatio` 放大内部尺寸。',
        ],
        code: `const dpr = window.devicePixelRatio || 1\nconst rect = canvas.getBoundingClientRect()\ncanvas.width = Math.round(rect.width * dpr)\ncanvas.height = Math.round(rect.height * dpr)\nctx.setTransform(dpr, 0, 0, dpr, 0, 0)`,
      },
      {
        id: 'render-loop',
        title: '重绘思维',
        summary:
          'Canvas editor 不应该随手局部乱画，而应该把“场景状态”保存在数据里，每次统一 render。',
        bullets: [
          '数据层：元素、选中态、缩放、滚动、工具状态。',
          '渲染层：清屏 -> 视口变换 -> 画网格 -> 画元素 -> 画选中框。',
          '交互层：鼠标事件只改状态，不直接埋一堆临时绘图。',
        ],
      },
    ],
  },
  {
    id: 'drawing-primitives',
    label: '2. 图形绘制与状态',
    description:
      '掌握矩形、路径、文字、图片和 save/restore，开始具备画 editor 元素的能力。',
    outcome: '能够独立绘制节点、边框、背景、图标和文本标签。',
    sections: [
      {
        id: 'basic-shapes',
        title: '基本图形',
        summary:
          '矩形可以直接画，复杂图形要用路径。路径是 Canvas editor 中最常见的绘制入口。',
        bullets: [
          '矩形：fillRect / strokeRect / clearRect。',
          '路径：beginPath -> moveTo/lineTo -> closePath -> fill/stroke。',
          '圆角建议自己封装函数，后续节点、按钮、控制点都能复用。',
        ],
      },
      {
        id: 'save-restore',
        title: 'save / restore',
        summary:
          '每个局部组件都应该在独立状态栈里绘制，避免颜色、透明度、变换串到别的元素。',
        bullets: [
          '进入组件前 save，绘制完成后 restore。',
          '这是 editor 渲染函数最基础的边界控制方式。',
          '没有 restore，后面的图层经常会“莫名其妙跟着旋转或缩放”。',
        ],
        code: `function drawNode(ctx, node) {\n  ctx.save()\n  ctx.translate(node.x, node.y)\n  ctx.fillStyle = node.selected ? '#2563eb' : '#1f2937'\n  ctx.fillRect(0, 0, node.width, node.height)\n  ctx.restore()\n}`,
      },
      {
        id: 'text-image',
        title: '文字与图片',
        summary:
          'Editor 里最常见的混合内容就是形状 + 文本 + 位图资源。文字和图片都要在同一个坐标系里统一处理。',
        bullets: [
          '文字排版至少要管理 font、textAlign、textBaseline。',
          '图片加载完后再统一触发 render，避免空白闪烁。',
          '要做缩略图或贴纸编辑器，图片缓存非常重要。',
        ],
        code: `const image = new Image()\nimage.src = '/assets/sticker.png'\nimage.onload = () => render()\n\nctx.font = '14px Avenir Next'\nctx.fillStyle = '#e5e7eb'\nctx.fillText('Canvas Editor', 24, 32)\nctx.drawImage(image, 24, 48, 64, 64)`,
      },
      {
        id: 'style-order',
        title: '绘制顺序',
        summary:
          'Canvas 没有天然层级，后画的一定在上面。图层顺序需要你自己设计清楚。',
        bullets: [
          '背景层：网格、画布底色。',
          '内容层：节点、线段、图片区块、辅助图形。',
          '交互层：吸附线、hover 态、选中框、控制柄、临时预览。',
        ],
      },
    ],
  },
  {
    id: 'transform-and-camera',
    label: '3. 坐标系与视口',
    description:
      '从世界坐标、屏幕坐标和缩放平移入手，建立 editor 的“相机系统”。',
    outcome: '能实现拖动画布、缩放画布、元素变换和坐标换算。',
    sections: [
      {
        id: 'world-vs-screen',
        title: '世界坐标与屏幕坐标',
        summary:
          'Editor 里最重要的抽象之一就是分清：元素存在于世界坐标，鼠标事件来自屏幕坐标。',
        bullets: [
          '世界坐标：元素自身真实位置。',
          '屏幕坐标：用户看到的像素位置。',
          '相机参数：offsetX、offsetY、zoom。',
        ],
      },
      {
        id: 'camera-transform',
        title: '视口变换',
        summary:
          '统一用相机变换进入内容层，后面所有元素都以同一套世界坐标渲染。',
        code: `function renderScene(ctx, camera, shapes) {\n  ctx.clearRect(0, 0, width, height)\n  ctx.save()\n  ctx.translate(camera.x, camera.y)\n  ctx.scale(camera.zoom, camera.zoom)\n\n  for (const shape of shapes) {\n    drawShape(ctx, shape)\n  }\n\n  ctx.restore()\n}`,
        bullets: [
          '缩放应该围绕鼠标位置做补偿，不然体验会很差。',
          '渲染时统一进相机，命中检测时统一反算回世界坐标。',
        ],
      },
      {
        id: 'rotation-scale',
        title: '元素级变换',
        summary:
          '做 editor 时，视口变换只是第一层，元素自己还可能旋转、缩放、镜像。',
        bullets: [
          '推荐每个元素维护本地矩阵或最少维护 x/y/width/height/rotation。',
          '复杂一点的 editor 最终都会抽象成矩阵变换。',
          '先做好矩形包围盒，再逐步升级为真实路径命中。',
        ],
      },
      {
        id: 'coordinate-helper',
        title: '坐标换算工具',
        summary:
          '不要把公式散落在事件里。把屏幕坐标转世界坐标、世界坐标转屏幕坐标都封成工具函数。',
        code: `function screenToWorld(point, camera) {\n  return {\n    x: (point.x - camera.x) / camera.zoom,\n    y: (point.y - camera.y) / camera.zoom,\n  }\n}\n\nfunction worldToScreen(point, camera) {\n  return {\n    x: point.x * camera.zoom + camera.x,\n    y: point.y * camera.zoom + camera.y,\n  }\n}`,
      },
    ],
  },
  {
    id: 'interaction-and-hit-test',
    label: '4. 事件系统与命中检测',
    description:
      '这一章决定 editor 是否真正可用。重点是拾取、拖拽、框选和工具状态机。',
    outcome: '具备鼠标交互、元素选中、拖拽和框选的实现思路。',
    sections: [
      {
        id: 'hit-testing',
        title: '命中检测',
        summary:
          'Canvas 没有 DOM 事件冒泡模型，所以你必须自己算“当前鼠标命中了谁”。',
        bullets: [
          '最简单：倒序遍历元素，用矩形包围盒判断。',
          '更精确：路径命中或像素命中。',
          '大多数 editor 先用包围盒，热点控制柄单独做更细检测。',
        ],
      },
      {
        id: 'pointer-state',
        title: '指针状态机',
        summary: '拖拽类工具必须显式维护状态，而不是在 mousemove 里随缘判断。',
        bullets: [
          'idle：空闲。',
          'panning：拖动画布。',
          'dragging-node：拖元素。',
          'resizing / rotating / selecting：不同工具分别建状态。',
        ],
      },
      {
        id: 'selection-box',
        title: '框选与吸附',
        summary: '编辑器的高级感通常来自框选和吸附线，而不是单纯画得多漂亮。',
        bullets: [
          '框选本质是一个临时矩形，和所有元素包围盒求交。',
          '吸附线需要预先计算候选边界，再在拖拽中找最近值。',
          '建议把吸附结果作为“辅助状态”挂到 render 中统一绘制。',
        ],
      },
      {
        id: 'event-architecture',
        title: '事件结构建议',
        summary:
          '把事件分成输入层、状态层、渲染层。输入层只采集，状态层决定结果，渲染层只画。',
        code: `canvas.addEventListener('pointerdown', onPointerDown)\ncanvas.addEventListener('pointermove', onPointerMove)\ncanvas.addEventListener('pointerup', onPointerUp)\n\nfunction onPointerMove(event) {\n  const point = screenToWorld(getPointer(event), camera)\n  interactionState = reducer(interactionState, {\n    type: 'pointer-move',\n    point,\n  })\n  render()\n}`,
      },
    ],
  },
  {
    id: 'performance-and-rendering',
    label: '5. 动画与性能',
    description:
      '当场景元素开始变多后，性能设计会直接决定 editor 是否还能继续扩展。',
    outcome: '知道何时全量重绘，何时分层缓存，以及如何避免卡顿。',
    sections: [
      {
        id: 'full-render',
        title: '全量重绘是默认策略',
        summary:
          '对中小型 editor 来说，统一全量 render 往往比局部修补更可靠。先做对，再做快。',
        bullets: [
          '一个 render 函数统一输出当前场景。',
          '只在状态变化时 render，不要每个事件都无脑 setInterval。',
          '动画和拖拽用 requestAnimationFrame 驱动。',
        ],
      },
      {
        id: 'cache-layer',
        title: '分层缓存',
        summary:
          '当静态背景、网格或复杂元素开销变大时，优先把它们缓存到离屏 canvas。',
        bullets: [
          '背景层缓存：网格、标尺、底纹。',
          '资源层缓存：复杂节点、贴图、缩略图。',
          '交互层实时绘制：选中框、hover、拖拽预览。',
        ],
      },
      {
        id: 'dirty-region',
        title: '脏区优化什么时候做',
        summary:
          '脏区优化不是起点，而是后期手段。没有清晰数据模型就做脏区，通常只会把系统搞复杂。',
        bullets: [
          '先全量重绘，确认瓶颈真的在绘制。',
          '再看是否需要区域刷新、图块缓存或更粗的场景分页。',
          '大多数团队在 1.0 阶段先做缓存，不急着上脏区。',
        ],
      },
      {
        id: 'high-dpi-performance',
        title: '高 DPI 与成本控制',
        summary:
          '像素越高，绘制成本越高。做 editor 要在清晰度和帧率之间留出调节开关。',
        bullets: [
          '可以给预览模式和编辑模式不同的渲染倍率。',
          '拖拽时适当降采样，停止后再恢复高精度。',
          '文本和细线要特别留意缩放时的锐度变化。',
        ],
      },
    ],
  },
  {
    id: 'editor-architecture',
    label: '6. 面向 Canvas Editor 的实现',
    description:
      '把前面知识串起来，形成一个适合做 canvas-editor 的最小可用架构。',
    outcome: '知道如何落地项目结构、核心模块和后续扩展方向。',
    sections: [
      {
        id: 'core-modules',
        title: '最小模块划分',
        summary:
          '一个能扩展的 canvas-editor，至少应拆成渲染、场景、选择、工具和历史记录五层。',
        bullets: [
          'scene：元素树、图层、顺序。',
          'renderer：统一 render 管线。',
          'interaction：工具状态机和事件分发。',
          'history：撤销重做。',
          'viewport：缩放、平移、坐标换算。',
        ],
      },
      {
        id: 'data-shape',
        title: '数据结构建议',
        summary: '不要一开始就上特别复杂的 schema，但元素的基础字段要留够。',
        code: `type EditorNode = {\n  id: string\n  type: 'rect' | 'text' | 'image' | 'path'\n  x: number\n  y: number\n  width: number\n  height: number\n  rotation: number\n  style: Record<string, unknown>\n}\n\ntype EditorState = {\n  nodes: EditorNode[]\n  selectedIds: string[]\n  viewport: { x: number; y: number; zoom: number }\n}`,
      },
      {
        id: 'build-order',
        title: '推荐开发顺序',
        summary:
          '想最快做出可用版本，不要一开始就做太多花活。先把核心闭环打通。',
        bullets: [
          '第一步：矩形节点 + 选中 + 拖拽。',
          '第二步：缩放平移 + 框选 + 多选。',
          '第三步：文本图片 + 层级管理。',
          '第四步：吸附线 + 快捷键 + 历史记录。',
          '第五步：序列化、导出、插件式工具栏。',
        ],
      },
      {
        id: 'common-pitfalls',
        title: '常见坑位',
        summary:
          '做 canvas-editor 时，真正拖慢项目的通常不是 API 本身，而是架构边界不清。',
        bullets: [
          '事件里直接改画面，不改状态。',
          '坐标换算和视口变换写得到处都是。',
          '元素数据和临时 UI 状态混在一起。',
          '没有统一的 render 入口，导致难以维护。',
        ],
        callout:
          '如果你的 editor 目标是长期演进，优先保证“状态统一、渲染统一、事件统一”。这比多做几个酷炫效果更重要。',
      },
    ],
  },
];
