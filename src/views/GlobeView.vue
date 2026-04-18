<template>
  <section
    class="relative flex min-h-[calc(100vh-13rem)] items-center justify-center overflow-hidden rounded-[7px] bg-[linear-gradient(180deg,#02050b_0%,#0a111b_48%,#0f1724_100%)]"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(88,126,170,0.24),transparent_24%),radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.08),transparent_44%)]"
    />
    <div class="relative w-full max-w-[1100px] px-3 py-3 lg:px-8">
      <GlobeMessageBoard
        :markers="markers"
        :selected-marker-id="selectedMarkerId"
        @select="selectedMarkerId = $event"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GlobeMessageBoard from '@/components/GlobeMessageBoard.vue';
import type { GlobeMarker } from '@/types/globe';

const GLOBAL_MARKER_COUNT = 2000;
const CHINA_EXTRA_MARKER_COUNT = 720;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const palette = [
  ['#0f172a', '#1e293b'],
  ['#172033', '#24344e'],
  ['#1f2937', '#374151'],
  ['#111827', '#1f2937'],
  ['#1e293b', '#334155'],
  ['#18181b', '#27272a'],
  ['#0b1325', '#22304d'],
  ['#111827', '#2b3444'],
];

const globalMessages = [
  '今晚把一句安静的话留在这里，等下一次抬头的时候再读给自己听。',
  '如果你也正好经过这片经纬度，希望今天对你温柔一点。',
  '世界很大，但认真说出口的一句话，总会落在合适的人心里。',
  '把这条留言钉在地球上，提醒自己别忘了继续出发。',
  '愿你看到这里时，刚好也拥有一个缓慢又清醒的夜晚。',
  '我在这座坐标按下暂停键，把现在的心情留给地球保存。',
  '哪怕距离很远，我们也在同一颗星球上共享这一分钟的风。',
  '如果生活有点吵，就来这里看一眼海岸线，再慢慢呼吸。',
  '愿每个认真生活的人，都能在自己的坐标上被看见。',
  '地球继续转动，这句话就先停在这里陪你一会儿。',
];

const chinaMessages = [
  '这条来自中国区域的留言，会在放大后更密集地出现。',
  '放大一点，就能看见更细的本地情绪和更多相近坐标。',
  '沿着这片经纬度继续靠近，会有更多来自中国的细节留言。',
  '这里刻意保留了更高密度的数据，便于近景浏览。',
  '从省会到周边区域，留言会随着缩放层级逐步铺开。',
];

const avatarPool = Array.from({ length: 60 }, (_, index) =>
  createAvatarDataUrl(
    createCode(index),
    palette[index % palette.length][0],
    palette[index % palette.length][1],
  ),
);

const markers = ref<GlobeMarker[]>([
  ...createGlobalMarkers(GLOBAL_MARKER_COUNT),
  ...createChinaMarkers(CHINA_EXTRA_MARKER_COUNT, GLOBAL_MARKER_COUNT),
]);
const selectedMarkerId = ref<string | null>(null);

function createGlobalMarkers(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - ((index + 0.5) / count) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * index;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lng = (Math.atan2(z, x) * 180) / Math.PI;

    return createMarker({
      id: `marker-${String(index + 1).padStart(4, '0')}`,
      name: `访客 ${String(index + 1).padStart(4, '0')}`,
      location: formatLocation(lat, lng),
      lat,
      lng,
      message: `${globalMessages[index % globalMessages.length]} #${String(index + 1).padStart(4, '0')}`,
      avatar: avatarPool[index % avatarPool.length],
      accent: palette[index % palette.length][0],
      likes: 36 + (index % 100) * 8,
    });
  });
}

function createChinaMarkers(count: number, offset: number) {
  const columns = 30;
  const rows = Math.ceil(count / columns);
  const minLng = 73.5;
  const maxLng = 134.8;
  const minLat = 18.2;
  const maxLat = 53.6;

  return Array.from({ length: count }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const jitterX = pseudoRandom(index * 2 + 1) - 0.5;
    const jitterY = pseudoRandom(index * 2 + 2) - 0.5;
    const lng =
      minLng + ((column + 0.5 + jitterX * 0.7) / columns) * (maxLng - minLng);
    const lat =
      maxLat - ((row + 0.5 + jitterY * 0.7) / rows) * (maxLat - minLat);
    const globalIndex = offset + index;

    return createMarker({
      id: `cn-marker-${String(index + 1).padStart(4, '0')}`,
      name: `华域 ${String(index + 1).padStart(4, '0')}`,
      location: `中国 · ${formatLocation(lat, lng)}`,
      lat,
      lng,
      message: `${chinaMessages[index % chinaMessages.length]} #CN-${String(index + 1).padStart(4, '0')}`,
      avatar: avatarPool[globalIndex % avatarPool.length],
      accent: palette[globalIndex % palette.length][0],
      likes: 40 + (index % 120) * 7,
    });
  });
}

function createMarker(marker: GlobeMarker) {
  return marker;
}

function formatLocation(lat: number, lng: number) {
  return `${formatCoordinate(lat, 'N', 'S')} · ${formatCoordinate(lng, 'E', 'W')}`;
}

function formatCoordinate(value: number, positive: string, negative: string) {
  const suffix = value >= 0 ? positive : negative;
  return `${Math.abs(value).toFixed(2)}°${suffix}`;
}

function createCode(index: number) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const first = alphabet[Math.floor(index / alphabet.length) % alphabet.length];
  const second = alphabet[index % alphabet.length];
  return `${first}${second}`;
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function createAvatarDataUrl(initials: string, from: string, to: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="80" fill="url(#g)" />
      <circle cx="80" cy="56" r="28" fill="rgba(255,255,255,0.08)" />
      <path d="M38 136c7-26 25-40 42-40s35 14 42 40" fill="rgba(255,255,255,0.07)" />
      <circle cx="80" cy="80" r="54" fill="none" stroke="rgba(255,255,255,0.08)" />
      <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="Avenir Next, Segoe UI, sans-serif" font-size="36" letter-spacing="4" fill="#f8fafc">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
</script>
