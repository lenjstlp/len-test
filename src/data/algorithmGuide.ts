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
  {
    id: 'median-of-two-sorted-arrays',
    label: '4. LeetCode 4. 寻找两个正序数组的中位数',
    difficulty: '困难',
    description:
      '这题是二分查找的代表性进阶题。真正难点不在于“二分”两个字，而在于能否把问题转成“找到正确切分位置”。',
    outcome:
      '你能理解为什么这题不能停留在简单合并，能掌握按切分位置做二分的思路，并独立写出 `O(log(min(m,n)))` 的标准解法。',
    sections: [
      {
        id: 'mta-problem-summary',
        title: '题目在问什么',
        summary:
          '给定两个从小到大排序的数组 `nums1` 和 `nums2`，要求找出这两个数组合并后的中位数，并且时间复杂度必须是 `O(log(m + n))` 级别。',
        bullets: [
          '两个数组本身已经有序，这是最重要的前提。',
          '如果把两个数组完整合并，当然能做，但复杂度通常是 `O(m + n)`。',
          '题目明确要求更快，所以你必须利用“有序”这个性质做二分。',
          '中位数本质上就是把整体切成左右两半，并保证左半最大值不大于右半最小值。',
        ],
      },
      {
        id: 'mta-brute-force',
        title: '为什么普通合并法不够',
        summary:
          '最自然的思路是先合并两个有序数组，再取中位数。这个做法在工程里没问题，但在这道题里达不到目标复杂度。',
        bullets: [
          '完整合并需要遍历两边数组，时间复杂度是 `O(m + n)`。',
          '即使不完整合并，只模拟到中位数位置，仍然是线性复杂度。',
          '题目要求对数级别，所以必须换角度，而不是继续优化合并细节。',
        ],
      },
      {
        id: 'mta-core-idea',
        title: '真正的核心：在较短数组上二分切分点',
        summary:
          '把两个数组想象成被切成左右两半。只要找到一个切分位置，使得左边所有数都不大于右边所有数，那么中位数就能直接从边界算出来。',
        bullets: [
          '设 `i` 是 `nums1` 的切分位置，`j` 是 `nums2` 的切分位置。',
          '要求左半部分总元素数等于右半部分，或只多一个。',
          '只要满足 `nums1Left <= nums2Right` 且 `nums2Left <= nums1Right`，切分就合法。',
          '因为切分合法性随位置单调变化，所以可以在较短数组上二分。',
        ],
        callout:
          '这题最值钱的地方就是思维转换：不是在数组里找某个值，而是在找一个“让整体左右平衡且有序”的切分位置。很多高级二分题本质都是这样。',
      },
      {
        id: 'mta-why-shorter-array',
        title: '为什么一定在较短数组上二分',
        summary:
          '如果不先保证在较短数组上二分，另一个数组的切分位置 `j` 可能会越界。先交换数组，让 `nums1` 永远更短，写法会稳定很多。',
        bullets: [
          '二分范围会更小，效率更高。',
          '更重要的是可以保证 `j` 的计算更容易控制在合法区间。',
          '很多官方或经典解法第一步就是先交换两数组，让短数组在前。',
        ],
      },
      {
        id: 'mta-optimal-solution',
        title: '标准解法：二分切分位置',
        summary:
          '每一轮先取 `nums1` 的中间切分点 `i`，再根据总左半长度推导出 `nums2` 的切分点 `j`。之后比较四个边界值，判断应该左移还是右移。',
        bullets: [
          '时间复杂度是 `O(log(min(m, n)))`。',
          '空间复杂度是 `O(1)`。',
          '边界处理通常借助 `-Infinity` 和 `Infinity`，避免写很多额外判断。',
        ],
        code: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n  if (nums1.length > nums2.length) {\n    return findMedianSortedArrays(nums2, nums1)\n  }\n\n  const m = nums1.length\n  const n = nums2.length\n  let left = 0\n  let right = m\n\n  while (left <= right) {\n    const i = Math.floor((left + right) / 2)\n    const j = Math.floor((m + n + 1) / 2) - i\n\n    const nums1Left = i === 0 ? -Infinity : nums1[i - 1]\n    const nums1Right = i === m ? Infinity : nums1[i]\n    const nums2Left = j === 0 ? -Infinity : nums2[j - 1]\n    const nums2Right = j === n ? Infinity : nums2[j]\n\n    if (nums1Left <= nums2Right && nums2Left <= nums1Right) {\n      if ((m + n) % 2 === 1) {\n        return Math.max(nums1Left, nums2Left)\n      }\n\n      return (\n        (Math.max(nums1Left, nums2Left) +\n          Math.min(nums1Right, nums2Right)) /\n        2\n      )\n    }\n\n    if (nums1Left > nums2Right) {\n      right = i - 1\n    } else {\n      left = i + 1\n    }\n  }\n\n  throw new Error('Invalid input')\n}`,
      },
      {
        id: 'mta-example-walkthrough',
        title: '拿例子理解切分过程',
        summary:
          '例如 `nums1 = [1, 3]`，`nums2 = [2]`。先让较短数组在前，即 `nums1 = [2]`，`nums2 = [1, 3]`。此时切分后左边是 `[1, 2]`，右边是 `[3]`，左边最大值就是中位数。',
        bullets: [
          '总长度是 3，所以左边应有 2 个元素。',
          '当 `nums1` 切 1 个、`nums2` 切 1 个时，左边是 `[2] + [1]`，右边是 `[] + [3]`。',
          '此时左边最大值为 2，右边最小值为 3，且左右合法。',
          '因为总长度是奇数，所以答案是左边最大值 2。',
        ],
      },
      {
        id: 'mta-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题通常不是“不会二分”，而是边界和切分条件容易写错。只要把切分语义想清楚，代码就会稳定很多。',
        bullets: [
          '易错点 1：没有先让较短数组在前，导致 `j` 越界。',
          '易错点 2：奇偶长度下中位数公式混淆。',
          '易错点 3：边界位置没有用 `Infinity` 和 `-Infinity` 兜底，导致判断分支过于混乱。',
          '延伸方向：第 K 小元素、旋转数组二分、在两个有序结构中找临界位置等题目，都能训练类似的切分思维。',
        ],
        callout:
          '前 3 题更多是在练常用数据结构和窗口；第 4 题开始要求你主动重构问题模型。能把这题看懂，说明你已经开始真正进入算法题的“思维层”。',
      },
    ],
  },
  {
    id: 'longest-palindromic-substring',
    label: '5. LeetCode 5. 最长回文子串',
    difficulty: '中等',
    description:
      '这题开始让你建立“以某个位置为中心向两边扩展”的思维。重点不是背中心扩展法，而是理解为什么回文天然适合围绕中心处理。',
    outcome:
      '你能独立写出最长回文子串的中心扩展解法，理解奇偶长度回文的区别，并知道为什么它比暴力枚举更合适。',
    sections: [
      {
        id: 'lps-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串 `s`，返回其中最长的回文子串。回文串的意思是正着读和反着读都一样，比如 `aba`、`abba`。',
        bullets: [
          '要求的是子串，所以必须连续。',
          '返回值是具体子串，不是长度。',
          '回文既可能是奇数长度，也可能是偶数长度。',
          '这题最关键的不是判断某个串是不是回文，而是如何高效找到最长的那个。',
        ],
      },
      {
        id: 'lps-brute-force',
        title: '暴力解为什么不划算',
        summary:
          '最直接的做法是枚举所有子串，再逐个判断是否回文，最后取最长的那一个。思路没有问题，但枚举量太大。',
        bullets: [
          '用双重循环枚举起点和终点，能列出所有子串。',
          '每个子串再用双指针判断是否回文。',
          '这样时间复杂度通常会到 `O(n³)`，字符串稍长就会明显变慢。',
          '真正需要优化的点，是避免对大量无效子串反复做完整检查。',
        ],
      },
      {
        id: 'lps-core-idea',
        title: '真正的关键：回文一定围绕中心对称',
        summary:
          '只要一个字符串是回文，那么它一定可以看成从某个中心向左右两边扩展得到。这个中心可能是一个字符，也可能是两个字符之间的空隙。',
        bullets: [
          '像 `aba` 这种奇数长度回文，中心是中间那个字符 `b`。',
          '像 `abba` 这种偶数长度回文，中心是两个 `b` 之间的位置。',
          '只要从每个可能的中心向两侧扩展，就能找到所有回文子串。',
          '因此这题不需要枚举所有子串，而是枚举所有中心。',
        ],
        callout:
          '很多算法题的本质都是换一个角度描述问题。这题如果站在“子串”角度看会很乱；一旦改成“中心”，思路立刻清晰很多。',
      },
      {
        id: 'lps-center-expand',
        title: '标准解法：中心扩展',
        summary:
          '遍历字符串中的每个位置，把它当作回文中心扩展一次；同时把它和下一个位置之间的空隙也当作中心扩展一次，这样奇偶两种情况都覆盖到了。',
        bullets: [
          '总共有 `2n - 1` 个潜在中心。',
          '每次扩展时，只要左右字符相等，就继续往外走。',
          '扩展结束后，就得到了以该中心为核心的最长回文。',
          '遍历所有中心后，记录其中最长的结果即可。',
        ],
        code: `function longestPalindrome(s: string): string {\n  if (s.length < 2) {\n    return s\n  }\n\n  let start = 0\n  let end = 0\n\n  const expandFromCenter = (left: number, right: number) => {\n    while (left >= 0 && right < s.length && s[left] === s[right]) {\n      left -= 1\n      right += 1\n    }\n\n    return [left + 1, right - 1]\n  }\n\n  for (let i = 0; i < s.length; i += 1) {\n    const [left1, right1] = expandFromCenter(i, i)\n    const [left2, right2] = expandFromCenter(i, i + 1)\n\n    if (right1 - left1 > end - start) {\n      start = left1\n      end = right1\n    }\n\n    if (right2 - left2 > end - start) {\n      start = left2\n      end = right2\n    }\n  }\n\n  return s.slice(start, end + 1)\n}`,
      },
      {
        id: 'lps-example-walkthrough',
        title: '拿例子手推一次',
        summary:
          '例如 `s = "babad"`。当中心落在第 1 个字符 `a` 上时，可以向两边扩出 `bab`；当中心落在第 2 个字符 `b` 上时，又能扩出 `aba`。所以答案可以是 `bab` 或 `aba`。',
        bullets: [
          '以 `b` 为中心时，只能得到长度 1 的回文。',
          '以 `a` 为中心时，左右分别是 `b` 和 `b`，可以扩成 `bab`。',
          '继续往外已经越界，所以停止。',
          '后面再以另一个 `b` 为中心，又能得到 `aba`。',
        ],
      },
      {
        id: 'lps-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题看起来像字符串题，实际上是在练“围绕局部结构扩展”的思维。很多区间和双指针题都能借这个模式建立感觉。',
        bullets: [
          '易错点 1：只处理奇数长度中心，漏掉 `abba` 这种偶数回文。',
          '易错点 2：扩展结束后直接返回 `left` 和 `right`，忘了它们已经多走了一步。',
          '易错点 3：更新答案时比较长度写错，导致边界偏移。',
          '延伸方向：回文子串数量、最长回文子序列、最短回文串、Manacher 算法。',
        ],
        callout:
          '如果前几题在训练哈希、链表、滑动窗口和二分，那这第 5 题就在训练你如何主动寻找“问题的天然结构”。能意识到回文的中心对称性，说明你的题感已经开始往上走了。',
      },
    ],
  },
  {
    id: 'zigzag-conversion',
    label: '6. LeetCode 6. Z 字形变换',
    difficulty: '中等',
    description:
      '这题表面像字符串模拟，真正训练的是你把“二维摆动过程”压缩成一维规则的能力。重点不是画图，而是找到行号变化的规律。',
    outcome:
      '你能独立写出 Z 字形变换的模拟解法，理解方向切换的时机，并知道这类题为什么本质是状态机而不是复杂数学题。',
    sections: [
      {
        id: 'zz-problem-summary',
        title: '题目在问什么',
        summary:
          '给定字符串 `s` 和行数 `numRows`，需要把字符串按 Z 字形摆放后，再按行读取，返回新的结果字符串。',
        bullets: [
          '字符串字符会先从上往下填，再斜着往上回折。',
          '最终不是返回二维图，而是按每一行拼接后的结果。',
          '如果 `numRows = 1`，实际上根本不会发生折返。',
          '这题的难点不在字符串操作，而在于模拟字符落在哪一行。',
        ],
      },
      {
        id: 'zz-visualization',
        title: '先用例子看清楚 Z 字形',
        summary:
          '例如 `s = "PAYPALISHIRING"`，`numRows = 3` 时，字符会摆成 3 行折返结构。按行读取后，结果是 `PAHNAPLSIIGYIR`。',
        code: `P   A   H   N\nA P L S I I G\nY   I   R`,
        bullets: [
          '第一行拿到的是折返路径的顶点字符。',
          '中间行既会接收向下路径，也会接收斜着向上的字符。',
          '最后一行拿到的是折返路径的底点字符。',
        ],
      },
      {
        id: 'zz-core-idea',
        title: '核心思路：维护当前行和方向',
        summary:
          '你不需要真的构造一个完整二维矩阵。更高效的做法是维护一个“当前在哪一行”和“当前方向是向下还是向上”的状态，把字符依次追加到对应行里。',
        bullets: [
          '准备一个数组，每个元素对应一行字符串。',
          '遍历原字符串，每个字符都追加到当前行。',
          '如果到达第一行或最后一行，就切换方向。',
          '行号根据方向不断加一或减一。',
        ],
        callout:
          '这题很适合建立一个意识：很多看起来像二维图的问题，其实并不需要真的开二维数组。只要状态转移规则清楚，常常可以在线模拟。',
      },
      {
        id: 'zz-state-machine',
        title: '它为什么本质上是一个状态机',
        summary:
          '所谓状态机，简单说就是“当前状态决定下一步怎么走”。在这题里，状态就是“当前行号 + 当前方向”，规则固定，遍历过程完全可控。',
        bullets: [
          '状态 1：当前在哪一行。',
          '状态 2：当前方向是向下还是向上。',
          '遇到边界时，方向翻转。',
          '其余情况按当前方向继续移动。',
        ],
      },
      {
        id: 'zz-optimal-solution',
        title: '标准解法：行数组 + 方向切换',
        summary:
          '这是最稳定也最容易写对的做法。每轮把字符加入当前行，然后根据是否触边决定是否翻转方向。',
        bullets: [
          '时间复杂度是 `O(n)`，每个字符只处理一次。',
          '空间复杂度是 `O(n)`，因为需要保存每一行的字符结果。',
          '这题不是考你极限优化，而是考你是否能把过程状态表达清楚。',
        ],
        code: `function convert(s: string, numRows: number): string {\n  if (numRows === 1 || numRows >= s.length) {\n    return s\n  }\n\n  const rows = Array.from({ length: numRows }, () => '')\n  let currentRow = 0\n  let goingDown = false\n\n  for (const char of s) {\n    rows[currentRow] += char\n\n    if (currentRow === 0 || currentRow === numRows - 1) {\n      goingDown = !goingDown\n    }\n\n    currentRow += goingDown ? 1 : -1\n  }\n\n  return rows.join('')\n}`,
      },
      {
        id: 'zz-example-walkthrough',
        title: '拿示例手推一次',
        summary:
          '以 `PAYPALISHIRING` 和 `numRows = 4` 为例，一开始从第 0 行往下走，到第 3 行后方向反转，再斜着往上回到第 0 行，之后继续重复这个过程。',
        bullets: [
          '字符 `P` 落在第 0 行，接着 `A` 到第 1 行，`Y` 到第 2 行，`P` 到第 3 行。',
          '到达最后一行后，方向翻转，后续字符开始往上走。',
          '当再次回到第 0 行时，方向又翻回向下。',
          '整个过程只有“追加字符”和“切换方向”两个核心动作。',
        ],
      },
      {
        id: 'zz-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题代码不长，但很容易写出边界错误。只要方向翻转时机错一点，整条结果就会错。',
        bullets: [
          '易错点 1：忘记处理 `numRows === 1`，导致行号来回出错。',
          '易错点 2：在切换方向前后更新 `currentRow` 的顺序写错。',
          '易错点 3：真的去构造二维矩阵，结果代码复杂度被自己抬高。',
          '延伸方向：状态机模拟、字符串重排、矩阵遍历类题目、按规则走位的模拟题。',
        ],
        callout:
          '前几题分别在练哈希、链表、滑动窗口、二分和中心扩展；第 6 题则在练“把过程规则抽成状态转移”。这是算法题里非常常见的一类能力。',
      },
    ],
  },
  {
    id: 'reverse-integer',
    label: '7. LeetCode 7. 整数反转',
    difficulty: '中等',
    description:
      '这题表面是数字题，实质是在练“不断取最后一位，再把结果重组出来”的过程控制。重点不是会不会 `% 10`，而是能否把符号和溢出判断写稳。',
    outcome:
      '你能独立写出整数反转的标准解法，理解为什么要逐位弹出数字、为什么要提前做 32 位溢出判断，并能把这类数值模拟题写得足够稳。',
    sections: [
      {
        id: 'ri-problem-summary',
        title: '题目在问什么',
        summary:
          '给你一个 32 位有符号整数 `x`，要求把它的每一位数字反转后返回。如果反转后的结果超过了 32 位有符号整数范围 `[-2^31, 2^31 - 1]`，就返回 `0`。',
        bullets: [
          '正数和负数都要处理，符号要保留。',
          '像 `120` 反转后是 `21`，前导零自然消失。',
          '结果必须限制在 32 位有符号整数范围内。',
          '题目的真正难点不是反转本身，而是溢出判断。',
        ],
      },
      {
        id: 'ri-direct-idea',
        title: '先想最直接的做法，再知道为什么题目不想让你这么做',
        summary:
          '最直观的思路当然是把数字转成字符串，反转字符串后再转回数字。这在工程里未必有问题，但算法题更想训练你用数学方式逐位处理数字。',
        bullets: [
          '字符串法很好理解，但没有体现数值处理的核心过程。',
          '这题的价值在于练习“取末位”和“重建结果”两个动作。',
          '逐位处理的思路在很多数值模拟题里都能复用。',
        ],
      },
      {
        id: 'ri-core-idea',
        title: '核心思路：每次取出最后一位，再拼到结果后面',
        summary:
          '例如 `123`。先取出最后一位 `3`，结果变成 `3`；再取 `2`，结果变成 `32`；再取 `1`，结果变成 `321`。整个过程其实就是不断“弹出末位”和“把结果左移一位后再加上当前数字”。',
        bullets: [
          '当前末位可以用 `digit = x % 10` 得到。',
          '把当前数去掉末位，可以用 `Math.trunc(x / 10)`。',
          '结果更新公式是 `result = result * 10 + digit`。',
          '循环直到原数字变成 `0` 为止。',
        ],
        callout:
          '这题的过程和很多链表、字符串题很像：不是一次性得到答案，而是不断从原问题里“取一个单位”，再把答案一步步长出来。',
      },
      {
        id: 'ri-overflow-check',
        title: '真正的关键：为什么要在更新前判断溢出',
        summary:
          '如果你先把 `result` 更新出来，再判断是否超界，就有可能已经超过了安全范围。更稳的写法是在更新前先判断：如果再乘 10 再加一位，是否会越过 32 位边界。',
        bullets: [
          '32 位最大值是 `2147483647`，最小值是 `-2147483648`。',
          '如果 `result > 214748364`，那下一步乘 10 一定溢出。',
          '如果 `result === 214748364`，还要看当前 `digit` 是否大于 `7`。',
          '负数同理，边界要看 `-2147483648` 的最后一位 `-8`。',
        ],
      },
      {
        id: 'ri-optimal-solution',
        title: '标准解法：逐位弹出 + 提前判断边界',
        summary:
          '这题的稳定写法就是不断取末位，并在每次更新结果前先判断是否会越界。这样既符合题目要求，也能把数值过程控制住。',
        bullets: [
          '时间复杂度是 `O(log10 n)`，因为每次都会去掉一位数字。',
          '空间复杂度是 `O(1)`。',
          '`Math.trunc` 很适合这里，因为它会朝 0 方向截断，负数也能正确处理。',
        ],
        code: `function reverse(x: number): number {\n  let value = x\n  let result = 0\n\n  while (value !== 0) {\n    const digit = value % 10\n    value = Math.trunc(value / 10)\n\n    if (result > 214748364 || (result === 214748364 && digit > 7)) {\n      return 0\n    }\n\n    if (result < -214748364 || (result === -214748364 && digit < -8)) {\n      return 0\n    }\n\n    result = result * 10 + digit\n  }\n\n  return result\n}`,
      },
      {
        id: 'ri-example-walkthrough',
        title: '拿两个例子手推一次',
        summary:
          '例如 `x = 123`，依次取出 `3`、`2`、`1`，结果从 `0` 变成 `3`、`32`、`321`。再看 `x = -120`，依次取出 `0`、`-2`、`-1`，结果最后是 `-21`。',
        bullets: [
          '`123`：`result = 0 -> 3 -> 32 -> 321`。',
          '`-120`：先取 `0` 不影响结果，再取 `-2` 和 `-1`，最终得到 `-21`。',
          '前导零不会保留，因为数值计算里本来就没有“前导零”这个概念。',
        ],
      },
      {
        id: 'ri-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题属于典型的数值模拟题。代码不长，但非常考验边界意识。只要边界判断放松一点，结果就会错得很隐蔽。',
        bullets: [
          '易错点 1：使用字符串法过题后，没有真正学会数值处理过程。',
          '易错点 2：先更新 `result` 再判断溢出，导致边界不稳。',
          '易错点 3：负数时还用 `Math.floor(x / 10)`，结果会往更小方向取整，逻辑出错。',
          '延伸方向：回文数、字符串转整数、加一、阶乘后的零、数字拆位模拟等题目。',
        ],
        callout:
          '如果前 6 题在训练哈希、链表、窗口、二分、中心扩展和状态模拟，那第 7 题就在训练“数值过程控制 + 边界判断”。这是很多中等题开始真正拉开差距的地方。',
      },
    ],
  },
  {
    id: 'string-to-integer-atoi',
    label: '8. LeetCode 8. 字符串转换整数 (atoi)',
    difficulty: '中等',
    description:
      '这题表面是字符串处理，实质是在练“按规则逐字符消费输入”的过程控制。重点不是把规则背下来，而是能不能把空格、符号、数字截断和溢出边界写稳。',
    outcome:
      '你能独立写出字符串转整数的标准解法，理解状态推进顺序，知道为什么这题本质是规则模拟，并能把边界条件处理完整。',
    sections: [
      {
        id: 'atoi-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串 `s`，要求把它转换成一个 32 位有符号整数。转换过程要遵守固定规则：先跳过前导空格，再读取可选正负号，然后尽可能多地读取连续数字，后面的非数字字符直接忽略。如果结果超出 32 位范围，需要截断到边界值。',
        bullets: [
          '前导空格可以跳过，但中间空格不行。',
          '符号只能出现一次，并且必须出现在数字前面。',
          '一旦开始读数字，遇到非数字字符就立刻停止。',
          '结果必须限制在 `[-2^31, 2^31 - 1]`。 ',
        ],
      },
      {
        id: 'atoi-core-order',
        title: '最重要的不是代码，而是规则顺序',
        summary:
          '这题最容易错的地方，不在于不会写循环，而在于规则顺序一旦混乱，边界就全乱了。稳定写法一定是按固定顺序推进：跳空格、读符号、读数字、检查溢出、结束。',
        bullets: [
          '先处理前导空格，别一开始就碰符号或数字。',
          '符号只读一次，之后立即进入数字阶段。',
          '数字阶段只接受 `0-9`，一旦不满足就终止。',
          '每次追加数字前都要先判断是否会溢出。',
        ],
        callout:
          '这题本质上不是字符串题模板，而是一个小型状态机。每个字符该不该吃掉，取决于你当前处在哪个阶段。',
      },
      {
        id: 'atoi-why-overflow-first',
        title: '为什么要在乘 10 之前判断溢出',
        summary:
          '如果你先把结果更新出来，再判断是否越界，就可能已经超出了安全整数边界。更稳的方式是：在执行 `result = result * 10 + digit` 之前，先判断乘 10 并加上当前位后是否越界。',
        bullets: [
          '32 位最大值是 `2147483647`，最小值是 `-2147483648`。',
          '如果 `result > 214748364`，那下一步乘 10 一定越界。',
          '如果 `result === 214748364`，还要看当前数字是否超过边界最后一位。',
          '正负边界最后一位不同，正数看 `7`，负数看 `8`。',
        ],
      },
      {
        id: 'atoi-standard-solution',
        title: '标准解法：逐字符扫描 + 边界判断',
        summary:
          '这题最稳的实现就是一个指针从左到右扫描字符串。先跳过空格，再决定符号，然后不断读取数字并累积结果，同时在每次更新前判断是否溢出。',
        bullets: [
          '时间复杂度是 `O(n)`，因为字符串只扫描一遍。',
          '空间复杂度是 `O(1)`，只用了有限变量保存状态。',
          '这题不是考花哨技巧，而是考你是否能把规则落成稳定代码。',
        ],
        code: `function myAtoi(s: string): number {\n  const INT_MAX = 2 ** 31 - 1\n  const INT_MIN = -(2 ** 31)\n  let index = 0\n  let sign = 1\n  let result = 0\n\n  while (index < s.length && s[index] === ' ') {\n    index += 1\n  }\n\n  if (s[index] === '+' || s[index] === '-') {\n    sign = s[index] === '-' ? -1 : 1\n    index += 1\n  }\n\n  while (index < s.length) {\n    const char = s[index]\n\n    if (char < '0' || char > '9') {\n      break\n    }\n\n    const digit = char.charCodeAt(0) - 48\n\n    if (\n      result > 214748364 ||\n      (result === 214748364 && digit > (sign === 1 ? 7 : 8))\n    ) {\n      return sign === 1 ? INT_MAX : INT_MIN\n    }\n\n    result = result * 10 + digit\n    index += 1\n  }\n\n  return result * sign\n}`,
      },
      {
        id: 'atoi-example-walkthrough',
        title: '拿几个例子手推一次',
        summary:
          '例如字符串 `"   -42"`，先跳过空格，再读到负号，然后依次读取 `4` 和 `2`，结果就是 `-42`。再比如 `"4193 with words"`，数字阶段读到 `4193` 后，遇到空格停止，所以结果是 `4193`。',
        bullets: [
          '`"42"`：没有空格和符号，直接读数字，结果是 `42`。',
          '`"   -42"`：跳空格后读负号，再读数字，结果是 `-42`。',
          '`"4193 with words"`：读到 `4193` 后停止，后面字符忽略。',
          '`"words and 987"`：开头不是合法起始，直接返回 `0`。',
        ],
      },
      {
        id: 'atoi-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题代码不长，但边界非常密。只要规则顺序错一点，结果就会偏得很离谱。它特别适合训练你把“文字规则”稳定翻译成代码状态。 ',
        bullets: [
          '易错点 1：没有先跳过前导空格，导致很多合法输入直接失败。',
          '易错点 2：把符号写成可以在中途继续出现，规则就错了。',
          '易错点 3：先计算结果再判断溢出，边界会不稳。',
          '延伸方向：有效数字、基本计算器、表达式求值、有限状态自动机类题目。',
        ],
        callout:
          '如果第 7 题在训练你做数值过程控制，那第 8 题就是把这个能力进一步扩展到“字符串规则模拟”。很多中等题的难点，本质上都是规则翻译和状态管理。',
      },
    ],
  },
  {
    id: 'palindrome-number',
    label: '9. LeetCode 9. 回文数',
    difficulty: '简单',
    description:
      '这题表面很基础，真正训练的是你能不能把“数字对称”转成稳定的数值过程。重点不是字符串反转，而是理解如何只反转一半数字来完成判断。',
    outcome:
      '你能独立写出回文数的标准数值解法，理解为什么负数一定不是回文、为什么末尾为 0 的正数要特殊处理，以及为什么只反转一半就够了。',
    sections: [
      {
        id: 'pn-problem-summary',
        title: '题目在问什么',
        summary:
          '给你一个整数 `x`，判断它是否是回文数。所谓回文数，就是从左往右读和从右往左读都一样，比如 `121`、`1221`。',
        bullets: [
          '题目要求返回布尔值，不需要真的把数字反转出来返回。',
          '负数一定不是回文，因为负号只会出现在左边。',
          '像 `10` 这种末尾是 `0` 的正数也不是回文，因为反过来会变成 `01`，这不是同一个数字。',
          '这题关键不在“会不会反转”，而在于能不能减少不必要的处理。',
        ],
      },
      {
        id: 'pn-direct-idea',
        title: '最直观的思路是什么',
        summary:
          '最容易想到的是把数字转成字符串，再判断字符串是否对称。这当然能做，但题目更想训练你用数值本身来完成判断。因为数字题真正值得练的是拆位和重组。 ',
        bullets: [
          '字符串法在工程里未必有问题，但算法训练价值有限。',
          '数值法能复用到很多“逐位处理数字”的题里。',
          '这题最值钱的点，是理解为什么不需要把整个数字都反转。 ',
        ],
      },
      {
        id: 'pn-core-idea',
        title: '核心思路：只反转后一半数字',
        summary:
          '如果一个数字是回文，那么前半部分和后半部分倒过来应该相同。所以没有必要把整个数字都反转，只需要不断取末位，构造出“反转后的后半段”，当它大于等于前半段时就可以停止比较。 ',
        bullets: [
          '每次取末位：`digit = x % 10`。',
          '把末位拼进反转结果：`reverted = reverted * 10 + digit`。',
          '原数字去掉末位：`x = Math.trunc(x / 10)`。',
          '当 `x <= reverted` 时，说明已经处理到一半，可以开始比较。',
        ],
        callout:
          '这题的关键优化不是“更快地反转数字”，而是意识到回文判断只需要两半对照。只处理一半，代码会更稳，也能避开完整反转可能带来的溢出问题。',
      },
      {
        id: 'pn-odd-even-case',
        title: '为什么奇数位和偶数位都能统一处理',
        summary:
          '比如 `1221`，处理到一半时会得到 `12` 和 `12`；而 `121` 处理到一半时会得到 `1` 和 `12`。奇数位中间那个 `2` 不影响回文性，所以只要把反转结果除以 `10` 再比较即可。 ',
        bullets: [
          '偶数位回文：比较 `x === reverted`。',
          '奇数位回文：比较 `x === Math.trunc(reverted / 10)`。',
          '中间那一位不需要参与比较，因为它天然左右对称。 ',
        ],
      },
      {
        id: 'pn-optimal-solution',
        title: '标准解法：数值拆位 + 半边反转',
        summary:
          '稳定写法是先处理明显不可能是回文的情况，再循环反转后半部分，最后统一比较奇偶位结果。这个写法时间和空间都很干净。 ',
        bullets: [
          '时间复杂度是 `O(log10 n)`，因为每轮都会去掉一位数字。',
          '空间复杂度是 `O(1)`。',
          '先判断 `x < 0` 或者 `x % 10 === 0 && x !== 0`，可以提前剪掉很多无效情况。',
        ],
        code: `function isPalindrome(x: number): boolean {\n  if (x < 0 || (x % 10 === 0 && x !== 0)) {\n    return false\n  }\n\n  let value = x\n  let revertedHalf = 0\n\n  while (value > revertedHalf) {\n    revertedHalf = revertedHalf * 10 + (value % 10)\n    value = Math.trunc(value / 10)\n  }\n\n  return value === revertedHalf || value === Math.trunc(revertedHalf / 10)\n}`,
      },
      {
        id: 'pn-example-walkthrough',
        title: '拿两个例子手推一次',
        summary:
          '例如 `121`。第一轮后 `value = 12`，`revertedHalf = 1`；第二轮后 `value = 1`，`revertedHalf = 12`，这时停止。因为 `value === Math.trunc(revertedHalf / 10)`，所以它是回文。再看 `10`，因为末尾是 `0` 且本身不是 `0`，可以直接判定不是回文。 ',
        bullets: [
          '`121`：后半段反转成 `12`，去掉中间位后能和前半段对上。',
          '`1221`：最后会得到 `12` 和 `12`，直接相等。',
          '`10`：提前命中“末尾为 0”规则，直接返回 `false`。',
        ],
      },
      {
        id: 'pn-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题代码不长，但特别适合训练“提前剪枝”和“只做必要计算”的意识。很多简单题真正拉开差距的地方，恰恰就在这里。 ',
        bullets: [
          '易错点 1：把负数也拿去做反转比较，浪费过程还容易写乱。',
          '易错点 2：完整反转整个数字，虽然能做，但没有学到这题真正的优化思路。',
          '易错点 3：奇数位回文比较时，忘了去掉中间那一位。',
          '延伸方向：整数反转、字符串回文判断、最长回文子串、双指针和中心扩展类题目。',
        ],
        callout:
          '如果第 7 题在训练你如何稳稳地做整数反转，那第 9 题就是进一步训练你：不是所有过程都要做到底，很多时候只做“刚好够判断”的那一半，才是更高质量的解法。',
      },
    ],
  },
  {
    id: 'regular-expression-matching',
    label: '10. LeetCode 10. 正则表达式匹配',
    difficulty: '困难',
    description:
      '这题是动态规划里的代表性难题。重点不是去背模板，而是把“字符串前缀是否匹配”这个问题稳定地定义成状态，再把 `.` 和 `*` 的语义翻译成状态转移。',
    outcome:
      '你能理解为什么这题不适合贪心或普通双指针，能独立写出二维动态规划解法，并知道 `*` 为什么要同时考虑“匹配零次”和“匹配多次”两种情况。',
    sections: [
      {
        id: 'rem-problem-summary',
        title: '题目在问什么',
        summary:
          '给你一个字符串 `s` 和模式串 `p`，其中 `.` 可以匹配任意单个字符，`*` 表示它前面的那个字符可以重复零次或多次。要求判断整个字符串 `s` 是否能被整个模式 `p` 完整匹配。',
        bullets: [
          '不是“部分匹配”，而是整个字符串都要被整个模式吃完。',
          '`.` 只代表任意一个字符，不是任意多个字符。',
          '`*` 只作用于它前面的那个字符，不能单独存在。',
          '这题难点不在语法，而在于一个 `*` 会让匹配路径分叉。',
        ],
      },
      {
        id: 'rem-why-not-greedy',
        title: '为什么这题不能靠直觉贪心解决',
        summary:
          '很多人第一反应会想用双指针一路往前匹配，遇到 `*` 就尽量多吃字符。但这题的问题在于：`*` 有时候应该多吃，有时候应该少吃，甚至应该一个都不吃。只靠局部贪心没有办法保证全局正确。',
        bullets: [
          '例如 `s = "aab"`，`p = "c*a*b"`，前面的 `c*` 实际上应该匹配零次。',
          '同一个 `*` 在不同上下文下，最优决策完全不同。',
          '只要一个位置需要“回头重试”，就说明更适合用 DP 而不是单一路径贪心。',
        ],
        callout:
          '这题真正训练的是：当一个字符的处理结果依赖“前面一大段是否匹配”时，就要主动把问题改写成状态，而不是硬拧双指针。',
      },
      {
        id: 'rem-state-definition',
        title: '先把状态定义清楚：前缀匹配',
        summary:
          '最稳的定义方式是：`dp[i][j]` 表示 `s` 的前 `i` 个字符，是否能被 `p` 的前 `j` 个字符匹配。这样一来，问题就被压成了前缀和前缀之间的关系。',
        bullets: [
          '`dp[0][0] = true`，空串和空模式天然匹配。',
          '`i` 和 `j` 都表示“前几个字符”，所以访问真实字符时要写成 `s[i - 1]`、`p[j - 1]`。',
          '最终答案就是 `dp[s.length][p.length]`。',
          '把“整串匹配”变成“前缀匹配”，是这题最关键的一步。',
        ],
      },
      {
        id: 'rem-transition',
        title: '状态转移怎么写：普通字符、`.`、`*` 分开看',
        summary:
          '如果 `p[j - 1]` 是普通字符或 `.`，那只要当前字符能对上，就看前一个状态 `dp[i - 1][j - 1]`。如果 `p[j - 1]` 是 `*`，就必须拆成两种情况：要么让它匹配零次，要么让它继续吞当前字符。',
        bullets: [
          '普通字符或 `.`：当前字符能匹配时，`dp[i][j] = dp[i - 1][j - 1]`。',
          '`*` 匹配零次：直接跳过“前一个字符 + *”，看 `dp[i][j - 2]`。',
          '`*` 匹配一次或多次：前一个模式字符必须能和当前字符匹配，然后看 `dp[i - 1][j]`。',
          '之所以看 `dp[i - 1][j]`，是因为模式不动，说明这个 `*` 还可以继续使用。',
        ],
      },
      {
        id: 'rem-init-and-boundary',
        title: '初始化和边界为什么特别容易错',
        summary:
          '空字符串和像 `a*`、`a*b*` 这种模式是可能匹配的，所以第一行初始化不能偷懒。只要模式当前位是 `*`，它就有机会把前一个字符整体消掉，从而继承 `dp[0][j - 2]`。',
        bullets: [
          '第一行只处理空字符串和模式的关系。',
          '当模式当前位是 `*` 时，可以写 `dp[0][j] = dp[0][j - 2]`。',
          '这一步漏掉，很多经典测试样例都会错。',
          '访问 `j - 2` 时要保证 `j >= 2`。',
        ],
      },
      {
        id: 'rem-optimal-solution',
        title: '标准解法：二维动态规划',
        summary:
          '这题最稳的实现就是二维 DP。虽然空间不是最省，但最容易把语义讲清楚，也最适合初学者真正理解 `*` 的两种转移路径。',
        bullets: [
          '时间复杂度是 `O(mn)`，其中 `m` 是字符串长度，`n` 是模式长度。',
          '空间复杂度是 `O(mn)`。',
          '困难题里最重要的不是代码短，而是状态语义清楚、边界完整。',
        ],
        code: `function isMatch(s: string, p: string): boolean {\n  const m = s.length\n  const n = p.length\n  const dp = Array.from({ length: m + 1 }, () => Array<boolean>(n + 1).fill(false))\n\n  dp[0][0] = true\n\n  for (let j = 2; j <= n; j += 1) {\n    if (p[j - 1] === '*') {\n      dp[0][j] = dp[0][j - 2]\n    }\n  }\n\n  const matches = (i: number, j: number) => {\n    if (i === 0) {\n      return false\n    }\n\n    return p[j - 1] === '.' || s[i - 1] === p[j - 1]\n  }\n\n  for (let i = 1; i <= m; i += 1) {\n    for (let j = 1; j <= n; j += 1) {\n      if (p[j - 1] !== '*') {\n        if (matches(i, j)) {\n          dp[i][j] = dp[i - 1][j - 1]\n        }\n      } else {\n        dp[i][j] = dp[i][j - 2]\n\n        if (matches(i, j - 1)) {\n          dp[i][j] = dp[i][j] || dp[i - 1][j]\n        }\n      }\n    }\n  }\n\n  return dp[m][n]\n}`,
      },
      {
        id: 'rem-example-walkthrough',
        title: '拿经典例子手推一次',
        summary:
          '例如 `s = "aab"`，`p = "c*a*b"`。先看 `c*`，它可以匹配零次，所以模式还能继续往后；再看 `a*`，它可以把两个 `a` 都吃掉；最后 `b` 和字符串最后一个 `b` 对上，所以整体匹配成功。',
        bullets: [
          '`c*` 不一定真的要消费字符，它也可能只是“空过”。',
          '`a*` 在这里选择匹配两次，因为字符串前两位都是 `a`。',
          '最后剩下的 `b` 对 `b`，状态收束到成功。',
          '这正好体现了 `*` 为什么必须同时保留“零次”和“多次”两条路径。',
        ],
      },
      {
        id: 'rem-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是很多人第一次真正体会“状态定义比代码更重要”的题。只要状态没定义准，转移写得再热闹也没用。',
        bullets: [
          '易错点 1：把 `*` 理解成“任意多个任意字符”，那其实是把它误写成 `.*` 了。',
          '易错点 2：只处理 `*` 的一种情况，漏掉“匹配零次”或“匹配多次”。',
          '易错点 3：第一行初始化没写，导致空串相关测试全错。',
          '延伸方向：通配符匹配、编辑距离、最长公共子序列、其他双串 DP 题目。',
        ],
        callout:
          '如果前面的题在训练哈希、链表、滑动窗口和数值过程控制，那第 10 题就是一次明显的升级：你需要开始把问题抽象成状态图，而不是只在输入上直接做动作。',
      },
    ],
  },
  {
    id: 'container-with-most-water',
    label: '11. LeetCode 11. 盛最多水的容器',
    difficulty: '中等',
    description:
      '这题是双指针的代表题。重点不是记住“左右夹逼”四个字，而是理解为什么每一步只移动更短的那根板，才不会错过最优解。',
    outcome:
      '你能独立写出盛最多水的容器双指针解法，理解面积公式、剪枝逻辑，以及为什么这个题不能靠“保留更宽的距离”这种直觉来做。',
    sections: [
      {
        id: 'cwmw-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个数组 `height`，其中每个元素表示一根竖线的高度。任选两根线和 x 轴组成一个容器，问最多能装多少水。',
        bullets: [
          '容器的宽度由两个下标之间的距离决定。',
          '容器的高度不是取两边较高值，而是取两边较短值。',
          '面积公式是 `min(height[left], height[right]) * (right - left)`。',
          '题目返回的是最大面积，不是具体哪两根柱子。',
        ],
      },
      {
        id: 'cwmw-brute-force',
        title: '暴力解为什么不划算',
        summary:
          '最直接的做法是枚举所有两根柱子的组合，逐个计算面积后取最大值。这个思路当然正确，但会把所有配对都看一遍，复杂度太高。',
        bullets: [
          '双重循环枚举左边界和右边界。',
          '每组组合都算一次面积，再更新最大值。',
          '时间复杂度是 `O(n²)`，数组一长就明显不合适。',
          '真正需要优化的点，是如何利用“宽度变窄、高度可能变化”之间的关系做剪枝。',
        ],
        code: `function maxAreaBruteForce(height: number[]): number {\n  let answer = 0\n\n  for (let i = 0; i < height.length; i += 1) {\n    for (let j = i + 1; j < height.length; j += 1) {\n      const area = Math.min(height[i], height[j]) * (j - i)\n      answer = Math.max(answer, area)\n    }\n  }\n\n  return answer\n}`,
      },
      {
        id: 'cwmw-core-idea',
        title: '真正的关键：每次只移动更短的那一边',
        summary:
          '一开始把左右指针放在数组两端，此时宽度最大。接下来如果想得到更大的面积，虽然宽度一定会变小，但只有把短板换掉，容器高度才有机会变高。所以每一步都应该移动更短的那根柱子。',
        bullets: [
          '当前面积由短板决定，长板再高也装不进更多水。',
          '如果移动长板，宽度变小了，但短板没变，面积不可能变大。',
          '只有移动短板，才有机会遇到更高的柱子，从而弥补宽度损失。',
          '这就是这题最核心的剪枝逻辑，也是双指针成立的原因。',
        ],
        callout:
          '很多人记住了“移动短板”，但没有真正想明白原因。你要记住的不是结论，而是：当前面积上限被短板卡住了，想突破上限，就必须换掉短板。',
      },
      {
        id: 'cwmw-why-move-shorter',
        title: '为什么移动长板一定不划算',
        summary:
          '假设当前左右高度分别是 `2` 和 `8`，宽度是 `10`，那面积最多就是 `2 * 10 = 20`。如果你移动右边的长板，宽度只会更小，而左边的短板还是 `2`，所以新面积上限一定小于等于 `2 * 9`，不可能超过当前状态。',
        bullets: [
          '长板不是当前瓶颈，移动它不会提升有效高度。',
          '宽度一旦减小，而短板没提升，面积只会更差或持平。',
          '这个推理不是某个例子的巧合，而是对所有状态都成立。',
          '因此双指针每轮只需要做一个动作：移动更短的一侧。',
        ],
      },
      {
        id: 'cwmw-optimal-solution',
        title: '标准解法：双指针左右夹逼',
        summary:
          '用两个指针分别指向数组首尾。每轮先计算当前面积，再根据左右高度比较结果，移动较短的一边，直到两个指针相遇。',
        bullets: [
          '时间复杂度是 `O(n)`，因为每个指针都只会单向移动一次。',
          '空间复杂度是 `O(1)`。',
          '写法的关键顺序是：先算面积，再决定移动谁。',
        ],
        code: `function maxArea(height: number[]): number {\n  let left = 0\n  let right = height.length - 1\n  let answer = 0\n\n  while (left < right) {\n    const width = right - left\n    const area = Math.min(height[left], height[right]) * width\n\n    answer = Math.max(answer, area)\n\n    if (height[left] < height[right]) {\n      left += 1\n    } else {\n      right -= 1\n    }\n  }\n\n  return answer\n}`,
      },
      {
        id: 'cwmw-example-walkthrough',
        title: '拿经典例子手推一次',
        summary:
          '例如 `height = [1,8,6,2,5,4,8,3,7]`。一开始左右是 `1` 和 `7`，宽度是 8，面积是 8。因为左边更短，所以移动左指针。之后左边来到 `8`，右边还是 `7`，面积变成 `7 * 7 = 49`，这就是最大值。',
        bullets: [
          '第一轮：`left = 0`，`right = 8`，面积是 `1 * 8 = 8`。',
          '因为左边高度更短，所以左指针右移。',
          '第二轮：左右高度是 `8` 和 `7`，宽度是 7，面积是 `49`。',
          '后面继续移动虽然还能尝试，但不会超过 49。',
        ],
      },
      {
        id: 'cwmw-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是双指针里非常值得反复咀嚼的一题。真正学到位之后，后面的接雨水、三数之和、移动零、删除有序数组重复项都会更容易建立判断。',
        bullets: [
          '易错点 1：把面积高度写成 `Math.max(...)`，这是最常见的公式错误。',
          '易错点 2：每轮移动更高的一边，结果会错过最优解。',
          '易错点 3：先移动指针再算面积，导致当前状态被跳过。',
          '延伸方向：接雨水、三数之和、颜色分类、移除元素、双指针分区类题目。',
        ],
        callout:
          '如果前面的题在训练哈希、链表、滑动窗口、二分和动态规划，那第 11 题就是在训练另一种非常高频的能力：通过不变量和剪枝逻辑，把暴力枚举压成线性扫描。',
      },
    ],
  },
  {
    id: 'integer-to-roman',
    label: '12. LeetCode 12. 整数转罗马数字',
    difficulty: '中等',
    description:
      '这题是贪心的标准入门题。重点不是死记罗马数字表，而是理解为什么每次优先匹配当前能使用的最大数值，就一定能得到正确答案。',
    outcome:
      '你能独立写出整数转罗马数字的贪心解法，理解特殊组合如 `IV`、`IX`、`XL` 的作用，并知道这类题为什么更适合用规则表驱动。 ',
    sections: [
      {
        id: 'itr-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数 `num`，把它转换成对应的罗马数字字符串。题目保证输入范围在 1 到 3999 之间。',
        bullets: [
          '罗马数字不是单纯的逐位替换，它有减法规则。',
          '例如 4 不是 `IIII`，而是 `IV`；9 不是 `VIIII`，而是 `IX`。',
          '类似地，40 是 `XL`，90 是 `XC`，400 是 `CD`，900 是 `CM`。',
          '这题返回的是转换后的字符串，不需要再做逆向解析。',
        ],
      },
      {
        id: 'itr-why-not-simulate-digit-by-digit',
        title: '为什么不要硬拆每一位手写分支',
        summary:
          '当然可以把千位、百位、十位、个位分别拆出来，然后每一位都写规则。但那样代码会比较散，而且一旦规则增减，维护起来不直观。更稳的思路是把所有关键数值和符号整理成一张有序表，再按表去消耗数字。',
        bullets: [
          '按位分类能做，但会写出很多重复判断。',
          '规则表驱动更适合这类固定映射问题。',
          '把减法规则一起放进表里，逻辑会自然很多。',
          '很多映射转换题都能用这种“表 + 贪心”方式写得更干净。',
        ],
      },
      {
        id: 'itr-core-idea',
        title: '核心思路：每次优先拿当前能匹配的最大罗马值',
        summary:
          '从最大的罗马数值开始看，如果当前数字还大于等于它，就把对应符号加入结果，并从原数字中减掉这个值。接着继续重复这个过程，直到数字减到 0。因为罗马数字本身就是按这种高位优先、特殊组合优先的规则组织的，所以贪心成立。',
        bullets: [
          '先准备一张从大到小排序的数值表。',
          '表里既包含 `1000 -> M`，也包含 `900 -> CM` 这类特殊组合。',
          '每次优先匹配最大的可用值，能保证结果最短且符合规则。',
          '数字被逐步消耗完，结果字符串也就逐步构建完成。',
        ],
        callout:
          '这题里的贪心不是“凭感觉选大的”，而是因为规则系统本身支持这种选择。把 `900`、`400`、`90`、`40`、`9`、`4` 这些特殊值放进表以后，局部最优就会自然导向全局正确。',
      },
      {
        id: 'itr-roman-table',
        title: '为什么特殊组合一定要直接写进表',
        summary:
          '如果你只放 `1, 5, 10, 50, 100, 500, 1000` 这些基础值，那处理 4、9、40 之类的数字时就会出错，或者不得不在代码里额外加很多补丁分支。直接把特殊组合纳入表，贪心逻辑就会统一起来。',
        bullets: [
          '`4 -> IV` 和 `9 -> IX` 是最基础的减法规则。',
          '`40 -> XL`、`90 -> XC`、`400 -> CD`、`900 -> CM` 同理。',
          '把这些规则都收进表后，循环里就不需要特殊判断。',
          '这类做法本质上是在用数据结构替代条件分支。',
        ],
      },
      {
        id: 'itr-optimal-solution',
        title: '标准解法：有序规则表 + 贪心消耗',
        summary:
          '准备一组从大到小排列的 `[value, symbol]`。从头遍历这张表，只要当前数字还不小于 `value`，就持续追加对应的 `symbol`，同时减掉 `value`。',
        bullets: [
          '时间复杂度在题目范围内可以视为 `O(1)`，因为规则表长度固定。',
          '空间复杂度也是 `O(1)`，不算结果字符串本身。',
          '代码写出来会非常稳定，扩展性也比手写分位分支更好。',
        ],
        code: `function intToRoman(num: number): string {\n  const romanTable: Array<[number, string]> = [\n    [1000, 'M'],\n    [900, 'CM'],\n    [500, 'D'],\n    [400, 'CD'],\n    [100, 'C'],\n    [90, 'XC'],\n    [50, 'L'],\n    [40, 'XL'],\n    [10, 'X'],\n    [9, 'IX'],\n    [5, 'V'],\n    [4, 'IV'],\n    [1, 'I'],\n  ]\n\n  let value = num\n  let answer = ''\n\n  for (const [unit, symbol] of romanTable) {\n    while (value >= unit) {\n      answer += symbol\n      value -= unit\n    }\n  }\n\n  return answer\n}`,
      },
      {
        id: 'itr-example-walkthrough',
        title: '拿一个例子手推一次',
        summary:
          '例如 `num = 1994`。先匹配 `1000 -> M`，剩下 994；接着匹配 `900 -> CM`，剩下 94；再匹配 `90 -> XC`，剩下 4；最后匹配 `4 -> IV`。最终结果就是 `MCMXCIV`。',
        bullets: [
          '1994 先减去 1000，得到 `M`。',
          '994 再减去 900，得到 `CM`。',
          '94 再减去 90，得到 `XC`。',
          '4 最后直接匹配 `IV`，而不是写成 `IIII`。',
        ],
      },
      {
        id: 'itr-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题代码不长，但很适合训练你把固定规则整理成数据结构，再用统一逻辑去跑。很多面试题和业务规则转换题都能借这个思路写得更清晰。',
        bullets: [
          '易错点 1：漏掉 `4`、`9`、`40`、`90`、`400`、`900` 这些特殊组合。',
          '易错点 2：规则表没有按从大到小排序，导致结果错误。',
          '易错点 3：把题目写成按位硬编码，虽然能过，但代码不够统一。',
          '延伸方向：罗马数字转整数、数字字符串格式化、货币单位转换、规则表驱动的格式化类题目。',
        ],
        callout:
          '如果第 11 题在训练你如何用双指针和剪枝缩掉搜索空间，那第 12 题就在训练另一种常见能力：当规则是固定的，优先考虑把规则抽成表，再让算法围着表跑，而不是把所有判断散落在代码里。',
      },
    ],
  },
  {
    id: 'roman-to-integer',
    label: '13. LeetCode 13. 罗马数字转整数',
    difficulty: '简单',
    description:
      '这题和上一题正好相反，但思维重点不一样。关键不是把每个字符逐个相加，而是理解罗马数字里的减法规则什么时候发生，以及如何稳定判断“当前字符该加还是该减”。',
    outcome:
      '你能独立写出罗马数字转整数的标准解法，理解为什么 `IV`、`IX` 这类组合要做减法处理，并知道这类题最稳的写法是规则映射加顺序扫描。',
    sections: [
      {
        id: 'rti-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个罗马数字字符串 `s`，把它转换成对应的整数。题目保证输入一定是合法的罗马数字表示。',
        bullets: [
          '普通情况是把每个罗马字符映射成数值后累加。',
          '特殊情况是减法规则，例如 `IV = 4`、`IX = 9`、`XL = 40`。',
          '题目输入合法，所以不需要额外校验各种非法组合。',
          '真正要解决的问题是：什么时候当前字符应该减，什么时候应该加。',
        ],
      },
      {
        id: 'rti-direct-idea',
        title: '最直观的思路是什么',
        summary:
          '最先能想到的做法，是准备一张字符到数值的映射表，然后从左到右扫描字符串，逐个把值加起来。这个思路没错，但如果只会“看到一个加一个”，就会在 `IV`、`CM` 这类减法组合上出错。',
        bullets: [
          '单字符映射本身很简单，比如 `I -> 1`，`V -> 5`，`X -> 10`。',
          '难点不在映射表，而在罗马数字的相邻关系。',
          '只要前小后大，前面的字符就不应该加，而应该减。',
          '所以核心其实是顺序扫描里的相邻比较。 ',
        ],
      },
      {
        id: 'rti-core-idea',
        title: '核心思路：看当前值和下一个值的关系',
        summary:
          '如果当前字符对应的数值小于下一个字符，那它就属于减法组合的一部分，应该从结果里减掉；否则就直接加上。比如 `IV` 里 `I = 1` 小于后面的 `V = 5`，所以 `I` 要减去。到了最后一个字符，或者当前值不小于下一个值时，就正常累加。',
        bullets: [
          '当前值小于后一个值：做减法。',
          '当前值大于等于后一个值：做加法。',
          '本质上是在用局部顺序关系判断当前字符的角色。',
          '只要规则判断稳定，整题代码会非常短。 ',
        ],
        callout:
          '这题真正值得记住的不是“相邻比较”四个字，而是：有些字符的语义不是独立决定的，而是由它和后一个字符的组合关系决定。很多字符串和编码题都类似。 ',
      },
      {
        id: 'rti-why-subtract',
        title: '为什么前小后大会触发减法',
        summary:
          '罗马数字默认是从大到小排列并累加的，比如 `VIII = 5 + 1 + 1 + 1`。但当小值放在大值前面时，表示的是“从大值里减去这个小值”，所以 `IV` 不是 `1 + 5`，而是 `5 - 1`。理解这条规则后，代码里的加减判断就顺理成章了。',
        bullets: [
          '`IV` 表示 4，`IX` 表示 9。',
          '`XL` 表示 40，`XC` 表示 90。',
          '`CD` 表示 400，`CM` 表示 900。',
          '这些减法组合本质上都满足“前一个值小于后一个值”。',
        ],
      },
      {
        id: 'rti-optimal-solution',
        title: '标准解法：映射表 + 一次遍历',
        summary:
          '先准备一个 `Record<string, number>`，然后从左到右遍历字符串。每次取当前值与下一个值比较，小于就减，否则就加。整题只需要一次遍历就能完成。',
        bullets: [
          '时间复杂度是 `O(n)`，其中 `n` 是字符串长度。',
          '空间复杂度是 `O(1)`，映射表大小固定。',
          '这种题最怕把规则判断写散，集中在一个比较条件里最稳。 ',
        ],
        code: `function romanToInt(s: string): number {\n  const valueMap: Record<string, number> = {\n    I: 1,\n    V: 5,\n    X: 10,\n    L: 50,\n    C: 100,\n    D: 500,\n    M: 1000,\n  }\n\n  let answer = 0\n\n  for (let i = 0; i < s.length; i += 1) {\n    const current = valueMap[s[i]]\n    const next = valueMap[s[i + 1]] ?? 0\n\n    if (current < next) {\n      answer -= current\n    } else {\n      answer += current\n    }\n  }\n\n  return answer\n}`,
      },
      {
        id: 'rti-example-walkthrough',
        title: '拿一个例子手推一次',
        summary:
          '例如 `s = "MCMXCIV"`。先看 `M = 1000`，后面是 `C = 100`，当前更大，所以加上 1000；接着 `C = 100`，后面是 `M = 1000`，当前更小，所以减去 100；继续按这个规则扫描，最后结果就是 1994。',
        bullets: [
          '`M` 后面不是更大的值，所以先加 1000。',
          '`C` 后面遇到 `M`，说明这里是 `CM = 900` 的一部分，所以减 100。',
          '`X` 后面遇到 `C`，说明这里是 `XC = 90` 的一部分，所以减 10。',
          '`I` 后面遇到 `V`，说明这里是 `IV = 4` 的一部分，所以减 1。',
        ],
      },
      {
        id: 'rti-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题表面简单，但很适合训练“规则扫描”的稳定写法。真正拉开差距的地方，不在于能不能做出来，而在于能不能把判断写得短、准、不会漏边界。',
        bullets: [
          '易错点 1：只会把所有字符累加，忽略了减法规则。',
          '易错点 2：访问下一个字符时没有处理最后一位，导致越界或 `undefined` 问题。',
          '易错点 3：把减法规则单独硬编码成多个 if，代码可维护性会变差。',
          '延伸方向：整数转罗马数字、字符串解码、表达式求值、各种规则映射扫描题。',
        ],
        callout:
          '如果第 12 题在训练你用规则表做贪心构造，那第 13 题就在训练你做反向解析：同样是一套规则系统，正向和逆向处理的核心判断完全不同。把这对题一起吃透，比单独记答案更有价值。',
      },
    ],
  },
  {
    id: 'longest-common-prefix',
    label: '14. LeetCode 14. 最长公共前缀',
    difficulty: '简单',
    description:
      '这题是字符串题里的经典入门题。重点不是把代码写出来，而是理解“多个字符串的共同部分会随着比较逐步收缩”这个判断过程。',
    outcome:
      '你能独立写出最长公共前缀的标准解法，理解为什么公共前缀只会越来越短，并知道横向比较和排序比较这两类常见思路的取舍。',
    sections: [
      {
        id: 'lcp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串数组 `strs`，找出它们的最长公共前缀。如果不存在公共前缀，就返回空字符串 `""`。',
        bullets: [
          '公共前缀要求从每个字符串的开头开始连续相同。',
          '只要某个位置出现不一致，公共前缀就到此为止。',
          '结果可能是完整的某个字符串，也可能是空字符串。',
          '这题本质上是在找“多个字符串共同拥有的最左侧连续片段”。',
        ],
      },
      {
        id: 'lcp-observation',
        title: '先抓住一个关键观察',
        summary:
          '如果多个字符串有公共前缀，那么这个前缀一定不会比其中最短的字符串更长。而且随着你不断拿更多字符串去比较，这个前缀只会保持不变或变短，不可能突然变长。',
        bullets: [
          '公共前缀长度上限由最短字符串决定。',
          '比较的字符串越多，限制越强，所以前缀只会收缩。',
          '一旦公共前缀已经变成空字符串，就可以提前结束。',
          '这类“答案只会缩小”的问题，通常适合用逐步收敛的写法。',
        ],
        callout:
          '这题最有价值的思维不是字符串本身，而是“候选答案会随着比较越来越收敛”。这个模型在区间交集、公共集合、公共路径等题里都很常见。',
      },
      {
        id: 'lcp-brute-force-idea',
        title: '最直观的想法是什么',
        summary:
          '最直观的做法是先拿第一个字符串当基准，然后逐个字符去看其他字符串在同一位置是否都相同。只要有一个字符串在当前位置不同，就立刻停止。',
        bullets: [
          '外层枚举前缀位置，内层检查每个字符串在这个位置的字符。',
          '如果某个字符串长度不够，说明前缀也到头了。',
          '这个思路没有问题，本质也是在做逐位验证。',
          '但代码写起来容易出现下标和边界判断较多的情况。',
        ],
      },
      {
        id: 'lcp-horizontal-scan',
        title: '更稳的标准解法：横向比较，逐步收缩前缀',
        summary:
          '先把第一个字符串设为当前前缀 `prefix`。然后从第二个字符串开始，反复比较：只要当前字符串不是以 `prefix` 开头，就把 `prefix` 去掉最后一个字符，直到匹配为止。处理完所有字符串后，留下的就是答案。',
        bullets: [
          '初始前缀来自第一个字符串，后面只会缩短，不会变长。',
          '如果当前字符串不以 `prefix` 开头，就不断截短 `prefix`。',
          '一旦 `prefix` 变成空字符串，可以直接返回 `""`。',
          '这个写法顺着“前缀逐步收缩”的性质展开，代码通常最稳定。',
        ],
        callout:
          '这里的关键不是 `startsWith` 这个 API，而是“用当前候选答案去接受所有字符串的约束，候选答案不合法就收缩”。很多面试题都可以这样想。',
      },
      {
        id: 'lcp-optimal-solution',
        title: '标准代码：横向扫描',
        summary:
          '把第一个字符串当成当前公共前缀，然后依次和后面的字符串对齐比较。只要发现不匹配，就缩短前缀，直到能够匹配或者变成空串。',
        bullets: [
          '时间复杂度常写成 `O(S)`，`S` 表示所有字符总数，因为前缀总共只会被削减有限次。',
          '空间复杂度是 `O(1)`，不算结果字符串本身。',
          '这题代码量不大，但边界要写稳：空数组、空字符串、完全无公共前缀都要覆盖到。',
        ],
        code: `function longestCommonPrefix(strs: string[]): string {\n  if (strs.length === 0) {\n    return ''\n  }\n\n  let prefix = strs[0]\n\n  for (let i = 1; i < strs.length; i += 1) {\n    while (!strs[i].startsWith(prefix)) {\n      prefix = prefix.slice(0, prefix.length - 1)\n\n      if (prefix === '') {\n        return ''\n      }\n    }\n  }\n\n  return prefix\n}`,
      },
      {
        id: 'lcp-example-walkthrough',
        title: '拿一个例子手推一次',
        summary:
          '例如 `strs = ["flower", "flow", "flight"]`。一开始前缀是 `flower`。和 `flow` 比较后，前缀缩成 `flow`；再和 `flight` 比较时，继续缩成 `fl`，最终答案就是 `fl`。',
        bullets: [
          '初始：`prefix = "flower"`。',
          '比较 `flow`：缩短到 `flow` 才匹配。',
          '比较 `flight`：`flow` 不匹配，继续缩到 `flo`、`fl`，此时匹配。',
          '所有字符串处理完后，剩下的 `fl` 就是最长公共前缀。',
        ],
      },
      {
        id: 'lcp-sort-idea',
        title: '另一种常见思路：排序后只比较首尾',
        summary:
          '因为字符串排序后，字典序最小和最大的两个字符串差异最大，所以公共前缀一定由这两者决定。只要比较排序后的首尾字符串，从左到右找最长相同前缀即可。',
        bullets: [
          '这个思路很巧，但前提是你愿意为了比较而排序。',
          '排序后只用看首尾，不需要看中间所有字符串。',
          '但排序本身要 `O(n log n)`，所以在这题里不如横向扫描直接。',
          '不过它很适合拿来拓展思路，帮助你理解“最分散的两个样本决定公共部分上限”。',
        ],
      },
      {
        id: 'lcp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是字符串基础题，但很适合练“候选答案逐步收缩”的写法。学会后，很多公共模式匹配题都会更容易入手。',
        bullets: [
          '易错点 1：没有处理空数组，直接访问 `strs[0]`。',
          '易错点 2：只比较前两个字符串，忽略后续字符串会继续收缩前缀。',
          '易错点 3：把“公共前缀”误写成“公共子串”或“公共子序列”。',
          '延伸方向：最长公共子序列、最小覆盖子串、字符串分组、前缀树 Trie 相关题目。',
        ],
        callout:
          '如果前面的题分别在训练哈希、链表、窗口、二分、动态规划和双指针，那第 14 题就在补一类非常基础但高频的思路：拿一个候选答案不断接受约束，不合法就持续收缩，直到稳定为止。',
      },
    ],
  },
  {
    id: '3sum',
    label: '15. LeetCode 15. 三数之和',
    difficulty: '中等',
    description:
      '这题是排序加双指针的代表题。重点不是把三重循环改成两重循环，而是理解“固定一个数，再把剩余问题变成两数之和”，以及去重为什么必须在多个层次同时处理。',
    outcome:
      '你能独立写出三数之和的标准解法，理解排序、左右夹逼和结果去重的配合方式，并知道这类题为什么要先把输入变成有序结构再处理。',
    sections: [
      {
        id: 'ts-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数数组 `nums`，找出所有和为 0 且不重复的三元组 `[nums[i], nums[j], nums[k]]`。返回的结果中不能包含重复三元组。',
        bullets: [
          '返回的是三元组本身，不是下标。',
          '三元组内部元素顺序不重要，但结果集不能重复。',
          '题目要的是“所有解”，不是找到一个解就结束。',
          '“去重”是这题比两数之和更麻烦的关键点。',
        ],
      },
      {
        id: 'ts-brute-force',
        title: '暴力解为什么不合适',
        summary:
          '最直接的做法是三重循环，枚举所有三个位置的组合，再判断它们的和是否为 0。这个思路能做，但时间复杂度太高，而且还要额外处理重复结果。',
        bullets: [
          '三重循环的时间复杂度是 `O(n³)`。',
          '即使找到满足条件的三元组，还要想办法判重。',
          '数组一旦稍大，这种写法就会明显超时。',
          '真正需要优化的是：如何在固定一个数后，更快找到另外两个数。',
        ],
        code: `function threeSumBruteForce(nums: number[]): number[][] {\n  const answer: number[][] = []\n\n  for (let i = 0; i < nums.length; i += 1) {\n    for (let j = i + 1; j < nums.length; j += 1) {\n      for (let k = j + 1; k < nums.length; k += 1) {\n        if (nums[i] + nums[j] + nums[k] === 0) {\n          answer.push([nums[i], nums[j], nums[k]])\n        }\n      }\n    }\n  }\n\n  return answer\n}`,
      },
      {
        id: 'ts-core-transform',
        title: '真正的关键：固定一个数，把问题转成两数之和',
        summary:
          '如果先固定 `nums[i]`，那么剩下的问题就变成：在右侧区间里找两个数，使它们的和等于 `-nums[i]`。这样原来的三数问题就转成了一个更熟悉的“两数配对”问题。',
        bullets: [
          '先枚举第一个数 `nums[i]`。',
          '目标值随之变成 `target = -nums[i]`。',
          '在 `i` 右边的有序区间内，用双指针找和为 `target` 的两个数。',
          '这就是典型的“降一维”思路：固定一部分，简化剩余问题。',
        ],
        callout:
          '这题最值得记住的不是答案，而是这种变形方式。很多多数求和题都不是直接硬上，而是先固定一部分，再把问题降成更熟的子问题。',
      },
      {
        id: 'ts-why-sort-first',
        title: '为什么排序是整题的前提',
        summary:
          '如果数组无序，你很难稳定地做双指针，也很难优雅地去重。排序之后，和的变化具备单调性，重复元素也会自然聚在一起，这两点正好同时解决搜索和判重问题。',
        bullets: [
          '排序后，左右指针的移动方向才有明确意义。',
          '当前和太小就右移左指针，当前和太大就左移右指针。',
          '相同元素排在一起后，去重只需要跳过连续重复值。',
          '排序虽然有 `O(n log n)` 成本，但换来了后续更稳定的线性扫描。',
        ],
      },
      {
        id: 'ts-optimal-solution',
        title: '标准解法：排序 + 固定一位 + 双指针',
        summary:
          '先对数组排序。外层枚举第一个数 `nums[i]`，如果和前一个相同就跳过以避免重复。然后在右侧区间用左右指针寻找另外两个数：和为 0 就收集答案并同时跳过左右两边的重复值；和小于 0 就左指针右移；和大于 0 就右指针左移。',
        bullets: [
          '时间复杂度是 `O(n²)`，这是这题的标准级别。',
          '空间复杂度如果不算排序带来的额外开销，结果集之外可视作 `O(1)`。',
          '去重有两层：外层枚举 `i` 时要去重，内层找到答案后左右指针也要去重。',
        ],
        code: `function threeSum(nums: number[]): number[][] {\n  const sorted = [...nums].sort((a, b) => a - b)\n  const answer: number[][] = []\n\n  for (let i = 0; i < sorted.length - 2; i += 1) {\n    if (i > 0 && sorted[i] === sorted[i - 1]) {\n      continue\n    }\n\n    let left = i + 1\n    let right = sorted.length - 1\n\n    while (left < right) {\n      const sum = sorted[i] + sorted[left] + sorted[right]\n\n      if (sum === 0) {\n        answer.push([sorted[i], sorted[left], sorted[right]])\n\n        left += 1\n        right -= 1\n\n        while (left < right && sorted[left] === sorted[left - 1]) {\n          left += 1\n        }\n\n        while (left < right && sorted[right] === sorted[right + 1]) {\n          right -= 1\n        }\n      } else if (sum < 0) {\n        left += 1\n      } else {\n        right -= 1\n      }\n    }\n  }\n\n  return answer\n}`,
      },
      {
        id: 'ts-example-walkthrough',
        title: '拿经典例子手推一次',
        summary:
          '例如 `nums = [-1,0,1,2,-1,-4]`。排序后得到 `[-4,-1,-1,0,1,2]`。先固定 `-4`，右侧找不到两数和为 4；再固定第一个 `-1`，左右指针可以找到 `[-1,-1,2]` 和 `[-1,0,1]`；固定第二个 `-1` 时要跳过，因为它会产生重复结果。',
        bullets: [
          '排序后，重复值会挨在一起，方便跳过。',
          '固定第一个 `-1` 时，目标是另外两个数相加等于 1。',
          '找到一个解后，左右指针都要继续跳过重复值。',
          '外层第二个 `-1` 必须直接 `continue`，否则结果会重复。',
        ],
      },
      {
        id: 'ts-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是很多人第一次真正把排序、双指针和去重绑在一起写。只要这题写稳，四数之和、最接近的三数之和、去重组合类题目都会更容易上手。',
        bullets: [
          '易错点 1：只在结果集中判重，不在搜索过程中去重，导致复杂度和代码都变差。',
          '易错点 2：找到答案后只移动一个指针，导致死循环或重复结果。',
          '易错点 3：忘记外层固定值也要去重。',
          '延伸方向：最接近的三数之和、四数之和、两数之和 II、去重组合搜索类题目。',
        ],
        callout:
          '如果第 11 题在训练你理解双指针为什么能剪枝，那第 15 题就在训练你把双指针放进更复杂的结构里：先排序，再固定一位，再在剩余区间里做线性收缩，同时把去重嵌到流程本身。这个能力非常关键。',
      },
    ],
  },
  {
    id: '3sum-closest',
    label: '16. LeetCode 16. 最接近的三数之和',
    difficulty: '中等',
    description:
      '这题是上一题三数之和的顺延版本。重点不是继续死记双指针模板，而是理解当目标从“恰好等于 0”变成“尽量接近 target”之后，搜索和更新答案的逻辑是如何变化的。',
    outcome:
      '你能独立写出最接近的三数之和标准解法，理解为什么排序后仍然适合双指针，以及“当前最优答案”该在什么时机更新。 ',
    sections: [
      {
        id: 'tsc-problem-summary',
        title: '题目在问什么',
        summary:
          '给定整数数组 `nums` 和目标值 `target`，从数组中选出三个数，使它们的和最接近 `target`。返回这个最接近的三数之和。题目保证恰好存在一个答案。',
        bullets: [
          '这次不要求刚好等于某个值，而是要求“距离最小”。',
          '返回的是三数之和本身，不是三元组，也不是下标。',
          '可能根本不存在和恰好等于 `target` 的组合。',
          '关键在于：遍历过程中要持续维护“当前最接近”的答案。',
        ],
      },
      {
        id: 'tsc-brute-force',
        title: '暴力解为什么还是不合适',
        summary:
          '暴力方法仍然是三重循环，把所有三元组和都算一遍，然后比较它们和 `target` 的差距，取最小值。思路简单，但复杂度依旧是 `O(n³)`。',
        bullets: [
          '三重循环会把所有三元组都枚举出来。',
          '每次都要算 `Math.abs(sum - target)` 和当前最优差值比较。',
          '题目规模一旦上来，这个复杂度就不够用了。',
          '真正需要优化的是：如何利用排序和指针移动，让大量无效组合被跳过。',
        ],
        code: `function threeSumClosestBruteForce(nums: number[], target: number): number {\n  let best = nums[0] + nums[1] + nums[2]\n\n  for (let i = 0; i < nums.length; i += 1) {\n    for (let j = i + 1; j < nums.length; j += 1) {\n      for (let k = j + 1; k < nums.length; k += 1) {\n        const sum = nums[i] + nums[j] + nums[k]\n\n        if (Math.abs(sum - target) < Math.abs(best - target)) {\n          best = sum\n        }\n      }\n    }\n  }\n\n  return best\n}`,
      },
      {
        id: 'tsc-relationship-with-3sum',
        title: '它和三数之和是什么关系',
        summary:
          '这题和第 15 题骨架几乎一样，都是先固定一个数，再把剩余区间交给双指针。但目标不同了：第 15 题找到“等于 0”的所有解；第 16 题则是不断比较哪个和更接近 `target`，所以你不需要收集所有结果，只需要维护当前最优值。 ',
        bullets: [
          '外层仍然固定第一个数。',
          '内层仍然用左右指针在有序区间里夹逼。',
          '不同点在于：不再是“找到就收集”，而是“每次都尝试更新最优答案”。',
          '如果某次和刚好等于 `target`，就可以直接返回，因为已经不可能更近了。',
        ],
        callout:
          '这题特别适合你做一个能力迁移练习：同样是排序加双指针，问题目标一改，代码结构还能不能稳定迁移。这比单独会做一道题更重要。',
      },
      {
        id: 'tsc-why-sort-first',
        title: '为什么排序后仍然可以用双指针',
        summary:
          '排序之后，如果当前三数之和小于 `target`，就应该让总和变大，于是左指针右移；如果当前和大于 `target`，就应该让总和变小，于是右指针左移。这种单调性正是双指针成立的前提。 ',
        bullets: [
          '排序让“变大”和“变小”的方向可控。',
          '和太小时，移动左指针有机会增大总和。',
          '和太大时，移动右指针有机会减小总和。',
          '如果不排序，指针移动就不再有明确含义。',
        ],
      },
      {
        id: 'tsc-optimal-solution',
        title: '标准解法：排序 + 固定一位 + 双指针逼近',
        summary:
          '先排序，再把前三个数的和当作初始答案 `best`。外层枚举 `i`，内层用 `left` 和 `right` 形成两端夹逼。每次先算当前和 `sum`，如果它比 `best` 更接近 `target`，就更新 `best`。然后根据 `sum` 和 `target` 的大小关系移动指针。 ',
        bullets: [
          '时间复杂度是 `O(n²)`。 ',
          '空间复杂度如果不算排序额外开销，可视作 `O(1)`。 ',
          '先更新答案，再移动指针，这个顺序最稳。 ',
        ],
        code: `function threeSumClosest(nums: number[], target: number): number {\n  const sorted = [...nums].sort((a, b) => a - b)\n  let best = sorted[0] + sorted[1] + sorted[2]\n\n  for (let i = 0; i < sorted.length - 2; i += 1) {\n    let left = i + 1\n    let right = sorted.length - 1\n\n    while (left < right) {\n      const sum = sorted[i] + sorted[left] + sorted[right]\n\n      if (Math.abs(sum - target) < Math.abs(best - target)) {\n        best = sum\n      }\n\n      if (sum === target) {\n        return sum\n      }\n\n      if (sum < target) {\n        left += 1\n      } else {\n        right -= 1\n      }\n    }\n  }\n\n  return best\n}`,
      },
      {
        id: 'tsc-example-walkthrough',
        title: '拿经典例子手推一次',
        summary:
          '例如 `nums = [-1,2,1,-4]`，`target = 1`。排序后得到 `[-4,-1,1,2]`。初始答案可以设成前三个数之和 `-4`。固定 `-4` 时，双指针先得到 `-3`，再得到 `-1`；固定 `-1` 时，三数和正好是 `2`。此时和 `target = 1` 的差距是 1，已经是当前最优，最终答案就是 2。 ',
        bullets: [
          '排序后初始 `best = -4 + -1 + 1 = -4`。',
          '固定 `-4`：先算出 `-3`，比 `-4` 更接近 1，更新。 ',
          '继续移动得到 `-1`，再次更接近，继续更新。 ',
          '固定 `-1` 时得到 `2`，它和目标差 1，成为最终最优答案。 ',
        ],
      },
      {
        id: 'tsc-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是“三数之和”之后非常值得立刻接着做的一题，因为它能逼你把同一套工具迁移到不同目标上。迁移能力比单独记住某道题更重要。 ',
        bullets: [
          '易错点 1：没有先给 `best` 一个合法初值，导致后续比较差值时逻辑混乱。 ',
          '易错点 2：只在找到更优答案时才移动指针，忘了指针移动取决于 sum 和 target 的大小关系。 ',
          '易错点 3：更新答案时比较的是原值大小，而不是和 `target` 的距离。 ',
          '延伸方向：四数之和、最接近的 K 数之和、最小绝对差组合、二分与双指针混合优化题。 ',
        ],
        callout:
          '如果第 15 题教你的是“找到所有满足条件的组合”，那第 16 题就在训练另一种常见目标：不求完全匹配，而是在搜索过程中持续维护一个最优近似答案。很多工程优化和搜索问题都更接近这种模式。 ',
      },
    ],
  },
  {
    id: 'letter-combinations-of-a-phone-number',
    label: '17. LeetCode 17. 电话号码的字母组合',
    difficulty: '中等',
    description:
      '这题是回溯的标准入门题。重点不是把递归写出来，而是理解“每一位都有若干选择，所有结果就是一棵选择树”的建模方式。',
    outcome:
      '你能独立写出电话号码字母组合的回溯解法，理解路径、选择列表和递归终止条件，并知道这类题为什么本质上是在枚举一棵多叉树。 ',
    sections: [
      {
        id: 'lcpn-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个仅包含数字 `2-9` 的字符串 `digits`，返回它能表示的所有字母组合。数字和字母的映射与手机按键一致，比如 `2 -> abc`，`3 -> def`。',
        bullets: [
          '每个数字都对应一个字母集合。',
          '结果要返回所有可能组合，不是只返回个数。',
          '输入为空字符串时，结果应为空数组。 ',
          '这题本质上是在做多层选择的全排列式枚举。 ',
        ],
      },
      {
        id: 'lcpn-why-not-hardcode',
        title: '为什么不能靠手写拼接分支',
        summary:
          '如果只看一两个数字，你可能会想直接双重循环、三重循环去拼字符串。但输入长度是不固定的，手写分支没有扩展性。更自然的方式是把“当前来到第几位、这一位有哪些选择”抽象成递归过程。 ',
        bullets: [
          '位数不固定，循环层数也不能固定写死。',
          '每一位的处理逻辑完全相同，适合递归统一表达。 ',
          '只要把映射表准备好，递归每层只做“选一个字符，继续下一位”。 ',
          '这就是典型的回溯/DFS 模型。 ',
        ],
      },
      {
        id: 'lcpn-core-model',
        title: '真正的关键：把问题看成一棵选择树',
        summary:
          '假设 `digits = "23"`，第一位可以选 `a/b/c`，第二位可以选 `d/e/f`。这意味着从根节点往下，每一层代表一个数字位，每条边代表当前位选择了哪个字母，走到叶子节点时就得到一个完整组合。 ',
        bullets: [
          '树的层数等于 `digits` 的长度。 ',
          '每层的分支数由当前数字映射到的字母个数决定。 ',
          '从根走到叶子的整条路径，就是一个答案字符串。 ',
          '回溯就是在深度优先遍历这棵树。 ',
        ],
        callout:
          '回溯最难的从来不是代码，而是建模。只要你能把题目翻译成“路径 + 选择 + 结束条件”，大多数基础回溯题都会清晰很多。 ',
      },
      {
        id: 'lcpn-path-choice-end',
        title: '回溯三件套：路径、选择列表、结束条件',
        summary:
          '这题的路径是“当前已经拼好的字符串”；选择列表是“当前数字可选的字母”；结束条件是“路径长度已经等于 digits 的长度”。一旦走到结束条件，就把当前路径加入答案。 ',
        bullets: [
          '路径：`path`，表示当前已经选了哪些字母。 ',
          '选择：当前数字映射出来的字母集合。 ',
          '结束条件：处理完所有数字位。 ',
          '撤销选择：递归返回后，回到上一个状态，尝试下一个字母。 ',
        ],
      },
      {
        id: 'lcpn-optimal-solution',
        title: '标准解法：映射表 + 回溯 DFS',
        summary:
          '先准备一个数字到字母的映射表。然后写一个 `backtrack(index, path)`，表示当前处理到第 `index` 位，已经拼好的路径是 `path`。如果 `index` 到了字符串末尾，就把 `path` 收进结果；否则遍历当前位对应的所有字母，逐个递归进入下一层。 ',
        bullets: [
          '时间复杂度和结果数量同级，通常写成 `O(3^m * 4^n)`，其中 `m/n` 分别表示映射到 3 个字母和 4 个字母的数字个数。 ',
          '空间复杂度主要来自递归深度 `O(k)`，`k` 是 `digits` 长度。 ',
          '这题的代码短，但非常适合用来建立对回溯模板的直觉。 ',
        ],
        code: `function letterCombinations(digits: string): string[] {\n  if (digits.length === 0) {\n    return []\n  }\n\n  const digitMap: Record<string, string> = {\n    '2': 'abc',\n    '3': 'def',\n    '4': 'ghi',\n    '5': 'jkl',\n    '6': 'mno',\n    '7': 'pqrs',\n    '8': 'tuv',\n    '9': 'wxyz',\n  }\n\n  const answer: string[] = []\n\n  const backtrack = (index: number, path: string) => {\n    if (index === digits.length) {\n      answer.push(path)\n      return\n    }\n\n    const letters = digitMap[digits[index]]\n\n    for (const letter of letters) {\n      backtrack(index + 1, path + letter)\n    }\n  }\n\n  backtrack(0, '')\n  return answer\n}`,
      },
      {
        id: 'lcpn-example-walkthrough',
        title: '拿一个例子手推一次',
        summary:
          '例如 `digits = "23"`。第一层先选 `a`，第二层依次接上 `d/e/f`，得到 `ad/ae/af`；回到第一层再选 `b`，得到 `bd/be/bf`；再选 `c`，得到 `cd/ce/cf`。 ',
        bullets: [
          '第一层选择来自 `2 -> abc`。 ',
          '选了 `a` 后，第二层选择来自 `3 -> def`。 ',
          '路径走到长度 2 时，说明一个完整组合已经形成。 ',
          'DFS 会把这一整棵树完整遍历完。 ',
        ],
      },
      {
        id: 'lcpn-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是非常适合打回溯基础的一题。真正需要练熟的不是答案，而是这种“按层选择、走到叶子收集结果、回退后继续试”的过程感。 ',
        bullets: [
          '易错点 1：没有处理空字符串，导致返回 `[""]` 而不是 `[]`。 ',
          '易错点 2：把当前路径写成共享可变状态却没有正确回退。 ',
          '易错点 3：没有理解结束条件，导致递归层数错位。 ',
          '延伸方向：组合总和、全排列、子集、括号生成、N 皇后。 ',
        ],
        callout:
          '如果前面的题在练哈希、链表、双指针和窗口，那第 17 题就是一个明显的分界点：你开始要学会把问题看成一棵树，并用 DFS 去遍历所有可能路径。回溯能力从这里正式起步。 ',
      },
    ],
  },
  {
    id: '4sum',
    label: '18. LeetCode 18. 四数之和',
    difficulty: '中等',
    description:
      '这题不是一套全新的技巧，而是把三数之和的框架再向前推进一层：先排序，再固定两位，最后在剩余区间里用双指针搜索。重点在于去重和层级迁移。',
    outcome:
      '你能把三数之和的思路稳定迁移到四数之和，理解为什么要排序、为什么要做双层固定、为什么每一层都要去重，并能独立写出标准解法。',
    sections: [
      {
        id: '4sum-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数数组 `nums` 和目标值 `target`，找出所有满足 `a + b + c + d = target` 且不重复的四元组。',
        bullets: [
          '返回的是所有不重复的四元组，不是只返回个数。',
          '每个四元组内部通常按升序呈现，因为数组会先排序。',
          '重点有两个：找到所有解，以及避免重复解。',
          '这题本质上是在更高一层上复用排序 + 双指针。 ',
        ],
      },
      {
        id: '4sum-brute-force',
        title: '暴力解为什么一眼就该放弃',
        summary:
          '最直接的做法是四重循环，枚举所有 `i/j/k/l` 组合，再判断四数之和是否等于 `target`。思路当然能写，但复杂度是 `O(n⁴)`，规模一上来就完全不现实。',
        bullets: [
          '四重循环的搜索空间非常大。',
          '即使加一个 set 去重，复杂度也没有本质改善。',
          '真正应该想的是：怎样让一部分循环被双指针替代。',
          '这正是排序的价值所在。 ',
        ],
        code: `function fourSumBruteForce(nums: number[], target: number): number[][] {\n  const answer: number[][] = []\n  const seen = new Set<string>()\n\n  for (let i = 0; i < nums.length; i += 1) {\n    for (let j = i + 1; j < nums.length; j += 1) {\n      for (let k = j + 1; k < nums.length; k += 1) {\n        for (let l = k + 1; l < nums.length; l += 1) {\n          if (nums[i] + nums[j] + nums[k] + nums[l] === target) {\n            const group = [nums[i], nums[j], nums[k], nums[l]].sort((a, b) => a - b)\n            const key = group.join(',')\n\n            if (!seen.has(key)) {\n              seen.add(key)\n              answer.push(group)\n            }\n          }\n        }\n      }\n    }\n  }\n\n  return answer\n}`,
      },
      {
        id: '4sum-relationship-with-3sum',
        title: '它和三数之和到底是什么关系',
        summary:
          '这题可以直接理解成“三数之和再套一层固定”。三数之和是固定一位，再在剩余区间用双指针找两数；四数之和则是固定两位，再在剩余区间用双指针找另外两数。',
        bullets: [
          '排序依然是前提。',
          '外层从固定一位，升级为固定两位。',
          '内层仍然是左右指针夹逼。',
          '去重逻辑也从一层扩展到两层固定 + 两端指针。 ',
        ],
        callout:
          '这题真正训练的是“框架迁移能力”。你不能把每道题都当新题重学，而要学会看出它和上一题骨架之间的继承关系。 ',
      },
      {
        id: '4sum-why-sort-first',
        title: '为什么排序后才能稳定使用双指针',
        summary:
          '排序之后，如果当前四数和偏小，就移动左指针去增大和；如果当前和偏大，就移动右指针去减小和。这种移动方向的确定性，是双指针成立的根本原因。',
        bullets: [
          '排序让区间里的数字大小关系固定下来。',
          '和太小时，左指针右移更可能变大。',
          '和太大时，右指针左移更可能变小。',
          '如果不排序，你根本不知道该怎么动指针。 ',
        ],
      },
      {
        id: '4sum-dedup-core',
        title: '这题最容易写乱的部分：去重到底该放在哪里',
        summary:
          '四数之和最大的难点往往不是找解，而是去重。外层 `i` 要去重，第二层 `j` 也要去重；找到一个合法四元组之后，`left` 和 `right` 也都要跳过重复值。少去一层就会重复，多去一层又可能漏解。',
        bullets: [
          '固定 `i` 时，如果和前一个值相同，就跳过。',
          '固定 `j` 时，如果和前一个值相同，也跳过。',
          '找到答案后，左指针连续跳过相同值。',
          '右指针同样连续跳过相同值。 ',
        ],
      },
      {
        id: '4sum-optimal-solution',
        title: '标准解法：排序 + 双层固定 + 双指针',
        summary:
          '先对数组排序。第一层循环固定 `i`，第二层循环固定 `j`。然后在 `j` 右侧区间设置 `left` 和 `right`，通过双指针寻找另外两数。每次根据当前和与 `target` 的大小关系移动指针，并在各层做好去重。',
        bullets: [
          '时间复杂度是 `O(n³)`。 ',
          '空间复杂度如果不算排序开销，可视作 `O(1)`。 ',
          '这题的结构很适合作为“三数之和模板升级版”。 ',
        ],
        code: `function fourSum(nums: number[], target: number): number[][] {\n  const sorted = [...nums].sort((a, b) => a - b)\n  const answer: number[][] = []\n\n  for (let i = 0; i < sorted.length - 3; i += 1) {\n    if (i > 0 && sorted[i] === sorted[i - 1]) {\n      continue\n    }\n\n    for (let j = i + 1; j < sorted.length - 2; j += 1) {\n      if (j > i + 1 && sorted[j] === sorted[j - 1]) {\n        continue\n      }\n\n      let left = j + 1\n      let right = sorted.length - 1\n\n      while (left < right) {\n        const sum = sorted[i] + sorted[j] + sorted[left] + sorted[right]\n\n        if (sum === target) {\n          answer.push([sorted[i], sorted[j], sorted[left], sorted[right]])\n\n          left += 1\n          right -= 1\n\n          while (left < right && sorted[left] === sorted[left - 1]) {\n            left += 1\n          }\n\n          while (left < right && sorted[right] === sorted[right + 1]) {\n            right -= 1\n          }\n        } else if (sum < target) {\n          left += 1\n        } else {\n          right -= 1\n        }\n      }\n    }\n  }\n\n  return answer\n}`,
      },
      {
        id: '4sum-example-walkthrough',
        title: '拿经典例子走一遍',
        summary:
          '例如 `nums = [1,0,-1,0,-2,2]`，`target = 0`。排序后得到 `[-2,-1,0,0,1,2]`。先固定 `-2`，再固定 `-1`，双指针可以找到 `[-2,-1,1,2]`；继续固定 `-2` 和 `0`，能找到 `[-2,0,0,2]`；再固定 `-1` 和 `0`，能找到 `[-1,0,0,1]`。',
        bullets: [
          '排序后所有搜索都在有序数组里进行。',
          '同一个起点值不会重复固定两次。',
          '每找到一个答案，左右指针都要跳过重复值。',
          '最后得到三组经典答案：`[-2,-1,1,2]`、`[-2,0,0,2]`、`[-1,0,0,1]`。 ',
        ],
      },
      {
        id: '4sum-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '四数之和是双指针题里非常典型的“套模板升级题”。它不要求你发明新算法，而是要求你把已有模板层次化、系统化地写稳定。',
        bullets: [
          '易错点 1：只给 `i` 去重，却忘了 `j` 也会重复。 ',
          '易错点 2：找到答案后只移动指针，不跳过重复值，结果答案重复。 ',
          '易错点 3：把三数之和的模板生搬硬套，但没有意识到这里是双层固定。 ',
          '延伸方向：K 数之和、最接近的 K 数之和、递归降维搜索。 ',
        ],
        callout:
          '如果第 15 题是三数之和模板的起点，那第 18 题就是第一次真正考你：你能不能把一个成熟模板向更高维度迁移，而不是只会做原题。 ',
      },
    ],
  },
  {
    id: 'remove-nth-node-from-end-of-list',
    label: '19. LeetCode 19. 删除链表的倒数第 N 个结点',
    difficulty: '中等',
    description:
      '这题是双指针在链表里的代表题。重点不是记住“快慢指针”四个字，而是理解为什么只靠一次遍历，就能准确定位倒数第 N 个节点的前一个位置。',
    outcome:
      '你能独立写出删除链表倒数第 N 个结点的双指针解法，理解虚拟头结点和固定间距双指针的意义，并知道为什么它比先算长度再删更稳。',
    sections: [
      {
        id: 'rn-problem-summary',
        title: '题目在问什么',
        summary:
          '给你一个链表头节点 `head`，要求删除链表的倒数第 `n` 个节点，并返回删除后的头节点。这里的关键是“倒数第 n 个”，也就是你不能直接从前往后数到它。',
        bullets: [
          '删除的是节点本身，不是单纯把值改掉。',
          '返回的可能是新的头节点，因为有可能删掉原来的第一个节点。',
          '题目保证 `n` 一定合法，不会超过链表长度。',
          '真正要找的通常不是目标节点，而是目标节点的前一个节点。',
        ],
      },
      {
        id: 'rn-direct-idea',
        title: '最直观的思路是什么',
        summary:
          '最容易想到的方法是先遍历一遍求链表长度 `len`，然后再走到正数第 `len - n` 个位置，把它后面的节点删掉。这个思路没问题，但要走两遍。',
        bullets: [
          '第一遍统计链表长度。 ',
          '第二遍走到待删除节点的前一个位置。 ',
          '然后执行 `prev.next = prev.next?.next ?? null`。 ',
          '这样时间复杂度仍然是 `O(n)`，但不是题目最优雅的写法。 ',
        ],
        callout:
          '这题不是说先算长度不对，而是还有更值得掌握的模型：让两个指针保持固定间距，一次遍历直接定位。 ',
      },
      {
        id: 'rn-core-idea',
        title: '真正的关键：让快指针先走 n 步',
        summary:
          '如果快指针先走 `n` 步，然后快慢指针一起走，那么当快指针走到链表末尾时，慢指针刚好站在“待删除节点的前一个位置”。这就是固定间距双指针的经典用法。',
        bullets: [
          '先让 `fast` 比 `slow` 多走 `n` 步。 ',
          '之后两个指针同步前进。 ',
          '当 `fast` 到达末尾时，`slow` 和目标节点之间正好隔着 1 个位置。 ',
          '此时修改 `slow.next` 就能完成删除。 ',
        ],
      },
      {
        id: 'rn-why-dummy-head',
        title: '为什么这里同样建议用虚拟头结点',
        summary:
          '如果删除的是原链表第一个节点，那么目标节点前面其实没有真实节点。为了让“删除头节点”和“删除中间节点”使用同一套逻辑，最稳的方式就是在最前面挂一个 dummy head。',
        bullets: [
          'dummy head 的 `next` 指向原始 `head`。 ',
          '慢指针从 dummy 出发，就能统一覆盖删头节点场景。 ',
          '最后返回 `dummy.next` 即可。 ',
          '这是链表删除题里非常通用的稳定技巧。 ',
        ],
      },
      {
        id: 'rn-optimal-solution',
        title: '标准解法：虚拟头结点 + 固定间距双指针',
        summary:
          '让 `fast` 和 `slow` 都从 dummy 出发，先让 `fast` 走 `n + 1` 步，这样两个指针之间始终相差一个“待删除节点前驱”的距离。之后同步前进，直到 `fast` 为空。 ',
        bullets: [
          '时间复杂度是 `O(L)`，`L` 为链表长度。 ',
          '额外空间复杂度是 `O(1)`。 ',
          '实现细节上，`fast` 先走 `n + 1` 步，是为了让 `slow` 最终停在目标前一个节点。 ',
        ],
        code: `class ListNode {\n  val: number\n  next: ListNode | null\n\n  constructor(val = 0, next: ListNode | null = null) {\n    this.val = val\n    this.next = next\n  }\n}\n\nfunction removeNthFromEnd(\n  head: ListNode | null,\n  n: number,\n): ListNode | null {\n  const dummy = new ListNode(0, head)\n  let fast: ListNode | null = dummy\n  let slow: ListNode | null = dummy\n\n  for (let step = 0; step <= n; step += 1) {\n    fast = fast?.next ?? null\n  }\n\n  while (fast) {\n    fast = fast.next\n    slow = slow?.next ?? null\n  }\n\n  if (slow?.next) {\n    slow.next = slow.next.next\n  }\n\n  return dummy.next\n}`,
      },
      {
        id: 'rn-example-walkthrough',
        title: '拿一个例子手推一次',
        summary:
          '例如 `head = [1,2,3,4,5]`，`n = 2`。倒数第 2 个节点是 `4`。让快指针先走 3 步后，快慢指针同步移动。等快指针走到末尾时，慢指针正好停在 `3` 上，所以把 `3.next` 指向 `5` 即可。 ',
        bullets: [
          'dummy -> 1 -> 2 -> 3 -> 4 -> 5。 ',
          '快指针先走 `n + 1 = 3` 步，和慢指针拉开固定距离。 ',
          '同步移动后，慢指针停在值为 `3` 的节点。 ',
          '执行删除后结果是 `[1,2,3,5]`。 ',
        ],
      },
      {
        id: 'rn-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是链表双指针模型里很经典的一道。它的价值不在于题目本身，而在于让你建立“固定间距定位”的思维，后面很多题都会复用。 ',
        bullets: [
          '易错点 1：不用 dummy head，结果删除头节点时逻辑单独分叉。 ',
          '易错点 2：快指针先走的步数写错，导致慢指针停错位置。 ',
          '易错点 3：最后删的是 `slow` 而不是 `slow.next`。 ',
          '延伸方向：链表中点、环形链表、相交链表、K 个一组翻转链表。 ',
        ],
        callout:
          '如果第 2 题在训练你“链表遍历 + 进位状态”，那第 19 题训练的就是“链表遍历 + 相对距离”。这两类模型是链表题里最常复用的骨架。 ',
      },
    ],
  },
  {
    id: 'valid-parentheses',
    label: '20. LeetCode 20. 有效的括号',
    difficulty: '简单',
    description:
      '这题是栈结构最经典的入门题。重点不是记住“左括号入栈、右括号出栈”这句口号，而是理解为什么括号匹配天然就是“后进先出”的结构问题。',
    outcome:
      '你能独立写出有效括号的栈解法，理解括号匹配的状态维护方式，并知道为什么这类题用栈比计数器更稳。 ',
    sections: [
      {
        id: 'vp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含 `(`、`)`、`[`、`]`、`{`、`}` 的字符串 `s`，判断它是否是有效括号串。有效的意思是：每个左括号都必须被同类型的右括号正确关闭，而且关闭顺序也必须正确。 ',
        bullets: [
          '不仅要数量对，还要顺序对。 ',
          '`(]` 这种虽然左右各一个，但仍然是非法。 ',
          '左括号必须由同类型右括号闭合。 ',
          '后打开的括号，必须先关闭。 ',
        ],
      },
      {
        id: 'vp-why-counting-fails',
        title: '为什么只靠计数器不够',
        summary:
          '很多人一开始会想：既然括号是成对出现，那分别统计数量不就行了？这个思路对单一括号类型都不稳，更不用说多种括号混合。因为题目难点不在数量，而在“最近打开的是谁”。 ',
        bullets: [
          '`([)]` 中每类括号数量都对，但顺序错了。 ',
          '计数器只能记录“有多少”，不能记录“最后一个待匹配的是谁”。 ',
          '题目真正需要的是一个能记住最近未闭合左括号的结构。 ',
          '这就是栈最适合登场的原因。 ',
        ],
        callout:
          '只要题目里出现“最近一个”“最后压进去的要先处理”，你就应该警觉：这很可能是栈。 ',
      },
      {
        id: 'vp-core-idea',
        title: '真正的关键：用栈保存还没闭合的左括号',
        summary:
          '遍历字符串时，遇到左括号就入栈；遇到右括号，就看栈顶是不是它对应的左括号。如果不是，说明立刻非法；如果是，就把栈顶弹出。最后只有当栈为空时，整个字符串才有效。 ',
        bullets: [
          '左括号负责“登记待匹配信息”。 ',
          '右括号负责“校验并结算最近一项待匹配”。 ',
          '如果在需要出栈时栈为空，说明右括号来早了。 ',
          '如果遍历结束后栈还不空，说明左括号还有残留。 ',
        ],
      },
      {
        id: 'vp-why-map',
        title: '为什么常用映射表而不是写一堆 if/else',
        summary:
          '虽然括号种类只有 3 种，但直接写一堆分支会很快变乱。更稳的写法是维护一个右括号到左括号的映射表，这样匹配逻辑可以统一写成一套。 ',
        bullets: [
          '映射表让“这个右括号应该匹配谁”变成常量查找。 ',
          '匹配逻辑统一后，可读性更高。 ',
          '后续类似题型也更容易迁移。 ',
          '这种“用表驱动规则”的写法，在算法和工程里都很常见。 ',
        ],
      },
      {
        id: 'vp-optimal-solution',
        title: '标准解法：映射表 + 栈',
        summary:
          '准备一个 `Map` 记录右括号对应的左括号，再准备一个数组充当栈。遍历字符串，左括号直接入栈，右括号则检查栈顶并弹出。最后返回栈是否为空。 ',
        bullets: [
          '时间复杂度是 `O(n)`。 ',
          '空间复杂度最坏是 `O(n)`，因为全是左括号时都会入栈。 ',
          '写法上通常把“左括号”和“右括号”分开判断会最清晰。 ',
        ],
        code: `function isValid(s: string): boolean {\n  const pairMap = new Map<string, string>([\n    [')', '('],\n    [']', '['],\n    ['}', '{'],\n  ])\n  const stack: string[] = []\n\n  for (const char of s) {\n    if (!pairMap.has(char)) {\n      stack.push(char)\n      continue\n    }\n\n    const top = stack.pop()\n    if (top !== pairMap.get(char)) {\n      return false\n    }\n  }\n\n  return stack.length === 0\n}`,
      },
      {
        id: 'vp-example-walkthrough',
        title: '拿两个例子手推一次',
        summary:
          '例如 `s = "()[]{}"`，每次遇到右括号时都能正确匹配并弹出，最后栈为空，所以是合法。再看 `s = "([)]"`，当读到 `)` 时，栈顶其实是 `[`，不是 `(`，因此立刻判定非法。 ',
        bullets: [
          '例 1：`()` 入栈 `(`，再遇 `)` 成功弹出。 ',
          '例 1：后面的 `[]`、`{}` 也都能依次匹配成功。 ',
          '例 2：`([)]` 在处理 `)` 时发现栈顶类型不对。 ',
          '顺序一错，就算数量全对也没用。 ',
        ],
      },
      {
        id: 'vp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题虽然简单，但它是“栈”最标准的起点。你只要把它写稳，后面的表达式求值、括号生成、字符串解码等题都会更好理解。 ',
        bullets: [
          '易错点 1：遇到右括号时没有先判断栈是否为空。 ',
          '易错点 2：只判断数量，不判断栈顶类型。 ',
          '易错点 3：遍历结束后忘记检查栈是否清空。 ',
          '延伸方向：最长有效括号、括号生成、基本计算器、字符串解码。 ',
        ],
        callout:
          '如果前面的链表题在训练你如何维护指针关系，那这题训练的就是如何维护“未完成状态”。栈本质上就是把这些未完成状态按后进先出的方式组织起来。 ',
      },
    ],
  },
  {
    id: 'merge-two-sorted-lists',
    label: '21. LeetCode 21. 合并两个有序链表',
    difficulty: '简单',
    description:
      '这题是链表题里最经典的“归并感”入门题。重点不是把两个链表拼起来，而是理解如何在不打乱顺序的前提下，持续选择当前更小的节点接到结果链表后面。',
    outcome:
      '你能独立写出合并两个有序链表的迭代解法，理解虚拟头结点和尾指针的作用，并知道为什么这题本质上是在训练“有序流合并”的思维。 ',
    sections: [
      {
        id: 'm2sl-problem-summary',
        title: '题目在问什么',
        summary:
          '给你两个已经按升序排列的链表 `list1` 和 `list2`，要求把它们合并成一个新的升序链表，并返回合并后的头节点。这里所谓“新的”，通常不是新建所有节点，而是把原有节点重新串起来。 ',
        bullets: [
          '两个输入链表本身都已经有序。 ',
          '返回结果仍然必须保持升序。 ',
          '可以直接复用原链表节点，不需要额外复制一遍值。 ',
          '真正难点在于：每一步都要决定当前接谁。 ',
        ],
      },
      {
        id: 'm2sl-direct-idea',
        title: '最直观的思路是什么',
        summary:
          '既然两个链表都有序，那最自然的想法就是像两条排好队的队伍一样比较队首：谁更小，就先把谁接到结果链表后面，然后对应链表向后移动一格。这个过程会一直持续到某一边走完。 ',
        bullets: [
          '比较 `list1.val` 和 `list2.val`。 ',
          '较小的节点先接到结果尾部。 ',
          '被选中的那个链表指针继续后移。 ',
          '最后把没走完的那一段整体接上即可。 ',
        ],
        callout:
          '这题表面是链表题，底层其实和数组归并一模一样：两个有序源，不断取更小值输出。 ',
      },
      {
        id: 'm2sl-why-dummy-tail',
        title: '为什么虚拟头结点和尾指针几乎是标配',
        summary:
          '如果你直接处理结果链表的头节点，会很快陷入“第一次接节点时怎么初始化”的分支判断。更稳的做法是准备一个 dummy head，再用 `tail` 永远指向结果链表最后一个节点。 ',
        bullets: [
          'dummy head 让第一个节点和后续节点使用同一套接法。 ',
          '`tail.next = 某个更小节点` 后，再把 `tail` 向后移动。 ',
          '整个过程只关心“尾部怎么继续接”，不用反复判断头节点。 ',
          '链表拼接题里，这个模板非常高频。 ',
        ],
      },
      {
        id: 'm2sl-core-idea',
        title: '真正的关键：尾指针始终维护当前已合并部分的末尾',
        summary:
          '每轮比较后，你不是在“创建一个答案”，而是在延长一条已经有序的结果链表。只要 `tail` 始终站在结果末尾，每次把较小节点接过去，就能保证结果一直有序。 ',
        bullets: [
          '结果链表前半段始终已经排好序。 ',
          '两个输入链表当前节点里较小的那个，一定可以安全接到末尾。 ',
          '因为两个输入本身有序，所以被跳过的较大值之后仍然不会破坏顺序。 ',
          '这就是贪心选择在局部可成立的原因。 ',
        ],
      },
      {
        id: 'm2sl-optimal-solution',
        title: '标准解法：迭代比较 + 尾插法',
        summary:
          '准备一个虚拟头结点 `dummy`，再用 `tail` 指向它。只要 `list1` 和 `list2` 都还没走完，就比较两边当前值，把更小节点接到 `tail.next`，然后移动对应链表指针和 `tail`。循环结束后，把剩余链表整体接到末尾。 ',
        bullets: [
          '时间复杂度是 `O(m + n)`。 ',
          '额外空间复杂度是 `O(1)`，因为没有新建成批节点。 ',
          '这题最推荐先写迭代版，再去理解递归版。 ',
        ],
        code: `class ListNode {\n  val: number\n  next: ListNode | null\n\n  constructor(val = 0, next: ListNode | null = null) {\n    this.val = val\n    this.next = next\n  }\n}\n\nfunction mergeTwoLists(\n  list1: ListNode | null,\n  list2: ListNode | null,\n): ListNode | null {\n  const dummy = new ListNode()\n  let tail = dummy\n  let left = list1\n  let right = list2\n\n  while (left && right) {\n    if (left.val <= right.val) {\n      tail.next = left\n      left = left.next\n    } else {\n      tail.next = right\n      right = right.next\n    }\n\n    tail = tail.next\n  }\n\n  tail.next = left ?? right\n\n  return dummy.next\n}`,
      },
      {
        id: 'm2sl-example-walkthrough',
        title: '拿一个例子手推一次',
        summary:
          '例如 `list1 = [1,2,4]`，`list2 = [1,3,4]`。先比较两个 `1`，任选较左边那个先接，再比较 `2` 和 `1`，接 `list2` 的 `1`。后面继续按这个规则推进，最终得到 `[1,1,2,3,4,4]`。 ',
        bullets: [
          '开始时 `tail` 指向 dummy。 ',
          '每接入一个节点，`tail` 都向后走一步。 ',
          '某一边耗尽后，另一边剩余部分天然已经有序。 ',
          '所以最后一步可以整段接上，而不是一个个再比。 ',
        ],
      },
      {
        id: 'm2sl-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是很多后续题型的母题。你把它吃透，后面像合并 K 个有序链表、归并排序链表、外部排序流式合并，都会更容易理解。 ',
        bullets: [
          '易错点 1：不使用 dummy，导致头节点初始化分支很多。 ',
          '易错点 2：接完较小节点后忘记移动 `tail`。 ',
          '易错点 3：循环结束后忘记把剩余链表整体挂上。 ',
          '延伸方向：合并 K 个有序链表、排序链表、两个数组归并。 ',
        ],
        callout:
          '如果前面的第 19 题在训练你“如何定位链表中的相对位置”，那第 21 题训练的就是“如何稳定地重组链表结构”。这两种能力一起，才算真正开始会做链表题。 ',
      },
    ],
  },
  {
    id: 'generate-parentheses',
    label: '22. LeetCode 22. 括号生成',
    difficulty: '中等',
    description:
      '这题是回溯算法最经典的起点之一。重点不是死记“DFS + 回溯”四个字，而是理解：什么时候一个选择可以继续往下递归，什么时候必须立刻剪枝。 ',
    outcome:
      '你能独立写出括号生成的回溯解法，理解路径、选择、结束条件和剪枝条件的关系，并建立“构造所有合法答案”的递归思维。 ',
    sections: [
      {
        id: 'gp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定数字 `n`，表示括号对数，要求你生成所有由 `n` 对括号组成的合法括号组合。这里不是判断一个字符串是否合法，而是把所有合法结果全部构造出来。 ',
        bullets: [
          '每个答案都要恰好使用 `n` 个左括号和 `n` 个右括号。 ',
          '每个答案都必须是合法括号串。 ',
          '要求返回所有可能结果，而不是只返回数量。 ',
          '这类题本质上是在一棵“选择树”里找所有满足条件的路径。 ',
        ],
      },
      {
        id: 'gp-why-bruteforce-is-bad',
        title: '为什么不能先暴力生成再过滤',
        summary:
          '最粗暴的办法是先生成长度为 `2n` 的所有括号字符串，再逐个判断是否合法。但这样会产生大量明知不可能正确的垃圾结果，效率很差。题目更重要的价值，是训练你在构造过程中就把非法路径剪掉。 ',
        bullets: [
          '长度为 `2n` 的每个位置都有两种选择：左括号或右括号。 ',
          '这样会先生成 `2^(2n)` 条路径。 ',
          '其中绝大多数路径根本不合法。 ',
          '如果能在构造过程中就阻止非法路径，搜索空间会小很多。 ',
        ],
        callout:
          '回溯题的关键通常不是“怎么枚举”，而是“怎么尽早剪枝”。剪得越早，树就越小。 ',
      },
      {
        id: 'gp-core-idea',
        title: '真正的关键：左括号和右括号什么时候能放',
        summary:
          '构造字符串时，左括号不是随便放，右括号更不是随便放。你只能在左括号数量还没用满时继续放左括号；而右括号只有在“当前已经放过的左括号数量更多”时才能放。否则一旦右括号先超前，这条路径注定非法。 ',
        bullets: [
          '如果 `left < n`，就还能继续放左括号。 ',
          '如果 `right < left`，就还能继续放右括号。 ',
          '只要 `right > left`，括号立刻失衡，这条路径必须终止。 ',
          '当路径长度达到 `2n` 时，就得到一个完整答案。 ',
        ],
      },
      {
        id: 'gp-why-backtracking',
        title: '为什么这是回溯题而不是普通递归题',
        summary:
          '因为你不是只算一个值，而是在尝试一系列选择：放左括号还是放右括号。每深入一层，就是在当前路径后面补一个字符；每返回上一层，就是撤销这次选择，去尝试另一条分支。这就是典型的“路径 + 选择 + 回退”结构。 ',
        bullets: [
          '路径表示当前已经拼出的括号串。 ',
          '选择是下一步放 `(` 还是 `)`。 ',
          '结束条件是路径长度达到 `2n`。 ',
          '回退的意义是：尝试完一条分支，再回头试另一条。 ',
        ],
      },
      {
        id: 'gp-optimal-solution',
        title: '标准解法：回溯 + 剪枝',
        summary:
          '定义一个递归函数，参数包括当前路径、已使用左括号数和已使用右括号数。只要左括号还没用满，就尝试放左括号；只要右括号数量还小于左括号数量，就尝试放右括号。路径长度达到 `2n` 时，把结果收集起来。 ',
        bullets: [
          '时间复杂度通常描述为和答案数量相关。 ',
          '空间复杂度主要来自递归栈和路径存储。 ',
          '这题最重要的不是背复杂度，而是吃透“合法性约束前置”。 ',
        ],
        code: `function generateParenthesis(n: number): string[] {\n  const result: string[] = []\n\n  const dfs = (path: string, left: number, right: number) => {\n    if (path.length === n * 2) {\n      result.push(path)\n      return\n    }\n\n    if (left < n) {\n      dfs(path + '(', left + 1, right)\n    }\n\n    if (right < left) {\n      dfs(path + ')', left, right + 1)\n    }\n  }\n\n  dfs('', 0, 0)\n  return result\n}`,
      },
      {
        id: 'gp-example-walkthrough',
        title: '拿 `n = 3` 手推一次',
        summary:
          '开始时路径为空。第一步只能放 `(`，因为右括号不能领先。接着继续递归，例如先一路放到 `(((`，然后再逐步补右括号，得到 `((()))`。回退后继续尝试其他合法分支，例如 `(()())`、`(())()`、`()(())`、`()()()`。 ',
        bullets: [
          '空串时不能先放 `)`。 ',
          '每一步都遵守 `right <= left`。 ',
          '当路径满 `6` 个字符时才加入答案。 ',
          '最后总共得到 5 个合法答案。 ',
        ],
      },
      {
        id: 'gp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是回溯的代表入门题。它的价值不只是会做一道括号题，而是让你第一次真正建立“构造合法路径”的搜索思维。后面像子集、组合、排列、N 皇后都会共用这套框架。 ',
        bullets: [
          '易错点 1：只判断左右括号总数，不判断 `right < left`。 ',
          '易错点 2：到达长度 `2n` 时忘记立刻收集答案并返回。 ',
          '易错点 3：把所有字符串先生成出来，再事后过滤合法性。 ',
          '延伸方向：子集、组合总和、全排列、N 皇后。 ',
        ],
        callout:
          '如果第 20 题在训练你“如何校验已有括号串是否有效”，那第 22 题训练的就是“如何从零构造所有有效括号串”。一个是验证，一个是生成，这两种思路完全不同。 ',
      },
    ],
  },
  {
    id: 'merge-k-sorted-lists',
    label: '23. LeetCode 23. 合并 K 个升序链表',
    difficulty: '困难',
    description:
      '这题是第 21 题“合并两个有序链表”的升级版。重点不是再写一遍链表比较，而是意识到：当“两个有序源”变成“K 个有序源”时，你需要一个更高效的全局选择结构。 ',
    outcome:
      '你能独立写出合并 K 个升序链表的最优思路，理解为什么最小堆适合处理多个有序输入源，并知道它和分治法之间的关系。 ',
    sections: [
      {
        id: 'mk-problem-summary',
        title: '题目在问什么',
        summary:
          '给你一个链表数组 `lists`，其中每个链表都已经按升序排列。要求把这些链表合并成一个新的升序链表，并返回合并后的头节点。难点不在链表本身，而在于有很多条链表同时竞争“当前最小值”。 ',
        bullets: [
          '每条输入链表内部本身都是有序的。 ',
          '输入数量不再固定为 2，而是 `k` 条。 ',
          '返回结果仍然必须整体升序。 ',
          '核心问题变成：如何高效选出所有链表当前头节点中的最小值。 ',
        ],
      },
      {
        id: 'mk-why-repeat-merge-is-not-best',
        title: '为什么一条条顺次合并不够好',
        summary:
          '最直观的办法是先合并前两条，再拿结果和第三条合并，再和第四条合并……这样当然能做出来，但如果前面合出来的链表越来越长，后面的每次合并成本都会越来越高，整体效率不够理想。 ',
        bullets: [
          '如果总节点数是 `N`，链表数量是 `k`。 ',
          '顺次合并会让前面结果反复被扫描。 ',
          '在 `k` 较大时，性能会明显变差。 ',
          '这说明我们需要一种更“全局”的最小值选择方式。 ',
        ],
        callout:
          '第 21 题告诉你怎么合并两个有序流，第 23 题在追问：当有很多个有序流同时到来时，你怎么避免低效地反复重扫。 ',
      },
      {
        id: 'mk-core-idea',
        title: '真正的关键：谁能最快告诉你“当前最小头节点是谁”',
        summary:
          '因为每条链表本身有序，所以每条链表里真正有资格参与竞争的，永远只有当前头节点。你要做的不是关心所有节点，而是维护这 `k` 个候选头节点中谁最小。每取出一个最小节点，再把它所在链表的下一个节点补回候选集合即可。 ',
        bullets: [
          '候选集合里只放每条链表当前头节点。 ',
          '每次弹出最小头节点，把它接到答案后面。 ',
          '然后把这个节点的 `next` 再放回候选集合。 ',
          '这个过程天然适合“动态维护最小值”的数据结构。 ',
        ],
      },
      {
        id: 'mk-why-heap',
        title: '为什么最小堆是这里最自然的选择',
        summary:
          '最小堆的作用就是快速拿到当前最小元素，并在插入新元素后继续维持整体有序关系。这里候选数量最多只有 `k` 个，所以每次取最小和插入新节点的代价都能控制在 `O(log k)`。 ',
        bullets: [
          '堆顶永远是当前最小节点。 ',
          '弹出最小值是 `O(log k)`。 ',
          '插入下一个候选节点也是 `O(log k)`。 ',
          '总共处理 `N` 个节点，所以整体效率很好。 ',
        ],
      },
      {
        id: 'mk-optimal-solution',
        title: '标准解法：最小堆 + 链表尾插',
        summary:
          '先把所有非空链表的头节点放进最小堆。然后反复弹出堆顶最小节点，接到结果链表尾部；如果这个节点后面还有 `next`，就把 `next` 继续放回堆中。直到堆为空，说明所有节点都已经按顺序处理完。 ',
        bullets: [
          '时间复杂度是 `O(N log k)`。 ',
          '额外空间复杂度是 `O(k)`。 ',
          '实现上通常仍然搭配 dummy head 和 tail 指针。 ',
        ],
        code: `class ListNode {\n  val: number\n  next: ListNode | null\n\n  constructor(val = 0, next: ListNode | null = null) {\n    this.val = val\n    this.next = next\n  }\n}\n\nclass MinHeap {\n  private data: ListNode[] = []\n\n  size() {\n    return this.data.length\n  }\n\n  push(node: ListNode) {\n    this.data.push(node)\n    this.bubbleUp(this.data.length - 1)\n  }\n\n  pop() {\n    if (this.data.length === 0) {\n      return null\n    }\n\n    const top = this.data[0]\n    const last = this.data.pop()!\n\n    if (this.data.length > 0) {\n      this.data[0] = last\n      this.bubbleDown(0)\n    }\n\n    return top\n  }\n\n  private bubbleUp(index: number) {\n    let current = index\n\n    while (current > 0) {\n      const parent = Math.floor((current - 1) / 2)\n      if (this.data[parent].val <= this.data[current].val) {\n        break\n      }\n      ;[this.data[parent], this.data[current]] = [\n        this.data[current],\n        this.data[parent],\n      ]\n      current = parent\n    }\n  }\n\n  private bubbleDown(index: number) {\n    let current = index\n    const length = this.data.length\n\n    while (true) {\n      const left = current * 2 + 1\n      const right = current * 2 + 2\n      let smallest = current\n\n      if (left < length && this.data[left].val < this.data[smallest].val) {\n        smallest = left\n      }\n\n      if (right < length && this.data[right].val < this.data[smallest].val) {\n        smallest = right\n      }\n\n      if (smallest === current) {\n        break\n      }\n\n      ;[this.data[current], this.data[smallest]] = [\n        this.data[smallest],\n        this.data[current],\n      ]\n      current = smallest\n    }\n  }\n}\n\nfunction mergeKLists(lists: Array<ListNode | null>): ListNode | null {\n  const heap = new MinHeap()\n\n  for (const node of lists) {\n    if (node) {\n      heap.push(node)\n    }\n  }\n\n  const dummy = new ListNode()\n  let tail = dummy\n\n  while (heap.size() > 0) {\n    const node = heap.pop()!\n    tail.next = node\n    tail = tail.next\n\n    if (node.next) {\n      heap.push(node.next)\n    }\n  }\n\n  return dummy.next\n}`,
      },
      {
        id: 'mk-example-walkthrough',
        title: '拿一个例子手推一次',
        summary:
          '例如 `lists = [[1,4,5],[1,3,4],[2,6]]`。最开始把三个头节点 `1、1、2` 放入堆。先弹出一个 `1`，再把它后面的 `4` 放回堆；接着再弹出另一个 `1`，把它后面的 `3` 放回堆。如此反复，最终得到 `[1,1,2,3,4,4,5,6]`。 ',
        bullets: [
          '堆里维护的是“每条链表当前最前面的候选值”。 ',
          '每弹出一个节点，只需要补回它后面的一个节点。 ',
          '候选集合规模始终不会超过 `k`。 ',
          '这就是最小堆能稳定控制复杂度的原因。 ',
        ],
      },
      {
        id: 'mk-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题的价值，在于它把“有序流合并”从双指针升级到了堆和分治层面。会做它，说明你已经开始接触真正更通用的多路归并模型。 ',
        bullets: [
          '易错点 1：把所有节点一股脑塞进数组排序，忽略了有序链表的结构信息。 ',
          '易错点 2：弹出最小节点后忘记把 `node.next` 放回堆。 ',
          '易错点 3：自己写堆时上浮下沉边界处理出错。 ',
          '延伸方向：分治合并 K 条链表、Top K、合并多个有序数组、外部排序。 ',
        ],
        callout:
          '如果第 21 题是“二路归并”的模板题，那第 23 题就是你第一次真正接触“多路归并”。它背后的模型，不只会出现在链表题里。 ',
      },
    ],
  },
  {
    id: 'swap-nodes-in-pairs',
    label: '24. LeetCode 24. 两两交换链表中的节点',
    difficulty: '中等',
    description:
      '这题是链表指针重连的经典训练题。重点不是把两个值交换一下，而是理解：如何在不破坏后续链表结构的前提下，稳定地重接两个相邻节点。 ',
    outcome:
      '你能独立写出两两交换链表节点的迭代解法，理解 dummy head、前驱节点和局部重连顺序，并建立对链表局部翻转的基本感觉。 ',
    sections: [
      {
        id: 'snp-problem-summary',
        title: '题目在问什么',
        summary:
          '给你一个链表，要求每两个相邻节点交换一次，并返回交换后的头节点。注意交换的是节点本身，而不是简单交换节点里的值。 ',
        bullets: [
          '第 1 个和第 2 个交换，第 3 个和第 4 个交换，以此类推。 ',
          '不能只改节点值，题目强调要动节点结构。 ',
          '如果链表长度是奇数，最后一个节点保持不动。 ',
          '核心难点是：怎么安全地改指针，不把链表断掉。 ',
        ],
      },
      {
        id: 'snp-why-not-swap-values',
        title: '为什么题目不建议直接交换值',
        summary:
          '如果题目只是让你“交换内容”，那直接交换节点值会很省事。但这里更想训练的是链表操作能力：节点位置改变时，你得真正学会修改 `next` 指针关系。后面很多链表题都要求这种能力。 ',
        bullets: [
          '交换值绕开了链表结构问题。 ',
          '题目真正想考的是局部节点重连。 ',
          '会交换节点，后面才更容易做 K 个一组翻转之类的题。 ',
          '所以这题的价值在于练指针，而不是练赋值。 ',
        ],
        callout:
          '链表题里，很多“简单做法”之所以不推荐，不是因为它跑不出来，而是因为它绕开了题目真正想训练的结构操作能力。 ',
      },
      {
        id: 'snp-core-idea',
        title: '真正的关键：先记住三个角色',
        summary:
          '每次交换一对节点时，你至少要盯住 3 个角色：这一对节点前面的前驱节点 `prev`，当前第一个节点 `first`，以及当前第二个节点 `second`。只要这三个位置关系搞清楚，局部交换就会变成一个稳定模板。 ',
        bullets: [
          '`prev.next` 原本指向 `first`。 ',
          '`first.next` 原本指向 `second`。 ',
          '`second.next` 原本指向后续节点。 ',
          '交换后应该变成：`prev -> second -> first -> 后续`。 ',
        ],
      },
      {
        id: 'snp-why-dummy-head',
        title: '为什么这里同样推荐 dummy head',
        summary:
          '如果链表头两个节点要交换，那新的头节点会直接变化。为了让“交换第一对”和“交换中间某一对”用同一套逻辑，最稳的办法就是加一个虚拟头结点，从 dummy 出发统一处理。 ',
        bullets: [
          'dummy 的 `next` 指向原始 head。 ',
          '每次都从 `prev` 开始找当前要交换的一对。 ',
          '这样就不用单独特判“头节点变化”的场景。 ',
          '链表改结构时，dummy 几乎总是一个稳手法。 ',
        ],
      },
      {
        id: 'snp-optimal-solution',
        title: '标准解法：dummy + 局部指针重连',
        summary:
          '使用一个 `prev` 指针从 dummy 出发，只要 `prev.next` 和 `prev.next.next` 都存在，就说明还有一对可交换节点。设这一对为 `first` 和 `second`，再按正确顺序调整 3 条指针：先让 `first.next` 指向 `second.next`，再让 `second.next` 指向 `first`，最后让 `prev.next` 指向 `second`。之后把 `prev` 移到 `first`，继续处理下一对。 ',
        bullets: [
          '时间复杂度是 `O(n)`。 ',
          '额外空间复杂度是 `O(1)`。 ',
          '真正容易错的不是思路，而是指针改动顺序。 ',
        ],
        code: `class ListNode {\n  val: number\n  next: ListNode | null\n\n  constructor(val = 0, next: ListNode | null = null) {\n    this.val = val\n    this.next = next\n  }\n}\n\nfunction swapPairs(head: ListNode | null): ListNode | null {\n  const dummy = new ListNode(0, head)\n  let prev: ListNode | null = dummy\n\n  while (prev?.next && prev.next.next) {\n    const first = prev.next\n    const second = first.next!\n\n    first.next = second.next\n    second.next = first\n    prev.next = second\n\n    prev = first\n  }\n\n  return dummy.next\n}`,
      },
      {
        id: 'snp-example-walkthrough',
        title: '拿 `[1,2,3,4]` 手推一次',
        summary:
          '开始时 `dummy -> 1 -> 2 -> 3 -> 4`。第一轮交换的是 `1` 和 `2`，交换后变成 `dummy -> 2 -> 1 -> 3 -> 4`。接着 `prev` 移到 `1`，第二轮交换 `3` 和 `4`，最后得到 `2 -> 1 -> 4 -> 3`。 ',
        bullets: [
          '第一轮结束后，`prev` 要移动到交换后的后一个节点，也就是 `1`。 ',
          '这样 `prev.next` 才会刚好指向下一对的第一个节点。 ',
          '每次交换只影响局部 2 个节点和它们前面的连接。 ',
          '所以整个过程可以稳定地从前往后推进。 ',
        ],
      },
      {
        id: 'snp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是链表局部重连的标准练习。它和简单遍历型链表题不同，真正训练的是你能不能把多个指针位置关系在脑子里同时维护住。 ',
        bullets: [
          '易错点 1：先改 `prev.next`，导致丢失原始节点关系。 ',
          '易错点 2：交换完成后把 `prev` 移到 `second` 而不是 `first`。 ',
          '易错点 3：没用 dummy，导致头节点交换时逻辑分叉。 ',
          '延伸方向：K 个一组翻转链表、反转链表 II、链表分段重排。 ',
        ],
        callout:
          '如果第 21 题是在训练你“如何把链表接长”，那第 24 题训练的就是“如何把链表局部翻转”。这已经开始接近更复杂链表题的核心手感了。 ',
      },
    ],
  },
  {
    id: 'reverse-nodes-in-k-group',
    label: '25. LeetCode 25. K 个一组翻转链表',
    difficulty: '困难',
    description:
      '这题是链表局部翻转能力的代表题。重点不是记住一段很长的模板代码，而是理解：如何把链表切成一个个长度为 `k` 的小段，并对每一段做稳定的局部反转。 ',
    outcome:
      '你能独立写出 K 个一组翻转链表的迭代解法，理解分组、局部反转、前后拼接这三个核心步骤，并建立链表分段操作的整体框架。 ',
    sections: [
      {
        id: 'rng-problem-summary',
        title: '题目在问什么',
        summary:
          '给你一个链表头节点 `head` 和整数 `k`，要求每 `k` 个节点为一组进行翻转，并返回修改后的链表。如果最后剩下的节点不足 `k` 个，则保持原样。 ',
        bullets: [
          '只有完整的 `k` 个节点才需要翻转。 ',
          '不足 `k` 个的尾部节点保持原顺序。 ',
          '翻转的是节点本身，不是简单交换值。 ',
          '核心难点是：如何安全地定位每一组，并把翻转后的结果接回原链表。 ',
        ],
      },
      {
        id: 'rng-relationship-to-24',
        title: '它和第 24 题是什么关系',
        summary:
          '如果第 24 题是“每 2 个一组交换”，那这题就是把组大小从 2 推广到了任意 `k`。本质上训练的是同一种能力：链表局部重排。区别在于，这次不再只是交换两个节点，而是整段翻转一组节点。 ',
        bullets: [
          '第 24 题只需要处理固定 2 个节点。 ',
          '这题需要处理长度为 `k` 的整段链表。 ',
          '组内翻转之后，还要把前后链表重新拼接起来。 ',
          '所以这题比第 24 题更系统、更接近完整模板。 ',
        ],
        callout:
          '很多链表难题本质上都不是“想新思路”，而是把你已有的小模板扩展成更大的结构操作模板。 ',
      },
      {
        id: 'rng-core-idea',
        title: '真正的关键：先确定这一组够不够 k 个',
        summary:
          '每次准备翻转前，首先要从当前起点往后数 `k` 个节点，确认这一组是否完整。如果不完整，直接结束；如果完整，才进入局部翻转流程。这一步非常关键，因为题目要求最后不足 `k` 个节点时必须保持原样。 ',
        bullets: [
          '不能一边翻一边发现节点不够。 ',
          '必须先确认这一段是完整的 `k` 个节点。 ',
          '确认后再切出这一组做局部反转。 ',
          '这样才能保证尾部不足 `k` 的部分不会被误操作。 ',
        ],
      },
      {
        id: 'rng-three-steps',
        title: '这一题其实可以拆成 3 个稳定步骤',
        summary:
          '你可以把整个过程拆成 3 步：第一步，找到这一组的起点和终点；第二步，把这一组局部翻转；第三步，把翻转后的头尾重新接回外部链表。只要这 3 步清晰，代码就不会乱。 ',
        bullets: [
          '步骤 1：找到组前驱、组起点、组终点、下一组起点。 ',
          '步骤 2：只反转当前这 `k` 个节点。 ',
          '步骤 3：把前驱接到新头，把旧头接到下一段。 ',
          '然后继续处理下一组。 ',
        ],
      },
      {
        id: 'rng-optimal-solution',
        title: '标准解法：dummy + 分组定位 + 局部反转',
        summary:
          '使用 dummy head 统一处理头节点变化。每轮从 `groupPrev` 出发，先找到当前组的第 `k` 个节点 `kth`；如果找不到，说明不足 `k` 个，直接结束。否则记住下一组起点 `groupNext`，然后把当前组 `[groupPrev.next, kth]` 反转。反转后，把 `groupPrev.next` 指向新组头，把原组头接到 `groupNext`，最后移动 `groupPrev` 继续下一轮。 ',
        bullets: [
          '时间复杂度是 `O(n)`。 ',
          '额外空间复杂度是 `O(1)`。 ',
          '真正难点集中在局部翻转过程里的指针更新顺序。 ',
        ],
        code: `class ListNode {\n  val: number\n  next: ListNode | null\n\n  constructor(val = 0, next: ListNode | null = null) {\n    this.val = val\n    this.next = next\n  }\n}\n\nfunction reverseKGroup(head: ListNode | null, k: number): ListNode | null {\n  const dummy = new ListNode(0, head)\n  let groupPrev: ListNode | null = dummy\n\n  const getKth = (node: ListNode | null, step: number) => {\n    let current = node\n    for (let count = 0; count < step; count += 1) {\n      current = current?.next ?? null\n    }\n    return current\n  }\n\n  while (groupPrev) {\n    const kth = getKth(groupPrev, k)\n    if (!kth) {\n      break\n    }\n\n    const groupNext = kth.next\n    let prev = groupNext\n    let current = groupPrev.next\n\n    while (current !== groupNext) {\n      const next = current!.next\n      current!.next = prev\n      prev = current\n      current = next\n    }\n\n    const groupStart = groupPrev.next\n    groupPrev.next = kth\n    groupPrev = groupStart\n  }\n\n  return dummy.next\n}`,
      },
      {
        id: 'rng-example-walkthrough',
        title: '拿 `[1,2,3,4,5]`，`k = 3` 手推一次',
        summary:
          '第一组是 `[1,2,3]`，它完整，所以翻转成 `[3,2,1]`。剩余链表是 `[4,5]`，因为不足 `3` 个节点，所以保持原样。最终结果是 `[3,2,1,4,5]`。 ',
        bullets: [
          '先确认前 3 个节点存在，才能进入翻转。 ',
          '翻转后，原组头 `1` 会变成这一组的尾巴。 ',
          '它要负责接回剩余部分 `[4,5]`。 ',
          '最后不足 `k` 的部分直接保留。 ',
        ],
      },
      {
        id: 'rng-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是链表局部翻转题里的经典门槛。真正把它做稳了，你对链表的控制力会明显上一个台阶，因为它要求你同时看清组边界、局部翻转和外部连接。 ',
        bullets: [
          '易错点 1：没先确认是否有完整 `k` 个节点，就提前翻转。 ',
          '易错点 2：翻转完之后忘记把原组头接回后续链表。 ',
          '易错点 3：更新 `groupPrev` 的位置错了，导致下一轮起点错乱。 ',
          '延伸方向：反转链表 II、分段翻转、链表重排、链表旋转。 ',
        ],
        callout:
          '如果第 24 题训练的是“局部交换”，那第 25 题训练的就是“分段翻转”。这已经是链表结构题里非常核心的一类模板了。 ',
      },
    ],
  },
  {
    id: 'remove-duplicates-from-sorted-array',
    label: '26. LeetCode 26. 删除有序数组中的重复项',
    difficulty: '简单',
    description:
      '这题是双指针里最基础也最重要的一类。重点不是“删掉重复项”这么字面化的操作，而是理解如何在原地修改数组、同时保留有序数组中的唯一元素。 ',
    outcome:
      '你能独立写出有序数组去重的原地解法，理解快慢指针如何协作，以及为什么排序条件会让这题变得非常简单。 ',
    sections: [
      {
        id: 'rd-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个非递减排序数组 `nums`，要求你原地删除重复出现的元素，使每个元素只出现一次，并返回删除后数组的新长度。题目不要求你真的截断数组，只要前 `k` 个位置放的是去重后的结果即可。 ',
        bullets: [
          '数组是有序的，所以重复元素一定挨在一起。 ',
          '要求的是“原地修改”，不能额外复制一个新数组来逃避。 ',
          '返回的新长度才是题目的核心结果。 ',
          '题目默认只关心前 `k` 个位置的有效内容。 ',
        ],
      },
      {
        id: 'rd-why-sorted-matters',
        title: '为什么“有序”这两个字很关键',
        summary:
          '如果数组是无序的，去重通常就要借助哈希集合；但有序数组里重复值天然是成段出现的，所以你只需要比较相邻元素就行。这直接把问题从“全局找重复”降成了“局部判断当前值是否和上一个保留值相同”。 ',
        bullets: [
          '有序性把重复元素聚拢在一起。 ',
          '不需要额外哈希结构也能判断是否重复。 ',
          '只要维护一个“最后一个保留的位置”，就能持续往前写。 ',
          '这是双指针能成立的前提。 ',
        ],
        callout:
          '有序数组题的价值不在于它简单，而在于它很适合训练你识别“顺序特性”带来的简化空间。 ',
      },
      {
        id: 'rd-core-idea',
        title: '核心思路：快指针找新值，慢指针写结果',
        summary:
          '用两个指针分别承担不同职责。`fast` 从左到右扫描整个数组，负责发现新元素；`slow` 指向当前去重结果的最后一个位置，负责把新元素写进去。只要 `nums[fast] !== nums[slow]`，就把这个新值写到 `slow + 1` 的位置，然后让 `slow` 前进。 ',
        bullets: [
          '`slow` 维护的是“当前结果区间的最后一个有效元素”。 ',
          '`fast` 负责遍历所有元素并做比较。 ',
          '发现新值时，把它写到 `slow + 1`。 ',
          '重复值直接跳过，不需要额外处理。 ',
        ],
      },
      {
        id: 'rd-optimal-solution',
        title: '标准解法：快慢指针原地覆盖',
        summary:
          '先让 `slow = 0`，表示第一个元素一定保留。然后从 `fast = 1` 开始遍历。如果 `nums[fast]` 和 `nums[slow]` 不同，说明找到了一个新元素，把它写入 `nums[++slow]`；如果相同，就继续往后看。遍历结束后，`slow + 1` 就是去重后的长度。 ',
        bullets: [
          '时间复杂度是 `O(n)`。 ',
          '额外空间复杂度是 `O(1)`。 ',
          '前 `slow + 1` 个位置就是最终保留区间。 ',
        ],
        code: `function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }

  let slow = 0

  for (let fast = 1; fast < nums.length; fast += 1) {
    if (nums[fast] !== nums[slow]) {
      slow += 1
      nums[slow] = nums[fast]
    }
  }

  return slow + 1
}`,
      },
      {
        id: 'rd-example-walkthrough',
        title: '拿 `[0,0,1,1,1,2,2,3,3,4]` 手推一次',
        summary:
          '开始时 `slow` 指向第一个 `0`。`fast` 向右走到 `1` 时，发现和 `slow` 指向的值不同，于是把 `1` 写到下一个位置。后面遇到连续的 `1` 就跳过，直到遇到 `2、3、4` 时再依次写入。最后前 5 个位置会变成 `[0,1,2,3,4]`。 ',
        bullets: [
          '第一个元素默认保留。 ',
          '重复值不会增加结果长度。 ',
          '每次写入都发生在 `slow + 1` 位置。 ',
          '数组前半段被原地改写成去重结果。 ',
        ],
      },
      {
        id: 'rd-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题看起来基础，但它是很多原地双指针题的起点。把它写顺后，后面处理删除元素、移动零、合并有序数组时会自然很多。 ',
        bullets: [
          '易错点 1：忘记空数组要直接返回 0。 ',
          '易错点 2：把 `slow` 初始化错，导致第一个元素被漏掉。 ',
          '易错点 3：只比较 `nums[fast]` 和 `nums[fast - 1]`，但没有正确处理写入位置。 ',
          '延伸方向：删除数组中的元素、移动零、合并两个有序数组、删除重复元素 II。 ',
        ],
        callout:
          '双指针题里，“谁负责找，谁负责写”这件事一旦分清楚，很多题的代码都会变得非常清爽。 ',
      },
    ],
  },
  {
    id: 'remove-element',
    label: '27. LeetCode 27. 移除元素',
    difficulty: '简单',
    description:
      '这题是双指针的另一条主线：不是去重，而是按条件筛掉不需要的值。重点不是“删数组里的某个数”，而是理解如何在原地保留合法元素，并让结果区间自然收缩。 ',
    outcome:
      '你能独立写出移除元素的原地双指针解法，理解“读指针扫描，写指针保留”的模型，并知道它和第 26 题的联系与区别。 ',
    sections: [
      {
        id: 're-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个数组 `nums` 和一个值 `val`，你需要原地移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。元素顺序可以改变，但最常见也最稳定的写法是保持剩余元素原有顺序。 ',
        bullets: [
          '题目要求原地修改，不能重新创建结果数组来规避。 ',
          '返回值是新长度，不是删除了多少个。 ',
          '只要前 `k` 个位置是保留下来的元素即可。 ',
          '这是典型的“过滤型双指针”题。 ',
        ],
      },
      {
        id: 're-relation-to-26',
        title: '它和第 26 题是什么关系',
        summary:
          '第 26 题是在有序数组中保留“不同值”；第 27 题则是在普通数组中保留“不等于某个目标值”的元素。两题本质上都在做同一件事：用一个写指针维护有效结果区间，用一个读指针遍历所有输入。 ',
        bullets: [
          '第 26 题依赖“有序”这个条件。 ',
          '第 27 题不依赖排序，只依赖判断当前值是否合法。 ',
          '两题都可以理解成“扫描 + 原地覆盖”。 ',
          '学会这两题，后面很多数组过滤题都会顺手很多。 ',
        ],
        callout:
          '双指针不是固定模板，而是给不同角色分工。只要你能说清楚“谁负责读，谁负责写”，代码通常就会很稳。 ',
      },
      {
        id: 're-core-idea',
        title: '核心思路：读到合法值，就写到前面',
        summary:
          '准备一个写指针 `slow` 指向下一个应该写入的位置，再用读指针 `fast` 扫描整个数组。每当 `nums[fast] !== val`，说明这个值应该保留，就把它写入 `nums[slow]`，然后让 `slow` 向前推进一格。扫描结束后，`slow` 就是新长度。 ',
        bullets: [
          '`fast` 只负责看当前元素。 ',
          '`slow` 只负责维护结果区间长度。 ',
          '不合法元素直接跳过，不写入。 ',
          '合法元素会被紧密地写到数组前部。 ',
        ],
      },
      {
        id: 're-optimal-solution',
        title: '标准解法：单向快慢指针',
        summary:
          '最稳妥的实现方式就是一次线性扫描。无论数组是否有序，都让 `fast` 从左到右看每个元素；如果当前元素不等于 `val`，就把它写到 `slow` 位置，并让 `slow` 自增。最后返回 `slow` 即可。 ',
        bullets: [
          '时间复杂度是 `O(n)`。 ',
          '额外空间复杂度是 `O(1)`。 ',
          '这种写法会保留剩余元素的相对顺序。 ',
        ],
        code: `function removeElement(nums: number[], val: number): number {
  let slow = 0

  for (let fast = 0; fast < nums.length; fast += 1) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]
      slow += 1
    }
  }

  return slow
}`,
      },
      {
        id: 're-example-walkthrough',
        title: '拿 `[3,2,2,3]`，`val = 3` 手推一次',
        summary:
          '开始时 `slow = 0`。`fast` 看到第一个 `3`，因为它等于目标值，所以跳过。接着看到两个 `2`，它们都应该保留，于是依次写到数组前面。最后一个 `3` 再次跳过。最终前 2 个位置变成 `[2,2]`，返回长度 `2`。 ',
        bullets: [
          '等于 `val` 的元素不会进入结果区间。 ',
          '不等于 `val` 的元素会按原顺序写到前面。 ',
          '最终只看前 `slow` 个位置。 ',
          '后面的旧值是什么，题目并不关心。 ',
        ],
      },
      {
        id: 're-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题很适合建立“按条件保留元素”的直觉。真正要记住的不是一段短代码，而是：当题目要求原地过滤时，写指针维护的就是有效结果区间。 ',
        bullets: [
          '易错点 1：把 `slow` 误写成从 1 开始，导致覆盖位置错乱。 ',
          '易错点 2：保留元素后忘记让 `slow` 递增。 ',
          '易错点 3：纠结数组后半段的值，实际上题目并不要求清空。 ',
          '延伸方向：移动零、按条件分区、保留最多两个重复元素、稳定过滤数组。 ',
        ],
        callout:
          '如果第 26 题是在训练你“按唯一性保留元素”，那第 27 题训练的就是“按条件保留元素”。这两个模型，是数组双指针里最常见的基本功。 ',
      },
    ],
  },
  {
    id: 'find-the-index-of-the-first-occurrence-in-a-string',
    label: '28. LeetCode 28. 找出字符串中第一个匹配项的下标',
    difficulty: '简单',
    description:
      '这题表面看只是字符串查找，但它其实是在训练最基础的“模式匹配”意识。重点不是直接调库，而是理解如何从主串里逐个位置尝试匹配模式串。 ',
    outcome:
      '你能独立写出朴素字符串匹配解法，理解双层扫描如何判断首个匹配位置，并知道为什么后面会进一步发展出 KMP 这类更高阶算法。 ',
    sections: [
      {
        id: 'fs-problem-summary',
        title: '题目在问什么',
        summary:
          '给定两个字符串 `haystack` 和 `needle`，要求返回 `needle` 在 `haystack` 中第一次出现的下标；如果不存在，就返回 `-1`。这是最经典的子串查找问题。 ',
        bullets: [
          '`haystack` 是主串，也就是被搜索的长字符串。 ',
          '`needle` 是模式串，也就是你想找的目标。 ',
          '只需要返回第一次出现的位置。 ',
          '找不到时返回 `-1`，不是 `null` 或其他值。 ',
        ],
      },
      {
        id: 'fs-core-observation',
        title: '最直接的观察：从每个可能起点试一次',
        summary:
          '如果 `needle` 想在 `haystack` 某个位置开始匹配，那么这个起点后面必须至少还能容纳下整个 `needle`。所以最朴素的思路就是：枚举每个可能起点，然后逐个字符比较。只要某个起点全部匹配成功，就立刻返回它。 ',
        bullets: [
          '起点最多只需要枚举到 `haystack.length - needle.length`。 ',
          '每个起点都尝试把模式串完整比一遍。 ',
          '中途一旦有字符不相等，就换下一个起点。 ',
          '第一次完整成功的起点就是答案。 ',
        ],
      },
      {
        id: 'fs-why-naive-still-matters',
        title: '为什么朴素解法仍然值得认真掌握',
        summary:
          '后面你会看到 KMP、BM、Rabin-Karp 这些更快的字符串匹配算法，但它们都是建立在朴素匹配的痛点之上。只有先把最直接的匹配过程写清楚，你才知道更高级算法到底优化了哪里。 ',
        bullets: [
          '朴素解法最容易写对，适合建立基础。 ',
          '它能清楚暴露“回退太多次”的性能瓶颈。 ',
          '很多简单业务场景里，朴素解法已经够用。 ',
          '学高级算法前，必须先有这个基线。 ',
        ],
        callout:
          '算法学习里，先把朴素方法吃透，不是低效，而是为了搞清楚优化真正要解决的具体问题。 ',
      },
      {
        id: 'fs-optimal-solution',
        title: '标准解法：双层遍历做朴素匹配',
        summary:
          '外层循环负责枚举主串里的每个可能起点，内层循环负责验证这个起点开始能不能和模式串完全匹配。若 `needle[j] !== haystack[i + j]`，说明这个起点失败；如果内层循环完整走完，说明从 `i` 开始匹配成功，直接返回 `i`。 ',
        bullets: [
          '时间复杂度在最坏情况下是 `O((n - m + 1) * m)`。 ',
          '额外空间复杂度是 `O(1)`。 ',
          '真正的关键是起点边界和内层比较边界不要写错。 ',
        ],
        code: `function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) {
    return 0
  }

  for (let i = 0; i <= haystack.length - needle.length; i += 1) {
    let matched = true

    for (let j = 0; j < needle.length; j += 1) {
      if (haystack[i + j] !== needle[j]) {
        matched = false
        break
      }
    }

    if (matched) {
      return i
    }
  }

  return -1
}`,
      },
      {
        id: 'fs-example-walkthrough',
        title: '拿 `haystack = "sadbutsad"`，`needle = "sad"` 手推一次',
        summary:
          '从下标 `0` 开始看，主串前三个字符刚好就是 `"sad"`，所以第一次匹配立即成功，答案就是 `0`。这题只关心第一次出现的位置，所以后面虽然还有一个 `"sad"`，也不需要继续找。 ',
        bullets: [
          '第 0 个起点就已经完整匹配成功。 ',
          '既然问的是第一次出现，找到就可以立刻返回。 ',
          '如果前几个起点失败，就继续尝试下一个起点。 ',
          '整体思路非常适合手动模拟。 ',
        ],
      },
      {
        id: 'fs-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是字符串匹配的起点题。真正学会它以后，后面的 KMP 就不再是“硬背 next 数组”，而是能明确知道它在避免哪些重复比较。 ',
        bullets: [
          '易错点 1：外层循环越界，导致 `i + j` 访问到主串边界外。 ',
          '易错点 2：找到匹配后没立即返回，结果错过第一次出现的位置。 ',
          '易错点 3：没有处理空模式串的边界。 ',
          '延伸方向：KMP、重复子串查找、最短匹配窗口、字符串哈希。 ',
        ],
        callout:
          '如果你把这题看成“遍历字符串”，会觉得很散；如果你把它看成“模式串在主串里试探性落点”，后面的字符串匹配题会清晰很多。 ',
      },
    ],
  },
  {
    id: 'divide-two-integers',
    label: '29. LeetCode 29. 两数相除',
    difficulty: '中等',
    description:
      '这题的重点不是做除法本身，而是学会在“不能直接用乘除取模”的限制下，如何把问题拆成位运算和倍增减法。它很适合训练你把一个看似基础的操作重新用底层方式构造出来。 ',
    outcome:
      '你能独立写出不使用乘法、除法和取模的整数相除解法，理解为什么可以用倍增思想快速逼近商，并处理好符号与溢出边界。 ',
    sections: [
      {
        id: 'dt-problem-summary',
        title: '题目在问什么',
        summary:
          '给定两个整数 `dividend` 和 `divisor`，要求在不使用乘法、除法和取模运算的前提下，返回它们相除后的商。结果应当截断小数部分，也就是朝零方向取整。 ',
        bullets: [
          '不能直接写 `/`、`*`、`%`。 ',
          '结果是整数商，不保留小数。 ',
          '例如 `8 / 3 = 2`，`-7 / 3 = -2`。 ',
          '还要处理 32 位有符号整数溢出边界。 ',
        ],
      },
      {
        id: 'dt-why-brute-force-is-too-slow',
        title: '为什么不能老老实实一下一下减',
        summary:
          '最直接的想法是不断做 `dividend -= divisor`，减一次就让答案加一。但如果被除数很大，这会非常慢。例如 `2^31 - 1` 除以 `1`，你要减二十多亿次，显然不可接受。 ',
        bullets: [
          '单次减法思路是对的，但效率太低。 ',
          '它的时间复杂度接近商本身的大小。 ',
          '真正需要优化的是“每次减掉多少”。 ',
          '这类题的关键常常是把线性重复操作改成倍增跳跃。 ',
        ],
      },
      {
        id: 'dt-core-idea',
        title: '核心思路：每次尽量减掉一个最大的 2 的幂倍数',
        summary:
          '既然一次减一个除数太慢，那就改成每次尽量减一个大的倍数。比如当前还能减 `divisor * 8`，就没必要只减一次 `divisor`。通过不断把除数翻倍，你就能快速找到当前还能减掉的最大块，然后把对应的商也一起累加进去。 ',
        bullets: [
          '把 `divisor` 不断翻倍，直到再翻倍就超过当前剩余被除数。 ',
          '减掉这个最大块后，继续处理剩余部分。 ',
          '每减掉一个 `divisor * 2^k`，商就增加 `2^k`。 ',
          '这本质上是在做“按二进制拆商”。 ',
        ],
        callout:
          '很多高效算法的底层直觉都类似：既然一步一步走太慢，那就先试着成倍跳。 ',
      },
      {
        id: 'dt-sign-and-boundary',
        title: '实现前先把符号和边界单独处理清楚',
        summary:
          '这题真正容易写崩的地方，不是倍增，而是边界。首先要判断最终结果是正还是负；其次要特别处理 `-2^31 / -1`，因为它会超过 32 位有符号整数上限 `2^31 - 1`。通常做法是先把两个数都转成正数的绝对值来计算，最后再补符号。 ',
        bullets: [
          '符号由被除数和除数的异号关系决定。 ',
          '`INT_MIN / -1` 是唯一会正向溢出的关键边界。 ',
          '先统一算绝对值，可以让核心逻辑更清晰。 ',
          '最后再根据符号决定是否取负。 ',
        ],
      },
      {
        id: 'dt-optimal-solution',
        title: '标准解法：倍增减法 + 位移累计商',
        summary:
          '先处理溢出边界，然后取绝对值。外层循环表示“只要剩余被除数还大于等于除数，就还能继续减”；内层循环不断把当前除数块翻倍，找到还能减的最大倍数。每次减掉这块，同时把对应的倍数加入答案。最后恢复符号即可。 ',
        bullets: [
          '时间复杂度大致是 `O(log n * log n)`，常见写法足够通过。 ',
          '额外空间复杂度是 `O(1)`。 ',
          '位移操作在这里本质上就是“乘以 2”的替代。 ',
        ],
        code: `function divide(dividend: number, divisor: number): number {
  const INT_MAX = 2 ** 31 - 1
  const INT_MIN = -(2 ** 31)

  if (dividend === INT_MIN && divisor === -1) {
    return INT_MAX
  }

  const negative = (dividend < 0) !== (divisor < 0)
  let a = Math.abs(dividend)
  const b = Math.abs(divisor)
  let result = 0

  while (a >= b) {
    let current = b
    let multiple = 1

    while ((current << 1) > 0 && (current << 1) <= a) {
      current <<= 1
      multiple <<= 1
    }

    a -= current
    result += multiple
  }

  return negative ? -result : result
}`,
      },
      {
        id: 'dt-example-walkthrough',
        title: '拿 `dividend = 10`，`divisor = 3` 手推一次',
        summary:
          '一开始 `3` 可以翻倍成 `6`，但再翻倍成 `12` 就超过 `10` 了，所以先减掉 `6`，答案加上 `2`。剩下 `4` 还能再减一个 `3`，答案再加 `1`。最后剩余 `1` 小于 `3`，结束，得到商 `3`。 ',
        bullets: [
          '第一轮找到最大的可减块是 `6`。 ',
          '第二轮只能再减一个 `3`。 ',
          '剩余部分不足以继续减时停止。 ',
          '这和把商拆成 `2 + 1` 的二进制块很像。 ',
        ],
      },
      {
        id: 'dt-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题的价值在于，它逼着你把“除法”重新理解为“倍增减法”。真正掌握后，你对位运算、指数增长和边界处理的感觉都会更好。 ',
        bullets: [
          '易错点 1：忘记处理 `INT_MIN / -1` 的溢出边界。 ',
          '易错点 2：倍增时没有同步累计 `multiple`。 ',
          '易错点 3：符号判断放在最后时写错异号逻辑。 ',
          '延伸方向：快速幂、二分查找答案、位运算优化、整数边界题。 ',
        ],
        callout:
          '如果一题限制你不能用最熟悉的运算，往往不是在刁难你，而是在逼你看见这个运算背后的更底层结构。 ',
      },
    ],
  },
  {
    id: 'substring-with-concatenation-of-all-words',
    label: '30. LeetCode 30. 串联所有单词的子串',
    difficulty: '困难',
    description:
      '这题是字符串滑动窗口的进阶版，难点在于不是匹配一个词，而是匹配一组词的组合。它很适合训练你把“单个模式匹配”升级成“多词窗口统计”。 ',
    outcome:
      '你能理解为什么这题不能直接暴力切分，掌握按单词长度分组的滑动窗口思想，并知道如何统计窗口内每个单词的出现次数。 ',
    sections: [
      {
        id: 'sc-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串 `s` 和一个字符串数组 `words`，其中 `words` 中所有单词长度相同。要求找出 `s` 中所有由 `words` 里的单词“恰好各一次”串联而成的子串起始下标。单词顺序可以任意。 ',
        bullets: [
          '每个单词长度相同，这是这题最重要的隐藏条件。 ',
          '必须恰好使用 `words` 里的每个单词一次。 ',
          '顺序可以打乱，但数量必须对齐。 ',
          '返回所有合法起点下标。 ',
        ],
      },
      {
        id: 'sc-why-brute-force-is-hard',
        title: '为什么不能直接随便切来比',
        summary:
          '如果你从每个起点开始，直接把窗口切成若干个等长单词再比对，当然能做，但会重复很多工作。更麻烦的是，起点不一定对齐到字符级，而是要按单词长度对齐，因此窗口移动方式和普通字符串题不一样。 ',
        bullets: [
          '单词是定长的，所以窗口也应该按定长步进。 ',
          '不同起点会共享很多重复统计。 ',
          '如果每次都重新统计，效率会很差。 ',
          '所以需要“按偏移分组”的滑动窗口。 ',
        ],
      },
      {
        id: 'sc-core-idea',
        title: '核心思路：按单词长度分组滑动',
        summary:
          '既然每个单词长度相同，那就可以按 `wordLength` 个字符为一个步长去移动窗口。为了覆盖所有可能起点，需要按偏移量 `0...wordLength-1` 分组。每组里维护一个窗口和词频表，右边不断加入新单词，若某个单词次数超标，就从左边缩窗，直到恢复合法。 ',
        bullets: [
          '先统计 `words` 里的目标词频。 ',
          '按单词长度分组处理不同偏移。 ',
          '右指针每次跳 `wordLength`。 ',
          '窗口词频超标时，从左侧同样按单词粒度收缩。 ',
        ],
        callout:
          '这题真正的精髓不在于字符串，而在于“窗口移动粒度”和“统计单位”必须一致。 ',
      },
      {
        id: 'sc-optimal-solution',
        title: '标准解法：分组滑动窗口 + 词频表',
        summary:
          '先建立 `words` 的目标计数字典。然后按 `0...wordLength-1` 做分组扫描：每次取出一个长度固定的单词，如果它在目标词典里，就把它纳入当前窗口计数；若当前单词出现次数超过目标次数，就移动左指针并逐个减少窗口计数。窗口里刚好装满 `words.length` 个单词时，就记录当前起点。 ',
        bullets: [
          '时间复杂度通常是 `O(n * wordLength)` 级别的分组扫描。 ',
          '额外空间复杂度是 `O(k)`，`k` 为不同单词数量。 ',
          '关键是窗口移动必须以单词为单位，而不是按字符。 ',
        ],
        code: `function findSubstring(s: string, words: string[]): number[] {
  if (words.length === 0) {
    return []
  }

  const wordLength = words[0].length
  const totalLength = wordLength * words.length
  const target = new Map<string, number>()

  for (const word of words) {
    target.set(word, (target.get(word) ?? 0) + 1)
  }

  const result: number[] = []

  for (let offset = 0; offset < wordLength; offset += 1) {
    let left = offset
    let right = offset
    let matched = 0
    const window = new Map<string, number>()

    while (right + wordLength <= s.length) {
      const word = s.slice(right, right + wordLength)
      right += wordLength

      if (!target.has(word)) {
        window.clear()
        matched = 0
        left = right
        continue
      }

      window.set(word, (window.get(word) ?? 0) + 1)
      matched += 1

      while ((window.get(word) ?? 0) > (target.get(word) ?? 0)) {
        const leftWord = s.slice(left, left + wordLength)
        window.set(leftWord, (window.get(leftWord) ?? 0) - 1)
        left += wordLength
        matched -= 1
      }

      if (matched === words.length) {
        result.push(left)
      }
    }
  }

  return result
}`,
      },
      {
        id: 'sc-example-walkthrough',
        title:
          '拿 `s = "barfoothefoobarman"`，`words = ["foo","bar"]` 手推一次',
        summary:
          '按长度 3 分组后，起点 `0` 处看到 `"bar"` 再看到 `"foo"`，刚好凑齐一组，所以记录 `0`。继续往后滚动，在起点 `9` 处又能看到 `"foo"` 和 `"bar"` 的组合，所以再记录 `9`。最终答案是 `[0, 9]`。 ',
        bullets: [
          '每次窗口都按 3 个字符读取。 ',
          '一旦单词超标，就从左边缩回去。 ',
          '窗口刚好装满目标单词数时，当前左边界就是答案。 ',
          '不同偏移分组能覆盖所有可能起点。 ',
        ],
      },
      {
        id: 'sc-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题是滑动窗口里很典型的“窗口单位必须对齐”的例子。学会它以后，你会更容易看出很多字符串题其实是在做词频窗口管理，而不是单纯比较字符串。 ',
        bullets: [
          '易错点 1：按字符而不是按单词移动窗口。 ',
          '易错点 2：忘记按偏移分组，漏掉合法起点。 ',
          '易错点 3：窗口超标后没有持续左移到合法为止。 ',
          '延伸方向：最小覆盖子串、重复词统计、定长窗口枚举、字符串哈希。 ',
        ],
        callout:
          '如果第 28 题是在做“单个模式串匹配”，那第 30 题就是在做“一组模式串的组合匹配”。难度上了一个台阶，但本质仍然是窗口和统计。 ',
      },
    ],
  },
  {
    id: 'next-permutation',
    label: '31. LeetCode 31. 下一个排列',
    difficulty: '中等',
    description:
      '这题是经典的“字典序下一个状态”问题。重点不是把数组乱交换，而是理解如何在原地把当前排列变成“刚好大一点点”的下一个排列。 ',
    outcome:
      '你能独立写出下一个排列的原地解法，理解为什么要从右往左找转折点、为什么要反转后缀，以及这套流程为什么能保证得到最小的更大排列。 ',
    sections: [
      {
        id: 'np-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数数组 `nums`，它代表一个排列。你需要就地将其变成字典序中的下一个更大的排列。如果不存在更大的排列，就把它变成最小的排列，也就是升序排列。 ',
        bullets: [
          '要求原地修改数组。 ',
          '如果已经是最大排列，就回到最小排列。 ',
          '只需要找到“刚好大一点点”的下一个状态。 ',
          '这不是随便找一个更大的排列，而是最接近当前排列的那个。 ',
        ],
      },
      {
        id: 'np-why-right-to-left',
        title: '为什么一定要从右往左看',
        summary:
          '如果从左往右找，很容易改过头；但从右往左看，你可以先锁定后缀中已经尽可能大的那一段。只要找到第一个满足 `nums[i] < nums[i + 1]` 的位置，就说明它右边那一段已经是“下降到头”的状态，而真正能变化的，只剩这个转折点。 ',
        bullets: [
          '右侧后缀越靠右，越接近局部最优。 ',
          '第一个下降点就是可调整的边界。 ',
          '只动最右边能变的部分，才能保证变化最小。 ',
          '这就是字典序里“下一个”的核心。 ',
        ],
        callout:
          '很多排列题的关键都不是“怎么交换”，而是“到底该从哪一边开始找边界”。 ',
      },
      {
        id: 'np-core-idea',
        title: '核心思路：找转折点、找替换项、反转后缀',
        summary:
          '整个流程可以拆成三步。第一步，从右往左找第一个下降点 `i`；第二步，在它右边找到第一个比它大的元素 `j`，并交换这两个元素；第三步，把 `i` 后面的后缀反转成升序，这样就能保证得到最小的更大排列。 ',
        bullets: [
          '转折点左边尽量不动。 ',
          '只在右边找到一个刚刚好更大的替换值。 ',
          '交换后，后缀要变成最小状态。 ',
          '反转后缀比重新排序更高效。 ',
        ],
      },
      {
        id: 'np-optimal-solution',
        title: '标准解法：三步完成原地变换',
        summary:
          '先从右向左找第一个 `nums[i] < nums[i + 1]` 的位置 `i`。如果没有找到，说明整个数组已经是最大排列，直接整体反转即可。如果找到了，再从右向左找第一个比 `nums[i]` 大的元素 `j`，交换两者，最后把 `i + 1` 到末尾的后缀反转。 ',
        bullets: [
          '时间复杂度是 `O(n)`。 ',
          '额外空间复杂度是 `O(1)`。 ',
          '后缀反转是确保“下一个”而不是“随便一个更大排列”的关键。 ',
        ],
        code: `function nextPermutation(nums: number[]): void {
  let i = nums.length - 2

  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i -= 1
  }

  if (i >= 0) {
    let j = nums.length - 1

    while (j >= 0 && nums[j] <= nums[i]) {
      j -= 1
    }

    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }

  let left = i + 1
  let right = nums.length - 1

  while (left < right) {
    ;[nums[left], nums[right]] = [nums[right], nums[left]]
    left += 1
    right -= 1
  }
}`,
      },
      {
        id: 'np-example-walkthrough',
        title: '拿 `[1,2,3]` 手推一次',
        summary:
          '从右往左看，`2 < 3`，所以转折点在 `2`。在它右边找第一个比 `2` 大的数，就是 `3`，交换后得到 `[1,3,2]`。后缀只有一个数，不需要额外反转，所以答案就是 `[1,3,2]`。 ',
        bullets: [
          '先找转折点，再找替换项。 ',
          '交换后缀就会变成最小的排列形式。 ',
          '结果比原数组大，但又尽量小。 ',
          '这就是字典序“下一个”的含义。 ',
        ],
      },
      {
        id: 'np-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题非常适合训练你对“字典序”这种抽象顺序的直觉。只要流程掌握清楚，后面很多排列和组合题就不会只会背模板。 ',
        bullets: [
          '易错点 1：找到转折点后，交换对象找错方向。 ',
          '易错点 2：交换后忘记反转后缀。 ',
          '易错点 3：没处理“已经是最大排列”的情况。 ',
          '延伸方向：全排列、字典序排名、排列组合、下一个更大元素。 ',
        ],
        callout:
          '如果你把这题理解成“找一个更大的数列”，就容易写偏；如果你把它理解成“在所有更大的排列里找最小的那个”，整个流程就自然了。 ',
      },
    ],
  },
  {
    id: 'longest-valid-parentheses',
    label: '32. LeetCode 32. 最长有效括号',
    difficulty: '困难',
    description:
      '这题是括号类问题里非常经典的一题。它的核心不是“匹配括号”这么简单，而是要在连续字符串里找出最长的合法片段。你会在这题里真正接触到栈、动态规划和边界处理的组合思维。',
    outcome:
      '你能独立写出最长有效括号的常见解法，理解为什么单纯数左右括号不够，知道如何用栈或动态规划维护“当前位置之前的最长合法长度”。',
    sections: [
      {
        id: 'lvp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含 `(` 和 `)` 的字符串 `s`，找出其中最长的有效括号子串长度。这里的有效括号必须连续，且括号配对完全正确。',
        bullets: [
          '要求的是连续子串，不是子序列。',
          '合法括号必须左右成对，且嵌套顺序正确。',
          '返回的是最长长度，不是具体子串。',
          '这题最难的地方在于“连续”与“合法”要同时成立。',
        ],
      },
      {
        id: 'lvp-brute-force',
        title: '为什么暴力法很容易超时',
        summary:
          '最直观的想法是枚举所有子串，再判断它是不是有效括号。这个思路能做，但子串数量太多，判断过程也重复，很快就会变慢。',
        bullets: [
          '枚举所有起点和终点。',
          '对每个子串单独做括号合法性检查。',
          '时间复杂度高，重复工作非常多。',
          '真正需要的是能在扫描过程中保留“历史合法信息”。',
        ],
      },
      {
        id: 'lvp-stack-idea',
        title: '栈思路：记录“最后一个不合法位置”',
        summary:
          '栈解法的关键不是只存括号，而是存下标。遇到 `(` 就入栈，遇到 `)` 就弹栈；如果弹完后栈空了，说明当前 `)` 之前没有可匹配的左括号，需要把当前位置作为新的边界；如果栈不空，就可以用当前下标减去栈顶下标，算出一个合法长度。',
        bullets: [
          '栈里存的是下标，不是字符。',
          '初始时可以先放一个 `-1` 作为边界哨兵。',
          '遇到不能匹配的右括号时，更新边界。',
          '只要栈不空，就能计算当前位置结尾的合法长度。',
        ],
        callout:
          '这题里，`-1` 这个哨兵非常关键。它不是为了参与计算，而是为了让“第一个合法片段”的长度也能自然算出来。',
      },
      {
        id: 'lvp-dp-idea',
        title: '动态规划思路：当前位置结尾的最长合法长度',
        summary:
          '动态规划的定义通常是 `dp[i]` 表示以 `i` 位置字符结尾的最长有效括号长度。这样一来，问题就被拆成了“当前字符能否和前面的某个左括号形成配对”以及“配对后还能接上多长的历史合法段”。',
        bullets: [
          "如果 `s[i] === '('`，那 `dp[i] = 0`。",
          "如果 `s[i] === ')'`，就去找它前面可能匹配的左括号。",
          '如果能配对，还要把前一个合法段的长度拼起来。',
          '这类题的本质是“当前位置结尾的最优值”。',
        ],
      },
      {
        id: 'lvp-optimal-solution',
        title: '标准解法：栈 + 下标边界',
        summary:
          '最常见也最容易理解的做法是用一个下标栈。先压入 `-1` 作为基准边界。遍历字符串时，遇到 `(` 就压下标；遇到 `)` 就弹栈，如果弹完栈空了，就把当前下标压回去作为新的边界；如果栈不空，就用当前下标减去栈顶下标更新最大长度。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`，最坏情况下栈里全是左括号下标。',
          '边界哨兵是这个解法稳定运行的关键。',
        ],
        code: `function longestValidParentheses(s: string): number {
  const stack: number[] = [-1]
  let maxLength = 0

  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === '(') {
      stack.push(i)
      continue
    }

    stack.pop()

    if (stack.length === 0) {
      stack.push(i)
      continue
    }

    maxLength = Math.max(maxLength, i - stack[stack.length - 1])
  }

  return maxLength
}`,
      },
      {
        id: 'lvp-example-walkthrough',
        title: '拿 `s = "(()())"` 手推一次',
        summary:
          '从左到右扫描时，左括号不断入栈；遇到右括号时弹栈并计算当前长度。这个例子里整段字符串最终都能配平，所以最长有效括号长度就是 6。',
        bullets: [
          '初始栈是 `[-1]`。',
          '前两个 `(` 依次入栈。',
          '遇到 `)` 时弹栈，若栈非空，就计算当前合法长度。',
          '整段字符串都合法，所以最终答案是整串长度 6。',
        ],
      },
      {
        id: 'lvp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题经常卡在边界处理上。只要你把“栈里存下标”“`-1` 作为边界”“遇到非法右括号时重置边界”这三点理清，就很容易写对。',
        bullets: [
          '易错点 1：栈里存字符而不是下标。',
          '易错点 2：忘记初始化 `-1` 边界。',
          '易错点 3：遇到无法匹配的右括号后不重置边界。',
          '延伸方向：括号生成、括号匹配、最小插入次数、区间合法性判断。',
        ],
        callout:
          '如果你把这题只看成“括号匹配”，会觉得它和栈题差不多；但它真正训练的是“如何在连续区间里维护合法边界”。',
      },
    ],
  },
  {
    id: 'search-rotated-sorted-array',
    label: '33. LeetCode 33. 搜索旋转排序数组',
    difficulty: '中等',
    description:
      '这题是二分查找的经典变体。数组原本有序，但被某个位置旋转了一下。你要做的不是重新排序，而是在局部有序的前提下，快速判断目标值在哪一边。',
    outcome:
      '你能独立写出搜索旋转排序数组的二分解法，理解为什么每一轮都能先判断哪一侧有序，再把搜索范围缩小到正确半边。',
    sections: [
      {
        id: 'sra-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个没有重复元素的升序数组 `nums`，它被某个未知位置旋转过。现在给你一个目标值 `target`，要求你返回它在数组中的下标；如果不存在，返回 `-1`。',
        bullets: [
          '数组原本是升序的，只是被旋转过。',
          '数组中没有重复元素，这一点非常关键。',
          '要求的是下标，不是元素本身。',
          '题目核心是利用局部有序来做二分。',
        ],
      },
      {
        id: 'sra-brute-force',
        title: '为什么不能直接线性扫',
        summary:
          '当然可以从头到尾扫一遍，但这会浪费掉“数组整体有序”这个重要信息。既然题目给了有序结构，就应该把它转化成更快的查找过程。',
        bullets: [
          '线性扫描时间复杂度是 `O(n)`。',
          '题目希望你使用二分，把复杂度压到 `O(log n)`。',
          '真正要利用的是“旋转后仍然有两段局部有序”。',
        ],
      },
      {
        id: 'sra-core-idea',
        title: '核心思路：先判断哪一边有序',
        summary:
          '每次取中点 `mid` 后，左半边或右半边至少有一边是有序的。先判断哪一边有序，再看 `target` 是否落在这一边的范围内。如果在，就继续往这边缩；如果不在，就去另一边找。',
        bullets: [
          '如果 `nums[left] <= nums[mid]`，说明左半边有序。',
          '如果左半边有序，就判断 `target` 是否落在 `[nums[left], nums[mid])`。',
          '否则右半边一定有序，再判断目标是否落在右半边范围内。',
          '每轮都能砍掉一半搜索区间，所以仍然是二分。',
        ],
        callout:
          '这题不是“判断中点值和目标值的大小”，而是“判断哪一侧有序，再判断目标是否属于这一侧”。这是旋转数组二分的灵魂。',
      },
      {
        id: 'sra-optimal-solution',
        title: '标准解法：局部有序 + 二分收缩',
        summary:
          '维护 `left` 和 `right`。每轮先看 `mid`，判断左半边是否有序；如果有序，就检查目标是否落在左半边范围内。若是，收缩到左边，否则去右边。若右半边有序，则反过来判断。这个过程直到找到目标或区间为空。',
        bullets: [
          '时间复杂度是 `O(log n)`。',
          '空间复杂度是 `O(1)`。',
          '关键点是每轮都要先判断“哪一边有序”。',
        ],
        code: `function search(nums: number[], target: number): number {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (nums[mid] === target) {
      return mid
    }

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }

  return -1
}`,
      },
      {
        id: 'sra-example-walkthrough',
        title: '拿 `[4,5,6,7,0,1,2]` 手推一次',
        summary:
          '目标值如果是 `0`，中点先落在 `7` 附近。此时左半边 `[4,5,6,7]` 是有序的，但 `0` 不在这个范围内，所以直接去右半边 `[0,1,2]`。继续二分后很快就能找到 `0` 的位置。',
        bullets: [
          '第一轮先判断左半边有序。',
          '目标不在左半边范围内，所以排除左边。',
          '第二轮继续在右半边二分。',
          '因为每轮都排除掉一半区间，所以搜索仍然很快。',
        ],
      },
      {
        id: 'sra-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最容易写错的地方，是只盯着中点值和目标值比较，却忘了先判断哪边有序。只要顺序搞对，整题其实就很稳定。',
        bullets: [
          '易错点 1：没有先判断哪一边有序。',
          '易错点 2：目标区间判断时边界写反。',
          '易错点 3：忘了数组没有重复元素这个前提。',
          '延伸方向：搜索旋转数组 II、寻找旋转点、二分答案题。',
        ],
        callout:
          '这题训练的是二分的“区间判断能力”。会写普通二分，不代表会写旋转数组二分；但只要你学会先找有序半边，很多变体都能套出来。',
      },
    ],
  },
  {
    id: 'find-first-and-last-position-of-element-in-sorted-array',
    label: '34. LeetCode 34. 在排序数组中查找元素的第一个和最后一个位置',
    difficulty: '中等',
    description:
      '这题是二分查找里非常重要的一道边界题。难点不在于“找到一个 target”，而在于稳定找出最左边界和最右边界。很多人会写普通二分，但一到边界定位就开始混乱，这题正好用来补这个短板。',
    outcome:
      '你能独立写出查找第一个位置和最后一个位置的双二分解法，理解为什么“找左边界”和“找右边界”本质上是两个不同的二分问题。',
    sections: [
      {
        id: 'ffl-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个按照非递减顺序排列的整数数组 `nums`，以及一个目标值 `target`。如果目标值存在，返回它在数组中的第一个位置和最后一个位置；如果不存在，返回 `[-1, -1]`。',
        bullets: [
          '数组已经有序，这是使用二分的基础。',
          '返回的是一个区间 `[first, last]`。',
          '如果目标不存在，两个位置都要返回 `-1`。',
          '重点不是找到一个位置，而是精确定位左右边界。',
        ],
      },
      {
        id: 'ffl-why-one-binary-search-is-not-enough',
        title: '为什么普通二分找到一个位置还不够',
        summary:
          '普通二分一旦命中 `target` 就会返回，但它返回的是哪个位置并不确定。要找最左位置和最右位置，必须在命中后继续朝一个方向逼近边界，因此通常要拆成两个独立二分。',
        bullets: [
          '命中目标不等于命中左边界。',
          '命中目标也不等于命中右边界。',
          '边界题常常不是“找到就停”，而是“找到后继续缩”。',
        ],
      },
      {
        id: 'ffl-core-idea',
        title: '核心思路：左边界和右边界分别找',
        summary:
          '查找左边界时，只要 `nums[mid] >= target`，就继续往左收缩；查找右边界时，只要 `nums[mid] <= target`，就继续往右收缩。两次二分结束后，再组合出最终区间。',
        bullets: [
          '左边界二分的目标是第一个满足 `nums[i] >= target` 的位置。',
          '右边界二分的目标是第一个满足 `nums[i] > target` 的位置减一。',
          '这类写法往往比“命中后继续扫”更稳定，也更清晰。',
          '边界二分的关键在于循环不变量，而不是背模板。',
        ],
        callout:
          '很多边界二分题的本质，都是在找“第一个满足某个条件的位置”。只要你会把问题翻译成这个形式，代码就会简单很多。',
      },
      {
        id: 'ffl-optimal-solution',
        title: '标准解法：两次边界二分',
        summary:
          '先写一个函数 `lowerBound`，返回数组中第一个大于等于 `target` 的位置。左边界就是 `lowerBound(target)`，右边界则是 `lowerBound(target + 1) - 1`。最后再检查左边界是否越界或是否真的等于 `target`，决定是否返回有效结果。',
        bullets: [
          '时间复杂度是 `O(log n)`。',
          '空间复杂度是 `O(1)`。',
          '把通用边界函数抽出来后，很多题都能复用。',
        ],
        code: `function searchRange(nums: number[], target: number): number[] {
  const lowerBound = (value: number) => {
    let left = 0
    let right = nums.length

    while (left < right) {
      const mid = Math.floor((left + right) / 2)

      if (nums[mid] >= value) {
        right = mid
      } else {
        left = mid + 1
      }
    }

    return left
  }

  const first = lowerBound(target)

  if (first === nums.length || nums[first] !== target) {
    return [-1, -1]
  }

  const last = lowerBound(target + 1) - 1
  return [first, last]
}`,
      },
      {
        id: 'ffl-example-walkthrough',
        title: '拿 `[5,7,7,8,8,10]` 手推一次',
        summary:
          '如果 `target = 8`，左边界二分会定位到第一个 `8` 的位置 `3`。然后再查找第一个大于等于 `9` 的位置，得到 `5`，减一后就是最后一个 `8` 的位置 `4`。最终答案是 `[3, 4]`。',
        bullets: [
          '第一次二分找的是“第一个 >= 8”。',
          '第二次二分找的是“第一个 >= 9”。',
          '第二次结果减一，就是右边界。',
          '这种方式比命中后左右扩展更高效。',
        ],
      },
      {
        id: 'ffl-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最容易出错的是边界定义。只要你对 `left < right`、`right = nums.length` 这种半开区间写法不熟，就很容易 off-by-one。把区间语义统一之后，这类题会顺很多。',
        bullets: [
          '易错点 1：普通二分命中后直接返回。',
          '易错点 2：右边界二分后忘记减一。',
          '易错点 3：没有检查左边界是否真的命中目标。',
          '延伸方向：搜索插入位置、第一个错误版本、峰值元素、边界统计题。',
        ],
        callout:
          '普通二分是在找“有没有”，边界二分是在找“第一个/最后一个”。一旦你把这两件事混在一起，代码就会开始不稳定。',
      },
    ],
  },
  {
    id: 'search-insert-position',
    label: '35. LeetCode 35. 搜索插入位置',
    difficulty: '简单',
    description:
      '这题表面看很简单，实际上是学习“二分边界思维”的入门题。它不是只问你元素是否存在，而是要求你在不存在时也能给出正确的插入位置，这就要求你真正理解二分在找什么。',
    outcome:
      '你能独立写出搜索插入位置的二分解法，理解为什么答案本质上是“第一个大于等于 target 的位置”，并把这种思路迁移到更多边界题中。',
    sections: [
      {
        id: 'sip-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个升序排列的整数数组 `nums` 和一个目标值 `target`。如果目标值存在，返回它的下标；如果不存在，返回它应该按顺序插入的位置。',
        bullets: [
          '数组已经有序，这是使用二分的前提。',
          '如果目标存在，答案就是它当前的下标。',
          '如果目标不存在，答案是把它插进去后仍保持有序的位置。',
          '本质是在找一个边界位置，不只是找某个元素。',
        ],
      },
      {
        id: 'sip-why-brute-force-is-wasteful',
        title: '为什么不直接从左到右找',
        summary:
          '当然可以线性扫描，遇到第一个大于等于 `target` 的元素就返回下标。但数组既然已经有序，就没必要逐个比较。二分可以把查找过程从 `O(n)` 压到 `O(log n)`。',
        bullets: [
          '线性扫描时间复杂度是 `O(n)`。',
          '有序数组最适合用二分处理。',
          '题目规模一大，二分优势会非常明显。',
        ],
      },
      {
        id: 'sip-core-idea',
        title: '核心思路：找第一个大于等于 target 的位置',
        summary:
          '这题最关键的转换是：答案不是“target 在哪”，而是“第一个大于等于 target 的位置在哪”。如果 target 存在，这个位置就是它本身；如果不存在，这个位置就是应该插入的位置。',
        bullets: [
          '当 `nums[mid] >= target` 时，答案可能在 `mid` 或它左边。',
          '当 `nums[mid] < target` 时，答案一定在右边。',
          '最终 `left` 停下来的位置，就是第一个满足条件的位置。',
          '如果所有元素都小于 `target`，答案就是数组长度 `nums.length`。',
        ],
        callout:
          '很多二分题都不是在找“某个值”，而是在找“第一个满足条件的位置”。这题就是最经典的入门模板。',
      },
      {
        id: 'sip-optimal-solution',
        title: '标准解法：半开区间二分',
        summary:
          '使用半开区间 `[left, right)` 写法，初始化 `left = 0`、`right = nums.length`。每轮取中点 `mid`，如果 `nums[mid] >= target`，就收缩右边界到 `mid`；否则收缩左边界到 `mid + 1`。循环结束时，`left` 就是答案。',
        bullets: [
          '时间复杂度是 `O(log n)`。',
          '空间复杂度是 `O(1)`。',
          '统一使用半开区间后，边界会更稳定。',
        ],
        code: `function searchInsert(nums: number[], target: number): number {
  let left = 0
  let right = nums.length

  while (left < right) {
    const mid = Math.floor((left + right) / 2)

    if (nums[mid] >= target) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}`,
      },
      {
        id: 'sip-example-walkthrough',
        title: '拿 `[1,3,5,6]` 手推一次',
        summary:
          '如果 `target = 5`，二分最后会停在下标 `2`，因为这里正好是第一个大于等于 `5` 的位置。如果 `target = 2`，最终会停在下标 `1`，表示它应该插在 `1` 和 `3` 之间。若 `target = 7`，则所有元素都比它小，答案就是 `4`。',
        bullets: [
          '找已有元素时，结果是它原本的位置。',
          '找不存在元素时，结果是应插入的位置。',
          '如果目标比所有元素都大，答案就是数组末尾。',
          '这正是边界二分比普通二分更强的地方。',
        ],
      },
      {
        id: 'sip-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最容易错的地方，是还在用“命中就返回”的普通二分思维。真正稳定的写法，是直接把问题当作边界查找来做。这样以后做查找区间、插入位置、lowerBound/upperBound 一类题时都会更顺手。',
        bullets: [
          '易错点 1：把它写成普通二分，找不到时再临时补边界。',
          '易错点 2：没有统一区间写法，导致边界混乱。',
          '易错点 3：忘了目标可能插在数组最后面。',
          '延伸方向：第一个大于等于 x、最后一个小于等于 x、搜索范围题。',
        ],
        callout:
          '如果你把这题彻底吃透，后面的边界二分会轻松很多，因为它训练的是“答案是一个位置边界”的思维方式。',
      },
    ],
  },
  {
    id: 'valid-sudoku',
    label: '36. LeetCode 36. 有效的数独',
    difficulty: '中等',
    description:
      '这题不是让你去解数独，而是判断一个已经填了一部分的 9x9 棋盘是否有效。真正训练的是“多维约束校验”能力，也就是如何同时校验行、列、九宫格三个规则，并把判断过程写得清晰稳定。',
    outcome:
      '你能独立写出校验数独有效性的解法，理解为什么要同时记录行、列、九宫格中的数字出现情况，并掌握这类规则校验题的通用写法。',
    sections: [
      {
        id: 'vs-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个 9x9 的数独棋盘，判断当前填入的数字是否有效。有效的意思是：每一行、每一列、每一个 3x3 九宫格内，数字 `1` 到 `9` 都不能重复。空格用 `.` 表示，可以忽略。',
        bullets: [
          '题目只要求判断当前状态是否合法，不要求把数独解出来。',
          '空格 `.` 不参与重复判断。',
          '重复可能发生在行、列、九宫格任意一个维度。',
          '核心是把三个维度的校验同时做好。',
        ],
      },
      {
        id: 'vs-why-direct-scanning-gets-messy',
        title: '为什么只靠肉眼式遍历容易写乱',
        summary:
          '如果你一边遍历一边临时去检查当前数字在整行、整列、整宫里是否重复，代码会非常绕，而且会反复扫描同一批数据。更稳定的方式是遍历一次棋盘，同时把每个数字出现过的位置记录下来。',
        bullets: [
          '每遇到一个数字，都要确认它在三个维度里都没出现过。',
          '如果临时重复扫描，逻辑会变复杂，效率也不高。',
          '记录状态比反复查找更适合这类约束题。',
        ],
      },
      {
        id: 'vs-core-idea',
        title: '核心思路：行、列、九宫格分别做去重记录',
        summary:
          '准备三个记录结构：`rows`、`cols`、`boxes`。遍历棋盘时，遇到数字就分别检查它是否已经出现在当前行、当前列、当前九宫格中。如果出现过，直接返回 `false`；如果没出现，就把它登记进去。遍历结束都没冲突，说明合法。',
        bullets: [
          '`rows[i]` 记录第 `i` 行出现过哪些数字。',
          '`cols[j]` 记录第 `j` 列出现过哪些数字。',
          '`boxes[k]` 记录第 `k` 个九宫格出现过哪些数字。',
          '九宫格编号可以用 `Math.floor(i / 3) * 3 + Math.floor(j / 3)` 计算。',
        ],
        callout:
          '这题的关键不是数独知识，而是“一个元素要同时满足多个约束”的建模能力。很多表单校验、权限校验、状态约束题，本质上都是这一类思路。',
      },
      {
        id: 'vs-optimal-solution',
        title: '标准解法：一次遍历 + 三组 Set',
        summary:
          '用长度为 9 的数组分别存储行、列、九宫格的 `Set`。遍历整个棋盘，跳过 `.`。对于每个数字，先算出它所在的九宫格编号，再检查对应的三个 `Set` 里是否已存在。若存在则非法，否则同时加入这三个集合。整张表只遍历一次，逻辑清晰而且足够快。',
        bullets: [
          '时间复杂度是 `O(81)`，也可以视为 `O(1)`。',
          '空间复杂度是 `O(81)`，同样是常数级。',
          '这类固定规模棋盘题，重点在写法稳定，而不是复杂度卷得多低。',
        ],
        code: `function isValidSudoku(board: string[][]): boolean {
  const rows = Array.from({ length: 9 }, () => new Set<string>())
  const cols = Array.from({ length: 9 }, () => new Set<string>())
  const boxes = Array.from({ length: 9 }, () => new Set<string>())

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j]

      if (value === '.') {
        continue
      }

      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)

      if (
        rows[i].has(value) ||
        cols[j].has(value) ||
        boxes[boxIndex].has(value)
      ) {
        return false
      }

      rows[i].add(value)
      cols[j].add(value)
      boxes[boxIndex].add(value)
    }
  }

  return true
}`,
      },
      {
        id: 'vs-example-walkthrough',
        title: '九宫格编号怎么理解',
        summary:
          '比如位置 `(4, 7)`，也就是第 5 行第 8 列。`Math.floor(4 / 3) = 1`，`Math.floor(7 / 3) = 2`，所以九宫格编号是 `1 * 3 + 2 = 5`。也就是说，它属于第二行第三列的那个 3x3 宫。只要这个编号公式算对，九宫格校验就不会乱。',
        bullets: [
          '前 3 行对应九宫格大行 0，中间 3 行对应 1，后 3 行对应 2。',
          '前 3 列对应九宫格大列 0，中间 3 列对应 1，后 3 列对应 2。',
          '九宫格编号本质上是二维坐标转一维索引。',
          '这个映射公式是这题最值得记住的细节之一。',
        ],
      },
      {
        id: 'vs-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最容易错的不是 Set 的用法，而是九宫格编号和空格处理。只要你把这两个点写稳，再加上行列记录，整题就很直接。以后碰到类似“多个维度同时去重”的题，也可以沿用同一套结构。',
        bullets: [
          '易错点 1：把 `.` 也当成普通字符参与校验。',
          '易错点 2：九宫格编号公式写错，导致重复落到错误分组。',
          '易错点 3：只校验了行列，忘了校验九宫格。',
          '延伸方向：解数独、矩阵约束校验、棋盘类状态判定题。',
        ],
        callout:
          '会做这题，说明你已经能把“规则”翻译成“数据结构约束”。这比单纯刷出答案更重要，因为它能迁移到很多业务场景里。',
      },
    ],
  },
  {
    id: 'sudoku-solver',
    label: '37. LeetCode 37. 解数独',
    difficulty: '困难',
    description:
      '这题和上一题是天然衔接的进阶版。上一题是在校验规则，这一题是在规则约束下把整张棋盘补完整。真正训练的是回溯搜索、状态维护和剪枝思维，而不是把所有空格一股脑暴力尝试。',
    outcome:
      '你能独立写出解数独的回溯解法，理解为什么要同步维护行、列、九宫格状态，并掌握“尝试 - 递归 - 撤销”这套回溯核心流程。',
    sections: [
      {
        id: 'ss-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个 `9 x 9` 的数独棋盘，空格用 `.` 表示。你需要原地填充这张表，使它成为一个合法数独，并且题目保证输入只有唯一解。',
        bullets: [
          '要求直接修改原棋盘，而不是返回一份新棋盘。',
          '每个空格都要填 `1` 到 `9` 中的某一个数字。',
          '填入后必须同时满足行、列、九宫格三个维度不重复。',
          '题目保证有唯一解，所以只要搜到一个合法答案就可以停。',
        ],
      },
      {
        id: 'ss-why-brute-force-explodes',
        title: '为什么不能把所有空格都无脑穷举',
        summary:
          '如果一个空格有 9 种可能，几十个空格连乘起来会非常夸张。真正的问题不是“会不会试”，而是如果每次尝试都不做约束过滤，搜索树会瞬间爆炸。所以这题的关键是边尝试边剪枝，而不是单纯暴力枚举。',
        bullets: [
          '每个空格最多有 9 种候选数字。',
          '如果不利用已有数字做剪枝，搜索空间会非常大。',
          '数独题天然适合回溯，因为一旦当前选择冲突，就应该立刻撤回。',
          '“尽早发现不合法”比“尝试更多可能”更重要。',
        ],
      },
      {
        id: 'ss-core-idea',
        title: '核心思路：回溯 + 行列宫状态表',
        summary:
          '先遍历棋盘，把已经存在的数字登记到三组状态结构里：行 `rows`、列 `cols`、九宫格 `boxes`。然后收集所有空格位置。回溯时，对当前空格尝试填 `1` 到 `9`，只要某个数字在行、列、宫里都没出现过，就可以填进去并继续递归；如果后面走不通，再撤销这一步，继续试下一个数字。',
        bullets: [
          '`rows[r]` 记录第 `r` 行用过哪些数字。',
          '`cols[c]` 记录第 `c` 列用过哪些数字。',
          '`boxes[b]` 记录第 `b` 个九宫格用过哪些数字。',
          '每次递归只处理一个空格，处理完就进入下一个空格。',
        ],
        callout:
          '回溯题的本质不是“会递归”，而是你能不能把状态维护干净。试一个值时加状态，撤销时减状态，这个动作必须完全对称。',
      },
      {
        id: 'ss-optimal-solution',
        title: '标准解法：DFS 回溯搜索',
        summary:
          '这题的标准写法是深度优先搜索配合状态表。先预处理所有空格，再写一个 `dfs(index)` 表示当前处理第 `index` 个空格。若 `index === spaces.length`，说明所有空格都填完了。否则枚举 `1` 到 `9`，挑合法的数字填入、递归、失败后撤销。因为状态表能做到 `O(1)` 检查合法性，所以实际效率会高很多。',
        bullets: [
          '合法性判断由 Set 完成，复杂度非常低。',
          '时间复杂度没有简单闭式表达，本质取决于剪枝效果。',
          '空间复杂度主要来自递归栈和状态表。',
          '这类题写法上最重要的是“填入、递归、撤销”三步严格成对。',
        ],
        code: `function solveSudoku(board: string[][]): void {
  const rows = Array.from({ length: 9 }, () => new Set<string>())
  const cols = Array.from({ length: 9 }, () => new Set<string>())
  const boxes = Array.from({ length: 9 }, () => new Set<string>())
  const spaces: Array<[number, number]> = []

  const getBoxIndex = (row: number, col: number) =>
    Math.floor(row / 3) * 3 + Math.floor(col / 3)

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const value = board[row][col]

      if (value === '.') {
        spaces.push([row, col])
        continue
      }

      rows[row].add(value)
      cols[col].add(value)
      boxes[getBoxIndex(row, col)].add(value)
    }
  }

  const dfs = (index: number): boolean => {
    if (index === spaces.length) {
      return true
    }

    const [row, col] = spaces[index]
    const boxIndex = getBoxIndex(row, col)

    for (let digit = 1; digit <= 9; digit += 1) {
      const value = String(digit)

      if (
        rows[row].has(value) ||
        cols[col].has(value) ||
        boxes[boxIndex].has(value)
      ) {
        continue
      }

      board[row][col] = value
      rows[row].add(value)
      cols[col].add(value)
      boxes[boxIndex].add(value)

      if (dfs(index + 1)) {
        return true
      }

      board[row][col] = '.'
      rows[row].delete(value)
      cols[col].delete(value)
      boxes[boxIndex].delete(value)
    }

    return false
  }

  dfs(0)
}`,
      },
      {
        id: 'ss-search-process',
        title: '回溯过程到底怎么推进',
        summary:
          '假设当前处理某个空格 `(r, c)`。如果数字 `1` 合法，就先填进去，然后递归处理下一个空格；如果后面的某一步发现没有任何数字可填，说明当前这条路走不通，就回到 `(r, c)`，把 `1` 撤销，再试 `2`。这就是回溯的本质：先做选择，失败就撤回，换别的选择继续试。',
        bullets: [
          '当前空格先试第一个合法值。',
          '递归进入下一层，相当于把问题规模缩小一格。',
          '如果后续失败，撤销当前值和对应状态。',
          '一旦某条路径成功填完整盘，递归会层层返回 true。',
        ],
      },
      {
        id: 'ss-pruning-and-mistakes',
        title: '易错点、剪枝方向和延伸题',
        summary:
          '这题最容易错的，是状态维护不对称。你填进去时加了哪些记录，撤销时就必须删掉同样的记录。除此之外，如果你想继续优化，还可以加入“优先填候选最少的空格”这种剪枝策略，让搜索树更浅。数独题本身是经典回溯题模板，学透后会对很多组合搜索题有帮助。',
        bullets: [
          '易错点 1：回溯撤销时忘了把行、列、宫中的记录删掉。',
          '易错点 2：九宫格编号公式写错，导致状态校验失真。',
          '易错点 3：递归成功后没有立刻返回，继续把答案改坏。',
          '延伸方向：N 皇后、组合总和、分割回文串、括号生成等回溯题。',
        ],
        callout:
          '从第 36 题到第 37 题，是非常典型的一步升级：先会判断规则，再会在规则里搜索答案。很多算法能力的成长，本质上都是这种“校验 -> 搜索 -> 剪枝”的递进。',
      },
    ],
  },
  {
    id: 'count-and-say',
    label: '38. LeetCode 38. 外观数列',
    difficulty: '中等',
    description:
      '这题不是考复杂数据结构，而是训练你把“按规则模拟过程”写清楚。真正的关键不在于递归或循环选哪种写法，而在于你能不能稳定地完成“连续分组统计，然后拼接结果”这个动作。',
    outcome:
      '你能独立写出外观数列的迭代解法，理解为什么这题本质上是字符串分组模拟，并掌握处理连续相同字符的一类通用写法。',
    sections: [
      {
        id: 'cas-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个正整数 `n`，返回外观数列的第 `n` 项。外观数列从字符串 `"1"` 开始，后面的每一项都来自前一项的“读法”。比如 `"1"` 读作“一个 1”，得到 `"11"`；`"11"` 读作“两个 1”，得到 `"21"`。',
        bullets: [
          '题目返回的是字符串，不是数字。',
          '每一项都由前一项推出来，不能跳着直接算。',
          '所谓“外观”，就是把前一项按连续相同字符分组后读出来。',
          '核心动作是连续统计，而不是数学公式推导。',
        ],
      },
      {
        id: 'cas-sequence-pattern',
        title: '先把规律看清：它其实是在做连续分组描述',
        summary:
          '例如 `"1211"` 可以拆成 `"1"`, `"2"`, `"11"` 三组。依次读出来就是“一个 1、一个 2、两个 1”，拼接后得到 `"111221"`。所以这题本质不是数列题，而是字符串分组题。',
        bullets: [
          '连续相同字符必须放在同一组里。',
          '不同字符一旦变化，就说明上一组结束了。',
          '每组输出的格式是“数量 + 字符”。',
          '整题的核心就是把上一项稳定转成下一项。',
        ],
        callout:
          '这题的迷惑点在于名字叫“数列”，但真正的处理对象是字符串。只要意识到它是在做分组统计，代码就会简单很多。',
      },
      {
        id: 'cas-why-iteration-is-natural',
        title: '为什么迭代写法最自然',
        summary:
          '因为第 `n` 项一定依赖第 `n-1` 项，所以从 `"1"` 开始，一轮一轮往后推最直观。每次写一个函数，把当前字符串转换成下一项即可。这样主流程只需要重复调用这个转换函数 `n - 1` 次。',
        bullets: [
          '初始化答案为 `"1"`。',
          '每轮根据当前字符串构造出下一轮字符串。',
          '重复 `n - 1` 次后，当前结果就是答案。',
          '相比递归，迭代更容易控制过程，也更符合这题的数据流向。',
        ],
      },
      {
        id: 'cas-core-idea',
        title: '核心思路：双指针或计数器扫描当前字符串',
        summary:
          '遍历当前字符串，记录一段连续相同字符出现了多少次。当字符发生变化时，就把上一段的“次数 + 字符”拼到结果里，然后重新开始统计新字符。遍历结束后，别忘了把最后一段也补进去。',
        bullets: [
          '准备一个结果字符串 `next`。',
          '用 `count` 统计当前这段字符的长度。',
          '如果下一个字符不同，说明当前分组结束，立刻输出。',
          '最后一组因为不会再遇到“变化信号”，所以需要手动收尾。',
        ],
        callout:
          '很多字符串题的稳定写法都类似：先扫描，再在“变化点”做结算。只要你抓住“分组结束的时机”，代码就不容易乱。',
      },
      {
        id: 'cas-optimal-solution',
        title: '标准解法：逐项生成 + 分组拼接',
        summary:
          '先定义一个 `buildNext` 函数，把上一项变成下一项。主函数里从 `"1"` 开始迭代生成。`buildNext` 内部遍历字符串，只要发现当前字符和后一个字符不同，就把当前累计的次数和字符拼接到结果中。这样每一轮都是线性扫描。',
        bullets: [
          '单轮转换的时间复杂度是 `O(m)`，`m` 是当前字符串长度。',
          '整体复杂度取决于前几项字符串总长度。',
          '空间复杂度主要来自构造下一项字符串。',
          '这题重点不在复杂度极致，而在过程是否写得稳定无遗漏。',
        ],
        code: `function countAndSay(n: number): string {
  let current = '1'

  const buildNext = (source: string): string => {
    let next = ''
    let count = 1

    for (let i = 1; i <= source.length; i += 1) {
      if (source[i] === source[i - 1]) {
        count += 1
      } else {
        next += String(count) + source[i - 1]
        count = 1
      }
    }

    return next
  }

  for (let i = 1; i < n; i += 1) {
    current = buildNext(current)
  }

  return current
}`,
      },
      {
        id: 'cas-example-walkthrough',
        title: '拿前几项手推一次',
        summary:
          '第 1 项是 `"1"`。读作“一个 1”，第 2 项就是 `"11"`；再读 `"11"`，得到“两个 1”，第 3 项就是 `"21"`；再读 `"21"`，得到“一个 2、一个 1”，第 4 项就是 `"1211"`。你会发现每一步都只是对上一项做分组描述。',
        bullets: [
          '`"1"` -> `"11"`，因为一个 1。',
          '`"11"` -> `"21"`，因为两个 1。',
          '`"21"` -> `"1211"`，因为一个 2、一个 1。',
          '`"1211"` -> `"111221"`，因为一个 1、一个 2、两个 1。',
        ],
      },
      {
        id: 'cas-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的错误不是思路不会，而是实现细节漏收尾。只要你在字符变化时结算上一组，并在遍历结束时保证最后一组也被处理，整题就很稳。它本质上训练的是“连续分组统计”能力，这种能力在压缩字符串、游程编码等题里都会再次出现。',
        bullets: [
          '易错点 1：只在字符变化时输出，结果漏掉最后一组。',
          '易错点 2：把数字当数值处理，而不是把整项当字符串处理。',
          '易错点 3：分组计数重置时机写错，导致数量串位。',
          '延伸方向：字符串压缩、游程编码、分组统计类模拟题。',
        ],
        callout:
          '如果前面的题更多是在练哈希、双指针、回溯，这一题则是在补“过程模拟”的基本功。刷题到后面会发现，很多题并不难在算法名字，而难在你能不能把一个过程完整、无漏洞地翻译成代码。',
      },
    ],
  },
  {
    id: 'combination-sum',
    label: '39. LeetCode 39. 组合总和',
    difficulty: '中等',
    description:
      '这题是回溯入门到进阶之间非常关键的一道题。重点不是简单把所有组合列出来，而是理解“选或不选、继续还是回头”这种搜索树展开方式，以及为什么同一个数字可以重复使用。',
    outcome:
      '你能独立写出组合总和的回溯解法，理解路径 path、剩余和 remain、起始下标 startIndex 三个状态各自负责什么，并知道这类组合搜索题为什么要控制搜索起点。',
    sections: [
      {
        id: 'cs-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个无重复元素的整数数组 `candidates` 和一个目标值 `target`，找出所有可以使数字和为 `target` 的不同组合。数组中的数字可以无限制重复被选取，返回的每个组合内部顺序不重要。',
        bullets: [
          '同一个数字可以被重复使用很多次。',
          '返回的是所有组合，不是只判断有没有解。',
          '组合内部顺序不区分，所以 `[2, 3, 2]` 和 `[2, 2, 3]` 不能算两种答案。',
          '这是典型的“搜索所有方案”问题。 ',
        ],
      },
      {
        id: 'cs-why-greedy-does-not-work',
        title: '为什么不能靠贪心直接做',
        summary:
          '看到“和为 target”时，很多人会想优先拿大数或小数去凑，但这类题并没有单调的贪心策略。某次局部最优选择完全可能把后面的解堵死。所以它本质上不是贪心题，而是要穷举所有可能路径，并在不合法时及时剪枝。',
        bullets: [
          '先拿大数不一定更快得到全部答案。',
          '先拿小数也可能产生大量无效分支。',
          '因为要找所有解，所以不能只保留一条“看起来最好”的路径。',
          '真正的关键是系统遍历搜索树，并及时停止不可能的分支。',
        ],
      },
      {
        id: 'cs-core-idea',
        title: '核心思路：回溯枚举每条组合路径',
        summary:
          '把问题看成一棵搜索树。每一层都决定当前要不要选某个候选数字。由于同一个数字可以重复使用，所以当你选择了 `candidates[i]` 以后，下一层递归仍然可以从 `i` 开始，而不是必须从 `i + 1` 开始。只要剩余和 `remain` 变成 0，就说明当前路径是一组答案；如果变成负数，就可以立刻剪枝返回。',
        bullets: [
          '`path` 记录当前已经选了哪些数字。',
          '`remain` 表示距离目标值还差多少。',
          '`startIndex` 控制下一层从哪个位置开始枚举，避免组合顺序重复。',
          '当 `remain < 0` 时，这条路已经不可能成功，立刻停止。',
        ],
        callout:
          '这题最值钱的地方，是让你真正理解“为什么有些题递归下一层还是 i，有些题必须是 i + 1”。这一点直接决定了题目是“可重复选”还是“只能选一次”。',
      },
      {
        id: 'cs-why-start-index-matters',
        title: '为什么一定要维护起始下标',
        summary:
          '如果每层都从 0 开始重新枚举，就会把同一组合用不同顺序重复搜出来，比如 `[2, 2, 3]` 和 `[2, 3, 2]`。通过让递归只从当前及其后面的候选开始搜索，就能保证组合内部天然按固定顺序生成，从根上避免重复答案。',
        bullets: [
          '起始下标不是为了加速，而是为了去重。',
          '组合题通常要保证路径按固定顺序向前展开。',
          '允许重复选当前数字时，递归传 `i`；不允许重复时，递归传 `i + 1`。',
          '很多回溯题的差别，实际上就在这一行参数。 ',
        ],
      },
      {
        id: 'cs-optimal-solution',
        title: '标准解法：DFS 回溯 + 剪枝',
        summary:
          '准备结果数组 `result` 和路径数组 `path`。定义 `dfs(startIndex, remain)`。当 `remain === 0` 时，把当前路径拷贝进答案；当 `remain < 0` 时直接返回。然后从 `startIndex` 开始遍历候选数组，把当前数字加入路径、递归搜索、再弹出撤销。这样就能系统列出所有合法组合。',
        bullets: [
          '时间复杂度与答案数量和搜索树规模相关，没有固定简单公式。',
          '空间复杂度主要来自递归栈和路径数组。',
          '写法重点仍然是“加入 path -> 递归 -> 撤销 path”三步对称。',
          '如果先排序，还可以做更强的剪枝，但这题不排序也能稳定写出来。',
        ],
        code: `function combinationSum(
  candidates: number[],
  target: number,
): number[][] {
  const result: number[][] = []
  const path: number[] = []

  const dfs = (startIndex: number, remain: number) => {
    if (remain === 0) {
      result.push([...path])
      return
    }

    if (remain < 0) {
      return
    }

    for (let i = startIndex; i < candidates.length; i += 1) {
      const current = candidates[i]

      path.push(current)
      dfs(i, remain - current)
      path.pop()
    }
  }

  dfs(0, target)
  return result
}`,
      },
      {
        id: 'cs-example-walkthrough',
        title: '拿 `[2,3,6,7]` 和 `target = 7` 手推一次',
        summary:
          '从 `2` 开始选，路径会变成 `[2]`，剩余是 `5`；再选 `2`，路径 `[2,2]`，剩余 `3`；再选 `2` 会剩 `1`，继续选任何数都会超，所以回退。接着在 `[2,2]` 后尝试 `3`，刚好剩余变成 `0`，得到答案 `[2,2,3]`。然后继续回退，最终还能得到 `[7]`。',
        bullets: [
          '回溯会自然尝试 `[2,2,2,...]` 这条链，直到超出为止。',
          '超出目标就回退，这是最直接的剪枝。',
          '固定从当前下标往后搜，所以不会产生 `[3,2,2]` 这种重复顺序。',
          '最终答案是 `[[2,2,3],[7]]`。',
        ],
      },
      {
        id: 'cs-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最容易错的地方，是没有真正理解“可重复选择”这个条件。只要这个条件理解清楚，递归参数怎么传就自然了。它也是很多组合搜索题的母题，学透后做组合总和 II、子集、组合、分割回文串时都会更顺。',
        bullets: [
          '易错点 1：递归时误写成 `dfs(i + 1, ...)`，导致当前数字不能重复使用。',
          '易错点 2：找到答案后没有拷贝 path，而是直接把引用塞进结果。',
          '易错点 3：忘记回溯时 `path.pop()`，导致路径污染后续分支。',
          '延伸方向：组合总和 II、子集、组合、电话号码的字母组合等搜索题。',
        ],
        callout:
          '如果第 37 题在训练你“按规则填表”，这题就在训练你“按决策树搜索所有方案”。回溯真正的难点从来不是语法，而是你能否把状态和分支边界想清楚。',
      },
    ],
  },
  {
    id: 'combination-sum-ii',
    label: '40. LeetCode 40. 组合总和 II',
    difficulty: '中等',
    description:
      '这题和上一题表面很像，但本质上多了两个关键约束：每个数字只能使用一次，候选数组里还可能有重复值。真正训练的是你能不能把“同层去重”和“单次使用”这两个限制融进回溯过程，而不是事后再补救。',
    outcome:
      '你能独立写出组合总和 II 的回溯解法，理解为什么这题必须先排序、为什么递归时要传 `i + 1`、为什么同层重复值要跳过。',
    sections: [
      {
        id: 'cs2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个候选数组 `candidates` 和目标值 `target`，找出所有和为 `target` 的组合。与上一题不同的是：数组中的每个数字在每个组合中只能使用一次，且候选数组本身可能包含重复数字。',
        bullets: [
          '每个位置上的数字最多用一次。',
          '数组里可能有相同的数字，比如两个 `1`、两个 `2`。',
          '返回结果中不能出现重复组合。',
          '这题的重点已经不只是搜索，还包括去重。 ',
        ],
      },
      {
        id: 'cs2-vs-cs1',
        title: '和第 39 题最本质的区别是什么',
        summary:
          '第 39 题是“元素可重复使用，数组本身无重复”；第 40 题则是“元素只能使用一次，数组本身可能有重复”。这两个条件一换，递归下一层的起点、去重方式、剪枝时机都会变。很多人以为只要把上一题代码稍微改一下就行，结果就在去重上出错。',
        bullets: [
          '上一题递归传 `i`，因为当前数字还能继续选。',
          '这一题递归必须传 `i + 1`，因为当前位置已经用过了。',
          '上一题主要防顺序重复，这一题还要防数值重复导致的重复组合。',
          '去重必须发生在搜索过程中，而不是搜索完再用 Set 硬去重。',
        ],
        callout:
          '回溯题最怕“看着像”。只要题目条件有一点变化，搜索树的结构往往就完全不同。真正要练的是读条件后，知道哪一行递归参数必须改。',
      },
      {
        id: 'cs2-why-sort-first',
        title: '为什么这题必须先排序',
        summary:
          '排序后，相同数字会排在一起，这样你才能在同一层搜索中跳过重复值，避免生成重复组合。没有排序，就无法稳定识别“这一层我已经试过这个值了”。同时，排序后还能做额外剪枝：如果当前值已经大于剩余目标，后面更大的值也都不用试了。',
        bullets: [
          '排序是为了让重复值相邻，方便同层去重。',
          '排序后可以用 `if (current > remain) break` 做剪枝。',
          '很多组合去重题的第一步就是排序。',
          '如果没排序，去重逻辑通常会写得非常别扭。',
        ],
      },
      {
        id: 'cs2-core-idea',
        title: '核心思路：回溯 + 同层去重 + 单次使用',
        summary:
          '先排序，然后定义 `dfs(startIndex, remain)`。每层从 `startIndex` 开始往后枚举。如果当前值和前一个值相同，并且它们处在同一层，那就跳过当前值，避免同层重复搜索。选中某个值后，递归下一层时从 `i + 1` 开始，表示这个位置已经不能再用了。',
        bullets: [
          '`remain === 0` 时，把当前路径加入答案。',
          '`remain < 0` 时直接返回，或更进一步用排序后的 break 剪枝。',
          '同层去重条件通常写成 `if (i > startIndex && nums[i] === nums[i - 1]) continue`。',
          '单次使用体现在递归参数传 `i + 1`。',
        ],
        callout:
          '“同层去重”四个字非常重要。它的意思不是所有重复值都不能选，而是同一层里同值的第 2 个分支不用再开；但进入下一层后，如果路径不同，仍然可能合法使用后面的相同值。',
      },
      {
        id: 'cs2-optimal-solution',
        title: '标准解法：排序后回溯搜索',
        summary:
          '先对候选数组升序排序。回溯时从 `startIndex` 开始遍历，遇到重复值就跳过同层分支；若当前值大于剩余目标，直接 `break`。每次把当前值加入路径，递归搜索下一层，回来后再撤销。这样可以同时解决“只用一次”和“结果去重”两个问题。',
        bullets: [
          '排序是前提，不是可选优化。',
          '时间复杂度依旧取决于搜索树规模和答案数量。',
          '空间复杂度主要来自递归栈和当前路径。',
          '这题最关键的代码不是 push/pop，而是同层去重那一行。 ',
        ],
        code: `function combinationSum2(
  candidates: number[],
  target: number,
): number[][] {
  const nums = [...candidates].sort((a, b) => a - b)
  const result: number[][] = []
  const path: number[] = []

  const dfs = (startIndex: number, remain: number) => {
    if (remain === 0) {
      result.push([...path])
      return
    }

    for (let i = startIndex; i < nums.length; i += 1) {
      const current = nums[i]

      if (i > startIndex && current === nums[i - 1]) {
        continue
      }

      if (current > remain) {
        break
      }

      path.push(current)
      dfs(i + 1, remain - current)
      path.pop()
    }
  }

  dfs(0, target)
  return result
}`,
      },
      {
        id: 'cs2-example-walkthrough',
        title: '拿 `[10,1,2,7,6,1,5]` 手推一次',
        summary:
          '排序后数组变成 `[1,1,2,5,6,7,10]`。第一层先选第一个 `1`，后续可以继续组成 `[1,1,6]`、`[1,2,5]` 等答案。当第一层回到第二个 `1` 时，因为它和前一个值相同且处于同一层，所以要直接跳过，避免再搜出重复组合。',
        bullets: [
          '排序后才能看出两个 `1` 是相邻的。',
          '第一层试过第一个 `1` 后，第二个 `1` 的同层分支要跳过。',
          '但如果第一层已经选了第一个 `1`，下一层仍然可以再选第二个 `1`。',
          '最终答案包括 `[1,1,6]`、`[1,2,5]`、`[1,7]`、`[2,6]`。',
        ],
      },
      {
        id: 'cs2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最容易错在去重条件写错。很多人会把所有相同值都跳过，结果把合法答案也跳没了；也有人完全不跳过，结果答案重复。只要你真正理解“同层去重、不同层允许”的边界，这题就会稳定很多。',
        bullets: [
          '易错点 1：递归仍然传 `i`，导致同一个位置被重复使用。',
          '易错点 2：没有排序就尝试去重，逻辑会失效。',
          '易错点 3：把重复值在所有层都跳过，导致漏解。',
          '延伸方向：子集 II、全排列 II、组合总和 III、去重型回溯题。',
        ],
        callout:
          '第 39 题和第 40 题是一组非常重要的对照题。前者帮你建立“组合搜索”的基本框架，后者帮你理解“条件一变，去重和递归边界就必须跟着变”。这一步想清楚，后面的回溯题会顺很多。',
      },
    ],
  },
  {
    id: 'first-missing-positive',
    label: '41. LeetCode 41. 缺失的第一个正数',
    difficulty: '困难',
    description:
      '这题是原地哈希思想的代表题。难点不在语法，而在于能不能意识到“最小缺失正数”其实只会落在一个非常有限的范围内，然后把数组本身当成索引表来用。',
    outcome:
      '你能独立写出缺失的第一个正数的原地交换解法，理解为什么答案一定在 `1 ~ n + 1` 之间，并掌握“把值放回它应该待的位置”这一类题的核心套路。',
    sections: [
      {
        id: 'fmp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个未排序的整数数组 `nums`，找出其中没有出现的最小正整数，并且要求时间复杂度是 `O(n)`，额外空间复杂度是 `O(1)`。',
        bullets: [
          '只关心正整数，负数、0 和过大的数都不是重点。',
          '数组是无序的，所以不能直接依赖排序后的天然位置。',
          '题目明确要求 `O(n)` 时间和 `O(1)` 额外空间，说明常规排序或额外哈希表都不是标准答案。',
          '真正要利用的是数组下标本身。',
        ],
      },
      {
        id: 'fmp-key-observation',
        title: '先抓住最关键的范围结论',
        summary:
          '如果数组长度是 `n`，那么最小缺失正数一定只可能出现在 `1 ~ n + 1` 之间。因为如果 `1 ~ n` 都出现了，那答案自然就是 `n + 1`；如果其中缺了某个数，答案就在这个范围里。',
        bullets: [
          '长度为 `n` 的数组，不需要关心大于 `n` 太多的数字。',
          '例如长度为 5，答案只可能是 `1` 到 `6`。',
          '这个范围结论一出来，就知道每个有效数字都可以尝试映射到一个固定下标。',
          '后续所有操作，本质上都在尝试建立“值”和“位置”的对应关系。',
        ],
        callout:
          '这题的第一道坎不是交换，而是先想通“为什么答案不会无限大”。只要这个范围没想清楚，后面的原地处理就很难下手。',
      },
      {
        id: 'fmp-why-sort-or-set-is-not-best',
        title: '为什么排序和 Set 不是这题要的答案',
        summary:
          '排序后线性扫描当然能找到最小缺失正数，但时间复杂度通常是 `O(n log n)`；用 `Set` 能做到 `O(n)` 时间，却多用了 `O(n)` 额外空间。这两种思路都能做对题，但都不满足题目同时给出的双重复杂度要求。',
        bullets: [
          '排序法的问题是时间复杂度不达标。',
          'Set 或 Map 的问题是额外空间不达标。',
          '题目把你逼到“只能原地做文章”。',
          '所以这题本质是在考“原地哈希”或“桶位回填”思想。',
        ],
      },
      {
        id: 'fmp-core-idea',
        title: '核心思路：把数字放回它应该在的位置',
        summary:
          '如果一个数字 `x` 落在有效范围 `1 ~ n` 内，那么它理想上应该待在下标 `x - 1` 的位置。于是我们遍历数组，只要发现当前数字可以放回正确位置，并且目标位置还不是同一个数字，就不断交换，直到当前位置无法再继续放回为止。',
        bullets: [
          '数字 `1` 应该放在下标 `0`。',
          '数字 `2` 应该放在下标 `1`。',
          '数字 `x` 应该放在下标 `x - 1`。',
          '如果目标位置已经是同一个值，就不能再交换，否则会死循环。',
        ],
        callout:
          '很多人把这题记成“原地交换”，但真正该记住的是“值归位”。交换只是手段，目标是让每个有效正数都尽量回到自己应该代表的位置上。',
      },
      {
        id: 'fmp-optimal-solution',
        title: '标准解法：原地交换归位',
        summary:
          '第一轮遍历数组，不断把有效数字交换到正确下标。第二轮再从左到右检查：第一个 `nums[i] !== i + 1` 的位置，缺失的最小正数就是 `i + 1`。如果 `1 ~ n` 都在正确位置上，那答案就是 `n + 1`。',
        bullets: [
          '时间复杂度是 `O(n)`，因为每个数字最多被交换到位有限次。',
          '额外空间复杂度是 `O(1)`，只用了常量级临时变量。',
          '循环里要用 `while`，因为一次交换后当前位置的新值可能仍然需要继续归位。',
          '判断条件要同时防越界、重复值和无效值。',
        ],
        code: `function firstMissingPositive(nums: number[]): number {
  const n = nums.length

  for (let i = 0; i < n; i += 1) {
    while (
      nums[i] >= 1 &&
      nums[i] <= n &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      const correctIndex = nums[i] - 1
      ;[nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]]
    }
  }

  for (let i = 0; i < n; i += 1) {
    if (nums[i] !== i + 1) {
      return i + 1
    }
  }

  return n + 1
}`,
      },
      {
        id: 'fmp-example-walkthrough',
        title: '拿 `[3,4,-1,1]` 手推一次',
        summary:
          '数组长度是 4，所以答案只可能在 `1 ~ 5`。先看 `3`，它应该去下标 `2`，交换后数组变成 `[-1,4,3,1]`；再看 `4`，它应该去下标 `3`，交换后变成 `[-1,1,3,4]`；接着 `1` 应该去下标 `0`，数组变成 `[1,-1,3,4]`。最后检查时，下标 `1` 上不是 `2`，所以答案是 `2`。',
        bullets: [
          '有效数字就尝试归位，无效数字先放着不管。',
          '一次交换后当前位置可能换来了新数字，所以要继续 while 处理。',
          '最终不需要真的得到有序数组，只需要让能归位的数尽量归位。',
          '第一个位置错位点，就是最小缺失正数的证据。',
        ],
      },
      {
        id: 'fmp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题不是不会想范围，而是交换条件写不稳，导致死循环或漏处理。真正写稳之后，你会发现这类题的本质就是“用数组自身模拟哈希定位”。这种思想在很多原地数组题里都非常有价值。',
        bullets: [
          '易错点 1：把 `if` 写成一次交换，导致当前位置的新值没有继续归位。',
          '易错点 2：没判断目标位是否已经等于当前值，出现死循环。',
          '易错点 3：把负数、0 或大于 `n` 的值也拿去交换，逻辑会越写越乱。',
          '延伸方向：寻找重复数、数组置换、循环排序（cyclic sort）相关题。 ',
        ],
        callout:
          '如果前面的回溯题在训练你画搜索树，这一题就在训练你把“值域信息”映射成“下标信息”。能把这种原地映射想明白，数组题的理解会明显上一个台阶。',
      },
    ],
  },
  {
    id: 'trapping-rain-water',
    label: '42. LeetCode 42. 接雨水',
    difficulty: '困难',
    description:
      '这题是双指针和前后缀最大值思想的经典代表。难点不在公式，而在于你能不能真正理解“某个位置能接多少水，取决于它左右两边较矮的那堵墙”。',
    outcome:
      '你能独立写出接雨水的双指针解法，理解为什么要比较左右最大边界，以及这类“区间贡献由边界决定”的题该怎么从暴力优化到线性时间。',
    sections: [
      {
        id: 'trw-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个非负整数数组 `height`，每个元素表示柱子的高度，宽度都为 1。下雨后，问这些柱子总共能接多少雨水。',
        bullets: [
          '每个位置都是一个竖直柱子。',
          '水不会凭空存在，必须被左右更高的边界夹住。',
          '求的是整体总量，不是某一个位置能接多少。',
          '这是一道非常典型的“先算单点贡献，再累加总和”问题。',
        ],
      },
      {
        id: 'trw-brute-force',
        title: '先看暴力思路，明确瓶颈',
        summary:
          '对每个位置 `i`，如果想知道它能接多少水，可以分别向左找最高柱子、向右找最高柱子。当前位置最终水位由左右最高柱子中较低的那个决定，再减去当前高度，就是这个位置的水量。这个思路完全正确，但如果每个位置都重新左右扫描，代价会很高。',
        bullets: [
          '单点水量公式是 `min(leftMax, rightMax) - height[i]`。',
          '如果这个值小于等于 0，说明当前位置接不到水。',
          '对每个位置都左右扫一遍，时间复杂度是 `O(n²)`。',
          '暴力解的问题不是思路错，而是重复计算左右最大值太多次。',
        ],
      },
      {
        id: 'trw-core-observation',
        title: '真正关键：某个位置只看左右最高边界中较低的那个',
        summary:
          '一个位置能接多少水，不取决于更高的那一边，而取决于左右两边较矮的边界。因为水面不可能高过较低的那堵墙。这意味着一旦你能快速知道某个位置左右最大值，就能立刻算出它的贡献。',
        bullets: [
          '左边再高，如果右边很矮，水也会从右边流走。',
          '右边再高，如果左边很矮，水面也只能被左边限制住。',
          '所以真正决定水位的是 `min(leftMax, rightMax)`。',
          '后续所有优化，都是在想办法更快拿到左右最大值。',
        ],
        callout:
          '这题最值钱的不是记住结果公式，而是理解“局部贡献由边界限制”。这种思维在很多单调结构和双指针题里都会反复出现。',
      },
      {
        id: 'trw-two-pointer-idea',
        title: '为什么双指针能把它压到线性时间',
        summary:
          '用两个指针分别从两端向中间靠拢，同时维护 `leftMax` 和 `rightMax`。如果当前左边高度小于右边高度，那么左侧这个位置能接多少水，已经可以只由 `leftMax` 确定；反过来，如果右边更低，就可以先结算右侧。这是因为较低的一边已经决定了当前侧的有效上界。',
        bullets: [
          '维护两个指针：`left` 和 `right`。',
          '维护两个边界：`leftMax` 和 `rightMax`。',
          '哪边当前高度更低，就优先结算哪边。',
          '这样每个位置只会被处理一次，整体是 `O(n)`。',
        ],
        callout:
          '双指针解法看起来像技巧题，其实背后逻辑很硬：当一侧已经确定更低时，另一侧再怎么变化，也不会让当前这侧的可接水量变得更大。',
      },
      {
        id: 'trw-optimal-solution',
        title: '标准解法：双指针 + 左右最大值',
        summary:
          '初始化 `left = 0`、`right = n - 1`，以及 `leftMax`、`rightMax`。循环中比较 `height[left]` 和 `height[right]`：如果左边更低，就更新 `leftMax`，并把 `leftMax - height[left]` 加入答案后右移 `left`；否则处理右边，更新 `rightMax` 并累加 `rightMax - height[right]`，再左移 `right`。',
        bullets: [
          '时间复杂度是 `O(n)`，每个位置最多访问一次。',
          '额外空间复杂度是 `O(1)`。',
          '代码关键不在于指针移动，而在于为什么能只处理较低那一侧。',
          '如果当前高度已经等于最大边界，这个位置贡献就是 0。',
        ],
        code: `function trap(height: number[]): number {
  let left = 0
  let right = height.length - 1
  let leftMax = 0
  let rightMax = 0
  let total = 0

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left])
      total += leftMax - height[left]
      left += 1
    } else {
      rightMax = Math.max(rightMax, height[right])
      total += rightMax - height[right]
      right -= 1
    }
  }

  return total
}`,
      },
      {
        id: 'trw-example-walkthrough',
        title: '拿经典示例手推一次',
        summary:
          '以 `height = [0,1,0,2,1,0,1,3,2,1,2,1]` 为例。比如位置 2 的高度是 0，它左边最高是 1，右边最高至少有 3，所以它能接 `min(1, 3) - 0 = 1` 的水。继续这样累加所有位置，最终总水量是 6。双指针做的事情，本质上就是在线地完成这件事，而不是每次都重新回头找边界。',
        bullets: [
          '位置 2 能接 1 格水。',
          '位置 5 左边最高是 2，右边最高是 3，所以能接 2 格水。',
          '很多位置虽然被夹在中间，但边界不足时贡献仍然是 0。',
          '最终总量是 6，这是这题最经典的样例结果。',
        ],
      },
      {
        id: 'trw-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最容易错的地方，是双指针逻辑只记了写法没记住理由，结果一改条件就不会了。真正掌握后，你会发现它和“盛最多水的容器”“柱状图最大矩形”“单调栈求边界”这些题是同一类边界问题的不同变体。',
        bullets: [
          '易错点 1：忘记先更新 `leftMax` 或 `rightMax`，直接拿旧值结算。',
          '易错点 2：没理解为什么处理较低的一边，导致代码虽能背出来却很难举一反三。',
          '易错点 3：把当前位置贡献写成 `max(leftMax, rightMax) - height[i]`，这是错误的。',
          '延伸方向：盛最多水的容器、柱状图中最大的矩形、单调栈边界题。',
        ],
        callout:
          '如果上一题在训练你做原地下标映射，这一题则是在训练你如何从“全局边界约束”中推出“局部贡献”。数组题做到后面，这种由整体限制单点的思维非常重要。',
      },
    ],
  },
  {
    id: 'multiply-strings',
    label: '43. LeetCode 43. 字符串相乘',
    difficulty: '中等',
    description:
      '这题是高精度乘法的入门代表。重点不是把字符串转数字，而是理解如何用数组模拟小学竖式乘法，并把乘积的每一位精确地落到结果位置上。',
    outcome:
      '你能独立写出字符串相乘的高精度解法，理解为什么每一对数字的乘积会落在 `i + j` 和 `i + j + 1` 这两个位置，并掌握用结果数组承接进位的写法。',
    sections: [
      {
        id: 'ms-problem-summary',
        title: '题目在问什么',
        summary:
          '给定两个非负整数字符串 `num1` 和 `num2`，返回它们的乘积，结果也要用字符串表示。题目强调不能直接使用 BigInt 或把整串转成整数来算。',
        bullets: [
          '输入是字符串，不是普通 number。',
          '结果可能非常大，超出语言普通整数范围。',
          '题目禁止直接依赖高精度内建类型作弊。',
          '这本质上是在考你会不会手写高精度乘法。',
        ],
      },
      {
        id: 'ms-why-cannot-convert-directly',
        title: '为什么不能偷懒转成数字',
        summary:
          '如果字符串很长，直接转成 number 可能会溢出或丢精度。即便某些语言支持 BigInt，题目也明确不希望你走这条路。真正需要掌握的是“按位处理”的思想，这和高精度加减乘除题是一脉相承的。',
        bullets: [
          '普通 number 有安全整数上限。',
          '长数字相乘时精度问题会直接把答案做错。',
          '题目限制并不是刁难，而是在逼你掌握标准的字符串数值运算模型。',
          '会了这题，后面的大数加法、大数乘法都能类比写出来。',
        ],
      },
      {
        id: 'ms-core-observation',
        title: '关键观察：每一位乘积落点是固定的',
        summary:
          '如果 `num1[i]` 和 `num2[j]` 相乘，那么这个乘积最终会影响结果数组中的两个位置：`i + j` 和 `i + j + 1`。这是由十进制位权决定的。你可以把整个过程理解成在结果数组里不断累加局部乘积，然后顺手处理进位。',
        bullets: [
          '个位乘个位，结果影响最后一位和前一位的进位。',
          '十位和个位相乘，会整体向前偏一位。',
          '更一般地，两位下标之和决定了乘积的大致落点。',
          '这就是为什么结果数组长度最多是 `m + n`。',
        ],
        callout:
          '这题最值钱的点不是“会乘”，而是把竖式乘法抽象成“每一对数位对结果数组某两个槽位产生贡献”。一旦这个映射关系想清楚，代码就顺了。',
      },
      {
        id: 'ms-why-result-array-works',
        title: '为什么结果数组长度最多是 `m + n`',
        summary:
          '一个 `m` 位数和一个 `n` 位数相乘，结果最多只有 `m + n` 位。比如 99 乘 99 最多是 4 位数。因此可以先准备一个长度为 `m + n` 的数组，所有局部乘积都往这个数组里写，最后再去掉前导 0 并拼成字符串。',
        bullets: [
          '结果数组提前开好，可以避免字符串频繁拼接。',
          '每次只更新两个位置，整体过程非常稳定。',
          '最后统一处理前导 0，比中间边算边裁剪更简单。',
          '这是典型的“先结构化存储，再格式化输出”。',
        ],
      },
      {
        id: 'ms-optimal-solution',
        title: '标准解法：结果数组模拟竖式乘法',
        summary:
          '先处理特例：只要有一个字符串是 `"0"`，答案就是 `"0"`。然后创建长度为 `m + n` 的结果数组，从后往前枚举 `num1` 和 `num2` 的每一位，把当前乘积加到 `result[i + j + 1]` 上，再把进位加到 `result[i + j]`。所有局部贡献处理完后，再把结果数组转成字符串，并去掉前导 0。',
        bullets: [
          '时间复杂度是 `O(mn)`，因为每一位组合都要乘一次。',
          '额外空间复杂度是 `O(m + n)`。',
          '代码重点不是双重循环本身，而是如何把乘积和进位写回正确位置。',
          '中间可以允许某个槽位暂时大于 9，因为后续会继续被归整。',
        ],
        code: `function multiply(num1: string, num2: string): string {
  if (num1 === '0' || num2 === '0') {
    return '0'
  }

  const m = num1.length
  const n = num2.length
  const result = new Array<number>(m + n).fill(0)

  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      const product = Number(num1[i]) * Number(num2[j])
      const sum = product + result[i + j + 1]

      result[i + j + 1] = sum % 10
      result[i + j] += Math.floor(sum / 10)
    }
  }

  return result.join('').replace(/^0+/, '')
}`,
      },
      {
        id: 'ms-example-walkthrough',
        title: '拿 `123 * 45` 手推一次',
        summary:
          '可以把 `123` 看成三位，`45` 看成两位，所以结果数组长度最多是 5。先算 `3 * 5 = 15`，把 5 放到最后一格，1 作为进位加到前一格；再算 `3 * 4 = 12`，再叠加到对应位置；接着处理 `2 * 5`、`2 * 4`，以及 `1 * 5`、`1 * 4`。最后结果数组会变成 `[0, 5, 5, 3, 5]`，去掉前导 0 后就是 `"5535"`。',
        bullets: [
          '局部乘积不是直接覆盖，而是和当前位置已有值累加。',
          '每次都把个位留在 `i + j + 1`，把进位加到 `i + j`。',
          '这和手写竖式时“对齐位数再相加”本质一致。',
          '最终答案 `123 * 45 = 5535`。',
        ],
      },
      {
        id: 'ms-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是位置映射没想清楚，导致把乘积写到了错误槽位。真正写顺以后，你会发现这种“先把局部结果打进数组，再统一输出”的模式非常适合高精度运算题。',
        bullets: [
          '易错点 1：忘记把当前位置原有值也一起加进 `sum`，导致丢失之前的贡献。',
          '易错点 2：把进位和个位写反位置，结果整体错位。',
          '易错点 3：结果转字符串时没去掉前导 0。',
          '延伸方向：字符串相加、高精度加减法、大整数阶乘、手写除法模拟题。',
        ],
        callout:
          '如果前面的接雨水在训练你从边界推局部贡献，这一题就在训练你把“局部贡献”准确地打到全局结果的正确位置。很多模拟题真正难的都不是算法名字，而是这种位置感。',
      },
    ],
  },
  {
    id: 'wildcard-matching',
    label: '44. LeetCode 44. 通配符匹配',
    difficulty: '困难',
    description:
      '这题是动态规划里的经典字符串匹配题。难点不是记状态定义，而是你能不能把 `?` 和 `*` 的含义真正翻译成状态转移，特别是 `*` 为什么会产生多种可能。',
    outcome:
      '你能独立写出通配符匹配的动态规划解法，理解 `dp[i][j]` 的含义，掌握 `?` 与 `*` 的不同转移方式，并知道为什么这题不能只靠简单双指针贪心拍脑袋解决。',
    sections: [
      {
        id: 'wm-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串 `s` 和一个模式串 `p`，判断 `p` 是否能完整匹配 `s`。其中 `?` 可以匹配任意单个字符，`*` 可以匹配任意长度的字符串，包括空串。',
        bullets: [
          '要求是完整匹配，不是部分匹配。',
          '`?` 只能吃掉一个字符。',
          '`*` 可以吃掉 0 个、1 个或多个字符。',
          '这是一个典型的“两个字符串协同推进”的匹配问题。',
        ],
      },
      {
        id: 'wm-why-naive-backtracking-is-risky',
        title: '为什么直接回溯会很容易爆炸',
        summary:
          '如果每遇到一个 `*`，你都去尝试匹配 0 个、1 个、2 个……很多个字符，那么分支数会迅速膨胀。尤其是模式串里有多个 `*` 时，朴素回溯会产生大量重复子问题。所以这题的关键是把“已经算过的匹配状态”缓存下来，或者直接用动态规划自底向上求解。',
        bullets: [
          '`*` 的多义性会带来大量分支。',
          '不同路径可能反复回到同一个 `(i, j)` 状态。',
          '这说明问题天然存在重叠子问题。',
          '动态规划正适合这种“状态有限、转移明确”的场景。',
        ],
      },
      {
        id: 'wm-dp-definition',
        title: '先把状态定义想清楚',
        summary:
          '定义 `dp[i][j]` 表示：`s` 的前 `i` 个字符，是否能被 `p` 的前 `j` 个字符完整匹配。这里“前 i 个字符”是一个非常标准的动态规划视角，它能让你自然处理空串和边界问题。',
        bullets: [
          '`dp[0][0] = true`，空串和空模式天然匹配。',
          '`dp[i][j]` 只关心前缀，不关心后面的内容。',
          '最终答案就是 `dp[s.length][p.length]`。',
          '一旦状态定义稳了，转移公式就会顺着题意长出来。',
        ],
        callout:
          '很多字符串 DP 题真正难的不是转移，而是你一开始到底站在哪个视角定义状态。这里用“前缀是否匹配”是最稳的选择。',
      },
      {
        id: 'wm-transition',
        title: '`?` 和 `*` 的状态转移为什么不同',
        summary:
          '如果 `p[j - 1]` 是普通字符或 `?`，那它只能和 `s[i - 1]` 对应一个字符，所以要看前一个状态 `dp[i - 1][j - 1]`。但如果是 `*`，它有两种核心用法：匹配空串，或者匹配掉当前字符继续留在 `*` 上。因此转移会来自 `dp[i][j - 1]` 和 `dp[i - 1][j]`。',
        bullets: [
          '普通字符：只有相等时才能继承 `dp[i - 1][j - 1]`。',
          '`?`：可以直接匹配任意一个字符，也继承 `dp[i - 1][j - 1]`。',
          '`*` 匹配空串时，看 `dp[i][j - 1]`。',
          '`*` 匹配至少一个字符时，看 `dp[i - 1][j]`。',
        ],
        callout:
          '`*` 最难的不是语义，而是你要把它拆成“空”和“非空”两种状态来源。只要这一步理解了，转移公式其实非常自然。',
      },
      {
        id: 'wm-optimal-solution',
        title: '标准解法：二维动态规划',
        summary:
          '先创建 `(m + 1) x (n + 1)` 的布尔数组，其中 `m` 是 `s.length`，`n` 是 `p.length`。初始化 `dp[0][0] = true`。接着先处理第一行：只有当前缀全是 `*` 时，空串才能被匹配。然后双重循环填表：普通字符和 `?` 都看左上角；`*` 则看左边或上边。',
        bullets: [
          '时间复杂度是 `O(mn)`。',
          '空间复杂度是 `O(mn)`，也可以继续压缩成一维。',
          '第一行初始化非常关键，因为 `*` 能匹配空串。',
          '最终只要返回右下角状态即可。',
        ],
        code: `function isMatch(s: string, p: string): boolean {
  const m = s.length
  const n = p.length
  const dp = Array.from({ length: m + 1 }, () =>
    new Array<boolean>(n + 1).fill(false),
  )

  dp[0][0] = true

  for (let j = 1; j <= n; j += 1) {
    if (p[j - 1] === '*') {
      dp[0][j] = dp[0][j - 1]
    }
  }

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j]
      } else if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      }
    }
  }

  return dp[m][n]
}`,
      },
      {
        id: 'wm-example-walkthrough',
        title: '拿 `s = "adceb"`、`p = "*a*b"` 手推一次',
        summary:
          '模式串开头是 `*`，意味着它可以先匹配空串，也可以吃掉前面若干字符。接着 `a` 要对上字符串中的 `a`，中间的第二个 `*` 可以继续匹配 `dce`，最后 `b` 对上尾部的 `b`。动态规划表格做的事情，就是系统地记录这些“前缀是否可达”的状态，而不是靠人脑回溯乱试。',
        bullets: [
          '第一个 `*` 让很多前缀都有机会匹配成功。',
          '`a` 必须落到对应字符上，不能随便跳过。',
          '第二个 `*` 负责吞掉中间那段字符。',
          '最后 `b` 成功对上，整体答案为 `true`。',
        ],
      },
      {
        id: 'wm-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把 `*` 的状态转移想窄了，只考虑了匹配空串或只考虑了匹配多个字符中的一种。真正写稳以后，你会发现它和正则匹配、编辑距离、子序列匹配这些题都属于“双串 DP”的核心训练素材。',
        bullets: [
          '易错点 1：忘记初始化第一行，导致空串与多个 `*` 的情况全部出错。',
          '易错点 2：把 `*` 的转移少写一种，导致漏解。',
          '易错点 3：把问题当成部分匹配，最后没有要求整个字符串都被覆盖。',
          '延伸方向：正则表达式匹配、编辑距离、不同的子序列、最长公共子序列。',
        ],
        callout:
          '如果上一题在训练你做高精度位置映射，这一题则是在训练你把字符语义翻译成状态转移。动态规划真正的门槛，往往就在这种“把中文题意压成布尔状态”的能力上。',
      },
    ],
  },
  {
    id: 'jump-game-ii',
    label: '45. LeetCode 45. 跳跃游戏 II',
    difficulty: '中等',
    description:
      '这题是贪心算法里非常经典的一道题。难点不在于知道“每次跳最远”，而在于理解为什么要按层推进，以及为什么统计步数的时机是到达当前覆盖边界时。',
    outcome:
      '你能独立写出跳跃游戏 II 的贪心解法，理解 `currentEnd` 和 `farthest` 两个边界各自代表什么，并掌握这类“最少步数覆盖区间”问题的核心贪心模型。',
    sections: [
      {
        id: 'jg2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个非负整数数组 `nums`，你一开始位于下标 `0`。`nums[i]` 表示从下标 `i` 最多可以跳多远。目标是用最少的跳跃次数到达最后一个下标。',
        bullets: [
          '每个位置给出的不是必须跳多远，而是最多能跳多远。',
          '题目保证一定能到达最后一个位置。',
          '求的是最少跳跃次数，不是能不能到达。',
          '这是一道典型的“局部选择如何影响全局最优步数”的题。',
        ],
      },
      {
        id: 'jg2-why-dp-is-not-best',
        title: '为什么动态规划能做但不是最优思路',
        summary:
          '最直接的 DP 想法是：`dp[i]` 表示到达下标 `i` 的最少步数，然后从前面所有能跳到 `i` 的位置转移过来。这个思路能做，但复杂度通常会到 `O(n²)`。题目真正想考的是你能不能看出它其实可以用贪心在线维护每一步的最远覆盖范围。',
        bullets: [
          'DP 会枚举很多“谁能跳到我”的前驱关系。',
          '一旦数组长度变大，平方复杂度就不划算。',
          '题目保证可达，这使得贪心可以放心推进边界。',
          '关键不是记录每个点的最优值，而是每一步能把可达范围扩到哪里。',
        ],
      },
      {
        id: 'jg2-core-observation',
        title: '核心观察：每跳一步，本质上是在扩一层覆盖区间',
        summary:
          '可以把跳跃过程理解成按层 BFS。当前这一步能到达的所有位置，构成一个区间；在这个区间里继续考察每个点，又能得到下一步能覆盖的最远位置。于是问题不再是“到底选哪个点跳”，而变成“当前步数这一层的最远边界在哪，下一层最远又能扩到哪”。',
        bullets: [
          '当前步数能覆盖的最右边界记作 `currentEnd`。',
          '在扫描当前层所有位置时，顺手维护下一层最远能到哪，记作 `farthest`。',
          '一旦扫描到 `currentEnd`，说明当前这一步的所有候选点都看完了，必须跳一次。',
          '跳完后把 `currentEnd` 更新成 `farthest`，继续下一层。',
        ],
        callout:
          '这题最容易被误解成“每次挑一个跳得最远的位置”。实际上真正稳定的做法不是立刻选点，而是先把当前层所有点都扫完，再统一决定下一步的覆盖边界。',
      },
      {
        id: 'jg2-why-greedy-works',
        title: '为什么这个贪心一定成立',
        summary:
          '因为你要求的是最少步数，所以在当前步数固定的前提下，当然希望下一步能覆盖得尽可能远。当前层里无论具体从哪个点起跳，只要它们都属于“同一步之内可达”的候选集合，那么下一层的最优选择就等价于取这些点里 `i + nums[i]` 的最大值。这和 BFS 每层扩展一次的逻辑是一致的。',
        bullets: [
          '同一层里的所有位置，代价都是“已经用了同样的步数”。',
          '既然步数相同，就只需要比较谁能把下一层边界扩得更远。',
          '因此维护 `farthest = max(farthest, i + nums[i])` 就足够了。',
          '这就是贪心与 BFS 分层视角结合后的正确性来源。',
        ],
        callout:
          '很多贪心题真正难的不是写代码，而是解释“为什么局部最优不会害死全局”。这题之所以成立，是因为同层内所有选择的步数成本完全相同。',
      },
      {
        id: 'jg2-optimal-solution',
        title: '标准解法：贪心维护当前层边界',
        summary:
          '从左到右扫描数组，但不需要扫描最后一个位置。每到一个下标 `i`，先更新 `farthest = max(farthest, i + nums[i])`。如果 `i` 已经走到当前层的边界 `currentEnd`，说明这一层扫描结束，必须执行一次跳跃，于是步数加一，并把 `currentEnd` 更新为 `farthest`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '额外空间复杂度是 `O(1)`。',
          '循环只需要到 `nums.length - 2`，因为最后一个位置不需要再起跳。',
          '步数加一的时机不是“看到更远点时”，而是“当前层结束时”。',
        ],
        code: `function jump(nums: number[]): number {
  let steps = 0
  let currentEnd = 0
  let farthest = 0

  for (let i = 0; i < nums.length - 1; i += 1) {
    farthest = Math.max(farthest, i + nums[i])

    if (i === currentEnd) {
      steps += 1
      currentEnd = farthest
    }
  }

  return steps
}`,
      },
      {
        id: 'jg2-example-walkthrough',
        title: '拿 `[2,3,1,1,4]` 手推一次',
        summary:
          '开始时在下标 0，第一步最多能覆盖到下标 2，所以第一层区间是 `[0, 2]`。扫描这层时，`0` 能到 `2`，`1` 能到 `4`，`2` 能到 `3`，因此下一层最远边界是 `4`。当扫描完当前层边界 `2` 时，步数加 1 并把边界扩到 4。总共只需要 2 步：`0 -> 1 -> 4`。',
        bullets: [
          '第一层扫描结束后，最远可达边界从 `0` 扩到 `2`。',
          '继续扫描这一层里的点，会发现从下标 `1` 出发能把下一层扩到 `4`。',
          '扫描到当前层末尾时，才正式把步数加一。',
          '最终答案是 2，而不是盲目每次跳最远后才回头解释。',
        ],
      },
      {
        id: 'jg2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“更新最远边界”和“增加步数”的时机混在一起。真正写稳后，你会发现很多最短步数覆盖题、本质上都能转成这种按层推进的贪心模型。它既像贪心，也像 BFS，只不过把队列显式省掉了。',
        bullets: [
          '易错点 1：一看到更远位置就立刻加步数，导致步数偏大。',
          '易错点 2：循环扫到最后一个位置，结果多算一步。',
          '易错点 3：把题目理解成“每次真的要选出一个具体落脚点”，其实代码里只需要维护边界。',
          '延伸方向：跳跃游戏 I、最少区间覆盖、视频拼接、按层扩展的贪心/BFS 题。',
        ],
        callout:
          '如果上一题在训练你把字符语义翻译成 DP 状态，这一题就在训练你把“最少步数”翻译成“层数”。很多看似贪心的题，背后其实站着一个被压扁了的 BFS。',
      },
    ],
  },
  {
    id: 'permutations',
    label: '46. LeetCode 46. 全排列',
    difficulty: '中等',
    description:
      '这题是回溯搜索里最标准的母题之一。重点不是把答案枚举出来，而是理解“路径、选择列表、状态恢复”这三个动作如何构成一棵完整的搜索树。',
    outcome:
      '你能独立写出全排列的回溯解法，理解 `path`、`used` 数组各自承担的职责，并掌握“做选择 -> 递归 -> 撤销选择”这套回溯题最核心的编程骨架。',
    sections: [
      {
        id: 'perm-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个不含重复数字的数组 `nums`，返回它的所有可能全排列。结果中每个排列都要包含数组中的所有元素，并且每个元素只能使用一次。',
        bullets: [
          '是“全排列”，不是子集、不是组合。',
          '每个答案长度都必须和原数组一样长。',
          '同一个元素在一个排列里不能重复用。',
          '这是一道典型的“搜索所有方案”题。',
        ],
      },
      {
        id: 'perm-why-not-manual-swap-thinking-first',
        title: '为什么先用回溯树思维最稳',
        summary:
          '这题当然也可以用交换法做，但如果你正在建立回溯基础，更推荐先从“逐位填空”的思路入手。也就是：当前位置放哪个数？放完后，剩下哪些数还能选？这样更容易把回溯的状态和分支边界想清楚，后面做组合、子集、N 皇后时也能直接复用。',
        bullets: [
          '把问题看成依次决定第 1 位、第 2 位……放什么数。',
          '每一层递归都在为当前排列确定一个新位置。',
          '已经用过的数不能再选，所以需要显式记录使用状态。',
          '这种“逐位决策”的视角最适合训练回溯基本功。',
        ],
      },
      {
        id: 'perm-core-idea',
        title: '核心思路：路径记录当前排列，used 记录可选状态',
        summary:
          '准备一个 `path` 数组，表示当前已经选了哪些数字；再准备一个 `used` 布尔数组，表示哪些位置上的数字已经被放进当前路径。每一层递归都遍历整个 `nums`，挑一个还没用过的数字加入 `path`，递归处理下一层。只要 `path.length === nums.length`，就得到了一组完整排列。',
        bullets: [
          '`path` 决定当前递归已经构造出的前缀排列。',
          '`used[i]` 决定 `nums[i]` 还能不能被当前分支继续选择。',
          '所有数字都用完时，说明这条路径是一个完整答案。',
          '递归返回后必须撤销选择，恢复现场给后续分支使用。',
        ],
        callout:
          '回溯真正重要的不是“递归”两个字，而是你有没有把状态写完整。`path` 是当前结果，`used` 是剩余选择范围，这两个状态不清楚，搜索树就会乱。',
      },
      {
        id: 'perm-why-backtracking-works',
        title: '为什么“做选择再撤销”是这题的本质',
        summary:
          '因为你要枚举的是一整棵决策树，而不是只找一条路径。每次选中一个数字后，当前路径向下延伸；等这条分支递归结束后，必须把刚才选的数字弹出去，并把 `used` 恢复成未使用状态，这样其他兄弟分支才有机会使用这个数字。没有“撤销”这一步，就无法完整遍历搜索树。',
        bullets: [
          '加入 `path` 是为了进入某条分支。',
          '递归调用是沿着这条分支继续向下搜。',
          '`path.pop()` 和 `used[i] = false` 是回到父节点时的恢复动作。',
          '回溯的对称性越完整，代码越不容易写错。',
        ],
        callout:
          '很多人第一次写回溯总是只记得 push，却忘了 pop。你要把它当成“进门”和“出门”两个配套动作来看，搜索树才能走得完整。',
      },
      {
        id: 'perm-optimal-solution',
        title: '标准解法：DFS 回溯搜索所有排列',
        summary:
          '准备结果数组 `result`、路径数组 `path` 和同长度的 `used` 数组。定义 `dfs()`：如果 `path.length === nums.length`，就把当前路径拷贝进答案。否则遍历所有位置，遇到还没使用的数字，就标记它、加入路径、递归、再恢复现场。整个过程会系统枚举出所有 `n!` 种排列。',
        bullets: [
          '时间复杂度是 `O(n × n!)``，因为共有 `n!` 个排列，每次拷贝答案要 `O(n)`。',
          '空间复杂度主要来自递归栈、`path` 和 `used`。',
          '这题不难在代码量，而难在你能不能把状态恢复写得对称稳定。',
          '如果数组里有重复元素，就需要在这套框架上额外加去重逻辑。',
        ],
        code: `function permute(nums: number[]): number[][] {
  const result: number[][] = []
  const path: number[] = []
  const used = new Array<boolean>(nums.length).fill(false)

  const dfs = () => {
    if (path.length === nums.length) {
      result.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) {
        continue
      }

      used[i] = true
      path.push(nums[i])
      dfs()
      path.pop()
      used[i] = false
    }
  }

  dfs()
  return result
}`,
      },
      {
        id: 'perm-example-walkthrough',
        title: '拿 `[1,2,3]` 手推一次',
        summary:
          '第一层可以先选 `1`、`2` 或 `3`。假设先选 `1`，路径变成 `[1]`；第二层剩下 `2` 和 `3` 可以选。如果接着选 `2`，路径变成 `[1,2]`，第三层只剩 `3`，于是得到 `[1,2,3]`。返回后撤销 `3`，再尝试 `[1,3,2]`。等所有以 `1` 开头的分支都走完，再回到第一层尝试以 `2`、`3` 开头的分支。',
        bullets: [
          '每一层都代表当前排列正在确定一个新位置。',
          '先深度走到底，再回退到上层改选项，这就是 DFS 回溯。',
          '以 `1` 开头会得到两种排列，以 `2` 开头也会得到两种，以 `3` 开头同理。',
          '最终总共有 6 种排列，也就是 `3!`。',
        ],
      },
      {
        id: 'perm-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是状态恢复不完整，或者把路径引用直接塞进结果导致答案被后续修改污染。真正写稳以后，你会发现大多数回溯题，本质上都在复用同一套骨架，只是状态和剪枝条件不同而已。',
        bullets: [
          '易错点 1：结果里直接 push `path`，没有拷贝，导致最终所有答案都一样。',
          '易错点 2：递归回来后忘记 `path.pop()` 或 `used[i] = false`。',
          '易错点 3：把全排列和组合题混淆，错误地使用起始下标限制搜索。',
          '延伸方向：全排列 II、子集、组合、N 皇后、电话号码的字母组合。',
        ],
        callout:
          '如果上一题在训练你把“最少步数”看成层数，这一题就在训练你把“所有可能”展开成搜索树。回溯真正的基础，不是一道题，而是这种对路径和状态恢复的敏感度。',
      },
    ],
  },
  {
    id: 'permutations-ii',
    label: '47. LeetCode 47. 全排列 II',
    difficulty: '中等',
    description:
      '这题是在上一题全排列基础上的关键升级版。难点不再是会不会回溯，而是当数组里有重复元素时，你能不能准确理解“同层去重”的边界，既不重复生成答案，也不误删合法分支。',
    outcome:
      '你能独立写出全排列 II 的回溯解法，理解为什么要先排序、为什么要用 `used` 数组配合同层去重条件，并真正掌握“同层不能重复选、不同层可以继续选”的回溯去重模型。',
    sections: [
      {
        id: 'perm2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个可包含重复数字的序列 `nums`，返回所有不重复的全排列。和上一题相比，最大的变化不是“还能不能回溯”，而是如何避免把相同值排列出重复答案。',
        bullets: [
          '数组里可能有相同的数字，比如两个 `1`。',
          '仍然要求每个排列都用完所有元素。',
          '最终答案不能重复。',
          '这题的核心不是生成排列，而是“生成时去重”。',
        ],
      },
      {
        id: 'perm2-why-previous-solution-repeats',
        title: '为什么上一题的写法会产生重复答案',
        summary:
          '如果你直接复用第 46 题的代码，当数组里有重复值时，不同下标但数值相同的元素会被当成不同选择，从而生成值完全一样的排列。比如 `[1,1,2]` 中，先选第一个 `1` 再选第二个 `1`，和先选第二个 `1` 再选第一个 `1`，最终排列值完全一样，但回溯树会把它们当成两条不同分支。',
        bullets: [
          '问题不是元素下标重复，而是数值重复。',
          '回溯树里会出现“值相同但来源下标不同”的平行分支。',
          '如果不处理，这些平行分支会产生重复答案。',
          '所以去重必须在搜索过程中完成，而不是最后再用 Set 暴力过滤。',
        ],
      },
      {
        id: 'perm2-why-sort-first',
        title: '为什么这题必须先排序',
        summary:
          '排序后，相同数字会靠在一起，你才能稳定判断“当前这个数字是不是和前一个值相同，并且前一个同值数字在这一层还没被用掉”。没有排序，就无法可靠地进行同层去重。这一点和组合总和 II、子集 II 等题完全一致：去重型回溯，第一步通常就是排序。',
        bullets: [
          '排序是为了让相同值相邻，方便比较相邻元素。',
          '去重条件依赖 `nums[i] === nums[i - 1]`，不排序就没法这么写。',
          '排序不是为了让答案有序，而是为了让剪枝有抓手。',
          '这类题里，排序往往是回溯去重的前置动作。',
        ],
        callout:
          '很多回溯去重题的第一步都是排序。不是为了好看，而是为了把“重复值”结构化地摆在一起，方便你定义清晰的剪枝边界。',
      },
      {
        id: 'perm2-core-idea',
        title: '核心思路：同层去重，不同层允许继续使用后一个重复值',
        summary:
          '依然使用 `path + used` 的回溯框架，但这次多一个关键剪枝：如果当前值和前一个值相同，并且前一个同值元素在当前分支还没有被使用，那么当前这个元素就要跳过。因为这说明你正在同一层里尝试开启一个与前面完全等价的分支。反过来，如果前一个同值元素已经在当前路径中被用掉了，那说明你已经进入更深一层，这时当前元素仍然可以合法使用。',
        bullets: [
          '仍然用 `used[i]` 记录某个下标是否已经放进当前路径。',
          '核心剪枝条件通常是 `i > 0 && nums[i] === nums[i - 1] && !used[i - 1]`。',
          '`!used[i - 1]` 表示前一个相同值还停留在同层，没有进入当前路径。',
          '这时跳过当前值，就能避免同层重复开枝。',
        ],
        callout:
          '“同层去重、不同层允许”是这题最核心的一句话。真正理解它，你后面再做子集 II、全排列 II、组合去重题，都会顺很多。',
      },
      {
        id: 'perm2-optimal-solution',
        title: '标准解法：排序后回溯 + used + 同层去重',
        summary:
          '先对数组排序。然后准备 `result`、`path` 和 `used`。递归过程中遍历每个位置，先跳过已经使用过的元素；再判断是否命中同层去重条件：如果当前值和前一个值相同，且前一个值此时没有被用进当前路径，就直接跳过。否则正常加入路径、递归、再撤销。这样就能只保留不重复的排列。',
        bullets: [
          '时间复杂度仍然和排列总数相关，最坏接近 `O(n × n!)`。',
          '空间复杂度主要来自递归栈、`path` 和 `used`。',
          '这题真正的关键代码不是 push/pop，而是同层去重那一行条件。',
          '去重必须发生在“决定是否进入分支”之前。',
        ],
        code: `function permuteUnique(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b)
  const result: number[][] = []
  const path: number[] = []
  const used = new Array<boolean>(sorted.length).fill(false)

  const dfs = () => {
    if (path.length === sorted.length) {
      result.push([...path])
      return
    }

    for (let i = 0; i < sorted.length; i += 1) {
      if (used[i]) {
        continue
      }

      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) {
        continue
      }

      used[i] = true
      path.push(sorted[i])
      dfs()
      path.pop()
      used[i] = false
    }
  }

  dfs()
  return result
}`,
      },
      {
        id: 'perm2-example-walkthrough',
        title: '拿 `[1,1,2]` 手推一次',
        summary:
          '排序后还是 `[1,1,2]`。第一层先选第一个 `1`，路径变成 `[1]`，后面可以继续选第二个 `1` 或 `2`。但当第一层回到第二个 `1` 时，因为它和前一个值相同，且前一个 `1` 此时并没有被当前路径使用，所以这条分支要跳过。否则它会和“先选第一个 `1`”生成完全相同的一批排列。',
        bullets: [
          '第一层可以选第一个 `1`，但不能再单独开第二个 `1` 的平行分支。',
          '如果第一层已经选了第一个 `1`，下一层仍然可以选第二个 `1`。',
          '这就是“同层去重，不同层允许”的直接体现。',
          '最终答案是 `[[1,1,2],[1,2,1],[2,1,1]]`。',
        ],
      },
      {
        id: 'perm2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把去重条件写错方向。很多人会误写成 `used[i - 1]`，结果把合法分支剪掉；也有人完全不做同层判断，导致答案重复。真正写稳后，你会发现这道题是理解“回溯去重边界”的关键母题，比死记模板更重要。',
        bullets: [
          '易错点 1：没排序就写相邻去重条件，逻辑会直接失效。',
          '易错点 2：把 `!used[i - 1]` 写成 `used[i - 1]`，误删合法分支。',
          '易错点 3：生成完答案后再用 Set 去重，既慢又绕过了题目真正考点。',
          '延伸方向：子集 II、组合总和 II、递增子序列、带重复元素的回溯去重题。',
        ],
        callout:
          '如果第 46 题在训练你“怎样展开搜索树”，这题就在训练你“怎样正确剪掉重复枝条”。真正会做回溯，不是能写递归，而是知道哪些枝条该留、哪些枝条必须在进入前就砍掉。',
      },
    ],
  },
  {
    id: 'rotate-image',
    label: '48. LeetCode 48. 旋转图像',
    difficulty: '中等',
    description:
      '这题是二维数组原地变换的代表题。难点不在于知道结果长什么样，而在于能不能把“顺时针旋转 90 度”拆成一系列可原地完成的矩阵操作，而不是额外开一个新矩阵硬拷贝。',
    outcome:
      '你能独立写出旋转图像的原地解法，理解为什么“先转置、再每行翻转”就等价于顺时针旋转 90 度，并掌握这类矩阵原地变换题的常见拆解方式。',
    sections: [
      {
        id: 'ri-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个 `n x n` 的二维矩阵 `matrix`，要求你将图像顺时针旋转 90 度。题目特别强调：必须原地修改，也就是不能额外申请另一个同尺寸矩阵来存答案。',
        bullets: [
          '矩阵一定是正方形，不是任意长方形。',
          '要求是顺时针旋转 90 度。',
          '必须原地修改，这是整题的关键限制。',
          '这本质上是一道矩阵坐标变换题。',
        ],
      },
      {
        id: 'ri-why-new-matrix-is-not-the-point',
        title: '为什么直接开新矩阵不算学会这题',
        summary:
          '如果不考虑原地限制，最直观的做法是建立一个新矩阵，把 `matrix[i][j]` 放到旋转后的正确位置上。这当然容易写，但题目真正想训练的是你对矩阵结构的理解。原地变换会逼你去找矩阵内部可复用的对称关系，而不是依赖额外空间掩盖思路。 ',
        bullets: [
          '新矩阵解法时间复杂度是 `O(n²)`，空间复杂度也是 `O(n²)`。',
          '题目要求原地，所以必须把空间复杂度压到 `O(1)`。',
          '能原地做出来，说明你真正理解了坐标关系。',
          '这类题的难点通常不在循环，而在变换拆解。 ',
        ],
      },
      {
        id: 'ri-core-observation',
        title: '核心观察：顺时针旋转可以拆成“转置 + 行翻转”',
        summary:
          '一个矩阵顺时针旋转 90 度，等价于先沿主对角线做转置，再把每一行左右翻转。转置会把行列互换，翻转则把列顺序倒过来，两步叠加后，效果正好就是顺时针旋转。这个拆法比硬记四元组轮换更稳定，也更容易写对。',
        bullets: [
          '转置后，`matrix[i][j]` 会和 `matrix[j][i]` 交换。',
          '每一行翻转后，左边和右边元素成对交换。',
          '两步组合后，位置关系和顺时针旋转完全一致。',
          '这是最常见也最稳的原地写法。',
        ],
        callout:
          '矩阵题真正要训练的是“把复杂变换拆成已知操作”的能力。直接记结论容易忘，能拆成转置和翻转，才算理解到位。',
      },
      {
        id: 'ri-why-transpose-plus-reverse-works',
        title: '为什么“转置 + 行翻转”一定正确',
        summary:
          '设原位置是 `(i, j)`。顺时针旋转 90 度后的目标位置应是 `(j, n - 1 - i)`。而如果先转置，`(i, j)` 会到 `(j, i)`；再把第 `j` 行翻转，`(j, i)` 会到 `(j, n - 1 - i)`。这和目标位置完全一致，所以两步操作严格等价于顺时针旋转。',
        bullets: [
          '目标变换公式是 `(i, j) -> (j, n - 1 - i)`。',
          '转置公式是 `(i, j) -> (j, i)`。',
          '行翻转会把列 `i` 变成 `n - 1 - i`。',
          '两步连起来，刚好得到目标旋转位置。',
        ],
        callout:
          '很多矩阵题一旦你能写出坐标映射公式，代码就只是落地。不会推公式时，往往只能靠背模板。',
      },
      {
        id: 'ri-optimal-solution',
        title: '标准解法：先转置，再逐行反转',
        summary:
          '第一步，遍历上三角区域，让 `matrix[i][j]` 和 `matrix[j][i]` 交换，完成转置。第二步，遍历每一行，用双指针从两端向中间交换，完成整行翻转。两步结束后，矩阵就原地顺时针旋转了 90 度。',
        bullets: [
          '时间复杂度是 `O(n²)`，因为每个元素最多被访问常数次。',
          '额外空间复杂度是 `O(1)`。',
          '转置时只需要处理上三角，不要重复交换。',
          '行翻转本质上就是一维数组双指针交换。',
        ],
        code: `function rotate(matrix: number[][]): void {
  const n = matrix.length

  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }

  for (let i = 0; i < n; i += 1) {
    let left = 0
    let right = n - 1

    while (left < right) {
      ;[matrix[i][left], matrix[i][right]] = [
        matrix[i][right],
        matrix[i][left],
      ]
      left += 1
      right -= 1
    }
  }
}`,
      },
      {
        id: 'ri-example-walkthrough',
        title: '拿 `[[1,2,3],[4,5,6],[7,8,9]]` 手推一次',
        summary:
          '先转置后得到 `[[1,4,7],[2,5,8],[3,6,9]]`。再把每一行左右翻转，最终变成 `[[7,4,1],[8,5,2],[9,6,3]]`，这正是原矩阵顺时针旋转 90 度后的结果。你会发现整个过程没有引入新矩阵，只是在原地不断交换元素。',
        bullets: [
          '转置先完成行列互换。',
          '每行翻转后，列顺序被倒过来。',
          '最终结果和直观旋转后的图像一致。',
          '这就是原地变换的核心思路。',
        ],
      },
      {
        id: 'ri-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是转置时循环边界写错，或者把行翻转和列翻转搞混。真正掌握后，你会发现很多矩阵题其实都可以拆成若干基础对称操作，比如翻转、转置、分层交换。它们的核心不是记答案，而是建立对坐标变换的敏感度。',
        bullets: [
          '易错点 1：转置时从 `j = 0` 开始，导致元素被交换两次。',
          '易错点 2：顺时针旋转却写成列翻转，结果方向反了。',
          '易错点 3：把正方形矩阵和普通矩阵的处理方式混在一起。',
          '延伸方向：螺旋矩阵、矩阵置零、对角线遍历、图像翻转类题目。',
        ],
        callout:
          '如果前面的题在训练你做回溯去重，这一题则在训练你如何把空间变换压成原地操作。二维数组题做到后面，这种坐标视角非常值钱。',
      },
    ],
  },
  {
    id: 'group-anagrams',
    label: '49. LeetCode 49. 字母异位词分组',
    difficulty: '中等',
    description:
      '这题是哈希映射在字符串分类问题里的标准代表。难点不在于知道“字母异位词”是什么意思，而在于能不能把“属于同一组”的判定条件稳定压缩成一个可作为哈希 key 的表示。',
    outcome:
      '你能独立写出字母异位词分组的哈希表解法，理解为什么排序后字符串可以作为分组 key，并掌握这类“归一化后分组”的高频做题模型。',
    sections: [
      {
        id: 'ga-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串数组 `strs`，要求把字母异位词分到同一组里，并返回所有分组结果。字母异位词指的是字符种类和出现次数完全相同，只是排列顺序不同的字符串，比如 `"eat"`、`"tea"`、`"ate"`。',
        bullets: [
          '同组字符串的字符组成必须完全一致。',
          '顺序不重要，只看字符集合和频次。',
          '结果是分组后的二维数组，不是布尔判断。',
          '这是一道非常典型的分类聚合题。',
        ],
      },
      {
        id: 'ga-core-question',
        title: '真正的问题：如何判断两个字符串属于同一组',
        summary:
          '如果每次比较两个字符串，都去逐个统计字符并互相对比，当然能做，但会非常低效。真正需要解决的是：能不能为每个字符串构造一个“标准形态”，让所有属于同一组的字符串都映射成同一个 key。只要这个 key 稳定，就能直接用哈希表分组。',
        bullets: [
          '同组的判断条件必须被压缩成统一 key。',
          '这个 key 要对同组字符串相同、对不同组字符串不同。',
          '一旦有了 key，问题就变成“按 key 聚合”。',
          '这类题的核心常常不是遍历，而是 key 设计。',
        ],
        callout:
          '很多哈希题的真正难点从来不是 Map 的用法，而是“拿什么做 key”。key 设计对了，题目几乎自动变简单。',
      },
      {
        id: 'ga-sorted-key-idea',
        title: '最稳的 key：把字符串排序后作为标准形态',
        summary:
          '如果两个字符串互为字母异位词，那么把它们的字符排序后，结果一定一样。比如 `"eat"`、`"tea"`、`"ate"` 排序后都会变成 `"aet"`。因此可以把“排序后的字符串”作为分组 key，值则是当前组里所有原始字符串的列表。',
        bullets: [
          '排序会消除字符原始排列顺序的差异。',
          '字符种类和频次相同的字符串，排序结果必然相同。',
          '不同组字符串通常会得到不同的排序结果。',
          '这是这题最常见也最容易写稳的方案。',
        ],
        callout:
          '这类“先归一化，再聚合”的题，在工程里也很常见。比如去重、分类、缓存 key 构建，本质都是先把对象变成统一表示。',
      },
      {
        id: 'ga-optimal-solution',
        title: '标准解法：排序字符串 + Map 分组',
        summary:
          '遍历每个字符串，把它拆成字符数组排序后再拼回字符串，得到 key。然后去 `Map<string, string[]>` 里取当前组：如果还没有，就先建空数组；最后把原字符串推进对应分组。遍历完成后，返回 Map 的所有 value 即可。',
        bullets: [
          '时间复杂度主要来自每个字符串排序，若平均长度为 `k`，总复杂度约为 `O(n × k log k)`。',
          '空间复杂度主要来自哈希表和结果数组。',
          'Map 的 key 用排序后的字符串，value 用原始字符串列表。',
          '结果里放的是原字符串，不是排序后的 key。',
        ],
        code: `function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>()

  for (const str of strs) {
    const key = str.split('').sort().join('')

    if (!groups.has(key)) {
      groups.set(key, [])
    }

    groups.get(key)!.push(str)
  }

  return [...groups.values()]
}`,
      },
      {
        id: 'ga-example-walkthrough',
        title: '拿 `["eat","tea","tan","ate","nat","bat"]` 手推一次',
        summary:
          '先处理 `"eat"`，排序后 key 是 `"aet"`，于是建立分组 `["eat"]`。接着 `"tea"` 和 `"ate"` 排序后也是 `"aet"`，都放进同一组。`"tan"` 和 `"nat"` 排序后是 `"ant"`，进入另一组；`"bat"` 排序后是 `"abt"`，单独成组。最终就得到三组结果。',
        bullets: [
          '`"eat"`、`"tea"`、`"ate"` -> key `"aet"`。',
          '`"tan"`、`"nat"` -> key `"ant"`。',
          '`"bat"` -> key `"abt"`。',
          '问题本质就是“同 key 聚合”。',
        ],
      },
      {
        id: 'ga-alternative-key',
        title: '除了排序 key，还可以用字符计数 key',
        summary:
          '如果字符串都只包含小写英文字母，还可以用长度为 26 的频次数组作为 key，再把它序列化成字符串。这样就不用排序。但在面试和日常刷题里，排序 key 更直观、更稳，也更容易第一时间写对。',
        bullets: [
          '计数 key 的时间复杂度通常是 `O(k)`。',
          '但需要更明确地处理字符集范围。',
          '排序 key 更通用，代码也更短。',
          '计数 key 更像是对性能的进一步优化方案。',
        ],
      },
      {
        id: 'ga-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是 key 设计不稳定，或者把排序后的字符串直接放进答案。真正掌握后，你会发现很多字符串分类题，本质上都可以抽象成“找归一化表示 + 哈希聚合”。这是一类很高频的思路。',
        bullets: [
          '易错点 1：把原字符串当 key，导致同组无法聚合。',
          '易错点 2：返回的是 key 列表而不是原始字符串分组。',
          '易错点 3：排序时忘记重新拼接成字符串，导致 key 类型混乱。',
          '延伸方向：有效的字母异位词、查找字符串中的所有字母异位词、按特征归类的哈希题。',
        ],
        callout:
          '如果上一题在训练你做矩阵原地变换，这一题则在训练你设计“分类 key”。很多中等题看似在考容器，实际上考的是你能不能先把对象压成稳定表示。',
      },
    ],
  },
  {
    id: 'powx-n',
    label: '50. LeetCode 50. Pow(x, n)',
    difficulty: '中等',
    description:
      '这题是快速幂思想的标准入门题。难点不在于算乘方，而在于能不能意识到没有必要把 `x` 连乘 `n` 次，完全可以利用指数的二进制拆分把复杂度从线性压到对数级。',
    outcome:
      '你能独立写出 `Pow(x, n)` 的快速幂解法，理解为什么指数每次减半就能显著提速，并掌握这类“通过平方复用结果”的对数级递推模型。',
    sections: [
      {
        id: 'pow-problem-summary',
        title: '题目在问什么',
        summary:
          '实现 `pow(x, n)`，也就是计算 `x` 的 `n` 次幂。其中 `x` 是浮点数，`n` 是整数，可以为正、为负，也可以为 0。题目表面看是数学题，实际上重点是如何高效处理大指数。 ',
        bullets: [
          '`n` 可能很大，所以不能简单循环乘很多次。',
          '`n` 可能为负数，需要先转化问题。',
          '`n = 0` 时结果恒为 1。',
          '关键不是“能算出来”，而是“怎么高效算出来”。',
        ],
      },
      {
        id: 'pow-why-bruteforce-is-too-slow',
        title: '为什么暴力连乘不够',
        summary:
          '最直接的想法是把 `x` 连乘 `|n|` 次。这在小数据下没问题，但如果 `n` 很大，时间复杂度就是 `O(n)`，明显不划算。题目真正想考的是：既然乘方有重复结构，能不能把中间结果复用起来，而不是每次都重新乘一遍。',
        bullets: [
          '暴力法的核心问题是重复计算太多。',
          '`x^8` 不必从 `x` 乘 8 次，可以从 `x^4` 再平方得到。',
          '乘方问题天然有“结果可复用”的结构。',
          '这正是快速幂能成立的基础。',
        ],
      },
      {
        id: 'pow-core-observation',
        title: '核心观察：指数每减半一次，问题规模就砍半',
        summary:
          '如果 `n` 是偶数，那么 `x^n = (x^(n/2))²`；如果 `n` 是奇数，那么 `x^n = (x^((n-1)/2))² × x`。这意味着每次都可以把问题规模从 `n` 直接减到 `n / 2`，从而把总体复杂度压到 `O(log n)`。这就是快速幂的本质。 ',
        bullets: [
          '偶数指数可以直接对半拆。',
          '奇数指数可以先拆掉一个 `x`，剩余部分再对半。',
          '每一步都在平方中复用上一步结果。',
          '规模按二分下降，是对数复杂度的根源。',
        ],
        callout:
          '很多对数级算法的共同点，不是“会二分”，而是能不能把原问题缩成“同类但规模更小”的一半。快速幂就是最经典的例子。',
      },
      {
        id: 'pow-negative-exponent',
        title: '负指数该怎么处理',
        summary:
          '如果 `n` 是负数，那么 `x^n = 1 / x^(-n)`。所以可以先把问题转换成正指数，再套同样的快速幂逻辑。唯一需要注意的是：某些语言里最小负整数取反会溢出，因此实现时要特别留意整数范围。但在 TypeScript 里这里通常不会成为问题。',
        bullets: [
          '负指数本质上是倒数问题。',
          '先转成正指数，再复用快速幂逻辑即可。',
          '代码里要先处理 `n < 0` 的分支。',
          '正负指数的核心算法其实完全相同。',
        ],
      },
      {
        id: 'pow-optimal-solution',
        title: '标准解法：迭代快速幂',
        summary:
          '准备结果 `result = 1`，底数 `base = x`，指数 `exponent = |n|`。循环中，如果当前指数最低位是 1，就把当前底数乘进结果；然后把底数自乘，指数右移一位。这个过程相当于按照指数的二进制位来决定哪些幂次需要参与乘积。最后如果原指数是负数，再返回 `1 / result`。',
        bullets: [
          '时间复杂度是 `O(log n)`。',
          '额外空间复杂度是 `O(1)`。',
          '迭代写法比递归更直接，也更省栈空间。',
          '本质上是在按二进制拆解指数。',
        ],
        code: `function myPow(x: number, n: number): number {
  let exponent = Math.abs(n)
  let base = x
  let result = 1

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result *= base
    }

    base *= base
    exponent = Math.floor(exponent / 2)
  }

  return n < 0 ? 1 / result : result
}`,
      },
      {
        id: 'pow-example-walkthrough',
        title: '拿 `x = 2, n = 10` 手推一次',
        summary:
          '`10` 的二进制是 `1010`。初始 `result = 1`，`base = 2`。第一轮指数是偶数，不乘进结果，只让 `base` 变成 `4`；第二轮指数最低位是 1，于是把 `4` 乘进结果；继续平方底数并缩小指数，直到指数归零。最终得到 `1024`。整个过程没有做 10 次连乘，而是不断平方和挑选需要参与的幂次。',
        bullets: [
          '指数每轮都减半。',
          '底数每轮都平方。',
          '只有二进制位为 1 时，当前底数才会乘进结果。',
          '这就是快速幂和普通连乘的本质区别。',
        ],
      },
      {
        id: 'pow-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是知道公式但不知道如何在代码里按位推进，或者忘记处理负指数。真正写稳后，你会发现快速幂不仅是面试高频题，也是很多数论和模运算题的基础工具。它背后训练的，是把重复乘法压成对数级递推的能力。',
        bullets: [
          '易错点 1：负指数直接暴力算，最后再取倒数，效率还是太低。',
          '易错点 2：奇数指数时忘记把当前底数乘进结果。',
          '易错点 3：把快速幂写成递归后边界不稳，导致死循环或结果错误。',
          '延伸方向：模快速幂、矩阵快速幂、斐波那契优化、数论题中的指数计算。',
        ],
        callout:
          '如果上一题在训练你设计字符串分组 key，这一题就在训练你把线性重复计算压成对数级过程。真正值钱的，不是背“快速幂”这个名词，而是这种规模减半的思维。',
      },
    ],
  },
  {
    id: 'n-queens',
    label: '51. LeetCode 51. N 皇后',
    difficulty: '困难',
    description:
      '这题是回溯搜索里的经典代表。难点不在于知道“皇后不能互相攻击”，而在于能不能把约束条件压成高效判定，并在搜索过程中有条理地做选择、递归、回退。',
    outcome:
      '你能独立写出 N 皇后的回溯解法，理解为什么按行搜索最自然，掌握列、主对角线、副对角线的冲突判定方式，并真正吃透“构造所有可行解”的搜索模型。',
    sections: [
      {
        id: 'nq-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数 `n`，要求你在 `n x n` 的棋盘上放置 `n` 个皇后，并且任意两个皇后都不能互相攻击。皇后的攻击范围包括同一行、同一列和两条对角线。题目要求返回所有不同的合法摆法，每种摆法要按字符串棋盘形式表示。',
        bullets: [
          '每一行最终都要放一个皇后。',
          '同一列不能重复放皇后。',
          '主对角线和副对角线也不能冲突。',
          '返回的是所有解，而不是只判断有没有解。',
        ],
      },
      {
        id: 'nq-why-backtracking',
        title: '为什么这是标准回溯题',
        summary:
          '这题本质上是在一个受约束的搜索空间里，逐步构造合法方案。你在第 0 行放一个皇后后，会直接影响后续所有行的可选位置；如果后面走不通，就必须撤销当前选择重新尝试。这正是回溯的标准形态：做选择、进入下一层、发现不合法就回退。',
        bullets: [
          '每一层代表“当前处理哪一行”。',
          '每个选择代表“这一行把皇后放在哪一列”。',
          '后续走不通时，要撤销当前选择再试下一个位置。',
          '这种问题天然适合 DFS + 回溯。',
        ],
        callout:
          '很多人以为回溯题难在模板，实际上真正的难点是：你能不能定义清楚“层、选择、结束条件、非法剪枝”这四件事。',
      },
      {
        id: 'nq-core-observation',
        title: '核心观察：按行放置，冲突判断最清晰',
        summary:
          '因为同一行一定只能放一个皇后，所以最自然的搜索方式是“一行一行地放”。这样做的好处是：行冲突天然消失，你只需要关心列和两类对角线是否已经被占用。相比在整个棋盘上乱试位置，按行推进的状态结构更稳定，代码也更容易写对。',
        bullets: [
          '处理到第 `row` 行时，只需要决定这一行的列位置。',
          '每行只放一个，行冲突无需额外判断。',
          '列冲突可以用集合或布尔数组记录。',
          '对角线冲突同样可以预先标记。',
        ],
      },
      {
        id: 'nq-diagonal-rule',
        title: '最关键的点：怎么判断对角线冲突',
        summary:
          '如果两个位置 `(r1, c1)` 和 `(r2, c2)` 在同一条主对角线，那么它们满足 `r1 - c1 = r2 - c2`；如果在同一条副对角线，则满足 `r1 + c1 = r2 + c2`。所以在搜索过程中，只要记录已经被占用的列、主对角线和值、副对角线和值，就能在 `O(1)` 时间判断某个位置是否可放。',
        bullets: [
          '列标识直接用 `col`。',
          '主对角线标识用 `row - col`。',
          '副对角线标识用 `row + col`。',
          '这就是剪枝效率的关键来源。',
        ],
        callout:
          '很多棋盘回溯题一旦能把“几何关系”压缩成简单表达式，判定复杂度就会明显下降。N 皇后最值钱的公式，就是这两条对角线特征值。',
      },
      {
        id: 'nq-optimal-solution',
        title: '标准解法：DFS 按行搜索 + 三组占用标记',
        summary:
          '准备三个集合，分别记录已占用的列、主对角线、副对角线。然后从第 0 行开始递归，尝试在每一列放皇后。如果当前位置合法，就写入棋盘、标记占用并递归下一行；回来时再把棋盘和标记都恢复。走到 `row === n` 时，说明找到一组完整解，把当前棋盘加入答案即可。',
        bullets: [
          '时间复杂度无法简单写成一个紧值，本质上是指数级搜索。',
          '但大量非法分支会被列和对角线剪掉。',
          '空间复杂度主要来自递归栈和当前棋盘状态。',
          '这题的重点从来不是复杂度公式，而是状态建模和剪枝质量。',
        ],
        code: `function solveNQueens(n: number): string[][] {
  const result: string[][] = []
  const board = Array.from({ length: n }, () => '.'.repeat(n).split(''))
  const cols = new Set<number>()
  const diagonals1 = new Set<number>()
  const diagonals2 = new Set<number>()

  const dfs = (row: number) => {
    if (row === n) {
      result.push(board.map((line) => line.join('')))
      return
    }

    for (let col = 0; col < n; col += 1) {
      const diagonal1 = row - col
      const diagonal2 = row + col

      if (
        cols.has(col) ||
        diagonals1.has(diagonal1) ||
        diagonals2.has(diagonal2)
      ) {
        continue
      }

      board[row][col] = 'Q'
      cols.add(col)
      diagonals1.add(diagonal1)
      diagonals2.add(diagonal2)

      dfs(row + 1)

      board[row][col] = '.'
      cols.delete(col)
      diagonals1.delete(diagonal1)
      diagonals2.delete(diagonal2)
    }
  }

  dfs(0)
  return result
}`,
      },
      {
        id: 'nq-example-walkthrough',
        title: '拿 `n = 4` 理解搜索过程',
        summary:
          '第一行如果先把皇后放在第 0 列，第二行就只能尝试剩余不冲突的位置。继续往下，如果某一行发现所有列都冲突，说明前面的摆法有问题，必须回退上一层改位置。最终经过不断试探和回退，`n = 4` 会得到两组合法解。这种“走不通就退回来重试”的过程，就是回溯本身。',
        bullets: [
          '前面的选择会直接压缩后续可选空间。',
          '某一层无路可走时，要回到上一层改列。',
          '每找到一组完整摆法，就收集一次答案。',
          '这题最核心的是搜索树视角，而不是棋盘画图本身。',
        ],
      },
      {
        id: 'nq-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是对角线判定写错，或者回退时忘记恢复状态。真正掌握后，你会发现大量组合搜索题本质都一样：状态表示越清楚，剪枝越自然，回溯代码就越稳。N 皇后是训练这套能力的高价值样板题。',
        bullets: [
          '易错点 1：把 `row - col` 和 `row + col` 两类对角线搞混。',
          '易错点 2：回溯回来后忘记删除列或对角线标记。',
          '易错点 3：保存答案时直接引用原棋盘，导致后续被修改污染。',
          '延伸方向：N 皇后 II、数独、全排列、组合总和、棋盘类回溯搜索。',
        ],
        callout:
          '如果前一题在训练你做规模减半，这一题就在训练你建立搜索树和剪枝视角。真正会做回溯的人，不是记住 DFS 模板，而是能把约束压成快速判定。',
      },
    ],
  },
  {
    id: 'n-queens-ii',
    label: '52. LeetCode 52. N 皇后 II',
    difficulty: '困难',
    description:
      '这题和上一题的约束完全一样，但目标从“返回所有棋盘”变成“只统计解的数量”。难点不在题目本身变复杂，而在于你能不能看出：输出形式一变，状态保存和性能关注点也应该跟着变。',
    outcome:
      '你能在 N 皇后搜索框架上快速改写出只计数的版本，理解为什么“不存棋盘只计数”能让实现更轻，并掌握这类“同一搜索树、不同输出目标”的变体处理方式。',
    sections: [
      {
        id: 'nq2-problem-summary',
        title: '题目在问什么',
        summary:
          '仍然是在 `n x n` 的棋盘上放置 `n` 个皇后，要求任意两个皇后都不能互相攻击。但这次不要求返回具体摆法，只要返回不同合法摆法的总数量即可。',
        bullets: [
          '约束条件和 51 题完全相同。',
          '区别只在输出：这次只要个数。',
          '不需要保存每个棋盘方案。',
          '这是典型的“同题型小变体”。',
        ],
      },
      {
        id: 'nq2-relationship-with-51',
        title: '和上一题的关系：搜索树不变，收集方式变了',
        summary:
          '这题的本质搜索过程和 51 题完全一致，仍然是一行一行放皇后、用列和对角线做剪枝。唯一变化是：当你走到叶子节点时，不再把棋盘放进结果数组，而是把计数器加一。这意味着代码结构可以几乎原样复用，只要把“保存结果”的部分改成“累计数量”即可。',
        bullets: [
          '状态定义不变。',
          '剪枝逻辑不变。',
          '递归终止条件不变。',
          '只把“收集答案”的动作改成计数。',
        ],
        callout:
          '很多题目的变体，并不是要求你推翻重写，而是要求你识别“哪些是问题本质，哪些只是输出层差异”。这正是刷题迁移能力的体现。',
      },
      {
        id: 'nq2-why-counting-is-lighter',
        title: '为什么只计数会更轻',
        summary:
          '在 51 题里，你每找到一组解都要把整个棋盘复制出来并存进结果数组，这会带来额外空间和拷贝成本。52 题只统计总数，所以你根本不需要保留完整棋盘，甚至连字符矩阵都可以省掉，只保留列和对角线占用信息。这让实现更紧凑，性能也更稳。',
        bullets: [
          '不用保存所有解，空间负担更小。',
          '不用复制棋盘，叶子节点处理更快。',
          '只保留必要的约束状态即可。',
          '这是“输出目标改变，状态也随之瘦身”的典型例子。',
        ],
      },
      {
        id: 'nq2-optimal-solution',
        title: '标准解法：沿用回溯框架，叶子节点直接计数',
        summary:
          '继续使用三个集合记录列、主对角线、副对角线占用情况。从第 0 行开始递归，尝试每一列是否合法。若某个位置可放，就更新标记进入下一行；若 `row === n`，说明找到一组完整解，直接让答案加一即可。整个过程不需要构造棋盘字符串。',
        bullets: [
          '时间复杂度仍然是指数级搜索。',
          '相比 51 题，常数开销更小。',
          '因为不存棋盘，实现可以更专注于约束判定。',
          '这是典型的“只数方案数”的 DFS 变体。',
        ],
        code: `function totalNQueens(n: number): number {
  let count = 0
  const cols = new Set<number>()
  const diagonals1 = new Set<number>()
  const diagonals2 = new Set<number>()

  const dfs = (row: number) => {
    if (row === n) {
      count += 1
      return
    }

    for (let col = 0; col < n; col += 1) {
      const diagonal1 = row - col
      const diagonal2 = row + col

      if (
        cols.has(col) ||
        diagonals1.has(diagonal1) ||
        diagonals2.has(diagonal2)
      ) {
        continue
      }

      cols.add(col)
      diagonals1.add(diagonal1)
      diagonals2.add(diagonal2)

      dfs(row + 1)

      cols.delete(col)
      diagonals1.delete(diagonal1)
      diagonals2.delete(diagonal2)
    }
  }

  dfs(0)
  return count
}`,
      },
      {
        id: 'nq2-example-walkthrough',
        title: '拿 `n = 4` 看计数是怎么来的',
        summary:
          '搜索路径和 51 题一模一样，只不过这次你不关心每组棋盘长什么样，只关心到底有几条完整合法路径能走到叶子节点。对 `n = 4` 来说，最终会有两次走到 `row === 4`，因此答案就是 `2`。这就说明：方案计数问题，本质上就是“合法叶子节点数量统计”。',
        bullets: [
          '每到一层都尝试当前行所有列。',
          '被占用的列或对角线直接剪枝。',
          '走到最后一层就说明找到一组完整解。',
          '把合法叶子节点个数累计起来就是答案。',
        ],
      },
      {
        id: 'nq2-comparison-with-51',
        title: '51 和 52 最大的学习点：别把“结果展示”当成“问题本体”',
        summary:
          '很多人做题时容易被返回值形式牵着走，好像 51 题和 52 题是两道完全不同的题。实际上，它们的搜索本体是一模一样的，只是一个要收集所有终局棋盘，一个只统计终局数量。真正成熟的做题者，会先识别核心搜索树，再根据结果目标调整存储策略。',
        bullets: [
          '同一棵搜索树可以服务不同输出目标。',
          '返回所有方案时，要保存路径内容。',
          '只求数量时，路径内容可以大幅裁剪。',
          '这类抽象能力会直接提升后续变体题速度。',
        ],
      },
      {
        id: 'nq2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是明明只要求计数，却还沿用完整棋盘存储，导致实现又重又绕；或者回溯时忘记恢复占用状态。真正掌握后，你会越来越敏感于“输出形式变化后，状态该不该跟着瘦身”。',
        bullets: [
          '易错点 1：只计数却还保留完整棋盘，代码复杂度没降下来。',
          '易错点 2：回退时漏删集合标记，导致后续搜索被错误剪掉。',
          '易错点 3：把 51 题和 52 题当成两套完全不同的方法。',
          '延伸方向：组合计数、合法路径数、只问数量不问方案的回溯变体。',
        ],
        callout:
          '如果 51 题在训练你构造方案，这一题就在训练你识别“同一搜索，换一种输出”。真正厉害的地方，不是再写一遍代码，而是看出哪里可以复用、哪里可以瘦身。',
      },
    ],
  },
  {
    id: 'maximum-subarray',
    label: '53. LeetCode 53. 最大子数组和',
    difficulty: '中等',
    description:
      '这题是动态规划和贪心思维的经典入门题。难点不在于会不会枚举子数组，而在于能不能意识到：一个位置结尾的最优答案，其实只和前一个位置的最优状态有关。',
    outcome:
      '你能独立写出最大子数组和的线性解法，理解“当前位置要么接上前面的和，要么从自己重新开始”的状态转移，并掌握 Kadane 算法这类一维最优子结构模型。',
    sections: [
      {
        id: 'ms-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数数组 `nums`，要求找出一个具有最大和的连续子数组，并返回这个最大和。注意关键字是“连续”，也就是说不能随便跳着选数。',
        bullets: [
          '子数组必须连续。',
          '目标是让元素和最大。',
          '数组里可能全是负数。',
          '只返回最大和，不要求返回区间位置。',
        ],
      },
      {
        id: 'ms-why-bruteforce-is-bad',
        title: '为什么暴力枚举不是重点',
        summary:
          '最直观的办法是枚举所有子数组，再计算它们的和。这样当然能做，但时间复杂度至少是 `O(n²)`，如果再现算区间和甚至会更慢。题目真正想训练的是：你能不能利用连续子数组的结构，在一次遍历中持续维护“当前最优”。',
        bullets: [
          '暴力法能做，但不够优雅也不够高效。',
          '连续子数组问题通常隐藏着状态延续关系。',
          '真正的突破点，是不要重复计算前缀贡献。',
          '这类题的价值在于学会线性状态推进。',
        ],
      },
      {
        id: 'ms-core-observation',
        title: '核心观察：以 `i` 结尾的最优子数组，只取决于前一个状态',
        summary:
          '当你走到位置 `i` 时，如果想知道“以 `nums[i]` 结尾的最大子数组和”是多少，其实只有两种选择：要么把 `nums[i]` 单独作为新的起点；要么把它接到“以 `i - 1` 结尾的最大子数组和”后面。也就是说，当前位置的最优值只依赖前一个位置的最优值。',
        bullets: [
          '如果前面的和是负数，接上只会拖后腿。',
          '如果前面的和是正数，接上通常更有价值。',
          '所以状态转移只需要比较“重新开始”和“继续延续”。',
          '这就是一维动态规划最经典的思路之一。',
        ],
        callout:
          '很多线性 DP 的灵魂都一样：别去回看所有历史，只盯住“对当前决策真正有用的那个压缩状态”。最大子数组和就是最经典的例子。',
      },
      {
        id: 'ms-state-transition',
        title: '状态转移怎么写',
        summary:
          '设 `dp[i]` 表示“以 `i` 结尾的最大子数组和”。那么 `dp[i] = max(nums[i], dp[i - 1] + nums[i])`。含义非常直接：当前位置要么自己重新开一段，要么接在前一段最优结果后面。最终答案则是所有 `dp[i]` 中的最大值。',
        bullets: [
          '`nums[i]` 表示从当前位置重新开始。',
          '`dp[i - 1] + nums[i]` 表示延续前面的最佳连续段。',
          '两者取大，就是以当前点结尾的最佳结果。',
          '全局最大值要在遍历过程中同步维护。',
        ],
      },
      {
        id: 'ms-optimal-solution',
        title: '标准解法：Kadane 算法 / 空间压缩 DP',
        summary:
          '因为 `dp[i]` 只依赖 `dp[i - 1]`，所以没必要真的开一个数组。只需要一个变量 `current` 记录“当前结尾最优和”，再用一个变量 `best` 记录全局最大值。遍历每个元素时，更新 `current = max(num, current + num)`，然后同步更新 `best` 即可。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '额外空间复杂度是 `O(1)`。',
          '这是动态规划压缩空间后的标准写法。',
          '很多人也把它直接称为 Kadane 算法。',
        ],
        code: `function maxSubArray(nums: number[]): number {
  let current = nums[0]
  let best = nums[0]

  for (let i = 1; i < nums.length; i += 1) {
    current = Math.max(nums[i], current + nums[i])
    best = Math.max(best, current)
  }

  return best
}`,
      },
      {
        id: 'ms-example-walkthrough',
        title: '拿 `[-2,1,-3,4,-1,2,1,-5,4]` 手推一次',
        summary:
          '开始时 `current = best = -2`。走到 `1` 时，重新开始比接上 `-2` 更好，所以 `current = 1`；后面走到 `4` 时又重新开段，接着 `-1、2、1` 后得到 `6`，这对应子数组 `[4,-1,2,1]`。整个过程中你会发现，算法始终只关心“当前位置结尾的最好结果”和“全局最好结果”。',
        bullets: [
          '当前和一旦变成负贡献，就值得放弃重新开始。',
          '正贡献段会被持续累加。',
          '全局最优不一定出现在最后一个位置。',
          '答案 `6` 来自连续段 `[4,-1,2,1]`。',
        ],
      },
      {
        id: 'ms-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“连续”忽略掉，或者初始化写错导致全负数组出问题。真正掌握后，你会发现许多一维最优子段问题都共享这种模式：当前位置的最优解，只由“自己重新开始”与“继承前一段”二选一决定。',
        bullets: [
          '易错点 1：初始化成 `0`，导致全负数组答案错误。',
          '易错点 2：只维护当前和，却忘了同步更新全局最大值。',
          '易错点 3：把它当成普通前缀和题，而没看出局部最优延续关系。',
          '延伸方向：乘积最大子数组、环形子数组最大和、股票题、一维 DP 优化问题。',
        ],
        callout:
          '如果前两题在训练你搭搜索树和做变体迁移，这一题就在训练你做状态压缩。真正重要的不是记住 Kadane 这个名字，而是理解“当前位置的最优，只需要前一个局部最优”。',
      },
    ],
  },
  {
    id: 'spiral-matrix',
    label: '54. LeetCode 54. 螺旋矩阵',
    difficulty: '中等',
    description:
      '这题是二维数组遍历控制的经典题。难点不在于知道输出顺序长什么样，而在于能不能把上、右、下、左四个方向的边界收缩写得稳定，不重复、不漏元素。',
    outcome:
      '你能独立写出螺旋矩阵的分层遍历解法，掌握上下左右四条边界如何同步收缩，并真正建立处理二维遍历顺序题的边界控制意识。',
    sections: [
      {
        id: 'sm-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个 `m x n` 的矩阵，要求你按照顺时针螺旋顺序返回矩阵中的所有元素。也就是说，先从左到右走第一行，再从上到下走最右列，再从右到左走最下行，再从下到上走最左列，然后继续往里一层一层收缩。',
        bullets: [
          '遍历顺序是顺时针螺旋。',
          '矩阵不一定是正方形，可能是长方形。',
          '每个元素都要访问一次且只访问一次。',
          '关键难点是边界收缩和重复访问控制。',
        ],
      },
      {
        id: 'sm-core-observation',
        title: '核心观察：本质是在一圈一圈地剥洋葱',
        summary:
          '如果从整体上看，这道题其实就是不断处理矩阵最外层的一圈：上边一行、右边一列、下边一行、左边一列。处理完一圈后，把上下左右四条边界都向内缩一格，再继续处理下一圈。这个视角一建立，代码就会清晰很多。',
        bullets: [
          '最外层一圈对应四次方向遍历。',
          '每次走完一个方向，就要更新对应边界。',
          '边界更新后，下一层矩阵自然变小。',
          '这就是典型的分层遍历题。',
        ],
        callout:
          '很多二维数组题一旦你能把它看成“分层处理”，就会比单纯在脑子里模拟路径更稳定。螺旋矩阵最值钱的就是这种分层意识。',
      },
      {
        id: 'sm-boundary-model',
        title: '最关键的建模：四条边界',
        summary:
          '用四个变量 `top`、`bottom`、`left`、`right` 分别表示当前还没遍历过区域的上、下、左、右边界。每次按顺序遍历一条边后，就把对应边界收缩。比如遍历完最上面一行后，`top += 1`；遍历完最右一列后，`right -= 1`。整个过程一直持续到边界交错为止。',
        bullets: [
          '`top` 和 `bottom` 控制行范围。',
          '`left` 和 `right` 控制列范围。',
          '每个方向走完后立即收缩边界。',
          '循环终止条件是边界交错。',
        ],
      },
      {
        id: 'sm-why-extra-checks',
        title: '为什么中间要多做两次边界判断',
        summary:
          '当矩阵只剩下一行或一列时，如果你还机械地执行“上、右、下、左”四段遍历，就很容易把元素重复加入答案。因此在遍历完上边和右边之后，要检查当前 `top <= bottom`；在遍历完下边之后，还要再检查 `left <= right`。这些额外判断，本质上是在防止边界收缩后出现重复访问。',
        bullets: [
          '单行矩阵容易在“上边”和“下边”重复。',
          '单列矩阵容易在“右边”和“左边”重复。',
          '边界判断是处理退化情况的关键。',
          '这类题经常卡在最后几个极端 case。',
        ],
        callout:
          '刷二维遍历题时，真正拉开差距的往往不是主流程，而是你对边界退化情况有没有足够敏感。',
      },
      {
        id: 'sm-optimal-solution',
        title: '标准解法：四边界循环收缩',
        summary:
          '只要 `top <= bottom` 且 `left <= right`，就依次遍历上边、右边、下边、左边。每段走完后收缩一条边界，并在需要时检查是否还存在有效区域。这样一层层推进，直到所有元素都被加入结果数组。',
        bullets: [
          '时间复杂度是 `O(m × n)`。',
          '额外空间复杂度是 `O(1)`，不算返回结果。',
          '每个元素只会被访问一次。',
          '代码重点是边界更新顺序和条件判断。',
        ],
        code: `function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = []
  let top = 0
  let bottom = matrix.length - 1
  let left = 0
  let right = matrix[0].length - 1

  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col += 1) {
      result.push(matrix[top][col])
    }
    top += 1

    for (let row = top; row <= bottom; row += 1) {
      result.push(matrix[row][right])
    }
    right -= 1

    if (top <= bottom) {
      for (let col = right; col >= left; col -= 1) {
        result.push(matrix[bottom][col])
      }
      bottom -= 1
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row -= 1) {
        result.push(matrix[row][left])
      }
      left += 1
    }
  }

  return result
}`,
      },
      {
        id: 'sm-example-walkthrough',
        title: '拿 `[[1,2,3],[4,5,6],[7,8,9]]` 手推一次',
        summary:
          '先走上边得到 `1,2,3`，再走右边得到 `6,9`，再走下边得到 `8,7`，再走左边得到 `4`。此时最外层处理完，边界收缩到中间，最后再取中心元素 `5`。最终答案是 `[1,2,3,6,9,8,7,4,5]`。',
        bullets: [
          '第一圈先拿到最外层 8 个元素。',
          '边界向内收缩后只剩中心。',
          '中心元素只会被访问一次。',
          '这正体现了分层遍历的思路。',
        ],
      },
      {
        id: 'sm-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是边界收缩后没有及时判断，导致单行或单列重复访问。真正掌握后，你会发现很多矩阵题都在考“边界控制”而不是数组本身。螺旋矩阵就是训练这项能力的标准题。',
        bullets: [
          '易错点 1：下边和左边遍历前没做边界判断。',
          '易错点 2：边界更新顺序写乱，导致漏元素。',
          '易错点 3：只会处理正方形矩阵，长方形 case 出错。',
          '延伸方向：螺旋矩阵 II、矩阵旋转、对角线遍历、分层打印问题。',
        ],
        callout:
          '如果前一题在训练你做一维状态压缩，这一题就在训练你对二维边界的掌控力。很多人不是不会循环，而是对边界何时收缩、何时停止没有感觉。',
      },
    ],
  },
  {
    id: 'jump-game',
    label: '55. LeetCode 55. 跳跃游戏',
    difficulty: '中等',
    description:
      '这题是贪心思想的经典代表。难点不在于理解题意，而在于能不能意识到：你其实不需要真的模拟每一步跳法，只需要持续维护“当前最远能到哪”。',
    outcome:
      '你能独立写出跳跃游戏的贪心解法，理解为什么维护最远可达位置就足够判断能否到终点，并掌握这类“覆盖范围持续扩张”的线性贪心模型。',
    sections: [
      {
        id: 'jg-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个非负整数数组 `nums`，其中 `nums[i]` 表示你站在位置 `i` 时，最多可以向前跳多少步。初始位于数组第一个位置，要求判断你是否能够到达最后一个位置。',
        bullets: [
          '每个位置的值表示“最多可跳步数”。',
          '只需要判断能不能到终点。',
          '不要求最少跳几步，也不要求具体路径。',
          '题目重点在可达性判断。',
        ],
      },
      {
        id: 'jg-why-not-dfs',
        title: '为什么没必要暴力搜索所有跳法',
        summary:
          '最直观的思路是从起点开始尝试所有可能跳法，看能不能搜到终点。但这样会有大量重复状态，效率很差。实际上，这题真正关心的不是“你是怎么跳的”，而是“当前整体最远能到哪里”。一旦你能把问题压成“最远覆盖范围”，搜索就没有必要了。',
        bullets: [
          '暴力搜索会重复探索很多位置。',
          '题目只问能否到达，不关心具体路径。',
          '可达性问题适合转成区间覆盖视角。',
          '这是贪心比 DFS 更自然的原因。',
        ],
      },
      {
        id: 'jg-core-observation',
        title: '核心观察：维护当前最远可达位置就够了',
        summary:
          '假设你已经能到达位置 `i`，那么从这个位置出发，你最多还能把可达范围扩展到 `i + nums[i]`。所以在遍历数组时，只需要维护一个变量 `farthest` 表示“到目前为止最远能到哪”。只要某一时刻 `i > farthest`，说明连当前位置都到不了，后面更不可能到达；反之则继续更新最远范围即可。',
        bullets: [
          '`farthest` 表示当前已知最远覆盖点。',
          '如果当前位置都不可达，后面自然也不可达。',
          '每到一个可达位置，就尝试扩张覆盖范围。',
          '这就是典型的线性贪心模型。',
        ],
        callout:
          '很多贪心题真正的关键，不是“贪”在哪，而是你能不能找到一个足够代表全局状态的压缩变量。跳跃游戏最关键的变量，就是最远可达位置。',
      },
      {
        id: 'jg-why-greedy-works',
        title: '为什么这种贪心一定正确',
        summary:
          '因为题目只要求判断可达性，而不要求具体路径或最优步数，所以对于每个位置来说，只要它在当前可达范围内，就值得拿来更新新的最远覆盖点。更远的覆盖范围永远不会比更近的范围更差，因此持续维护最远可达位置不会丢失任何可能性。',
        bullets: [
          '更远的可达范围一定不比更近的范围差。',
          '只要一个位置可达，它就能参与扩张全局覆盖。',
          '题目不要求路径细节，所以无需回溯。',
          '这正是贪心成立的核心原因。',
        ],
      },
      {
        id: 'jg-optimal-solution',
        title: '标准解法：一次遍历维护最远可达位置',
        summary:
          '从左到右遍历数组。若当前下标 `i` 大于 `farthest`，直接返回 `false`；否则更新 `farthest = max(farthest, i + nums[i])`。如果在遍历过程中 `farthest` 已经覆盖到最后一个位置，可以提前返回 `true`。遍历结束后仍未失败，也说明可以到达终点。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '额外空间复杂度是 `O(1)`。',
          '核心状态只有一个 `farthest`。',
          '这是非常纯粹的线性贪心题。',
        ],
        code: `function canJump(nums: number[]): boolean {
  let farthest = 0

  for (let i = 0; i < nums.length; i += 1) {
    if (i > farthest) {
      return false
    }

    farthest = Math.max(farthest, i + nums[i])

    if (farthest >= nums.length - 1) {
      return true
    }
  }

  return true
}`,
      },
      {
        id: 'jg-example-walkthrough',
        title: '拿 `[2,3,1,1,4]` 和 `[3,2,1,0,4]` 对比理解',
        summary:
          '对 `[2,3,1,1,4]` 来说，最远可达范围会不断扩张，最终覆盖最后一个位置，所以答案是 `true`。而对 `[3,2,1,0,4]` 来说，虽然前面一开始能走很远，但走到值为 `0` 的位置后，最远范围无法再扩张，最终出现某个位置超出 `farthest`，因此答案是 `false`。',
        bullets: [
          '第一组数据的覆盖范围能持续扩张。',
          '第二组数据会在 `0` 处断掉。',
          '问题本质就是“可达区间能否覆盖终点”。',
          '这比模拟跳法稳定得多。',
        ],
      },
      {
        id: 'jg-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是明明只问可达性，却还去写复杂搜索；或者忘了判断当前位置是否已经不可达。真正掌握后，你会发现很多贪心题都在做同一件事：用一个压缩变量持续维护全局可行范围。',
        bullets: [
          '易错点 1：把它写成 DFS / BFS，复杂度和代码都不必要地膨胀。',
          '易错点 2：更新 `farthest` 时没先判断当前位置是否可达。',
          '易错点 3：混淆了 55 题和 45 题，一个问能不能到，一个问最少跳几步。',
          '延伸方向：跳跃游戏 II、区间覆盖、视频拼接、最远可达类贪心题。',
        ],
        callout:
          '如果前一题在训练你控制二维边界，这一题就在训练你做一维覆盖贪心。真正值钱的，不是记住一个模板，而是看出“当前最远可达”已经足够代表全局。',
      },
    ],
  },
  {
    id: 'merge-intervals',
    label: '56. LeetCode 56. 合并区间',
    difficulty: '中等',
    description:
      '这题是区间题的经典起点。难点不在于知道要合并，而在于能不能看出：排序之后，区间之间的关系就会变得线性可处理。',
    outcome:
      '你能独立写出合并区间的排序加扫描解法，掌握区间重叠判定与合并更新方式，并建立处理区间题时“先排序、再线扫”的基本意识。',
    sections: [
      {
        id: 'mi-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个区间数组 `intervals`，其中每个区间形如 `[start, end]`。如果若干区间有重叠，就需要把它们合并成一个更大的区间，最后返回所有不重叠的区间集合。',
        bullets: [
          '区间可能彼此重叠。',
          '重叠区间需要合并。',
          '最终返回的区间之间不能再重叠。',
          '区间顺序不一定有序。',
        ],
      },
      {
        id: 'mi-why-sort-first',
        title: '为什么第一步一定是排序',
        summary:
          '如果区间原本无序，你很难在线性过程中稳定判断当前区间该和谁合并。把所有区间按起点升序排序之后，后面的区间只可能和当前结果集的最后一个区间发生重叠，这就把问题从“全局比较”压成了“和最后一个结果比较”。排序是这题思路成立的前提。',
        bullets: [
          '排序后，区间关系会沿时间线展开。',
          '当前区间只需要和结果集最后一个区间比较。',
          '不用回头检查所有历史区间。',
          '这就是区间题常见的降维处理方式。',
        ],
        callout:
          '很多区间题一上来就要问自己：排序之后，问题会不会从二维关系变成一维扫描？合并区间就是最标准的答案。',
      },
      {
        id: 'mi-overlap-rule',
        title: '怎么判断两个区间是否重叠',
        summary:
          '假设当前结果集最后一个区间是 `[a, b]`，当前待处理区间是 `[c, d]`。如果 `c <= b`，说明两个区间有重叠或相接，这时应该把它们合并成 `[a, max(b, d)]`；如果 `c > b`，说明当前区间和前面的结果不重叠，可以直接作为新区间加入答案。',
        bullets: [
          '`c <= b` 表示有交集或边界相接。',
          '有重叠时只需要更新终点。',
          '无重叠时就开一个新区间。',
          '整个扫描过程始终只关心最后一个结果区间。',
        ],
      },
      {
        id: 'mi-optimal-solution',
        title: '标准解法：排序后线性扫描',
        summary:
          '先按区间起点从小到大排序。然后把第一个区间放进结果数组，接着遍历剩余区间：若当前区间起点小于等于结果最后一个区间终点，就更新最后一个区间终点；否则直接把当前区间加入结果。最终结果数组就是合并后的答案。',
        bullets: [
          '时间复杂度主要来自排序，为 `O(n log n)`。',
          '扫描过程本身是 `O(n)`。',
          '额外空间复杂度取决于结果数组。',
          '这题本质是排序 + 贪心式扫描。',
        ],
        code: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0])

  const result: number[][] = [intervals[0]]

  for (let i = 1; i < intervals.length; i += 1) {
    const current = intervals[i]
    const last = result[result.length - 1]

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1])
    } else {
      result.push(current)
    }
  }

  return result
}`,
      },
      {
        id: 'mi-example-walkthrough',
        title: '拿 `[[1,3],[2,6],[8,10],[15,18]]` 手推一次',
        summary:
          '排序后顺序不变。先把 `[1,3]` 放入结果，接着看 `[2,6]`，因为 `2 <= 3`，所以合并成 `[1,6]`。再看 `[8,10]`，因为 `8 > 6`，所以它单独开新区间。最后 `[15,18]` 也和前一个不重叠，最终结果就是 `[[1,6],[8,10],[15,18]]`。',
        bullets: [
          '重叠区间会不断被扩成更大的区间。',
          '不重叠时就开启新区间。',
          '结果数组始终保持有序且互不重叠。',
          '整个过程只需线性往后扫。',
        ],
      },
      {
        id: 'mi-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忘记先排序，或者合并时错误地新增新区间而不是更新最后一个结果区间。真正掌握后，你会发现区间题十有八九都和排序、扫描、覆盖范围有关。',
        bullets: [
          '易错点 1：没排序就开始合并，逻辑会直接不稳定。',
          '易错点 2：有重叠时新 push 一个区间，导致结果错误。',
          '易错点 3：忘记处理边界相接也算可合并的情况。',
          '延伸方向：插入区间、无重叠区间、会议室安排、区间覆盖类题目。',
        ],
        callout:
          '如果前一题在训练你做可达范围贪心，这一题就在训练你处理排序后的区间关系。区间题真正的起点，就是先把顺序整理出来，再线性解决。',
      },
    ],
  },
  {
    id: 'insert-interval',
    label: '57. LeetCode 57. 插入区间',
    difficulty: '中等',
    description:
      '这题是合并区间的直接变体。难点不在新增了一个新区间，而在于你能不能把“不重叠在左边”“发生重叠”“不重叠在右边”三段关系拆清楚。',
    outcome:
      '你能在合并区间的基础上独立写出插入区间解法，掌握新区间和已有区间的三段式关系处理，并建立对区间扫描分类讨论的更清晰理解。',
    sections: [
      {
        id: 'ii-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个已经按起点升序排列且互不重叠的区间数组 `intervals`，再给你一个新区间 `newInterval`。要求把这个新区间插入原数组中，并在必要时完成合并，最后返回新的不重叠区间数组。',
        bullets: [
          '原数组已经有序且互不重叠。',
          '需要插入一个新区间。',
          '如果插入后有重叠，要继续合并。',
          '最终结果仍要保持有序且不重叠。',
        ],
      },
      {
        id: 'ii-core-observation',
        title: '核心观察：所有区间可以分成三段',
        summary:
          '相对于 `newInterval`，原数组中的区间只会落入三类：一类完全在它左边且不重叠；一类和它有重叠，需要一起合并；还有一类完全在它右边且不重叠。只要按这个三段式来扫描，逻辑就会非常清晰。',
        bullets: [
          '左边区间直接加入结果。',
          '中间重叠区间不断和 `newInterval` 合并。',
          '右边区间在合并结束后直接追加。',
          '这是典型的分类扫描题。',
        ],
        callout:
          '很多看起来麻烦的区间题，一旦你能把关系拆成几种稳定类别，代码就会一下子变简单。插入区间最值钱的就是这种分类能力。',
      },
      {
        id: 'ii-three-phase-scan',
        title: '三段式扫描怎么写',
        summary:
          '先把所有终点小于 `newInterval[0]` 的区间加入结果，因为它们一定在左边。接着处理所有起点小于等于 `newInterval[1]` 的区间，这些都和新区间有重叠，于是不断更新新区间的左右边界。最后把合并后的新区间加入答案，再把剩余右边区间全部追加进去。',
        bullets: [
          '左边阶段负责无重叠直接追加。',
          '中间阶段负责更新合并区间边界。',
          '右边阶段负责剩余区间收尾。',
          '整个过程只需一次线性扫描。',
        ],
      },
      {
        id: 'ii-optimal-solution',
        title: '标准解法：一趟扫描完成插入与合并',
        summary:
          '因为原数组本身已经有序且无重叠，所以你甚至不需要重新排序。用一个指针从左到右扫描即可：先处理左边不重叠区间，再把所有重叠区间与 `newInterval` 合并，最后处理右边区间。这样能直接在线性时间内完成插入。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '额外空间复杂度主要来自结果数组。',
          '利用了原数组已排序且互不重叠的先验条件。',
          '这是合并区间思想的自然变体。',
        ],
        code: `function insert(
  intervals: number[][],
  newInterval: number[],
): number[][] {
  const result: number[][] = []
  let index = 0

  while (index < intervals.length && intervals[index][1] < newInterval[0]) {
    result.push(intervals[index])
    index += 1
  }

  while (index < intervals.length && intervals[index][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[index][0])
    newInterval[1] = Math.max(newInterval[1], intervals[index][1])
    index += 1
  }

  result.push(newInterval)

  while (index < intervals.length) {
    result.push(intervals[index])
    index += 1
  }

  return result
}`,
      },
      {
        id: 'ii-example-walkthrough',
        title: '拿 `[[1,3],[6,9]]` 插入 `[2,5]` 手推一次',
        summary:
          '先看 `[1,3]`，它和 `[2,5]` 有重叠，于是合并成 `[1,5]`。接着看 `[6,9]`，因为它已经完全在新区间右边，所以直接追加。最终结果就是 `[[1,5],[6,9]]`。这个例子能很好体现“三段式分类”的思路。',
        bullets: [
          '左边阶段可能一个区间都没有。',
          '重叠阶段会更新新区间边界。',
          '右边阶段直接保留原顺序追加。',
          '整个过程不需要回头再排序。',
        ],
      },
      {
        id: 'ii-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忘了原数组已经有序无重叠，结果又去写多余的排序逻辑；或者三段式边界条件写错，导致漏合并。真正掌握后，你会发现很多区间题都可以先按“左边、重叠、右边”分类。',
        bullets: [
          '易错点 1：没利用原数组已排序条件，白白增加复杂度。',
          '易错点 2：重叠条件写错，导致新区间没有完全合并。',
          '易错点 3：把合并后的新区间 push 太早，后续又重复处理。',
          '延伸方向：区间删除、日程安排、区间覆盖、扫描线类题目。',
        ],
        callout:
          '如果前一题在训练你做排序后扫描，这一题就在训练你做分类扫描。很多区间题真正的核心，不是代码模板，而是把关系拆成几段稳定逻辑。',
      },
    ],
  },
  {
    id: 'length-of-last-word',
    label: '58. LeetCode 58. 最后一个单词的长度',
    difficulty: '简单',
    description:
      '这题表面只是字符串处理，真正训练的是你对边界和扫描顺序的敏感度。越是简单题，越容易因为空格处理不严谨而写出脆弱代码。',
    outcome:
      '你能写出稳定处理尾部空格和单词边界的解法，理解为什么从后往前扫描比先 `split` 再处理更稳、更省空间。',
    sections: [
      {
        id: 'llw-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含字母和空格的字符串 `s`，返回其中最后一个单词的长度。如果最后面有若干空格，需要先跳过去，再计算最后一个连续字母段的长度。',
        bullets: [
          '单词由非空格字符连续组成。',
          '字符串末尾可能有很多空格。',
          '返回的是最后一个单词的长度，不是位置。',
          '关键不是“找单词”，而是“先跳空格，再数长度”。',
        ],
      },
      {
        id: 'llw-common-idea',
        title: '最直觉的写法为什么不够好',
        summary:
          '很多人第一反应是 `trim().split(" ")`，这当然能做出来，但会多分配数组，也把问题交给了字符串 API。面试或训练算法思维时，更值钱的是你能不能自己控制扫描过程。',
        bullets: [
          '`trim()` 会先生成新字符串。',
          '`split()` 会再生成数组。',
          '逻辑虽然短，但没有训练你对边界的掌控。',
          '这题完全可以一次扫描解决。',
        ],
      },
      {
        id: 'llw-scan-from-right',
        title: '正确思路：从右往左扫',
        summary:
          '因为目标是最后一个单词，所以从字符串尾部开始最自然。先跳过所有尾部空格，再开始计数，直到再次遇到空格或走到字符串开头为止。',
        bullets: [
          '第一阶段：跳过结尾空格。',
          '第二阶段：统计最后一个单词长度。',
          '中间不需要额外数组或字符串切片。',
          '这类题核心就是双阶段扫描。',
        ],
        callout:
          '简单题最值钱的地方，是训练你把“看起来靠 API 解决”的问题，重新压成一个自己可控的线性过程。',
      },
      {
        id: 'llw-optimal-solution',
        title: '标准解法：两段式倒序扫描',
        summary:
          '用一个指针从右边开始，先略过所有空格；接着继续向左移动并累加长度，直到再次碰到空格或越界。整个过程只遍历需要的部分，空间复杂度为 `O(1)`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '不依赖 `trim` 和 `split`。',
          '逻辑非常适合考查边界处理能力。',
        ],
        code: `function lengthOfLastWord(s: string): number {
  let index = s.length - 1

  while (index >= 0 && s[index] === ' ') {
    index -= 1
  }

  let length = 0

  while (index >= 0 && s[index] !== ' ') {
    length += 1
    index -= 1
  }

  return length
}`,
      },
      {
        id: 'llw-example-walkthrough',
        title: '拿 `"Hello World  "` 手推一次',
        summary:
          '从右往左先跳过最后两个空格，接着依次统计 `d`、`l`、`r`、`o`、`W`，直到遇到前面的空格为止，因此最后一个单词长度是 `5`。',
        bullets: [
          '尾部空格必须先清掉。',
          '真正计数时只统计连续非空格字符。',
          '遇到空格就立即停止。',
          '这就是标准的双阶段扫描模型。',
        ],
      },
      {
        id: 'llw-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '最常见的问题是忘记处理尾部空格，或者把多个空格当成空单词。真正掌握后，你会发现很多字符串题的本质都是“先跳过无效区域，再处理有效区域”。',
        bullets: [
          '易错点 1：直接从尾部计数，但没先跳过空格。',
          '易错点 2：用 `split(" ")` 后没处理连续空格带来的空串。',
          '易错点 3：把字符串边界和空格边界混在一起判断。',
          '延伸方向：反转字符串中的单词、有效回文、双指针字符串扫描题。',
        ],
        callout:
          '如果前面的区间题在训练你分类扫描，这题就在训练你做最基本的边界扫描。别嫌它简单，字符串题里很多坑都长这样。',
      },
    ],
  },
  {
    id: 'spiral-matrix-ii',
    label: '59. LeetCode 59. 螺旋矩阵 II',
    difficulty: '中等',
    description:
      '这题是标准的模拟题。难点不在于“知道按圈填数”，而在于能不能把上下左右边界收缩得干净、不重不漏。',
    outcome:
      '你能独立写出螺旋填充的边界模拟解法，掌握上、右、下、左四段填充与边界收缩方式，建立处理矩阵模拟题的稳定框架。',
    sections: [
      {
        id: 'sm2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个正整数 `n`，生成一个 `n x n` 的矩阵，并按照顺时针螺旋顺序填入 `1` 到 `n²` 的所有数字。',
        bullets: [
          '不是读矩阵，而是构造矩阵。',
          '填充顺序是顺时针螺旋。',
          '每一圈填完后边界会收缩。',
          '核心是控制遍历顺序和边界变化。',
        ],
      },
      {
        id: 'sm2-boundary-model',
        title: '核心模型：四条边界逐圈收缩',
        summary:
          '维护 `top`、`bottom`、`left`、`right` 四条边界。每一轮依次填充上边、右边、下边、左边，然后让四条边界向内收缩，继续处理下一圈。',
        bullets: [
          '上边从左到右填。',
          '右边从上到下填。',
          '下边从右到左填。',
          '左边从下到上填。',
        ],
        callout:
          '矩阵模拟题最容易乱的地方，不是方向，而是边界更新时机。先想清楚一圈结束后谁该移动，再写代码。',
      },
      {
        id: 'sm2-why-need-check',
        title: '为什么中间要做边界判断',
        summary:
          '当 `n` 是奇数时，最后会剩下一个中心点；当矩阵逐渐收缩后，也可能出现某一条边已经越界。如果不在填下边和左边前做判断，就可能重复填充。',
        bullets: [
          '上边和右边填完后，边界可能已经相交。',
          '下边和左边不是每轮都一定存在。',
          '边界判断是防止重复写值的关键。',
          '模拟题里这类保护条件非常常见。',
        ],
      },
      {
        id: 'sm2-optimal-solution',
        title: '标准解法：按圈模拟填充',
        summary:
          '先创建一个 `n x n` 的二维数组，初始值全部设为 `0`。然后维护四条边界和当前要填的数字 `current`，按顺时针依次填每条边，并在每轮结束后收缩边界，直到所有位置都被填完。',
        bullets: [
          '时间复杂度是 `O(n²)`。',
          '空间复杂度是 `O(n²)`，因为要返回整个矩阵。',
          '每个位置只会被访问一次。',
          '这是标准矩阵边界模拟题模板。',
        ],
        code: `function generateMatrix(n: number): number[][] {
  const matrix = Array.from({ length: n }, () => Array(n).fill(0))
  let top = 0
  let bottom = n - 1
  let left = 0
  let right = n - 1
  let current = 1

  while (top <= bottom && left <= right) {
    for (let column = left; column <= right; column += 1) {
      matrix[top][column] = current
      current += 1
    }
    top += 1

    for (let row = top; row <= right && row <= bottom; row += 1) {
      matrix[row][right] = current
      current += 1
    }
    right -= 1

    if (top <= bottom) {
      for (let column = right; column >= left; column -= 1) {
        matrix[bottom][column] = current
        current += 1
      }
      bottom -= 1
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row -= 1) {
        matrix[row][left] = current
        current += 1
      }
      left += 1
    }
  }

  return matrix
}`,
      },
      {
        id: 'sm2-example-walkthrough',
        title: '拿 `n = 3` 手推一次',
        summary:
          '第一圈先填上边得到 `1 2 3`，再填右边得到 `6`，再填下边得到 `8 7`，再填左边得到 `4`。边界收缩后只剩中心点，最后填入 `5`，结果就是 `[[1,2,3],[8,9,4],[7,6,5]]`。',
        bullets: [
          '每一圈都严格按上右下左执行。',
          '填完一边立刻收缩对应边界。',
          '中心点是奇数阶矩阵的最后一步。',
          '模拟过程本质是缩圈。',
        ],
      },
      {
        id: 'sm2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '最常见的问题是边界更新顺序不清、下边和左边重复填充，或者把行列变量写混。真正掌握后，你会发现很多矩阵题都能用边界、方向和状态控制来做。 ',
        bullets: [
          '易错点 1：边界收缩过早或过晚，导致漏填或重填。',
          '易错点 2：行索引和列索引混用。',
          '易错点 3：没有在下边、左边填充前做边界判断。',
          '延伸方向：螺旋矩阵、矩阵置零、旋转图像、岛屿类网格模拟题。',
        ],
        callout:
          '模拟题没有什么玄学，关键是先建立一个稳定的控制框架。四条边界就是这题的骨架。',
      },
    ],
  },
  {
    id: 'permutation-sequence',
    label: '60. LeetCode 60. 排列序列',
    difficulty: '困难',
    description:
      '这题如果你只会暴力生成所有排列，一定会超时。真正的突破点，是看出第 `k` 个排列其实可以直接按阶乘分组定位。',
    outcome:
      '你能用阶乘和贪心定位法直接求出第 `k` 个排列，理解为什么不用枚举全部排列，并掌握排列序号与阶乘进制之间的映射关系。',
    sections: [
      {
        id: 'ps-problem-summary',
        title: '题目在问什么',
        summary:
          '给定 `n` 和 `k`，数字 `1` 到 `n` 一共有 `n!` 种排列。要求返回按字典序排列后的第 `k` 个排列字符串。',
        bullets: [
          '不是求所有排列，而是直接求第 `k` 个。',
          '排列顺序是字典序。',
          '`k` 从 `1` 开始计数。',
          '核心是如何跳过成批排列，而不是一个一个试。',
        ],
      },
      {
        id: 'ps-factorial-grouping',
        title: '关键观察：同一开头会形成阶乘大小的分组',
        summary:
          '如果第一位固定为某个数字，剩下 `n - 1` 个数字可以组成 `(n - 1)!` 种排列。所以第 `k` 个排列落在哪个首位分组，可以通过 `k / (n - 1)!` 直接算出来。',
        bullets: [
          '第一位每换一次，会跳过 `(n - 1)!` 个排列。',
          '选定第一位后，问题规模缩小为 `n - 1`。',
          '后面的每一位都可以继续同样处理。',
          '这其实就是阶乘进制思想。',
        ],
        callout:
          '困难题往往不是让你把暴力写快一点，而是逼你换一套建模方式。这里从“生成排列”切到“按分组定位”就是关键跃迁。',
      },
      {
        id: 'ps-zero-based',
        title: '为什么先把 `k` 变成从 0 开始更自然',
        summary:
          '计算组号时，用从 `0` 开始的下标最顺手。因为第 `0` 到第 `(n - 1)! - 1` 个排列都属于第一组，所以通常先把 `k` 减一，再做整除和取模。',
        bullets: [
          '`k -= 1` 后更容易做整除分组。',
          '商表示当前该选第几个未使用数字。',
          '余数表示在当前分组里的相对位置。',
          '这是把 1-based 排名转成 0-based 下标。',
        ],
      },
      {
        id: 'ps-optimal-solution',
        title: '标准解法：阶乘分组 + 可选数字列表',
        summary:
          '先准备 `1` 到 `n` 的候选数字列表和每一位对应的阶乘值。每次用 `k / factorial` 确定当前该选哪个数字，把它从候选列表中移除，再用 `k % factorial` 更新剩余位置的目标排名。直到所有位置都选完。',
        bullets: [
          '时间复杂度约为 `O(n²)`，主要来自数组删除。',
          '空间复杂度是 `O(n)`。',
          '比生成全部排列的 `O(n! * n)` 高效得多。',
          '核心不是 DFS，而是数学分组。',
        ],
        code: `function getPermutation(n: number, k: number): string {
  const numbers = Array.from({ length: n }, (_, index) => String(index + 1))
  const factorial = Array(n).fill(1)

  for (let i = 1; i < n; i += 1) {
    factorial[i] = factorial[i - 1] * i
  }

  let rank = k - 1
  let result = ''

  for (let remaining = n; remaining >= 1; remaining -= 1) {
    const blockSize = factorial[remaining - 1]
    const blockIndex = Math.floor(rank / blockSize)

    result += numbers[blockIndex]
    numbers.splice(blockIndex, 1)
    rank %= blockSize
  }

  return result
}`,
      },
      {
        id: 'ps-example-walkthrough',
        title: '拿 `n = 3, k = 4` 手推一次',
        summary:
          '所有排列依次是 `123, 132, 213, 231, 312, 321`。第 `4` 个是 `231`。按算法看：先把 `k` 变成 `3`，每组大小是 `2`，所以第一位选第 `1` 组也就是 `2`；剩下 `[1,3]` 和 `rank = 1`，第二位选第 `1` 个也就是 `3`；最后剩 `1`，结果就是 `231`。',
        bullets: [
          '第一位靠 `(n - 1)!` 分组确定。',
          '后续位不断缩小问题规模。',
          '每选一个数，就从候选列表里删除。',
          '这就是“按排名直接解码排列”。',
        ],
      },
      {
        id: 'ps-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题是没把 `k` 转成 0-based，导致每一位都偏一组；或者阶乘数组下标写错。真正掌握后，你会对组合数学和排列编号类题更敏感。',
        bullets: [
          '易错点 1：忘记 `k - 1`，整组定位会错位。',
          '易错点 2：阶乘数组定义不清，`0!` 和 `1!` 边界混乱。',
          '易错点 3：取出数字后没有从候选列表删除。',
          '延伸方向：康托展开、排列逆排名、组合编号类数学题。',
        ],
        callout:
          '困难题的价值，往往就在于逼你从“枚举所有答案”升级到“直接定位答案”。这题就是典型代表。',
      },
    ],
  },
  {
    id: 'rotate-list',
    label: '61. LeetCode 61. 旋转链表',
    difficulty: '中等',
    description:
      '这题表面是链表操作，真正考的是你能不能把“右旋 k 次”压缩成一次断开和重连，而不是傻乎乎地一轮轮移动。',
    outcome:
      '你能写出基于链表长度和成环思想的旋转解法，理解为什么先求长度、再取模、最后找新尾节点是最稳的做法。',
    sections: [
      {
        id: 'rl-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个链表头节点 `head` 和一个非负整数 `k`，把链表每个节点向右移动 `k` 个位置，返回旋转后的新头节点。',
        bullets: [
          '右旋一次，最后一个节点会移到最前面。',
          '`k` 可能远大于链表长度。',
          '链表可能为空或只有一个节点。',
          '关键是找到新头和新尾的位置。',
        ],
      },
      {
        id: 'rl-why-mod',
        title: '先取模是这题第一步',
        summary:
          '如果链表长度是 `length`，那么右旋 `length` 次后会回到原状。所以真正有效的旋转次数应该是 `k % length`。这一步能把很多看似很大的操作直接压缩掉。',
        bullets: [
          '长度相同的一整圈旋转没有意义。',
          '`k % length === 0` 时答案就是原链表。',
          '取模能防止无谓循环。',
          '这是链表旋转题的基本优化。',
        ],
      },
      {
        id: 'rl-make-cycle',
        title: '更稳的思路：先成环，再断开',
        summary:
          '遍历链表时顺便求出长度和尾节点，然后把尾节点连回头节点形成一个环。接着只要找到新尾节点，把它的 `next` 断开，就能得到新头节点。',
        bullets: [
          '成环后，旋转问题会变成“在哪断开”。',
          '新尾节点位置是 `length - (k % length) - 1`。',
          '新头节点就是新尾的下一个节点。',
          '链表题常常靠“先连起来再断开”简化逻辑。',
        ],
        callout:
          '链表题很多时候难就难在指针关系想不顺。一旦把它变成环，整体结构就简单很多。',
      },
      {
        id: 'rl-optimal-solution',
        title: '标准解法：求长度 + 成环 + 找断点',
        summary:
          '如果链表为空、只有一个节点，或者 `k` 为 `0`，直接返回原链表。否则先求出长度 `length` 和尾节点 `tail`，计算有效旋转次数 `offset = k % length`。若 `offset === 0`，同样直接返回。接着把链表连成环，找到新的尾节点并断开，返回新的头节点。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '每个节点只遍历有限次。',
          '这是链表旋转题最经典的写法。',
        ],
        code: `function rotateRight(
  head: ListNode | null,
  k: number,
): ListNode | null {
  if (!head || !head.next || k === 0) {
    return head
  }

  let length = 1
  let tail = head

  while (tail.next) {
    tail = tail.next
    length += 1
  }

  const offset = k % length

  if (offset === 0) {
    return head
  }

  tail.next = head

  let stepsToNewTail = length - offset - 1
  let newTail = head

  while (stepsToNewTail > 0) {
    newTail = newTail.next!
    stepsToNewTail -= 1
  }

  const newHead = newTail.next
  newTail.next = null

  return newHead
}`,
      },
      {
        id: 'rl-example-walkthrough',
        title: '拿 `1 -> 2 -> 3 -> 4 -> 5`，`k = 2` 手推一次',
        summary:
          '链表长度是 `5`，有效旋转次数是 `2`。先把尾节点 `5` 指回头节点 `1`，形成环。新尾节点应该在第 `5 - 2 - 1 = 2` 个位置，也就是值为 `3` 的节点；它后面的 `4` 就是新头。断开后结果是 `4 -> 5 -> 1 -> 2 -> 3`。',
        bullets: [
          '先求长度，再算有效旋转次数。',
          '成环只是中间状态，最终还要断开。',
          '新尾节点的位置决定了新头节点。',
          '链表旋转本质是重定断点。',
        ],
      },
      {
        id: 'rl-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题是忘记 `k % length`，或者成环后忘记断开，导致死循环。真正掌握后，你会对链表中的“成环再拆分”技巧更熟。 ',
        bullets: [
          '易错点 1：没有处理空链表和单节点链表。',
          '易错点 2：没取模，导致做了很多无意义操作。',
          '易错点 3：成环后忘了断开，链表会无限循环。',
          '延伸方向：分隔链表、重排链表、环形链表、快慢指针类题目。',
        ],
        callout:
          '链表题真正重要的，不是记模板，而是学会把指针关系压成少数几个可控步骤。这题就是“成环 + 断开”的经典模板。',
      },
    ],
  },
  {
    id: 'unique-paths',
    label: '62. LeetCode 62. 不同路径',
    difficulty: '中等',
    description:
      '这题是动态规划的经典入门题。难点不在公式本身，而在于你能不能看出当前位置只依赖上方和左方，从而建立最基本的状态转移。',
    outcome:
      '你能独立写出网格类动态规划解法，理解状态定义、转移公式和初始化方式，并知道为什么这题是二维 DP 的标准起点。',
    sections: [
      {
        id: 'up-problem-summary',
        title: '题目在问什么',
        summary:
          '机器人位于一个 `m x n` 网格的左上角，每次只能向右或者向下移动一步。问它走到右下角一共有多少条不同路径。',
        bullets: [
          '起点是左上角，终点是右下角。',
          '只能向右或向下。',
          '要求路径总数，不是具体路径。',
          '这是一道非常标准的网格计数题。',
        ],
      },
      {
        id: 'up-dp-definition',
        title: '先定义状态：`dp[row][col]` 表示什么',
        summary:
          '令 `dp[row][col]` 表示走到坐标 `(row, col)` 的不同路径数量。这样问题就自然转成：当前格子的路径数，如何由前面的格子推出来。',
        bullets: [
          '状态必须含义明确、可递推。',
          '`dp[row][col]` 是“到达这里的方法数”。',
          '终点答案就是 `dp[m - 1][n - 1]`。',
          '网格 DP 的第一步几乎总是先定义这种二维状态。',
        ],
      },
      {
        id: 'up-transition',
        title: '转移公式为什么是上方加左方',
        summary:
          '因为机器人只能从上方走下来，或者从左方走过来，所以到达当前位置的所有路径，恰好就是到达上方格子的路径数加上到达左方格子的路径数。',
        bullets: [
          '`dp[row][col] = dp[row - 1][col] + dp[row][col - 1]`。',
          '这是由移动规则直接决定的。',
          '没有别的来源，就没有别的加项。',
          '动态规划本质就是把当前答案拆成前面子问题的组合。',
        ],
        callout:
          '很多初学者害怕动态规划，其实第一步并不神秘。你只要先问自己：当前状态是从哪些前置状态过来的？这题答案非常直接。',
      },
      {
        id: 'up-initialization',
        title: '初始化为什么第一行和第一列全是 1',
        summary:
          '第一行上的格子只能一直向右走到达，所以路径数都为 `1`；第一列上的格子只能一直向下走到达，所以也都是 `1`。这就是整个 DP 的边界条件。',
        bullets: [
          '第一行没有“上方来源”。',
          '第一列没有“左方来源”。',
          '边界条件决定了后续递推的起点。',
          'DP 题通常最容易错的就是初始化。',
        ],
      },
      {
        id: 'up-optimal-solution',
        title: '标准解法：二维动态规划',
        summary:
          '先创建一个 `m x n` 的二维数组，初始值设为 `1`。然后从第二行第二列开始遍历，用上方和左方的路径数相加填入当前格子。最终右下角的值就是答案。',
        bullets: [
          '时间复杂度是 `O(mn)`。',
          '空间复杂度是 `O(mn)`。',
          '如果继续优化，也可以压缩成一维 DP。',
          '但入门阶段先把二维状态想清楚更重要。',
        ],
        code: `function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => Array(n).fill(1))

  for (let row = 1; row < m; row += 1) {
    for (let col = 1; col < n; col += 1) {
      dp[row][col] = dp[row - 1][col] + dp[row][col - 1]
    }
  }

  return dp[m - 1][n - 1]
}`,
      },
      {
        id: 'up-example-walkthrough',
        title: '拿 `m = 3, n = 7` 理解',
        summary:
          '第一行和第一列都先填成 `1`。接着第二行第二列变成 `2`，因为它来自上面的 `1` 和左边的 `1`；后面的格子继续按这个规则累加。最终右下角得到 `28`，表示一共有 `28` 条不同路径。',
        bullets: [
          '先有边界，后有递推。',
          '每个格子都在累加历史路径数。',
          '这个过程非常适合理解 DP 的“状态表”。',
          '手推一遍比死记公式更重要。',
        ],
      },
      {
        id: 'up-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题是初始化写错，或者循环起点没从 `1` 开始。真正掌握后，你会发现很多网格 DP 题都只是状态定义和转移条件稍有变化。',
        bullets: [
          '易错点 1：忘了第一行、第一列全是 `1`。',
          '易错点 2：循环从 `0` 开始，导致访问越界。',
          '易错点 3：没区分“路径数”问题和“最短路径”问题。',
          '延伸方向：不同路径 II、最小路径和、地下城游戏、三角形路径和。',
        ],
        callout:
          '如果你要真正学会动态规划，这题一定要吃透。它就是二维 DP 最干净、最标准的起点。',
      },
    ],
  },
  {
    id: 'unique-paths-ii',
    label: '63. LeetCode 63. 不同路径 II',
    difficulty: '中等',
    description:
      '这题是上一题的直接升级版。核心不再只是套二维 DP 模板，而是能不能把“障碍物”这个限制自然并入状态转移和初始化。',
    outcome:
      '你能在基础网格 DP 上独立处理障碍物约束，掌握带阻塞条件的状态转移和边界初始化方式，并真正吃透二维路径计数题的解法骨架。',
    sections: [
      {
        id: 'up2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个 `m x n` 的网格，其中某些格子是障碍物，机器人依然只能向右或向下移动。要求返回从左上角走到右下角的不同路径数量；如果起点或终点被障碍挡住，答案就是 `0`。',
        bullets: [
          '移动规则没变，仍然只能向右或向下。',
          '障碍格不能经过，也不能停留。',
          '路径数是计数问题，不是最短路问题。',
          '本质是在上一题基础上加入“不可达状态”。',
        ],
      },
      {
        id: 'up2-state-definition',
        title: '状态定义和上一题完全一致',
        summary:
          '仍然令 `dp[row][col]` 表示走到 `(row, col)` 的不同路径数量。区别只在于：如果当前位置是障碍物，那么它的路径数必须是 `0`，因为不允许到达这里。',
        bullets: [
          '障碍物格子的状态值固定为 `0`。',
          '非障碍格仍从上方和左方转移而来。',
          '状态定义不需要改，限制条件体现在转移里。',
          '很多 DP 题的升级，本质就是在原状态上加过滤条件。',
        ],
      },
      {
        id: 'up2-transition',
        title: '转移公式怎么加上障碍判断',
        summary:
          '如果 `obstacleGrid[row][col] === 1`，说明这是障碍格，直接令 `dp[row][col] = 0`；否则，若它不是第一行第一列，就仍然有 `dp[row][col] = dp[row - 1][col] + dp[row][col - 1]`。所以障碍不是新公式，而是对旧公式的一个拦截条件。',
        bullets: [
          '先判断当前位置是不是障碍。',
          '是障碍就直接置为 `0`。',
          '不是障碍时，仍按上方加左方递推。',
          'DP 升级题常见的写法就是“先拦截，再转移”。',
        ],
        callout:
          '真正的动态规划能力，不是记住很多公式，而是看到新限制后，知道该把它插入到哪个环节。这里插入点就是“当前位置能不能站”。',
      },
      {
        id: 'up2-initialization',
        title: '初始化为什么比上一题更容易错',
        summary:
          '上一题第一行和第一列全是 `1`，但这一题不是。一旦第一行或第一列遇到障碍，后面的格子就都不可达了，因为机器人无法绕过去。所以初始化时必须逐格判断，而不能一股脑填 `1`。',
        bullets: [
          '起点若是障碍，答案直接为 `0`。',
          '第一行一旦遇障，后续都为 `0`。',
          '第一列一旦遇障，后续都为 `0`。',
          '障碍题的关键坑通常都在初始化。',
        ],
      },
      {
        id: 'up2-optimal-solution',
        title: '标准解法：二维 DP + 障碍拦截',
        summary:
          '先创建同尺寸的 `dp` 数组，若起点是障碍则直接返回 `0`。起点初始为 `1`，然后按行按列遍历：遇到障碍置 `0`，否则累加上方和左方路径数。最终右下角的值就是答案。',
        bullets: [
          '时间复杂度是 `O(mn)`。',
          '空间复杂度是 `O(mn)`。',
          '相比上一题，只多了障碍判断和更谨慎的初始化。',
          '这是网格 DP 从入门走向稳固的关键一步。',
        ],
        code: `function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const rows = obstacleGrid.length
  const cols = obstacleGrid[0].length

  if (obstacleGrid[0][0] === 1) {
    return 0
  }

  const dp = Array.from({ length: rows }, () => Array(cols).fill(0))
  dp[0][0] = 1

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (obstacleGrid[row][col] === 1) {
        dp[row][col] = 0
        continue
      }

      if (row > 0) {
        dp[row][col] += dp[row - 1][col]
      }

      if (col > 0) {
        dp[row][col] += dp[row][col - 1]
      }
    }
  }

  return dp[rows - 1][cols - 1]
}`,
      },
      {
        id: 'up2-example-walkthrough',
        title: '拿 `[[0,0,0],[0,1,0],[0,0,0]]` 手推一次',
        summary:
          '中间那个 `1` 是障碍物，所以它对应的 `dp[1][1] = 0`。其余位置仍然按上方和左方相加计算，最后右下角得到 `2`，表示只能从障碍物的上方绕过去，或者从左侧绕过去。',
        bullets: [
          '障碍格本身永远没有路径数。',
          '它会阻断经过它的所有路线。',
          '但不影响其它可绕行路径的累计。',
          '手推一遍能彻底理解障碍如何影响状态表。',
        ],
      },
      {
        id: 'up2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把第一行第一列错误地全填成 `1`，或者障碍格仍然参与累加。真正掌握后，你会更熟悉“DP 模板 + 限制条件”的组合方式。',
        bullets: [
          '易错点 1：起点是障碍却没有直接返回 `0`。',
          '易错点 2：第一行、第一列初始化没在遇障后截断。',
          '易错点 3：障碍格置零后，后面又被重复累加。',
          '延伸方向：最小路径和、地下城游戏、带权网格 DP、记忆化搜索网格题。',
        ],
        callout:
          '如果 62 题在教你写最干净的二维 DP，这题就在教你如何把限制条件稳稳塞进去。很多面试题，升级就升在这里。',
      },
    ],
  },
  {
    id: 'minimum-path-sum',
    label: '64. LeetCode 64. 最小路径和',
    difficulty: '中等',
    description:
      '这题继续沿用网格 DP 框架，但目标从“统计有几条路”变成了“找代价最小的路”。真正训练的是你能不能从计数型 DP 切换到最优化型 DP。',
    outcome:
      '你能掌握网格最优化 DP 的状态定义和转移方式，理解为什么当前位置只需继承左边和上边的较优值，并建立路径计数题与路径最优题之间的类比能力。',
    sections: [
      {
        id: 'mps-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含非负整数的 `m x n` 网格 `grid`，机器人从左上角出发，每次只能向右或向下移动一步，要求走到右下角时，路径上的数字和最小，并返回这个最小路径和。',
        bullets: [
          '移动规则和前两题一样，只能向右或向下。',
          '不再问路径数量，而是问最小代价。',
          '每个格子上的数值都会计入路径和。',
          '这是一道标准的最优化型二维 DP。',
        ],
      },
      {
        id: 'mps-state-definition',
        title: '状态定义：到达当前位置的最小代价',
        summary:
          '令 `dp[row][col]` 表示从起点走到 `(row, col)` 的最小路径和。这样问题就从“找一条全局最优路径”，转成了“当前位置的最优值，如何由更小子问题推出来”。',
        bullets: [
          '状态含义从“方法数”变成“最优值”。',
          '终点答案是 `dp[m - 1][n - 1]`。',
          '这类题的关键是把“全局最优”拆成“局部最优递推”。',
          'DP 的核心不在公式长短，而在状态语义是否稳定。',
        ],
      },
      {
        id: 'mps-transition',
        title: '转移公式为什么要取 `min`',
        summary:
          '因为当前位置只能从上方或左方过来，而我们要求的是到达当前位置的最小路径和，所以只需要在上方最优值和左方最优值中选更小的那个，再加上当前格子的值。也就是 `dp[row][col] = min(dp[row - 1][col], dp[row][col - 1]) + grid[row][col]`。',
        bullets: [
          '来源仍然只有上方和左方。',
          '目标变成最小值，所以加法前要先取 `min`。',
          '这和路径计数题的“相加”形成鲜明对照。',
          '计数型和最优化型 DP 的差别，往往就在这里。',
        ],
        callout:
          '学动态规划时，别把每题都当独立模板。62、63、64 三题连着看，你会发现状态框架几乎一样，变化的只是“当前位置到底要继承什么”。',
      },
      {
        id: 'mps-initialization',
        title: '初始化为什么第一行和第一列要做前缀和',
        summary:
          '第一行上的格子只能从左边一路走过来，所以它们的最小路径和就是左边一路累加；第一列上的格子也同理，只能从上边一路下来。所以初始化不是填 `1`，而是做前缀累加。',
        bullets: [
          '起点初始化为 `grid[0][0]`。',
          '第一行依赖左边连续累加。',
          '第一列依赖上边连续累加。',
          '这一步决定后续状态表是否正确展开。',
        ],
      },
      {
        id: 'mps-optimal-solution',
        title: '标准解法：二维最优值 DP',
        summary:
          '先创建一个 `dp` 数组，起点填 `grid[0][0]`。随后初始化第一行和第一列的前缀和，再从 `(1, 1)` 开始遍历，用上方和左方较小的路径和加上当前格子的值，最终得到右下角的最小路径和。',
        bullets: [
          '时间复杂度是 `O(mn)`。',
          '空间复杂度是 `O(mn)`。',
          '如果需要，还可以进一步压缩成一维 DP。',
          '但先把二维状态转移彻底理解更重要。',
        ],
        code: `function minPathSum(grid: number[][]): number {
  const rows = grid.length
  const cols = grid[0].length
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0))

  dp[0][0] = grid[0][0]

  for (let col = 1; col < cols; col += 1) {
    dp[0][col] = dp[0][col - 1] + grid[0][col]
  }

  for (let row = 1; row < rows; row += 1) {
    dp[row][0] = dp[row - 1][0] + grid[row][0]
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      dp[row][col] = Math.min(dp[row - 1][col], dp[row][col - 1]) + grid[row][col]
    }
  }

  return dp[rows - 1][cols - 1]
}`,
      },
      {
        id: 'mps-example-walkthrough',
        title: '拿 `[[1,3,1],[1,5,1],[4,2,1]]` 手推一次',
        summary:
          '第一行累计成 `1,4,5`，第一列累计成 `1,2,6`。接着中间位置 `5` 对应的最优和是 `min(4,2)+5=7`，后续继续这样推，最终右下角得到 `7`，对应路径是 `1→3→1→1→1`。',
        bullets: [
          '先完成第一行和第一列的前缀初始化。',
          '内部格子始终从上和左中选更优的那个。',
          '最优路径不需要显式记录，先算最优值即可。',
          '这题非常适合理解“局部最优递推”。',
        ],
      },
      {
        id: 'mps-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把它和路径计数题混淆，错误地写成相加；或者第一行第一列初始化漏成普通赋值。真正掌握后，你会对网格最优化 DP 建立很扎实的基本盘。',
        bullets: [
          '易错点 1：把转移公式误写成上方加左方。',
          '易错点 2：第一行、第一列没有做前缀和初始化。',
          '易错点 3：只想着找一条路径，却没有先做状态定义。',
          '延伸方向：三角形最小路径和、下降路径最小和、地下城游戏、编辑距离。',
        ],
        callout:
          '62 到 64 这三题是非常好的网格 DP 小闭环。统计、带障碍、求最优，这三个层次一旦打通，你的二维 DP 基础就开始成型了。',
      },
    ],
  },
  {
    id: 'valid-number',
    label: '65. LeetCode 65. 有效数字',
    difficulty: '困难',
    description:
      '这题不是考你会不会调 `Number()`，而是考你能不能把一个看起来混乱的字符串规则拆成有限状态。真正的价值在于：你能否把“语法校验题”从拍脑袋判断，升级成有边界、有状态的工程思维。',
    outcome:
      '你能独立分析数字字符串中的符号位、小数点、整数段和指数段，掌握有限状态机解法，并把复杂规则校验题转换成状态转移问题。',
    sections: [
      {
        id: 'vn-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串 `s`，判断它是否表示一个有效数字。字符串可能包含正负号、小数点、指数标记 `e/E`，也可能包含前后空格，但不能出现非法组合。',
        bullets: [
          '允许 `2`、`0089`、`-0.1`、`+3.14`、`4.`、`-.9` 这类形式。',
          '允许 `2e10`、`-90E3`、`3e+7` 这类指数形式。',
          '不允许 `abc`、`1a`、`1e`、`e3`、`99e2.5` 这类混合错误形式。',
          '本质是在判断一个字符串是否符合数字语法，而不是在做数值计算。',
        ],
      },
      {
        id: 'vn-why-hard',
        title: '为什么它比普通字符串题更难',
        summary:
          '难点在于规则不是单点判断，而是要看字符出现的先后顺序和组合关系。比如符号只能出现在开头或 `e/E` 后面，小数点不能出现在指数段里，指数前后都必须有数字。',
        bullets: [
          '不是看某个字符存不存在，而是看它出现的位置是否合法。',
          '多个规则会相互制约，顺序一乱就会误判。',
          '指数段和小数段有不同的约束条件。',
          '这类题特别适合用“状态”统一表达规则。',
        ],
      },
      {
        id: 'vn-state-machine',
        title: '为什么有限状态机是最稳的解法',
        summary:
          '你可以把字符串扫描过程理解成“当前读到了哪一类信息”。每遇到一个字符，就从当前状态跳到下一个状态；如果无路可走，说明字符串非法。这样就把零散规则全部变成了可维护的状态转移表。',
        bullets: [
          '状态负责表达“当前已经读到什么”。',
          '字符类别负责表达“接下来来了什么”。',
          '状态转移表负责统一管理规则。',
          '最终只要看停留状态是否合法，就能得出答案。',
        ],
        callout:
          '这题真正训练的是“把自然语言规则翻译成状态”的能力。这和做表单校验、协议解析、词法分析时的思路是一致的。',
      },
      {
        id: 'vn-character-groups',
        title: '先把字符分组，再谈状态转移',
        summary:
          '为了简化判断，通常先把字符分成 `digit`、`sign`、`dot`、`exp`、`space`、`illegal` 六类。然后状态机只跟这些类别打交道，而不是直接跟每个字符硬编码判断。',
        bullets: [
          '数字字符统一归到 `digit`。',
          '正负号统一归到 `sign`。',
          '小数点单独处理，因为它和整数段、指数段关系密切。',
          '这样状态表更稳定，也更适合后续扩展。',
        ],
      },
      {
        id: 'vn-optimal-solution',
        title: '标准解法：有限状态机',
        summary:
          '定义状态表后，按字符逐个扫描。每步先把字符映射到类别，再按 `state -> nextState` 转移。如果当前状态没有对应的转移规则，直接返回 `false`。扫描结束后，只要当前状态属于可接受终态，就返回 `true`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '规则多但结构稳定，适合状态机。',
          '这是字符串语法校验题的经典套路。',
        ],
        code: `function isNumber(s: string): boolean {
  const states: Array<Record<string, number>> = [
    { space: 0, sign: 1, digit: 2, dot: 4 },
    { digit: 2, dot: 4 },
    { digit: 2, dot: 3, exp: 5, space: 8 },
    { digit: 3, exp: 5, space: 8 },
    { digit: 3 },
    { sign: 6, digit: 7 },
    { digit: 7 },
    { digit: 7, space: 8 },
    { space: 8 },
  ]

  const getType = (char: string) => {
    if (char >= '0' && char <= '9') {
      return 'digit'
    }
    if (char === '+' || char === '-') {
      return 'sign'
    }
    if (char === 'e' || char === 'E') {
      return 'exp'
    }
    if (char === '.') {
      return 'dot'
    }
    if (char === ' ') {
      return 'space'
    }
    return 'illegal'
  }

  let state = 0

  for (const char of s) {
    const type = getType(char)
    if (!(type in states[state])) {
      return false
    }
    state = states[state][type]
  }

  return state === 2 || state === 3 || state === 7 || state === 8
}`,
      },
      {
        id: 'vn-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是用很多 `if` 生拼规则，最后把自己绕进去。真正掌握后，你会对复杂校验题更有掌控力，因为你不再靠感觉，而是靠状态建模。',
        bullets: [
          '易错点 1：忘了指数前后都必须有数字。',
          '易错点 2：允许小数点出现在指数段里。',
          '易错点 3：忽略前后空格或符号位置限制。',
          '延伸方向：括号匹配状态题、表达式解析、JSON/CSV 词法扫描。',
        ],
        callout:
          '越是规则复杂的题，越不能靠堆条件分支硬扛。把规则变成状态，代码才会真正稳定。',
      },
    ],
  },
  {
    id: 'plus-one',
    label: '66. LeetCode 66. 加一',
    difficulty: '简单',
    description:
      '这题表面很简单，但它在训练一种非常重要的数组模拟能力：从低位到高位处理进位，并且只在必要时做结构扩展。很多大整数题、字符串加法题，本质都从这里起步。',
    outcome:
      '你能掌握从数组尾部向前处理进位的基本套路，理解什么时候原地修改即可，什么时候需要新开数组，并把这种思路迁移到更复杂的高精度模拟题。',
    sections: [
      {
        id: 'po-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个由数字组成的数组 `digits`，它表示一个非负整数。现在要把这个整数加一，并返回结果数组。数组最高位在最前面，不会有前导零。',
        bullets: [
          '数组并不是普通列表，而是在表示一个完整数字。',
          '你不能先转成整数再处理，因为题目本意是考数组模拟。',
          '真正要处理的是低位加一后是否产生连锁进位。',
          '这是一道非常标准的“从尾到头”模拟题。',
        ],
      },
      {
        id: 'po-core-observation',
        title: '核心观察：只有尾部连续的 9 会引发连锁',
        summary:
          '如果最后一位不是 `9`，那直接加一返回即可；只有当最后一位是 `9` 时，才需要把它变成 `0` 并继续向前传递进位。所以这题的关键不是“加一”本身，而是识别进位传播条件。',
        bullets: [
          '末位不是 `9` 时，一步结束。',
          '末位是 `9` 时，要继续向前看。',
          '尾部连续多个 `9` 才会形成连锁。',
          '所有位都是 `9` 时，结果长度会加一。',
        ],
      },
      {
        id: 'po-simulation',
        title: '为什么从后往前遍历最自然',
        summary:
          '因为十进制加法的进位总是从低位向高位传递，所以最自然的做法就是从数组末尾开始遍历。每遇到一个不是 `9` 的位置，就把它加一并返回；经过的 `9` 全部置为 `0`。',
        bullets: [
          '进位传播方向决定了遍历方向。',
          '这是原地修改题，不需要额外复杂结构。',
          '一旦某一位不再产生进位，就能立刻结束。',
          '所以平均执行长度通常比你想象得更短。',
        ],
      },
      {
        id: 'po-optimal-solution',
        title: '标准解法：尾部进位模拟',
        summary:
          '从数组最后一个元素开始往前遍历。如果当前位小于 `9`，直接加一并返回；如果等于 `9`，置为 `0` 并继续前进。若所有位都处理完仍有进位，说明原数组全是 `9`，此时返回 `[1, ...digits]`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度通常是 `O(1)`，只有全 `9` 时返回新数组。',
          '这是高精度模拟题的基础模板。',
          '写法短，但思维非常典型。',
        ],
        code: `function plusOne(digits: number[]): number[] {
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    if (digits[index] < 9) {
      digits[index] += 1
      return digits
    }

    digits[index] = 0
  }

  return [1, ...digits]
}`,
      },
      {
        id: 'po-example-walkthrough',
        title: '拿 `[1, 2, 9]` 和 `[9, 9, 9]` 对比理解',
        summary:
          '对于 `[1, 2, 9]`，最后一位变成 `0`，向前进位后得到 `[1, 3, 0]`。对于 `[9, 9, 9]`，每一位都清零后仍然有进位，于是最终变成 `[1, 0, 0, 0]`。这两种情况正好覆盖了本题全部本质。',
        bullets: [
          '有非 9 的情况，会在某一位提前结束。',
          '全是 9 的情况，数组长度会增长。',
          '不需要真的做“加法器”，只要做进位传播。',
          '这是数组模拟题中非常干净的经典例子。',
        ],
      },
      {
        id: 'po-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把全 `9` 的情况漏掉，或者忘了原地把经过的 `9` 改成 `0`。掌握之后，你会更自然地进入字符串加法、高精度乘法、链表加法这类题。',
        bullets: [
          '易错点 1：最后没处理全 `9` 情况。',
          '易错点 2：遇到 `9` 没有及时置 `0`。',
          '易错点 3：从前往后遍历，导致逻辑拧巴。',
          '延伸方向：二进制加法、字符串加法、链表加法、高精度运算。',
        ],
        callout:
          '很多“简单题”的真正价值，不是题面，而是它把一个基础套路教得特别干净。加一题就是进位模拟的入门范本。',
      },
    ],
  },
  {
    id: 'add-binary',
    label: '67. LeetCode 67. 二进制求和',
    difficulty: '简单',
    description:
      '这题是在“加一”的基础上，把单数组进位升级成双串同步进位。核心仍然是从低位到高位做模拟，但这次你要同时处理两条输入链路和最终残留进位。',
    outcome:
      '你能掌握双指针从后往前做进位求和的写法，理解二进制加法与十进制高精度模拟的共性，并能把结果逆序构造后再统一翻转。',
    sections: [
      {
        id: 'ab-problem-summary',
        title: '题目在问什么',
        summary:
          '给定两个二进制字符串 `a` 和 `b`，返回它们的和，结果也要是一个二进制字符串。不能直接依赖大整数库，重点仍然是手工模拟加法过程。',
        bullets: [
          '输入是字符串，不是数值类型。',
          '每一位只可能是 `0` 或 `1`。',
          '真正要处理的是二进制加法的进位规则。',
          '这是典型的字符串高精度模拟题。',
        ],
      },
      {
        id: 'ab-core-idea',
        title: '核心思路：双指针从后往前同步扫描',
        summary:
          '因为低位在字符串末尾，所以最自然的做法是用两个指针分别指向 `a`、`b` 的尾部，从后往前逐位相加。每次把当前位、另一位和进位加起来，再决定当前结果位和新的进位。',
        bullets: [
          '指针一左移，指针二左移，进位单独保存。',
          '某一边提前结束时，把缺失位当成 `0`。',
          '每轮都只关心当前两位和一个进位。',
          '这是字符串相加类题的通用模板。',
        ],
      },
      {
        id: 'ab-binary-rules',
        title: '二进制加法规则为什么这么适合取模',
        summary:
          '因为每一轮的和只可能是 `0`、`1`、`2`、`3`。当前结果位就是 `sum % 2`，而新的进位就是 `Math.floor(sum / 2)`。这样你完全不需要手动列出所有分支组合。',
        bullets: [
          '`0 + 0 + carry` 的和最多是 `1`。',
          '`1 + 1 + carry` 的和最多是 `3`。',
          '模运算负责当前位，整除负责进位。',
          '这是一种很稳定的抽象方式。',
        ],
      },
      {
        id: 'ab-optimal-solution',
        title: '标准解法：双指针 + 进位',
        summary:
          '初始化两个指针分别指向字符串末尾，并准备一个 `carry`。循环条件是“任一字符串还有位可读，或者仍然存在进位”。每轮将当前位求和，把结果位存入数组，最后反转并拼接成字符串。',
        bullets: [
          '时间复杂度是 `O(max(m, n))`。',
          '空间复杂度是 `O(max(m, n))`。',
          '结果数组先逆序收集，最后统一翻转最自然。',
          '这是高频面试题，也是高精度模拟题基础模板。',
        ],
        code: `function addBinary(a: string, b: string): string {
  let left = a.length - 1
  let right = b.length - 1
  let carry = 0
  const result: string[] = []

  while (left >= 0 || right >= 0 || carry > 0) {
    const digitA = left >= 0 ? Number(a[left]) : 0
    const digitB = right >= 0 ? Number(b[right]) : 0
    const sum = digitA + digitB + carry

    result.push(String(sum % 2))
    carry = Math.floor(sum / 2)
    left -= 1
    right -= 1
  }

  return result.reverse().join('')
}`,
      },
      {
        id: 'ab-example-walkthrough',
        title: '拿 `a = "1010"`、`b = "1011"` 手推一次',
        summary:
          '从末位开始：`0 + 1 = 1`，再到 `1 + 1 = 10`，当前位写 `0`、进位变 `1`，后面继续带着进位推进。最终得到 `10101`。你会发现，它和十进制竖式加法的思路完全一样，只是底层进位规则变成了二进制。',
        bullets: [
          '核心不是二进制本身，而是“从低位向高位传递进位”。',
          '字符串尾部就是最低位，所以双指针一定从后往前。',
          '每轮只做一件事：算当前位和新进位。',
          '手推一次就能完全理解代码。',
        ],
      },
      {
        id: 'ab-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是循环条件漏掉最终残留进位，或者结果数组顺序处理错。真正掌握后，字符串加法、字符串乘法、高精度减法都会更顺手。',
        bullets: [
          '易错点 1：只循环到指针结束，没有处理最后一个进位。',
          '易错点 2：结果位直接拼接，忘了最后要反转。',
          '易错点 3：某一方结束后，没有把空位当作 `0`。',
          '延伸方向：十进制字符串相加、字符串乘法、链表求和、任意进制相加。',
        ],
        callout:
          '模拟题写得稳不稳，关键看你有没有把“当前位”和“进位”这两个角色彻底拆开。',
      },
    ],
  },
  {
    id: 'text-justification',
    label: '68. LeetCode 68. 文本左右对齐',
    difficulty: '困难',
    description:
      '这题不是考算法公式，而是考实现力。你要把“贪心分组 + 空格分配 + 最后一行特判”三层逻辑拆干净，否则代码很容易变成一团难维护的字符串拼接。',
    outcome:
      '你能掌握按行贪心装词、均匀分配空格和处理最后一行左对齐的完整流程，建立复杂字符串排版题的拆解思路，并写出结构清晰的实现。',
    sections: [
      {
        id: 'tj-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个单词数组 `words` 和每行宽度 `maxWidth`，要求把这些单词排成左右对齐的文本。除了最后一行外，每一行都要尽量均匀地分配空格；如果无法均分，左边的空格数要更多。',
        bullets: [
          '每行要尽量装下更多单词，这天然指向贪心。',
          '普通行要求左右对齐，最后一行只要求左对齐。',
          '单词之间至少一个空格。',
          '多余空格优先分配到左侧间隙。',
        ],
      },
      {
        id: 'tj-greedy-grouping',
        title: '第一步先做贪心分组，不要一边装词一边排版',
        summary:
          '最稳的做法是先确定“这一行包含哪些单词”，再单独处理这一行如何分配空格。也就是说，先把问题拆成“分组”和“格式化”两个阶段，而不是在一个循环里全做完。',
        bullets: [
          '分组负责决定每行放哪些单词。',
          '格式化负责决定空格怎么补。',
          '职责分开后，代码结构会清晰很多。',
          '这是复杂实现题最常见的拆解方式。',
        ],
      },
      {
        id: 'tj-space-distribution',
        title: '普通行的关键：均分空格，余数从左到右补',
        summary:
          '如果当前行有多个单词，就先计算所有单词总长度，再用 `maxWidth - totalLetters` 得到总空格数。间隙数量是 `wordsCount - 1`，均分得到基础空格，余数部分从左往右依次多补一个。',
        bullets: [
          '总空格数 = 行宽 - 单词总长度。',
          '基础空格数 = 总空格数 / 间隙数 向下取整。',
          '余数空格优先给左边间隙。',
          '这样才能满足题目要求的“左边更多”。',
        ],
        callout:
          '很多人卡在这里，不是不会算，而是没有先把“总空格”和“间隙个数”抽出来。实现题怕的不是难，是边界没抽象。',
      },
      {
        id: 'tj-last-line',
        title: '为什么最后一行要单独处理',
        summary:
          '最后一行不需要左右对齐，只需要单词之间一个空格，然后把剩余空格统一补到行尾。单词只有一个的普通行，也要用类似方式处理，因为它没有可均分的间隙。',
        bullets: [
          '最后一行统一左对齐。',
          '单个单词行也不能做均分空格。',
          '这两个场景都要落到“尾部补空格”。',
          '把这些边界提前单列，主体逻辑会简洁很多。',
        ],
      },
      {
        id: 'tj-optimal-solution',
        title: '标准解法：贪心分行 + 分类格式化',
        summary:
          '外层循环负责扫描单词，尽可能把更多单词装进当前行。确定行范围后，若是最后一行或单词数为一，就做左对齐；否则按总空格数和间隙数均分，并让多余空格从左向右补齐。最终把每一行加入结果数组。',
        bullets: [
          '时间复杂度是 `O(n + 总字符数)`。',
          '空间复杂度取决于结果输出。',
          '本质是实现题，不是高深算法题。',
          '但非常考验你对边界的拆解能力。',
        ],
        code: `function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = []
  let index = 0

  while (index < words.length) {
    let lineLength = words[index].length
    let last = index + 1

    while (
      last < words.length &&
      lineLength + 1 + words[last].length <= maxWidth
    ) {
      lineLength += 1 + words[last].length
      last += 1
    }

    const lineWords = words.slice(index, last)
    const isLastLine = last === words.length

    if (isLastLine || lineWords.length === 1) {
      const line = lineWords.join(' ')
      result.push(line + ' '.repeat(maxWidth - line.length))
    } else {
      const totalLetters = lineWords.reduce((sum, word) => sum + word.length, 0)
      const spaces = maxWidth - totalLetters
      const gaps = lineWords.length - 1
      const evenSpace = Math.floor(spaces / gaps)
      let extraSpace = spaces % gaps
      let line = ''

      for (let offset = 0; offset < gaps; offset += 1) {
        line += lineWords[offset]
        line += ' '.repeat(evenSpace + (extraSpace > 0 ? 1 : 0))
        if (extraSpace > 0) {
          extraSpace -= 1
        }
      }

      line += lineWords[lineWords.length - 1]
      result.push(line)
    }

    index = last
  }

  return result
}`,
      },
      {
        id: 'tj-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把分组和排版混在一起，导致边界一多就失控。掌握之后，你会更擅长做富文本、表格导出、打印模板这类需要复杂格式控制的实现题。',
        bullets: [
          '易错点 1：最后一行仍然按左右对齐处理。',
          '易错点 2：余数空格没有从左往右补。',
          '易错点 3：单词总长度和行总长度混为一谈。',
          '延伸方向：打印排版、Markdown 渲染、文本编辑器布局、表格导出。',
        ],
        callout:
          '实现题真正拉开差距的，不是会不会写循环，而是能不能先把问题拆出清晰的中间层。',
      },
    ],
  },
  {
    id: 'sqrtx',
    label: '69. LeetCode 69. x 的平方根',
    difficulty: '简单',
    description:
      '这题是二分查找最经典的入门变种之一。重点不是开根号本身，而是你能不能把“找答案”转换成“在有序解空间里找边界”。',
    outcome:
      '你能理解平方根题背后的单调性，掌握二分查找答案空间的写法，避免乘法溢出，并建立“不是在数组里找，而是在数值范围里找”的思维。',
    sections: [
      {
        id: 'sx-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个非负整数 `x`，要求返回它的算术平方根的整数部分。也就是说，如果真实平方根不是整数，就只保留向下取整后的结果。',
        bullets: [
          '不能直接用 `Math.sqrt` 当作算法答案。',
          '只要整数部分，不需要小数精度。',
          '答案满足 `ans * ans <= x` 且 `(ans + 1) * (ans + 1) > x`。',
          '这是标准的边界搜索题。',
        ],
      },
      {
        id: 'sx-monotonicity',
        title: '为什么它天然适合二分',
        summary:
          '因为随着候选值 `mid` 增大，`mid * mid` 也会单调增大。也就是说，是否满足 `mid * mid <= x` 这个判断具有单调性：前面一段为真，后面一段为假。这正是二分查找可以成立的前提。',
        bullets: [
          '候选答案空间是 `[0, x]`。',
          '判断条件天然单调。',
          '我们要找的是“最后一个满足条件的位置”。',
          '这就是典型的二分答案模板。',
        ],
      },
      {
        id: 'sx-boundary-search',
        title: '这题找的不是精确值，而是右边界',
        summary:
          '如果 `mid * mid <= x`，说明 `mid` 仍然可能是答案，但也许还能更大，所以应该继续往右找；如果 `mid * mid > x`，说明 `mid` 太大了，要往左缩。最终保留下来的就是最后一个合法值。',
        bullets: [
          '满足条件时记录答案并右移左边界。',
          '不满足条件时左移右边界。',
          '这是“找最大合法值”的经典写法。',
          '和找精确目标值的普通二分略有不同。',
        ],
      },
      {
        id: 'sx-overflow',
        title: '为什么很多语言里要注意乘法溢出',
        summary:
          '在某些语言里，`mid * mid` 可能超出整型范围，所以更稳的写法是用 `mid <= x / mid` 代替直接平方。JavaScript 的 `number` 对这题问题不大，但你要知道这个边界在别的语言里经常踩坑。',
        bullets: [
          '思维上要意识到“平方可能溢出”。',
          '通用写法常用除法避开风险。',
          '面试时主动提这一点会显得很稳。',
          '算法题不只是过样例，还要考虑实现细节。',
        ],
      },
      {
        id: 'sx-optimal-solution',
        title: '标准解法：二分答案',
        summary:
          '在区间 `[0, x]` 上做二分。每次取中点 `mid`，若 `mid <= x / mid`，说明当前值合法，记录到 `answer` 并尝试向右找更大的合法值；否则向左收缩。循环结束后，`answer` 就是平方根整数部分。',
        bullets: [
          '时间复杂度是 `O(log x)`。',
          '空间复杂度是 `O(1)`。',
          '本质是单调性 + 边界搜索。',
          '这是二分查找在答案空间上的经典应用。',
        ],
        code: `function mySqrt(x: number): number {
  let left = 0
  let right = x
  let answer = 0

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (mid <= Math.floor(x / mid)) {
      answer = mid
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return answer
}`,
      },
      {
        id: 'sx-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把它当成普通数组二分，而没意识到你真正二分的是“答案空间”。掌握之后，你会更容易进入开方、最小可行值、最大合法值这类二分答案题。',
        bullets: [
          '易错点 1：满足条件时直接返回，漏掉更大的合法值。',
          '易错点 2：没有处理 `x = 0` 或 `x = 1` 这类小边界。',
          '易错点 3：忽略乘法溢出风险。',
          '延伸方向：搜索插入位置、开方精度题、最小化最大值、最小可行速度题。',
        ],
        callout:
          '一旦你理解“二分的不一定是数组，也可以是答案区间”，很多题会一下子变得清晰。',
      },
    ],
  },
  {
    id: 'climbing-stairs',
    label: '70. LeetCode 70. 爬楼梯',
    difficulty: '简单',
    description:
      '这题表面是小学数学题，实际上是在教你动态规划最基础的“状态递推”思维。它的价值不在难度，而在于它是很多 DP 入门题最干净的起点。',
    outcome:
      '你能理解爬楼梯问题为什么会自然转成递推关系，掌握一维 DP 与状态压缩写法，并把这种“最后一步拆分”的思路迁移到更多计数型动态规划题。',
    sections: [
      {
        id: 'cs-problem-summary',
        title: '题目在问什么',
        summary:
          '假设你正在爬楼梯。需要爬到第 `n` 阶才能到达楼顶，每次你可以爬 `1` 阶或 `2` 阶。要求返回有多少种不同的方法可以爬到楼顶。',
        bullets: [
          '每次只能走 `1` 阶或 `2` 阶。',
          '问的是方法总数，不是最少步数。',
          '顺序不同算不同方案。',
          '这是一道典型的计数型递推题。',
        ],
      },
      {
        id: 'cs-last-step',
        title: '先看最后一步，递推关系自然就出来了',
        summary:
          '到达第 `n` 阶时，最后一步只能来自第 `n - 1` 阶跨一步，或者来自第 `n - 2` 阶跨两步。所以到达第 `n` 阶的方法数，就是到达前两阶方法数之和。',
        bullets: [
          '最后一步来自 `n - 1` 或 `n - 2`。',
          '两种来源互不重叠，可以直接相加。',
          '于是得到 `f(n) = f(n - 1) + f(n - 2)`。',
          '这和斐波那契数列的结构完全一致。',
        ],
        callout:
          '动态规划最重要的能力，就是看到“当前答案能不能由更小问题拼出来”。爬楼梯题是这个思路最标准的示范。',
      },
      {
        id: 'cs-state-definition',
        title: '状态定义为什么这么简单',
        summary:
          '可以令 `dp[i]` 表示到达第 `i` 阶的方法数。这样题目要的就是 `dp[n]`。一旦状态定义稳定，转移公式 `dp[i] = dp[i - 1] + dp[i - 2]` 就非常自然。',
        bullets: [
          '状态含义要直接表达“到达第 i 阶的方法数”。',
          '目标答案是最后一个状态。',
          '这是一维 DP，不需要二维表。',
          '状态越稳定，后续实现越顺。',
        ],
      },
      {
        id: 'cs-initialization',
        title: '初始化为什么很关键',
        summary:
          '递推式虽然简单，但前两个状态必须先定好。到达第 `1` 阶只有 `1` 种方法，到达第 `2` 阶有 `2` 种方法。没有这两个基础值，后续递推就无法展开。',
        bullets: [
          '`dp[1] = 1`。',
          '`dp[2] = 2`。',
          '小样例本身就是整个递推的地基。',
          '很多 DP 错误都出在初始化而不是公式本身。',
        ],
      },
      {
        id: 'cs-optimal-solution',
        title: '标准解法：一维 DP 或状态压缩',
        summary:
          '最直接的写法是用一维数组记录所有状态；但由于每一步只依赖前两个状态，所以完全可以把空间压缩成两个变量滚动更新。对于这题来说，状态压缩版更短也更高效。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '数组版空间复杂度是 `O(n)`。',
          '压缩版空间复杂度是 `O(1)`。',
          '这是非常典型的“只依赖前两个状态”的 DP 题。',
        ],
        code: `function climbStairs(n: number): number {
  if (n <= 2) {
    return n
  }

  let prevTwo = 1
  let prevOne = 2

  for (let step = 3; step <= n; step += 1) {
    const current = prevOne + prevTwo
    prevTwo = prevOne
    prevOne = current
  }

  return prevOne
}`,
      },
      {
        id: 'cs-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把方法数题和最优值题混淆，或者初始化写错。真正掌握后，你会对“最后一步拆分”的计数型 DP 建立非常扎实的第一感觉。',
        bullets: [
          '易错点 1：没处理 `n <= 2` 的边界。',
          '易错点 2：把递推关系写错成乘法或取最值。',
          '易错点 3：知道像斐波那契，却不知道为什么像。',
          '延伸方向：使用最小花费爬楼梯、打家劫舍、斐波那契数列、泰波那契数列。',
        ],
        callout:
          '别小看这道题。它真正训练的是“先拆最后一步，再写递推”的思维，这正是大量 DP 题的共同起点。',
      },
    ],
  },
  {
    id: 'simplify-path',
    label: '71. LeetCode 71. 简化路径',
    difficulty: '中等',
    description:
      '这题看起来像字符串处理，实质是在考你能不能把路径层级关系翻译成栈操作。真正关键不是正则替换，而是把 `.`、`..` 和重复斜杠这些语义处理清楚。',
    outcome:
      '你能掌握 Unix 路径简化题的栈解法，理解为什么目录回退天然适合栈结构，并把这种“分段解析 + 状态回退”的思路迁移到更多解析题。',
    sections: [
      {
        id: 'sp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个表示 Unix 风格绝对路径的字符串 `path`，要求将其简化成规范路径。需要正确处理当前目录 `.`、上一级目录 `..` 和多个连续斜杠 `/`。',
        bullets: [
          '路径一定是绝对路径，以 `/` 开头。',
          '`.` 表示当前目录，可以忽略。',
          '`..` 表示回到上一级目录。',
          '多个连续斜杠要视为一个。',
        ],
      },
      {
        id: 'sp-why-stack',
        title: '为什么这题天然适合用栈',
        summary:
          '路径中的每一个有效目录段，都像是在不断往更深层目录前进；而遇到 `..` 时，本质上是在撤销最近一次进入目录的操作。这个“最近进入的目录先退出”的特征，正好就是栈的后进先出模型。',
        bullets: [
          '进入目录相当于入栈。',
          '返回上级目录相当于出栈。',
          '当前目录 `.` 什么都不做。',
          '结构天然是“最近的目录先被回退”。',
        ],
        callout:
          '一看到“最近一次操作要被撤销”这类语义，就要本能地去想栈。这题就是这种结构最标准的例子之一。',
      },
      {
        id: 'sp-splitting',
        title: '先按 `/` 分段，再分别解释每一段语义',
        summary:
          '最稳的做法是先用 `/` 把路径拆成若干段。然后遍历每一段：空字符串和 `.` 直接跳过；遇到 `..` 就尝试弹栈；其它合法目录名则压栈。最后再把栈里的目录重新拼接起来。',
        bullets: [
          '空段来自连续斜杠，要忽略。',
          '`.` 不改变路径状态。',
          '`..` 需要回退一级，但栈空时不能再退。',
          '普通目录名正常入栈。',
        ],
      },
      {
        id: 'sp-edge-cases',
        title: '为什么边界都集中在 `..` 和空段上',
        summary:
          '如果路径里有多个连续斜杠，就会产生很多空段；如果有太多 `..`，还可能尝试退到根目录之上。但 Unix 规范路径不能越过根目录，所以这时只需要保持栈为空即可。',
        bullets: [
          '空段必须忽略，否则会拼出多余路径层。',
          '根目录之上不能继续回退。',
          '最终栈为空时答案应当是 `/`。',
          '这些边界一旦想清楚，代码其实很短。',
        ],
      },
      {
        id: 'sp-optimal-solution',
        title: '标准解法：分段遍历 + 栈',
        summary:
          '把 `path` 按 `/` 切分。遍历每个片段：若是空串或 `.`，跳过；若是 `..`，就弹出栈顶目录；否则压入栈。最后用 `/` 连接栈中目录，并在开头补一个根斜杠。若栈为空，则返回 `/`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '核心不是字符串替换，而是路径层级回退。',
          '这是“解析结构 + 栈回退”的经典题。',
        ],
        code: `function simplifyPath(path: string): string {
  const stack: string[] = []
  const segments = path.split('/')

  for (const segment of segments) {
    if (segment === '' || segment === '.') {
      continue
    }

    if (segment === '..') {
      if (stack.length > 0) {
        stack.pop()
      }
      continue
    }

    stack.push(segment)
  }

  return stack.length > 0 ? \`/\${stack.join('/')}\` : '/'
}`,
      },
      {
        id: 'sp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把它当成简单字符串替换题，结果在 `..` 的层级语义上翻车。掌握后，你会对很多“带回退语义”的解析题更敏感。',
        bullets: [
          '易错点 1：把 `..` 直接删掉，而不是回退最近目录。',
          '易错点 2：没有忽略连续斜杠形成的空段。',
          '易错点 3：栈空时仍然继续弹出，语义越界。',
          '延伸方向：文件路径规范化、表达式解析、撤销操作栈、浏览历史栈模拟。',
        ],
        callout:
          '很多解析题的关键，不是“怎么分割字符串”，而是“分割之后每一段在状态机里意味着什么”。',
      },
    ],
  },
  {
    id: 'edit-distance',
    label: '72. LeetCode 72. 编辑距离',
    difficulty: '困难',
    description:
      '这题是动态规划里的经典硬题之一。它真正考的不是公式背诵，而是你能否把“插入、删除、替换”这三种编辑操作统一抽象进二维状态转移。',
    outcome:
      '你能掌握编辑距离的二维 DP 建模方式，理解状态为什么要定义到两个字符串前缀上，并能独立推导出插入、删除、替换三种操作对应的转移关系。',
    sections: [
      {
        id: 'ed-problem-summary',
        title: '题目在问什么',
        summary:
          '给定两个单词 `word1` 和 `word2`，要求计算把 `word1` 转换成 `word2` 所使用的最少操作数。允许的操作只有三种：插入一个字符、删除一个字符、替换一个字符。',
        bullets: [
          '目标是最少操作次数。',
          '只允许插入、删除、替换。',
          '字符顺序会影响结果，不能只看集合。',
          '这是典型的字符串最优化型 DP 题。',
        ],
      },
      {
        id: 'ed-state-definition',
        title: '为什么状态一定要定义在两个前缀上',
        summary:
          '可以令 `dp[i][j]` 表示把 `word1` 的前 `i` 个字符转换成 `word2` 的前 `j` 个字符所需的最少操作数。因为任何一次编辑，实际上都在影响两个字符串某个前缀之间的关系，所以二维前缀状态是最自然、最稳定的定义方式。',
        bullets: [
          '一维状态不够表达两个字符串的对齐关系。',
          '前缀定义可以天然承接逐字符比较。',
          '最终答案就是 `dp[m][n]`。',
          '这是字符串匹配类 DP 最经典的状态模型。',
        ],
      },
      {
        id: 'ed-transition',
        title: '三种操作如何落进同一个转移公式',
        summary:
          '如果当前字符相同，那么不用新操作，直接继承 `dp[i - 1][j - 1]`；如果不同，就要在三种操作里选最优：删除对应 `dp[i - 1][j] + 1`，插入对应 `dp[i][j - 1] + 1`，替换对应 `dp[i - 1][j - 1] + 1`。',
        bullets: [
          '删除：删掉 `word1` 当前字符。',
          '插入：向 `word1` 当前前缀补一个字符。',
          '替换：把当前字符改成目标字符。',
          '三种操作的最小值就是当前最优解。',
        ],
        callout:
          '编辑距离这题的核心，不是记住公式，而是理解每个转移项到底对应哪一种真实编辑动作。你能讲清楚这一点，公式自然就记住了。',
      },
      {
        id: 'ed-initialization',
        title: '初始化为什么代表“和空串对齐”',
        summary:
          '当 `word2` 为空串时，把 `word1` 的前 `i` 个字符变成空串，只能删 `i` 次，所以 `dp[i][0] = i`；同理，把空串变成 `word2` 的前 `j` 个字符，只能插入 `j` 次，所以 `dp[0][j] = j`。这些初始化值构成了整个 DP 表的边界。',
        bullets: [
          '第一列是“删到空”。',
          '第一行是“从空插入”。',
          '这是二维 DP 边界最标准的含义之一。',
          '初始化不只是填数字，而是在描述真实操作场景。',
        ],
      },
      {
        id: 'ed-optimal-solution',
        title: '标准解法：二维 DP',
        summary:
          '先建立 `(m + 1) x (n + 1)` 的 DP 表，并初始化第一行和第一列。然后按行按列遍历：若当前字符相同，则继承左上角；若不同，则在删除、插入、替换三种方案中取最小值加一。最后 `dp[m][n]` 就是编辑距离。',
        bullets: [
          '时间复杂度是 `O(mn)`。',
          '空间复杂度是 `O(mn)`。',
          '如果需要，还能压缩到一维 DP。',
          '但先把二维转移彻底理解更重要。',
        ],
        code: `function minDistance(word1: string, word2: string): number {
  const rows = word1.length
  const cols = word2.length
  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0))

  for (let row = 0; row <= rows; row += 1) {
    dp[row][0] = row
  }

  for (let col = 0; col <= cols; col += 1) {
    dp[0][col] = col
  }

  for (let row = 1; row <= rows; row += 1) {
    for (let col = 1; col <= cols; col += 1) {
      if (word1[row - 1] === word2[col - 1]) {
        dp[row][col] = dp[row - 1][col - 1]
      } else {
        dp[row][col] =
          Math.min(
            dp[row - 1][col],
            dp[row][col - 1],
            dp[row - 1][col - 1],
          ) + 1
      }
    }
  }

  return dp[rows][cols]
}`,
      },
      {
        id: 'ed-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是记住了公式却不理解三种操作的语义，或者二维下标和字符串下标没对齐。真正掌握后，你会对很多字符串 DP 题建立更稳的分析框架。',
        bullets: [
          '易错点 1：`dp` 下标和字符串字符下标错位一位。',
          '易错点 2：分不清插入、删除、替换各自对应哪个状态。',
          '易错点 3：初始化没从“和空串对齐”去理解。',
          '延伸方向：删除操作得到两个字符串相同、不同子序列、LCS、正则匹配。',
        ],
        callout:
          '编辑距离几乎是字符串 DP 里的里程碑题。能真正推明白它，你对二维动态规划的理解会明显上一个台阶。',
      },
    ],
  },
  {
    id: 'set-matrix-zeroes',
    label: '73. LeetCode 73. 矩阵置零',
    difficulty: '中等',
    description:
      '这题表面是在改二维数组，真正考的是你能否在“原地修改”和“状态记录”之间找到平衡。很多人一边扫描一边置零，结果把后续判断需要的原始信息提前污染掉了。',
    outcome:
      '你能掌握矩阵原地标记的经典思路，理解为什么第一行和第一列可以同时承担“数据”和“标记位”两种角色，并能独立处理这类原地状态压缩题。',
    sections: [
      {
        id: 'smz-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个 `m x n` 的矩阵，如果某个元素为 `0`，就把它所在的整行和整列都设为 `0`。要求在原矩阵上直接修改。',
        bullets: [
          '发现一个 `0`，整行整列都要清零。',
          '不能返回新矩阵，而是原地修改。',
          '关键难点在于：修改过程中不能破坏后续判断依据。',
          '这是典型的“原地标记”题。',
        ],
      },
      {
        id: 'smz-why-direct-fails',
        title: '为什么边遍历边置零一定会出错',
        summary:
          '如果扫描到一个 `0` 就立刻把整行整列都改成 `0`，你后面再扫到这些新写进去的 `0` 时，就无法分辨它们是原始 `0` 还是你刚才制造出来的 `0`。状态一旦被污染，结果就会扩大化。',
        bullets: [
          '原始信息和新写入信息混在一起。',
          '后续扫描会误判新出现的 `0`。',
          '这类题必须先记录，再统一处理。',
          '本质是“读阶段”和“写阶段”要分离。',
        ],
        callout:
          '只要一看到“原地修改，但后续判断还依赖原始值”，就要立刻警惕状态污染问题。',
      },
      {
        id: 'smz-marker-idea',
        title: '第一行第一列为什么可以拿来当标记区',
        summary:
          '我们完全可以不用额外二维数组，而是把“这一行要不要清零”记录到该行第一列，把“这一列要不要清零”记录到该列第一行。这样矩阵本身就兼任了标记区，只需要额外两个布尔值记录第一行和第一列原本是否含 `0`。',
        bullets: [
          '第 `i` 行是否清零，记在 `matrix[i][0]`。',
          '第 `j` 列是否清零，记在 `matrix[0][j]`。',
          '第一行和第一列重叠在 `matrix[0][0]`，所以要额外补布尔变量。',
          '这是典型的空间压缩技巧。',
        ],
      },
      {
        id: 'smz-processing-order',
        title: '为什么必须先标记，再处理内部，再处理首行首列',
        summary:
          '正确顺序是：先扫描首行首列是否有 `0`；再扫描内部区域并写标记；然后根据标记处理除首行首列之外的内部区域；最后再根据两个布尔值决定是否清空首行和首列。顺序错了，标记就会被提前冲掉。',
        bullets: [
          '首行首列的原始状态要先保住。',
          '内部区域可以放心借用首行首列做标记。',
          '最后再回头处理首行首列。',
          '顺序本身就是解法的一部分。',
        ],
      },
      {
        id: 'smz-optimal-solution',
        title: '标准解法：首行首列原地标记',
        summary:
          '先用两个变量记录第一行和第一列是否需要清零。然后遍历内部区域，若 `matrix[row][col] === 0`，就把 `matrix[row][0]` 和 `matrix[0][col]` 标记为 `0`。接着依据这些标记处理内部区域，最后再单独处理第一行和第一列。',
        bullets: [
          '时间复杂度是 `O(mn)`。',
          '额外空间复杂度是 `O(1)`。',
          '核心是把矩阵本身当状态表来用。',
          '这是二维原地修改题里的经典方法。',
        ],
        code: `function setZeroes(matrix: number[][]): void {
  const rows = matrix.length
  const cols = matrix[0].length
  let firstRowZero = false
  let firstColZero = false

  for (let col = 0; col < cols; col += 1) {
    if (matrix[0][col] === 0) {
      firstRowZero = true
    }
  }

  for (let row = 0; row < rows; row += 1) {
    if (matrix[row][0] === 0) {
      firstColZero = true
    }
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0
        matrix[0][col] = 0
      }
    }
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0
      }
    }
  }

  if (firstRowZero) {
    for (let col = 0; col < cols; col += 1) {
      matrix[0][col] = 0
    }
  }

  if (firstColZero) {
    for (let row = 0; row < rows; row += 1) {
      matrix[row][0] = 0
    }
  }
}`,
      },
      {
        id: 'smz-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是想到用首行首列做标记，却没处理好第一行第一列本身的语义冲突。只要你把这层想透，类似“原数组兼做状态表”的题都会清晰很多。',
        bullets: [
          '易错点 1：扫描时直接置零，导致状态污染。',
          '易错点 2：忘记单独记录第一行和第一列是否原本含 `0`。',
          '易错点 3：处理顺序错误，提前覆盖标记。',
          '延伸方向：生命游戏、矩阵翻转、原地哈希标记、缺失数字类题目。',
        ],
        callout:
          '原地算法的重点不是“省空间”三个字，而是你是否还能在有限空间里保住完整状态。',
      },
    ],
  },
  {
    id: 'search-a-2d-matrix',
    label: '74. LeetCode 74. 搜索二维矩阵',
    difficulty: '中等',
    description:
      '这题看起来是二维查找，核心却是降维。只要你真正理解题目给出的有序结构，就会发现整个矩阵本质上就是一条排好序的一维数组。',
    outcome:
      '你能掌握二维有序矩阵的一维映射二分写法，理解为什么行列坐标可以和一维下标互相转换，并把这类“结构降维”思路迁移到更多查找题。',
    sections: [
      {
        id: 's2m-problem-summary',
        title: '题目在问什么',
        summary:
          '给你一个 `m x n` 矩阵。每一行从左到右升序排列，且每一行的第一个元素都大于上一行的最后一个元素。要求判断目标值 `target` 是否存在于矩阵中。',
        bullets: [
          '每一行内部有序。',
          '行与行之间也是整体递增衔接的。',
          '只需要返回是否存在。',
          '重点在于利用整体有序结构。',
        ],
      },
      {
        id: 's2m-why-one-array',
        title: '为什么它本质上就是一维有序数组',
        summary:
          '由于后一行第一个元素一定大于前一行最后一个元素，所以把矩阵按行展开后，得到的序列仍然严格有序。既然如此，就没必要先二分行再二分列，直接把整个矩阵当成长度为 `m * n` 的有序数组即可。',
        bullets: [
          '按行展开后顺序不被破坏。',
          '整体就是单调递增序列。',
          '二分查找可以直接在全局区间上做。',
          '这是标准的“二维结构降维”。',
        ],
        callout:
          '很多题的突破口，不是去设计更复杂的结构，而是识别“它其实已经是你熟悉的结构了”。',
      },
      {
        id: 's2m-index-mapping',
        title: '一维下标和二维坐标怎么互转',
        summary:
          '如果把矩阵看成长为 `rows * cols` 的一维数组，那么一维下标 `index` 对应的行号就是 `Math.floor(index / cols)`，列号就是 `index % cols`。这样你每次二分取中点，都能反推出真实矩阵元素。',
        bullets: [
          '行号 = `Math.floor(index / cols)`。',
          '列号 = `index % cols`。',
          '映射公式固定且可逆。',
          '这是很多矩阵降维题的通用技巧。',
        ],
      },
      {
        id: 's2m-binary-search',
        title: '为什么没必要先找行再找列',
        summary:
          '先找行再找列当然也能做，但那其实把问题拆成了两次判断。直接做全局二分逻辑更统一，边界更少，思路也更接近题目真正提供的“整体有序”条件。工程上更偏好这种简洁稳定的写法。',
        bullets: [
          '全局二分逻辑更统一。',
          '只维护一组左右边界即可。',
          '边界条件更少，更不容易写错。',
          '是这题最自然的主流解法。',
        ],
      },
      {
        id: 's2m-optimal-solution',
        title: '标准解法：降维后二分',
        summary:
          '把搜索区间定义在 `[0, rows * cols - 1]` 上。每次取中点 `mid`，通过映射公式定位到矩阵中的真实元素，再与 `target` 比较，像普通二分查找那样收缩左右边界即可。',
        bullets: [
          '时间复杂度是 `O(log(mn))`。',
          '空间复杂度是 `O(1)`。',
          '本质是有序数组二分，而不是复杂矩阵算法。',
          '关键在于识别整体单调性。',
        ],
        code: `function searchMatrix(matrix: number[][], target: number): boolean {
  const rows = matrix.length
  const cols = matrix[0].length
  let left = 0
  let right = rows * cols - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const row = Math.floor(mid / cols)
    const col = mid % cols
    const value = matrix[row][col]

    if (value === target) {
      return true
    }

    if (value < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return false
}`,
      },
      {
        id: 's2m-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是看到二维矩阵就下意识想写两层逻辑，反而错过了最简单的一维二分模型。掌握后，你会对很多“表面二维、实则一维有序”的题更敏感。',
        bullets: [
          '易错点 1：没利用行间严格递增这一关键信息。',
          '易错点 2：一维下标和行列坐标换算错误。',
          '易错点 3：把它和“每行每列分别有序”的另一类矩阵题混淆。',
          '延伸方向：搜索二维矩阵 II、旋转数组查找、答案二分、索引映射题。',
        ],
        callout:
          '降维思维非常值钱。很多中等题一旦降成熟悉模型，难度会立刻掉一大截。',
      },
    ],
  },
  {
    id: 'sort-colors',
    label: '75. LeetCode 75. 颜色分类',
    difficulty: '中等',
    description:
      '这题不是简单排序题，而是在训练你对“双指针分区”模型的理解。真正关键不在于把数组排好，而在于你能否一次扫描就把三种颜色送到各自区域。',
    outcome:
      '你能掌握荷兰国旗问题的三指针写法，理解小于区、当前扫描区和大于区的边界含义，并把这种原地分区思路迁移到更多数组重排问题。',
    sections: [
      {
        id: 'sc-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含 `0`、`1`、`2` 的数组，要求原地排序，使得相同颜色相邻，并按红、白、蓝的顺序排列。',
        bullets: [
          '`0`、`1`、`2` 分别代表三种颜色。',
          '要求原地排序。',
          '希望尽量一次遍历完成。',
          '本质是三路分区问题。',
        ],
      },
      {
        id: 'sc-why-not-generic-sort',
        title: '为什么这题重点不是调用排序',
        summary:
          '直接排序当然能过，但这题真正想考的是你能不能利用“值域只有三种”的特点，在线性时间里完成重排。它不是在考排序 API，而是在考你对分区过程的控制能力。',
        bullets: [
          '题目值域非常小，是明显提示。',
          '目标是线性时间、原地完成。',
          '这是一道典型的模型题，而不是工具题。',
          '面试场景更看重你的分区思维。',
        ],
        callout:
          '很多题都能“做出来”，但模型题的价值在于：你能不能说出它到底在训练什么能力。',
      },
      {
        id: 'sc-three-zones',
        title: '数组其实一直被维护成三个区间',
        summary:
          '可以用三个指针维护区间：`left` 左边全部是 `0`，`right` 右边全部是 `2`，`index` 在中间扫描。当扫到 `0` 时，把它交换到左区；扫到 `2` 时，把它交换到右区；扫到 `1` 时直接跳过即可。',
        bullets: [
          '`[0, left - 1]` 全是 `0`。',
          '`[left, index - 1]` 全是 `1`。',
          '`[right + 1, end]` 全是 `2`。',
          '`index` 负责推进未处理区域。',
        ],
      },
      {
        id: 'sc-why-index-stays',
        title: '为什么和右边交换后不能立刻前进',
        summary:
          '当当前位置是 `2` 时，你把它和 `right` 交换后，换回来的那个值还没检查过，所以 `index` 不能立刻加一；但如果当前位置是 `0`，交换到左边后，换回来的位置一定是已经处理过的区域，因此可以继续前进。',
        bullets: [
          '与右侧交换后，新值未知，必须重新检查。',
          '与左侧交换后，新值来自已处理区，更安全。',
          '这是这题最常见的细节坑。',
          '理解区间语义，比硬背代码更重要。',
        ],
      },
      {
        id: 'sc-optimal-solution',
        title: '标准解法：荷兰国旗三指针',
        summary:
          '维护 `left`、`index`、`right` 三个指针。遍历时若 `nums[index] === 0`，就与 `left` 交换并同时右移 `left` 与 `index`；若等于 `2`，就与 `right` 交换并左移 `right`；若等于 `1`，只移动 `index`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '一次扫描即可完成。',
          '这是三路分区的经典模板。',
        ],
        code: `function sortColors(nums: number[]): void {
  let left = 0
  let index = 0
  let right = nums.length - 1

  while (index <= right) {
    if (nums[index] === 0) {
      ;[nums[left], nums[index]] = [nums[index], nums[left]]
      left += 1
      index += 1
      continue
    }

    if (nums[index] === 2) {
      ;[nums[right], nums[index]] = [nums[index], nums[right]]
      right -= 1
      continue
    }

    index += 1
  }
}`,
      },
      {
        id: 'sc-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是交换 `2` 到右侧后错误地让 `index` 前进，导致漏检。只要你真正理解三个区间各自代表什么，三路分区题就会变得很稳。',
        bullets: [
          '易错点 1：和 `right` 交换后仍然让 `index++`。',
          '易错点 2：没有清楚维护三个区间的语义。',
          '易错点 3：把这题写成计数回填，却说不出分区解法。',
          '延伸方向：快速排序分区、奇偶重排、按条件分组、区间划分题。',
        ],
        callout:
          '荷兰国旗问题是双指针分区思维里的里程碑题，值得你彻底吃透而不是只记一版代码。',
      },
    ],
  },
  {
    id: 'minimum-window-substring',
    label: '76. LeetCode 76. 最小覆盖子串',
    difficulty: '困难',
    description:
      '这题表面是字符串查找，核心却是滑动窗口的“先满足，再收缩”模型。真正难点不在于会不会双指针，而在于你能否精确维护“窗口已经覆盖目标串”的状态。',
    outcome:
      '你能掌握最小覆盖子串的标准滑动窗口写法，理解为什么需要一边扩张窗口凑齐需求，一边在满足条件时持续收缩，并把这种“动态维护合法窗口”的思路迁移到更多子串题。',
    sections: [
      {
        id: 'mws-problem-summary',
        title: '题目在问什么',
        summary:
          '给定字符串 `s` 和 `t`，要求在 `s` 中找出包含 `t` 所有字符的最短子串。如果不存在这样的子串，就返回空字符串。',
        bullets: [
          '子串必须覆盖 `t` 中所有字符。',
          '字符出现次数也要满足，不只是出现过即可。',
          '目标是最短，而不是任意一个可行解。',
          '这是典型的滑动窗口最优化问题。',
        ],
      },
      {
        id: 'mws-why-bruteforce-fails',
        title: '为什么暴力枚举子串会非常笨重',
        summary:
          '如果你枚举所有子串，再逐个判断是否覆盖 `t`，时间复杂度会很快爆炸。真正高效的做法，是利用窗口的连续性：右指针负责把窗口扩到合法，左指针负责在合法前提下尽量缩小。',
        bullets: [
          '子串数量本身就是平方级。',
          '每个子串再去统计字符，会更慢。',
          '窗口问题要优先想双指针而不是枚举边界。',
          '关键是复用相邻窗口之间的状态。',
        ],
        callout:
          '滑动窗口的价值，不是“省掉一层循环”，而是你能否把窗口状态持续复用起来。',
      },
      {
        id: 'mws-valid-window',
        title: '什么叫“窗口已经覆盖目标串”',
        summary:
          '先统计 `t` 中每个字符需要多少次。窗口右移时，把当前字符加入计数；当某个字符的窗口计数刚好达到需求，就认为这个字符“满足了”。当所有需要的字符都满足后，窗口才算合法。',
        bullets: [
          '不是窗口里字符种类够了就行。',
          '必须连出现次数也满足。',
          '通常要维护 `need`、`window` 和 `matched` 三类状态。',
          '合法窗口的判断要尽量做到 `O(1)`。',
        ],
      },
      {
        id: 'mws-why-shrink',
        title: '为什么一旦窗口合法，就要马上尝试收缩',
        summary:
          '这题求的是最短覆盖子串，所以窗口一旦合法，就应该让左指针尽可能右移，直到窗口刚好失去合法性为止。这个过程会不断刷新答案，也正是“最小化”的关键来源。',
        bullets: [
          '右指针负责找到可行解。',
          '左指针负责把可行解压缩成更优解。',
          '每个字符最多进窗出窗一次，所以总复杂度仍然线性。',
          '这是“先满足，再缩小”的窗口经典模式。',
        ],
      },
      {
        id: 'mws-optimal-solution',
        title: '标准解法：滑动窗口 + 计数表',
        summary:
          '用 `need` 记录 `t` 的字符需求，用 `window` 记录当前窗口计数。右指针不断扩张；若窗口满足所有需求，就进入收缩循环，用左指针缩到不能再缩，同时维护最短答案。最后返回记录下来的最优区间。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度取决于字符集大小。',
          '重点是合法窗口判断和收缩时机。',
          '这是字符串窗口题里的里程碑模板。',
        ],
        code: `function minWindow(s: string, t: string): string {
  const need = new Map<string, number>()
  const window = new Map<string, number>()

  for (const char of t) {
    need.set(char, (need.get(char) ?? 0) + 1)
  }

  let left = 0
  let matched = 0
  let bestStart = 0
  let bestLength = Number.POSITIVE_INFINITY

  for (let right = 0; right < s.length; right += 1) {
    const rightChar = s[right]

    if (need.has(rightChar)) {
      window.set(rightChar, (window.get(rightChar) ?? 0) + 1)

      if (window.get(rightChar) === need.get(rightChar)) {
        matched += 1
      }
    }

    while (matched === need.size) {
      const currentLength = right - left + 1

      if (currentLength < bestLength) {
        bestLength = currentLength
        bestStart = left
      }

      const leftChar = s[left]

      if (need.has(leftChar)) {
        if (window.get(leftChar) === need.get(leftChar)) {
          matched -= 1
        }

        window.set(leftChar, (window.get(leftChar) ?? 0) - 1)
      }

      left += 1
    }
  }

  return Number.isFinite(bestLength)
    ? s.slice(bestStart, bestStart + bestLength)
    : ''
}`,
      },
      {
        id: 'mws-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“字符出现过”误当成“字符需求已满足”，或者在收缩窗口时把状态更新顺序写反。真正掌握后，你会对很多覆盖型窗口题建立更稳的手感。',
        bullets: [
          '易错点 1：忽略字符重复次数，只判断字符是否存在。',
          '易错点 2：收缩窗口时先减计数还是先改匹配数写混。',
          '易错点 3：没理解为什么窗口合法后必须持续收缩。',
          '延伸方向：字符串排列、找到所有字母异位词、最短超串、覆盖型滑动窗口题。',
        ],
        callout:
          '最小覆盖子串是真正能把滑动窗口能力拉到中高级水平的一道题，值得反复吃透。',
      },
    ],
  },
  {
    id: 'combinations',
    label: '77. LeetCode 77. 组合',
    difficulty: '中等',
    description:
      '这题是回溯入门中的核心题型。它真正训练的不是“会不会递归”，而是你能否明确路径、选择列表和终止条件三件事，并学会用剪枝减少无效搜索。',
    outcome:
      '你能掌握组合类回溯的标准模板，理解为什么组合问题要用起点索引避免重复，并把剪枝写进搜索边界，而不是靠结果集去重。',
    sections: [
      {
        id: 'comb-problem-summary',
        title: '题目在问什么',
        summary:
          '从 `1` 到 `n` 这 `n` 个数中，选出 `k` 个数组成所有可能的组合，返回所有结果。',
        bullets: [
          '每个数字只能选一次。',
          '顺序不同不算不同结果。',
          '要求返回所有组合。',
          '这是标准的组合型回溯问题。',
        ],
      },
      {
        id: 'comb-why-no-permutation',
        title: '为什么这题不是排列问题',
        summary:
          '组合只关心“选了哪些数”，不关心顺序；排列则关心顺序。因此 `[1, 2]` 和 `[2, 1]` 在组合里是同一个结果。正因为如此，递归时必须从后续位置继续选，而不是每次都从头开始。',
        bullets: [
          '组合看集合，不看顺序。',
          '为了避免重复，下一层只能向后选。',
          '起点索引是这类题的关键控制变量。',
          '它天然适合“从当前位置往后试”的搜索方式。',
        ],
        callout:
          '一旦题目说“组合”，你就该本能想到“有序起点 + 向后选择”，而不是全排列模板。',
      },
      {
        id: 'comb-path-choice-end',
        title: '回溯题先想清楚路径、选择和结束条件',
        summary:
          '当前已经选了哪些数字，就是路径；下一层还能从哪些数字里继续选，就是选择列表；当路径长度等于 `k` 时，就达成一个完整组合。只要把这三件事说清楚，代码就自然会稳下来。',
        bullets: [
          '路径：当前已选数字列表。',
          '选择：从 `start` 到 `n` 的候选数字。',
          '结束：路径长度达到 `k`。',
          '回溯就是在这三者之间不断推进和撤销。',
        ],
      },
      {
        id: 'comb-pruning',
        title: '为什么这题可以剪枝，而且应该剪枝',
        summary:
          '如果当前路径已经选了 `path.length` 个数，那么还需要再选 `k - path.length` 个。如果剩余可选数字数量根本不够，就没必要继续递归。这个判断可以直接收缩 for 循环上界，大幅减少无效搜索。',
        bullets: [
          '剪枝本质是提前排除“不可能凑满”的分支。',
          '组合题常见剪枝都体现在循环上界。',
          '剪枝不会改变结果，只减少搜索量。',
          '这是回溯题工程化思维的第一步。',
        ],
      },
      {
        id: 'comb-optimal-solution',
        title: '标准解法：回溯 + 起点索引 + 剪枝',
        summary:
          '使用一个数组 `path` 记录当前组合。递归函数接收起点 `start`，表示下一层只能从这个位置开始向后选。若 `path.length === k`，就收集答案；否则继续枚举候选数字，并在返回时撤销选择。',
        bullets: [
          '时间复杂度与组合总数相关。',
          '空间复杂度主要来自递归栈和路径数组。',
          '重点是“向后选”而不是“全量重选”。',
          '这是组合型回溯的通用模板。',
        ],
        code: `function combine(n: number, k: number): number[][] {
  const result: number[][] = []
  const path: number[] = []

  const dfs = (start: number) => {
    if (path.length === k) {
      result.push([...path])
      return
    }

    const remaining = k - path.length

    for (let value = start; value <= n - remaining + 1; value += 1) {
      path.push(value)
      dfs(value + 1)
      path.pop()
    }
  }

  dfs(1)
  return result
}`,
      },
      {
        id: 'comb-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把组合写成排列，或者不会把剪枝写进边界。真正掌握后，你会对“子集、组合总和、分割回文串”这类回溯题建立统一骨架。',
        bullets: [
          '易错点 1：下一层仍从 `1` 开始选，导致重复结果。',
          '易错点 2：收集答案时没做拷贝，后续回溯污染结果。',
          '易错点 3：知道能剪枝，但不会推导循环上界。',
          '延伸方向：子集、组合总和、电话号码字母组合、分割型回溯题。',
        ],
        callout: '回溯题真正重要的不是背模板，而是你是否能把“状态空间”说清楚。',
      },
    ],
  },
  {
    id: 'subsets',
    label: '78. LeetCode 78. 子集',
    difficulty: '中等',
    description:
      '这题是回溯里最能训练“每个元素选或不选”思维的题。它看起来简单，但如果你真的理解透了，很多搜索题都会变得通顺。',
    outcome:
      '你能掌握子集问题的回溯建模方式，理解为什么每到一个节点都可以直接收集当前路径，并把这种“枚举所有状态”的思路迁移到更多幂集类问题。',
    sections: [
      {
        id: 'subset-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个不含重复元素的数组 `nums`，要求返回它的所有子集，也就是幂集。',
        bullets: [
          '每个元素可以选，也可以不选。',
          '包括空集和全集。',
          '顺序不同不算不同子集。',
          '目标是列出所有可能状态。',
        ],
      },
      {
        id: 'subset-why-collect-every-node',
        title: '为什么子集题不是只在叶子节点收集答案',
        summary:
          '组合题通常要求固定长度，所以只在满足条件时收集；而子集题对长度没有要求。回溯树上的每一个节点，都代表一种合法选择状态，因此每次进入递归时都可以直接收集当前路径。',
        bullets: [
          '路径本身就是一个合法子集。',
          '长度从 `0` 到 `nums.length` 都允许。',
          '所以每个递归节点都对应一个答案。',
          '这是子集题和组合题的核心差异。',
        ],
        callout:
          '一旦题目说“所有子集”，你要先想到：当前路径天然就是答案，不用等凑到某个固定长度。',
      },
      {
        id: 'subset-choice-order',
        title: '子集题依然要用起点索引控制顺序',
        summary:
          '虽然子集允许任意长度，但它依然不关心顺序，所以仍然需要一个 `start` 索引来保证下一层只从后面继续选。这样既不会重复，也能稳定覆盖所有可能状态。',
        bullets: [
          '起点索引保证同一组元素只出现一次。',
          '每次选择一个新元素加入路径。',
          '递归回去后再撤销选择。',
          '结构和组合题很像，只是收集答案时机不同。',
        ],
      },
      {
        id: 'subset-two-views',
        title: '这题既可以看成“向后选”，也可以看成“选或不选”',
        summary:
          '子集题有两种经典理解方式：一种是像组合题那样，从当前位置往后枚举；另一种是对每个元素做“选或不选”的二叉决策。两者本质相同，只是展开搜索树的方式不同。工程上更常用前一种，因为更统一。',
        bullets: [
          '“向后选”更接近组合题模板。',
          '“选或不选”更接近二叉决策树理解。',
          '两种方法结果等价。',
          '选自己更稳定的一种即可。',
        ],
      },
      {
        id: 'subset-optimal-solution',
        title: '标准解法：回溯 + 每层先收集答案',
        summary:
          '用 `path` 保存当前子集。递归开始时先把 `path` 拷贝进结果集，然后从 `start` 开始向后枚举每个元素：加入路径、递归、撤销选择。最终整棵搜索树的每个节点都会贡献一个结果。',
        bullets: [
          '时间复杂度是 `O(n * 2^n)`。',
          '结果总数本身就是 `2^n`。',
          '关键是理解“每个节点都是答案”。',
          '这是幂集类题目的标准模板。',
        ],
        code: `function subsets(nums: number[]): number[][] {
  const result: number[][] = []
  const path: number[] = []

  const dfs = (start: number) => {
    result.push([...path])

    for (let index = start; index < nums.length; index += 1) {
      path.push(nums[index])
      dfs(index + 1)
      path.pop()
    }
  }

  dfs(0)
  return result
}`,
      },
      {
        id: 'subset-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没搞清组合和子集的收集时机差异。真正掌握后，你会发现很多“枚举所有可能状态”的问题，本质都是子集搜索树的变形。',
        bullets: [
          '易错点 1：只在叶子节点收集答案，导致漏掉中间长度的子集。',
          '易错点 2：没有对路径做拷贝，结果被后续回溯污染。',
          '易错点 3：把子集题写成排列题，重复结果暴增。',
          '延伸方向：含重复元素的子集、分割问题、状态压缩搜索、枚举所有方案类题目。',
        ],
        callout:
          '子集题不难，但它能非常清楚地暴露你是否真的理解回溯树的节点含义。',
      },
    ],
  },
  {
    id: 'word-search',
    label: '79. LeetCode 79. 单词搜索',
    difficulty: '中等',
    description:
      '这题是二维 DFS 回溯题里的标准模板。真正考点不在于会不会写四个方向，而在于你能否正确处理“路径不能重复使用同一个格子”的限制。',
    outcome:
      '你能掌握网格搜索中的 DFS + 回溯写法，理解为什么访问标记必须和递归路径绑定，并把这种“走一步、试探、回退”的思路迁移到更多矩阵搜索题。',
    sections: [
      {
        id: 'ws-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个二维字符网格 `board` 和一个单词 `word`，判断是否存在一条路径，可以按上下左右相邻的方式依次拼出这个单词。每个格子在同一条路径中只能使用一次。',
        bullets: [
          '只能走上下左右四个方向。',
          '路径上的字符顺序必须和 `word` 一致。',
          '同一个格子不能重复使用。',
          '目标是判断是否存在，不需要返回具体路径。',
        ],
      },
      {
        id: 'ws-why-backtracking',
        title: '为什么这题天然是 DFS + 回溯',
        summary:
          '你要从某个起点出发，逐字符尝试往四周扩展，一旦当前字符不匹配或后续走不通，就必须退回上一步继续尝试别的方向。这种“试探一条路，不行就撤回”的结构，正是回溯搜索最典型的场景。',
        bullets: [
          '每个起点都可能成为答案起点。',
          '每一步都有最多四个方向可走。',
          '走错后需要恢复现场再试别的分支。',
          '这类题本质是路径搜索，不是普通遍历。',
        ],
        callout:
          '看到“路径不能重复走格子，而且每一步都要试方向”，基本就该立刻想到 DFS 回溯。',
      },
      {
        id: 'ws-visited-bound-to-path',
        title: '访问标记为什么必须和当前路径绑定',
        summary:
          '这题不是全局访问一次就结束的遍历，而是每次起点、每条路径都要重新尝试。所以访问标记不能永久写死，只能在当前递归路径内生效。进入格子时标记，递归返回时撤销，才能保证其它分支还能正常使用这个格子。',
        bullets: [
          '访问标记只对当前搜索路径有效。',
          '回溯返回时必须撤销标记。',
          '否则会错误阻断其它合法路径。',
          '这是矩阵回溯题的核心细节。',
        ],
      },
      {
        id: 'ws-base-cases',
        title: '递归终止条件要先想清楚',
        summary:
          '如果当前字符和 `word[index]` 不匹配，就立即失败；如果已经匹配到 `word` 的最后一个字符，就直接成功返回。把这两个基本判断放在最前面，递归主体就会非常干净。',
        bullets: [
          '越界和字符不匹配要第一时间剪掉。',
          '匹配到最后一个字符时直接成功。',
          '基本情况清楚，递归代码会更短。',
          '网格搜索题往往成败就在这些边界判断。',
        ],
      },
      {
        id: 'ws-optimal-solution',
        title: '标准解法：枚举起点 + DFS 回溯',
        summary:
          '先枚举网格中的每个格子作为起点。对每个起点做 DFS：判断当前字符是否匹配，若匹配则临时标记已访问，再向四个方向递归搜索下一个字符。若任一方向成功，整体成功；否则撤销标记并回溯。',
        bullets: [
          '时间复杂度和搜索树规模相关。',
          '空间复杂度主要来自递归栈。',
          '本质是带约束的路径搜索。',
          '二维 DFS 回溯的模板价值很高。',
        ],
        code: `function exist(board: string[][], word: string): boolean {
  const rows = board.length
  const cols = board[0].length

  const dfs = (row: number, col: number, index: number): boolean => {
    if (board[row][col] !== word[index]) {
      return false
    }

    if (index === word.length - 1) {
      return true
    }

    const current = board[row][col]
    board[row][col] = '#'

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]

    for (const [deltaRow, deltaCol] of directions) {
      const nextRow = row + deltaRow
      const nextCol = col + deltaCol

      if (
        nextRow >= 0 &&
        nextRow < rows &&
        nextCol >= 0 &&
        nextCol < cols &&
        board[nextRow][nextCol] !== '#' &&
        dfs(nextRow, nextCol, index + 1)
      ) {
        board[row][col] = current
        return true
      }
    }

    board[row][col] = current
    return false
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (dfs(row, col, 0)) {
        return true
      }
    }
  }

  return false
}`,
      },
      {
        id: 'ws-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是访问标记没有在回溯时恢复，或者起点枚举不完整。真正掌握后，你会对很多网格 DFS、岛屿搜索、路径回溯题建立统一模型。',
        bullets: [
          '易错点 1：访问标记写死，导致其它分支无法复用格子。',
          '易错点 2：匹配到最后一个字符时没有及时返回。',
          '易错点 3：忘记从每个格子都尝试起点。',
          '延伸方向：岛屿问题、迷宫路径、N 皇后、矩阵路径搜索题。',
        ],
        callout:
          '网格回溯题的核心不是方向数组，而是你是否真正理解“路径状态”和“全局状态”的区别。',
      },
    ],
  },
  {
    id: 'remove-duplicates-from-sorted-array-ii',
    label: '80. LeetCode 80. 删除有序数组中的重复项 II',
    difficulty: '中等',
    description:
      '这题不是单纯的数组删除题，而是在训练你对“原地保留前若干个合法元素”的双指针思维。关键不在删，而在于如何稳定地决定当前元素还能不能被写回结果区间。',
    outcome:
      '你能掌握“有序数组原地去重保留上限次数”的双指针写法，理解为什么写指针只需要和前两个保留元素比较，并把这种模式迁移到更多原地过滤题。',
    sections: [
      {
        id: 'rd2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个升序数组 `nums`，要求原地删除多余重复元素，使得每个元素最多只出现两次，并返回新数组长度。',
        bullets: [
          '数组已经有序，这是关键信息。',
          '每种数字最多保留两次。',
          '必须原地修改。',
          '只需要返回有效长度，不用管后面残留值。',
        ],
      },
      {
        id: 'rd2-why-sorted-matters',
        title: '为什么“有序”让这题一下子简单很多',
        summary:
          '因为数组有序，所以相同元素一定连续出现。这样你就不需要哈希表去统计频次，只要在遍历时看当前元素和结果区间末尾的关系，就能判断它还能不能继续保留。',
        bullets: [
          '相同元素天然聚在一起。',
          '频次控制可以靠邻近位置完成。',
          '有序数组题优先想双指针原地覆盖。',
          '这类题本质是“筛选合法前缀”。',
        ],
        callout:
          '很多有序数组题看起来不同，内核都是“读指针扫描，写指针维护合法区间”。',
      },
      {
        id: 'rd2-why-compare-two-back',
        title: '为什么只要和写指针前两个元素比较就够了',
        summary:
          '既然每个元素最多保留两次，那么当写指针已经至少写了两个数后，只要看当前读到的元素是否等于 `nums[write - 2]`。如果相等，说明前面已经至少保留了两个同值元素，当前这个就该跳过；否则就可以写入。',
        bullets: [
          '前两个位置恰好代表“是否已满两次”。',
          '不需要额外频次计数器。',
          '这是利用有序结构做的极简判断。',
          '双指针题往往胜在判断条件的精炼。',
        ],
      },
      {
        id: 'rd2-write-window',
        title: '写指针维护的其实是“合法结果前缀”',
        summary:
          '读指针不断扫描原数组，写指针只负责把合法元素写入数组前部。每次写入后，合法结果前缀就扩大一格。题目最后要的长度，其实就是这个合法前缀的长度。',
        bullets: [
          '读指针负责看原始数据。',
          '写指针负责构建答案区间。',
          '数组前半段始终保持合法状态。',
          '这类题重点是“覆盖”而不是“删除”。',
        ],
      },
      {
        id: 'rd2-optimal-solution',
        title: '标准解法：双指针原地覆盖',
        summary:
          '若数组长度不超过 `2`，直接返回。否则让写指针从 `2` 开始，读指针从 `2` 扫到末尾。若当前元素不等于 `nums[write - 2]`，就把它写到 `nums[write]` 并推进写指针；否则跳过。最终写指针位置就是答案长度。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '本质是原地过滤并保留合法前缀。',
          '这是保留上限次数类题目的标准模板。',
        ],
        code: `function removeDuplicates(nums: number[]): number {
  if (nums.length <= 2) {
    return nums.length
  }

  let write = 2

  for (let read = 2; read < nums.length; read += 1) {
    if (nums[read] !== nums[write - 2]) {
      nums[write] = nums[read]
      write += 1
    }
  }

  return write
}`,
      },
      {
        id: 'rd2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是不知道为什么要和 `write - 2` 比较，或者把“删除”理解成真要在数组中移除元素。真正掌握后，你会对很多原地过滤题形成统一视角。',
        bullets: [
          '易错点 1：写指针起点没从 `2` 开始，导致边界混乱。',
          '易错点 2：比较对象写错成 `write - 1`，语义不对。',
          '易错点 3：纠结数组尾部旧值，其实题目并不关心。',
          '延伸方向：删除有序数组重复项 I、移除元素、保留最多 k 次重复项、数组原地压缩题。',
        ],
        callout:
          '原地双指针题的真正能力，是你是否能把“保留规则”翻译成稳定的写入条件。',
      },
    ],
  },
  {
    id: 'search-in-rotated-sorted-array-ii',
    label: '81. LeetCode 81. 搜索旋转排序数组 II',
    difficulty: '中等',
    description:
      '这题是在旋转数组二分查找的基础上，再额外塞进了重复元素。真正难点不在会不会写二分，而在于你能否识别“哪一侧有序”这个判断何时会因为重复值失效。',
    outcome:
      '你能掌握带重复元素的旋转数组二分思路，理解为什么 `left`、`mid`、`right` 相等时必须先缩边界，并把这种“局部失去单调性时先排除噪音”的思维迁移到更多变体二分题。',
    sections: [
      {
        id: 'sr2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个可能经过旋转的非降序数组 `nums`，数组中允许重复元素。判断目标值 `target` 是否存在于数组中。',
        bullets: [
          '数组原本是有序的，但中间某个位置发生了旋转。',
          '数组允许重复元素，这会干扰二分判断。',
          '只需要返回是否存在。',
          '这是旋转数组二分的进阶版。',
        ],
      },
      {
        id: 'sr2-why-duplicates-break-order',
        title: '为什么重复元素会破坏“哪边有序”的判断',
        summary:
          '在不含重复元素时，只要比较 `nums[left]` 和 `nums[mid]`，通常就能判断左半段是否有序。但一旦出现大量重复，比如 `1, 1, 1, 3, 1`，你会发现 `left`、`mid` 的值一样，却无法据此断定旋转点在哪一侧。',
        bullets: [
          '重复值会让左右两段看起来都像有序。',
          '单靠一次比较无法确定答案区间。',
          '这是这题和 LeetCode 33 的核心差异。',
          '二分不是失效，而是要先清掉噪音。',
        ],
        callout: '很多二分题真正难的不是切半，而是判断条件什么时候不再可靠。',
      },
      {
        id: 'sr2-trim-noise',
        title: '遇到三端相等时，先缩边界而不是硬判有序区间',
        summary:
          '当 `nums[left] === nums[mid] && nums[mid] === nums[right]` 时，左右哪边有序都无法确定。这时最稳的做法是让 `left += 1`、`right -= 1`，先去掉两端重复噪音，再继续二分。',
        bullets: [
          '这一步不会漏解，因为两端值和中间完全相同。',
          '它的作用是恢复可判断的局部单调性。',
          '虽然最坏情况会退化，但整体思路仍然正确。',
          '这是这题的关键修补动作。',
        ],
      },
      {
        id: 'sr2-how-to-pick-side',
        title: '一旦能判断某边有序，就回到标准旋转数组二分',
        summary:
          '如果左半段有序，就判断 `target` 是否落在 `[nums[left], nums[mid])` 里；若是，则收缩右边，否则去右边找。右半段同理。核心还是靠“有序区间 + target 落点”来丢弃一半搜索空间。',
        bullets: [
          '左有序就判断 target 是否在左半段范围内。',
          '右有序就判断 target 是否在右半段范围内。',
          '每次都尽量丢掉确定不可能的一边。',
          '这是旋转数组二分模板的主干。',
        ],
      },
      {
        id: 'sr2-optimal-solution',
        title: '标准解法：二分 + 去重噪音',
        summary:
          '维护 `left` 和 `right`。每轮先取 `mid`，若命中直接返回 `true`；若三端值相等，则同时缩边界；否则判断哪一段有序，再根据 `target` 所在范围选择保留哪一半。最终若区间为空仍未命中，则返回 `false`。',
        bullets: [
          '平均情况下仍接近二分效率。',
          '最坏情况下可能退化到 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '关键不是模板本身，而是三端相等时的处理。',
        ],
        code: `function search(nums: number[], target: number): boolean {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid] === target) {
      return true
    }

    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left += 1
      right -= 1
      continue
    }

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else if (nums[mid] < target && target <= nums[right]) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return false
}`,
      },
      {
        id: 'sr2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把它当成不含重复元素的旋转数组题直接套模板，结果在重复值场景下判断错误。真正掌握后，你会更理解二分查找对“单调性前提”的依赖。',
        bullets: [
          '易错点 1：没有处理三端相等，导致死循环或错判。',
          '易错点 2：区间比较时边界开闭写混。',
          '易错点 3：误以为这题一定能稳定做到 `O(log n)`。',
          '延伸方向：寻找旋转点、查找最小值、带重复元素的边界二分题。',
        ],
        callout:
          '二分题能不能做，往往取决于你有没有先确认“单调性是否真的还在”。',
      },
    ],
  },
  {
    id: 'remove-duplicates-from-sorted-list-ii',
    label: '82. LeetCode 82. 删除排序链表中的重复元素 II',
    difficulty: '中等',
    description:
      '这题不是简单地去重，而是要求把所有出现重复的值整段删掉，一个都不保留。真正难点在于你是否能在链表里稳定地跳过整段重复节点，并把前后链重新接好。',
    outcome:
      '你能掌握带哑节点的链表删除套路，理解为什么遇到重复值时要先扫描完整重复段，再决定是否断开，并把这种思路迁移到更多链表批量删除题。',
    sections: [
      {
        id: 'rdsl2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个升序链表，删除所有含有重复数字的节点，只保留原链表中没有重复出现的数字。',
        bullets: [
          '链表已经有序，相同值一定连续出现。',
          '不是“保留一个”，而是“重复值全部删掉”。',
          '要返回处理后的新链表头结点。',
          '这题很适合训练链表指针稳定性。',
        ],
      },
      {
        id: 'rdsl2-why-dummy-node',
        title: '为什么这题强烈建议先加哑节点',
        summary:
          '如果头结点本身就属于重复段，比如 `1 -> 1 -> 2`，真正的新头结点会发生变化。加一个 `dummy` 指向 `head` 后，无论删除的是头部、中间还是尾部，你都能统一地用前驱节点去接回链表。',
        bullets: [
          '哑节点能统一处理头结点被删除的情况。',
          '前驱指针写法会更稳定。',
          '链表删除题里这是非常高频的工程手法。',
          '它能显著减少边界分支。',
        ],
        callout: '只要链表题可能删头节点，先想 `dummy`，通常不会错。',
      },
      {
        id: 'rdsl2-how-to-skip-block',
        title: '真正关键不是“删一个”，而是“跳过整段重复块”',
        summary:
          '当你发现 `current.val === current.next.val` 时，不应该只删当前一个节点，而应该记下这个重复值，然后一路往后跳，直到这一整段重复值全部越过，再让前驱节点直接连到第一个不同值节点。',
        bullets: [
          '有序性保证了重复值一定连在一起。',
          '删除动作应该按整段处理，而不是逐个试错。',
          '这是这题区别于普通去重题的核心。',
          '前驱节点始终负责接回剩余链表。',
        ],
      },
      {
        id: 'rdsl2-two-pointer-roles',
        title: '前驱指针和扫描指针职责要分开',
        summary:
          '一个指针 `prev` 代表当前结果链表的最后一个稳定节点，另一个指针 `current` 负责向前扫描原链表。只有当 `current` 所在值确认不重复时，`prev` 才前进；否则 `prev.next` 直接跳过整个重复段。',
        bullets: [
          '`prev` 负责维护答案链表。',
          '`current` 负责识别重复块。',
          '两者职责清晰后，代码会很稳。',
          '链表题最怕一个指针承担过多语义。',
        ],
      },
      {
        id: 'rdsl2-optimal-solution',
        title: '标准解法：哑节点 + 前驱指针 + 整段跳过',
        summary:
          '创建 `dummy` 指向头结点。用 `prev` 指向 `dummy`，`current` 指向 `head`。若当前值出现重复，就持续向后跳过同值节点，并让 `prev.next` 指向重复段后的第一个节点；否则同时推进 `prev` 和 `current`。最终返回 `dummy.next`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '关键在于重复段只扫描一次。',
          '这是链表批量删除的标准模板。',
        ],
        code: `function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head)
  let prev: ListNode = dummy
  let current = head

  while (current) {
    if (current.next && current.val === current.next.val) {
      const duplicateValue = current.val

      while (current && current.val === duplicateValue) {
        current = current.next
      }

      prev.next = current
    } else {
      prev = current
      current = current.next
    }
  }

  return dummy.next
}`,
      },
      {
        id: 'rdsl2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是误把它写成“保留一个重复值”的版本。真正掌握后，你会对链表中的前驱节点、批量跳过和哑节点设计更有感觉。',
        bullets: [
          '易错点 1：看到重复时只删除一个节点，没有整段跳过。',
          '易错点 2：头部重复段删除后没有正确返回新头结点。',
          '易错点 3：`prev` 在删除分支里错误前进，导致链断裂。',
          '延伸方向：链表分组操作、删除指定值、链表分区、区间翻转。',
        ],
        callout:
          '链表题写稳的关键，从来不是背操作，而是先把每个指针的职责讲清楚。',
      },
    ],
  },
  {
    id: 'remove-duplicates-from-sorted-list',
    label: '83. LeetCode 83. 删除排序链表中的重复元素',
    difficulty: '简单',
    description:
      '这题和上一题很像，但目标完全不同。这里不是删掉所有重复值，而是每种值保留一个。真正训练的是你能否利用链表有序性，在原地稳定地压缩重复节点。',
    outcome:
      '你能掌握有序链表原地去重的基本写法，理解为什么当前节点只需要和下一个节点比较，并把这种“局部重连”的思路迁移到更多基础链表题。',
    sections: [
      {
        id: 'rdsl1-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个升序链表，删除所有重复元素，使得每个元素只出现一次，并返回处理后的链表。',
        bullets: [
          '链表已经有序。',
          '重复值只需要保留一个。',
          '要求原地修改链表链接关系。',
          '这是链表入门去重题。',
        ],
      },
      {
        id: 'rdsl1-why-local-compare',
        title: '为什么只比较当前节点和下一个节点就够了',
        summary:
          '因为链表有序，所以相同值必然挨在一起。对于当前节点，只要看 `current.next` 是否和自己值相同，就能决定要不要跳过下一个节点，不需要回头，也不需要哈希表。',
        bullets: [
          '有序性让重复检测变成局部判断。',
          '每次只用看相邻两个节点。',
          '不需要额外存储结构。',
          '这是有序链表题的典型红利。',
        ],
      },
      {
        id: 'rdsl1-remove-logic',
        title: '删除动作本质上是让当前节点跳过重复后继',
        summary:
          '若 `current.val === current.next.val`，说明后一个节点是多余的，直接让 `current.next = current.next.next` 即可。因为当前值还可能继续重复，所以当前节点此时不要前进，继续检查新的 `current.next`。',
        bullets: [
          '删除后当前节点先别动。',
          '因为后面可能还有同值节点。',
          '只有不重复时才推进当前节点。',
          '这是写出正确 while 循环的关键细节。',
        ],
      },
      {
        id: 'rdsl1-one-pass',
        title: '整题只需要一趟扫描',
        summary:
          '从头结点开始一路向后扫。当前节点和下一节点相同时就删除下一节点，不同时就把当前节点往后挪一格。由于每个节点最多被访问和重连有限次，所以整体只需要线性时间。',
        bullets: [
          '扫描过程天然是单向的。',
          '不会出现回退。',
          '每个多余节点只会被跳过一次。',
          '这就是链表原地修改的典型节奏。',
        ],
      },
      {
        id: 'rdsl1-optimal-solution',
        title: '标准解法：单指针原地去重',
        summary:
          '用一个指针 `current` 从头开始遍历。若 `current.next` 存在且值相同，就让 `current.next` 跳过重复节点；否则让 `current` 前进。最终返回原头结点即可。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '实现短，但很考验循环推进时机。',
          '这是理解链表重连最基础的一题。',
        ],
        code: `function deleteDuplicates(head: ListNode | null): ListNode | null {
  let current = head

  while (current && current.next) {
    if (current.val === current.next.val) {
      current.next = current.next.next
    } else {
      current = current.next
    }
  }

  return head
}`,
      },
      {
        id: 'rdsl1-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是删除一个重复节点后马上把指针后移，结果漏删连续重复值。真正掌握后，你会更自然地理解“删除后是否前进”这种链表细节。',
        bullets: [
          '易错点 1：删除后立即前进，导致漏掉连续重复。',
          '易错点 2：把它和上一题的“整段删除”逻辑混淆。',
          '易错点 3：忘记判空 `current.next`。',
          '延伸方向：删除排序链表中的重复元素 II、链表去重变体、双指针链表题。',
        ],
        callout:
          '基础链表题看着短，但能非常直接地暴露你对指针推进节奏是否真的清楚。',
      },
    ],
  },
  {
    id: 'largest-rectangle-in-histogram',
    label: '84. LeetCode 84. 柱状图中最大的矩形',
    difficulty: '困难',
    description:
      '这题是单调栈的里程碑题目。真正难点不是记住“栈里放下标”，而是理解每根柱子什么时候能确定自己作为最矮柱子的最大扩展宽度。',
    outcome:
      '你能掌握单调递增栈在区间边界问题中的用法，理解为什么出栈时才能确定面积，并把这种“找左边界和右边界”的思路迁移到更多单调栈题。',
    sections: [
      {
        id: 'lrh-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个柱状图，每根柱子的宽度都为 `1`，求其中能够勾勒出的最大矩形面积。',
        bullets: [
          '矩形必须由连续柱子组成。',
          '矩形高度由所覆盖柱子中的最小高度决定。',
          '目标是求最大面积。',
          '这是单调栈经典母题。',
        ],
      },
      {
        id: 'lrh-why-enumerate-height',
        title: '为什么更自然的视角是“枚举谁当最矮柱子”',
        summary:
          '如果直接枚举左右边界，会有大量重复计算。更高效的思路是：假设某根柱子是矩形里最矮的那根，那么它能往左和往右扩展到哪里？一旦找到左右第一个比它矮的位置，就能确定这根柱子能主导的最大面积。',
        bullets: [
          '矩形面积 = 高度 × 宽度。',
          '高度固定后，关键就是找最大可扩展宽度。',
          '左右边界本质是“第一个更矮元素”。',
          '这正是单调栈擅长解决的问题。',
        ],
        callout:
          '很多单调栈题，本质都是在问“某个元素什么时候能确认自己的影响范围”。',
      },
      {
        id: 'lrh-why-pop-means-answer',
        title: '为什么一定要在出栈时计算面积',
        summary:
          '栈里保持高度递增，意味着栈中柱子右边还没遇到比自己更矮的柱子，所以它们的右边界还不确定。只有当新柱子高度更小，导致某根柱子出栈时，这根柱子的右边界才首次被确定，面积也才真正可以结算。',
        bullets: [
          '入栈时右边界未知。',
          '出栈时说明第一次遇到更矮柱子。',
          '此时左右边界都齐了。',
          '所以面积计算放在出栈逻辑里最自然。',
        ],
      },
      {
        id: 'lrh-sentinel',
        title: '头尾补哨兵，能把边界写法变得更干净',
        summary:
          '在高度数组前后补 `0`，能保证所有柱子最终都会被弹出结算，也能统一处理“左边没有更矮元素”或“右边没有更矮元素”的场景。工程上这能大幅减少特判。',
        bullets: [
          '头部哨兵统一左边界。',
          '尾部哨兵强制清空栈。',
          '边界不用再单独分支讨论。',
          '这是单调栈题很常见的小技巧。',
        ],
      },
      {
        id: 'lrh-optimal-solution',
        title: '标准解法：单调递增栈 + 出栈结算面积',
        summary:
          '先构造前后带 `0` 的新数组，用栈保存下标，并保证栈中对应高度递增。遍历数组时，若当前高度小于栈顶高度，就不断弹栈：被弹出的柱子高度就是矩形高度，当前下标和新的栈顶共同决定它的左右边界。持续更新最大面积即可。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '每个下标最多进栈出栈一次。',
          '这是单调栈能力的典型代表题。',
        ],
        code: `function largestRectangleArea(heights: number[]): number {
  const extended = [0, ...heights, 0]
  const stack: number[] = []
  let best = 0

  for (let index = 0; index < extended.length; index += 1) {
    while (
      stack.length > 0 &&
      extended[index] < extended[stack[stack.length - 1]]
    ) {
      const height = extended[stack.pop() as number]
      const left = stack[stack.length - 1]
      const width = index - left - 1
      best = Math.max(best, height * width)
    }

    stack.push(index)
  }

  return best
}`,
      },
      {
        id: 'lrh-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是不知道为什么宽度要减 `1`，或者在出栈时把左右边界含义写混。真正掌握后，你会对单调栈处理区间边界的方式建立很强的直觉。',
        bullets: [
          '易错点 1：出栈后新的栈顶才是左边第一个更矮元素。',
          '易错点 2：宽度写错成 `index - left`。',
          '易错点 3：没有补尾部哨兵，导致栈中剩余柱子没被结算。',
          '延伸方向：最大矩形、接雨水、每日温度、下一个更大元素。',
        ],
        callout: '单调栈题别死背模板，先想清楚栈里元素“还在等什么边界出现”。',
      },
    ],
  },
  {
    id: 'maximal-rectangle',
    label: '85. LeetCode 85. 最大矩形',
    difficulty: '困难',
    description:
      '这题看起来是二维矩阵题，但真正的突破口是把每一行都转成一幅“柱状图”。核心不是暴力枚举子矩阵，而是你能否把二维问题降维到上一题的单调栈模型。',
    outcome:
      '你能掌握矩阵问题的降维思路，理解为什么逐行累计高度后可以复用柱状图最大矩形解法，并把这种“二维转一维”的套路迁移到更多矩阵动态题。',
    sections: [
      {
        id: 'mr-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含 `0` 和 `1` 的二维矩阵，找出只包含 `1` 的最大矩形，并返回其面积。',
        bullets: [
          '矩形必须由连续的 `1` 组成。',
          '矩形可以跨越多行多列。',
          '目标是求最大面积。',
          '这题常被看成二维版柱状图问题。',
        ],
      },
      {
        id: 'mr-why-reduce-to-histogram',
        title: '为什么逐行累计高度后，问题就变成柱状图',
        summary:
          '如果把某一行当作矩形底边，并记录每一列向上连续出现了多少个 `1`，你就得到了一组高度数组。此时，以当前行为底的最大全 `1` 矩形，恰好就是这组高度对应的“柱状图最大矩形”。',
        bullets: [
          '每一行都能生成一幅新的柱状图。',
          '列高表示向上连续 `1` 的数量。',
          '当前行负责充当所有候选矩形的底边。',
          '这样二维问题被拆成多次一维求解。',
        ],
        callout:
          '很多看起来很难的二维题，一旦找到稳定的降维方式，难度会立刻下降一档。',
      },
      {
        id: 'mr-height-update',
        title: '高度数组怎么维护，决定你是否真的做对了降维',
        summary:
          '从第一行开始往下扫。若当前格子是 `1`，就让该列高度加 `1`；若当前格子是 `0`，说明连续性被打断，该列高度要重置为 `0`。每处理完一行，就用当前高度数组计算一次柱状图最大矩形。',
        bullets: [
          '遇到 `1` 继续累高。',
          '遇到 `0` 立即清零。',
          '每一行都会产出一个新的候选答案。',
          '状态维护本身就是这题的关键之一。',
        ],
      },
      {
        id: 'mr-reuse-template',
        title: '真正高效的写法，是直接复用上一题的单调栈模板',
        summary:
          '一旦你已经会做柱状图最大矩形，这题就不该重新想一套新算法。把每一行更新后的高度数组丢进 `largestRectangleArea`，持续刷新最大值即可。真正强的能力，是发现题目之间的共用骨架。',
        bullets: [
          '不要在二维空间里重新暴力枚举。',
          '模板复用能显著降低复杂度和心智负担。',
          '这是刷题里非常重要的“题型迁移能力”。',
          '上一题就是这题的直接前置知识。',
        ],
      },
      {
        id: 'mr-optimal-solution',
        title: '标准解法：逐行累高 + 柱状图最大矩形',
        summary:
          '维护一个与列数相同的高度数组 `heights`。逐行遍历矩阵时更新每一列高度，然后把当前 `heights` 当作一幅柱状图，调用单调栈函数求最大矩形面积。遍历完所有行后返回全局最大值。',
        bullets: [
          '时间复杂度是 `O(rows * cols)`。',
          '空间复杂度取决于高度数组和单调栈。',
          '难点在于降维思路，而不是实现量。',
          '这是经典的矩阵转柱状图模型。',
        ],
        code: `function maximalRectangle(matrix: string[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return 0
  }

  const cols = matrix[0].length
  const heights = new Array<number>(cols).fill(0)
  let best = 0

  for (const row of matrix) {
    for (let col = 0; col < cols; col += 1) {
      heights[col] = row[col] === '1' ? heights[col] + 1 : 0
    }

    best = Math.max(best, largestRectangleArea(heights))
  }

  return best
}`,
      },
      {
        id: 'mr-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是知道要维护高度数组，却没有真正复用柱状图模板，最后又写回了高复杂度暴力。真正掌握后，你会更擅长把复杂题拆回熟悉模型。',
        bullets: [
          '易错点 1：遇到 `0` 时忘记把列高重置。',
          '易错点 2：每行更新完高度后没有及时结算矩形。',
          '易错点 3：二维题里重新枚举上下左右边界，复杂度失控。',
          '延伸方向：最大正方形、子矩阵统计、矩阵 DP、二维前缀和题。',
        ],
        callout:
          '刷题真正重要的进步，不是多背一题，而是越来越会把新题打回旧题模型。',
      },
    ],
  },
  {
    id: 'partition-list',
    label: '86. LeetCode 86. 分隔链表',
    difficulty: '中等',
    description:
      '这题看起来只是重排链表，但真正考的是稳定分组。你不仅要把小于 `x` 的节点放前面，还要保证每个分区内部的相对顺序不变，这就决定了它不是简单交换，而是链表版的稳定分桶。',
    outcome:
      '你能掌握双链表收集再拼接的稳定分区写法，理解为什么分别维护“小链表”和“大链表”比原地硬调指针更稳，并把这种思路迁移到更多链表重组题。',
    sections: [
      {
        id: 'pl-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个链表和一个值 `x`，要求把所有小于 `x` 的节点放到大于等于 `x` 的节点之前，同时保持两个分区内部原有的相对顺序。',
        bullets: [
          '不是排序，只是按阈值分区。',
          '分区后仍要保持稳定性。',
          '要返回新的链表头结点。',
          '这题非常适合练链表重组能力。',
        ],
      },
      {
        id: 'pl-why-two-lists',
        title: '为什么最稳的思路是拆成两条链表再拼回去',
        summary:
          '如果你尝试在原链表里直接挪节点，很容易把相对顺序和链接关系弄乱。更稳的做法是分别维护“小于 `x`”和“大于等于 `x`”两条结果链，按原顺序把节点依次挂进去，最后再把两条链表首尾拼接。',
        bullets: [
          '分而治之能显著降低指针复杂度。',
          '天然保留了原有顺序。',
          '最后只需要一次拼接。',
          '这是链表稳定分组的标准套路。',
        ],
        callout: '链表题一旦要求“保持相对顺序”，就要优先警惕原地交换式写法。',
      },
      {
        id: 'pl-tail-management',
        title: '每条分区链都要维护自己的尾指针',
        summary:
          '准备两个哑节点 `smallDummy` 和 `largeDummy`，再分别维护 `smallTail`、`largeTail`。遍历原链表时，根据当前节点值把它接到对应尾部，并让尾指针前进。这样整个收集过程始终是线性的。',
        bullets: [
          '哑节点统一处理空链和首节点问题。',
          '尾指针保证追加操作是 `O(1)`。',
          '每个节点只会被接入一次。',
          '这也是稳定收集最常见的链表写法。',
        ],
      },
      {
        id: 'pl-cut-old-links',
        title: '别忘了切断旧链接，否则很容易把原链带回去',
        summary:
          '遍历时最好先保存 `next`，再把当前节点接入小链或大链。有些实现即使不立即断链也能工作，但最后一定要把 `largeTail.next = null`，否则原链表尾部旧关系可能导致环或脏链接。',
        bullets: [
          '原链节点复用时要警惕旧指针残留。',
          '最终大链尾部必须显式置空。',
          '链表重组题经常出这种隐藏 bug。',
          '这是细节稳定性的体现。',
        ],
      },
      {
        id: 'pl-optimal-solution',
        title: '标准解法：双哑节点分区收集后拼接',
        summary:
          '创建两条链表：一条存放小于 `x` 的节点，一条存放大于等于 `x` 的节点。遍历原链表，把每个节点按值挂到对应尾部；遍历结束后，让小链尾部连到大链头部，并把大链尾部置空。返回小链头即可。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '实现稳定，边界清晰。',
          '这是链表稳定分区题的标准答案。',
        ],
        code: `function partition(head: ListNode | null, x: number): ListNode | null {
  const smallDummy = new ListNode(0)
  const largeDummy = new ListNode(0)
  let smallTail = smallDummy
  let largeTail = largeDummy
  let current = head

  while (current) {
    const next = current.next

    if (current.val < x) {
      smallTail.next = current
      smallTail = smallTail.next
    } else {
      largeTail.next = current
      largeTail = largeTail.next
    }

    current = next
  }

  largeTail.next = null
  smallTail.next = largeDummy.next

  return smallDummy.next
}`,
      },
      {
        id: 'pl-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有保持稳定顺序，或者最后忘记断开大链尾部。真正掌握后，你会更熟悉链表“分组收集再拼接”的稳定套路。',
        bullets: [
          '易错点 1：原地交换节点，结果破坏相对顺序。',
          '易错点 2：忘记把大链尾部置空，导致脏链接。',
          '易错点 3：没有使用哑节点，头部边界处理混乱。',
          '延伸方向：奇偶链表、重排链表、按条件拆分链表、链表归并。',
        ],
        callout:
          '链表重排题最稳的工程思路，通常不是原地炫技巧，而是先拆分职责，再做最后拼接。',
      },
    ],
  },
  {
    id: 'scramble-string',
    label: '87. LeetCode 87. 扰乱字符串',
    difficulty: '困难',
    description:
      '这题表面看像字符串题，实际是典型的递归分治加记忆化搜索。难点不在“能不能拆”，而在于你能不能证明两个字符串是否可以通过不断二分、交换子串得到同构关系。',
    outcome:
      '你能掌握字符串分治搜索的建模方式，理解为什么每次切分都要同时考虑“不交换”和“交换”两种情况，并把记忆化用于剪掉重复子问题。',
    sections: [
      {
        id: 'ss-problem-summary',
        title: '题目在问什么',
        summary:
          '给定两个等长字符串 `s1` 和 `s2`，判断 `s2` 是否可以通过对 `s1` 不断做“切分并交换左右子串”得到。',
        bullets: [
          '每次都可以把字符串切成两段。',
          '切完后可以选择交换，也可以不交换。',
          '要求判断是否存在一种变换方案。',
          '这是一道典型分治搜索题。',
        ],
      },
      {
        id: 'ss-why-divide',
        title: '为什么这题天然适合递归分治',
        summary:
          '题目规则本身就是“把字符串拆成两部分，再对子部分继续做同样操作”。这意味着子问题和原问题结构完全一致，递归是最自然的表达方式。',
        bullets: [
          '问题可以不断向子串缩小。',
          '每一层都只关心当前切分是否成立。',
          '子问题形式和原问题一致。',
          '这是典型的递归定义题。',
        ],
        callout:
          '一旦题目在描述“切一刀后继续判断”，基本就该先想递归，而不是贪心。',
      },
      {
        id: 'ss-two-branches',
        title: '每次切分都必须同时试“交换”和“不交换”',
        summary:
          '如果只看一种切法，很容易漏解。正确做法是对每个切点同时验证两种可能：左对左、右对右是不交换；左对右、右对左是交换。只要其中一种递归都成立，就能判定整体成立。',
        bullets: [
          '不交换是第一种自然匹配。',
          '交换是另一种等价结构。',
          '不能凭直觉只走一边。',
          '两种分支都要在递归中验证。',
        ],
      },
      {
        id: 'ss-pruning',
        title: '字符计数剪枝是这题最值得写的优化',
        summary:
          '如果两个子串的字符频次根本不同，那它们不可能互为扰乱字符串。先做频次比较，可以直接砍掉大量无意义递归，尤其在长字符串时非常关键。',
        bullets: [
          '先比字符频次，快速排除不可能情况。',
          '频次一致才有必要进入深层递归。',
          '这是记忆化之前最有效的剪枝。',
          '能明显降低搜索树规模。',
        ],
      },
      {
        id: 'ss-optimal-solution',
        title: '标准解法：递归分治 + 记忆化 + 频次剪枝',
        summary:
          '定义函数判断两个等长子串是否扰乱。若长度为 `1`，直接比较字符；否则先做频次剪枝，再遍历切点。对每个切点同时尝试“不交换”和“交换”两种递归组合。用记忆化缓存子问题结果，避免重复计算。',
        bullets: [
          '时间复杂度由搜索树和剪枝共同决定。',
          '空间复杂度主要来自递归栈和缓存。',
          '频次剪枝是实战里最重要的减枝点。',
          '记忆化能把重复子问题压下去。',
        ],
        code: `function isScramble(s1: string, s2: string): boolean {
  const memo = new Map<string, boolean>()

  const helper = (a: string, b: string): boolean => {
    const key = \`\${a}|\${b}\`
    if (memo.has(key)) {
      return memo.get(key) as boolean
    }

    if (a === b) {
      memo.set(key, true)
      return true
    }

    if (a.length !== b.length) {
      memo.set(key, false)
      return false
    }

    const count = new Array<number>(26).fill(0)

    for (let index = 0; index < a.length; index += 1) {
      count[a.charCodeAt(index) - 97] += 1
      count[b.charCodeAt(index) - 97] -= 1
    }

    if (count.some((value) => value !== 0)) {
      memo.set(key, false)
      return false
    }

    for (let split = 1; split < a.length; split += 1) {
      if (
        (helper(a.slice(0, split), b.slice(0, split)) &&
          helper(a.slice(split), b.slice(split))) ||
        (helper(a.slice(0, split), b.slice(-split)) &&
          helper(a.slice(split), b.slice(0, b.length - split)))
      ) {
        memo.set(key, true)
        return true
      }
    }

    memo.set(key, false)
    return false
  }

  return helper(s1, s2)
}`,
      },
      {
        id: 'ss-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只试一种切分方式，或者忘记做频次剪枝导致递归爆炸。真正掌握后，你会对分治搜索、子问题缓存和剪枝组合有更强的意识。',
        bullets: [
          '易错点 1：没有同时尝试交换与不交换。',
          '易错点 2：忽略频次剪枝，导致重复搜索过多。',
          '易错点 3：子问题结果不缓存，时间开销失控。',
          '延伸方向：字符串分割、区间 DP、记忆化搜索、树形递归题。',
        ],
        callout: '这类题真正考的是你能不能把“递归结构”和“剪枝条件”同时设计好。',
      },
    ],
  },
  {
    id: 'merge-sorted-array',
    label: '88. LeetCode 88. 合并两个有序数组',
    difficulty: '简单',
    description:
      '这题是双指针里最基础但最实用的题之一。真正的重点不是合并，而是你是否能利用 `nums1` 末尾空位，从后往前安全覆盖，避免把还没比较的元素冲掉。',
    outcome:
      '你能掌握逆向双指针覆盖写法，理解为什么从后往前填最安全，并把这种“先保留未处理数据，再写结果”的思路迁移到更多原地合并题。',
    sections: [
      {
        id: 'mas-problem-summary',
        title: '题目在问什么',
        summary:
          '给定两个非降序数组 `nums1` 和 `nums2`，其中 `nums1` 有足够空间容纳 `nums2`，要求把它们合并成一个非降序数组。',
        bullets: [
          '`nums1` 尾部有预留空间。',
          '两个数组本身都是有序的。',
          '要求原地修改 `nums1`。',
          '这是一道非常经典的双指针题。',
        ],
      },
      {
        id: 'mas-why-backward',
        title: '为什么必须从后往前写',
        summary:
          '如果从前往后写，`nums1` 中尚未比较的元素可能会被覆盖掉。相反，从后往前写时，尾部空位刚好可以安全承接更大的元素，完全不会破坏前面待比较的数据。',
        bullets: [
          '后向写入不会覆盖未比较区间。',
          '最大的元素一定应该放在最后。',
          '末尾空位天然适配逆向填充。',
          '这是这题最核心的观察。',
        ],
        callout: '原地合并题最怕覆盖未读数据，逆向写入就是专门解决这个问题的。',
      },
      {
        id: 'mas-three-pointers',
        title: '三个指针分别负责什么',
        summary:
          '通常用 `i` 指向 `nums1` 有效区末尾，用 `j` 指向 `nums2` 尾部，用 `k` 指向 `nums1` 末尾写入位置。每次比较 `nums1[i]` 和 `nums2[j]`，把较大的那个写到 `nums1[k]`，对应指针同时后退。',
        bullets: [
          '`i` 管理 `nums1` 的有效数据。',
          '`j` 管理 `nums2` 待合并数据。',
          '`k` 管理结果写入位置。',
          '职责清晰后代码会非常稳。',
        ],
      },
      {
        id: 'mas-one-array-leftovers',
        title: '为什么只要补完 `nums2` 就可以结束',
        summary:
          '因为 `nums1` 的剩余前缀本来就已经在正确位置上，不需要再移动。如果 `nums2` 还有没放完的元素，只需要继续往前写；一旦 `nums2` 结束，`nums1` 剩下的前缀可以直接保留。',
        bullets: [
          '`nums1` 前缀本来就有序。',
          '只要 `nums2` 还有剩余，就继续写。',
          '`nums1` 剩余部分不需要动。',
          '这能进一步简化循环逻辑。',
        ],
      },
      {
        id: 'mas-optimal-solution',
        title: '标准解法：逆向双指针原地合并',
        summary:
          '从 `nums1` 有效末尾和 `nums2` 末尾同时向前扫描，把较大的元素写进 `nums1` 的最后空位。若 `nums2` 还有剩余，继续补写；若 `nums2` 用完，则结束。整个过程只扫描一遍。',
        bullets: [
          '时间复杂度是 `O(m + n)`。',
          '空间复杂度是 `O(1)`。',
          '逆向写入避免覆盖问题。',
          '这是原地合并题的标准模板。',
        ],
        code: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1
  let j = n - 1
  let k = m + n - 1

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k] = nums1[i]
      i -= 1
    } else {
      nums1[k] = nums2[j]
      j -= 1
    }

    k -= 1
  }
}`,
      },
      {
        id: 'mas-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是从前往后合并导致覆盖，或者没有意识到只要补完 `nums2` 就可以结束。真正掌握后，你会更熟悉原地覆盖和逆向填充的思维。',
        bullets: [
          '易错点 1：从前往后写，覆盖掉未比较元素。',
          '易错点 2：忘记 `nums2` 可能还有剩余。',
          '易错点 3：指针边界没处理好，导致越界。',
          '延伸方向：链表归并、区间合并、归并排序、原地数组重排。',
        ],
        callout:
          '很多原地数组题，其实都在考你能不能先想清楚“写入顺序会不会破坏待处理数据”。',
      },
    ],
  },
  {
    id: 'gray-code',
    label: '89. LeetCode 89. 格雷编码',
    difficulty: '中等',
    description:
      '这题的核心不是把数字列出来，而是构造一种相邻项只差一位二进制位的序列。它非常适合训练你从“递推构造”角度理解组合序列，而不是暴力枚举。',
    outcome:
      '你能掌握格雷码的镜像递推法，理解为什么新一轮序列要在旧序列前面补 0、在镜像序列前面补 1，并把这种构造思路迁移到更多位运算序列题。',
    sections: [
      {
        id: 'gc-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数 `n`，要求返回一个长度为 `2^n` 的格雷码序列，使得相邻两个数的二进制表示只相差一位。',
        bullets: [
          '第一个数通常是 `0`。',
          '相邻数之间只有一位不同。',
          '所有数都在 `0` 到 `2^n - 1` 之间。',
          '这是一个经典构造题。',
        ],
      },
      {
        id: 'gc-why-reflection',
        title: '为什么“镜像 + 补位”能保证只差一位',
        summary:
          '如果上一轮已经有一组满足条件的序列，那么下一轮可以把它镜像倒过来，并在前半部分统一补 `0`，后半部分统一补 `1`。这样前半部分内部保持原有性质，前后连接处只多出最高位那一位差异，整个序列就仍然合法。',
        bullets: [
          '镜像保证后半段和前半段相互对应。',
          '补位保证最高位只发生一次变化。',
          '相邻差一位的性质得以保留。',
          '这是格雷码最经典的递推构造。',
        ],
      },
      {
        id: 'gc-iterative-build',
        title: '每一轮都在已有序列基础上翻倍生成',
        summary:
          '从 `0` 开始，假设当前已有 `k` 位格雷码序列。新一轮先保留原序列，再将原序列反向遍历并在每个数前加上当前最高位的 `1`。这样长度翻倍，性质也被保留。',
        bullets: [
          '每一轮都建立在上一轮结果上。',
          '长度按 `2^n` 递增。',
          '构造过程非常适合迭代实现。',
          '这是从小规模到大规模的典型递推。',
        ],
      },
      {
        id: 'gc-binary-view',
        title: '从二进制角度看，镜像其实是在“翻转最高位”',
        summary:
          '当你把上一轮序列镜像后再加上当前最高位，其实等价于让后半段和前半段在最高位上形成互补。这样相邻元素跨越中点时，只会有那一位发生变化，确保序列仍然满足格雷码定义。',
        bullets: [
          '最高位互补是连接前后半段的关键。',
          '镜像顺序确保相邻变化可控。',
          '这是位运算和构造结合的典型题。',
          '比暴力找汉明距离更高效。',
        ],
      },
      {
        id: 'gc-optimal-solution',
        title: '标准解法：镜像递推构造',
        summary:
          '从 `[0]` 开始，每轮把当前序列反向遍历，给反向数加上当前最高位掩码，再拼接到末尾。重复 `n` 轮后得到完整格雷码序列。该方法自然满足相邻只差一位。',
        bullets: [
          '时间复杂度是 `O(2^n)`。',
          '空间复杂度也是 `O(2^n)`。',
          '构造过程比验证序列更优雅。',
          '这是格雷码的标准做法。',
        ],
        code: `function grayCode(n: number): number[] {
  const result = [0]

  for (let bit = 0; bit < n; bit += 1) {
    const mask = 1 << bit

    for (let index = result.length - 1; index >= 0; index -= 1) {
      result.push(result[index] | mask)
    }
  }

  return result
}`,
      },
      {
        id: 'gc-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忘记“反向遍历”，导致相邻差一位的性质被破坏。真正掌握后，你会对镜像构造、位掩码和序列递推更有感觉。',
        bullets: [
          '易错点 1：直接正向追加，破坏相邻关系。',
          '易错点 2：没控制当前轮的最高位掩码。',
          '易错点 3：把构造题写成验证题，复杂度偏高。',
          '延伸方向：二进制序列构造、汉明距离序列、位运算生成题。',
        ],
        callout: '构造题的关键通常不是“算得对”，而是“造得稳且可递推”。',
      },
    ],
  },
  {
    id: 'subsets-ii',
    label: '90. LeetCode 90. 子集 II',
    difficulty: '中等',
    description:
      '这题和子集很像，但加入了重复元素后，去重就成了核心。真正要掌握的是如何在回溯树的同层上跳过重复值，从而避免生成重复子集。',
    outcome:
      '你能掌握排序后回溯去重的标准套路，理解为什么同层重复要跳过、不同层重复可以保留，并把这种去重策略迁移到更多组合枚举题。',
    sections: [
      {
        id: 'subset2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个可能包含重复元素的数组 `nums`，返回它所有不重复的子集。',
        bullets: [
          '元素可能重复。',
          '仍然要返回所有子集。',
          '结果中不能有重复集合。',
          '这是子集题的去重版。',
        ],
      },
      {
        id: 'subset2-why-sort',
        title: '为什么先排序几乎是这题的前置条件',
        summary:
          '只有排序后，相同元素才会连续聚在一起。这样在回溯时，你才能在同一层里轻松识别“前一个选过，后一个相同值就别再选”的情况，从源头避免重复结果。',
        bullets: [
          '排序让重复值相邻。',
          '相邻重复更容易剪枝。',
          '这是回溯去重题的常规起手式。',
          '没有排序，去重边界会更难写。',
        ],
      },
      {
        id: 'subset2-same-level-skip',
        title: '同层去重是这题的核心',
        summary:
          '回溯树同一层中，如果某个值已经被尝试过一次，那么后面相同值的分支就不应该再进入，否则会生成重复子集。真正需要跳过的是“同层重复”，而不是“路径中已经出现过的值”。',
        bullets: [
          '同层重复会生成相同结果。',
          '不同层重复可以出现在不同长度的路径中。',
          '去重规则必须和层级绑定。',
          '这是这题最容易混淆的点。',
        ],
      },
      {
        id: 'subset2-path-logic',
        title: '路径仍然可以收集，但每层枚举必须跳过重复起点',
        summary:
          '和普通子集一样，回溯开始时就可以把当前路径加入结果。不同的是，for 循环里要在同层遇到重复值时直接 `continue`，避免重复扩展同一类选择。',
        bullets: [
          '路径本身还是合法子集。',
          '每层都可以收集当前路径。',
          '枚举分支时要跳过同层重复值。',
          '收集和去重是两件不同的事。',
        ],
      },
      {
        id: 'subset2-optimal-solution',
        title: '标准解法：排序 + 回溯 + 同层去重',
        summary:
          '先对数组排序，然后进行回溯。每次从 `start` 开始枚举，如果当前元素和前一个元素相同，并且前一个元素在同一层已经被跳过，就直接略过当前元素。这样能保证结果集中没有重复子集。',
        bullets: [
          '时间复杂度是 `O(n * 2^n)`。',
          '排序成本是 `O(n log n)`。',
          '关键是同层去重规则。',
          '这是组合枚举去重的标准模板。',
        ],
        code: `function subsetsWithDup(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)
  const result: number[][] = []
  const path: number[] = []

  const dfs = (start: number) => {
    result.push([...path])

    for (let index = start; index < nums.length; index += 1) {
      if (index > start && nums[index] === nums[index - 1]) {
        continue
      }

      path.push(nums[index])
      dfs(index + 1)
      path.pop()
    }
  }

  dfs(0)
  return result
}`,
      },
      {
        id: 'subset2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“同层去重”和“路径去重”混为一谈。真正掌握后，你会更擅长处理带重复元素的枚举题。',
        bullets: [
          '易错点 1：没有先排序，重复判断失效。',
          '易错点 2：把路径中已出现的重复值误删，漏掉合法结果。',
          '易错点 3：同层去重条件写错，导致仍有重复答案。',
          '延伸方向：组合总和 II、排列 II、去重搜索树。',
        ],
        callout:
          '重复元素题的本质，不是“去掉所有重复”，而是“只去掉会造成重复结果的那一层重复”。',
      },
    ],
  },
  {
    id: 'decode-ways',
    label: '91. LeetCode 91. 解码方法',
    difficulty: '中等',
    description:
      '这题是在训练你把字符串翻译成动态规划状态。核心不是看懂字母映射，而是知道当前位置到底能单独解码，还是能和前一个字符组成两位数一起解码。',
    outcome:
      '你能掌握线性 DP 的建模方式，理解为什么每一位的答案都依赖前一位和前两位，并把这种“当前位置是否可由前缀转移而来”的思路迁移到更多字符串 DP 题。',
    sections: [
      {
        id: 'dw-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含数字的字符串，`1 -> A` 到 `26 -> Z`，求有多少种不同的解码方式。',
        bullets: [
          '每个字符可以单独解码，也可能和前一个字符组成两位数。',
          '不能有前导零。',
          '需要统计所有合法解码方案数。',
          '这是经典的字符串 DP 题。',
        ],
      },
      {
        id: 'dw-why-dp',
        title: '为什么这题不是简单递归，而是典型 DP',
        summary:
          '当前位置的解码方案数，完全取决于它前面的若干位置。把“前缀能解码到这里有多少种方法”作为状态，能自然地把问题拆成一个线性的转移过程，避免指数级重复搜索。',
        bullets: [
          '当前答案依赖前缀状态。',
          '递归容易重复计算子问题。',
          'DP 能把重复结构压成一条线。',
          '这是字符串计数题的常见建模方式。',
        ],
      },
      {
        id: 'dw-one-digit-and-two-digit',
        title: '每一位都要检查单字符和双字符两种转移',
        summary:
          '如果当前字符不为 `0`，它可以单独解码，继承前一位方案数；如果前一个字符和当前字符组成的两位数在 `10` 到 `26` 之间，它也可以从前两位转移而来。两种方式可能同时成立。',
        bullets: [
          '单字符转移负责直接延续。',
          '双字符转移负责组合解码。',
          '零的处理最容易出错。',
          '边界判断决定 DP 是否正确。',
        ],
      },
      {
        id: 'dw-zero-rules',
        title: '`0` 的约束是这题的主要坑点',
        summary:
          '`0` 不能单独解码，只能出现在 `10` 或 `20` 中作为第二位。如果当前字符是 `0`，就必须依赖前一个字符组成合法两位数；否则当前位置直接无解。',
        bullets: [
          '`0` 不能单独当成一个字母。',
          '`10` 和 `20` 是合法特例。',
          '其他包含 `0` 的两位数通常都非法。',
          '零的规则决定了很多边界分支。',
        ],
      },
      {
        id: 'dw-optimal-solution',
        title: '标准解法：一维 DP',
        summary:
          '定义 `dp[i]` 表示前 `i` 个字符的解码方式数。初始化 `dp[0] = 1`，`dp[1]` 由首字符是否合法决定。随后按位置遍历，先看当前字符是否可单独解码，再看前两位是否可组成合法编码，累加两种转移即可。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度可以压到 `O(1)`。',
          '本质是前缀计数转移。',
          '这是字符串 DP 的标准入门题。',
        ],
        code: `function numDecodings(s: string): number {
  if (s.length === 0 || s[0] === '0') {
    return 0
  }

  let prev2 = 1
  let prev1 = 1

  for (let index = 1; index < s.length; index += 1) {
    let current = 0

    if (s[index] !== '0') {
      current += prev1
    }

    const twoDigits = Number(s.slice(index - 1, index + 1))

    if (twoDigits >= 10 && twoDigits <= 26) {
      current += prev2
    }

    prev2 = prev1
    prev1 = current
  }

  return prev1
}`,
      },
      {
        id: 'dw-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没处理好 `0`，或者忘记当前状态同时依赖前一位和前两位。真正掌握后，你会对字符串计数 DP 有更稳定的建模方式。',
        bullets: [
          '易错点 1：把 `0` 当成可单独解码。',
          '易错点 2：没有区分 `10`/`20` 的合法性。',
          '易错点 3：状态转移只看前一位，漏掉两位组合。',
          '延伸方向：打家劫舍式 DP、爬楼梯变体、字符串计数题。',
        ],
        callout:
          'DP 题的关键从来不是公式，而是你能不能把“当前位依赖哪些前缀”讲清楚。',
      },
    ],
  },
  {
    id: 'reverse-linked-list-ii',
    label: '92. LeetCode 92. 反转链表 II',
    difficulty: '中等',
    description:
      '这题不是整条链表反转，而是只反转中间一段区间。真正考点在于你能不能在不打乱前后链关系的前提下，把局部区间完整翻转后再稳定接回去。',
    outcome:
      '你能掌握链表局部反转的哑节点写法，理解为什么要先找到反转区间前驱，再在区间内部做头插式重排，并把这种思路迁移到更多链表区间操作题。',
    sections: [
      {
        id: 'rll2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定链表头结点 `head` 和两个位置 `left`、`right`，要求把第 `left` 到第 `right` 个节点原地反转，并返回新链表。',
        bullets: [
          '只反转局部区间，不是整链反转。',
          '区间外节点顺序必须保持不变。',
          '要求原地修改链表链接关系。',
          '这是链表区间操作的典型题。',
        ],
      },
      {
        id: 'rll2-why-dummy',
        title: '为什么这题几乎一定要先加哑节点',
        summary:
          '如果反转区间从头结点开始，比如 `left = 1`，新头结点会发生变化。加一个 `dummy` 指向原链表后，无论区间是否包含头部，你都能统一地通过“区间前驱节点”处理连接关系。',
        bullets: [
          '哑节点统一处理头结点变化。',
          '能稳定找到反转区间前驱。',
          '减少大量边界分支。',
          '这是链表区间题的高频起手式。',
        ],
        callout:
          '链表题一旦可能改头结点，就别硬扛，先上 `dummy`，后面会轻松很多。',
      },
      {
        id: 'rll2-head-insertion',
        title: '区间反转最稳的做法，是不断把后继节点头插到区间前面',
        summary:
          '先让 `prev` 走到反转区间前一个节点，再让 `current` 指向区间第一个节点。之后反复把 `current.next` 拿出来，插到 `prev` 后面。这个过程本质上是在区间内部做头插，几轮后局部顺序就被反转了。',
        bullets: [
          '`prev` 固定在区间前驱位置。',
          '`current` 始终指向当前区间尾部。',
          '每轮都把后继节点头插到前面。',
          '这是一种非常稳的局部反转模板。',
        ],
      },
      {
        id: 'rll2-connection',
        title: '真正容易出错的不是反转本身，而是前后链如何接回',
        summary:
          '区间反转后，原区间第一个节点会变成区间尾部，它最终要接上反转区间后的节点；而区间前驱节点要接上新的区间头。头插法之所以稳，就是因为这两个连接会在操作过程中自然维持正确。',
        bullets: [
          '区间前驱负责接新头。',
          '原区间首节点最终变成尾节点。',
          '尾节点要接回区间后续部分。',
          '连线关系清楚，代码才不会绕。',
        ],
      },
      {
        id: 'rll2-optimal-solution',
        title: '标准解法：哑节点 + 区间头插',
        summary:
          '创建 `dummy`，先找到 `left` 前一个节点 `prev`。令 `current` 指向区间首节点，随后执行 `right - left` 轮：每次把 `current.next` 抽出来，插到 `prev` 后面。最终返回 `dummy.next`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '真正关键是区间头插过程。',
          '这是局部链表反转的标准模板。',
        ],
        code: `function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number,
): ListNode | null {
  const dummy = new ListNode(0, head)
  let prev: ListNode = dummy

  for (let step = 1; step < left; step += 1) {
    prev = prev.next as ListNode
  }

  let current = prev.next as ListNode

  for (let step = 0; step < right - left; step += 1) {
    const next = current.next as ListNode
    current.next = next.next
    next.next = prev.next
    prev.next = next
  }

  return dummy.next
}`,
      },
      {
        id: 'rll2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是反转后没有正确接回前后链，或者在头插过程中把 `current` 指针推进错了。真正掌握后，你会对链表局部重排建立更强的稳定感。',
        bullets: [
          '易错点 1：没有使用哑节点，头部反转边界混乱。',
          '易错点 2：头插后错误移动 `current`，导致漏节点。',
          '易错点 3：反转完成后前后链断开。',
          '延伸方向：K 个一组翻转链表、链表重排、链表区间删除。',
        ],
        callout:
          '链表局部操作题里，真正值钱的能力不是会反转，而是能把前驱、当前、后继三者关系一直讲清楚。',
      },
    ],
  },
  {
    id: 'restore-ip-addresses',
    label: '93. LeetCode 93. 复原 IP 地址',
    difficulty: '中等',
    description:
      '这题看起来像字符串分割，实际是非常标准的回溯剪枝题。真正关键不在于会不会切，而在于你能否及时排除前导零和数值越界这些无效分支。',
    outcome:
      '你能掌握固定段数的字符串回溯写法，理解为什么每段最多只看 3 位，以及如何把前导零和剩余长度约束写成有效剪枝。',
    sections: [
      {
        id: 'ria-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含数字的字符串，要求在其中插入 3 个点，把它拆成 4 段，返回所有可能的合法 IP 地址。',
        bullets: [
          '每段范围必须在 `0` 到 `255` 之间。',
          '每段不能有前导零，除非这段本身就是 `0`。',
          '最终必须恰好分成 4 段。',
          '这是固定段数分割回溯题。',
        ],
      },
      {
        id: 'ria-why-backtracking',
        title: '为什么这题天然适合回溯',
        summary:
          '你需要逐段决定当前切多长，长度可以是 1、2、3 三种。每次切完一段后，剩余部分仍然是同样的问题。只要把“当前切了几段、用了字符串的哪个位置”作为状态，就能形成标准回溯树。',
        bullets: [
          '每一层决定当前段长度。',
          '状态由段数和当前位置共同确定。',
          '剩余子问题和原问题结构一致。',
          '这是典型的有限深度回溯树。',
        ],
      },
      {
        id: 'ria-pruning',
        title: '剪枝写得好，这题会非常轻',
        summary:
          '最有效的剪枝包括三类：当前段如果以 `0` 开头，就只能取这一位；当前三位数超过 `255`，后续更长就不用试；剩余字符数量如果不可能凑满剩余段数，也应该立刻返回。',
        bullets: [
          '前导零剪枝最常见也最关键。',
          '超过 `255` 后立刻停止扩展。',
          '剩余长度上下界能提前砍掉无效树枝。',
          '这些剪枝会让搜索量大幅下降。',
        ],
      },
      {
        id: 'ria-fixed-depth',
        title: '这题不是随便分，而是固定要分成 4 段',
        summary:
          '固定段数意味着递归深度其实是已知的，只要当前已经切了 4 段，就必须同时验证字符串也正好被用完；否则无论哪一边多或少，都不是合法答案。这种固定深度条件，能让终止判断非常清楚。',
        bullets: [
          '切满 4 段时必须同时用完整个字符串。',
          '字符串提前用完也不行。',
          '段数和位置要一起判终止。',
          '这是固定分段题的共性。',
        ],
      },
      {
        id: 'ria-optimal-solution',
        title: '标准解法：回溯 + 前导零/长度剪枝',
        summary:
          '用回溯函数维护当前下标和已经切出的段列表。每层尝试切 1 到 3 位，先做前导零、数值和剩余长度校验，合法后递归进入下一层。若成功切出 4 段且刚好用完整串，就把当前结果收集起来。',
        bullets: [
          '时间复杂度主要取决于剪枝后的搜索树。',
          '空间复杂度来自递归栈和当前路径。',
          '固定深度让实现并不复杂。',
          '这是字符串分段回溯的经典母题。',
        ],
        code: `function restoreIpAddresses(s: string): string[] {
  const result: string[] = []
  const path: string[] = []

  const dfs = (start: number) => {
    const segmentsLeft = 4 - path.length
    const charsLeft = s.length - start

    if (charsLeft < segmentsLeft || charsLeft > segmentsLeft * 3) {
      return
    }

    if (path.length === 4) {
      if (start === s.length) {
        result.push(path.join('.'))
      }
      return
    }

    for (let length = 1; length <= 3 && start + length <= s.length; length += 1) {
      const segment = s.slice(start, start + length)

      if (segment.length > 1 && segment[0] === '0') {
        break
      }

      if (Number(segment) > 255) {
        break
      }

      path.push(segment)
      dfs(start + length)
      path.pop()
    }
  }

  dfs(0)
  return result
}`,
      },
      {
        id: 'ria-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是对前导零处理不清，或者忘记剩余长度剪枝。真正掌握后，你会对固定段数的回溯切分题更有手感。',
        bullets: [
          '易错点 1：把 `00`、`01` 之类非法段误判为合法。',
          '易错点 2：没写剩余长度剪枝，导致无效搜索过多。',
          '易错点 3：切满 4 段时没有同步检查字符串是否用完。',
          '延伸方向：回文分割、表达式加括号、字符串分段搜索题。',
        ],
        callout:
          '回溯题真正拉开差距的，从来不是会不会搜，而是你会不会在搜之前先把无效分支剪掉。',
      },
    ],
  },
  {
    id: 'binary-tree-inorder-traversal',
    label: '94. LeetCode 94. 二叉树的中序遍历',
    difficulty: '简单',
    description:
      '这题是二叉树遍历的基础题，但别因为简单就忽略它。真正应该吃透的，是中序遍历“左根右”的访问时机，以及递归和显式栈写法之间的对应关系。',
    outcome:
      '你能掌握中序遍历的访问顺序，理解为什么节点要在左子树访问完之后再入结果，并把递归与栈模拟写法联系起来。',
    sections: [
      {
        id: 'btit-problem-summary',
        title: '题目在问什么',
        summary: '给定一棵二叉树，返回其中序遍历结果。',
        bullets: [
          '中序顺序是“左子树 -> 根节点 -> 右子树”。',
          '结果需要按访问顺序输出。',
          '这是二叉树最基础的遍历题之一。',
          '看起来简单，但很适合建立遍历时机意识。',
        ],
      },
      {
        id: 'btit-visit-timing',
        title: '中序遍历真正要记住的是“什么时候访问根”',
        summary:
          '前序是先访问根，后序是最后访问根，中序则是把根放在中间。也就是说，必须先彻底处理完左子树，节点本身才能进入结果，之后再进入右子树。这就是“左根右”真正的时机定义。',
        bullets: [
          '根节点访问时机夹在左右子树之间。',
          '访问顺序比代码模板更重要。',
          '一旦时机搞错，中序就会变成别的遍历。',
          '这是树遍历题最基本的意识。',
        ],
      },
      {
        id: 'btit-recursion-and-stack',
        title: '递归和栈写法，本质是在表达同一件事',
        summary:
          '递归写法依赖调用栈自动帮你记住“还没访问的根节点”；显式栈写法则是手动把这些根节点压进去，等左路走到底后再逐个弹出访问。理解这点后，递归和非递归遍历就能互相转换。',
        bullets: [
          '递归由系统调用栈保存现场。',
          '栈写法由你手动保存待访问根节点。',
          '两者顺序完全等价。',
          '这对掌握树的非递归遍历很关键。',
        ],
      },
      {
        id: 'btit-left-spine',
        title: '非递归写法的核心，是一路把左链压到底',
        summary:
          '中序遍历里，左边优先级最高，所以非递归时要先不断把当前节点和其左孩子压栈，直到无法再左移。然后弹出栈顶访问，再转向它的右子树，重复同样过程。',
        bullets: [
          '先压左链，再访问，再转右。',
          '访问发生在弹栈时。',
          '右子树会重新触发压左链流程。',
          '这就是栈模拟中序的完整节奏。',
        ],
      },
      {
        id: 'btit-optimal-solution',
        title: '标准解法：递归或显式栈都可以',
        summary:
          '最直接的是递归：先遍历左子树，再记录当前节点，再遍历右子树。如果要写非递归版，就用一个栈反复压入左链、弹栈访问、转入右子树。两种写法都很标准。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '递归空间复杂度与树高有关。',
          '显式栈写法同样是 `O(h)` 辅助空间。',
          '重点在理解访问时机，而不是背模板。',
        ],
        code: `function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []
  const stack: TreeNode[] = []
  let current = root

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }

    current = stack.pop() as TreeNode
    result.push(current.val)
    current = current.right
  }

  return result
}`,
      },
      {
        id: 'btit-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把访问节点时机搞错，或者非递归写法中弹栈后忘记切到右子树。真正掌握后，你会对整套树遍历都有更稳的理解。',
        bullets: [
          '易错点 1：访问根节点时机不对，顺序变成前序或后序。',
          '易错点 2：非递归时左链没压到底就开始访问。',
          '易错点 3：弹栈后忘记处理右子树。',
          '延伸方向：前序遍历、后序遍历、BST 中序性质、Morris 遍历。',
        ],
        callout:
          '树遍历题最怕把模板和时机分开记，真正稳定的做法，是先记“访问时机”，再记代码。',
      },
    ],
  },
  {
    id: 'unique-binary-search-trees-ii',
    label: '95. LeetCode 95. 不同的二叉搜索树 II',
    difficulty: '中等',
    description:
      '这题不是只求数量，而是要真正构造出所有 BST 形态。它很适合训练你理解“选哪个值做根，就把问题拆成左右两个区间再做笛卡尔组合”的递归生成模型。',
    outcome:
      '你能掌握区间递归生成树的思路，理解 BST 结构为什么天然适合按根节点切分，并把左右子树结果做组合生成所有可能树形。',
    sections: [
      {
        id: 'ubst2-problem-summary',
        title: '题目在问什么',
        summary: '给定整数 `n`，返回由 `1` 到 `n` 组成的所有不同二叉搜索树。',
        bullets: [
          '每棵树都必须满足 BST 性质。',
          '不是求数量，而是要返回所有结构。',
          '节点值固定是 `1...n`。',
          '这是构造型递归树题。',
        ],
      },
      {
        id: 'ubst2-why-root-split',
        title: '为什么 BST 题天然适合“枚举根节点”',
        summary:
          '如果某个值被选作根，那么所有比它小的值只能出现在左子树，所有比它大的值只能出现在右子树。这样一来，整题会自然拆成两个互不干扰的区间生成问题，这正是 BST 题最核心的结构性质。',
        bullets: [
          '根节点一旦确定，左右值域立即固定。',
          '左区间和右区间互相独立。',
          'BST 性质天然把问题切开。',
          '这是这题建模的出发点。',
        ],
      },
      {
        id: 'ubst2-combination',
        title: '左右子树不是二选一，而是要做全组合',
        summary:
          '对某个根值而言，左区间可能生成多棵树，右区间也可能生成多棵树。真正的结果不是随便挑一个，而是把左边每一种可能和右边每一种可能都拼起来，形成完整结果集。',
        bullets: [
          '左子树结果集和右子树结果集要做笛卡尔积。',
          '每一对组合都生成一棵新树。',
          '这是构造型题和计数型题的重要区别。',
          '全组合意识是这题核心。',
        ],
      },
      {
        id: 'ubst2-empty-tree',
        title: '空树在构造题里也是一种合法子结果',
        summary:
          '当区间为空时，返回的不是空数组，而是包含一个 `null` 的数组。这表示“这个位置可以没有子树”。否则在组合左右子树时，叶子节点根本没法被正确拼出来。',
        bullets: [
          '空区间对应一种“空子树”结果。',
          '返回 `[null]` 而不是 `[]` 非常关键。',
          '它能让组合过程自然覆盖叶子节点情况。',
          '这是很多树构造题的隐藏关键点。',
        ],
      },
      {
        id: 'ubst2-optimal-solution',
        title: '标准解法：区间递归 + 左右结果全组合',
        summary:
          '定义函数 `build(start, end)` 返回区间内所有可能 BST。遍历每个值作为根，递归生成左区间树集和右区间树集，再双层循环组合成完整树。区间为空时返回 `[null]`。',
        bullets: [
          '结果规模本身会很大。',
          '时间复杂度取决于生成树的总数量。',
          '这是典型的构造型递归题。',
          '重点是“根切分 + 全组合”模型。',
        ],
        code: `function generateTrees(n: number): Array<TreeNode | null> {
  if (n === 0) {
    return []
  }

  const build = (start: number, end: number): Array<TreeNode | null> => {
    if (start > end) {
      return [null]
    }

    const result: Array<TreeNode | null> = []

    for (let rootValue = start; rootValue <= end; rootValue += 1) {
      const leftTrees = build(start, rootValue - 1)
      const rightTrees = build(rootValue + 1, end)

      for (const left of leftTrees) {
        for (const right of rightTrees) {
          result.push(new TreeNode(rootValue, left, right))
        }
      }
    }

    return result
  }

  return build(1, n)
}`,
      },
      {
        id: 'ubst2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是空区间返回错成空数组，导致组合过程直接断掉。真正掌握后，你会对递归构造树和结果集组合更有感觉。',
        bullets: [
          '易错点 1：空区间返回 `[]`，导致叶子节点无法生成。',
          '易错点 2：只枚举根，不对左右结果做全组合。',
          '易错点 3：构造新树时复用节点引用不清。',
          '延伸方向：不同 BST 数量、分治构造题、表达式树生成。',
        ],
        callout: '构造题最容易被低估的点，是“空结果”和“空结构”根本不是一回事。',
      },
    ],
  },
  {
    id: 'unique-binary-search-trees',
    label: '96. LeetCode 96. 不同的二叉搜索树',
    difficulty: '中等',
    description:
      '这题和上一题是同一模型的计数版。真正要掌握的是：一旦根节点固定，左右区间数量相乘，再对所有根节点求和，这就是典型的 Catalan 型 DP。',
    outcome:
      '你能掌握 BST 计数的区间乘法逻辑，理解为什么左右子树方案数要相乘，并用一维 DP 推出 Catalan 递推。',
    sections: [
      {
        id: 'ubst1-problem-summary',
        title: '题目在问什么',
        summary:
          '给定整数 `n`，求由 `1` 到 `n` 组成的不同二叉搜索树一共有多少种。',
        bullets: [
          '只求数量，不要求返回具体树结构。',
          '每棵树都必须满足 BST 性质。',
          '节点值固定为 `1...n`。',
          '这是经典 Catalan 计数题。',
        ],
      },
      {
        id: 'ubst1-root-count',
        title: '每个根节点都把问题切成“左数量 × 右数量”',
        summary:
          '如果第 `k` 个值作为根，那么左边有 `k - 1` 个数，右边有 `n - k` 个数。左区间可以组成若干种 BST，右区间也可以组成若干种 BST，两边组合时总数就是二者乘积。',
        bullets: [
          '根节点固定后，左右规模立即确定。',
          '左树数量和右树数量独立相乘。',
          '每个根节点都会贡献一部分结果。',
          '这是整题的核心递推来源。',
        ],
      },
      {
        id: 'ubst1-sum-all-roots',
        title: '为什么最后要对所有根节点求和',
        summary:
          '因为不同根节点对应的是互斥的树结构集合。既然每个根值都可能作为合法根节点，那总方案数就是把每个根贡献的“左数 × 右数”全部加起来。',
        bullets: [
          '不同根节点对应不同结构集合。',
          '这些集合之间互不重叠。',
          '所以最后要做求和而不是取最大值。',
          '这就是 Catalan 递推的来源。',
        ],
      },
      {
        id: 'ubst1-dp-definition',
        title: '一维 DP 就够了，因为只和节点数量有关',
        summary:
          '题目只问有多少种，不关心具体值是什么，所以状态只需要记录“用 `i` 个节点能组成多少种 BST”。记作 `dp[i]`，再枚举每个可能的根位置，把左右子树节点数拆开做乘法累加即可。',
        bullets: [
          '状态只和节点数量相关。',
          '不需要维护具体区间值。',
          '一维 DP 就能完成。',
          '这让实现非常紧凑。',
        ],
      },
      {
        id: 'ubst1-optimal-solution',
        title: '标准解法：Catalan 递推 DP',
        summary:
          '定义 `dp[i]` 表示 `i` 个节点的 BST 数量，初始化 `dp[0] = 1`、`dp[1] = 1`。对于每个 `i`，枚举根节点位置 `root`，左子树节点数是 `root - 1`，右子树节点数是 `i - root`，转移为 `dp[i] += dp[left] * dp[right]`。',
        bullets: [
          '时间复杂度是 `O(n^2)`。',
          '空间复杂度是 `O(n)`。',
          '这是 Catalan 型计数的经典模板。',
          '关键在于拆分后数量相乘再求和。',
        ],
        code: `function numTrees(n: number): number {
  const dp = new Array<number>(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1

  for (let nodes = 2; nodes <= n; nodes += 1) {
    for (let root = 1; root <= nodes; root += 1) {
      const left = root - 1
      const right = nodes - root
      dp[nodes] += dp[left] * dp[right]
    }
  }

  return dp[n]
}`,
      },
      {
        id: 'ubst1-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忘记 `dp[0] = 1` 的含义，或者把左右数量写成相加而不是相乘。真正掌握后，你会对构造题和计数题之间的关系更敏感。',
        bullets: [
          '易错点 1：把空树数量写成 `0`，导致递推全错。',
          '易错点 2：左右子树数量误写成加法。',
          '易错点 3：没意识到它和上一题是同一模型的计数版。',
          '延伸方向：Catalan 数、括号生成、不同搜索结构计数题。',
        ],
        callout:
          '很多 DP 题的难点其实不在代码，而在于你能不能先把“一个状态由哪些互斥情况组成”讲清楚。',
      },
    ],
  },
  {
    id: 'interleaving-string',
    label: '97. LeetCode 97. 交错字符串',
    difficulty: '中等',
    description:
      '这题是在练二维状态 DP。核心不是模拟拼接过程，而是判断 `s3` 的前缀能否由 `s1`、`s2` 的前缀交错组成。真正难点在于状态定义是否足够准确。',
    outcome:
      '你能掌握二维前缀 DP 的定义方式，理解为什么 `dp[i][j]` 要表示 `s1` 前 `i` 位和 `s2` 前 `j` 位是否能组成 `s3` 前 `i + j` 位，并把这种状态建模迁移到更多双串 DP 题。',
    sections: [
      {
        id: 'ils-problem-summary',
        title: '题目在问什么',
        summary:
          '给定字符串 `s1`、`s2`、`s3`，判断 `s3` 是否由 `s1` 和 `s2` 交错组成，且各自字符相对顺序不能改变。',
        bullets: [
          '`s1` 和 `s2` 的内部顺序都必须保留。',
          '`s3` 是两者交错合并后的结果。',
          '只需要判断是否可行。',
          '这是经典双串 DP 题。',
        ],
      },
      {
        id: 'ils-why-2d-state',
        title: '为什么这题必须用二维状态来描述',
        summary:
          '单看 `s3` 的当前位置没法判断它是来自 `s1` 还是 `s2`。只有同时知道 `s1` 用了多少位、`s2` 用了多少位，才能确定当前该和 `s3` 的哪一位比较，所以状态必须同时带上两个前缀长度。',
        bullets: [
          '来源可能是 `s1`，也可能是 `s2`。',
          '单维状态不足以描述“用了谁多少字符”。',
          '二维前缀长度才能唯一定位子问题。',
          '这是双串交错题的核心建模。',
        ],
      },
      {
        id: 'ils-state-meaning',
        title: '`dp[i][j]` 的含义一定要先说清楚',
        summary:
          '定义 `dp[i][j]` 表示：`s1` 前 `i` 个字符和 `s2` 前 `j` 个字符，是否可以交错组成 `s3` 的前 `i + j` 个字符。这个定义一旦确定，转移就会非常自然。',
        bullets: [
          '`i + j` 恰好对应 `s3` 已经使用的长度。',
          '状态完全由两个前缀决定。',
          '定义清楚后转移会顺下来。',
          '很多 DP 题成败就在状态定义这一行。',
        ],
      },
      {
        id: 'ils-transition',
        title: '当前状态可能来自上方，也可能来自左方',
        summary:
          '如果 `s1[i - 1]` 恰好等于 `s3[i + j - 1]`，并且 `dp[i - 1][j]` 为真，那么当前状态就可以成立；同理，如果 `s2[j - 1]` 匹配并且 `dp[i][j - 1]` 为真，也可以成立。只要两种来源有一个能走通即可。',
        bullets: [
          '上方代表当前字符来自 `s1`。',
          '左方代表当前字符来自 `s2`。',
          '两个方向是或关系。',
          '这是二维转移的标准模式。',
        ],
      },
      {
        id: 'ils-optimal-solution',
        title: '标准解法：二维 DP',
        summary:
          '若长度不匹配，先直接返回 `false`。然后建立二维布尔数组 `dp`，初始化 `dp[0][0] = true`，再依次填充第一行、第一列和其余格子。最终答案就是 `dp[s1.length][s2.length]`。',
        bullets: [
          '时间复杂度是 `O(m * n)`。',
          '空间复杂度也是 `O(m * n)`。',
          '也可以进一步压成一维滚动数组。',
          '核心仍然是前缀状态定义。',
        ],
        code: `function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) {
    return false
  }

  const dp = Array.from({ length: s1.length + 1 }, () =>
    new Array<boolean>(s2.length + 1).fill(false),
  )

  dp[0][0] = true

  for (let i = 0; i <= s1.length; i += 1) {
    for (let j = 0; j <= s2.length; j += 1) {
      if (
        i > 0 &&
        s1[i - 1] === s3[i + j - 1] &&
        dp[i - 1][j]
      ) {
        dp[i][j] = true
      }

      if (
        j > 0 &&
        s2[j - 1] === s3[i + j - 1] &&
        dp[i][j - 1]
      ) {
        dp[i][j] = true
      }
    }
  }

  return dp[s1.length][s2.length]
}`,
      },
      {
        id: 'ils-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是状态定义不清，导致 `s3` 下标和 `i + j` 对不上。真正掌握后，你会对双串前缀 DP 的套路更敏感。',
        bullets: [
          '易错点 1：没有先做长度校验，白白进入 DP。',
          '易错点 2：`s3` 下标写错，和 `i + j` 不匹配。',
          '易错点 3：把两个来源写成且关系，而不是或关系。',
          '延伸方向：编辑距离、不同子序列、最长公共子序列、双串 DP。',
        ],
        callout:
          '双串 DP 最容易出错的不是公式，而是状态的下标语义一旦模糊，后面整张表都会跟着乱。',
      },
    ],
  },
  {
    id: 'validate-binary-search-tree',
    label: '98. LeetCode 98. 验证二叉搜索树',
    difficulty: '中等',
    description:
      '这题表面上是在判断一棵树是不是 BST，真正难点不是知道 BST 左小右大，而是能不能把这个约束正确传递到整棵子树，而不是只盯住当前节点和它的直接孩子。',
    outcome:
      '你能掌握 BST 校验的上下界写法，理解为什么局部比较不够，为什么每个节点都要继承祖先传下来的范围约束，并把这种状态传递思维迁移到更多树形递归题。',
    sections: [
      {
        id: 'vbst-problem-summary',
        title: '题目在问什么',
        summary: '给定一棵二叉树，判断它是否是一棵合法的二叉搜索树。',
        bullets: [
          '左子树所有节点都要小于根节点。',
          '右子树所有节点都要大于根节点。',
          '这个约束必须对整棵子树成立。',
          '不能只检查当前节点的左右孩子。',
        ],
      },
      {
        id: 'vbst-why-local-check-fails',
        title: '为什么只比较父子节点一定会漏判',
        summary:
          '很多人会写成“左孩子小于根、右孩子大于根”就返回真，但这只能保证局部关系。真正的 BST 要求左子树里所有节点都小于根，右子树里所有节点都大于根，所以祖先节点的约束必须一直往下传。',
        bullets: [
          '局部满足不代表整棵子树满足。',
          '左子树深层节点也要小于当前根。',
          '右子树深层节点也要大于当前根。',
          '祖先约束必须递归传递。',
        ],
        callout:
          '树题里最容易犯的错，就是把“整棵子树的性质”误写成“当前一层的性质”。',
      },
      {
        id: 'vbst-range-definition',
        title: '最稳的做法是给每个节点带上下界',
        summary:
          '访问一个节点时，不仅要看它和父节点的大小关系，还要看它是否落在当前允许的数值范围内。左子树会更新上界，右子树会更新下界，这样才能完整表达 BST 的全局约束。',
        bullets: [
          '每个节点都有一个合法区间。',
          '左子树更新上界为当前节点值。',
          '右子树更新下界为当前节点值。',
          '节点值必须严格落在区间内部。',
        ],
      },
      {
        id: 'vbst-inorder-view',
        title: '从中序遍历看，本质是在检查序列是否严格递增',
        summary:
          'BST 的中序遍历结果一定是严格递增序列，所以这题也可以转成中序遍历校验前一个节点值是否始终小于当前值。这个视角很有用，但写代码时上下界法通常更直接，也更不容易漏边界。',
        bullets: [
          '中序遍历会按从小到大访问 BST。',
          '一旦出现非递增，就不是合法 BST。',
          '这是理解 BST 性质的另一个角度。',
          '实现时上下界法更清晰。',
        ],
      },
      {
        id: 'vbst-optimal-solution',
        title: '标准解法：递归传递上下界',
        summary:
          '定义递归函数 `dfs(node, lower, upper)`，表示当前节点必须严格落在 `(lower, upper)` 这个范围内。若节点为空直接返回 `true`；若当前值越界则返回 `false`；否则继续递归检查左子树和右子树。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '关键是上下界要层层传递。',
          '比较必须使用严格大小关系。',
        ],
        code: `function isValidBST(root: TreeNode | null): boolean {
  const dfs = (
    node: TreeNode | null,
    lower: number,
    upper: number,
  ): boolean => {
    if (node === null) {
      return true
    }

    if (node.val <= lower || node.val >= upper) {
      return false
    }

    return (
      dfs(node.left, lower, node.val) &&
      dfs(node.right, node.val, upper)
    )
  }

  return dfs(root, -Infinity, Infinity)
}`,
      },
      {
        id: 'vbst-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把校验写成局部父子比较，或者把重复值处理错。真正掌握后，你会对树上约束传递和 BST 性质更敏感。',
        bullets: [
          '易错点 1：只比较当前节点与左右孩子，漏掉深层越界节点。',
          '易错点 2：把严格大小误写成允许相等。',
          '易错点 3：上下界传递方向写反。',
          '延伸方向：恢复二叉搜索树、二叉搜索树迭代器、最近公共祖先。',
        ],
        callout:
          '只要题目要求某种全局树性质，第一反应就该是“这个性质如何沿递归路径传下去”。',
      },
    ],
  },
  {
    id: 'recover-binary-search-tree',
    label: '99. LeetCode 99. 恢复二叉搜索树',
    difficulty: '中等',
    description:
      '这题不是让你重建 BST，而是要求你在两处节点被错误交换后，原地恢复这棵树。真正关键是识别中序遍历中哪两个位置破坏了严格递增顺序。',
    outcome:
      '你能掌握 BST 中序序列异常点的定位方式，理解为什么交换的两个节点会在有序序列里形成一到两次逆序，并把这种“由结构性质转成序列异常”的思路迁移到更多树题。',
    sections: [
      {
        id: 'rbst-problem-summary',
        title: '题目在问什么',
        summary:
          '一棵二叉搜索树中有两个节点的值被错误交换了，要求在不改变树结构的前提下把它恢复回来。',
        bullets: [
          '只能交换节点值，不能改树结构。',
          '原树本来是一棵合法 BST。',
          '现在有两个节点位置错乱。',
          '目标是恢复原始 BST 性质。',
        ],
      },
      {
        id: 'rbst-why-inorder',
        title: '为什么一看到 BST 恢复题，就该想到中序遍历',
        summary:
          '因为合法 BST 的中序遍历一定是严格递增序列。现在两个节点被交换后，这个序列的有序性会被破坏，所以问题就变成：如何在几乎有序的序列里找出那两个放错位置的值。',
        bullets: [
          '合法 BST 的中序序列严格递增。',
          '交换两个值后会出现逆序对。',
          '恢复问题可以转成找异常位置。',
          '这是 BST 性质最常用的利用方式。',
        ],
      },
      {
        id: 'rbst-one-or-two-inversions',
        title: '为什么有时出现一次逆序，有时出现两次逆序',
        summary:
          '如果交换的两个节点在中序序列里相邻，就只会出现一次逆序；如果不相邻，就会出现两次逆序。处理时只要记录第一次逆序的前一个节点，以及最后一次逆序的后一个节点，最终交换这两个节点值即可。',
        bullets: [
          '相邻交换对应一次逆序。',
          '不相邻交换对应两次逆序。',
          '第一个错误节点来自第一次逆序前项。',
          '第二个错误节点来自最后一次逆序后项。',
        ],
        callout:
          '这题最值钱的不是记模板，而是理解“交换两个元素后，有序序列为什么会这样坏掉”。',
      },
      {
        id: 'rbst-tracking-pointers',
        title: '遍历过程中需要维护前驱节点和两个异常节点',
        summary:
          '中序遍历会按升序访问节点，所以只要当前节点值小于前驱节点值，就说明发现了逆序。第一次发现时记录 `first = prev`，每次发现都更新 `second = current`，这样无论是相邻还是不相邻都能统一处理。',
        bullets: [
          '需要一个 `prev` 指针记录中序前驱。',
          '第一次逆序时锁定第一个错误节点。',
          '最后一次逆序时锁定第二个错误节点。',
          '统一覆盖相邻和不相邻两种情况。',
        ],
      },
      {
        id: 'rbst-optimal-solution',
        title: '标准解法：中序遍历定位两个异常节点',
        summary:
          '使用 DFS 中序遍历整棵树，维护 `prev`、`first`、`second` 三个指针。若当前节点值小于前驱节点值，就说明出现逆序；第一次逆序时记录 `first`，每次逆序都更新 `second`。遍历结束后交换 `first.val` 和 `second.val`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '本质是利用 BST 中序递增性质。',
          '最终只交换两个节点值即可。',
        ],
        code: `function recoverTree(root: TreeNode | null): void {
  let first: TreeNode | null = null
  let second: TreeNode | null = null
  let prev: TreeNode | null = null

  const inorder = (node: TreeNode | null) => {
    if (node === null) {
      return
    }

    inorder(node.left)

    if (prev !== null && node.val < prev.val) {
      if (first === null) {
        first = prev
      }
      second = node
    }

    prev = node
    inorder(node.right)
  }

  inorder(root)

  if (first !== null && second !== null) {
    ;[first.val, second.val] = [second.val, first.val]
  }
}`,
      },
      {
        id: 'rbst-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只在第一次逆序时记录两个节点，导致不相邻交换的情况恢复失败。真正掌握后，你会更敏感地把树性质映射成遍历序列性质。',
        bullets: [
          '易错点 1：只处理一次逆序，漏掉非相邻交换情况。',
          '易错点 2：把 `first` 和 `second` 的记录顺序写反。',
          '易错点 3：误以为要重新构建整棵树。',
          '延伸方向：BST 验证、BST 第 K 小元素、Morris 遍历优化空间。',
        ],
        callout:
          '很多树题一旦转成遍历序列后，难度会立刻下降一个层级，这就是“换观察角度”的价值。',
      },
    ],
  },
  {
    id: 'same-tree',
    label: '100. LeetCode 100. 相同的树',
    difficulty: '简单',
    description:
      '这题表面简单，但它非常适合拿来训练递归定义。真正关键不是会不会比较值，而是能不能把“两个子树相同”准确拆成结构相同和节点值相同这两个条件。',
    outcome:
      '你能掌握树递归的基本判断框架，理解为什么结构和数值必须同时比较，并把这种“先写清空节点语义，再递归左右子树”的方式迁移到更多二叉树入门题。',
    sections: [
      {
        id: 'st-problem-summary',
        title: '题目在问什么',
        summary: '给定两棵二叉树 `p` 和 `q`，判断它们是否完全相同。',
        bullets: [
          '不仅节点值要相同。',
          '树的结构也必须完全一致。',
          '左右子树位置不能错位。',
          '这是一道标准树递归入门题。',
        ],
      },
      {
        id: 'st-what-same-means',
        title: '“相同的树”其实包含两个层面的相同',
        summary:
          '很多人第一反应只比较当前节点值，但真正的“相同”包括两件事：当前位置是否都存在节点，以及存在时节点值是否一致。只要其中一个不满足，这两棵树就已经不同。',
        bullets: [
          '先看两个位置是否都为空。',
          '再看是否只有一边为空。',
          '都有节点时再比较节点值。',
          '结构判断和数值判断缺一不可。',
        ],
      },
      {
        id: 'st-recursive-definition',
        title: '递归定义非常直接：当前相同且左右子树也分别相同',
        summary:
          '树题一旦能写出一句递归定义，代码通常就很顺。这题的定义就是：两棵树相同，当且仅当当前节点值相同，并且左子树相同、右子树也相同。按这个定义直接翻译成代码即可。',
        bullets: [
          '先处理空节点边界。',
          '再比较当前节点值。',
          '最后递归判断左子树和右子树。',
          '逻辑和题意一一对应。',
        ],
        callout:
          '树递归最重要的能力，不是背代码，而是把“什么叫这棵树满足条件”先用一句话定义清楚。',
      },
      {
        id: 'st-why-no-traversal-array',
        title: '为什么没必要先转成遍历数组再比较',
        summary:
          '虽然也能把两棵树序列化后再比较，但这会绕远路。题目本来就是结构递归问题，直接递归比较当前节点和左右子树更自然，也更省空间。',
        bullets: [
          '直接递归更贴近题目定义。',
          '不需要额外构建遍历数组。',
          '空间开销更小。',
          '代码也更容易看清结构关系。',
        ],
      },
      {
        id: 'st-optimal-solution',
        title: '标准解法：递归比较对应节点',
        summary:
          '若两个节点都为空，返回 `true`；若只有一个为空，返回 `false`；若值不同，也返回 `false`。否则继续递归比较左子树和右子树，只有两边都相同，当前两棵树才相同。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '关键是空节点判断顺序要写清楚。',
          '这是树递归判断题的标准模板。',
        ],
        code: `function isSameTree(
  p: TreeNode | null,
  q: TreeNode | null,
): boolean {
  if (p === null && q === null) {
    return true
  }

  if (p === null || q === null) {
    return false
  }

  if (p.val !== q.val) {
    return false
  }

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}`,
      },
      {
        id: 'st-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忽略空节点边界，或者把结构比较漏掉。真正掌握后，你会对二叉树递归判断题更有基础手感。',
        bullets: [
          '易错点 1：只比较节点值，不比较结构。',
          '易错点 2：空节点判断顺序混乱。',
          '易错点 3：左右子树误写成交叉比较。',
          '延伸方向：对称二叉树、子树判断、翻转二叉树、路径总和。',
        ],
        callout: '看似简单的树题，恰好最适合训练你把递归边界写得干净，不含糊。',
      },
    ],
  },
  {
    id: 'symmetric-tree',
    label: '101. LeetCode 101. 对称二叉树',
    difficulty: '简单',
    description:
      '这题看着像普通树比较，实际是在练“镜像递归”思维。真正关键不是把一棵树和自己比较，而是能不能明确左子树的外侧要和右子树的外侧比，左子树的内侧要和右子树的内侧比。',
    outcome:
      '你能掌握镜像递归的判断方式，理解为什么对称判断不是同侧比较而是交叉比较，并把这种“双树同步递归”的思路迁移到更多树结构判断题。',
    sections: [
      {
        id: 'sym-problem-summary',
        title: '题目在问什么',
        summary: '给定一棵二叉树，判断它是否轴对称。',
        bullets: [
          '左右两边要呈镜像关系。',
          '不仅节点值要对应相同。',
          '结构也必须镜像一致。',
          '这是镜像递归的标准入门题。',
        ],
      },
      {
        id: 'sym-what-mirror-means',
        title: '对称不是“左右一样”，而是“左右互为镜像”',
        summary:
          '很多人会误写成左子树和右子树同方向比较，但镜像关系要求的是交叉对应。也就是说，左节点的左孩子要和右节点的右孩子比较，左节点的右孩子要和右节点的左孩子比较。',
        bullets: [
          '镜像比较是交叉方向。',
          '外侧节点和外侧节点比较。',
          '内侧节点和内侧节点比较。',
          '这和普通相同树判断不一样。',
        ],
      },
      {
        id: 'sym-double-recursion',
        title: '最自然的写法，是同时递归两棵子树',
        summary:
          '把问题定义成：`isMirror(left, right)` 表示左子树和右子树是否互为镜像。只要这句定义成立，代码就很直接了。先判断空节点和当前值，再递归比较外侧和内侧两组子节点。',
        bullets: [
          '递归函数有两个节点参数。',
          '先处理空节点组合情况。',
          '再处理当前值是否相等。',
          '最后递归检查两组镜像位置。',
        ],
        callout:
          '树题一旦能把问题重新定义成“两个节点之间的关系”，代码往往会立刻清晰很多。',
      },
      {
        id: 'sym-why-not-traversal',
        title: '为什么没必要先翻转一棵树再比较',
        summary:
          '当然可以先构造镜像树再做比较，但这会多做无用工作。题目本质只是判断关系，不需要真的修改结构，直接递归比较镜像位置就够了。',
        bullets: [
          '判断题不一定要真的变换结构。',
          '直接比较能少做一次树处理。',
          '实现更简洁，空间也更省。',
          '更贴近题目本身的逻辑。',
        ],
      },
      {
        id: 'sym-optimal-solution',
        title: '标准解法：镜像递归',
        summary:
          '如果根节点为空，直接返回 `true`。否则定义 `isMirror(left, right)`：若两边都为空返回 `true`；若只有一边为空返回 `false`；若值不同也返回 `false`；否则递归判断 `left.left` 和 `right.right`，以及 `left.right` 和 `right.left`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '核心在于交叉比较子节点。',
          '这是镜像树判断的标准模板。',
        ],
        code: `function isSymmetric(root: TreeNode | null): boolean {
  const isMirror = (
    left: TreeNode | null,
    right: TreeNode | null,
  ): boolean => {
    if (left === null && right === null) {
      return true
    }

    if (left === null || right === null) {
      return false
    }

    if (left.val !== right.val) {
      return false
    }

    return (
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    )
  }

  return root === null ? true : isMirror(root.left, root.right)
}`,
      },
      {
        id: 'sym-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把镜像比较误写成同侧比较。真正掌握后，你会对“两个子结构同步递归”的写法更有感觉。',
        bullets: [
          '易错点 1：把 `left.left` 和 `right.left` 拿去比较。',
          '易错点 2：空节点边界判断不完整。',
          '易错点 3：只比较节点值，不比较结构镜像关系。',
          '延伸方向：相同的树、翻转二叉树、子树判断、N 叉树对称变体。',
        ],
        callout:
          '镜像题最值钱的不是答案，而是你能否一眼识别出“比较顺序必须交叉”这件事。',
      },
    ],
  },
  {
    id: 'binary-tree-level-order-traversal',
    label: '102. LeetCode 102. 二叉树的层序遍历',
    difficulty: '中等',
    description:
      '这题是树 BFS 的标准母题。真正关键不是知道要一层一层遍历，而是能不能明确队列里存的是什么、每一轮为什么要先固定当前层节点数，以及如何把层与层之间的边界切清楚。',
    outcome:
      '你能掌握二叉树层序遍历的队列写法，理解为什么每轮都要先读取当前层长度，并把这种按层处理的思路迁移到右视图、锯齿遍历、最短路径等更多 BFS 题。',
    sections: [
      {
        id: 'lot-problem-summary',
        title: '题目在问什么',
        summary:
          '给定二叉树根节点，按从上到下、从左到右的顺序，返回每一层的节点值。',
        bullets: [
          '结果是二维数组。',
          '同一层的节点放在同一个子数组里。',
          '遍历顺序是逐层推进。',
          '这是树 BFS 的标准起手题。',
        ],
      },
      {
        id: 'lot-why-queue',
        title: '为什么这题天然适合用队列',
        summary:
          '层序遍历的本质是“先进先出”地按层扩展节点。当前层的节点会先进入队列，也会先被处理；它们的子节点会排在后面，等下一层再统一处理。这和队列模型完全一致。',
        bullets: [
          '队列天然符合 BFS 扩展顺序。',
          '当前层先出队，下一层后出队。',
          '每个节点只会入队出队一次。',
          '这是 BFS 和 DFS 最直接的分界点。',
        ],
      },
      {
        id: 'lot-why-level-size',
        title: '每一轮为什么一定要先记录当前层节点数',
        summary:
          '如果不先记住当前层长度，你在处理当前层的过程中把子节点入队后，就会把下一层也一并处理掉，层边界会混乱。先固定 `levelSize`，就能保证这一轮只消费当前层节点。',
        bullets: [
          '层边界必须在循环开始前确定。',
          '子节点入队不能影响当前层处理范围。',
          '固定层长度是 BFS 按层输出的关键。',
          '很多层序题都会用到这个技巧。',
        ],
        callout:
          'BFS 真正常见的 bug，不是队列不会写，而是层与层的边界没有先锁死。',
      },
      {
        id: 'lot-data-flow',
        title: '当前层负责收集答案，下一层负责等待入队',
        summary:
          '处理当前层时，只需要做两件事：把当前节点值收集到本层数组里；把它的左右孩子按顺序压入队列。等这一轮结束，把本层数组推入结果，再进入下一层。',
        bullets: [
          '当前节点值进入本层结果。',
          '左右孩子进入队列末尾。',
          '一轮结束后产出一层答案。',
          '流程非常规整，适合模板化。',
        ],
      },
      {
        id: 'lot-optimal-solution',
        title: '标准解法：队列 + 固定层长度',
        summary:
          '若根节点为空，直接返回空数组。否则用队列保存待处理节点。每轮先读取队列长度作为 `levelSize`，再循环取出这一层的所有节点，收集值，并把左右孩子入队。处理完后把当前层数组加入结果。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '关键在于每层开始先记录队列长度。',
          '这是树 BFS 的通用模板。',
        ],
        code: `function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return []
  }

  const result: number[][] = []
  const queue: TreeNode[] = [root]

  while (queue.length > 0) {
    const levelSize = queue.length
    const level: number[] = []

    for (let index = 0; index < levelSize; index += 1) {
      const node = queue.shift() as TreeNode
      level.push(node.val)

      if (node.left !== null) {
        queue.push(node.left)
      }

      if (node.right !== null) {
        queue.push(node.right)
      }
    }

    result.push(level)
  }

  return result
}`,
      },
      {
        id: 'lot-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有固定当前层长度，导致层边界错乱。真正掌握后，你会对树 BFS 的节奏和模板有非常稳的感觉。',
        bullets: [
          '易错点 1：边遍历边扩队列，但没有锁定当前层节点数。',
          '易错点 2：空树边界漏判。',
          '易错点 3：当前层数组被复用，导致结果污染。',
          '延伸方向：锯齿层序遍历、层平均值、右视图、最小深度 BFS 解法。',
        ],
        callout:
          '队列题一旦要求“按层输出”，脑子里第一反应就该是“这一轮先读 queue.length”。',
      },
    ],
  },
  {
    id: 'binary-tree-zigzag-level-order-traversal',
    label: '103. LeetCode 103. 二叉树的锯齿形层序遍历',
    difficulty: '中等',
    description:
      '这题本质还是层序遍历，但多了一个“奇偶层方向不同”的要求。真正关键不是重新设计遍历，而是能否把 BFS 主体保持不变，只在每层结果的组织方式上做方向控制。',
    outcome:
      '你能掌握在层序遍历模板上叠加层状态的方法，理解为什么锯齿遍历不需要改 BFS 顺序，只需要改每层结果写入方式，并把这种“主流程不变，局部策略切换”的思路迁移到更多遍历题。',
    sections: [
      {
        id: 'zlot-problem-summary',
        title: '题目在问什么',
        summary:
          '给定二叉树，按层返回节点值，但第一层从左到右，第二层从右到左，之后方向交替。',
        bullets: [
          '本质仍然是分层遍历。',
          '区别只在每层的输出方向。',
          '结果依然是二维数组。',
          '这是层序遍历的常见变体。',
        ],
      },
      {
        id: 'zlot-bfs-stays-same',
        title: 'BFS 顺序其实不用变，变的是每层怎么收集答案',
        summary:
          '很多人会以为既然方向交替，就得改队列出入顺序，甚至改成双端队列复杂模拟。其实没有必要。节点还是按标准 BFS 顺序出队，只是当前层的结果根据层号决定正向写入还是反向写入。',
        bullets: [
          '队列扩展顺序仍然保持普通 BFS。',
          '不需要为了方向切换去折腾节点访问顺序。',
          '变化只发生在当前层结果数组上。',
          '这样最稳，也最容易复用模板。',
        ],
      },
      {
        id: 'zlot-collect-strategy',
        title: '方向控制可以体现在 push 方式，也可以体现在索引映射',
        summary:
          '实现时有两种常见思路：一种是当前层从左到右就 `push`，从右到左就 `unshift`；另一种是预先开好当前层数组，通过索引决定写入位置。前者更直观，后者更稳定，避免频繁头插带来的额外开销。',
        bullets: [
          '可以用 `push/unshift` 直观实现。',
          '也可以用索引映射预填数组。',
          '索引映射更适合讲清复杂度。',
          '两种思路本质相同。',
        ],
        callout:
          '很多变体题真正考的不是新算法，而是你能不能稳住主模板，只对局部策略做最小改动。',
      },
      {
        id: 'zlot-level-flag',
        title: '最简单的层状态，就是用布尔值记录当前层方向',
        summary:
          '每处理完一层，就翻转一次方向标记。这样下一层在收集结果时自然知道该正向还是反向。层状态本身不要写复杂，一个布尔值就够了。',
        bullets: [
          '布尔值即可表示方向。',
          '每层结束后统一翻转。',
          '方向状态只影响结果写入。',
          '不要把层状态和队列状态混在一起。',
        ],
      },
      {
        id: 'zlot-optimal-solution',
        title: '标准解法：层序遍历 + 方向索引映射',
        summary:
          '还是使用标准队列做 BFS。每轮先固定当前层长度，创建同长度数组 `level`。遍历当前层节点时，如果当前层是从左到右，就把值写入当前位置；否则写入 `levelSize - 1 - index`。一层结束后把 `level` 加入结果，并翻转方向标记。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          'BFS 主体完全沿用层序遍历模板。',
          '方向差异通过写入索引解决。',
        ],
        code: `function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return []
  }

  const result: number[][] = []
  const queue: TreeNode[] = [root]
  let leftToRight = true

  while (queue.length > 0) {
    const levelSize = queue.length
    const level = new Array<number>(levelSize)

    for (let index = 0; index < levelSize; index += 1) {
      const node = queue.shift() as TreeNode
      const writeIndex = leftToRight ? index : levelSize - 1 - index
      level[writeIndex] = node.val

      if (node.left !== null) {
        queue.push(node.left)
      }

      if (node.right !== null) {
        queue.push(node.right)
      }
    }

    result.push(level)
    leftToRight = !leftToRight
  }

  return result
}`,
      },
      {
        id: 'zlot-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是为了切换方向去改 BFS 访问顺序，结果把代码搞乱。真正掌握后，你会更理解“遍历顺序”和“结果组织方式”其实是两件事。',
        bullets: [
          '易错点 1：错误修改队列扩展顺序，导致层结构混乱。',
          '易错点 2：没有先固定当前层长度。',
          '易错点 3：方向标记翻转时机写错。',
          '延伸方向：二叉树右视图、N 叉树层序遍历、按层统计问题。',
        ],
        callout:
          '写 BFS 变体时，先问自己一句：我要改的是“节点访问顺序”，还是“答案收集方式”？',
      },
    ],
  },
  {
    id: 'maximum-depth-of-binary-tree',
    label: '104. LeetCode 104. 二叉树的最大深度',
    difficulty: '简单',
    description:
      '这题非常基础，但它是树递归定义最经典的起点。真正关键不是记住“左右取最大加一”，而是能不能把“这棵树的最大深度”先翻译成一个清晰的递归定义。',
    outcome:
      '你能掌握树高度类问题的递归写法，理解为什么空树深度是 0，为什么当前树的答案等于左右子树答案的最大值再加 1，并把这种“先定义子问题再组合”的方式迁移到更多树 DP 入门题。',
    sections: [
      {
        id: 'mdbt-problem-summary',
        title: '题目在问什么',
        summary: '给定一棵二叉树，返回它的最大深度。',
        bullets: [
          '深度指从根节点到最远叶子节点的节点数。',
          '要求返回整棵树的最大层数。',
          '这是树高度问题的标准母题。',
          '也是递归定义最适合入门的题型。',
        ],
      },
      {
        id: 'mdbt-recursive-definition',
        title: '这题最重要的是先写出一句递归定义',
        summary:
          '一棵树的最大深度，等于它的左子树最大深度和右子树最大深度中的较大者，再加上当前根节点这一层。只要这句话能说清楚，代码其实就是翻译题。',
        bullets: [
          '当前问题依赖左右子问题答案。',
          '左右子树分别求各自最大深度。',
          '当前层贡献固定是 `1`。',
          '核心是“最大值 + 当前层”。',
        ],
      },
      {
        id: 'mdbt-why-null-is-zero',
        title: '为什么空树的深度要定义成 0',
        summary:
          '这是递归边界里最常见也最容易忽略的一步。空树没有节点，自然深度就是 0。只有这个边界定义清楚了，叶子节点的答案才会自然变成 `max(0, 0) + 1 = 1`。',
        bullets: [
          '空树没有任何层，所以深度为 0。',
          '叶子节点依赖这个边界自然得到深度 1。',
          '递归边界清晰，主逻辑才简洁。',
          '这类定义会频繁出现在树题里。',
        ],
        callout:
          '递归题的稳定感，往往就来自于你对“空节点意味着什么”这件事足够明确。',
      },
      {
        id: 'mdbt-dfs-vs-bfs',
        title: '这题也能用 BFS，但递归 DFS 更贴合题目本质',
        summary:
          '用层序遍历数层数当然也能做，但它更像一种实现方式；而“左右子树最大深度取最大再加一”直接表达了树高度的定义。对入门来说，先把递归定义吃透更重要。',
        bullets: [
          'BFS 可以按层计数得到答案。',
          'DFS 递归更贴近高度定义本身。',
          '这题优先练递归思维更有价值。',
          '后续很多树题都依赖这类定义方式。',
        ],
      },
      {
        id: 'mdbt-optimal-solution',
        title: '标准解法：递归返回左右子树深度最大值',
        summary:
          '若当前节点为空，返回 `0`。否则递归求出左子树深度和右子树深度，返回二者较大值加 `1`。这就是整题最标准、也最自然的写法。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '代码短，但递归定义非常关键。',
          '这是树高度类问题的标准模板。',
        ],
        code: `function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0
  }

  const leftDepth = maxDepth(root.left)
  const rightDepth = maxDepth(root.right)

  return Math.max(leftDepth, rightDepth) + 1
}`,
      },
      {
        id: 'mdbt-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把深度和高度概念混用，或者空树边界返回错。真正掌握后，你会对树上“自底向上返回信息”的递归更有基础感。',
        bullets: [
          '易错点 1：空树边界写错成 `1`。',
          '易错点 2：把当前层加一的位置放错。',
          '易错点 3：把最小深度和最大深度逻辑混淆。',
          '延伸方向：最小深度、平衡二叉树、直径、路径和、树形 DP。',
        ],
        callout:
          '别因为题目简单就轻视它，很多更难的树题，本质都是在这个模板上增加返回信息。',
      },
    ],
  },
  {
    id: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    label: '105. LeetCode 105. 从前序与中序遍历序列构造二叉树',
    difficulty: '中等',
    description:
      '这题是典型的树构造题。真正难点不是记住前序和中序的特性，而是能不能快速定位根节点在中序数组中的位置，并据此切分左右子树区间。',
    outcome:
      '你能掌握前序 + 中序构造二叉树的递归分治写法，理解为什么前序第一个元素一定是根节点，并把这种“通过遍历序列反推树结构”的方法迁移到更多构造题。',
    sections: [
      {
        id: 'cbt-problem-summary',
        title: '题目在问什么',
        summary: '给定二叉树的前序遍历和中序遍历数组，要求重建原始二叉树。',
        bullets: [
          '前序第一个元素是根节点。',
          '中序可以用来切分左右子树。',
          '题目要求恢复整棵树结构。',
          '这是树构造题的经典模型。',
        ],
      },
      {
        id: 'cbt-preorder-role',
        title: '前序遍历负责告诉你“当前根是谁”',
        summary:
          '前序遍历顺序是“根、左、右”，所以在任何一个递归区间里，前序数组的起点都对应当前子树的根节点。只要根确定了，左右子树的边界就可以由中序数组来切。',
        bullets: [
          '前序首元素就是当前子树根。',
          '递归过程中要不断消耗前序指针。',
          '根节点先确定，后面切分才有意义。',
          '这是整题最关键的起点。',
        ],
      },
      {
        id: 'cbt-inorder-role',
        title: '中序遍历负责告诉你“左子树有多大”',
        summary:
          '中序数组里，根节点左边全部属于左子树，右边全部属于右子树。找到根节点在中序中的位置后，就能立即知道左子树区间长度，也就能同步切分前序区间。',
        bullets: [
          '中序位置能切出左右子树。',
          '左边长度直接决定前序左区间长度。',
          '右边同理。',
          '前序和中序要配合使用。',
        ],
      },
      {
        id: 'cbt-index-map',
        title: '预先建立中序值到下标的映射，会让查找变成 O(1)',
        summary:
          '如果每次都在线性扫描中序数组找根节点，整体复杂度会退化。更稳的做法是先建立一个哈希表，把节点值映射到中序下标，这样每次定位根都只需要 O(1)。',
        bullets: [
          '哈希映射避免重复线性查找。',
          '整体复杂度能保持在线性级别。',
          '树构造题里这是常规优化。',
          '数据量越大越能体现价值。',
        ],
        callout:
          '构造题真正的效率差距，常常不是递归本身，而是你有没有提前把定位信息缓存好。',
      },
      {
        id: 'cbt-optimal-solution',
        title: '标准解法：递归分治构造左右子树',
        summary:
          '先用哈希表记录中序值对应下标，再定义递归函数处理前序和中序的区间。每次先取前序起点作为根节点，找到它在中序中的位置 `mid`，据此计算左子树长度，再递归构造左右子树并挂回根节点。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`，包含哈希表和递归栈。',
          '关键是区间切分要一致。',
          '这是树构造题的标准模板。',
        ],
        code: `function buildTree(
  preorder: number[],
  inorder: number[],
): TreeNode | null {
  const indexMap = new Map<number, number>()

  for (let index = 0; index < inorder.length; index += 1) {
    indexMap.set(inorder[index], index)
  }

  let preorderIndex = 0

  const build = (left: number, right: number): TreeNode | null => {
    if (left > right) {
      return null
    }

    const rootValue = preorder[preorderIndex]
    preorderIndex += 1
    const root = new TreeNode(rootValue)
    const mid = indexMap.get(rootValue) as number

    root.left = build(left, mid - 1)
    root.right = build(mid + 1, right)

    return root
  }

  return build(0, inorder.length - 1)
}`,
      },
      {
        id: 'cbt-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有维护好前序指针，或者左右子树区间切分时把边界写乱。真正掌握后，你会对树构造和遍历反推结构有更强的感觉。',
        bullets: [
          '易错点 1：前序根节点消费顺序错乱。',
          '易错点 2：中序切分边界写反。',
          '易错点 3：没有用哈希表导致查找退化。',
          '延伸方向：从中序后序构造树、恢复二叉树、表达式树构造。',
        ],
        callout:
          '构造题的核心不是“把树画出来”，而是把“根、左区间、右区间”的关系完全拆清楚。',
      },
    ],
  },
  {
    id: 'construct-binary-tree-from-inorder-and-postorder-traversal',
    label: '106. LeetCode 106. 从中序与后序遍历序列构造二叉树',
    difficulty: '中等',
    description:
      '这题和上一题很像，但根节点的定位方式变了。真正关键不是重新发明一套逻辑，而是能不能识别出后序最后一个元素是根，然后反向切分左右子树区间。',
    outcome:
      '你能掌握中序 + 后序构造二叉树的递归分治方式，理解为什么后序数组需要从末尾往前取根节点，并把“同一类题换一种遍历组合”的能力迁移到更多构造题。',
    sections: [
      {
        id: 'cbt2-problem-summary',
        title: '题目在问什么',
        summary: '给定二叉树的中序遍历和后序遍历数组，要求重建原始二叉树。',
        bullets: [
          '后序最后一个元素一定是当前子树根。',
          '中序依然负责切分左右子树。',
          '题目本质是树结构反推。',
          '和上一题同属构造模板。',
        ],
      },
      {
        id: 'cbt2-postorder-role',
        title: '后序遍历负责告诉你“当前根是谁”',
        summary:
          '后序顺序是“左、右、根”，所以对任意一个子树来说，后序区间的最后一个元素就是根节点。只要根确定了，就可以用中序数组切分左右子树。',
        bullets: [
          '后序尾元素就是根。',
          '递归时要从后往前消耗后序指针。',
          '根节点先确定，再切区间。',
          '这和前序构造的方向正好相反。',
        ],
      },
      {
        id: 'cbt2-reverse-build-direction',
        title: '因为根在末尾，所以构造顺序要先右后左',
        summary:
          '和前序构造不同，后序数组是从尾部往前取根节点。由于后序的末尾是根，而根前面的最后一段属于右子树，所以递归构造时通常需要先构造右子树，再构造左子树，才能和后序指针的逆向移动保持一致。',
        bullets: [
          '后序指针从右向左移动。',
          '右子树在根前面，必须先构造。',
          '再构造左子树才能对齐区间。',
          '方向感是这题最容易错的地方。',
        ],
        callout:
          '同样是构造树，只要遍历顺序一变，递归的“先构造谁”就可能反过来，这一点必须盯紧。',
      },
      {
        id: 'cbt2-index-map',
        title: '中序映射依然是定位区间的关键',
        summary:
          '虽然根来自后序，但切分左右子树仍然依赖中序中的根位置。预先建立值到中序下标的映射，可以让每次切分都保持 O(1) 定位。',
        bullets: [
          '中序仍然承担切分职责。',
          '映射表能保持查找效率。',
          '构造题的核心技巧没有变。',
          '变化只在根节点来源和递归方向。',
        ],
      },
      {
        id: 'cbt2-optimal-solution',
        title: '标准解法：后序逆向 + 中序切分',
        summary:
          '先建立中序值到下标的映射，再维护一个后序指针从尾部向前移动。每次取出当前根节点，找到它在中序中的位置 `mid`，先递归构造右子树，再递归构造左子树，最终组装出整棵树。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '关键是后序必须逆向读取。',
          '右子树要先于左子树构造。',
        ],
        code: `function buildTree(
  inorder: number[],
  postorder: number[],
): TreeNode | null {
  const indexMap = new Map<number, number>()

  for (let index = 0; index < inorder.length; index += 1) {
    indexMap.set(inorder[index], index)
  }

  let postorderIndex = postorder.length - 1

  const build = (left: number, right: number): TreeNode | null => {
    if (left > right) {
      return null
    }

    const rootValue = postorder[postorderIndex]
    postorderIndex -= 1
    const root = new TreeNode(rootValue)
    const mid = indexMap.get(rootValue) as number

    root.right = build(mid + 1, right)
    root.left = build(left, mid - 1)

    return root
  }

  return build(0, inorder.length - 1)
}`,
      },
      {
        id: 'cbt2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把构造顺序写成先左后右，导致和后序指针逆向不一致。真正掌握后，你会更熟悉“同一类树构造题换遍历组合”的方式。',
        bullets: [
          '易错点 1：后序根节点消费方向错了。',
          '易错点 2：左右子树构造顺序写反。',
          '易错点 3：中序边界切分不一致。',
          '延伸方向：前序 + 后序特殊树、表达式树、镜像构造题。',
        ],
        callout:
          '树构造题最考验的，不是记住一份代码，而是你能否从遍历组合里快速恢复“根在哪、左在哪、右在哪”。',
      },
    ],
  },
  {
    id: 'binary-tree-level-order-traversal-ii',
    label: '107. LeetCode 107. 二叉树的层序遍历 II',
    difficulty: '中等',
    description:
      '这题本质还是层序遍历，只不过输出顺序从底向上。真正关键不是重新设计 BFS，而是能不能在保持层序模板不变的前提下，把结果收集顺序翻转过来。',
    outcome:
      '你能掌握自底向上的层序遍历写法，理解为什么可以在结果数组头部插入，也可以最后整体反转，并把这种“先正常收集，再统一调整输出顺序”的思路迁移到更多遍历题。',
    sections: [
      {
        id: 'lot2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定二叉树根节点，按层返回节点值，但输出顺序要从最底层开始，到根节点结束。',
        bullets: [
          '仍然是层序遍历。',
          '只是最终结果倒序输出。',
          '每层内部顺序仍然保持从左到右。',
          '这是层序遍历的逆序变体。',
        ],
      },
      {
        id: 'lot2-why-not-reverse-bfs',
        title: '没必要把 BFS 过程倒着写，正常遍历就行',
        summary:
          '这题最稳的方式，是先按普通层序遍历把每层结果收集出来，最后再统一反转整个结果数组。BFS 主体不用改，避免为了“倒序输出”而把节点访问顺序搞乱。',
        bullets: [
          '遍历过程保持普通层序。',
          '结果顺序可以后处理。',
          '不要为了输出逆序改动核心流程。',
          '这能最大限度复用模板。',
        ],
      },
      {
        id: 'lot2-collect-front',
        title: '也可以在收集阶段直接头插结果',
        summary:
          '另一种常见写法，是每处理完一层就把当前层结果插到结果数组最前面。这样最终得到的就是自底向上的顺序。两种方式都对，只是一个是“最后反转”，一个是“过程中头插”。',
        bullets: [
          '结果数组头插很直接。',
          '最后统一反转也很常见。',
          '两种思路都保留了 BFS 主体。',
          '根据场景选择更清楚的写法即可。',
        ],
        callout:
          '有些题不是要你换算法，而是要你学会把同一个结果用不同顺序组织出来。',
      },
      {
        id: 'lot2-level-order-connection',
        title: '层序遍历的核心仍然是“分层收集”',
        summary:
          '无论结果从上往下还是从下往上，层序遍历的前提都没变：每一轮固定当前层长度，收集本层节点，再把子节点入队。方向变化只发生在结果数组上。',
        bullets: [
          '分层处理逻辑不变。',
          '当前层数组仍然独立创建。',
          '层之间的边界依然要固定。',
          '结果顺序和访问顺序是两件事。',
        ],
      },
      {
        id: 'lot2-optimal-solution',
        title: '标准解法：普通层序遍历后整体反转',
        summary:
          '先用标准队列做层序遍历，逐层把结果追加到数组末尾。遍历结束后，再对结果数组整体反转，就得到自底向上的层序遍历结果。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          'BFS 模板完全不需要改。',
          '最后反转结果即可。',
        ],
        code: `function levelOrderBottom(root: TreeNode | null): number[][] {
  if (root === null) {
    return []
  }

  const result: number[][] = []
  const queue: TreeNode[] = [root]

  while (queue.length > 0) {
    const levelSize = queue.length
    const level: number[] = []

    for (let index = 0; index < levelSize; index += 1) {
      const node = queue.shift() as TreeNode
      level.push(node.val)

      if (node.left !== null) {
        queue.push(node.left)
      }

      if (node.right !== null) {
        queue.push(node.right)
      }
    }

    result.push(level)
  }

  return result.reverse()
}`,
      },
      {
        id: 'lot2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“输出逆序”误解成“遍历逆序”。真正掌握后，你会更清楚结果排序和遍历过程是可以分离的。',
        bullets: [
          '易错点 1：为了逆序输出，反而改坏了 BFS 核心逻辑。',
          '易错点 2：层边界没有先固定。',
          '易错点 3：把最后反转和每层反转混淆。',
          '延伸方向：层平均值、右视图、锯齿层序遍历、树的最小深度。',
        ],
        callout:
          '很多遍历题真正的技巧，不是改变访问，而是改变“最后怎么展示结果”。',
      },
    ],
  },
  {
    id: 'convert-sorted-array-to-binary-search-tree',
    label: '108. LeetCode 108. 将有序数组转换为二叉搜索树',
    difficulty: '简单',
    description:
      '这题是平衡 BST 构造的入门题。真正关键不是会不会建树，而是能不能意识到“有序数组 + 中点做根”天然就对应一棵高度尽量平衡的二叉搜索树。',
    outcome:
      '你能掌握分治构造平衡 BST 的方式，理解为什么每次取中点可以同时满足 BST 有序性和高度平衡，并把这种“中点切分”思路迁移到更多分治题。',
    sections: [
      {
        id: 'csatbst-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个升序排列的整数数组，要求把它转换成一棵高度平衡的二叉搜索树。',
        bullets: [
          '数组本身已经有序。',
          '结果必须满足 BST 性质。',
          '结果还要求尽量高度平衡。',
          '这是构造平衡树的标准入门题。',
        ],
      },
      {
        id: 'csatbst-why-middle',
        title: '为什么一看到“有序 + 平衡”，就该想到中点做根',
        summary:
          '因为数组有序，所以只要中点作为根，左边天然都小于根，右边天然都大于根，BST 性质自动满足。同时中点把数组尽量均分，左右子树规模接近，也就更容易保持平衡。',
        bullets: [
          '中点左边天然都更小。',
          '中点右边天然都更大。',
          '中点切分让左右规模接近。',
          '这是同时满足 BST 和平衡的最自然选择。',
        ],
      },
      {
        id: 'csatbst-divide-and-conquer',
        title: '这题本质就是一层层把中点变成子树根',
        summary:
          '当前区间取中点做根后，左半部分继续递归构造成左子树，右半部分继续递归构造成右子树。每个子区间都重复同样逻辑，所以它是标准分治题。',
        bullets: [
          '每个区间都独立决定自己的根。',
          '左区间递归构造左子树。',
          '右区间递归构造右子树。',
          '整个过程就是递归分治。',
        ],
        callout:
          '很多树构造题一旦发现“当前根如何选”，剩下的就只是把左右子区间继续递归下去。',
      },
      {
        id: 'csatbst-base-case',
        title: '递归边界非常简单：区间为空时返回空节点',
        summary:
          '只要当前左右边界越界，说明这个位置没有节点，直接返回 `null`。这个边界一旦定清楚，叶子节点的左右孩子会自然落到空区间上，不需要额外特殊处理。',
        bullets: [
          '空区间对应空节点。',
          '叶子节点不需要单独分支。',
          '边界越干净，主逻辑越顺。',
          '这是树构造题的高频边界。',
        ],
      },
      {
        id: 'csatbst-optimal-solution',
        title: '标准解法：递归取中点建树',
        summary:
          '定义递归函数处理数组区间 `[left, right]`。每次取中点 `mid` 作为根节点，递归构造左区间和右区间。区间为空时返回 `null`，最终得到一棵高度平衡的 BST。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(log n)` 到 `O(n)`。',
          '核心就是中点选根。',
          '这是平衡 BST 构造的标准模板。',
        ],
        code: `function sortedArrayToBST(nums: number[]): TreeNode | null {
  const build = (left: number, right: number): TreeNode | null => {
    if (left > right) {
      return null
    }

    const mid = Math.floor((left + right) / 2)
    const root = new TreeNode(nums[mid])

    root.left = build(left, mid - 1)
    root.right = build(mid + 1, right)

    return root
  }

  return build(0, nums.length - 1)
}`,
      },
      {
        id: 'csatbst-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是中点边界处理不清，或者忘了它其实就是分治构造。真正掌握后，你会对“有序结构转平衡树”的模式更有感觉。',
        bullets: [
          '易错点 1：中点计算后左右区间边界写错。',
          '易错点 2：空区间返回不清晰。',
          '易错点 3：把平衡理解成必须完全二叉树。',
          '延伸方向：有序链表转 BST、AVL/红黑树理解、分治构造题。',
        ],
        callout:
          '这题真正值钱的不是代码长度，而是你能不能把“有序 + 平衡”直接映射成“中点 + 分治”。',
      },
    ],
  },
  {
    id: 'convert-sorted-list-to-binary-search-tree',
    label: '109. LeetCode 109. 有序链表转换二叉搜索树',
    difficulty: '中等',
    description:
      '这题和上一题是同一主题的升级版。真正难点不是 BST，而是链表没有随机访问能力，所以“怎么拿到中点”成为整题核心。',
    outcome:
      '你能掌握快慢指针找链表中点并递归构造 BST 的方法，理解为什么链表版的难点在于中点定位成本，并把这种“数组方案迁移到链表时结构能力不同”的意识带到更多题里。',
    sections: [
      {
        id: 'csltbst-problem-summary',
        title: '题目在问什么',
        summary: '给定一个升序链表，要求把它转换成一棵高度平衡的二叉搜索树。',
        bullets: [
          '链表节点已经按升序排列。',
          '结果必须满足 BST 性质。',
          '还要尽量保持平衡。',
          '这是数组版构造题的链表升级版。',
        ],
      },
      {
        id: 'csltbst-core-difficulty',
        title: '真正难点不是建树，而是链表怎么找中点',
        summary:
          '数组能直接按下标取中点，链表却不能随机访问。所以整题核心不是 BST 构造本身，而是如何高效找到当前链表区间的中间节点，再把链表拆成左右两段继续递归。',
        bullets: [
          '链表没有下标随机访问。',
          '中点定位必须靠遍历。',
          '构造逻辑其实仍然是中点选根。',
          '结构能力变化带来了实现变化。',
        ],
      },
      {
        id: 'csltbst-fast-slow-pointer',
        title: '最常用的做法，就是快慢指针找中点',
        summary:
          '快指针每次走两步，慢指针每次走一步。快指针走到末尾时，慢指针就落在中点位置。再配合一个前驱指针把链表断开，就能得到左半段和右半段，递归构造左右子树。',
        bullets: [
          '快慢指针定位中点。',
          '前驱指针负责断开左半链表。',
          '中点节点本身作为当前根。',
          '左右两段继续递归构造。',
        ],
        callout:
          '链表题一旦要找“中间位置”，快慢指针基本就是第一反应，这是结构特性决定的。',
      },
      {
        id: 'csltbst-split-sublist',
        title: '中点找到后，关键是把链表真正拆开',
        summary:
          '如果不把左半链表断开，递归处理左子树时仍然会看到整个链表，逻辑就错了。所以需要在慢指针前面维护一个 `prev`，找到中点后执行断链，把左半部分和中点分离。',
        bullets: [
          '左子树必须只拿到左半链表。',
          '断链动作是递归成立的前提。',
          '右子树从中点后一个节点开始。',
          '链表构造题很依赖这个拆分动作。',
        ],
      },
      {
        id: 'csltbst-optimal-solution',
        title: '标准解法：快慢指针找中点 + 递归构造',
        summary:
          '若链表为空返回 `null`；若只有一个节点，直接返回单节点树。否则用快慢指针找中点节点 `slow`，用 `prev` 断开左半链表，以 `slow.val` 建根节点，再递归构造左右子树。',
        bullets: [
          '时间复杂度常见实现是 `O(n log n)`。',
          '空间复杂度是递归栈深度。',
          '核心仍是中点建根。',
          '区别只是中点通过链表遍历获取。',
        ],
        code: `function sortedListToBST(head: ListNode | null): TreeNode | null {
  if (head === null) {
    return null
  }

  if (head.next === null) {
    return new TreeNode(head.val)
  }

  let prev: ListNode | null = null
  let slow: ListNode | null = head
  let fast: ListNode | null = head

  while (fast !== null && fast.next !== null) {
    prev = slow
    slow = slow?.next ?? null
    fast = fast.next.next
  }

  if (prev !== null) {
    prev.next = null
  }

  const root = new TreeNode((slow as ListNode).val)
  root.left = sortedListToBST(head === slow ? null : head)
  root.right = sortedListToBST((slow as ListNode).next)

  return root
}`,
      },
      {
        id: 'csltbst-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是中点找到后没有断链，或者单节点边界没处理好。真正掌握后，你会更清楚同一思路在数组和链表上的实现差异。',
        bullets: [
          '易错点 1：忘记断开左半链表，递归区间失真。',
          '易错点 2：头节点就是中点时没有特殊处理。',
          '易错点 3：链表中点定位和右子树起点混淆。',
          '延伸方向：快慢指针题、链表重排、平衡 BST 构造优化。',
        ],
        callout:
          '真正成熟的能力，不是会一个模板，而是知道同一个模板换数据结构后，哪一步必须重写。',
      },
    ],
  },
  {
    id: 'balanced-binary-tree',
    label: '110. LeetCode 110. 平衡二叉树',
    difficulty: '简单',
    description:
      '这题表面上是判断题，实际上是在练树上“向上返回多种信息”。真正关键不是只会算高度，而是能不能在算高度的同时顺带判断子树是否已经失衡。',
    outcome:
      '你能掌握自底向上的树递归返回信息写法，理解为什么这题比单纯求高度多了一层“顺便校验”的要求，并把这种后序递归思路迁移到更多树形 DP 题。',
    sections: [
      {
        id: 'bbt-problem-summary',
        title: '题目在问什么',
        summary: '给定一棵二叉树，判断它是否是高度平衡的二叉树。',
        bullets: [
          '任意节点左右子树高度差不能超过 1。',
          '这个约束必须对整棵树都成立。',
          '不是只看根节点。',
          '这是树高度判断题的经典变体。',
        ],
      },
      {
        id: 'bbt-why-top-down-is-wasteful',
        title: '为什么“每个节点都重新算高度”会很浪费',
        summary:
          '如果你对每个节点都单独去算左右子树高度，再判断是否平衡，会重复计算很多次，复杂度容易退化到 `O(n^2)`。更稳的思路是自底向上，一次递归同时返回高度和失衡信息。',
        bullets: [
          '自顶向下会重复计算高度。',
          '同一棵子树可能被多次扫描。',
          '自底向上能把判断和求高合并。',
          '这是复杂度优化的关键。',
        ],
      },
      {
        id: 'bbt-postorder-thinking',
        title: '这题天然适合后序递归，因为当前节点依赖左右子树结果',
        summary:
          '当前节点是否平衡，必须先知道左子树高度和右子树高度，所以它天然是“先左右，后自己”的后序递归问题。左右子树一旦已有失衡，当前节点就没必要继续正常计算了。',
        bullets: [
          '先拿到左子树结果。',
          '再拿到右子树结果。',
          '最后判断当前节点是否平衡。',
          '这是标准后序递归模型。',
        ],
        callout:
          '树题里凡是“当前答案依赖左右子树先算完”，基本都应该优先想到后序递归。',
      },
      {
        id: 'bbt-sentinel-skill',
        title: '用特殊返回值表示“已经失衡”，能让代码很干净',
        summary:
          '常见做法是让递归函数返回子树高度；如果发现某棵子树已经失衡，就直接返回 `-1` 作为哨兵值。这样父节点一旦看到 `-1`，就能立刻知道整棵树已不平衡，不必继续正常比较。',
        bullets: [
          '正常情况返回子树高度。',
          '异常情况返回哨兵值 `-1`。',
          '父节点据此快速短路。',
          '这是树题里很实用的技巧。',
        ],
      },
      {
        id: 'bbt-optimal-solution',
        title: '标准解法：后序递归 + 高度哨兵',
        summary:
          '定义递归函数返回当前子树高度；若子树已经失衡，则返回 `-1`。先递归左右子树，如果任意一边返回 `-1`，或高度差大于 `1`，当前也返回 `-1`；否则返回 `max(left, right) + 1`。最终只要根节点返回值不是 `-1`，整棵树就平衡。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '关键是把高度和状态一起返回。',
          '这是平衡判断题的标准模板。',
        ],
        code: `function isBalanced(root: TreeNode | null): boolean {
  const height = (node: TreeNode | null): number => {
    if (node === null) {
      return 0
    }

    const leftHeight = height(node.left)
    if (leftHeight === -1) {
      return -1
    }

    const rightHeight = height(node.right)
    if (rightHeight === -1) {
      return -1
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1
    }

    return Math.max(leftHeight, rightHeight) + 1
  }

  return height(root) !== -1
}`,
      },
      {
        id: 'bbt-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是每个节点重复求高度，或者只检查根节点。真正掌握后，你会对树上“返回附加状态”的递归写法更有感觉。',
        bullets: [
          '易错点 1：只看根节点高度差，忽略子树内部失衡。',
          '易错点 2：重复计算高度，复杂度退化。',
          '易错点 3：哨兵值和正常高度语义混乱。',
          '延伸方向：树直径、路径和、最近公共祖先、树形 DP。',
        ],
        callout:
          '递归题一旦能学会“顺便带回一点额外信息”，很多原本分两遍做的题都能压成一遍。',
      },
    ],
  },
  {
    id: 'minimum-depth-of-binary-tree',
    label: '111. LeetCode 111. 二叉树的最小深度',
    difficulty: '简单',
    description:
      '这题和最大深度很像，所以特别容易被写错。真正关键不是会用 `min`，而是能不能意识到“只有一边为空”时，不能直接拿空树深度 0 参与最小值比较。',
    outcome:
      '你能掌握最小深度的边界判断，理解为什么叶子节点定义决定了这题不能机械套用最大深度模板，并把这种边界敏感性带到更多树递归题。',
    sections: [
      {
        id: 'mdbt2-problem-summary',
        title: '题目在问什么',
        summary: '给定一棵二叉树，返回从根节点到最近叶子节点的最小深度。',
        bullets: [
          '目标是最近叶子节点，不是任意空指针。',
          '叶子节点必须左右孩子都为空。',
          '这是深度题里的边界陷阱题。',
          '不能机械照搬最大深度写法。',
        ],
      },
      {
        id: 'mdbt2-why-min-template-fails',
        title: '为什么不能直接写成 `min(left, right) + 1`',
        summary:
          '如果某个节点只有一边子树，比如左边为空右边不空，那么左深度是 `0`，这时直接取最小值会得到错误答案，因为空边并不代表存在一条到叶子的有效路径。只有两边都存在时，最小值逻辑才成立。',
        bullets: [
          '空子树不等于一条可达叶子的路径。',
          '单侧为空时不能直接参与 `min`。',
          '最近叶子必须沿真实存在的路径走。',
          '这是整题最核心的坑点。',
        ],
      },
      {
        id: 'mdbt2-leaf-definition',
        title: '真正决定答案的是叶子定义，不是空节点定义',
        summary:
          '最小深度问的是到叶子的最短路径，所以你要始终记住目标对象是“左右都为空的叶子节点”。中间某一边为空，只说明这条方向不能结束，不说明已经找到更短路径。',
        bullets: [
          '叶子节点是终点，不是空指针。',
          '单边为空不构成答案。',
          '递归逻辑必须围绕叶子定义展开。',
          '这会直接影响边界处理。',
        ],
        callout:
          '很多递归题看起来是在算数，实际上是在考你有没有先把“答案到底算到哪一步才结束”定义清楚。',
      },
      {
        id: 'mdbt2-case-split',
        title: '最稳的写法，是把单侧为空的情况单独拆出来',
        summary:
          '若当前节点左子树为空，就只能走右边；若右子树为空，就只能走左边；只有当左右子树都存在时，才去取二者最小值。这样逻辑最稳，也最不容易误把空边当成有效路径。',
        bullets: [
          '左空则只能走右。',
          '右空则只能走左。',
          '双边都在时才取最小值。',
          '这种拆法可读性最好。',
        ],
      },
      {
        id: 'mdbt2-optimal-solution',
        title: '标准解法：递归时单独处理单侧为空',
        summary:
          '若根节点为空返回 `0`。若左子树为空，答案就是右子树最小深度加 `1`；若右子树为空，答案就是左子树最小深度加 `1`；否则返回左右子树最小深度中的较小值加 `1`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '关键是不能让空边参与 `min`。',
          '这是最小深度题的标准模板。',
        ],
        code: `function minDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0
  }

  if (root.left === null) {
    return minDepth(root.right) + 1
  }

  if (root.right === null) {
    return minDepth(root.left) + 1
  }

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}`,
      },
      {
        id: 'mdbt2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，就是把最大深度模板直接改个 `max` 为 `min`。真正掌握后，你会对递归边界和题意终点之间的关系更敏感。',
        bullets: [
          '易错点 1：直接写 `min(left, right) + 1`。',
          '易错点 2：把空节点误当成叶子。',
          '易错点 3：叶子定义理解不准确。',
          '延伸方向：路径和、最短路径 BFS、树高度类边界题。',
        ],
        callout:
          '树题里很多错，不是不会递归，而是把题目真正的终止条件想简单了。',
      },
    ],
  },
  {
    id: 'path-sum',
    label: '112. LeetCode 112. 路径总和',
    difficulty: '简单',
    description:
      '这题是在练树上路径递归。真正关键不是会不会加法，而是能不能把“目标和还差多少”这个状态沿递归路径一层层传下去，直到叶子节点做最终判断。',
    outcome:
      '你能掌握树路径题的剩余目标值写法，理解为什么必须在叶子节点判断路径是否成立，并把这种路径状态下传思路迁移到更多路径和、路径枚举题。',
    sections: [
      {
        id: 'ps-problem-summary',
        title: '题目在问什么',
        summary:
          '给定二叉树和目标和，判断是否存在一条从根节点到叶子节点的路径，其节点值之和等于目标和。',
        bullets: [
          '路径必须从根出发。',
          '路径必须以叶子节点结束。',
          '只需要判断是否存在。',
          '这是路径题的基础模板。',
        ],
      },
      {
        id: 'ps-remaining-sum',
        title: '最自然的状态，就是“当前还差多少”',
        summary:
          '与其每次往上累加路径和，不如把目标和往下减。访问到当前节点时，把它的值从目标里扣掉，再把剩余目标传给左右子树。这样到叶子节点时，只需要判断剩余值是否刚好为 0。',
        bullets: [
          '状态可以定义成剩余目标和。',
          '每到一个节点就扣掉当前值。',
          '叶子节点时统一判断是否为 0。',
          '这种写法非常适合路径题。',
        ],
      },
      {
        id: 'ps-why-leaf-check',
        title: '为什么一定要在叶子节点处判断，而不能中途相等就返回真',
        summary:
          '因为题目要求的是“根到叶子”的完整路径。如果在中间某个节点时和已经对上，但它不是叶子，说明路径还没结束，不能提前算作答案。这是整题最容易被忽略的语义点。',
        bullets: [
          '答案必须停在叶子节点。',
          '中途和相等不代表路径合法。',
          '叶子判断和和判断必须同时成立。',
          '语义比计算更关键。',
        ],
        callout:
          '很多路径题会故意在“中途已经满足”这里埋坑，真正稳的人一定会先核对终点条件。',
      },
      {
        id: 'ps-recursive-split',
        title: '当前节点不负责决定整条路径，只负责把问题交给子树',
        summary:
          '访问到当前节点后，只要把剩余目标值传给左右孩子，然后看左右子树是否有一边能走通即可。当前节点只是路径上的一站，不需要自己做复杂决策。',
        bullets: [
          '当前节点只更新状态。',
          '左右子树继续判断是否可行。',
          '两个方向是或关系。',
          '这是路径存在性判断的标准结构。',
        ],
      },
      {
        id: 'ps-optimal-solution',
        title: '标准解法：递归传递剩余目标值',
        summary:
          '若当前节点为空，返回 `false`。先用目标和减去当前节点值；若当前节点是叶子，就判断剩余值是否为 `0`；否则递归判断左子树或右子树是否存在合法路径。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '关键是剩余和状态下传。',
          '叶子判断是语义核心。',
        ],
        code: `function hasPathSum(
  root: TreeNode | null,
  targetSum: number,
): boolean {
  if (root === null) {
    return false
  }

  const remaining = targetSum - root.val

  if (root.left === null && root.right === null) {
    return remaining === 0
  }

  return (
    hasPathSum(root.left, remaining) ||
    hasPathSum(root.right, remaining)
  )
}`,
      },
      {
        id: 'ps-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有在叶子节点判断，或者把路径终点条件丢了。真正掌握后，你会对树上路径状态传递更有基础手感。',
        bullets: [
          '易错点 1：中途和相等就提前返回真。',
          '易错点 2：没有区分普通节点和叶子节点。',
          '易错点 3：递归状态更新顺序混乱。',
          '延伸方向：路径总和 II、路径总和 III、最大路径和、DFS 枚举路径。',
        ],
        callout:
          '路径题最稳的写法，往往就是把“还差多少”这个状态一路往下传，直到真正终点。',
      },
    ],
  },
  {
    id: 'path-sum-ii',
    label: '113. LeetCode 113. 路径总和 II',
    difficulty: '中等',
    description:
      '这题是在上一题基础上从“判断是否存在”升级成“收集所有路径”。真正关键不是路径和判断，而是回溯时如何维护当前路径，并在命中答案时正确拷贝结果。',
    outcome:
      '你能掌握树上路径回溯的写法，理解为什么路径数组要在进入和退出节点时成对维护，并把这种“状态下传 + 路径回退”的能力迁移到更多 DFS 枚举题。',
    sections: [
      {
        id: 'ps2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定二叉树和目标和，返回所有从根节点到叶子节点、节点值之和等于目标和的路径。',
        bullets: [
          '路径必须从根到叶子。',
          '答案不是布尔值，而是所有合法路径。',
          '每条路径都是一个数组。',
          '这是树路径回溯题的标准模板。',
        ],
      },
      {
        id: 'ps2-vs-112',
        title: '和上一题相比，变化不是判断逻辑，而是答案收集方式',
        summary:
          '112 题只问有没有路径，所以命中一次就可以返回真；这题要把所有路径都找出来，所以不能短路，需要完整 DFS 整棵树，并把满足条件的路径逐条保存。',
        bullets: [
          '不再是存在性判断。',
          '需要遍历完所有可能路径。',
          '命中答案后还要继续回溯。',
          '核心升级在于结果收集。',
        ],
      },
      {
        id: 'ps2-path-backtracking',
        title: '路径数组一定要成对地 push 和 pop',
        summary:
          '进入当前节点时，把它压入路径；离开当前节点时，把它从路径中弹出。这样路径数组始终只表示“当前递归路径”。如果忘了回退，后续分支会污染彼此结果。',
        bullets: [
          '进入节点时 `push`。',
          '退出节点时 `pop`。',
          '当前路径必须和递归栈同步。',
          '这是回溯题的基本纪律。',
        ],
        callout:
          '回溯题里最常见的 bug，从来不是不会搜，而是状态进去了没完整退出来。',
      },
      {
        id: 'ps2-copy-result',
        title: '命中答案时，保存的是路径快照，不是原路径引用',
        summary:
          '当前路径数组后面还会继续被修改，所以当找到一条合法路径时，必须拷贝一份当前数组加入结果，而不是直接把原数组引用塞进去。否则最终所有答案可能都变成同一条路径。',
        bullets: [
          '结果里要保存路径副本。',
          '不能直接保存同一个数组引用。',
          '后续回溯会继续改动当前路径。',
          '这是收集型 DFS 的经典坑点。',
        ],
      },
      {
        id: 'ps2-optimal-solution',
        title: '标准解法：DFS + 路径回溯 + 剩余和',
        summary:
          '递归时同时维护当前路径和剩余目标值。进入节点就把值加入路径并更新剩余值；若到达叶子且剩余值刚好为 `0`，就把路径拷贝进答案；然后递归左右子树，最后回溯弹出当前节点。',
        bullets: [
          '时间复杂度取决于整棵树搜索和结果规模。',
          '空间复杂度来自递归栈和当前路径。',
          '关键是路径维护和结果拷贝。',
          '这是树路径枚举题的标准模板。',
        ],
        code: `function pathSum(
  root: TreeNode | null,
  targetSum: number,
): number[][] {
  const result: number[][] = []
  const path: number[] = []

  const dfs = (node: TreeNode | null, remaining: number) => {
    if (node === null) {
      return
    }

    path.push(node.val)
    const nextRemaining = remaining - node.val

    if (
      node.left === null &&
      node.right === null &&
      nextRemaining === 0
    ) {
      result.push([...path])
    }

    dfs(node.left, nextRemaining)
    dfs(node.right, nextRemaining)
    path.pop()
  }

  dfs(root, targetSum)
  return result
}`,
      },
      {
        id: 'ps2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忘记回溯 `pop`，或者把路径引用直接推进结果。真正掌握后，你会对树上 DFS 枚举和状态回退更敏感。',
        bullets: [
          '易错点 1：找到答案时直接保存原路径引用。',
          '易错点 2：递归退出前忘记 `pop`。',
          '易错点 3：叶子判断和剩余值判断顺序混乱。',
          '延伸方向：组合总和、子集回溯、路径总和 III、树路径字符串题。',
        ],
        callout:
          '从“判断存在”到“收集所有”，本质升级就在于你要学会把路径状态完整地进出维护好。',
      },
    ],
  },
  {
    id: 'flatten-binary-tree-to-linked-list',
    label: '114. LeetCode 114. 二叉树展开为链表',
    difficulty: '中等',
    description:
      '这题不是单纯改指针，而是在练你能不能一边保留先序遍历顺序，一边原地重排树结构。真正关键不是把节点串起来，而是保证左子树整体先接到右边，再把原右子树接回尾部。',
    outcome:
      '你能掌握树结构原地重排的递归思路，理解为什么展开结果必须遵循先序遍历，并把这种“先处理子树，再回接旧链路”的能力迁移到更多树指针题。',
    sections: [
      {
        id: 'fbtll-problem-summary',
        title: '题目在问什么',
        summary:
          '给定二叉树根节点，要求把它原地展开成单链表，链表顺序要和二叉树先序遍历一致。',
        bullets: [
          '展开后所有左指针都要变成 `null`。',
          '所有节点都沿右指针串起来。',
          '节点顺序必须符合先序遍历。',
          '要求原地修改结构。',
        ],
      },
      {
        id: 'fbtll-why-preorder',
        title: '为什么结果顺序一定是先序遍历',
        summary:
          '先序遍历顺序是“根、左、右”。而展开后的链表要求从根开始一路往后走，显然就是把先序遍历的访问顺序直接线性化，所以整题本质是在把树的先序结构改写成链表结构。',
        bullets: [
          '根节点总是在最前面。',
          '左子树整体要排在右子树前面。',
          '展开顺序和先序访问顺序完全一致。',
          '理解这一点后结构调整更清楚。',
        ],
      },
      {
        id: 'fbtll-reconnect-idea',
        title: '真正难点是左子树接过去后，原右子树怎么接回来',
        summary:
          '把左子树搬到右边不难，难的是不能把原右子树丢掉。常见做法是先递归展开左右子树，再找到左子树展开后的尾节点，把原右子树接到这个尾节点后面。',
        bullets: [
          '左子树先整体搬到右边。',
          '原右子树要保留下来。',
          '左链尾节点负责接回原右链。',
          '结构回接是整题核心。',
        ],
        callout:
          '树指针题真正值钱的能力，不是会改一个指针，而是能同时记住“旧链路还要怎么接回来”。',
      },
      {
        id: 'fbtll-postorder-view',
        title: '从实现角度看，它更像后序处理结构',
        summary:
          '虽然结果要求是先序顺序，但真正改结构时，往往要先把左右子树各自展开完，再回来处理当前根节点。也就是说，求解顺序和最终顺序并不一定相同。',
        bullets: [
          '结果是先序。',
          '处理过程常常是后序。',
          '先拿到左右子树稳定形态，再改当前节点。',
          '这是树结构题常见现象。',
        ],
      },
      {
        id: 'fbtll-optimal-solution',
        title: '标准解法：递归展开后回接左右链路',
        summary:
          '先递归展开左子树和右子树；如果左子树存在，就先保存原右子树，把左子树移到当前节点右边，再沿右链找到左子树尾节点，把原右子树挂回尾部。最后把当前节点左指针置空。',
        bullets: [
          '时间复杂度是 `O(n)` 到 `O(n^2)`，取决于找尾方式。',
          '空间复杂度是递归栈深度 `O(h)`。',
          '核心是左链搬右边、右链接尾部。',
          '这是最直观的原地重排写法。',
        ],
        code: `function flatten(root: TreeNode | null): void {
  if (root === null) {
    return
  }

  flatten(root.left)
  flatten(root.right)

  if (root.left !== null) {
    const originalRight = root.right
    root.right = root.left
    root.left = null

    let tail = root.right
    while (tail?.right !== null) {
      tail = tail.right
    }

    if (tail !== null) {
      tail.right = originalRight
    }
  }
}`,
      },
      {
        id: 'fbtll-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是左子树搬过去后把原右子树弄丢，或者忘记清空左指针。真正掌握后，你会对树指针重排和先序结构更有感觉。',
        bullets: [
          '易错点 1：没有保存原右子树。',
          '易错点 2：忘记把左指针置空。',
          '易错点 3：左子树尾节点定位错，导致接链错误。',
          '延伸方向：线索二叉树、Morris 遍历、树转双向链表。',
        ],
        callout:
          '结构重排题里，真正的坑从来不在“怎么改”，而在“改完以后原来的东西还在不在”。',
      },
    ],
  },
  {
    id: 'distinct-subsequences',
    label: '115. LeetCode 115. 不同的子序列',
    difficulty: '困难',
    description:
      '这题是在练双串计数 DP。真正关键不是知道可以删字符，而是能不能把“用 s 的前 i 个字符组成 t 的前 j 个字符有多少种方法”这个状态定义清楚。',
    outcome:
      '你能掌握双串计数类 DP 的状态设计，理解为什么匹配时要分“用当前字符”和“不用当前字符”两种情况，并把这种计数型转移迁移到更多序列 DP 题。',
    sections: [
      {
        id: 'ds-problem-summary',
        title: '题目在问什么',
        summary:
          '给定字符串 `s` 和 `t`，求 `s` 的子序列中有多少种不同方式可以组成 `t`。',
        bullets: [
          '子序列可以跳字符，但顺序不能变。',
          '题目要求的是方案数，不是是否可行。',
          '这是典型的双串计数 DP。',
          '结果可能非常大。',
        ],
      },
      {
        id: 'ds-state-definition',
        title: '状态定义决定这题能不能做出来',
        summary:
          '最常见也最稳的定义是：`dp[i][j]` 表示 `s` 的前 `i` 个字符中，组成 `t` 的前 `j` 个字符的方案数。这个定义一旦立住，转移就会自然展开。',
        bullets: [
          '一个维度看 `s` 走了多远。',
          '另一个维度看 `t` 拼了多少。',
          '状态明确后才能谈转移。',
          '双串题成败常常就在定义这一步。',
        ],
      },
      {
        id: 'ds-use-or-skip',
        title: '匹配时的核心分叉，是“用当前字符”还是“跳过当前字符”',
        summary:
          '如果 `s[i - 1] === t[j - 1]`，那么当前位置的方案数来自两部分：一部分是用这个字符去匹配 `t[j - 1]`，另一部分是不用它，继续靠前面的字符去组成 `t`。这就是计数型 DP 的核心分叉。',
        bullets: [
          '匹配时有两种合法选择。',
          '用当前字符对应 `dp[i - 1][j - 1]`。',
          '不用当前字符对应 `dp[i - 1][j]`。',
          '方案数就是把两类加起来。',
        ],
        callout:
          '计数 DP 真正常见的思维方式，就是先把“最后一步可能来自哪些互斥选择”拆开，再做加法。',
      },
      {
        id: 'ds-base-case',
        title: '空串边界要先想清楚，不然后面整个表都会乱',
        summary:
          '空的 `t` 可以由任何前缀 `s` 用“什么都不选”的方式组成，所以 `dp[i][0] = 1`。而非空 `t` 不可能由空的 `s` 组成，所以 `dp[0][j] = 0`（`j > 0`）。',
        bullets: [
          '空目标串方案数是 1。',
          '空源串无法组成非空目标串。',
          '这是初始化最关键的两条。',
          '很多人错就错在这里。',
        ],
      },
      {
        id: 'ds-optimal-solution',
        title: '标准解法：二维计数 DP',
        summary:
          '建立二维数组 `dp`，初始化第一列为 1。随后枚举 `s` 和 `t` 的前缀，如果当前字符不相等，就只能继承 `dp[i - 1][j]`；如果相等，就把“跳过当前字符”和“使用当前字符”两种方案数加起来。',
        bullets: [
          '时间复杂度是 `O(m * n)`。',
          '空间复杂度是 `O(m * n)`，也可压缩。',
          '核心是计数而不是真假判断。',
          '匹配时做加法，不匹配时做继承。',
        ],
        code: `function numDistinct(s: string, t: string): number {
  const dp = Array.from({ length: s.length + 1 }, () =>
    new Array<number>(t.length + 1).fill(0),
  )

  for (let i = 0; i <= s.length; i += 1) {
    dp[i][0] = 1
  }

  for (let i = 1; i <= s.length; i += 1) {
    for (let j = 1; j <= t.length; j += 1) {
      dp[i][j] = dp[i - 1][j]

      if (s[i - 1] === t[j - 1]) {
        dp[i][j] += dp[i - 1][j - 1]
      }
    }
  }

  return dp[s.length][t.length]
}`,
      },
      {
        id: 'ds-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“用”和“不用”两种情况漏掉一半，或者初始化写错。真正掌握后，你会对双串计数型 DP 更有手感。',
        bullets: [
          '易错点 1：字符相等时忘了保留“不用当前字符”的方案数。',
          '易错点 2：空串初始化错误。',
          '易错点 3：把这题误写成最长公共子序列类 DP。',
          '延伸方向：编辑距离、交错字符串、子序列计数题。',
        ],
        callout:
          '计数题最容易吃亏的地方，就是你把两条都合法的路径只算成了一条。',
      },
    ],
  },
  {
    id: 'populating-next-right-pointers-in-each-node',
    label: '116. LeetCode 116. 填充每个节点的下一个右侧节点指针',
    difficulty: '中等',
    description:
      '这题看起来像层序遍历，但因为树是完美二叉树，所以可以做得更巧。真正关键不是把每层连起来，而是能不能利用已经建立的 `next` 关系把下一层也串起来。',
    outcome:
      '你能掌握完美二叉树的层间指针连接方式，理解为什么同一父节点内部连接和跨父节点连接都能被统一处理，并把这种 O(1) 层间推进思路迁移到更多树指针题。',
    sections: [
      {
        id: 'pnr-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一棵完美二叉树，把每个节点的 `next` 指针指向它右侧的相邻节点；如果不存在右侧节点，就指向 `null`。',
        bullets: [
          '树是完美二叉树，所有叶子同层，且每个非叶子节点都有两个孩子。',
          '目标是连同层节点。',
          '每个节点都有 `next` 指针字段。',
          '这是树横向连接题的母题。',
        ],
      },
      {
        id: 'pnr-perfect-tree-benefit',
        title: '完美二叉树这个条件，决定了这题能做得很干净',
        summary:
          '因为每个父节点一定有左右孩子，所以同一父节点内部的连接总能写成 `left.next = right`。再加上父节点自己这一层已经通过 `next` 串好，就能把跨父节点的孩子也连起来。',
        bullets: [
          '每个父节点都有左右孩子。',
          '内部连接永远存在。',
          '父层 `next` 能帮助连接下一层跨父节点节点。',
          '这让 O(1) 解法成为可能。',
        ],
      },
      {
        id: 'pnr-two-links',
        title: '真正只有两种连接：同父连接和跨父连接',
        summary:
          '同父连接就是 `node.left.next = node.right`。跨父连接则是 `node.right.next = node.next.left`，前提是当前父节点右边还有下一个父节点。把这两种关系看清楚，代码就不复杂。',
        bullets: [
          '左孩子连右孩子。',
          '右孩子连隔壁父节点的左孩子。',
          '两类连接共同覆盖整层。',
          '这是整题的全部结构逻辑。',
        ],
        callout:
          '树题很多时候不是关系太多，而是你没把关系压缩成最少的几种基本情况。',
      },
      {
        id: 'pnr-level-walk',
        title: '处理方式是按层往下走，而不是一口气 DFS 到底',
        summary:
          '可以从根节点开始，把当前层最左节点记为 `leftmost`。每一轮横向走过这一层的所有父节点，把下一层孩子都连接好，然后再下移到下一层最左节点，重复处理。',
        bullets: [
          '每次只关心一层父节点。',
          '横向利用 `next` 穿过当前层。',
          '纵向下移到下一层最左边。',
          '这是一种很优雅的层间迭代。',
        ],
      },
      {
        id: 'pnr-optimal-solution',
        title: '标准解法：利用已建 next 指针逐层连接',
        summary:
          '从根节点开始，外层循环按层向下；内层循环沿当前层已经存在的 `next` 横向遍历所有父节点。对每个父节点，先连接左孩子和右孩子，再在存在相邻父节点时，把右孩子连到相邻父节点的左孩子。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`，不算递归栈。',
          '核心是复用父层 `next` 处理子层。',
          '完美二叉树条件让写法非常稳定。',
        ],
        code: `function connect(root: Node | null): Node | null {
  if (root === null) {
    return null
  }

  let leftmost: Node | null = root

  while (leftmost.left !== null) {
    let head: Node | null = leftmost

    while (head !== null) {
      head.left.next = head.right

      if (head.next !== null) {
        head.right.next = head.next.left
      }

      head = head.next
    }

    leftmost = leftmost.left
  }

  return root
}`,
      },
      {
        id: 'pnr-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只连了同父节点内部关系，漏掉跨父连接。真正掌握后，你会对利用树已有指针做 O(1) 连接更敏感。',
        bullets: [
          '易错点 1：漏掉 `head.right.next = head.next.left`。',
          '易错点 2：没意识到外层应该按层推进。',
          '易错点 3：把一般二叉树写法硬套到完美二叉树题上。',
          '延伸方向：117 题、层序遍历、树横向指针题。',
        ],
        callout:
          '看到“完美二叉树”这种强条件时，别浪费它，往往就是为了让你写出更优结构解。',
      },
    ],
  },
  {
    id: 'populating-next-right-pointers-in-each-node-ii',
    label: '117. LeetCode 117. 填充每个节点的下一个右侧节点指针 II',
    difficulty: '中等',
    description:
      '这题是 116 的泛化版。真正关键不是还想照搬完美二叉树写法，而是学会在一般二叉树里自己维护下一层链表的头和尾。',
    outcome:
      '你能掌握一般二叉树的按层 next 连接方式，理解为什么需要显式维护下一层的 `dummy/tail`，并把这种“边遍历当前层，边构造下一层链”的思路迁移到更多链式 BFS 题。',
    sections: [
      {
        id: 'pnr2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一棵普通二叉树，把每个节点的 `next` 指针连接到右侧相邻节点，不存在就设为 `null`。',
        bullets: [
          '树不再保证完美。',
          '有的节点可能只有一个孩子。',
          '目标仍然是连接同层节点。',
          '这是 116 的一般化版本。',
        ],
      },
      {
        id: 'pnr2-why-116-fails',
        title: '为什么 116 的写法在这里不能直接用',
        summary:
          '因为现在不保证每个节点都有左右孩子，也不保证跨父节点时下一层一定能找到固定位置的孩子。所以 `left.next = right` 和 `right.next = next.left` 这种硬编码关系不再稳定。',
        bullets: [
          '孩子节点可能缺失。',
          '跨父节点目标也不固定。',
          '完美树的固定结构优势消失了。',
          '必须换成更通用的连接策略。',
        ],
      },
      {
        id: 'pnr2-dummy-tail',
        title: '最稳的通用方案，是用 dummy 和 tail 串出下一层',
        summary:
          '遍历当前层时，把看到的每个孩子节点都顺次挂到 `tail.next` 后面，同时推进 `tail`。这一轮结束时，`dummy.next` 就是下一层最左节点，也就是下一轮的起点。',
        bullets: [
          'dummy 负责记住下一层头节点。',
          'tail 始终指向下一层当前尾部。',
          '当前层遍历时顺手把下一层串起来。',
          '这是非常经典的链式 BFS 技巧。',
        ],
        callout:
          '当结构不再规整时，最稳的办法往往不是猜位置，而是自己把目标层重新组织出来。',
      },
      {
        id: 'pnr2-level-transition',
        title: '当前层靠 next 横向走，下一层靠 dummy.next 开始',
        summary:
          '一层处理开始时，先把 `dummy.next` 和 `tail` 重置。然后沿当前层已有的 `next` 指针横向扫描，把孩子依次链接到下一层链表里。当前层走完后，让 `current = dummy.next`，就自然切到下一层。',
        bullets: [
          '当前层和下一层的职责清晰分开。',
          '当前层负责扫描。',
          '下一层负责被构建。',
          '层切换通过 `dummy.next` 完成。',
        ],
      },
      {
        id: 'pnr2-optimal-solution',
        title: '标准解法：next 层扫 + dummy 组下一层',
        summary:
          '用 `current` 指向当前层起点。每层创建一个哑节点 `dummy` 和尾指针 `tail`，沿着当前层的 `next` 扫描所有节点，依次把左右孩子挂到 `tail.next` 后面。扫描结束后，下一层起点就是 `dummy.next`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是边扫描边重建下一层链表。',
          '这是一般二叉树 next 连接的标准模板。',
        ],
        code: `function connect(root: Node | null): Node | null {
  let current = root

  while (current !== null) {
    const dummy = new Node(0)
    let tail = dummy

    while (current !== null) {
      if (current.left !== null) {
        tail.next = current.left
        tail = tail.next
      }

      if (current.right !== null) {
        tail.next = current.right
        tail = tail.next
      }

      current = current.next
    }

    current = dummy.next
  }

  return root
}`,
      },
      {
        id: 'pnr2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是在孩子缺失时连接逻辑断掉，或者忘记每层重置 `dummy/tail`。真正掌握后，你会对“当前层扫描、下一层构建”的套路更敏感。',
        bullets: [
          '易错点 1：没有每层重置 `dummy` 和 `tail`。',
          '易错点 2：左孩子不存在时连接链断掉。',
          '易错点 3：当前层扫描和下一层构建状态混淆。',
          '延伸方向：层序链表、BFS 优化写法、树横向遍历题。',
        ],
        callout:
          '通用结构题往往比特殊结构题更考验你会不会先搭一个稳定的“中转容器”。',
      },
    ],
  },
  {
    id: 'pascals-triangle',
    label: '118. LeetCode 118. 杨辉三角',
    difficulty: '简单',
    description:
      '这题是最标准的“从上一层推下一层”的 DP 入门题。真正关键不是会不会相加，而是能不能看出每个内部元素都来自上一层相邻两个位置。',
    outcome:
      '你能掌握逐层构造型 DP 的基本模式，理解为什么边界永远是 1，内部元素总是上一层两个值之和，并把这种逐层递推思路迁移到更多组合与表格题。',
    sections: [
      {
        id: 'pt-problem-summary',
        title: '题目在问什么',
        summary: '给定行数 `numRows`，返回前 `numRows` 行杨辉三角。',
        bullets: [
          '结果是二维数组。',
          '每一行长度比上一行多 1。',
          '边界位置永远是 1。',
          '这是逐层构造题的典型代表。',
        ],
      },
      {
        id: 'pt-structure-observation',
        title: '杨辉三角的规律非常稳定：边界是 1，内部看上一层',
        summary:
          '每一行的第一个和最后一个位置都是 1；中间位置的值等于上一行左上和右上的两个值之和。只要把这个规律写成循环，整题就结束了。',
        bullets: [
          '首尾固定是 1。',
          '内部元素依赖上一层两个位置。',
          '每层都重复同一模式。',
          '这是最标准的递推结构。',
        ],
      },
      {
        id: 'pt-build-row',
        title: '最稳的做法，是一行一行构造',
        summary:
          '先准备一个结果数组，再从第 0 行开始往后推。当前行的长度已知，所以先建一个同长度数组，再把首尾设为 1，中间位置按上一层计算即可。',
        bullets: [
          '当前行长度等于行号 + 1。',
          '先创建当前行数组。',
          '中间位置依赖上一层。',
          '逐层推进最直观。',
        ],
        callout:
          '这种“每一层都只依赖上一层”的问题，几乎就是动态规划最温和的入门形态。',
      },
      {
        id: 'pt-why-2d',
        title: '这题保留二维结果，不是为了复杂，而是题目就要所有行',
        summary:
          '如果只求某一行，可以做空间压缩；但题目要的是前 `numRows` 行完整结果，所以保留二维数组最自然，也更贴近问题本身。',
        bullets: [
          '目标是返回完整三角形。',
          '二维数组更符合题意。',
          '不是所有题都要急着压缩空间。',
          '先把结构写清楚更重要。',
        ],
      },
      {
        id: 'pt-optimal-solution',
        title: '标准解法：逐层构造二维数组',
        summary:
          '遍历每一行，创建当前行数组。首尾填 1；中间位置用上一行的 `result[row - 1][col - 1] + result[row - 1][col]` 计算。每构造完一行就加入答案。',
        bullets: [
          '时间复杂度是 `O(numRows^2)`。',
          '空间复杂度也是 `O(numRows^2)`。',
          '核心是上一层推下一层。',
          '这是表格式递推的基础模板。',
        ],
        code: `function generate(numRows: number): number[][] {
  const result: number[][] = []

  for (let row = 0; row < numRows; row += 1) {
    const current = new Array<number>(row + 1).fill(1)

    for (let col = 1; col < row; col += 1) {
      current[col] = result[row - 1][col - 1] + result[row - 1][col]
    }

    result.push(current)
  }

  return result
}`,
      },
      {
        id: 'pt-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是中间位置下标偏移写错。真正掌握后，你会对逐层构造和“依赖上一层”的问题更敏感。',
        bullets: [
          '易错点 1：中间位置读取上一层下标错位。',
          '易错点 2：把首尾也参与递推。',
          '易错点 3：行长度初始化错误。',
          '延伸方向：119 题、组合数、二维表格 DP。',
        ],
        callout: '越基础的题，越适合训练你把数组下标和结构规律对齐得干干净净。',
      },
    ],
  },
  {
    id: 'pascals-triangle-ii',
    label: '119. LeetCode 119. 杨辉三角 II',
    difficulty: '简单',
    description:
      '这题和 118 的区别在于只求一行，所以会自然引出空间压缩。真正关键不是记住某个写法，而是理解为什么更新方向必须从右往左。',
    outcome:
      '你能掌握一维滚动数组的更新方式，理解为什么从左往右会污染上一轮数据，并把这种空间压缩意识迁移到更多一维 DP 题。',
    sections: [
      {
        id: 'pt2-problem-summary',
        title: '题目在问什么',
        summary: '给定非负整数 `rowIndex`，返回杨辉三角的第 `rowIndex` 行。',
        bullets: [
          '只求一行，不需要整个二维结果。',
          '下标从 0 开始。',
          '这是 118 的空间优化版。',
          '重点在滚动更新。',
        ],
      },
      {
        id: 'pt2-why-compress',
        title: '因为只要一行，所以完全没必要保留所有历史行',
        summary:
          '当前行只依赖上一行，而题目又只要求最终一行，所以可以把二维数组压成一维数组，边更新边复用内存。',
        bullets: [
          '目标结果只有一行。',
          '历史多余行可以丢弃。',
          '空间压缩天然可行。',
          '这是从 118 平滑升级过来的点。',
        ],
      },
      {
        id: 'pt2-right-to-left',
        title: '为什么更新一定要从右往左',
        summary:
          '如果从左往右更新，`row[col - 1]` 会先被当前轮的新值覆盖，导致后续位置读不到上一轮的老数据。只有从右往左，当前格子需要的两个值才都还是上一轮状态。',
        bullets: [
          '从左往右会污染旧值。',
          '从右往左能保住上一轮数据。',
          '这是一维滚动数组的经典技巧。',
          '方向问题是整题核心。',
        ],
        callout:
          '空间压缩题里最容易忽视的，不是能不能压，而是压完以后“更新顺序还能不能保住旧状态”。',
      },
      {
        id: 'pt2-boundary',
        title: '首位和尾位仍然是 1，只是现在都落在同一个数组里',
        summary:
          '一维数组写法中，每一轮扩展到新长度后，把当前行末尾位置视为新增的 1。中间位置再从右往左更新，首位天然保持为 1。',
        bullets: [
          '首位永远是 1。',
          '每一轮末尾新增一个 1。',
          '中间位置由右向左更新。',
          '边界语义和二维写法本质一样。',
        ],
      },
      {
        id: 'pt2-optimal-solution',
        title: '标准解法：一维数组从右往左更新',
        summary:
          '初始化数组 `row` 为 `[1]`。随后从第 1 行开始迭代，每轮先在尾部补一个 1，再从右往左更新中间元素：`row[col] += row[col - 1]`。最后返回整行结果。',
        bullets: [
          '时间复杂度是 `O(rowIndex^2)`。',
          '空间复杂度是 `O(rowIndex)`。',
          '关键是更新方向必须从右往左。',
          '这是典型的滚动数组压缩题。',
        ],
        code: `function getRow(rowIndex: number): number[] {
  const row = [1]

  for (let index = 1; index <= rowIndex; index += 1) {
    row.push(1)

    for (let col = index - 1; col > 0; col -= 1) {
      row[col] += row[col - 1]
    }
  }

  return row
}`,
      },
      {
        id: 'pt2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，就是更新方向写反。真正掌握后，你会对“只依赖上一轮”的 DP 空间压缩更敏感。',
        bullets: [
          '易错点 1：从左往右更新导致旧值被覆盖。',
          '易错点 2：没有先补上当前行尾部的 1。',
          '易错点 3：下标起止范围写错。',
          '延伸方向：组合数、一维背包、滚动数组 DP。',
        ],
        callout:
          '空间压缩的本质，从来不是省几个格子，而是你是否真正理解了状态依赖顺序。',
      },
    ],
  },
  {
    id: 'triangle',
    label: '120. LeetCode 120. 三角形最小路径和',
    difficulty: '中等',
    description:
      '这题是在练路径型 DP。真正关键不是会不会加最小值，而是能不能明确：当前位置的最优解只依赖上一层相邻的两个位置。',
    outcome:
      '你能掌握自顶向下或自底向上的路径和 DP，理解为什么每个点只能从上一层两个相邻位置过来，并把这种局部最优转移思路迁移到更多网格与路径题。',
    sections: [
      {
        id: 'tri-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个三角形数组，从顶到底每次只能走到下一层相邻位置，求路径上的最小和。',
        bullets: [
          '每次只能走到下一层相邻位置。',
          '目标是最小路径和。',
          '这是路径型 DP 的经典题。',
          '局部状态依赖非常清楚。',
        ],
      },
      {
        id: 'tri-state-view',
        title: '当前格子的最优值，只和上一层两个格子有关',
        summary:
          '如果你站在第 `row` 层第 `col` 个位置，那么它只能从上一层的 `col - 1` 或 `col` 位置过来。也就是说，当前位置最小路径和就是当前值加上那两个来源中的较小者。',
        bullets: [
          '来源只有两个。',
          '取较小来源再加当前值。',
          '路径限制让转移关系非常稳定。',
          '这正是 DP 最适合的形态。',
        ],
      },
      {
        id: 'tri-boundary-cases',
        title: '左右边界只有一个来源，中间位置才有两个来源',
        summary:
          '每层最左边只能从上一层最左边过来，每层最右边只能从上一层最右边过来，只有中间位置才需要比较两个来源。这种边界拆分要先想清楚。',
        bullets: [
          '左边界只有上方一个来源。',
          '右边界同理。',
          '中间位置有两个来源。',
          '边界决定转移分支。',
        ],
        callout:
          'DP 题里很多实现麻烦，其实都来自边界没拆清，而不是状态转移本身难。',
      },
      {
        id: 'tri-bottom-up-idea',
        title: '这题也很适合自底向上，因为底层结果最明确',
        summary:
          '除了自顶向下从起点往下推，还可以从底层往上收缩：当前位置的最优值等于当前值加上下一层相邻两个位置的较小者。这样最后收缩到顶部，就得到答案。',
        bullets: [
          '自底向上能自然压缩空间。',
          '每次只看下一层两个位置。',
          '最后顶部就是答案。',
          '这是这题非常经典的写法。',
        ],
      },
      {
        id: 'tri-optimal-solution',
        title: '标准解法：自底向上一维 DP',
        summary:
          '复制三角形最后一行作为 `dp`。从倒数第二层往上遍历，每个位置更新为 `triangle[row][col] + Math.min(dp[col], dp[col + 1])`。处理到顶层后，`dp[0]` 就是最小路径和。',
        bullets: [
          '时间复杂度是 `O(n^2)`。',
          '空间复杂度是 `O(n)`。',
          '核心是当前位置只依赖下一层相邻两个值。',
          '这是非常经典的空间压缩写法。',
        ],
        code: `function minimumTotal(triangle: number[][]): number {
  const dp = [...triangle[triangle.length - 1]]

  for (let row = triangle.length - 2; row >= 0; row -= 1) {
    for (let col = 0; col <= row; col += 1) {
      dp[col] = triangle[row][col] + Math.min(dp[col], dp[col + 1])
    }
  }

  return dp[0]
}`,
      },
      {
        id: 'tri-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是边界来源想错，或者更新顺序不清。真正掌握后，你会对路径和类 DP 的局部转移更有感觉。',
        bullets: [
          '易错点 1：边界位置也按两个来源处理。',
          '易错点 2：压缩数组时依赖方向理解不清。',
          '易错点 3：把问题误写成贪心。',
          '延伸方向：最小路径和、下降路径最小和、网格 DP。',
        ],
        callout:
          '路径题里最容易高估自己的地方，就是看见“取最小”就想贪心，实际上很多题必须保留全局状态。',
      },
    ],
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    label: '121. LeetCode 121. 买卖股票的最佳时机',
    difficulty: '简单',
    description:
      '这题表面像金融题，实际是在练一维扫描的状态维护。真正关键不是会算差值，而是能不能一边扫描价格，一边维护到当前位置为止的最低买入价。',
    outcome:
      '你能掌握单次遍历中的最优状态维护，理解为什么卖出收益只需要和历史最低价比较，并把这种“边走边维护最优前缀信息”的思路迁移到更多数组题。',
    sections: [
      {
        id: 'bttbss-problem-summary',
        title: '题目在问什么',
        summary:
          '给定某支股票每天的价格，只允许买入一次、卖出一次，求最大利润。',
        bullets: [
          '最多只能完成一笔交易。',
          '必须先买后卖。',
          '如果无利润可得，返回 0。',
          '这是前缀最优维护题的经典例子。',
        ],
      },
      {
        id: 'bttbss-core-observation',
        title: '如果当天卖出，利润只取决于“之前最低买入价”',
        summary:
          '假设你今天决定卖出，那收益就是 `todayPrice - minPriceBeforeToday`。也就是说，只要你在扫描过程中持续记住历史最低价，就能即时算出“今天卖出”的最好收益。',
        bullets: [
          '卖出日一旦确定，买入价只需要最小的那个。',
          '历史最低价就是最优买入候选。',
          '扫描时顺手维护即可。',
          '这让问题能压成一遍遍历。',
        ],
      },
      {
        id: 'bttbss-why-one-pass',
        title: '这题不需要双重循环，因为历史信息可以在线维护',
        summary:
          '暴力做法是枚举每个买入日和卖出日，但那会重复比较很多次。更聪明的方式是：扫描到第 `i` 天时，历史最低价已经知道了，于是当天最优利润也立刻可得。',
        bullets: [
          '暴力法会重复枚举区间。',
          '历史最低价可以前缀维护。',
          '当天收益能在 O(1) 算出来。',
          '所以总复杂度降到 O(n)。',
        ],
        callout:
          '很多数组题真正厉害的地方，不是把所有组合都试一遍，而是知道哪些历史信息可以被压缩成一个变量。',
      },
      {
        id: 'bttbss-two-variables',
        title: '整题其实只需要两个变量：历史最低价和当前最大利润',
        summary:
          '一个变量记录到当前为止最便宜的买入价，另一个变量记录目前见过的最大利润。每看到一个新价格，先尝试用它卖出更新利润，再看看它会不会成为新的最低买入价。',
        bullets: [
          '最小买入价负责维护历史最好进场点。',
          '最大利润负责维护当前最优答案。',
          '两个变量就够了。',
          '这是非常干净的一维扫描模板。',
        ],
      },
      {
        id: 'bttbss-optimal-solution',
        title: '标准解法：一遍扫描维护最低价',
        summary:
          '初始化 `minPrice = Infinity`、`maxProfit = 0`。遍历每一天价格时，先用 `price - minPrice` 更新最大利润，再把 `minPrice` 更新为更小的价格。遍历结束后，`maxProfit` 就是答案。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '关键是历史最低价的前缀维护。',
          '这是线性扫描最优维护题的经典模板。',
        ],
        code: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity
  let maxProfit = 0

  for (const price of prices) {
    minPrice = Math.min(minPrice, price)
    maxProfit = Math.max(maxProfit, price - minPrice)
  }

  return maxProfit
}`,
      },
      {
        id: 'bttbss-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是买入卖出顺序理解不清，或者看到负利润时不会处理。真正掌握后，你会对“历史最优前缀信息”的维护更加敏感。',
        bullets: [
          '易错点 1：把当天价格先当卖出再错误更新买入顺序。',
          '易错点 2：无利润场景没有返回 0。',
          '易错点 3：仍然写成双重循环。',
          '延伸方向：多次交易、含冷冻期、股票 DP、前缀最优维护题。',
        ],
        callout:
          '很多看似金融或业务味很重的题，抽象完以后其实只是一个前缀最优维护问题。',
      },
    ],
  },
  {
    id: 'best-time-to-buy-and-sell-stock-ii',
    label: '122. LeetCode 122. 买卖股票的最佳时机 II',
    difficulty: '中等',
    description:
      '这题是在训练“把总收益拆成每一段可赚的上涨区间”。真正关键不是模拟买卖动作，而是看穿：只要今天比昨天贵，就应该把这段上涨收益吃掉。',
    outcome:
      '你能掌握贪心地累计局部上涨收益，理解为什么多次交易下每段正收益都应该保留，并把这种“全局最优可以由局部最优直接拼出”的思路迁移到更多贪心题。',
    sections: [
      {
        id: 'bttbss2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定每天股价，你可以进行多次交易，但同一时间只能持有一股，求最大总利润。',
        bullets: [
          '可以买卖多次。',
          '必须先卖再买下一次。',
          '目标是总利润最大化。',
          '这是贪心题的经典入门题。',
        ],
      },
      {
        id: 'bttbss2-key-insight',
        title: '只要今天比昨天贵，就把这段上涨收益拿走',
        summary:
          '如果价格从 `a -> b -> c` 持续上涨，那么一次性从 `a` 买到 `c` 的收益，和分段拿走 `(b - a) + (c - b)` 完全一样。所以，只要相邻两天存在正差值，就应该累加进去。',
        bullets: [
          '连续上涨可以拆分成多个相邻正收益。',
          '拆分后总收益不变。',
          '这样就不必纠结具体在哪一天卖到峰值。',
          '问题被压缩成相邻差值求和。',
        ],
      },
      {
        id: 'bttbss2-why-greedy-works',
        title: '局部吃掉所有正收益，整体就已经最优',
        summary:
          '因为交易次数不限，只要不重叠，任意上涨区间的收益都不会互相冲突。你今天少拿一段正收益，不会让未来赚更多，反而只是在白白丢利润。',
        bullets: [
          '交易次数不限是贪心成立的前提。',
          '相邻正收益之间不存在冲突。',
          '漏掉任一段正收益都会让答案变差。',
          '所以直接累加即可。',
        ],
        callout:
          '很多贪心题的本质都不是“猜策略”，而是先证明局部选择不会伤害全局最优。',
      },
      {
        id: 'bttbss2-state-simplify',
        title: '题目最终只剩一件事：遍历相邻差值',
        summary:
          '不需要维护持仓表，也不需要回溯交易过程。只要从第二天开始遍历，遇到 `prices[i] > prices[i - 1]`，就把差值加入答案。',
        bullets: [
          '不需要真正模拟买卖。',
          '只看相邻两天的价格关系。',
          '正差值直接计入利润。',
          '实现非常简洁。',
        ],
      },
      {
        id: 'bttbss2-optimal-solution',
        title: '标准解法：累加所有正差值',
        summary:
          '从下标 `1` 开始遍历数组，如果 `prices[i] > prices[i - 1]`，就把 `prices[i] - prices[i - 1]` 加入总利润。遍历结束后得到最大收益。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心在于连续上涨可拆分。',
          '这是多次交易股票题的基础模板。',
        ],
        code: `function maxProfit(prices: number[]): number {
  let profit = 0

  for (let index = 1; index < prices.length; index += 1) {
    if (prices[index] > prices[index - 1]) {
      profit += prices[index] - prices[index - 1]
    }
  }

  return profit
}`,
      },
      {
        id: 'bttbss2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题常见错误是把它做复杂，试图找所有波峰波谷。真正掌握后，你会对“是否允许无限次操作”这个条件更加敏感。',
        bullets: [
          '易错点 1：把题目写成峰谷模拟，代码冗长且易错。',
          '易错点 2：把多次交易误当成一次交易处理。',
          '易错点 3：对连续上涨区间没有看出可拆性。',
          '延伸方向：手续费、冷冻期、限制交易次数的股票 DP。',
        ],
        callout:
          '题目限制一变，解法就会从贪心切换到 DP，所以先读清交易规则比写代码更重要。',
      },
    ],
  },
  {
    id: 'best-time-to-buy-and-sell-stock-iii',
    label: '123. LeetCode 123. 买卖股票的最佳时机 III',
    difficulty: '困难',
    description:
      '这题是在练有限次交易的状态机 DP。真正关键不是背公式，而是把每一种“做过几次交易、当前是否持股”的状态拆清楚。',
    outcome:
      '你能掌握两次交易股票题的状态设计，理解为什么买卖动作会让状态在固定轨道上流转，并把这种有限次操作的状态机思路迁移到更多 DP 题。',
    sections: [
      {
        id: 'bttbss3-problem-summary',
        title: '题目在问什么',
        summary:
          '给定每天股价，最多完成两笔交易，求最大利润。每次交易都必须先买后卖。',
        bullets: [
          '最多两笔交易。',
          '同一时间只能持有一股。',
          '交易顺序必须合法。',
          '这是股票 DP 的代表题。',
        ],
      },
      {
        id: 'bttbss3-state-machine',
        title: '最自然的建模方式，是把过程拆成四个状态',
        summary:
          '随着时间推进，你会依次经历：第一次买入、第一次卖出、第二次买入、第二次卖出。每个状态都表示“到今天为止，停在这个阶段时的最大收益”。',
        bullets: [
          '第一次买入后手里持股。',
          '第一次卖出后手里无股。',
          '第二次买入后再次持股。',
          '第二次卖出后手里无股。',
        ],
      },
      {
        id: 'bttbss3-transition',
        title: '每天的价格，只会推动这四个状态做一次转移',
        summary:
          '例如第一次买入状态要么沿用昨天的结果，要么今天从 0 收益开始买入；第一次卖出状态要么沿用昨天结果，要么用今天价格把第一次买入卖掉。后面两步也同理。',
        bullets: [
          '每个状态都有“保持不动”和“今天操作”两种选择。',
          '转移关系非常稳定。',
          '状态数量固定，所以空间可以压缩。',
          '本质就是小型状态机。',
        ],
        callout:
          '有限次交易题最怕的不是转移难，而是你一开始状态命名就含糊，后面整题都会乱掉。',
      },
      {
        id: 'bttbss3-init',
        title: '初始化要贴合业务语义，不能随便写 0',
        summary:
          '第一次买入、第二次买入都代表手里持股，因此初始值应该是负数；第一次卖出、第二次卖出初始为 0。尤其第二次买入不能乱设，它必须依赖第一次卖出后的利润。',
        bullets: [
          '持股状态本质上要付出成本。',
          '未发生的卖出状态初始可视为 0。',
          '第二次买入要建立在第一次卖出之后。',
          '初始化不清会直接破坏答案。',
        ],
      },
      {
        id: 'bttbss3-optimal-solution',
        title: '标准解法：四变量状态压缩',
        summary:
          '用 `buy1`、`sell1`、`buy2`、`sell2` 四个变量表示四个阶段。每天按顺序更新：买入看最大负成本，卖出看当前收益最大化。最终 `sell2` 就是至多两笔交易的最优结果。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是固定状态机建模。',
          '这是有限次股票交易题的基础模板。',
        ],
        code: `function maxProfit(prices: number[]): number {
  let buy1 = -Infinity
  let sell1 = 0
  let buy2 = -Infinity
  let sell2 = 0

  for (const price of prices) {
    buy1 = Math.max(buy1, -price)
    sell1 = Math.max(sell1, buy1 + price)
    buy2 = Math.max(buy2, sell1 - price)
    sell2 = Math.max(sell2, buy2 + price)
  }

  return sell2
}`,
      },
      {
        id: 'bttbss3-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把四个状态的含义混淆，或者更新顺序写乱。真正掌握后，你会对“有限次操作”的 DP 抽象更熟练。',
        bullets: [
          '易错点 1：把第二次买入写成 `-price`。',
          '易错点 2：状态命名不清，导致语义混乱。',
          '易错点 3：用二维 DP 但边界初始化没处理好。',
          '延伸方向：`k` 次交易、含手续费、含冷冻期的股票题。',
        ],
        callout:
          '股票 DP 系列真正值得练的，不是某一道题，而是你能否建立一套稳定的状态机分析框架。',
      },
    ],
  },
  {
    id: 'binary-tree-maximum-path-sum',
    label: '124. LeetCode 124. 二叉树中的最大路径和',
    difficulty: '困难',
    description:
      '这题是在训练树形 DP 和递归返回值设计。真正关键不是遍历整棵树，而是分清“给父节点提供的值”和“当前节点内部能形成的全局答案”不是一回事。',
    outcome:
      '你能掌握树上路径题的状态拆分，理解为什么递归返回值只能选择一条向上延伸的链路，并把这种“局部返回值与全局最优值分离”的思路迁移到更多树形 DP 题。',
    sections: [
      {
        id: 'btmps-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一棵二叉树，路径可以从任意节点出发到任意节点结束，但路径必须连续，求最大路径和。',
        bullets: [
          '路径不一定经过根节点。',
          '路径可以从任意节点开始和结束。',
          '路径不能分叉重复走。',
          '这是树形 DP 的经典难题。',
        ],
      },
      {
        id: 'btmps-return-vs-answer',
        title: '递归返回给父节点的值，和当前节点的最优路径不是同一个概念',
        summary:
          '父节点如果要接住当前节点，只能选择当前节点往左或往右其中一条链继续向上，所以返回值必须是“单边最大贡献”。但全局最优路径可以在当前节点同时接左边和右边，这部分只能用全局变量更新。',
        bullets: [
          '返回值只能保留一条边。',
          '全局答案可以同时用左右子树。',
          '这两个量必须分开处理。',
          '这是整题最核心的思维转折。',
        ],
      },
      {
        id: 'btmps-negative-branch',
        title: '负贡献分支要果断丢掉，因为带上只会让路径更差',
        summary:
          '如果某个子树向上提供的最大贡献是负数，那还不如不要它。所以左右贡献都应该先和 0 比较，负贡献直接裁掉。',
        bullets: [
          '负数子路径不会改善结果。',
          '贡献值先和 0 取最大。',
          '这样可避免把坏路径带上去。',
          '这是树路径题的常见剪枝。',
        ],
        callout:
          '很多递归题写不顺，不是因为递归本身复杂，而是你没有先想清“什么信息值得往上交”。',
      },
      {
        id: 'btmps-postorder',
        title: '后序遍历最合适，因为要先拿到左右子树贡献',
        summary:
          '当前节点要决定自己的最大贡献和全局答案，必须先知道左右子树分别能提供什么。因此应采用后序遍历：先算左，后算右，最后处理自己。',
        bullets: [
          '当前节点依赖左右子树结果。',
          '后序遍历天然满足依赖顺序。',
          '每个节点只处理一次。',
          '递归结构很自然。',
        ],
      },
      {
        id: 'btmps-optimal-solution',
        title: '标准解法：后序遍历 + 全局最大值',
        summary:
          '递归函数返回“当前节点向上能提供的最大单边路径和”。在每个节点处，计算左右贡献 `leftGain`、`rightGain`，用 `node.val + leftGain + rightGain` 更新全局答案，再返回 `node.val + Math.max(leftGain, rightGain)`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈 `O(h)`。',
          '核心是单边返回值与全局答案分离。',
          '这是树上最大路径题的标准模板。',
        ],
        code: `function maxPathSum(root: TreeNode | null): number {
  let best = -Infinity

  const dfs = (node: TreeNode | null): number => {
    if (!node) {
      return 0
    }

    const leftGain = Math.max(dfs(node.left), 0)
    const rightGain = Math.max(dfs(node.right), 0)

    best = Math.max(best, node.val + leftGain + rightGain)

    return node.val + Math.max(leftGain, rightGain)
  }

  dfs(root)

  return best
}`,
      },
      {
        id: 'btmps-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把返回值错误地写成左右都加上。真正掌握后，你会对树形 DP 中“返回什么”和“统计什么”更敏感。',
        bullets: [
          '易错点 1：把返回值写成 `node.val + left + right`。',
          '易错点 2：没有裁掉负贡献分支。',
          '易错点 3：只考虑经过根节点的路径。',
          '延伸方向：直径问题、路径总和、树上打家劫舍。',
        ],
        callout: '树题一旦把返回值语义说清楚，难度往往直接下降一半。',
      },
    ],
  },
  {
    id: 'valid-palindrome',
    label: '125. LeetCode 125. 验证回文串',
    difficulty: '简单',
    description:
      '这题是在练双指针和字符串清洗。真正关键不是把字符串反转，而是能否在扫描过程中跳过无效字符，并统一大小写后比较两端。',
    outcome:
      '你能掌握双指针处理字符串的基础套路，理解为什么过滤和比较可以同步完成，并把这种“边移动边裁掉无效信息”的思路迁移到更多字符串题。',
    sections: [
      {
        id: 'vp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串，忽略非字母数字字符并忽略大小写，判断它是否是回文串。',
        bullets: [
          '只比较字母和数字。',
          '大小写视为相同。',
          '回文要求从两端向中间一致。',
          '这是双指针字符串题。',
        ],
      },
      {
        id: 'vp-two-pointers',
        title: '从两端向中间夹逼，是这题最自然的做法',
        summary:
          '左指针从头开始，右指针从尾开始。遇到不是字母数字的字符就跳过；当两边都落在有效字符上时，统一转成小写后比较，不相等就直接返回 `false`。',
        bullets: [
          '双指针能同步利用左右信息。',
          '无效字符直接跳过。',
          '比较前统一大小写。',
          '一旦失配可立刻结束。',
        ],
      },
      {
        id: 'vp-filter-vs-in-place',
        title: '可以先过滤再判断，但原地双指针更省空间',
        summary:
          '先把有效字符提取出来再做回文判断也能过，但会额外开辟一个新字符串。原地双指针则是在遍历过程中完成过滤和比较，更贴近题目本质。',
        bullets: [
          '过滤后再判断更直观。',
          '原地双指针空间更优。',
          '两种方法时间复杂度都差不多。',
          '面试里更推荐原地写法。',
        ],
        callout:
          '很多字符串题都存在“先预处理”与“边处理边判断”两种写法，后者往往更体现基本功。',
      },
      {
        id: 'vp-char-check',
        title: '字符是否合法，本质上就是判断它是不是字母或数字',
        summary:
          '在 JavaScript 里，可以写一个辅助函数，用字符编码判断 `0-9`、`A-Z`、`a-z` 是否命中。把这个逻辑抽出来，主流程会更清楚。',
        bullets: [
          '有效字符只有数字和英文字母。',
          '辅助函数让主逻辑更干净。',
          '字符编码判断比正则更可控。',
          '清晰性比炫技更重要。',
        ],
      },
      {
        id: 'vp-optimal-solution',
        title: '标准解法：原地双指针跳过无效字符',
        summary:
          '定义左右指针和 `isAlphaNumeric` 辅助函数。循环中持续跳过无效字符，之后将两端字符转成小写比较。若全部通过，则说明是合法回文。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是过滤与比较同步进行。',
          '这是字符串双指针的基础模板。',
        ],
        code: `function isPalindrome(s: string): boolean {
  const isAlphaNumeric = (char: string): boolean => /[a-z0-9]/i.test(char)
  let left = 0
  let right = s.length - 1

  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) {
      left += 1
    }

    while (left < right && !isAlphaNumeric(s[right])) {
      right -= 1
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false
    }

    left += 1
    right -= 1
  }

  return true
}`,
      },
      {
        id: 'vp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题常见错误是没有正确跳过符号，或者比较前忘了统一大小写。真正掌握后，你会对双指针处理字符串的节奏更熟悉。',
        bullets: [
          '易错点 1：只过滤空格，没过滤其他符号。',
          '易错点 2：大小写没统一。',
          '易错点 3：跳过无效字符后忘了重新判断边界。',
          '延伸方向：最多删一个字符验证回文、回文子串、中心扩展法。',
        ],
        callout:
          '字符串题很多时候拼的不是算法深度，而是你对边界和细节是否足够严谨。',
      },
    ],
  },
  {
    id: 'word-ladder-ii',
    label: '126. LeetCode 126. 单词接龙 II',
    difficulty: '困难',
    description:
      '这题是在练 BFS 找最短层级，再配合回溯还原所有最短路径。真正关键不是暴力枚举所有路径，而是先用分层搜索锁定“最短”这件事。',
    outcome:
      '你能掌握“BFS 建最短层图 + DFS 回溯所有答案”的组合套路，理解为什么最短路径问题要先分层再还原路径，并把这种思路迁移到更多图搜索题。',
    sections: [
      {
        id: 'wl2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定起始单词、结束单词和字典，每次只能改一个字母且新单词必须在字典中，求所有最短转换序列。',
        bullets: [
          '每次只能改一个字母。',
          '中间单词必须在字典中。',
          '要求的是所有最短路径。',
          '这是图最短路与路径还原结合题。',
        ],
      },
      {
        id: 'wl2-why-bfs-first',
        title: '最短路径问题，先 BFS 分层是第一原则',
        summary:
          '因为 BFS 天然按步数一层层扩展，第一次到达某个单词时，已经保证步数最短。题目要所有最短路径，所以应先通过 BFS 建立最短层关系，再从这些关系中回溯所有答案。',
        bullets: [
          'BFS 能保证第一次到达步数最短。',
          '先锁定最短层级，再考虑路径枚举。',
          '否则 DFS 会陷入大量无效长路径。',
          '这是整题的基本框架。',
        ],
      },
      {
        id: 'wl2-parent-graph',
        title: '不要急着存完整路径，先存每个节点的前驱关系',
        summary:
          '在 BFS 过程中，记录某个单词是从哪些上层单词转移而来。这样等最短层构建完成后，只需从终点逆向回溯，就能还原出所有最短方案。',
        bullets: [
          '前驱表比直接存整条路径更高效。',
          '一个单词可能有多个最短前驱。',
          '前驱关系天然适合后续 DFS 回溯。',
          '结构上更清晰。',
        ],
        callout:
          '路径题如果一开始就背着完整路径跑搜索，通常会又慢又乱；先存关系再还原，往往更稳。',
      },
      {
        id: 'wl2-layer-control',
        title: 'BFS 要按层删除访问节点，避免错删同层最短路径',
        summary:
          '某一层里，多个节点可能都会在同一步到达同一个新单词。如果你一发现就立刻从字典删除，可能会丢掉同层其他合法前驱。因此应等整层处理完，再批量删除新访问节点。',
        bullets: [
          '同层节点共享相同步数。',
          '过早删除会漏掉等长最短路径。',
          '按层批量处理更安全。',
          '这是这题实现中的关键细节。',
        ],
      },
      {
        id: 'wl2-optimal-solution',
        title: '标准解法：BFS 建前驱图，DFS 回溯答案',
        summary:
          '先用 BFS 从 `beginWord` 出发，逐层生成相邻单词，并记录每个单词的前驱列表。找到 `endWord` 后停止继续向更深层扩展。随后从 `endWord` 开始 DFS 回溯到 `beginWord`，把所有最短路径加入答案。',
        bullets: [
          '时间复杂度取决于单词数和生成邻居方式。',
          '核心是 BFS 负责最短，DFS 负责枚举。',
          '按层处理是正确性的关键。',
          '这是最短路径全量输出的经典套路。',
        ],
        code: `function findLadders(
  beginWord: string,
  endWord: string,
  wordList: string[],
): string[][] {
  const wordSet = new Set(wordList)

  if (!wordSet.has(endWord)) {
    return []
  }

  const parents = new Map<string, string[]>()
  let level = new Set([beginWord])
  let found = false

  while (level.size && !found) {
    const nextLevel = new Set<string>()

    for (const word of level) {
      wordSet.delete(word)
    }

    for (const word of level) {
      const chars = word.split('')

      for (let index = 0; index < chars.length; index += 1) {
        const original = chars[index]

        for (let code = 97; code <= 122; code += 1) {
          const nextChar = String.fromCharCode(code)

          if (nextChar === original) {
            continue
          }

          chars[index] = nextChar
          const nextWord = chars.join('')

          if (!wordSet.has(nextWord)) {
            continue
          }

          if (!parents.has(nextWord)) {
            parents.set(nextWord, [])
          }

          parents.get(nextWord)!.push(word)
          nextLevel.add(nextWord)

          if (nextWord === endWord) {
            found = true
          }
        }

        chars[index] = original
      }
    }

    level = nextLevel
  }

  const result: string[][] = []
  const path = [endWord]

  const dfs = (word: string) => {
    if (word === beginWord) {
      result.push([...path].reverse())
      return
    }

    const prevWords = parents.get(word) ?? []

    for (const prevWord of prevWords) {
      path.push(prevWord)
      dfs(prevWord)
      path.pop()
    }
  }

  if (found) {
    dfs(endWord)
  }

  return result
}`,
      },
      {
        id: 'wl2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是 BFS 层级处理不对导致漏解，或者直接 DFS 爆炸。真正掌握后，你会对“最短路径 + 全部方案”的组合题更有感觉。',
        bullets: [
          '易错点 1：访问标记删得太早，导致漏掉同层前驱。',
          '易错点 2：没有先用 BFS 锁定最短层。',
          '易错点 3：存完整路径跑 BFS，内存压力过大。',
          '延伸方向：最短路径打印、无权图 BFS、双向 BFS。',
        ],
        callout:
          '图题一旦同时要求“最短”和“所有方案”，基本就该想到 BFS 负责定层，DFS 负责还原。',
      },
    ],
  },
  {
    id: 'word-ladder',
    label: '127. LeetCode 127. 单词接龙',
    difficulty: '困难',
    description:
      '这题是在练无权图最短路径。真正关键不是把单词问题想复杂，而是把每个单词看成图上的节点，再用 BFS 逐层推进。',
    outcome:
      '你能掌握无权图最短路径的 BFS 解法，理解为什么第一次到达终点时步数就是最短长度，并把这种“分层搜索”的思路迁移到更多图搜索题。',
    sections: [
      {
        id: 'wl-problem-summary',
        title: '题目在问什么',
        summary:
          '给定起点单词和终点单词，每次只能改一个字母且新单词必须在字典中，求最短转换序列长度。',
        bullets: [
          '每次只能改变一个字母。',
          '中间单词必须存在于字典。',
          '要求的是最短长度，不是所有方案。',
          '这是无权图最短路题。',
        ],
      },
      {
        id: 'wl-graph-view',
        title: '把单词想成节点，只差一个字母的两个单词之间连边',
        summary:
          '一旦这样抽象，题目就非常标准了：从 `beginWord` 出发，在无权图里找 `endWord` 的最短步数。无权图最短路的标准做法就是 BFS。',
        bullets: [
          '每个单词是一个节点。',
          '单字母可变换关系是一条边。',
          '边权都相同，因此 BFS 最合适。',
          '抽象正确后解法就自然了。',
        ],
      },
      {
        id: 'wl-bfs-layer',
        title: 'BFS 按层推进，第一次到达终点就是最短长度',
        summary:
          '因为 BFS 会先访问所有长度为 1 的路径，再访问长度为 2 的路径，以此类推。所以一旦某一层首次碰到终点，这一层的步数就是最短答案。',
        bullets: [
          '层数直接对应变换步数。',
          '无需比较所有路径长度。',
          '首次到达终点即可返回。',
          '这就是 BFS 在最短路中的优势。',
        ],
        callout:
          '只要题目是“无权图 + 最短步数”，BFS 基本就是第一反应，不需要先想 DFS。',
      },
      {
        id: 'wl-neighbor-generate',
        title: '邻居生成方式决定实现效率',
        summary:
          '对每个单词的每个位置，尝试替换成 `a-z` 的 26 个字符，就能生成所有可能邻居。若生成的新单词存在于字典中，就说明能走到它。',
        bullets: [
          '逐位置替换是通用做法。',
          '每次最多尝试 `单词长度 * 26` 次。',
          '字典用 Set 存储便于 O(1) 查找。',
          '访问过的词要及时删除或标记。',
        ],
      },
      {
        id: 'wl-optimal-solution',
        title: '标准解法：Set + BFS 队列',
        summary:
          '把字典放进 `Set` 中，队列中保存当前单词与步数。每弹出一个单词，就枚举所有一位变换的邻居。若邻居等于终点，返回当前步数加一；否则把没访问过的邻居入队并从集合移除。',
        bullets: [
          '时间复杂度取决于节点数与邻居生成成本。',
          '空间复杂度主要是队列和集合。',
          '核心是 BFS 分层和邻居生成。',
          '这是单词变换题的标准模板。',
        ],
        code: `function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[],
): number {
  const wordSet = new Set(wordList)

  if (!wordSet.has(endWord)) {
    return 0
  }

  const queue: Array<[string, number]> = [[beginWord, 1]]
  wordSet.delete(beginWord)

  while (queue.length) {
    const [word, steps] = queue.shift()!
    const chars = word.split('')

    for (let index = 0; index < chars.length; index += 1) {
      const original = chars[index]

      for (let code = 97; code <= 122; code += 1) {
        const nextChar = String.fromCharCode(code)

        if (nextChar === original) {
          continue
        }

        chars[index] = nextChar
        const nextWord = chars.join('')

        if (nextWord === endWord) {
          return steps + 1
        }

        if (wordSet.has(nextWord)) {
          queue.push([nextWord, steps + 1])
          wordSet.delete(nextWord)
        }
      }

      chars[index] = original
    }
  }

  return 0
}`,
      },
      {
        id: 'wl-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题常见错误是没有把问题抽象成图，或者访问标记做得太晚导致重复入队。真正掌握后，你会对 BFS 最短路模型更熟悉。',
        bullets: [
          '易错点 1：重复访问同一单词，导致性能恶化。',
          '易错点 2：把步数和层数关系写乱。',
          '易错点 3：没处理终点不在字典中的情况。',
          '延伸方向：双向 BFS、最短路径还原、单词图建模优化。',
        ],
        callout:
          '图搜索题一旦重复入队过多，性能会迅速崩掉，所以访问控制是第一优先级。',
      },
    ],
  },
  {
    id: 'longest-consecutive-sequence',
    label: '128. LeetCode 128. 最长连续序列',
    difficulty: '中等',
    description:
      '这题是在练哈希去重和“只从序列起点出发”的优化思路。真正关键不是排序，而是避免重复扫描同一段连续区间。',
    outcome:
      '你能掌握 Set 处理连续序列的经典做法，理解为什么只从没有前驱的数字开始扩展即可，并把这种“识别起点再线性扩展”的思路迁移到更多哈希题。',
    sections: [
      {
        id: 'lcs-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个未排序整数数组，求最长连续数字序列的长度，要求时间复杂度尽量接近线性。',
        bullets: [
          '数组无序。',
          '连续指的是值相差 1。',
          '要求最长长度。',
          '目标复杂度是 `O(n)` 级别。',
        ],
      },
      {
        id: 'lcs-why-not-sort',
        title: '排序能做，但不是题目最想考的点',
        summary:
          '排序后当然可以线性扫出最长连续段，但复杂度会变成 `O(n log n)`。题目真正想考的是能否利用哈希表把“某个数字是否存在”压到 O(1) 查询。',
        bullets: [
          '排序法思路简单但复杂度更高。',
          'Set 能提供 O(1) 级存在性查询。',
          '题目希望你用哈希解。',
          '这类题本质在于去重与快速查找。',
        ],
      },
      {
        id: 'lcs-sequence-start',
        title: '只有当 `num - 1` 不存在时，`num` 才可能是连续段起点',
        summary:
          '如果某个数前面还有 `num - 1`，那它只是某段连续序列的中间位置，没必要从它重新开始扫描。只有没有前驱的数字，才值得向后扩展整段序列。',
        bullets: [
          '识别起点能避免重复工作。',
          '中间点不需要重复扩展。',
          '每段连续序列只会被完整扫描一次。',
          '这就是线性复杂度的关键。',
        ],
        callout:
          '很多 `O(n)` 解法的本质，不是每次操作特别快，而是你成功避免了重复遍历。',
      },
      {
        id: 'lcs-expand',
        title: '从起点开始不断检查 `num + 1`、`num + 2` 是否存在',
        summary:
          '一旦确认 `num` 是起点，就持续向后检查下一位数字是否还在集合中，直到断开。这样就能算出以它为起点的连续段长度。',
        bullets: [
          '向后扩展逻辑很直接。',
          '集合判断存在性非常高效。',
          '每个数字最多参与一次扩展链。',
          '整体复杂度可控制在线性级别。',
        ],
      },
      {
        id: 'lcs-optimal-solution',
        title: '标准解法：Set 去重 + 只从起点扩展',
        summary:
          '先把所有数字放入 `Set`。遍历集合中的每个数字，若 `num - 1` 不存在，则以它为起点不断向后扩展并统计长度，用最大值更新答案即可。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '核心是“仅从起点出发”的去重思想。',
          '这是哈希表题的经典范式。',
        ],
        code: `function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums)
  let longest = 0

  for (const num of numSet) {
    if (numSet.has(num - 1)) {
      continue
    }

    let current = num
    let length = 1

    while (numSet.has(current + 1)) {
      current += 1
      length += 1
    }

    longest = Math.max(longest, length)
  }

  return longest
}`,
      },
      {
        id: 'lcs-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题常见错误是对每个数字都向前向后扫一遍，导致重复计算。真正掌握后，你会对“如何识别合法起点”更敏感。',
        bullets: [
          '易错点 1：没有去重，重复元素干扰判断。',
          '易错点 2：每个数字都完整扩展，复杂度退化。',
          '易错点 3：只想到排序法，错过哈希优化。',
          '延伸方向：最长等差序列、区间合并、哈希去重题。',
        ],
        callout:
          '看到“连续”“无序”“线性复杂度”这几个关键词同时出现，优先想到哈希集合通常不会错。',
      },
    ],
  },
  {
    id: 'sum-root-to-leaf-numbers',
    label: '129. LeetCode 129. 求根节点到叶节点数字之和',
    difficulty: '中等',
    description:
      '这题是在练树的前序 DFS 和路径状态累积。真正关键不是把路径存下来，而是理解当前路径值可以在递归过程中逐层滚动更新。',
    outcome:
      '你能掌握树上路径前缀值的递归写法，理解为什么每下探一层都只需要做一次 `previous * 10 + current`，并把这种路径状态传递思路迁移到更多树题。',
    sections: [
      {
        id: 'srtl-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一棵每个节点值都在 `0-9` 的二叉树，每条从根到叶子的路径都能组成一个数字，求所有这些数字之和。',
        bullets: [
          '节点值视为数字位。',
          '只统计根到叶子的完整路径。',
          '每条路径都会形成一个十进制数。',
          '这是典型的 DFS 路径题。',
        ],
      },
      {
        id: 'srtl-prefix-value',
        title: '路径数字可以像前缀一样滚动构造',
        summary:
          '假设到父节点时路径值是 `current`，走到子节点后，新路径值就是 `current * 10 + child.val`。这说明你根本不需要把整条路径字符串或数组存起来。',
        bullets: [
          '新节点相当于在数字末尾追加一位。',
          '十进制位移天然对应乘 10。',
          '路径值可以在递归参数里传递。',
          '状态设计非常简洁。',
        ],
      },
      {
        id: 'srtl-leaf-answer',
        title: '只有走到叶子节点，当前路径值才算一条完整答案',
        summary:
          '中间节点还没有形成完整路径，不能直接加入总和。只有当左右孩子都为空时，才能把当前累计值计入答案。',
        bullets: [
          '叶子节点意味着路径结束。',
          '中间节点只负责传递状态。',
          '判断叶子是整题的边界条件。',
          '这让递归收束很自然。',
        ],
        callout:
          '树题里很多 bug 都来自边界判断放错位置，尤其是“什么时候算一个完整答案”这件事。',
      },
      {
        id: 'srtl-preorder',
        title: '前序遍历最顺手，因为状态要先更新再往下传',
        summary:
          '当前节点值会参与子路径计算，所以应先算出新的路径值，再把它传给左右孩子。这种“先处理自己，再递归孩子”的结构天然就是前序 DFS。',
        bullets: [
          '当前节点先参与路径值构造。',
          '然后把新状态交给子节点。',
          '前序顺序与业务语义一致。',
          '实现简单直观。',
        ],
      },
      {
        id: 'srtl-optimal-solution',
        title: '标准解法：DFS 传递当前路径值',
        summary:
          '递归函数接收节点和当前前缀值，进入节点后计算 `nextValue = current * 10 + node.val`。若当前是叶子节点，返回 `nextValue`；否则返回左右子树结果之和。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是递归栈 `O(h)`。',
          '核心是路径值滚动更新。',
          '这是树上路径累积题的标准模板。',
        ],
        code: `function sumNumbers(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null, current: number): number => {
    if (!node) {
      return 0
    }

    const nextValue = current * 10 + node.val

    if (!node.left && !node.right) {
      return nextValue
    }

    return dfs(node.left, nextValue) + dfs(node.right, nextValue)
  }

  return dfs(root, 0)
}`,
      },
      {
        id: 'srtl-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题常见错误是把路径存成字符串再转数字，或者叶子判断时机不对。真正掌握后，你会对路径状态在递归中如何传递更熟练。',
        bullets: [
          '易错点 1：只要访问节点就累加结果，导致中间路径被误算。',
          '易错点 2：用字符串拼接，写法更笨重。',
          '易错点 3：忽略空树返回 0。',
          '延伸方向：路径总和、二叉树路径枚举、前缀状态 DFS。',
        ],
        callout:
          '递归参数如果能直接承载业务状态，就别额外开路径数组，那通常只会增加复杂度。',
      },
    ],
  },
  {
    id: 'surrounded-regions',
    label: '130. LeetCode 130. 被围绕的区域',
    difficulty: '中等',
    description:
      '这题是在练二维网格中的逆向思考。真正关键不是直接找哪些 `O` 要翻，而是先找出哪些 `O` 一定不能翻。',
    outcome:
      '你能掌握从边界反推可保留区域的网格搜索思路，理解为什么与边界连通的 `O` 必须保留，并把这种“先标记安全区再处理剩余部分”的思路迁移到更多矩阵题。',
    sections: [
      {
        id: 'sr-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个由 `X` 和 `O` 组成的矩阵，把所有被 `X` 完全包围的 `O` 翻成 `X`。',
        bullets: [
          '只翻转被完全包围的 `O`。',
          '与边界连通的 `O` 不能翻。',
          '矩阵会被原地修改。',
          '这是网格搜索中的经典题。',
        ],
      },
      {
        id: 'sr-reverse-thinking',
        title: '直接找“该翻谁”很难，先找“不能翻谁”更简单',
        summary:
          '被包围的定义是：它无法接触边界。那反过来说，只要某个 `O` 能通过上下左右连到边界，它就一定安全。于是先从边界出发，把所有安全 `O` 标记出来。',
        bullets: [
          '逆向思考能大幅简化问题。',
          '边界连通 `O` 全部安全。',
          '剩余未标记的 `O` 才需要翻转。',
          '这是这题最关键的思路。',
        ],
      },
      {
        id: 'sr-border-search',
        title: '从四条边上的 `O` 出发做 DFS 或 BFS',
        summary:
          '遍历矩阵边界，一旦碰到 `O`，就用 DFS 或 BFS 把所有与它连通的 `O` 临时标记成特殊字符，例如 `#`。这些都是不能被翻转的区域。',
        bullets: [
          '搜索起点只来自边界。',
          '连通方向是上下左右。',
          '临时标记用于区分安全区。',
          '搜索完成后再统一清算。',
        ],
        callout:
          '网格题里“从边界反推内部”是高频技巧，尤其适合处理逃逸、包围、岛屿这类问题。',
      },
      {
        id: 'sr-final-pass',
        title: '最后统一扫一遍矩阵，分两类处理',
        summary:
          '所有仍然是 `O` 的格子说明没能连到边界，应该翻成 `X`；所有临时标记成 `#` 的格子，则恢复为 `O`。这样就能一次性完成原地修改。',
        bullets: [
          '未标记 `O` 代表被包围。',
          '临时标记要恢复原状。',
          '最终只需再扫一遍矩阵。',
          '实现层次非常清楚。',
        ],
      },
      {
        id: 'sr-optimal-solution',
        title: '标准解法：边界 DFS 标记安全区',
        summary:
          '先遍历四周边界，对每个边界 `O` 执行 DFS，将连通区域标记为 `#`。接着遍历整个矩阵，把 `O` 变成 `X`，再把 `#` 恢复成 `O`。',
        bullets: [
          '时间复杂度是 `O(m * n)`。',
          '空间复杂度取决于递归栈或队列。',
          '核心是边界反向标记安全区。',
          '这是包围类网格题的经典模板。',
        ],
        code: `function solve(board: string[][]): void {
  if (!board.length || !board[0].length) {
    return
  }

  const rows = board.length
  const cols = board[0].length

  const dfs = (row: number, col: number) => {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      board[row][col] !== 'O'
    ) {
      return
    }

    board[row][col] = '#'

    dfs(row - 1, col)
    dfs(row + 1, col)
    dfs(row, col - 1)
    dfs(row, col + 1)
  }

  for (let row = 0; row < rows; row += 1) {
    dfs(row, 0)
    dfs(row, cols - 1)
  }

  for (let col = 0; col < cols; col += 1) {
    dfs(0, col)
    dfs(rows - 1, col)
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (board[row][col] === 'O') {
        board[row][col] = 'X'
      } else if (board[row][col] === '#') {
        board[row][col] = 'O'
      }
    }
  }
}`,
      },
      {
        id: 'sr-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题常见错误是直接从内部找被围区域，思路会非常绕。真正掌握后，你会对网格题中的“安全区标记”更敏感。',
        bullets: [
          '易错点 1：没从边界出发，导致判断逻辑复杂。',
          '易错点 2：临时标记字符和原字符混淆。',
          '易错点 3：忘了处理空矩阵。',
          '延伸方向：岛屿数量、飞地数量、太平洋大西洋水流问题。',
        ],
        callout:
          '二维矩阵题一旦有“边界是否可达”的味道，就该优先考虑从边界开始反向搜索。',
      },
    ],
  },
  {
    id: 'palindrome-partitioning',
    label: '131. LeetCode 131. 分割回文串',
    difficulty: '中等',
    description:
      '这题是在练回溯搜索和回文判断优化。真正关键不是盲目切割，而是每一步只扩展“当前切出来就是回文”的分支。',
    outcome:
      '你能掌握字符串分割类回溯题的写法，理解为什么路径上的每一段都必须先满足约束才能继续深入，并把这种“剪枝后再搜索”的思路迁移到更多回溯题。',
    sections: [
      {
        id: 'pp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串，要求把它分割成若干子串，并返回所有满足“每个子串都是回文串”的分割方案。',
        bullets: [
          '要输出所有合法分割方案。',
          '每一段都必须是回文。',
          '这不是求数量，而是求完整方案。',
          '这是回溯题的典型结构。',
        ],
      },
      {
        id: 'pp-search-tree',
        title: '每个切割位置，都会决定搜索树如何向下展开',
        summary:
          '从某个起点出发，你可以尝试把 `s[start...end]` 切成当前这一段。如果这段是回文，就把它加入路径，然后从 `end + 1` 继续搜索；否则这条分支直接剪掉。',
        bullets: [
          '每次选择一段作为当前切片。',
          '合法性判断决定是否继续递归。',
          '搜索树的深度取决于切分次数。',
          '这正是回溯模板的标准形态。',
        ],
      },
      {
        id: 'pp-palindrome-check',
        title: '回文判断可以现场双指针，也可以预处理 DP',
        summary:
          '如果直接在回溯时用双指针判断某段是否回文，代码最直观。若想进一步优化，可以预处理 `dp[left][right]` 表示子串是否回文，减少重复判断。',
        bullets: [
          '现场判断实现简单。',
          '预处理 DP 可以减少重复计算。',
          '两种方法都常见。',
          '入门阶段先写清回溯更重要。',
        ],
        callout:
          '回溯题里优化不是第一目标，先把搜索树和剪枝条件说清，比一上来追求最优复杂度更重要。',
      },
      {
        id: 'pp-termination',
        title: '当起点走到字符串末尾，就得到一套完整方案',
        summary:
          '递归参数 `start` 表示下一段从哪里开始切。当 `start === s.length` 时，说明整个字符串都已经被合法分割，此时把当前路径拷贝进答案。',
        bullets: [
          '递归终点是起点走到末尾。',
          '当前路径就是一组完整方案。',
          '加入答案前要做拷贝。',
          '这是组合回溯题的固定套路。',
        ],
      },
      {
        id: 'pp-optimal-solution',
        title: '标准解法：回溯枚举切分 + 双指针判断回文',
        summary:
          '编写 `dfs(start)` 表示从 `start` 位置继续切分。枚举每个结束位置 `end`，若当前子串是回文，则入路径并递归处理后半段，回溯时再弹出路径。所有到达末尾的路径都加入结果。',
        bullets: [
          '时间复杂度与答案规模相关。',
          '空间复杂度取决于递归深度和结果集。',
          '核心是“先验证、再扩展”的剪枝思想。',
          '这是字符串分割回溯题的标准模板。',
        ],
        code: `function partition(s: string): string[][] {
  const result: string[][] = []
  const path: string[] = []

  const isPalindrome = (left: number, right: number): boolean => {
    let start = left
    let end = right

    while (start < end) {
      if (s[start] !== s[end]) {
        return false
      }

      start += 1
      end -= 1
    }

    return true
  }

  const dfs = (start: number) => {
    if (start === s.length) {
      result.push([...path])
      return
    }

    for (let end = start; end < s.length; end += 1) {
      if (!isPalindrome(start, end)) {
        continue
      }

      path.push(s.slice(start, end + 1))
      dfs(end + 1)
      path.pop()
    }
  }

  dfs(0)

  return result
}`,
      },
      {
        id: 'pp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题常见错误是没有在递归前先判断回文，或者路径回溯不完整。真正掌握后，你会对字符串切分类回溯更熟悉。',
        bullets: [
          '易错点 1：每次都无脑切分，缺少剪枝。',
          '易错点 2：加入答案时没有拷贝路径。',
          '易错点 3：回文判断边界写错。',
          '延伸方向：复原 IP 地址、分割等和子集、括号生成、回文子串 DP。',
        ],
        callout:
          '回溯题真正拉开差距的点，不是会不会写模板，而是你能不能提前识别哪些分支根本没必要继续走。',
      },
    ],
  },
  {
    id: 'palindrome-partitioning-ii',
    label: '132. LeetCode 132. 分割回文串 II',
    difficulty: '困难',
    description:
      '这题是在练区间回文预处理和最小切割 DP。真正关键不是暴力试所有切法，而是先把“哪些子串是回文”预处理好，再去做最优切割决策。',
    outcome:
      '你能掌握回文预处理配合一维 DP 的经典套路，理解为什么最小切割可以转成前缀最优问题，并把这种“先判合法区间，再做最优转移”的思路迁移到更多字符串 DP 题。',
    sections: [
      {
        id: 'pp2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串，要求把它切成若干回文子串，并返回最少需要切多少刀。',
        bullets: [
          '每一段都必须是回文。',
          '目标是切割次数最少。',
          '不是求所有方案，而是求最优值。',
          '这是回文 + DP 的经典组合题。',
        ],
      },
      {
        id: 'pp2-why-precompute',
        title: '如果每次转移都现场判回文，重复成本会非常高',
        summary:
          '在考虑某个位置怎么切时，你会频繁问“`s[left...right]` 是否回文”。这类重复判断特别适合预处理成二维表，之后查询就能变成 O(1)。',
        bullets: [
          '回文判断会被重复调用很多次。',
          '二维表可以缓存区间合法性。',
          '预处理后主 DP 会更清晰。',
          '这是字符串区间题的常规优化。',
        ],
      },
      {
        id: 'pp2-dp-view',
        title: '最少切割次数，本质上是前缀最优问题',
        summary:
          '设 `dp[i]` 表示前 `i` 个字符最少切多少刀。如果某段 `s[j...i]` 是回文，那么可以从 `dp[j - 1]` 转移过来。若 `j === 0`，说明整个前缀本身就是回文，不需要切割。',
        bullets: [
          '状态关注的是前缀最优值。',
          '每次尝试最后一段从哪里开始。',
          '最后一段必须先是回文才可转移。',
          '这让状态转移十分稳定。',
        ],
        callout:
          '很多字符串最优划分题，最后都会落到“枚举最后一段”的 DP 模式上。',
      },
      {
        id: 'pp2-palindrome-table',
        title: '回文表通常从短区间向长区间递推',
        summary:
          '区间 `s[left...right]` 是否是回文，取决于两端字符是否相等，以及内部 `s[left + 1...right - 1]` 是否回文。所以可以按右端点递增、左端点递减的顺序填表。',
        bullets: [
          '长度 1 的区间天然是回文。',
          '长度 2 看两端是否相等。',
          '更长区间依赖更短区间。',
          '填表顺序必须满足依赖关系。',
        ],
      },
      {
        id: 'pp2-optimal-solution',
        title: '标准解法：回文预处理 + 一维 DP',
        summary:
          '先预处理 `isPalindrome[left][right]`，再用 `dp[right]` 表示 `0...right` 的最少切割次数。若 `0...right` 本身是回文，则 `dp[right] = 0`；否则枚举所有可能起点 `left`，若 `left...right` 是回文，就尝试 `dp[left - 1] + 1`。',
        bullets: [
          '时间复杂度是 `O(n^2)`。',
          '空间复杂度是 `O(n^2)`。',
          '核心是先求合法区间，再求最优切法。',
          '这是回文切分类题的标准模板。',
        ],
        code: `function minCut(s: string): number {
  const length = s.length
  const isPalindrome = Array.from({ length }, () => Array(length).fill(false))

  for (let right = 0; right < length; right += 1) {
    for (let left = right; left >= 0; left -= 1) {
      if (
        s[left] === s[right] &&
        (right - left <= 2 || isPalindrome[left + 1][right - 1])
      ) {
        isPalindrome[left][right] = true
      }
    }
  }

  const dp = Array(length).fill(0)

  for (let right = 0; right < length; right += 1) {
    if (isPalindrome[0][right]) {
      dp[right] = 0
      continue
    }

    let best = Infinity

    for (let left = 1; left <= right; left += 1) {
      if (isPalindrome[left][right]) {
        best = Math.min(best, dp[left - 1] + 1)
      }
    }

    dp[right] = best
  }

  return dp[length - 1]
}`,
      },
      {
        id: 'pp2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是回文表下标越界或把“段数”与“切割次数”混淆。真正掌握后，你会对区间预处理配合一维 DP 更熟练。',
        bullets: [
          '易错点 1：`left === 0` 时仍去访问 `dp[left - 1]`。',
          '易错点 2：回文表填充顺序错误。',
          '易错点 3：把最少段数直接当成最少切割次数。',
          '延伸方向：回文子串、最长回文子串、区间 DP、字符串划分题。',
        ],
        callout:
          '区间合法性一旦能被预处理，很多原本看起来很乱的字符串题都会立刻规整下来。',
      },
    ],
  },
  {
    id: 'clone-graph',
    label: '133. LeetCode 133. 克隆图',
    difficulty: '中等',
    description:
      '这题是在练图遍历和哈希映射。真正关键不是复制节点本身，而是保证原图中的同一个节点，无论从哪条边访问，都只会对应到同一个新节点。',
    outcome:
      '你能掌握图拷贝题的映射思路，理解为什么必须先建立“原节点 -> 新节点”的对应关系，并把这种“先建映射、再递归连边”的写法迁移到更多图和链式结构题。',
    sections: [
      {
        id: 'cg-problem-summary',
        title: '题目在问什么',
        summary: '给定一个无向连通图中的某个节点，要求返回这张图的深拷贝。',
        bullets: [
          '每个节点都要复制成新对象。',
          '邻接关系也要完整复制。',
          '不能复用原图节点。',
          '这是图结构拷贝题。',
        ],
      },
      {
        id: 'cg-why-map-first',
        title: '图里有环，如果不先建映射，就会无限递归或重复建点',
        summary:
          '图不像树，没有天然的单向父子关系。一个节点可能被多条边反复访问。如果每次访问都新建副本，就会产生多个重复节点；如果没有访问记录，还会在环里无限绕圈。',
        bullets: [
          '图中节点可能重复访问。',
          '无向图尤其容易形成环。',
          '映射表既能去重，也能防止死循环。',
          '这是整题的核心数据结构。',
        ],
      },
      {
        id: 'cg-dfs-idea',
        title: 'DFS 的典型写法，是先克隆自己，再递归克隆邻居',
        summary:
          '当你第一次遇到一个原节点时，立刻创建对应的新节点并放进 `Map`。之后遍历它的邻居，把递归返回的新邻居节点挂到当前新节点的邻接表中。',
        bullets: [
          '先建点，再连边。',
          '递归返回的是邻居的克隆节点。',
          '`Map` 保证同一原节点只克隆一次。',
          '逻辑非常适合 DFS 表达。',
        ],
        callout:
          '处理引用关系时，第一优先级往往不是“怎么遍历”，而是“如何保证对象身份不重复”。',
      },
      {
        id: 'cg-bfs-alternative',
        title: 'BFS 也能做，但核心仍然是那张映射表',
        summary:
          '无论你用 DFS 还是 BFS，真正不可替代的部分都不是遍历顺序，而是“原节点和新节点的唯一对应关系”。遍历方式只是实现细节。',
        bullets: [
          'DFS 和 BFS 都能覆盖整张图。',
          '两者都必须依赖映射表。',
          '遍历顺序不影响正确性。',
          '选自己更顺手的实现即可。',
        ],
      },
      {
        id: 'cg-optimal-solution',
        title: '标准解法：DFS + Map 建立节点映射',
        summary:
          '递归函数接收原节点，若为空返回空；若已克隆过则直接返回映射中的新节点；否则先创建新节点并放入映射，再递归处理所有邻居并挂载到 `neighbors` 中。',
        bullets: [
          '时间复杂度是 `O(V + E)`。',
          '空间复杂度是 `O(V)`。',
          '核心是 `Map` 保证唯一克隆身份。',
          '这是图拷贝题的标准模板。',
        ],
        code: `function cloneGraph(node: Node | null): Node | null {
  if (!node) {
    return null
  }

  const visited = new Map<Node, Node>()

  const dfs = (current: Node): Node => {
    const clonedNode = visited.get(current)

    if (clonedNode) {
      return clonedNode
    }

    const copy = new Node(current.val)
    visited.set(current, copy)

    for (const neighbor of current.neighbors) {
      copy.neighbors.push(dfs(neighbor))
    }

    return copy
  }

  return dfs(node)
}`,
      },
      {
        id: 'cg-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是克隆完节点却忘了缓存，或者把邻居数组浅拷贝过去。真正掌握后，你会对带引用结构的深拷贝更敏感。',
        bullets: [
          '易错点 1：没有在递归前及时 `visited.set`。',
          '易错点 2：把原邻居数组直接赋给新节点。',
          '易错点 3：空节点没有单独处理。',
          '延伸方向：课程表、图遍历、随机指针链表拷贝、对象图深拷贝。',
        ],
        callout:
          '一旦结构里存在共享引用或环，深拷贝问题本质上就变成了“映射表 + 图遍历”。',
      },
    ],
  },
  {
    id: 'gas-station',
    label: '134. LeetCode 134. 加油站',
    difficulty: '中等',
    description:
      '这题是在练贪心和区间失败剪枝。真正关键不是从每个站都试一遍，而是理解：如果从某个起点出发在中途失败，那么这段区间里的任何站都不可能作为合法起点。',
    outcome:
      '你能掌握环形数组中的贪心跳跃思路，理解为什么失败区间可以整体排除，并把这种“局部失败推出整段无解”的思路迁移到更多贪心题。',
    sections: [
      {
        id: 'gs-problem-summary',
        title: '题目在问什么',
        summary:
          '给定每个加油站可加的油量和到下一站消耗的油量，问是否存在一个起点，使你能绕环路一周；若存在，返回该起点下标。',
        bullets: [
          '赛道是环形的。',
          '每站可以先加油再出发。',
          '若可行，题目保证答案唯一。',
          '这是经典贪心题。',
        ],
      },
      {
        id: 'gs-total-condition',
        title: '总油量小于总消耗时，任何起点都不可能成功',
        summary:
          '这是最先要判断的全局条件。若所有站的油加起来都不够跑完全程，那不管起点选哪都无解，可以直接返回 `-1`。',
        bullets: [
          '总量约束决定是否存在解。',
          '这是必要条件。',
          '能提前剪掉无解情况。',
          '后续贪心建立在它成立的基础上。',
        ],
      },
      {
        id: 'gs-failure-prune',
        title:
          '如果从起点 `start` 在 `i` 站失败，那么 `start...i` 都不可能作为起点',
        summary:
          '因为从 `start` 到 `i` 之前的累计油量已经把这段区间能拿到的油都算过了，仍然到不了下一站。那么从中间任何一个点再开始，只会少拿前面的油，不可能更好。',
        bullets: [
          '失败位置提供了强剪枝信息。',
          '整段区间都能被一次性排除。',
          '这让算法不必回头重试每个点。',
          '是线性贪心成立的核心。',
        ],
        callout:
          '贪心真正厉害的地方，是一次失败就能推掉一大片候选，而不是只排除一个点。',
      },
      {
        id: 'gs-running-balance',
        title: '线性扫描时，只要当前油量为负，就把下一站当成新起点',
        summary:
          '维护从当前候选起点出发的油量余额 `tank`。一旦 `tank < 0`，说明当前候选起点不成立，于是直接把起点改成 `i + 1`，并把余额重置为 0。',
        bullets: [
          '只维护当前候选区间的余额。',
          '余额为负代表当前起点失败。',
          '下一个站才有资格成为新候选。',
          '实现上只需一次遍历。',
        ],
      },
      {
        id: 'gs-optimal-solution',
        title: '标准解法：总量判断 + 一次遍历贪心',
        summary:
          '先统计总剩余油量 `total += gas[i] - cost[i]`。同时维护当前候选起点的余额 `tank`。若 `tank` 降为负数，就将起点改为 `i + 1` 并清零 `tank`。遍历结束后，若 `total >= 0`，返回候选起点，否则返回 `-1`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是失败区间整体排除。',
          '这是环形贪心题的经典模板。',
        ],
        code: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  let total = 0
  let tank = 0
  let start = 0

  for (let index = 0; index < gas.length; index += 1) {
    const diff = gas[index] - cost[index]
    total += diff
    tank += diff

    if (tank < 0) {
      start = index + 1
      tank = 0
    }
  }

  return total >= 0 ? start : -1
}`,
      },
      {
        id: 'gs-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有先做总量判断，或者不知道为什么失败区间能整体跳过。真正掌握后，你会对这类线性贪心剪枝更有感觉。',
        bullets: [
          '易错点 1：`tank < 0` 后仍尝试保留旧起点。',
          '易错点 2：漏掉总油量不足的无解判断。',
          '易错点 3：把答案理解成可能有多个还要比较。',
          '延伸方向：跳跃游戏、区间覆盖、环形数组贪心题。',
        ],
        callout:
          '一旦你能清楚证明“失败区间整体无效”，这类题就会从枚举题降维成一次扫描题。',
      },
    ],
  },
  {
    id: 'candy',
    label: '135. LeetCode 135. 分发糖果',
    difficulty: '困难',
    description:
      '这题是在练双向约束下的贪心分配。真正关键不是边走边贪，而是意识到“比左边高”和“比右边高”是两套独立约束，需要分别满足后再合并。',
    outcome:
      '你能掌握双向扫描解决局部相邻约束问题的思路，理解为什么左右两侧要求需要独立处理，并把这种“两边各做一次约束累积”的方法迁移到更多数组题。',
    sections: [
      {
        id: 'candy-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一组孩子评分，要求每个孩子至少 1 颗糖，且评分更高的孩子必须比相邻孩子拿更多，求最少需要多少糖。',
        bullets: [
          '每个人至少 1 颗糖。',
          '相邻评分高者糖果更多。',
          '目标是总糖果数最小。',
          '这是相邻约束贪心题。',
        ],
      },
      {
        id: 'candy-one-direction-not-enough',
        title: '只从左往右扫，无法同时满足右侧约束',
        summary:
          '从左往右可以保证“比左边高就多拿一颗”，但无法处理“某人虽然不比左边高，却比右边高”的情况。所以只做单向贪心是不够的。',
        bullets: [
          '左到右只能满足左侧关系。',
          '右到左才能补上右侧关系。',
          '两个方向的约束彼此独立。',
          '这决定了整题必须至少两遍扫描。',
        ],
      },
      {
        id: 'candy-two-pass-idea',
        title: '先满足左规则，再满足右规则，最后取两者最大值',
        summary:
          '可以分别构造两个数组：`left[i]` 表示为了满足左邻约束，`i` 至少拿多少；`right[i]` 表示为了满足右邻约束，`i` 至少拿多少。最终每个位置取两者较大值，才能同时满足两边规则。',
        bullets: [
          '左右约束拆开看更清楚。',
          '每边都能线性处理。',
          '最终用最大值合并两种下界。',
          '这是一种非常典型的双向贪心结构。',
        ],
        callout:
          '遇到“同时受左边和右边影响”的题，先别急着写一个万能规则，通常拆成两个单向约束更稳。',
      },
      {
        id: 'candy-why-max',
        title: '取最大值，不是取和，因为每个孩子只需要满足更严格的那一侧',
        summary:
          '左右两个数组本质上都在给当前位置设“最低下限”。如果左边要求至少 3、右边要求至少 2，那么给 3 就已经同时满足，不必把两个要求累加。',
        bullets: [
          '左右数组表示的是下界，不是独立份额。',
          '满足更大的那个下界即可。',
          '取和会重复计算。',
          '理解语义比记公式更重要。',
        ],
      },
      {
        id: 'candy-optimal-solution',
        title: '标准解法：左右两遍扫描',
        summary:
          '先把 `left` 全部初始化为 1，从左往右扫描，若当前评分比左边高，则 `left[i] = left[i - 1] + 1`。再从右往左维护 `right` 需求，累加每个位置的 `Math.max(left[i], right)` 即可。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度可做到 `O(n)` 或优化到 `O(1)` 辅助。',
          '核心是双向约束分开处理。',
          '这是相邻评分分配题的标准模板。',
        ],
        code: `function candy(ratings: number[]): number {
  const left = Array(ratings.length).fill(1)

  for (let index = 1; index < ratings.length; index += 1) {
    if (ratings[index] > ratings[index - 1]) {
      left[index] = left[index - 1] + 1
    }
  }

  let total = 0
  let right = 1

  for (let index = ratings.length - 1; index >= 0; index -= 1) {
    if (index < ratings.length - 1 && ratings[index] > ratings[index + 1]) {
      right += 1
    } else {
      right = 1
    }

    total += Math.max(left[index], right)
  }

  return total
}`,
      },
      {
        id: 'candy-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是试图一遍扫描同时处理两边关系。真正掌握后，你会对双向约束拆分更敏感。',
        bullets: [
          '易错点 1：只扫描一次，漏掉右侧更高约束。',
          '易错点 2：最终把左右需求相加。',
          '易错点 3：相等评分时错误增加糖果。',
          '延伸方向：接雨水、柱状图、双向前后缀约束题。',
        ],
        callout:
          '双向限制题很多都不是“想一个更聪明的单规则”，而是老老实实把两个方向分开做。',
      },
    ],
  },
  {
    id: 'single-number',
    label: '136. LeetCode 136. 只出现一次的数字',
    difficulty: '简单',
    description:
      '这题是在练位运算中的异或性质。真正关键不是记住技巧，而是理解为什么“成对出现”的数在异或后会被完全抵消。',
    outcome:
      '你能掌握异或在去重问题中的基础用法，理解 `a ^ a = 0` 和 `a ^ 0 = a` 如何直接导出线性时间常数空间解，并把这种位运算思路迁移到更多数值题。',
    sections: [
      {
        id: 'sn-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个非空整数数组，除了某个元素只出现一次以外，其余元素都出现两次，要求找出那个只出现一次的元素。',
        bullets: [
          '只有一个元素出现一次。',
          '其余元素都恰好出现两次。',
          '要求线性时间最好还能常数空间。',
          '这是位运算经典入门题。',
        ],
      },
      {
        id: 'sn-xor-properties',
        title: '异或的两个性质，刚好和题目结构完美匹配',
        summary:
          '`a ^ a = 0` 说明成对元素会相互抵消，`a ^ 0 = a` 说明最后剩下的就是答案。再加上异或满足交换律和结合律，遍历顺序完全不影响结果。',
        bullets: [
          '相同数字异或后为 0。',
          '0 与任何数异或仍是该数。',
          '交换律让元素顺序无关紧要。',
          '结合律让我们可以一路累计。',
        ],
      },
      {
        id: 'sn-why-better-than-map',
        title: '哈希表当然能做，但它不是题目最想考的解法',
        summary:
          '用 `Map` 统计次数可以直接找到答案，但空间复杂度是 `O(n)`。这题真正经典的地方在于，利用位运算可以把额外空间压到 `O(1)`。',
        bullets: [
          '哈希法更直观。',
          '异或法更优雅也更省空间。',
          '题目结构专门为位运算设计。',
          '这种题要敏感识别“成对抵消”的信号。',
        ],
        callout:
          '看到“除了一个以外，其余都成对出现”，大脑里应该立刻亮起异或这盏灯。',
      },
      {
        id: 'sn-running-xor',
        title: '从 0 开始一路异或，最后自然只剩答案',
        summary:
          '初始化 `result = 0`，然后依次执行 `result ^= num`。每对相同数字都会在某个阶段被抵消掉，最终保留下来的就只有那个只出现一次的元素。',
        bullets: [
          '初始化为 0 最自然。',
          '每读一个数就并入累计结果。',
          '重复数字会自动消失。',
          '实现几乎没有边界负担。',
        ],
      },
      {
        id: 'sn-optimal-solution',
        title: '标准解法：遍历数组累积异或',
        summary:
          '遍历整个数组，把每个元素都异或进结果变量中。循环结束后，结果变量就是只出现一次的数字。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是异或抵消成对元素。',
          '这是位运算题最基础也最重要的模板之一。',
        ],
        code: `function singleNumber(nums: number[]): number {
  let result = 0

  for (const num of nums) {
    result ^= num
  }

  return result
}`,
      },
      {
        id: 'sn-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，不是代码写错，而是看到位运算就发怵。真正掌握后，你会对“出现次数模式”这类题更敏感。',
        bullets: [
          '易错点 1：误以为异或只适用于正数。',
          '易错点 2：把题目写成排序或哈希统计，错过最优解。',
          '易错点 3：没理解交换律和结合律为何保证正确性。',
          '延伸方向：只出现一次的数字 II、III，位计数，掩码状态压缩。',
        ],
        callout:
          '位运算题不该靠死记，真正有价值的是把“数据出现规律”和“位运算性质”对上号。',
      },
    ],
  },
  {
    id: 'single-number-ii',
    label: '137. LeetCode 137. 只出现一次的数字 II',
    difficulty: '中等',
    description:
      '这题是在练位运算与按位计数。真正关键不是继续套异或，而是识别出“其余数字都出现三次”会让每一位上的 1 的总数呈现出对 3 取模的规律。',
    outcome:
      '你能掌握按位统计处理“重复次数有规律”的数值题，理解为什么每一位都可以独立对 3 取模恢复目标数，并把这种位计数思路迁移到更多出现次数类题目。',
    sections: [
      {
        id: 'sn2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个整数数组，除了某个元素只出现一次以外，其余元素都恰好出现三次，要求找出那个只出现一次的元素。',
        bullets: [
          '目标数只出现一次。',
          '其余数都出现三次。',
          '要求尽量线性时间和常数空间。',
          '这是位运算进阶题。',
        ],
      },
      {
        id: 'sn2-why-xor-not-enough',
        title: '异或只能抵消成对元素，这题必须换思路',
        summary:
          '在上一题里，`a ^ a = 0` 正好能消掉两次出现的数。但这里其余数字出现三次，单纯异或后并不会归零，所以不能继续机械套上一题模板。',
        bullets: [
          '异或天然适合处理成对抵消。',
          '出现三次时，异或结果不会自动归零。',
          '必须利用“3 次”这个结构性信息。',
          '这是换模型的信号。',
        ],
      },
      {
        id: 'sn2-bit-count',
        title: '把每一位单独拿出来看，会发现总和对 3 取模后只剩目标数',
        summary:
          '对于整数的每一位，所有出现三次的数字在这一位上贡献的 1 的数量，一定是 3 的倍数。只有那个只出现一次的数字，会额外留下 0 或 1。于是每一位统计总数后对 3 取模，就能恢复答案的该位。',
        bullets: [
          '每一位都可以独立统计。',
          '出现三次的贡献天然被 3 整除。',
          '取模后只剩目标数的信息。',
          '整题被拆成 32 个独立的小问题。',
        ],
        callout:
          '位运算题很多时候不是在“算得快”，而是在利用出现次数规律把复杂问题拆成逐位恢复。',
      },
      {
        id: 'sn2-negative-number',
        title: '负数同样能处理，但要按固定二进制位宽恢复',
        summary:
          '如果语言使用固定宽度整数，例如 32 位，那么最高位也按普通二进制位统计即可。对于 JavaScript，需要借助位运算语义按 32 位有符号整数处理，最终结果也会自动落回正确范围。',
        bullets: [
          '符号位本质上也是一位。',
          '按固定 32 位统计更稳妥。',
          'JavaScript 位运算会走 32 位有符号整数。',
          '这能兼容负数场景。',
        ],
      },
      {
        id: 'sn2-optimal-solution',
        title: '标准解法：逐位统计后对 3 取模',
        summary:
          '遍历 32 个二进制位。对每一位统计数组中有多少数字在该位上是 1，若计数对 3 取模后不为 0，就说明目标数该位应为 1，再把这一位写回结果即可。',
        bullets: [
          '时间复杂度是 `O(32n)`，也就是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是按位独立统计。',
          '这是出现次数型位运算题的标准模板。',
        ],
        code: `function singleNumber(nums: number[]): number {
  let result = 0

  for (let bit = 0; bit < 32; bit += 1) {
    let count = 0

    for (const num of nums) {
      count += (num >> bit) & 1
    }

    if (count % 3 !== 0) {
      result |= 1 << bit
    }
  }

  return result
}`,
      },
      {
        id: 'sn2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是仍然执着于异或，或者负数位处理含糊。真正掌握后，你会对“按位统计 + 模运算”更敏感。',
        bullets: [
          '易错点 1：继续套用上一题异或模板。',
          '易错点 2：忽略负数下的符号位。',
          '易错点 3：把时间复杂度误判成 `O(32n)` 不是线性。',
          '延伸方向：只出现一次的数字 III、位掩码状态压缩、有限状态位机写法。',
        ],
        callout:
          '一旦出现次数从 2 变成 3、5、k，往往就该从“抵消”切换到“计数取模”。',
      },
    ],
  },
  {
    id: 'copy-list-with-random-pointer',
    label: '138. LeetCode 138. 随机链表的复制',
    difficulty: '中等',
    description:
      '这题是在练带额外引用关系的数据结构拷贝。真正关键不是复制 next 链，而是保证 random 指针指向的仍是“对应的新节点”，而不是原链表节点或错误的新副本。',
    outcome:
      '你能掌握带共享引用结构的深拷贝思路，理解为什么原节点和新节点必须建立稳定映射，并把这种映射式拷贝方法迁移到图、树和复杂对象结构中。',
    sections: [
      {
        id: 'clwrp-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个链表，每个节点除了 `next` 指针外，还有一个 `random` 指针可以指向任意节点或空，要求返回这条链表的深拷贝。',
        bullets: [
          '每个节点都要新建副本。',
          'next 关系要保持。',
          'random 关系也要保持。',
          '这是引用结构拷贝题。',
        ],
      },
      {
        id: 'clwrp-why-map',
        title: 'random 让链表不再只是线性结构，必须建立节点映射',
        summary:
          '如果只有 `next`，你顺着复制就够了。但 `random` 可能指向前面、后面甚至自己。为了确保所有指针都能准确落到对应的新节点上，必须先有“原节点 -> 新节点”的映射表。',
        bullets: [
          'random 会打破单向线性关系。',
          '一个节点可能被多处引用。',
          '映射表能保证唯一对应关系。',
          '这是整题正确性的关键。',
        ],
      },
      {
        id: 'clwrp-two-pass',
        title: '最稳的写法，是先建所有新节点，再补 next 和 random',
        summary:
          '第一遍遍历原链表，只负责为每个原节点创建副本并放进 `Map`。第二遍再利用这张映射表，为每个新节点补上 `next` 和 `random`。这样逻辑最直接，也最不容易写乱。',
        bullets: [
          '第一遍只建点。',
          '第二遍统一补指针。',
          'next 和 random 都靠映射表完成。',
          '结构清晰，边界稳定。',
        ],
        callout:
          '处理复杂引用时，先把“对象身份”建立完整，再去连关系，通常比边建边猜更稳。',
      },
      {
        id: 'clwrp-weaving-idea',
        title: '还有一种 O(1) 额外空间写法，但核心思想不变',
        summary:
          '更进阶的做法会把新节点临时插进原链表里，通过“原节点后面紧跟副本节点”的结构来完成 random 连接，再拆分链表。它节省了映射表，但本质上仍然是在寻找原节点和副本节点的一一对应。',
        bullets: [
          '空间可进一步优化。',
          '实现复杂度会更高。',
          '本质仍是建立稳定映射关系。',
          '面试里先写清 `Map` 方案更稳。',
        ],
      },
      {
        id: 'clwrp-optimal-solution',
        title: '标准解法：Map 建节点映射，两遍补齐指针',
        summary:
          '第一遍遍历原链表，为每个原节点创建副本并存入 `Map`。第二遍取出副本节点，把它的 `next` 指向 `map.get(current.next)`，`random` 指向 `map.get(current.random)`。最后返回 `map.get(head)`。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '核心是原节点到新节点的稳定映射。',
          '这是复杂链表深拷贝的基础模板。',
        ],
        code: `function copyRandomList(head: Node | null): Node | null {
  if (!head) {
    return null
  }

  const nodeMap = new Map<Node, Node>()
  let current: Node | null = head

  while (current) {
    nodeMap.set(current, new Node(current.val))
    current = current.next
  }

  current = head

  while (current) {
    const cloned = nodeMap.get(current)!
    cloned.next = current.next ? nodeMap.get(current.next)! : null
    cloned.random = current.random ? nodeMap.get(current.random)! : null
    current = current.next
  }

  return nodeMap.get(head)!
}`,
      },
      {
        id: 'clwrp-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是新节点建出来了，但 random 仍指向旧链表。真正掌握后，你会对复杂引用结构的深拷贝更有方法感。',
        bullets: [
          '易错点 1：只复制 next，忘了正确处理 random。',
          '易错点 2：random 直接复用旧节点引用。',
          '易错点 3：空链表和空 random 边界漏处理。',
          '延伸方向：克隆图、对象图深拷贝、树节点带父指针结构复制。',
        ],
        callout: '深拷贝题真正难的不是“复制值”，而是“复制引用关系”。',
      },
    ],
  },
  {
    id: 'word-break',
    label: '139. LeetCode 139. 单词拆分',
    difficulty: '中等',
    description:
      '这题是在练前缀 DP 和字符串切分判定。真正关键不是枚举所有切法，而是判断某个前缀能否由字典词拼出来。',
    outcome:
      '你能掌握字符串可拆分判定的一维 DP 思路，理解为什么状态只需关心“前缀是否可达”，并把这种“枚举最后一段”的转移模式迁移到更多字符串划分题。',
    sections: [
      {
        id: 'wb-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串和一个单词字典，判断该字符串能否被拆分成若干个字典中出现的单词。',
        bullets: [
          '字典中的单词可以重复使用。',
          '要求的是能否拆分，不是所有方案。',
          '拆分后每一段都必须在字典中。',
          '这是字符串前缀 DP 题。',
        ],
      },
      {
        id: 'wb-prefix-state',
        title: '状态只需要描述“前 i 个字符能不能被合法拆分”',
        summary:
          '设 `dp[i]` 表示字符串前 `i` 个字符是否可以由字典词拼成。如果存在某个位置 `j < i`，使得 `dp[j]` 为真，且子串 `s[j...i-1]` 在字典中，那么 `dp[i]` 就可以成立。',
        bullets: [
          '状态关注的是前缀可达性。',
          '每次尝试最后一段从哪里开始。',
          '前一段必须已可达。',
          '最后一段必须命中字典。',
        ],
      },
      {
        id: 'wb-why-set',
        title: '字典一定要放进 Set，否则子串查询成本会拖慢整体效率',
        summary:
          'DP 本身就要枚举切分点，如果字典每次还用数组线性查找，会让复杂度继续放大。把词典放进 `Set` 后，能把“某段是否是单词”的判断压到均摊 O(1)。',
        bullets: [
          'Set 适合做快速存在性判断。',
          '能显著降低字典查询成本。',
          '和 DP 组合非常自然。',
          '这是整题实现的基础优化。',
        ],
        callout:
          'DP 题里很多优化并不来自花哨公式，而是你有没有先把辅助查询结构选对。',
      },
      {
        id: 'wb-last-segment',
        title: '整题本质就是不断枚举“最后一段”',
        summary:
          '对于前缀 `0...i-1`，你只需要尝试它的最后一个单词从哪里开始。只要存在一个切点 `j` 让前缀 `0...j-1` 可达，且 `j...i-1` 恰好是字典词，那么当前前缀就可达。',
        bullets: [
          '这是字符串划分题的高频转移模式。',
          '只要找到一个合法切点即可成立。',
          '因此状态值是布尔型。',
          '逻辑非常适合一维 DP 表达。',
        ],
      },
      {
        id: 'wb-optimal-solution',
        title: '标准解法：Set + 一维 DP',
        summary:
          '用 `dp[0] = true` 表示空字符串可达。之后从 `1` 到 `s.length` 遍历，每个位置再枚举切点 `j`。若 `dp[j]` 为真且 `s.slice(j, i)` 在 `Set` 中，就把 `dp[i]` 设为真并结束当前枚举。',
        bullets: [
          '时间复杂度通常是 `O(n^2)`。',
          '空间复杂度是 `O(n)`。',
          '核心是前缀可达 + 最后一段命中字典。',
          '这是单词拆分类题的标准模板。',
        ],
        code: `function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict)
  const dp = Array(s.length + 1).fill(false)
  dp[0] = true

  for (let end = 1; end <= s.length; end += 1) {
    for (let start = 0; start < end; start += 1) {
      if (dp[start] && wordSet.has(s.slice(start, end))) {
        dp[end] = true
        break
      }
    }
  }

  return dp[s.length]
}`,
      },
      {
        id: 'wb-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把状态定义得过复杂，或者把空前缀初始化漏掉。真正掌握后，你会对前缀 DP 划分类题更敏感。',
        bullets: [
          '易错点 1：忘记初始化 `dp[0] = true`。',
          '易错点 2：切片边界 `start/end` 写错。',
          '易错点 3：用数组查词典导致性能变差。',
          '延伸方向：单词拆分 II、最少切割、完全背包式字符串拼接题。',
        ],
        callout:
          '当题目开始问“一个字符串能不能被拆出来”时，先想前缀 DP，通常比先想回溯更稳。',
      },
    ],
  },
  {
    id: 'word-break-ii',
    label: '140. LeetCode 140. 单词拆分 II',
    difficulty: '困难',
    description:
      '这题是在练 DFS 回溯与记忆化搜索的结合。真正关键不是暴力切出所有可能，而是先识别哪些后缀已经求过，避免在同一个起点上反复展开整棵搜索树。',
    outcome:
      '你能掌握“可行性切分”升级到“枚举所有方案”时的搜索写法，理解为什么记忆化能剪掉大量重复子问题，并把这种“DFS + memo”思路迁移到更多字符串划分类题。',
    sections: [
      {
        id: 'wb2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串和单词字典，要求返回所有合法拆分方案，每个方案都由字典中的单词组成。',
        bullets: [
          '要输出所有合法句子。',
          '字典中的单词可以重复使用。',
          '不是判断能不能拆，而是要枚举所有方案。',
          '这是字符串回溯题。',
        ],
      },
      {
        id: 'wb2-why-not-pure-dfs',
        title: '直接纯 DFS 会在同一个后缀上重复搜索很多次',
        summary:
          '假设从位置 `start` 开始的后缀可以由很多方式拆分，那么不同路径只要再次来到同一个 `start`，都会把后面的所有搜索重跑一遍。输入一大，重复计算会非常夸张。',
        bullets: [
          '相同后缀会被多次展开。',
          '纯 DFS 会产生大量重复子问题。',
          '这正是记忆化的切入点。',
          '问题本质上仍有重叠子问题结构。',
        ],
      },
      {
        id: 'wb2-memo-core',
        title: '记忆化的关键，是缓存“从某个起点开始能拆出的所有句子”',
        summary:
          '定义 `dfs(start)` 返回从 `start` 位置到结尾的所有合法拆分结果。只要这个起点算过一次，下次再遇到就直接复用，不必再次向后递归展开。',
        bullets: [
          '缓存粒度是起点下标。',
          '缓存内容是“所有可行句子列表”。',
          '下次命中后可以直接返回。',
          '这是搜索题常见的结果缓存方式。',
        ],
        callout:
          '很多枚举题只要把“从这里往后所有答案”缓存起来，复杂度就会从爆炸式回落到可控区间。',
      },
      {
        id: 'wb2-build-sentence',
        title: '拼句子的过程，本质上是拿当前单词去拼接后缀答案',
        summary:
          '当你确认 `s[start...end]` 是字典词后，只要拿它去拼接 `dfs(end + 1)` 返回的每个句子即可。如果后缀为空，说明当前单词本身就能构成一条完整答案。',
        bullets: [
          '当前单词负责前缀。',
          '后缀答案由递归返回。',
          '两者拼接后形成完整句子。',
          '边界是走到字符串末尾。',
        ],
      },
      {
        id: 'wb2-optimal-solution',
        title: '标准解法：DFS + Memo + Set',
        summary:
          '把字典放入 `Set`，编写 `dfs(start)` 返回从 `start` 开始的所有合法句子。递归中枚举结束位置 `end`，若当前子串在字典中，就递归获取后缀句子并做拼接。每个 `start` 的结果都缓存到 `Map` 中。',
        bullets: [
          '时间复杂度与答案规模及切分方式有关。',
          '空间复杂度主要来自递归栈、缓存和结果集。',
          '核心是缓存每个起点的全部拆分结果。',
          '这是输出所有方案类字符串题的标准套路。',
        ],
        code: `function wordBreak(s: string, wordDict: string[]): string[] {
  const wordSet = new Set(wordDict)
  const memo = new Map<number, string[]>()

  const dfs = (start: number): string[] => {
    if (memo.has(start)) {
      return memo.get(start)!
    }

    if (start === s.length) {
      return ['']
    }

    const sentences: string[] = []

    for (let end = start + 1; end <= s.length; end += 1) {
      const word = s.slice(start, end)

      if (!wordSet.has(word)) {
        continue
      }

      const suffixSentences = dfs(end)

      for (const suffix of suffixSentences) {
        sentences.push(suffix ? \`\${word} \${suffix}\` : word)
      }
    }

    memo.set(start, sentences)
    return sentences
  }

  return dfs(0)
}`,
      },
      {
        id: 'wb2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只会回溯不会缓存，或者句子拼接时空格处理混乱。真正掌握后，你会对“搜索 + 记忆化”的组合更熟悉。',
        bullets: [
          '易错点 1：没有缓存同一起点结果，性能退化严重。',
          '易错点 2：后缀为空时句子拼接多出空格。',
          '易错点 3：把它误写成只返回布尔值的上一题。',
          '延伸方向：括号生成、复原 IP、分割回文串、记忆化 DFS。',
        ],
        callout:
          '一旦题目要求“输出所有方案”，就要同时盯住两件事：搜索树怎么展开，以及重复子问题怎么剪。',
      },
    ],
  },
  {
    id: 'linked-list-cycle',
    label: '141. LeetCode 141. 环形链表',
    difficulty: '简单',
    description:
      '这题是在练快慢指针检测环。真正关键不是存访问记录，而是理解为什么一个快一个慢在有环时必然相遇。',
    outcome:
      '你能掌握快慢指针判断链表是否有环的经典写法，理解其背后的相遇原理，并把这种双指针节奏感迁移到更多链表题。',
    sections: [
      {
        id: 'llc-problem-summary',
        title: '题目在问什么',
        summary: '给定一个链表，判断其中是否存在环。',
        bullets: [
          '只需要返回是否有环。',
          '不能修改链表结构。',
          '尽量使用常数空间。',
          '这是快慢指针入门题。',
        ],
      },
      {
        id: 'llc-why-fast-slow',
        title: '有环时，快指针迟早会在环里追上慢指针',
        summary:
          '慢指针每次走一步，快指针每次走两步。只要链表有环，二者进入环后相对速度就是 1，最终一定会在环内某个位置相遇。',
        bullets: [
          '无环时快指针会先走到 null。',
          '有环时二者进入环后会不断缩小距离。',
          '相对速度决定必然相遇。',
          '这让问题能在 O(1) 空间解决。',
        ],
      },
      {
        id: 'llc-why-not-set',
        title: '哈希表当然能做，但快慢指针更符合这题本意',
        summary:
          '用 `Set` 记录访问过的节点也能判断环，但空间复杂度是 `O(n)`。快慢指针既更省空间，也是在链表场景里必须熟练掌握的核心技巧。',
        bullets: [
          'Set 法直观但吃空间。',
          '快慢指针能压到常数空间。',
          '这是链表题高频基本功。',
          '值得优先掌握。',
        ],
        callout:
          '链表题很多时候真正考的不是功能实现，而是你是否能认出该用哪种指针节奏。',
      },
      {
        id: 'llc-boundary',
        title: '循环条件要先保证快指针和它的下一步都存在',
        summary:
          '因为快指针每次要走两步，所以循环里必须先判断 `fast` 和 `fast.next` 是否为空。漏掉这个边界，最常见的结果就是空指针错误。',
        bullets: [
          '快指针走两步需要双重边界保护。',
          '空链表和单节点链表都要自然处理。',
          '循环条件比内部判断更稳。',
          '这是实现细节中的关键点。',
        ],
      },
      {
        id: 'llc-optimal-solution',
        title: '标准解法：Floyd 快慢指针',
        summary:
          '初始化快慢指针都指向头节点。循环中慢指针走一步、快指针走两步；如果某次二者相等，说明存在环；如果快指针提前走到空节点，说明无环。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是有环时的必然相遇。',
          '这是环检测题的标准模板。',
        ],
        code: `function hasCycle(head: ListNode | null): boolean {
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow!.next
    fast = fast.next.next

    if (slow === fast) {
      return true
    }
  }

  return false
}`,
      },
      {
        id: 'llc-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是循环条件没写稳或者混淆相遇时机。真正掌握后，你会对链表中的双指针移动关系更有感觉。',
        bullets: [
          '易错点 1：没有先判断 `fast.next` 就走两步。',
          '易错点 2：循环开始前先比较，导致空链表逻辑混乱。',
          '易错点 3：仍然只想到哈希表。',
          '延伸方向：环入口定位、链表中点、判断回文链表。',
        ],
        callout:
          '快慢指针的价值不只在这道题，而在于它能把很多链表位置关系问题降到常数空间。',
      },
    ],
  },
  {
    id: 'linked-list-cycle-ii',
    label: '142. LeetCode 142. 环形链表 II',
    difficulty: '中等',
    description:
      '这题是在练快慢指针的进一步推导。真正关键不是知道会相遇，而是理解为什么相遇后让一个指针回到头节点，再同步前进，二者会在环入口再次相遇。',
    outcome:
      '你能掌握 Floyd 判环后定位入口的完整推导，理解相遇点与入口之间的距离关系，并把这种数学化思路迁移到更多链表题。',
    sections: [
      {
        id: 'llc2-problem-summary',
        title: '题目在问什么',
        summary:
          '给定一个链表，如果存在环，返回环的入口节点；若不存在环，则返回 `null`。',
        bullets: [
          '不仅要判断是否有环。',
          '还要找出环的起点。',
          '希望继续保持常数空间。',
          '这是 Floyd 判环的进阶题。',
        ],
      },
      {
        id: 'llc2-meeting-point',
        title: '第一阶段仍然是先让快慢指针判断并找到相遇点',
        summary:
          '如果没有相遇点，就说明无环，直接返回 `null`。只有先确认相遇，后面关于入口的推导才有意义。',
        bullets: [
          '先判环，再谈入口。',
          '相遇点是第二阶段推导的基础。',
          '无环情况要尽早返回。',
          '整体仍然分两步完成。',
        ],
      },
      {
        id: 'llc2-math-proof',
        title: '为什么一个指针回头后会在入口相遇，本质是距离关系相等',
        summary:
          '设头到入口距离为 `a`，入口到相遇点距离为 `b`，环剩余长度为 `c`。快指针走过的路程是慢指针的两倍，可推出 `a = c + k(b + c)`。这意味着从头走 `a` 步到入口，与从相遇点再走 `c + k(b + c)` 步到入口，本质上会落在同一点。',
        bullets: [
          '倍速关系带来距离方程。',
          '头到入口距离与相遇点到入口的环上距离等价。',
          '所以二者同步前进会在入口碰头。',
          '这是整题最核心的推导。',
        ],
        callout:
          '链表难题很多时候不是代码量大，而是你是否愿意把指针路径关系认真推一遍。',
      },
      {
        id: 'llc2-second-walk',
        title: '第二阶段只需要两个一步一步走的指针',
        summary:
          '当快慢指针首次相遇后，让一个指针回到头节点，另一个留在相遇点。之后二者每次都走一步，再次相遇的位置就是环入口。',
        bullets: [
          '回头的指针从头出发。',
          '另一指针从相遇点出发。',
          '两者步速相同。',
          '第二次相遇即为入口。',
        ],
      },
      {
        id: 'llc2-optimal-solution',
        title: '标准解法：先判环，再同步找入口',
        summary:
          '先用快慢指针找相遇点。若未相遇则返回 `null`。若相遇，让一个指针指向头节点，另一个留在相遇点，然后二者每次走一步；最终相遇的节点就是环入口。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是相遇后的距离等价关系。',
          '这是定位环入口的标准模板。',
        ],
        code: `function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow!.next
    fast = fast.next.next

    if (slow === fast) {
      let pointerA = head
      let pointerB = slow

      while (pointerA !== pointerB) {
        pointerA = pointerA!.next
        pointerB = pointerB!.next
      }

      return pointerA
    }
  }

  return null
}`,
      },
      {
        id: 'llc2-mistakes-and-extensions',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只记结论不懂推导，导致一紧张就写乱。真正掌握后，你会对 Floyd 算法的完整链路更有把握。',
        bullets: [
          '易错点 1：第一次相遇后继续让快指针走两步。',
          '易错点 2：无环时没及时返回 `null`。',
          '易错点 3：只会背公式，不理解为什么会在入口相遇。',
          '延伸方向：寻找重复数、链表相交、更多快慢指针题型。',
        ],
        callout:
          '真正能让你在面试和工程里稳定复现结论的，从来不是背答案，而是把路径关系想透。',
      },
    ],
  },
  {
    id: 'reorder-list',
    label: '143. LeetCode 143. 重排链表',
    difficulty: '中等',
    description:
      '这题是在练链表分治式处理。真正关键不是硬模拟重排过程，而是把问题拆成找中点、反转后半段、交替合并三个经典动作。',
    outcome:
      '你能把复杂链表改造题拆成多个基础操作，掌握中点定位、链表反转和双链归并式穿插的组合思路。',
    sections: [
      {
        id: 'reorder-list-summary',
        title: '题目在问什么',
        summary:
          '给定单链表 `L0 -> L1 -> ... -> Ln`，要求原地重排成 `L0 -> Ln -> L1 -> Ln-1 -> ...`。',
        bullets: [
          '不能只改值，要真正改指针。',
          '希望尽量原地完成。',
          '目标顺序是前后交替插入。',
          '这是链表综合操作题。',
        ],
      },
      {
        id: 'reorder-list-split',
        title: '先找中点，把问题拆成前半段和后半段',
        summary:
          '链表题一旦出现“前后夹击”这种结构，第一反应就应该是找中点。这样才能把尾部元素的参与方式显式化。',
        bullets: [
          '快慢指针可以在 `O(n)` 内找到中点。',
          '中点之后的链表就是待翻转部分。',
          '拆分后更容易控制指针。',
          '这是后续所有操作的基础。',
        ],
      },
      {
        id: 'reorder-list-reverse',
        title: '后半段必须先反转，否则尾部元素没法顺序拿出来',
        summary:
          '原链表只能从头往后走，想按 `Ln、Ln-1` 这样的顺序取节点，最稳的方法就是把后半段先反转成正向可遍历结构。',
        bullets: [
          '反转后，原尾节点会来到前面。',
          '交替合并时不需要回头找尾巴。',
          '避免使用数组保存节点。',
          '保持常数额外空间。',
        ],
      },
      {
        id: 'reorder-list-merge',
        title: '最后一步是两条链交替合并',
        summary:
          '把前半段和反转后的后半段像拉拉链一样交替拼接，问题就自然完成了。这里最重要的是先缓存下一跳，再改当前指针。',
        bullets: [
          '每轮先保存 `next`，再改指针。',
          '前半段通常比后半段多一个节点。',
          '奇数长度时尾节点会自然保留。',
          '这一步最容易写乱，必须按节奏走。',
        ],
        callout:
          '链表改造题的核心能力，不是会不会写 while，而是你能不能把每一次指针改动的前后关系想清楚。',
      },
      {
        id: 'reorder-list-solution',
        title: '标准解法：找中点 + 反转后半段 + 交替合并',
        summary:
          '先用快慢指针找到中点并断开链表，再反转后半段，最后让两段链表按一个前节点、一个后节点的顺序交替连接。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '本质是三个基础链表模板的组合。',
          '是链表综合能力的高频考题。',
        ],
        code: `function reorderList(head: ListNode | null): void {
  if (!head || !head.next) {
    return
  }

  let slow = head
  let fast = head

  while (fast.next && fast.next.next) {
    slow = slow.next!
    fast = fast.next.next
  }

  let second = slow.next
  slow.next = null

  let prev: ListNode | null = null

  while (second) {
    const next = second.next
    second.next = prev
    prev = second
    second = next
  }

  let first: ListNode | null = head
  let tail: ListNode | null = prev

  while (tail) {
    const firstNext = first!.next
    const tailNext = tail.next

    first!.next = tail
    tail.next = firstNext

    first = firstNext
    tail = tailNext
  }
}`,
      },
      {
        id: 'reorder-list-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是断链、反转、合并三个步骤混在一起写，最后把链表接丢。把动作拆开写，稳定性会高很多。',
        bullets: [
          '易错点 1：忘记 `slow.next = null`，导致形成环。',
          '易错点 2：合并时没先保存下一跳。',
          '易错点 3：奇数长度链表的尾节点处理混乱。',
          '延伸方向：回文链表、排序链表、K 个一组翻转链表。',
        ],
      },
    ],
  },
  {
    id: 'binary-tree-preorder-traversal',
    label: '144. LeetCode 144. 二叉树的前序遍历',
    difficulty: '简单',
    description:
      '这题是在练二叉树遍历顺序。真正关键不是背前中后序名称，而是理解“什么时候处理当前节点”决定了遍历结果。',
    outcome:
      '你能掌握前序遍历的递归与迭代写法，理解栈在树遍历中的作用，并建立对树 DFS 顺序的基本感觉。',
    sections: [
      {
        id: 'preorder-summary',
        title: '题目在问什么',
        summary: '返回一棵二叉树的前序遍历结果，也就是“根 -> 左 -> 右”。',
        bullets: [
          '输出是节点值数组。',
          '空树返回空数组。',
          '可以用递归，也可以用迭代。',
          '这是树遍历入门题。',
        ],
      },
      {
        id: 'preorder-order',
        title: '前序的本质是先处理当前节点，再处理左右子树',
        summary:
          '遍历顺序并不神秘，所谓前序，就是把“访问当前节点”这件事放在递归展开之前。',
        bullets: [
          '先根节点，后左子树，再右子树。',
          '顺序决定输出形态。',
          '递归天然贴合树结构。',
          '这是理解各种 DFS 的起点。',
        ],
      },
      {
        id: 'preorder-recursion',
        title: '递归写法最直接，因为树本来就是递归结构',
        summary:
          '对每个节点做同样三件事：记录自己、遍历左边、遍历右边。这和函数递归展开的顺序完全一致。',
        bullets: [
          '代码短且易读。',
          '便于建立遍历顺序认知。',
          '缺点是极深树可能有栈深限制。',
          '面试里通常先写这个版本。',
        ],
      },
      {
        id: 'preorder-iterative',
        title: '迭代版用栈模拟递归，入栈顺序决定访问顺序',
        summary:
          '因为栈是后进先出，想得到“根左右”，就要先压右子节点，再压左子节点，这样左边会先弹出处理。',
        bullets: [
          '栈顶代表下一个要访问的节点。',
          '右先入栈，左后入栈。',
          '这能模拟递归调用顺序。',
          '是很多树题的通用套路。',
        ],
      },
      {
        id: 'preorder-solution',
        title: '标准解法：递归 DFS',
        summary:
          '从根节点出发，先把当前值放入结果数组，再递归遍历左子树和右子树。逻辑最短，也最适合建立树遍历直觉。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度取决于递归深度。',
          '每个节点恰好访问一次。',
          '是后续中序、后序的基础模板。',
        ],
        code: `function preorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []

  const dfs = (node: TreeNode | null) => {
    if (!node) {
      return
    }

    result.push(node.val)
    dfs(node.left)
    dfs(node.right)
  }

  dfs(root)
  return result
}`,
      },
      {
        id: 'preorder-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题本身不难，但很多人会在前中后序之间切换时顺序混乱。真正要练的是把遍历顺序和代码执行时机绑定起来。',
        bullets: [
          '易错点 1：把左右子树递归顺序写反。',
          '易错点 2：把 `push` 放到了递归后面。',
          '易错点 3：迭代版入栈顺序写错。',
          '延伸方向：中序遍历、后序遍历、层序遍历。',
        ],
      },
    ],
  },
  {
    id: 'binary-tree-postorder-traversal',
    label: '145. LeetCode 145. 二叉树的后序遍历',
    difficulty: '简单',
    description:
      '这题是在练遍历时机控制。真正关键不是代码多复杂，而是理解“左右都处理完之后再处理根节点”意味着什么。',
    outcome:
      '你能掌握后序遍历的递归思路，并理解为什么它特别适合先处理子问题、再处理当前节点的场景。',
    sections: [
      {
        id: 'postorder-summary',
        title: '题目在问什么',
        summary: '返回二叉树的后序遍历结果，也就是“左 -> 右 -> 根”。',
        bullets: [
          '输出仍然是值数组。',
          '空树返回空数组。',
          '关注点是访问当前节点的时机。',
          '这是树遍历顺序题。',
        ],
      },
      {
        id: 'postorder-meaning',
        title: '后序意味着当前节点依赖左右子树先完成',
        summary:
          '如果一个节点的处理要建立在子节点结果之上，后序遍历往往最顺手，因为它天然保证“子问题先算完”。',
        bullets: [
          '先左，再右，最后当前节点。',
          '适合自底向上问题。',
          '很多树 DP 会用到这个顺序。',
          '理解顺序比背定义更重要。',
        ],
      },
      {
        id: 'postorder-recursion',
        title: '递归版是最自然的后序表达',
        summary:
          '递归先深入左右子树，等它们都返回后，再记录当前节点。这和后序的定义一一对应，几乎没有额外心智负担。',
        bullets: [
          '代码直接体现定义。',
          '容易验证正确性。',
          '适合树题初学阶段。',
          '是后续树形 DP 的基础动作。',
        ],
      },
      {
        id: 'postorder-scenario',
        title: '为什么很多复杂树题偏爱后序，因为它方便汇总子树信息',
        summary:
          '比如计算树高、判断平衡、收集路径代价，往往都要等左右子树先算完。后序的思想一旦建立，后面很多题都会更顺。',
        bullets: [
          '先拿到左右结果，再决定当前结果。',
          '减少来回补算。',
          '契合分治思维。',
          '是树问题的重要心智模型。',
        ],
        callout:
          '树题里真正要记住的，不是“前中后序”四个字，而是当前节点与子问题之间的依赖方向。',
      },
      {
        id: 'postorder-solution',
        title: '标准解法：递归后序 DFS',
        summary:
          '递归访问左子树和右子树，等它们完成后再把当前节点值压入结果数组，就得到了标准后序遍历。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度取决于树高。',
          '每个节点访问一次。',
          '是最容易写稳的版本。',
        ],
        code: `function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []

  const dfs = (node: TreeNode | null) => {
    if (!node) {
      return
    }

    dfs(node.left)
    dfs(node.right)
    result.push(node.val)
  }

  dfs(root)
  return result
}`,
      },
      {
        id: 'postorder-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是嘴上说后序，代码却把 `push` 放错了位置。顺序一错，整棵树的输出就会完全变样。',
        bullets: [
          '易错点 1：把根节点处理时机提前。',
          '易错点 2：把左右子树顺序混成右左根。',
          '易错点 3：没把遍历顺序和应用场景联系起来。',
          '延伸方向：平衡二叉树、路径总和、树形 DP。',
        ],
      },
    ],
  },
  {
    id: 'lru-cache',
    label: '146. LeetCode 146. LRU 缓存',
    difficulty: '中等',
    description:
      '这题是在练数据结构组合设计。真正关键不是知道 LRU 这个词，而是意识到“查找快”和“更新最近使用顺序快”必须同时满足。',
    outcome:
      '你能掌握哈希表加双向链表的经典组合，理解为什么这类设计题必须从操作复杂度反推数据结构。',
    sections: [
      {
        id: 'lru-summary',
        title: '题目在问什么',
        summary:
          '设计一个支持 `get` 和 `put` 的 LRU 缓存，要求两个操作平均时间复杂度都为 `O(1)`。',
        bullets: [
          '访问过的键会变成最近使用。',
          '容量满时要淘汰最久未使用的键。',
          '关键在于操作复杂度约束。',
          '这是经典设计题。',
        ],
      },
      {
        id: 'lru-constraints',
        title: '先从复杂度倒推：一个结构不够，必须组合使用',
        summary:
          '哈希表能做到 `O(1)` 查找，但不擅长维护访问顺序；链表能快速调整顺序，但查找节点慢。所以这题天然需要两个结构配合。',
        bullets: [
          '哈希表负责键到节点的定位。',
          '双向链表负责最近使用顺序。',
          '两者缺一不可。',
          '这是设计题的典型思考方式。',
        ],
      },
      {
        id: 'lru-dlist',
        title: '为什么一定是双向链表，而不是单链表',
        summary:
          '因为节点一旦被访问，就要在 `O(1)` 时间内从原位置摘掉再移动到头部。单链表删除当前节点前，通常还得找前驱，做不到稳定常数时间。',
        bullets: [
          '双向链表能 `O(1)` 删除任意已知节点。',
          '头部表示最近使用。',
          '尾部表示最久未使用。',
          '淘汰时直接删尾部前一个节点。',
        ],
      },
      {
        id: 'lru-dummy',
        title: '哨兵节点能显著降低边界复杂度',
        summary:
          '头尾各放一个虚拟节点后，插入头部、删除尾部、摘除中间节点都会变成统一操作，不再需要区分空链表和单节点特殊情况。',
        bullets: [
          '让增删逻辑统一。',
          '减少 `if` 分支。',
          '更适合设计题现场实现。',
          '也是工程代码常用技巧。',
        ],
        callout:
          '复杂数据结构题写不稳，往往不是思路错，而是边界太多。哨兵节点就是专门用来削掉边界噪音的。',
      },
      {
        id: 'lru-solution',
        title: '标准解法：哈希表 + 双向链表',
        summary:
          '哈希表保存键到链表节点的映射；每次 `get` 或命中 `put` 都把节点移到链表头；容量超限时删除链表尾部节点，并同步从哈希表中移除对应键。',
        bullets: [
          '`get` 与 `put` 都能做到平均 `O(1)`。',
          '链表顺序直接表达使用新旧。',
          '是缓存淘汰策略题最经典的模板。',
          '面试中出现频率非常高。',
        ],
        code: `class Node {
  key: number
  value: number
  prev: Node | null = null
  next: Node | null = null

  constructor(key: number, value: number) {
    this.key = key
    this.value = value
  }
}

class LRUCache {
  private capacity: number
  private cache = new Map<number, Node>()
  private head = new Node(0, 0)
  private tail = new Node(0, 0)

  constructor(capacity: number) {
    this.capacity = capacity
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get(key: number): number {
    const node = this.cache.get(key)

    if (!node) {
      return -1
    }

    this.moveToHead(node)
    return node.value
  }

  put(key: number, value: number): void {
    const node = this.cache.get(key)

    if (node) {
      node.value = value
      this.moveToHead(node)
      return
    }

    const newNode = new Node(key, value)
    this.cache.set(key, newNode)
    this.addToHead(newNode)

    if (this.cache.size > this.capacity) {
      const removed = this.removeTail()
      this.cache.delete(removed.key)
    }
  }

  private addToHead(node: Node) {
    node.prev = this.head
    node.next = this.head.next
    this.head.next!.prev = node
    this.head.next = node
  }

  private removeNode(node: Node) {
    node.prev!.next = node.next
    node.next!.prev = node.prev
  }

  private moveToHead(node: Node) {
    this.removeNode(node)
    this.addToHead(node)
  }

  private removeTail(): Node {
    const node = this.tail.prev!
    this.removeNode(node)
    return node
  }
}`,
      },
      {
        id: 'lru-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只记住“哈希表 + 链表”五个字，却没有把每个操作如何落在结构上想清楚。',
        bullets: [
          '易错点 1：访问后忘记把节点移到头部。',
          '易错点 2：容量超限时只删链表，不删哈希表。',
          '易错点 3：单链表实现删除任意节点时写炸。',
          '延伸方向：LFU 缓存、浏览器历史记录、最近访问列表。',
        ],
      },
    ],
  },
  {
    id: 'insertion-sort-list',
    label: '147. LeetCode 147. 对链表进行插入排序',
    difficulty: '中等',
    description:
      '这题是在练链表上的局部有序维护。真正关键不是生搬硬套数组插入排序，而是理解链表里“找插入点”和“摘节点再插入”的写法。',
    outcome:
      '你能掌握链表插入排序的基本实现方式，理解哨兵节点在链表重排题中的价值，并区分链表排序与数组排序的操作差异。',
    sections: [
      {
        id: 'insertion-list-summary',
        title: '题目在问什么',
        summary: '给定链表头节点，对其进行插入排序并返回排序后的链表。',
        bullets: [
          '排序规则是升序。',
          '要真正改链表指针。',
          '题意对应经典插入排序过程。',
          '是链表排序入门题。',
        ],
      },
      {
        id: 'insertion-list-idea',
        title: '核心思路是维护一段已经有序的前缀',
        summary:
          '每次从原链表中拿出一个节点，插入到已排序部分的正确位置。这个过程和数组插入排序一致，只是数组搬元素变成了链表改指针。',
        bullets: [
          '已排序部分会逐步扩大。',
          '当前节点要插入到正确前驱之后。',
          '链表省掉了数组整体搬移成本。',
          '但需要精确处理指针关系。',
        ],
      },
      {
        id: 'insertion-list-dummy',
        title: '哨兵节点让“插到最前面”这类情况变简单',
        summary:
          '如果一个节点应该插入到链表头部，没有哨兵时会频繁改头指针。加一个虚拟头节点后，不管插在哪，都统一成“插到某个前驱后面”。',
        bullets: [
          '统一头部插入与中间插入逻辑。',
          '减少特殊分支。',
          '更适合现场实现。',
          '是链表题高频技巧。',
        ],
      },
      {
        id: 'insertion-list-scan',
        title: '每次都从有序链起点扫描，是这题的主要复杂度来源',
        summary:
          '插入排序的代价不在插入本身，而在于寻找插入位置。链表不能随机访问，所以最直接做法是每轮从前往后找第一个比当前节点大的位置。',
        bullets: [
          '寻找位置可能要线性扫描。',
          '整体最坏时间复杂度是 `O(n^2)`。',
          '这也是它不如归并排序高效的原因。',
          '但思路清晰，适合基础训练。',
        ],
      },
      {
        id: 'insertion-list-solution',
        title: '标准解法：维护有序链表并逐个插入',
        summary:
          '使用一个哨兵节点作为已排序链表头。遍历原链表时，先保存下一个节点，再从哨兵开始寻找插入位置，把当前节点插入进去。',
        bullets: [
          '时间复杂度最坏是 `O(n^2)`。',
          '空间复杂度是 `O(1)`。',
          '重点是插入位置查找与指针改接。',
          '是理解链表排序差异的好题。',
        ],
        code: `function insertionSortList(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0)
  let current = head

  while (current) {
    const next = current.next
    let prev = dummy

    while (prev.next && prev.next.val < current.val) {
      prev = prev.next
    }

    current.next = prev.next
    prev.next = current
    current = next
  }

  return dummy.next
}`,
      },
      {
        id: 'insertion-list-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是在插入前忘了保存原链表的下一跳，导致后续节点整段丢失。',
        bullets: [
          '易错点 1：未保存 `next` 就修改当前节点的 `next`。',
          '易错点 2：查找插入位置时比较条件写错。',
          '易错点 3：没使用哨兵导致头插逻辑混乱。',
          '延伸方向：排序链表、合并 K 个升序链表、链表去重。',
        ],
      },
    ],
  },
  {
    id: 'sort-list',
    label: '148. LeetCode 148. 排序链表',
    difficulty: '中等',
    description:
      '这题是在练链表归并排序。真正关键不是“会排序”，而是认出链表最适合的高效排序方式不是快排，而是归并。',
    outcome:
      '你能掌握链表归并排序的完整过程，理解为什么链表更适合做分割和合并，并建立对链表排序复杂度的正确判断。',
    sections: [
      {
        id: 'sort-list-summary',
        title: '题目在问什么',
        summary:
          '给定链表头节点，将其按升序排序并返回排序后的链表，要求时间复杂度尽量优化。',
        bullets: [
          '目标是升序结果。',
          '链表不能随机访问。',
          '高频考点是 `O(n log n)` 解法。',
          '这是链表排序核心题。',
        ],
      },
      {
        id: 'sort-list-why-merge',
        title: '链表最适合归并排序，因为拆分和合并都顺手',
        summary:
          '数组归并排序的额外代价常在拷贝，而链表只需要改指针。反过来，快排在链表上不容易高效做分区，所以归并往往更自然。',
        bullets: [
          '找中点可用快慢指针。',
          '合并两个有序链表是链表强项。',
          '整体复杂度可做到 `O(n log n)`。',
          '这是链表排序的标准答案。',
        ],
      },
      {
        id: 'sort-list-divide',
        title: '第一步还是先找中点，把链表一分为二',
        summary:
          '每次递归都把链表切成左右两半，分别排好序后再合并。这和数组归并的分治骨架完全一致，只是分割方式改成了快慢指针。',
        bullets: [
          '中点是分治的入口。',
          '切断链表要靠 `slow.next = null`。',
          '子问题规模逐渐减半。',
          '递归终点是空链表或单节点链表。',
        ],
      },
      {
        id: 'sort-list-merge',
        title: '第二步是合并两个有序链表',
        summary:
          '两个子链已经排好序后，只要像归并数组那样每次选较小节点接到结果链尾部，最终就能得到完整有序链表。',
        bullets: [
          '双指针比较当前节点值。',
          '小的先接入结果链。',
          '剩余部分直接接尾部。',
          '这是链表题里非常高频的基础操作。',
        ],
        callout:
          '很多链表题最后都会回到“分”和“并”两个动作。能把这两个动作写稳，链表题难度会立刻降一截。',
      },
      {
        id: 'sort-list-solution',
        title: '标准解法：自顶向下归并排序',
        summary:
          '递归找到中点并拆分成两条子链，分别排序后，再调用合并有序链表的方法把结果拼回去。',
        bullets: [
          '时间复杂度是 `O(n log n)`。',
          '递归栈空间复杂度是 `O(log n)`。',
          '是链表排序题最经典模板。',
          '比插入排序更适合大规模数据。',
        ],
        code: `function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head
  }

  let slow = head
  let fast = head.next

  while (fast && fast.next) {
    slow = slow.next!
    fast = fast.next.next
  }

  const rightHead = slow.next
  slow.next = null

  const left = sortList(head)
  const right = sortList(rightHead)

  return merge(left, right)
}

function merge(
  left: ListNode | null,
  right: ListNode | null,
): ListNode | null {
  const dummy = new ListNode(0)
  let tail = dummy

  while (left && right) {
    if (left.val <= right.val) {
      tail.next = left
      left = left.next
    } else {
      tail.next = right
      right = right.next
    }

    tail = tail.next
  }

  tail.next = left || right
  return dummy.next
}`,
      },
      {
        id: 'sort-list-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是切分和合并都知道要做，但细节没理顺，导致链表断得不干净或者合并后形成环。',
        bullets: [
          '易错点 1：找中点后没断链。',
          '易错点 2：合并时尾指针推进错位。',
          '易错点 3：把复杂度目标忘了，写成 `O(n^2)` 排序。',
          '延伸方向：合并 K 个升序链表、区间合并、外部排序思想。',
        ],
      },
    ],
  },
  {
    id: 'max-points-on-a-line',
    label: '149. LeetCode 149. 直线上最多的点数',
    difficulty: '困难',
    description:
      '这题是在练几何问题的离散化表达。真正关键不是浮点算斜率，而是把“同一条直线”稳定地转换成可比较的数学表示。',
    outcome:
      '你能掌握以每个点为锚点统计斜率的做法，理解最大公约数化简在几何哈希中的作用，并避开浮点误差陷阱。',
    sections: [
      {
        id: 'max-points-summary',
        title: '题目在问什么',
        summary: '给定平面上的若干点，求最多有多少个点落在同一条直线上。',
        bullets: [
          '输出是最大共线点数。',
          '点数可能重复方向很多。',
          '关键是如何判断“同一直线”。',
          '这是几何与哈希结合题。',
        ],
      },
      {
        id: 'max-points-anchor',
        title: '经典思路是枚举一个锚点，看其他点与它形成的斜率',
        summary:
          '如果若干点与同一个锚点形成相同斜率，那它们就与锚点共线。于是问题可以转化成：对每个起点，统计哪种斜率出现最多。',
        bullets: [
          '固定一个点，线就能由斜率区分。',
          '每轮统计的是“经过当前点的所有直线”。',
          '全局答案取每轮最大值。',
          '这是把二维问题拆成多次一维统计。',
        ],
      },
      {
        id: 'max-points-slope',
        title: '不能直接用浮点斜率，要把方向向量约成最简分数',
        summary:
          '浮点数会有精度误差，例如 `1 / 3` 和 `2 / 6` 理应相等，却可能因表示问题比较失败。更稳的方法是把 `dy` 和 `dx` 用最大公约数约分后作为键。',
        bullets: [
          '斜率本质上是方向比值。',
          '用 `(dy, dx)` 的最简形式表示更稳。',
          '垂直线和水平线也能统一处理。',
          '这是几何哈希题的关键技巧。',
        ],
      },
      {
        id: 'max-points-normalization',
        title: '方向还要统一符号，避免同一斜率出现两种写法',
        summary:
          '比如 `(1, 2)` 和 `(-1, -2)` 实际表示同一方向，如果不统一符号，会被当成两种不同斜率。通常做法是让 `dx` 始终非负，或在特例下统一到一个标准方向。',
        bullets: [
          '标准化是哈希去重的必要步骤。',
          '否则统计结果会被拆散。',
          '这是很多人第一次做几何题时最容易漏掉的点。',
          '细节决定正确率。',
        ],
        callout:
          '几何题经常不是败在大思路，而是败在“如何把数学对象稳定映射成程序里的 key”。',
      },
      {
        id: 'max-points-solution',
        title: '标准解法：枚举锚点并统计最简斜率',
        summary:
          '对每个点作为起点，遍历其后的所有点，计算 `dy` 与 `dx`，通过最大公约数约分并统一符号后写入哈希表，统计当前锚点下出现次数最多的方向。',
        bullets: [
          '时间复杂度是 `O(n^2)`。',
          '空间复杂度是 `O(n)`。',
          '重点在斜率标准化，而不是浮点计算。',
          '是高频几何哈希题。',
        ],
        code: `function maxPoints(points: number[][]): number {
  if (points.length <= 2) {
    return points.length
  }

  let answer = 0

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = a % b
      a = b
      b = temp
    }

    return Math.abs(a)
  }

  for (let i = 0; i < points.length; i += 1) {
    const counter = new Map<string, number>()
    let localMax = 0

    for (let j = i + 1; j < points.length; j += 1) {
      let dy = points[j][1] - points[i][1]
      let dx = points[j][0] - points[i][0]

      const divisor = gcd(dy, dx)
      dy /= divisor
      dx /= divisor

      if (dx < 0) {
        dx = -dx
        dy = -dy
      } else if (dx === 0) {
        dy = 1
      } else if (dy === 0) {
        dx = 1
      }

      const key = dy + "," + dx
      const count = (counter.get(key) ?? 0) + 1
      counter.set(key, count)
      localMax = Math.max(localMax, count)
    }

    answer = Math.max(answer, localMax + 1)
  }

  return answer
}`,
      },
      {
        id: 'max-points-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是直接上浮点数或者没有把方向统一成唯一表示，导致明明共线却没统计到一起。',
        bullets: [
          '易错点 1：直接用 `dy / dx` 做 key。',
          '易错点 2：没有统一符号方向。',
          '易错点 3：垂直线和水平线处理不统一。',
          '延伸方向：矩形面积、最近点对、扫描线思维。',
        ],
      },
    ],
  },
  {
    id: 'evaluate-reverse-polish-notation',
    label: '150. LeetCode 150. 逆波兰表达式求值',
    difficulty: '中等',
    description:
      '这题是在练栈对表达式求值的支撑能力。真正关键不是认识后缀表达式，而是理解它为什么能天然消掉括号优先级问题。',
    outcome:
      '你能掌握逆波兰表达式的栈式求值过程，理解操作数出栈顺序的重要性，并建立对表达式解析问题的基本直觉。',
    sections: [
      {
        id: 'rpn-summary',
        title: '题目在问什么',
        summary: '给定一个逆波兰表达式数组，返回它的计算结果。',
        bullets: [
          '数字直接入栈。',
          '遇到运算符就弹出两个数计算。',
          '表达式保证合法。',
          '这是典型栈题。',
        ],
      },
      {
        id: 'rpn-why-stack',
        title: '后缀表达式天然适合用栈，因为操作数总在运算符之前准备好',
        summary:
          '当扫描到一个运算符时，它所需要的两个操作数一定已经在前面出现并压入栈中，所以直接弹出即可。',
        bullets: [
          '不需要额外处理中缀优先级。',
          '括号信息已经隐含在顺序里。',
          '栈正好匹配“最近准备好的操作数”。',
          '这是表达式处理的经典模型。',
        ],
      },
      {
        id: 'rpn-order',
        title: '出栈顺序不能反，减法和除法尤其敏感',
        summary:
          '先弹出的数字是右操作数，后弹出的数字才是左操作数。如果顺序写反，加法乘法可能看不出问题，但减法和除法会直接错掉。',
        bullets: [
          '第二次出栈的是左值。',
          '第一次出栈的是右值。',
          '顺序错了结果就错。',
          '这是本题最常见坑点。',
        ],
      },
      {
        id: 'rpn-trunc',
        title: '除法要按题意向零截断',
        summary:
          'JavaScript 和 TypeScript 中普通除法会得到浮点结果，因此需要额外用 `Math.trunc` 处理，保证负数时也是向零截断。',
        bullets: [
          '不能直接保留小数。',
          '向零截断和向下取整不同。',
          '负数场景更容易出错。',
          '实现细节要贴合题意。',
        ],
        callout:
          '表达式题往往不难，真正拉开差距的是你有没有把题目里的运算语义逐字落实到代码里。',
      },
      {
        id: 'rpn-solution',
        title: '标准解法：线性扫描 + 栈',
        summary:
          '遍历 tokens，遇到数字就转成整数入栈；遇到运算符就依次弹出右值和左值，计算后再把结果压回栈中。最终栈顶即答案。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '每个 token 只处理一次。',
          '是非常标准的栈应用题。',
        ],
        code: `function evalRPN(tokens: string[]): number {
  const stack: number[] = []
  const operators = new Set(["+", "-", "*", "/"])

  for (const token of tokens) {
    if (!operators.has(token)) {
      stack.push(Number(token))
      continue
    }

    const right = stack.pop()!
    const left = stack.pop()!

    if (token === "+") {
      stack.push(left + right)
    } else if (token === "-") {
      stack.push(left - right)
    } else if (token === "*") {
      stack.push(left * right)
    } else {
      stack.push(Math.trunc(left / right))
    }
  }

  return stack[0]
}`,
      },
      {
        id: 'rpn-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把左右操作数顺序写反，或者在除法时忘记截断规则。',
        bullets: [
          '易错点 1：`pop` 顺序反了。',
          '易错点 2：除法没做向零截断。',
          '易错点 3：把 token 当字符没转数字。',
          '延伸方向：基本计算器、中缀转后缀、括号匹配。',
        ],
      },
    ],
  },
  {
    id: 'reverse-words-in-a-string',
    label: '151. LeetCode 151. 反转字符串中的单词',
    difficulty: '中等',
    description:
      '这题是在练字符串清洗和重组。真正关键不是调用几个 API，而是先把多余空格处理干净，再谈单词顺序反转。',
    outcome:
      '你能掌握字符串分词重组的基本套路，理解题目对空格规范化的要求，并写出稳定的文本处理代码。',
    sections: [
      {
        id: 'reverse-words-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符串，反转其中单词的顺序，并去掉多余空格，使单词之间只保留一个空格。',
        bullets: [
          '不是反转字符，而是反转单词顺序。',
          '首尾空格要去掉。',
          '中间连续空格要压成一个。',
          '是典型字符串处理题。',
        ],
      },
      {
        id: 'reverse-words-clean',
        title: '这题第一步不是反转，而是先做输入规范化',
        summary:
          '如果直接按空格分割，连续空格会产生空字符串。只有先明确“哪些是有效单词”，后面的顺序调整才会干净。',
        bullets: [
          '去掉前后空白。',
          '忽略空单词片段。',
          '最终输出要用单空格拼接。',
          '输入清洗是题目重点之一。',
        ],
      },
      {
        id: 'reverse-words-split',
        title: '最实用的思路是分词、过滤、反转、拼接',
        summary:
          '把字符串按空格切开，过滤掉空串，得到单词数组后再反转即可。虽然不是原地算法，但实现清晰且足够通过。',
        bullets: [
          '逻辑分层清楚。',
          '容易验证每一步结果。',
          '适合工程字符串清洗。',
          '是最推荐的高可读性写法。',
        ],
      },
      {
        id: 'reverse-words-why-simple',
        title: '很多字符串题没必要过度追求炫技，先保证语义正确',
        summary:
          '面试时如果语言本身提供了可靠字符串工具，直接用高层 API 往往更稳。真正该解释的是复杂度和为什么它符合题意。',
        bullets: [
          '工具方法不是偷懒，是合理利用语言能力。',
          '重点在规范化规则是否完整。',
          '可读性在工程里同样重要。',
          '不要把简单题做复杂。',
        ],
        callout:
          '好的代码不等于底层操作最多，而是最少的心智成本下准确表达需求。',
      },
      {
        id: 'reverse-words-solution',
        title: '标准解法：分割、过滤、反转、拼接',
        summary:
          '先使用 `trim` 去掉首尾空格，再按空格分割，过滤空字符串，反转单词数组后用单个空格重新拼接。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '实现短而稳定。',
          '完全符合题目对空格的要求。',
        ],
        code: `function reverseWords(s: string): string {
  return s
    .trim()
    .split(" ")
    .filter(Boolean)
    .reverse()
    .join(" ")
}`,
      },
      {
        id: 'reverse-words-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只做了顺序反转，却没有把空格规范化，导致结果格式不符合要求。',
        bullets: [
          '易错点 1：忘了 `trim()`。',
          '易错点 2：没过滤空字符串。',
          '易错点 3：误以为要反转每个单词内部字符。',
          '延伸方向：字符串压缩、路径规范化、日志文本清洗。',
        ],
      },
    ],
  },
  {
    id: 'maximum-product-subarray',
    label: '152. LeetCode 152. 乘积最大子数组',
    difficulty: '中等',
    description:
      '这题是在练动态规划里“状态会因为负数翻转”的情况。真正关键不是只维护最大值，而是同时维护当前位置结尾的最大乘积和最小乘积。',
    outcome:
      '你能掌握乘积型动态规划的状态设计，理解为什么最小值也可能在下一步变成最大值，并建立对负数翻转效应的敏感度。',
    sections: [
      {
        id: 'max-product-summary',
        title: '题目在问什么',
        summary: '给定整数数组，求乘积最大的连续子数组，并返回这个最大乘积。',
        bullets: [
          '子数组必须连续。',
          '数组里可能有负数和零。',
          '乘积问题和和问题不一样。',
          '这是动态规划经典题。',
        ],
      },
      {
        id: 'max-product-why-two-states',
        title: '只记最大值不够，因为负数会让最小值翻身',
        summary:
          '如果当前数字是负数，那么之前非常小的负积乘上它，反而可能变成一个很大的正积。所以最小乘积状态同样有价值。',
        bullets: [
          '负负得正会翻转优劣。',
          '最大值和最小值要同步维护。',
          '这是本题最核心的状态设计。',
          '和最大子数组和那题不一样。',
        ],
      },
      {
        id: 'max-product-transition',
        title: '每一步都要在三个候选里选：自己、接最大、接最小',
        summary:
          '当前位置结尾的最大乘积，可能只取当前数本身，也可能来自“当前数乘之前最大”或“当前数乘之前最小”。最小值同理。',
        bullets: [
          '候选来源一共三个。',
          '当前数本身代表“从这里重新开段”。',
          '状态转移要同时更新两条线。',
          '先保存旧值再更新更稳。',
        ],
      },
      {
        id: 'max-product-zero',
        title: '零会天然切断乘积链，但不需要特殊大分支',
        summary:
          '当当前数是零时，候选中自然会出现 `0`，状态会被重置。只要转移写得完整，零会被统一纳入处理，而不必单独写很多分支。',
        bullets: [
          '零既可能是答案，也可能是分界点。',
          '统一转移比特判更稳。',
          '状态机会自动重启。',
          '体现出 DP 设计的优雅性。',
        ],
        callout:
          '动态规划真正重要的不是公式多难，而是你定义的状态能不能把“局部变化规则”完整覆盖。',
      },
      {
        id: 'max-product-solution',
        title: '标准解法：维护当前位置结尾的最大值和最小值',
        summary:
          '初始化最大值、最小值和答案都为第一个元素。从第二个元素开始，基于当前数和旧的最大/最小乘积计算新的最大最小值，再更新全局答案。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '核心是双状态转移。',
          '是乘积型 DP 的代表题。',
        ],
        code: `function maxProduct(nums: number[]): number {
  let currentMax = nums[0]
  let currentMin = nums[0]
  let answer = nums[0]

  for (let i = 1; i < nums.length; i += 1) {
    const value = nums[i]
    const prevMax = currentMax
    const prevMin = currentMin

    currentMax = Math.max(value, prevMax * value, prevMin * value)
    currentMin = Math.min(value, prevMax * value, prevMin * value)
    answer = Math.max(answer, currentMax)
  }

  return answer
}`,
      },
      {
        id: 'max-product-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是照搬最大子数组和的单状态写法，结果在负数场景直接失效。',
        bullets: [
          '易错点 1：只维护一个最大值。',
          '易错点 2：更新最大值后再拿它算最小值，污染旧状态。',
          '易错点 3：没有把当前数本身作为候选。',
          '延伸方向：打家劫舍、股票问题、子数组动态规划。',
        ],
      },
    ],
  },
  {
    id: 'find-minimum-in-rotated-sorted-array',
    label: '153. LeetCode 153. 寻找旋转排序数组中的最小值',
    difficulty: '中等',
    description:
      '这题是在练二分查找中的结构判断。真正关键不是机械套模板，而是通过中点和右端值的关系判断最小值落在哪一边。',
    outcome:
      '你能掌握旋转数组上的二分思路，理解“局部有序但整体断点存在”的判断方式，并提升对单调性变形题的敏感度。',
    sections: [
      {
        id: 'find-min-summary',
        title: '题目在问什么',
        summary:
          '原本升序的数组被旋转后，要求用尽量高效的方法找出其中的最小值，且数组元素互不重复。',
        bullets: [
          '数组原本是严格升序。',
          '旋转后只有一个断点。',
          '目标是找到最小值位置。',
          '高频二分变体题。',
        ],
      },
      {
        id: 'find-min-structure',
        title: '旋转数组不是完全无序，它只是把有序数组切成两段交换了位置',
        summary:
          '这意味着数组内部仍然保留局部有序性。最小值所在的位置，就是那条“断点”之后的起点，而二分正适合找这种结构变化点。',
        bullets: [
          '断点前后各自仍有序。',
          '最小值就是右半段开头。',
          '问题本质是找断点。',
          '这是二分可行的根源。',
        ],
      },
      {
        id: 'find-min-compare',
        title: '判断关键在于中点和右端值的比较',
        summary:
          '如果 `nums[mid] > nums[right]`，说明最小值一定在右半边；反之，说明中点落在右侧有序段里，最小值在左半边或就是中点本身。',
        bullets: [
          '右端值是很好的参照物。',
          '比较结果能直接缩小搜索区间。',
          '不用显式找断点位置。',
          '这是一种结构性二分判断。',
        ],
      },
      {
        id: 'find-min-boundary',
        title: '区间收缩时要保留可能成为答案的中点',
        summary:
          '当 `nums[mid] <= nums[right]` 时，不能写成 `right = mid - 1`，因为中点本身就可能是最小值。正确做法是让 `right = mid`。',
        bullets: [
          '边界更新要和答案包含关系一致。',
          '这题很适合训练二分不变量。',
          '写错一步就会漏答案。',
          '细节比模板更重要。',
        ],
        callout:
          '二分题真正的门槛，从来不是 while 写法，而是你能不能说清每次丢掉的区间为什么不可能含答案。',
      },
      {
        id: 'find-min-solution',
        title: '标准解法：基于右端参照的二分查找',
        summary:
          '维护左右边界。每轮取中点并和右端值比较，如果中点值更大，说明最小值在右侧；否则最小值在左侧含中点。最终左右指针相遇时即为最小值位置。',
        bullets: [
          '时间复杂度是 `O(log n)`。',
          '空间复杂度是 `O(1)`。',
          '关键在单调结构判断。',
          '是旋转数组系列题的基础。',
        ],
        code: `function findMin(nums: number[]): number {
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid] > nums[right]) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return nums[left]
}`,
      },
      {
        id: 'find-min-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有想清楚“中点是否可能是答案”，导致边界更新把最小值直接扔掉。',
        bullets: [
          '易错点 1：`right = mid - 1` 写错。',
          '易错点 2：用左端做参照却没维护好逻辑。',
          '易错点 3：把它当普通有序数组二分。',
          '延伸方向：搜索旋转排序数组、寻找峰值、重复元素版本。',
        ],
      },
    ],
  },
  {
    id: 'find-minimum-in-rotated-sorted-array-ii',
    label: '154. LeetCode 154. 寻找旋转排序数组中的最小值 II',
    difficulty: '困难',
    description:
      '这题是在练二分查找在重复元素场景下的退化处理。真正关键不是沿用上一题模板，而是理解重复值会遮蔽断点信息。',
    outcome:
      '你能掌握旋转数组含重复元素时的二分思路，理解为什么在信息不足时只能保守收缩边界，并接受最坏退化到线性的原因。',
    sections: [
      {
        id: 'find-min2-summary',
        title: '题目在问什么',
        summary:
          '一个原本升序的数组发生旋转后，数组里允许有重复元素，要求找到最小值。',
        bullets: [
          '和上一题的唯一区别是允许重复。',
          '目标仍然是最小值。',
          '希望尽量保持二分思路。',
          '这是旋转数组的进阶版。',
        ],
      },
      {
        id: 'find-min2-why-hard',
        title: '重复元素会让中点和右端的比较失去部分判别力',
        summary:
          '在没有重复元素时，`nums[mid]` 和 `nums[right]` 的关系通常能直接指向某一侧；但当它们相等时，中点可能在左半段，也可能在右半段，信息不够了。',
        bullets: [
          '重复值会遮住断点结构。',
          '相等时无法直接判断最小值方向。',
          '这让普通二分模板不再完整。',
          '必须补一个保守分支。',
        ],
      },
      {
        id: 'find-min2-safe-shrink',
        title: '当中点等于右端时，安全做法是让右边界左移一格',
        summary:
          '因为 `nums[mid] === nums[right]` 时，去掉右端这个重复值并不会丢失最小值。即便右端正好是最小值，中点也同样是该值，所以可以安全写成 `right -= 1`。',
        bullets: [
          '这是信息不足时的保守收缩。',
          '不会把答案删掉。',
          '但可能只能一点点缩。',
          '最坏情况下会退化为线性。',
        ],
      },
      {
        id: 'find-min2-complexity',
        title: '为什么这题最坏不能保证 `O(log n)`',
        summary:
          '如果数组里很多元素都相同，例如几乎全是一个值，那么每轮比较可能都落入“相等”分支，只能把右边界减一，这时复杂度就退化成 `O(n)`。',
        bullets: [
          '重复元素是复杂度退化根源。',
          '二分依赖有效判别信息。',
          '信息不足时无法成倍缩区间。',
          '理解退化原因比背结论更重要。',
        ],
        callout:
          '二分题不是只要写 `mid` 就一定是 `O(log n)`。真正决定复杂度的，是每次比较能否稳定淘汰大块区间。',
      },
      {
        id: 'find-min2-solution',
        title: '标准解法：基于右端参照的二分加退化分支',
        summary:
          '若 `nums[mid] > nums[right]`，最小值在右侧；若 `nums[mid] < nums[right]`，最小值在左侧含中点；若两者相等，则让 `right -= 1` 保守收缩。',
        bullets: [
          '平均仍然接近二分效率。',
          '最坏复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '关键在相等时的处理方式。',
        ],
        code: `function findMin(nums: number[]): number {
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid] > nums[right]) {
      left = mid + 1
    } else if (nums[mid] < nums[right]) {
      right = mid
    } else {
      right -= 1
    }
  }

  return nums[left]
}`,
      },
      {
        id: 'find-min2-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是完全照搬上一题逻辑，结果在重复元素出现时把区间缩错。',
        bullets: [
          '易错点 1：漏掉相等分支。',
          '易错点 2：相等时直接丢掉中点侧整段区间。',
          '易错点 3：误以为这题仍然稳定是 `O(log n)`。',
          '延伸方向：搜索旋转排序数组 II、重复元素二分、单调性退化问题。',
        ],
      },
    ],
  },
  {
    id: 'min-stack',
    label: '155. LeetCode 155. 最小栈',
    difficulty: '中等',
    description:
      '这题是在练辅助栈设计。真正关键不是支持 `push` 和 `pop`，而是让“当前最小值”也能和主栈状态同步演化。',
    outcome:
      '你能掌握双栈维护最小值的设计思路，理解为什么附加状态必须与主数据结构同步更新，并写出常数时间查询最小值的栈结构。',
    sections: [
      {
        id: 'min-stack-summary',
        title: '题目在问什么',
        summary:
          '设计一个支持 `push`、`pop`、`top` 和 `getMin` 的栈，其中 `getMin` 要在常数时间返回当前最小值。',
        bullets: [
          '不仅要会出入栈。',
          '还要快速拿到最小值。',
          '所有操作都追求 `O(1)`。',
          '这是经典数据结构设计题。',
        ],
      },
      {
        id: 'min-stack-why-not-scan',
        title: '每次线性扫描找最小值肯定不行',
        summary:
          '如果 `getMin` 时再去遍历整个栈，复杂度就是 `O(n)`，完全不符合题意。所以最小值信息必须在入栈和出栈时就同步维护好。',
        bullets: [
          '查询阶段不能再临时计算。',
          '要把代价前置到状态维护上。',
          '这是设计题常见思路。',
          '本质是空间换时间。',
        ],
      },
      {
        id: 'min-stack-helper',
        title: '最直接的方案是再维护一个“最小值栈”',
        summary:
          '主栈记录真实数据，辅助栈记录每个时刻对应的最小值。这样栈顶元素一一对应，出栈时两个栈同步弹出即可。',
        bullets: [
          '辅助栈栈顶就是当前最小值。',
          '入栈时写入“旧最小值与当前值的较小者”。',
          '出栈时两个栈同步弹出。',
          '逻辑清晰且很稳。',
        ],
      },
      {
        id: 'min-stack-duplicate',
        title: '重复最小值不能只存一次，否则弹出时会丢状态',
        summary:
          '辅助栈如果只在遇到更小值时才入栈，那么碰到相同最小值多次出现时，弹出一个后就可能错误地把最小值恢复大了。最稳妥的是每次入栈都同步写一份当前最小值。',
        bullets: [
          '重复值是常见边界坑。',
          '同步镜像能规避很多分支。',
          '代码量更少。',
          '更适合面试现场实现。',
        ],
        callout:
          '设计题很多时候不是“省几个元素”更高级，而是状态结构越对称、越不容易出错。',
      },
      {
        id: 'min-stack-solution',
        title: '标准解法：主栈加最小值栈',
        summary:
          '每次 `push` 时，把值压入主栈，同时把 `min(当前值, 旧最小值)` 压入辅助栈；每次 `pop` 时两个栈同步弹出；查询时直接读各自栈顶。',
        bullets: [
          '四个操作都能做到 `O(1)`。',
          '空间复杂度是 `O(n)`。',
          '是辅助状态同步维护的典型例子。',
          '非常高频。',
        ],
        code: `class MinStack {
  private stack: number[] = []
  private minStack: number[] = []

  push(val: number): void {
    this.stack.push(val)

    if (this.minStack.length === 0) {
      this.minStack.push(val)
    } else {
      const currentMin = this.minStack[this.minStack.length - 1]
      this.minStack.push(Math.min(currentMin, val))
    }
  }

  pop(): void {
    this.stack.pop()
    this.minStack.pop()
  }

  top(): number {
    return this.stack[this.stack.length - 1]
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1]
  }
}`,
      },
      {
        id: 'min-stack-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是辅助栈更新不对称，导致 `pop` 之后最小值状态错乱。',
        bullets: [
          '易错点 1：只在更小值出现时才压辅助栈。',
          '易错点 2：`pop` 时忘记同步弹出辅助栈。',
          '易错点 3：空栈边界没处理好。',
          '延伸方向：最大栈、单调栈、括号匹配栈设计。',
        ],
      },
    ],
  },
  {
    id: 'binary-tree-upside-down',
    label: '156. LeetCode 156. 上下翻转二叉树',
    difficulty: '中等',
    description:
      '这题是在练树结构重连。真正关键不是死记结果长什么样，而是认清每个节点翻转后左、右孩子各自要接到哪里。',
    outcome:
      '你能掌握树指针重连的递归思路，理解“先到底、再回溯接线”的必要性，并建立对二叉树结构改造题的感觉。',
    sections: [
      {
        id: 'upside-down-summary',
        title: '题目在问什么',
        summary:
          '给定一棵特定结构的二叉树，把它翻转成“原左孩子变父节点，原根变右孩子，原右孩子变左孩子”的新树。',
        bullets: [
          '翻转不是镜像。',
          '要真正重连指针。',
          '通常沿着左链一路翻。',
          '这是树结构改造题。',
        ],
      },
      {
        id: 'upside-down-observe',
        title: '先观察局部关系，别急着从根开始硬改',
        summary:
          '对一个节点来说，翻转后它的左孩子会上升为父节点，原右孩子会挂到这个新父节点的左边，而当前节点自己会挂到新父节点的右边。',
        bullets: [
          '局部接线关系是解题核心。',
          '原左孩子负责“接班”。',
          '原右孩子成为新左子树。',
          '当前节点成为新右子树。',
        ],
      },
      {
        id: 'upside-down-bottom-up',
        title: '为什么必须先递归到最左边，再回头重连',
        summary:
          '最左侧节点最终会变成新根。如果一开始就在上层乱改指针，很容易把后续还要访问的子树断掉。先到底，再在回溯时按规则接线更稳。',
        bullets: [
          '最左节点是最终新根。',
          '回溯阶段更适合做重连。',
          '避免提前破坏原结构。',
          '这是典型的自底向上改造。',
        ],
      },
      {
        id: 'upside-down-cleanup',
        title: '旧连接必须及时断掉，否则容易形成环',
        summary:
          '节点接到新位置后，原先的 `left` 和 `right` 关系已经失效，若不手动清空，就可能残留旧边，最终让树结构错误甚至形成环。',
        bullets: [
          '重连后要清理旧指针。',
          '结构改造题都要注意旧边残留。',
          '不清理会导致遍历异常。',
          '这是实现层面的关键细节。',
        ],
        callout:
          '树和链表的改造题，本质上都是在做“接新线之前先认清旧线，接完后别忘了拆旧线”。',
      },
      {
        id: 'upside-down-solution',
        title: '标准解法：递归到底后回溯接线',
        summary:
          '当节点没有左孩子时，它就是新的根。否则先递归处理左子树，等回溯时把 `root.left.left` 指向原右孩子，把 `root.left.right` 指向当前节点，最后清空当前节点原有左右指针。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度取决于递归深度。',
          '核心是自底向上的指针重连。',
          '很适合训练树结构改造能力。',
        ],
        code: `function upsideDownBinaryTree(root: TreeNode | null): TreeNode | null {
  if (!root || !root.left) {
    return root
  }

  const newRoot = upsideDownBinaryTree(root.left)

  root.left.left = root.right
  root.left.right = root
  root.left = null
  root.right = null

  return newRoot
}`,
      },
      {
        id: 'upside-down-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是知道要翻转，但没有想清“原右孩子”和“当前节点”分别接到哪里。',
        bullets: [
          '易错点 1：把原右孩子和当前节点挂反。',
          '易错点 2：没清空旧的左右指针。',
          '易错点 3：从上往下直接改，导致原结构被破坏。',
          '延伸方向：翻转二叉树、树展开为链表、树的序列化改造。',
        ],
      },
    ],
  },
  {
    id: 'read-n-characters-given-read4',
    label: '157. LeetCode 157. 用 Read4 读取 N 个字符',
    difficulty: '简单',
    description:
      '这题是在练接口适配。真正关键不是循环几次，而是把系统提供的 `read4` 能力稳定包装成“读任意 n 个字符”的接口。',
    outcome:
      '你能掌握分块读取与结果拼装的基本思路，理解什么时候该停读，并建立对面向接口题目的实现节奏。',
    sections: [
      {
        id: 'read4-summary',
        title: '题目在问什么',
        summary:
          '系统提供 `read4(buf4)`，每次最多读 4 个字符。要求实现 `read(buf, n)`，把最多 `n` 个字符读入目标缓冲区。',
        bullets: [
          '底层能力固定是 4 个一组读取。',
          '上层需求是任意 n。',
          '要处理文件提前结束。',
          '这是接口包装题。',
        ],
      },
      {
        id: 'read4-loop',
        title: '整体就是反复调用 `read4`，直到满足两个停止条件',
        summary:
          '循环中不断取 4 个字符块，然后按需拷贝进结果区。停止条件有两个：已经读满 `n`，或者 `read4` 返回值小于 4，说明文件到头了。',
        bullets: [
          '读满 `n` 就停。',
          '底层读不到更多也要停。',
          '每轮只消费实际读到的字符数。',
          '这是分块读取的标准套路。',
        ],
      },
      {
        id: 'read4-copy',
        title: '关键不是每次读多少，而是每次最多拷贝多少',
        summary:
          '即使 `read4` 读到了 4 个字符，如果当前只剩 2 个名额，也只能复制 2 个进目标缓冲区。真正控制正确性的，是“拷贝上限”而不是“读取上限”。',
        bullets: [
          '读取块大小和需求块大小不总一致。',
          '要用 `Math.min` 控制复制数量。',
          '防止写越界。',
          '体现接口适配思路。',
        ],
      },
      {
        id: 'read4-eof',
        title: '`read4` 返回值小于 4 就意味着没有更多数据',
        summary:
          '文件剩余字符不足 4 时，`read4` 会只返回实际读到的数量；如果是 0，就表示已经没有任何字符可读了。这是退出循环的重要信号。',
        bullets: [
          '返回值是这轮有效字符数。',
          '0 表示彻底结束。',
          '小于 4 说明到文件尾部了。',
          '不要继续盲读。',
        ],
        callout:
          '这类接口题真正考的是你能不能把“底层批量能力”和“上层精确需求”之间的边界处理干净。',
      },
      {
        id: 'read4-solution',
        title: '标准解法：分块读取并按需拷贝',
        summary:
          '创建一个长度为 4 的临时缓冲区，循环调用 `read4`。每轮根据还需要的字符数决定复制多少，累计到结果缓冲区里，直到读满或文件结束。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '额外空间主要是长度 4 的临时缓冲区。',
          '逻辑清晰且稳定。',
          '是接口封装题的基础版。',
        ],
        code: `declare function read4(buf4: string[]): number

function read(buf: string[], n: number): number {
  const buf4 = new Array<string>(4)
  let total = 0

  while (total < n) {
    const count = read4(buf4)

    if (count === 0) {
      break
    }

    const length = Math.min(count, n - total)

    for (let i = 0; i < length; i += 1) {
      buf[total] = buf4[i]
      total += 1
    }

    if (count < 4) {
      break
    }
  }

  return total
}`,
      },
      {
        id: 'read4-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是每次把 `read4` 读到的字符全部复制走，结果超过了 `n` 的目标上限。',
        bullets: [
          '易错点 1：没有限制复制数量。',
          '易错点 2：`count < 4` 时还继续循环。',
          '易错点 3：把读取次数和写入次数混为一谈。',
          '延伸方向：多次调用版、文件流读取、分块上传下载。',
        ],
      },
    ],
  },
  {
    id: 'read-n-characters-given-read4-ii',
    label: '158. LeetCode 158. 用 Read4 读取 N 个字符 II - 多次调用',
    difficulty: '困难',
    description:
      '这题是在练跨调用状态管理。真正关键不是复用上一题代码，而是把一次没用完的字符缓存下来，供下次继续消费。',
    outcome:
      '你能掌握带内部缓冲区的流式读取设计，理解“生产与消费速度不一致”时为什么必须做持久化缓存，并写出支持多次调用的读取器。',
    sections: [
      {
        id: 'read4-ii-summary',
        title: '题目在问什么',
        summary:
          '仍然通过 `read4` 读取字符，但这次 `read(buf, n)` 会被调用很多次，要求整体行为正确。',
        bullets: [
          '和上一题最大的区别是多次调用。',
          '上次多读出来的字符不能丢。',
          '内部状态需要持久保存。',
          '这是流式读取进阶题。',
        ],
      },
      {
        id: 'read4-ii-core',
        title: '难点在于 `read4` 总是按 4 个块生产，而外部每次只想消费 n 个',
        summary:
          '如果本次只需要 1 个字符，`read4` 却返回了 4 个，那么多出来的 3 个必须保存在对象内部，下次调用时优先消费这些缓存，而不是重新去底层读取。',
        bullets: [
          '生产速度和消费速度不一致。',
          '缓存是必须的，不是可选优化。',
          '未消费数据要跨调用保留。',
          '这就是设计重点。',
        ],
      },
      {
        id: 'read4-ii-buffer',
        title: '内部缓冲区至少要记录内容、当前位置和有效长度',
        summary:
          '你需要知道缓存数组里总共有多少有效字符、当前消费到第几个，以及什么时候缓存已经用完，可以重新调用 `read4` 补货。',
        bullets: [
          '需要一块长度 4 的内部缓存。',
          '需要读指针。',
          '需要有效数据长度。',
          '三者缺一不可。',
        ],
      },
      {
        id: 'read4-ii-priority',
        title: '每次调用都应该先吃缓存，再决定要不要补读',
        summary:
          '只要内部缓存里还有数据，就应该优先复制给用户缓冲区。缓存耗尽后，再触发一次新的 `read4`。这样才能保证多次调用时字符顺序完全正确。',
        bullets: [
          '缓存优先，底层读取靠后。',
          '保证字符顺序不乱。',
          '避免重复读取或丢数据。',
          '这是实现正确性的关键。',
        ],
        callout:
          '很多“多次调用版”题目，本质上都在考你有没有意识到“函数之间其实共享一个长期存在的状态机”。',
      },
      {
        id: 'read4-ii-solution',
        title: '标准解法：对象内维护 read4 缓冲区',
        summary:
          '把 `buf4`、缓存指针和缓存长度定义为类成员。`read` 每次先消费缓存；若缓存空了就重新调用 `read4` 填充；直到读满 `n` 或底层读空。',
        bullets: [
          '时间复杂度仍然与总读取字符数线性相关。',
          '关键在跨调用缓存持久化。',
          '非常像真实流式 API 封装。',
          '是接口状态管理代表题。',
        ],
        code: `declare function read4(buf4: string[]): number

class Reader {
  private buf4 = new Array<string>(4)
  private size = 0
  private index = 0

  read(buf: string[], n: number): number {
    let total = 0

    while (total < n) {
      if (this.index === this.size) {
        this.size = read4(this.buf4)
        this.index = 0

        if (this.size === 0) {
          break
        }
      }

      while (total < n && this.index < this.size) {
        buf[total] = this.buf4[this.index]
        total += 1
        this.index += 1
      }
    }

    return total
  }
}`,
      },
      {
        id: 'read4-ii-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把上一题答案原样搬过来，导致多读出来的字符直接被丢掉。',
        bullets: [
          '易错点 1：没有内部缓存字段。',
          '易错点 2：每次调用都从空状态开始。',
          '易错点 3：缓存未消费完就再次调用 `read4`。',
          '延伸方向：分页加载、消息队列消费者、本地文件流封装。',
        ],
      },
    ],
  },
  {
    id: 'longest-substring-with-at-most-two-distinct-characters',
    label: '159. LeetCode 159. 至多包含两个不同字符的最长子串',
    difficulty: '中等',
    description:
      '这题是在练滑动窗口里“窗口约束”的维护。真正关键不是枚举所有子串，而是让窗口始终只容纳最多两种字符。',
    outcome:
      '你能掌握“至多 K 种不同字符”这一类滑动窗口模板，理解左右指针与计数表如何协同维护窗口合法性。',
    sections: [
      {
        id: 'two-distinct-summary',
        title: '题目在问什么',
        summary: '给定字符串，求其中至多包含两个不同字符的最长子串长度。',
        bullets: [
          '子串必须连续。',
          '允许只有 1 种字符。',
          '关键约束是“最多两种”。',
          '这是滑动窗口经典题。',
        ],
      },
      {
        id: 'two-distinct-window',
        title: '这类题的典型思路是维护一个始终合法的窗口',
        summary:
          '右指针负责扩张窗口，左指针负责在窗口不合法时收缩。只要窗口里不同字符的种类数超过 2，就不断左移直到恢复合法。',
        bullets: [
          '右扩张，左修复。',
          '窗口合法性实时维护。',
          '不需要重复枚举子串。',
          '这是滑动窗口的核心节奏。',
        ],
      },
      {
        id: 'two-distinct-counter',
        title: '哈希表负责记录每种字符在窗口中的出现次数',
        summary:
          '单靠左右指针不够，因为你还需要知道某个字符被移出窗口后是否彻底消失。计数表可以帮助你在次数减到 0 时及时删掉该字符类型。',
        bullets: [
          '计数表记录窗口内容。',
          '次数归零时要删除键。',
          '窗口种类数由表大小反映。',
          '这是判断合法性的直接依据。',
        ],
      },
      {
        id: 'two-distinct-template',
        title: '这题其实是“至多 K 种字符”模板的 K=2 特例',
        summary:
          '把 2 换成任意 K，思路完全一致。因此这道题的价值不只在本身，而是在于它能沉淀出一套通用的窗口模板。',
        bullets: [
          'K 变化，模板不变。',
          '是很多字符串题的母题。',
          '窗口类题目复用率很高。',
          '值得抽象总结。',
        ],
        callout:
          '真正高价值的刷题，不是记住某一道题，而是识别出它背后那套以后还能复用很多次的模板。',
      },
      {
        id: 'two-distinct-solution',
        title: '标准解法：滑动窗口 + 计数表',
        summary:
          '右指针遍历字符串并加入计数表；若不同字符超过 2，就不断移动左指针并减少计数，直到窗口恢复合法；过程中持续更新窗口最大长度。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度与字符种类数相关。',
          '关键在合法窗口的维护。',
          '是窗口模板代表题。',
        ],
        code: `function lengthOfLongestSubstringTwoDistinct(s: string): number {
  const counter = new Map<string, number>()
  let left = 0
  let answer = 0

  for (let right = 0; right < s.length; right += 1) {
    const char = s[right]
    counter.set(char, (counter.get(char) ?? 0) + 1)

    while (counter.size > 2) {
      const leftChar = s[left]
      const count = (counter.get(leftChar) ?? 0) - 1

      if (count === 0) {
        counter.delete(leftChar)
      } else {
        counter.set(leftChar, count)
      }

      left += 1
    }

    answer = Math.max(answer, right - left + 1)
  }

  return answer
}`,
      },
      {
        id: 'two-distinct-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是窗口超限后只缩一步就停，导致窗口其实仍然不合法。',
        bullets: [
          '易错点 1：超限后没有用 `while` 持续收缩。',
          '易错点 2：计数减到 0 没删键。',
          '易错点 3：把子串和子序列混淆。',
          '延伸方向：无重复字符最长子串、至多 K 种字符、最小覆盖子串。',
        ],
      },
    ],
  },
  {
    id: 'intersection-of-two-linked-lists',
    label: '160. LeetCode 160. 相交链表',
    difficulty: '简单',
    description:
      '这题是在练链表路径对齐。真正关键不是判断值是否相同，而是让两个指针走过相同的总路程后自然在交点汇合。',
    outcome:
      '你能掌握双指针路径补齐的经典技巧，理解为什么切换链表头后总路程会相等，并正确区分“节点相同”和“值相同”。',
    sections: [
      {
        id: 'intersection-summary',
        title: '题目在问什么',
        summary:
          '给定两个单链表，找出它们开始相交的节点；如果不相交，则返回 `null`。',
        bullets: [
          '比较的是节点引用，不是值。',
          '链表可能长度不同。',
          '希望用常数空间。',
          '这是双指针经典题。',
        ],
      },
      {
        id: 'intersection-why-switch',
        title: '最巧的思路是让两个指针都走完 A + B 这段总路程',
        summary:
          '指针 A 先走链表 A 再走链表 B，指针 B 先走链表 B 再走链表 A。这样两者总路程相同，如果有交点，就会在交点处同步抵达；如果没有，也会一起到 `null`。',
        bullets: [
          '本质是路程补齐。',
          '不需要显式求长度差。',
          '有交点会在交点相遇。',
          '无交点会一起走到空。',
        ],
      },
      {
        id: 'intersection-node',
        title: '一定要比较节点本身，不能比较节点值',
        summary:
          '两条链表的不同节点完全可能恰好存着相同的数值，但它们并不相交。只有当两个指针指向内存中的同一个节点时，才算真的相交。',
        bullets: [
          '值相同不代表节点相同。',
          '题目考的是结构共享。',
          '判断条件是引用相等。',
          '这是最基本但最容易忽视的点。',
        ],
      },
      {
        id: 'intersection-proof',
        title: '为什么切换头节点后就能对齐，本质是长度差被抵消了',
        summary:
          '假设两链表前缀长度不同，第一次各自走完本链后，长的那条会多走掉一段前缀；切到另一条后，短的那条会补上这段差值，于是两者在进入公共尾部时正好齐平。',
        bullets: [
          '长度差不会消失，只是被补齐。',
          '切换头节点是对齐动作。',
          '证明过程比背模板更重要。',
          '这是双指针技巧的精髓。',
        ],
        callout:
          '双指针很多时候的高明之处，不在“两个指针一起走”，而在于它们被设计成最终会走出同样长的路。',
      },
      {
        id: 'intersection-solution',
        title: '标准解法：双指针走完两条链表',
        summary:
          '定义两个指针分别从两条链表头出发；每轮同时前进一步，若某个指针走到空，就切换到另一条链表头。最终二者第一次相等的位置就是交点，或一起为 `null`。',
        bullets: [
          '时间复杂度是 `O(m + n)`。',
          '空间复杂度是 `O(1)`。',
          '不需要额外集合或长度计算。',
          '是链表双指针的高频模板。',
        ],
        code: `function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  let pointerA = headA
  let pointerB = headB

  while (pointerA !== pointerB) {
    pointerA = pointerA ? pointerA.next : headB
    pointerB = pointerB ? pointerB.next : headA
  }

  return pointerA
}`,
      },
      {
        id: 'intersection-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是思路对了但判断条件写成比较值，结果误判出“伪交点”。',
        bullets: [
          '易错点 1：比较 `val` 而不是节点引用。',
          '易错点 2：切换链表头逻辑写反。',
          '易错点 3：没理解为何最终会相遇。',
          '延伸方向：环形链表、删除倒数第 N 个节点、链表中点。',
        ],
      },
    ],
  },
  {
    id: 'one-edit-distance',
    label: '161. LeetCode 161. 相隔为 1 的编辑距离',
    difficulty: '中等',
    description:
      '这题是在练双指针比较字符串差异。真正关键不是上完整编辑距离 DP，而是认清这里只允许恰好一次插入、删除或替换。',
    outcome:
      '你能掌握长度分类讨论的字符串比较思路，理解何时允许跳过一个字符，并写出只针对“一次编辑”场景的线性解法。',
    sections: [
      {
        id: 'one-edit-summary',
        title: '题目在问什么',
        summary:
          '给定两个字符串，判断它们是否恰好相差一次编辑操作，编辑操作包括插入、删除或替换一个字符。',
        bullets: [
          '是“恰好一次”，不是最多一次。',
          '操作只有三类：插入、删除、替换。',
          '目标是布尔判断。',
          '不必上完整 DP。',
        ],
      },
      {
        id: 'one-edit-length',
        title: '先按长度关系分类，问题会一下子清晰很多',
        summary:
          '如果长度差超过 1，肯定不可能只编辑一次；若长度相等，只可能是替换；若长度差为 1，只可能是插入或删除。这个分类几乎已经把解法框死了。',
        bullets: [
          '长度差大于 1 直接 false。',
          '等长看替换。',
          '差 1 看插入或删除。',
          '分类是解题主轴。',
        ],
      },
      {
        id: 'one-edit-first-diff',
        title: '找到第一个不同的位置后，再看剩余部分是否对齐',
        summary:
          '如果是替换场景，那么跳过两个字符串当前字符后，后面必须完全相同；如果是插入或删除场景，则只跳过较长字符串当前字符，后面也必须完全相同。',
        bullets: [
          '第一个差异点决定如何跳过。',
          '替换跳两边。',
          '插删只跳长串一边。',
          '后缀是否一致决定结果。',
        ],
      },
      {
        id: 'one-edit-edge',
        title: '别漏掉完全相同字符串这个边界，它应该返回 false',
        summary:
          '很多人会因为“最多一次编辑”思维惯性，把两个字符串完全相同也算通过。但本题要求是恰好一次，所以完全相同必须返回 `false`。',
        bullets: [
          '恰好一次比最多一次更严格。',
          '完全相同不算。',
          '尾部多一个字符时才算一次插入。',
          '题意细节决定边界判断。',
        ],
        callout:
          '字符串题最常见的失分，不是不会写，而是把“至多”“至少”“恰好”这种语义词看轻了。',
      },
      {
        id: 'one-edit-solution',
        title: '标准解法：长度分类 + 首个差异点比较',
        summary:
          '先保证第一个字符串不长于第二个字符串。若长度差超过 1 直接返回 false；遍历找到首个不同字符后，根据长度是否相等决定跳过方式；若直到结束都没差异，则只有长度差为 1 才为 true。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '比完整编辑距离 DP 简洁得多。',
          '核心是分类讨论。',
        ],
        code: `function isOneEditDistance(s: string, t: string): boolean {
  if (s.length > t.length) {
    return isOneEditDistance(t, s)
  }

  const diff = t.length - s.length

  if (diff > 1) {
    return false
  }

  for (let i = 0; i < s.length; i += 1) {
    if (s[i] !== t[i]) {
      if (diff === 0) {
        return s.slice(i + 1) === t.slice(i + 1)
      }

      return s.slice(i) === t.slice(i + 1)
    }
  }

  return diff === 1
}`,
      },
      {
        id: 'one-edit-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有区分“恰好一次”和“最多一次”，导致完全相同的字符串被误判为 true。',
        bullets: [
          '易错点 1：完全相同返回 true。',
          '易错点 2：长度差超过 1 还继续比较。',
          '易错点 3：插删场景两边都跳过了字符。',
          '延伸方向：编辑距离、比较版本号、字符串对齐。',
        ],
      },
    ],
  },
  {
    id: 'find-peak-element',
    label: '162. LeetCode 162. 寻找峰值',
    difficulty: '中等',
    description:
      '这题是在练基于趋势的二分查找。真正关键不是找全局最大值，而是利用相邻元素大小关系判断哪一侧一定存在峰值。',
    outcome:
      '你能掌握“看局部趋势决定搜索方向”的二分思路，理解为什么只比较 `mid` 和 `mid + 1` 就足够，并建立对山坡型问题的判断直觉。',
    sections: [
      {
        id: 'find-peak-summary',
        title: '题目在问什么',
        summary:
          '给定一个数组，找任意一个峰值下标。峰值定义为严格大于相邻元素的元素。',
        bullets: [
          '只要返回任意一个峰值即可。',
          '边界外可以视为负无穷。',
          '不要求找最大值。',
          '这是趋势型二分题。',
        ],
      },
      {
        id: 'find-peak-trend',
        title: '关键不是看绝对大小，而是看中点处于上坡还是下坡',
        summary:
          '如果 `nums[mid] < nums[mid + 1]`，说明当前处于上坡，那么右边一定存在峰值；反过来如果 `nums[mid] > nums[mid + 1]`，说明右侧开始下坡，左侧含中点这边一定存在峰值。',
        bullets: [
          '上坡就往右找。',
          '下坡就往左找。',
          '趋势比具体数值更重要。',
          '这是题目最核心的不变量。',
        ],
      },
      {
        id: 'find-peak-why-exist',
        title: '为什么某一侧一定有峰值，本质是连续上升和连续下降都终会结束',
        summary:
          '如果一直上坡，最终会在数组末尾形成峰值；如果出现下坡，那么转折点附近就已经有峰值。因此根据坡度方向收缩区间是安全的。',
        bullets: [
          '边界视为负无穷很重要。',
          '上升序列末端必成峰。',
          '下降前拐点附近会出峰。',
          '这保证二分判断成立。',
        ],
      },
      {
        id: 'find-peak-mid-plus-one',
        title: '比较 `mid` 与 `mid + 1` 比和两边都比较更简洁',
        summary:
          '因为我们只需要知道当前局部是向上还是向下，就已经足以决定搜索方向。这样还能避免写很多边界分支。',
        bullets: [
          '单侧比较就能决定方向。',
          '代码更短，边界更稳。',
          '适合二分模板化实现。',
          '是这题常见标准写法。',
        ],
        callout:
          '高质量的二分，往往不是比较更多，而是找到那个“恰好够用、又不会引出额外边界”的比较方式。',
      },
      {
        id: 'find-peak-solution',
        title: '标准解法：基于坡度方向的二分',
        summary:
          '维护左右边界。每轮取中点，如果 `nums[mid] < nums[mid + 1]`，说明峰值在右边；否则峰值在左边含中点。最终左右指针相遇的位置就是某个峰值。',
        bullets: [
          '时间复杂度是 `O(log n)`。',
          '空间复杂度是 `O(1)`。',
          '只返回任意一个峰值即可。',
          '是趋势型二分代表题。',
        ],
        code: `function findPeakElement(nums: number[]): number {
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return left
}`,
      },
      {
        id: 'find-peak-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是执着于找全局最大值，从而错过了题目只要求“任意一个峰值”这一重要放宽条件。',
        bullets: [
          '易错点 1：把它做成线性找最大值。',
          '易错点 2：区间更新丢掉中点可能性。',
          '易错点 3：没理解为什么某侧一定存在峰值。',
          '延伸方向：寻找峰值 II、山脉数组、局部极值搜索。',
        ],
      },
    ],
  },
  {
    id: 'missing-ranges',
    label: '163. LeetCode 163. 缺失的区间',
    difficulty: '简单',
    description:
      '这题是在练区间枚举与边界补齐。真正关键不是遍历数组，而是把首尾边界也统一纳入“相邻元素之间的缺口”模型。',
    outcome:
      '你能掌握根据相邻数值差生成缺失区间的思路，理解哨兵边界在区间题里的价值，并写出清晰的区间格式化逻辑。',
    sections: [
      {
        id: 'missing-ranges-summary',
        title: '题目在问什么',
        summary:
          '给定一个有序数组以及下界 `lower`、上界 `upper`，要求找出闭区间 `[lower, upper]` 内所有缺失的数字区间。',
        bullets: [
          '数组本身有序。',
          '输出的是缺失区间列表。',
          '首尾边界同样重要。',
          '这是区间枚举题。',
        ],
      },
      {
        id: 'missing-ranges-gap',
        title: '核心就是看相邻已知数字之间有没有“空档”',
        summary:
          '如果前一个已知值是 `prev`，当前值是 `current`，那么当 `current - prev >= 2` 时，中间就存在缺失区间 `[prev + 1, current - 1]`。',
        bullets: [
          '相邻差值决定是否有缺失。',
          '差 1 表示紧挨着，没有缺口。',
          '差至少 2 才能形成区间。',
          '这是主判断逻辑。',
        ],
      },
      {
        id: 'missing-ranges-boundary',
        title: '别把首尾当特殊怪物，给它们补哨兵就能统一处理',
        summary:
          '可以先把 `prev` 初始化为 `lower - 1`，最后再把 `current` 视为 `upper + 1`。这样首缺口和尾缺口都能被视作普通的“相邻值之间的区间缺失”。',
        bullets: [
          '哨兵边界能统一逻辑。',
          '省掉大量首尾特判。',
          '是区间题常见技巧。',
          '实现会更干净。',
        ],
      },
      {
        id: 'missing-ranges-format',
        title: '输出阶段要区分单点区间和连续区间',
        summary:
          '如果缺失区间左右端点相同，输出单个数字即可；否则输出 `start->end`。这一步虽然只是格式化，但经常是题目要求的一部分。',
        bullets: [
          '单点和区间格式不同。',
          '不要忽略输出规范。',
          '数据判断和展示要分层。',
          '实现上可以单独写格式函数。',
        ],
        callout:
          '很多题的最后一步不是算法难点，却仍然会决定你这道题是不是“真正做完了”。',
      },
      {
        id: 'missing-ranges-solution',
        title: '标准解法：哨兵边界 + 相邻差值判断',
        summary:
          '用 `prev` 记录上一个已知数字，初始化为 `lower - 1`。遍历数组以及最后一个虚拟值 `upper + 1`，只要发现当前值与 `prev` 的差至少为 2，就生成一个缺失区间。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度不计输出为 `O(1)`。',
          '关键在首尾统一处理。',
          '是区间枚举的基础题。',
        ],
        code: `function findMissingRanges(
  nums: number[],
  lower: number,
  upper: number,
): string[] {
  const result: string[] = []
  let prev = lower - 1

  const format = (start: number, end: number) =>
    start === end ? String(start) : start + "->" + end

  for (let i = 0; i <= nums.length; i += 1) {
    const current = i === nums.length ? upper + 1 : nums[i]

    if (current - prev >= 2) {
      result.push(format(prev + 1, current - 1))
    }

    prev = current
  }

  return result
}`,
      },
      {
        id: 'missing-ranges-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把首尾边界独立手写，结果分支越来越多、还容易漏情况。',
        bullets: [
          '易错点 1：漏掉 `lower` 前后的缺失段。',
          '易错点 2：单点区间和连续区间格式混淆。',
          '易错点 3：没有使用哨兵导致逻辑碎裂。',
          '延伸方向：合并区间、插入区间、会议室安排。',
        ],
      },
    ],
  },
  {
    id: 'maximum-gap',
    label: '164. LeetCode 164. 最大间距',
    difficulty: '困难',
    description:
      '这题是在练桶排序思想。真正关键不是先把数组完整排好序，而是利用抽屉原理证明最大间距一定出现在不同桶之间。',
    outcome:
      '你能掌握基于桶的线性时间解法，理解为什么只记录每个桶的最小值和最大值就够了，并建立对“用数学性质降复杂度”的敏感度。',
    sections: [
      {
        id: 'maximum-gap-summary',
        title: '题目在问什么',
        summary:
          '给定一个无序数组，要求返回排序后相邻元素的最大差值，并尽量做到线性时间与线性额外空间。',
        bullets: [
          '答案定义在排序后的相邻元素之间。',
          '但不鼓励直接完整排序。',
          '目标复杂度指向非比较排序思路。',
          '这是桶思想代表题。',
        ],
      },
      {
        id: 'maximum-gap-pigeonhole',
        title: '抽屉原理告诉你：最大间距不可能出现在同一个桶内部',
        summary:
          '把数值区间均匀划成若干桶后，同一桶内元素之间的差值被桶宽限制住；真正可能形成更大间距的，是某个非空桶的最小值与前一个非空桶的最大值之间。',
        bullets: [
          '桶宽限制了桶内最大差值。',
          '跨桶间距才是重点。',
          '这是整题的数学核心。',
          '理解这个结论后实现就很自然。',
        ],
      },
      {
        id: 'maximum-gap-bucket-info',
        title: '每个桶不需要存所有元素，只需要最小值和最大值',
        summary:
          '因为最终只关心跨桶比较：当前桶的最小值减去前一个非空桶的最大值。所以桶内具体排序没必要，记录边界值就足够了。',
        bullets: [
          '桶内细节不是答案重点。',
          '边界值才参与最终比较。',
          '这让空间保持线性。',
          '也是算法高效的原因。',
        ],
      },
      {
        id: 'maximum-gap-build',
        title: '桶数量和桶宽的设计要保证每个桶都可定位',
        summary:
          '常见做法是令桶宽至少为 1，并用 `(maxValue - minValue) / (n - 1)` 作为理论下界来设计桶宽。这样能保证如果数组有分散空隙，跨桶比较一定捕捉得到。',
        bullets: [
          '桶宽不能为 0。',
          '元素少于 2 个可直接返回 0。',
          '最值要先单独求出。',
          '桶设计和数学结论是配套的。',
        ],
        callout:
          '很多“看起来像排序题”的困难题，真正突破口不在代码技巧，而在你能不能先找出一个足以降低复杂度的数学事实。',
      },
      {
        id: 'maximum-gap-solution',
        title: '标准解法：桶排序思想 + 非空桶间比较',
        summary:
          '先找到全局最小值和最大值，按桶宽把数字分配进桶中，每个桶只维护最小值、最大值和是否为空。最后线性扫描桶，比较当前非空桶最小值与前一个非空桶最大值的差。',
        bullets: [
          '时间复杂度可以做到 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '关键在桶内不排序、只存边界。',
          '是数学性质驱动算法设计的代表题。',
        ],
        code: `function maximumGap(nums: number[]): number {
  if (nums.length < 2) {
    return 0
  }

  let minValue = nums[0]
  let maxValue = nums[0]

  for (const value of nums) {
    minValue = Math.min(minValue, value)
    maxValue = Math.max(maxValue, value)
  }

  if (minValue === maxValue) {
    return 0
  }

  const bucketSize = Math.max(1, Math.floor((maxValue - minValue) / (nums.length - 1)))
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  const bucketMin = new Array<number>(bucketCount).fill(Number.POSITIVE_INFINITY)
  const bucketMax = new Array<number>(bucketCount).fill(Number.NEGATIVE_INFINITY)
  const bucketUsed = new Array<boolean>(bucketCount).fill(false)

  for (const value of nums) {
    const index = Math.floor((value - minValue) / bucketSize)
    bucketUsed[index] = true
    bucketMin[index] = Math.min(bucketMin[index], value)
    bucketMax[index] = Math.max(bucketMax[index], value)
  }

  let answer = 0
  let prevMax = minValue

  for (let i = 0; i < bucketCount; i += 1) {
    if (!bucketUsed[i]) {
      continue
    }

    answer = Math.max(answer, bucketMin[i] - prevMax)
    prevMax = bucketMax[i]
  }

  return answer
}`,
      },
      {
        id: 'maximum-gap-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是知道要用桶，但仍然在桶内继续完整排序，等于把线性时间优势又做没了。',
        bullets: [
          '易错点 1：桶内存所有元素再排序。',
          '易错点 2：桶宽计算可能变成 0。',
          '易错点 3：没有跳过空桶。',
          '延伸方向：基数排序、计数排序、Top K 与非比较排序思想。',
        ],
      },
    ],
  },
  {
    id: 'compare-version-numbers',
    label: '165. LeetCode 165. 比较版本号',
    difficulty: '中等',
    description:
      '这题是在练分段字符串比较。真正关键不是按整体字符串字典序去比，而是把每一段版本号当成独立整数逐段比较。',
    outcome:
      '你能掌握按分隔符拆段、补零对齐和逐段比较的思路，理解为什么前导零不影响版本语义。',
    sections: [
      {
        id: 'compare-version-summary',
        title: '题目在问什么',
        summary:
          '给定两个版本号字符串，比较它们大小，相等返回 0，前者大返回 1，后者大返回 -1。',
        bullets: [
          '版本号由点号分隔。',
          '每一段都应按整数理解。',
          '前导零不影响大小。',
          '是字符串拆分比较题。',
        ],
      },
      {
        id: 'compare-version-segment',
        title: '核心思路是逐段比较，而不是把整个字符串当普通文本比较',
        summary:
          '例如 `"1.10"` 和 `"1.2"`，如果按字符串比会出错，但按整数段比较就很清楚：前一段相等，后一段 10 大于 2。',
        bullets: [
          '每段有独立语义。',
          '字符串字典序不适用于这题。',
          '必须先拆分，再逐段处理。',
          '这是第一层认知分界线。',
        ],
      },
      {
        id: 'compare-version-padding',
        title: '长度不同没关系，缺失段按 0 处理',
        summary:
          '如果一个版本号段数更多，并不意味着它一定更大。只有多出来的那些段里存在非零值时，才会影响结果。',
        bullets: [
          '`1.0` 和 `1` 应视为相等。',
          '缺失段可当作 0。',
          '需要按较长长度遍历。',
          '这是常见边界点。',
        ],
      },
      {
        id: 'compare-version-leading-zero',
        title: '前导零不重要，因为段的比较本质是整数比较',
        summary:
          '像 `"001"` 和 `"1"` 表示的是同一个数值。只要把每段转成数字，前导零自然被消掉。',
        bullets: [
          '整数化后无需单独剥离前导零。',
          '数值语义比文本表现更重要。',
          '让实现变得更简单。',
          '这是题意里的关键信号。',
        ],
        callout:
          '很多字符串题表面上是文本，实质上比较的是被文本包裹的结构化语义。',
      },
      {
        id: 'compare-version-solution',
        title: '标准解法：拆分数组后逐段比较',
        summary:
          '把两个版本号按点号拆成数组，遍历到较长长度。每一轮都取出对应段转成数字，不存在的段视为 0；一旦发现大小不同立即返回。',
        bullets: [
          '时间复杂度与总字符数线性相关。',
          '空间复杂度主要来自拆分数组。',
          '实现短但边界要想清。',
          '是典型的逐段解析题。',
        ],
        code: `function compareVersion(version1: string, version2: string): number {
  const parts1 = version1.split(".")
  const parts2 = version2.split(".")
  const length = Math.max(parts1.length, parts2.length)

  for (let i = 0; i < length; i += 1) {
    const value1 = i < parts1.length ? Number(parts1[i]) : 0
    const value2 = i < parts2.length ? Number(parts2[i]) : 0

    if (value1 > value2) {
      return 1
    }

    if (value1 < value2) {
      return -1
    }
  }

  return 0
}`,
      },
      {
        id: 'compare-version-mistakes',
        title: '易错点和延伸方向',
        summary: '这题最常见的问题，是直接比较字符串或忽略尾部多余的 0 段。',
        bullets: [
          '易错点 1：用字典序比较版本号。',
          '易错点 2：没有把缺失段按 0 处理。',
          '易错点 3：把前导零当成不同版本。',
          '延伸方向：IP 地址比较、文件版本治理、语义化版本解析。',
        ],
      },
    ],
  },
  {
    id: 'fraction-to-recurring-decimal',
    label: '166. LeetCode 166. 分数到小数',
    difficulty: '中等',
    description:
      '这题是在练长除法模拟。真正关键不是做普通除法，而是识别余数一旦重复，小数部分就开始循环。',
    outcome:
      '你能掌握分数转字符串小数的完整过程，理解符号处理、整数部分、小数部分和循环节定位之间的关系。',
    sections: [
      {
        id: 'fraction-summary',
        title: '题目在问什么',
        summary:
          '给定分子和分母，返回它们相除后的小数字符串；若小数部分存在循环节，需要用括号括起来。',
        bullets: [
          '结果是字符串，不是数值。',
          '循环小数要标出循环部分。',
          '符号也要正确处理。',
          '是数学模拟题。',
        ],
      },
      {
        id: 'fraction-sign',
        title: '第一步先把符号处理干净，再只看绝对值',
        summary:
          '只要分子和分母一正一负，结果就是负数。把符号先决定好，后续统一用绝对值做除法，逻辑会简单很多。',
        bullets: [
          '异号为负，同号为正。',
          '0 的结果直接返回 `"0"`。',
          '先处理符号，后处理数值。',
          '可减少后续分支。',
        ],
      },
      {
        id: 'fraction-remainder',
        title: '循环节的本质不是数字重复，而是余数重复',
        summary:
          '长除法过程中，如果某个余数再次出现，说明从它第一次出现到现在这段生成的小数位会无限重复。这就是为什么要用哈希表记录“余数第一次出现的位置”。',
        bullets: [
          '余数决定后续小数位。',
          '余数重复就意味着状态重复。',
          '这是检测循环节的核心。',
          '和直接找字符串重复完全不同。',
        ],
      },
      {
        id: 'fraction-build',
        title: '小数部分要边算边拼，并在循环入口处插括号',
        summary:
          '每轮把余数乘 10，得到当前位的小数；然后更新余数继续。若发现余数已出现过，就能在当时记录的位置插入左括号，并在末尾补右括号。',
        bullets: [
          '哈希表存的是余数对应的小数位下标。',
          '一旦重复就定位循环入口。',
          '插括号需要知道开始位置。',
          '构造字符串要有步骤感。',
        ],
        callout:
          '模拟题的稳定写法，往往来自把每一步状态对象想清楚，而不是盯着最终字符串硬拼。',
      },
      {
        id: 'fraction-solution',
        title: '标准解法：长除法 + 余数位置表',
        summary:
          '先计算整数部分，再处理余数；若余数为 0 直接结束。否则用哈希表记录每个余数第一次出现时的小数位位置，循环生成小数位，发现余数重复时插入括号并返回。',
        bullets: [
          '时间复杂度与循环节长度相关。',
          '空间复杂度主要来自余数表。',
          '核心是“余数重复”而不是“数字重复”。',
          '是非常经典的长除法模拟题。',
        ],
        code: `function fractionToDecimal(numerator: number, denominator: number): string {
  if (numerator === 0) {
    return "0"
  }

  const negative = (numerator < 0) !== (denominator < 0)
  let dividend = Math.abs(numerator)
  const divisor = Math.abs(denominator)
  let result = negative ? "-" : ""

  result += Math.floor(dividend / divisor)
  let remainder = dividend % divisor

  if (remainder === 0) {
    return result
  }

  result += "."
  const seen = new Map<number, number>()
  const decimal: string[] = []

  while (remainder !== 0) {
    if (seen.has(remainder)) {
      const index = seen.get(remainder)!
      decimal.splice(index, 0, "(")
      decimal.push(")")
      break
    }

    seen.set(remainder, decimal.length)
    remainder *= 10
    decimal.push(String(Math.floor(remainder / divisor)))
    remainder %= divisor
  }

  return result + decimal.join("")
}`,
      },
      {
        id: 'fraction-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是试图直接用浮点数处理，结果循环节和精度都丢了。',
        bullets: [
          '易错点 1：用普通除法直接转字符串。',
          '易错点 2：记录的是小数位，不是余数。',
          '易错点 3：符号和整数部分先后顺序混乱。',
          '延伸方向：大整数运算、长除法模拟、分数字符串解析。',
        ],
      },
    ],
  },
  {
    id: 'two-sum-ii-input-array-is-sorted',
    label: '167. LeetCode 167. 两数之和 II - 输入有序数组',
    difficulty: '中等',
    description:
      '这题是在练有序数组上的双指针。真正关键不是继续用哈希表，而是利用“已排序”这一额外条件直接从两端夹逼。',
    outcome:
      '你能掌握左右指针逼近的思路，理解为什么有序性能把查找两数和的问题降到线性时间和常数空间。',
    sections: [
      {
        id: 'two-sum2-summary',
        title: '题目在问什么',
        summary:
          '给定一个升序数组和目标值，找出两个数之和等于目标值的下标，且题目保证恰好存在一个解。',
        bullets: [
          '数组已升序。',
          '只要返回一组解。',
          '下标通常要求 1-based。',
          '是双指针基础题。',
        ],
      },
      {
        id: 'two-sum2-sorted',
        title: '题目最重要的信息是“有序”，它决定了解法升级',
        summary:
          '在无序场景里常用哈希表，但这里数组有序，就可以通过两端元素和与目标值的比较，直接决定下一步应该移动哪一边。',
        bullets: [
          '排序信息是剪枝基础。',
          '不必再额外开哈希表。',
          '能做到线性扫描。',
          '这类题要先识别输入性质。',
        ],
      },
      {
        id: 'two-sum2-move',
        title: '如果和太小就左指针右移，和太大就右指针左移',
        summary:
          '因为数组是升序，想让和变大，就只能增大左边较小的数；想让和变小，就只能减小右边较大的数。这让指针移动方向有明确依据。',
        bullets: [
          '移动方向由和与目标值比较决定。',
          '每次都能排除一整列不可能解。',
          '不会漏掉正确答案。',
          '这是双指针正确性的核心。',
        ],
      },
      {
        id: 'two-sum2-one-pass',
        title: '两个指针只会单向移动，因此总复杂度是线性的',
        summary:
          '左指针最多走到右边，右指针最多走到左边，二者都不会回头。尽管看起来有 while，但整体每个位置最多访问一次。',
        bullets: [
          '左右指针都单调移动。',
          '没有重复扫描。',
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
        ],
        callout:
          '双指针的威力，往往来自“输入有序”这条先验条件。一旦读题时没看到它，后面解法就会低一个层级。',
      },
      {
        id: 'two-sum2-solution',
        title: '标准解法：左右夹逼双指针',
        summary:
          '定义左指针指向开头、右指针指向结尾。每轮计算两数之和；若等于目标值直接返回，若小于目标值就左指针右移，反之右指针左移。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '代码短且思路干净。',
          '是有序数组双指针入门模板。',
        ],
        code: `function twoSum(numbers: number[], target: number): number[] {
  let left = 0
  let right = numbers.length - 1

  while (left < right) {
    const sum = numbers[left] + numbers[right]

    if (sum === target) {
      return [left + 1, right + 1]
    }

    if (sum < target) {
      left += 1
    } else {
      right -= 1
    }
  }

  return []
}`,
      },
      {
        id: 'two-sum2-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是看见“两数之和”就条件反射写哈希表，而没有利用有序数组条件。',
        bullets: [
          '易错点 1：忽略排序条件继续用哈希表。',
          '易错点 2：返回成 0-based 下标。',
          '易错点 3：和太小时却移动右指针。',
          '延伸方向：三数之和、盛最多水的容器、有序数组二分双指针。',
        ],
      },
    ],
  },
  {
    id: 'excel-sheet-column-title',
    label: '168. LeetCode 168. Excel表列名称',
    difficulty: '简单',
    description:
      '这题是在练 26 进制变体。真正关键不是普通的 0 到 25 映射，而是 Excel 列号没有 0 这一位。',
    outcome:
      '你能掌握“1-based 进制”转换思路，理解为什么每轮都要先减 1，再做取模和整除。',
    sections: [
      {
        id: 'excel-title-summary',
        title: '题目在问什么',
        summary:
          '给定一个正整数列号，返回 Excel 中对应的列名称，例如 `1 -> A`，`28 -> AB`。',
        bullets: [
          '映射字符集是 A 到 Z。',
          '不是普通 26 进制字符串。',
          '没有 0 这一位。',
          '是进制转换变体题。',
        ],
      },
      {
        id: 'excel-title-why-minus-one',
        title: '最关键的一步是先减 1，因为这一套编码是 1-based',
        summary:
          '普通 26 进制会把 0 映射到第一位，但 Excel 列号里 `A` 对应的是 1，不是 0。所以每轮都要先把当前数字减 1，再拿它和 26 做取模。',
        bullets: [
          '先减 1 是为了把系统转回 0-based 计算空间。',
          '否则 `26` 会算不对。',
          '这是整题的本质难点。',
          '理解后代码会非常顺。',
        ],
      },
      {
        id: 'excel-title-build',
        title: '每次取出的是最低位字符，所以最终要反转结果',
        summary:
          '和普通进制转换一样，第一轮拿到的是最右边字符，后面逐步向高位推进。因此可以先把字符压入数组，最后整体反转后再拼接。',
        bullets: [
          '取模得到当前最低位。',
          '整除推进到更高位。',
          '构造顺序和最终显示顺序相反。',
          '这是常规进制转换套路。',
        ],
      },
      {
        id: 'excel-title-map',
        title: '字符映射就是把 0 到 25 映射成 A 到 Z',
        summary:
          '取模结果得到的是 0-based 索引，只要加上字符 `A` 的编码值，就能恢复出正确字母。',
        bullets: [
          '`0 -> A`，`25 -> Z`。',
          '可用 `String.fromCharCode` 生成字符。',
          '映射本身不难，难的是前面的减 1。',
          '抓住主次很重要。',
        ],
        callout:
          '很多所谓“进制题”真正难的不是循环，而是你有没有识别出它到底是不是标准进制系统。',
      },
      {
        id: 'excel-title-solution',
        title: '标准解法：每轮先减 1 的 26 进制转换',
        summary:
          '当列号大于 0 时，先把它减 1，然后取模得到当前字符，再整除 26 进入下一轮。最终把收集到的字符反转并拼接。',
        bullets: [
          '时间复杂度与结果长度相关。',
          '空间复杂度主要来自字符数组。',
          '核心是 1-based 进制处理。',
          '是 Excel 编号系列的基础题。',
        ],
        code: `function convertToTitle(columnNumber: number): string {
  const chars: string[] = []

  while (columnNumber > 0) {
    columnNumber -= 1
    const remainder = columnNumber % 26
    chars.push(String.fromCharCode(65 + remainder))
    columnNumber = Math.floor(columnNumber / 26)
  }

  return chars.reverse().join("")
}`,
      },
      {
        id: 'excel-title-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把它当普通 26 进制，结果在 `26`、`52` 这些边界值上全部翻车。',
        bullets: [
          '易错点 1：没有先减 1。',
          '易错点 2：忘了最终反转字符序列。',
          '易错点 3：把 `A` 当成 0 位处理错顺序。',
          '延伸方向：Excel 列号反向转换、任意进制转换、进位编码题。',
        ],
      },
    ],
  },
  {
    id: 'majority-element',
    label: '169. LeetCode 169. 多数元素',
    difficulty: '简单',
    description:
      '这题是在练 Boyer-Moore 投票法。真正关键不是用哈希表数频次，而是理解“多数元素最终一定能在抵消中活下来”。',
    outcome:
      '你能掌握投票法的状态含义，理解候选人和计数如何在抵消过程中更新，并知道它为什么在多数元素存在时一定成立。',
    sections: [
      {
        id: 'majority-summary',
        title: '题目在问什么',
        summary:
          '给定一个数组，其中多数元素出现次数严格大于 `n / 2`，要求找出这个多数元素。',
        bullets: [
          '题目保证多数元素一定存在。',
          '目标是返回这个元素值。',
          '不要求返回出现次数。',
          '是投票法经典题。',
        ],
      },
      {
        id: 'majority-cancel',
        title: '投票法的本质是“不同元素互相抵消”',
        summary:
          '因为多数元素数量超过其他所有元素总和，所以无论怎么一对一抵消，最后剩下来的那一派一定还是它。',
        bullets: [
          '多数元素有数量绝对优势。',
          '不同元素相遇就可视作互相抵消。',
          '最终幸存者必然是多数元素。',
          '这是正确性的核心直觉。',
        ],
      },
      {
        id: 'majority-state',
        title: '候选人和计数就是对这套抵消过程的压缩表示',
        summary:
          '当计数为 0 时，说明当前之前的抵消已经清空，此时可以把当前元素设成新候选人；若当前元素等于候选人，计数加 1，否则减 1。',
        bullets: [
          '候选人代表当前尚未被抵消完的一派。',
          '计数代表它当前领先的票数。',
          '状态非常轻量。',
          '这是空间降到常数的原因。',
        ],
      },
      {
        id: 'majority-guarantee',
        title: '因为题目保证多数元素存在，所以最终候选人就是答案',
        summary:
          '如果题目没有这个保证，投票法通常还需要再扫一遍验证候选人频次；但这题已经承诺存在多数元素，因此一次扫描就够了。',
        bullets: [
          '题目保证直接省掉验证步骤。',
          '读题条件会直接影响实现复杂度。',
          '不要把模板死记硬套到所有变体。',
          '这也是面试常追问点。',
        ],
        callout:
          '算法题里很多“为什么能少一步”，其实都藏在题目给你的先验保证里。',
      },
      {
        id: 'majority-solution',
        title: '标准解法：Boyer-Moore 投票法',
        summary:
          '初始化候选人和计数。遍历数组时，若计数为 0 就更新候选人；若当前值等于候选人则加 1，否则减 1。遍历结束后候选人即为多数元素。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '非常适合考察数学直觉与状态压缩。',
          '是高频经典题。',
        ],
        code: `function majorityElement(nums: number[]): number {
  let candidate = 0
  let count = 0

  for (const num of nums) {
    if (count === 0) {
      candidate = num
    }

    count += num === candidate ? 1 : -1
  }

  return candidate
}`,
      },
      {
        id: 'majority-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是会背代码但不理解为什么候选人最终一定正确。',
        bullets: [
          '易错点 1：不知道投票法的抵消含义。',
          '易错点 2：在题目已保证存在答案时仍多做无用工作。',
          '易错点 3：把候选人更新时机写错。',
          '延伸方向：超过 `n / 3` 的多数元素、流式统计、频次压缩问题。',
        ],
      },
    ],
  },
  {
    id: 'two-sum-iii-data-structure-design',
    label: '170. LeetCode 170. 两数之和 III - 数据结构设计',
    difficulty: '简单',
    description:
      '这题是在练接口设计权衡。真正关键不是解一道查询题，而是决定把复杂度放在 `add` 还是 `find` 上。',
    outcome:
      '你能掌握用频次表设计增量式查询结构的方法，理解重复元素对查询逻辑的影响，并分析不同复杂度分配方案的取舍。',
    sections: [
      {
        id: 'two-sum3-summary',
        title: '题目在问什么',
        summary:
          '设计一个结构，支持不断 `add(number)`，并在 `find(value)` 时判断是否存在两个数之和等于该值。',
        bullets: [
          '是在线数据结构题。',
          '数据会持续加入。',
          '查询可能被调用很多次。',
          '重点在操作设计。',
        ],
      },
      {
        id: 'two-sum3-tradeoff',
        title: '这题本质是在问：你想把代价放在写入还是查询',
        summary:
          '一种思路是每次 add 时预计算所有可能和，让 find 很快；另一种思路是 add 只记频次，find 时再扫描键。没有绝对唯一答案，但要结合接口调用特征做选择。',
        bullets: [
          '设计题先看操作频率。',
          '复杂度分配是核心权衡。',
          '不能只会一种方案。',
          '这是工程思维的一部分。',
        ],
      },
      {
        id: 'two-sum3-map',
        title: '最稳的通用方案是频次表，因为它兼顾简单和可扩展',
        summary:
          '用哈希表记录每个数字出现次数。查询时遍历每个键，看目标值减去它的补数是否存在；如果补数和当前值相同，则要求频次至少为 2。',
        bullets: [
          '频次表天然支持重复值。',
          'add 可以做到 `O(1)`。',
          'find 是遍历不同数字种类数。',
          '实现简单且可解释。',
        ],
      },
      {
        id: 'two-sum3-duplicate',
        title: '补数等于自身时，一定要确认这个数字出现了至少两次',
        summary:
          '例如目标值是 6，只有一个数字 3 时，不能因为 `6 - 3 = 3` 就直接返回 true。只有当 3 至少出现两次时，这对数才真正存在。',
        bullets: [
          '自配对是本题最典型边界。',
          '频次信息在这里发挥作用。',
          '不能只看键存在与否。',
          '这是正确性的关键分支。',
        ],
        callout:
          '设计题里很多边界本质上都和“一个值能不能被重复消费”有关，频次信息往往就是为了解决这个问题。',
      },
      {
        id: 'two-sum3-solution',
        title: '标准解法：哈希表存频次',
        summary:
          '`add` 时把数字频次加一；`find` 时遍历哈希表中的键，计算补数。如果补数不同，检查补数是否存在；如果补数相同，则检查该数频次是否至少为 2。',
        bullets: [
          '`add` 时间复杂度是 `O(1)`。',
          '`find` 时间复杂度与不同数字种类数相关。',
          '实现简单、解释成本低。',
          '适合通用场景。',
        ],
        code: `class TwoSum {
  private counter = new Map<number, number>()

  add(number: number): void {
    this.counter.set(number, (this.counter.get(number) ?? 0) + 1)
  }

  find(value: number): boolean {
    for (const [num, count] of this.counter) {
      const target = value - num

      if (target === num) {
        if (count > 1) {
          return true
        }
      } else if (this.counter.has(target)) {
        return true
      }
    }

    return false
  }
}`,
      },
      {
        id: 'two-sum3-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是查询逻辑没处理重复值，导致一个数字被当成用了两次。',
        bullets: [
          '易错点 1：补数等于自身时没校验频次。',
          '易错点 2：完全不分析 add / find 复杂度取舍。',
          '易错点 3：把它误写成一次性离线两数之和。',
          '延伸方向：LRU 设计、最小栈、在线统计结构。',
        ],
      },
    ],
  },
  {
    id: 'excel-sheet-column-number',
    label: '171. LeetCode 171. Excel表列序号',
    difficulty: '简单',
    description:
      '这题是在练 Excel 列名的反向进制转换。真正关键不是把字符当普通文本，而是把它们视为 1 到 26 的位值。',
    outcome:
      '你能掌握从字符串到数值的累积式进位转换，理解它和上一题的正向转换是如何互为逆过程的。',
    sections: [
      {
        id: 'excel-number-summary',
        title: '题目在问什么',
        summary:
          '给定 Excel 列名称字符串，返回对应的列号，例如 `A -> 1`，`AB -> 28`。',
        bullets: [
          '字符集是 A 到 Z。',
          '本质是上一题的逆过程。',
          '结果是正整数。',
          '是字符串进位转换题。',
        ],
      },
      {
        id: 'excel-number-base',
        title: '它看起来像 26 进制，但位值范围是 1 到 26',
        summary:
          '和普通进制不同，`A` 不是 0，而是 1；`Z` 是 26。每处理一个字符，都相当于把之前结果乘 26，再加上当前字符的位值。',
        bullets: [
          'A 对应 1，不是 0。',
          '位权仍然是 26 的幂。',
          '累积过程和十进制读数很像。',
          '理解位值映射是关键。',
        ],
      },
      {
        id: 'excel-number-accumulate',
        title: '从左到右累积最自然，因为每读一位都在扩展已有结果',
        summary:
          '比如读到 `"AB"` 时，先有 `A = 1`，再读 `B`，就做 `1 * 26 + 2 = 28`。这和读取普通进制数字的思路完全一致。',
        bullets: [
          '前缀结果乘以基数再加当前位。',
          '不需要反转字符串。',
          '是最自然的位权累积方式。',
          '实现非常直接。',
        ],
      },
      {
        id: 'excel-number-map',
        title: '字符到数值的映射只要用字符编码差即可',
        summary:
          '当前字符减去 `A` 的编码再加 1，就能得到当前位的数值。比如 `A` 得到 1，`Z` 得到 26。',
        bullets: [
          '编码差可以快速完成映射。',
          '实现简单且高效。',
          '和上一题形成呼应。',
          '注意这里要加 1。',
        ],
        callout:
          '一正一反两道题连着做的价值，不只是多做一题，而是把“编码系统的双向映射”真正吃透。',
      },
      {
        id: 'excel-number-solution',
        title: '标准解法：从左到右做 26 进位累积',
        summary:
          '初始化结果为 0，遍历字符串中的每个字符。每轮都让结果乘 26，再加上当前字符代表的数值，最终得到列号。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '实现短且稳定。',
          '是 Excel 列号系列的反向题。',
        ],
        code: `function titleToNumber(columnTitle: string): number {
  let result = 0

  for (const char of columnTitle) {
    result = result * 26 + (char.charCodeAt(0) - 64)
  }

  return result
}`,
      },
      {
        id: 'excel-number-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把 `A` 当成 0，结果所有含边界位的计算都错位。',
        bullets: [
          '易错点 1：把字符映射成 0 到 25。',
          '易错点 2：把乘法和加法顺序写反。',
          '易错点 3：没意识到它是上一题的逆过程。',
          '延伸方向：任意进制字符串转数字、编码映射、列号双向转换。',
        ],
      },
    ],
  },
  {
    id: 'factorial-trailing-zeroes',
    label: '172. LeetCode 172. 阶乘后的零',
    difficulty: '中等',
    description:
      '这题是在练数学拆因子。真正关键不是把阶乘真的算出来，而是意识到末尾 0 的数量取决于能组成多少个 `10 = 2 * 5`。',
    outcome:
      '你能掌握“统计因子贡献量”这类数学题的核心思路，理解为什么只统计 5 的个数就够了，并能把它推广到更一般的整除与因子计数问题。',
    sections: [
      {
        id: 'trailing-zero-summary',
        title: '题目在问什么',
        summary: '给定一个整数 `n`，求 `n!` 的十进制表示末尾有多少个 0。',
        bullets: [
          '不能直接把大数阶乘算出来。',
          '题目考的是数学规律。',
          '末尾 0 来自因子 10。',
          '本质是因子计数问题。',
        ],
      },
      {
        id: 'trailing-zero-factor',
        title: '一个 0 来自一个 10，而 10 由 2 和 5 组成',
        summary:
          '在阶乘连乘中，偶数非常多，所以因子 2 的数量一定远多于因子 5。于是末尾 0 的个数，最终由因子 5 的总数决定。',
        bullets: [
          '2 的数量不是瓶颈。',
          '5 的数量才决定答案上限。',
          '统计 5 比统计 10 更本质。',
          '这是整题突破口。',
        ],
      },
      {
        id: 'trailing-zero-multi-five',
        title: '不只要数 5，还要数 25、125 这种重复贡献',
        summary:
          '像 `25 = 5 * 5` 会额外贡献一个 5，`125 = 5 * 5 * 5` 会再多贡献。因此不能只统计有多少个数能被 5 整除，还要继续除以 25、125 直到超过 `n`。',
        bullets: [
          '25 会贡献两个 5。',
          '125 会贡献三个 5。',
          '要分层累加贡献量。',
          '这是最容易漏掉的细节。',
        ],
        callout:
          '很多数学题的技巧都不是“看见一个条件就数一次”，而是要意识到同一个数可能重复贡献多个因子。',
      },
      {
        id: 'trailing-zero-formula',
        title: '答案公式就是 `n / 5 + n / 25 + n / 125 + ...`',
        summary:
          '每一层都统计“有多少个数至少再多一个 5”。不断把 `n` 除以 5 并向下取整，再把结果累加，就能得到最终答案。',
        bullets: [
          '每层代表一份 5 的贡献。',
          '用整除向下取整即可。',
          '循环次数很少。',
          '时间复杂度接近 `O(log5 n)`。',
        ],
      },
      {
        id: 'trailing-zero-solution',
        title: '标准解法：不断整除 5 并累加',
        summary:
          '初始化答案为 0。只要 `n > 0`，就让 `n = Math.floor(n / 5)`，并把新的 `n` 加入答案。因为这一轮统计的是所有至少多带一个 5 的数字个数。',
        bullets: [
          '时间复杂度是 `O(log n)`。',
          '空间复杂度是 `O(1)`。',
          '不需要任何大数计算。',
          '实现非常短。',
        ],
        code: `function trailingZeroes(n: number): number {
  let result = 0

  while (n > 0) {
    n = Math.floor(n / 5)
    result += n
  }

  return result
}`,
      },
      {
        id: 'trailing-zero-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只统计一次能被 5 整除的数，漏掉了 25、125 带来的额外贡献。',
        bullets: [
          '易错点 1：误以为只要统计 `n / 5`。',
          '易错点 2：真的去计算阶乘，导致溢出或超时。',
          '易错点 3：没理解为什么不用统计 2。',
          '延伸方向：素因子分解、组合数尾零、进制相关数学题。',
        ],
      },
    ],
  },
  {
    id: 'binary-search-tree-iterator',
    label: '173. LeetCode 173. 二叉搜索树迭代器',
    difficulty: '中等',
    description:
      '这题是在练“按中序顺序渐进展开”数据结构。真正关键不是把树全拍平，而是用栈维护一条到当前最小节点的访问路径。',
    outcome:
      '你能掌握二叉搜索树中序遍历与单调顺序的关系，理解惰性迭代器设计，并写出 `next` / `hasNext` 都足够稳定的实现。',
    sections: [
      {
        id: 'bst-iterator-summary',
        title: '题目在问什么',
        summary: '实现一个 BST 迭代器，使它能按从小到大的顺序依次返回节点值。',
        bullets: [
          '本质是中序遍历。',
          '要求逐步返回，不是一次性输出数组。',
          '需要支持 `next` 和 `hasNext`。',
          '是典型惰性展开题。',
        ],
      },
      {
        id: 'bst-iterator-order',
        title: 'BST 的中序遍历天然就是升序',
        summary:
          '因为 BST 满足左子树更小、右子树更大，所以按“左-根-右”顺序访问节点时，得到的就是从小到大的序列。',
        bullets: [
          '顺序来源于 BST 性质。',
          '中序遍历是核心知识点。',
          '题目不是在考别的高级技巧。',
          '先抓住顺序规律，再谈结构设计。',
        ],
      },
      {
        id: 'bst-iterator-stack',
        title: '栈里维护的是“接下来可能被访问的一条左链”',
        summary:
          '初始化时一路把根节点及其所有左孩子压栈。每次弹出栈顶就是当前最小值；如果它有右子树，就把右子树一路向左再压栈。',
        bullets: [
          '栈顶始终是当前最小未访问节点。',
          '只展开必要路径，不全量展开。',
          '右子树处理后要继续压左链。',
          '这是惰性遍历的标准套路。',
        ],
      },
      {
        id: 'bst-iterator-lazy',
        title: '这类题的工程意义，是把一次性计算改成按需消费',
        summary:
          '如果一开始就把整棵树中序拍平成数组，逻辑也能做，但空间开销更高，也失去了“迭代器”的设计价值。惰性迭代更贴近真实接口设计。',
        bullets: [
          '按需展开更省空间。',
          '接口语义更贴合迭代器。',
          '初始化成本更低。',
          '是典型的懒加载思想。',
        ],
        callout:
          '从刷题角度看这是栈题；从工程角度看，它其实是在练“如何把批量计算重构成流式消费接口”。',
      },
      {
        id: 'bst-iterator-solution',
        title: '标准解法：栈 + 压入左链',
        summary:
          '维护一个栈和辅助函数 `pushLeft`。构造时把根的左链全部压入。调用 `next` 时弹出栈顶节点；如果该节点有右孩子，就把右孩子及其左链继续压入。',
        bullets: [
          '`next` 均摊时间复杂度是 `O(1)`。',
          '空间复杂度是树高 `O(h)`。',
          '不会重复访问节点。',
          '写法稳定，面试可解释性高。',
        ],
        code: `class BSTIterator {
  private stack: TreeNode[] = []

  constructor(root: TreeNode | null) {
    this.pushLeft(root)
  }

  private pushLeft(node: TreeNode | null): void {
    while (node) {
      this.stack.push(node)
      node = node.left
    }
  }

  next(): number {
    const node = this.stack.pop()!

    if (node.right) {
      this.pushLeft(node.right)
    }

    return node.val
  }

  hasNext(): boolean {
    return this.stack.length > 0
  }
}`,
      },
      {
        id: 'bst-iterator-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是理解了中序遍历，却不会把“遍历过程”拆成支持多次调用的状态机。',
        bullets: [
          '易错点 1：初始化时忘记压完整条左链。',
          '易错点 2：弹出后没处理右子树的左链。',
          '易错点 3：直接全量拍平成数组，失去题目重点。',
          '延伸方向：双向 BST 迭代器、惰性遍历、生成器设计。',
        ],
      },
    ],
  },
  {
    id: 'dungeon-game',
    label: '174. LeetCode 174. 地下城游戏',
    difficulty: '困难',
    description:
      '这题是在练逆向动态规划。真正关键不是算“到达终点后还剩多少血”，而是反过来算“进入当前格子前，最少必须带多少血”。',
    outcome:
      '你能掌握从终点反推起点的 DP 建模方式，理解“最小初始资源”类题目的定义方法，并写出边界清晰的二维状态转移。',
    sections: [
      {
        id: 'dungeon-summary',
        title: '题目在问什么',
        summary:
          '骑士从左上角走到右下角，每次只能向右或向下，格子会加血或扣血，要求求出保证能活着到终点的最小初始生命值。',
        bullets: [
          '血量任何时刻都必须至少为 1。',
          '路径只能右或下。',
          '格子有正有负。',
          '求的是最小初始值，不是最大收益。',
        ],
      },
      {
        id: 'dungeon-forward-trap',
        title: '正向想很容易乱，因为你不知道“现在多带多少血才算够”',
        summary:
          '如果从起点正向推，状态会很难定义，因为同一个格子下“当前剩余血量不同”会影响未来选择。直接正推很容易状态爆炸。',
        bullets: [
          '正向状态不容易压缩。',
          '剩余血量会影响后续可行性。',
          '不是普通路径和问题。',
          '要换建模角度。',
        ],
      },
      {
        id: 'dungeon-reverse',
        title: '逆向定义最稳：进入当前格子前至少需要多少血',
        summary:
          '定义 `dp[i][j]` 表示进入格子 `(i, j)` 前所需的最小生命值。这样一来，只要知道右边和下边格子的需求，就能反推出当前格子的需求。',
        bullets: [
          '状态语义要带“进入前”。',
          '逆推后未来信息变确定。',
          '转移只看右和下。',
          '这是整题核心建模。',
        ],
      },
      {
        id: 'dungeon-transition',
        title: '转移公式是：先选更省的下一步，再扣掉当前格子的影响',
        summary:
          '从当前格子出发，可以去右边或下边，所以后继需求取两者较小值；再减去当前格子的数值。如果结果小于 1，说明当前格子能把血补足到安全线，因此最终至少仍要 1。',
        bullets: [
          '先取 `min(right, down)`。',
          '再做 `need - dungeon[i][j]`。',
          '最终还要和 1 取最大值。',
          '边界是终点格子。',
        ],
        callout:
          '这题的难点几乎全在状态定义。定义对了，代码反而并不复杂；定义错了，怎么补细节都救不回来。',
      },
      {
        id: 'dungeon-solution',
        title: '标准解法：从右下往左上做二维 DP',
        summary:
          '先用一个比原网格大一圈的数组处理边界，把终点右边和下边设为 1。然后从右下角逆序遍历，按 `max(1, min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j])` 更新当前格子。',
        bullets: [
          '时间复杂度是 `O(mn)`。',
          '空间复杂度是 `O(mn)`。',
          '边界处理可以写得很整齐。',
          '是经典逆向 DP 题。',
        ],
        code: `function calculateMinimumHP(dungeon: number[][]): number {
  const rows = dungeon.length
  const cols = dungeon[0].length
  const dp = Array.from({ length: rows + 1 }, () =>
    Array(cols + 1).fill(Number.POSITIVE_INFINITY),
  )

  dp[rows][cols - 1] = 1
  dp[rows - 1][cols] = 1

  for (let row = rows - 1; row >= 0; row -= 1) {
    for (let col = cols - 1; col >= 0; col -= 1) {
      const need = Math.min(dp[row + 1][col], dp[row][col + 1]) - dungeon[row][col]
      dp[row][col] = Math.max(1, need)
    }
  }

  return dp[0][0]
}`,
      },
      {
        id: 'dungeon-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把状态写成“到达这里还剩多少血”，结果转移关系无法稳定成立。',
        bullets: [
          '易错点 1：正向定义状态，导致无法压缩。',
          '易错点 2：忘记生命值下限必须是 1。',
          '易错点 3：终点和边界初始化写乱。',
          '延伸方向：最小初始能量、逆向 DP、带资源约束的路径问题。',
        ],
      },
    ],
  },
  {
    id: 'combine-two-tables',
    label: '175. LeetCode 175. 组合两个表',
    difficulty: '简单',
    description:
      '这题是在练最基础的 SQL 连接查询。真正关键不是把两张表拼起来，而是理解为什么要用 `LEFT JOIN` 保证主表用户不丢失。',
    outcome:
      '你能掌握一对一表连接的基础写法，理解主表保留、从表补充字段的思路，并能区分 `LEFT JOIN` 与 `INNER JOIN` 的结果差异。',
    sections: [
      {
        id: 'combine-tables-summary',
        title: '题目在问什么',
        summary:
          '给定 `Person` 表和 `Address` 表，要求输出每个人的姓名以及对应的城市、州信息。',
        bullets: [
          '两张表通过 `personId` 关联。',
          '并不是每个人都有地址。',
          '输出要保留所有人。',
          '是入门连接题。',
        ],
      },
      {
        id: 'combine-tables-main',
        title: '先判断谁是主表：题目要保留所有人，所以 Person 是主表',
        summary:
          'SQL 题先别急着写语法，先看“谁必须保留”。这里要求即使某人没有地址，也要出现在结果中，因此 `Person` 必须是左表。',
        bullets: [
          '“谁必须都保留”决定主表。',
          '主表通常放在 `FROM` 左边。',
          '题意先行，语法后置。',
          '这是连接题最重要的判断。',
        ],
      },
      {
        id: 'combine-tables-left-join',
        title: '为什么一定是 LEFT JOIN，而不是 INNER JOIN',
        summary:
          '如果使用 `INNER JOIN`，没有地址的人会被过滤掉；而 `LEFT JOIN` 会保留左表所有记录，右表匹配不到时返回 `NULL`，正好符合题意。',
        bullets: [
          'INNER JOIN 只保留成功匹配行。',
          'LEFT JOIN 会保留左表全部记录。',
          '右表缺失时字段为 `NULL`。',
          '这就是本题标准模型。',
        ],
      },
      {
        id: 'combine-tables-select',
        title: 'SQL 里先把表关系定对，再谈字段选择',
        summary:
          '关系一旦定对，字段就只是从两张表里拿需要的列。这里取 `firstName`、`lastName` 来自主表，`city`、`state` 来自地址表。',
        bullets: [
          '字段来源要写清别名。',
          '查询结果应只选题目所需列。',
          '连接条件放在 `ON` 里。',
          '可读性比炫技巧更重要。',
        ],
        callout:
          'SQL 入门阶段最忌讳“背 join 语法”，而不理解保留哪张表。只要这个判断清晰，很多题都会顺手很多。',
      },
      {
        id: 'combine-tables-solution',
        title: '标准解法：Person LEFT JOIN Address',
        summary:
          '让 `Person` 作为主表，使用 `LEFT JOIN Address`，并通过 `personId` 建立关联。这样即使某个人没有地址，也会保留该人的姓名信息。',
        bullets: [
          '时间复杂度取决于数据库执行计划。',
          '逻辑重点在连接语义，不在算法复杂度。',
          '是最基础的表连接题。',
          '非常适合建立 SQL 连接直觉。',
        ],
        code: `SELECT p.firstName, p.lastName, a.city, a.state
FROM Person AS p
LEFT JOIN Address AS a
  ON p.personId = a.personId;`,
      },
      {
        id: 'combine-tables-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是不先分析保留规则，上来就写成 `INNER JOIN`，结果把没有地址的人过滤掉了。',
        bullets: [
          '易错点 1：误用 `INNER JOIN`。',
          '易错点 2：把关联条件写错字段。',
          '易错点 3：没有使用表别名导致可读性差。',
          '延伸方向：多表连接、主从表建模、聚合前连接顺序。',
        ],
      },
    ],
  },
  {
    id: 'second-highest-salary',
    label: '176. LeetCode 176. 第二高的薪水',
    difficulty: '中等',
    description:
      '这题是在练 SQL 排名与去重。真正关键不是“取第二行”，而是先把薪水去重，再拿到严格意义上的第二高值。',
    outcome:
      '你能掌握 SQL 中去重排名的基本思路，理解为什么要先处理重复值，并能写出对无结果场景也稳定返回 `NULL` 的查询。',
    sections: [
      {
        id: 'second-salary-summary',
        title: '题目在问什么',
        summary:
          '在员工表中找出第二高的薪水。如果不存在第二高薪水，则返回 `NULL`。',
        bullets: [
          '要的是第二高，不是第二条记录。',
          '重复薪水只能算一个档位。',
          '不存在时要返回 `NULL`。',
          '本质是去重后的排名题。',
        ],
      },
      {
        id: 'second-salary-distinct',
        title: '“第二高”默认是 distinct 后的第二名',
        summary:
          '如果最高薪水出现多次，它们仍然只算第一高这一档。因此做这题时，第一步就该想到先对 `salary` 去重。',
        bullets: [
          '重复值不能重复占位。',
          '先去重再排序更符合题意。',
          '这比直接 `OFFSET 1` 更完整。',
          '理解语义比套模板重要。',
        ],
      },
      {
        id: 'second-salary-null',
        title: '题目要求没找到时返回 NULL，这决定了子查询写法',
        summary:
          '很多数据库里，子查询没有结果时会自然返回 `NULL`。因此可以先求出去重后的第二高值，再把它作为一个单值字段返回，正好满足题意。',
        bullets: [
          '空结果要能平滑退化成 `NULL`。',
          '单值子查询很适合这种题。',
          '别把“查不到”变成“不返回行”。',
          '返回结构也要看题意。',
        ],
      },
      {
        id: 'second-salary-options',
        title: '常见写法有两类：`LIMIT/OFFSET` 或子查询求最大次大',
        summary:
          '在支持 `LIMIT ... OFFSET` 的环境下，先 `DISTINCT` 再倒序排序取偏移 1 的值最直接。也可以先找到最大值，再找小于最大值的最大值，不过写起来更绕。',
        bullets: [
          '入门时优先写可读性高的版本。',
          'SQL 题不是越绕越高级。',
          '先保证语义正确。',
          '再考虑数据库方言差异。',
        ],
        callout:
          'SQL 面试里很多人喜欢背各种奇技淫巧，但真正拉开差距的，通常是能不能先把语义拆准：去重、排序、偏移、空结果。',
      },
      {
        id: 'second-salary-solution',
        title: '标准解法：去重后按薪水倒序取第二个',
        summary:
          '先从 `Employee` 表中选出去重后的薪水，按降序排列，然后跳过第一高的记录，取下一条作为第二高薪水。若不存在，自然返回 `NULL`。',
        bullets: [
          '核心步骤是 `DISTINCT + ORDER BY + OFFSET`。',
          '结果字段名要按题目要求命名。',
          '写法短且表达清楚。',
          '是最常见标准答案之一。',
        ],
        code: `SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
      },
      {
        id: 'second-salary-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有先去重，导致第二高被重复最高薪水占掉了位置。',
        bullets: [
          '易错点 1：忘记 `DISTINCT`。',
          '易错点 2：把查不到结果写成整行不返回。',
          '易错点 3：把第二高误解为排序后的第二条记录。',
          '延伸方向：第 N 高值、窗口函数排名、分组内 TopK 查询。',
        ],
      },
    ],
  },
  {
    id: 'nth-highest-salary',
    label: '177. LeetCode 177. 第N高的薪水',
    difficulty: '中等',
    description:
      '这题是在把上一题“第二高的薪水”推广成通用模板。真正关键不是把 2 换成 N，而是理解“第 N 高”依然是去重后的排名问题。',
    outcome:
      '你能掌握 SQL 中参数化排名查询的写法，理解为什么要先去重再偏移，并能处理不存在第 N 高薪水时返回 `NULL` 的场景。',
    sections: [
      {
        id: 'nth-salary-summary',
        title: '题目在问什么',
        summary:
          '实现一个 SQL 函数 `getNthHighestSalary(N)`，返回员工表中的第 `N` 高薪水；如果不存在，则返回 `NULL`。',
        bullets: [
          '要的是第 N 高档位。',
          '重复薪水只算一个名次。',
          'N 是参数，不再写死为 2。',
          '结果不存在时返回 `NULL`。',
        ],
      },
      {
        id: 'nth-salary-core',
        title: '核心思路和上一题一样：先去重，再排序，再偏移',
        summary:
          '既然“第二高”本质是去重后的第 2 名，那么“第 N 高”自然就是去重后的第 N 名。整个问题没有变，只是把偏移量做成参数。',
        bullets: [
          '语义仍然是 distinct 排名。',
          '去重是第一步，不可省略。',
          '偏移量从固定值变成变量。',
          '本题重点是通用化。',
        ],
      },
      {
        id: 'nth-salary-offset',
        title: 'SQL 里的偏移量要注意：第 N 高对应的是偏移 `N - 1`',
        summary:
          '因为排序后的第一条记录偏移量是 0，所以第 `N` 高薪水对应 `OFFSET N - 1`。这类题最常见的错误，就是把偏移量直接写成 N。',
        bullets: [
          '第 1 个元素偏移量是 0。',
          '第 N 个元素偏移量是 `N - 1`。',
          '这里有一个典型 off-by-one 问题。',
          '很适合面试时顺手解释清楚。',
        ],
      },
      {
        id: 'nth-salary-null',
        title: '不存在第 N 高时，单值子查询天然能返回 NULL',
        summary:
          '如果去重后的薪水种类不够 N 个，子查询自然查不到结果，这时外层表达式会返回 `NULL`，恰好符合题目要求，因此这种写法很稳。',
        bullets: [
          '不需要额外手工兜底。',
          '返回结构和题意天然匹配。',
          '子查询模式很适合单值排名题。',
          '代码短但语义完整。',
        ],
        callout:
          '很多 SQL 题写得复杂，不是因为语义复杂，而是因为没有先把题目抽象成“单值查询”还是“结果集查询”。这题明显属于前者。',
      },
      {
        id: 'nth-salary-solution',
        title: '标准解法：DISTINCT + ORDER BY + LIMIT/OFFSET',
        summary:
          '在函数中先把参数 `N` 转换成偏移量 `N - 1`，再对子查询中的薪水做去重、降序排序，并取出偏移后的那一条记录，最终作为结果返回。',
        bullets: [
          '核心结构与上一题一致。',
          '只是把固定偏移改成参数偏移。',
          '写法清晰，迁移性强。',
          '是最常见标准答案。',
        ],
        code: `CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  SET N = N - 1;

  RETURN (
    SELECT DISTINCT salary
    FROM Employee
    ORDER BY salary DESC
    LIMIT 1 OFFSET N
  );
END;`,
      },
      {
        id: 'nth-salary-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“第 N 高”当成排序后的第 N 条记录，结果重复薪水会把名次挤乱。',
        bullets: [
          '易错点 1：忘记 `DISTINCT`。',
          '易错点 2：偏移量错写成 N 而不是 `N - 1`。',
          '易错点 3：结果为空时没有意识到会返回 `NULL`。',
          '延伸方向：窗口函数 `DENSE_RANK`、分组内第 N 高、排行榜查询。',
        ],
      },
    ],
  },
  {
    id: 'rank-scores',
    label: '178. LeetCode 178. 分数排名',
    difficulty: '中等',
    description:
      '这题是在练 SQL 排名语义。真正关键不是把分数排个序，而是理解相同分数要共享排名，并且后续排名要连续，这对应的是 `DENSE_RANK` 思维。',
    outcome:
      '你能掌握“稠密排名”的概念，理解它与普通排序编号、跳跃排名的区别，并写出既符合题意又可读性高的 SQL。',
    sections: [
      {
        id: 'rank-scores-summary',
        title: '题目在问什么',
        summary:
          '给定分数表，按分数从高到低输出每条记录的排名。相同分数排名相同，且下一名应连续递增，不能跳号。',
        bullets: [
          '相同分数共享同一排名。',
          '后续名次连续，不跳号。',
          '结果仍要按分数降序输出。',
          '本质是稠密排名题。',
        ],
      },
      {
        id: 'rank-scores-dense-rank',
        title: '这题要的是 dense rank，不是 row number，也不是普通 rank',
        summary:
          '如果分数是 `100, 90, 90, 80`，题目要的排名是 `1, 2, 2, 3`。这说明相同值共享排名，同时下一名不能跳到 4，因此它对应的是 `DENSE_RANK` 语义。',
        bullets: [
          '`ROW_NUMBER` 会强行给每行唯一编号。',
          '`RANK` 会在重复值后跳号。',
          '`DENSE_RANK` 才会连续排名。',
          '先识别排名语义比写 SQL 更重要。',
        ],
      },
      {
        id: 'rank-scores-old-style',
        title: '在不依赖窗口函数的题解环境里，可以用相关子查询模拟排名',
        summary:
          '如果题目环境不强调窗口函数，最经典的写法就是：统计有多少个不同分数大于等于当前分数，这个数量就是当前分数的稠密排名。',
        bullets: [
          '核心仍然是 distinct 分数计数。',
          '相关子查询便于表达语义。',
          '读起来稍慢，但逻辑直观。',
          '很适合面试解释。',
        ],
      },
      {
        id: 'rank-scores-why-work',
        title: '为什么“统计不小于当前分数的不同分数个数”就是排名',
        summary:
          '因为每一种更高或相同的不同分数，都会占据一个排名档位。数出来有几个档位，当前这条记录的排名就是几。',
        bullets: [
          '排名本质是前面有多少个更高档位。',
          '这里按不同分数计数，而不是按行计数。',
          '重复值不会重复占位。',
          '这正好满足 dense rank 语义。',
        ],
        callout:
          'SQL 排名题最怕“语法先行”。你只要先把名次的数学含义说清楚，SQL 通常只是翻译工作。',
      },
      {
        id: 'rank-scores-solution',
        title: '标准解法：相关子查询统计不同分数档位',
        summary:
          '遍历 `Scores` 表的每一行，用子查询统计有多少个不同分数大于等于当前分数，这个数量就是当前行的排名，最后按分数降序输出结果。',
        bullets: [
          '逻辑重点是 dense rank 语义。',
          '不依赖窗口函数也能完成。',
          '代码不长，解释性强。',
          '是 LeetCode 上的经典写法之一。',
        ],
        code: `SELECT
  s.score,
  (
    SELECT COUNT(DISTINCT s2.score)
    FROM Scores AS s2
    WHERE s2.score >= s.score
  ) AS \`rank\`
FROM Scores AS s
ORDER BY s.score DESC;`,
      },
      {
        id: 'rank-scores-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“共享排名且不跳号”理解错，最后写成了行号或者跳跃排名。',
        bullets: [
          '易错点 1：没识别出 `DENSE_RANK` 语义。',
          '易错点 2：子查询里没有 `DISTINCT`。',
          '易错点 3：结果排序漏写降序。',
          '延伸方向：窗口函数、排行榜系统、分组排名查询。',
        ],
      },
    ],
  },
  {
    id: 'largest-number',
    label: '179. LeetCode 179. 最大数',
    difficulty: '中等',
    description:
      '这题是在练自定义排序规则。真正关键不是把数字从大到小排，而是比较两个数字拼接后谁更大。',
    outcome:
      '你能掌握“比较器决定全局最优拼接顺序”的思路，理解为什么普通数值排序不适用，并写出能处理全 0 边界的实现。',
    sections: [
      {
        id: 'largest-number-summary',
        title: '题目在问什么',
        summary:
          '给定一组非负整数，重新排列它们的顺序，使拼接后的结果最大，并返回这个结果字符串。',
        bullets: [
          '不是求和，也不是普通最大值。',
          '重点在排列顺序。',
          '结果可能非常大，所以返回字符串。',
          '本质是排序比较器题。',
        ],
      },
      {
        id: 'largest-number-why-sort',
        title: '普通降序排序不行，因为局部数值大不代表拼接后更优',
        summary:
          '例如 `3` 和 `30`，单看数值好像 `30` 更大，但拼接比较时 `330` 明显大于 `303`，所以 `3` 应该排在 `30` 前面。',
        bullets: [
          '题目比较的是拼接结果，不是单个值大小。',
          '必须重新定义“谁更大”。',
          '比较器是整题关键。',
          '这个反例足以推翻普通排序。',
        ],
      },
      {
        id: 'largest-number-comparator',
        title: '两个数 `a` 和 `b` 的顺序，只看 `ab` 和 `ba` 谁更大',
        summary:
          '如果把 `a` 放前面得到的字符串 `ab` 比 `ba` 更大，就让 `a` 排在 `b` 前面；反之则让 `b` 在前。这条比较规则决定了最终排序顺序。',
        bullets: [
          '比较器核心是字符串拼接比较。',
          '每次只比较两者的相对顺序。',
          '全局最优由局部比较器支撑。',
          '这是题目的抽象重点。',
        ],
      },
      {
        id: 'largest-number-zero',
        title: '全 0 场景必须单独处理，否则会得到很多前导 0',
        summary:
          '比如输入是 `[0, 0]`，排序后直接拼接会得到 `"00"`，但题目要求返回 `"0"`。因此如果排序后首元素是 `0`，就直接返回 `"0"`。',
        bullets: [
          '全 0 是最典型边界。',
          '首元素为 0 说明所有元素都为 0。',
          '这一步能避免前导零问题。',
          '实现里一定要显式处理。',
        ],
        callout:
          '很多排序题真正的难点不是比较器，而是比较器写完后有没有把结果语义收尾，例如前导零、空串、重复值等边界。',
      },
      {
        id: 'largest-number-solution',
        title: '标准解法：转字符串后按拼接结果排序',
        summary:
          '先把所有数字转成字符串，再按照 `(b + a).localeCompare(a + b)` 的规则排序。排序后如果首元素是 `"0"`，直接返回 `"0"`；否则把所有字符串拼接起来即可。',
        bullets: [
          '时间复杂度主要来自排序。',
          '字符串比较比数值比较更贴题。',
          '代码短，但比较器需要解释清楚。',
          '是高频面试排序题。',
        ],
        code: `function largestNumber(nums: number[]): string {
  const parts = nums.map(String)

  parts.sort((a, b) => (b + a).localeCompare(a + b))

  if (parts[0] === '0') {
    return '0'
  }

  return parts.join('')
}`,
      },
      {
        id: 'largest-number-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是直接按数值从大到小排序，结果在 `3` 和 `30` 这种组合上立刻出错。',
        bullets: [
          '易错点 1：误用普通数值排序。',
          '易错点 2：比较器方向写反。',
          '易错点 3：遗漏全 0 场景。',
          '延伸方向：最小数拼接、自定义排序、字符串比较器设计。',
        ],
      },
    ],
  },
  {
    id: 'consecutive-numbers',
    label: '180. LeetCode 180. 连续出现的数字',
    difficulty: '中等',
    description:
      '这题是在练 SQL 自连接的相邻行比较。真正关键不是统计出现次数，而是判断同一个数字是否在连续三条记录里紧挨着出现。',
    outcome:
      '你能掌握用自连接比较相邻行的思路，理解“连续出现”和“总共出现多次”不是一回事，并写出符合题意的去重结果。',
    sections: [
      {
        id: 'consecutive-numbers-summary',
        title: '题目在问什么',
        summary: '给定日志表 `Logs(id, num)`，找出所有至少连续出现三次的数字。',
        bullets: [
          '关注的是连续出现。',
          '不是统计全局频次。',
          '结果只要数字本身。',
          '重复结果要去重。',
        ],
      },
      {
        id: 'consecutive-numbers-continuous',
        title: '“连续出现”比“出现三次”更严格',
        summary:
          '如果一个数字在全表中出现了三次，但中间被别的数字打断，那就不算答案。题目要求的是相邻三条记录都相同，并且它们的 `id` 也要连起来。',
        bullets: [
          '连续性是题目核心。',
          '只看总次数会误判。',
          '相邻记录关系很关键。',
          '要借助 `id` 判断顺序。',
        ],
      },
      {
        id: 'consecutive-numbers-self-join',
        title: '最直接的写法是把表和自己连三次',
        summary:
          '把当前行、下一行、下下行对齐比较。如果三行的数字相同，并且 `id` 分别相差 1，就说明这个数字至少连续出现了三次。',
        bullets: [
          '自连接非常适合相邻行问题。',
          '三张别名表分别代表连续三行。',
          '同时校验 `id` 和 `num`。',
          '写法直接，表达清晰。',
        ],
      },
      {
        id: 'consecutive-numbers-distinct',
        title: '结果要去重，因为同一个数字可能命中多段窗口',
        summary:
          '如果某个数字连续出现了四次或五次，自连接会命中多个三行窗口。题目最终只要这个数字出现一次，因此外层要加 `DISTINCT`。',
        bullets: [
          '连续长度大于 3 时会重复命中。',
          '窗口命中次数不等于结果次数。',
          '最终结果集只保留不同数字。',
          '这是最容易漏掉的收尾动作。',
        ],
        callout:
          'SQL 题经常有这种“中间过程会重复，但最终结果不允许重复”的情况。建模时要区分“命中条件”和“结果输出”这两个层次。',
      },
      {
        id: 'consecutive-numbers-solution',
        title: '标准解法：三次自连接比较相邻记录',
        summary:
          '令三张日志表别名分别代表连续三条记录，要求它们的 `id` 连续且 `num` 相同。最后选出满足条件的数字，并用 `DISTINCT` 去重。',
        bullets: [
          '逻辑重点是相邻三行对齐。',
          '不需要聚合统计总频次。',
          '写法稳定，面试可解释性好。',
          '是相邻记录类 SQL 题的经典模板。',
        ],
        code: `SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs AS l1
JOIN Logs AS l2
  ON l2.id = l1.id + 1
JOIN Logs AS l3
  ON l3.id = l2.id + 1
WHERE l1.num = l2.num
  AND l2.num = l3.num;`,
      },
      {
        id: 'consecutive-numbers-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把它误写成分组计数，结果把不连续但总次数达到三次的数字也选进来了。',
        bullets: [
          '易错点 1：只按 `num` 分组计数。',
          '易错点 2：忘记校验 `id` 连续。',
          '易错点 3：遗漏 `DISTINCT` 导致重复结果。',
          '延伸方向：窗口函数 `LAG/LEAD`、连续区间问题、序列检测。',
        ],
      },
    ],
  },
  {
    id: 'employees-earning-more-than-their-managers',
    label: '181. LeetCode 181. 超过经理收入的员工',
    difficulty: '简单',
    description:
      '这题是在练同表自连接。真正关键不是筛工资大的人，而是先把“员工”和“经理”在同一张表里对应起来，再做比较。',
    outcome:
      '你能掌握同一张表里父子关系的自连接写法，理解为什么经理信息要通过 `managerId` 回连本表，并写出清晰的别名比较查询。',
    sections: [
      {
        id: 'employee-manager-summary',
        title: '题目在问什么',
        summary: '在员工表中找出那些工资严格高于自己经理的员工姓名。',
        bullets: [
          '员工和经理都在同一张表里。',
          '关系通过 `managerId` 建立。',
          '最终只输出员工姓名。',
          '本质是同表自连接题。',
        ],
      },
      {
        id: 'employee-manager-self-join',
        title: '这题最重要的第一步，是把一张表拆成两个角色',
        summary:
          '虽然只有一张 `Employee` 表，但查询时要把它看成两种身份：员工一份，经理一份。员工行通过 `managerId` 指向经理行，然后才能比较两者工资。',
        bullets: [
          '同一张表可以在查询里扮演多个角色。',
          '员工别名和经理别名必须分开。',
          '角色拆清楚后逻辑就很直观。',
          '这是自连接的核心思维。',
        ],
      },
      {
        id: 'employee-manager-condition',
        title: '连接条件负责找关系，筛选条件负责比工资',
        summary:
          '很多 SQL 新手会把所有条件都堆在一起写，导致逻辑混乱。这里要明确：`e.managerId = m.id` 是建立上下级关系，`e.salary > m.salary` 才是题目真正的筛选条件。',
        bullets: [
          '连接条件和业务条件要分层写。',
          '先找经理，再比工资。',
          '逻辑拆开后更容易排错。',
          '可读性会明显提升。',
        ],
      },
      {
        id: 'employee-manager-output',
        title: '结果只需要员工名，不需要把经理信息一起带出来',
        summary:
          '虽然比较时需要经理工资，但输出只要求员工姓名。因此 `SELECT` 里只取员工别名下的名字列即可，不要多带无关字段。',
        bullets: [
          '中间计算字段不一定要输出。',
          '输出结构要严格对题。',
          '越简单的题越容易因为多带字段失分。',
          'SQL 结果集要克制。',
        ],
        callout:
          '做 SQL 题时，经常会“为了验证逻辑临时多查几个字段”。这在调试阶段可以，但交题时一定要收敛回题目要求的最小结果集。',
      },
      {
        id: 'employee-manager-solution',
        title: '标准解法：Employee 自连接 Employee',
        summary:
          '把员工表分别命名为员工别名和经理别名，通过 `managerId` 与 `id` 关联，再筛出员工工资高于经理工资的记录，最后返回员工姓名。',
        bullets: [
          '是最标准的自连接写法。',
          '别名清楚后非常直观。',
          '适合同类上下级关系题迁移。',
          '复杂度由数据库执行计划决定。',
        ],
        code: `SELECT e.name AS Employee
FROM Employee AS e
JOIN Employee AS m
  ON e.managerId = m.id
WHERE e.salary > m.salary;`,
      },
      {
        id: 'employee-manager-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有把同一张表拆成员工和经理两个角色，最后不是比错字段，就是根本连不上正确关系。',
        bullets: [
          '易错点 1：不会写同表自连接。',
          '易错点 2：把连接条件和筛选条件混在一起。',
          '易错点 3：输出了多余字段。',
          '延伸方向：组织树查询、上下级统计、递归层级查询。',
        ],
      },
    ],
  },
  {
    id: 'duplicate-emails',
    label: '182. LeetCode 182. 查找重复的电子邮箱',
    difficulty: '简单',
    description:
      '这题是在练分组与重复检测。真正关键不是把重复行都查出来，而是先按邮箱分组，再找出出现次数大于 1 的邮箱值本身。',
    outcome:
      '你能掌握 SQL 中最基础的重复值检测模式，理解 `GROUP BY + HAVING` 的职责分工，并写出只返回重复邮箱字段的查询。',
    sections: [
      {
        id: 'duplicate-email-summary',
        title: '题目在问什么',
        summary: '在人员表中找出所有出现过至少两次的邮箱地址。',
        bullets: [
          '关注的是邮箱值是否重复。',
          '不是要返回整行记录。',
          '同一个邮箱只输出一次。',
          '本质是分组后筛重复。',
        ],
      },
      {
        id: 'duplicate-email-group',
        title: '检测重复值最稳的套路，就是先分组再看组大小',
        summary:
          '如果一个邮箱出现了多次，那么按邮箱分组后，这个组里的记录数就会大于 1。因此只要对 `email` 做 `GROUP BY`，再筛出计数大于 1 的组即可。',
        bullets: [
          '重复检测天然适合分组。',
          '分组维度就是邮箱本身。',
          '组内计数决定是否重复。',
          '这是最基础也最常用的 SQL 模式。',
        ],
      },
      {
        id: 'duplicate-email-group-having',
        title: '`GROUP BY` 和 `HAVING` 分工要明确',
        summary:
          '`GROUP BY` 负责把相同邮箱聚到一起，`HAVING` 负责在分组完成后筛选组条件。很多人会误写成 `WHERE COUNT(*) > 1`，但聚合后的条件必须写在 `HAVING` 里。',
        bullets: [
          '分组前过滤用 `WHERE`。',
          '分组后过滤用 `HAVING`。',
          '聚合条件不能写在 `WHERE`。',
          '这是 SQL 基础高频考点。',
        ],
      },
      {
        id: 'duplicate-email-output',
        title: '结果只要重复邮箱值，不要把计数或整行带出来',
        summary:
          '虽然判断重复时会用到 `COUNT(*)`，但题目最终只要求返回重复的邮箱本身。因此 `SELECT` 里只保留 `email` 字段即可。',
        bullets: [
          '中间判断字段不等于最终输出字段。',
          '交题时只保留题目要求列。',
          '结果集越简单越不容易偏题。',
          '这是 SQL 题常见细节。',
        ],
        callout:
          '很多 SQL 题的难点不在语法，而在“过程里用什么字段”和“结果里留什么字段”不是同一件事。把这层拆开，题目会简单很多。',
      },
      {
        id: 'duplicate-email-solution',
        title: '标准解法：按邮箱分组后用 HAVING 过滤',
        summary:
          '先按 `email` 分组，然后统计每组记录数，最后用 `HAVING COUNT(*) > 1` 保留重复邮箱组，并输出邮箱字段本身。',
        bullets: [
          '写法最短，也最符合题意。',
          '是重复值检测的基础模板。',
          '非常适合迁移到手机号、用户名等场景。',
          '面试里出现频率很高。',
        ],
        code: `SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;`,
      },
      {
        id: 'duplicate-email-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把聚合条件写进 `WHERE`，或者把结果写成整行重复记录，而不是重复邮箱值本身。',
        bullets: [
          '易错点 1：误用 `WHERE COUNT(*) > 1`。',
          '易错点 2：没有 `GROUP BY email`。',
          '易错点 3：输出成整行而不是邮箱字段。',
          '延伸方向：重复数据清洗、唯一约束校验、分组统计查询。',
        ],
      },
    ],
  },
  {
    id: 'customers-who-never-order',
    label: '183. LeetCode 183. 从不订购的客户',
    difficulty: '简单',
    description:
      '这题是在练最基础的“主表保留 + 反向筛空”查询。真正关键不是把两张表连起来，而是理解怎样找出“存在于客户表、但不存在于订单表”的人。',
    outcome:
      '你能掌握用 `LEFT JOIN ... IS NULL` 查缺失关系的写法，理解它和 `NOT IN`、`NOT EXISTS` 的语义关系，并能分清“没下单”和“订单字段为空”不是一回事。',
    sections: [
      {
        id: 'customers-never-order-summary',
        title: '题目在问什么',
        summary:
          '给定 `Customers` 和 `Orders` 两张表，找出那些从来没有产生过订单的客户姓名。',
        bullets: [
          '客户是主表。',
          '订单是关联表。',
          '结果要保留没下单的人。',
          '本质是查缺失关联。',
        ],
      },
      {
        id: 'customers-never-order-left-join',
        title: '最稳的思路是先保留所有客户，再看谁没匹配到订单',
        summary:
          '因为题目关心的是“谁没下单”，所以先把所有客户保留下来最自然。`LEFT JOIN` 后，没订单的客户在订单侧字段会是 `NULL`，这时再做筛选即可。',
        bullets: [
          '主表应该是 Customers。',
          '缺失关系很适合 `LEFT JOIN`。',
          '右表为空就是关键线索。',
          '思路比语法更重要。',
        ],
      },
      {
        id: 'customers-never-order-null',
        title: '这里筛的是“订单没有匹配到”，不是客户字段为空',
        summary:
          '很多人第一次写会不小心判断错字段。真正要判断的是订单表那一侧的主键或外键是否为空，因为那代表这位客户没有任何订单命中。',
        bullets: [
          '判空要判订单侧字段。',
          '不要误判客户姓名或客户 id。',
          '空值代表“没有匹配行”。',
          '字段位置不能搞反。',
        ],
      },
      {
        id: 'customers-never-order-alt',
        title: '这题也可以写成 `NOT EXISTS`，但入门阶段先把 `LEFT JOIN` 吃透',
        summary:
          '从语义上说，这题也可以理解为“找出不存在关联订单的客户”。`NOT EXISTS` 同样能做，但对入门者来说，`LEFT JOIN + IS NULL` 更直观，更容易建立关系型思维。',
        bullets: [
          '`NOT EXISTS` 也是合法方案。',
          '入门更推荐先掌握 `LEFT JOIN`。',
          '先能看懂，再追求写法变化。',
          '同题多解有助于巩固语义。',
        ],
        callout:
          'SQL 初学阶段不要急着收集一堆写法。先把“为什么这张表该放左边，为什么这里要判空”说清楚，真正值钱的是这个判断过程。',
      },
      {
        id: 'customers-never-order-solution',
        title: '标准解法：左连接订单后筛空',
        summary:
          '把客户表作为左表，订单表作为右表，用客户 id 和订单里的客户 id 关联。再筛掉那些成功匹配到订单的行，留下订单侧为空的客户。',
        bullets: [
          '写法短，语义清楚。',
          '非常适合表达“缺失关系”。',
          '结果只需输出客户姓名。',
          '是 SQL 入门经典题。',
        ],
        code: `SELECT c.name AS Customers
FROM Customers AS c
LEFT JOIN Orders AS o
  ON c.id = o.customerId
WHERE o.id IS NULL;`,
      },
      {
        id: 'customers-never-order-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把 `LEFT JOIN` 写成 `INNER JOIN`，或者判空字段写错，结果反而把没下单的客户过滤掉了。',
        bullets: [
          '易错点 1：误用 `INNER JOIN`。',
          '易错点 2：判空字段写错。',
          '易错点 3：输出了多余字段。',
          '延伸方向：`NOT EXISTS`、反连接、主从表缺失检测。',
        ],
      },
    ],
  },
  {
    id: 'department-highest-salary',
    label: '184. LeetCode 184. 部门工资最高的员工',
    difficulty: '中等',
    description:
      '这题是在练分组最大值和明细行回查。真正关键不是先把工资排序，而是先求出每个部门的最高工资，再把这个最高值和员工明细对齐。',
    outcome:
      '你能掌握“先聚合、再回连明细”的 SQL 结构，理解为什么单纯 `GROUP BY departmentId` 不足以直接拿到员工姓名，并能处理并列最高工资的情况。',
    sections: [
      {
        id: 'department-highest-summary',
        title: '题目在问什么',
        summary: '给定员工表和部门表，返回每个部门里工资最高的员工姓名和工资。',
        bullets: [
          '需要部门名。',
          '需要员工名。',
          '需要最高工资值。',
          '同部门可能有并列第一。',
        ],
      },
      {
        id: 'department-highest-aggregate',
        title: '先聚合出“每个部门的最高工资”，再找对应员工',
        summary:
          '如果直接在员工表里分组，虽然能拿到 `MAX(salary)`，但拿不到和它严格对应的员工姓名。更稳的方式，是先做一张子查询表：每个部门对应一个最高工资值。',
        bullets: [
          '聚合负责算最高工资。',
          '明细负责拿员工姓名。',
          '两层职责要分开。',
          '这是 SQL 很常见的结构。',
        ],
      },
      {
        id: 'department-highest-join-back',
        title: '聚合结果还要回连员工表，才能拿到真正的员工记录',
        summary:
          '子查询里只有 `departmentId` 和 `maxSalary`，没有员工姓名。因此必须把这张聚合表再和员工表按“部门相同 + 工资相同”回连，才能找出对应员工。',
        bullets: [
          '回连条件是部门和工资双匹配。',
          '单靠部门 id 不够。',
          '这是“明细行回查”的典型套路。',
          '非常适合复用到 TopN 类题目。',
        ],
      },
      {
        id: 'department-highest-tie',
        title: '并列最高不能丢，因为题目要的是“最高的员工”，不是“随便一个”',
        summary:
          '如果一个部门里有两个员工工资都等于最高值，正确结果应该返回两行，而不是只保留其中一个。这也是回连写法比强行排序取第一更稳的原因之一。',
        bullets: [
          '并列第一要全部返回。',
          '不能只取一个样本。',
          '回连天然支持并列情况。',
          '这点是题目隐藏考点。',
        ],
        callout:
          '很多 SQL 题表面像“取最大值”，实际上是在考你能不能把“聚合结果”和“对应明细”重新对齐。这个意识非常关键。',
      },
      {
        id: 'department-highest-solution',
        title: '标准解法：聚合最高工资后回连员工和部门',
        summary:
          '先对子查询按部门求出最高工资，再和员工表按部门与工资回连，最后再接上部门表拿到部门名。这样就能输出部门、员工和工资三列。',
        bullets: [
          '结构清楚，兼容并列最高。',
          '是最常见标准答案。',
          '部门名来自 Department 表。',
          '适合同类“组内极值”题迁移。',
        ],
        code: `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee AS e
JOIN (
  SELECT departmentId, MAX(salary) AS maxSalary
  FROM Employee
  GROUP BY departmentId
) AS t
  ON e.departmentId = t.departmentId
 AND e.salary = t.maxSalary
JOIN Department AS d
  ON e.departmentId = d.id;`,
      },
      {
        id: 'department-highest-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只写了 `MAX(salary)` 却直接去取员工姓名，结果在标准 SQL 语义下并不成立，或者并列第一时漏人。',
        bullets: [
          '易错点 1：聚合后直接拿非分组字段。',
          '易错点 2：回连条件不完整。',
          '易错点 3：并列最高只保留一行。',
          '延伸方向：组内 TopN、窗口函数排名、明细回查。',
        ],
      },
    ],
  },
  {
    id: 'department-top-three-salaries',
    label: '185. LeetCode 185. 部门工资前三高的员工',
    difficulty: '困难',
    description:
      '这题是在把“每组最高值”升级成“每组前 N 高值”。真正关键不是简单排序，而是给每个部门内部做排名，并保留前 3 个工资档位对应的员工。',
    outcome:
      '你能掌握分组内排名的 SQL 建模方式，理解 `DENSE_RANK` 在组内 TopN 场景的价值，并分清“前三条记录”和“前三高工资档位”的区别。',
    sections: [
      {
        id: 'department-top3-summary',
        title: '题目在问什么',
        summary: '返回每个部门里工资前三高的员工姓名、工资和部门名。',
        bullets: [
          '按部门内部比较。',
          '关注前三高工资档位。',
          '并列工资要正确处理。',
          '结果要带部门名。',
        ],
      },
      {
        id: 'department-top3-dense-rank',
        title: '这题本质是“每个部门内部做 dense rank，再取 rank <= 3”',
        summary:
          '如果同一部门有两个人工资相同，他们应该共享同一档位。因此这题本质上不是取前三条记录，而是取前三个不同工资档位，对应的就是组内 `DENSE_RANK`。',
        bullets: [
          '排名是按部门分区做。',
          '相同工资共享同一名次。',
          '取的是前三个工资档位。',
          '`DENSE_RANK` 非常贴题。',
        ],
      },
      {
        id: 'department-top3-partition',
        title: '难点不在连接部门表，而在先把“组内排名”算出来',
        summary:
          '很多人会把注意力放在三表怎么连，其实真正决定成败的是：能不能先在员工表内部按 `departmentId` 分区、按工资降序排名。排名算对了，后面接部门表只是收尾。',
        bullets: [
          '先处理员工表内部排名。',
          '部门表只是补名称。',
          '分区和排序顺序都不能错。',
          '先主后次，逻辑会清晰很多。',
        ],
      },
      {
        id: 'department-top3-tie',
        title: '并列工资会让结果行数超过 3，这是正常的',
        summary:
          '如果某部门第三高工资有多人并列，那么这些人都应该出现在结果里。所以“前三高员工”不一定只有三行，而可能更多。这是 dense rank 题很容易被误解的地方。',
        bullets: [
          '前三高是前三档，不是固定三人。',
          '并列会扩张结果行数。',
          '这不是 bug，而是题意要求。',
          '理解这一点才能写对筛选条件。',
        ],
        callout:
          '做 TopN 题时，一定先问自己：N 指的是 N 行，还是 N 个不同值档位？这一句想清楚，很多 SQL 题会瞬间简单一半。',
      },
      {
        id: 'department-top3-solution',
        title: '标准解法：窗口函数分区排名后过滤',
        summary:
          '先在子查询里对员工表按部门分区、按工资降序做 `DENSE_RANK()`，再保留排名不超过 3 的记录，最后接上部门表拿部门名。',
        bullets: [
          '是最符合题意的现代写法。',
          '结构清楚，扩展到 Top5 也很方便。',
          '窗口函数是关键能力点。',
          '输出层只负责整理字段。',
        ],
        code: `SELECT d.name AS Department, t.name AS Employee, t.salary AS Salary
FROM (
  SELECT
    name,
    salary,
    departmentId,
    DENSE_RANK() OVER (
      PARTITION BY departmentId
      ORDER BY salary DESC
    ) AS salaryRank
  FROM Employee
) AS t
JOIN Department AS d
  ON t.departmentId = d.id
WHERE t.salaryRank <= 3;`,
      },
      {
        id: 'department-top3-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把它写成“每组排序后只取前三条”，结果并列工资场景就会和题意不一致。',
        bullets: [
          '易错点 1：把 `DENSE_RANK` 写成 `ROW_NUMBER`。',
          '易错点 2：误解“前三高”的语义。',
          '易错点 3：没按部门分区排名。',
          '延伸方向：组内 TopK、窗口函数、排行榜查询。',
        ],
      },
    ],
  },
  {
    id: 'reverse-words-in-a-string-ii',
    label: '186. LeetCode 186. 翻转字符串里的单词 II',
    difficulty: '中等',
    description:
      '这题是在练原地翻转技巧。真正关键不是把单词拆出来再重组，而是先整体翻转，再逐个单词翻转，从而在原数组上完成操作。',
    outcome:
      '你能掌握“整体翻转 + 局部翻转”的原地算法套路，理解为什么它能在不借助额外数组的情况下完成单词顺序反转，并写出双指针版本。',
    sections: [
      {
        id: 'reverse-words2-summary',
        title: '题目在问什么',
        summary:
          '给定一个字符数组，原地翻转其中单词的顺序，要求空间复杂度尽量低。',
        bullets: [
          '输入是字符数组。',
          '要原地修改。',
          '反转的是单词顺序。',
          '单词内部字母最终顺序要正确。',
        ],
      },
      {
        id: 'reverse-words2-two-reverse',
        title: '最核心的思路，是两次翻转',
        summary:
          '先把整个字符数组整体翻转，这时单词顺序被反过来了，但每个单词内部也倒了。接着再逐个把每个单词翻转一次，就能恢复单词内部顺序。',
        bullets: [
          '整体翻转改变单词顺序。',
          '局部翻转修复单词内部字符。',
          '两步组合后结果刚好正确。',
          '这是典型原地算法套路。',
        ],
      },
      {
        id: 'reverse-words2-why-array',
        title: '为什么输入是字符数组：题目在强调“原地”而不是字符串 API',
        summary:
          '如果输入是普通字符串，很多语言里字符串不可变，题目就没法真正考原地操作。因此它把输入设计成字符数组，本质上是在考你对区间翻转和指针扫描的掌握。',
        bullets: [
          '字符数组可原地交换。',
          '题目重点是空间优化。',
          '不是考 split 和 join。',
          '数据结构设计本身就在提示解法方向。',
        ],
      },
      {
        id: 'reverse-words2-scan',
        title: '翻完整体后，要靠双指针扫描每个单词边界',
        summary:
          '整体翻转之后，再从左到右扫描。遇到空格就知道一个单词结束了，这时把这个单词对应的区间再翻转一次。最后别忘了处理数组末尾那个单词。',
        bullets: [
          '空格是天然分隔符。',
          '每个单词都是一个区间。',
          '末尾单词要单独收尾。',
          '区间翻转是重复动作。',
        ],
        callout:
          '原地题最怕“思路知道了，边界处理没收干净”。像最后一个单词、连续空格是否存在、左右指针何时更新，都是这类题的失分点。',
      },
      {
        id: 'reverse-words2-solution',
        title: '标准解法：整体翻转后逐词翻转',
        summary:
          '先写一个 `reverse` 辅助函数。先翻转整个数组，再扫描每个单词区间并局部翻转。这样既能原地完成，又能保持时间复杂度线性。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '本质是区间翻转模板题。',
          '非常适合理解原地字符串处理。',
        ],
        code: `function reverseWords(chars: string[]): void {
  const reverse = (left: number, right: number) => {
    while (left < right) {
      ;[chars[left], chars[right]] = [chars[right], chars[left]]
      left += 1
      right -= 1
    }
  }

  reverse(0, chars.length - 1)

  let start = 0

  for (let index = 0; index <= chars.length; index += 1) {
    if (index === chars.length || chars[index] === ' ') {
      reverse(start, index - 1)
      start = index + 1
    }
  }
}`,
      },
      {
        id: 'reverse-words2-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是知道要翻转两次，但不会正确处理每个单词边界，尤其是最后一个单词经常漏翻。',
        bullets: [
          '易错点 1：漏掉最后一个单词。',
          '易错点 2：区间边界写错。',
          '易错点 3：把题做成额外数组拷贝。',
          '延伸方向：区间反转、原地数组变换、字符串双指针。',
        ],
      },
    ],
  },
  {
    id: 'repeated-dna-sequences',
    label: '187. LeetCode 187. 重复的DNA序列',
    difficulty: '中等',
    description:
      '这题是在练固定窗口去重。真正关键不是统计所有子串，而是对长度固定为 10 的窗口做滑动扫描，并区分“第一次出现”和“重复出现”。',
    outcome:
      '你能掌握固定长度滑动窗口与哈希去重的组合思路，理解为什么这里要区分已见集合和结果集合，并能写出线性时间的解法。',
    sections: [
      {
        id: 'dna-summary',
        title: '题目在问什么',
        summary:
          '给定一个只包含 `A/C/G/T` 的字符串，找出所有长度为 10 且出现次数超过一次的子串。',
        bullets: [
          '窗口长度固定为 10。',
          '只关心重复子串。',
          '每个重复结果只返回一次。',
          '本质是固定窗口去重。',
        ],
      },
      {
        id: 'dna-window',
        title: '窗口长度固定，天然适合滑动扫描',
        summary:
          '因为所有候选串的长度都固定为 10，所以最自然的做法就是从左到右枚举每个长度为 10 的窗口。每次截取一个窗口字符串，判断它是否出现过。',
        bullets: [
          '固定长度优先想到滑动窗口。',
          '每个起点对应一个候选串。',
          '窗口数量是 `n - 9`。',
          '扫描过程非常直接。',
        ],
      },
      {
        id: 'dna-two-sets',
        title: '为什么通常要两个集合：一个记录见过，一个记录结果',
        summary:
          '如果某个窗口第一次出现，只需记入已见集合；第二次出现时，它就应该被加入答案。为了避免第三次、第四次重复加入，一般还会用结果集合去重。',
        bullets: [
          '已见集合负责判断是否重复。',
          '结果集合负责防止重复入答案。',
          '两层集合职责不同。',
          '这是本题实现关键细节。',
        ],
      },
      {
        id: 'dna-encoding',
        title: '进阶可以做位编码，但面试先写清哈希窗口更稳',
        summary:
          '因为 DNA 只有四种字符，所以可以把每个字符编码成 2 位，进一步优化常数。但对刷题和面试来说，先把固定窗口 + 哈希集合的基础解法写对、讲清更重要。',
        bullets: [
          '基础解法已经足够通过。',
          '位编码属于进阶优化。',
          '先正确，再优化。',
          '不要一上来就把题写复杂。',
        ],
        callout:
          '很多中等题真正想考的是“你能不能识别窗口长度固定”和“你会不会正确做去重”，而不是一上来就追求位运算炫技。',
      },
      {
        id: 'dna-solution',
        title: '标准解法：滑动窗口 + 哈希集合',
        summary:
          '遍历所有长度为 10 的子串。若当前子串第一次出现，就记入已见集合；若已经见过，就加入答案集合。最后把答案集合转成数组返回。',
        bullets: [
          '时间复杂度接近 `O(n)`。',
          '实现短，思路明确。',
          '非常适合训练固定窗口思维。',
          '是经典哈希题。',
        ],
        code: `function findRepeatedDnaSequences(s: string): string[] {
  const seen = new Set<string>()
  const repeated = new Set<string>()

  for (let index = 0; index <= s.length - 10; index += 1) {
    const sequence = s.slice(index, index + 10)

    if (seen.has(sequence)) {
      repeated.add(sequence)
    } else {
      seen.add(sequence)
    }
  }

  return [...repeated]
}`,
      },
      {
        id: 'dna-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只有一个集合，导致同一个重复串会被多次加入答案，或者窗口边界写错漏掉最后一段。',
        bullets: [
          '易错点 1：结果未去重。',
          '易错点 2：窗口边界少一位或多一位。',
          '易错点 3：忽略字符串过短情况。',
          '延伸方向：位编码、Rabin-Karp、固定窗口哈希。',
        ],
      },
    ],
  },
  {
    id: 'best-time-to-buy-and-sell-stock-iv',
    label: '188. LeetCode 188. 买卖股票的最佳时机 IV',
    difficulty: '困难',
    description:
      '这题是在练交易状态 DP。真正关键不是暴力枚举买卖点，而是把“做了几次交易”和“当前是否持仓”同时纳入状态。',
    outcome:
      '你能掌握多次交易股票题的状态设计方式，理解 `buy/sell` 状态如何随交易次数推进，并知道当 `k` 很大时为什么可以退化成不限次数交易。',
    sections: [
      {
        id: 'stock4-summary',
        title: '题目在问什么',
        summary: '给定最多可完成 `k` 次交易，求股票价格序列中的最大利润。',
        bullets: [
          '一次交易由买入和卖出组成。',
          '不能同时参与多笔交易。',
          '交易次数有限制。',
          '本质是带次数约束的状态 DP。',
        ],
      },
      {
        id: 'stock4-state',
        title: '最核心的状态，是“第 i 次交易后的持仓/空仓最优值”',
        summary:
          '因为每一次买卖都会改变利润和交易阶段，所以最自然的状态设计就是：某次交易阶段下，当前持有股票时的最优利润，以及当前不持有股票时的最优利润。',
        bullets: [
          '状态要同时带交易次数和持仓状态。',
          '买入和卖出会在不同状态间切换。',
          '单维 DP 不够表达问题。',
          '这是整题建模难点。',
        ],
      },
      {
        id: 'stock4-transition',
        title: '买入来自上一个卖出状态，卖出来自当前买入状态',
        summary:
          '当你做第 `t` 次买入时，利润应来自“第 `t - 1` 次卖出后”的状态减去当前价格；而第 `t` 次卖出则来自“第 `t` 次买入后”的状态加上当前价格。状态转移必须严格遵守交易顺序。',
        bullets: [
          '买入前必须先处于空仓。',
          '卖出前必须已经持仓。',
          '交易次数推进发生在买入这一层理解最顺。',
          '顺序关系不能写乱。',
        ],
      },
      {
        id: 'stock4-large-k',
        title: '当 `k` 足够大时，这题会退化成不限次数交易',
        summary:
          '如果 `k >= prices.length / 2`，理论上你可以覆盖所有可能的上升区间，此时问题就等价于“股票 II”。这一步优化能显著降低复杂场景下的计算复杂度。',
        bullets: [
          '一次完整交易至少占两天。',
          '`k` 太大时约束失效。',
          '可直接退化成贪心累加上升差值。',
          '这是经典优化点。',
        ],
        callout:
          '困难 DP 题经常有这种“极端参数退化”的入口。面试里你能主动讲出这一步，说明你不是只会背状态转移，而是会看约束结构。',
      },
      {
        id: 'stock4-solution',
        title: '标准解法：交易次数维度 + 持仓状态 DP',
        summary:
          '用两个数组分别表示每一笔交易下的买入最优值和卖出最优值。遍历价格时不断更新。如果 `k` 很大，先走不限次数交易分支；否则按交易状态 DP 计算。',
        bullets: [
          '时间复杂度是 `O(nk)`。',
          '空间复杂度可压成 `O(k)`。',
          '是股票系列最重要的综合题之一。',
          '适合检验状态建模能力。',
        ],
        code: `function maxProfit(k: number, prices: number[]): number {
  if (prices.length === 0 || k === 0) {
    return 0
  }

  if (k >= Math.floor(prices.length / 2)) {
    let profit = 0

    for (let index = 1; index < prices.length; index += 1) {
      profit += Math.max(0, prices[index] - prices[index - 1])
    }

    return profit
  }

  const buy = Array(k + 1).fill(Number.NEGATIVE_INFINITY)
  const sell = Array(k + 1).fill(0)

  for (const price of prices) {
    for (let trade = 1; trade <= k; trade += 1) {
      buy[trade] = Math.max(buy[trade], sell[trade - 1] - price)
      sell[trade] = Math.max(sell[trade], buy[trade] + price)
    }
  }

  return sell[k]
}`,
      },
      {
        id: 'stock4-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是交易次数和持仓状态混在一起，导致转移顺序错乱，或者漏掉大 `k` 退化优化。',
        bullets: [
          '易错点 1：交易次数定义不清。',
          '易错点 2：更新顺序写乱。',
          '易错点 3：漏掉大 `k` 特判。',
          '延伸方向：股票系列 DP、状态压缩、交易冷冻期与手续费。',
        ],
      },
    ],
  },
  {
    id: 'rotate-array',
    label: '189. LeetCode 189. 轮转数组',
    difficulty: '中等',
    description:
      '这题是在练数组原地变换。真正关键不是开新数组复制，而是利用三次翻转，把数组右移转换成区间重排问题。',
    outcome:
      '你能掌握数组轮转的原地三次翻转解法，理解为什么先整体翻转再局部翻转能得到正确结果，并处理 `k` 大于数组长度的情况。',
    sections: [
      {
        id: 'rotate-array-summary',
        title: '题目在问什么',
        summary: '给定一个数组和整数 `k`，把数组中的元素向右轮转 `k` 个位置。',
        bullets: [
          '右移是循环的。',
          '要求修改原数组。',
          '`k` 可能大于数组长度。',
          '本质是原地重排。',
        ],
      },
      {
        id: 'rotate-array-mod',
        title: '第一步一定先取模，否则大 `k` 会把问题想复杂',
        summary:
          '如果数组长度是 `n`，右移 `n` 次等于没动，右移 `n + 1` 次等于右移 1 次。所以任何时候都应该先做 `k %= n`，把问题压回最小等价范围。',
        bullets: [
          '取模是标准预处理。',
          '能直接缩小问题规模。',
          '避免无意义重复轮转。',
          '是最常见边界点。',
        ],
      },
      {
        id: 'rotate-array-three-reverse',
        title: '原地最经典的做法，是三次翻转',
        summary:
          '先翻转整个数组，再翻转前 `k` 个元素，最后翻转后面的 `n - k` 个元素。经过这三步，元素就会移动到右移后的正确位置。',
        bullets: [
          '整体翻转负责交换两段顺序。',
          '局部翻转负责恢复各自内部顺序。',
          '是非常经典的数组技巧。',
          '空间复杂度能做到 `O(1)`。',
        ],
      },
      {
        id: 'rotate-array-why',
        title: '为什么三次翻转有效：它把“尾部搬到头部”变成了区间顺序恢复',
        summary:
          '右移 `k` 的本质，是让数组末尾的 `k` 个元素整体搬到最前面。三次翻转先把整个顺序打散，再分别把前后两段内部顺序修正回来，因此最终恰好得到目标排列。',
        bullets: [
          '本质是在交换两段区间。',
          '翻转是一种低成本的区间操作。',
          '理解过程比背模板更重要。',
          '这是很多原地题的共同思路。',
        ],
        callout:
          '像这种“看起来很魔术”的三步法，最值得掌握的不是结论本身，而是你能不能把它解释成“整体换位 + 局部修复”的结构。解释出来才算真会。',
      },
      {
        id: 'rotate-array-solution',
        title: '标准解法：取模后做三次翻转',
        summary:
          '定义一个区间翻转函数，先整体翻转数组，再分别翻转前 `k` 个和后 `n - k` 个区间。这样就能在常数空间内完成右轮转。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '是数组原地变换的经典模板。',
          '非常适合和字符串翻转题一起记忆。',
        ],
        code: `function rotate(nums: number[], k: number): void {
  const n = nums.length
  k %= n

  const reverse = (left: number, right: number) => {
    while (left < right) {
      ;[nums[left], nums[right]] = [nums[right], nums[left]]
      left += 1
      right -= 1
    }
  }

  reverse(0, n - 1)
  reverse(0, k - 1)
  reverse(k, n - 1)
}`,
      },
      {
        id: 'rotate-array-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有先取模，或者三次翻转的区间边界写错，导致样例只对一半。',
        bullets: [
          '易错点 1：漏掉 `k %= n`。',
          '易错点 2：翻转区间写错。',
          '易错点 3：没处理空数组或长度 1。',
          '延伸方向：区间翻转、循环位移、原地数组重排。',
        ],
      },
    ],
  },
  {
    id: 'reverse-bits',
    label: '190. LeetCode 190. 颠倒二进制位',
    difficulty: '简单',
    description:
      '这题是在练位运算的逐位构造。真正关键不是把数字转成二进制字符串再反转，而是逐位取出最低位，并把它依次拼到结果的高位方向。',
    outcome:
      '你能掌握按位读取和按位构造结果的思路，理解左移、右移和按位与在位题中的配合方式，并能写出固定 32 位的标准解法。',
    sections: [
      {
        id: 'reverse-bits-summary',
        title: '题目在问什么',
        summary:
          '给定一个 32 位无符号整数，把它的二进制位顺序完全颠倒后返回结果。',
        bullets: [
          '固定是 32 位。',
          '反转的是位顺序。',
          '不是字符串反转题。',
          '本质是位运算模拟。',
        ],
      },
      {
        id: 'reverse-bits-lowbit',
        title: '每一轮先取最低位，再把结果左移一位接进去',
        summary:
          '当前数字的最低位可以通过 `n & 1` 拿到。每取出一位，就先把结果左移，为新位留空间，再把这位拼接进去。原数字则右移，准备处理下一位。',
        bullets: [
          '`n & 1` 用来取最低位。',
          '结果左移用于腾位置。',
          '原数右移进入下一轮。',
          '是非常标准的位构造过程。',
        ],
      },
      {
        id: 'reverse-bits-fixed32',
        title: '为什么一定循环 32 次：因为高位的 0 也属于题目的一部分',
        summary:
          '如果只循环到 `n` 变成 0，就会漏掉前导 0 带来的位置信息。题目明确是 32 位无符号整数，所以无论数字多小，都必须完整处理 32 次。',
        bullets: [
          '位数固定是关键约束。',
          '前导 0 不能忽略。',
          '不能按“非零位个数”循环。',
          '这点是很多人第一次会错的地方。',
        ],
      },
      {
        id: 'reverse-bits-string',
        title: '字符串法能做，但位运算法更贴题也更稳定',
        summary:
          '把数字转成二进制字符串、补齐 32 位再翻转当然能做，但它既不够原生，也偏离了这题的考点。面试里更推荐直接用位运算把过程讲清楚。',
        bullets: [
          '字符串法不是最优表达。',
          '位运算法更能体现基本功。',
          '固定 32 次循环实现很稳定。',
          '这题本来就是位题。',
        ],
        callout:
          '很多简单位运算题的价值，不在于题目难，而在于它能检验你是不是把移位、取位、拼位这些最基础的操作真正练熟了。',
      },
      {
        id: 'reverse-bits-solution',
        title: '标准解法：循环 32 次逐位构造',
        summary:
          '初始化结果为 0。每轮让结果左移一位，再拼接当前最低位，然后把原数无符号右移。重复 32 次后，结果就是二进制位反转后的数。',
        bullets: [
          '时间复杂度是 `O(1)`，因为固定 32 次。',
          '空间复杂度是 `O(1)`。',
          '是标准位运算模板题。',
          '非常适合打牢按位操作基础。',
        ],
        code: `function reverseBits(n: number): number {
  let result = 0

  for (let count = 0; count < 32; count += 1) {
    result = (result << 1) | (n & 1)
    n >>>= 1
  }

  return result >>> 0
}`,
      },
      {
        id: 'reverse-bits-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只循环到 `n === 0`，导致高位补零信息丢失，或者把有符号右移和无符号右移混用了。',
        bullets: [
          '易错点 1：没固定循环 32 次。',
          '易错点 2：把 `>>` 和 `>>>` 混用。',
          '易错点 3：遗漏最终无符号转换。',
          '延伸方向：位计数、掩码、二进制构造类题目。',
        ],
      },
    ],
  },
  {
    id: 'number-of-1-bits',
    label: '191. LeetCode 191. 位 1 的个数',
    difficulty: '简单',
    description:
      '这题是在练最基础的位统计。真正关键不是把数字转成字符串逐个数，而是理解怎样用位运算持续消掉最低位的 `1`，把统计过程压到最短。',
    outcome:
      '你能掌握按位统计 `1` 的两种常见思路，理解 `n & (n - 1)` 为什么能删除最低位的 `1`，并能写出稳定的标准解法。',
    sections: [
      {
        id: 'number-of-1-bits-summary',
        title: '题目在问什么',
        summary: '给定一个 32 位无符号整数，返回它的二进制表示中 `1` 的数量。',
        bullets: [
          '统计的是二进制中 `1` 的个数。',
          '输入按 32 位无符号数理解。',
          '本质是位计数问题。',
          '重点是位运算基本功。',
        ],
      },
      {
        id: 'number-of-1-bits-lowbit',
        title: '最直接的做法，是逐位读取最低位',
        summary:
          '每次用 `n & 1` 读取当前最低位，如果是 `1` 就累加，然后把 `n` 无符号右移一位。这样循环直到所有位都处理完，就能得到答案。',
        bullets: [
          '`n & 1` 用来判断最低位。',
          '`n >>>= 1` 用来进入下一位。',
          '逻辑直观，容易实现。',
          '适合作为第一反应方案。',
        ],
      },
      {
        id: 'number-of-1-bits-n-and-n-minus-1',
        title: '更经典的写法，是每次删掉一个最低位的 `1`',
        summary:
          '表达式 `n & (n - 1)` 会把 `n` 的最低位 `1` 清掉。这样每执行一次，就等价于删掉一个 `1`，循环次数正好等于 `1` 的个数，通常比逐位扫描更精炼。',
        bullets: [
          '每轮都会减少一个 `1`。',
          '循环次数等于答案本身。',
          '是位题里非常高频的技巧。',
          '适合面试时重点讲清楚。',
        ],
      },
      {
        id: 'number-of-1-bits-why',
        title: '为什么 `n & (n - 1)` 能删掉最低位的 `1`',
        summary:
          '当一个数减 1 时，最低位的 `1` 会变成 `0`，它右边的连续 `0` 会变成 `1`。再与原数做按位与，只有那一位 `1` 被清掉，其它更高位保持不变，所以能精准删除最低位 `1`。',
        bullets: [
          '减 1 会改变最低位 `1` 及其右侧结构。',
          '按位与会保留共同为 `1` 的高位。',
          '这是位计数和子集枚举里的通用技巧。',
          '必须真正理解，不要只背模板。',
        ],
        callout:
          '像 `n & (n - 1)` 这种位技巧，一旦理解透了，后面做位计数、判断 2 的幂、枚举子集时都会反复遇到，收益非常高。',
      },
      {
        id: 'number-of-1-bits-solution',
        title: '标准解法：循环清除最低位的 `1`',
        summary:
          '初始化计数器为 0。只要 `n` 还不为 0，就执行一次 `n &= n - 1`，同时计数加 1。循环结束时，计数器就是答案。',
        bullets: [
          '时间复杂度是 `O(k)`，`k` 为 `1` 的个数。',
          '空间复杂度是 `O(1)`。',
          '代码短而稳定。',
          '是最推荐的标准写法。',
        ],
        code: `function hammingWeight(n: number): number {
  let count = 0

  while (n !== 0) {
    n &= n - 1
    count += 1
  }

  return count
}`,
      },
      {
        id: 'number-of-1-bits-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只会逐位扫描却讲不清更优技巧，或者在 JavaScript 里忽略无符号整数语义，导致对位运算结果理解模糊。',
        bullets: [
          '易错点 1：不会解释 `n & (n - 1)` 的含义。',
          '易错点 2：把有符号和无符号语义混在一起。',
          '易错点 3：以为必须转字符串才能做。',
          '延伸方向：2 的幂、只出现一次的数字、子集枚举。',
        ],
      },
    ],
  },
  {
    id: 'word-frequency',
    label: '192. LeetCode 192. 词频统计',
    difficulty: '中等',
    description:
      '这题是在练命令行文本处理链路。真正关键不是死记一个答案，而是理解拆词、计数、排序这三个动作为什么要交给不同的 Unix 工具各司其职。',
    outcome:
      '你能掌握 Shell 文本处理的典型流水线写法，理解 `tr`、`sort`、`uniq -c`、再次 `sort` 的职责分工，并能独立完成基础词频统计。',
    sections: [
      {
        id: 'word-frequency-summary',
        title: '题目在问什么',
        summary:
          '给定一个文本文件 `words.txt`，按出现频次从高到低输出每个单词和它的出现次数。',
        bullets: [
          '输入来自文件，不是内存数组。',
          '输出格式是“次数 单词”。',
          '重点是 Shell 命令组合。',
          '本质是文本拆分后做聚合统计。',
        ],
      },
      {
        id: 'word-frequency-split',
        title: '第一步先拆词：把空格压成“每行一个单词”',
        summary:
          '文本文件里单词原本是按空格分隔的，而 `uniq -c` 只能统计连续重复行，所以必须先把空格替换成换行，把整个文件转换成“一个单词占一行”的结构。',
        bullets: [
          '`tr -s` 可以顺便压缩重复空格。',
          '换行化之后更适合下游处理。',
          '这是流水线的结构整理阶段。',
          '很多 Shell 题第一步都是先改数据形态。',
        ],
      },
      {
        id: 'word-frequency-group',
        title: '第二步必须先排序，再计数',
        summary:
          '`uniq -c` 只会统计相邻且相同的行，所以如果不先 `sort`，相同单词分散在不同位置时就不会被合并。排序是为了把同类项聚到一起，给计数创造条件。',
        bullets: [
          '`sort` 负责分组前置条件。',
          '`uniq -c` 负责压缩并计数。',
          '这两个命令通常成对出现。',
          '顺序写错就得不到正确结果。',
        ],
      },
      {
        id: 'word-frequency-desc',
        title: '最后再按次数倒序排一次，才符合题目输出要求',
        summary:
          '经过 `uniq -c` 之后，数据形态已经变成“次数 单词”。此时需要再做一次按数值倒序排序，这样出现次数最多的单词才会排在前面。',
        bullets: [
          '`sort -nr` 负责数值倒序。',
          '这是结果展示排序，不是分组排序。',
          '前后两次排序目的不同。',
          '理解阶段职责比记命令更重要。',
        ],
        callout:
          'Shell 题最容易出的问题，就是只背一条长命令，却不知道每一段在干什么。面试里真正有价值的，是你能把这条流水线拆开解释清楚。',
      },
      {
        id: 'word-frequency-solution',
        title: '标准解法：拆词、排序、计数、再排序',
        summary:
          '先用 `tr` 把空格切成换行，再按字典序排序，让相同单词相邻，随后用 `uniq -c` 统计次数，最后按次数倒序排序并整理输出格式。',
        bullets: [
          '时间主要花在排序上。',
          '思路清晰，工具职责明确。',
          '是非常典型的文本统计流水线。',
          '适合顺手延伸到日志分析题。',
        ],
        code: `cat words.txt | tr -s ' ' '\\n' | sort | uniq -c | sort -nr | awk '{print $2, $1}'`,
      },
      {
        id: 'word-frequency-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忘了先排序就直接 `uniq -c`，或者拆词时没有压缩多余空格，导致统计结果多出空行或分组错误。',
        bullets: [
          '易错点 1：没先排序就计数。',
          '易错点 2：拆词时没处理重复空格。',
          '易错点 3：最后输出顺序不符合要求。',
          '延伸方向：日志统计、TopN 分析、awk/sed 文本处理。',
        ],
      },
    ],
  },
  {
    id: 'valid-phone-numbers',
    label: '193. LeetCode 193. 有效电话号码',
    difficulty: '简单',
    description:
      '这题是在练命令行里的正则过滤。真正关键不是随便写一个能过样例的模式，而是先把题目允许的电话号码格式收敛清楚，再用扩展正则一次性精准匹配。',
    outcome:
      '你能掌握 `grep -E` 的基本用法，理解 `^`、`$`、分组、数量词在正则中的作用，并能写出只匹配指定电话号码格式的命令。',
    sections: [
      {
        id: 'valid-phone-numbers-summary',
        title: '题目在问什么',
        summary:
          '给定文本文件 `file.txt`，输出所有符合电话号码规则的行。允许的格式只有 `(xxx) xxx-xxxx` 和 `xxx-xxx-xxxx` 两种。',
        bullets: [
          '只有两种合法格式。',
          '不合法的行必须过滤掉。',
          '重点是正则表达式匹配。',
          '本质是文本筛选问题。',
        ],
      },
      {
        id: 'valid-phone-numbers-anchor',
        title: '先用 `^` 和 `$` 把整行锁死，避免局部匹配误判',
        summary:
          '如果不用行首 `^` 和行尾 `$`，正则只要在一整行里找到一段符合的子串就会匹配成功。但题目要求整行就是电话号码，所以必须把整行边界锁死。',
        bullets: [
          '`^` 表示从行首开始。',
          '`$` 表示在行尾结束。',
          '能避免前后多余字符漏网。',
          '是文本过滤题的基础动作。',
        ],
      },
      {
        id: 'valid-phone-numbers-alternation',
        title: '两种格式并列时，用分组和“或”来表达',
        summary:
          '合法格式只有两类：`123-456-7890` 或 `(123) 456-7890`。最自然的方式就是把这两种格式分别写出来，再用分组和 `|` 做并列匹配。',
        bullets: [
          '`|` 表示两种模式二选一。',
          '括号分组能让结构更清楚。',
          '空格和横杠都要严格写进规则。',
          '格式题最怕“差不多匹配”。',
        ],
      },
      {
        id: 'valid-phone-numbers-digit-count',
        title: '数量词决定了每段必须是 3 位或 4 位，不能模糊处理',
        summary:
          '电话号码不是“若干数字”就行，而是前三段固定为 `3-3-4`。因此需要用 `[0-9]{3}` 和 `[0-9]{4}` 精确限制位数，保证既不过宽，也不过窄。',
        bullets: [
          '`{3}` 和 `{4}` 用来限制长度。',
          '字符类 `[0-9]` 用来表示数字。',
          '固定格式题必须用精确约束。',
          '不要用 `.*` 这类宽松表达式糊过去。',
        ],
        callout:
          '像这种格式校验题，真正重要的不是把正则写长，而是把允许和不允许的边界列清楚。边界清楚了，表达式自然就会变得短而准。',
      },
      {
        id: 'valid-phone-numbers-solution',
        title: '标准解法：用扩展正则精确匹配两种格式',
        summary:
          '使用 `grep -E` 开启扩展正则，把两种合法电话号码格式并列写在一个表达式里，并用行首行尾保证整行完全符合规则。',
        bullets: [
          '命令简短但约束完整。',
          '非常适合练扩展正则基础。',
          '是文本筛选题的标准答案。',
          '后续可延伸到邮箱、日期等格式校验。',
        ],
        code: `grep -E "^([0-9]{3}-[0-9]{3}-[0-9]{4}|\\([0-9]{3}\\) [0-9]{3}-[0-9]{4})$" file.txt`,
      },
      {
        id: 'valid-phone-numbers-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忘记写边界锚点、把空格写漏、或者错误地把括号当普通字符使用，导致正则并没有真正限制到题目指定的格式。',
        bullets: [
          '易错点 1：漏掉 `^` 和 `$`。',
          '易错点 2：忘了转义括号。',
          '易错点 3：把空格位置写错。',
          '延伸方向：邮箱校验、日志筛选、grep/sed/awk 正则处理。',
        ],
      },
    ],
  },
  {
    id: 'transpose-file',
    label: '194. LeetCode 194. 转置文件',
    difficulty: '中等',
    description:
      '这题是在练 Shell 对二维文本的重组能力。真正关键不是逐字符硬处理，而是先把每一行看成一组字段，再按列索引重新拼接输出。',
    outcome:
      '你能掌握用 `awk` 做行列转置的基本思路，理解为什么要先缓存所有单元格，再按列优先输出，并能独立处理规则矩阵类文本题。',
    sections: [
      {
        id: 'transpose-file-summary',
        title: '题目在问什么',
        summary:
          '给定 `file.txt`，每行包含相同数量的单词，要求输出它的转置结果，也就是把原来的列变成行。',
        bullets: [
          '输入本质是一张文本表格。',
          '每行字段数相同。',
          '输出是行列互换后的文本。',
          '重点是 Shell 文本重组。',
        ],
      },
      {
        id: 'transpose-file-cache',
        title: '先按行读取并缓存每个位置的值',
        summary:
          'Shell 本身不擅长随机访问二维结构，所以要借助 `awk` 在扫描每一行时，把第 `i` 行第 `j` 列的内容先缓存起来，后面再按列顺序统一输出。',
        bullets: [
          '`awk` 天然适合按字段读取。',
          '缓存后才能完成列优先遍历。',
          '这是从流式读取转成结构化处理。',
          '适合二维文本题的标准套路。',
        ],
      },
      {
        id: 'transpose-file-column-first',
        title: '输出阶段要按列遍历，而不是按原行遍历',
        summary:
          '转置后的第 1 行其实是原来的第 1 列，所以输出时必须外层循环列、内层循环行。只有遍历顺序反过来，才能真正完成行列互换。',
        bullets: [
          '外层列循环决定输出行数。',
          '内层行循环负责拼接原列数据。',
          '遍历顺序就是转置的核心。',
          '这是最容易讲错的地方。',
        ],
      },
      {
        id: 'transpose-file-awk',
        title: '为什么这题更适合用 `awk` 而不是 `tr` 或 `cut`',
        summary:
          '`tr` 更适合字符替换，`cut` 更适合单列提取，但转置需要同时记住全部单元格并重排输出，`awk` 既能按字段读取，也能写双层循环，所以最自然。',
        bullets: [
          '`awk` 兼顾读取、存储和拼接。',
          '适合处理规则字段型文本。',
          '比多命令拼接更清晰。',
          '是这题最主流的解法。',
        ],
        callout:
          'Shell 题不要一上来就背答案，先判断问题属于“替换、过滤、分组”还是“重组”。像转置这种题，本质是重组，工具选择就应该偏向 `awk`。',
      },
      {
        id: 'transpose-file-solution',
        title: '标准解法：用 `awk` 缓存后按列输出',
        summary:
          '扫描文件时，把每个字段缓存到二维数组里，并记录总行数和总列数。最后在 `END` 阶段按列优先遍历输出，就能得到转置结果。',
        bullets: [
          '思路清晰，结构稳定。',
          '字段数一致时最容易实现。',
          '是典型的 `awk` 二维处理题。',
          '适合延伸到 CSV 类文本操作。',
        ],
        code: `awk '{
  for (column = 1; column <= NF; column += 1) {
    table[NR, column] = $column
  }
  if (NF > maxColumn) {
    maxColumn = NF
  }
}
END {
  for (column = 1; column <= maxColumn; column += 1) {
    line = table[1, column]
    for (row = 2; row <= NR; row += 1) {
      line = line " " table[row, column]
    }
    print line
  }
}' file.txt`,
      },
      {
        id: 'transpose-file-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是输出阶段仍按行循环，导致只是原样打印；或者忘了缓存全部数据，读到后面时拿不到前面的列信息。',
        bullets: [
          '易错点 1：行列循环顺序写反。',
          '易错点 2：没缓存二维数据。',
          '易错点 3：拼接空格时多出多余分隔符。',
          '延伸方向：CSV 处理、矩阵打印、awk 二维数组。',
        ],
      },
    ],
  },
  {
    id: 'tenth-line',
    label: '195. LeetCode 195. 第十行',
    difficulty: '简单',
    description:
      '这题是在练 Shell 里最基础的行定位。真正关键不是把文件全读出来再手动数，而是知道哪些命令天然适合按行过滤目标位置。',
    outcome:
      '你能掌握按行提取文本的几种常见写法，理解 `sed`、`awk`、`head/tail` 在定位指定行时的区别，并能写出最简洁的标准答案。',
    sections: [
      {
        id: 'tenth-line-summary',
        title: '题目在问什么',
        summary:
          '给定 `file.txt`，输出它的第 10 行；如果不足 10 行，则不输出任何内容。',
        bullets: [
          '目标是精确取第 10 行。',
          '不足 10 行时结果为空。',
          '是标准的文本行定位题。',
          '重点在工具选型而不是算法复杂度。',
        ],
      },
      {
        id: 'tenth-line-sed',
        title: '最直接的解法，是让 `sed` 只打印第 10 行',
        summary:
          '`sed` 非常适合按行号处理文本。只要关闭默认输出，再指定第 10 行打印，就能稳定得到答案，而且不会多输出其它行。',
        bullets: [
          '`-n` 用来关闭默认逐行打印。',
          '`10p` 表示打印第 10 行。',
          '表达非常简洁。',
          '是这题最常见的标准答案。',
        ],
      },
      {
        id: 'tenth-line-awk',
        title: '如果用 `awk`，本质就是判断当前行号是不是 10',
        summary:
          '`awk` 每读一行都会维护 `NR`。因此只要写 `NR == 10 { print }` 就能在读到第 10 行时输出它。这个思路和 `sed` 一样，本质上都是行号过滤。',
        bullets: [
          '`NR` 是当前处理到的行号。',
          '条件满足时才打印。',
          '思路非常直观。',
          '适合顺手讲清 Shell 的行模型。',
        ],
      },
      {
        id: 'tenth-line-head-tail',
        title: '也可以用 `head` 加 `tail`，但表达力不如 `sed` 直接',
        summary:
          '先用 `head -n 10` 取前 10 行，再用 `tail -n 1` 取最后一行，也能得到答案。但这种写法要启动两个命令，表达没有单命令方案直接。',
        bullets: [
          '逻辑是先截断再提取。',
          '能做，但不是最短路径。',
          '适合理解 Unix 小工具组合思想。',
          '面试中通常优先写更简洁方案。',
        ],
        callout:
          '同一道 Shell 题通常会有多种命令写法。真正值得比较的，不只是“能不能过”，而是谁更直接、更稳定、更符合这个工具的职责。',
      },
      {
        id: 'tenth-line-solution',
        title: '标准解法：用 `sed` 精确打印第 10 行',
        summary:
          '关闭 `sed` 默认输出后，只让第 10 行打印出来。这样既不会多读多输出，也天然满足“不足 10 行则不输出”的要求。',
        bullets: [
          '命令最短。',
          '语义最直接。',
          '非常适合作为标准答案记住。',
          '不足 10 行时也不会报错。',
        ],
        code: `sed -n '10p' file.txt`,
      },
      {
        id: 'tenth-line-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是忘了 `-n` 导致 `sed` 把所有行都打印出来，或者把第 10 行理解成数组下标 9，从而写出多余步骤。',
        bullets: [
          '易错点 1：忘记关闭默认输出。',
          '易错点 2：错误理解行号从 0 开始。',
          '易错点 3：用过度复杂的命令组合。',
          '延伸方向：按范围取行、日志切片、Shell 文本定位。',
        ],
      },
    ],
  },
  {
    id: 'delete-duplicate-emails',
    label: '196. LeetCode 196. 删除重复的电子邮箱',
    difficulty: '简单',
    description:
      '这题是在练 SQL 去重删除。真正关键不是先查出重复项，而是明确“保留哪一条、删除哪一条”的规则，再把这个规则写成自连接删除条件。',
    outcome:
      '你能掌握删除重复记录的基本思路，理解为什么通常保留 `id` 更小的那条，以及如何用自连接安全地删除重复邮箱。',
    sections: [
      {
        id: 'delete-duplicate-emails-summary',
        title: '题目在问什么',
        summary:
          '给定 `Person` 表，删除所有重复邮箱，只保留每个邮箱中 `id` 最小的那一条记录。',
        bullets: [
          '重复依据是 `email` 字段。',
          '每组重复里只留一条。',
          '保留规则是 `id` 最小。',
          '本质是去重删除。',
        ],
      },
      {
        id: 'delete-duplicate-emails-keep-rule',
        title: '先把保留规则说清：为什么要保留 `id` 更小的记录',
        summary:
          '题目没有让你随便保留一条，而是明确要求保留最早那条记录。通常用 `id` 作为唯一标识，因此只删除同邮箱里 `id` 更大的记录，逻辑最稳定。',
        bullets: [
          '保留规则必须唯一明确。',
          '`id` 更小通常表示更早插入。',
          '删除时只删“后来的重复项”。',
          '先定规则再写 SQL，思路才不会乱。',
        ],
      },
      {
        id: 'delete-duplicate-emails-self-join',
        title: '最经典的做法，是同一张表自连接后删右侧更大的 `id`',
        summary:
          '把 `Person` 表当成两份数据 `p1` 和 `p2` 来看。当两者邮箱相同且 `p1.id < p2.id` 时，说明 `p2` 是应该被删除的重复项。这样就能准确锁定待删记录。',
        bullets: [
          '自连接用来比较同组记录。',
          '相同邮箱表示属于同一去重组。',
          '`p1.id < p2.id` 用来识别后续重复项。',
          '这是非常高频的 SQL 去重套路。',
        ],
      },
      {
        id: 'delete-duplicate-emails-delete',
        title: '删除语句的本质，是把“应删除集合”直接写出来',
        summary:
          'SQL 删除题常见误区，是先想着遍历删除。其实关系型数据库不讲循环删除，而是先定义一个满足条件的记录集合，再让 `DELETE` 一次性移除它们。',
        bullets: [
          'SQL 更强调集合操作。',
          '先描述目标集合，再执行删除。',
          '不要用过程式思维硬套。',
          '这是从写代码转向写查询的关键。',
        ],
        callout:
          '很多 SQL 题一旦涉及删除、更新，你就要先问自己一句：我到底要保留谁、删除谁。这个边界一旦清楚，语句会很快收敛。',
      },
      {
        id: 'delete-duplicate-emails-solution',
        title: '标准解法：自连接删除较大的 `id`',
        summary:
          '将 `Person` 表自连接，当两条记录邮箱相同且左侧 `id` 更小时，删除右侧记录。这样每组邮箱只会留下最小 `id` 对应的那条。',
        bullets: [
          '写法简洁。',
          '逻辑直观。',
          '非常适合作为去重删除模板。',
          '面试中出现频率很高。',
        ],
        code: `DELETE p2
FROM Person AS p1
JOIN Person AS p2
  ON p1.email = p2.email
 AND p1.id < p2.id;`,
      },
      {
        id: 'delete-duplicate-emails-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是连接条件写反导致把最小 `id` 删掉，或者只会 `SELECT` 出重复邮箱，却不会把删除规则准确转成 `DELETE`。',
        bullets: [
          '易错点 1：`id` 比较方向写反。',
          '易错点 2：只找重复，不会删除。',
          '易错点 3：忽略同邮箱多条记录的情况。',
          '延伸方向：去重保留最新记录、窗口函数去重、批量清洗数据。',
        ],
      },
    ],
  },
  {
    id: 'rising-temperature',
    label: '197. LeetCode 197. 上升的温度',
    difficulty: '简单',
    description:
      '这题是在练 SQL 的行间比较。真正关键不是只会筛选大于某个阈值，而是能把“今天”和“昨天”两条记录正确关联起来，再比较温度变化。',
    outcome:
      '你能掌握用自连接比较相邻日期的方法，理解为什么日期差值必须恰好是 1 天，并能写出标准的“与前一天比较”查询。',
    sections: [
      {
        id: 'rising-temperature-summary',
        title: '题目在问什么',
        summary: '给定天气表 `Weather`，找出所有温度比前一天更高的记录 `id`。',
        bullets: [
          '比较对象是前一天，不是任意更早日期。',
          '输出的是当天记录的 `id`。',
          '核心是相邻日期关联。',
          '本质是行间比较查询。',
        ],
      },
      {
        id: 'rising-temperature-self-join',
        title: '先把“今天”和“昨天”配成一对，再谈温度比较',
        summary:
          '单条记录里没有“前一天温度”字段，所以必须把表自连接成两份：一份表示今天，一份表示昨天。先建立配对关系，后面的比较才有意义。',
        bullets: [
          '自连接负责制造比较上下文。',
          '一份表代表今天，一份表代表昨天。',
          '没有配对就没法做前后比较。',
          '这是 SQL 相邻记录题的标准思路。',
        ],
      },
      {
        id: 'rising-temperature-date-diff',
        title: '日期条件必须严格限制为相差 1 天',
        summary:
          '题目问的是前一天，而不是更早的某一天。所以连接条件不能只写“日期更小”，而要明确要求日期差恰好为 1 天，这样才能避免把隔天、隔周的数据误连到一起。',
        bullets: [
          '相差 1 天是关键约束。',
          '不能用模糊的大小比较代替。',
          '日期函数通常是解题重点。',
          '边界定义越清晰，查询越稳定。',
        ],
      },
      {
        id: 'rising-temperature-compare',
        title: '在日期配对正确之后，温度比较就非常直接',
        summary:
          '一旦把今天和昨天配对完成，只需要判断今天温度是否大于昨天温度。如果成立，返回今天这一行的 `id` 即可，逻辑非常清楚。',
        bullets: [
          '先配对，后比较。',
          '返回的是今天这条记录。',
          '比较条件本身并不复杂。',
          '真正难点在连接条件的准确性。',
        ],
        callout:
          'SQL 里很多“同比、环比、与上一条比较”题，核心难点都不在比较本身，而在于你是否把“哪两条记录应该放在一起比较”定义准确了。',
      },
      {
        id: 'rising-temperature-solution',
        title: '标准解法：自连接相邻日期后筛选升温记录',
        summary:
          '将 `Weather` 表自连接，要求今天日期比昨天日期正好多 1 天，然后筛选今天温度更高的记录，返回今天这条记录的 `id`。',
        bullets: [
          '写法短小。',
          '语义直接。',
          '非常适合作为相邻比较模板。',
          '在面试和笔试中都很常见。',
        ],
        code: `SELECT w1.id
FROM Weather AS w1
JOIN Weather AS w2
  ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;`,
      },
      {
        id: 'rising-temperature-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把前一天写成任意更早日期，或者把 `DATEDIFF` 的参数顺序写反，导致结果方向完全颠倒。',
        bullets: [
          '易错点 1：没限制成恰好前一天。',
          '易错点 2：日期差方向写反。',
          '易错点 3：返回了昨天的 `id` 而不是今天的。',
          '延伸方向：环比统计、窗口函数 `LAG`、连续日期分析。',
        ],
      },
    ],
  },
  {
    id: 'house-robber',
    label: '198. LeetCode 198. 打家劫舍',
    difficulty: '中等',
    description:
      '这题是在练动态规划里的状态选择。真正关键不是枚举偷哪几家，而是识别“到当前位置为止的最大收益”只依赖前两间房的状态。',
    outcome:
      '你能掌握线性 DP 的基本建模方式，理解“偷当前房”与“不偷当前房”的取舍关系，并能写出空间优化后的标准解法。',
    sections: [
      {
        id: 'house-robber-summary',
        title: '题目在问什么',
        summary:
          '给定一排房屋，每间房都有金额，相邻房屋不能同时偷，求在不触发警报的前提下能偷到的最大金额。',
        bullets: [
          '相邻位置不能同时选。',
          '目标是最大总收益。',
          '本质是序列选择问题。',
          '非常典型的线性 DP 入门题。',
        ],
      },
      {
        id: 'house-robber-choice',
        title: '每到一间房，只有两个选择：偷它，或者跳过它',
        summary:
          '如果偷当前房，就不能偷前一间，所以收益是“前两间的最优值 + 当前金额”；如果不偷当前房，收益就是前一间的最优值。当前位置的答案，就是这两种选择中的较大值。',
        bullets: [
          '偷当前房会排斥前一间。',
          '不偷则沿用前一状态。',
          '当前位置只需要比较两个结果。',
          '这是状态转移的核心。',
        ],
      },
      {
        id: 'house-robber-dp',
        title: '状态定义最自然的方式，是 `dp[i]` 表示前 `i` 间房的最优解',
        summary:
          '当状态定义成“处理到当前位置为止的最大收益”时，转移关系会非常自然：`dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])`。这类定义方式在线性 DP 中非常通用。',
        bullets: [
          '状态含义要覆盖前缀最优解。',
          '转移只依赖前两个位置。',
          '是非常经典的序列 DP 模型。',
          '理解状态定义比背公式更重要。',
        ],
      },
      {
        id: 'house-robber-optimize',
        title: '因为只依赖前两个状态，所以可以把数组压缩成两个变量',
        summary:
          '既然 `dp[i]` 只会用到 `dp[i - 1]` 和 `dp[i - 2]`，就没必要保留整个数组。用两个变量滚动维护这两个状态，就能把空间复杂度降到 `O(1)`。',
        bullets: [
          '空间优化来自依赖范围固定。',
          '滚动变量是线性 DP 高频技巧。',
          '代码更短，但要注意更新顺序。',
          '适合面试中展示优化意识。',
        ],
        callout:
          '打家劫舍真正重要的，不只是记住这一个公式，而是你能不能从“当前位置选或不选”抽象出 DP 结构。这种能力后面会反复复用。',
      },
      {
        id: 'house-robber-solution',
        title: '标准解法：滚动维护前两间房的最优收益',
        summary:
          '使用 `prevTwo` 表示前两间房的最优收益，`prevOne` 表示前一间房的最优收益。遍历每个金额时，更新当前最优值为“跳过当前房”和“偷当前房”两者的较大值。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '是最推荐的面试写法。',
          '逻辑简洁且容易解释。',
        ],
        code: `function rob(nums: number[]): number {
  let prevTwo = 0
  let prevOne = 0

  for (const money of nums) {
    const current = Math.max(prevOne, prevTwo + money)
    prevTwo = prevOne
    prevOne = current
  }

  return prevOne
}`,
      },
      {
        id: 'house-robber-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是把“偷当前房”的来源误写成 `prevOne + money`，从而违反相邻约束；或者虽然会写公式，却说不清状态的含义。',
        bullets: [
          '易错点 1：转移来源写错。',
          '易错点 2：更新滚动变量顺序混乱。',
          '易错点 3：边界为空数组时没处理清楚。',
          '延伸方向：环形打家劫舍、树形打家劫舍、线性 DP 建模。',
        ],
      },
    ],
  },
  {
    id: 'binary-tree-right-side-view',
    label: '199. LeetCode 199. 二叉树的右视图',
    difficulty: '中等',
    description:
      '这题是在练树的层序观察。真正关键不是把所有节点都按顺序记下来，而是理解“右视图”只关心每一层最右边能看到的那个节点。',
    outcome:
      '你能掌握按层遍历二叉树的标准写法，理解为什么每层最后一个节点就是右视图结果，并能区分 BFS 与 DFS 两种解题思路。',
    sections: [
      {
        id: 'binary-tree-right-side-view-summary',
        title: '题目在问什么',
        summary:
          '给定一棵二叉树，站在它的右侧，从上到下返回每一层能看到的节点值。',
        bullets: [
          '每层只保留一个值。',
          '保留的是右侧可见节点。',
          '结果按从上到下输出。',
          '本质是分层观察问题。',
        ],
      },
      {
        id: 'binary-tree-right-side-view-level',
        title: '最自然的思路，是先把树按层拆开',
        summary:
          '右视图的定义本身就依赖“层”这个概念，所以最自然的做法是使用层序遍历。每处理完一层，就能明确知道这一层有哪些节点、最右边的是哪一个。',
        bullets: [
          '层序遍历天然匹配题意。',
          '每层边界清晰。',
          '便于直接取最右节点。',
          '是最容易讲清楚的方案。',
        ],
      },
      {
        id: 'binary-tree-right-side-view-last-node',
        title: '为什么每层最后出队的节点就是右视图节点',
        summary:
          '在标准 BFS 中，队列会按从左到右的顺序处理当前层节点。因此每层最后一个被处理到的节点，就是站在右侧时能看到的那个节点，直接收集即可。',
        bullets: [
          '关键在于每层的处理顺序。',
          '最后一个节点对应最右位置。',
          '不需要真的“模拟视角”。',
          '题目本质是层末元素提取。',
        ],
      },
      {
        id: 'binary-tree-right-side-view-dfs',
        title: 'DFS 也能做，但要优先走右子树并记录首次到达的深度',
        summary:
          '如果用 DFS，可以先访问右子树，再访问左子树。这样每个深度第一次遇到的节点，就是这一层最右边能看到的节点。不过相比 BFS，解释成本会更高一些。',
        bullets: [
          'DFS 更依赖遍历顺序设计。',
          '首次到达某深度就是答案。',
          '右先左后是关键。',
          '适合展示遍历思维灵活性。',
        ],
        callout:
          '树题很多时候不止一种解法。真正拉开差距的，不是你知道多少种，而是你能不能解释清楚为什么这道题“按层取最后一个”正好对应右视图。',
      },
      {
        id: 'binary-tree-right-side-view-solution',
        title: '标准解法：层序遍历，记录每层最后一个节点',
        summary:
          '使用队列做 BFS。每次先记录当前层节点数量，然后依次弹出这一层的所有节点；当遍历到本层最后一个节点时，把它的值加入答案数组。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(n)`。',
          '思路直接，代码稳定。',
          '是面试中最推荐的写法。',
        ],
        code: `function rightSideView(root: TreeNode | null): number[] {
  if (root === null) {
    return []
  }

  const result: number[] = []
  const queue: TreeNode[] = [root]

  while (queue.length > 0) {
    const size = queue.length

    for (let index = 0; index < size; index += 1) {
      const node = queue.shift()!

      if (index === size - 1) {
        result.push(node.val)
      }

      if (node.left !== null) {
        queue.push(node.left)
      }

      if (node.right !== null) {
        queue.push(node.right)
      }
    }
  }

  return result
}`,
      },
      {
        id: 'binary-tree-right-side-view-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有区分层边界，导致拿到的只是整棵树最后一个节点；或者 DFS 时先走左子树，结果把左视图误当成右视图。',
        bullets: [
          '易错点 1：没按层处理队列。',
          '易错点 2：取成每层第一个而不是最后一个。',
          '易错点 3：DFS 顺序写反。',
          '延伸方向：左视图、层序遍历、树的按层统计题。',
        ],
      },
    ],
  },
  {
    id: 'number-of-islands',
    label: '200. LeetCode 200. 岛屿数量',
    difficulty: '中等',
    description:
      '这题是在练网格搜索里的连通块统计。真正关键不是看到一个陆地就加一，而是每次发现新岛屿后，要把和它连通的整片陆地一次性标记掉。',
    outcome:
      '你能掌握二维网格 DFS/BFS 的基本模板，理解为什么答案等于连通块个数，并能写出标准的岛屿计数解法。',
    sections: [
      {
        id: 'number-of-islands-summary',
        title: '题目在问什么',
        summary:
          '给定由 `1` 和 `0` 组成的二维网格，`1` 表示陆地，`0` 表示水域，求网格中岛屿的数量。',
        bullets: [
          '上下左右相连的陆地属于同一岛屿。',
          '对角线不算连通。',
          '目标是统计岛屿个数。',
          '本质是二维连通块计数。',
        ],
      },
      {
        id: 'number-of-islands-component',
        title: '答案不是“陆地格子数”，而是“陆地连通块数”',
        summary:
          '很多人一开始会盯着有多少个 `1`，但题目真正问的是有多少片彼此连通的陆地。也就是说，每遇到一个还没访问过的陆地，就代表发现了一整片新的连通块。',
        bullets: [
          '连通块是核心概念。',
          '每片岛屿只应计数一次。',
          '不能按单个格子累加答案。',
          '这是 DFS/BFS 网格题的基本抽象。',
        ],
      },
      {
        id: 'number-of-islands-flood-fill',
        title: '发现新岛屿后，要立刻把整片陆地“淹没”或标记掉',
        summary:
          '当你在扫描中遇到一个新陆地时，答案应该先加 1，然后立刻用 DFS 或 BFS 把与它相连的所有陆地全部访问并标记，避免后续再次重复计数。',
        bullets: [
          '先计数，再扩散标记。',
          '标记的目的就是去重。',
          '这一步通常叫 flood fill。',
          '是岛屿系列题的标准动作。',
        ],
      },
      {
        id: 'number-of-islands-grid-dfs',
        title: 'DFS 模板本质上就是四个方向持续扩展',
        summary:
          '从当前陆地出发，沿着上、下、左、右四个方向递归扩展。只要越界、遇到水域或访问过的格子，就停止；否则继续向外搜索，直到整片岛屿都被覆盖。',
        bullets: [
          '四方向是固定模板。',
          '越界和水域是递归终止条件。',
          '访问标记必须及时做。',
          '这类模板后面会大量复用。',
        ],
        callout:
          '网格题常常看起来不同，但一旦你能把题目翻译成“从某个起点出发把一整片连通区域走完”，DFS/BFS 模板就会非常稳定。',
      },
      {
        id: 'number-of-islands-solution',
        title: '标准解法：遍历网格，遇到新陆地就 DFS 清空整片岛屿',
        summary:
          '逐格扫描网格。当发现一个值为 `1` 的位置时，先让答案加 1，再启动 DFS 把这片岛屿所有相连陆地标记为已访问。最终答案就是触发 DFS 的次数。',
        bullets: [
          '时间复杂度是 `O(mn)`。',
          '每个格子最多访问一次。',
          'DFS/BFS 都可以实现。',
          '是图搜索入门高频题。',
        ],
        code: `function numIslands(grid: string[][]): number {
  const rows = grid.length
  const columns = grid[0].length
  let count = 0

  const dfs = (row: number, column: number) => {
    if (
      row < 0 ||
      row >= rows ||
      column < 0 ||
      column >= columns ||
      grid[row][column] !== '1'
    ) {
      return
    }

    grid[row][column] = '0'
    dfs(row + 1, column)
    dfs(row - 1, column)
    dfs(row, column + 1)
    dfs(row, column - 1)
  }

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      if (grid[row][column] === '1') {
        count += 1
        dfs(row, column)
      }
    }
  }

  return count
}`,
      },
      {
        id: 'number-of-islands-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是发现陆地后只把当前格子标记掉，却没把整片岛屿走完，导致同一片陆地被重复计数。',
        bullets: [
          '易错点 1：没有完整标记整片岛屿。',
          '易错点 2：把对角线误算为连通。',
          '易错点 3：递归前后忘了做访问标记。',
          '延伸方向：最大岛屿面积、封闭岛屿、网格 BFS/DFS 模板。',
        ],
      },
    ],
  },
  {
    id: 'bitwise-and-of-numbers-range',
    label: '201. LeetCode 201. 数字范围按位与',
    difficulty: '中等',
    description:
      '这题是在练位运算里的公共前缀。真正关键不是把区间内所有数字都真的算一遍，而是意识到只要某一位在区间中发生过 0 和 1 的切换，这一位结果一定变成 0。',
    outcome:
      '你能掌握区间按位与的本质规律，理解为什么答案等于左右端点的公共二进制前缀，并能写出高效的位移解法。',
    sections: [
      {
        id: 'bitwise-and-of-numbers-range-summary',
        title: '题目在问什么',
        summary:
          '给定两个整数 `left` 和 `right`，返回区间 `[left, right]` 内所有数字按位与的结果。',
        bullets: [
          '区间包含左右端点。',
          '不是只与两个端点相与。',
          '目标是整体区间结果。',
          '本质是位模式收缩问题。',
        ],
      },
      {
        id: 'bitwise-and-of-numbers-range-common-prefix',
        title: '区间按位与最后只会保留左右端点的公共高位前缀',
        summary:
          '只要区间跨度足够覆盖某一位的变化，那么这位一定既出现过 0 又出现过 1，按位与后就只能是 0。最终还能保留下来的，只可能是左端点和右端点完全相同的那段高位前缀。',
        bullets: [
          '变化过的位一定归零。',
          '只有稳定不变的高位能保留。',
          '公共前缀是这题的核心抽象。',
          '理解这点后就不需要枚举区间。',
        ],
      },
      {
        id: 'bitwise-and-of-numbers-range-shift',
        title: '最常见的做法，是不断右移直到左右端点相等',
        summary:
          '当 `left` 和 `right` 不相等时，说明至少在某一位上存在变化。不断同时右移两者，相当于不断剥掉那些不稳定的低位。直到两者相等时，剩下的就是公共前缀。',
        bullets: [
          '右移是在剥离不稳定低位。',
          '相等时说明只剩公共前缀。',
          '需要记录总共右移了多少次。',
          '最后再左移还原位置。',
        ],
      },
      {
        id: 'bitwise-and-of-numbers-range-why',
        title: '为什么这种位移法等价于求公共前缀',
        summary:
          '二进制右移本质上是在丢掉最低位。只要 `left` 和 `right` 还不同，就说明当前保留下来的前缀还没完全重合；一旦相等，说明剩余部分已经是两者共享的最高位结构。',
        bullets: [
          '位移法本质是前缀对齐。',
          '不相等就继续删低位。',
          '相等时即可停止。',
          '这是区间位运算的典型思路。',
        ],
        callout:
          '位运算题经常看起来很“算术”，但真正高效的解法往往不是算，而是观察二进制结构有没有稳定规律。这题就是公共前缀模型的代表。',
      },
      {
        id: 'bitwise-and-of-numbers-range-solution',
        title: '标准解法：同步右移求公共前缀，再左移恢复',
        summary:
          '初始化位移次数为 0。只要 `left` 不等于 `right`，就让它们同时右移一位并增加计数。循环结束后，把相等的结果左移回原位，得到最终答案。',
        bullets: [
          '时间复杂度是 `O(log n)`。',
          '空间复杂度是 `O(1)`。',
          '代码短而且非常稳定。',
          '是最推荐的标准解法。',
        ],
        code: `function rangeBitwiseAnd(left: number, right: number): number {
  let shifts = 0

  while (left !== right) {
    left >>= 1
    right >>= 1
    shifts += 1
  }

  return left << shifts
}`,
      },
      {
        id: 'bitwise-and-of-numbers-range-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是真的从 `left` 枚举到 `right` 做按位与，导致复杂度失控；或者虽然听说过公共前缀，但解释不清楚为什么变化位一定归零。',
        bullets: [
          '易错点 1：暴力枚举整个区间。',
          '易错点 2：没记录位移次数。',
          '易错点 3：公共前缀原理理解不透。',
          '延伸方向：位前缀、区间异或、二进制结构观察题。',
        ],
      },
    ],
  },
  {
    id: 'happy-number',
    label: '202. LeetCode 202. 快乐数',
    difficulty: '简单',
    description:
      '这题是在练数字过程中的循环检测。真正关键不是机械地重复平方求和，而是意识到这个过程要么到达 1，要么进入循环，所以本质上是判环问题。',
    outcome:
      '你能掌握快乐数的转换过程，理解为什么需要检测循环，并能使用哈希集合或快慢指针写出标准解法。',
    sections: [
      {
        id: 'happy-number-summary',
        title: '题目在问什么',
        summary:
          '给定一个正整数，不断把它替换成各位数字平方和；如果最终能变成 1，就返回 `true`，否则返回 `false`。',
        bullets: [
          '过程是反复迭代转换。',
          '终点如果是 1 就成功。',
          '否则会陷入某个循环。',
          '本质是状态转移加判环。',
        ],
      },
      {
        id: 'happy-number-transform',
        title: '先把单步转换函数拆清楚：一个数如何变成下一状态',
        summary:
          '每一轮都要把数字拆成十进制的每一位，然后把这些位分别平方再求和。这个“下一状态函数”是整道题的基础，必须先写稳定。',
        bullets: [
          '需要逐位取模和整除。',
          '每位都要做平方。',
          '最后把平方结果累加。',
          '这是整个迭代过程的核心函数。',
        ],
      },
      {
        id: 'happy-number-cycle',
        title: '为什么一定要判环：因为不是到 1，就是回到以前见过的状态',
        summary:
          '每次转换后得到的新数字是确定的，所以一旦某个状态重复出现，后面的过程就会永远重复下去，不可能再到达 1。因此只要检测到重复状态，就能判断它不是快乐数。',
        bullets: [
          '状态转移是确定性的。',
          '重复状态意味着进入循环。',
          '判环后就能提前停止。',
          '这是题目的真正难点。',
        ],
      },
      {
        id: 'happy-number-set',
        title: '最直观的做法，是用哈希集合记录已经出现过的数',
        summary:
          '每生成一个新状态，就先检查它是否已经出现过。如果出现过，说明进入循环，直接返回 `false`；如果最终变成 1，则返回 `true`。这是最好理解、最好解释的方案。',
        bullets: [
          '哈希集合实现最直观。',
          '逻辑清晰，调试简单。',
          '适合作为第一标准答案。',
          '快慢指针是进阶优化方向。',
        ],
        callout:
          '快乐数看起来像数论题，实际上更接近“有限状态上的判环”。能看出这一层，比背结论本身更重要。',
      },
      {
        id: 'happy-number-solution',
        title: '标准解法：集合判重，检测是否进入循环',
        summary:
          '定义一个函数计算各位平方和，然后不断迭代更新当前数字。每次更新前检查是否已经出现过；出现过就说明进入循环，若最终变成 1 则说明是快乐数。',
        bullets: [
          '时间复杂度取决于状态收敛速度。',
          '空间复杂度是 `O(k)`，`k` 为访问过的状态数。',
          '写法稳定且容易讲清。',
          '非常适合作为标准入门方案。',
        ],
        code: `function isHappy(n: number): boolean {
  const visited = new Set<number>()

  const getNext = (value: number): number => {
    let sum = 0

    while (value > 0) {
      const digit = value % 10
      sum += digit * digit
      value = Math.floor(value / 10)
    }

    return sum
  }

  while (n !== 1 && !visited.has(n)) {
    visited.add(n)
    n = getNext(n)
  }

  return n === 1
}`,
      },
      {
        id: 'happy-number-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是只会一直循环算下去却没有判环，或者把数字拆位过程写错，导致得到的根本不是正确的下一状态。',
        bullets: [
          '易错点 1：没有做循环检测。',
          '易错点 2：拆位时整除和取模写错。',
          '易错点 3：误以为所有数最终都会到 1。',
          '延伸方向：快慢指针判环、数字转换过程、有限状态问题。',
        ],
      },
    ],
  },
  {
    id: 'remove-linked-list-elements',
    label: '203. LeetCode 203. 移除链表元素',
    difficulty: '简单',
    description:
      '这题是在练链表删除里的指针衔接。真正关键不是找到某个节点就删，而是稳定处理“头节点也可能被删”的情况，并始终维护前驱和当前节点的关系。',
    outcome:
      '你能掌握链表删除的标准模板，理解为什么虚拟头节点能统一边界情况，并能写出稳定的遍历删除解法。',
    sections: [
      {
        id: 'remove-linked-list-elements-summary',
        title: '题目在问什么',
        summary:
          '给定一个链表头节点和目标值 `val`，删除链表中所有值等于 `val` 的节点，并返回新的头节点。',
        bullets: [
          '删除条件是节点值等于 `val`。',
          '可能删除多个节点。',
          '头节点本身也可能被删掉。',
          '本质是链表指针重连。',
        ],
      },
      {
        id: 'remove-linked-list-elements-dummy',
        title: '虚拟头节点能把“删头节点”和“删中间节点”统一起来',
        summary:
          '如果直接从原头节点开始处理，那么一旦头节点要删，逻辑就会变复杂。加一个虚拟头节点后，不管删的是原头节点还是中间节点，本质都变成“让前驱跳过当前节点”。',
        bullets: [
          '虚拟头节点是链表删除高频技巧。',
          '它能统一各种边界情况。',
          '避免专门为头节点写分支。',
          '让代码明显更稳定。',
        ],
      },
      {
        id: 'remove-linked-list-elements-pointer',
        title: '遍历时真正需要维护的，是“前驱的 next 应该指向谁”',
        summary:
          '当当前节点值等于目标值时，不能简单地把当前指针后移，而应该修改前驱节点的 `next`，让它直接跳过当前节点。只有值不等于目标时，前驱才真正向前推进。',
        bullets: [
          '删除操作发生在前驱的 `next` 上。',
          '删除时前驱通常不前进。',
          '保留节点时前驱才同步前进。',
          '这是链表删除模板的核心细节。',
        ],
      },
      {
        id: 'remove-linked-list-elements-why',
        title: '为什么删除时前驱不能一起前进',
        summary:
          '如果当前节点被删掉，而前驱也跟着前进，就可能跳过后面连续多个待删节点。正确做法是删除后让前驱停在原地，继续检查新的 `next` 是否还需要删除。',
        bullets: [
          '连续删除场景最能暴露这个问题。',
          '删除后前驱位置应保持不变。',
          '继续检查新的后继节点。',
          '这是初学者最容易错的点。',
        ],
        callout:
          '链表题经常让人觉得“指针很绕”，其实关键就一句话：你到底在改谁的 `next`。一旦这个问题想清楚，很多删除题都会变得规律。',
      },
      {
        id: 'remove-linked-list-elements-solution',
        title: '标准解法：虚拟头节点加单指针遍历删除',
        summary:
          '创建虚拟头节点指向原链表，然后用一个指针遍历前驱节点。如果前驱的下一个节点值等于目标值，就让前驱跳过它；否则前驱向前移动。最后返回虚拟头节点的下一个节点。',
        bullets: [
          '时间复杂度是 `O(n)`。',
          '空间复杂度是 `O(1)`。',
          '是最推荐的标准模板。',
          '适合延伸到更多链表删除题。',
        ],
        code: `function removeElements(
  head: ListNode | null,
  val: number,
): ListNode | null {
  const dummy = new ListNode(0, head)
  let current = dummy

  while (current.next !== null) {
    if (current.next.val === val) {
      current.next = current.next.next
    } else {
      current = current.next
    }
  }

  return dummy.next
}`,
      },
      {
        id: 'remove-linked-list-elements-mistakes',
        title: '易错点和延伸方向',
        summary:
          '这题最常见的问题，是没有用虚拟头节点导致删头节点很乱，或者删除后错误地同时移动前驱，结果漏删连续重复值。',
        bullets: [
          '易错点 1：没处理头节点删除。',
          '易错点 2：删除后前驱错误前进。',
          '易错点 3：直接操作当前节点而不是前驱关系。',
          '延伸方向：删除倒数第 N 个节点、去重链表、链表反转题。',
        ],
      },
    ],
  },
];
