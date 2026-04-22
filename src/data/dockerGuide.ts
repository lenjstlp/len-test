export type DockerGuideSection = {
  id: string;
  title: string;
  summary: string;
  bullets?: string[];
  code?: string;
  callout?: string;
};

export type DockerGuideChapter = {
  id: string;
  label: string;
  description: string;
  outcome: string;
  sections: DockerGuideSection[];
};

export const dockerGuideChapters: DockerGuideChapter[] = [
  {
    id: 'docker-foundation',
    label: '1. Docker 基础认知',
    description:
      '先把 Docker 的核心概念讲清楚。只有理解镜像、容器、仓库和宿主机的关系，后面命令才不会像死记硬背。',
    outcome:
      '你能说清楚 Docker 为什么有用，知道镜像和容器的区别，并具备继续学习部署流程的统一心智模型。',
    sections: [
      {
        id: 'docker-what-and-why',
        title: 'Docker 到底解决什么问题',
        summary:
          'Docker 主要解决“同一份项目在不同环境里跑不一致”的问题。它把应用运行需要的系统环境、依赖和启动方式一起打包，减少“我电脑能跑、服务器不行”的情况。',
        bullets: [
          '把应用和运行环境打包成统一交付物。',
          '让开发、测试、生产尽量使用一致的运行方式。',
          '方便快速部署、迁移、回滚和扩容。',
          '对前后端项目都适用，尤其适合多服务协作场景。',
        ],
      },
      {
        id: 'image-vs-container',
        title: '镜像和容器的区别',
        summary:
          '镜像像模板，容器像模板启动后的实例。镜像是静态产物，容器是正在运行的进程环境。',
        bullets: [
          '镜像可以理解成一个只读的打包文件。',
          '容器是镜像启动后的运行实例。',
          '同一个镜像可以启动多个容器。',
          '容器删除了，镜像仍然可以保留。',
        ],
        code: `镜像 image -> 类似安装包模板\n容器 container -> 类似运行中的程序实例\n仓库 registry -> 类似镜像存放中心`,
      },
      {
        id: 'docker-core-objects',
        title: 'Docker 最核心的 5 个对象',
        summary:
          '学 Docker 时先盯住 5 个关键词：镜像、容器、仓库、数据卷、网络。绝大多数部署问题都绕不开它们。',
        bullets: [
          'image：应用模板和依赖层。',
          'container：运行中的实例。',
          'registry：镜像仓库，如 Docker Hub、自建仓库。',
          'volume：数据持久化，不让容器一删数据就丢。',
          'network：容器之间的通信方式。',
        ],
      },
      {
        id: 'docker-workflow',
        title: '最小工作流：拉镜像、起容器、看日志、停容器',
        summary:
          '不管是前端项目还是后端服务，Docker 的基本节奏几乎都是：拿到镜像，启动容器，检查状态，观察日志，必要时停止和删除。',
        code: `docker pull nginx\ndocker run -d --name demo-nginx -p 8080:80 nginx\ndocker ps\ndocker logs demo-nginx\ndocker stop demo-nginx\ndocker rm demo-nginx`,
        callout:
          '先把最小工作流用顺，比一上来追复杂编排更重要。Docker 入门最忌讳“看过很多概念，但没亲手跑过完整闭环”。',
      },
    ],
  },
  {
    id: 'docker-common-commands',
    label: '2. 常用命令与日常操作',
    description:
      '这一章专门整理最常用的 Docker 命令。看完后你应该能独立完成镜像查看、容器管理、日志排查和资源清理。',
    outcome:
      '你能熟练使用最核心的 Docker 命令，并在日常开发和部署中快速定位容器状态。',
    sections: [
      {
        id: 'docker-image-commands',
        title: '镜像相关命令',
        summary:
          '镜像命令用于获取、查看、构建和删除镜像。镜像是部署的起点，先把这组命令吃透。',
        bullets: [
          '`docker pull <image>` 拉取镜像。',
          '`docker images` 查看本地镜像。',
          '`docker build -t <name>:<tag> .` 构建镜像。',
          '`docker rmi <image>` 删除镜像。',
        ],
        code: `docker pull node:20-alpine\ndocker images\ndocker build -t my-api:1.0.0 .\ndocker rmi my-api:1.0.0`,
      },
      {
        id: 'docker-container-commands',
        title: '容器相关命令',
        summary:
          '容器命令是最常用的一组。你至少要会启动、停止、重启、删除和查看运行状态。',
        bullets: [
          '`docker run` 启动容器。',
          '`docker ps` 查看运行中的容器。',
          '`docker ps -a` 查看所有容器。',
          '`docker stop/start/restart` 控制容器生命周期。',
          '`docker rm` 删除容器。',
        ],
        code: `docker run -d --name web -p 3000:3000 my-web:latest\ndocker ps\ndocker ps -a\ndocker restart web\ndocker stop web\ndocker rm web`,
      },
      {
        id: 'docker-logs-exec',
        title: '日志、进入容器和调试命令',
        summary:
          '部署问题很多都不是“项目没启动”，而是“项目启动了但配置错了”。这时要靠日志和进入容器检查运行现场。',
        bullets: [
          '`docker logs <container>` 看日志。',
          '`docker logs -f <container>` 持续追日志。',
          '`docker exec -it <container> sh` 进入容器内部。',
          '`docker inspect <container>` 查看详细配置。',
        ],
        code: `docker logs api\ndocker logs -f api\ndocker exec -it api sh\ndocker inspect api`,
      },
      {
        id: 'docker-cleanup',
        title: '清理命令',
        summary:
          'Docker 用久了会堆很多无用容器、镜像、网络和构建缓存。不会清理，磁盘很快就会被吃掉。',
        bullets: [
          '`docker rm` 删除容器。',
          '`docker rmi` 删除镜像。',
          '`docker system df` 查看 Docker 占用空间。',
          '`docker system prune` 清理未使用资源。',
        ],
        code: `docker system df\ndocker system prune\ndocker system prune -a`,
        callout:
          '清理命令很危险，尤其是 `prune -a`。生产环境操作前先确认是否会误删正在依赖的镜像和缓存。',
      },
    ],
  },
  {
    id: 'docker-network-volume-env',
    label: '3. 数据卷、网络与环境变量',
    description:
      '真正开始部署项目后，你很快会遇到三个问题：数据怎么持久化、服务怎么互联、配置怎么注入。这一章专门解决这三个问题。',
    outcome:
      '你能独立配置容器端口映射、数据卷挂载、网络通信和环境变量注入，避免最常见的部署坑。',
    sections: [
      {
        id: 'docker-port-mapping',
        title: '端口映射怎么理解',
        summary:
          '容器里服务监听的端口，外部默认是访问不到的。要通过 `-p` 把宿主机端口映射到容器端口。',
        bullets: [
          '`-p 8080:80` 表示访问宿主机 8080，会转到容器 80。',
          '左边是宿主机端口，右边是容器端口。',
          '前端静态站点、Node 服务、Java 服务都离不开端口映射。',
        ],
        code: `docker run -d --name nginx-web -p 8080:80 nginx`,
      },
      {
        id: 'docker-volume-basics',
        title: '为什么需要数据卷',
        summary:
          '容器本身是易失性的，删除后内部数据可能就没了。数据库文件、上传文件、日志目录这类内容不能只放在容器内部。',
        bullets: [
          'volume 能让数据独立于容器存在。',
          '即使容器重建，挂载的数据仍然保留。',
          '数据库、配置文件、构建产物缓存都常用到 volume。',
        ],
        code: `docker volume create mysql-data\ndocker run -d --name mysql \\\n  -v mysql-data:/var/lib/mysql \\\n  -e MYSQL_ROOT_PASSWORD=123456 \\\n  mysql:8`,
      },
      {
        id: 'docker-bind-mount',
        title: 'bind mount 和 volume 的区别',
        summary:
          '如果你想直接把宿主机目录映射进容器，可以用 bind mount；如果你更关心 Docker 自己管理持久化数据，通常用 volume。',
        bullets: [
          'bind mount 适合本地开发，直接挂源码目录很方便。',
          'volume 更像 Docker 官方推荐的数据持久化方式。',
          '开发阶段常挂源码，生产阶段更常挂日志目录和数据库目录。',
        ],
        code: `docker run -it --rm \\\n  -v $PWD:/app \\\n  -w /app \\\n  node:20-alpine sh`,
      },
      {
        id: 'docker-network-basics',
        title: '容器之间怎么互相访问',
        summary:
          '多个容器一起部署时，不建议靠宿主机 IP 硬连。更合理的做法是放到同一个 Docker 网络里，让它们直接通过容器名通信。',
        bullets: [
          '自定义网络中的容器可以互相通过名称访问。',
          '前端容器、后端容器、数据库容器通常会放进同一个网络。',
          'Compose 默认也会帮你创建网络。',
        ],
        code: `docker network create app-net\ndocker run -d --name api --network app-net my-api\ndocker run -d --name mysql --network app-net mysql:8`,
      },
      {
        id: 'docker-env-vars',
        title: '环境变量怎么传',
        summary:
          '前后端项目部署时经常要注入数据库地址、JWT 密钥、端口号、接口地址等配置。最常见做法是通过 `-e` 或 env 文件传入。',
        bullets: [
          '`-e KEY=value` 适合临时传少量变量。',
          '`--env-file .env.production` 适合统一管理多变量。',
          '不要把生产密钥硬编码在 Dockerfile 里。',
        ],
        code: `docker run -d --name api \\\n  -e NODE_ENV=production \\\n  -e DB_HOST=mysql \\\n  -e DB_PORT=3306 \\\n  my-api:latest`,
      },
    ],
  },
  {
    id: 'dockerfile-projects',
    label: '4. Dockerfile 与前后端项目打包',
    description:
      '这一章是实战重点。你需要学会自己写 Dockerfile，把前端、Node 后端、Java 服务等项目真正打成可部署镜像。',
    outcome:
      '你能独立为常见前后端项目编写 Dockerfile，并理解多阶段构建、工作目录、拷贝策略和启动命令。',
    sections: [
      {
        id: 'dockerfile-basics',
        title: 'Dockerfile 是什么',
        summary:
          'Dockerfile 就是一份“如何构建镜像”的说明书。里面写清楚基础镜像、工作目录、依赖安装、源码拷贝和启动命令。',
        bullets: [
          '`FROM` 指定基础镜像。',
          '`WORKDIR` 指定工作目录。',
          '`COPY` 拷贝文件。',
          '`RUN` 执行构建或安装命令。',
          '`CMD` / `ENTRYPOINT` 指定启动方式。',
        ],
        code: `FROM node:20-alpine\nWORKDIR /app\nCOPY package.json pnpm-lock.yaml ./\nRUN corepack enable && pnpm install --frozen-lockfile\nCOPY . .\nCMD ["pnpm", "start"]`,
      },
      {
        id: 'frontend-dockerfile',
        title: '前端项目怎么打镜像',
        summary:
          '前端项目通常采用“先构建静态资源，再交给 nginx 提供服务”的方式。这样镜像更轻，运行层也更稳定。',
        bullets: [
          '第一阶段用 Node 安装依赖并执行构建。',
          '第二阶段用 nginx 只接收构建产物。',
          '这是典型的多阶段构建。',
        ],
        code: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package.json pnpm-lock.yaml ./\nRUN corepack enable && pnpm install --frozen-lockfile\nCOPY . .\nRUN pnpm build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`,
      },
      {
        id: 'node-backend-dockerfile',
        title: 'Node 后端怎么打镜像',
        summary:
          'Node 服务通常需要安装依赖、编译 TypeScript，然后在生产镜像里只保留运行必要文件。这样镜像体积更小，也更安全。',
        bullets: [
          '开发依赖和生产依赖最好区分。',
          'TypeScript 项目通常先构建 `dist` 再运行。',
          '生产镜像尽量不要把测试文件和源码全带进去。',
        ],
        code: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package.json pnpm-lock.yaml ./\nRUN corepack enable && pnpm install --frozen-lockfile\nCOPY . .\nRUN pnpm build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY package.json pnpm-lock.yaml ./\nRUN corepack enable && pnpm install --prod --frozen-lockfile\nCOPY --from=builder /app/dist ./dist\nEXPOSE 3000\nCMD ["node", "dist/index.js"]`,
      },
      {
        id: 'java-backend-dockerfile',
        title: 'Java / Spring Boot 服务怎么打镜像',
        summary:
          'Java 项目部署时最常见的是先在构建阶段产出 jar 包，再在运行阶段用 JRE 启动。',
        code: `FROM maven:3.9-eclipse-temurin-17 AS builder\nWORKDIR /app\nCOPY pom.xml ./\nCOPY src ./src\nRUN mvn clean package -DskipTests\n\nFROM eclipse-temurin:17-jre\nWORKDIR /app\nCOPY --from=builder /app/target/*.jar app.jar\nEXPOSE 8080\nCMD ["java", "-jar", "app.jar"]`,
      },
      {
        id: 'dockerignore-best-practice',
        title: '别忘了 .dockerignore',
        summary:
          '很多人镜像构建慢，不是 Docker 本身慢，而是把 `node_modules`、`.git`、日志文件全塞进构建上下文了。`.dockerignore` 是必须要有的。',
        bullets: [
          '前端/Node 项目至少排除 `node_modules`、`dist`、`.git`。',
          '日志、临时文件、本地环境文件也应排除。',
          '构建上下文越干净，速度越快，镜像越稳定。',
        ],
        code: `node_modules\ndist\n.git\n.vscode\n.env.local\n*.log`,
        callout:
          '很多 Dockerfile 看起来没问题，但构建仍然慢、镜像仍然大，原因往往不是命令写错，而是上下文控制没做好。',
      },
    ],
  },
  {
    id: 'docker-compose-deploy',
    label: '5. Docker Compose 与多服务部署',
    description:
      '只会 `docker run` 还不够，真实项目往往至少包含前端、后端、数据库、Redis 或 nginx。这个时候就需要 Compose。',
    outcome:
      '你能独立编排多服务项目，知道如何用 Compose 启动、停止、重建和查看服务状态。',
    sections: [
      {
        id: 'compose-why',
        title: '为什么需要 Compose',
        summary:
          '如果每个服务都手写一长串 `docker run`，维护成本会很高。Compose 的价值就是把多服务配置集中到一份 `docker-compose.yml` 里。',
        bullets: [
          '统一管理多个容器服务。',
          '统一定义网络、卷、环境变量、端口映射。',
          '一条命令即可启动或关闭整组服务。',
        ],
      },
      {
        id: 'compose-structure',
        title: 'Compose 文件的核心结构',
        summary:
          '一个 Compose 文件最常见的几块是 `services`、`volumes`、`networks`。其中服务定义是主体。',
        code: `services:\n  web:\n    image: nginx:alpine\n    ports:\n      - "8080:80"\n\n  api:\n    build: ./server\n    ports:\n      - "3000:3000"\n    environment:\n      NODE_ENV: production`,
      },
      {
        id: 'frontend-backend-db-compose',
        title: '前端 + 后端 + MySQL 的典型编排',
        summary:
          '这是最常见的一类项目。前端容器负责静态资源，后端服务连数据库，三个服务放同一网络，用服务名互通。',
        code: `services:\n  web:\n    build: ./web\n    ports:\n      - "8080:80"\n    depends_on:\n      - api\n\n  api:\n    build: ./server\n    ports:\n      - "3000:3000"\n    environment:\n      DB_HOST: mysql\n      DB_PORT: 3306\n      DB_USER: root\n      DB_PASSWORD: 123456\n    depends_on:\n      - mysql\n\n  mysql:\n    image: mysql:8\n    environment:\n      MYSQL_ROOT_PASSWORD: 123456\n      MYSQL_DATABASE: app_db\n    volumes:\n      - mysql-data:/var/lib/mysql\n\nvolumes:\n  mysql-data:`,
        bullets: [
          '`depends_on` 只表示启动顺序，不等于服务真正可用。',
          '后端访问数据库时，主机名一般写服务名 `mysql`，不是 `localhost`。',
          '数据库数据目录应挂 volume，避免重建丢数据。',
        ],
      },
      {
        id: 'compose-common-commands',
        title: 'Compose 最常用命令',
        summary:
          'Compose 日常最常见的动作，就是启动、停止、重建、查看日志和执行命令。',
        bullets: [
          '`docker compose up -d` 后台启动服务。',
          '`docker compose down` 停止并移除服务。',
          '`docker compose ps` 查看服务状态。',
          '`docker compose logs -f` 追踪日志。',
          '`docker compose up -d --build` 修改代码或 Dockerfile 后重建。',
        ],
        code: `docker compose up -d\ndocker compose ps\ndocker compose logs -f api\ndocker compose up -d --build\ndocker compose down`,
      },
    ],
  },
  {
    id: 'docker-production-practice',
    label: '6. 生产部署与排障思路',
    description:
      '最后把 Docker 放进真实部署场景。这里重点不只是“能启动”，而是“能排错、能更新、能回滚、知道怎么部署前后端项目”。',
    outcome:
      '你能独立把常见前后端项目部署到服务器上，并在端口、配置、日志、镜像更新等问题上有清晰的排查思路。',
    sections: [
      {
        id: 'deployment-flow',
        title: '一个通用的服务器部署流程',
        summary:
          '真实部署通常遵循一个固定节奏：准备 Docker 环境、上传项目或拉仓库、构建镜像、启动服务、验证端口、看日志、配置反向代理。',
        bullets: [
          '先确认服务器已安装 Docker 和 Compose。',
          '把项目代码放到服务器，或直接从仓库拉取。',
          '执行构建和启动命令。',
          '确认容器状态、端口映射和服务可访问性。',
          '如果需要域名访问，再在 nginx / caddy 上做反向代理。',
        ],
      },
      {
        id: 'update-and-rollback',
        title: '更新、重建与回滚',
        summary:
          '项目迭代时，你最常做的不是第一次部署，而是更新版本。更新流程如果不稳，很容易把线上服务打挂。',
        bullets: [
          '更新代码后重新构建镜像。',
          '使用新镜像重建容器。',
          '旧镜像不要立刻删光，方便快速回滚。',
          '版本 tag 尽量明确，不要所有环境都只用 `latest`。',
        ],
        code: `docker build -t my-api:1.0.1 .\ndocker stop api\ndocker rm api\ndocker run -d --name api -p 3000:3000 my-api:1.0.1`,
      },
      {
        id: 'troubleshooting-checklist',
        title: '部署失败时怎么排查',
        summary:
          'Docker 问题不要瞎猜，按层次排查最稳：镜像有没有构建成功、容器有没有启动、端口有没有映射、服务日志报什么、容器之间能不能通信。',
        bullets: [
          '先看 `docker ps -a`，判断容器是否退出。',
          '再看 `docker logs`，确认应用是否启动报错。',
          '再看端口映射和防火墙设置。',
          '如果是多容器项目，确认网络和环境变量是否正确。',
          '数据库连接类问题，优先检查主机名、端口、密码和启动时序。',
        ],
      },
      {
        id: 'practical-command-cheatsheet',
        title: '一组最实用的 Docker 命令清单',
        summary:
          '你不需要记住所有冷门命令，但下面这组命令足够支撑绝大多数部署、调试和运维场景。',
        code: `# 镜像\ndocker pull <image>\ndocker build -t <name>:<tag> .\ndocker images\n\n# 容器\ndocker run -d --name <container> -p 8080:80 <image>\ndocker ps\ndocker ps -a\ndocker stop <container>\ndocker rm <container>\n\n# 调试\ndocker logs -f <container>\ndocker exec -it <container> sh\ndocker inspect <container>\n\n# 清理\ndocker system df\ndocker system prune\n\n# Compose\ndocker compose up -d\ndocker compose up -d --build\ndocker compose ps\ndocker compose logs -f\ndocker compose down`,
      },
      {
        id: 'final-docker-advice',
        title: '最后的直白建议',
        summary:
          '学 Docker 不要停留在“会跑 hello-world”。真正要练的是：能把自己的前端、Node、Java、数据库项目打包并稳定跑起来。',
        bullets: [
          '先会单服务，再做多服务。',
          '先会部署，再学优化镜像体积。',
          '先会看日志和排错，再追更复杂编排平台。',
          '把常用命令真正用熟，比看十篇泛泛教程更有价值。',
        ],
        callout:
          '如果你能独立写 Dockerfile、会用 Compose 编排前后端和数据库、能看日志排查问题，那你已经具备独立使用 Docker 部署常见项目的能力了。',
      },
    ],
  },
];
