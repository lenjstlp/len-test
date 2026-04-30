<template>
  <section class="map-guide-page">
    <div class="map-guide-page__shell">
      <div class="map-guide-page__top">
        <RouterLink
          to="/fullstack-guide"
          class="map-guide-page__back"
          aria-label="返回全栈能力菜单"
          title="返回全栈能力菜单"
        >
          <el-icon :size="18"><ArrowLeft /></el-icon>
        </RouterLink>
      </div>

      <div class="map-guide-page__content">
        <header class="map-guide-hero">
          <div>
            <p class="map-guide-hero__eyebrow">Frontend Map Engineering</p>
            <h1 class="map-guide-hero__title">前端地图工程能力</h1>
            <p class="map-guide-hero__summary">
              地图系统不是把点位渲染出来就结束，而是要把坐标系、底图服务、图层组织、交互编辑、海量数据性能和发布运维串成一条链。真正难的部分在于：如何让地图既能表达真实空间关系，又能在浏览器里稳定跑得动、并能支撑业务操作。
            </p>
          </div>

          <div class="map-guide-hero__panel">
            <p class="map-guide-hero__label">学完结果</p>
            <ul class="map-guide-list">
              <li>
                能分清业务底图、点线面要素、专题图层和轨迹播放各自的技术边界。
              </li>
              <li>
                能设计一套地图图层管理、服务接入、绘制交互和性能治理方案。
              </li>
              <li>
                能判断什么时候用普通地图库，什么时候需要上
                WebGL、矢量瓦片或专门地图引擎。
              </li>
            </ul>
          </div>
        </header>

        <section class="map-guide-grid">
          <article
            v-for="item in quickStages"
            :key="item.order"
            class="map-guide-card"
          >
            <p class="map-guide-card__eyebrow">Stage {{ item.order }}</p>
            <h2 class="map-guide-card__title">{{ item.title }}</h2>
            <p class="map-guide-card__text">{{ item.summary }}</p>
          </article>
        </section>

        <section class="map-guide-section">
          <div class="map-guide-section__head">
            <div>
              <p class="map-guide-section__eyebrow">Build Order</p>
              <h2 class="map-guide-section__title">
                地图工程先统一空间数据协议，再处理图层、交互、性能和服务发布
              </h2>
            </div>
          </div>

          <div class="map-guide-stack">
            <article
              v-for="stage in guideStages"
              :key="stage.order"
              class="map-guide-panel is-wide"
            >
              <div class="map-guide-method__head">
                <div>
                  <p class="map-guide-panel__eyebrow">
                    Stage {{ stage.order }}
                  </p>
                  <h3 class="map-guide-panel__title">{{ stage.title }}</h3>
                </div>
                <span class="map-guide-method__tag">{{ stage.tag }}</span>
              </div>

              <p class="map-guide-panel__text">{{ stage.description }}</p>

              <div class="map-guide-method__grid">
                <section class="map-guide-mini-panel">
                  <p class="map-guide-mini-panel__title">适用场景</p>
                  <ul class="map-guide-list">
                    <li v-for="item in stage.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="map-guide-mini-panel">
                  <p class="map-guide-mini-panel__title">实现重点</p>
                  <ul class="map-guide-list">
                    <li v-for="item in stage.focus" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section class="map-guide-mini-panel">
                  <p class="map-guide-mini-panel__title">常见误区</p>
                  <ul class="map-guide-list">
                    <li v-for="item in stage.risks" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>

              <AppCodeBlock
                class="map-guide-code-block"
                :code="stage.code"
                :lang="stage.language"
              />
            </article>
          </div>
        </section>

        <section class="map-guide-section">
          <div class="map-guide-section__head">
            <div>
              <p class="map-guide-section__eyebrow">Comparison</p>
              <h2 class="map-guide-section__title">
                做地图系统时最关键的几组取舍
              </h2>
            </div>
          </div>

          <div class="map-guide-columns">
            <article
              v-for="item in comparisonCards"
              :key="item.title"
              class="map-guide-panel"
            >
              <h3 class="map-guide-panel__title">{{ item.title }}</h3>
              <p class="map-guide-panel__text">{{ item.summary }}</p>
            </article>
          </div>
        </section>

        <section class="map-guide-section">
          <div class="map-guide-section__head">
            <div>
              <p class="map-guide-section__eyebrow">Checklist</p>
              <h2 class="map-guide-section__title">
                一套能落地的前端地图工程建设清单
              </h2>
            </div>
          </div>

          <article class="map-guide-panel is-wide">
            <ul class="map-guide-list">
              <li>
                先把坐标系、投影、缩放级别和边界数据说清楚，再谈图层表现，不然位置会越来越乱。
              </li>
              <li>
                地图页面不要让每个业务模块直接操作底层实例，应该通过图层管理器统一增删改查。
              </li>
              <li>
                点位、轨迹、热力、围栏、弹窗这些交互都要走统一状态流，别在事件回调里相互硬绑。
              </li>
              <li>
                海量要素场景要尽早评估聚合、瓦片切片、Canvas/WebGL
                渲染和可视区域裁剪。
              </li>
              <li>
                地图服务、样式配置和权限策略要与发布环境解耦，避免一换环境就整张地图失效。
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
    title: '先定空间数据协议',
    summary:
      '地图工程的第一步不是选库，而是先明确坐标系、边界数据格式、图层元数据和业务对象结构。',
  },
  {
    order: '02',
    title: '图层管理必须独立',
    summary:
      '点、线、面、热力、轨迹、弹窗和标注要有统一图层生命周期，不能散落在组件里各自操作。',
  },
  {
    order: '03',
    title: '交互编辑要系统化',
    summary:
      '框选、测距、绘制围栏、拖拽点位、回放轨迹这些功能一多，就需要完整的交互状态机。',
  },
  {
    order: '04',
    title: '性能治理要针对地理数据',
    summary:
      '地图卡顿通常不是普通 DOM 问题，而是海量要素、频繁重绘、图层叠加和投影计算带来的压力。',
  },
  {
    order: '05',
    title: '服务与发布同样重要',
    summary:
      '底图地址、瓦片服务、权限令牌、离线包和环境切换，决定地图系统能否真正上线稳定运行。',
  },
];

