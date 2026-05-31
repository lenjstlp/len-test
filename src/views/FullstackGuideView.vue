<template>
  <section class="fullstack-menu-page">
    <header class="fullstack-menu-hero">
      <div>
        <p class="fullstack-menu-hero__eyebrow">Fullstack Capability</p>
        <h1 class="fullstack-menu-hero__title">全栈能力菜单</h1>
        <p class="fullstack-menu-hero__summary">
          这里不再直接展示长文，而是作为全栈能力模块的独立入口页。后续不同能力模块会以长方块子菜单方式继续扩展，点击后进入对应的独立空白页。
        </p>
      </div>
    </header>

    <div class="fullstack-menu-grid">
      <RouterLink
        v-for="item in menuCards"
        :key="item.path"
        :to="item.path"
        class="fullstack-menu-card"
      >
        <span class="fullstack-menu-card__title">{{ item.title }}</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const menuCards = [
  {
    path: '/fullstack-guide/download',
    title: '下载功能',
  },
  {
    path: '/fullstack-guide/upload',
    title: '前端上传',
  },
  {
    path: '/fullstack-guide/cross-origin',
    title: '前端跨域',
  },
  {
    path: '/fullstack-guide/auth',
    title: '前端鉴权',
  },
  {
    path: '/fullstack-guide/auth-token',
    title: '前端认证与令牌工程',
  },
  {
    path: '/fullstack-guide/qr-login-engineering',
    title: '前端扫码登录工程',
  },
  {
    path: '/fullstack-guide/sso-engineering',
    title: '前端单点登录工程',
  },
  {
    path: '/fullstack-guide/device-risk-engineering',
    title: '前端设备风控工程',
  },
  {
    path: '/fullstack-guide/session-kickout-engineering',
    title: '前端会话互踢工程',
  },
  {
    path: '/fullstack-guide/electronic-signature',
    title: '前端电子签章工程',
  },
  {
    path: '/fullstack-guide/im-chat-engineering',
    title: '前端 IM 聊天工程',
  },
  {
    path: '/fullstack-guide/offline-conflict-engineering',
    title: '前端离线冲突合并工程',
  },
  {
    path: '/fullstack-guide/upgrade-prompt-engineering',
    title: '前端版本升级提示工程',
  },
  {
    path: '/fullstack-guide/watermark-leak-prevention',
    title: '前端水印防泄漏工程',
  },
  {
    path: '/fullstack-guide/performance',
    title: '前端性能',
  },
  {
    path: '/fullstack-guide/performance-governance',
    title: '前端性能治理工程',
  },
  {
    path: '/fullstack-guide/security',
    title: '前端安全',
  },
  {
    path: '/fullstack-guide/monitoring',
    title: '前端监控',
  },
  {
    path: '/fullstack-guide/testing',
    title: '前端测试',
  },
  {
    path: '/fullstack-guide/monorepo',
    title: 'Monorepo 掌握',
  },
  {
    path: '/fullstack-guide/deployment',
    title: '前端部署',
  },
  {
    path: '/fullstack-guide/i18n',
    title: '前端国际化',
  },
  {
    path: '/fullstack-guide/realtime',
    title: '前端实时通信',
  },
  {
    path: '/fullstack-guide/state-management',
    title: '前端状态管理',
  },
  {
    path: '/fullstack-guide/micro-frontend',
    title: '前端微前端',
  },
  {
    path: '/fullstack-guide/forms',
    title: '前端表单工程',
  },
  {
    path: '/fullstack-guide/design-system',
    title: '前端设计系统',
  },
  {
    path: '/fullstack-guide/pwa',
    title: '前端离线与 PWA',
  },
  {
    path: '/fullstack-guide/accessibility',
    title: '前端无障碍',
  },
  {
    path: '/fullstack-guide/browser-compatibility',
    title: '前端浏览器兼容工程',
  },
  {
    path: '/fullstack-guide/bundle-governance',
    title: '前端包体积治理工程',
  },
  {
    path: '/fullstack-guide/local-database',
    title: '前端本地数据库工程',
  },
  {
    path: '/fullstack-guide/data-sync',
    title: '前端数据同步工程',
  },
  {
    path: '/fullstack-guide/session-keepalive',
    title: '前端会话保活工程',
  },
  {
    path: '/fullstack-guide/session-replay',
    title: '前端操作回放工程',
  },
  {
    path: '/fullstack-guide/url-state-engineering',
    title: '前端 URL 状态工程',
  },
  {
    path: '/fullstack-guide/clipboard-engineering',
    title: '前端剪贴板工程',
  },
  {
    path: '/fullstack-guide/notification-push-engineering',
    title: '前端通知推送工程',
  },
  {
    path: '/fullstack-guide/undo-redo-engineering',
    title: '前端撤销重做工程',
  },
  {
    path: '/fullstack-guide/gradual-release',
    title: '前端灰度发布工程',
  },
  {
    path: '/fullstack-guide/seo',
    title: '前端 SEO',
  },
  {
    path: '/fullstack-guide/bff',
    title: '前端 BFF',
  },
  {
    path: '/fullstack-guide/multi-tenant',
    title: '前端多租户',
  },
  {
    path: '/fullstack-guide/feature-flags',
    title: '前端特性开关',
  },
  {
    path: '/fullstack-guide/config-center',
    title: '前端配置中心',
  },
  {
    path: '/fullstack-guide/environment-variables',
    title: '前端环境变量工程',
  },
  {
    path: '/fullstack-guide/api-contract',
    title: '前端接口契约',
  },
  {
    path: '/fullstack-guide/resilience',
    title: '前端容灾降级',
  },
  {
    path: '/fullstack-guide/error-boundary',
    title: '前端错误边界工程',
  },
  {
    path: '/fullstack-guide/dependency-governance',
    title: '前端依赖治理',
  },
  {
    path: '/fullstack-guide/web-worker',
    title: '前端 Web Worker',
  },
  {
    path: '/fullstack-guide/package-manager',
    title: 'Node 包管理',
  },
  {
    path: '/fullstack-guide/package-json',
    title: 'package.json 详解',
  },
  {
    path: '/fullstack-guide/virtual-scrolling',
    title: '前端虚拟滚动工程',
  },
  {
    path: '/fullstack-guide/optimistic-update',
    title: '前端乐观更新工程',
  },
  {
    path: '/fullstack-guide/drag-orchestration',
    title: '前端拖拽编排工程',
  },
  {
    path: '/fullstack-guide/request-cancellation',
    title: '前端请求取消工程',
  },
  {
    path: '/fullstack-guide/api-signature',
    title: '前端接口签名工程',
  },
  {
    path: '/fullstack-guide/advanced-search',
    title: '前端富筛选查询工程',
  },
  {
    path: '/fullstack-guide/data-permission',
    title: '前端数据权限工程',
  },
  {
    path: '/fullstack-guide/scaffolding',
    title: '前端脚手架工程',
  },
  {
    path: '/fullstack-guide/search',
    title: '前端搜索',
  },
  {
    path: '/fullstack-guide/rich-text-editor',
    title: '前端富文本编辑器',
  },
  {
    path: '/fullstack-guide/low-code',
    title: '前端低代码平台',
  },
  {
    path: '/fullstack-guide/visualization',
    title: '前端可视化工程',
  },
  {
    path: '/fullstack-guide/map-engineering',
    title: '前端地图工程',
  },
  {
    path: '/fullstack-guide/report-printing',
    title: '前端报表打印工程',
  },
  {
    path: '/fullstack-guide/document-collaboration',
    title: '前端文档协同工程',
  },
  {
    path: '/fullstack-guide/workflow-orchestration',
    title: '前端工作流编排工程',
  },
  {
    path: '/fullstack-guide/rule-engine',
    title: '前端规则引擎工程',
  },
  {
    path: '/fullstack-guide/permission-system',
    title: '前端权限系统工程',
  },
  {
    path: '/fullstack-guide/message-center',
    title: '前端消息中心工程',
  },
  {
    path: '/fullstack-guide/task-scheduling',
    title: '前端任务调度工程',
  },
  {
    path: '/fullstack-guide/table-engineering',
    title: '前端表格工程',
  },
  {
    path: '/fullstack-guide/file-preview',
    title: '前端文件预览工程',
  },
  {
    path: '/fullstack-guide/theme-system',
    title: '前端主题系统工程',
  },
  {
    path: '/fullstack-guide/tracking-analytics',
    title: '前端埋点工程',
  },
  {
    path: '/fullstack-guide/sdk-engineering',
    title: '前端 SDK 工程',
  },
  {
    path: '/fullstack-guide/mock-engineering',
    title: '前端 Mock 工程',
  },
  {
    path: '/fullstack-guide/import-engineering',
    title: '前端导入工程',
  },
  {
    path: '/fullstack-guide/payment-engineering',
    title: '前端支付工程',
  },
  {
    path: '/fullstack-guide/audit-log-engineering',
    title: '前端审计日志工程',
  },
  {
    path: '/fullstack-guide/export-engineering',
    title: '前端导出工程',
  },
  {
    path: '/fullstack-guide/draft-box-engineering',
    title: '前端草稿箱工程',
  },
  {
    path: '/fullstack-guide/recycle-bin-engineering',
    title: '前端回收站工程',
  },
  {
    path: '/fullstack-guide/data-masking-engineering',
    title: '前端数据脱敏工程',
  },
  {
    path: '/fullstack-guide/org-selector-engineering',
    title: '前端组织架构选择器工程',
  },
  {
    path: '/fullstack-guide/approval-form-engineering',
    title: '前端审批流表单联动工程',
  },
  {
    path: '/fullstack-guide/comment-mention-engineering',
    title: '前端评论与@提及工程',
  },
  {
    path: '/fullstack-guide/qrcode-engineering',
    title: '前端二维码与条码工程',
  },
  {
    path: '/fullstack-guide/attachment-center-engineering',
    title: '前端附件中心工程',
  },
  {
    path: '/fullstack-guide/multi-step-wizard-engineering',
    title: '前端多步骤向导工程',
  },
  {
    path: '/fullstack-guide/timeline-engineering',
    title: '前端业务时间线工程',
  },
  {
    path: '/fullstack-guide/bulk-operation-engineering',
    title: '前端批量操作工程',
  },
  {
    path: '/fullstack-guide/filter-form-engineering',
    title: '前端筛选表单工程',
  },
  {
    path: '/fullstack-guide/diff-merge-engineering',
    title: '前端差异对比与合并工程',
  },
  {
    path: '/fullstack-guide/dictionary-engineering',
    title: '前端字典管理工程',
  },
  {
    path: '/fullstack-guide/field-schema-engineering',
    title: '前端字段配置工程',
  },
  {
    path: '/fullstack-guide/version-rollback-engineering',
    title: '前端版本回滚工程',
  },
  {
    path: '/fullstack-guide/data-mapping-engineering',
    title: '前端数据映射工程',
  },
  {
    path: '/fullstack-guide/header-schema-engineering',
    title: '前端表头配置工程',
  },
  {
    path: '/fullstack-guide/api-adapter-engineering',
    title: '前端接口适配层工程',
  },
  {
    path: '/fullstack-guide/release-workflow-engineering',
    title: '前端配置发布工程',
  },
  {
    path: '/fullstack-guide/review-annotation-engineering',
    title: '前端批注审阅工程',
  },
  {
    path: '/fullstack-guide/operation-replay-engineering',
    title: '前端操作日志回放工程',
  },
  {
    path: '/fullstack-guide/environment-switch-engineering',
    title: '前端环境切换工程',
  },
  {
    path: '/fullstack-guide/approval-node-engineering',
    title: '前端审批节点编排工程',
  },
  {
    path: '/fullstack-guide/import-validation-engineering',
    title: '前端导入校验工程',
  },
  {
    path: '/fullstack-guide/export-job-engineering',
    title: '前端导出任务中心工程',
  },
  {
    path: '/fullstack-guide/message-template-engineering',
    title: '前端消息模板编排工程',
  },
  {
    path: '/fullstack-guide/operation-guard-engineering',
    title: '前端防误触工程',
  },
  {
    path: '/fullstack-guide/permission-expression-engineering',
    title: '前端权限表达式工程',
  },
  {
    path: '/fullstack-guide/api-retry-backoff-engineering',
    title: '前端接口重试与退避工程',
  },
  {
    path: '/fullstack-guide/task-queue-engineering',
    title: '前端任务队列工程',
  },
  {
    path: '/fullstack-guide/runtime-permission-engineering',
    title: '前端运行时权限工程',
  },
  {
    path: '/fullstack-guide/domain-entity-engineering',
    title: '前端领域实体工程',
  },
  {
    path: '/fullstack-guide/release-canary-engineering',
    title: '前端灰度发布工程进阶',
  },
  {
    path: '/fullstack-guide/request-merge-engineering',
    title: '前端请求去重合并工程',
  },
  {
    path: '/fullstack-guide/form-linkage-rules-engineering',
    title: '前端表单联动规则工程',
  },
  {
    path: '/fullstack-guide/edit-state-recovery-engineering',
    title: '前端编辑态回显恢复工程',
  },
  {
    path: '/fullstack-guide/state-machine-engineering',
    title: '前端状态机建模工程',
  },
  {
    path: '/fullstack-guide/webhook-callback-engineering',
    title: '前端开放平台回调工程',
  },
  {
    path: '/fullstack-guide/oauth-oidc-engineering',
    title: '前端 OAuth / OIDC 接入工程',
  },
  {
    path: '/fullstack-guide/capture-evidence-engineering',
    title: '前端截图与录屏取证工程',
  },
];
</script>

