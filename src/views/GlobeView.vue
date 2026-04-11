<template>
  <section
    class="relative flex min-h-[calc(100vh-13rem)] items-center justify-center overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,#02050b_0%,#0a111b_48%,#0f1724_100%)]"
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

const palette = [
  ['#79c6d9', '#9ad7b6'],
  ['#8fb8de', '#b6d3ef'],
  ['#e0c398', '#e6dbc5'],
  ['#9ec6a1', '#b6dfd0'],
  ['#7ca8be', '#bfcfd8'],
  ['#d8b7a7', '#f0ded5'],
  ['#9fc3df', '#d4e3f3'],
  ['#b7d4b2', '#dceacf'],
];

const markers = ref<GlobeMarker[]>([
  createMarker(
    'marker-shanghai',
    'Lena',
    '上海，中国',
    31.2304,
    121.4737,
    '愿每一次抬头看见地球时，都还记得自己要去的远方。',
    'LE',
    palette[0],
    326,
  ),
  createMarker(
    'marker-tokyo',
    'Aiko',
    '东京，日本',
    35.6762,
    139.6503,
    '城市再快，也要给自己留一小块安静的海面。',
    'AI',
    palette[1],
    298,
  ),
  createMarker(
    'marker-seoul',
    'Hana',
    '首尔，韩国',
    37.5665,
    126.978,
    '有些温柔不需要大声说，只需要在这里被看见。',
    'HA',
    palette[6],
    284,
  ),
  createMarker(
    'marker-singapore',
    'Milo',
    '新加坡',
    1.3521,
    103.8198,
    '把一句喜欢的话留给地球，也留给明天的自己。',
    'MI',
    palette[7],
    238,
  ),
  createMarker(
    'marker-sydney',
    'Kai',
    '悉尼，澳大利亚',
    -33.8688,
    151.2093,
    '愿你在自己的经纬度上，也能拥有稳定且柔和的光。',
    'KA',
    palette[4],
    226,
  ),
  createMarker(
    'marker-dubai',
    'Noor',
    '迪拜，阿联酋',
    25.2048,
    55.2708,
    '世界很热闹，但心里可以一直保持清澈。',
    'NO',
    palette[5],
    214,
  ),
  createMarker(
    'marker-london',
    'Mina',
    '伦敦，英国',
    51.5072,
    -0.1276,
    '跨越时区的问候，也能在同一颗星球上相遇。',
    'MN',
    palette[1],
    272,
  ),
  createMarker(
    'marker-paris',
    'Chloe',
    '巴黎，法国',
    48.8566,
    2.3522,
    '慢一点生活，很多好看的细节才会重新浮出来。',
    'CH',
    palette[3],
    188,
  ),
  createMarker(
    'marker-nairobi',
    'Noah',
    '内罗毕，肯尼亚',
    -1.2921,
    36.8219,
    '风吹过草原的时候，我把今天最平静的一句话留在这里。',
    'NH',
    palette[2],
    176,
  ),
  createMarker(
    'marker-cape-town',
    'Zuri',
    '开普敦，南非',
    -33.9249,
    18.4241,
    '海风会替我把这句问候带去更远的地方。',
    'ZU',
    palette[7],
    164,
  ),
  createMarker(
    'marker-newyork',
    'Evan',
    '纽约，美国',
    40.7128,
    -74.006,
    '在忙碌里抬头看一眼地球，就知道自己并不孤单。',
    'EV',
    palette[6],
    312,
  ),
  createMarker(
    'marker-vancouver',
    'Iris',
    '温哥华，加拿大',
    49.2827,
    -123.1207,
    '云和海都很慢，正好提醒我不用着急。',
    'IR',
    palette[0],
    158,
  ),
  createMarker(
    'marker-mexico',
    'Luca',
    '墨西哥城，墨西哥',
    19.4326,
    -99.1332,
    '总会有人在很远的地方，认真接住你的心情。',
    'LU',
    palette[2],
    146,
  ),
  createMarker(
    'marker-santiago',
    'Ava',
    '圣地亚哥，智利',
    -33.4489,
    -70.6693,
    '世界很大，但一句真诚的话总能找到愿意倾听的人。',
    'AV',
    palette[3],
    202,
  ),
  createMarker(
    'marker-saopaulo',
    'Theo',
    '圣保罗，巴西',
    -23.5505,
    -46.6333,
    '愿今天留下的一句话，能在别人心里发光一会儿。',
    'TH',
    palette[5],
    184,
  ),
]);

const selectedMarkerId = ref<string | null>(markers.value[0]?.id ?? null);

function createMarker(
  id: string,
  name: string,
  location: string,
  lat: number,
  lng: number,
  message: string,
  initials: string,
  [from, to]: string[],
  likes: number,
): GlobeMarker {
  return {
    id,
    name,
    location,
    lat,
    lng,
    message,
    avatar: createAvatarDataUrl(initials, from, to),
    accent: from,
    likes,
  };
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
      <circle cx="80" cy="56" r="28" fill="rgba(255,255,255,0.22)" />
      <path d="M38 136c7-26 25-40 42-40s35 14 42 40" fill="rgba(255,255,255,0.2)" />
      <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="Avenir Next, Segoe UI, sans-serif" font-size="36" letter-spacing="4" fill="#ffffff">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
</script>
