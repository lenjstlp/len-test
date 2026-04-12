<template>
  <section class="relative">
    <div
      ref="hostRef"
      class="relative aspect-square w-full touch-none overflow-hidden rounded-[44px] select-none"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointerleave="handlePointerUp"
      @pointercancel="handlePointerUp"
      @wheel.prevent="handleWheel"
    >
      <div
        class="pointer-events-none absolute inset-0 rounded-[44px] bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.08),rgba(255,255,255,0.01)_30%,rgba(255,255,255,0)_58%),radial-gradient(circle_at_50%_58%,rgba(11,23,35,0.2),rgba(4,8,14,0)_68%)]"
      />
      <canvas ref="canvasRef" class="absolute inset-0 h-full w-full" />

      <button
        v-for="point in visibleMarkers"
        :key="point.marker.id"
        type="button"
        class="absolute h-[58px] w-[42px] cursor-pointer border-0 bg-transparent p-0"
        :style="{
          left: `${point.x}px`,
          top: `${point.y}px`,
          opacity: point.opacity.toFixed(2),
          transform: `translate(-50%, calc(-100% + 6px)) scale(${point.scale.toFixed(2)})`,
          zIndex: String(getMarkerZIndex(point)),
        }"
        @pointerdown.stop
        @pointerup.stop
        @click.stop="emit('select', point.marker.id)"
      >
        <transition name="tip-fade">
          <div
            v-if="isTipVisible(point.marker.id)"
            class="absolute top-0 left-1/2 z-[1]"
            style="transform: translate(-50%, calc(-100% - 14px))"
          >
            <div
              class="max-w-[320px] min-w-[240px] cursor-pointer rounded-[24px] border border-white/20 bg-[linear-gradient(180deg,rgba(246,248,251,0.78),rgba(228,234,240,0.66))] px-4 py-3 text-left shadow-[0_26px_70px_rgba(15,23,42,0.34)] backdrop-blur-2xl"
              @click.stop="emit('select', point.marker.id)"
            >
              <div class="flex items-center gap-3">
                <img
                  :src="point.marker.avatar"
                  :alt="point.marker.name"
                  class="h-10 w-10 rounded-full border border-white/80 object-cover shadow-sm"
                />
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-slate-900">
                    {{ point.marker.name }}
                  </p>
                  <p class="truncate text-xs text-slate-500">
                    {{ point.marker.location }}
                  </p>
                </div>
                <span
                  class="rounded-full bg-slate-900/6 px-2 py-1 text-[11px] font-medium text-slate-500"
                >
                  {{ point.marker.likes }} 赞
                </span>
              </div>
              <p class="mt-3 text-sm leading-6 text-slate-700">
                {{ point.marker.message }}
              </p>
            </div>
            <div
              class="mx-auto h-3 w-3 -translate-y-1 rotate-45 border-r border-b border-white/20 bg-[rgba(228,234,240,0.72)] backdrop-blur-2xl"
            />
          </div>
        </transition>

        <div
          class="drop-shell relative h-[58px] w-[42px] transition duration-200 hover:scale-105"
        >
          <svg
            class="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 42 58"
            aria-hidden="true"
          >
            <path
              d="M21 58C17.4 48.5 11 41.2 7 34.3C4.4 29.8 3 24.6 3 19C3 8.5 11.5 0 21 0C30.5 0 39 8.5 39 19C39 24.6 37.6 29.8 35 34.3C31 41.2 24.6 48.5 21 58Z"
              fill="rgba(255,255,255,0.96)"
              stroke="rgba(255,255,255,0.76)"
              stroke-width="1"
            />
          </svg>
          <div class="drop-body">
            <div class="drop-avatar">
              <img
                :src="point.marker.avatar"
                :alt="point.marker.name"
                class="block h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { landContours } from '@/data/landContours';
import type { GlobeMarker } from '@/types/globe';

type ProjectedPoint = {
  x: number;
  y: number;
  depth: number;
};

type MarkerProjection = ProjectedPoint & {
  marker: GlobeMarker;
  opacity: number;
  scale: number;
  zIndex: number;
};

type TerrainSample = {
  color: [number, number, number];
  isLand: boolean;
};

type RenderBuffer = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  size: number;
};

type SurfaceMap = {
  width: number;
  height: number;
  data: Uint8ClampedArray;
};

const props = defineProps<{
  markers: GlobeMarker[];
  selectedMarkerId: string | null;
}>();