const guideStages = [
  {
    order: '01',
    title: '先统一坐标系、行政边界和业务对象结构，别让地图数据一开始就失真',
    tag: 'Geo Contract',
    description:
      '地图项目最常见的问题不是样式不好看，而是数据对不齐。经纬度坐标、投影坐标、GCJ-02、WGS84、墨卡托、GeoJSON、行政边界简化数据，如果没有先统一，后面点位偏移、围栏错位、轨迹漂移会接连出现。更稳的做法是先建立一层空间数据协议，把后端返回值转成前端统一的地图对象，再交给图层渲染。',
    bestFor: ['业务地图系统', '轨迹回放平台', '园区态势系统', '城市治理大屏'],
    focus: [
      '明确项目统一使用的坐标系和投影体系',
      '边界数据、点线面要素和业务属性要统一描述',
      '前端接入前先做坐标转换和数据标准化',
    ],
    risks: [
      '不同接口返回不同坐标系却直接混用',
      'GeoJSON 和业务字段没有统一协议',
      '业务点位展示正常，但量测和围栏完全错位',
    ],
    language: 'ts',
    code: `type MapFeature = {
  id: string
  type: 'point' | 'line' | 'polygon'
  coordinates: number[] | number[][] | number[][][]
  properties: Record<string, unknown>
  source: 'device' | 'region' | 'route'
}`,
  },
  {
    order: '02',
    title: '地图页面不能所有功能都直接碰实例，必须先搭图层管理器',
    tag: 'Layer Manager',
    description:
      '业务一复杂，地图上会同时出现底图、行政区、设备点、轨迹线、聚合层、热力层、告警覆盖物和弹窗。这个时候如果每个业务组件都直接操作地图实例，图层顺序、显隐状态和资源释放都会失控。工程上更合理的做法，是抽象一层 layer manager，让业务只声明要渲染什么，而不是直接调底层 API。',
    bestFor: ['多图层业务地图', '设备管理平台', '安防监控地图'],
    focus: [
      '图层注册、销毁、更新和排序逻辑统一收口',
      '把图层权限、可见性和业务分组纳入元数据',
      '图层管理器负责和底层地图 SDK 对接',
    ],
    risks: [
      '每个页面各自维护 addLayer/removeLayer',
      '图层显隐和业务筛选互相覆盖',
      '页面销毁后实例和事件没有彻底释放',
    ],
    language: 'ts',
    code: `type LayerDefinition = {
  id: string
  kind: 'base' | 'feature' | 'heatmap' | 'cluster' | 'popup'
  zIndex: number
  visible: boolean
  sourceId: string
}`,
  },
  {
    order: '03',
    title: '围栏绘制、框选、轨迹播放这些功能，本质是交互状态机而不是几个按钮',
    tag: 'Interaction',
    description:
      '地图项目一旦进入业务操作场景，复杂度会明显上升。比如用户可能先切到绘制模式，画围栏，再编辑顶点，然后保存；也可能切到回放模式，拖动时间轴，让轨迹和告警点同步联动。这个阶段最怕的是把交互状态散在多个按钮事件里。更好的方式是建立显式的模式机和工具状态，让地图始终知道当前处于浏览、绘制、编辑、播放还是选择态。',
    bestFor: ['电子围栏', '轨迹回放', '地图编辑器', '设备布控系统'],
    focus: [
      '交互模式要显式建模，避免状态互相污染',
      '绘制、编辑、测量和播放能力要支持中断与恢复',
      '地图事件和业务表单同步要走统一通道',
    ],
    risks: [
      '多个模式并存，导致点击事件互相抢占',
      '播放轨迹时用户还能误触编辑工具',
      '业务表单更新和地图几何体更新不同步',
    ],
    language: 'ts',
    code: `type MapMode =
  | 'browse'
  | 'draw-polygon'
  | 'edit-feature'
  | 'measure-distance'
  | 'playback-route'`,
  },
  {
    order: '04',
    title: '海量点位、瓦片图层和实时刷新上来以后，性能就要按地图思维治理',
    tag: 'Performance',
    description:
      '地图场景的性能问题和普通列表页不一样。几千上万个点位、轨迹线段、动态图标、弹窗 hover、热力层叠加和实时告警刷新，都会造成浏览器掉帧。你要重点评估的是聚合、视口裁剪、按层刷新、瓦片切片、Canvas 或 WebGL 渲染，以及在缩放级别变化时如何减少无意义重算。',
    bestFor: [
      '海量设备分布',
      '实时态势地图',
      '物流轨迹回放',
      '城市级 GIS 页面',
    ],
    focus: [
      '按缩放级别决定展示密度和图层策略',
      '对静态边界、动态点位和交互覆盖物做分层刷新',
      '通过聚合、抽稀和视区裁剪减少绘制压力',
    ],
    risks: [
      '不分层，任意筛选都全量重绘所有要素',
      '只盯点位数量，不看轨迹和弹窗叠加开销',
      '缩放和拖拽时反复做全量计算，造成明显卡顿',
    ],
    language: 'ts',
    code: `function shouldCluster(zoom: number, featureCount: number) {
  if (zoom <= 8) return true
  if (zoom <= 11 && featureCount > 3000) return true
  return featureCount > 8000
}`,
  },
  {
    order: '05',
    title: '地图系统要稳定上线，最终拼的是服务配置、离线能力和环境治理',
    tag: 'Delivery',
    description:
      '很多地图项目开发期看起来没问题，一到测试或生产就开始出故障，原因通常不在前端代码，而在地图服务和环境链路。底图服务地址、token、跨域、安全域名、矢量瓦片权限、离线包更新、CDN 缓存、行政区边界版本，都要纳入发布策略。地图工程做到后面，本质上已经是前端与地图服务协同治理的问题。',
    bestFor: [
      '企业 GIS 平台',
      '内网地图项目',
      '离线部署系统',
      '多环境地图应用',
    ],
    focus: [
      '把底图地址、令牌和样式配置外置，不写死在代码里',
      '评估在线服务、私有服务和离线包三类接入方式',
      '准备异常兜底、服务切换和边界版本回退机制',
    ],
    risks: [
      '开发环境能跑，切生产后 token 和域名失效',
      '地图资源依赖外网服务，内网部署直接瘫痪',
      '边界数据升级后没有回滚方案，导致业务区域全错',
    ],
    language: 'text',
    code: `地图发布治理清单
- 外置底图服务地址、token、样式配置
- 预置在线 / 私有 / 离线包三种接入策略
- 为瓦片超时、服务不可用、边界版本切换准备兜底
- 记录坐标系、边界数据和图层样式的版本号`,
  },
];

