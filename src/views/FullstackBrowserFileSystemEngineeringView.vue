<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Browser File System Engineering"
    title="前端浏览器文件系统工程"
    summary="很多人把文件处理理解成“用户选个文件再上传”，但真实的前端工作流往往更重：批量目录读取、草稿文件落盘、本地缓存编辑结果、二次打开继续处理、导出到指定目录、与浏览器权限状态协同。真正的浏览器文件系统工程，是把文件句柄、权限、读写一致性和失败恢复一起建起来。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="浏览器文件系统工程先定读写模型、权限策略和本地恢复链路，再谈 UI 入口"
    :guide-stages="guideStages"
    comparison-title="传统 input 选文件、拖拽导入、File System Access API 三种文件能力的工程边界"
    :comparison-cards="comparisonCards"
    checklist-title="上线浏览器文件系统能力前必须自查的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把浏览器里的文件读写能力做成稳定工作流，支持再次打开、保存、导出和恢复。',
  '能分清一次性上传文件和持久化文件句柄的差别，不再把所有文件交互都塞进 input 选择器。',
  '能处理权限状态、目录遍历、本地草稿、写入冲突和失败回滚等真实工程问题。',
];

const quickStages = [
  {
    order: '01',
    title: '先定文件模型',
    summary: '是一次性导入，还是要长期持有句柄并支持回写，决定整个方案。',
  },
  {
    order: '02',
    title: '权限状态单独管理',
    summary:
      '读取许可、写入许可、目录许可不是一回事，不能混在一个按钮里想当然。',
  },
  {
    order: '03',
    title: '文件句柄要可恢复',
    summary: '草稿中心、最近打开记录和恢复入口都要建立在可持久化句柄之上。',
  },
  {
    order: '04',
    title: '读写链路要可回滚',
    summary: '写入失败、磁盘断开、句柄失效都要有明确提示和补救动作。',
  },
  {
    order: '05',
    title: '不要把能力绑死在 Chrome happy path',
    summary: '不支持 File System Access API 的浏览器必须有兼容策略。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先判断你要的是“导入文件”还是“长期管理文件句柄”',
    tag: '模型选择',
    description:
      '很多场景只需要用户把文件传进来，例如上传附件、导入 Excel、导入配置，这种用传统 input 就够了。但如果你要做本地草稿编辑器、离线文件工作台、目录级批量处理或“再次打开上次文件”，那就已经进入浏览器文件系统工程范畴，需要引入文件句柄和权限状态。',
    bestFor: [
      '本地草稿编辑',
      '目录级批量处理',
      '离线配置工具',
      '前端文件工作台',
    ],
    focus: [
      '区分一次性导入和持久句柄管理两类模型',
      '长期工作流优先考虑 File System Access API',
      '最近打开列表和恢复入口都依赖句柄持久化',
    ],
    risks: [
      '只是要上传文件，却引入过重的本地句柄体系',
      '想做再次打开，却仍然只保留文件名字符串',
      '目录和文件混用，后续能力边界模糊',
    ],
    language: 'ts',
    code: `type LocalFileSession = {
  kind: "file" | "directory"
  id: string
  title: string
}`,
  },
  {
    order: '02',
    title: '文件句柄工程的核心不是读写本身，而是权限状态管理',
    tag: '权限治理',
    description:
      '浏览器文件系统的难点在于权限不是永久稳定的。用户可能授权读取但未授权写入，也可能浏览器重启后需要重新确认。真正稳的实现，会把 `queryPermission`、`requestPermission` 和权限失效后的降级链路单独建模。',
    bestFor: ['本地保存', '二次编辑', '目录导出', '桌面工具型前端'],
    focus: [
      '读权限和写权限要分别管理',
      '权限检测结果应成为 UI 状态的一部分',
      '权限失效后要允许用户重新授权或改存其他位置',
    ],
    risks: [
      '默认用户已经永远授权，导致重新打开直接报错',
      '页面不区分可读不可写和完全不可用两种状态',
      '权限拒绝后没有任何降级方案',
    ],
    language: 'ts',
    code: `const permission = await fileHandle.queryPermission({ mode: "readwrite" })

if (permission !== "granted") {
  await fileHandle.requestPermission({ mode: "readwrite" })
}`,
  },
  {
    order: '03',
    title: '持久化的不只是文件名，而是可恢复的文件句柄与业务元数据',
    tag: '恢复能力',
    description:
      '如果你只把文件名存到 localStorage，下次用户回来根本无法继续工作。真正能恢复的，是句柄引用、上次编辑时间、草稿状态、业务上下文和最近一次导出位置。这样“继续上次工作”才有现实意义。',
    bestFor: ['前端编辑器', '配置工具', '图像处理工具', '本地知识库工作台'],
    focus: [
      '最近打开列表要关联句柄、时间和业务上下文',
      '恢复入口要能判断句柄是否仍然有效',
      '本地草稿和远端保存状态要分开管理',
    ],
    risks: [
      '最近打开列表只有文件名，没有实际可恢复能力',
      '句柄失效后仍显示可直接打开',
      '本地草稿和服务端版本互相覆盖',
    ],
    language: 'ts',
    code: `const session = {
  id: crypto.randomUUID(),
  updatedAt: Date.now(),
  fileHandle,
}`,
  },
  {
    order: '04',
    title: '写入必须走临时缓冲和错误收口，不要把“保存成功”当理所当然',
    tag: '写入一致性',
    description:
      '本地写文件并不天然成功，磁盘空间不足、句柄失效、目录被移动、浏览器权限变化都可能让写入失败。工程实现上应先生成待写内容，再统一进入写入事务，失败时保留内存草稿并提示用户重新保存。',
    bestFor: ['配置文件生成', '报表导出', '本地草稿落盘', '批量文件处理'],
    focus: [
      '保存前先构造稳定的序列化结果',
      '写入失败时保留内存中的未落盘版本',
      '成功与失败状态要能回显到工作流里',
    ],
    risks: [
      '写入异常后页面误报保存成功',
      '失败后把内存草稿也一起清掉',
      '多个保存按钮各写一套收口逻辑',
    ],
    language: 'ts',
    code: `const writable = await fileHandle.createWritable()
await writable.write(content)
await writable.close()`,
  },
  {
    order: '05',
    title: '浏览器兼容性决定你必须准备降级方案',
    tag: '兼容策略',
    description:
      '并不是所有浏览器都完整支持 File System Access API。真正可上线的方案，应该在支持环境里提供本地读写增强，在不支持环境里回退到传统导入导出、Blob 下载和服务器中转方案，而不是直接告诉用户“换浏览器”。',
    bestFor: [
      '多浏览器后台',
      '公共 SaaS 产品',
      '桌面 Web 工具',
      '企业内网系统',
    ],
    focus: [
      '先检测能力，再决定交互入口',
      '不支持时回退到 input 和 Blob 下载方案',
      '能力差异要在文档和 UI 中明确说明',
    ],
    risks: [
      '只在 Chrome 可用，其他浏览器完全瘫痪',
      '开发环境支持，生产环境受策略限制直接失效',
      '用户不知道为什么同样按钮在不同浏览器表现不同',
    ],
    language: 'ts',
    code: `const hasFileSystemAccess =
  "showOpenFilePicker" in window && "showSaveFilePicker" in window`,
  },
];

const comparisonCards = [
  {
    title: '传统 input 选文件',
    summary:
      '适合一次性导入和上传，兼容性最好，但不能长期持有句柄，也不适合构建本地工作流。',
  },
  {
    title: '拖拽导入',
    summary:
      '交互更顺手，适合批量导入和临时处理，但本质仍偏一次性输入，不等于文件系统工程。',
  },
  {
    title: 'File System Access API',
    summary:
      '适合本地读写、持续编辑和恢复工作流，能力最强，但权限和浏览器兼容治理也最重。',
  },
];

const checklist = [
  '先确认业务是一次性导入，还是需要长期持有文件句柄和回写能力。',
  '读取权限、写入权限、目录权限要分别建模，不要混成一个布尔值。',
  '最近打开、继续编辑和草稿恢复都必须基于可恢复句柄，而不是只存文件名。',
  '写入失败后要保留内存草稿，并明确提示用户当前是否已真正落盘。',
  '不支持 File System Access API 的浏览器必须有导入导出降级方案。',
  '文件句柄、业务元数据、最近使用记录和审计信息要统一进同一条工作流。',
];
</script>