const emit = defineEmits<{
  select: [id: string];
}>();

const ROTATION_PERIOD_MS = 10 * 60 * 1000;
const TAU = Math.PI * 2;
const WORLD_WIDTH = 1920;
const WORLD_HEIGHT = 960;
const LIGHT = normalizeVector([-0.36, 0.18, 0.91]);
const MIN_RADIUS_RATIO = 0.25;
const MAX_RADIUS_RATIO = 1.8;
const DEFAULT_RADIUS_RATIO = 0.39;
const DEFAULT_ZOOM =
  (DEFAULT_RADIUS_RATIO - MIN_RADIUS_RATIO) /
  (MAX_RADIUS_RATIO - MIN_RADIUS_RATIO);

const hostRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();

const size = ref(0);
const currentTime = ref(Date.now());
const manualRotation = ref(0);
const tilt = ref(-0.34);
const rotationVelocity = ref(0);
const zoomLevel = ref(DEFAULT_ZOOM);

const isDragging = ref(false);
const activePointerId = ref<number | null>(null);
const lastPointerX = ref(0);
const lastPointerY = ref(0);

let animationFrameId = 0;
let lastAnimationAt = 0;
let resizeObserver: ResizeObserver | undefined;
let renderBuffer: RenderBuffer | undefined;
let surfaceMap: SurfaceMap | undefined;

const rotation = computed(
  () =>
    -((currentTime.value % ROTATION_PERIOD_MS) / ROTATION_PERIOD_MS) * TAU +
    manualRotation.value,
);

const radiusRatio = computed(
  () =>
    MIN_RADIUS_RATIO + (MAX_RADIUS_RATIO - MIN_RADIUS_RATIO) * zoomLevel.value,
);

const globeRadius = () => size.value * radiusRatio.value;

const projectPoint = (lat: number, lng: number): ProjectedPoint => {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180 + rotation.value;

  const x = Math.cos(latRad) * Math.sin(lngRad);
  const y = Math.sin(latRad);
  const z = Math.cos(latRad) * Math.cos(lngRad);

  const cosTilt = Math.cos(tilt.value);
  const sinTilt = Math.sin(tilt.value);

  const yTilted = y * cosTilt - z * sinTilt;
  const zTilted = y * sinTilt + z * cosTilt;

  const radius = globeRadius();
  const center = size.value / 2;

  return {
    x: center + x * radius,
    y: center - yTilted * radius,
    depth: zTilted,
  };
};

const visibleMarkers = computed<MarkerProjection[]>(() => {
  const projected = props.markers
    .map((marker) => {
      const point = projectPoint(marker.lat, marker.lng);
      const clampedDepth = Math.max(0, point.depth);

      return {
        marker,
        ...point,
        opacity: 0.38 + clampedDepth * 0.75,
        scale: 0.74 + clampedDepth * 0.22 + zoomLevel.value * 0.16,
        zIndex:
          marker.id === props.selectedMarkerId
            ? 999
            : Math.round(60 + clampedDepth * 100),
      };
    })
    .filter((marker) => marker.depth > 0.02);

  const selected = projected.find(
    (marker) => marker.marker.id === props.selectedMarkerId,
  );
  const remaining = projected
    .filter((marker) => marker.marker.id !== props.selectedMarkerId)
    .sort((left, right) => {
      if (right.marker.likes !== left.marker.likes) {
        return right.marker.likes - left.marker.likes;
      }

      return right.depth - left.depth;
    });

  const zoomTier = Math.max(0, Math.floor(zoomLevel.value * 8));
  const limit = 40 + zoomTier * 28;
  const minimumDistance = Math.max(10, 52 - zoomTier * 6);
  const picked: MarkerProjection[] = [];

  if (selected) {
    picked.push(selected);
  }

  for (const candidate of remaining) {
    if (picked.length >= limit) {
      break;
    }

    const overlaps = picked.some(
      (marker) =>
        Math.hypot(marker.x - candidate.x, marker.y - candidate.y) <
        minimumDistance,
    );

    if (!overlaps) {
      picked.push(candidate);
    }
  }

  return picked.sort((left, right) => left.depth - right.depth);
});

