/**
 * 站点所有文案与占位数据集中在这里。
 * 替换真实信息时，只需要改这个文件（以及 README 里的占位符清单）。
 */

export type Tone = 'text' | 'muted' | 'accent' | 'cyan' | 'green' | 'dim';

export interface TermSegment {
  text: string;
  tone?: Tone;
}

export interface TermLine {
  /** 有 command 时渲染成一行带提示符的输入记录 */
  command?: string;
  /** 输出行的分段文本，用于给不同片段上色 */
  segments?: TermSegment[];
  /** 纯空行 */
  gap?: boolean;
}

export const site = {
  name: 'Jrxh',
  domain: 'jrxh.top',
  url: 'https://jrxh.top',
  role: '独立开发者 / 全栈 / 工具爱好者',
  title: 'Jrxh — 独立开发者 | jrxh.top',
  description:
    '我是 Jrxh，一名独立开发者。白天写代码，晚上点火花。这里是我的星火控制台。',
  h1Lead: '把想法，',
  h1Tail: '推到 top',
  subtitle:
    '我是 Jrxh，一名独立开发者。白天写代码，晚上点火花。这里是我的星火控制台。',
  motto: '急如星火，稳如 top。',
  promptUser: 'jrxh',
  promptHost: 'top',
  email: 'hello@jrxh.top',
  status: '在线 · 接受远程合作',
  footer: '© 2026 jrxh.top — Built with Astro & curiosity.',
  nav: [
    { label: '关于', href: '#about' },
    { label: '项目', href: '#projects' },
    { label: '写作', href: '/writing/' },
    { label: '联系', href: '#contact' }
  ],
  links: {
    github: 'https://github.com/jrxh-top',
    // 占位符：替换成你自己的主页地址
    x: '{{SOCIAL_URL}}'
  },
  /** 终端首屏默认输出 */
  bootLines: [
    { command: 'whoami' },
    {
      segments: [
        { text: 'Jrxh', tone: 'text' },
        { text: ' — 独立开发者 / 全栈 / 工具爱好者', tone: 'muted' }
      ]
    },
    { gap: true },
    { command: 'cat status.txt' },
    {
      segments: [
        { text: '● ', tone: 'green' },
        { text: '在线', tone: 'text' },
        { text: ' | 正在构建：个人主页 v1 | 接受远程合作', tone: 'muted' }
      ]
    },
    { gap: true },
    { command: 'ls' },
    {
      segments: [
        { text: 'about/', tone: 'cyan' },
        { text: '  ', tone: 'dim' },
        { text: 'projects/', tone: 'cyan' },
        { text: '  ', tone: 'dim' },
        { text: 'writing/', tone: 'cyan' },
        { text: '  ', tone: 'dim' },
        { text: 'contact/', tone: 'cyan' },
        { text: '  ', tone: 'dim' },
        { text: 'spark.sh', tone: 'accent' }
      ]
    }
  ] as TermLine[],
  /** ./spark.sh 与 /spark 页面共用的灵感池 */
  sparks: [
    '先上线，再完美。',
    '把一个问题拆到能在一个下午解决。',
    '工具做给三个月后的自己用。',
    '慢一点没关系，别停。',
    '写下来，比记住更可靠。'
  ]
};

export interface BentoCard {
  id: string;
  index: string;
  label: string;
  /** 卡片在 6 列网格中的跨度 */
  span: 'sm' | 'md' | 'lg' | 'full';
  title: string;
  body: string[];
  /** 技术栈 / 标签 */
  tags?: string[];
  /** 正在折腾的小项目 */
  now?: { name: string; why: string };
  /** 联系方式 */
  contact?: { email: string; links: { label: string; href: string }[] };
}

export const bentoCardMeta = {
  about: {
    id: 'about',
    index: '01',
    label: '关于我',
    span: 'lg'
  },
  status: {
    id: 'status',
    index: '02',
    label: '当前状态',
    span: 'sm'
  },
  stack: {
    id: 'stack',
    index: '03',
    label: '技术栈',
    span: 'sm'
  },
  now: {
    id: 'now',
    index: '04',
    label: '现在折腾',
    span: 'sm'
  },
  writing: {
    id: 'writing',
    index: '05',
    label: '写作 / 笔记',
    span: 'sm'
  },
  contact: {
    id: 'contact',
    index: '06',
    label: '联系',
    span: 'full'
  }
} as const;

export const bento: BentoCard[] = [
  {
    ...bentoCardMeta.about,
    title: '写代码，也写清楚为什么写。',
    body: [
      '我是 Jrxh，独立开发者，习惯从零把一个想法推到能用的状态。',
      '喜欢做小而完整的工具：打开就能用，不需要说明书。',
      '白天在业务里打磨工程，晚上留两小时给实验。'
    ]
  },
  {
    ...bentoCardMeta.status,
    title: '正在构建，也在留时间。',
    body: [
      '正在构建：个人主页 v1。',
      '正在学习：更好的交互与性能取舍。',
      '可合作：远程、长期、按项目都可以聊。'
    ]
  },
  {
    ...bentoCardMeta.stack,
    title: '顺手的工具，比流行的重要。',
    body: ['日常主力，按真实项目替换即可。'],
    tags: ['TypeScript', 'React', 'Node', 'Python', 'PostgreSQL', 'Docker']
  },
  {
    ...bentoCardMeta.now,
    title: '一个小实验：把碎片收进一个入口。',
    body: [],
    now: {
      name: '{{NOW_PROJECT_NAME}}',
      why: '为什么做：{{NOW_PROJECT_WHY}}'
    }
  },
  {
    ...bentoCardMeta.writing,
    title: '写下来，比记住更可靠。',
    body: []
  },
  {
    ...bentoCardMeta.contact,
    title: '有事直接说，邮件最好找。',
    body: ['远程合作、技术交流、或者只是想聊聊你正在做的东西。'],
    contact: {
      email: site.email,
      links: [
        { label: 'GitHub', href: site.links.github },
        { label: 'X', href: site.links.x }
      ]
    }
  }
];

export interface Project {
  index: string;
  name: string;
  summary: string;
  role: string;
  result: string;
  tags: string[];
  url: string;
  sparkLevel: number;
}

/** 只放两个项目，没有真实内容时保留占位符，不要编造数据。 */
export const projects: Project[] = [
  {
    index: '01',
    name: '{{PROJECT_1_NAME}}',
    summary: '{{PROJECT_1_SUMMARY}}',
    role: '{{PROJECT_1_ROLE}}',
    result: '{{PROJECT_1_RESULT}}',
    tags: ['{{PROJECT_1_TAG_1}}', '{{PROJECT_1_TAG_2}}'],
    url: '{{PROJECT_1_URL}}',
    sparkLevel: 3
  },
  {
    index: '02',
    name: '{{PROJECT_2_NAME}}',
    summary: '{{PROJECT_2_SUMMARY}}',
    role: '{{PROJECT_2_ROLE}}',
    result: '{{PROJECT_2_RESULT}}',
    tags: ['{{PROJECT_2_TAG_1}}', '{{PROJECT_2_TAG_2}}'],
    url: '{{PROJECT_2_URL}}',
    sparkLevel: 2
  }
];
