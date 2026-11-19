/**
 * 命令 -> 行为 的映射配置。
 * 这里只描述“有哪些命令、对应哪个行为”，
 * 真正的执行函数在 Terminal.astro 内实现，绝不使用 eval。
 */

export type CommandAction =
  | 'help'
  | 'whoami'
  | 'list'
  | 'projects'
  | 'motto'
  | 'spark'
  | 'contact'
  | 'clear';

export interface CommandSpec {
  /** 规范化后的命令文本 */
  name: string;
  aliases?: string[];
  action: CommandAction;
  /** 快捷按钮上的标签，没有则不生成按钮 */
  hint?: string;
  /** help 里的说明 */
  description: string;
}

export const commands: CommandSpec[] = [
  {
    name: 'help',
    action: 'help',
    description: '列出所有可用命令'
  },
  {
    name: 'whoami',
    action: 'whoami',
    hint: 'whoami',
    description: '我是谁，并跳到「关于我」'
  },
  {
    name: 'ls',
    action: 'list',
    description: '列出当前目录内容'
  },
  {
    name: 'ls projects',
    action: 'projects',
    hint: 'ls projects',
    description: '打开精选项目区'
  },
  {
    name: 'cat motto.txt',
    action: 'motto',
    hint: 'cat motto.txt',
    description: '读一句站点座右铭'
  },
  {
    name: './spark.sh',
    aliases: ['spark', 'sh spark.sh'],
    action: 'spark',
    hint: './spark.sh',
    description: '点一颗火花，随机一句灵感'
  },
  {
    name: 'contact',
    action: 'contact',
    hint: 'contact',
    description: '复制邮箱地址'
  },
  {
    name: 'clear',
    aliases: ['cls'],
    action: 'clear',
    description: '清屏（也可以按 Esc）'
  }
];

/** 快捷命令按钮（按规范固定 5 个，顺序即展示顺序） */
export const quickCommands: CommandSpec[] = commands.filter(
  (c) => typeof c.hint === 'string'
);

const lookup = new Map<string, CommandSpec>();
for (const spec of commands) {
  lookup.set(spec.name, spec);
  for (const alias of spec.aliases ?? []) {
    lookup.set(alias, spec);
  }
}

/** 把用户输入规范化：去首尾空白、压缩空格、转小写 */
export function normalizeInput(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function resolveCommand(raw: string): CommandSpec | undefined {
  return lookup.get(normalizeInput(raw));
}

export function unknownCommandMessage(raw: string): string {
  const name = raw.trim().replace(/\s+/g, ' ');
  return `command not found: ${name}. 试试输入 help.`;
}

/** help 输出的对齐宽度按最长命令算 */
export const commandColumnWidth = Math.max(
  ...commands.map((c) => c.name.length)
);
