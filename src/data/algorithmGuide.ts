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
  difficulty: '简单' | '中等' | '困难';
  description: string;
  outcome: string;
  sections: AlgorithmGuideSection[];
};

export const algorithmGuideChapters: AlgorithmGuideChapter[] = [
  {
    id: 'two-sum',
    label: '1. LeetCode 1. 两数之和',
    difficulty: '简单',
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
  {
    id: 'add-two-numbers',
    label: '2. LeetCode 2. 两数相加',
    difficulty: '中等',
    description:
      '这题开始进入链表。重点不是把题目机械翻译成代码，而是理解“按位相加 + 进位传递”如何在链表上自然推进。',
    outcome:
      '你能独立写出两数相加的链表解法，理解虚拟头结点、进位 carry 和链表遍历同步推进的写法。',
    sections: [
      {
        id: 'atn-problem-summary',
        title: '题目在问什么',
        summary:
          '给你两个非空链表，表示两个非负整数。数字按逆序存储，也就是个位在前。你需要把这两个数相加，并以同样的逆序链表形式返回结果。',
        bullets: [
          '链表节点里存的是单个数字，不是完整数字。',
          '逆序存储意味着你可以从个位开始直接相加。',
          '两个链表长度可能不同，所以不能假设它们同步结束。',
          '最后如果还有进位，也要额外新建一个节点。',
        ],
      },
      {
        id: 'atn-core-idea',
        title: '核心思路：像手算加法一样逐位推进',
        summary:
          '这题本质上就是小学竖式加法。每一轮都拿当前两个节点的值，再加上上一轮留下的进位 carry，得到当前位和下一轮进位。',
        bullets: [
          '当前位和：`sum = x + y + carry`。',
          '当前结果节点值：`sum % 10`。',
          '下一轮进位：`Math.floor(sum / 10)`。',
          '链表遍历结束后，如果 carry 还大于 0，要补一个新节点。',
        ],
        callout:
          '这题最重要的不是链表本身，而是把“逐位处理”和“状态向后传递”这两个动作写稳。链表只是载体，真正的状态是 carry。',
      },
      {
        id: 'atn-why-dummy-head',
        title: '为什么要用虚拟头结点',
        summary:
          '如果不用虚拟头结点，你每次添加新节点时都要区分“这是第一个节点”还是“挂在后面”。用了 dummy head 以后，代码会平滑很多。',
        bullets: [
          '虚拟头结点不参与结果值，只是为了让指针拼接统一。',
          '最终返回 `dummy.next` 就是答案链表。',
          '这类“不断往后拼接结果链表”的题，dummy head 几乎是默认写法。',
        ],
      },
      {
        id: 'atn-optimal-solution',
        title: '标准解法：链表遍历 + 进位',
        summary:
          '同时遍历两个链表，任何一个链表走完后都把它的值当成 0。这样就能自然处理长度不同的情况。',
        bullets: [
          '时间复杂度是 `O(max(m, n))`，其中 `m` 和 `n` 是两个链表长度。',
          '额外空间复杂度如果不算答案链表是 `O(1)`。',
          '循环条件要写成“只要有任一链表未结束或还有进位，就继续”。',
        ],
        code: `class ListNode {\n  val: number\n  next: ListNode | null\n\n  constructor(val = 0, next: ListNode | null = null) {\n    this.val = val\n    this.next = next\n  }\n}\n\nfunction addTwoNumbers(\n  l1: ListNode | null,\n  l2: ListNode | null,\n): ListNode | null {\n  const dummy = new ListNode()\n  let current = dummy\n  let carry = 0\n\n  while (l1 || l2 || carry) {\n    const x = l1?.val ?? 0\n    const y = l2?.val ?? 0\n    const sum = x + y + carry\n\n    carry = Math.floor(sum / 10)\n    current.next = new ListNode(sum % 10)\n    current = current.next\n\n    l1 = l1?.next ?? null\n    l2 = l2?.next ?? null\n  }\n\n  return dummy.next\n}`,
      },
      {
        id: 'atn-walkthrough',
        title: '拿示例手推一次',
        summary:
          '例如 `l1 = [2,4,3]`，`l2 = [5,6,4]`。它们表示的数字分别是 342 和 465。逐位相加得到 7、0、8，所以返回 `[7,0,8]`，表示 807。',
        bullets: [
          '第一轮：`2 + 5 + 0 = 7`，当前位是 7，进位是 0。',
          '第二轮：`4 + 6 + 0 = 10`，当前位是 0，进位是 1。',
          '第三轮：`3 + 4 + 1 = 8`，当前位是 8，进位是 0。',
          '最终结果链表是 `[7,0,8]`。',
        ],
      },
      {
        id: 'atn-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是链表基础题里的核心代表。只要这题写顺了，后面很多“链表遍历 + 状态传递”的题都会更容易。',
        bullets: [
          '易错点 1：只写 `while (l1 && l2)`，这样长度不同时会漏节点。',
          '易错点 2：忘记最后还有一个 `carry` 时需要补节点。',
          '易错点 3：没有使用 dummy head，导致结果链表首节点处理混乱。',
          '延伸方向：两两交换链表节点、删除倒数第 N 个节点、合并两个有序链表、K 个一组翻转链表。',
        ],
        callout:
          '如果第一题在训练你如何用哈希表换时间，这第二题就在训练你如何把“过程状态”稳定地带着往后走。刷题往后会越来越常见这种写法。',
      },
    ],
  },
  {
    id: 'longest-substring-without-repeating-characters',
    label: '3. LeetCode 3. 无重复字符的最长子串',
    difficulty: '中等',
    description:
      '这题是滑动窗口的标准入门题。重点不是把 left 和 right 指针背下来，而是理解“窗口内必须始终满足某个条件”这种做题方式。',
    outcome:
      '你能独立写出无重复字符最长子串的滑动窗口解法，理解窗口收缩与扩张的时机，并知道这类题为什么能从暴力降到线性复杂度。',
    sections: [
      {
        id: 'ls-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串 `s`，找出其中不含重复字符的最长子串长度。注意这里要的是“子串”，也就是连续片段，不是可以跳着选的子序列。',
        bullets: [
          '子串必须连续，这一点非常关键。',
          '要求的是长度，不是具体子串内容。',
          '窗口里的字符一旦重复，就说明当前区间不合法，需要调整。',
          '这类题的核心是维护一个始终合法的连续区间。',
        ],
      },
      {
        id: 'ls-brute-force',
        title: '先看暴力解，明确瓶颈在哪',
        summary:
          '暴力思路是枚举所有子串，再逐个判断是否有重复字符。这当然能做，但会非常慢，因为子串数量本身就很多。',
        bullets: [
          '双重循环枚举每个起点和终点。',
          '对每个子串再用集合判断是否重复。',
          '时间复杂度至少是 `O(n²)`，如果判断重复再扫一遍，实际会更高。',
          '瓶颈不在于“不会判断重复”，而在于反复重复检查已经看过的区间。',
        ],
      },
      {
        id: 'ls-window-idea',
        title: '滑动窗口到底在做什么',
        summary:
          '滑动窗口的本质是维护一个连续区间 `[left, right]`，让它始终满足“没有重复字符”这个条件。右指针负责扩张，左指针负责修复违规。',
        bullets: [
          '右指针向右走，把新字符纳入窗口。',
          '如果新字符导致窗口不合法，就移动左指针，直到窗口恢复合法。',
          '每当窗口合法时，都可以尝试更新最大长度。',
          '因为每个字符最多进窗口一次、出窗口一次，所以整体是线性的。',
        ],
        callout:
          '滑动窗口并不是固定模板，而是一种维护区间状态的方式。先问自己：窗口里需要一直满足什么条件？一旦条件被破坏，怎么修复？',
      },
      {
        id: 'ls-hash-set-solution',
        title: '标准解法：双指针 + Set',
        summary:
          '最直观的写法是用一个 `Set` 表示当前窗口中的字符。右指针扩张时，如果发现字符已存在，就不断移动左指针并删除左侧字符，直到重复消失。',
        bullets: [
          '时间复杂度是 `O(n)`，每个字符最多被加入和删除一次。',
          '空间复杂度是 `O(k)`，`k` 为窗口中不同字符数量。',
          '写滑动窗口时，先保证窗口合法，再更新答案，逻辑会更稳定。',
        ],
        code: `function lengthOfLongestSubstring(s: string): number {\n  const window = new Set<string>()\n  let left = 0\n  let maxLength = 0\n\n  for (let right = 0; right < s.length; right += 1) {\n    while (window.has(s[right])) {\n      window.delete(s[left])\n      left += 1\n    }\n\n    window.add(s[right])\n    maxLength = Math.max(maxLength, right - left + 1)\n  }\n\n  return maxLength\n}`,
      },
      {
        id: 'ls-example-walkthrough',
        title: '拿示例手推一次',
        summary:
          '例如 `s = "abcabcbb"`。一开始窗口不断扩张得到 `abc`，长度是 3。继续往右遇到第二个 `a` 时，窗口不再合法，所以左指针开始右移，直到旧的 `a` 被移出窗口。',
        bullets: [
          '窗口先扩到 `abc`，当前最大长度是 3。',
          '读到第二个 `a`，说明窗口里重复了，开始移动 left。',
          '移出旧的 `a` 后，窗口重新合法，再继续扩张。',
          '整个过程中，最大合法窗口长度始终保持为 3。',
        ],
      },
      {
        id: 'ls-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是很多窗口题的起点。学会后，后面的“最多包含 K 个不同字符”“最小覆盖子串”“字符串排列”等题会更容易建立思路。',
        bullets: [
          '易错点 1：把题目理解成子序列，导致做法完全跑偏。',
          '易错点 2：发现重复后只移动一次 left，而不是一直移动到窗口恢复合法。',
          '易错点 3：窗口收缩后没有重新更新长度，导致答案错误。',
          '延伸方向：最小覆盖子串、找到字符串中所有字母异位词、长度最小的子数组、乘积小于 K 的子数组。',
        ],
        callout:
          '如果第一题在教你用哈希表记历史，第二题在教你传递状态，那第三题就是在教你维护一个“始终合法的区间”。这三类思维是刷题前期最值得打牢的基础。',
      },
    ],
  },
];