const comparisonCards = [
  {
    title: '普通地图库 vs WebGL 地图引擎',
    summary:
      '普通地图库适合中小规模业务地图和常规交互；一旦进入海量点位、复杂动画、三维地形或高频刷新，WebGL 路线通常更稳。',
  },
  {
    title: '业务组件直接操作实例 vs 图层管理器统一调度',
    summary:
      '直接操作实例写起来快，但图层越多越乱；引入图层管理器前期多一层抽象，却能显著降低后续维护成本。',
  },
  {
    title: '在线地图服务 vs 私有化 / 离线部署',
    summary:
      '在线服务接入快，但受网络和授权限制；私有化或离线方案部署重一些，却更适合内网、安全敏感和稳定性要求高的系统。',
  },
];
</script>

<style scoped>
.map-guide-page {
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

.map-guide-page__shell {
  min-height: calc(100vh - 90px);
  border: 1px solid rgba(19, 27, 34, 0.06);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.82);
}

.map-guide-page__top {
  display: flex;
  justify-content: flex-start;
  padding: 18px 18px 0;
}

.map-guide-page__back {
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

.map-guide-page__back:hover {
  transform: translateY(-1px);
  border-color: rgba(46, 70, 91, 0.18);
  box-shadow: 0 18px 34px rgba(19, 27, 34, 0.08);
}

.map-guide-page__content {
  padding: 18px 24px 24px;
}

.map-guide-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(19, 27, 34, 0.08);
}

