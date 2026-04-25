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
];
