---
title: '一个不用 eval 的终端组件'
description: '命令是数据，不是代码。这个终端只有一张映射表，没有一行 eval。'
date: 2026-11-17
tags: ['终端', '前端']
---

个人主页上的终端，最容易写成一句话：

```js
eval(input.value)
```

省事，但代价很直接：任何访问者都能在你的页面上执行任意代码；CSP 里也没法开 `unsafe-eval`；出错时你甚至不知道是哪一步炸的。

这个站的终端换了一种做法：**输入只用来查表。**

## 命令不是字符串，是数据

所有命令集中在一个数组里：

```ts
{
  name: 'spark',
  aliases: ['./spark.sh', 'sh spark.sh'],
  hint: '点一颗火花',
  action: 'spark'
}
```

`action` 是一个固定的联合类型：

```ts
type CommandAction =
  | 'help' | 'whoami' | 'list' | 'projects'
  | 'motto' | 'spark' | 'contact' | 'clear';
```

用户按下 Enter 后，流程只有三步：

1. `trim()` 并转小写；
2. 用 `name` 和 `aliases` 查表；
3. 命中就执行对应的函数，没命中就输出 `command not found`。

没有 `new Function`，没有 `eval`，也没有把输入拼进 HTML。

## 输出一律走 textContent

终端里所有动态内容都用 `document.createElement` 建节点，再写 `textContent`。

```ts
const line = document.createElement('div');
line.className = 'line';
line.textContent = text;
output.append(line);
```

这样即使有人输入 `<img src=x onerror=...>`，它也只会被当成一行普通文字打印出来。

## 打字机不能打断读屏

逐字输出看起来很像终端，但对屏幕阅读器是灾难：每个字符都可能触发一次朗读。

处理方式是给输出区加 `aria-live="polite"`，同时在打字期间设置 `aria-busy="true"`，整段结束后再置回 `false`。长行和 `prefers-reduced-motion` 下直接整行出现，不做逐字。

历史记录、`Esc` 清屏、快捷按钮都只是同一个 `run()` 的入口，不复制逻辑。

## 移动端不抢焦点

手机上的输入框默认折叠，只留输出和五个快捷按钮。

点击"展开输入"才显示 input，并且不自动聚焦——否则键盘会顶起半个屏幕，把刚看的内容盖住。

## 成本

终端相关 JS 约 6.6KB，gzip 后 2.8KB。没有依赖，没有 polyfill。

> 终端的乐趣在交互，不在执行任意代码。把输入当数据看，安全性是顺带的，可维护性才是主要收益。
