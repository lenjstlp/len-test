export type AlgorithmGuideSection = {
  id: string;
  title: string;
  summary: string;
  bullets?: string[];
  code?: string;
  callout?: string;
};

export type AlgorithmGuideChapter = {
  id: string;
  label: string;
  description: string;
  outcome: string;
  sections: AlgorithmGuideSection[];
};

export const algorithmGuideChapters: AlgorithmGuideChapter[] = [
  {
    id: 'two-sum',
    label: '1. LeetCode 1. 两数之和',
    description:
      '用一道最经典的入门题，讲清楚哈希表在算法题里的基本用法。重点不是背答案，而是建立“边遍历边查找”的思维方式。',
    outcome:
      '你能独立写出两数之和的哈希表解法，理解为什么它比双重循环更优，并知道这类题的通用判断框架。',
    sections: [
      {
        id: 'problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数数组 `nums` 和目标值 `target`，需要找出两个下标，使得这两个下标对应的数字之和等于 `target`。题目保证一定存在一个答案，并且同一个元素不能重复使用。',
        bullets: [
          '返回的是下标，不是数字本身。',
          '不能拿同一个位置的元素用两次。',
          '题目保证恰好存在一个答案，所以找到后可以直接返回。',
          '这是一道标准的“查补数”问题，核心是把“另一个数应该是多少”快速算出来。',
        ],
      },
      {
        id: 'brute-force',
        title: '先想暴力解，再知道为什么它慢',
        summary:
          '最直接的做法是双重循环，枚举所有两两组合。这个思路不难，但时间复杂度太高，一旦数组长度大起来就不划算。',
        bullets: [
          '外层固定第一个数，内层从后面找第二个数。',
          '如果 `nums[i] + nums[j] === target`，就返回 `[i, j]`。',
          '时间复杂度是 `O(n²)`，空间复杂度是 `O(1)`。',
          '暴力解的意义不是为了通过，而是帮助你找出真正需要优化的点：如何更快找到补数。',
        ],
        code: `function twoSumBruteForce(nums: number[], target: number): number[] {\n  for (let i = 0; i < nums.length; i += 1) {\n    for (let j = i + 1; j < nums.length; j += 1) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j]\n      }\n    }\n  }\n\n  return []\n}`,
      },
      {
        id: 'hash-map-idea',
        title: '真正的关键：一边遍历，一边查补数',
        summary:
          '如果当前数字是 `x`，那它需要的另一个数字就是 `target - x`。所以问题立刻变成：我之前见过这个补数吗？如果见过，就已经找到答案。',
        bullets: [
          '先算补数：`complement = target - nums[i]`。',
          '再去哈希表里查：这个补数之前是否出现过。',
          '如果出现过，哈希表里存的就是补数对应的下标。',
          '如果没出现，再把当前数字和当前下标存进去，继续遍历。',
        ],
        callout:
          '这类题的共性不是“两数之和”四个字，而是“当前值需要一个什么条件的历史值”。一旦历史值能被哈希表快速查到，复杂度通常就能降下来。',
      },
      {
        id: 'optimal-solution',
        title: '最优解法：哈希表',
        summary:
          '用 `Map<number, number>` 存数字到下标的映射。每轮先查补数，再存当前值，这样就不会把自己和自己配对。',
        bullets: [
          '时间复杂度是 `O(n)`，因为每个元素只遍历一次。',
          '空间复杂度是 `O(n)`，因为最坏情况下所有元素都要进哈希表。',
          '顺序一定要先查后存，否则像 `target = 6, nums = [3, 3]` 这种场景就可能误用当前元素。',
        ],
        code: `function twoSum(nums: number[], target: number): number[] {\n  const indexMap = new Map<number, number>()\n\n  for (let i = 0; i < nums.length; i += 1) {\n    const current = nums[i]\n    const complement = target - current\n\n    if (indexMap.has(complement)) {\n      return [indexMap.get(complement)!, i]\n    }\n\n    indexMap.set(current, i)\n  }\n\n  return []\n}`,
      },
      {
        id: 'walkthrough',
        title: '拿一个例子手推一次',
        summary:
          '例如 `nums = [2, 7, 11, 15]`，`target = 9`。第一轮看到 `2`，补数是 `7`，哈希表里没有，于是存入 `2 -> 0`。第二轮看到 `7`，补数是 `2`，哈希表里已经有了，所以答案就是 `[0, 1]`。',
        bullets: [
          '第 0 轮：当前值 `2`，补数 `7`，未找到，存入 `2 -> 0`。',
          '第 1 轮：当前值 `7`，补数 `2`，找到，返回 `[0, 1]`。',
          '这就是“历史信息”发挥作用的地方，当前元素不需要再向后暴力枚举。',
        ],
      },
      {
        id: 'mistakes-and-extensions',
        title: '易错点和可以延伸的方向',
        summary:
          '把这题学透，后面很多“数组 + 哈希表”的题都会更容易。关键不是记答案，而是记住这个模型。',
        bullets: [
          '易错点 1：把返回值写成数字而不是下标。',
          '易错点 2：先存后查，导致同一个元素被重复使用。',
          '易错点 3：忘记题目保证有解，于是额外写了很多没必要的分支。',
          '延伸方向：三数之和、四数之和、存在重复元素、最长连续序列等题目，都和哈希结构有关。',
        ],
        callout:
          '如果你刚开始刷题，不要急着刷很多道。先把一题真正拆开：题目在问什么、暴力解是什么、瓶颈在哪、优化点是什么、代码为什么这样写。这样才会积累解题能力。',
      },
    ],
  },
];
