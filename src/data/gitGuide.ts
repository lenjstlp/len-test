export type GitGuideSection = {
  id: string;
  title: string;
  summary: string;
  bullets?: string[];
  code?: string;
  callout?: string;
};

export type GitGuideChapter = {
  id: string;
  label: string;
  description: string;
  outcome: string;
  sections: GitGuideSection[];
};

export const gitGuideChapters: GitGuideChapter[] = [
  {
    id: 'git-foundation',
    label: '1. Git 基础与仓库初始化',
    description:
      '先把 Git 的基础动作吃透：初始化仓库、查看状态、暂存、提交。你不需要一上来学很多命令，但必须理解工作区、暂存区和提交记录的关系。',
    outcome:
      '你能独立初始化一个仓库，知道改动现在停留在哪一层，并完成最基本的 add / commit 工作流。',
    sections: [
      {
        id: 'git-three-areas',
        title: '先理解三层结构：工作区、暂存区、提交历史',
        summary:
          'Git 最容易让人混乱的地方不是命令，而是不知道文件当前处于哪一层。理解这三层之后，很多命令会自然清晰。',
        bullets: [
          '工作区：你正在修改的实际文件。',
          '暂存区：准备进入下一次提交的改动集合。',
          '提交历史：已经写进 Git 记录里的版本快照。',
          '很多命令其实只是“把改动从一层移动到另一层”。',
        ],
        callout:
          '如果你总感觉 Git 很乱，通常不是命令背不下来，而是没有先判断：我的改动现在在工作区、暂存区，还是已经提交了。',
      },
      {
        id: 'git-init-status',
        title: '初始化仓库与查看状态',
        summary:
          '任何项目第一次接入 Git，至少要完成初始化、配置 `.gitignore`，并能随时用状态命令确认当前局面。',
        bullets: [
          '`git init` 用于在当前目录创建 Git 仓库。',
          '`git status` 是最常用的安全命令，能告诉你哪些文件被改过、哪些已暂存。',
          '`git status --short` 适合快速浏览，大项目里更高效。',
        ],
        code: `git init\ngit status\ngit status --short`,
      },
      {
        id: 'git-add-commit',
        title: '暂存与提交的基础命令',
        summary:
          '最常见的工作流就是：改文件、看状态、暂存、提交。虽然简单，但这一步如果不稳，后面分支和回退都会混乱。',
        bullets: [
          '`git add <file>` 暂存指定文件。',
          '`git add .` 暂存当前目录下所有改动。',
          '`git commit -m "message"` 创建一次提交。',
          '建议提交信息写成“动词 + 目的”，便于以后回看。',
        ],
        code: `git add src/main.ts\ngit add .\ngit commit -m "feat: 新增登录页骨架"`,
      },
      {
        id: 'git-log-diff',
        title: '查看历史和对比改动',
        summary:
          '不会看历史的人，Git 只能当提交工具；会看历史的人，Git 才真正变成调试和追踪工具。',
        bullets: [
          '`git log --oneline` 快速查看提交历史。',
          '`git diff` 查看工作区和暂存区之间的差异。',
          '`git diff --cached` 查看已经暂存但尚未提交的内容。',
        ],
        code: `git log --oneline\ngit diff\ngit diff --cached`,
      },
    ],
  },
  {
    id: 'git-branching',
    label: '2. 分支协作与合并',
    description:
      '分支是 Git 最重要的协作能力。这里重点讲的是：为什么要开分支、怎么切分支、怎么合并，以及什么时候用 merge，什么时候用 rebase。',
    outcome:
      '你能独立开分支开发、切换分支、把功能分支合回主线，并理解 merge 和 rebase 的使用区别。',
    sections: [
      {
        id: 'git-branch-basic',
        title: '查看、创建和切换分支',
        summary:
          '不要直接在主分支上做所有开发。只要是一个相对独立的需求，都应该有自己的分支。',
        bullets: [
          '`git branch` 查看本地分支。',
          '`git branch <name>` 创建新分支。',
          '`git switch <name>` 或 `git checkout <name>` 切换分支。',
          '`git switch -c <name>` 可以创建并切换到新分支。',
        ],
        code: `git branch\ngit switch -c feat/user-profile\ngit switch master`,
      },
      {
        id: 'git-merge',
        title: '把功能分支合回主线',
        summary:
          '功能开发完成后，最基本的做法是切回主分支，再执行 merge，把功能分支的提交合进去。',
        bullets: [
          '先切回目标分支，例如 `master` 或 `main`。',
          '再执行 `git merge <branch>`。',
          '如果没有冲突，会自动生成新的合并结果。',
          '如果有冲突，先解决文件冲突，再 add 和 commit。',
        ],
        code: `git switch master\ngit merge feat/user-profile`,
      },
      {
        id: 'git-rebase',
        title: 'rebase 是什么，什么时候用',
        summary:
          'rebase 的作用是“把你的提交重新接到另一条分支后面”，它能让历史更线性，但不适合随便改写已经共享给别人的公共历史。',
        bullets: [
          '`git rebase master` 常用于让功能分支追上主分支最新进度。',
          'rebase 后提交 hash 会变化，所以不要随意对公共分支做 rebase。',
          '本地整理自己尚未推送的提交时，rebase 很有价值。',
        ],
        code: `git switch feat/user-profile\ngit rebase master`,
        callout:
          '一句话判断：merge 更安全直观，rebase 更线性整洁。团队没有明确规范时，公共分支优先保守使用 merge。',
      },
      {
        id: 'git-delete-branch',
        title: '清理已完成分支',
        summary:
          '需求合并完成后，及时删除分支可以让仓库保持清爽，也能减少以后误操作。',
        bullets: [
          '`git branch -d <name>` 删除已合并的本地分支。',
          '`git branch -D <name>` 强制删除本地分支。',
          '`git push origin --delete <name>` 删除远程分支。',
        ],
        code: `git branch -d feat/user-profile\ngit push origin --delete feat/user-profile`,
      },
    ],
  },
  {
    id: 'git-remote',
    label: '3. 远程仓库、推送与拉取',
    description:
      '本地会提交只是第一步。真实协作中，你还要会绑定远程、推送分支、拉取更新、处理远程分支关系。',
    outcome:
      '你能把本地仓库连接到 GitHub 或 GitLab，完成 push / pull，并理解本地分支和远程分支的对应关系。',
    sections: [
      {
        id: 'git-remote-add',
        title: '绑定远程仓库',
        summary:
          '远程仓库通常命名为 `origin`。绑定后，Git 才知道你的本地仓库要和哪个远程地址通信。',
        bullets: [
          '`git remote -v` 查看当前远程仓库。',
          '`git remote add origin <url>` 添加远程仓库。',
          '`git remote set-url origin <url>` 修改远程地址。',
        ],
        code: `git remote -v\ngit remote add origin https://github.com/user/repo.git\ngit remote set-url origin https://github.com/user/new-repo.git`,
      },
      {
        id: 'git-push-pull',
        title: '最常用的 push / pull / fetch',
        summary:
          '这三个命令经常一起出现，但职责并不一样。理解差别，才能避免把远程同步操作搞乱。',
        bullets: [
          '`git push` 把本地提交推到远程。',
          '`git pull` = `fetch + merge`，会拉取并尝试合并。',
          '`git fetch` 只更新远程信息，不动你当前工作区，风险更低。',
        ],
        code: `git push origin master\ngit pull origin master\ngit fetch origin`,
      },
      {
        id: 'git-upstream',
        title: '第一次推分支时设置 upstream',
        summary:
          '如果一个本地分支第一次推送到远程，通常要顺手设置上游分支。之后你就能直接 `git push`，不用每次写全分支名。',
        bullets: [
          '`git push -u origin <branch>` 会建立本地分支和远程分支的跟踪关系。',
          '建立后，`git branch -vv` 可以看到对应关系。',
          '这对多人协作或功能分支开发非常有用。',
        ],
        code: `git push -u origin feat/user-profile\ngit branch -vv`,
      },
      {
        id: 'git-practical-flow',
        title: '一个实用的远程协作流程',
        summary:
          '如果你是日常开发者，一个稳定流程比记很多命令更重要。下面是最常见的一套。',
        bullets: [
          '先 `git fetch origin` 看远程更新。',
          '切到自己的功能分支，`rebase` 或 `merge` 主分支最新内容。',
          '本地自测通过后 `git push origin <branch>`。',
          '再去平台发起合并请求。',
        ],
      },
    ],
  },
  {
    id: 'git-recovery',
    label: '4. 回退、撤销与排错命令',
    description:
      'Git 最容易让人慌的场景，不是提交，而是“改错了怎么办”。这一章就是把最常见的撤销、回退和恢复命令讲清楚。',
    outcome:
      '你能判断某个错误发生在哪一层，并选择合适的恢复命令，而不是遇事就乱用 reset。',
    sections: [
      {
        id: 'git-restore-reset',
        title: 'restore、reset、revert 的区别',
        summary:
          '这三个命令经常被混用，但它们根本不是一回事。先分清职责，再谈具体用法。',
        bullets: [
          '`git restore` 更适合撤销工作区文件改动。',
          '`git reset` 更像是在移动 HEAD 或暂存区指向，风险更高。',
          '`git revert` 是创建一个“反向提交”，适合公共历史。',
          '如果改动已经推到远程并被别人依赖，优先考虑 revert。',
        ],
        callout:
          '最常见的危险动作就是不分场景乱用 `git reset --hard`。它很强，但也最容易把未保存的本地工作直接抹掉。',
      },
      {
        id: 'git-restore-commands',
        title: '撤销工作区和暂存区改动',
        summary:
          '如果文件还没提交，优先看能不能用 restore 解决。它比 reset 更直观，也更不容易误伤提交历史。',
        bullets: [
          '`git restore <file>` 撤销工作区某个文件的修改。',
          '`git restore --staged <file>` 把文件从暂存区撤回来。',
          '两个一起用，可以把 add 过的文件重新退回到未暂存状态。',
        ],
        code: `git restore src/main.ts\ngit restore --staged src/main.ts`,
      },
      {
        id: 'git-reset-revert',
        title: '回退提交与安全撤销',
        summary:
          '如果提交已经产生，就要先想清楚：这是只影响本地，还是已经进入公共历史。前者可以 reset，后者更适合 revert。',
        bullets: [
          '`git reset --soft HEAD~1` 回退一次提交，但保留改动在暂存区。',
          '`git reset --mixed HEAD~1` 回退一次提交，并退回工作区。',
          '`git revert <commit>` 创建一个反向提交，不改写已有历史。',
        ],
        code: `git reset --soft HEAD~1\ngit reset --mixed HEAD~1\ngit revert 1a2b3c4d`,
      },
      {
        id: 'git-stash-reflog',
        title: 'stash 和 reflog：临时保存与找回现场',
        summary:
          '有时你不是要正式提交，只是想临时收起改动，或者找回误操作前的状态。这个时候 stash 和 reflog 非常有用。',
        bullets: [
          '`git stash` 临时保存当前工作区和暂存区改动。',
          '`git stash pop` 恢复最近一次 stash 并删除记录。',
          '`git reflog` 可以查看 HEAD 变动历史，是很多误操作后的救命命令。',
        ],
        code: `git stash\ngit stash list\ngit stash pop\ngit reflog`,
      },
      {
        id: 'git-debugging',
        title: '排错时最值得先跑的命令',
        summary:
          '当你不确定现在仓库到底怎么了，不要急着改。先用几条只读命令把现状看清楚，再决定动作。',
        bullets: [
          '`git status` 看当前改动在哪一层。',
          '`git log --oneline --graph --decorate -10` 看最近分支历史。',
          '`git diff` 和 `git diff --cached` 看差异内容。',
          '`git branch -vv` 看本地和远程跟踪关系。',
        ],
        code: `git status\ngit log --oneline --graph --decorate -10\ngit diff\ngit diff --cached\ngit branch -vv`,
      },
    ],
  },
];
