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
];
