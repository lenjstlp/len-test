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
];
