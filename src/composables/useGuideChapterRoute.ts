import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type GuideChapterLike = {
  id: string;
};

const resolveQueryValue = (value: unknown) => {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0];
  }

  return '';
};

export const useGuideChapterRoute = <T extends GuideChapterLike>(
  chapters: T[],
) => {
  const route = useRoute();
  const router = useRouter();
  const fallbackChapter = chapters[0];

  if (!fallbackChapter) {
    throw new Error('Guide chapters are required.');
  }

  const chapterIdSet = new Set(chapters.map((chapter) => chapter.id));

  const activeChapterId = computed(() => {
    const chapterFromQuery = resolveQueryValue(route.query.chapter);

    return chapterIdSet.has(chapterFromQuery)
      ? chapterFromQuery
      : fallbackChapter.id;
  });

  const activeChapter = computed(
    () =>
      chapters.find((chapter) => chapter.id === activeChapterId.value) ??
      fallbackChapter,
  );

  const setActiveChapterId = (chapterId: string) => {
    if (!chapterIdSet.has(chapterId)) {
      return;
    }

    void router.replace({
      query: {
        ...route.query,
        chapter: chapterId,
      },
    });
  };

  return {
    activeChapter,
    activeChapterId,
    setActiveChapterId,
  };
};