<style scoped>
.fullstack-menu-page {
  min-height: calc(100vh - 40px);
  padding: 32px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background:
    radial-gradient(
      circle at top right,
      rgba(218, 225, 232, 0.45),
      transparent 28%
    ),
    linear-gradient(180deg, #fbfcfd 0%, #f2f5f8 100%);
  box-shadow: 0 30px 80px rgba(18, 26, 34, 0.08);
}

.fullstack-menu-hero {
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.fullstack-menu-hero__eyebrow,
.fullstack-menu-card__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7e8894;
}

.fullstack-menu-hero__title {
  margin-top: 10px;
  font-size: 44px;
  line-height: 1.08;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #17202a;
}

.fullstack-menu-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #57616d;
}

.fullstack-menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.fullstack-menu-card {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.92),
    rgba(246, 249, 251, 0.96)
  );
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.fullstack-menu-card:hover {
  transform: translateY(-2px);
  border-color: rgba(67, 94, 118, 0.18);
  box-shadow: 0 24px 48px rgba(21, 29, 36, 0.08);
}

.fullstack-menu-card__title {
  font-size: 15px;
  line-height: 1.2;
  font-weight: 400;
  letter-spacing: 0;
  color: #17202a;
}

@media (max-width: 900px) {
  .fullstack-menu-page {
    min-height: auto;
    padding: 22px;
  }

  .fullstack-menu-hero__title {
    font-size: 34px;
  }
}
</style>
