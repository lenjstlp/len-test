<script setup lang="ts">
const projects = [
  {
    name: '营销中台重构',
    owner: 'Lena',
    progress: 78,
    status: '开发中',
  },
  {
    name: '运营报表升级',
    owner: 'Marcus',
    progress: 56,
    status: '联调中',
  },
  {
    name: '权限中心接入',
    owner: 'Ava',
    progress: 31,
    status: '待评审',
  },
];
</script>

<template>
  <section class="space-y-6">
    <div class="surface-panel rounded-[28px] p-6 lg:p-7">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-white">项目列表</h2>
          <p class="mt-2 text-sm leading-6 text-slate-400">
            这里演示二级菜单页面内容，可以继续接入真实接口或表格筛选能力。
          </p>
        </div>
        <el-button type="primary">新建项目</el-button>
      </div>

      <div
        class="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40"
      >
        <el-table :data="projects" class="project-table" table-layout="fixed">
          <el-table-column prop="name" label="项目名称" min-width="220" />
          <el-table-column prop="owner" label="负责人" min-width="120" />
          <el-table-column label="进度" min-width="220">
            <template #default="{ row }">
              <div class="flex items-center gap-3">
                <el-progress :percentage="row.progress" :stroke-width="10" />
                <span class="text-sm text-slate-300">{{ row.progress }}%</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="120">
            <template #default="{ row }">
              <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-table:deep(.el-table) {
  --el-table-tr-bg-color: transparent;
  --el-table-header-bg-color: rgba(15, 23, 42, 0.85);
  --el-table-row-hover-bg-color: rgba(255, 255, 255, 0.04);
  --el-table-border-color: rgba(148, 163, 184, 0.12);
  --el-table-text-color: #e2e8f0;
  --el-table-header-text-color: #94a3b8;
  background: transparent;
}
</style>
