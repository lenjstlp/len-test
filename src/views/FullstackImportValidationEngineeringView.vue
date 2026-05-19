<template>
  <FullstackCapabilityArticle
    eyebrow="Frontend Import Validation Engineering"
    title="前端导入校验工程"
    summary="导入 Excel、CSV 看着像上传文件，实际上真正难的是字段映射、批量校验、错误定位和纠错反馈。做不好，用户看到的只是“导入失败”四个字，根本不知道错在哪一行、哪一列。"
    :outcomes="outcomes"
    :quick-stages="quickStages"
    decision-title="导入校验先统一列映射和错误模型，再治理预检、批量反馈和纠错闭环"
    :guide-stages="guideStages"
    comparison-title="后端兜底校验、前端预检校验、双端协同校验三种路线的差异"
    :comparison-cards="comparisonCards"
    checklist-title="导入校验工程上线前必须补齐的 6 个点"
    :checklist="checklist"
  />
</template>

<script setup lang="ts">
import FullstackCapabilityArticle from '@/components/FullstackCapabilityArticle.vue';

const outcomes = [
  '能把导入列定义、字段映射和错误类型抽成统一协议，而不是用一堆散乱 if/else 做校验。',
  '能在前端完成格式预检、必填检查、枚举检查和错误定位，降低后端失败成本。',
  '能为批量导入、病历导入、人员导入、配置导入等场景提供更清晰的纠错闭环。',
];

const quickStages = [
  {
    order: '01',
    title: '先定列映射',
    summary: '模板列名、字段 key、类型、必填规则先统一下来。',
  },
  {
    order: '02',
    title: '错误模型标准化',
    summary: '哪一行、哪一列、什么错误，要能结构化返回。',
  },
  {
    order: '03',
    title: '前端先做预检',
    summary: '明显格式错误别都丢给后端，用户等待成本太高。',
  },
  {
    order: '04',
    title: '批量反馈可读',
    summary: '错误反馈要能定位行列，而不是只有一句导入失败。',
  },
  {
    order: '05',
    title: '纠错闭环顺畅',
    summary: '支持下载错误明细、重新导入和局部修正。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '导入的核心不是上传文件，而是先把“列映射协议”抽清楚',
    tag: '列映射',
    description:
      '很多项目一开始把导入理解成上传 Excel 后发给后端，但真正可维护的做法，一定是先把模板列、字段 key、字段类型、必填规则、默认值、枚举映射统一成可复用协议。这样模板变更、字段扩展和错误定位才有共同基础。',
    bestFor: ['人员导入', '配置导入', '医疗基础数据导入', '批量台账导入'],
    focus: [
      '模板列与业务字段显式映射',
      '字段类型、必填、默认值写入协议层',
      '前后端共享同一份导入字段定义',
    ],
    risks: [
      '列名一变前端和后端同时失效',
      '不同导入功能重复维护字段定义',
      '错误无法准确定位到业务字段',
    ],
    language: 'ts',
    code: `type ImportColumnSchema = {
  key: string
  title: string
  required?: boolean
  valueType: 'string' | 'number' | 'date' | 'enum'
}`,
  },
  {
    order: '02',
    title: '错误反馈要结构化到行列级，别只返回“导入失败”',
    tag: '错误模型',
    description:
      '导入失败最常见的体验问题，就是用户完全不知道错在哪。稳定方案是把错误定义成结构化对象，至少包含行号、列 key、错误类型和错误文案。这样前端才能高亮表格、生成错误列表，甚至支持导出错误报告。',
    bestFor: ['高频导入', '大批量数据上传', '运营后台', '医疗数据维护'],
    focus: [
      '错误信息细化到行列级',
      '错误类型可枚举，便于统计和分组',
      '同一行支持收集多个字段错误',
    ],
    risks: [
      '用户只能反复猜测哪一行错了',
      '前端无法做精确高亮和定位',
      '导入失败统计没有统一口径',
    ],
    language: 'ts',
    code: `type ImportError = {
  rowIndex: number
  columnKey: string
  reason: string
  code: 'required' | 'format' | 'enum' | 'duplicate'
}`,
  },
  {
    order: '03',
    title: '前端预检不是替代后端校验，而是提前拦掉低级错误',
    tag: '双端协同',
    description:
      '后端最终校验当然不能少，但前端预检能显著减少无意义上传和等待时间。像空值、格式、日期、枚举、数值边界这类问题，前端可以先拦截；涉及数据库冲突、权限、唯一性等强业务规则，再交给后端做最终确认。',
    bestFor: ['大文件导入', '远程校验成本高', '高频运营导入', '实时纠错场景'],
    focus: [
      '前端负责静态规则预检',
      '后端负责最终业务规则和一致性校验',
      '错误来源要区分前端与后端',
    ],
    risks: [
      '所有错误都等后端返回，反馈过慢',
      '前后端规则不一致，用户感知混乱',
      '重复上传大批量脏数据浪费资源',
    ],
    language: 'ts',
    code: `const validateCell = (
  value: unknown,
  schema: ImportColumnSchema,
): string | null => {
  if (schema.required && (value === '' || value === null || value === undefined)) {
    return '必填项不能为空'
  }

  return null
}`,
  },
];

const comparisonCards = [
  {
    title: '后端兜底校验',
    summary: '实现最省，但用户反馈最慢，导入体验通常较差。',
  },
  {
    title: '前端预检校验',
    summary: '能明显改善体验，但仍需后端做最终业务校验。',
  },
  {
    title: '双端协同校验',
    summary: '是更稳的工程方案，前端负责快速反馈，后端负责最终一致性。',
  },
];

const checklist = [
  '导入模板列定义必须结构化。',
  '错误模型要精确到行号、列号和错误类型。',
  '前端预检与后端校验边界要明确。',
  '批量错误反馈需要支持高亮、筛选和导出。',
  '重新导入和错误修复流程要顺畅。',
  '模板版本变化要有兼容策略和提示。',
];
</script>