const autoTipIds = computed(() => {
  const visible = visibleMarkers.value;

  if (visible.length === 0) {
    return [] as string[];
  }

  const candidates = visible.filter((marker) => marker.depth > 0.08);

  if (candidates.length <= 5) {
    return candidates.map((marker) => marker.marker.id);
  }

  const rotationIndex = Math.floor(currentTime.value / 20000);
  const ordered = [...candidates].sort((left, right) => {
    const leftHash = hashString(`${left.marker.id}-${rotationIndex}`);
    const rightHash = hashString(`${right.marker.id}-${rotationIndex}`);

    return leftHash - rightHash;
  });
  const selected: MarkerProjection[] = [];

  while (ordered.length > 0 && selected.length < 5) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    for (let index = 0; index < ordered.length; index += 1) {
      const candidate = ordered[index];
      const minDistance =
        selected.length === 0
          ? size.value * 0.25
          : Math.min(
              ...selected.map((marker) =>
                Math.hypot(marker.x - candidate.x, marker.y - candidate.y),
              ),
            );
      const latitudePenalty =
        selected.length === 0
          ? 0
          : Math.min(
              ...selected.map((marker) =>
                Math.abs(marker.marker.lat - candidate.marker.lat),
              ),
            ) * 1.6;
      const randomBoost = hashString(
        `${candidate.marker.id}-${rotationIndex}-boost`,
      );
      const score = minDistance + latitudePenalty + randomBoost * 24;

      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    }

    selected.push(ordered.splice(bestIndex, 1)[0]);
  }

  return selected.map((marker) => marker.marker.id);
});

const visibleTipIds = computed(() => {
  const ids: string[] = [];

  if (
    props.selectedMarkerId &&
    visibleMarkers.value.some(
      (marker) => marker.marker.id === props.selectedMarkerId,
    )
  ) {
    ids.push(props.selectedMarkerId);
  }

  for (const markerId of autoTipIds.value) {
    if (ids.length >= 5) {
      break;
    }

    if (!ids.includes(markerId)) {
      ids.push(markerId);
    }
  }

  return ids;
});

const isTipVisible = (markerId: string) =>
  visibleTipIds.value.includes(markerId);

const getMarkerZIndex = (point: MarkerProjection) =>
  point.marker.id === props.selectedMarkerId
    ? 3000 + point.zIndex
    : isTipVisible(point.marker.id)
      ? 1400 + point.zIndex
      : point.zIndex;

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 4294967295;
}

function normalizeVector([x, y, z]: [number, number, number]) {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length] as const;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const wrap = (value: number, max: number) => {
  const wrapped = value % max;
  return wrapped < 0 ? wrapped + max : wrapped;
};