.map-guide-hero__eyebrow,
.map-guide-section__eyebrow,
.map-guide-card__eyebrow,
.map-guide-hero__label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #7b8793;
}

.map-guide-hero__title {
  margin-top: 10px;
  font-size: 46px;
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: #17202a;
}

.map-guide-hero__summary {
  max-width: 860px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.9;
  color: #58636f;
}

.map-guide-hero__panel,
.map-guide-card,
.map-guide-panel {
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.84);
}

.map-guide-hero__panel {
  padding: 18px;
}

.map-guide-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #56616d;
}

.map-guide-grid,
.map-guide-columns,
.map-guide-stack {
  display: grid;
  gap: 16px;
}

.map-guide-grid {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.map-guide-card {
  padding: 18px;
}

.map-guide-card__title,
.map-guide-panel__title,
.map-guide-section__title {
  color: #17202a;
}

.map-guide-card__title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 600;
}

.map-guide-card__text,
.map-guide-panel__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #596571;
}

.map-guide-section {
  margin-top: 28px;
}

.map-guide-section__head {
  margin-bottom: 14px;
}

.map-guide-section__title {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.map-guide-columns {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.map-guide-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.map-guide-panel {
  padding: 18px;
}

.map-guide-panel.is-wide {
  grid-column: 1 / -1;
}

.map-guide-panel__eyebrow {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #80909d;
}

.map-guide-panel__title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 600;
}

.map-guide-method__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.map-guide-method__tag {
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

.map-guide-method__grid {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.map-guide-mini-panel {
  padding: 14px;
  border: 1px solid rgba(19, 27, 34, 0.08);
  border-radius: 7px;
  background: rgba(245, 248, 250, 0.9);
}

.map-guide-mini-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: #17202a;
}

.map-guide-code-block {
  margin-top: 14px;
}

@media (max-width: 1080px) {
  .map-guide-hero,
  .map-guide-grid,
  .map-guide-columns,
  .map-guide-stack,
  .map-guide-method__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .map-guide-page {
    min-height: auto;
    padding: 18px;
  }

  .map-guide-page__shell {
    min-height: auto;
  }

  .map-guide-page__content {
    padding: 18px;
  }

  .map-guide-hero__title {
    font-size: 36px;
  }

  .map-guide-section__title {
    font-size: 26px;
  }
}
</style>