const smoothstep = (edge0: number, edge1: number, value: number) => {
  if (edge0 === edge1) {
    return value < edge0 ? 0 : 1;
  }

  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const lerpColor = (
  from: [number, number, number],
  to: [number, number, number],
  amount: number,
): [number, number, number] => [
  Math.round(from[0] + (to[0] - from[0]) * amount),
  Math.round(from[1] + (to[1] - from[1]) * amount),
  Math.round(from[2] + (to[2] - from[2]) * amount),
];

const applyShade = (
  color: [number, number, number],
  factor: number,
): [number, number, number] => [
  Math.round(color[0] * factor),
  Math.round(color[1] * factor),
  Math.round(color[2] * factor),
];

const terrainNoise = (lat: number, lng: number) => {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  return (
    Math.sin(lngRad * 1.5 + latRad * 0.85) * 0.26 +
    Math.cos(lngRad * 3.7 - latRad * 1.9) * 0.2 +
    Math.sin((lngRad + latRad) * 6.6) * 0.1
  );
};

const humidityNoise = (lat: number, lng: number) => {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  return (
    Math.sin(lngRad * 2.1 - latRad * 1.1) * 0.28 +
    Math.cos(lngRad * 4.8 + latRad * 2.7) * 0.18
  );
};

const unwrapContour = (points: readonly [number, number][]) => {
  if (points.length === 0) {
    return [] as [number, number][];
  }

  const unwrapped: [number, number][] = [];
  let offset = 0;
  let lastLongitude = points[0][0];

  points.forEach(([lng, lat], index) => {
    if (index > 0) {
      const delta = lng - lastLongitude;

      if (delta > 180) {
        offset -= 360;
      } else if (delta < -180) {
        offset += 360;
      }
    }

    unwrapped.push([lng + offset, lat]);
    lastLongitude = lng;
  });

  return unwrapped;
};

const paintSurface = (
  lat: number,
  lng: number,
  landAlpha: number,
  coast: number,
) => {
  const latitudeFactor = Math.abs(lat) / 90;

  if (landAlpha < 0.12) {
    const ocean = lerpColor(
      [18, 48, 82],
      [42, 95, 132],
      (1 - latitudeFactor) * 0.14 + coast * 0.4,
    );

    return lerpColor(ocean, [88, 128, 148], coast * 0.16);
  }

  const relief = terrainNoise(lat, lng);
  const humidity = humidityNoise(lat, lng);
  const inland = smoothstep(0.08, 0.28, landAlpha);
  const mountain = clamp(0.46 + relief * 0.44 - inland * 0.12, 0, 1);
  const moisture = clamp(0.5 + humidity * 0.42 - latitudeFactor * 0.18, 0, 1);
  const snow = clamp(
    smoothstep(0.72, 0.97, latitudeFactor) + mountain * 0.28 - 0.2,
    0,
    1,
  );
  const desert = clamp(
    (0.44 - moisture) * 1.8 + (0.62 - latitudeFactor) * 0.2,
    0,
    1,
  );
  const forest = clamp((moisture - 0.48) * 1.45 + 0.12 - desert * 0.35, 0, 1);

  let color = lerpColor([138, 147, 114], [122, 136, 102], inland * 0.8);
  color = lerpColor(color, [160, 146, 114], desert * 0.82);
  color = lerpColor(color, [88, 114, 82], forest * 0.7);
  color = lerpColor(color, [123, 119, 111], mountain * 0.26);
  color = lerpColor(color, [229, 233, 232], snow * 0.88);

  return lerpColor(color, [179, 171, 145], coast * 0.08);
};

const buildSurfaceMap = () => {
  if (surfaceMap) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = WORLD_WIDTH;
  canvas.height = WORLD_HEIGHT;

  const context = canvas.getContext('2d', { willReadFrequently: true });

  if (!context) {
    return;
  }

  context.fillStyle = '#000000';
  context.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  context.fillStyle = '#ffffff';
  context.beginPath();

  for (const contour of landContours) {
    const points = unwrapContour(contour);

    for (const shift of [-WORLD_WIDTH, 0, WORLD_WIDTH]) {
      points.forEach(([lng, lat], index) => {
        const x = ((lng + 180) / 360) * WORLD_WIDTH + shift;
        const y = ((90 - lat) / 180) * WORLD_HEIGHT;

        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });

      context.closePath();
    }
  }

  context.fill();

  const mask = context.getImageData(0, 0, WORLD_WIDTH, WORLD_HEIGHT).data;
  const textureData = new Uint8ClampedArray(WORLD_WIDTH * WORLD_HEIGHT * 4);

  for (let y = 0; y < WORLD_HEIGHT; y += 1) {
    const latitude = 90 - ((y + 0.5) / WORLD_HEIGHT) * 180;

    for (let x = 0; x < WORLD_WIDTH; x += 1) {
      const longitude = ((x + 0.5) / WORLD_WIDTH) * 360 - 180;
      const index = (y * WORLD_WIDTH + x) * 4;
      const landAlpha = mask[index] / 255;
      const east = mask[(y * WORLD_WIDTH + wrap(x + 1, WORLD_WIDTH)) * 4] / 255;
      const west = mask[(y * WORLD_WIDTH + wrap(x - 1, WORLD_WIDTH)) * 4] / 255;
      const north =
        mask[(clamp(y - 1, 0, WORLD_HEIGHT - 1) * WORLD_WIDTH + x) * 4] / 255;
      const south =
        mask[(clamp(y + 1, 0, WORLD_HEIGHT - 1) * WORLD_WIDTH + x) * 4] / 255;
      const coast = clamp(
        Math.max(
          Math.abs(landAlpha - east),
          Math.abs(landAlpha - west),
          Math.abs(landAlpha - north),
          Math.abs(landAlpha - south),
        ) *
          2.8 +
          (landAlpha > 0.02 && landAlpha < 0.98 ? 0.1 : 0),
        0,
        1,
      );
      const color = paintSurface(latitude, longitude, landAlpha, coast);

      textureData[index] = color[0];
      textureData[index + 1] = color[1];
      textureData[index + 2] = color[2];
      textureData[index + 3] = Math.round(landAlpha * 255);
    }
  }

  surfaceMap = {
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    data: textureData,
  };
};

const sampleTerrain = (lat: number, lng: number): TerrainSample => {
  if (!surfaceMap) {
    return {
      color: [22, 53, 88],
      isLand: false,
    };
  }

  const map = surfaceMap;
  const mappedX = wrap(((lng + 180) / 360) * map.width, map.width);
  const mappedY = clamp(
    ((90 - lat) / 180) * (map.height - 1),
    0,
    map.height - 1,
  );
  const x0 = Math.floor(mappedX);
  const y0 = Math.floor(mappedY);
  const x1 = wrap(x0 + 1, map.width);
  const y1 = Math.min(y0 + 1, map.height - 1);
  const tx = mappedX - x0;
  const ty = mappedY - y0;
  const topLeft = (y0 * map.width + x0) * 4;
  const topRight = (y0 * map.width + x1) * 4;
  const bottomLeft = (y1 * map.width + x0) * 4;
  const bottomRight = (y1 * map.width + x1) * 4;

  const mixChannel = (channel: number) => {
    const top =
      map.data[topLeft + channel] * (1 - tx) +
      map.data[topRight + channel] * tx;
    const bottom =
      map.data[bottomLeft + channel] * (1 - tx) +
      map.data[bottomRight + channel] * tx;

    return Math.round(top * (1 - ty) + bottom * ty);
  };

  const alphaTop =
    map.data[topLeft + 3] * (1 - tx) + map.data[topRight + 3] * tx;
  const alphaBottom =
    map.data[bottomLeft + 3] * (1 - tx) + map.data[bottomRight + 3] * tx;
  const alpha = alphaTop * (1 - ty) + alphaBottom * ty;

  return {
    color: [mixChannel(0), mixChannel(1), mixChannel(2)],
    isLand: alpha > 28,
  };
};

const getRenderBuffer = (targetSize: number) => {
  if (renderBuffer && renderBuffer.size === targetSize) {
    return renderBuffer;
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;

  const context = canvas.getContext('2d');

  if (!context) {
    return undefined;
  }

  renderBuffer = {
    canvas,
    context,
    size: targetSize,
  };

  return renderBuffer;
};

const renderGlobeTexture = () => {
  if (size.value === 0) {
    return undefined;
  }

  const resolutionFactor = isDragging.value
    ? 0.68
    : 0.88 + zoomLevel.value * 0.08;
  const renderSize = clamp(Math.round(size.value * resolutionFactor), 380, 680);
  const buffer = getRenderBuffer(renderSize);

  if (!buffer) {
    return undefined;
  }

  const { context, canvas } = buffer;
  const imageData = context.createImageData(renderSize, renderSize);
  const data = imageData.data;
  const center = renderSize / 2;
  const radius = renderSize * 0.39;
  const cosTilt = Math.cos(tilt.value);
  const sinTilt = Math.sin(tilt.value);

  let offset = 0;

  for (let y = 0; y < renderSize; y += 1) {
    const yView = (center - (y + 0.5)) / radius;

    for (let x = 0; x < renderSize; x += 1) {
      const xView = (x + 0.5 - center) / radius;
      const distanceSquared = xView * xView + yView * yView;

      if (distanceSquared > 1) {
        data[offset + 3] = 0;
        offset += 4;
        continue;
      }

      const zView = Math.sqrt(1 - distanceSquared);
      const worldY = yView * cosTilt + zView * sinTilt;
      const worldZ = -yView * sinTilt + zView * cosTilt;
      const latitude = (Math.asin(clamp(worldY, -1, 1)) * 180) / Math.PI;
      const longitude =
        ((Math.atan2(xView, worldZ) - rotation.value) * 180) / Math.PI;

      const terrain = sampleTerrain(latitude, longitude);
      const diffuse = clamp(
        xView * LIGHT[0] + yView * LIGHT[1] + zView * LIGHT[2],
        0,
        1,
      );
      const shade = 0.56 + diffuse * 0.34 + Math.pow(1 - zView, 1.7) * 0.04;
      let color = applyShade(terrain.color, shade);

      if (!terrain.isLand) {
        const specular = Math.pow(
          clamp(diffuse * 0.42 + zView * 0.04, 0, 1),
          34,
        );
        color = lerpColor(color, [124, 144, 163], specular * 0.03);
      }

      data[offset] = color[0];
      data[offset + 1] = color[1];
      data[offset + 2] = color[2];
      data[offset + 3] = 255;
      offset += 4;
    }
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
};

const drawScene = () => {
  const canvas = canvasRef.value;

  if (!canvas || size.value === 0) {
    return;
  }

  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const radius = globeRadius();
  const center = size.value / 2;

  if (canvas.width !== Math.round(size.value * dpr)) {
    canvas.width = Math.round(size.value * dpr);
    canvas.height = Math.round(size.value * dpr);
    context.scale(dpr, dpr);
  }

  context.imageSmoothingEnabled = true;

  context.clearRect(0, 0, size.value, size.value);

  const shadow = context.createRadialGradient(
    center,
    center + radius * 0.24,
    radius * 0.32,
    center,
    center + radius * 0.24,
    radius * 1.54,
  );
  shadow.addColorStop(0, 'rgba(2,7,14,0.24)');
  shadow.addColorStop(1, 'rgba(2,7,14,0)');
  context.fillStyle = shadow;
  context.beginPath();
  context.ellipse(
    center,
    center + radius * 0.24,
    radius * 0.96,
    radius * 0.4,
    0,
    0,
    TAU,
  );
  context.fill();

  const texture = renderGlobeTexture();

  if (texture) {
    context.drawImage(
      texture,
      center - radius,
      center - radius,
      radius * 2,
      radius * 2,
    );
  }

  const highlight = context.createRadialGradient(
    center - radius * 0.24,
    center - radius * 0.3,
    radius * 0.01,
    center - radius * 0.18,
    center - radius * 0.18,
    radius * 0.38,
  );
  highlight.addColorStop(0, 'rgba(255,255,255,0.025)');
  highlight.addColorStop(0.2, 'rgba(255,255,255,0.01)');
  highlight.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = highlight;
  context.beginPath();
  context.arc(center, center, radius, 0, TAU);
  context.fill();
};

const syncCanvasSize = () => {
  const host = hostRef.value;

  if (!host) {
    return;
  }

  size.value = Math.max(340, Math.min(host.clientWidth, host.clientHeight));
  renderBuffer = undefined;
  drawScene();
};

const animate = (timestamp: number) => {
  if (!lastAnimationAt) {
    lastAnimationAt = timestamp;
  }

  const deltaSeconds = Math.min((timestamp - lastAnimationAt) / 1000, 0.05);
  lastAnimationAt = timestamp;
  currentTime.value = Date.now();

  if (!isDragging.value) {
    manualRotation.value += rotationVelocity.value * deltaSeconds;
    rotationVelocity.value *= Math.pow(0.22, deltaSeconds);
  }

  drawScene();
  animationFrameId = window.requestAnimationFrame(animate);
};

const handlePointerDown = (event: PointerEvent) => {
  isDragging.value = true;
  activePointerId.value = event.pointerId;
  lastPointerX.value = event.clientX;
  lastPointerY.value = event.clientY;
  hostRef.value?.setPointerCapture(event.pointerId);
};

const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging.value || activePointerId.value !== event.pointerId) {
    return;
  }

  const deltaX = event.clientX - lastPointerX.value;
  const deltaY = event.clientY - lastPointerY.value;

  lastPointerX.value = event.clientX;
  lastPointerY.value = event.clientY;

  manualRotation.value += deltaX * 0.0056;
  tilt.value = clamp(tilt.value + deltaY * 0.0019, -0.84, 0.84);
  rotationVelocity.value = deltaX * 0.016;
};

const handlePointerUp = (event: PointerEvent) => {
  if (activePointerId.value !== event.pointerId) {
    return;
  }

  isDragging.value = false;
  activePointerId.value = null;
};

const handleWheel = (event: WheelEvent) => {
  zoomLevel.value = clamp(zoomLevel.value - event.deltaY * 0.00055, 0, 1);
};

onMounted(() => {
  buildSurfaceMap();
  syncCanvasSize();
  resizeObserver = new ResizeObserver(() => syncCanvasSize());

  if (hostRef.value) {
    resizeObserver.observe(hostRef.value);
  }

  animationFrameId = window.requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.cancelAnimationFrame(animationFrameId);
  renderBuffer = undefined;
});
</script>

<style scoped>
.drop-shell {
  filter: drop-shadow(0 14px 28px rgba(15, 23, 42, 0.18));
}

.drop-body {
  position: absolute;
  top: 4px;
  left: 50%;
  display: flex;
  height: 32px;
  width: 32px;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 999px;
}

.drop-avatar {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 999px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.64);
}

.tip-fade-enter-active,
.tip-fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.tip-fade-enter-from,
.tip-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(-100% - 8px));
}
</style>
